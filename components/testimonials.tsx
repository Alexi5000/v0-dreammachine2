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

// Premium brand logos as SVG components - refined, high-end designs
const BrandLogos = {
  Quantum: () => (
    <svg viewBox="0 0 160 40" fill="none" className="h-8 md:h-10 w-auto">
      {/* Quantum mark - orbital electron paths */}
      <g className="transform-gpu">
        <ellipse cx="20" cy="20" rx="14" ry="6" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(-30 20 20)"/>
        <ellipse cx="20" cy="20" rx="14" ry="6" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(30 20 20)"/>
        <ellipse cx="20" cy="20" rx="14" ry="6" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(90 20 20)"/>
        <circle cx="20" cy="20" r="3.5" fill="white"/>
        <circle cx="28" cy="12" r="2" fill="white"/>
        <circle cx="12" cy="28" r="2" fill="white"/>
        <circle cx="28" cy="28" r="1.5" fill="white" opacity="0.7"/>
      </g>
      {/* Wordmark */}
      <text x="44" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.02em">QUANTUM</text>
    </svg>
  ),
  Echo: () => (
    <svg viewBox="0 0 130 40" fill="none" className="h-8 md:h-10 w-auto">
      {/* Echo mark - sound wave ripples */}
      <g className="transform-gpu">
        <path d="M20 10 C24 10, 28 14, 28 20 C28 26, 24 30, 20 30" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M20 14 C22 14, 24 16, 24 20 C24 24, 22 26, 20 26" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M20 18 C21 18, 21.5 19, 21.5 20 C21.5 21, 21 22, 20 22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="14" cy="20" r="4" fill="white"/>
      </g>
      {/* Wordmark */}
      <text x="40" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.08em">ECHO</text>
    </svg>
  ),
  Neural: () => (
    <svg viewBox="0 0 150 40" fill="none" className="h-8 md:h-10 w-auto">
      {/* Neural mark - network nodes */}
      <g className="transform-gpu">
        <circle cx="12" cy="20" r="4" fill="white"/>
        <circle cx="24" cy="10" r="3" fill="white"/>
        <circle cx="24" cy="30" r="3" fill="white"/>
        <circle cx="36" cy="16" r="2.5" fill="white"/>
        <circle cx="36" cy="24" r="2.5" fill="white"/>
        <line x1="12" y1="20" x2="24" y2="10" stroke="white" strokeWidth="1.2"/>
        <line x1="12" y1="20" x2="24" y2="30" stroke="white" strokeWidth="1.2"/>
        <line x1="24" y1="10" x2="36" y2="16" stroke="white" strokeWidth="1.2"/>
        <line x1="24" y1="30" x2="36" y2="24" stroke="white" strokeWidth="1.2"/>
        <line x1="24" y1="10" x2="24" y2="30" stroke="white" strokeWidth="1" opacity="0.5"/>
        <line x1="36" y1="16" x2="36" y2="24" stroke="white" strokeWidth="1" opacity="0.5"/>
      </g>
      {/* Wordmark */}
      <text x="50" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.04em">NEURAL</text>
    </svg>
  ),
  Velocity: () => (
    <svg viewBox="0 0 170 40" fill="none" className="h-8 md:h-10 w-auto">
      {/* Velocity mark - dynamic V with motion lines */}
      <g className="transform-gpu">
        <path d="M8 10 L20 30 L32 10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="4" y1="14" x2="12" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="6" y1="18" x2="14" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <line x1="8" y1="22" x2="16" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.2"/>
        <circle cx="20" cy="30" r="2" fill="white"/>
      </g>
      {/* Wordmark */}
      <text x="44" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.02em">VELOCITY</text>
    </svg>
  ),
  Apex: () => (
    <svg viewBox="0 0 130 40" fill="none" className="h-8 md:h-10 w-auto">
      {/* Apex mark - mountain peak / upward triangle */}
      <g className="transform-gpu">
        <path d="M20 8 L32 32 L8 32 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 15 L26 27 L14 27 Z" fill="white" opacity="0.3"/>
        <line x1="20" y1="8" x2="20" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="3" r="1.5" fill="white"/>
      </g>
      {/* Wordmark */}
      <text x="44" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="700" letterSpacing="0.06em">APEX</text>
    </svg>
  ),
  Prism: () => (
    <svg viewBox="0 0 140 40" fill="none" className="h-8 md:h-10 w-auto">
      {/* Prism mark - light refraction */}
      <g className="transform-gpu">
        <path d="M8 32 L20 8 L32 32 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="34" y1="20" x2="38" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="34" y1="20" x2="38" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="34" y1="20" x2="38" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="20" x2="14" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 20 L26 20" stroke="white" strokeWidth="1" opacity="0.4"/>
      </g>
      {/* Wordmark */}
      <text x="48" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.05em">PRISM</text>
    </svg>
  ),
  Horizon: () => (
    <svg viewBox="0 0 165 40" fill="none" className="h-8 md:h-10 w-auto">
      {/* Horizon mark - sun rising over line */}
      <g className="transform-gpu">
        <path d="M4 26 L36 26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 26 A12 12 0 0 1 32 26" fill="none" stroke="white" strokeWidth="2"/>
        <path d="M8 26 A12 12 0 0 1 20 26" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="20" cy="18" r="6" fill="white"/>
        <line x1="20" y1="8" x2="20" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="28" y1="12" x2="26.5" y2="13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="12" x2="13.5" y2="13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      {/* Wordmark */}
      <text x="46" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.03em">HORIZON</text>
    </svg>
  ),
  Zenith: () => (
    <svg viewBox="0 0 145 40" fill="none" className="h-8 md:h-10 w-auto">
      {/* Zenith mark - stylized Z with star */}
      <g className="transform-gpu">
        <path d="M8 10 L32 10 L8 30 L32 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <polygon points="34,8 35.5,12 40,12 36.5,15 38,19 34,16 30,19 31.5,15 28,12 32.5,12" fill="white"/>
      </g>
      {/* Wordmark */}
      <text x="50" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.04em">ZENITH</text>
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
