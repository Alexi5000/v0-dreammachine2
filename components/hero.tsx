"use client"

export function Hero() {
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
      <div className="relative z-10 container mx-auto px-4 pt-32 md:pt-48">
        {/* Main Headline */}
        <h1 
          className="text-6xl md:text-8xl lg:text-[100px] font-bold uppercase text-white"
          style={{ 
            lineHeight: 0.98, 
            letterSpacing: '-3px' 
          }}
        >
          <span className="block">NEW ERA</span>
          <span className="block">OF DESIGN</span>
          <span className="block">STARTS NOW</span>
        </h1>

        {/* CTA Button */}
        <button
          className="relative mt-10 w-[184px] h-[65px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* SVG Background Shape */}
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
            />
          </svg>
          
          {/* Button Text */}
          <span 
            className="relative z-10 flex items-center justify-center w-full h-full text-[20px] font-bold uppercase text-[#161a20]"
          >
            GET STARTED
          </span>
        </button>
      </div>
    </section>
  )
}
