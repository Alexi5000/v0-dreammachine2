'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ShapedButton } from '@/components/ui/shaped-button'
import { SITE } from '@/lib/site'
import { fadeInUp, transitions } from '@/lib/motion'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] p-4">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#21346e]/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#fbbf24]/10 blur-3xl" />
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={transitions.base}
        className="relative w-full max-w-md text-center"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#21346e] via-[#1a2a5a] to-[#151f45] p-8 md:p-10">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#fbbf24]/10 blur-3xl" />

          <div className="relative z-10">
            {/* Animated check icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fbbf24]/20"
            >
              <svg
                className="h-10 w-10 text-[#fbbf24]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Check your email
            </h1>
            <p className="mb-8 leading-relaxed text-white/60">
              We sent a confirmation link to your email address.
              Click the link to verify your account and access your dashboard.
            </p>

            <div className="mb-8 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">
                <span className="font-medium text-[#fbbf24]">No 2FA required</span>{' '}
                &ndash; after email verification, you go straight to your dashboard.
              </p>
            </div>

            <Link href="/auth/login">
              <ShapedButton variant="filled" size="md" fullWidth>
                BACK TO LOGIN
              </ShapedButton>
            </Link>

            <p className="mt-6 text-sm text-white/40">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <Link
                href="/auth/sign-up"
                className="text-[#fbbf24] hover:underline"
              >
                try again
              </Link>
            </p>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#fbbf24] via-[#fbbf24]/50 to-transparent" />
        </div>
      </motion.div>

      {/* Stack footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 mt-8 flex flex-col items-center gap-3"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {['Next.js 16', 'React 19', 'Supabase Auth', 'Tailwind v4'].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/40"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-xs text-white/25">
          {SITE.name} by {SITE.author}
        </p>
      </motion.div>
    </div>
  )
}
