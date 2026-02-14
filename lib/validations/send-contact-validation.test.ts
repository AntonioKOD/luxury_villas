/**
 * Tests for send-contact API validation behavior.
 * The route uses contactFormSchema; this file tests the same validation rules
 * without importing the route (to avoid pulling in Next/PostCSS).
 */
import { describe, it, expect } from 'vitest';
import { contactFormSchema } from './contact';

describe('send-contact validation (contactFormSchema)', () => {
  it('accepts valid contact payload', () => {
    const body = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Booking',
      message: 'I would like to book for two guests.',
    };
    const result = contactFormSchema.safeParse(body);
    expect(result.success).toBe(true);
  });

  it('rejects payload with invalid email', () => {
    const body = {
      name: 'Jane',
      email: 'invalid',
      subject: 'Sub',
      message: 'Msg',
    };
    const result = contactFormSchema.safeParse(body);
    expect(result.success).toBe(false);
  });

  it('rejects empty message', () => {
    const body = {
      name: 'Jane',
      email: 'jane@example.com',
      subject: 'Sub',
      message: '',
    };
    const result = contactFormSchema.safeParse(body);
    expect(result.success).toBe(false);
  });
});
