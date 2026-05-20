/**
 * Runtime environment validation.
 *
 * Boundaries are validated with Zod. Public variables (NEXT_PUBLIC_*) are
 * available on both server and client. Server-only secrets are only
 * validated server-side.
 */

import { z } from 'zod'

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
})

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  AI_GATEWAY_API_KEY: z.string().optional(),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
})

const parsedPublic = publicSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
})

const parsedServer =
  typeof window === 'undefined'
    ? serverSchema.safeParse({
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        AI_GATEWAY_API_KEY: process.env.AI_GATEWAY_API_KEY,
        GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : { success: true as const, data: {} as z.infer<typeof serverSchema> }

if (!parsedPublic.success) {
  // We intentionally do not throw — the marketing site should still render
  // without a Supabase project configured. Surface a console warning instead.

  console.warn('[nexus/env] Invalid public env:', parsedPublic.error.flatten().fieldErrors)
}

export const env = {
  ...(parsedPublic.success ? parsedPublic.data : {}),
  ...(parsedServer.success ? parsedServer.data : {}),
} as z.infer<typeof publicSchema> & Partial<z.infer<typeof serverSchema>>

/**
 * Feature flags derived from env presence. Use these instead of
 * `process.env.X !== undefined` checks scattered through the app.
 */
export const features = {
  supabase: Boolean(
    env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
  ai: Boolean(
    env.AI_GATEWAY_API_KEY ??
      env.GOOGLE_GENERATIVE_AI_API_KEY ??
      env.ANTHROPIC_API_KEY ??
      env.OPENAI_API_KEY,
  ),
  email: Boolean(env.RESEND_API_KEY && env.CONTACT_TO_EMAIL),
  rateLimit: Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN),
} as const
