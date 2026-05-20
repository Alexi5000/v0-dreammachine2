'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  fullWidth?: boolean
  children: React.ReactNode
}

type AsLink = BaseProps & { href: string } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'className'
>
type AsButton = BaseProps & { href?: never } & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>
type Props = AsLink | AsButton

const styles: Record<Variant, string> = {
  primary:
    'bg-fg-primary text-[#0a0a0a] hover:bg-fg-primary/90 shadow-[0_8px_24px_-12px_rgba(255,255,255,0.4)]',
  secondary:
    'bg-brand-amber text-[#0a0a0a] hover:bg-brand-amber/90 shadow-[0_8px_24px_-12px_color-mix(in_oklch,var(--brand-amber)_60%,transparent)]',
  ghost: 'bg-transparent text-fg-primary hover:bg-line-default',
  outline:
    'bg-transparent text-fg-primary border border-line-default hover:border-line-strong hover:bg-line-subtle',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs tracking-widest',
  md: 'h-11 px-6 text-sm tracking-widest',
  lg: 'h-14 px-8 text-sm tracking-widest',
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'

export const CtaButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  function CtaButton(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      className,
      fullWidth,
      children,
      ...rest
    } = props

    const classes = cn(
      base,
      styles[variant],
      sizes[size],
      fullWidth && 'w-full',
      className,
    )

    if ('href' in props && props.href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          className={classes}
          {...(rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>)}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)}
      >
        {children}
      </button>
    )
  },
)
