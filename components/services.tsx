"use client"

import { useEffect, useRef, useState } from "react"

const services = [
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
  },
]

export function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = sectionRef.current?.querySelectorAll(".service-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

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
              className={`service-card group relative p-8 md:p-10 rounded-lg border border-border bg-card transition-all duration-700 hover:border-white/30 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="text-white/40 group-hover:text-white transition-colors duration-500 mb-6">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
