"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Link from "next/link"
import { ShapedButton } from "@/components/ui/shaped-button"
import { PlayIcon } from "@/components/icons"
import { HeroAIHeadline } from "@/components/hero-ai-headline"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playbackDirectionRef = useRef<1 | -1>(1)
  const animationFrameRef = useRef<number | null>(null)

  // Ping-pong playback: reverse direction at video boundaries for seamless loop
  const handlePingPongPlayback = useCallback(() => {
    const video = videoRef.current
    if (!video || video.paused) return

    const currentTime = video.currentTime
    const duration = video.duration

    if (playbackDirectionRef.current === 1) {
      // Playing forward - check if near end
      if (currentTime >= duration - 0.05) {
        playbackDirectionRef.current = -1
        video.playbackRate = -1
      }
    } else {
      // Playing backward - check if near start
      if (currentTime <= 0.05) {
        playbackDirectionRef.current = 1
        video.playbackRate = 1
      }
    }

    animationFrameRef.current = requestAnimationFrame(handlePingPongPlayback)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
    
    const video = videoRef.current
    if (!video) return

    // Start video playback
    video.play().catch(() => {
      // Autoplay may be blocked on some browsers
    })

    // Check if browser supports negative playbackRate (most don't)
    // If not, we use a canvas-based fallback or simple loop
    const supportsReverse = (() => {
      try {
        video.playbackRate = -1
        const supported = video.playbackRate === -1
        video.playbackRate = 1
        return supported
      } catch {
        return false
      }
    })()

    if (supportsReverse) {
      animationFrameRef.current = requestAnimationFrame(handlePingPongPlayback)
    }
    // If not supported, standard loop attribute handles continuous playback

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handlePingPongPlayback])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Permanent animated video background - complementary dark fallback */}
      <div 
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#1e3a5f" }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlayThrough={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 0.6s ease-out",
            willChange: "opacity",
          }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4"
            type="video/mp4"
          />
        </video>
      </div>

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
