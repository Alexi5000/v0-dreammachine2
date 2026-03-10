"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

// Brand cards data
const brandCards = [
  {
    title: "AI-First Approach",
    description: "Leveraging machine learning for smarter design decisions",
    gradient: "from-blue-500/20 to-indigo-600/20",
    accentColor: "bg-blue-500",
  },
  {
    title: "Rapid Iteration",
    description: "Generate hundreds of variations in minutes, not weeks",
    gradient: "from-purple-500/20 to-pink-600/20",
    accentColor: "bg-purple-500",
  },
  {
    title: "Brand Consistency",
    description: "Unified visual language across all touchpoints",
    gradient: "from-emerald-500/20 to-teal-600/20",
    accentColor: "bg-emerald-500",
  },
  {
    title: "Future-Ready",
    description: "Designs that scale and evolve with your business",
    gradient: "from-orange-500/20 to-red-600/20",
    accentColor: "bg-orange-500",
  },
  {
    title: "Data-Driven",
    description: "Analytics inform every creative decision we make",
    gradient: "from-cyan-500/20 to-blue-600/20",
    accentColor: "bg-cyan-500",
  },
  {
    title: "Human Touch",
    description: "AI assists, but human creativity leads the way",
    gradient: "from-rose-500/20 to-pink-600/20",
    accentColor: "bg-rose-500",
  },
]

// Smooth infinite card scroller
function CardMarquee({
  cards,
  speed = 50,
}: {
  cards: typeof brandCards
  speed?: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="overflow-hidden py-4"
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
            duration: isHovered ? speed * 1.5 : speed, // Slow down on hover
            ease: "linear",
          },
        }}
      >
        {/* Render cards twice for seamless loop */}
        <div className="flex shrink-0 gap-6">
          {cards.map((card, index) => (
            <div
              key={`card-1-${index}`}
              className={`group relative flex-shrink-0 w-[300px] md:w-[350px] p-6 md:p-8 rounded-2xl bg-gradient-to-br ${card.gradient} border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer`}
            >
              {/* Accent dot */}
              <div className={`w-3 h-3 rounded-full ${card.accentColor} mb-4`} />
              
              {/* Content */}
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                {card.title}
              </h4>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {card.description}
              </p>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 gap-6 ml-6">
          {cards.map((card, index) => (
            <div
              key={`card-2-${index}`}
              className={`group relative flex-shrink-0 w-[300px] md:w-[350px] p-6 md:p-8 rounded-2xl bg-gradient-to-br ${card.gradient} border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer`}
            >
              {/* Accent dot */}
              <div className={`w-3 h-3 rounded-full ${card.accentColor} mb-4`} />
              
              {/* Content */}
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                {card.title}
              </h4>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {card.description}
              </p>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function BrandScroller() {
  const { ref: sectionRef, isVisible } = useInViewAnimation<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-12">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-bold uppercase text-white/50 tracking-widest mb-4">
            Why Choose Us
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold uppercase text-white"
            style={{ lineHeight: 1.1, letterSpacing: "-1px" }}
          >
            The Nexus Advantage
          </h2>
        </div>
      </div>

      {/* Card Marquee - Full width */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <CardMarquee cards={brandCards} speed={40} />
      </div>
    </section>
  )
}
