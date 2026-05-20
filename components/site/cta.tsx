'use client'

import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view-animation'
import { CtaButton } from '@/components/primitives/cta-button'
import { fadeInUp, stagger } from '@/lib/motion'

export function FinalCta() {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section
      aria-label="Start a project"
      className="relative isolate scroll-mt-24 overflow-hidden bg-surface-0 py-28 md:py-40"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, color-mix(in oklch, var(--brand-amber) 16%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          mixBlendMode: 'overlay',
        }}
      />

      <div className="container-nexus">
        <motion.div
          ref={ref}
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeInUp} className="display-headline-eyebrow">
            Make something disproportionate
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="display-headline mt-5 text-balance text-4xl md:text-6xl lg:text-7xl"
          >
            <span>Bring us a brief.</span>
            <br />
            <span className="text-fg-tertiary">
              We'll bring receipts.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-fg-secondary md:text-lg"
          >
            We respond to every serious inquiry within 24 hours with a written take.
            If we can help, we'll scope it. If we can't, we'll tell you who can.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <CtaButton href="/auth/sign-up" variant="secondary" size="lg">
              Start a project
            </CtaButton>
            <CtaButton href="mailto:hello@techtideai.io" variant="outline" size="lg">
              Email us
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
