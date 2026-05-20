import { NextResponse } from 'next/server'
import { z } from 'zod'
import { features, env } from '@/lib/env'

export const runtime = 'edge'

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(120).optional(),
  message: z.string().min(10).max(4000),
  budget: z.enum(['<10k', '10–25k', '25–75k', '75k+']).optional(),
  // Honeypot — bots fill this; humans never see it.
  website: z.string().optional(),
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

  if (parsed.data.website) {
    // Honeypot tripped — pretend success to bots.
    return NextResponse.json({ ok: true })
  }

  if (!features.email) {
    return NextResponse.json({ ok: true, queued: false, note: 'email_not_configured' })
  }

  const { name, email, company, message, budget } = parsed.data
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nexus AI <hello@techtideai.io>',
        to: env.CONTACT_TO_EMAIL ?? 'hello@techtideai.io',
        reply_to: email,
        subject: `[Nexus] ${name}${company ? ` · ${company}` : ''}${budget ? ` · ${budget}` : ''}`,
        text: message,
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('[contact] resend error', res.status, text)
      return NextResponse.json({ error: 'upstream_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] unexpected', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
