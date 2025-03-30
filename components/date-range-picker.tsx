"use client"

import type * as React from "react"
import { format } from "date-fns"
import { CalendarRange } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  onDateChangeAction: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({ className, date, onDateChangeAction }: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal rounded-none border-b bg-background hover:bg-background p-4 h-auto",
            )}
          >
            <CalendarRange className="mr-3 h-5 w-5 text-primary" />
            <div className="grid gap-0.5">
              <div className="font-medium">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  "Select dates"
                )}
              </div>
              <div className="text-xs text-muted-foreground">Add your travel dates for exact pricing</div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="bg-background p-3 border-b">
            <div className="space-y-1">
              <h3 className="font-medium tracking-tight">Select dates</h3>
              <p className="text-sm text-muted-foreground">Add your travel dates for exact pricing</p>
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={onDateChangeAction}
            numberOfMonths={1}
            disabled={(date) => date < new Date()}
          />
          <div className="flex items-center justify-end gap-2 p-3 border-t">
            <Button variant="outline" onClick={() => onDateChangeAction(undefined)}>
              Clear
            </Button>
            <Button onClick={() => document.body.click()}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

