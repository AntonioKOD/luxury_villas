/* eslint-disable @typescript-eslint/no-explicit-any */
import { resend } from "./resend"

export type BookingDetails = {
  guestName: string
  checkInDate: string
  checkOutDate: string
  propertyId: string // Kept in type but not displayed in email
}

// Function to format dates in a user-friendly way
function formatDate(dateString: string): string {
  // Parse the date string into a Date object
  const date = new Date(dateString)

  // Format the date to show day of week, month, day, and year
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export async function sendVerificationEmail(email: string, bookingDetails: BookingDetails): Promise<any> {
  const { guestName, checkInDate, checkOutDate } = bookingDetails

  // Format the dates
  const formattedCheckInDate = formatDate(checkInDate)
  const formattedCheckOutDate = formatDate(checkOutDate)

  // Generate a 6-digit confirmation number as a string
  const confirmationNumber = Math.floor(100000 + Math.random() * 900000).toString()

  // Create the HTML content for the email with improved styling
  const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; background-color: #f7f7f7;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f7f7f7;">
        <tr>
          <td align="center" style="padding: 30px 0;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="background-color: #4a90e2; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Booking Confirmation</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin-top: 0; font-size: 16px; line-height: 1.5;">Hi ${guestName},</p>
                  
                  <p style="font-size: 16px; line-height: 1.5;">Thank you for choosing Gjovana's Villas for your upcoming stay! Your booking has been confirmed.</p>
                  
                  <div style="background-color: #f2f7ff; border-left: 4px solid #4a90e2; padding: 15px; margin: 25px 0;">
                    <p style="margin: 0; font-size: 16px;">Your confirmation number: <strong style="font-size: 18px; color: #4a90e2;">${confirmationNumber}</strong></p>
                  </div>
                  
                  <h2 style="color: #4a90e2; font-size: 20px; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Your Stay Details</h2>
                  
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                    <tr>
                      <td width="140" style="padding: 10px 0; font-weight: 600; color: #666666;">Check-In:</td>
                      <td style="padding: 10px 0;">${formattedCheckInDate}</td>
                    </tr>
                    <tr>
                      <td width="140" style="padding: 10px 0; font-weight: 600; color: #666666;">Check-Out:</td>
                      <td style="padding: 10px 0;">${formattedCheckOutDate}</td>
                    </tr>
                    <tr>
                      <td width="140" style="padding: 10px 0; font-weight: 600; color: #666666;">Duration:</td>
                      <td style="padding: 10px 0;">${calculateDuration(checkInDate, checkOutDate)} nights</td>
                    </tr>
                  </table>
                  
                  <p style="font-size: 16px; line-height: 1.5;">We're excited to welcome you to our property. If you have any questions before your arrival, please don't hesitate to contact us.</p>
                  
                  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0;">Warm regards,<br>The Gjovana's Villas Team</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f2f2f2; padding: 20px 30px; text-align: center; font-size: 14px; color: #666666;">
                  <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} Gjovana's Villas. All rights reserved.</p>
                  <p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  try {
    // Use the Resend library to send the email
    const data = await resend.emails.send({
      from: "Gjovana's Villas <info@gjovanasvillas.com>",
      to: email,
      subject: `Your Booking Confirmation - ${confirmationNumber}`,
      html: emailContent,
    })
    return data
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`)
  }
}

// Function to calculate the duration of stay in nights
function calculateDuration(checkInDate: string, checkOutDate: string): number {
  const checkIn = new Date(checkInDate)
  const checkOut = new Date(checkOutDate)

  // Calculate the difference in milliseconds
  const differenceInTime = checkOut.getTime() - checkIn.getTime()

  // Convert to days and return
  return Math.round(differenceInTime / (1000 * 3600 * 24))
}

