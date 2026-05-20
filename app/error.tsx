'use client'

import { useEffect } from 'react'
import { CtaButton } from '@/components/primitives/cta-button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Surface to Vercel Analytics / external logger in production.

    console.error('[nexus/route]', error)
  }, [error])

  return (
    <main className="relative grid min-h-dvh place-items-center bg-surface-0 px-6">
      <div className="mx-auto max-w-xl text-center">
        <p className="display-headline-eyebrow">Something fell over</p>
        <h1 className="display-headline mt-5 text-4xl md:text-6xl">
          A rendering pass <span className="text-fg-tertiary">caught fire.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-fg-secondary">
          We've logged it. You can usually recover by retrying — or take a fresh
          run at it from home.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-fg-quaternary">
            digest: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CtaButton onClick={reset} variant="secondary" size="md">
            Try again
          </CtaButton>
          <CtaButton href="/" variant="outline" size="md">
            Go home
          </CtaButton>
        </div>
      </div>
    </main>
  )
}
