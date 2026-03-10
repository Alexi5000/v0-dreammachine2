"use client"

import { useEffect, type ReactNode } from "react"
import { usePredictivePreload } from "@/hooks/use-predictive-preload"

// Musk #4: Predictive preloading provider for zero-latency experience
export function PreloadProvider({ children }: { children: ReactNode }) {
  usePredictivePreload()

  // Prefetch critical routes on mount
  useEffect(() => {
    const criticalRoutes = [
      "/auth/sign-up",
      "/auth/login",
      "/dashboard",
    ]

    criticalRoutes.forEach((route) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = route
      link.as = "document"
      document.head.appendChild(link)
    })

    // Preconnect to external resources
    const preconnects = [
      "https://d8j0ntlcm91z4.cloudfront.net", // Video CDN
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com", // Images
    ]

    preconnects.forEach((url) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = url
      document.head.appendChild(link)
    })
  }, [])

  return <>{children}</>
}
