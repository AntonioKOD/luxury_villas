import { z } from 'zod';

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  NEXT_STRIPE_SECRET_KEY: z.string().min(1, 'NEXT_STRIPE_SECRET_KEY is required'),
  NEXT_STRIPE_WEBHOOK_SECRET: z.string().min(1, 'NEXT_STRIPE_WEBHOOK_SECRET is required'),
  CLEANING_FEE_PRICE_ID: z.string().optional(),
  NEXT_PUBLIC_PAYLOAD_URL: z.string().url().optional().or(z.literal('')),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required'),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
  NEXT_PUBLIC_PAYLOAD_URL: z.string().optional(),
});

function parseServerEnv() {
  const parsed = serverEnvSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    NEXT_STRIPE_SECRET_KEY: process.env.NEXT_STRIPE_SECRET_KEY,
    NEXT_STRIPE_WEBHOOK_SECRET: process.env.NEXT_STRIPE_WEBHOOK_SECRET,
    CLEANING_FEE_PRICE_ID: process.env.CLEANING_FEE_PRICE_ID,
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  });
  if (!parsed.success) {
    const message = parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
    throw new Error(`Invalid server environment variables: ${message}`);
  }
  return parsed.data;
}

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let _serverEnv: ServerEnv | null = null;

/** Validated server-side env. Throws on first access if required vars are missing. */
export function getServerEnv(): ServerEnv {
  if (_serverEnv === null) {
    _serverEnv = parseServerEnv();
  }
  return _serverEnv;
}

/** Validate client-side env (for build or runtime checks). Does not throw for optional vars. */
export function getClientEnv(): z.infer<typeof clientEnvSchema> {
  return clientEnvSchema.parse({
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  });
}
