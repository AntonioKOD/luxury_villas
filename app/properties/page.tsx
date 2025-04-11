'use client'
import Image from "next/image"
import { MapPin, Calendar, Users, Wifi, PocketIcon as Pool, Star, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProperties } from "@/actions"
import { JsonObject, TypeWithID } from "payload"
import Link from "next/link"




export default function VillasPage() {
    const [properties, setProperties] = useState<(JsonObject & TypeWithID)[]>([])
    
    useEffect(() => {
        const fetchProperties = async () => {
            const properties = await getProperties()
            setProperties(properties)
            
        }
        fetchProperties()
    }, [])
    const firstProperty = properties[0]
    const secondProperty = properties[1]
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
            Experience the authentic beauty of Kefalonia with our carefully curated collection of luxury
            accommodations.
          </p>
        </div>

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
            <div className="relative mx-4 -mt-24 rounded-xl bg-white p-8 shadow-xl md:absolute md:bottom-12 md:left-12 md:mt-0 md:max-w-md">
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

              <p className="mb-6 text-[#5a5a5a]">
              Welcome to Luxury Villa Gjovana&apos;s 1, a contemporary retreat featuring elegant architecture and polished concrete finishes. The villa offers an airy open-plan living, dining, and kitchen area, along with three stylish bedrooms, two with en-suite wet room showers.
              </p>

              <div className="mb-6 grid grid-cols-2 gap-y-4">
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
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <p className="text-foreground font-medium">
                              Starting from <span className="text-xl text-primary">€{firstProperty?.price}</span>
                              <span className="text-sm">/night</span>
                            </p>
                </div>
                <Link href={`/properties/${firstProperty?.id}`}>
                <Button className="gap-2 rounded-full bg-[#3a7e8c] px-6 hover:bg-[#2c6270]">
                  View Villa <ChevronRight className="h-4 w-4" />
                </Button>
                </Link>
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
            <div className="relative mx-4 -mt-24 rounded-xl bg-white p-8 shadow-xl md:absolute md:bottom-12 md:right-12 md:mt-0 md:max-w-md">
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

              <p className="mb-6 text-[#5a5a5a]">
              Welcome to Luxury Villa Gjovana&apos;s 2, a modern retreat nestled in the charming village of Svoronata, Greece. This brand-new villa offers a serene escape, allowing guests to relax and enjoy their holiday in a stylish and contemporary setting.
              </p>

              <div className="mb-6 grid grid-cols-2 gap-y-4">
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

              <div className="flex items-center justify-between">
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <p className="text-foreground font-medium">
                              Starting from <span className="text-xl text-primary">€{secondProperty?.price}</span>
                              <span className="text-sm">/night</span>
                            </p>
                </div>
                <Link href={`/properties/${secondProperty?.id}`}>
                <Button className="gap-2 rounded-full bg-[#3a7e8c] px-6 hover:bg-[#2c6270]">
                  View Villa <ChevronRight className="h-4 w-4" />
                </Button>
                </Link>
                <Link href={`/properties/${secondProperty?.id}/book-property`}>
                <Button className="gap-2 rounded-full bg-[#3a7e8c] px-6 hover:bg-[#2c6270]">
                  Book Now <ChevronRight className="h-4 w-4" />
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Experience section */}
        <div className="mb-24">
          <div className="mb-16 max-w-xl">
            <h2 className="font-serif text-4xl font-light md:text-5xl">Elegant Kefalonian Retreat</h2>
            <p className="mt-4 text-lg font-light text-[#5a5a5a]">
            Experience the charm of Greece at Gjovana&apos;s Luxury Villas in Kefalonia. Our villas are more than just a place to stay—they are a gateway into the island&apos;s rich heritage blended with refined, modern comfort.
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
                Both villas in our collection are meticulously selected for their unmatched location on the enchanting island of Kefalonia. Enjoy complete privacy, breathtaking vistas, and seamless access to local cultural treasures.
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
                Discover a perfect blend of traditional Kefalonian architecture and contemporary elegance. Our villas celebrate the island’s storied past while offering modern amenities for an experience that is as authentic as it is luxurious.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

