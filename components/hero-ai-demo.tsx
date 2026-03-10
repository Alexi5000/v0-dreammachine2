"use client"

import { useState, useCallback, memo } from "react"
import { motion, AnimatePresence } from "motion/react"

// Musk #3: Real-time AI logo generation demo in the hero
// This creates a "wow" moment by showing AI capability immediately

interface GeneratedLogo {
  name: string
  colors: string[]
  shape: "circle" | "square" | "hexagon" | "triangle"
  style: "minimal" | "bold" | "tech" | "organic"
}

function generateLogo(companyName: string): GeneratedLogo {
  // Deterministic generation based on company name
  const hash = companyName.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
  
  const colorPalettes = [
    ["#3B82F6", "#1D4ED8", "#60A5FA"],
    ["#10B981", "#059669", "#34D399"],
    ["#8B5CF6", "#7C3AED", "#A78BFA"],
    ["#F59E0B", "#D97706", "#FBBF24"],
    ["#EF4444", "#DC2626", "#F87171"],
    ["#EC4899", "#DB2777", "#F472B6"],
  ]
  
  const shapes: GeneratedLogo["shape"][] = ["circle", "square", "hexagon", "triangle"]
  const styles: GeneratedLogo["style"][] = ["minimal", "bold", "tech", "organic"]
  
  return {
    name: companyName,
    colors: colorPalettes[hash % colorPalettes.length],
    shape: shapes[hash % shapes.length],
    style: styles[(hash * 3) % styles.length],
  }
}

function LogoPreview({ logo }: { logo: GeneratedLogo }) {
  const renderShape = () => {
    const [primary, secondary, accent] = logo.colors
    
    switch (logo.shape) {
      case "circle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`grad-${logo.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill={`url(#grad-${logo.name})`} />
            <circle cx="50" cy="50" r="25" fill="none" stroke={accent} strokeWidth="2" />
            <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
              {logo.name.charAt(0).toUpperCase()}
            </text>
          </svg>
        )
      case "square":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`grad-${logo.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>
            </defs>
            <rect x="15" y="15" width="70" height="70" rx="12" fill={`url(#grad-${logo.name})`} />
            <rect x="30" y="30" width="40" height="40" rx="6" fill="none" stroke={accent} strokeWidth="2" />
            <text x="50" y="58" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
              {logo.name.charAt(0).toUpperCase()}
            </text>
          </svg>
        )
      case "hexagon":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`grad-${logo.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>
            </defs>
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill={`url(#grad-${logo.name})`} />
            <polygon points="50,25 75,38 75,62 50,75 25,62 25,38" fill="none" stroke={accent} strokeWidth="2" />
            <text x="50" y="58" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">
              {logo.name.charAt(0).toUpperCase()}
            </text>
          </svg>
        )
      case "triangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`grad-${logo.name}`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>
            </defs>
            <polygon points="50,15 85,80 15,80" fill={`url(#grad-${logo.name})`} />
            <polygon points="50,35 70,70 30,70" fill="none" stroke={accent} strokeWidth="2" />
            <text x="50" y="65" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
              {logo.name.charAt(0).toUpperCase()}
            </text>
          </svg>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-24 h-24 md:w-32 md:h-32"
    >
      {renderShape()}
    </motion.div>
  )
}

export const HeroAIDemo = memo(function HeroAIDemo() {
  const [companyName, setCompanyName] = useState("")
  const [generatedLogo, setGeneratedLogo] = useState<GeneratedLogo | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const handleGenerate = useCallback(() => {
    if (!companyName.trim()) return
    
    setIsGenerating(true)
    setGeneratedLogo(null)
    
    // Simulate AI generation with streaming effect
    setTimeout(() => {
      const logo = generateLogo(companyName.trim())
      setGeneratedLogo(logo)
      setIsGenerating(false)
    }, 1500)
  }, [companyName])

  if (!showDemo) {
    return (
      <motion.button
        onClick={() => setShowDemo(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm font-medium hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Try AI Demo
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col sm:flex-row items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
    >
      {/* Close button */}
      <button
        onClick={() => setShowDemo(false)}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
        aria-label="Close demo"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div className="flex-1 flex items-center gap-3">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="Enter company name..."
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/40 transition-colors"
          maxLength={20}
        />
        <motion.button
          onClick={handleGenerate}
          disabled={isGenerating || !companyName.trim()}
          className="px-4 py-2 bg-white text-[#161a20] font-bold text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32" className="animate-[spin_1s_linear_infinite]" />
              </svg>
              Generating...
            </span>
          ) : (
            "Generate"
          )}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {generatedLogo && (
          <motion.div
            key={generatedLogo.name}
            className="flex items-center gap-3"
          >
            <LogoPreview logo={generatedLogo} />
            <div className="text-left">
              <p className="text-white font-bold text-sm">{generatedLogo.name}</p>
              <p className="text-white/50 text-xs">AI Generated</p>
              <div className="flex gap-1 mt-1">
                {generatedLogo.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </motion.div>
  )
})
