'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { SectionHeader } from '@/components/primitives/section-header'
import { fadeInUp, stagger } from '@/lib/motion'
import { useInView } from '@/hooks/use-in-view-animation'

interface Step {
  index: string
  title: string
  duration: string
  body: string
  artifacts: string[]
}

const STEPS: Step[] = [
  {
    index: '01',
    title: 'Diagnose',
    duration: 'Week 1',
    body:
      'We embed a senior team into your context. Read every doc. Talk to ten customers. Audit the surface area. Output: a written diagnosis you would pay for on its own.',
    artifacts: ['Customer interviews', 'Visual audit', 'Positioning brief'],
  },
  {
    index: '02',
    title: 'Compose',
    duration: 'Week 2–3',
    body:
      'We tune models to your tone, palette, and competitors. Then we run a thousand variants overnight and review the top dozen by morning. Your taste, our throughput.',
    artifacts: ['Model fine-tune', 'Variant gallery', 'Decision matrix'],
  },
  {
    index: '03',
    title: 'Refine',
    duration: 'Week 4–5',
    body:
      'The strongest direction is taken from concept to system. Every component, motion, and token documented so your team can extend without ambiguity.',
    artifacts: ['Design system', 'Motion spec', 'Brand guidelines'],
  },
  {
    index: '04',
    title: 'Ship',
    duration: 'Week 6+',
    body:
      'We ship to production, instrument every flow, and stay on call for the launch window. Then we leave a team that can keep building.',
    artifacts: ['Edge deploy', 'Observability', 'Team handoff'],
  },
]

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })
  const lineFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-surface-0 py-28 md:py-40"
      aria-labelledby="process-heading"
    >
      <div className="container-nexus">
        <SectionHeader
          eyebrow="Process"
          title={
            <span id="process-heading">
              A weekly cadence,
              <br />
              <span className="text-fg-tertiary">never a black box.</span>
            </span>
          }
          description="Studio output without studio politics. You see what we see, when we see it. Sprints are short, decisions are written down, and direction is reversible."
        />

        <div className="relative mt-16 md:mt-24">
          {/* Track line */}
          <div className="pointer-events-none absolute left-[18px] top-0 h-full w-px bg-line-subtle md:left-1/2">
            <motion.div
              style={{ height: lineFill }}
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-brand-amber via-brand-amber/40 to-transparent"
            />
          </div>

          <ol className="space-y-16 md:space-y-32">
            {STEPS.map((step, i) => (
              <Row key={step.index} step={step} flip={i % 2 === 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Row({ step, flip }: { step: Step; flip: boolean }) {
  const { ref, isVisible } = useInView<HTMLLIElement>({ threshold: 0.25 })

  return (
    <motion.li
      ref={ref}
      variants={stagger(0.08, 0.05)}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={`relative grid grid-cols-[40px_1fr] items-start gap-6 md:grid-cols-2 md:gap-12 ${
        flip ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* Node */}
      <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2">
        <div
          className={`relative grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface-1 font-mono text-xs text-fg-secondary transition-all duration-500 ${
            isVisible ? 'shadow-[0_0_0_8px_color-mix(in_oklch,var(--brand-amber)_10%,transparent)]' : ''
          }`}
        >
          {step.index}
        </div>
      </div>

      {/* Card */}
      <motion.div
        variants={fadeInUp}
        className={`min-w-0 md:col-span-1 ${flip ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
      >
        <div className="display-headline-eyebrow text-fg-tertiary">{step.duration}</div>
        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg-primary md:text-4xl">
          {step.title}
        </h3>
        <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-fg-secondary md:text-lg">
          {step.body}
        </p>
        <ul
          className={`mt-5 flex flex-wrap gap-2 ${flip ? 'md:justify-end' : ''}`}
        >
          {step.artifacts.map((a) => (
            <li
              key={a}
              className="rounded-full border border-line-default bg-surface-1/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-fg-secondary"
            >
              {a}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Spacer (the side the card doesn't occupy) */}
      <div className="hidden md:block" />
    </motion.li>
  )
}
