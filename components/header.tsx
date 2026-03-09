"use client"

import { useState, useEffect } from "react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["Services", "Process", "Pricing", "Work", "Contact"]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-lg transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a]/90 backdrop-blur-md border border-border"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <rect width="40" height="40" rx="8" fill="white" />
                <path
                  d="M12 28V12L20 20L28 12V28"
                  stroke="#161a20"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold uppercase text-white tracking-tight">
              NEXUS AI
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium uppercase text-white/70 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button className="relative w-[140px] h-[48px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 140 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H132C136.418 0 140 3.58172 140 8V40C140 44.4183 136.418 48 132 48H8C3.58172 48 0 44.4183 0 40V8Z"
                fill="white"
                className="transition-all duration-300 group-hover:fill-white/90"
              />
            </svg>
            <span className="relative z-10 flex items-center justify-center w-full h-full text-[14px] font-bold uppercase text-[#161a20] tracking-wide">
              GET STARTED
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
