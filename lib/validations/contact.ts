import { z } from 'zod';

const MAX_NAME = 200;
const MAX_SUBJECT = 300;
const MAX_MESSAGE = 5000;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(MAX_NAME, `Name must be at most ${MAX_NAME} characters`)
    .transform((s) => s.trim()),
  email: z
    .string()
    .min(1, 'Email is required')
    .transform((s) => s.trim())
    .pipe(z.string().email('Invalid email address').transform((s) => s.toLowerCase())),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(MAX_SUBJECT, `Subject must be at most ${MAX_SUBJECT} characters`)
    .transform((s) => s.trim()),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(MAX_MESSAGE, `Message must be at most ${MAX_MESSAGE} characters`)
    .transform((s) => s.trim()),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
