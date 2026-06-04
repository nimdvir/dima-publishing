# Reader Hybrid v1

Frontend-only online textbook reader prototype for *Using Data to Drive Business Performance*.

## Purpose

This prototype loads Chapters 1–4 and the first four labs from `files/source/` and presents them as a polished online textbook reader with chapter navigation, page-break-based reader pages, labs area, simulated AI assistant, and demo login.

## Source Content

- **Chapters**: `files/source/chapters/ch01-introduction-to-course/` through `ch04-databases/`
- **Labs**: `files/source/labs/lab-01-petvax-intro/` through `lab-04-intro-to-access/`

## Section Mapping

Each chapter exposes six reader sections:

| Section | Stable File | Dated Fallback Pattern |
|---|---|---|
| Introduction | `index.md` | *(none — placeholder if index.md is a TOC stub)* |
| Core Concepts | `core-concepts.md` | `chNN-main-YYYY-MM-DD.md` |
| Let's Build | `lets-build.md` | `chNN-lets-build-YYYY-MM-DD.md` |
| Review Questions | `review-questions.md` | `chNN-reflection-YYYY-MM-DD.md` |
| Terms Treasury | `terms-treasury.md` | `chNN-terms-YYYY-MM-DD.md` |
| RAT: Reading Test | `rat.md` | `chNN-rat-YYYY-MM-DD.md` |

## Page-Break Handling

Supported markers (case-insensitive):

- `<!-- PAGE BREAK -->`
- `<!-- pagebreak -->`
- `<!-- page-break -->`
- `<div class="page-break"></div>`
- `<div style="page-break-after: always;"></div>`

These are normalized, then used to split content into individual reader pages.

## Deep-Link Format

```
?scope=book&chapter=ch03&section=core-concepts&page=2
?scope=labs&lab=lab-01-petvax-intro
?scope=ai-assistant
?scope=login
```

## Demo Login

Visual/demo only. Uses `localStorage` key `reader-hybrid:demoUser`. No real authentication, no passwords, no payment info collected.

## AI Assistant

Simulated responses only. No external API calls, no API keys, no backend routes.

## Commands

```bash
cd books/database-book/platform-pilots/reader-hybrid
npm install
npm run generate   # Scan source files and build bookData.ts
npm run dev        # Start dev server on port 3000
npm run lint       # Type-check
npm run build      # Production build
```

## Design References

- Visual direction borrowed from `platform-pilots/prototype/`
- Login, AI, and lab UI ideas borrowed from `platform-pilots/ai-studio/`

## Known Limitations

- Stable section files (`core-concepts.md`, etc.) do not yet exist — dated fallbacks are used
- Lab folders are currently empty — chapter-folder fallback or placeholders are used
- AI assistant is simulated
- Login is demo-only
- No notes, progress, payment, or auth persistence
- No backend, no database, no real auth, no live AI

## Tech Stack

Vite, React 18, TypeScript, react-markdown, remark-gfm, rehype-raw, rehype-sanitize. Plain CSS. No external UI frameworks.

---

**Reader Hybrid v1** — frontend prototype, not production-ready.
