import Link from "next/link"
import { CalendarX, ArrowLeft, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingCancelledPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="relative">
          {/* Top decorative element */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-20 bg-card rounded-full shadow-lg flex items-center justify-center">
              <CalendarX className="h-10 w-10 text-destructive" />
            </div>
          </div>

          {/* Main content card */}
          <div className="bg-card rounded-xl shadow-xl overflow-hidden border-t-4 border-destructive mt-10">
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-center text-card-foreground mb-6">
                Booking Cancelled
              </h1>

              <div className="max-w-2xl mx-auto">
                <p className="text-muted-foreground text-center mb-8">
                  Your booking process was not completed. We&apos;re sorry to see you go, but we hope to welcome you to
                  Gjovana&apos;s Villas in the future.
                </p>

                <div className="bg-muted rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-3">What Happened?</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-muted-foreground">Checkout abandoned on</p>
                        <p className="font-medium text-foreground">
                          {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Search className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-muted-foreground">Booking status</p>
                        <p className="font-medium text-foreground">Not completed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-3">Would you like to try again?</h2>
                  <p className="text-muted-foreground mb-4">
                    We&apos;ve saved your preferences. You can easily restart your booking process and secure your dream
                    vacation at Gjovana&apos;s Villas.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground font-semibold text-sm mr-3 mt-0.5">
                        1
                      </span>
                      <span>Return to our properties page to browse available villas.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground font-semibold text-sm mr-3 mt-0.5">
                        2
                      </span>
                      <span>Check our special offers for last-minute deals and discounts.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground font-semibold text-sm mr-3 mt-0.5">
                        3
                      </span>
                      <span>Contact our team if you need assistance with your booking.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/properties">Browse Properties</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Return to Homepage
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom decorative wave */}
            <div className="h-12 bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
                <path
                  fill="hsl(0, 0%, 100%)"
                  fillOpacity="1"
                  d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Have questions about booking? Our team is here to help at{" "}
            <a href="mailto:bookings@gjovanasvillas.com" className="text-primary hover:underline">
              bookings@gjovanasvillas.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

