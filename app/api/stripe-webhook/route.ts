import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getServerEnv } from '@/lib/env';

/**
 * Stripe webhook endpoint. Booking flow removed — we only verify the signature and acknowledge.
 */
export async function POST(request: Request) {
  const buf = await request.text();
  const sig = request.headers.get('stripe-signature');
  const stripe = getStripe();
  const env = getServerEnv();

  try {
    stripe.webhooks.constructEvent(buf, sig ?? '', env.NEXT_STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
