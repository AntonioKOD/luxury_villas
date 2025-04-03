"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/useMobile"
import logo from "@/public/logo2_villas.svg" // Adjust the path to your actual logo file

// Only include the essential navigation links
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

// Define paths that should always have the "scrolled" appearance
const scrolledByDefaultPaths = ["/about", "/contact", "/login", "/properties"]

// Fetch user data from the /me endpoint
async function getUser() {
  try {
    const res = await fetch("/api/accounts/me", { credentials: "include" })
    const data = await res.json()
    // Expecting the API to return an object with a "user" property if logged in
    return data && data.user ? data : null
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export default function Navbar() {
  const isMobile = useMobile()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  // Check if current path should have scrolled appearance by default
  const shouldHaveScrolledAppearance = scrolledByDefaultPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )

  // Determine if navbar should have the scrolled appearance
  const hasScrolledAppearance = isScrolled || shouldHaveScrolledAppearance

  // Fetch user data only once when the component mounts
  useEffect(() => {
    getUser().then((fetchedUser) => setUser(fetchedUser))
  }, [])

  // Update navbar style based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle logout and clear user state
  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolledAppearance ? "bg-foreground backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {/* Logo with conditional styling */}
              <div
                className={`relative h-10 w-auto ${hasScrolledAppearance ? "brightness-[1.75] contrast-[1.1]" : ""}`}
              >
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Gjovana's Luxury Villas"
                  height={40}
                  width={150}
                  className="object-contain h-25 -mt-8 w-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 text-xl">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-md font-medium ${
                    hasScrolledAppearance ? "text-background hover:text-primary" : "text-white hover:text-white/90"
                  } ${pathname === href ? "font-bold" : ""}`}
                >
                  {label}
                </Link>
              ))}
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant={hasScrolledAppearance ? "default" : "outline"}
                  className="flex items-center gap-2 px-3 py-2 rounded-md font-medium"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button
                    variant={hasScrolledAppearance ? "default" : "outline"}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
                      !hasScrolledAppearance ? "text-white border-white hover:bg-white/10" : ""
                    }`}
                  >
                    <LogIn size={16} />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="hover:bg-transparent"
            >
              <Menu size={48} className={hasScrolledAppearance ? "text-background" : "text-white"} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 ${
                  pathname === href ? "bg-primary/10 font-bold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            {user ? (
              <Button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                variant="default"
                className="w-full justify-start mt-2 flex items-center gap-2 px-3 py-2 rounded-md font-medium"
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block w-full mt-2">
                <Button
                  variant="outline"
                  className="w-full justify-start flex items-center gap-2 px-3 py-2 rounded-md font-medium"
                >
                  <LogIn size={16} />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

// Logout function that calls the logout endpoint
async function logout() {
  await fetch("http://localhost:3000/api/accounts/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
}

