# Chat: Repo Reorganization & Restructure Plan

**Date:** 2026-07-08  
**Source:** GitHub Copilot (VS Code)  
**Topic:** `dima-publishing` repo organization diagnosis + full restructuring plan  
**Branch:** `backup-2026-07-08`

---

## TL;DR

Diagnosed why `dima-publishing` felt like a junk drawer: it mixes a production Vite reader app, imported book source, ~8 reader prototypes, ~31 overlapping plan files, Supabase experiments, chats, and deployment tooling with no clear boundaries. Built a 9-phase restructuring plan. Saved the plan to the repo and Notion. Execution is **blocked until the new book chapter structure is finalized**.

---

## Key Points

- **No HTML files in built site** — expected. `reader-hybrid-v1.1` is a Vite React SPA; `npm run build` produces `dist/index.html` + one bundled JS. Vercel rewrites all routes to that one file.
- **Dated vs. stable filenames** — two legitimate conventions: Drive drafts are intentionally dated (`chNN-main-YYYY-MM-DD.md`); production source in `files/source/` uses stable names (`core-concepts.md`). Dated files found *inside* `files/source/` (e.g. `lab-05-questions-2026-06-16.md`) are un-normalized import artifacts.
- **`supabase start` error** — comes from the `claude` Next.js pilot, not the active reader. The Vite reader client returns `null` when Supabase env vars are absent and runs fine without them.
- **`plans/book-edit/`** — ~31 overlapping plan files (duplicates, per-AI-tool copies). Leave alone for now; back up to Notion; consolidate after book restructure.
- **`dima-publishing` is a public repo** — do not commit private chat logs, draft notes with personal content, or `.env` files.

---

## What Was Done

### Diagnosis
- Explored `dima-publishing` repo structure via subagents (3 parallel deep dives)
- Mapped all subfolders, platform pilots, plans, and the reader app
- Identified the Supabase confusion source (`claude` pilot vs. active Vite reader)
- Confirmed generator pipeline: `generateBookData.ts` → `src/generated/bookData.ts` → React app

### Plan synthesis
- Built initial plan recommending "git-ify Drive"
- GPT review corrected this: don't make Google Drive itself a git repo (sync daemon + `.git` = conflicts)
- Synthesized final 9-phase plan incorporating both analyses

### Files saved
- **Repo plan file:** `books/database-book/plans/active/restructure-plan-2026-07-08.md` ✅
- **Notion page:** https://app.notion.com/p/397508ab55d7815e9eaac4430fcb388f ✅
- **Quick-start handoff:** `NEXT-SESSION.md` at repo root ✅

---

## Final Recommended Architecture

```
BITM330-book-manuscript (private GitHub)  ← where you write (NEW, not yet created)
        │ one-way import (chapter-source-import skill)
        ↓
dima-publishing (public GitHub)  ← stable source + reader + deployment
        │ npm run build
        ↓
   Vercel (live reader)

Google Drive  ← mirror, media originals, contracts (NOT a git repo)
Notion  ← dashboard/index only (not source of truth)
```

---

## Key Decisions Made

| Decision | Choice |
|---|---|
| Draft home | New private repo `BITM330-book-manuscript` — not Drive, not `BITM330-Book-git` |
| Active reader | Keep Vite `reader-hybrid-v1.1`; archive all other pilots |
| Supabase / Next.js | Deferred — current reader doesn't need it |
| Google Drive role | Mirror + media + archives only — no `.git` folder |
| `plans/book-edit/` (31 files) | Leave alone; Notion backup first; consolidate later |
| `dima-publishing` plans | Saved to Notion as mirror; repo file is canonical |

---

## 9-Phase Restructure Plan Summary

| Phase | Action | Status |
|---|---|---|
| 0 | Create safety branch `restructure-2026-07-08` | ✅ Done |
| 1 | Add READMEs + empty `chapter-map.yml`, no moves | ⏳ Blocked on book structure decision |
| 2 | Archive old pilots → `platform-pilots/_archive/` | ⏳ Pending |
| 3 | Normalize dated source stragglers to stable names | ⏳ Pending |
| 4 | Document Supabase optionality; archive `claude` pilot | ⏳ Pending |
| 5 | Create `BITM330-book-manuscript` private repo | ⏳ Pending |
| 6 | Extract chapter list into `book.structure.yml` manifest | ⏳ Pending |
| 7 | Notion mirror for plans/active, outline, tracker | ⏳ Pending |
| 8 | Chapter restructure using `chapter-map.yml` | ⏳ Blocked on book structure decision |
| 9 | Verify: reader builds, no stale files, Notion synced | ⏳ Pending |

**Current blocker:** Phases 1 and 8 both require finalizing the new book chapter structure. The user attached `outline-GLM-2026-07-07.md` as context for this decision.

---

## Key Files

| File | Purpose |
|---|---|
| `books/database-book/plans/active/restructure-plan-2026-07-08.md` | Full restructure plan (canonical repo copy) |
| `NEXT-SESSION.md` (repo root) | Quick pickup file for next session |
| `books/database-book/platform-pilots/reader-hybrid-v1.1/` | Active reader — only this pilot stays |
| `books/database-book/platform-pilots/` | 7 other pilots to be archived |
| `books/database-book/plans/book-edit/` | 31 overlapping plan files — do not delete yet |
| `BITM330-Book-draft/chapter-drafts/0-book-outline/outline-GLM-2026-07-07.md` | New outline attached this session — needs decision |

---

## Next Actions

1. Review `outline-GLM-2026-07-07.md` → decide final chapter order and merges
2. Execute Phase 1 (READMEs + `chapter-map.yml` scaffold) — safe to do before structure is final
3. Create `BITM330-book-manuscript` private GitHub repo (Phase 5) — safe to do now
