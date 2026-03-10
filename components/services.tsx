"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"
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
    features: [],
    isLoading: true,
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
    features: [],
    isLoading: true,
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
    features: [],
    isLoading: true,
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
    features: [],
    isLoading: true,
    activeFeature: 0,
  },
]

export function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [services, setServices] = useState<ServiceData[]>(initialServices)
  const sectionRef = useRef<HTMLElement>(null)
  const hasLoadedRef = useRef<Set<number>>(new Set())

  // Auto-rotate features for each service card
  useEffect(() => {
    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((service) => {
          if (service.features.length > 0) {
            return {
              ...service,
              activeFeature: (service.activeFeature + 1) % service.features.length,
            }
          }
          return service
        })
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const loadFeatures = useCallback(async (index: number) => {
    if (hasLoadedRef.current.has(index)) return
    hasLoadedRef.current.add(index)

    const service = initialServices[index]
    try {
      const response = await fetch("/api/generate-features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: service.title,
          serviceDescription: service.description,
        }),
      })
      const data = await response.json()
      setServices((prev) =>
        prev.map((s, i) =>
          i === index ? { ...s, features: data.features || [], isLoading: false } : s
        )
      )
    } catch {
      setServices((prev) =>
        prev.map((s, i) => (i === index ? { ...s, isLoading: false } : s))
      )
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => [...new Set([...prev, index])])
            loadFeatures(index)
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = sectionRef.current?.querySelectorAll(".service-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [loadFeatures])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          label="Our Services"
          title="What We Create"
          description="We combine human creativity with artificial intelligence to deliver design solutions that push boundaries and exceed expectations."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {/* Card with Apple-inspired glass background */}
              <div className="relative bg-gradient-to-br from-[#1a1f35] via-[#21346e] to-[#1a2850] min-h-[480px] p-8 md:p-10 rounded-2xl">
                {/* Noise texture overlay for depth */}
                <div className="absolute inset-0 opacity-[0.015] rounded-2xl" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
                
                {/* Animated gradient orbs */}
                <motion.div
                  className="absolute -top-32 -right-32 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-white group-hover:scale-110 transition-transform duration-500 mb-6">
                    {service.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Single Feature Card - Apple-Inspired Design */}
                  <div className="mt-8">
                    {service.isLoading ? (
                      // Loading skeleton
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="h-1 flex-1 rounded-full bg-white/10 animate-pulse"
                              style={{ animationDelay: `${i * 150}ms` }}
                            />
                          ))}
                        </div>
                        <div className="space-y-4">
                          <div className="h-6 bg-white/10 rounded-lg w-1/3 animate-pulse" />
                          <div className="h-8 bg-white/10 rounded-lg w-2/3 animate-pulse" />
                          <div className="h-4 bg-white/5 rounded-lg w-full animate-pulse" />
                          <div className="h-4 bg-white/5 rounded-lg w-4/5 animate-pulse" />
                        </div>
                      </motion.div>
                    ) : service.features.length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 group/card cursor-pointer"
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
                        {/* Animated gradient orb */}
                        <motion.div
                          className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        
                        {/* Progress indicators */}
                        <div className="flex items-center gap-2 px-8 pt-6">
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
                                  className="absolute inset-0 bg-white rounded-full"
                                  layoutId={`progress-${index}`}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>

                        {/* Card content */}
                        <div className="relative p-8 pt-6 min-h-[200px]">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={service.activeFeature}
                              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                              {/* Highlight badge */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center gap-2 mb-4"
                              >
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                                  <span className="text-white font-bold text-sm">
                                    {service.activeFeature + 1}
                                  </span>
                                </span>
                                <span className="text-xs font-bold uppercase text-white/50 tracking-widest">
                                  {service.features[service.activeFeature]?.highlight}
                                </span>
                              </motion.div>

                              {/* Title */}
                              <motion.h4
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight leading-tight"
                              >
                                {service.features[service.activeFeature]?.title}
                              </motion.h4>

                              {/* Description */}
                              <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/60 leading-relaxed text-base max-w-lg"
                              >
                                {service.features[service.activeFeature]?.description}
                              </motion.p>
                            </motion.div>
                          </AnimatePresence>

                          {/* Arrow indicator */}
                          <motion.div
                            className="absolute bottom-8 right-8"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 group-hover/card:bg-white/20 transition-colors duration-300">
                              <ArrowUpRightIcon className="w-5 h-5 text-white group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform duration-300" />
                            </div>
                          </motion.div>
                        </div>

                        {/* Bottom gradient line */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-px"
                          style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          }}
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    ) : null}
                  </div>

                  {/* CTA Button matching hero style */}
                  <ShapedButton
                    variant="filled"
                    size="sm"
                    className="mt-8"
                  >
                    LEARN MORE
                  </ShapedButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
