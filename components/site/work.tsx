'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useInView } from '@/hooks/use-in-view-animation'
import { SectionHeader } from '@/components/primitives/section-header'
import { CtaButton } from '@/components/primitives/cta-button'
import { fadeInUp, stagger } from '@/lib/motion'

interface Project {
  slug: string
  title: string
  subtitle: string
  client: string
  category: string
  year: string
  metric: { value: string; label: string }
  palette: [string, string, string]
}

const PROJECTS: Project[] = [
  {
    slug: 'quantum-finance',
    title: 'Quantum Finance',
    subtitle: 'A fintech identity that scales from app to billboard',
    client: 'Quantum Finance Inc.',
    category: 'Brand Identity · Web',
    year: '2026',
    metric: { value: '+184%', label: 'Sign-up conversion' },
    palette: ['#0f172a', '#fbbf24', '#22d3ee'],
  },
  {
    slug: 'neural-health',
    title: 'Neural Health',
    subtitle: 'A patient-first design system across 17 surfaces',
    client: 'Neural Health Group',
    category: 'Design System · Product',
    year: '2026',
    metric: { value: '4.9★', label: 'App Store rating' },
    palette: ['#0a1c2c', '#22c55e', '#f8fafc'],
  },
  {
    slug: 'echo-studios',
    title: 'Echo Studios',
    subtitle: 'Generative motion graphics for an indie label',
    client: 'Echo Studios',
    category: 'Motion · 3D',
    year: '2025',
    metric: { value: '38M', label: 'Views across launch' },
    palette: ['#1a103a', '#a855f7', '#ec4899'],
  },
  {
    slug: 'velocity-tech',
    title: 'Velocity Tech',
    subtitle: 'Edge-rendered marketing site, 99 Lighthouse',
    client: 'Velocity Tech',
    category: 'Engineering · Web',
    year: '2025',
    metric: { value: '99', label: 'Lighthouse score' },
    palette: ['#0a0a0a', '#fbbf24', '#475569'],
  },
]

export function Work() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-surface-0 py-28 md:py-40"
      aria-labelledby="work-heading"
    >
      <div className="container-nexus">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Selected Work"
            title={
              <span id="work-heading">
                Receipts,
                <br />
                <span className="text-fg-tertiary">not slideware.</span>
              </span>
            }
            description="Four recent projects, the metric that mattered to the team that shipped, and the year on the receipt."
          />
          <CtaButton href="/work" variant="outline" size="md">
            All case studies
          </CtaButton>
        </div>

        <Grid />
      </div>
    </section>
  )
}

function Grid() {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={stagger(0.1, 0.1)}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6"
    >
      <ProjectCard project={PROJECTS[0]} className="md:col-span-7" tall />
      <ProjectCard project={PROJECTS[1]} className="md:col-span-5" />
      <ProjectCard project={PROJECTS[2]} className="md:col-span-5" />
      <ProjectCard project={PROJECTS[3]} className="md:col-span-7" tall />
    </motion.div>
  )
}

function ProjectCard({
  project,
  className = '',
  tall = false,
}: {
  project: Project
  className?: string
  tall?: boolean
}) {
  return (
    <motion.article
      variants={fadeInUp}
      className={`group relative isolate overflow-hidden rounded-2xl border border-line-default bg-surface-1/60 transition-all duration-500 hover:border-line-strong ${className}`}
    >
      <Link
        href={`/work/${project.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
        aria-label={`Open case study: ${project.title}`}
      >
        {/* Visual */}
        <div
          className={`relative w-full overflow-hidden ${tall ? 'aspect-[5/4]' : 'aspect-[5/4]'}`}
          aria-hidden
        >
          <ColorComposition palette={project.palette} title={project.title} />
          {/* Hover scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-0 via-transparent to-transparent opacity-80" />
          {/* Metric pill */}
          <div className="absolute right-4 top-4 flex items-baseline gap-2 rounded-full border border-line-strong bg-surface-0/70 px-3 py-1.5 text-xs text-fg-primary backdrop-blur">
            <span className="font-display font-semibold">{project.metric.value}</span>
            <span className="text-fg-tertiary">{project.metric.label}</span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-fg-tertiary">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-fg-primary transition-colors group-hover:text-brand-amber md:text-3xl">
            {project.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-fg-secondary md:text-base">
            {project.subtitle}
          </p>
          <div className="mt-auto flex items-center gap-2 pt-2 text-[11px] uppercase tracking-[0.18em] text-fg-secondary">
            View case study
            <svg
              className="h-3 w-3 transition-transform group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path d="M1 8h13m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

/**
 * Generative case-study composition — three rotating colored panels with
 * a subtle radial glow. Avoids needing third-party imagery while still
 * conveying a unique brand world per project.
 */
function ColorComposition({ palette, title }: { palette: [string, string, string]; title: string }) {
  const [a, b, c] = palette
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, ${a} 0%, ${a} 35%, ${b} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 mix-blend-screen opacity-90"
        style={{
          background: `radial-gradient(60% 80% at 75% 20%, ${c} 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="absolute inset-0 flex items-end p-7 md:p-10">
        <span
          className="font-display text-5xl font-semibold tracking-tight text-white/90 mix-blend-overlay md:text-7xl"
          style={{ textShadow: '0 1px 0 rgba(0,0,0,0.25)' }}
        >
          {title}
        </span>
      </div>
    </div>
  )
}
