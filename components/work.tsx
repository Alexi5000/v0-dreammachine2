"use client"

import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Quantum Finance",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
  },
  {
    title: "Neural Health",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
  },
  {
    title: "Echo Studios",
    category: "Motion Design",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    title: "Velocity Tech",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
]

export function Work() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#111111]"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
          <div className="max-w-3xl mb-8 md:mb-0">
            <span className="inline-block text-sm font-bold uppercase text-white/50 tracking-widest mb-4">
              Selected Work
            </span>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-white"
              style={{ lineHeight: 1.1, letterSpacing: "-2px" }}
            >
              Recent Projects
            </h2>
          </div>

          {/* View All Button */}
          <button className="relative w-[160px] h-[56px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 160 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H152C156.418 0 160 3.58172 160 8V48C160 52.4183 156.418 56 152 56H8C3.58172 56 0 52.4183 0 48V8Z"
                fill="transparent"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                className="transition-all duration-300 group-hover:stroke-white"
              />
            </svg>
            <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full text-[14px] font-bold uppercase text-white tracking-wide">
              VIEW ALL
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  hoveredIndex === index ? "scale-110" : "scale-100"
                }`}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-[#21346e]/80 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span
                  className={`text-sm font-bold uppercase text-white/60 tracking-widest mb-2 transition-all duration-500 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {project.category}
                </span>
                <h3
                  className={`text-3xl md:text-4xl font-bold uppercase text-white transition-all duration-500 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "50ms" }}
                >
                  {project.title}
                </h3>

                {/* Arrow */}
                <div
                  className={`absolute top-8 right-8 transition-all duration-500 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
