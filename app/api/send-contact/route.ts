import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/contact-email';
import { contactFormSchema } from '@/lib/validations/contact';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.errors.map((e) => e.message).join('; ');
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await sendContactEmail({ name, email, subject, message });
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}


