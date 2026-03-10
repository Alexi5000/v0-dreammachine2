"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShapedButton } from "@/components/ui/shaped-button"
import { PlayIcon } from "@/components/icons"
import { HeroParticles } from "@/components/hero-particles"
import { HeroAIHeadline } from "@/components/hero-ai-headline"
import { HeroAIDemo } from "@/components/hero-ai-demo"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(33, 52, 110, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(33, 52, 110, 0.3) 0%, transparent 40%),
            radial-gradient(ellipse 50% 30% at 20% 80%, rgba(33, 52, 110, 0.25) 0%, transparent 35%),
            linear-gradient(to bottom, #0f1629 0%, #0a0a0a 100%)
          `,
        }}
      />
      
      {/* Animated glow orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(33, 52, 110, 0.8) 0%, transparent 70%)",
            top: "-10%",
            left: "10%",
            filter: "blur(60px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)",
            bottom: "10%",
            right: "-5%",
            filter: "blur(80px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(33, 52, 110, 0.6) 0%, transparent 70%)",
            top: "40%",
            left: "-10%",
            filter: "blur(50px)",
            animation: "float 12s ease-in-out infinite 2s",
          }}
        />
      </div>

      {/* Interactive particle system */}
      <HeroParticles />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 pt-40 md:pt-56 pb-24">
        {/* Subtitle - Ive #5: Simplified opacity (60% secondary) */}
        <p
          className={`text-sm md:text-base font-medium uppercase text-white/60 tracking-[0.2em] mb-8 transition-all duration-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          AI-Powered Design Studio
        </p>

        {/* Main Headline - Musk #1: AI-powered personalized content */}
        <HeroAIHeadline isLoaded={isLoaded} />

        {/* Description - Ive #5: 60% opacity (secondary tier), more vertical space */}
        <p
          className={`mt-10 text-lg md:text-xl text-white/60 max-w-xl leading-relaxed transition-all duration-500 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          We blend artificial intelligence with human creativity to craft
          extraordinary brand experiences that push the boundaries of design.
        </p>

        {/* CTA Buttons - Ive #3 & #4: Natural spring easing, refined buttons */}
        <div
          className={`flex flex-col sm:flex-row items-start gap-5 mt-12 transition-all duration-500 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Link href="/auth/sign-up">
            <ShapedButton variant="filled" size="md">
              GET STARTED
            </ShapedButton>
          </Link>

          <ShapedButton variant="outline" size="md">
            <PlayIcon className="w-5 h-5" />
            OUR REEL
          </ShapedButton>
        </div>

        {/* Musk #3: Real-time AI demo */}
        <div
          className={`mt-10 transition-all duration-500 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <HeroAIDemo />
        </div>
      </div>
    </section>
  )
}
