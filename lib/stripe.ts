import Stripe from 'stripe';
import { getServerEnv } from '@/lib/env';

let _stripe: Stripe | null = null;

/** Server-side Stripe client. Uses validated env. */
export function getStripe(): Stripe {
  if (_stripe === null) {
    const env = getServerEnv();
    _stripe = new Stripe(env.NEXT_STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });
  }
  return _stripe;
}
