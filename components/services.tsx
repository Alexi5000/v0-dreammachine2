"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SectionHeader } from "@/components/ui/section-header"
import { ShapedButton } from "@/components/ui/shaped-button"
import { ArrowUpRightIcon } from "@/components/icons"

interface Feature {
  title: string
  description: string
  highlight: string
}

interface ServiceData {
  title: string
  description: string
  icon: React.ReactNode
  features: Feature[]
  isLoading: boolean
  activeFeature: number
}

// Static features - no API loading needed
const staticFeatures: Record<string, Feature[]> = {
  "AI Brand Identity": [
    { title: "Intelligent Logo Systems", description: "AI generates hundreds of unique logo variations that adapt to any context while maintaining brand consistency.", highlight: "Adaptive" },
    { title: "Color Intelligence", description: "Machine learning analyzes your industry and audience to recommend the perfect color palette.", highlight: "Data-Driven" },
    { title: "Typography Matching", description: "Automatically pair fonts that reflect your brand personality and ensure readability.", highlight: "Smart Pairing" },
    { title: "Brand Guidelines", description: "Auto-generated comprehensive brand books with usage rules and asset libraries.", highlight: "Automated" },
  ],
  "Generative Design": [
    { title: "Infinite Variations", description: "Generate thousands of unique design options in seconds, each tailored to your specifications.", highlight: "1000+ Options" },
    { title: "Style Transfer", description: "Apply any artistic style to your designs using advanced neural networks.", highlight: "AI-Powered" },
    { title: "Layout Optimization", description: "Algorithms that automatically arrange elements for maximum visual impact.", highlight: "Auto-Layout" },
    { title: "Asset Generation", description: "Create custom illustrations, icons, and graphics on demand.", highlight: "On-Demand" },
  ],
  "Motion & Animation": [
    { title: "Micro-Interactions", description: "Subtle animations that bring delight and improve user experience.", highlight: "60fps" },
    { title: "Scroll Experiences", description: "Parallax effects and scroll-triggered animations that tell your story.", highlight: "Immersive" },
    { title: "3D Motion", description: "Three-dimensional animations that add depth and engagement.", highlight: "WebGL" },
    { title: "Lottie Export", description: "Lightweight, scalable animations that work everywhere.", highlight: "Cross-Platform" },
  ],
  "Web Development": [
    { title: "Next.js & React", description: "Modern frameworks for blazing-fast, SEO-optimized web applications.", highlight: "SSR Ready" },
    { title: "API Integration", description: "Seamless connection with any service, database, or third-party platform.", highlight: "RESTful" },
    { title: "Performance First", description: "Optimized code that scores 95+ on Core Web Vitals.", highlight: "95+ Score" },
    { title: "Scalable Architecture", description: "Built to handle millions of users with serverless infrastructure.", highlight: "Enterprise" },
  ],
}

const initialServices: ServiceData[] = [
  {
    title: "AI Brand Identity",
    description:
      "Craft distinctive visual identities powered by machine learning that evolve with your brand.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="4"
          width="40"
          height="40"
          rx="8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M24 4V16M24 32V44M4 24H16M32 24H44" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    features: staticFeatures["AI Brand Identity"],
    isLoading: false,
    activeFeature: 0,
  },
  {
    title: "Generative Design",
    description:
      "Unlimited design variations created in seconds through our proprietary AI algorithms.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 4L44 14V34L24 44L4 34V14L24 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M24 4V24M24 24L44 14M24 24L4 14M24 24V44" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    features: staticFeatures["Generative Design"],
    isLoading: false,
    activeFeature: 0,
  },
  {
    title: "Motion & Animation",
    description:
      "Dynamic motion design and animations that bring your digital presence to life.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
        <path
          d="M18 16L34 24L18 32V16Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    features: staticFeatures["Motion & Animation"],
    isLoading: false,
    activeFeature: 0,
  },
  {
    title: "Web Development",
    description:
      "High-performance websites and applications built with cutting-edge technology.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="8"
          width="40"
          height="32"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M4 16H44" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="12" r="2" fill="currentColor" />
        <circle cx="16" cy="12" r="2" fill="currentColor" />
        <path d="M18 28L22 32L18 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 28L26 32L30 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    features: staticFeatures["Web Development"],
    isLoading: false,
    activeFeature: 0,
  },
]

