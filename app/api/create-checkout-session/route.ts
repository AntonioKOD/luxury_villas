// app/api/create-checkout-session/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config"; // adjust as needed

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const {
      propertyId,
      quantity,
      success_url,
      cancel_url,
      bookingData,
    } = await req.json();

    // Basic validation
    if (
      !propertyId ||
      !quantity ||
      !success_url ||
      !cancel_url ||
      !bookingData?.checkInDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch the property from Payload CMS
    const payload = await getPayload({ config: payloadConfig });
    const property = await payload.findByID({
      collection: "properties",
      id: propertyId,
      overrideAccess: true,
    });
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Pick the seasonal entry for the check-in month
    const checkIn = new Date(bookingData.checkInDate);
    const monthValue = (checkIn.getMonth() + 1).toString();
    interface SeasonalPrice {
      month: string;
      price: number;
      priceId?: string;
    }

    const seasons = (property.seasonalPrices as SeasonalPrice[]) || [];
    const season = seasons.find((s) => s.month === monthValue);
    if (!season) {
      return NextResponse.json(
        { error: "No price configured for check-in month" },
        { status: 400 }
      );
    }

    // Build the checkout-session params
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: bookingData.email,
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url,
      metadata: {
        propertyId,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guests: bookingData.guests,
        guestName: bookingData.guestName,
        email: bookingData.email,
        rawUnitPrice: season.price.toString(),
      },
    };

    // Try to use the stored Stripe Price ID
    try {
      sessionParams.line_items = [
        {
          price: season.priceId,
          quantity: Number(quantity),
        },
        {
          price: process.env.CLEANING_FEE_PRICE_ID,
          quantity: 1,            // one cleaning fee charge
        },
      ];
      // Test retrieve to catch “No such price” upfront
      if (!season.priceId) {
        throw new Error("Price ID is undefined");
      }
      await stripe.prices.retrieve(season.priceId);
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
      // Fallback: dynamic inline price_data
      sessionParams.line_items = [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(season.price * 100),
            product_data: {
              name: property.name || "Booking",
            },
          },
          quantity: Number(quantity),
        },
      ];
    }

    // Create the session
    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
  }
}