"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { QuoteIcon } from "@/components/icons"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

const testimonials = [
  {
    quote:
      "Nexus AI transformed our entire brand identity in ways we never imagined possible. The AI-powered approach delivered results that exceeded all expectations.",
    author: "Sarah Chen",
    role: "CEO, Quantum Finance",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    quote:
      "Working with Nexus was a game-changer. Their unique blend of AI and human creativity produced a visual identity that truly captures our innovative spirit.",
    author: "Marcus Rodriguez",
    role: "Founder, Echo Studios",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    quote:
      "The speed and quality of their AI-powered design process is remarkable. We went from concept to launch in record time without sacrificing creativity.",
    author: "Emily Watson",
    role: "CMO, Neural Health",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
]

const logos = [
  "Quantum",
  "Echo",
  "Neural",
  "Velocity",
  "Apex",
  "Prism",
  "Horizon",
  "Zenith",
]

// Marquee component for smooth infinite scrolling
function Marquee({
  children,
  speed = 30,
}: {
  children: React.ReactNode
  speed?: number
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Render content twice for seamless loop */}
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  )
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref: sectionRef, isVisible } = useInViewAnimation<HTMLElement>()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-4">
        {/* Logos - Infinite Marquee */}
        <div
          className={`mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-center text-sm font-bold uppercase text-white/30 tracking-widest mb-8">
            Trusted by industry leaders
          </span>
          
          {/* Brand Marquee Scroller */}
          <div className="relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            
            <Marquee speed={35}>
              {logos.map((logo, index) => (
                <span
                  key={`${logo}-${index}`}
                  className="text-2xl md:text-4xl font-bold uppercase text-white/20 hover:text-white/40 transition-colors duration-300 mx-8 md:mx-16 cursor-default select-none whitespace-nowrap"
                >
                  {logo}
                </span>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Testimonial */}
        <div
          className={`max-w-5xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Quote */}
          <blockquote className="relative mb-12">
            <QuoteIcon className="absolute -top-8 left-1/2 -translate-x-1/2 text-white/10" />
            <p
              className="text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-relaxed"
              style={{ lineHeight: 1.3 }}
            >
              {testimonials[activeIndex].quote}
            </p>
          </blockquote>

          {/* Author */}
          <div className="flex flex-col items-center">
            <img
              src={testimonials[activeIndex].image}
              alt={testimonials[activeIndex].author}
              className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-white/20"
            />
            <p className="text-lg font-bold uppercase text-white tracking-wide">
              {testimonials[activeIndex].author}
            </p>
            <p className="text-sm text-white/50">
              {testimonials[activeIndex].role}
            </p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
