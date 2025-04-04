/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBooking } from '@/actions';
import { sendVerificationEmail } from '@/lib/email';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const buf = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.NEXT_STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Error constructing Stripe event:', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Cast metadata to a record of strings so that TypeScript recognizes custom fields
    const metadata = session.metadata as Record<string, string>;
    const { guestName, email, checkInDate, checkOutDate, propertyId } = metadata;

    // Fetch the property data.
    // Use an absolute URL if needed (e.g., from NEXT_PUBLIC_BASE_URL).
    const propertyRes = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/properties/${propertyId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!propertyRes.ok) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    const property = await propertyRes.json();

    // Create the booking in your system
    await createBooking({
      guestName,
      email,
      checkInDate,
      checkOutDate,
      status: 'PENDING',
      property: propertyId,
    });

    // Update the property's availability by appending the new booking dates
    const updatedAvailability = [
      ...(property.availability || []),
      { from: checkInDate, to: checkOutDate },
    ];

    const updateRes = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/properties/${propertyId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          availability: updatedAvailability,
        }),
      }
    );

    if (!updateRes.ok) {
      return NextResponse.json({ error: 'Failed to update property availability' }, { status: 500 });
    }

    // Send a verification email using your Resend-based function
    await sendVerificationEmail(email, {
      guestName,
      checkInDate,
      checkOutDate,
      propertyId,
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}