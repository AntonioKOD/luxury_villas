"use client";
import Hero from "@/components/hero";
import ContentSection from "@/components/content-section";
import Villas from "@/components/villa-section";


export default function Home() {

  return (
    
    <div className="min-h-screen overflow-x-hidden">
      <Hero/>
      <ContentSection/>
      <div className="villas">
      <Villas/>
      </div>
    </div>
    
  );
}

