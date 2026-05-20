# Contributing to Nexus AI

Thanks for considering a contribution. Nexus AI is built in the open so anyone can fork the studio behind their own brand — every issue, PR, and conversation makes the reference implementation better for the next person.

This guide is short on purpose. If something here is unclear, [open a question](https://github.com/Alexi5000/v0-dreammachine2/issues/new?template=question.yml) and we'll fix the doc.

## Code of Conduct

By participating you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Be kind, be specific, assume good faith.

## Quick start

```bash
git clone https://github.com/<your-username>/v0-dreammachine2.git
cd v0-dreammachine2
pnpm install
cp .env.example .env.local
pnpm dev
```

The marketing site runs without any env vars. Add Supabase keys to unlock auth + dashboard, and an AI provider key to unlock the chat surface.

## Pull request flow

1. **Pick a scope.** One PR = one concern. Smaller is faster to review.
2. **Branch.** `feat/<short-name>`, `fix/<short-name>`, `docs/<short-name>`, `refactor/<short-name>`.
3. **Commit.** Use [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `perf:`, `test:`, `ci:`. Keep the subject ≤ 72 chars.
4. **Verify locally:**
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm format:check
   pnpm build
   ```
5. **Open the PR.** Fill in the template, link the issue, attach a screenshot or short Loom for visual changes.
6. **Iterate.** Reviews are usually within 48 hours. We use GitHub's "request changes" sparingly — most feedback is "consider X" rather than "block".

## Code style

- **Components**: function components, named exports, one component per file (UI primitives can co-locate variants).
- **Files**: kebab-case for filenames, PascalCase for component names, camelCase for hooks (`useThing`).
- **Strings & branding**: import from `lib/site.ts` — never hardcode "Nexus AI", the canonical URL, or social handles in components.
- **Motion**: import easings/durations from `lib/motion.ts` — never inline magic numbers like `[0.16, 1, 0.3, 1]`.
- **Tailwind v4**: prefer design tokens (`bg-background`, `text-foreground`) over raw hex. New tokens go in `app/globals.css`.
- **Server vs client**: default to server components. Add `"use client"` only when you need state, effects, or browser APIs.
- **Accessibility**: every interactive element gets a label and a visible focus state. Run a quick keyboard pass before merging.
- **Comments**: rare. The code should explain *what*; comments only explain *why* when it's non-obvious.

## Testing

We're iteratively adding tests. For now:

- Add a Playwright spec in `e2e/` for new public flows (sign-up, AI chat, contact form).
- Add a Vitest test next to any non-trivial utility (`lib/foo.ts` → `lib/foo.test.ts`).
- CI runs `typecheck`, `lint`, `format:check`, and `build` on every PR.

## Reporting bugs and proposing features

- **Bug**: use the [bug report template](https://github.com/Alexi5000/v0-dreammachine2/issues/new?template=bug_report.yml). Include reproduction steps, expected vs actual, and your browser/OS.
- **Feature**: use the [feature request template](https://github.com/Alexi5000/v0-dreammachine2/issues/new?template=feature_request.yml). Explain the user need first, the implementation second.
- **Security**: do **not** open a public issue. Follow [SECURITY.md](SECURITY.md).

## Where to start

Issues labeled [`good first issue`](https://github.com/Alexi5000/v0-dreammachine2/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) are scoped to be a few hours of work and don't need deep familiarity with the codebase. [`help wanted`](https://github.com/Alexi5000/v0-dreammachine2/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) are bigger but still well-defined.

## Recognition

Every contributor is listed in the repo's [Contributors graph](https://github.com/Alexi5000/v0-dreammachine2/graphs/contributors) and credited in release notes. Substantial contributions get a shout-out in the next release on X.

Thank you for making this better. 💛
