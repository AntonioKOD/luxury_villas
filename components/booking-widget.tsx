"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users } from "lucide-react"
import { addDays } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "./date-range-picker" // our custom DatePicker component
import type { DateRange } from "react-day-picker"

interface BookingWidgetProps {
  price: number
  propertyId: string
}

export default function BookingWidget({ price, propertyId }: BookingWidgetProps) {
  // Initial state: default range from today to 7 days later
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [guests, setGuests] = useState("2")

  // Calculate number of nights if both dates are selected
  const nights =
    date?.from && date?.to
      ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
      : 0

  const subtotal = price * nights
  const serviceFee = subtotal * 0.12
  const cleaningFee = 50 // Fixed cleaning fee
  const total = subtotal + serviceFee + cleaningFee

  const handleBookNow = () => {
    // Booking logic here
    console.log({
      propertyId,
      checkIn: date?.from,
      checkOut: date?.to,
      guests,
      total,
    })
  }

  return (
    <Card className="shadow-lg border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${price}</span>
            <span className="text-sm ml-1 text-muted-foreground">night</span>
          </div>
          <div className="text-sm flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="font-medium">4.9</span>
            <span className="text-muted-foreground ml-1">(19)</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-xl border overflow-hidden">
          {/* Date Range Picker */}
          <DatePicker
            mode="range"
            // Pass the currently selected range (an object with `from` and `to`)
            selected={date}
            // onSelect receives the new range when the user picks dates
            onSelect={setDate}
          />

          {/* Guests Selector */}
          <div className="p-0">
            <div className="flex items-center p-4 bg-background">
              <Users className="mr-3 h-5 w-5 text-primary" />
              <div className="grid gap-0.5 flex-1">
                <div className="font-medium">Guests</div>
                <div className="text-xs text-muted-foreground">Add guests</div>
              </div>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="w-[100px] border-none shadow-none focus:ring-0 p-0 h-auto">
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!date?.from || !date?.to}
          onClick={handleBookNow}
        >
          {date?.from && date?.to ? "Reserve" : "Select dates"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          You won&apos;t be charged yet
        </div>

        {nights > 0 && (
          <div className="space-y-3 pt-4">
            <div className="flex justify-between">
              <span className="underline">
                ${price} × {nights} nights
              </span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Service fee</span>
              <span>${serviceFee.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold pt-4 border-t mt-4">
              <span>Total before taxes</span>
              <span>${total.toFixed(0)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}