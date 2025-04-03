// components/SuspenseWrapper.tsx
"use client";
import { Suspense } from "react";
import Loader from "@/components/loader";

export default function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader />
      </div>
    }>
      {children}
    </Suspense>
  );
}