---
title: dima-publishing Repo Restructure — Detailed Plan
date: 2026-07-10
status: pending — waiting on final book structure decisions
scope: dima-publishing repo ONLY (Google Drive drafts out of scope)
supersedes: none (extends plans/repo-reorg-plan-2026-07-09.md and plans/active/restructure-plan-2026-07-08.md)
chat: books/database-book/chats/2026-07-10-copilot-repo-restructure-plan.md
branch_at_authoring: backup-2026-07-08 (default branch is main)
---

# dima-publishing Repo Restructure — Detailed Plan

> **Prime directive: no content is lost.** Everything is kept, merged-with-review,
> or archived — never silently deleted.
>
> This plan builds on two prior drafts and should be read alongside them:
> - `plans/repo-reorg-plan-2026-07-09.md` (authoritative measured base)
> - `plans/active/restructure-plan-2026-07-08.md` (draft/reader strategy)
>
> Nothing here is executed yet. Execution is gated on the final book structure
> decision (chapter order + merges).

---

## 1. Goal

Reorganize `dima-publishing` into a clean, best-practice layout:

- **`apps/`** for the deployable reader
- **`books/database-book/source/`** as the single content truth
- **`archive/`** for history kept out of the way

while:

- reclaiming ~240 MB of pure duplication
- clearing root-level clutter
- consolidating plans that are sprawled across 4+ locations
- codifying naming and folder conventions
- reconciling the branch situation (currently on `backup-2026-07-08`, not `main`)

Each phase is **one branch, one PR**, all moves via `git mv`, with a Vercel
preview check before each merge.

---

## 2. Current State (measured)

| Area | Size | Notes |
|---|---|---|
| Working tree | ~1.3 GB / 1,487 files | |
| `.git` history | 465 MB | Big files already in history |
| `platform-pilots/` | 687 MB | See breakdown |
| ├─ `book-build/prototype/` | 234 MB | **Exact byte-for-byte duplicate** of `prototype/` (verified `diff -rq`) |
| ├─ `prototype/assets/.../.images/` | 227 MB | Unoptimized pilot images (PNGs up to 8 MB) + one 3 MB .m4a |
| ├─ `reader-hybrid-v1.1/` | 6.3 MB | **The production app** (deployed data-pilot.dimapublishing.com via root `vercel.json`) |
| └─ 7 other pilots | ~9 MB | ai-studio, chat-gpt, claude, cursor-online-reader, google-ai-studio, reader-hybrid, reader-hybrid-alt |
| `files/source/` | 91 MB / 240 md | Canonical chapter/lab/appendix source — **crown jewels** |
| `.images/` (root) | 16 MB | Chapter images, separate from pilot images |
| `.agents/` | 1.7 MB | ~50 skills + reference — healthy |

### Healthy — leave alone
- `books/database-book/files/source/` — clean chapter structure
- `.agents/` — the AI workflow hub
- `reader-hybrid-v1.1/` internals (only its location changes)
- `.github/workflows/`, `book.yml`, `files/manifests/`

### Messy — the target of this plan
1. **~470 MB pure duplication** (`book-build/prototype` = copy of `prototype`)
2. **Production app buried under "pilots"** — misleading name, fragile 4-level `vercel.json` paths
3. **Plans sprawl across 4+ locations** with same-named but different-md5 files
   (`plans/outline/`, `plans/book-edit/`, `plans/book-edit/_imported-docs/outline/`,
   `files/source/outline/`)
4. **Root clutter:** `ch01-cover-base64.txt` (2.3 MB), `bitm330-lab01-grader-codex.py`,
   `convert.ps1`, `gen-log.txt`, `NEXT-SESSION.md`, `BITM330-book-drive.lnk`, `__pycache__/`
5. **Dead dirs:** `Dima-publishing-site/` (junk `https`, `g.co ge.txt`),
   `platform-claude-5-30/` (stray `.next/`)
6. **`scripts/` mixes keepers with one-offs** — 9 of 13 are `temp-fix-*` / `temp-sync-*`
7. **`.gitignore` bug:** bare `.env*` line cancels `!.env.example`; missing
   `__pycache__/`, `*.pyc`, `dist/`

