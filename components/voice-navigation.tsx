"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"

// Musk #2: Voice-activated navigation for futuristic hands-free experience
// Uses Web Speech API for voice commands

interface VoiceCommand {
  phrases: string[]
  action: () => void
}

export const VoiceNavigation = memo(function VoiceNavigation() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  // Define voice commands
  const commands: VoiceCommand[] = [
    {
      phrases: ["show projects", "show me projects", "go to projects", "projects"],
      action: () => {
        showCommandFeedback("Navigating to Projects...")
        setTimeout(() => {
          document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
        }, 500)
      },
    },
    {
      phrases: ["show services", "what do you do", "services"],
      action: () => {
        showCommandFeedback("Showing Services...")
        setTimeout(() => {
          document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
        }, 500)
      },
    },
    {
      phrases: ["get started", "sign up", "start now", "begin"],
      action: () => {
        showCommandFeedback("Starting sign up...")
        setTimeout(() => router.push("/auth/sign-up"), 500)
      },
    },
    {
      phrases: ["play reel", "show reel", "play video", "watch video"],
      action: () => {
        showCommandFeedback("Playing reel...")
        // Trigger video play action
      },
    },
    {
      phrases: ["go home", "home", "back to top", "scroll top"],
      action: () => {
        showCommandFeedback("Going to top...")
        window.scrollTo({ top: 0, behavior: "smooth" })
      },
    },
    {
      phrases: ["contact", "get in touch", "reach out"],
      action: () => {
        showCommandFeedback("Showing contact...")
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
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
      
      for (const command of commands) {
        for (const phrase of command.phrases) {
          if (lowerText.includes(phrase)) {
            command.action()
            return true
          }
        }
      }
      
      showCommandFeedback(`Command not recognized: "${text}"`)
      return false
    },
    [commands, showCommandFeedback]
  )

  const startListening = useCallback(() => {
    if (!isSupported) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex
      const result = event.results[current]
      const text = result[0].transcript
      
      setTranscript(text)
      
      if (result.isFinal) {
        processCommand(text)
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }, [isSupported, processCommand])

  useEffect(() => {
    // Check for Web Speech API support
    setIsSupported(
      typeof window !== "undefined" &&
        ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    )
  }, [])

  if (!isSupported) return null

  return (
    <>
      {/* Voice activation button */}
      <motion.button
        onClick={startListening}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
          isListening
            ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
            : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isListening ? "Listening..." : "Activate voice commands"}
      >
        <svg
          className={`w-6 h-6 ${isListening ? "text-white animate-pulse" : "text-white/80"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
        
        {/* Listening animation rings */}
        {isListening && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-red-400"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-red-400"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </motion.button>

      {/* Transcript display */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-40 right-6 z-50 max-w-xs p-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white/60 text-xs uppercase tracking-wider">Listening...</span>
            </div>
            <p className="text-white font-medium">
              {transcript || "Say a command..."}
            </p>
            <p className="text-white/40 text-xs mt-2">
              Try: &quot;Show projects&quot; or &quot;Get started&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
          >
            <p className="text-white font-bold text-xl">{feedbackMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}
