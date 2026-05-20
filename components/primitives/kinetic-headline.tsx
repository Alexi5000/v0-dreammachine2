'use client'

import { motion } from 'motion/react'
import { headlineWord, stagger } from '@/lib/motion'

interface KineticHeadlineProps {
  /** Headline split as an array of lines, each a string. */
  lines: string[]
  className?: string
}

/**
 * Word-by-word reveal with blur-in. Designed for hero & manifesto pages.
 * Honors prefers-reduced-motion via motion/react.
 */
export function KineticHeadline({ lines, className = '' }: KineticHeadlineProps) {
  return (
    <motion.h1
      variants={stagger(0.06, 0.1)}
      initial="hidden"
      animate="visible"
      className={`display-headline text-fg-primary ${className}`}
    >
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className="block overflow-hidden"
          style={{ paddingBottom: '0.04em' }}
        >
          {line.split(' ').map((word, wordIndex) => (
            <motion.span
              key={`${lineIndex}-${wordIndex}`}
              variants={headlineWord}
              className="mr-[0.18em] inline-block will-change-transform"
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}
