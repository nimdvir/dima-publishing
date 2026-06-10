# Locked Decisions

All decisions settled during the 2026-06-10 planning sessions.

---

## Source of Truth

| Topic | Decision |
|---|---|
| Canonical source | Git repository (`dima-publishing`) |
| Drive role after migration | Historical draft archive + original image library |
| Editing location | Git repo only — no parallel editing on Drive |
| Sync direction | One-way: Drive → Git (one-time import only) |
| `chapter-sync` skill | Deprecated after migration baseline commit |

## Filenames

| Topic | Decision |
|---|---|
| Stable chapter filenames | `core-concepts.md`, `lets-build.md`, `review-questions.md`, `terms-treasury.md`, `rat.md` |
| Why these names | Match both reader generators (`reader-hybrid-v1.1` and `cursor-online-reader`) and `evaluation.md` source contract |
| Rejected alternative | `main.md`, `terms.md`, `reflection.md` — would require changing both generators |
| Reader area label | **Core Concepts** — never "Main Concepts" |

## Manifests

| Topic | Decision |
|---|---|
| Import provenance | Single `source-import-manifest.csv` in `files/manifests/` |
| Rejected alternative | Per-chapter `source-manifest.json` files — too many scattered files |
| Build provenance | Committed `build-manifest.json` in `files/manifests/` |
| `.generation-manifest.json` | Local reader cache, gitignored — separate from build manifest |
| Image mapping | `image-manifest.csv` in `files/manifests/` |

## Commit Convention

| Topic | Decision |
|---|---|
| Style | `ch03: description` (simple prefix) |
| Rejected alternative | `source(ch03): description` — too verbose for single-author repo |
| Cross-cutting scopes | `build:`, `outline:`, `images-ch06:`, `migration:`, `rat-ch04:`, `lab-05:` |

## Change Documentation

| Level | Purpose | Location |
|---|---|---|
| Git commits | Every line change | Git history |
| Pull requests | Rationale for major changes | GitHub PRs |
| `CHANGELOG.md` | Publication milestones only | `books/database-book/CHANGELOG.md` |
| Import manifest | Which Drive file created each repo file | `files/manifests/source-import-manifest.csv` |
| Build manifest | Which commit produced which output | `files/manifests/build-manifest.json` |

## CSV Content ID

| Topic | Decision |
|---|---|
| Use | Stable chapter ID (e.g. `sql`, `normalization`, `database-design`) |
| Do not use | Chapter number (e.g. `ch05`) — numbers can change |

## Development Sequence

```
Phase 1: v1.1 Reader Completion → frontend visual/motion pass
Phase 2: Source Migration        → Drive → Git, stable filenames
Phase 3: v2A Paid Platform       → Next.js, Supabase, Stripe
Phase 4: v2B Learning Features   → progress, notes, labs, search
```

## Technical Stack Decisions

| Topic | Decision |
|---|---|
| v1.1 framework | React 18 + Vite 5 (no upgrade) |
| v1.1 animation | `motion` package only (from `motion/react`) |
| v1.1 CSS | Plain CSS, no Tailwind |
| v1.1 AI Assistant | Not included in this pass |
| v2A framework | Next.js (App Router) |
| v2A auth | Supabase Auth (email, not institutional SSO) |
| v2A payment | Stripe Checkout + verified webhooks |
| NetID/Student ID | Profile fields, not authentication — label as "profile verification" |

## Image Strategy

| Topic | Decision |
|---|---|
| Original images | Stay on Google Drive |
| Cloudinary folders | Use stable slugs (`database-design/`) not numbers (`ch09/`) |
| Image manifest | `files/manifests/image-manifest.csv` |
| Short-term references | Direct Cloudinary URLs in Markdown |
| Long-term references | Stable asset tokens resolved by build script |
