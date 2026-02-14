import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPayload } from 'payload';
import payloadConfig from '@/payload.config';
import { getStripe } from '@/lib/stripe';
import { getServerEnv } from '@/lib/env';
import { createCheckoutSessionSchema } from '@/lib/validations/checkout';

interface SeasonalPrice {
  month: string;
  price: number;
  priceId?: string;
}

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = createCheckoutSessionSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('; ');
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { propertyId, quantity, success_url, cancel_url, bookingData } = parsed.data;
    const stripe = getStripe();
    const env = getServerEnv();

    const payload = await getPayload({ config: payloadConfig });
    const property = await payload.findByID({
      collection: 'properties',
      id: propertyId,
      overrideAccess: true,
    });
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const checkIn = new Date(bookingData.checkInDate);
    const monthValue = (checkIn.getMonth() + 1).toString();
    const seasons = (property.seasonalPrices as SeasonalPrice[]) || [];
    const season = seasons.find((s) => s.month === monthValue);
    if (!season) {
      return NextResponse.json(
        { error: 'No price configured for check-in month' },
        { status: 400 }
      );
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: bookingData.email,
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url,
      metadata: {
        propertyId,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate ?? '',
        guests: bookingData.guests ?? '',
        guestName: bookingData.guestName ?? '',
        email: bookingData.email ?? '',
        rawUnitPrice: season.price.toString(),
      },
    };

    try {
      if (!season.priceId) {
        throw new Error('Price ID is undefined');
      }
      await stripe.prices.retrieve(season.priceId);

      const lineItems: Stripe.Checkout.SessionCreateParams['line_items'] = [
        { price: season.priceId, quantity: Number(quantity) },
      ];
      if (env.CLEANING_FEE_PRICE_ID) {
        lineItems.push({ price: env.CLEANING_FEE_PRICE_ID, quantity: 1 });
      }
      sessionParams.line_items = lineItems;
    } catch (priceError: unknown) {
      if (priceError instanceof Error) {
        console.warn(
          `Stripe priceId ${season.priceId} failed, falling back to inline price_data:`,
          priceError.message
        );
      } else {
        console.warn(
          `Stripe priceId ${season.priceId} failed, falling back to inline price_data:`,
          priceError
        );
      }
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(season.price * 100),
            product_data: {
              name: property.name || 'Booking',
            },
          },
          quantity: Number(quantity),
        },
      ];
      if (env.CLEANING_FEE_PRICE_ID) {
        sessionParams.line_items.push({
          price: env.CLEANING_FEE_PRICE_ID,
          quantity: 1,
        });
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
