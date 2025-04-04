"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import BookingWidget from "@/components/booking-widget" 
import { getProperty } from "@/actions"
import { JsonObject, TypeWithID } from "payload"


export default function PropertyBookingSection() {
  const { id } = useParams() as { id: string | string[] }
  const [property, setProperty] = useState<JsonObject & TypeWithID | null>(null)


  useEffect(() => {
    if (!id) return
    if (typeof id === "string") {
      getProperty(id).then((property) => setProperty(property))
    }
  }, [id])

  if (!id) {
    return <div>Loading property details…</div>
  }

  return (
    // "pt-24" provides top padding so content doesn't overlap with a fixed navbar.
    <div className="pt-24 px-4">
      <BookingWidget propertyId={typeof id === "string" ? id : id[0]} price={property?.price} priceId={property?.priceId} success_url="http://www.gjovanasvillas.com/success" cancel_url="http://www.gjovanasvillas.com/cancel"/>
    </div>
  )
}