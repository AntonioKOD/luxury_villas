import { describe, it, expect } from 'vitest';
import { createCheckoutSessionSchema } from './checkout';

describe('createCheckoutSessionSchema', () => {
  it('accepts valid input', () => {
    const valid = {
      propertyId: '507f1f77bcf86cd799439011',
      quantity: 2,
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      bookingData: {
        checkInDate: '2025-06-01',
        checkOutDate: '2025-06-05',
        guests: '4',
        guestName: 'Jane',
        email: 'jane@example.com',
      },
    };
    const result = createCheckoutSessionSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.propertyId).toBe(valid.propertyId);
      expect(result.data.quantity).toBe(2);
    }
  });

  it('coerces string quantity to number', () => {
    const input = {
      propertyId: '507f1f77bcf86cd799439011',
      quantity: '3',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      bookingData: { checkInDate: '2025-06-01' },
    };
    const result = createCheckoutSessionSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.quantity).toBe(3);
    }
  });

  it('rejects missing propertyId', () => {
    const input = {
      quantity: 1,
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      bookingData: { checkInDate: '2025-06-01' },
    };
    const result = createCheckoutSessionSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('rejects invalid success_url', () => {
    const input = {
      propertyId: '507f1f77bcf86cd799439011',
      quantity: 1,
      success_url: 'not-a-url',
      cancel_url: 'https://example.com/cancel',
      bookingData: { checkInDate: '2025-06-01' },
    };
    const result = createCheckoutSessionSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('rejects missing checkInDate', () => {
    const input = {
      propertyId: '507f1f77bcf86cd799439011',
      quantity: 1,
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      bookingData: {},
    };
    const result = createCheckoutSessionSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
