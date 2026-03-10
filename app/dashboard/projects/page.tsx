"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

// Loading skeleton component
function ProjectSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1">
          <div className="h-5 w-48 bg-white/10 rounded mb-3" />
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="h-5 w-20 bg-white/10 rounded" />
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-4 w-28 bg-white/10 rounded" />
          </div>
        </div>
        <div className="w-full sm:w-40">
          <div className="h-3 w-full bg-white/10 rounded mb-2" />
          <div className="h-2 w-full bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

const projects = [
  { id: 1, name: "Quantum Finance Rebrand", status: "In Progress", progress: 75, team: 4, dueDate: "Mar 15, 2026" },
  { id: 2, name: "Neural Health Platform", status: "Review", progress: 90, team: 6, dueDate: "Mar 10, 2026" },
  { id: 3, name: "Echo Studios Identity", status: "In Progress", progress: 45, team: 3, dueDate: "Mar 25, 2026" },
  { id: 4, name: "Velocity Tech Website", status: "Planning", progress: 15, team: 5, dueDate: "Apr 5, 2026" },
  { id: 5, name: "Apex Analytics Dashboard", status: "Completed", progress: 100, team: 4, dueDate: "Feb 28, 2026" },
  { id: 6, name: "Prism Design System", status: "In Progress", progress: 60, team: 7, dueDate: "Mar 30, 2026" },
]

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state (in production, this would be actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-white/60 mt-2">Manage and track all your active projects</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="px-4 py-2 bg-[#fbbf24] text-[#0a0a0a] font-bold rounded-lg hover:bg-[#fbbf24]/90 transition-colors text-center sm:text-left"
          aria-label="Create new project"
        >
          + New Project
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {[...Array(4)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-[#fbbf24]/30 transition-all group cursor-pointer"
                role="article"
                aria-label={`Project: ${project.name}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#fbbf24] transition-colors truncate">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        project.status === "Completed" ? "bg-green-500/20 text-green-400" :
                        project.status === "In Progress" ? "bg-blue-500/20 text-blue-400" :
                        project.status === "Review" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-white/10 text-white/60"
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-white/40">{project.team} members</span>
                      <span className="text-sm text-white/40 hidden sm:inline">Due: {project.dueDate}</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-40 flex-shrink-0">
                    <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