---

## 3. Target Structure

```
dima-publishing/
├── README.md                     ← expanded: what this repo is + map
├── vercel.json                   ← updated paths after app promotion
├── .gitignore                    ← fixed
├── .agents/                      ← UNCHANGED
├── .github/                      ← workflows updated for new paths
│
├── apps/
│   └── reader/                   ← was platform-pilots/reader-hybrid-v1.1 (PRODUCTION)
│
├── books/
│   └── database-book/
│       ├── book.yml
│       ├── source/               ← was files/source (chapters, labs, appendices, outline)
│       ├── manifests/            ← was files/manifests
│       ├── plans/
│       │   ├── ACTIVE.md         ← current plan
│       │   └── archive/          ← every dated/superseded plan, nothing deleted
│       ├── workflow/             ← .edits, .reports, chats, Brightspace, review-index.html
│       └── scripts/
│
├── assets/
│   ├── covers/                   ← ch01-cover.png etc.
│   └── images/                   ← was root .images/
│
├── scripts/                      ← 4 real build scripts only
├── tools/
│   └── grading/                  ← bitm330-lab01-grader-codex.py (or → course repo)
│
└── archive/                      ← in-repo OR separate repo (open question)
    ├── pilots/                   ← 7 retired pilots + evaluation.md + pilots.json
    ├── prototype/                ← ONE deduped copy, images optimized or LFS'd
    └── misc/                     ← corporation/, data/, _static/, Dima-publishing-site remnants
```

Naming logic: `apps/` = deployed software; `books/*/source/` = content truth;
`archive/` = history preserved but out of the way. Hidden dirs (`.edits`,
`.reports`) become visible under `workflow/` so they stop getting missed in
searches.

---

## 4. Phased Plan (ordered by risk — one branch + PR each)

### Phase 0 — Safety & branch reconciliation *(blocks everything)*
- Full repo zip backup before any change.
- **Branch strategy:** currently on `backup-2026-07-08`; default is `main`.
  Decide the target: recommended is to verify/merge `backup-2026-07-08` into
  `main`, base all `reorg/phase-N` branches off `main`, and prune stale branches
  after the reorg lands.
- Re-verify the 234 MB duplicate with `diff -rq` immediately before Phase 1.

### Phase 1 — Zero-risk cleanup (~240 MB reclaimed, no behavior change) *(depends on 0)*
- Delete `platform-pilots/book-build/prototype/` (verified exact dup — re-verify first).
- Delete `__pycache__/` and `ch01-cover-base64.txt` (the PNG stays).
- Delete `Dima-publishing-site/` junk (`https`, `g.co ge.txt`) — confirm first.
- Remove `.lnk` files (both locations).
- Delete `gen-log.txt` if stale (confirm).
- Fix `.gitignore`: replace the stray `.env*`; add `__pycache__/`, `*.pyc`,
  `**/dist/`, `*.lnk`.

### Phase 2 — Promote the production app *(depends on 1; app first, pilots second)*
- `git mv books/database-book/platform-pilots/reader-hybrid-v1.1 apps/reader`.
- Update root `vercel.json` (3 path refs) + any `.github/` workflows.
- Grep `.agents/skills/` (esp. `book-deploy`, `chapter-publish`, `chapter-sync`)
  for hardcoded `platform-pilots/reader-hybrid-v1.1` paths.
- Deploy Vercel preview → verify → merge.
- **Only after the app is confirmed live from its new home:** move the 7 retired
  pilots + `evaluation.md`, `pilots.json` and `platform-claude-5-30/` to
  `archive/pilots/`.

### Phase 3 — Consolidate plans *(requires review — content differs)*
- Inventory all plan/outline files across the 4+ locations with date + md5.
- Canonical rule: the outline that feeds the build lives in `source/outline/`.
  Everything in `plans/outline/` and `_imported-docs/outline/` becomes archive.
- For same-named-different-content pairs: side-by-side diff, keep the canonical,
  archive the other with a suffix (`outline-2026-06-05-plans-copy.md`).
- Create `plans/ACTIVE.md`; retire `PLAN.md` → `plans/archive/`.
- Move `plans/book-edit/_imported-docs/` → `plans/archive/imported-docs/`.

