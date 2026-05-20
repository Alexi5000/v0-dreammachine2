import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

const ROUTES: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '', priority: 1.0, freq: 'weekly' },
  { path: '/manifesto', priority: 0.7, freq: 'monthly' },
  { path: '/work', priority: 0.8, freq: 'weekly' },
  { path: '/changelog', priority: 0.5, freq: 'weekly' },
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/terms', priority: 0.3, freq: 'yearly' },
  { path: '/auth/sign-up', priority: 0.6, freq: 'monthly' },
  { path: '/auth/login', priority: 0.4, freq: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }))
}
