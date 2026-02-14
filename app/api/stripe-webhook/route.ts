import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { createBooking } from '@/actions';
import { sendVerificationEmail } from '@/lib/email';
import { getStripe } from '@/lib/stripe';
import { getServerEnv } from '@/lib/env';

export async function POST(request: Request) {
  const buf = await request.text();
  const sig = request.headers.get('stripe-signature');
  const stripe = getStripe();
  const env = getServerEnv();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig ?? '', env.NEXT_STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
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

    let property: { availability?: Array<{ from: string; to: string }> };
    try {
      const payload = await getPayload({ config });
      const found = await payload.findByID({
        collection: 'properties',
        id: propertyId,
        overrideAccess: true,
      });
      if (!found) {
        console.error('Property not found for ID:', propertyId);
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      }
      property = found;
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
        status: 'CONFIRMED',
        property: propertyId,
      });
    } catch (err) {
      console.error('Error creating booking:', err);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    const updatedAvailability = [
      ...(property.availability || []),
      { from: checkInDate, to: checkOutDate },
    ];

    try {
      const payload = await getPayload({ config });
      await payload.update({
        collection: 'properties',
        id: propertyId,
        data: { availability: updatedAvailability },
        overrideAccess: true,
      });
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