/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/email.ts
import {Resend} from "resend";

export type BookingDetails = {
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  propertyId: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  bookingDetails: BookingDetails
): Promise<any> {
  const { guestName, checkInDate, checkOutDate, propertyId } = bookingDetails;

  // Generate a 6-digit confirmation number as a string
  const confirmationNumber = Math.floor(100000 + Math.random() * 900000).toString();

  // Create the HTML content for the email, including the confirmation number
  const emailContent = `
    <h1>Booking Confirmation</h1>
    <p>Hi ${guestName},</p>
    <p>Thank you for your booking! Your confirmation number is <strong>${confirmationNumber}</strong>.</p>
    <p>Here are your booking details:</p>
    <ul>
      <li><strong>Property ID:</strong> ${propertyId}</li>
      <li><strong>Check-In Date:</strong> ${checkInDate}</li>
      <li><strong>Check-Out Date:</strong> ${checkOutDate}</li>
    </ul>
    <p>We look forward to hosting you!</p>
  `;

  // Initialize the Resend client using your API key from the environment variables
 

  try {
    // Use the Resend library to send the email
    const data = await resend.emails.send({
      from: "Your Company <no-reply@yourcompany.com>", // update with your sender details
      to: email,
      subject: `Your Booking Confirmation - ${confirmationNumber}`,
      html: emailContent,
    });
    return data;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}