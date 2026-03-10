"use client"

import { motion } from "motion/react"

const weeklyData = [
  { day: "Mon", projects: 3, hours: 6 },
  { day: "Tue", projects: 5, hours: 8 },
  { day: "Wed", projects: 4, hours: 7 },
  { day: "Thu", projects: 7, hours: 10 },
  { day: "Fri", projects: 6, hours: 9 },
  { day: "Sat", projects: 2, hours: 3 },
  { day: "Sun", projects: 1, hours: 2 },
]

const teamPerformance = [
  { name: "Design", completed: 85, color: "#fbbf24" },
  { name: "Development", completed: 72, color: "#3b82f6" },
  { name: "Marketing", completed: 90, color: "#10b981" },
  { name: "Research", completed: 65, color: "#8b5cf6" },
]

const metrics = [
  { label: "Total Views", value: "24.5K", change: "+12.5%", positive: true },
  { label: "Conversion Rate", value: "3.2%", change: "+0.8%", positive: true },
  { label: "Avg. Session", value: "4m 32s", change: "-0.3%", positive: false },
  { label: "Bounce Rate", value: "42%", change: "-5.2%", positive: true },
]

export default function AnalyticsPage() {
  const maxHours = Math.max(...weeklyData.map((d) => d.hours))

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
        <p className="text-white/60 mt-2">Track your performance and insights</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative bg-gradient-to-br from-[#21346e]/60 via-[#1a2a5a]/60 to-[#151f45]/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 overflow-hidden group hover:border-[#fbbf24]/30 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm text-white/50 font-medium uppercase tracking-wider">{metric.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
            <p className={`text-sm mt-2 ${metric.positive ? "text-green-400" : "text-red-400"}`}>
              {metric.change} from last week
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6">Weekly Activity</h3>
          <div className="flex items-end justify-between gap-3 h-48">
            {weeklyData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full bg-gradient-to-t from-[#fbbf24] to-[#f59e0b] rounded-t-lg relative group cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.hours / maxHours) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.6, ease: "easeOut" }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#fbbf24] text-[#0a0a0a] text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.hours}h
                  </div>
                </motion.div>
                <span className="text-xs text-white/50">{data.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6">Team Performance</h3>
          <div className="space-y-5">
            {teamPerformance.map((team, index) => (
              <div key={team.name}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/80 font-medium">{team.name}</span>
                  <span className="text-white/50">{team.completed}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: team.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${team.completed}%` }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "Project completed", target: "Neural Health Platform", time: "2 hours ago", icon: "check" },
            { action: "New comment on", target: "Quantum Finance Rebrand", time: "4 hours ago", icon: "comment" },
            { action: "Team member joined", target: "Echo Studios Identity", time: "Yesterday", icon: "user" },
            { action: "Milestone reached on", target: "Velocity Tech Website", time: "2 days ago", icon: "flag" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#fbbf24]/20 flex items-center justify-center">
                <ActivityIcon type={item.icon} />
              </div>
              <div className="flex-1">
                <p className="text-white">
                  {item.action} <span className="text-[#fbbf24]">{item.target}</span>
                </p>
                <p className="text-sm text-white/40">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "check":
      return (
        <svg className="w-5 h-5 text-[#fbbf24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    case "comment":
      return (
        <svg className="w-5 h-5 text-[#fbbf24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    case "user":
      return (
        <svg className="w-5 h-5 text-[#fbbf24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    case "flag":
      return (
        <svg className="w-5 h-5 text-[#fbbf24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      )
    default:
      return null
  }
}
