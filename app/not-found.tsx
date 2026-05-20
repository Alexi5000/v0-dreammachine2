import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { CtaButton } from '@/components/primitives/cta-button'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="relative grid min-h-[80svh] place-items-center bg-surface-0 px-6 pt-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="display-headline-eyebrow">Error 404</p>
          <h1 className="display-headline mt-5 text-5xl md:text-7xl">
            This page <span className="text-fg-tertiary">drifted off-canvas.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-fg-secondary">
            The URL you tried doesn't exist — or never did. Head home and
            we'll get you back to something real.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href="/" variant="secondary" size="md">
              Take me home
            </CtaButton>
            <Link
              href="/#work"
              className="text-sm text-fg-secondary underline-offset-4 hover:text-fg-primary hover:underline"
            >
              Or browse selected work →
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
