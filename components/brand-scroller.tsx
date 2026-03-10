"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

// Premium advantage cards with sophisticated styling
const advantageCards = [
  {
    number: "01",
    title: "Neural Processing",
    description: "Advanced AI algorithms analyze millions of design patterns to generate unique, contextual solutions tailored to your brand identity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M1 12h4M19 12h4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Precision Crafted",
    description: "Every pixel is intentionally placed. Our systems ensure mathematical harmony and visual balance in every deliverable.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Infinite Scale",
    description: "From startup to enterprise, our design systems grow with you. Consistent quality at any scale, any format, any platform.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Real-Time Iteration",
    description: "Watch your vision come to life in real-time. Instant feedback loops mean faster approvals and shorter timelines.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Future Proof",
    description: "Stay ahead of trends. Our AI continuously learns from emerging design patterns to keep your brand cutting-edge.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Human Mastery",
    description: "AI amplifies human creativity, never replaces it. Expert designers guide every project to perfection.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
]

// Premium card marquee with sophisticated animations
function AdvantageMarquee({
  cards,
  speed = 60,
}: {
  cards: typeof advantageCards
  speed?: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: isHovered ? speed * 1.8 : speed,
            ease: "linear",
          },
        }}
      >
        {/* First set of cards */}
        <div className="flex shrink-0 gap-6 px-3">
          {cards.map((card, index) => (
            <AdvantageCard key={`card-1-${index}`} card={card} />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex shrink-0 gap-6 px-3">
          {cards.map((card, index) => (
            <AdvantageCard key={`card-2-${index}`} card={card} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Individual advantage card with premium styling
function AdvantageCard({ card }: { card: typeof advantageCards[0] }) {
  return (
    <div className="group relative flex-shrink-0 w-[340px] md:w-[400px]">
      {/* Card container with glass effect */}
      <div className="relative h-full p-8 md:p-10 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20 hover:from-white/[0.12] hover:to-white/[0.04]">
        
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Top row: Number and Icon */}
        <div className="flex items-start justify-between mb-8">
          <span className="text-sm font-mono text-white/30 tracking-wider">
            {card.number}
          </span>
          <div className="text-white/40 group-hover:text-white/70 transition-colors duration-500">
            {card.icon}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
          {card.title}
        </h4>

        {/* Description */}
        <p className="text-white/50 leading-relaxed text-sm md:text-base group-hover:text-white/70 transition-colors duration-500">
          {card.description}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  )
}

export function BrandScroller() {
  const { ref: sectionRef, isVisible } = useInViewAnimation<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#21346e]/5 via-transparent to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="container mx-auto px-4 mb-16">
        <div
          className={`max-w-3xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase text-white/40 tracking-[0.2em] mb-6">
            Why Choose Nexus
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6" style={{ lineHeight: 1.05 }}>
            The Nexus
            <span className="block text-white/40">Advantage</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
            Where artificial intelligence meets artistic excellence. 
            Experience design without limits.
          </p>
        </div>
      </div>

      {/* Card Marquee */}
      <div
        className={`relative transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />

        <AdvantageMarquee cards={advantageCards} speed={55} />
      </div>
    </section>
  )
}