### Phase 4 — Content folder rename *(depends on 2)*
- `git mv files/source source` and `git mv files/manifests manifests`.
- Surface `.edits/`, `.reports/`, `chats/` under a visible `workflow/`.
- Update manifests + skill path references.

### Phase 5 — Root tidy *(parallel with 3)*
- `assets/covers/` + `assets/images/` (from root `.images/`).
- `tools/grading/` for the grader script (or move to a BITM330 course repo — open question).
- Fold single-file dirs (`corporation/`, `data/`, `_static/`) into `archive/misc/`
  or keep (open question).

### Phase 6 — scripts triage *(parallel with 3)*
- Keep the 4 real build scripts (build-chapter-html, build-chapter-pdf,
  build-chat-index/build-review-index, compile-appendix-a.py).
- Move the 9 `temp-*` one-offs to `archive/scripts/` (or delete once confirmed
  they already ran).

### Phase 7 — Repo weight *(LAST — the only step with real risk)*
| Option | Effect | Risk |
|---|---|---|
| **A. Do nothing** | Clones stay heavy but everything works | Zero risk |
| **B. `git filter-repo`** purge big blobs | Clone drops well under 100 MB | Rewrites history → force-push, re-clone needed |
| **C. Fresh repo** from cleaned tree | Cleanest; old repo frozen as backup | New repo loses history |
| **D. Git LFS** for large images going forward | Prevents future bloat | Doesn't fix existing history |

**Lean:** A now, revisit B after the semester with a full backup zip. Never
bundle Phase 7 with the reorg.

---

## 5. Branch Cleanup (driver)

- Currently on `backup-2026-07-08`; default is `main`.
- Reconcile: verify/merge the backup branch into `main`, base reorg PRs on `main`,
  prune stale branches after the reorg lands.

## 6. Naming Conventions (driver — codify)

- Drafts: `chNN-part-YYYY-MM-DD.md` (dated, author-facing).
- Production source: stable six-file chapter contract
  (`core-concepts.md`, `lets-build.md`, `review-questions.md`,
  `terms-treasury.md`, `rat.md`, `lab-questions.md`) — no dates.
- Folders: kebab-case.
- `apps/` = deployable software; `source/` = content truth; `archive/` = history.

---

## 7. Do-Not-Touch List

- `files/source/` (moved/renamed only via `git mv`, contents never edited)
- `.agents/`
- `apps/reader` internals (only location changes)
- `book.yml`, `files/manifests/`, `.github/` history
- Anything on Google Drive

## 8. Open Questions

1. **Archive location:** in-repo `archive/` vs. a separate `dima-publishing-archive`
   repo? (Lean separate repo if Phase 7B/C happens, in-repo otherwise.)
2. **Grader script:** keep here (`tools/grading/`) or move to a BITM330 course repo?
3. **Pilot images (227 MB):** OK to drop the 5–8 MB originals, keep optimized only?
4. **GitHub Pages pilot gallery:** retire or keep?
5. **`corporation/` + `data/`** (one file each): keep or fold into `archive/misc/`?
6. **Final chapter order + merges** (e.g. ch11+ch12) — this decision unblocks the
   plan-consolidation and any content renumbering.

## 9. Execution Safety Protocol (when approved)

- Each phase on its own branch (`reorg/phase-1`, etc.), merged via PR so GitHub
  shows every rename.
- All moves via `git mv` (history-preserving), never delete-and-recreate.
- Full repo zip backup before Phase 1 and again before Phase 7.
- After each phase: `npm run build` in the reader app + Vercel preview before merge.
- One phase per PR — easy to stop, easy to revert.

---

## Related Files

- `books/database-book/plans/repo-reorg-plan-2026-07-09.md` — authoritative base
- `books/database-book/plans/active/restructure-plan-2026-07-08.md` — draft/reader strategy
- `vercel.json` (root) — 3 path refs updated in Phase 2
- `.gitignore` — fixed in Phase 1
- `books/database-book/.edits/todo.md` — restructure tasks logged
- `.agents/skills/{book-deploy,chapter-publish,chapter-sync}` — path refs to update
