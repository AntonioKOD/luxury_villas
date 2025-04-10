import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//import Navbar from "@/components/navbar";
import { Bodoni_Moda } from 'next/font/google';
import "./globals.css";
//import Footer from "@/components/footer";
//import Exclusion from "@/components/Exclusion";
import SuspenseWrapper from "@/components/SuspenseWrapper"; // our client component

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gjovana's Luxury Villas",
  description: "Luxury Villas in Kefalonia, Greece",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bodoni.className} antialiased`}>
       { /*<Exclusion>
          <Navbar />
        </Exclusion> */}
        <SuspenseWrapper>
          {children}
        </SuspenseWrapper>
        { /*<Exclusion>
          <Footer />
        </Exclusion>*/}
      </body>
    </html>
  );
}