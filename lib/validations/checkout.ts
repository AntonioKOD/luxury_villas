import { z } from 'zod';

export const createCheckoutSessionSchema = z.object({
  propertyId: z.string().min(1, 'propertyId is required'),
  quantity: z.union([z.number().int().positive(), z.string().regex(/^\d+$/).transform(Number)]),
  success_url: z.string().url('Invalid success_url'),
  cancel_url: z.string().url('Invalid cancel_url'),
  bookingData: z.object({
    checkInDate: z.string().min(1, 'checkInDate is required'),
    checkOutDate: z.string().optional(),
    guests: z.string().optional(),
    guestName: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
  }),
});

export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>;
