"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ShapedButton } from "@/components/ui/shaped-button"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#21346e]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md text-center"
      >
        {/* Card */}
        <div className="relative bg-gradient-to-br from-[#21346e] via-[#1a2a5a] to-[#151f45] rounded-2xl border border-white/10 p-8 md:p-10 overflow-hidden">
          {/* Top accent line - red for error */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
            >
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Authentication Error
            </h1>
            <p className="text-white/60 mb-8 leading-relaxed">
              Something went wrong during authentication. This could be due to an 
              expired link, invalid credentials, or a network issue.
            </p>

            <div className="flex flex-col gap-3">
              <Link href="/auth/login">
                <ShapedButton variant="filled" size="md" fullWidth>
                  TRY AGAIN
                </ShapedButton>
              </Link>
              <Link href="/">
                <ShapedButton variant="outline" size="md" fullWidth>
                  BACK TO HOME
                </ShapedButton>
              </Link>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-500/50 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}
