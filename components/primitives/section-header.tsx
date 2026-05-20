'use client'

import { motion } from 'motion/react'
import { useInView } from '@/hooks/use-in-view-animation'
import { fadeInUp, stagger } from '@/lib/motion'

interface SectionHeaderProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/**
 * Editorial section header — eyebrow / title / description.
 * Word-by-word reveal on scroll into view.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      variants={stagger(0.06, 0.05)}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      <motion.p
        variants={fadeInUp}
        className="display-headline-eyebrow inline-flex items-center gap-2"
      >
        <span className="inline-block h-px w-8 bg-line-strong" />
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeInUp}
        className="display-headline mt-5 text-balance text-4xl text-fg-primary md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-fg-secondary md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
