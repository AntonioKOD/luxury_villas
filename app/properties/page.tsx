"use client"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Users, Wifi, PocketIcon as Pool, Star, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { getPropertyId } from "@/lib/property-utils"

type PropertyItem = {
  id: string
  name?: string
  address?: string
  images?: Array<{ image?: { url?: string } }>
  [key: string]: unknown
}

export default function VillasPage() {
  const [properties, setProperties] = useState<PropertyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/properties")
        if (!res.ok) {
          setError("Could not load properties.")
          setProperties([])
          return
        }
        const data = await res.json()
        setProperties(Array.isArray(data) ? data : [])
      } catch {
        setError("Could not load properties.")
        setProperties([])
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const firstProperty = properties[0]
  const secondProperty = properties[1]
  const firstId = firstProperty ? getPropertyId(firstProperty as { id?: string; _id?: unknown }) : ""
  const secondId = secondProperty ? getPropertyId(secondProperty as { id?: string; _id?: unknown }) : ""

  return (
    <div className="relative bg-[#f8f7f4] text-[#2a2a2a]">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-[400px] w-1/3 bg-[#e9e5dd] -z-10"></div>
      <div className="absolute right-0 top-[30%] h-[600px] w-1/4 bg-[#e9e5dd] -z-10"></div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header section with more sophisticated typography */}
        <div className="mb-16 max-w-2xl">
          <h1 className="font-serif text-5xl font-light tracking-tight md:text-6xl lg:text-7xl">
            Gjovana&apos;s <span className="italic text-[#3a7e8c]">Luxury</span> Villas
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-[#5a5a5a] md:text-xl">
            Experience the authentic beauty of Kefalonia with our carefully curated collection of luxury accommodations.
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3a7e8c] border-t-transparent" />
            <p className="text-[#5a5a5a]">Loading properties…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <p className="font-medium text-[#b91c1c]">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[#3a7e8c] px-4 py-2 text-white hover:bg-[#2c6270]"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
        <>
        {/* First villa - asymmetrical layout */}
        <div className="mb-32 grid gap-8 md:grid-cols-12">
          <div className="relative md:col-span-8 md:row-span-1">
            <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
              <Image
                unoptimized
                src={firstProperty?.images[0]?.image?.url || "/placeholder.svg?height=1000&width=1500"}
                alt="Gjovana's Luxury Villa 1 with sea view"
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <Badge className="absolute right-6 top-6 bg-white/90 px-3 py-1.5 text-sm font-medium text-black">
                Featured Property
              </Badge>
            </div>

            {/* Overlapping info box */}
            <div className="relative mx-4 -mt-24 rounded-xl bg-white p-6 shadow-xl md:absolute md:bottom-12 md:left-12 md:mt-0 md:max-w-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-3xl font-light">{firstProperty?.name}</h2>
                <div className="flex items-center gap-1.5 rounded-full bg-[#f8f7f4] px-3 py-1">
                  <Star className="h-4 w-4 fill-[#e6b54a] text-[#e6b54a]" />
                  <span className="font-medium">4.9</span>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-[#5a5a5a]">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{firstProperty?.address}</span>
              </div>

              <p className="mb-6 text-[#5a5a5a] text-sm">
                Welcome to Luxury Villa Gjovana&apos;s 1, a contemporary retreat featuring elegant architecture and
                polished concrete finishes with three stylish bedrooms.
              </p>

              <div className="mb-4 grid grid-cols-2 gap-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#3a7e8c]" />
                  <span className="text-sm">6 Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Pool className="h-5 w-5 text-[#3a7e8c]" />
                  <span className="text-sm"> Pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-[#3a7e8c]" />
                  <span className="text-sm">High-Speed Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#3a7e8c]" />
                  <span className="text-sm">Available Year-Round</span>
                </div>
              </div>
              <div>
                <div className="mb-4 bg-[#f8f7f4] p-2 rounded-lg">
                  <p className="text-[#5a5a5a] text-xs">Starting from</p>
                  <p className="text-[#3a7e8c] font-serif text-xl font-medium">
                    €251<span className="text-xs font-normal">/night</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={firstId ? `/properties/${firstId}` : "/properties"}
                    className="inline-flex items-center text-[#3a7e8c] hover:text-[#2c6270] transition-colors bg-transparent border-0 cursor-pointer p-0 font-inherit no-underline"
                  >
                    <span className="border-b border-[#3a7e8c] pb-0.5">View Details</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>

                  <Link
                    href={firstId ? `/properties/${firstId}/book-property` : "/properties"}
                    className="sm:ml-auto w-full sm:w-auto inline-flex items-center justify-center relative overflow-hidden group rounded-full bg-[#3a7e8c] px-6 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-[#2c6270] hover:shadow-xl cursor-pointer border-0 no-underline"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Book Now
                      <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#3a7e8c] to-[#2c6270] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Side images */}
          <div className="grid gap-4 md:col-span-4 md:grid-rows-2">
            <div className="relative h-[240px] overflow-hidden rounded-xl">
              <Image
                unoptimized
                src={firstProperty?.images[0]?.image?.url || "/placeholder.svg?height=600&width=800"}
                alt="Villa Athena interior living room with sea view"
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
              />
            </div>
            <div className="relative h-[240px] overflow-hidden rounded-xl">
              <Image
                unoptimized
                src={firstProperty?.images[1]?.image?.url || "/placeholder.svg?height=600&width=800"}
                alt="Villa Athena terrace with dining area"
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Second villa - reversed layout */}
        <div className="mb-32 grid gap-8 md:grid-cols-12">
          {/* Side images */}
          <div className="order-2 grid gap-4 md:order-1 md:col-span-4 md:grid-rows-2">
            <div className="relative h-[240px] overflow-hidden rounded-xl">
              <Image
                unoptimized
                src={secondProperty?.images[1]?.image?.url || "/placeholder.svg?height=600&width=800"}
                alt="Villa Poseidon interior bedroom with traditional Greek elements"
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
              />
            </div>
            <div className="relative h-[240px] overflow-hidden rounded-xl">
              <Image
                unoptimized
                src={secondProperty?.images[2]?.image?.url || "/placeholder.svg?height=600&width=800"}
                alt="Villa Poseidon outdoor pool area"
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="relative order-1 md:order-2 md:col-span-8">
            <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
              <Image
                unoptimized
                src={secondProperty?.images[0]?.image?.url || "/placeholder.svg?height=1000&width=1500"}
                alt="Villa Poseidon with traditional Greek architecture and sea views"
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Overlapping info box */}
            <div className="relative mx-4 -mt-24 rounded-xl bg-white p-6 shadow-xl md:absolute md:bottom-12 md:right-12 md:mt-0 md:max-w-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-3xl font-light">{secondProperty?.name}</h2>
                <div className="flex items-center gap-1.5 rounded-full bg-[#f8f7f4] px-3 py-1">
                  <Star className="h-4 w-4 fill-[#e6b54a] text-[#e6b54a]" />
                  <span className="font-medium">4.8</span>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-[#5a5a5a]">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{secondProperty?.address}</span>
              </div>

              <p className="mb-6 text-[#5a5a5a] text-sm">
                Welcome to Luxury Villa Gjovana&apos;s 2, a modern retreat nestled in the charming village of Svoronata,
                Greece. This brand-new villa offers a serene escape.
              </p>

              <div className="mb-4 grid grid-cols-2 gap-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#3a7e8c]" />
                  <span className="text-sm">6 Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Pool className="h-5 w-5 text-[#3a7e8c]" />
                  <span className="text-sm">Pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-[#3a7e8c]" />
                  <span className="text-sm">High-Speed Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#3a7e8c]" />
                  <span className="text-sm">Available Year-Round</span>
                </div>
              </div>

              <div>
                <div className="mb-4 bg-[#f8f7f4] p-2 rounded-lg">
                  <p className="text-[#5a5a5a] text-xs">Starting from</p>
                  <p className="text-[#3a7e8c] font-serif text-xl font-medium">
                    €251<span className="text-xs font-normal">/night</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={secondId ? `/properties/${secondId}` : "/properties"}
                    className="inline-flex items-center text-[#3a7e8c] hover:text-[#2c6270] transition-colors bg-transparent border-0 cursor-pointer p-0 font-inherit no-underline"
                  >
                    <span className="border-b border-[#3a7e8c] pb-0.5">View Details</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>

                  <Link
                    href={secondId ? `/properties/${secondId}/book-property` : "/properties"}
                    className="sm:ml-auto w-full sm:w-auto inline-flex items-center justify-center relative overflow-hidden group rounded-full bg-[#3a7e8c] px-6 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-[#2c6270] hover:shadow-xl cursor-pointer border-0 no-underline"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Book Now
                      <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#3a7e8c] to-[#2c6270] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience section */}
        <div className="mb-24">
          <div className="mb-16 max-w-xl">
            <h2 className="font-serif text-4xl font-light md:text-5xl">Elegant Kefalonian Retreat</h2>
            <p className="mt-4 text-lg font-light text-[#5a5a5a]">
              Experience the charm of Greece at Gjovana&apos;s Luxury Villas in Kefalonia. Our villas are more than just
              a place to stay—they are a gateway into the island&apos;s rich heritage blended with refined, modern
              comfort.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl bg-white p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3a7e8c]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative z-10 p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f7f4]">
                  <svg
                    className="h-8 w-8 text-[#3a7e8c]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-medium">Prime Island Settings</h3>
                <p className="text-[#5a5a5a]">
                  Both villas in our collection are meticulously selected for their unmatched location on the enchanting
                  island of Kefalonia. Enjoy complete privacy, breathtaking vistas, and seamless access to local
                  cultural treasures.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-white p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3a7e8c]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative z-10 p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f7f4]">
                  <svg
                    className="h-8 w-8 text-[#3a7e8c]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-medium">Heritage Meets Luxury</h3>
                <p className="text-[#5a5a5a]">
                  Discover a perfect blend of traditional Kefalonian architecture and contemporary elegance. Our villas
                  celebrate the island&apos;s storied past while offering modern amenities for an experience that is as
                  authentic as it is luxurious.
                </p>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  )
}
