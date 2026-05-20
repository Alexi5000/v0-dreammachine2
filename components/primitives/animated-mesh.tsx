'use client'

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

interface AnimatedMeshProps {
  /** Opacity 0–1 for the mesh layer */
  intensity?: number
  className?: string
}

/**
 * Canvas-based animated gradient mesh. Pure 2D — no WebGL — so it runs
 * everywhere including mobile Safari. Performance budget: < 1ms/frame.
 *
 * Renders 4 organic gradient blobs that drift on slow Lissajous paths
 * and blend additively into a Studio-Ghibli-meets-aurora feel.
 */
export function AnimatedMesh({ intensity = 0.9, className = '' }: AnimatedMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const setSize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize, { passive: true })

    // 4 blobs — palette tuned to brand cobalt + amber accents on cool black.
    type Blob = { hue: number; r: number; cx: number; cy: number; ax: number; ay: number; sx: number; sy: number }
    const blobs: Blob[] = [
      { hue: 218, r: 360, cx: 0.18, cy: 0.30, ax: 0.10, ay: 0.07, sx: 0.00018, sy: 0.00021 },
      { hue: 268, r: 320, cx: 0.78, cy: 0.20, ax: 0.08, ay: 0.10, sx: 0.00012, sy: 0.00024 },
      { hue: 42,  r: 260, cx: 0.55, cy: 0.78, ax: 0.12, ay: 0.05, sx: 0.00020, sy: 0.00015 },
      { hue: 200, r: 420, cx: 0.30, cy: 0.85, ax: 0.06, ay: 0.04, sx: 0.00015, sy: 0.00018 },
    ]

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      for (const b of blobs) {
        const x = (b.cx + b.ax * Math.sin(t * b.sx)) * width
        const y = (b.cy + b.ay * Math.cos(t * b.sy)) * height
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r)
        g.addColorStop(0, `hsla(${b.hue}, 78%, 56%, ${0.35 * intensity})`)
        g.addColorStop(0.45, `hsla(${b.hue}, 78%, 36%, ${0.16 * intensity})`)
        g.addColorStop(1, 'hsla(0, 0%, 0%, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = reduced ? 0 : requestAnimationFrame(draw)
    }

    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [intensity, reduced])

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Subtle film grain over the mesh */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* Bottom fade for legibility of overlapping content */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-surface-0" />
    </div>
  )
}
