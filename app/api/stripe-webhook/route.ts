/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBooking } from '@/actions';
import { sendVerificationEmail } from '@/lib/email';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

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
    const metadata = session.metadata as Record<string, string>;

    // Validate required metadata fields
    const { guestName, email, checkInDate, checkOutDate, propertyId } = metadata;
    if (!guestName || !email || !checkInDate || !checkOutDate || !propertyId) {
      console.error('Missing metadata fields:', metadata);
      return NextResponse.json({ error: 'Missing required metadata' }, { status: 400 });
    }

    // Fetch the property data (ensure NEXT_PUBLIC_PAYLOAD_URL is correctly set)
    let property;
    try {
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
        console.error('Property not found for ID:', propertyId);
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      }
      property = await propertyRes.json();
    } catch (err) {
      console.error('Error fetching property:', err);
      return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
    }

    // Create the booking in your system
    try {
      await createBooking({
        guestName,
        email,
        checkInDate,
        checkOutDate,
        status: 'PENDING',
        property: propertyId,
      });
    } catch (err) {
      console.error('Error creating booking:', err);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    // Update the property's availability by appending the new booking dates
    const updatedAvailability = [
      ...(property.availability || []),
      { from: checkInDate, to: checkOutDate },
    ];

    try {
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
        console.error('Failed to update property availability for ID:', propertyId);
        return NextResponse.json({ error: 'Failed to update property availability' }, { status: 500 });
      }
    } catch (err) {
      console.error('Error updating property availability:', err);
      return NextResponse.json({ error: 'Failed to update property availability' }, { status: 500 });
    }

    // Send a verification email using your Resend-based function
    try {
      await sendVerificationEmail(email, {
        guestName,
        checkInDate,
        checkOutDate,
        propertyId,
      });
    } catch (err) {
      console.error('Error sending verification email:', err);
      // Optionally, handle the email error without failing the webhook.
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}