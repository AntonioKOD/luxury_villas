"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CreditCard, Coffee, LockKeyhole, Frown, Smile } from "lucide-react"
import Link from "next/link"

export default function PaymentRequiredPage() {
  const [hover, setHover] = useState(false)
  const [count, setCount] = useState(0)

  // Fun messages that appear when clicking the sad developer
  const messages = [
    "Ouch! I'm hungry...",
    "My coffee fund is empty!",
    "Ramen again tonight?",
    "Help a dev out!",
    "Bills are piling up!",
    "Need. Coffee. Now.",
    "My cat needs premium food!",
    "My keyboard needs new keycaps!",
  ]

  const [message, setMessage] = useState(messages[0])

  const handleDeveloperClick = () => {
    setCount(count + 1)
    setMessage(messages[count % messages.length])
  }

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
            onClick={handleDeveloperClick}
            className="cursor-pointer relative"
          >
            <div className="relative bg-purple-100 rounded-full p-6">
              {hover ? <Smile className="h-16 w-16 text-yellow-500" /> : <Frown className="h-16 w-16 text-gray-500" />}
            </div>

            {count > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 left-0 right-0 bg-purple-800 text-white text-sm py-1 px-3 rounded-full text-center"
              >
                {message}
              </motion.div>
            )}
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

      <motion.p
        className="text-purple-800 mt-8 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        This is just a fun demo page. No actual payment required!
      </motion.p>
    </div>
  )
}
