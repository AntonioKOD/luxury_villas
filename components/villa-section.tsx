"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { getPropertyId } from "@/lib/property-utils"
import { MapPin, Users, ArrowRight, BedDouble, Bath, Coffee, Waves, Wifi, Sun } from "lucide-react"

type PropertyItem = {
  id: string
  name?: string
  address?: string
  description?: unknown
  images?: Array<{ image?: { url?: string }; category?: string }>
  bedrooms?: number
  bathrooms?: number
  guests?: number
  [key: string]: unknown
}

interface LexicalTextNode {
  text?: string
  children?: LexicalNode[]
}
type LexicalNode = LexicalTextNode
interface RichTextRoot {
  root?: { children?: LexicalNode[] }
}

function extractPlainText(richTextContent: RichTextRoot | null | undefined): string {
  let plainText = ""

  function traverse(node: LexicalNode) {
    if (node.text) {
      plainText += node.text + " "
    }
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(traverse)
    }
  }

  if (richTextContent?.root?.children) {
    richTextContent.root.children.forEach(traverse)
  }

  return plainText.trim()
}

// Helper function to limit the number of words in a string
function limitWords(text: string, wordLimit: number): string {
  const words = text.split(/\s+/)
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."
  }
  return text
}

export default function Villas() {
  const [properties, setProperties] = useState<PropertyItem[]>([])
  const [activeProperty, setActiveProperty] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProperties = () => {
    setError(null)
    setIsLoaded(false)
    fetch("/api/properties")
      .then((res) => {
        if (!res.ok) {
          setError("Could not load properties.")
          setIsLoaded(true)
          return []
        }
        return res.json()
      })
      .then((data: PropertyItem[] | unknown) => {
        // Support raw array or wrapped { data } / { docs }
        const raw = data as Record<string, unknown> | unknown[]
        const list = Array.isArray(data)
          ? data
          : raw && typeof raw === 'object' && !Array.isArray(raw) && Array.isArray((raw as { data?: unknown[] }).data)
            ? (raw as { data: PropertyItem[] }).data
            : raw && typeof raw === 'object' && !Array.isArray(raw) && Array.isArray((raw as { docs?: unknown[] }).docs)
              ? (raw as { docs: PropertyItem[] }).docs
              : []
        setProperties(list)
        setError(null)
        setIsLoaded(true)
        if (list.length > 0) {
          const first = list[0] as Record<string, unknown>
          const firstId =
            getPropertyId(first as { id?: string; _id?: unknown }) ||
            (typeof first.id === 'string' ? first.id : first.id != null ? String(first.id) : '') ||
            (first._id != null && typeof (first._id as { toString?: () => string }).toString === 'function'
              ? (first._id as { toString: () => string }).toString()
              : '')
          setActiveProperty(firstId || null)
        } else {
          setActiveProperty(null)
        }
      })
      .catch(() => {
        setError("Could not load properties.")
        setIsLoaded(true)
      })
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <div className="relative bg-background min-h-screen">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1/3 h-96 bg-gradient-to-br from-muted/50 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-80 bg-gradient-to-tl from-muted/50 to-transparent rounded-tl-full"></div>

      <div className="container relative mx-auto px-4 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6">
            Two Unique Villas, <span className="italic text-primary">One Unforgettable Island</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Experience the authentic beauty of Greece through our carefully curated selection of luxury accommodations,
            each with its own distinct character and charm.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Loading state */}
          {!isLoaded && !error && (
            <div className="md:col-span-12 flex flex-col items-center justify-center gap-4 py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-muted-foreground">Loading villas…</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="md:col-span-12 flex flex-col items-center justify-center gap-4 py-16 text-center">
              <p className="text-destructive font-medium">{error}</p>
              <button
                type="button"
                onClick={() => fetchProperties()}
                className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state - no properties after load */}
          {isLoaded && !error && properties.length === 0 && (
            <div className="md:col-span-12 flex flex-col items-center justify-center gap-4 py-16 text-center">
              <p className="text-muted-foreground">No villas to display at the moment.</p>
            </div>
          )}

          {/* Property Navigation - only when loaded, no error, and we have properties */}
          {isLoaded && !error && properties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:col-span-4 md:sticky md:top-24 space-y-4"
          >
            {properties.map((property) => {
              const propId = getPropertyId(property as { id?: string; _id?: unknown })
              return (
              <div
                key={propId || (property.name ?? `villa-${Math.random()}`)}
                onClick={() => propId && setActiveProperty(propId)}
                className={`relative cursor-pointer transition-all duration-300 p-6 rounded-xl border-2 
                  ${
                    activeProperty === propId
                      ? "border-primary bg-card shadow-lg scale-[1.02]"
                      : "border-transparent bg-card/60 hover:bg-card hover:shadow-md"
                  }`}
              >
                {activeProperty === propId && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"
                  />
                )}

                <div className="flex items-center gap-4">
                  {property.images && property.images.length > 0 && (
                    <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-card shadow-sm flex-shrink-0">
                      <Image
                        unoptimized
                        src={property.images[0]?.image?.url || "/placeholder.svg"}
                        alt={(property.name as string) ?? "Villa"}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground">{property.name}</h3>
                    <div className="flex items-center mt-1 text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property?.address || "Greece"}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-muted-foreground text-sm hidden md:block">
                  {limitWords(extractPlainText(property?.description), 15)}
                </p>
              </div>
              );
            })}
          </motion.div>
          )}

          {/* Active Property Details - only when loaded, no error, and we have properties */}
          {isLoaded && !error && properties.length > 0 && (() => {
            const activeDoc =
              properties.find((p) => getPropertyId(p as { id?: string; _id?: unknown }) === activeProperty) ??
              properties[0]
            const propId = getPropertyId(activeDoc as { id?: string; _id?: unknown }) || 'active'
            return (
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
                    <motion.div
                      key={propId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="animate__fadeIn"
                    >
                      {/* Main Image */}
                      {activeDoc.images && activeDoc.images.length > 0 && (
                        <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden mb-6">
                          <Image
                            unoptimized
                            src={activeDoc.images[0]?.image?.url || "/placeholder.svg"}
                            alt={(activeDoc.name as string) ?? "Villa"}
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-700 hover:scale-105"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <p className="text-foreground font-medium">
                              Starting from <span className="text-xl text-primary">€251</span>
                              <span className="text-sm">/night</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Property Details */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
                            {activeDoc.name}
                          </h2>
                          <div className="flex items-center gap-2 text-muted-foreground mb-6">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>{activeDoc?.address || "Greece"}</span>
                          </div>
                          <div className="prose max-w-none text-foreground">
                            <p className="text-lg leading-relaxed">{extractPlainText(activeDoc.description)}</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Property features */}
                          <div className="grid grid-cols-2 gap-4 p-5 bg-card rounded-xl shadow-sm border border-border">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <BedDouble className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Bedrooms</p>
                                <p className="font-medium text-foreground">{activeDoc.bedrooms}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <Bath className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Bathrooms</p>
                                <p className="font-medium text-foreground">{activeDoc.bathrooms}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Guests</p>
                                <p className="font-medium text-foreground">{activeDoc.guests}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <Coffee className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Fully Equipped</p>
                                <p className="font-medium text-foreground">Kitchen</p>
                              </div>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="p-5 bg-card rounded-xl shadow-sm border border-border">
                            <h3 className="text-lg font-medium text-foreground mb-4">Top Amenities</h3>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <Waves className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-foreground">Private pool</span>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <Sun className="h-4 w-4 text-accent" />
                                </div>
                                <span className="text-foreground">Ocean view</span>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <Wifi className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-foreground">Free WiFi</span>
                              </div>
                            </div>
                          </div>

                          {/* CTA - only when we have a real property id (not fallback) */}
                          {propId && propId !== 'active' && (
                            <>
                              <Link href={`/properties/${propId}`}>
                                <motion.span
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition-colors cursor-pointer text-center border-0 block"
                                >
                                  View More Details <ArrowRight className="h-4 w-4" />
                                </motion.span>
                              </Link>

                              <Link href={`/properties/${propId}/book-property`}>
                                <motion.span
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-full py-4 px-6 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-secondary/90 transition-colors cursor-pointer text-center border-0 block"
                                >
                                  Book Now <ArrowRight className="h-4 w-4" />
                                </motion.span>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Gallery */}
                      {activeDoc.images && activeDoc.images.length > 1 && (
                        <div className="space-y-3">
                          <h3 className="text-xl font-medium text-foreground">Gallery</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {activeDoc.images.slice(1, 5).map((image: { image?: { url?: string }; category?: string }, index: number) => (
                              <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-sm"
                              >
                                <Image
                                  unoptimized
                                  src={image.image?.url || "/placeholder.svg"}
                                  alt={`${activeDoc.name} image ${index + 2}`}
                                  fill
                                  style={{ objectFit: "cover" }}
                                  className="transition-transform duration-500 hover:scale-110"
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
            </AnimatePresence>
          </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

