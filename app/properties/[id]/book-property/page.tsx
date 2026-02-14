"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BookingWidget from "@/components/booking-widget";
import type { JsonObject, TypeWithID } from "payload";
import { isValidPropertyId } from "@/lib/property-utils";

export default function PropertyBookingSection() {
  const params = useParams() as { id?: string | string[] };
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const propertyId = typeof rawId === 'string' ? rawId.trim() : '';

  const [property, setProperty] = useState<JsonObject & TypeWithID | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!propertyId || !isValidPropertyId(propertyId)) {
      setNotFound(true);
      return;
    }
    fetch(`/api/properties/${encodeURIComponent(propertyId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((prop) => {
        if (prop == null) setNotFound(true);
        else setProperty(prop);
      })
      .catch(() => setNotFound(true));
  }, [propertyId]);

  if (notFound) {
    return (
      <div className="pt-24 px-4 text-center">
        <p className="mb-4">Property not found.</p>
        <Link href="/properties" className="text-primary underline">View all properties</Link>
      </div>
    );
  }

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