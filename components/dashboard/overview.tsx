"use client"

import { motion } from "motion/react"
import Link from "next/link"

interface DashboardOverviewProps {
  userName: string
  isAdmin: boolean
  userEmail: string
}

const stats = [
  { label: "Active Projects", value: "12", change: "+2 this week", positive: true },
  { label: "Completed", value: "48", change: "+5 this month", positive: true },
  { label: "Team Members", value: "8", change: "No change", positive: null },
  { label: "Total Hours", value: "2,847", change: "+124 hrs", positive: true },
]

const recentProjects = [
  { name: "Quantum Finance Rebrand", status: "In Progress", progress: 75 },
  { name: "Neural Health Platform", status: "Review", progress: 90 },
  { name: "Echo Studios Identity", status: "In Progress", progress: 45 },
  { name: "Velocity Tech Website", status: "Planning", progress: 15 },
]

const quickActions = [
  { name: "New Project", href: "/dashboard/projects/new", icon: PlusIcon },
  { name: "View Analytics", href: "/dashboard/analytics", icon: ChartIcon },
  { name: "Team Chat", href: "/dashboard/chat", icon: ChatIcon },
  { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
]

export function DashboardOverview({ userName, isAdmin, userEmail }: DashboardOverviewProps) {
  const firstName = userName.split(" ")[0]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Welcome back, <span className="text-[#fbbf24]">{firstName}</span>
        </h1>
        <p className="text-white/60 mt-2">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </motion.div>

      {/* Admin Badge */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-lg"
        >
          <div className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse" />
          <span className="text-sm text-[#fbbf24] font-medium">
            Admin Access Enabled - Full privileges for {userEmail}
          </span>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative bg-gradient-to-br from-[#21346e]/60 via-[#1a2a5a]/60 to-[#151f45]/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 overflow-hidden group hover:border-[#fbbf24]/30 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm text-white/50 font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 ${
              stat.positive === true ? "text-green-400" : 
              stat.positive === false ? "text-red-400" : "text-white/40"
            }`}>
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.name}
              href={action.href}
              className="relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#fbbf24]/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#21346e]/60 flex items-center justify-center group-hover:bg-[#fbbf24]/20 transition-colors">
                <action.icon className="w-6 h-6 text-white/60 group-hover:text-[#fbbf24] transition-colors" />
              </div>
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {action.name}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Projects</h2>
          <Link
            href="/dashboard/projects"
            className="text-sm text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="divide-y divide-white/5">
          {recentProjects.map((project, index) => (
            <div
              key={project.name}
              className="p-6 flex items-center gap-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-white">{project.name}</h3>
                <p className="text-sm text-white/50 mt-1">{project.status}</p>
              </div>
              <div className="w-32">
                <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-[#21346e]/30 border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
            <ShieldIcon className="w-5 h-5 text-[#fbbf24]" />
          </div>
          <div>
            <h3 className="font-bold text-white">Dashboard Protected</h3>
            <p className="text-sm text-white/60 mt-1">
              This dashboard is fully protected with Row Level Security (RLS) and Role-Based Access Control (RBAC). 
              {isAdmin 
                ? " As an admin, you have full access to all features and user management capabilities."
                : " Your data is isolated and secured based on your user role."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Icons
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}
