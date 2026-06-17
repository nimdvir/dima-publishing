# Database Book — Development Plan Summary

**Generated:** 2026-06-16  
**Canonical plan:** [`book-plan-codex.md`](book-plan-codex.md)  
**Locked decisions:** [`06-locked-decisions.md`](06-locked-decisions.md)  
**Active execution:** [`platform-execution-plan-06-12.md`](platform-execution-plan-06-12.md)

> This file consolidates all 21 plan files in `plans/book-edit/` into one scannable summary.
> When instructions conflict, follow `book-plan-codex.md` first, then `06-locked-decisions.md`.

---

## Plan File Index

### Canonical & Active

| File                                                                                         | Role                                                        | Status |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------ |
| [`book-plan-codex.md`](book-plan-codex.md)                                                   | **Master plan** — supersedes all others; Phase 0–6 sequence | Active |
| [`06-locked-decisions.md`](06-locked-decisions.md)                                           | **Settled decisions** — authoritative for all choices       | Active |
| [`platform-execution-plan-06-12.md`](platform-execution-plan-06-12.md)                       | **Sprint plan** — two-track summer 2026 execution           | Active |
| [`simple-platform-plan-v2a-next-steps-6-12.md`](simple-platform-plan-v2a-next-steps-6-12.md) | Five-stage simplified overview                              | Active |

### Phase Detail (numbered)

| File                                                           | Covers                                                             | Status      |
| -------------------------------------------------------------- | ------------------------------------------------------------------ | ----------- |
| [`01-v1.1-reader-completion.md`](01-v1.1-reader-completion.md) | Phase 1 — v1.1 frontend design/motion pass                         | Mostly done |
| [`02-source-migration.md`](02-source-migration.md)             | Phase 2 — Drive → Git migration steps (3 conflicts fixed in codex) | In progress |
| [`03-v2a-paid-platform.md`](03-v2a-paid-platform.md)           | v2A — Next.js + Supabase + Stripe paid-access platform             | Deferred    |
| [`04-v2b-learning-features.md`](04-v2b-learning-features.md)   | v2B — progress, notes, labs, search, accessibility                 | Deferred    |

### Reference

| File                                                                                                     | Contents                                                               |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`05-architecture-reference.md`](05-architecture-reference.md)                                           | Reader architecture, generator pipeline, image strategy                |
| [`reader-hybrid-v1.1-design-system.md`](reader-hybrid-v1.1-design-system.md)                             | Color palette, typography, section accents                             |
| [`reader-hybrid-v1.1-implementation-plan.md`](reader-hybrid-v1.1-implementation-plan.md)                 | Detailed v1.1 implementation rounds (5 rounds, mostly done)            |
| [`canonical-book-edit-source-workflow-2026-06-10.md`](canonical-book-edit-source-workflow-2026-06-10.md) | Migration workflow detail — file mappings, selection rules, provenance |
| [`v2a-setup-06-12.md`](v2a-setup-06-12.md)                                                               | v2A local/Vercel setup checklist (Claude pilot)                        |

### Superseded / Historical

| File                                            | Why superseded                                                                    |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| `database-book-plan.md`                         | Original 2026-05-26 Python static-reader plan — replaced by Vite/Next.js approach |
| `database-book-plan-5-30.md`                    | Early requirements doc — superseded by codex                                      |
| `database-book-plan-5-30-architecture.md`       | Early architecture companion — superseded by codex                                |
| `database-book-plan-06-03-chatgpt-claude.md`    | Merged into `database-book-plan-06-09-chatgpt.md`                                 |
| `database-book-plan-06-04-chatgpt.md`           | Merged into `database-book-plan-06-09-chatgpt.md`                                 |
| `database-book-plan-06-09-chatgpt.md`           | Consolidated into `README.md` and `book-plan-codex.md`                            |
| `database-book-development-plan.md`             | Superseded by `book-plan-codex.md`                                                |
| `databasebook-cursor-chapter-plan-06-10.md`     | Phase 1.5 resolution — completed                                                  |
| `simplified-plan-gpt-06-12.md`                  | Draft of `simple-platform-plan-v2a-next-steps-6-12.md`                            |
| `reader-hybrid-cover-derived-palette-legacy.md` | Early palette exploration                                                         |
| `README.md`                                     | Stale — current-state table outdated; index role only                             |

