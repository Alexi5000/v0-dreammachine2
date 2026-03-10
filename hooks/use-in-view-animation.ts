"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
}

export function useInViewAnimation<T extends HTMLElement = HTMLElement>(
  options: UseInViewAnimationOptions = {}
) {
  const { threshold = 0.2, triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce && ref.current) {
              observer.unobserve(ref.current)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return { ref, isVisible }
}
