"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface BiteChatProps {
  onboardingComplete?: boolean
}

type VoiceStatus = "idle" | "listening" | "processing" | "error"

export function BiteChat({ onboardingComplete = true }: BiteChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Voice state
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>("idle")
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Check voice support on mount
  useEffect(() => {
    const supported = typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    setIsVoiceSupported(supported)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Simulate assistant response
  const simulateResponse = useCallback((userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      const responses = [
        "I can help you with that! Let me look into it.",
        "Great question! Here's what I found...",
        "I'm on it! Give me a moment.",
        "Thanks for asking! Here's my response.",
      ]
      
      const newMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, newMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 600)
  }, [])

  const handleSend = useCallback((text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, newMessage])
    setInput("")
    simulateResponse(messageText)
  }, [input, simulateResponse])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Voice input handling
  const startVoiceInput = useCallback(async () => {
    if (!isVoiceSupported) return

    // Request microphone permission
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
    } catch {
      setVoiceStatus("error")
      return
    }

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

      recognition.onstart = () => {
        setVoiceStatus("listening")
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[event.resultIndex]
        const text = result[0].transcript
        
        if (result.isFinal) {
          setVoiceStatus("processing")
          setInput(text)
          // Auto-send after voice input
          setTimeout(() => {
            handleSend(text)
            setVoiceStatus("idle")
          }, 300)
        } else {
          setInput(text)
        }
      }

      recognition.onerror = () => {
        setVoiceStatus("error")
        setTimeout(() => setVoiceStatus("idle"), 2000)
      }

      recognition.onend = () => {
        if (voiceStatus === "listening") {
          setVoiceStatus("idle")
        }
      }

      recognition.start()
    } catch {
      setVoiceStatus("error")
    }
  }, [isVoiceSupported, voiceStatus, handleSend])

  const stopVoiceInput = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort()
      recognitionRef.current = null
    }
    setVoiceStatus("idle")
  }, [])

  if (!onboardingComplete) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Compact Square Chat Button - 52x52px glassmorphic
          <motion.button
            key="chat-button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="relative w-[52px] h-[52px] group"
            aria-label="Open chat"
          >
            {/* Glassmorphic square background */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
            
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-xl bg-[#fbbf24]/0 group-hover:bg-[#fbbf24]/15 transition-all duration-300" />
            
            {/* Pulsing attention ring */}
            <motion.div
              className="absolute -inset-1 rounded-xl border border-[#fbbf24]/30"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Chat icon */}
            <div className="relative flex items-center justify-center w-full h-full">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            
            {/* Notification badge */}
            {hasUnread && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#fbbf24] rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-[8px] font-bold text-black">1</span>
              </motion.div>
            )}
          </motion.button>
        ) : (
          // Compact Square Chat Window - 280x340px
          <motion.div
            key="chat-window"
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="w-[280px] h-[340px] relative"
          >
            {/* Glassmorphic container */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#21346e]/90 via-[#1a2a5a]/90 to-[#151f45]/90 backdrop-blur-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Top gradient shine */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              
              {/* Header */}
              <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white leading-tight">AI Assistant</h3>
                    <p className="text-[10px] text-white/40">Online</p>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-3 h-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Messages Area */}
              <div className="h-[205px] overflow-y-auto px-3 py-3 space-y-2.5 scrollbar-thin scrollbar-thumb-white/10">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                          message.role === "user"
                            ? "bg-[#fbbf24] text-black rounded-br-sm"
                            : "bg-white/10 text-white rounded-bl-sm"
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 px-3 py-2 rounded-xl rounded-bl-sm">
                        <div className="flex items-center gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 bg-white/50 rounded-full"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area with Voice */}
              <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-[#151f45]/80">
                <div className="flex items-center gap-2">
                  {/* Voice button integrated into chat */}
                  {isVoiceSupported && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={voiceStatus === "listening" ? stopVoiceInput : startVoiceInput}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        voiceStatus === "listening" 
                          ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                          : voiceStatus === "error"
                          ? "bg-orange-500"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                      aria-label={voiceStatus === "listening" ? "Stop voice input" : "Start voice input"}
                    >
                      <svg 
                        className={`w-3.5 h-3.5 ${voiceStatus === "listening" ? "text-white animate-pulse" : "text-white/70"}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                      </svg>
                      
                      {/* Listening animation */}
                      {voiceStatus === "listening" && (
                        <motion.span
                          className="absolute inset-0 rounded-lg border-2 border-red-400"
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  )}
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={voiceStatus === "listening" ? "Listening..." : "Message..."}
                    className={`flex-1 bg-white/5 border rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                      voiceStatus === "listening" 
                        ? "border-red-500/50 focus:border-red-500" 
                        : "border-white/10 focus:border-[#fbbf24]/40"
                    }`}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="w-8 h-8 rounded-lg bg-[#fbbf24] hover:bg-[#fbbf24]/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    aria-label="Send"
                  >
                    <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
                
                {/* Voice status indicator */}
                <AnimatePresence>
                  {voiceStatus === "listening" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[10px] text-red-400 mt-1.5 text-center"
                    >
                      Speak now...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
