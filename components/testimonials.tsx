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

// Premium brand logos as SVG components - bright white, polished aesthetic
const BrandLogos = {
  Quantum: () => (
    <svg viewBox="0 0 140 32" fill="none" className="h-6 md:h-8 w-auto">
      <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="white"/>
      <path d="M16 10a6 6 0 100 12 6 6 0 000-12zm0 8a2 2 0 110-4 2 2 0 010 4z" fill="white"/>
      <path d="M38 10h3.2l5.6 8.4V10H50v14h-3l-5.8-8.6V24H38V10zm18.4 0h3.2v14h-3.2V10zm9.6 0h3.2v11h6.8v3H66V10zm20.8 0h3.2v14H87V17l-3.6 5.4h-.8L79 17v7h-3.2V10h2.8l4.2 6.2 4-6.2zm12.8 0h10.4v3h-7.2v2.4h6.4v3h-6.4v2.6h7.4v3H99.6V10zm16 0h3.2l5.6 8.4V10h3.2v14h-3l-5.8-8.6V24h-3.2V10z" fill="white"/>
    </svg>
  ),
  Echo: () => (
    <svg viewBox="0 0 100 32" fill="none" className="h-6 md:h-8 w-auto">
      <rect x="4" y="8" width="4" height="16" rx="2" fill="white"/>
      <rect x="12" y="4" width="4" height="24" rx="2" fill="white"/>
      <rect x="20" y="10" width="4" height="12" rx="2" fill="white"/>
      <path d="M36 10h10v3h-6.8v2.4h6v3h-6V21h7v3H36V10zm18.4 7c0-4.2 3-7.2 7.2-7.2 2.6 0 4.8 1.2 6 3.2l-2.8 1.6c-.7-1.2-1.8-1.8-3.2-1.8-2.2 0-4 1.8-4 4.2s1.8 4.2 4 4.2c1.4 0 2.5-.6 3.2-1.8l2.8 1.6c-1.2 2-3.4 3.2-6 3.2-4.2 0-7.2-3-7.2-7.2zm17.6-7h3.2v5.6H81V10h3.2v14H81v-5.4h-5.8V24H72V10zm18.8-.2c4.2 0 7.2 3 7.2 7.2s-3 7.2-7.2 7.2-7.2-3-7.2-7.2 3-7.2 7.2-7.2zm0 11.4c2.2 0 4-1.8 4-4.2s-1.8-4.2-4-4.2-4 1.8-4 4.2 1.8 4.2 4 4.2z" fill="white"/>
    </svg>
  ),
  Neural: () => (
    <svg viewBox="0 0 120 32" fill="none" className="h-6 md:h-8 w-auto">
      <circle cx="8" cy="16" r="4" fill="white"/>
      <circle cx="20" cy="8" r="3" fill="white"/>
      <circle cx="20" cy="24" r="3" fill="white"/>
      <path d="M8 16l12-8M8 16l12 8M20 8v16" stroke="white" strokeWidth="1.5"/>
      <path d="M36 10h3.2l5.6 8.4V10H48v14h-3l-5.8-8.6V24H36V10zm18.4 0h10v3h-6.8v2.4h6v3h-6V21h7v3H54.4V10zm15.8 0h3.2v7.2c0 2.4 1.2 3.8 3.2 3.8s3.2-1.4 3.2-3.8V10h3.2v7.4c0 4.2-2.6 6.8-6.4 6.8s-6.4-2.6-6.4-6.8V10zm18 0h6.8c3.4 0 5.4 2 5.4 4.8 0 2.2-1.2 3.8-3.2 4.4l3.8 4.8h-4l-3.4-4.4h-2.2V24h-3.2V10zm6.4 6.8c1.4 0 2.4-.8 2.4-2s-1-2-2.4-2h-3.2v4h3.2zm13.4-6.8h3l5.2 14h-3.4l-1-2.8h-4.8l-1 2.8h-3.2l5.2-14zm2.8 8.4l-1.6-4.6-1.6 4.6h3.2zm10-8.4h3.2v11h6.8v3H121V10z" fill="white"/>
    </svg>
  ),
  Velocity: () => (
    <svg viewBox="0 0 130 32" fill="none" className="h-6 md:h-8 w-auto">
      <path d="M4 10h3.4l4.6 10 4.6-10h3.4l-6.4 14h-3.2L4 10z" fill="white"/>
      <path d="M22 10h10v3h-6.8v2.4h6v3h-6V21h7v3H22V10zm14.4 0h3.2v11h6.8v3H36.4V10zm15.2-.2c4.2 0 7.2 3 7.2 7.2s-3 7.2-7.2 7.2-7.2-3-7.2-7.2 3-7.2 7.2-7.2zm0 11.4c2.2 0 4-1.8 4-4.2s-1.8-4.2-4-4.2-4 1.8-4 4.2 1.8 4.2 4 4.2zm14-11.2c4.2 0 7 3 7 7.2s-2.8 7.2-7 7.2-7-3-7.2-7.2 2.8-7.2 7.2-7.2zm0 11.4c2.2 0 3.8-1.8 3.8-4.2s-1.6-4.2-3.8-4.2-3.8 1.8-3.8 4.2 1.6 4.2 3.8 4.2zm14.4-11.4c4 0 6.4 2.6 6.4 6.8V24h-3.2v-7.2c0-2.4-1.2-3.8-3.2-3.8s-3.2 1.4-3.2 3.8V24H97V10h3.2v1.4c.8-1 2.2-1.6 3.8-1.6zm12.6 0h3.2v14h-3.2V10zm9.8 0h10.4v3h-3.6v11h-3.2V13h-3.6v-3zm14.2 0h3.2l-4.6 8.2V24h-3.2v-5.8L108.4 10h3.4l2.8 5 2.8-5z" fill="white"/>
      <path d="M8 16l8-6v12l-8-6z" fill="white" fillOpacity="0.3"/>
    </svg>
  ),
  Apex: () => (
    <svg viewBox="0 0 100 32" fill="none" className="h-6 md:h-8 w-auto">
      <path d="M4 24l8-14h3l8 14h-3.4l-1.6-3H9l-1.6 3H4zm6.4-6h5.2l-2.6-5-2.6 5z" fill="white"/>
      <path d="M26 10h6.8c3.8 0 6.2 2.2 6.2 5.4 0 3.2-2.4 5.4-6.2 5.4H29.2V24H26V10zm6.4 7.8c2 0 3.2-1 3.2-2.4s-1.2-2.4-3.2-2.4H29.2v4.8h3.2zm10.6-7.8h10v3H46.2v2.4h6v3h-6V21h7.2v3H43V10zm14.6 0h3.4l3.2 5 3.2-5h3.4l-5 7.4 5.2 6.6h-3.4L64.2 19l-3.4 5h-3.4l5.2-6.6-5-7.4z" fill="white"/>
      <polygon points="16,4 20,12 12,12" fill="white" fillOpacity="0.4"/>
    </svg>
  ),
  Prism: () => (
    <svg viewBox="0 0 110 32" fill="none" className="h-6 md:h-8 w-auto">
      <path d="M4 8l12 8-12 8V8z" fill="white"/>
      <path d="M8 16l8-5.3v10.6L8 16z" fill="white" fillOpacity="0.4"/>
      <path d="M28 10h6.8c3.8 0 6.2 2.2 6.2 5.4 0 3.2-2.4 5.4-6.2 5.4h-3.6V24H28V10zm6.4 7.8c2 0 3.2-1 3.2-2.4s-1.2-2.4-3.2-2.4h-3.2v4.8h3.2zm10.6-7.8h6.8c3.4 0 5.4 2 5.4 4.8 0 2.2-1.2 3.8-3.2 4.4l3.8 4.8h-4l-3.4-4.4H48V24h-3V10zm6.4 6.8c1.4 0 2.4-.8 2.4-2s-1-2-2.4-2H48v4h3.4zm10.6-6.8h3.2v14H62V10zm8 7.8l-4.2-7.8h3.6l2.4 4.8 2.4-4.8h3.6l-4.2 7.8V24h-3.6v-6.2zm14.8-7.8h4.8l3.6 9.6 3.6-9.6h4.8v14h-3.2v-9.8l-3.8 9.8h-2.8l-3.8-9.8V24h-3.2V10z" fill="white"/>
    </svg>
  ),
  Horizon: () => (
    <svg viewBox="0 0 130 32" fill="none" className="h-6 md:h-8 w-auto">
      <path d="M4 16c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="3" fill="white"/>
      <path d="M36 10h3.2v5.6h5.6V10H48v14h-3.2v-5.4h-5.6V24H36V10zm17.2-.2c4.2 0 7.2 3 7.2 7.2s-3 7.2-7.2 7.2-7.2-3-7.2-7.2 3-7.2 7.2-7.2zm0 11.4c2.2 0 4-1.8 4-4.2s-1.8-4.2-4-4.2-4 1.8-4 4.2 1.8 4.2 4 4.2zm12-11.2h6.8c3.4 0 5.4 2 5.4 4.8 0 2.2-1.2 3.8-3.2 4.4l3.8 4.8h-4l-3.4-4.4H68.4V24h-3.2V10zm6.4 6.8c1.4 0 2.4-.8 2.4-2s-1-2-2.4-2h-3.2v4h3.2zm10.4-6.8h3.2v14H82V10zm8.2 0h11v3h-3.9v11h-3.2V13H86v-3zm14.4 0h3.2l5.6 8.4V10h3.2v14h-3l-5.8-8.6V24h-3.2V10z" fill="white"/>
    </svg>
  ),
  Zenith: () => (
    <svg viewBox="0 0 110 32" fill="none" className="h-6 md:h-8 w-auto">
      <path d="M4 10h11l-7 11h8v3H4l7-11H4v-3z" fill="white"/>
      <path d="M20 10h10v3h-6.8v2.4h6v3h-6V21h7v3H20V10zm14.6 0h3.2l5.6 8.4V10H47v14h-3l-5.8-8.6V24h-3.2V10zm16.8 0h3.2v14h-3.2V10zm10.8 0h10.4v3H69v11h-3.2V13h-3.6v-3zm13.4 0h3.2v5.6h5.6V10H88v14h-3.2v-5.4h-5.6V24h-3.2V10z" fill="white"/>
      <path d="M10 8l4 4H6l4-4z" fill="white" fillOpacity="0.5"/>
    </svg>
  ),
}

// Premium logo marquee component
function LogoMarquee({ speed = 30 }: { speed?: number }) {
  const logoKeys = Object.keys(BrandLogos) as Array<keyof typeof BrandLogos>
  
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex items-center"
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
        {/* First set */}
        <div className="flex shrink-0 items-center">
          {logoKeys.map((key) => {
            const LogoComponent = BrandLogos[key]
            return (
              <div
                key={`logo-1-${key}`}
                className="flex items-center justify-center px-8 md:px-14 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <LogoComponent />
              </div>
            )
          })}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center">
          {logoKeys.map((key) => {
            const LogoComponent = BrandLogos[key]
            return (
              <div
                key={`logo-2-${key}`}
                className="flex items-center justify-center px-8 md:px-14 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <LogoComponent />
              </div>
            )
          })}
        </div>
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
        {/* Industry Leaders Section */}
        <div
          className={`mb-20 md:mb-28 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase text-white/40 tracking-[0.2em] mb-4">
              Trusted Partners
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Industry Leaders Choose Nexus
            </h3>
          </div>
          
          {/* Logo Marquee */}
          <div className="relative">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
            
            <LogoMarquee speed={25} />
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
              crossOrigin="anonymous"
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
