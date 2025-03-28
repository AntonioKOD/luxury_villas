"use client"


import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/useMobile"


const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/villa-1", label: "Villa 1" },
  { href: "/villa-2", label: "Villa 2" },
  
]


export default function Navbar() {
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-foreground backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl  font-bold text-white">
              Gjovana&apos;s Luxury Villas
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 text-xl">
            {isScrolled ? (
               (links.map(({href, label})=> (
                <Link key={href} href={href} className="text-background hover:text-primary px-3 py-2 rounded-md font-medium">
                  {label}
                </Link>
               )))
            ) : (
                (links.map(({href, label})=> (
                    <Link key={href} href={href} className="text-white hover:text-white/90 px-3 py-2 rounded-md font-medium">
                    {label}
                    </Link>
                 ))
                ))}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          {isScrolled ? (
            <div className='md:hidden'>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <Menu size={48} className='text-black' />
            </Button>
            </div>
          ) : (
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <Menu size={48} className='text-white' />
            </Button>
          </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/villa-1"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
           Villa 1
            </Link>
            <Link
              href="/villa-2"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Villa 2
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

