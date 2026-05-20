import { NextResponse } from 'next/server'
import { features } from '@/lib/env'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

/**
 * /api/health — Lightweight liveness probe used by uptime monitors,
 * deploy verification, and the CI smoke gate.
 *
 * Returns:
 *   - status: "ok" if the route handler runs
 *   - features: which optional integrations are configured
 *   - commit: GIT_COMMIT_SHA from build env (set by Vercel automatically)
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'nexus-ai',
      version: process.env.npm_package_version ?? '1.0.0',
      commit:
        process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
        process.env.GIT_COMMIT_SHA?.slice(0, 7) ??
        'local',
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
      timestamp: new Date().toISOString(),
      features,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Robots-Tag': 'noindex',
      },
    },
  )
}
