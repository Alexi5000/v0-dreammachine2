"use client"

import { useEffect, useRef, useState } from "react"

export function CTA() {
  const [isVisible, setIsVisible] = useState(false)
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
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#21346e] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-bold uppercase text-white/50 tracking-widest mb-4">
            Ready to Transform?
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase text-white mb-8"
            style={{ lineHeight: 1.05, letterSpacing: "-3px" }}
          >
            Let&apos;s Build Something Extraordinary
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto">
            Ready to revolutionize your brand with AI-powered design? Get in
            touch and let&apos;s start creating the future together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="relative w-[220px] h-[65px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 220 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 8C0 3.58172 3.58172 0 8 0H212C216.418 0 220 3.58172 220 8V57C220 61.4183 216.418 65 212 65H8C3.58172 65 0 61.4183 0 57V8Z"
                  fill="white"
                  className="transition-all duration-300 group-hover:fill-white/90"
                />
              </svg>
              <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full text-[18px] font-bold uppercase text-[#161a20]">
                START A PROJECT
              </span>
            </button>

            <button className="relative w-[180px] h-[65px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 180 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 8C0 3.58172 3.58172 0 8 0H172C176.418 0 180 3.58172 180 8V57C180 61.4183 176.418 65 172 65H8C3.58172 65 0 61.4183 0 57V8Z"
                  fill="transparent"
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:fill-white/10"
                />
              </svg>
              <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full text-[18px] font-bold uppercase text-white">
                BOOK A CALL
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
