# Database Book — Consolidated Development Plan

**Date:** 2026-06-10
**Status:** Approved — ready for phased implementation
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
Phase 1: v1.1 Reader Completion Pass       ← this sprint
Phase 2: Source Migration — Drive → Git     ← next sprint
Phase 3: v2A Paid Platform Proof            ← after migration
Phase 4: v2B Persistent Learning Features   ← after v2A stable
```

## Plan Files

| File | Contents |
|---|---|
| [01-v1.1-reader-completion.md](01-v1.1-reader-completion.md) | Phase 1: motion, hero, layout, favicon, CSS, acceptance criteria |
| [02-source-migration.md](02-source-migration.md) | Phase 2: Drive→Git migration, chapter registry, manifests, policy |
| [03-v2a-paid-platform.md](03-v2a-paid-platform.md) | Phase 3: Next.js, Supabase Auth, Stripe, access grants |
| [04-v2b-learning-features.md](04-v2b-learning-features.md) | Phase 4: progress, notes, labs, search, accessibility |
| [05-architecture-reference.md](05-architecture-reference.md) | Reader architecture, generator pipeline, image strategy, prototype adoption guide |
| [06-locked-decisions.md](06-locked-decisions.md) | All settled decisions from planning sessions |

## Current State

### Completed or mostly completed (v1.1)

| Area | Status |
|---|---|
| White/zinc/indigo palette | Mostly done |
| Sticky white header | Done |
| Home page copy | Mostly done |
| Feature cards | Done |
| "On this page" H2/H3 nav | Done |
| Mobile "On this page" block | Done |
| Sidebar icons/subtitles | Mostly done |
| Skip link | Done |
| Reduced-motion CSS | Done |
| Generator preserved | Done |
| PAGE_INDEX_MAP | Done |
| Scroll-to-top | Done |
| Dismissible prototype notice | Done |
| Separate v1.1 localStorage keys | Done |

### Not completed — Phase 1 scope

| Area | Status |
|---|---|
| `motion` dependency | Missing |
| AnimatedBookCover component | Missing |
| Two-column home hero | Missing / incomplete |
| Reader width cleanup (780px cap) | Needs fix |
| Active "On this page" highlighting | Missing |
| Reader page transitions | Missing |
| Favicon / manifest | Not confirmed |
| CSS cleanup (duplicate selectors) | Still needed |

### Not started — later phases

| Area | Phase |
|---|---|
| Chapters 5–17 migration | Phase 2 |
| chapter-registry.yml / book.yml | Phase 2 |
| Stable filenames (replace dated) | Phase 2 |
| Next.js v2A | Phase 3 |
| Supabase Auth + Stripe | Phase 3 |
| Progress, notes, search | Phase 4 |
