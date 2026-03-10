"use client"

import { useState, useEffect, memo } from "react"

// Musk #1: AI-Powered personalized hero content based on context
const headlines = {
  default: { line1: "NEW ERA", line2: "OF DESIGN", line3: "STARTS NOW" },
  morning: { line1: "GOOD", line2: "MORNING", line3: "CREATOR" },
  evening: { line1: "DESIGN", line2: "NEVER", line3: "SLEEPS" },
  fintech: { line1: "FINTECH", line2: "DESIGN", line3: "REDEFINED" },
  healthcare: { line1: "HEALTH", line2: "MEETS", line3: "DESIGN" },
  ecommerce: { line1: "COMMERCE", line2: "REIMAGINED", line3: "BY AI" },
  returning: { line1: "WELCOME", line2: "BACK", line3: "CREATOR" },
}

function getPersonalizedHeadline(): { line1: string; line2: string; line3: string } {
  // Check if returning visitor
  if (typeof window !== "undefined") {
    const hasVisited = localStorage.getItem("nexus_visited")
    if (hasVisited) {
      localStorage.setItem("nexus_visited", "true")
      return headlines.returning
    }
    localStorage.setItem("nexus_visited", "true")
  }

  // Time-based personalization
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return headlines.morning
  }
  if (hour >= 22 || hour < 5) {
    return headlines.evening
  }

  // Referrer-based personalization (check URL params or referrer)
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search)
    const industry = params.get("industry")
    
    if (industry === "fintech") return headlines.fintech
    if (industry === "healthcare") return headlines.healthcare
    if (industry === "ecommerce") return headlines.ecommerce

    // Check referrer for industry hints
    const referrer = document.referrer.toLowerCase()
    if (referrer.includes("stripe") || referrer.includes("finance")) {
      return headlines.fintech
    }
    if (referrer.includes("health") || referrer.includes("medical")) {
      return headlines.healthcare
    }
  }

  return headlines.default
}

interface HeroAIHeadlineProps {
  isLoaded: boolean
}

export const HeroAIHeadline = memo(function HeroAIHeadline({ isLoaded }: HeroAIHeadlineProps) {
  const [headline, setHeadline] = useState(headlines.default)
  const [isPersonalized, setIsPersonalized] = useState(false)

  useEffect(() => {
    // Delayed personalization to allow default to render first (prevents hydration mismatch)
    const timer = setTimeout(() => {
      const personalized = getPersonalizedHeadline()
      if (personalized !== headlines.default) {
        setHeadline(personalized)
        setIsPersonalized(true)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <h1
      className="text-6xl md:text-8xl lg:text-[120px] font-bold uppercase text-white relative"
      style={{
        lineHeight: 1.05,
        letterSpacing: "-2px",
      }}
    >
      {/* Personalization indicator */}
      {isPersonalized && (
        <span className="absolute -top-8 left-0 text-xs font-normal tracking-widest text-white/40 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Personalized for you
        </span>
      )}
      
      <span
        className={`block transition-all duration-500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {headline.line1}
      </span>
      <span
        className={`block transition-all duration-500 delay-75 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {headline.line2}
      </span>
      <span
        className={`block transition-all duration-500 delay-150 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {headline.line3}
      </span>
    </h1>
  )
})
