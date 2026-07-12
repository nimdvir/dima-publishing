---
title: "Repo Restructure & Draft Strategy Plan"
date: 2026-07-08
status: pending — waiting on final book structure decisions
branch: backup-2026-07-08
chat: "VS Code Copilot Chat, 2026-07-08 — session starting with 'the dima-publishing repo seems very unorganized'"
---

# Repo Restructure & Draft Strategy Plan

**Date:** 2026-07-08
**Status:** Pending — waiting on final book structure decisions before executing
**Branch snapshot:** `backup-2026-07-08`

---

## Diagnosis

The repo has become a mix of production app, imported book source, old prototypes, plans, reports, chats, Supabase experiments, and deployment tooling. It is not broken — it just lacks clear boundaries.

| Layer | Current location | What it should be |
|---|---|---|
| Draft manuscript | Google Drive `BITM330-Book-draft/chapter-drafts` | Dated, author-facing, versioned |
| Production source | `files/source/` | Stable filenames, deployable, no drafts |
| Reader app | `platform-pilots/reader-hybrid-v1.1` | Active web app |
| Old experiments | `platform-pilots/*` | Archived |
| Plans/reports/chats | Scattered | Consolidated and indexed |
| Supabase backend | Hidden inside a pilot | Move to explicit backend area or archive |

### Key findings

- **No HTML files in the built site** — expected. `reader-hybrid-v1.1` is a Vite React SPA. `npm run build` produces `dist/index.html` + one bundled JS. Vercel rewrites all routes to that single file.
- **Dated vs. stable filenames** — drafts (Drive) are intentionally dated. Production source (`files/source/`) uses stable names (`core-concepts.md`, `lets-build.md`). Dated files found in source (e.g. `lab-05-questions-2026-06-16.md`) are un-normalized import artifacts to fix.
- **`supabase start` error** — comes from the `claude` Next.js pilot (requires Docker + local Supabase). The active Vite reader does NOT need Supabase; its client returns `null` when env vars are absent.
- **`plans/book-edit/`** — ~31 overlapping files (duplicates, per-AI-tool copies). Leave alone for now; back up to Notion; consolidate later.
- **`dima-publishing` is a public repo** — do not commit private chat logs, draft notes with personal content, or `.env` files.

---

## Recommended Architecture

```
BITM330-book-manuscript (private GitHub)  ← where you write (NEW)
        │ one-way import (chapter-source-import skill)
        ↓
dima-publishing (public GitHub)  ← stable source + reader + deployment
        │ npm run build
        ↓
   Vercel (live reader)

Google Drive  ← mirror, media originals, contracts, large assets (NOT a git repo)
Notion  ← dashboard/index only (not source of truth)
```

### Draft home decision

Do **not** git-ify Google Drive — Drive's file-sync daemon and `.git`'s many small files cause sync conflicts and lock issues.
Do **not** use `BITM330-Book-git` — legacy Jupyter Book repo, already cluttered.
**Create a new private repo `BITM330-book-manuscript`** outside Drive. Drive becomes mirror/archive/media storage only.

### Reader decision

Keep the Vite reader (`reader-hybrid-v1.1`). Archive all other pilots.
Defer Supabase + Stripe + Next.js until content is complete and paywall is needed.

---

## Phases

### Phase 0 — Safety baseline *(blocks all later phases)*
- Branch `restructure-2026-07-08` already created
- Commit a clean snapshot before any moves

### Phase 1 — Add maps & READMEs only, move nothing *(parallel with Phase 2)*
- `platform-pilots/README.md` — table: which pilot is active, which archived, what each requires to run
- `books/database-book/plans/README.md` — explains roles of `plans/` vs `.edits/` vs `.reports/`
- `books/database-book/backend/README.md` — one-paragraph note on Supabase separation
- `chapter-map.yml` — empty scaffold (format defined before restructure begins)

### Phase 2 — Archive old pilots *(depends on Phase 0)*
- Move everything except `reader-hybrid-v1.1` into `platform-pilots/_archive/`
- Keep folder names intact inside `_archive/` (history stays legible)
- Update `pilots.json` and `README.md` table
- Do **not** change Vercel config yet (path stays `platform-pilots/reader-hybrid-v1.1`)

### Phase 3 — Normalize production source *(depends on Phase 0)*
- Rename dated stragglers in `files/source/` to stable names (e.g. `lab-05-questions-2026-06-16.md` → `lab-questions.md`)
- Update `.sync-manifest.csv` and re-run generator to confirm clean build
- Move `chapter-review-ch10-17/` (repo root) into `books/database-book/.reports/`

### Phase 4 — Supabase clarity *(depends on Phase 2)*
- Archive `claude` pilot clearly (mark as "requires Docker + supabase start")
- Add `.env.example` to reader with comments explaining Supabase is optional
- Document: "reader runs without Supabase; only the backend pilot requires local Supabase"

### Phase 5 — New manuscript repo *(depends on Phase 0, parallel with Phases 2–3)*
- Create `BITM330-book-manuscript` as a **private** GitHub repo at `C:\Users\nd115232\Documents\GitHub\`
- Copy Drive's `chapter-drafts/` structure in (dated files, subfolder convention intact)
- `.gitignore`: `.build/`, `.images/` originals, `*.accdb`, large media, Drive-sync artifacts
- Push to GitHub (private)
- Drive folder becomes mirror/archive only — GitHub repo is now draft source of truth

### Phase 6 — `book.structure.yml` manifest *(depends on Phase 5)*
- Extract the hardcoded chapter list from `generateBookData.ts` into `books/database-book/book.structure.yml`
- Update generator to read from that file
- This makes chapter reorder a one-file change instead of a code edit

### Phase 7 — Notion mirror *(depends on Phase 1)*
- Sync to Notion via `notion-bridge` skill: `plans/active/`, decision logs, `chapter-map.yml`, outline, chapter tracker
- **Do not sync:** chat logs, `.edits/` draft notes, private content, student data

### Phase 8 — Chapter restructure *(depends on Phases 5–6)*
- Fill in `chapter-map.yml` with actual reorder + merges (e.g. ch11+ch12 → new ch11)
- Apply map to: manuscript folders, source folders, generator YAML, labs, RATs, image folders, chapter tracker
- One map file drives all locations — do not manually rename across locations

### Phase 9 — Verify *(depends on all prior phases)*
- `npm run generate && npm run build` succeeds in `reader-hybrid-v1.1`
- `git status` on `dima-publishing` shows only intended moves; branch is revertible
- No dated stragglers remain in `files/source/chapters/`
- Notion pages populated and readable
- Manuscript repo pushes cleanly; Drive has no `.git/` folder

---

## Relevant Files

| File | Why it matters |
|---|---|
| `platform-pilots/pilots.json` | Update after archiving pilots |
| `platform-pilots/reader-hybrid-v1.1/scripts/generateBookData.ts` | Refactor to read `book.structure.yml` |
| `files/source/chapters/**/lab-*-questions-*.md` | Normalize to stable names |
| `files/manifests/source-import-manifest.csv` | Update after renaming |
| `chapter-map.yml` (new) | Drives chapter reorder |
| `book.structure.yml` (new) | Replaces hardcoded chapter list in generator |

---

## Open Questions (not yet decided)

- Final chapter order and merges (e.g. which chapters combine, new numbering)
- Whether `plans/book-edit/` consolidation happens before or after the chapter restructure
- Notion target for ongoing chapter tracker (new DB vs. existing page)
