"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BookingWidgetProps {
  price: number
  propertyId: string
}

export default function BookingWidget({ price, propertyId }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")

  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0

  const subtotal = price * nights
  const serviceFee = subtotal * 0.12
  const total = subtotal + serviceFee

  const handleBookNow = () => {
    // Handle booking logic here
    console.log({
      propertyId,
      checkIn,
      checkOut,
      guests,
      total,
    })
  }

  return (
    <Card className="shadow-lg border-2">
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span>
            ${price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
          </span>
          <span className="text-sm font-normal flex items-center">
            <span className="text-yellow-400 mr-1">★</span> 4.9 · 128 reviews
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="check-in">Check in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-in"
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                  disabled={(date: Date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="check-out">Check out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-out"
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !checkOut && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                  disabled={(date: Date) => !checkIn || date <= checkIn || date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger id="guests" className="w-full">
              <SelectValue placeholder="Select number of guests" />
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

        {nights > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between">
              <span>
                ${price} × {nights} nights
              </span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-3 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" disabled={!checkIn || !checkOut} onClick={handleBookNow}>
          {checkIn && checkOut ? "Book now" : "Select dates"}
        </Button>
      </CardFooter>
    </Card>
  )
}


