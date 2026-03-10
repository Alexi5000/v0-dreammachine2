"use client"

import { useState, useCallback, useRef, useEffect, createContext, useContext, useMemo, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { createClient } from "@/lib/supabase/client"

// Types
interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  setCollapsed: (collapsed: boolean) => void
}

interface CacheEntry {
  content: ReactNode
  timestamp: number
}

// Context for sidebar state
const SidebarContext = createContext<SidebarContextType | null>(null)

// Hook to use sidebar state
export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Provider component
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Persist sidebar state in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed")
    if (stored !== null) {
      setIsCollapsed(stored === "true")
    }
  }, [])

  const setCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed)
    localStorage.setItem("sidebar-collapsed", String(collapsed))
  }, [])

  const toggleSidebar = useCallback(() => {
    setCollapsed(!isCollapsed)
  }, [isCollapsed, setCollapsed])

  const value = useMemo(() => ({
    isCollapsed,
    toggleSidebar,
    setCollapsed,
  }), [isCollapsed, toggleSidebar, setCollapsed])

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

// Cache for tab content - survives re-renders
const contentCache = new Map<string, CacheEntry>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Hook for cached content rendering
export function useCachedContent(key: string, content: ReactNode) {
  const cacheRef = useRef(contentCache)
  
  useEffect(() => {
    // Update cache with new content
    cacheRef.current.set(key, {
      content,
      timestamp: Date.now(),
    })
    
    // Clean up expired entries
    const now = Date.now()
    for (const [k, v] of cacheRef.current.entries()) {
      if (now - v.timestamp > CACHE_TTL) {
        cacheRef.current.delete(k)
      }
    }
  }, [key, content])
  
  return cacheRef.current.get(key)?.content || content
}

// Nav items configuration
const navItems = [
  { name: "Overview", href: "/dashboard", icon: "home" },
  { name: "Projects", href: "/dashboard/projects", icon: "folder" },
  { name: "Analytics", href: "/dashboard/analytics", icon: "chart" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
]

const adminItems = [
  { name: "Users", href: "/dashboard/admin/users", icon: "users" },
  { name: "System", href: "/dashboard/admin/system", icon: "server" },
]

interface CollapsibleSidebarProps {
  userName: string
  userEmail: string
  isAdmin: boolean
}

export function CollapsibleSidebar({ userName, userEmail, isAdmin }: CollapsibleSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const { isCollapsed, toggleSidebar } = useSidebar()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  // Animation variants for smooth transitions
  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 72 },
  }

  const textVariants = {
    expanded: { opacity: 1, x: 0, display: "block" },
    collapsed: { opacity: 0, x: -10, display: "none" },
  }

  return (
    <motion.aside
      initial={false}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-full bg-gradient-to-b from-[#21346e]/50 via-[#1a2a5a]/50 to-[#151f45]/50 backdrop-blur-xl border-r border-white/10 flex flex-col z-50 overflow-hidden"
      aria-label="Dashboard navigation"
    >
      {/* Header with Logo and Toggle */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between min-h-[72px]">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center text-[#0a0a0a] font-bold text-sm flex-shrink-0">
            N
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-bold text-white tracking-tight whitespace-nowrap"
              >
                NEXUS<span className="text-[#fbbf24]">.</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        
        {/* Toggle Button */}
        <motion.button
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden" role="navigation" aria-label="Main menu">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-bold uppercase text-white/30 tracking-widest px-3 mb-3"
            >
              Main Menu
            </motion.p>
          )}
        </AnimatePresence>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <NavItem
              key={item.name}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
            />
          )
        })}

        {/* Admin Section */}
        {isAdmin && (
          <>
            <div className="pt-4 pb-2">
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-bold uppercase text-[#fbbf24]/50 tracking-widest px-3 mb-2"
                  >
                    Admin
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            {adminItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                />
              )
            })}
          </>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-white/10">
        <div className={`flex items-center gap-3 p-2 rounded-lg bg-white/5 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center text-[#0a0a0a] font-bold text-sm flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-white truncate">{userName}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-white/40 truncate">{userEmail}</p>
                  {isAdmin && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-[#fbbf24]/20 text-[#fbbf24] rounded flex-shrink-0">
                      Admin
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Sign Out Button */}
        <motion.button
          onClick={handleSignOut}
          aria-label="Sign out of your account"
          className={`mt-2 w-full flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogoutIcon className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Collapsed indicator tooltip */}
      {isCollapsed && isAdmin && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse" />
        </div>
      )}
    </motion.aside>
  )
}

// Nav Item Component with tooltip for collapsed state
function NavItem({ 
  item, 
  isActive, 
  isCollapsed 
}: { 
  item: { name: string; href: string; icon: string }
  isActive: boolean
  isCollapsed: boolean
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
          isCollapsed ? "justify-center" : ""
        } ${
          isActive
            ? "bg-[#fbbf24]/20 text-[#fbbf24]"
            : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
        onMouseEnter={() => isCollapsed && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <NavIcon 
          type={item.icon} 
          className={`w-5 h-5 flex-shrink-0 ${
            isActive ? "text-[#fbbf24]" : "text-white/40 group-hover:text-white/60"
          }`}
        />
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-medium whitespace-nowrap"
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
        {isActive && !isCollapsed && (
          <motion.div 
            layoutId="activeIndicator"
            className="ml-auto w-1.5 h-1.5 rounded-full bg-[#fbbf24]" 
          />
        )}
      </Link>

      {/* Tooltip for collapsed state */}
      <AnimatePresence>
        {isCollapsed && showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50"
          >
            <div className="px-3 py-1.5 bg-[#21346e] border border-white/10 rounded-lg shadow-lg whitespace-nowrap">
              <span className="text-sm font-medium text-white">{item.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Icon component
function NavIcon({ type, className }: { type: string; className?: string }) {
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
    case "users":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    case "server":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    default:
      return null
  }
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
}
