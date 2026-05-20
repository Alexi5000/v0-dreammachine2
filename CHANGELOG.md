# Changelog

All notable changes to Nexus AI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-20

### Added

- **Core Platform**: Next.js 16 App Router with React 19 and TypeScript 5.7
- **Design System**: shadcn/ui + Radix UI primitives with Tailwind CSS v4
- **AI Integration**: Vercel AI SDK v6 with provider-agnostic streaming
- **Authentication**: Supabase Auth with SSR middleware session refresh
- **Motion System**: Apple-tier animation presets with reduced-motion support
- **Landing Page**: Hero section, feature grid, technology showcase, CTA sections
- **SEO**: Dynamic sitemap, robots.txt, OG images, JSON-LD structured data
- **PWA**: Web app manifest with shortcuts and theme configuration
- **Accessibility**: Skip navigation, focus-visible, semantic landmarks, ARIA
- **Developer Experience**: ESLint, Prettier, Vitest, Playwright, EditorConfig
- **CI/CD**: GitHub Actions workflow with lint, typecheck, test, and build gates
- **Documentation**: README, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, CHANGELOG

### Infrastructure

- Vercel deployment with Edge Runtime OG image generation
- Supabase backend with Row Level Security
- Analytics via `@vercel/analytics` and `@vercel/speed-insights`
- Environment validation via Zod schemas

[1.0.0]: https://github.com/Alexi5000/v0-dreammachine2/releases/tag/v1.0.0
