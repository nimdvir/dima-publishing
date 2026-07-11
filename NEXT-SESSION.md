# Next Session — 2026-07-08

## What we did today
- Diagnosed why the repo felt disorganized (mixed concerns: reader app, source, plans, pilots, Supabase experiments)
- Agreed on a restructuring plan and architecture
- Saved the full plan in two places:
  - **Repo:** `books/database-book/plans/active/restructure-plan-2026-07-08.md`
  - **Notion:** https://app.notion.com/p/397508ab55d7815e9eaac4430fcb388f

## We are NOT starting the restructure yet
Waiting on: **final book structure decisions** (chapter order, merges like ch11+ch12).

## When you're ready to start, the plan says:

**Phase 0** is already done — branch `restructure-2026-07-08` exists on `dima-publishing`.

**First moves (Phase 1 — READMEs only, nothing moves yet):**
1. Add `platform-pilots/README.md` — table of pilot status
2. Add `books/database-book/plans/README.md` — explains plans/ vs .edits/ vs .reports/
3. Add `books/database-book/backend/README.md` — Supabase separation note
4. Create empty `chapter-map.yml` scaffold

**After you decide the chapter structure:**
- Fill in `chapter-map.yml` with the new order + merges
- Then run Phases 2–9 (archive pilots, normalize source, create manuscript repo, etc.)

## Key decisions already made
- **Draft home:** New private repo `BITM330-book-manuscript` (NOT in Drive, NOT `BITM330-Book-git`)
- **Reader:** Keep Vite `reader-hybrid-v1.1`, archive all other pilots
- **Supabase:** Defer — the current reader doesn't need it; the error comes from the `claude` pilot only
- **Drive:** Mirror/archive/media only going forward — not a git repo

## Quick prompt to continue
> "Read `NEXT-SESSION.md` and continue from Phase 1 of the restructure plan."
