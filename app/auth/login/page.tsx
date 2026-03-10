"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { createClient } from "@/lib/supabase/client"
import { ShapedButton } from "@/components/ui/shaped-button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

    // Direct redirect to dashboard after successful authentication
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background effects matching hero */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#21346e]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fbbf24]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md"
      >
        {/* Card matching hero card design */}
        <div className="relative bg-gradient-to-br from-[#21346e] via-[#1a2a5a] to-[#151f45] rounded-2xl border border-white/10 p-8 md:p-10 overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
          
          {/* Corner glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#fbbf24]/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Logo/Brand */}
            <Link href="/" className="inline-block mb-8">
              <span className="text-2xl font-bold text-white tracking-tight">
                NEXUS<span className="text-[#fbbf24]">.</span>
              </span>
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white/60 mb-8">
              Sign in to access your dashboard
            </p>

            {/* Login Form - No 2FA implemented */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#fbbf24]/50 focus:ring-1 focus:ring-[#fbbf24]/50 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#fbbf24]/50 focus:ring-1 focus:ring-[#fbbf24]/50 transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
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
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </ShapedButton>
            </form>

            {/* Sign up link */}
            <p className="mt-8 text-center text-white/50 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors font-medium"
              >
                Get Started
              </Link>
            </p>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#fbbf24] via-[#fbbf24]/50 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}
