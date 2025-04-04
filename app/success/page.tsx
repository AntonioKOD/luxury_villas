"use client"

import Link from "next/link"
import {
  PartyPopper,
  ArrowRight,
  Mail,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingSuccessfulPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        {/* Confetti animation (purely decorative) */}
        <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 left-1/4 w-4 h-4 bg-accent rounded-sm animate-fall-slow"></div>
          <div className="absolute -top-10 left-1/3 w-3 h-6 bg-secondary rounded-sm animate-fall-medium"></div>
          <div className="absolute -top-10 left-1/2 w-5 h-5 bg-primary rounded-sm animate-fall-fast"></div>
          <div className="absolute -top-10 left-2/3 w-4 h-4 bg-accent rounded-sm animate-fall-slow"></div>
          <div className="absolute -top-10 left-3/4 w-3 h-6 bg-secondary rounded-sm animate-fall-medium"></div>
        </div>

        <div className="relative">
          {/* Success icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-20 h-20 bg-primary rounded-full shadow-lg flex items-center justify-center">
              <PartyPopper className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>

          {/* Main content */}
          <div className="bg-card rounded-xl shadow-xl overflow-hidden mt-10 border-t-4 border-primary">
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-center text-card-foreground mb-2">
                Booking Successful!
              </h1>
              <p className="text-center text-muted-foreground mb-8">
                Your reservation has been confirmed. Thank you for choosing Gjovana&apos;s Villas.
              </p>

              {/* Confirmation message */}
              <div className="max-w-2xl mx-auto mb-10 bg-gradient-to-r from-primary to-secondary rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 text-primary-foreground">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 mr-3" />
                    <h2 className="text-xl font-bold">Payment Processed Successfully</h2>
                  </div>
                </div>

                <div className="bg-card p-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-card-foreground">Check your email</h3>
                        <p className="text-muted-foreground">
                          We&apos;ve sent a confirmation email with your booking details and confirmation number. It should
                          arrive within the next few minutes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-accent mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-card-foreground">Don&apos;t see the email?</h3>
                        <p className="text-muted-foreground">
                          Please check your spam or junk folder. If you still don&apos;t see it, contact our support team for
                          assistance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What happens next section */}
              <div className="bg-muted rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 text-center">What happens next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                      <Calendar className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Pre-arrival information</h3>
                      <p className="text-muted-foreground text-sm">
                        One week before your stay, we&apos;ll send you detailed check-in instructions, directions to your
                        villa, and local recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                      <Clock className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Save your confirmation</h3>
                      <p className="text-muted-foreground text-sm">
                        Keep your confirmation email for your records. You&apos;ll need your confirmation number if you need
                        to modify or manage your booking.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                      <HelpCircle className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Need to make changes?</h3>
                      <p className="text-muted-foreground text-sm">
                        If you need to modify your reservation, please contact our team with your confirmation number at
                        least 48 hours before your scheduled arrival.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/">
                    Return to Homepage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bottom decorative wave */}
            <div className="h-12 bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
                <path
                  fill="hsl(0, 0%, 100%)"
                  fillOpacity="1"
                  d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Need assistance with your booking? Contact our concierge team at{" "}
            <a href="mailto:concierge@gjovanasvillas.com" className="text-primary hover:underline">
              info@gjovanasvillas.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

