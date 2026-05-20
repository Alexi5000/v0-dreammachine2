'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view-animation'
import { SectionHeader } from '@/components/primitives/section-header'
import { CtaButton } from '@/components/primitives/cta-button'
import { fadeInUp, stagger } from '@/lib/motion'

interface Tier {
  name: string
  pitch: string
  price: { monthly: string; project: string }
  cadence: { monthly: string; project: string }
  highlight?: boolean
  features: string[]
  cta: { label: string; href: string }
}

const TIERS: Tier[] = [
  {
    name: 'Sprint',
    pitch: 'A focused 2-week engagement to land a brand artifact or campaign.',
    price: { monthly: '$8,500', project: '$8,500' },
    cadence: { monthly: 'per sprint', project: 'fixed' },
    features: [
      'One artifact: identity, microsite, or motion package',
      '1 senior lead + 1 specialist',
      'Async standups, weekly review',
      'Source files + brand book',
    ],
    cta: { label: 'Start a sprint', href: '/auth/sign-up?plan=sprint' },
  },
  {
    name: 'Studio',
    pitch: 'A monthly retainer that pairs an embedded team with model tuning.',
    price: { monthly: '$24,000', project: '$72,000' },
    cadence: { monthly: 'per month', project: 'per quarter' },
    highlight: true,
    features: [
      'Everything in Sprint',
      'Custom model fine-tuned to your brand',
      'Embedded senior team (3–5)',
      'Weekly live working sessions',
      'Unlimited revisions inside scope',
      'Quarterly roadmap & OKR review',
    ],
    cta: { label: 'Book intro call', href: '/auth/sign-up?plan=studio' },
  },
  {
    name: 'Platform',
    pitch: 'When your studio needs to be a platform — and stay one.',
    price: { monthly: 'Custom', project: 'Custom' },
    cadence: { monthly: '', project: '' },
    features: [
      'Everything in Studio',
      'Dedicated design platform team',
      'Multi-brand model management',
      'White-label client portals',
      'SLA + 24/7 incident response',
      'Quarterly executive review',
    ],
    cta: { label: 'Talk to Alex', href: 'mailto:hello@techtideai.io' },
  },
]

export function Pricing() {
  const [mode, setMode] = useState<'monthly' | 'project'>('monthly')
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 bg-surface-0 py-28 md:py-40"
      aria-labelledby="pricing-heading"
    >
      <div className="container-nexus">
        <SectionHeader
          eyebrow="Pricing"
          title={
            <span id="pricing-heading">
              Transparent rates,
              <br />
              <span className="text-fg-tertiary">scoped weekly.</span>
            </span>
          }
          description="Pick a cadence. Every engagement is scoped in writing before the first invoice — no scope-creep theater."
          align="center"
          className="mx-auto"
        />

        {/* Toggle */}
        <div className="mt-10 flex justify-center" role="radiogroup" aria-label="Billing cadence">
          <div className="inline-flex items-center gap-1 rounded-full border border-line-default bg-surface-1 p-1">
            {(['monthly', 'project'] as const).map((m) => (
              <button
                key={m}
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                  mode === m
                    ? 'bg-brand-amber text-[#0a0a0a]'
                    : 'text-fg-secondary hover:text-fg-primary'
                }`}
              >
                {m === 'monthly' ? 'Monthly' : 'Project'}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={stagger(0.08)}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {TIERS.map((t) => (
            <PricingCard key={t.name} tier={t} mode={mode} />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-sm text-fg-tertiary">
          All pricing in USD. Engagements include async support during business hours.
        </p>
      </div>
    </section>
  )
}

function PricingCard({ tier, mode }: { tier: Tier; mode: 'monthly' | 'project' }) {
  return (
    <motion.article
      variants={fadeInUp}
      className={`relative isolate flex flex-col overflow-hidden rounded-2xl border p-7 md:p-9 ${
        tier.highlight
          ? 'border-brand-amber/40 bg-gradient-to-b from-surface-2 to-surface-1 shadow-[0_24px_64px_-32px_color-mix(in_oklch,var(--brand-amber)_30%,transparent)]'
          : 'border-line-default bg-surface-1/60'
      }`}
    >
      {tier.highlight && (
        <div className="absolute right-7 top-7 rounded-full bg-brand-amber-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-amber">
          Most chosen
        </div>
      )}

      <header>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-fg-primary">
          {tier.name}
        </h3>
        <p className="mt-2 max-w-xs text-sm text-fg-secondary">{tier.pitch}</p>
      </header>

      <div className="mt-7 flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold tracking-tight text-fg-primary md:text-5xl">
          {tier.price[mode]}
        </span>
        {tier.cadence[mode] && (
          <span className="text-sm text-fg-tertiary">{tier.cadence[mode]}</span>
        )}
      </div>

      <ul className="mt-7 flex flex-col gap-2.5 border-t border-line-subtle pt-6 text-sm text-fg-secondary">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-amber" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <CtaButton
          href={tier.cta.href}
          variant={tier.highlight ? 'secondary' : 'outline'}
          size="md"
          fullWidth
        >
          {tier.cta.label}
        </CtaButton>
      </div>
    </motion.article>
  )
}

function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path
        d="m3.5 8 3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
