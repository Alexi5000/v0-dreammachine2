"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ShapedButton } from "@/components/ui/shaped-button"

export default function SignUpSuccessPage() {
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
        className="relative w-full max-w-md text-center"
      >
        {/* Card matching hero card design */}
        <div className="relative bg-gradient-to-br from-[#21346e] via-[#1a2a5a] to-[#151f45] rounded-2xl border border-white/10 p-8 md:p-10 overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
          
          {/* Corner glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#fbbf24]/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#fbbf24]/20 flex items-center justify-center"
            >
              <svg
                className="w-10 h-10 text-[#fbbf24]"
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

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Check Your Email
            </h1>
            <p className="text-white/60 mb-8 leading-relaxed">
              We&apos;ve sent a confirmation link to your email address. 
              Click the link to verify your account and access your dashboard directly.
            </p>

            {/* Info box */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
              <p className="text-sm text-white/70">
                <span className="text-[#fbbf24] font-medium">No 2FA required</span> - 
                After email verification, you&apos;ll be directed straight to your dashboard.
              </p>
            </div>

            <Link href="/auth/login">
              <ShapedButton variant="filled" size="md" fullWidth>
                BACK TO LOGIN
              </ShapedButton>
            </Link>

            <p className="mt-6 text-sm text-white/40">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <Link href="/auth/sign-up" className="text-[#fbbf24] hover:underline">
                try again
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
