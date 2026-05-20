import { test, expect } from '@playwright/test'

test.describe('Nexus AI marketing site — smoke', () => {
  test('home renders the hero and primary CTA', async ({ page }) => {
    await page.goto('/')

    // Hero
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: /start a project/i }).first()).toBeVisible()

    // Sections present
    await expect(page.getByRole('heading', { name: /four disciplines/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /weekly cadence/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /receipts/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /teams we ship with/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /transparent rates/i })).toBeVisible()
  })

  test('/api/health returns ok', async ({ request }) => {
    const res = await request.get('/api/health')
    expect(res.status()).toBe(200)
    const json = await res.json()
    expect(json.status).toBe('ok')
    expect(json.service).toBe('nexus-ai')
  })

  test('protected route redirects to login', async ({ page }) => {
    const res = await page.goto('/dashboard')
    // Middleware redirects /dashboard → /auth/login if unauthenticated
    expect(page.url()).toMatch(/\/auth\/login/)
    expect(res?.status() ?? 200).toBeLessThan(400)
  })

  test('sitemap is reachable', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    const body = await res.text()
    expect(body).toContain('<urlset')
  })

  test('robots.txt exposes sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.status()).toBe(200)
    const body = await res.text()
    expect(body.toLowerCase()).toContain('sitemap:')
  })
})
