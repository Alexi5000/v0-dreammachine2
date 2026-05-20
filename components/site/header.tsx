'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { CtaButton } from '@/components/primitives/cta-button'
import { NexusLogo, MenuIcon } from '@/components/icons'
import { NAV_ITEMS, SITE } from '@/lib/site'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer on resize-up
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container-nexus">
        <nav
          aria-label="Primary"
          className={`relative flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 md:px-5 ${
            scrolled
              ? 'border border-line-default bg-surface-0/75 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-fg-primary"
            aria-label={`${SITE.name} — Home`}
          >
            <NexusLogo />
            <span className="font-display text-base font-semibold tracking-tight">
              {SITE.name}
            </span>
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm text-fg-secondary transition-colors duration-200 hover:bg-line-subtle hover:text-fg-primary focus-visible:bg-line-subtle focus-visible:text-fg-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="hidden rounded-full px-3 py-1.5 text-sm text-fg-secondary transition-colors duration-200 hover:bg-line-subtle hover:text-fg-primary md:inline-flex"
            >
              Sign in
            </Link>
            <CtaButton href="/auth/sign-up" variant="secondary" size="sm" className="hidden md:inline-flex">
              Start a project
            </CtaButton>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line-default bg-surface-1/60 text-fg-primary backdrop-blur md:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="container-nexus mt-3 md:hidden"
          >
            <ul className="glass flex flex-col gap-1 rounded-2xl p-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-fg-secondary hover:bg-line-subtle hover:text-fg-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-2">
                <CtaButton href="/auth/login" variant="outline" size="sm">
                  Sign in
                </CtaButton>
                <CtaButton href="/auth/sign-up" variant="secondary" size="sm">
                  Start
                </CtaButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
