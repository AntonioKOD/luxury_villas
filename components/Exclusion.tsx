'use client'

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function Exclusion({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  // This regex matches if the pathname starts with one of the excluded patterns.
  const excludedRegex = /^\/(?:admin|login|signup|properties\/67e76eee09a7f766d5eb4c26\/images|properties\/67e7761309a7f766d5eb531f\/images|admin\/collections\/properties\/67e76eee09a7f766d5eb4c26)/;
  const isExcluded = excludedRegex.test(pathname);
  
  // If the current pathname matches an excluded path, then isExcluded is true and we don't render children.
  return <>{!isExcluded && children}</>;
}