"use client"

import { useEffect, useRef, useState } from "react"

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    period: "per project",
    description: "Perfect for small businesses looking to elevate their brand.",
    features: [
      "AI-powered logo design",
      "3 design concepts",
      "2 revision rounds",
      "Basic brand guidelines",
      "Source files included",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$7,500",
    period: "per project",
    description: "Complete brand identity for growing companies.",
    features: [
      "Everything in Starter",
      "Full brand identity system",
      "10 design concepts",
      "Unlimited revisions",
      "Motion design package",
      "Website design",
      "Social media kit",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "Full-scale AI design partnership for large organizations.",
    features: [
      "Everything in Professional",
      "Dedicated AI design team",
      "Priority support",
      "Custom AI model training",
      "Ongoing optimization",
      "Multi-brand management",
      "White-label solutions",
    ],
    popular: false,
  },
]

export function Pricing() {
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
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <span className="inline-block text-sm font-bold uppercase text-white/50 tracking-widest mb-4">
            Pricing
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-white mb-6"
            style={{ lineHeight: 1.1, letterSpacing: "-2px" }}
          >
            Investment That Transforms
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Transparent pricing for exceptional AI-powered design that delivers
            measurable results.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 md:p-10 rounded-lg border transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${
                plan.popular
                  ? "border-white bg-white/5"
                  : "border-border bg-card hover:border-white/30"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-white text-[#161a20] text-xs font-bold uppercase rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-bold uppercase text-white/60 mb-4">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="block text-sm text-white/40 mt-2">
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/60 mb-8">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-3 h-3 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </span>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`relative w-full h-[56px] transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${
                  plan.popular ? "" : ""
                }`}
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 320 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 8C0 3.58172 3.58172 0 8 0H312C316.418 0 320 3.58172 320 8V48C320 52.4183 316.418 56 312 56H8C3.58172 56 0 52.4183 0 48V8Z"
                    fill={plan.popular ? "white" : "transparent"}
                    stroke={plan.popular ? "white" : "rgba(255,255,255,0.3)"}
                    strokeWidth="1"
                    className="transition-all duration-300 group-hover:stroke-white"
                  />
                </svg>
                <span
                  className={`relative z-10 flex items-center justify-center w-full h-full text-[16px] font-bold uppercase tracking-wide ${
                    plan.popular ? "text-[#161a20]" : "text-white"
                  }`}
                >
                  {plan.price === "Custom" ? "CONTACT US" : "GET STARTED"}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
