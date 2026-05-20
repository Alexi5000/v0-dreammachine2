import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const runtime = 'edge'
export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Brand-system OG card.
 * Composition: split layout, kinetic display headline left, brand mark right,
 * meta footer with stack pills.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(80% 60% at 100% 0%, #1a2a5a 0%, #0a0a0a 60%), radial-gradient(60% 40% at 0% 100%, #3b2a0a 0%, transparent 70%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          position: 'relative',
        }}
      >
        {/* Hairline grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(60% 60% at 50% 50%, black 30%, transparent 100%)',
          }}
        />

        {/* Top — wordmark + status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path
                d="M10 30V10L20 22L30 10V30"
                stroke="#0a0a0a"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            {SITE.name}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 18,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.62)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: '#34d399',
                boxShadow: '0 0 14px #34d399',
              }}
            />
            AI-Native Studio
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              maxWidth: 1040,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.08em',
            }}
          >
            Design that thinks
            <br />
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>with you.</span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 920,
              lineHeight: 1.35,
            }}
          >
            Brand systems, generative interfaces, motion experiences — composed by
            fine-tuned models and finished by senior humans.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            fontSize: 22,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          <span style={{ fontFamily: 'monospace' }}>v0-dreammachine2.vercel.app</span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {['Next.js 16', 'Supabase', 'Vercel AI SDK'].map((p) => (
              <span
                key={p}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
