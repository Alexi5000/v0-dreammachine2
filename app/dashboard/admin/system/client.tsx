"use client"

import { motion } from "motion/react"

export function AdminSystemClient() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">System Status</h1>
          <span className="px-2 py-1 text-xs font-bold bg-[#fbbf24]/20 text-[#fbbf24] rounded">
            Admin Only
          </span>
        </div>
        <p className="text-white/60 mt-2">Monitor system health and configuration</p>
      </motion.div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-white/60">Database</span>
          </div>
          <p className="text-2xl font-bold text-white">Operational</p>
          <p className="text-sm text-white/40 mt-1">Supabase PostgreSQL</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-white/60">Authentication</span>
          </div>
          <p className="text-2xl font-bold text-white">Active</p>
          <p className="text-sm text-white/40 mt-1">Supabase Auth (No 2FA)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-white/60">RLS Policies</span>
          </div>
          <p className="text-2xl font-bold text-white">Enabled</p>
          <p className="text-sm text-white/40 mt-1">Row Level Security Active</p>
        </motion.div>
      </div>

      {/* Security Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Security Configuration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="font-medium text-white">Row Level Security (RLS)</p>
              <p className="text-sm text-white/50">Data isolation per user</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
              Enabled
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="font-medium text-white">Role-Based Access Control (RBAC)</p>
              <p className="text-sm text-white/50">Admin: Alex@techtideai.io</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
              Configured
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-white/50">Additional security layer</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white/60 rounded-full">
              Not Implemented
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="font-medium text-white">Middleware Protection</p>
              <p className="text-sm text-white/50">Route-level authentication</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
              Active
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
