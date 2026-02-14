"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { JsonObject, TypeWithID } from "payload"
import { RichText } from "@payloadcms/richtext-lexical/react"
import villaImage from "@/public/first_villa_image.jpg"
import { motion, AnimatePresence } from "motion/react"
import Loader from "@/components/loader"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bed,
  Bath,
  MapPin,
  Camera,
  Star,
  Coffee,
  Wifi,
  Waves,
  Wind,
  Utensils,
  Calendar,
  ChevronRight,
  Users,
} from "lucide-react"
import { Map } from "@/components/map"
import { Separator } from "@/components/ui/separator"
import { getPropertyId, isValidPropertyId } from "@/lib/property-utils"

export default function Property() {
  const params = useParams() as { id?: string | string[] }
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id
  const id = typeof rawId === 'string' ? rawId.trim() : ''
  const [property, setProperty] = useState<(JsonObject & TypeWithID) | null>(null)
  const [notFound, setNotFound] = useState(false)

  const [activeTab, setActiveTab] = useState("overview")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    console.log('[Property page] id from params:', id, 'isValidPropertyId:', isValidPropertyId(id))
    if (!id || !isValidPropertyId(id)) {
      console.log('[Property page] invalid id, showing not found')
      setNotFound(true)
      return
    }
    const url = `/api/properties/${encodeURIComponent(id)}`
    console.log('[Property page] fetching:', url)
    fetch(url)
      .then((res) => {
        console.log('[Property page] response status:', res.status, res.statusText, 'ok:', res.ok)
        return res.ok ? res.json() : null
      })
      .then((result) => {
        if (result == null) {
          console.log('[Property page] no result (null or 404), showing not found')
          setNotFound(true)
        } else {
          console.log('[Property page] property loaded, id:', result?.id ?? '(no id)')
          setProperty(result)
        }
      })
      .catch((err) => {
        console.error('[Property page] fetch error:', err)
        setNotFound(true)
      })

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [id])

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-semibold">Property not found</h1>
        <p className="text-muted-foreground">The property you’re looking for doesn’t exist or the link is invalid.</p>
        <Link href="/properties" className="text-primary underline">
          View all properties
        </Link>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="h-full w-full fixed">
        <Loader />
      </div>
    )
  }

  const propertyDetails = {
    bedrooms: property.bedrooms || 3,
    bathrooms: property.bathrooms || 2,
    location: property.address || "Santorini, Greece",
    price: property.price || 250,
    rating: property.rating || 4.9,
    reviewCount: property.reviewCount || 19,
    guests: property.guests || 6,
  }

  // Sample amenities for the demo
  const propertyId = (getPropertyId(property) || id) ?? ""

  const amenities = [
    { name: "Private Pool", icon: <Waves className="h-5 w-5" /> },
    { name: "Air Conditioning", icon: <Wind className="h-5 w-5" /> },
    { name: "Fully Equipped Kitchen", icon: <Utensils className="h-5 w-5" /> },
    { name: "Free WiFi", icon: <Wifi className="h-5 w-5" /> },
    { name: "Coffee Machine", icon: <Coffee className="h-5 w-5" /> },
    { name: "Available Year-Round", icon: <Calendar className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen">
      {/* Floating header that appears on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-medium truncate max-w-[200px] sm:max-w-md">{property.name}</h2>
                <Badge variant="outline" className="hidden sm:flex">
                  <MapPin className="h-3 w-3 mr-1" />
                  {propertyDetails.location}
                </Badge>
              </div>
                <Link
                  href={`/properties/${propertyId}/book-property`}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Book Now
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${villaImage.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        </div>

        <div className="relative h-full flex flex-col justify-end items-start p-8 md:p-16 max-w-7xl mx-auto">
          <Link
            href={`/properties/${propertyId}/images`}
            className="mb-4 text-white bg-black/30 hover:bg-black/50 transition px-4 py-2 rounded-full flex items-center text-sm group"
          >
            <Camera className="h-4 w-4 mr-2" />
            <span>View all photos</span>
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm mb-3">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span>{propertyDetails.location}</span>
            </div>

            <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">{property.name}</h1>

            <div className="flex flex-wrap items-center gap-6 text-white mt-4">
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-lg">
                <Bed className="h-5 w-5 mr-2" />
                <span>{propertyDetails.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-lg">
                <Bath className="h-5 w-5 mr-2" />
                <span>{propertyDetails.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-lg">
                <Users className="h-5 w-5 mr-2" />
                <span>Up to {propertyDetails.guests} Guests</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-lg">
                <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
                <span>{propertyDetails.rating}</span>
                <span className="text-gray-300 ml-1">({propertyDetails.reviewCount})</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Villa Details */}
          <div className="lg:w-2/3">
            <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8 grid grid-cols-4 h-auto p-1">
                <TabsTrigger value="overview" className={`py-3 ${activeTab === "overview" ? "font-medium" : ""}`}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="amenities" className={`py-3 ${activeTab === "amenities" ? "font-medium" : ""}`}>
                  Amenities
                </TabsTrigger>
                <TabsTrigger value="location" className={`py-3 ${activeTab === "location" ? "font-medium" : ""}`}>
                  Location
                </TabsTrigger>
                <TabsTrigger value="reviews" className={`py-3 ${activeTab === "reviews" ? "font-medium" : ""}`}>
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="prose max-w-none text-lg leading-relaxed">
                  <RichText data={property.description} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-5">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Private pool", "Ocean view", "Free WiFi"].map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        </div>
                        <span className="font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-5">The Space</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 rounded-lg border bg-card/50">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="text-xl font-medium">{propertyDetails.bedrooms}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border bg-card/50">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="text-xl font-medium">{propertyDetails.bathrooms}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border bg-card/50">
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Guests</p>
                      <p className="text-xl font-medium">{propertyDetails.guests}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border bg-card/50">
                      <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-xl font-medium truncate">{propertyDetails.location.split(",")[0]}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {amenity.icon}
                      </div>
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>

                {property.features && property.features.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-5">Additional Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {property.features.map((f: { feature: string }, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>{f.feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <div className="aspect-video bg-muted rounded-xl overflow-hidden border">
                  <Map />
                </div>
                <div className="mt-6 space-y-4">
                  <h3 className="text-2xl font-semibold">Location</h3>
                  <p className="text-muted-foreground text-lg">{propertyDetails.location}</p>
                  <p className="text-muted-foreground">
                    This villa is perfectly situated to enjoy all that the island has to offer. Within walking distance
                    to local restaurants and shops, yet secluded enough to provide privacy and tranquility.
                  </p>

                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-3">Distances</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Beach</span>
                        <span className="text-muted-foreground">300m</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>Town Center</span>
                        <span className="text-muted-foreground">1.5km</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>Airport</span>
                        <span className="text-muted-foreground">12km</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>Restaurant</span>
                        <span className="text-muted-foreground">500m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-8">
                <div className="flex items-start gap-6 p-6 rounded-xl border bg-card/50">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{propertyDetails.rating}</div>
                    <div className="text-sm text-muted-foreground mt-1">out of 5</div>
                  </div>

                  <div className="flex-1">
                    <div className="flex text-yellow-400 text-xl mb-2">
                      {"★".repeat(Math.floor(propertyDetails.rating))}
                      {"☆".repeat(5 - Math.floor(propertyDetails.rating))}
                    </div>
                    <p className="text-muted-foreground">Based on {propertyDetails.reviewCount} reviews</p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-sm">Cleanliness</span>
                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "95%" }}></div>
                        </div>
                        <span className="text-sm">4.8</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-sm">Location</span>
                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "100%" }}></div>
                        </div>
                        <span className="text-sm">5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-sm">Value</span>
                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "90%" }}></div>
                        </div>
                        <span className="text-sm">4.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="p-6 rounded-xl border">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-full bg-muted"></div>
                        <div>
                          <h4 className="font-medium">Guest {index + 1}</h4>
                          <p className="text-sm text-muted-foreground">
                            Stayed in {["June", "July", "August"][index]} 2023
                          </p>
                        </div>
                        <div className="ml-auto flex text-yellow-400">{"★".repeat(5)}</div>
                      </div>
                      <p className="text-muted-foreground">
                        {
                          [
                            "Absolutely stunning villa with breathtaking views. The staff was incredibly attentive and the amenities were top-notch. Can't wait to return!",
                            "We had a wonderful stay at this beautiful property. The location is perfect - close to everything yet private and peaceful. The pool area was our favorite spot to relax.",
                            "This villa exceeded all our expectations. Beautifully designed, immaculately clean, and in the perfect location. The sunset views from the terrace were unforgettable.",
                          ][index]
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="sticky top-24">
              <div className="rounded-xl border overflow-hidden bg-card">
                <div className="p-6">

                  <div className="flex items-center gap-1 mb-6">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{propertyDetails.rating}</span>
                    <span className="text-muted-foreground">({propertyDetails.reviewCount} reviews)</span>
                  </div>

                 
                    <Link
                      href={`/properties/${propertyId}/book-property`}
                      className="block w-full rounded-lg py-6 text-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Book Now
                    </Link>
                </div>
              </div>

              <div className="mt-6 p-6 rounded-xl border bg-card/50">
                <h3 className="font-medium mb-3">Need assistance?</h3>
                <div className="grid gap-3">
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="mt-6 p-6 rounded-xl border bg-card/50">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Instant Booking</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure your dates now with instant confirmation. Free cancellation up to 30 days before arrival.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

