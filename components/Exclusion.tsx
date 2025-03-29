'use client'

import { usePathname } from "next/navigation"


import { ReactNode } from "react";

export default function Exclusion({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const excludedPaths = ['/admin', '/login', '/signup', '/properties/67e76eee09a7f766d5eb4c26/images', '/properties/67e7761309a7f766d5eb531f/images'];
    const isExcluded = excludedPaths.includes(pathname);
    return (
        <>
            {!isExcluded && children}
        </>
    )
}