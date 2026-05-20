'use client'

import { useEffect, useRef, useState } from 'react'

const PARTNERS = [
  'QUANTUM·FINANCE',
  'NEURAL·HEALTH',
  'ECHO·STUDIOS',
  'VELOCITY·TECH',
  'APEX·ANALYTICS',
  'PRISM·OS',
  'LUMEN·LABS',
  'ORACLE·CHAIN',
  'HALO·MEDIA',
  'STRATA·CAPITAL',
]

/**
 * Infinite marquee — partner logotypes set as monospace text.
 * Pauses on hover/focus, GPU-accelerated transform.
 */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  // Duplicate the list once so the loop never seams.
  const items = [...PARTNERS, ...PARTNERS]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.style.animationPlayState = paused ? 'paused' : 'running'
  }, [paused])

  return (
    <section
      aria-label="Trusted by"
      className="relative border-y border-line-subtle bg-surface-0 py-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-nexus mb-4 flex items-center justify-between">
        <p className="display-headline-eyebrow">Trusted by leading teams</p>
        <p className="hidden text-[10px] uppercase tracking-[0.2em] text-fg-quaternary md:block">
          Hover to pause
        </p>
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-12 whitespace-nowrap py-2"
          style={{
            animation: 'marquee 38s linear infinite',
            willChange: 'transform',
          }}
        >
          {items.map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="font-mono text-sm tracking-[0.25em] text-fg-tertiary transition-colors duration-200 hover:text-fg-primary"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
