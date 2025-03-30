"use client"

import { useParams } from "next/navigation"
import { getProperty } from "@/actions"
import { useEffect, useState } from "react"
import { JsonObject, TypeWithID } from "payload"
import { RichText } from '@payloadcms/richtext-lexical/react'
import villaImage from '@/public/first_villa_image.jpg'
import { motion } from 'motion/react'
import Loader from "@/components/loader"
import Link from "next/link"
import BookingWidget from "@/components/booking-widget"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, MapPin,Camera, ArrowLeft } from 'lucide-react'
import { Map } from "@/components/map"

export default function Property() {
  const { id } = useParams() as { id: string | string[] }
  const [property, setProperty] = useState<JsonObject & TypeWithID | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!id) return
    if (typeof id === 'string') {
      getProperty(id).then((property) => setProperty(property))
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [id])

  if (!property) {
    return <div className="h-full w-full fixed"><Loader /></div>
  }


  const propertyDetails = {
    bedrooms: property.bedrooms || 3,
    bathrooms: property.bathrooms || 2,
    location: property.address,
    price: property.price || 250,
    rating: property.rating || 4.9,
    reviewCount: property.reviewCount || 19
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="relative h-[70vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${villaImage.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-end items-start p-8 md:p-16 max-w-7xl mx-auto">
          <Link 
            href={`/properties/${id}/images`} 
            className="mb-4 text-white bg-black/30 hover:bg-black/50 transition px-4 py-2 rounded-full flex items-center text-sm"
          >
            <Camera className="h-4 w-4 mr-2" />
            View all photos
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Badge className="mb-3">{propertyDetails.location}</Badge>
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-2">
              {property.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white mt-4">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-2" />
                <span>{propertyDetails.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2" />
                <span>{propertyDetails.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{propertyDetails.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{propertyDetails.rating}</span>
                <span className="text-gray-300 ml-1">({propertyDetails.reviewCount} reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Villa Details */}
          <div className="lg:w-2/3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="prose max-w-none">
                  <RichText data={property.description} />
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Private pool', 'Ocean view', 'Daily cleaning', 'Free WiFi'].map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg border">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities">
                {property.features && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((f: { feature: string }, index: number) => (
                      <div key={index} className="flex items-start gap-2 p-3 rounded-lg border">
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                        <span>{f.feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="location">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Map/>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Address</h3>
                  <p className="text-muted-foreground">{propertyDetails.location}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">{propertyDetails.rating}</span>
                    <div>
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(propertyDetails.rating))}
                        {'☆'.repeat(5 - Math.floor(propertyDetails.rating))}
                      </div>
                      <p className="text-sm text-muted-foreground">{propertyDetails.reviewCount} reviews</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">Reviews would be displayed here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="sticky top-8">
              <BookingWidget 
                price={propertyDetails.price} 
                propertyId={typeof id === 'string' ? id : id[0]} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
