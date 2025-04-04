"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Calendar, Users, CreditCard, Info, CheckCircle2 } from "lucide-react"
import { addDays, format, subDays } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "./date-range-picker" // our custom DatePicker component
import type { DateRange } from "react-day-picker"
import { getAvailability } from "@/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { loadStripe } from "@stripe/stripe-js"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface BookingWidgetProps {
  price: number
  propertyId: string
  priceId: string
  success_url: string
  cancel_url: string
}

export default function BookingWidget({ price, propertyId, priceId, success_url, cancel_url }: BookingWidgetProps) {
  // Initial state: default date range from today to tomorrow
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })

  const [guests, setGuests] = useState("2")
  const [availability, setAvailability] = useState<{ from: Date; to: Date }[]>([
    { from: new Date(), to: addDays(new Date(), 1) },
  ])

  // New states for guest details
  const [guestName, setGuestName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  useEffect(() => {
    const fetchAvailability = async () => {
      const result = await getAvailability(propertyId)
      if (Array.isArray(result.availability) && result.availability[0]?.to) {
        const unavailableRanges = result.availability.map((availability) => ({
          from: subDays(new Date(availability.from), 1),
          to: addDays(new Date(availability.to), 1),
        }))
        setAvailability(unavailableRanges)
      }
    }
    fetchAvailability()
  }, [propertyId])

  // Calculate number of nights and pricing
  const nights =
    date?.from && date?.to ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) : 0

  const subtotal = price * nights
  const serviceFee = subtotal * 0.12
  const cleaningFee = 50 // Fixed cleaning fee
  const total = subtotal + serviceFee + cleaningFee

  // Handler for booking/reservation: Validate fields and then create checkout session
  const handleBookNow = async () => {
    if (!date?.from || !date?.to || !guestName || !email) {
      alert("Please complete all required fields.")
      return
    }
  
    setIsLoading(true)
  
    try {
      // Prepare booking data to be sent as metadata to Stripe
      const bookingData = {
        propertyId,
        checkInDate: date.from.toISOString(), // renamed and converted to string
        checkOutDate: date.to.toISOString(),    // renamed and converted to string
        guests,
        guestName,
        email,
        total,
      }
      console.log("Booking Data:", bookingData)
  
      // Pass bookingData along with other parameters
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          quantity: nights,
          success_url,
          cancel_url,
          bookingData, // New addition: all booking details
        }),
      })
  
      const data = await res.json()
      const sessionId = data.sessionId
      console.log("Session ID:", sessionId)
  
      const stripe = await stripePromise
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      })
  
      if (error) {
        console.error("Stripe Checkout Error:", error)
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Booking error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-xl border bg-card overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${price}</span>
            <span className="text-sm ml-1 text-muted-foreground">night</span>
          </div>
          <div className="text-sm flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="font-medium">4.9</span>
            <span className="text-muted-foreground ml-1">(19 reviews)</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="p-6 space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="date-range" className="font-medium">
                Dates
              </Label>
              {date?.from && date?.to && (
                <span className="text-sm text-primary font-medium">
                  {nights} {nights === 1 ? "night" : "nights"}
                </span>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setDatePickerOpen(!datePickerOpen)}
                className="w-full flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>
                    {date?.from && date?.to
                      ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d, yyyy")}`
                      : "Select dates"}
                  </span>
                </div>
              </button>

              {datePickerOpen && (
                <div className="absolute z-50 mt-1 w-full bg-background border rounded-lg shadow-lg">
                  <div className="p-3">
                    <DatePicker
                      mode="range"
                      selected={date}
                      disabled={availability.map(({ from, to }) => ({ after: from, before: to }))}
                      onSelect={(newDate) => {
                        setDate(newDate)
                        // Remove the automatic closing logic
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guests Selector */}
          <div className="space-y-2">
            <Label htmlFor="guests" className="font-medium">
              Guests
            </Label>
            <div className="flex items-center p-3 rounded-lg border bg-background">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="border-none shadow-none focus:ring-0 p-0 h-auto">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Guest Details Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="guest-name" className="font-medium">
                Guest Name
              </Label>
              <Input
                id="guest-name"
                type="text"
                placeholder="Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="bg-muted/30 p-6 space-y-3">
            <h3 className="font-medium">Price Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <span>
                    ${price} × {nights} nights
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Base rate per night</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <span>Cleaning fee</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>One-time fee for cleaning the property</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span>${cleaningFee}</span>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <span>Service fee</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This helps us run our platform and services</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span>${serviceFee.toFixed(0)}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(0)}</span>
              </div>

              <div className="text-xs text-muted-foreground text-right">Taxes will be calculated at checkout</div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 flex flex-col gap-3">
        <Button
          className="w-full h-12 text-base font-medium"
          size="lg"
          disabled={!date?.from || !date?.to || !guestName || !email || isLoading}
          onClick={handleBookNow}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : date?.from && date?.to ? (
            <span className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Reserve Now
            </span>
          ) : (
            "Select dates"
          )}
        </Button>

        <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>You won&apos;t be charged yet</span>
        </div>

        <div className="text-xs text-center text-muted-foreground mt-2">
          By selecting the button above, you agree to our terms of service and cancellation policy.
        </div>
      </CardFooter>
    </Card>
  )
}

