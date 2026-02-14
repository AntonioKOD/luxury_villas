# Gjovana's Villas

A luxury villa booking site built with Next.js 15, Payload CMS (MongoDB), and Stripe for payments.

## Features

- Property listings with images, seasonal pricing, and availability
- Booking flow with Stripe Checkout and webhook-driven confirmation
- Contact form and verification emails (Resend)
- Payload CMS admin for properties, bookings, and media

## Prerequisites

- Node.js 18+
- MongoDB instance
- Stripe and Resend accounts (for payments and email)

## Getting started

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file and set your variables:

   ```bash
   cp .env.example .env
   ```

   Required variables are listed in [.env.example](.env.example). All keys in that file must be set for the app and Payload admin to work; optional ones can be left empty where noted.

3. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/admin](http://localhost:3000/admin) for Payload CMS.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Environment variables

See [.env.example](.env.example) for the full list. Required for core functionality:

- **Database:** `DATABASE_URL` (MongoDB)
- **Payload:** `PAYLOAD_SECRET`, `RESEND_API_KEY`; `BLOB_READ_WRITE_TOKEN` for media uploads
- **Stripe:** `NEXT_STRIPE_SECRET_KEY`, `NEXT_STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Public URL:** `NEXT_PUBLIC_PAYLOAD_URL` (your deployed app URL, for webhooks)

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS](https://payloadcms.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
