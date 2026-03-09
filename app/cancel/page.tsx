"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Booking flow removed. Redirect to home.
 */
export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <p className="text-muted-foreground">Redirecting…</p>
      <Link href="/" className="text-primary underline">
        Go to home
      </Link>
    </div>
  );
}
