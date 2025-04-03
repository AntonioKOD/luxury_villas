import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import villaImage from '@/public/first_villa_image.jpg'
import firstImage from '@/public/first_image.jpg'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <div className="absolute inset-0 bg-foreground/50 z-10" />
        <Image
          src={villaImage}
          alt="Aerial view of Greek villas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">About Our Villas</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Discover the story behind Gjovana&apo;ss Luxury Villas and our commitment to providing unforgettable experiences
            in Greece.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010 by Gjovana Papavasiliou, our villa collection began with a single property on
                  Santorini that had been in the family for generations. Gjovana&apos;s vision was to share the authentic
                  Greek island experience with travelers seeking more than just a typical holiday.
                </p>
                <p>
                  Over the years, we carefully expanded our portfolio to include a second exclusive property, each one
                  personally selected for its unique character, breathtaking location, and ability to provide an
                  immersive Greek experience.
                </p>
                <p>
                  Today, Gjovana&apos;s Luxury Villas represents the finest in Greek hospitality, combining traditional
                  architecture with modern luxury and personalized service that makes each stay truly memorable.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/properties">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Explore Our Villas</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              <Image
                src={firstImage}
                alt="A beatutiful view in Kefalonia"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-12 text-center">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-serif">1</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Authentic Experience</h3>
              <p className="text-muted-foreground">
                We believe in providing an authentic Greek experience, from architecture that respects local traditions
                to curated experiences that connect you with the culture and people of the islands.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <span className="text-secondary text-2xl font-serif">2</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Personalized Service</h3>
              <p className="text-muted-foreground">
                Every guest is unique, which is why we offer personalized service tailored to your preferences. From
                pre-arrival planning to daily concierge assistance, we&apos;re here to make your stay perfect.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <span className="text-accent text-2xl font-serif">3</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Sustainable Luxury</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to sustainable practices that respect the natural beauty of the Greek islands. Our
                villas incorporate eco-friendly features while maintaining the highest standards of luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-12 text-center">
            What Our Guests Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-accent text-xl mb-4">★★★★★</div>
              <p className="text-foreground italic mb-6">
                &quot;Our stay at Villa Athena exceeded all expectations. The views were breathtaking, the villa was
                immaculate, and the staff went above and beyond to make our family vacation special.&quot;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div className="ml-4">
                  <p className="font-medium text-foreground">Sarah & Michael</p>
                  <p className="text-sm text-muted-foreground">London, UK</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-accent text-xl mb-4">★★★★★</div>
              <p className="text-foreground italic mb-6">
                &quot;Villa Poseidon was the perfect setting for our honeymoon. The privacy, the stunning sea views, and the
                thoughtful touches made it an unforgettable experience. We&apos;re already planning our return!&quot;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div className="ml-4">
                  <p className="font-medium text-foreground">Elena & Thomas</p>
                  <p className="text-sm text-muted-foreground">New York, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

