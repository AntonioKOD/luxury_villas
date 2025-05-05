"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CreditCard, Coffee, LockKeyhole, Frown, Smile } from "lucide-react"
import Link from "next/link"

export default function PaymentRequiredPage() {
  const [hover, setHover] = useState(false)
  

  // Fun messages that appear when clicking the sad developer



  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 flex flex-col items-center justify-center p-4 overflow-hidden relative" suppressHydrationWarning>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full z-10 border-4 border-dashed border-purple-300"
      >
        <div className="flex justify-center mb-6">
          <motion.div whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 5, 0] }} className="relative">
            <LockKeyhole className="h-20 w-20 text-purple-500" />
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-2 -right-2"
            >
              <CreditCard className="h-8 w-8 text-pink-500" />
            </motion.div>
          </motion.div>
        </div>

        <motion.h1
          className="text-2xl md:text-3xl font-bold text-center text-purple-800 mb-4"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Oops! Developer Payment Required
        </motion.h1>

        <p className="text-gray-600 text-center mb-6">
          The developer of this page has not been paid yet, so the content won&apos;t be accessible until payment is made.
          Let&apos;s fix this together!
        </p>

        <div className="flex justify-center mb-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer relative"
          >
            <div className="relative bg-purple-100 rounded-full p-6">
              {hover ? <Smile className="h-16 w-16 text-yellow-500" /> : <Frown className="h-16 w-16 text-gray-500" />}
            </div>

          </motion.div>
        </div>

        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          <Link href="https://buy.stripe.com/bIY3f61jR3TwapW8wA" passHref>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <CreditCard className="h-5 w-5" />
              Make Payment Now
              <Coffee className="h-5 w-5 ml-1" />
            </Button>
          </Link>
        </motion.div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>After payment, all amazing features will be unlocked!</p>
          <div className="flex justify-center gap-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              >
                <span className="text-yellow-500">★</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
            <Link href="https://codewithtoni.com" className="text-purple-600 hover:text-purple-800">
                Created by Toni
            </Link>
      </motion.div>
    </div>
  )
}
