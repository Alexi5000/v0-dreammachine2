/**
 * Motion presets — Apple-tier spring curves and timings.
 * Reuse these everywhere instead of magic numbers.
 *
 * The "emphasized" easing comes from Material 3 / Apple HIG and is the
 * one universal curve that makes UI feel high-end on motion entry.
 */

import type { Transition, Variants } from 'motion/react'

export const EASE = {
  emphasized: [0.16, 1, 0.3, 1] as const,
  emphasizedDecel: [0.05, 0.7, 0.1, 1] as const,
  emphasizedAccel: [0.3, 0, 0.8, 0.15] as const,
  standard: [0.2, 0, 0, 1] as const,
}

export const DURATION = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.5,
  slower: 0.7,
  cinematic: 1.1,
}

export const transitions = {
  base: { duration: DURATION.base, ease: EASE.emphasized } satisfies Transition,
  slow: { duration: DURATION.slow, ease: EASE.emphasized } satisfies Transition,
  spring: { type: 'spring', stiffness: 260, damping: 24, mass: 0.6 } satisfies Transition,
  pop: { type: 'spring', stiffness: 320, damping: 20 } satisfies Transition,
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.spring },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0.04): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Word-by-word reveal for kinetic headlines */
export const headlineWord: Variants = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slow, ease: EASE.emphasized },
  },
}
