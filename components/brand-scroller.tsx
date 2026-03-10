"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

// Premium advantage cards matching hero visual language
const advantageCards = [
  {
    number: "01",
    title: "Neural Processing",
    description: "Advanced AI algorithms analyze millions of design patterns to generate unique, contextual solutions tailored to your brand identity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 1v4M12 19v4M1 12h4M19 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Precision Crafted",
    description: "Every pixel is intentionally placed. Our systems ensure mathematical harmony and visual balance in every deliverable.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Infinite Scale",
    description: "From startup to enterprise, our design systems grow with you. Consistent quality at any scale, any format, any platform.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Real-Time Iteration",
    description: "Watch your vision come to life in real-time. Instant feedback loops mean faster approvals and shorter timelines.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Future Proof",
    description: "Stay ahead of trends. Our AI continuously learns from emerging design patterns to keep your brand cutting-edge.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Human Mastery",
    description: "AI amplifies human creativity, never replaces it. Expert designers guide every project to perfection.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// Premium card marquee with hero-matching aesthetics
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

// Individual advantage card with premium hero-matching styling
function AdvantageCard({ card }: { card: typeof advantageCards[0] }) {
  return (
    <div className="group relative flex-shrink-0 w-[340px] md:w-[420px]">
      {/* Card container with deep blue gradient matching hero */}
      <div className="relative h-full p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#21346e] via-[#1a2a5a] to-[#151f45] border border-white/10 overflow-hidden transition-all duration-500 hover:border-[#fbbf24]/40 hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)]">
        
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24]/0 via-[#fbbf24]/0 to-[#fbbf24]/0 group-hover:from-[#fbbf24]/5 group-hover:via-transparent group-hover:to-[#21346e]/20 transition-all duration-700 pointer-events-none" />
        
        {/* Top yellow accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Corner glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#fbbf24]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Top row: Number and Icon */}
        <div className="relative flex items-start justify-between mb-8">
          {/* Number with yellow accent */}
          <div className="flex items-center gap-3">
            <span className="text-[#fbbf24] text-sm font-bold tracking-wider">
              {card.number}
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-[#fbbf24]/60 to-transparent" />
          </div>
          {/* Icon */}
          <div className="text-white/60 group-hover:text-[#fbbf24] transition-colors duration-500">
            {card.icon}
          </div>
        </div>

        {/* Title - White with tight tracking like hero */}
        <h4 className="relative text-2xl md:text-[28px] font-bold text-white mb-4 tracking-tight leading-tight">
          {card.title}
        </h4>

        {/* Description - Clean white with good contrast */}
        <p className="relative text-white/70 leading-relaxed text-[15px] md:text-base group-hover:text-white/90 transition-colors duration-500">
          {card.description}
        </p>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#fbbf24] via-[#fbbf24]/50 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        
        {/* Decorative corner element */}
        <div className="absolute bottom-6 right-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
          <div className="w-1 h-1 rounded-full bg-[#fbbf24]/60" />
          <div className="w-0.5 h-0.5 rounded-full bg-[#fbbf24]/30" />
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
      className="relative py-24 md:py-36 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background gradient matching hero transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#21346e]/20 via-[#21346e]/5 to-transparent pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Section Header - Matching hero typography */}
      <div className="container mx-auto px-4 mb-20">
        <div
          className={`max-w-4xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Subtitle with yellow accent */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#fbbf24]" />
            <span className="text-xs font-bold uppercase text-[#fbbf24] tracking-[0.25em]">
              Why Choose Nexus
            </span>
          </div>
          
          {/* Main headline matching hero style */}
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8"
            style={{ lineHeight: 0.95, letterSpacing: "-2px" }}
          >
            THE NEXUS
            <span className="block text-white/30">ADVANTAGE</span>
          </h2>
          
          {/* Description with better contrast */}
          <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
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
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />

        <AdvantageMarquee cards={advantageCards} speed={50} />
      </div>
      
      {/* Bottom decorative element */}
      <div className="container mx-auto px-4 mt-20">
        <div 
          className={`flex items-center justify-center gap-3 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
          <div className="w-16 h-px bg-gradient-to-r from-[#fbbf24] to-[#21346e]" />
          <div className="w-2 h-2 rounded-full bg-[#21346e]" />
        </div>
      </div>
    </section>
  )
}
