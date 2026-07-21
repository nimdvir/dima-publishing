<!-- markdownlint-disable MD040 -->

# Reader Hybrid v1

Frontend-only online textbook reader prototype for *Using Data to Drive Business Performance*.

## Purpose

This prototype loads Chapters 1–4 and the first four labs from `files/source/` and presents them as a polished online textbook reader with chapter navigation, page-break-based reader pages, labs area, simulated AI assistant, and demo login.

## Source Content

- **Chapters**: `files/source/chapters/ch01-introduction-to-course/` through `ch04-databases/`
- **Labs**: `files/source/labs/lab-01-petvax-intro/` through `lab-04-intro-to-access/`

## Section Mapping

Each chapter exposes six reader sections:

| Section           | Stable File           | Dated Fallback Pattern                           |
| ----------------- | --------------------- | ------------------------------------------------ |
| Introduction      | `index.md`            | *(none — placeholder if index.md is a TOC stub)* |
| Core Concepts     | `core-concepts.md`    | `chNN-main-YYYY-MM-DD.md`                        |
| Let's Build       | `lets-build.md`       | `chNN-lets-build-YYYY-MM-DD.md`                  |
| Review Questions  | `review-questions.md` | `chNN-reflection-YYYY-MM-DD.md`                  |
| Terms Treasury    | `terms-treasury.md`   | `chNN-terms-YYYY-MM-DD.md`                       |
| RAT: Reading Test | `rat.md`              | `chNN-rat-YYYY-MM-DD.md`                         |

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
cd books/database-book/platform-pilots/reader-hybrid-v1.1
npm install
npm run generate   # Scan source files and build bookData.ts
npm run dev        # Start dev server on port 3000
npm run lint       # Type-check
npm run build      # Production build
```

## Local Background Deployment (Windows)

The local deployment launcher serves the production build in the background on
port 3000. A separate hot-reload development server is available on port 3001.
Both servers bind to `0.0.0.0`, so they are available from this computer and
other devices on the same local network.

```powershell
npm run local:start   # Validate, generate, lint, build, and start preview on 3000
npm run local:dev     # Generate and start hot-reload development on 3001
npm run local:all     # Start both modes
npm run local:status  # Show process state, URLs, and log paths
npm run local:stop    # Stop both modes
```

The preview is available at `http://localhost:3000`; development is available
at `http://localhost:3001`. The launcher discovers and prints current LAN URLs,
which can change when the computer reconnects to a network.

Process state and stdout/stderr logs are stored under
`%TEMP%\dima-textbook-local`. The servers continue running after the launching
terminal closes, but they do not restart automatically after Windows sign-out
or reboot. To restart one mode directly, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/local-deployment.ps1 -Action restart -Mode preview
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/local-deployment.ps1 -Action restart -Mode dev
```

The local frontend uses the existing hosted Supabase configuration from the
project environment files. The launcher does not modify Vercel, Windows startup,
Windows Firewall, or router settings.

## Required Environment Variables

The production build runs `npm run validate:access` before building.

That validator requires these variables at production build time:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Local development can use:

- `.env.local`
- or `.env` / `.env.example` as a template starting point

For Vercel deployments, define the same variable names in the Vercel project environment settings.

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

**Reader Hybrid v1.1** — frontend prototype, not production-ready.

## Deployment Safety

Before testing reader changes on Vercel, see:

- [Vercel Preview Deployment Guide](./vercel-preview-deployment.md)

## Deployment

| Target       | Root Directory                                           | Build                                                                                 | Output | Notes                        |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------ | ---------------------------- |
| Vercel       | `books/database-book/platform-pilots/reader-hybrid-v1.1` | `npm run build`                                                                       | `dist` | Leave `VITE_BASE_PATH` unset |
| GitHub Pages | nested under combined site                               | same build with `VITE_BASE_PATH=/dima-publishing/platform-pilots/reader-hybrid-v1.1/` | `dist` | Entry: `?scope=welcome`      |

See `../README.md` for the full platform-pilots deployment guide.

If a Vercel build fails with access-configuration validation, first check whether the Vercel project has:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

configured in its environment settings.
