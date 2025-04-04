import { sendContactEmail } from "@/lib/contact-email";

  async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { name, email, subject, message } = await req.json();

  try {
    await sendContactEmail({ name, email, subject, message });
    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("Error sending email", { status: 500 });
  }
}

export { handler as POST };


