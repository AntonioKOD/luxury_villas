import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  console.log('⭐ Simple webhook test triggered');
  
  try {
    // Initialize Payload
    console.log('Initializing Payload CMS...');
    const payload = await getPayload({ config });
    console.log('✅ Payload initialized successfully');
    
    // Hardcoded data for testing
    const bookingData = {
      guestName: 'Test Guest',
      email: 'test@example.com',
      checkInDate: '2025-06-01T04:00:00.000Z',
      checkOutDate: '2025-06-05T04:00:00.000Z',
      status: 'CONFIRMED',
      property: '67e7761309a7f766d5eb531f' // Replace with a valid property ID
    };
    
    console.log('Creating booking with data:', bookingData);
    
    // Create the booking
    const booking = await payload.create({
      collection: 'bookings',
      data: bookingData,
      depth: 2,
    });
    
    console.log('✅ Booking created successfully:', booking.id);
    
    return NextResponse.json({ 
      success: true,
      message: 'Test booking created successfully',
      booking
    });
    
  } catch (err) {
    console.error('❌ Error creating test booking:', err);
    return NextResponse.json({ 
      error: 'Failed to create test booking',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}