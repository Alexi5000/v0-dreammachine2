"use client"

import { useEffect, useState } from "react"

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
          <button className="relative w-[184px] h-[65px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group">
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
              GET STARTED
            </span>
          </button>

          <button className="relative w-[160px] h-[65px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 160 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H152C156.418 0 160 3.58172 160 8V57C160 61.4183 156.418 65 152 65H8C3.58172 65 0 61.4183 0 57V8Z"
                fill="transparent"
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-300 group-hover:fill-white/10"
              />
            </svg>
            <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full text-[18px] font-bold uppercase text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
              OUR REEL
            </span>
          </button>
        </div>

      </div>
    </section>
  )
}
