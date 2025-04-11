/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { getProperties } from "@/actions"
import type { JsonObject, TypeWithID } from "payload"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Users, ArrowRight, BedDouble, Bath, Coffee, Waves, Wifi, Sun } from "lucide-react"

// Helper function to extract plain text from rich text JSON
function extractPlainText(richTextContent: any): string {
  let plainText = ""

  function traverse(node: any) {
    if (node.text) {
      plainText += node.text + " "
    }
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(traverse)
    }
  }

  if (richTextContent?.root) {
    traverse(richTextContent.root)
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
  const [properties, setProperties] = useState<(JsonObject & TypeWithID)[]>([])
  const [activeProperty, setActiveProperty] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getProperties().then((properties) => {
      setProperties(properties)
      setIsLoaded(true)

      // Set the first property as active once loaded
      if (properties.length > 0) {
        setActiveProperty(String(properties[0].id))
      }
    })
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
          {/* Property Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:col-span-4 md:sticky md:top-24 space-y-4"
          >
            {properties.map((property) => (
              <div
                key={property.id}
                onClick={() => setActiveProperty(String(property?.id))}
                className={`relative cursor-pointer transition-all duration-300 p-6 rounded-xl border-2 
                  ${
                    activeProperty === property.id
                      ? "border-primary bg-card shadow-lg scale-[1.02]"
                      : "border-transparent bg-card/60 hover:bg-card hover:shadow-md"
                  }`}
              >
                {activeProperty === property.id && (
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
                        src={property.images[0].image.url || "/placeholder.svg"}
                        alt={property.name as string}
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
            ))}
          </motion.div>

          {/* Active Property Details */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              {isLoaded &&
                activeProperty &&
                properties.map((property) => {
                  if (property.id !== activeProperty) return null

                  return (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="animate__fadeIn"
                    >
                      {/* Main Image */}
                      {property.images && property.images.length > 0 && (
                        <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden mb-6">
                          <Image
                            unoptimized
                            src={property.images[0].image.url || "/placeholder.svg"}
                            alt={property.name as string}
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-700 hover:scale-105"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <p className="text-foreground font-medium">
                              Starting from <span className="text-xl text-primary">€{property?.price}</span>
                              <span className="text-sm">/night</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Property Details */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
                            {property.name}
                          </h2>
                          <div className="flex items-center gap-2 text-muted-foreground mb-6">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>{property?.address || "Greece"}</span>
                          </div>
                          <div className="prose max-w-none text-foreground">
                            <p className="text-lg leading-relaxed">{extractPlainText(property.description)}</p>
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
                                <p className="font-medium text-foreground">{property.bedrooms}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <Bath className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Bathrooms</p>
                                <p className="font-medium text-foreground">{property.bathrooms}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Guests</p>
                                <p className="font-medium text-foreground">{property.guests}</p>
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

                          {/* CTA */}
                          <Link href={`/properties/${property.id}`} className="block">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition-colors"
                            >
                              View More Details <ArrowRight className="h-4 w-4" />
                            </motion.button>
                          </Link>

                          <Link href={`/properties/${property.id}/book-property`} className="block">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-4 px-6 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-secondary/90 transition-colors"
                            >
                              Book Now <ArrowRight className="h-4 w-4" />
                            </motion.button>
                          </Link>
                        </div>
                      </div>

                      {/* Gallery */}
                      {property.images && property.images.length > 1 && (
                        <div className="space-y-3">
                          <h3 className="text-xl font-medium text-foreground">Gallery</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {property.images.slice(1, 5).map((image: any, index: number) => (
                              <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-sm"
                              >
                                <Image
                                  unoptimized
                                  src={image.image.url || "/placeholder.svg"}
                                  alt={`${property.name} image ${index + 2}`}
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
                  )
                })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

