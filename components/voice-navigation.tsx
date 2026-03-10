"use client"

import { useState, useEffect, useCallback, useRef, memo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"

// Voice Navigation Component with comprehensive troubleshooting support
// Implements Web Speech API with error handling, accessibility, and debug capabilities

interface VoiceCommand {
  phrases: string[]
  action: () => void
  description: string
}

type VoiceStatus = 
  | "idle" 
  | "listening" 
  | "processing" 
  | "error" 
  | "unsupported" 
  | "permission-denied"
  | "no-speech"
  | "network-error"

interface DiagnosticInfo {
  browserSupport: boolean
  permissionStatus: PermissionState | "unknown"
  networkOnline: boolean
  lastError: string | null
  attemptsCount: number
}

export const VoiceNavigation = memo(function VoiceNavigation() {
  const router = useRouter()
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  
  // State management
  const [status, setStatus] = useState<VoiceStatus>("idle")
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [showHelp, setShowHelp] = useState(false)
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  
  // Diagnostic tracking
  const [diagnostics, setDiagnostics] = useState<DiagnosticInfo>({
    browserSupport: false,
    permissionStatus: "unknown",
    networkOnline: true,
    lastError: null,
    attemptsCount: 0,
  })

  // Define voice commands with descriptions for help menu
  const commands: VoiceCommand[] = [
    {
      phrases: ["show projects", "show me projects", "go to projects", "projects"],
      description: "View portfolio projects",
      action: () => {
        showCommandFeedback("Navigating to Projects...")
        setTimeout(() => {
          document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
        }, 500)
      },
    },
    {
      phrases: ["show services", "what do you do", "services"],
      description: "View available services",
      action: () => {
        showCommandFeedback("Showing Services...")
        setTimeout(() => {
          document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
        }, 500)
      },
    },
    {
      phrases: ["get started", "sign up", "start now", "begin"],
      description: "Start the sign-up process",
      action: () => {
        showCommandFeedback("Starting sign up...")
        setTimeout(() => router.push("/auth/sign-up"), 500)
      },
    },
    {
      phrases: ["go to dashboard", "dashboard", "my dashboard"],
      description: "Go to dashboard",
      action: () => {
        showCommandFeedback("Opening dashboard...")
        setTimeout(() => router.push("/dashboard"), 500)
      },
    },
    {
      phrases: ["play reel", "show reel", "play video", "watch video"],
      description: "Play the showcase video",
      action: () => {
        showCommandFeedback("Playing reel...")
      },
    },
    {
      phrases: ["go home", "home", "back to top", "scroll top"],
      description: "Return to top of page",
      action: () => {
        showCommandFeedback("Going to top...")
        window.scrollTo({ top: 0, behavior: "smooth" })
      },
    },
    {
      phrases: ["contact", "get in touch", "reach out"],
      description: "View contact information",
      action: () => {
        showCommandFeedback("Showing contact...")
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
      },
    },
    {
      phrases: ["help", "what can you do", "commands"],
      description: "Show available commands",
      action: () => {
        setShowHelp(true)
        showCommandFeedback("Showing help...")
      },
    },
  ]

  const showCommandFeedback = useCallback((message: string) => {
    setFeedbackMessage(message)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2000)
  }, [])

  const processCommand = useCallback(
    (text: string) => {
      const lowerText = text.toLowerCase().trim()
      console.log("[v0] Processing voice command:", lowerText)
      
      for (const command of commands) {
        for (const phrase of command.phrases) {
          if (lowerText.includes(phrase)) {
            console.log("[v0] Command matched:", phrase)
            command.action()
            return true
          }
        }
      }
      
      console.log("[v0] No command match found")
      showCommandFeedback(`Command not recognized: "${text}"`)
      return false
    },
    [commands, showCommandFeedback]
  )

  // Check microphone permission
  const checkMicrophonePermission = useCallback(async () => {
    try {
      if (navigator.permissions) {
        const result = await navigator.permissions.query({ name: "microphone" as PermissionName })
        setDiagnostics(prev => ({ ...prev, permissionStatus: result.state }))
        console.log("[v0] Microphone permission status:", result.state)
        return result.state
      }
      return "unknown"
    } catch (error) {
      console.log("[v0] Permission check error:", error)
      return "unknown"
    }
  }, [])

  // Request microphone access explicitly
  const requestMicrophoneAccess = useCallback(async () => {
    try {
      console.log("[v0] Requesting microphone access...")
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // Stop the stream immediately - we just needed permission
      stream.getTracks().forEach(track => track.stop())
      setDiagnostics(prev => ({ ...prev, permissionStatus: "granted" }))
      console.log("[v0] Microphone access granted")
      return true
    } catch (error) {
      console.log("[v0] Microphone access denied:", error)
      setStatus("permission-denied")
      setDiagnostics(prev => ({ 
        ...prev, 
        permissionStatus: "denied",
        lastError: "Microphone access denied"
      }))
      return false
    }
  }, [])

  const startListening = useCallback(async () => {
    if (!isSupported) {
      console.log("[v0] Speech recognition not supported")
      setStatus("unsupported")
      return
    }

    // Check network connectivity
    if (!navigator.onLine) {
      console.log("[v0] Network offline")
      setStatus("network-error")
      setDiagnostics(prev => ({ 
        ...prev, 
        networkOnline: false,
        lastError: "No network connection"
      }))
      showCommandFeedback("No internet connection")
      return
    }

    // Check/request microphone permission
    const permissionStatus = await checkMicrophonePermission()
    if (permissionStatus === "denied") {
      setStatus("permission-denied")
      showCommandFeedback("Microphone access denied")
      return
    }
    
    if (permissionStatus === "prompt" || permissionStatus === "unknown") {
      const granted = await requestMicrophoneAccess()
      if (!granted) return
    }

    // Stop any existing recognition
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition
      
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"
      recognition.maxAlternatives = 3

      recognition.onstart = () => {
        console.log("[v0] Speech recognition started")
        setStatus("listening")
        setTranscript("")
        setDiagnostics(prev => ({ 
          ...prev, 
          attemptsCount: prev.attemptsCount + 1,
          lastError: null 
        }))
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex
        const result = event.results[current]
        const text = result[0].transcript
        
        console.log("[v0] Speech result:", text, "isFinal:", result.isFinal)
        setTranscript(text)
        
        if (result.isFinal) {
          setStatus("processing")
          processCommand(text)
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.log("[v0] Speech recognition error:", event.error)
        
        const errorMessages: Record<string, { status: VoiceStatus; message: string }> = {
          "not-allowed": { 
            status: "permission-denied", 
            message: "Microphone access denied. Please enable in browser settings." 
          },
          "no-speech": { 
            status: "no-speech", 
            message: "No speech detected. Please try again." 
          },
          "network": { 
            status: "network-error", 
            message: "Network error. Check your connection." 
          },
          "aborted": { 
            status: "idle", 
            message: "" 
          },
          "audio-capture": { 
            status: "error", 
            message: "No microphone found. Check your device." 
          },
          "service-not-allowed": { 
            status: "error", 
            message: "Speech service not available." 
          },
        }
        
        const errorInfo = errorMessages[event.error] || { 
          status: "error" as VoiceStatus, 
          message: `Error: ${event.error}` 
        }
        
        setStatus(errorInfo.status)
        setDiagnostics(prev => ({ ...prev, lastError: event.error }))
        
        if (errorInfo.message) {
          showCommandFeedback(errorInfo.message)
        }
      }

      recognition.onend = () => {
        console.log("[v0] Speech recognition ended")
        if (status === "listening") {
          setStatus("idle")
        }
      }

      recognition.start()
    } catch (error) {
      console.log("[v0] Failed to start recognition:", error)
      setStatus("error")
      setDiagnostics(prev => ({ 
        ...prev, 
        lastError: error instanceof Error ? error.message : "Unknown error" 
      }))
    }
  }, [isSupported, status, checkMicrophonePermission, requestMicrophoneAccess, processCommand, showCommandFeedback])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort()
      recognitionRef.current = null
    }
    setStatus("idle")
  }, [])

  // Run diagnostics
  const runDiagnostics = useCallback(async () => {
    console.log("[v0] Running voice diagnostics...")
    setShowDiagnostics(true)
    
    const browserSupport = typeof window !== "undefined" && 
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    
    const permissionStatus = await checkMicrophonePermission()
    
    setDiagnostics(prev => ({
      ...prev,
      browserSupport,
      permissionStatus: permissionStatus as PermissionState,
      networkOnline: navigator.onLine,
    }))
  }, [checkMicrophonePermission])

  // Initialize
  useEffect(() => {
    const supported = typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    
    setIsSupported(supported)
    setDiagnostics(prev => ({ ...prev, browserSupport: supported }))
    
    if (!supported) {
      setStatus("unsupported")
      console.log("[v0] Speech recognition not supported in this browser")
    }

    // Listen for online/offline events
    const handleOnline = () => setDiagnostics(prev => ({ ...prev, networkOnline: true }))
    const handleOffline = () => setDiagnostics(prev => ({ ...prev, networkOnline: false }))
    
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  // Keyboard shortcut (Alt+V to toggle voice)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "v") {
        e.preventDefault()
        if (status === "listening") {
          stopListening()
        } else {
          startListening()
        }
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [status, startListening, stopListening])

  // Get status display info
  const getStatusDisplay = () => {
    switch (status) {
      case "listening":
        return { color: "bg-red-500", text: "Listening...", animate: true }
      case "processing":
        return { color: "bg-yellow-500", text: "Processing...", animate: true }
      case "error":
        return { color: "bg-orange-500", text: "Error", animate: false }
      case "permission-denied":
        return { color: "bg-orange-500", text: "Permission denied", animate: false }
      case "no-speech":
        return { color: "bg-gray-500", text: "No speech detected", animate: false }
      case "network-error":
        return { color: "bg-orange-500", text: "Network error", animate: false }
      case "unsupported":
        return { color: "bg-gray-500", text: "Not supported", animate: false }
      default:
        return { color: "bg-white/10", text: "Voice commands", animate: false }
    }
  }

  const statusDisplay = getStatusDisplay()

  // Don't render if completely unsupported
  if (status === "unsupported") return null

  return (
    <>
      {/* Voice activation button with status indicator */}
      <motion.button
        onClick={status === "listening" ? stopListening : startListening}
        onContextMenu={(e) => { e.preventDefault(); runDiagnostics() }}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
          statusDisplay.color
        } ${status === "idle" ? "backdrop-blur-sm border border-white/20 hover:bg-white/20" : ""} ${
          status === "listening" ? "shadow-[0_0_30px_rgba(239,68,68,0.5)]" : ""
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={statusDisplay.text}
        aria-pressed={status === "listening"}
        role="switch"
        aria-describedby="voice-help-hint"
      >
        {/* Microphone icon with status */}
        <svg
          className={`w-6 h-6 ${status === "listening" ? "text-white animate-pulse" : "text-white/80"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {status === "permission-denied" || status === "error" ? (
            // X icon for error states
            <>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" opacity="0.5" />
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2.5" />
            </>
          ) : (
            // Normal microphone
            <>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </>
          )}
        </svg>
        
        {/* Listening animation rings */}
        {statusDisplay.animate && (
          <>
            <motion.span
              className={`absolute inset-0 rounded-full border-2 ${
                status === "listening" ? "border-red-400" : "border-yellow-400"
              }`}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              aria-hidden="true"
            />
            <motion.span
              className={`absolute inset-0 rounded-full border-2 ${
                status === "listening" ? "border-red-400" : "border-yellow-400"
              }`}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              aria-hidden="true"
            />
          </>
        )}
      </motion.button>

      {/* Hidden hint for screen readers */}
      <span id="voice-help-hint" className="sr-only">
        Press Alt+V to toggle voice commands. Right-click for diagnostics.
      </span>

      {/* Transcript display with enhanced feedback */}
      <AnimatePresence>
        {(status === "listening" || status === "processing") && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 z-50 w-72 p-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  status === "listening" ? "bg-red-500 animate-pulse" : "bg-yellow-500"
                }`} />
                <span className="text-white/60 text-xs uppercase tracking-wider font-medium">
                  {status === "listening" ? "Listening" : "Processing"}
                </span>
              </div>
              <button 
                onClick={stopListening}
                className="text-white/40 hover:text-white/80 transition-colors"
                aria-label="Stop listening"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-white font-medium min-h-[1.5rem]">
              {transcript || "Speak now..."}
            </p>
            
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-white/40 text-xs">
                Try: &quot;Show projects&quot; &bull; &quot;Get started&quot; &bull; &quot;Help&quot;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command feedback toast */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
            role="alert"
          >
            <p className="text-white font-bold text-xl">{feedbackMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a2850] border border-white/20 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="help-title"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="help-title" className="text-xl font-bold text-white">Voice Commands</h2>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="text-white/60 hover:text-white transition-colors p-1"
                  aria-label="Close help"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {commands.map((cmd, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white font-medium mb-1">{cmd.description}</p>
                    <p className="text-white/50 text-sm">
                      Say: {cmd.phrases.slice(0, 2).map(p => `"${p}"`).join(" or ")}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/40 text-xs">
                  Keyboard shortcut: <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">Alt + V</kbd>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diagnostics panel */}
      <AnimatePresence>
        {showDiagnostics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowDiagnostics(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a2850] border border-white/20 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="diagnostics-title"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="diagnostics-title" className="text-xl font-bold text-white">Voice Diagnostics</h2>
                <button 
                  onClick={() => setShowDiagnostics(false)}
                  className="text-white/60 hover:text-white transition-colors p-1"
                  aria-label="Close diagnostics"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <DiagnosticRow 
                  label="Browser Support" 
                  value={diagnostics.browserSupport ? "Supported" : "Not Supported"}
                  status={diagnostics.browserSupport ? "success" : "error"}
                />
                <DiagnosticRow 
                  label="Microphone Permission" 
                  value={diagnostics.permissionStatus}
                  status={diagnostics.permissionStatus === "granted" ? "success" : 
                          diagnostics.permissionStatus === "denied" ? "error" : "warning"}
                />
                <DiagnosticRow 
                  label="Network Status" 
                  value={diagnostics.networkOnline ? "Online" : "Offline"}
                  status={diagnostics.networkOnline ? "success" : "error"}
                />
                <DiagnosticRow 
                  label="Recognition Attempts" 
                  value={diagnostics.attemptsCount.toString()}
                  status="info"
                />
                {diagnostics.lastError && (
                  <DiagnosticRow 
                    label="Last Error" 
                    value={diagnostics.lastError}
                    status="error"
                  />
                )}
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={requestMicrophoneAccess}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Request Mic Access
                </button>
                <button
                  onClick={runDiagnostics}
                  className="flex-1 px-4 py-2 bg-[#fbbf24] hover:bg-[#fbbf24]/90 text-black rounded-lg transition-colors text-sm font-medium"
                >
                  Refresh Status
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

// Diagnostic row component
function DiagnosticRow({ 
  label, 
  value, 
  status 
}: { 
  label: string
  value: string
  status: "success" | "error" | "warning" | "info"
}) {
  const statusColors = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  }
  
  const statusIcons = {
    success: "M5 13l4 4L19 7",
    error: "M18 6L6 18M6 6l12 12",
    warning: "M12 9v2m0 4h.01M12 3l9 16H3L12 3z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  }

  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <span className="text-white/70 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium capitalize ${statusColors[status]}`}>
          {value}
        </span>
        <svg 
          className={`w-4 h-4 ${statusColors[status]}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d={statusIcons[status]} />
        </svg>
      </div>
    </div>
  )
}

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}
