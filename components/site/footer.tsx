'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { NexusLogo } from '@/components/icons'
import { SITE, SOCIAL } from '@/lib/site'
import { toast } from 'sonner'

const NAV = [
  {
    heading: 'Studio',
    items: [
      { label: 'Services', href: '/#services' },
      { label: 'Work', href: '/#work' },
      { label: 'Process', href: '/#process' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'Manifesto', href: '/manifesto' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: 'mailto:hello@techtideai.io' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Open source', href: SITE.repo },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Trust & privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      toast.success("You're on the list. We'll write occasionally.")
      setEmail('')
    } catch {
      toast.error('Could not subscribe right now — try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="relative bg-surface-0">
      <div aria-hidden className="hairline mx-auto max-w-7xl" />
      <div className="container-nexus py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 text-fg-primary">
              <NexusLogo />
              <span className="font-display text-base font-semibold tracking-tight">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-fg-secondary">
              {SITE.description}
            </p>

            <form onSubmit={onSubmit} className="mt-8 flex max-w-md gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className="flex-1 rounded-full border border-line-default bg-surface-1 px-4 py-2.5 text-sm text-fg-primary placeholder:text-fg-quaternary focus-visible:border-brand-amber focus-visible:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-fg-primary px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-fg-primary/90 disabled:opacity-60"
              >
                {submitting ? 'Saving…' : 'Subscribe'}
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M1 8h13m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            <p className="mt-2 text-xs text-fg-tertiary">
              One letter a month. No tracking pixels.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-7">
            {NAV.map((group) => (
              <div key={group.heading}>
                <p className="display-headline-eyebrow text-fg-tertiary">{group.heading}</p>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-fg-secondary transition-colors hover:text-fg-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line-subtle pt-8 md:flex-row md:items-center"
        >
          <p className="text-xs text-fg-tertiary">
            © {new Date().getFullYear()} {SITE.name}. Crafted with frontier models and human taste.
          </p>
          <div className="flex items-center gap-4 text-fg-tertiary">
            <a aria-label="GitHub" href={SOCIAL.github} className="transition-colors hover:text-fg-primary">
              <SocialIcon name="github" />
            </a>
            <a aria-label="X (Twitter)" href={SOCIAL.x} className="transition-colors hover:text-fg-primary">
              <SocialIcon name="x" />
            </a>
            <a aria-label="LinkedIn" href={SOCIAL.linkedin} className="transition-colors hover:text-fg-primary">
              <SocialIcon name="linkedin" />
            </a>
            <a aria-label="Dribbble" href={SOCIAL.dribbble} className="transition-colors hover:text-fg-primary">
              <SocialIcon name="dribbble" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }: { name: 'github' | 'x' | 'linkedin' | 'dribbble' }) {
  const map = {
    github: (
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2.18c-3.2.7-3.88-1.36-3.88-1.36-.53-1.35-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.21-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.37-5.25 5.65.42.36.79 1.08.79 2.18v3.23c0 .31.21.66.8.55C20.21 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    ),
    x: <path d="M18.244 2H21.5l-7.5 8.575L23 22h-6.844L11.05 15.6 4.99 22H1.731l8.063-9.196L1 2h7.012l4.62 6.13L18.244 2zM17.1 20.2h1.83L7.04 3.7H5.078L17.1 20.2z" />,
    linkedin: (
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.49 1c1.37 0 2.49 1.12 2.49 2.5zM.22 8h4.55v15.5H.22V8zm7.46 0h4.36v2.13h.06c.61-1.14 2.11-2.34 4.34-2.34 4.64 0 5.5 3.05 5.5 7.02V23.5h-4.55v-6.87c0-1.64-.03-3.75-2.28-3.75-2.29 0-2.64 1.79-2.64 3.63V23.5H7.68V8z" />
    ),
    dribbble: (
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm9.05 12.79c-.3-.07-3.04-.6-6.07-.22.66 1.79 1.21 3.62 1.61 5.45 2.18-1.47 3.73-3.84 4.46-5.23zM12 21.97c-2.32 0-4.45-.84-6.11-2.22 1.18-2.42 4.4-3.71 7.96-3.71 1.07 0 2.06.09 2.99.27-.42 1.84-1.04 3.6-1.84 5.27-.97.25-1.97.39-3 .39zm-7.45-3.6C2.5 16.6 1.05 14.42.42 12c1.41-.16 6.16-.68 9.92-.32-.62-1.01-1.42-2.07-2.32-3.07-.92.27-1.86.42-2.81.42-.86 0-1.71-.12-2.51-.34.4-3.3 2.8-6.03 5.84-7.16-.05.08-1.7 2.43-2.66 4.94 3.27-.86 6.71-.78 9.99.27-.74 1.5-1.95 2.71-3.42 3.49-.66-1.4-1.41-2.74-2.27-3.92-2.92 1.16-5.27 3.55-6.41 6.59zm15.96-1.46c-.4-1.83-.95-3.66-1.61-5.45 2.59-.39 5.34-.04 7.85.71-.74 2.07-2.22 3.86-4.16 4.96-.65-.07-1.34-.16-2.08-.22z" />
    ),
  }
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      {map[name]}
    </svg>
  )
}
