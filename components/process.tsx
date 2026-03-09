"use client"

import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your brand, goals, and vision through collaborative sessions powered by AI-driven insights.",
    details: [
      "Brand audit & analysis",
      "Competitor research",
      "AI-powered trend forecasting",
      "Strategic positioning",
    ],
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our AI-enhanced creative process generates hundreds of concepts, refined by expert designers into stunning visuals.",
    details: [
      "Generative design exploration",
      "Human-curated selections",
      "Iterative refinement",
      "Motion concepts",
    ],
  },
  {
    number: "03",
    title: "Delivery",
    description:
      "Launch-ready assets delivered with comprehensive guidelines and ongoing AI-powered optimization support.",
    details: [
      "Production-ready files",
      "Brand guidelines",
      "Implementation support",
      "Performance tracking",
    ],
  },
]

export function Process() {
  const [activeStep, setActiveStep] = useState(0)
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#21346e]"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="inline-block text-sm font-bold uppercase text-white/50 tracking-widest mb-4">
            Our Process
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-white mb-6"
            style={{ lineHeight: 1.1, letterSpacing: "-2px" }}
          >
            How We Work
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            A streamlined three-step process that combines AI efficiency with
            human expertise for exceptional results.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Steps Navigation */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 md:p-8 rounded-lg border transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                } ${
                  activeStep === index
                    ? "border-white bg-white/10"
                    : "border-white/20 hover:border-white/40"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  <span
                    className={`text-5xl md:text-6xl font-bold transition-colors duration-500 ${
                      activeStep === index ? "text-white" : "text-white/30"
                    }`}
                    style={{ lineHeight: 1 }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-2">
                      {step.title}
                    </h3>
                    <p
                      className={`text-white/60 transition-opacity duration-500 ${
                        activeStep === index ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div
            className={`relative p-8 md:p-12 rounded-lg bg-white/5 border border-white/10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20 rounded-t-lg overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-700"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <h4 className="text-xl font-bold uppercase text-white/50 mb-8">
              What&apos;s Included
            </h4>

            <ul className="space-y-6">
              {steps[activeStep].details.map((detail, index) => (
                <li
                  key={detail}
                  className="flex items-center gap-4 text-lg text-white"
                  style={{
                    animation: "fadeInUp 0.5s ease forwards",
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                  }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-3 h-3 text-[#21346e]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  {detail}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="relative mt-12 w-[184px] h-[65px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 184 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 8C0 3.58172 3.58172 0 8 0H176C180.418 0 184 3.58172 184 8V57C184 61.4183 180.418 65 176 65H8C3.58172 65 0 61.4183 0 57V8Z"
                  fill="white"
                  className="transition-all duration-300 group-hover:fill-white/90"
                />
              </svg>
              <span className="relative z-10 flex items-center justify-center w-full h-full text-[20px] font-bold uppercase text-[#161a20]">
                LEARN MORE
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