---

## The Big Picture — Five Stages

```
Stage 1 — v1.1 Course Reader          ✅ DONE
Stage 2 — v1.2 Source/Chapter Workflow ✅ DONE
Stage 3 — Course Launch                ⏳ ACTIVE
Stage 4 — v2A Paid-Access Pilot        ⏳ NEXT
Stage 5 — v2B Learning Features        🔒 DEFERRED
```

---

## Stage 1 — v1.1 Course Reader ✅

**Goal:** Freeze the course reader for student use.

**Location:** `books/database-book/platform-pilots/reader-hybrid-v1.1/`

### What was built

| Feature                                                         | Status |
| --------------------------------------------------------------- | ------ |
| White/zinc/indigo palette                                       | Done   |
| Sticky white header                                             | Done   |
| Two-column desktop hero with AnimatedBookCover                  | Done   |
| Cover motion (respects reduced-motion)                          | Done   |
| Reader width cleanup (780px cap removed)                        | Done   |
| "On this page" H2/H3 nav with IntersectionObserver highlighting | Done   |
| Mobile "On this page" block                                     | Done   |
| Sidebar icons and subtitles                                     | Done   |
| Reader page transitions                                         | Done   |
| Skip link                                                       | Done   |
| Reduced-motion CSS                                              | Done   |
| Scroll-to-top                                                   | Done   |
| Dismissible prototype notice                                    | Done   |
| Separate v1.1 localStorage keys                                 | Done   |
| Favicon / site.webmanifest wiring                               | Done   |
| Generator preserved, PAGE_INDEX_MAP, incremental                | Done   |
| Built, deployed to Vercel, tagged `reader-v1.1-stable`          | Done   |

### What remains (verification/cleanup)

- Favicon binary files in `public/` — confirm all 4 present
- `npm run generate && npm run lint && npm run build` — re-verify
- Dead `AiAssistant.tsx` — quarantine or delete
- CSS cleanup — duplicate selectors

**Stack:** React 18 + Vite 5, `motion` (from `motion/react`), plain CSS (no Tailwind)

---

## Stage 2 — v1.2 Source/Chapter Workflow ✅

**Goal:** Stable chapter filenames, manifests, and editing workflow. Git is the source of truth.

### Infrastructure created

```
books/database-book/
  book.yml                          ← Book metadata, chapter order, output paths
  files/
    source/
      chapters/ch01–ch17/           ← Stable filenames per chapter
      labs/lab-01–lab-15/           ← Student-facing lab questions only
      outline/
        book-outline.md
        chapter-taglines.md
        chapter-registry.yml        ← Resolves ch-number ↔ image-folder mismatches
    manifests/
      source-import-manifest.csv    ← Which Drive file seeded each repo file
      build-manifest.json           ← Which commit produced which build
```

### Stable filenames (per chapter)

```
index.md              ← Introduction
core-concepts.md      ← Main chapter
lets-build.md         ← Hands-on guided work
review-questions.md   ← Review & Reflection
terms-treasury.md     ← Key vocabulary
rat.md                ← Readiness Assessment Test
```

### Migration status (chapters)

| Chapters  | Status                                      |
| --------- | ------------------------------------------- |
| ch01–ch04 | Fully migrated — all 6 stable files present |
| ch05–ch16 | Folders exist with varying content          |
| ch17      | Has core-concepts.md, lets-build.md only    |

### Key rules

- **Git stores history.** No active dated filenames as working files.
- **Editing in Git repo only.** No parallel editing on Google Drive.
- **`chapter-sync` skill is deprecated.** One-time import, not ongoing sync.
- **Lab answers NEVER imported.** If found in repo, remove before commit.
- **Original images stay on Google Drive.** Not copied into `dima-publishing`.

