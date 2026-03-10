"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { ShapedButton } from "@/components/ui/shaped-button"

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
          <SectionHeader
            label="Ready to Transform?"
            title="Let's Build Something Extraordinary"
            description="Ready to revolutionize your brand with AI-powered design? Get in touch and let's start creating the future together."
            align="center"
            className="mb-12"
          />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ShapedButton variant="filled" size="lg">
              START A PROJECT
            </ShapedButton>

            <ShapedButton variant="outline" size="md">
              BOOK A CALL
            </ShapedButton>
          </div>
        </div>
      </div>
    </section>
  )
}
