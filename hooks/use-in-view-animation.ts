'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useInViewAnimation<T extends HTMLElement = HTMLElement>(
  options: UseInViewAnimationOptions = {},
) {
  const { threshold = 0.2, triggerOnce = true, rootMargin = '0px 0px -10% 0px' } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) observer.unobserve(entry.target)
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, triggerOnce, rootMargin])

  return { ref, isVisible }
}

// Short alias used across new primitives.
export const useInView = useInViewAnimation
