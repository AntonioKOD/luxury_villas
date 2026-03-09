"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Booking flow removed. Redirect to contact for inquiries.
 */
export default function BookPropertyRedirect() {
  const router = useRouter();
  const params = useParams() as { id?: string | string[] };
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    router.replace(id ? `/properties/${id}` : "/contact");
  }, [router, id]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting…</p>
    </div>
  );
}
