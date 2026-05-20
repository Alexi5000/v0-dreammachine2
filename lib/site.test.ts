import { describe, it, expect } from 'vitest'
import { SITE, NAV_ITEMS, SOCIAL } from './site'

describe('site config', () => {
  it('has a non-empty name and tagline', () => {
    expect(SITE.name.length).toBeGreaterThan(0)
    expect(SITE.tagline.length).toBeGreaterThan(0)
  })

  it('exposes a canonical URL with no trailing slash', () => {
    expect(SITE.url.endsWith('/')).toBe(false)
    expect(SITE.url.startsWith('http')).toBe(true)
  })

  it('every nav item has a label and href', () => {
    for (const item of NAV_ITEMS) {
      expect(item.label).toBeTruthy()
      expect(item.href).toMatch(/^[\/#a-z]/)
    }
  })

  it('every social link is a URL', () => {
    for (const url of Object.values(SOCIAL)) {
      expect(url).toMatch(/^(https?:\/\/|mailto:)/)
    }
  })
})
