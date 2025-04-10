"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, CheckCircle2 } from "lucide-react"
import villaImage  from '@/public/first_villa_image.jpg'



export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })
      if (!res.ok) {
        throw new Error("Failed to send message")
      }
    }catch (error) {
      console.error("Error sending message:", error)
      setIsSubmitting(false)
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form and show success message
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <div className="absolute inset-0 bg-foreground/50 z-10" />
        <Image
          src={villaImage}
          alt="Greek villa with sea view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Get in touch with our team to plan your perfect Greek island getaway.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-light text-foreground mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our villas or want to make a reservation? Fill out the form below and our team will
                get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="bg-primary/10 border border-primary rounded-lg p-6 text-center">
                  <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for contacting us. We&apos;ll respond to your inquiry as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Booking Inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans and any specific requirements..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif font-light text-foreground mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Whether you prefer to call, email, or visit us in person, we&apos;re here to assist you with any questions
                about our luxury villas.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground mb-1">For bookings and inquiries:</p>
                    <a href="mailto:info@gjovanasvillas.com" className="text-primary hover:underline">
                      info@gjovanasvillas.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">Call Us on Whatsapp</h3>
                    <p className="text-muted-foreground mb-1">Available 7 days a week, 9am-8pm (GMT+3):</p>
                    <p className="text-foreground hover:text-primary">
                      +1 (617) 372-1232
                    </p>
                  </div>
                </div>

      
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

