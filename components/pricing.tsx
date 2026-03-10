"use client"

import { SectionHeader } from "@/components/ui/section-header"
import { ShapedButton } from "@/components/ui/shaped-button"
import { CheckIcon } from "@/components/icons"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

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
  const { ref: sectionRef, isVisible } = useInViewAnimation<HTMLElement>()

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          label="Pricing"
          title="Investment That Transforms"
          description="Transparent pricing for exceptional AI-powered design that delivers measurable results."
          align="center"
        />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 md:p-10 rounded-lg border transition-all duration-700 flex flex-col ${
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

              {/* Features - grows to fill available space */}
              <ul className="space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                      <CheckIcon className="text-white" />
                    </span>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button - always at bottom */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <ShapedButton
                  variant={plan.popular ? "filled" : "outline"}
                  size="sm"
                  fullWidth
                >
                  {plan.price === "Custom" ? "CONTACT US" : "GET STARTED"}
                </ShapedButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
