"use client"

import { useEffect, useState } from "react"
import { ShapedButton } from "@/components/ui/shaped-button"
import { PlayIcon } from "@/components/icons"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

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
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4"
          type="video/mp4"
        />
      </video>



      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 pt-40 md:pt-56 pb-24">
        {/* Subtitle */}
        <p
          className={`text-sm md:text-base font-bold uppercase text-white/60 tracking-widest mb-6 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          AI-Powered Design Studio
        </p>

        {/* Main Headline */}
        <h1
          className="text-6xl md:text-8xl lg:text-[120px] font-bold uppercase text-white"
          style={{
            lineHeight: 0.95,
            letterSpacing: "-4px",
          }}
        >
          <span
            className={`block transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            NEW ERA
          </span>
          <span
            className={`block transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            OF DESIGN
          </span>
          <span
            className={`block transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            STARTS NOW
          </span>
        </h1>

        {/* Description */}
        <p
          className={`mt-8 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed transition-all duration-700 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          We blend artificial intelligence with human creativity to craft
          extraordinary brand experiences that push the boundaries of design.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-start gap-4 mt-10 transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <ShapedButton variant="filled" size="md">
            GET STARTED
          </ShapedButton>

          <ShapedButton variant="outline" size="md">
            <PlayIcon className="w-5 h-5" />
            OUR REEL
          </ShapedButton>
        </div>

      </div>
    </section>
  )
}
