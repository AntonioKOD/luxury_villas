"use client";
//import Hero from "@/components/hero";
//import ContentSection from "@/components/content-section";
//import Villas from "@/components/villa-section";


export default function Home() {

  return (
    <div>
   {/* <div className="min-h-screen overflow-x-hidden">
      <Hero/>
      <ContentSection/>
      <div className="villas">
      <Villas/>
      </div>

    </div>
    */}

    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Coming Soon</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We&apos;re working hard to bring you something amazing. Our website is under construction.
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Gjovana&apos;s Villas. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}

