import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getServerEnv } from '@/lib/env';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  try {
    // Create a mock checkout.session.completed event
    const mockEvent = {
      id: `evt_${Date.now()}`,
      object: 'event',
      api_version: '2025-02-24.acacia',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: `cs_test_${Date.now()}`,
          object: 'checkout.session',
          payment_status: 'paid',
          status: 'complete',
          metadata: {
            propertyId: '67e7761309a7f766d5eb531f', // Replace with a valid property ID
            guestName: 'Test Guest',
            email: 'test@example.com',
            checkInDate: '2025-06-01T04:00:00.000Z',
            checkOutDate: '2025-06-05T04:00:00.000Z',
            guests: '2',
            rawUnitPrice: '420'
          }
        }
      },
      type: 'checkout.session.completed'
    };
    
    const webhookSecret = getServerEnv().NEXT_STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret not set' }, { status: 500 });
    }
    
    // Create a signature (this is a simplified version of what Stripe does)
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify(mockEvent);
    const signedPayload = `${timestamp}.${payload}`;
    const signature = crypto
      .createHmac('sha256', webhookSecret)
      .update(signedPayload)
      .digest('hex');
    
    // Construct the signature string
    const stripeSignature = `t=${timestamp},v1=${signature}`;
    
    // Send the event to your webhook endpoint
    console.log('Sending mock event to webhook...');
    const response = await fetch(`http://localhost:3001/api/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': stripeSignature
      },
      body: payload
    });
    
    const responseText = await response.text();
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      response: responseText,
      event: mockEvent
    });
  } catch (error) {
    console.error('Error creating mock event:', error);
    return NextResponse.json({ 
      error: 'Failed to create mock event',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}