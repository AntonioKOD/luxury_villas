"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Calendar,
  Users,
  CreditCard,
  Info,
  CheckCircle2,
} from "lucide-react";
import { addDays, format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./date-range-picker";
import type { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { loadStripe } from "@stripe/stripe-js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface BookingWidgetProps {
  propertyId: string;
  success_url: string;
  cancel_url: string;
}

export default function BookingWidget({
  propertyId,
  success_url,
  cancel_url,
}: BookingWidgetProps) {
  const today = new Date();
  const [date, setDate] = useState<DateRange>({
    from: today,
    to: addDays(today, 1),
  });
  const [guests, setGuests] = useState("2");

  // Unavailable date ranges from your backend
  const [availability, setAvailability] = useState<{ from: Date; to: Date }[]>([]);

  // Seasonal prices (month, price, priceId) from your CMS
  const [seasonalPrices, setSeasonalPrices] = useState<
    { month: string; price: number; priceId: string }[]
  >([]);
  const [unitPrice, setUnitPrice] = useState(0);

  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [selectionState, setSelectionState] = useState<
    "start" | "end" | "complete"
  >("start");
  const [propertyLoadError, setPropertyLoadError] = useState<string | null>(null);

  // Single fetch: property data (seasonalPrices + availability) from API
  useEffect(() => {
    async function loadProperty() {
      setPropertyLoadError(null);
      try {
        const res = await fetch(`/api/properties/${encodeURIComponent(propertyId)}`);
        if (!res.ok) {
          setPropertyLoadError("Could not load property details.");
          setSeasonalPrices([]);
          setAvailability([]);
          return;
        }
        const prop = await res.json();
        setSeasonalPrices(prop.seasonalPrices || []);
        if (Array.isArray(prop.availability)) {
          setAvailability(
            prop.availability.map((u: { from: string; to: string }) => ({
              from: new Date(u.from),
              to: new Date(u.to),
            }))
          );
        } else {
          setAvailability([]);
        }
      } catch {
        setPropertyLoadError("Could not load property details.");
        setSeasonalPrices([]);
        setAvailability([]);
      }
    }
    loadProperty();
  }, [propertyId]);

  // Update unitPrice when the check-in month changes
  useEffect(() => {
    if (!date.from) return;
    const monthValue = (date.from.getMonth() + 1).toString();
    const season = seasonalPrices.find((p) => p.month === monthValue);
    if (season) {
      setUnitPrice(season.price);
    }
  }, [date.from, seasonalPrices]);

  // Close date picker on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setDatePickerOpen(false);
        setSelectionState("start");
      }
    }
    if (datePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [datePickerOpen]);

  // Calculate nights and fees
  const nights =
    date.from && date.to
      ? Math.ceil((date.to.getTime() - date.from.getTime()) / 86400000)
      : 0;
  const subtotal = unitPrice * nights;
  const cleaningFee = 50;
  const total = subtotal + cleaningFee;

  // Booking handler
  const handleBookNow = async () => {
    if (!date.from || !date.to || !guestName || !email) {
      alert("Please complete all required fields.");
      return;
    }
    setIsLoading(true);

    try {
      const bookingData = {
        propertyId,
        checkInDate: date.from.toISOString(),
        checkOutDate: date.to.toISOString(),
        guests,
        guestName,
        email,
        unitPrice,
        total,
      };

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,         
          quantity: nights,
          success_url,
          cancel_url,
          bookingData,
        }),
      });

      const { sessionId, error: sessionError } = await res.json();
      if (sessionError) {
        console.error("Booking error:", sessionError);
        setIsLoading(false);
        return;
      }

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe Error:", error);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl border bg-card overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">€{unitPrice}</span>
            <span className="text-sm ml-1 text-muted-foreground">
              night
            </span>
          </div>
          <div className="text-sm flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="font-medium">4.9</span>
            <span className="text-muted-foreground ml-1">
              (19 reviews)
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {propertyLoadError && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {propertyLoadError} Pricing and availability may be incomplete.
          </div>
        )}
        <div className="p-6 space-y-6">
          {/* Guest Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="guest-name">Guest Name</Label>
              <Input
                id="guest-name"
                placeholder="Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Dates</Label>
              {date.from && date.to && (
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
                    {date.from && date.to
                      ? `${format(date.from, "MMM d")} - ${format(
                          date.to,
                          "MMM d, yyyy"
                        )}`
                      : "Select dates"}
                  </span>
                </div>
              </button>

              {datePickerOpen && (
                <div
                  ref={datePickerRef}
                  className="absolute z-50 mt-1 w-full bg-background border rounded-lg shadow-lg"
                >
                  <div className="p-3">
                    <DatePicker
                      mode="range"
                      selected={date}
                      disabled={[
                        { before: today },
                        ...availability.map((win) => ({
                          from: win.from,
                          to: win.to,
                        })),
                      ]}
                      onSelect={(newDate) => {
                        const prevFrom = date.from;
                        const prevTo = date.to;
                        setDate(
                          newDate || { from: today, to: addDays(today, 1) }
                        );
                        if (!newDate) {
                          setSelectionState("start");
                        } else if (!prevFrom && newDate.from && !newDate.to) {
                          setSelectionState("end");
                        } else if (
                          newDate.from &&
                          newDate.to &&
                          (selectionState === "end" ||
                            (prevFrom && !prevTo && newDate.to))
                        ) {
                          setSelectionState("complete");
                          setDatePickerOpen(false);
                          setTimeout(() => setSelectionState("start"), 100);
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Guests</Label>
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
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="bg-muted/30 p-6 space-y-3">
            <h3 className="font-medium">Price Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  ${unitPrice} × {nights} nights
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Base rate per night</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  Cleaning fee
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>One-time cleaning fee</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span>€{cleaningFee}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>€{total.toFixed(0)}</span>
              </div>
              <div className="text-xs text-right text-muted-foreground">
                Taxes calculated at checkout
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 flex flex-col gap-3">
        <Button
          className="w-full h-12 text-base font-medium"
          size="lg"
          disabled={
            !date.from ||
            !date.to ||
            !guestName ||
            !email ||
            isLoading ||
            !!propertyLoadError
          }
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
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Reserve Now
            </span>
          )}
        </Button>
        <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>You won&apos;t be charged yet</span>
        </div>
        <div className="text-xs text-center text-muted-foreground mt-2">
          By selecting above, you agree to our terms and cancellation policy.
        </div>
      </CardFooter>
    </Card>
  );
}