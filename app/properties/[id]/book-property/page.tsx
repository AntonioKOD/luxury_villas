"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import BookingWidget from "@/components/booking-widget";
import { getProperty } from "@/actions";
import type { JsonObject, TypeWithID } from "payload";

export default function PropertyBookingSection() {
  const { id } = useParams() as { id: string | string[] };
  const propertyId = typeof id === "string" ? id : id[0];

  const [property, setProperty] = useState<JsonObject & TypeWithID | null>(null);

  useEffect(() => {
    if (!propertyId) return;
    getProperty(propertyId)
      .then((prop) => setProperty(prop))
      .catch((err) => {
        console.error("Failed to load property:", err);
        setProperty(null);
      });
  }, [propertyId]);

  // Show a loading state until we know the property exists
  if (!property) {
    return <div className="pt-24 px-4">Loading property details…</div>;
  }

  return (
    <div className="pt-24 px-4">
      <BookingWidget
        propertyId={propertyId}
        success_url={`https://www.gjovanasvillas.com/success?property=${propertyId}`}
        cancel_url={`https://www.gjovanasvillas.com/cancel?property=${propertyId}`}
      />
    </div>
  );
}