export function Services() {
  const [services, setServices] = useState<ServiceData[]>(initialServices)

  // Auto-rotate features for each service card
  useEffect(() => {
    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((service) => ({
          ...service,
          activeFeature: (service.activeFeature + 1) % service.features.length,
        }))
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          label="Our Services"
          title="What We Create"
          description="We combine human creativity with artificial intelligence to deliver design solutions that push boundaries and exceed expectations."
        />

        {/* Services Grid - Uniform sizing with perfect alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              data-index={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="service-card group relative rounded-2xl overflow-hidden"
            >
              {/* Card with premium styling matching brand scroller */}
              <div className="relative h-full flex flex-col bg-gradient-to-br from-[#21346e] via-[#1a2a5a] to-[#151f45] p-8 md:p-10 rounded-2xl border border-white/10 transition-all duration-500 hover:border-[#fbbf24]/30 hover:shadow-[0_0_50px_-15px_rgba(251,191,36,0.25)]">
                
                {/* Top yellow accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Corner glow effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#fbbf24]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Animated gradient orb */}
                <motion.div
                  className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />

                {/* Content wrapper with flex-grow for uniform height */}
                <div className="relative z-10 flex flex-col flex-1">
                  {/* Header row: Icon with yellow accent */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-white group-hover:text-[#fbbf24] transition-colors duration-500 group-hover:scale-110 transform-gpu">
                      {service.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-1 h-1 rounded-full bg-[#fbbf24]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75" />
                    </div>
                  </div>

                  {/* Title - White with tight tracking */}
                  <h3 className="text-2xl md:text-[28px] font-bold uppercase text-white mb-4 tracking-tight leading-tight">
                    {service.title}
                  </h3>
                  
                  {/* Description with improved contrast */}
                  <p className="text-white/70 leading-relaxed mb-8 group-hover:text-white/90 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Feature Card - Refined with yellow accents */}
                  <div className="flex-1 flex flex-col">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="relative flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 group/card cursor-pointer hover:border-[#fbbf24]/20 transition-all duration-500"
                      onClick={() => {
                        setServices((prev) =>
                          prev.map((s, i) =>
                            i === index
                              ? { ...s, activeFeature: (s.activeFeature + 1) % s.features.length }
                              : s
                          )
                        )
                      }}
                    >
                      {/* Progress indicators with yellow active state */}
                      <div className="flex items-center gap-2 px-6 pt-5">
                        {service.features.map((_, featureIndex) => (
                          <motion.button
                            key={featureIndex}
                            className="relative h-1 flex-1 rounded-full overflow-hidden bg-white/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              setServices((prev) =>
                                prev.map((s, i) =>
                                  i === index ? { ...s, activeFeature: featureIndex } : s
                                )
                              )
                            }}
                          >
                            {service.activeFeature === featureIndex && (
                              <motion.div
                                className="absolute inset-0 bg-[#fbbf24] rounded-full"
                                layoutId={`progress-${index}`}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Card content with fixed height for uniformity */}
                      <div className="relative p-6 min-h-[180px] flex flex-col">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={service.activeFeature}
                            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex-1"
                          >
                            {/* Highlight badge with yellow accent */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="inline-flex items-center gap-3 mb-3"
                            >
                              <span className="text-[#fbbf24] text-sm font-bold tracking-wider">
                                0{service.activeFeature + 1}
                              </span>
                              <div className="w-6 h-px bg-gradient-to-r from-[#fbbf24]/60 to-transparent" />
                              <span className="text-xs font-bold uppercase text-[#fbbf24]/70 tracking-widest">
                                {service.features[service.activeFeature]?.highlight}
                              </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h4
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                              className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight leading-tight"
                            >
                              {service.features[service.activeFeature]?.title}
                            </motion.h4>

                            {/* Description */}
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-white/60 leading-relaxed text-sm md:text-[15px]"
                            >
                              {service.features[service.activeFeature]?.description}
                            </motion.p>
                          </motion.div>
                        </AnimatePresence>

                        {/* Arrow indicator */}
                        <motion.div
                          className="absolute bottom-5 right-5"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover/card:bg-[#fbbf24]/20 transition-colors duration-300">
                            <ArrowUpRightIcon className="w-4 h-4 text-white group-hover/card:text-[#fbbf24] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-300" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Bottom yellow accent line */}
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#fbbf24] via-[#fbbf24]/50 to-transparent transform origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-700" />
                    </motion.div>
                  </div>

                  {/* CTA Button with yellow hover */}
                  <ShapedButton
                    variant="filled"
                    size="sm"
                    className="mt-8 self-start"
                  >
                    LEARN MORE
                  </ShapedButton>
                </div>
                
                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#fbbf24] via-[#fbbf24]/50 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
