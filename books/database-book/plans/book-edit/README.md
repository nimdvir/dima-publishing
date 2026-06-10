# Database Book — Consolidated Development Plan

**Date:** 2026-06-10 (current-state updated 2026-06-10)  
**Status:** Superseded by `book-plan-codex.md` — retained as overview index  
**Source:** Consolidated from `database-book-plan-06-09-chatgpt.md` and prior planning sessions

## Project Identity

- **Title:** Using Data to Drive Business Performance
- **Subtitle:** Databases, Information Systems, Analytics, and Managerial Decision-Making
- **Author:** Nimrod Dvir, PhD
- **Publisher:** DIMA Publishing
- **Instructional arc:** Data → Tables → Relationships → Queries → Analytics → Decisions

## Repository

| Path | Purpose |
|---|---|
| `books/database-book/` | Book root |
| `books/database-book/platform-pilots/reader-hybrid-v1.1/` | Current reader app |
| `books/database-book/files/source/chapters/` | Source chapters |
| `books/database-book/files/source/labs/` | Source labs |
| `books/database-book/files/manifests/` | Import, image, and build manifests |

## Development Sequence

```
Phase 0: Reconcile docs                     ← done (book-plan-codex.md)
Phase 1: Close v1.1 (verification)          ← this sprint
Phase 2: Source infrastructure              ← next sprint
Phase 3: Dry-run import                     ← next sprint
Phase 4: Execute migration                  ← next sprint
Phase 5: Validate readers and builds        ← after migration
Phase 6: Deferred (v2A, v2B, media)         ← after validation
```

## Plan Files

| File | Contents |
|---|---|
| [book-plan-codex.md](book-plan-codex.md) | **Canonical plan** — supersedes all others; conflict resolutions, Phase 0-6 sequence |
| [01-v1.1-reader-completion.md](01-v1.1-reader-completion.md) | Phase 1 reference spec (mostly implemented) |
| [02-source-migration.md](02-source-migration.md) | Phase 2 detail (3 conflicts fixed in codex) |
| [03-v2a-paid-platform.md](03-v2a-paid-platform.md) | Phase 3: Next.js, Supabase Auth, Stripe (deferred) |
| [04-v2b-learning-features.md](04-v2b-learning-features.md) | Phase 4: progress, notes, labs, search (deferred) |
| [05-architecture-reference.md](05-architecture-reference.md) | Reader architecture, generator pipeline, image strategy |
| [06-locked-decisions.md](06-locked-decisions.md) | All settled decisions from planning sessions |
| [canonical-book-edit-source-workflow-2026-06-10.md](canonical-book-edit-source-workflow-2026-06-10.md) | Detailed migration implementation steps (conflicts fixed in codex) |

## Current State (updated 2026-06-10)

### v1.1 Reader — mostly complete

| Area | Status |
|---|---|
| White/zinc/indigo palette | Done |
| Sticky white header | Done |
| Home page copy | Done |
| Feature cards | Done |
| `motion` dependency | Done (installed) |
| AnimatedBookCover component | Done |
| Two-column home hero | Done |
| Reader width cleanup (780px cap removed) | Done |
| "On this page" H2/H3 nav | Done |
| Active "On this page" highlighting (IntersectionObserver) | Done |
| Mobile "On this page" block | Done |
| Sidebar icons/subtitles | Done |
| Reader page transitions | Done |
| Skip link | Done |
| Reduced-motion CSS | Done |
| Generator preserved | Done |
| PAGE_INDEX_MAP | Done |
| Scroll-to-top | Done |
| Dismissible prototype notice | Done |
| Separate v1.1 localStorage keys | Done |
| Favicon / manifest wiring | Done (site.webmanifest + index.html refs) |

### v1.1 — needs verification

| Area | Status |
|---|---|
| Favicon binary files in `public/` | Confirm present (only manifest found by scan) |
| `npm run generate / lint / build` | Not verified this session |
| Visual QA (hero, reader, mobile) | Not verified this session |
| Dead `AiAssistant.tsx` | Exists but unrouted; quarantine or delete |
| CSS cleanup (duplicate selectors) | Still needed |

### Not started — next milestone: Source Migration

| Area | Phase |
|---|---|
| Chapters 5-17 migration | Phase 2 (codex) |
| `book.yml` / `chapter-registry.yml` | Phase 2 (codex) |
| Stable filenames (replace dated) | Phase 2 (codex) |
| `source-import-manifest.csv` | Phase 2 (codex) |
| Full-book reader validation | Phase 5 (codex) |

### Deferred

| Area | Phase |
|---|---|
| Next.js v2A | Phase 3 (codex) — after migration stable |
| Supabase Auth + Stripe | Phase 3 (codex) |
| Progress, notes, search | Phase 4 (codex) |
| Media inventory / organization | Parallel (`media-plan-codex.md`) |
