import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const { priceId, quantity, success_url, cancel_url, bookingData } = await req.json()

    if (!priceId || !quantity || !success_url || !cancel_url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: Number(quantity), // Convert quantity to a number
        },
      ],
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url,
      metadata: {
        ...bookingData,
      }
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session", error)
    // Always return a valid JSON response in the error case
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    )
  }
}

