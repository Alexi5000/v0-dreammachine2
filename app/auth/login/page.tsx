'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { createClient } from '@/lib/supabase/client'
import { ShapedButton } from '@/components/ui/shaped-button'
import { SITE } from '@/lib/site'
import { fadeInUp, transitions } from '@/lib/motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

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
        className="relative w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#21346e] via-[#1a2a5a] to-[#151f45] p-8 md:p-10">
          {/* Accent line */}
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#fbbf24]/10 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" className="mb-8 inline-block">
              <span className="text-2xl font-bold tracking-tight text-white">
                NEXUS<span className="text-[#fbbf24]">.</span>
              </span>
            </Link>

            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Welcome back
            </h1>
            <p className="mb-8 text-white/60">
              Sign in to access your dashboard
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 transition-all focus:border-[#fbbf24]/50 focus:outline-none focus:ring-1 focus:ring-[#fbbf24]/50"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 transition-all focus:border-[#fbbf24]/50 focus:outline-none focus:ring-1 focus:ring-[#fbbf24]/50"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <ShapedButton
                type="submit"
                variant="filled"
                size="md"
                fullWidth
                disabled={loading}
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </ShapedButton>
            </form>

            <p className="mt-8 text-center text-sm text-white/50">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/sign-up"
                className="font-medium text-[#fbbf24] transition-colors hover:text-[#fbbf24]/80"
              >
                Get started
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
