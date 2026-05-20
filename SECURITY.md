# Security Policy

We take security seriously. Thank you for helping keep Nexus AI and its users safe.

## Supported versions

The `main` branch is the only actively maintained release line. Tagged releases follow semver and receive security fixes for **the latest minor** of each supported major.

| Version | Supported |
| --- | :---: |
| `0.x` (current) | ✅ |
| Older | ❌ |

## Reporting a vulnerability

**Please do not open public issues for security problems.**

Report privately through one of:

1. **GitHub Security Advisories** — preferred. [Open a private advisory](https://github.com/Alexi5000/v0-dreammachine2/security/advisories/new).
2. **Email** — `security@techtideai.io`. Use the PGP key below for sensitive details.

Include in your report:

- A description of the issue and its impact
- Reproduction steps or a proof-of-concept
- Affected versions, commits, or environments
- Your name/handle for credit (optional)

## Response timeline

| Stage | Target |
| --- | --- |
| Acknowledgement | ≤ 72 hours |
| Triage + severity assigned | ≤ 7 days |
| Fix in private branch | ≤ 30 days for high/critical |
| Public disclosure | After fix is released, with credit to the reporter |

We follow [coordinated disclosure](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure). We will not pursue legal action against researchers who:

- Make a good-faith effort to avoid privacy violations, data destruction, or service disruption
- Do not access more data than necessary to demonstrate the issue
- Do not publicly disclose before we've shipped a fix

## Scope

In scope:

- The `main` branch of this repository
- The deployed reference site at `nexus-ai.techtideai.io`
- Build pipelines, GitHub Actions workflows, and supply-chain dependencies declared in `package.json`

Out of scope:

- Forks and downstream deployments (please report those to their maintainers)
- Third-party services we integrate with (Supabase, Vercel, Anthropic, OpenAI, Google) — please report to the vendor
- Social engineering, physical attacks, DoS volumetric testing

## Hall of fame

Researchers who responsibly disclose meaningful issues are credited here:

_No reports yet. Be the first._

---

Last reviewed: 2026-01-15.
