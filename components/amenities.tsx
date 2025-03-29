"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AmenitiesProps {
  features: string[]
}

export default function Amenities({ features }: AmenitiesProps) {
  const INITIAL_COUNT = 3
  const [open, setOpen] = useState(false)

  // Show only the first few features in the main view
  const displayedFeatures = features.slice(0, INITIAL_COUNT)

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Amenities</h2>
      <ul className="list-disc ml-5 space-y-1">
        {displayedFeatures.map((feature, index) => (
          <li key={index} className="text-muted-foreground">
            {feature}
          </li>
        ))}
      </ul>

      {features.length > INITIAL_COUNT && (
        <Button onClick={() => setOpen(true)} variant="link" className="mt-2 p-0 h-auto font-medium">
          Show all {features.length} amenities
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>All Amenities</DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}


