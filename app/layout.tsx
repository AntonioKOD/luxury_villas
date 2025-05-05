import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//import Navbar from "@/components/navbar";
import { Bodoni_Moda } from 'next/font/google';
import "./globals.css";
//import Footer from "@/components/footer";
//import Exclusion from "@/components/Exclusion";
//import SuspenseWrapper from "@/components/SuspenseWrapper"; // our client component
import PaymentRequiredPage from "@/components/dev";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${bodoni.className} antialiased`}>
       <PaymentRequiredPage/>
      </body>
    </html>
  );
}