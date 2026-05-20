'use client'

import { useEffect, useState } from 'react'

/**
 * Returns scroll progress (0–1) of the document or a target element.
 * Uses rAF throttling for 60fps.
 */
export function useScrollProgress(target?: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const tick = () => {
      const el = target?.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const total = rect.height + window.innerHeight
        const offset = Math.max(0, window.innerHeight - rect.top)
        setProgress(Math.min(1, Math.max(0, offset / total)))
      } else {
        const total = document.documentElement.scrollHeight - window.innerHeight
        const offset = window.scrollY
        setProgress(total > 0 ? Math.min(1, Math.max(0, offset / total)) : 0)
      }
      frame = 0
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(tick)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [target])

  return progress
}
