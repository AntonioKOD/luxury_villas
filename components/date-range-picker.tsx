"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css" // import default v9 styles
import { cn } from "@/lib/utils" // shadcn utility to merge class names
import { buttonVariants } from "@/components/ui/button" // shadcn button styles
import { ChevronLeft, ChevronRight } from "lucide-react"


export type DatePickerProps = React.ComponentProps<typeof DayPicker>

function DatePicker({ className, classNames, ...props }: DatePickerProps) {
  return (
    <DayPicker
      disabled={{before: new Date()}}
      mode="single" // or use "range" for date ranges
      className={cn("p-4 bg-background", className)}
      classNames={{
        // Update the class keys to match v9 defaults:
        root: "rdp-root",
        nav: "flex items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        month_caption: "flex justify-center items-center",
        caption_label: "text-sm font-medium",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: " w-10 font-medium text-sm",
        week: "flex w-full",
        day: "h-10 w-10 text-center text-sm p-0 relative",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0"
        ),
        selected: "bg-primary text-primary-foreground",
        today: "text-black bg-accent/50 rounded-full",
        disabled: "opacity-50",
        range_start: "rounded-full bg-primary text-primary-foreground",
        range_end: "rounded-full bg-primary text-primary-foreground",
        range_middle: "bg-accent/50 rounded-full",
        ...classNames,
      }}
      components={{
        // Override the default navigation icons with a single Chevron component.
        Chevron: ({ orientation, className, ...otherProps }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className={cn("h-4 w-4", className)} {...otherProps} />
        },
      }}
      {...props}
    />
  )
}

export { DatePicker }