import { NextResponse } from 'next/server'
import { z } from 'zod'
import { features, env } from '@/lib/env'

export const runtime = 'edge'

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_input', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    )
  }
  const { email, source } = parsed.data

  // If Resend isn't configured, accept the signup as a no-op so the
  // marketing site doesn't break in fresh forks.
  if (!features.email) {
    return NextResponse.json({ ok: true, queued: false, note: 'email_not_configured' })
  }

  try {
    // Resend transactional notification — replace with audience/contact creation
    // once the audience id is known. We keep this self-contained for the OSS
    // baseline.
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nexus AI <hello@techtideai.io>',
        to: env.CONTACT_TO_EMAIL ?? 'hello@techtideai.io',
        subject: `New newsletter signup: ${email}`,
        text: `Signup from ${source ?? 'site'}: ${email}`,
      }),
    })
    if (!res.ok) {
      const text = await res.text()

      console.error('[newsletter] resend error', res.status, text)
      return NextResponse.json({ error: 'upstream_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true, queued: true })
  } catch (err) {
    console.error('[newsletter] unexpected', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
