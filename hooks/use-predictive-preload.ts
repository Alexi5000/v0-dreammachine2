"use client"

import { useEffect, useCallback, useRef } from "react"

// Musk #4: Predictive scroll preloading for zero-latency experience
export function usePredictivePreload() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const preloadedRef = useRef<Set<string>>(new Set())

  // Preload images before they enter viewport
  const preloadImage = useCallback((src: string) => {
    if (preloadedRef.current.has(src)) return
    preloadedRef.current.add(src)
    
    const img = new Image()
    img.src = src
  }, [])

  // Preload route for instant navigation
  const preloadRoute = useCallback((href: string) => {
    if (preloadedRef.current.has(href)) return
    preloadedRef.current.add(href)
    
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = href
    link.as = "document"
    document.head.appendChild(link)
  }, [])

  // Setup aggressive intersection observer
  useEffect(() => {
    // Preload with negative margin (500px before entering viewport)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            
            // Preload images
            const images = el.querySelectorAll("img[data-preload]")
            images.forEach((img) => {
              const src = img.getAttribute("data-src") || img.getAttribute("src")
              if (src) preloadImage(src)
            })
            
            // Preload links
            const links = el.querySelectorAll("a[href^='/']")
            links.forEach((link) => {
              const href = link.getAttribute("href")
              if (href) preloadRoute(href)
            })
          }
        })
      },
      { rootMargin: "500px 0px" }
    )

    // Observe all sections
    const sections = document.querySelectorAll("section, [data-preload-section]")
    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [preloadImage, preloadRoute])

  // Track cursor velocity to predict scroll intention
  useEffect(() => {
    let lastY = 0
    let velocity = 0

    const handleMouseMove = (e: MouseEvent) => {
      velocity = e.clientY - lastY
      lastY = e.clientY

      // If user is moving cursor down rapidly, preload below-fold content
      if (velocity > 10) {
        const belowFold = document.querySelectorAll("section:not([data-loaded])")
        belowFold.forEach((section, index) => {
          if (index < 2) {
            section.setAttribute("data-loaded", "true")
            const images = section.querySelectorAll("img")
            images.forEach((img) => {
              const src = img.getAttribute("data-src") || img.getAttribute("src")
              if (src) preloadImage(src)
            })
          }
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [preloadImage])

  return { preloadImage, preloadRoute }
}

// Service Worker registration for instant return visits
export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Service worker registration failed - continue without caching
      })
    })
  }
}
