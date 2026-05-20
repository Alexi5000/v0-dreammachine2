/**
 * Single source of truth for site-wide constants.
 * Used by metadata, OG, sitemap, JSON-LD, and footer.
 */

export const SITE = {
  name: 'Nexus AI',
  shortName: 'Nexus',
  tagline: 'AI-Native Design Studio',
  description:
    'Nexus AI is an AI-native design studio crafting brand systems, generative interfaces, and motion experiences for ambitious teams. We pair frontier models with human craft to ship work that compounds.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://v0-dreammachine2.vercel.app').replace(/\/$/, ''),
  ogImage: '/opengraph-image',
  twitter: '@techtideai',
  author: 'Alex Cinovoj',
  email: 'hello@techtideai.io',
  locale: 'en-US',
  repo: 'https://github.com/Alexi5000/v0-dreammachine2',
  themeColor: '#0a0a0a',
} as const

export const NAV_ITEMS = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Manifesto', href: '/manifesto' },
] as const

export const SOCIAL = {
  github: 'https://github.com/Alexi5000',
  x: 'https://x.com/techtideai',
  linkedin: 'https://linkedin.com/company/techtideai',
  dribbble: 'https://dribbble.com/techtideai',
  email: 'mailto:hello@techtideai.io',
} as const

export type SiteConfig = typeof SITE
