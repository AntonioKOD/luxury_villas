import { describe, it, expect } from 'vitest';
import { contactFormSchema } from './contact';

describe('contactFormSchema', () => {
  it('accepts valid input', () => {
    const valid = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Booking inquiry',
      message: 'Hello, I would like to book for next month.',
    };
    const result = contactFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Jane Doe');
      expect(result.data.email).toBe('jane@example.com');
    }
  });

  it('trims and lowercases email', () => {
    const input = {
      name: '  Jane  ',
      email: '  Jane@Example.COM  ',
      subject: ' Hi ',
      message: ' Message ',
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('jane@example.com');
      expect(result.data.name).toBe('Jane');
    }
  });

  it('rejects empty name', () => {
    const input = {
      name: '',
      email: 'jane@example.com',
      subject: 'Subject',
      message: 'Message',
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const input = {
      name: 'Jane',
      email: 'not-an-email',
      subject: 'Subject',
      message: 'Message',
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('rejects message over max length', () => {
    const input = {
      name: 'Jane',
      email: 'jane@example.com',
      subject: 'Subject',
      message: 'x'.repeat(5001),
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
