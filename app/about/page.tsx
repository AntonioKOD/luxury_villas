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
  Nestled on the breathtaking island of Kefalonia, our family-owned villas embody the spirit of authentic Greek hospitality. With a rich heritage passed down through generations, every detail of our service is crafted to ensure you experience the true essence of island living.
</p>
<p>
  We pride ourselves on delivering exceptional service that is both warm and personalized. From the moment you arrive, you’re greeted like family, with every need anticipated and every detail attended to, ensuring your stay is as relaxing as it is memorable.
</p>
<p>
  Embracing the charm and traditions of Kefalonia, our villas blend timeless elegance with modern comforts. Whether you’re seeking a peaceful retreat or a base for exploring the island’s stunning landscapes, our commitment to excellence guarantees an unforgettable experience.
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
                &quot;A fabulous brand new villa, with high quality modern amenities, well equipped kitchen and  very comfy beds. It had a lovely infinity pool and outdoor area with views down to the coast. About 15 mins drive into Argostoli and some lovely beaches nearby. Airport close but that was an advantage and you really are not bothered by any noise, the area around the villa is very quiet. Communication with the host was good, very attentive. We definitely would highly recommend this villa and would definitely return.&quot;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div className="ml-4">
                  <p className="font-medium text-foreground">Russell</p>
                  <p className="text-sm text-muted-foreground">Stayed about a weel</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-accent text-xl mb-4">★★★★★</div>
              <p className="text-foreground italic mb-6">
              &quot;We spent a week at this great villa. It was a dream, we felt very comfortable and well rested. The hostess is very nice and helps with questions. The view and tranquility are wonderful. You definitely need a car, you have to plan longer trips if you want to go to Myrtos Beach or Fiskardo, for example. Duration about 50 minutes to about over an hour, you have to know that.&quot;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div className="ml-4">
                  <p className="font-medium text-foreground">Kathryn</p>
                  <p className="text-sm text-muted-foreground">Stayed about a week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

