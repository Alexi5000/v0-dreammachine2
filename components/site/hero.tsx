'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { KineticHeadline } from '@/components/primitives/kinetic-headline'
import { AnimatedMesh } from '@/components/primitives/animated-mesh'
import { CtaButton } from '@/components/primitives/cta-button'
import { fadeInUp, stagger, transitions } from '@/lib/motion'

const STATS = [
  { value: '120+', label: 'Brand systems shipped' },
  { value: '0→1', label: 'Studio to platform partnerships' },
  { value: '24h', label: 'From brief to first concept' },
  { value: '∞', label: 'Variations generated per night' },
]

export function Hero() {
  const [year] = useState(() => new Date().getFullYear())

  // Defer hero canvas until after first paint so it never blocks LCP.
  const [meshReady, setMeshReady] = useState(false)
  useEffect(() => {
    const idle =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (window as any).requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 1)
    const id = idle(() => setMeshReady(true), { timeout: 250 })
    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        ;(window as any).cancelIdleCallback?.(id)
      } else {
        clearTimeout(id as unknown as number)
      }
    }
  }, [])

  return (
    <section
      id="main"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-surface-0 pb-20 pt-32 md:pb-32 md:pt-40"
      aria-labelledby="hero-heading"
    >
      {/* Animated mesh background */}
      {meshReady && <AnimatedMesh className="z-0" intensity={0.95} />}

      {/* Edge vignette so type stays legible at any scroll */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.6)_75%,#0a0a0a_100%)]" />

      <div className="container-nexus relative z-10">
        {/* Eyebrow */}
        <motion.div
          variants={stagger(0.06, 0.2)}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-10"
        >
          <motion.p
            variants={fadeInUp}
            className="display-headline-eyebrow flex items-center gap-3 text-fg-tertiary"
          >
            <span
              className="relative inline-flex h-1.5 w-1.5 items-center justify-center"
              aria-hidden
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-amber opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-amber" />
            </span>
            <span>{year} · AI-native design studio</span>
            <span className="hidden h-px w-12 bg-line-strong md:inline-block" />
            <span className="hidden text-fg-quaternary md:inline">Now booking Q3</span>
          </motion.p>

          {/* Headline */}
          <div id="hero-heading">
            <KineticHeadline
              lines={[
                'Design that thinks',
                'with you.',
              ]}
              className="text-[14vw] leading-[0.9] md:text-[clamp(64px,9.5vw,164px)]"
            />
          </div>

          {/* Subhead + CTAs */}
          <motion.div
            variants={fadeInUp}
            className="grid items-end gap-10 md:grid-cols-[1fr_auto]"
          >
            <p className="max-w-xl text-balance text-lg leading-relaxed text-fg-secondary md:text-xl">
              Nexus AI is a design studio where every brief is paired with a
              custom-tuned model. We compose brand systems, generative
              interfaces, and motion experiences that adapt to anyone who
              opens them.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <CtaButton href="/auth/sign-up" variant="secondary" size="lg">
                Start a project
                <svg
                  className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 8h13m-4-4 4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CtaButton>
              <CtaButton href="#work" variant="outline" size="lg">
                See the work
              </CtaButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Inline live demo card + stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.slow, delay: 0.6 }}
          className="mt-20 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
        >
          <LiveDemoCard />
          <Stats />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-fg-quaternary"
        aria-hidden
      >
        <span className="flex flex-col items-center gap-2">
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-fg-quaternary to-transparent" />
        </span>
      </motion.div>
    </section>
  )
}

function LiveDemoCard() {
  return (
    <div className="glass relative w-full max-w-md rounded-2xl p-5 md:max-w-lg">
      <div className="absolute inset-x-5 -top-px h-px bg-gradient-to-r from-transparent via-brand-amber/60 to-transparent" />
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-fg-tertiary">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live · nexus-orchestrator
        </span>
        <span className="font-mono text-fg-quaternary">v1.0</span>
      </div>
      <div className="mt-4 space-y-2 font-mono text-xs leading-relaxed text-fg-secondary">
        <p className="text-fg-quaternary">$ nexus generate "Brand identity for a quantum-finance fintech"</p>
        <p>
          <span className="text-brand-amber">→</span> Drafting tone of voice…
          <span className="animate-[caret-blink_1.1s_steps(1)_infinite] text-fg-primary">▍</span>
        </p>
        <p>
          <span className="text-brand-amber">→</span> Composing palette · 6 variants
        </p>
        <p>
          <span className="text-brand-amber">→</span> Generating logo lockups · 24 candidates
        </p>
        <p className="text-fg-quaternary">… ready for review in 9.4s</p>
      </div>
    </div>
  )
}

function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-x-10 gap-y-4 md:grid-cols-[repeat(4,minmax(0,1fr))]">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <dt className="font-display text-2xl font-semibold tracking-tight text-fg-primary md:text-3xl">
            {s.value}
          </dt>
          <dd className="max-w-[10ch] text-[11px] uppercase leading-snug tracking-[0.18em] text-fg-tertiary">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  )
}
