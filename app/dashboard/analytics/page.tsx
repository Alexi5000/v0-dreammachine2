"use client"

import { motion } from "motion/react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
        <p className="text-white/60 mt-2">Track your performance and insights</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Project Activity</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/20 rounded-lg">
            <span className="text-white/40">Chart visualization coming soon</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Team Performance</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/20 rounded-lg">
            <span className="text-white/40">Chart visualization coming soon</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
