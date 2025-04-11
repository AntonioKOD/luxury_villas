"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowUp } from "lucide-react"
import gsap from "gsap"
import logo from '@/public/logo_villas.svg'

import Image from "next/image"
export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate footer on load
    if (footerRef.current) {
      gsap.fromTo(footerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer ref={footerRef} className="bg-card text-card-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Image src={logo} alt="Construct Concepts" width={200} height={40} className="-mt-12"/>
            <p className="text-muted-foreground mb-6">
            Two Unique Villas, One Unforgettable Island
            </p>
            <div className=" -mt-6 -mx-8">
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  Villas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground">
              Svoronata, Greece
            </address>
            <p className="mt-4 text-muted-foreground">
              <strong>Whatsapp:</strong> +1 (617) 372-1232
            </p>
            <p className="text-muted-foreground">
              <strong>Email:</strong> info@gjovanasvillas.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GJOVANA&apos;S VILLAS. All rights reserved.| Designed by{" "} <Link href='https://codewithtoni.com' className="font-bold underline">codeWithToni</Link>
          </p>
          <div className="flex items-center">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-accent/10 hover:bg-accent hover:text-white transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

