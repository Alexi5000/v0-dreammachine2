import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/auth/', '/api/'],
      },
      // Studio bots — allow only the marketing surface, never the dashboard.
      { userAgent: 'GPTBot', disallow: '/dashboard/' },
      { userAgent: 'CCBot', disallow: '/dashboard/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
