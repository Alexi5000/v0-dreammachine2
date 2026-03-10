"use client"

import { usePathname } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/nav"

interface DashboardShellProps {
  children: React.ReactNode
  userName: string
  userEmail: string
  isAdmin: boolean
}

const mobileNavItems = [
  { href: "/dashboard", label: "Home", icon: "home" },
  { href: "/dashboard/projects", label: "Projects", icon: "folder" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "chart" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
]

export function DashboardShell({ children, userName, userEmail, isAdmin }: DashboardShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#21346e]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#fbbf24]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Sidebar Navigation - Hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block">
          <DashboardNav 
            userName={userName} 
            userEmail={userEmail} 
            isAdmin={isAdmin} 
          />
        </div>
        
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 safe-area-inset-top">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white tracking-tight">
              NEXUS<span className="text-[#fbbf24]">.</span>
            </span>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-[#fbbf24]/20 text-[#fbbf24] rounded">
                  Admin
                </span>
              )}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center text-[#0a0a0a] font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Bottom Navigation */}
        <nav 
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              return (
                <MobileNavLink 
                  key={item.href}
                  href={item.href} 
                  label={item.label} 
                  icon={item.icon}
                  isActive={isActive}
                />
              )
            })}
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}

function MobileNavLink({ href, label, icon, isActive }: { href: string; label: string; icon: string; isActive: boolean }) {
  return (
    <a 
      href={href} 
      className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
        isActive ? "text-[#fbbf24]" : "text-white/60 hover:text-[#fbbf24]"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <MobileNavIcon type={icon} isActive={isActive} />
      <span className="text-[10px] font-medium">{label}</span>
      {isActive && <div className="w-1 h-1 rounded-full bg-[#fbbf24] mt-0.5" />}
    </a>
  )
}

function MobileNavIcon({ type, isActive }: { type: string; isActive: boolean }) {
  const className = `w-5 h-5 transition-colors ${isActive ? "text-[#fbbf24]" : ""}`
  switch (type) {
    case "home":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case "folder":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    case "chart":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    case "settings":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    default:
      return null
  }
}
