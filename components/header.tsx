"use client"

import { useState, useEffect } from "react"
import { ShapedButton } from "@/components/ui/shaped-button"
import { NexusLogo, MenuIcon } from "@/components/icons"

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
            <NexusLogo />
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
          <ShapedButton variant="filled" size="sm" className="hidden md:block">
            GET STARTED
          </ShapedButton>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <MenuIcon />
          </button>
        </nav>
      </div>
    </header>
  )
}
