"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShapedButton } from "@/components/ui/shaped-button"
import { PlayIcon } from "@/components/icons"
import { HeroParticles } from "@/components/hero-particles"
import { HeroAIHeadline } from "@/components/hero-ai-headline"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-[#21346e] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4"
          type="video/mp4"
        />
      </video>

      {/* Interactive particle system overlay */}
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

      </div>
    </section>
  )
}
