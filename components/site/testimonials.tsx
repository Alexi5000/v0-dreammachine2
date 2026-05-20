'use client'

import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view-animation'
import { SectionHeader } from '@/components/primitives/section-header'
import { fadeInUp, stagger } from '@/lib/motion'

interface Testimonial {
  quote: string
  author: string
  role: string
  org: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'The Nexus team shipped a brand system that our engineers, marketers, and partners reach for daily. The model they fine-tuned is now part of our stack.',
    author: 'Maya Chen',
    role: 'Head of Brand',
    org: 'Quantum Finance',
  },
  {
    quote:
      'We had 11 weeks to ship to App Store and the design system shipped with us. Day-one stability on a surface that normally takes a year.',
    author: 'Joel Park',
    role: 'VP Product',
    org: 'Neural Health',
  },
  {
    quote:
      'They treat design like compounding software. Every artifact is a primitive other teams can extend without asking permission.',
    author: 'Anaïs Rivers',
    role: 'Founder & CEO',
    org: 'Echo Studios',
  },
  {
    quote:
      'A studio that codes, an engineering team that has taste. Rare to find both. We re-engaged the next quarter.',
    author: 'David Stenberg',
    role: 'CTO',
    org: 'Velocity Tech',
  },
  {
    quote:
      'The diagnosis they wrote in week one would have been worth the engagement on its own. Velocity after that was a bonus.',
    author: 'Priya Subramanian',
    role: 'CMO',
    org: 'Apex Analytics',
  },
  {
    quote:
      'Generative work that doesn\'t look generative. That\'s the whole game and they\'re the few who\'ve figured it out.',
    author: 'Tom Nakamura',
    role: 'Creative Director',
    org: 'Prism OS',
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 bg-surface-0 py-28 md:py-40"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-nexus">
        <SectionHeader
          eyebrow="Reception"
          title={
            <span id="testimonials-heading">
              The teams we ship with
              <br />
              <span className="text-fg-tertiary">tell the story.</span>
            </span>
          }
        />

        <Grid />
      </div>
    </section>
  )
}

function Grid() {
  const { ref, isVisible } = useInView<HTMLUListElement>({ threshold: 0.1 })

  return (
    <motion.ul
      ref={ref}
      variants={stagger(0.06)}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
    >
      {TESTIMONIALS.map((t, i) => (
        <Card key={t.author} testimonial={t} featured={i === 0} />
      ))}
    </motion.ul>
  )
}

function Card({ testimonial, featured }: { testimonial: Testimonial; featured?: boolean }) {
  return (
    <motion.li
      variants={fadeInUp}
      className={`relative isolate flex flex-col overflow-hidden rounded-2xl border border-line-default p-7 transition-all duration-500 hover:border-line-strong ${
        featured
          ? 'bg-surface-2/80 lg:row-span-2'
          : 'bg-surface-1/60'
      }`}
    >
      <span
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100"
      />
      <Quote className={`h-6 w-6 ${featured ? 'text-brand-amber' : 'text-fg-quaternary'}`} />
      <blockquote className="mt-5 flex-1 text-pretty text-base leading-relaxed text-fg-secondary md:text-lg">
        {testimonial.quote}
      </blockquote>
      <footer className="mt-7 flex items-center gap-3 border-t border-line-subtle pt-5">
        <Avatar name={testimonial.author} />
        <div>
          <p className="text-sm font-medium text-fg-primary">{testimonial.author}</p>
          <p className="text-xs text-fg-tertiary">
            {testimonial.role} · {testimonial.org}
          </p>
        </div>
      </footer>
    </motion.li>
  )
}

function Quote({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M9.5 6C6.46 6 4 8.46 4 11.5V18h6v-6.5H6.6c0-1.6 1.3-2.9 2.9-2.9V6zm10 0c-3.04 0-5.5 2.46-5.5 5.5V18h6v-6.5h-3.4c0-1.6 1.3-2.9 2.9-2.9V6z" />
    </svg>
  )
}

/** Deterministic monogram avatar from initials. */
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  // Hash name → hue
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  const hue = h % 360
  return (
    <div
      className="grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-white"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 70% 45%), hsl(${(hue + 40) % 360} 70% 30%))`,
      }}
      aria-hidden
    >
      {initials}
    </div>
  )
}