---

## Stage 3 — Course Launch ⏳

**Goal:** Students can use the reader when the course starts.

### Must be ready

- v1.1 reader deployed with stable URL
- ch01–ch04 available (core concepts + labs)
- Mobile layout works
- No answer files exposed
- "Coming Soon" placeholder for chapters 5–17

### Two parallel tracks (from execution plan)

```
Track A: Course Reader Stability
  A1 — Verify, tag, deploy v1.1       ✅ DONE
  A2 — ch01-04 + Labs 01-04 ready     ⏳ Verify all render correctly
  A3 — Continue ch05-17 migration     ⏳ Import as needed, stable filenames

Track B: v2A Paid-Access Sandbox
  B1 — Scaffold from Claude pilot     ⏳ NEXT
  B2 — Prove paid-access flow         ⏳ NEXT
```

---

## Stage 4 — v2A Paid-Access Pilot ⏳

**Goal:** Prove the complete student transaction: account → profile → payment → access → protected reader.

**Gate:** Do not start until v1.1 is verified and stable. Four representative chapters (ch01–04) are enough.

**Location:** `books/database-book/platform-pilots/reader-hybrid-v2/` (new, don't touch existing pilots)

### Stack

| Technology                 | Role                              |
| -------------------------- | --------------------------------- |
| Next.js (App Router)       | Framework                         |
| TypeScript                 | Language                          |
| Supabase Auth              | Authentication (email magic link) |
| Supabase Postgres + RLS    | Database + row-level security     |
| Stripe Checkout + Webhooks | Payment + access provisioning     |
| Vercel                     | Deployment                        |

### Claude pilot reference

`platform-pilots/claude/` has a working Next.js 16.2.6 + React 19 + Supabase + Stripe reference:
- Supabase Auth (email magic link)
- Postgres + RLS
- Stripe Checkout + verified webhooks → `access_grants` table
- ch01 free preview, ch02+ requires payment

**Use as reference/template, not unreviewed copy.**

### v2A setup checklist (from `v2a-setup-06-12.md`)

| Step                                                                                  | Status                                 |
| ------------------------------------------------------------------------------------- | -------------------------------------- |
| Migration SQL (4 tables: access_grants, purchases, processed_stripe_events, profiles) | ✅ Done                                 |
| ch01 preview bypass                                                                   | ✅ Already correct                      |
| `.env` credentials                                                                    | Real keys set (need `STRIPE_PRICE_ID`) |
| Supabase migration applied                                                            | ⏳ User action                          |
| Stripe test product created                                                           | ⏳ User action                          |
| Local dev test                                                                        | ⏳                                      |
| Vercel deploy                                                                         | ⏳                                      |
| Stripe webhook configured                                                             | ⏳                                      |

### v2A sub-phases

1. **Foundation** — App Router, Supabase clients, Stripe client, middleware, design tokens
2. **Content Migration** — Port reader experience; per-chapter JSON loading (not monolithic bundle)
3. **Public Preview** — `/`, `/preview`, `/preview/ch01` with limited sample content
4. **Authentication & Profiles** — `/login`, `/register`, `/account` with profile fields
5. **Payment & Access** — Stripe Checkout → webhook → `access_grants` → protected reader

---

## Stage 5 — v2B Learning Features 🔒

**Gate:** Do not start until v2A exit criteria are met.

### Features (all deferred)

| Feature                     | Scope                                                                         |
| --------------------------- | ----------------------------------------------------------------------------- |
| **Progress Persistence**    | Track viewed/completed pages, scroll position, resume reading                 |
| **Notes**                   | Private per-user notes on any page, RLS-enforced                              |
| **Labs Expansion**          | Read instructions → download files → mark complete (no full LMS yet)          |
| **Search**                  | Server-side, respects access grants, links to page+heading                    |
| **Accessibility Hardening** | Keyboard nav, landmarks, focus states, contrast, screen reader, mobile reflow |

### NOT included in v2A or v2B

- AI Assistant
- Instructor dashboard
- Student submissions / gradebook
- LTI / SSO
- Advanced analytics
- Recommendation engine

---

## Key Locked Decisions

### Source of Truth

| Topic                | Decision                                           |
| -------------------- | -------------------------------------------------- |
| Canonical source     | Git repository (`dima-publishing`) after migration |
| Drive role           | Historical draft archive + original image library  |
| Editing location     | Git repo only — no parallel editing on Drive       |
| Sync direction       | One-way Drive → Git (one-time import only)         |
| `chapter-sync` skill | Deprecated after migration baseline commit         |

### Filenames & Manifests

| Topic                       | Decision                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| Stable chapter files        | `index.md`, `core-concepts.md`, `lets-build.md`, `review-questions.md`, `terms-treasury.md`, `rat.md` |
| Reader area label           | "Core Concepts" (never "Main Concepts")                                                               |
| Import provenance           | Single `source-import-manifest.csv` (not per-chapter files)                                           |
| Build provenance            | `build-manifest.json` in `files/manifests/`                                                           |
| `.generation-manifest.json` | Local reader cache, gitignored                                                                        |
| CSV content_id              | Stable slug (`sql`, `normalization`) — not chapter number (`ch05`)                                    |

### Commit Convention

| Scope          | Prefix example                                                             |
| -------------- | -------------------------------------------------------------------------- |
| Single chapter | `ch03: revise DIKW framework explanation`                                  |
| Cross-cutting  | `build:`, `outline:`, `images-ch06:`, `migration:`, `rat-ch04:`, `lab-05:` |

### Image Strategy

| Topic              | Decision                                                 |
| ------------------ | -------------------------------------------------------- |
| Original images    | Stay on Google Drive (`.images/`)                        |
| Cloudinary folders | Stable slugs (`database-design/`), not numbers (`ch09/`) |
| Short-term refs    | Direct Cloudinary URLs in Markdown                       |
| Long-term refs     | Stable asset tokens resolved by build script             |

### Tech Stack

| Layer     | v1.1                           | v2A                        |
| --------- | ------------------------------ | -------------------------- |
| Framework | React 18 + Vite 5              | Next.js (App Router)       |
| Language  | TypeScript                     | TypeScript                 |
| Animation | `motion` (from `motion/react`) | —                          |
| CSS       | Plain CSS (no Tailwind)        | Design tokens from v1.1    |
| Auth      | Demo login (localStorage)      | Supabase Auth (email)      |
| Payment   | None                           | Stripe Checkout + webhooks |
| Database  | None                           | Supabase Postgres + RLS    |
| Hosting   | Vercel                         | Vercel                     |

---

## Quick Reference — Which File to Read

| Need...                                  | Read...                                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| The current big picture                  | `SUMMARY.md` (this file)                                                                                 |
| The authoritative plan with all details  | [`book-plan-codex.md`](book-plan-codex.md)                                                               |
| Settled technical decisions              | [`06-locked-decisions.md`](06-locked-decisions.md)                                                       |
| This sprint's execution steps            | [`platform-execution-plan-06-12.md`](platform-execution-plan-06-12.md)                                   |
| v1.1 design system (colors, typography)  | [`reader-hybrid-v1.1-design-system.md`](reader-hybrid-v1.1-design-system.md)                             |
| v1.1 implementation detail               | [`reader-hybrid-v1.1-implementation-plan.md`](reader-hybrid-v1.1-implementation-plan.md)                 |
| Migration file-mapping and rules         | [`canonical-book-edit-source-workflow-2026-06-10.md`](canonical-book-edit-source-workflow-2026-06-10.md) |
| v2A setup checklist                      | [`v2a-setup-06-12.md`](v2a-setup-06-12.md)                                                               |
| Reader architecture / generator pipeline | [`05-architecture-reference.md`](05-architecture-reference.md)                                           |
| Paid platform detailed spec              | [`03-v2a-paid-platform.md`](03-v2a-paid-platform.md)                                                     |
| Learning features detailed spec          | [`04-v2b-learning-features.md`](04-v2b-learning-features.md)                                             |
