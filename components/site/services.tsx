'use client'

import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view-animation'
import { SectionHeader } from '@/components/primitives/section-header'
import { fadeInUp, stagger } from '@/lib/motion'

interface Service {
  title: string
  description: string
  icon: React.ReactNode
  bullets: string[]
  /** Optional emphasis: highlights a card visually. */
  featured?: boolean
}

const SERVICES: Service[] = [
  {
    title: 'AI Brand Identity',
    description:
      'A living identity system trained on your story. Logos that adapt to context, palettes that learn from audience response, voice that compounds across channels.',
    icon: <IconLogo />,
    bullets: ['Adaptive logo systems', 'Voice & tone engine', 'Brand book auto-generation'],
    featured: true,
  },
  {
    title: 'Generative Interfaces',
    description:
      'Interfaces that compose themselves. Layouts, copy, and visuals generated on demand and validated against your design constraints.',
    icon: <IconGrid />,
    bullets: ['1k+ variant testing', 'Constraint-based layout', 'Storybook + Figma sync'],
  },
  {
    title: 'Motion & 3D',
    description:
      'Motion that explains, never decorates. Lottie, WebGL, and procedural pipelines wired up to scroll, state, and time.',
    icon: <IconWaveform />,
    bullets: ['Scroll-driven storytelling', 'Spline + Three.js', '60fps everywhere'],
  },
  {
    title: 'Production Engineering',
    description:
      'Shipped, not slideware. Next.js, edge functions, Supabase, Stripe — instrumented for the long run.',
    icon: <IconStack />,
    bullets: ['95+ Lighthouse', 'Edge + ISR', 'Observability built-in'],
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 bg-surface-0 py-28 md:py-40"
      aria-labelledby="services-heading"
    >
      <div className="container-nexus">
        <SectionHeader
          eyebrow="Services"
          title={
            <span id="services-heading">
              Four disciplines.
              <br />
              <span className="text-fg-tertiary">One studio.</span>
            </span>
          }
          description="We don't generalize. We compose a small senior team around each project and pair them with custom-tuned models so velocity compounds without losing taste."
        />

        <Grid />
      </div>
    </section>
  )
}

function Grid() {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      variants={stagger(0.1)}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="mt-16 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-6 md:gap-5"
    >
      {SERVICES.map((s, i) => (
        <ServiceCard key={s.title} service={s} variant={cardVariant(i)} />
      ))}
    </motion.div>
  )
}

// Bento layout: featured card spans 4 cols, others 2.
function cardVariant(i: number): 'wide' | 'standard' {
  return i === 0 ? 'wide' : 'standard'
}

interface CardProps {
  service: Service
  variant: 'wide' | 'standard'
}

function ServiceCard({ service, variant }: CardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      className={`group relative isolate overflow-hidden rounded-2xl border border-line-default bg-surface-1/60 p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-line-strong hover:bg-surface-2/70 md:p-9 ${
        variant === 'wide' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2'
      }`}
    >
      {/* Glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), color-mix(in oklch, var(--brand-amber) 14%, transparent), transparent 50%)',
        }}
      />
      {/* Top hairline */}
      <span
        aria-hidden
        className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />

      <header className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-line-default bg-surface-2 text-fg-primary">
          {service.icon}
        </div>
        {service.featured && (
          <span className="rounded-full bg-brand-amber-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-amber">
            Flagship
          </span>
        )}
      </header>

      <h3
        className={`mt-8 font-display font-semibold tracking-tight text-fg-primary ${
          variant === 'wide' ? 'text-3xl md:text-4xl' : 'text-2xl'
        }`}
      >
        {service.title}
      </h3>
      <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-fg-secondary md:text-base">
        {service.description}
      </p>

      <ul className="mt-7 flex flex-col gap-2 border-t border-line-subtle pt-5 text-sm text-fg-secondary">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="grid h-4 w-4 place-items-center rounded-full border border-line-strong text-[10px] text-fg-tertiary">
              +
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

/* ----- Icons (line, 24x24) ------------------------------------------- */
function IconLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16v16H4z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" strokeLinecap="round" />
    </svg>
  )
}
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
function IconWaveform() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 12h2M9 6v12M14 9v6M19 4v16" />
    </svg>
  )
}
function IconStack() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 18l9 5 9-5" opacity="0.6" />
    </svg>
  )
}
