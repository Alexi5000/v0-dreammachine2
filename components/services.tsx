"use client"

import { useEffect, useRef, useState, useCallback } from "react"

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
  },
]

export function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [services, setServices] = useState<ServiceData[]>(initialServices)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const hasLoadedRef = useRef<Set<number>>(new Set())

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
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="inline-block text-sm font-bold uppercase text-white/50 tracking-widest mb-4">
            Our Services
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-white mb-6"
            style={{ lineHeight: 1.1, letterSpacing: "-2px" }}
          >
            What We Create
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            We combine human creativity with artificial intelligence to deliver
            design solutions that push boundaries and exceed expectations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              data-index={index}
              className={`service-card group relative rounded-lg overflow-hidden transition-all duration-700 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${expandedCard === index ? "md:col-span-2" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card with hero-style background */}
              <div className="relative bg-[#21346e] min-h-[400px] p-8 md:p-10">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#21346e] via-[#2a4080] to-[#1a2850] opacity-100" />
                
                {/* Subtle animated glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

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

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {service.isLoading ? (
                      // Loading skeleton
                      Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-pulse"
                        >
                          <div className="h-4 bg-white/20 rounded w-1/3 mb-3" />
                          <div className="h-3 bg-white/10 rounded w-full mb-2" />
                          <div className="h-3 bg-white/10 rounded w-2/3" />
                        </div>
                      ))
                    ) : (
                      service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="bg-white rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group/feature"
                          style={{ animationDelay: `${featureIndex * 100}ms` }}
                        >
                          {/* Highlight badge */}
                          <span className="inline-block text-xs font-bold uppercase text-[#21346e] bg-[#21346e]/10 px-2 py-1 rounded mb-2">
                            {feature.highlight}
                          </span>
                          
                          {/* Feature title */}
                          <h4 className="text-lg font-bold text-[#161a20] mb-1">
                            {feature.title}
                          </h4>
                          
                          {/* Feature description */}
                          <p className="text-sm text-[#161a20]/70 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* CTA Button matching hero style */}
                  <button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="relative mt-8 w-[160px] h-[50px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group/btn"
                  >
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 160 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 8C0 3.58172 3.58172 0 8 0H152C156.418 0 160 3.58172 160 8V42C160 46.4183 156.418 50 152 50H8C3.58172 50 0 46.4183 0 42V8Z"
                        fill="white"
                        className="transition-all duration-300 group-hover/btn:fill-white/90"
                      />
                    </svg>
                    <span className="relative z-10 flex items-center justify-center w-full h-full text-[16px] font-bold uppercase text-[#161a20]">
                      LEARN MORE
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
