# dima-publishing + BITM330-book-drive — DeepSeek Restructure Plan

> **Date:** 2026-07-10
> **Author:** GitHub Copilot (DeepSeek V4 Pro)
> **Status:** PROPOSAL — nothing executed
> **Supersedes:** `repo-reorg-plan-2026-07-09.md`, `2026-07-10-repo-restructure-detailed-plan.md`, `active/restructure-plan-2026-07-08.md`
> **Companion:** `current-structure-deepseek-2026-07-10.md` (the map this plan is based on)
>
> **Prime directive: no content is lost.** Everything kept, merged with review, or archived — never silently deleted.

---

## 0. Executive Summary

After mapping both workspaces in detail, here's the diagnosis: **the repo and Drive are two halves of a single pipeline that have drifted apart.** The repo has the production app, stable source, skills, and deployment config. Drive has the working drafts, media library, publishing contracts, and 50+ utility scripts. They overlap in ~10 areas (outlines, DOCX exports, prototypes, edit tracking, design docs, labs, appendices, scripts). The overlap isn't just wasteful — it creates ambiguity about which copy is canonical.

This plan addresses both workspaces together, respects the existing boundary (Drive = authoring, Repo = production), and fixes the specific pain points identified in the detailed map while incorporating all three prior plans.

### What This Plan Does

1. **Repo-side:** 6-phase clean restructure — reclaim ~240 MB, promote the production app, consolidate plans, tidy root, fix config bugs
2. **Drive-side:** 3-phase tidy — deduplicate `.docs/` vs `0-book-outline/` overlaps, normalize image folder naming, archive deprecated edit tracking
3. **Cross-workspace:** Codify the Drive→Repo import boundary, fix naming inconsistencies, establish ONE canonical location per content type

---

## 1. The Two-Workspace Architecture (Target)

```
┌─────────────────────────────────────┐
│  BITM330-book-drive (Google Drive)  │  ← Authoring + Media + Contracts
│  ┌───────────────────────────────┐  │
│  │ BITM330-Book-draft/           │  │
│  │  chapter-drafts/ (dated .md)  │  │  ← where you WRITE
│  │  appendices/                  │  │
│  └──────────┬────────────────────┘  │
│             │                       │
│  ┌──────────▼────────────────────┐  │
│  │ .images/ (media library)      │  │  ← image source of truth
│  │ .videos/ .audio/              │  │
│  └──────────┬────────────────────┘  │
│             │                       │
│  ┌──────────▼────────────────────┐  │
│  │ .docs/                        │  │  ← reference + outline (canonical)
│  │  outline/ (ONE location)      │  │
│  │  .styles/ (design working)    │  │
│  │  Terms/ lets-build/ RATS/     │  │
│  └──────────────────────────────┘  │
│                                     │
│  publishing/                        │  ← contracts (Drive-only)
│  lectures/                          │  ← course materials (Drive-only)
│  scripts/                           │  ← Drive-only utilities
└─────────────────┬───────────────────┘
                  │
    chapter-source-import (skill)
                  │
┌─────────────────▼───────────────────┐
│  dima-publishing (GitHub)           │  ← Production + Deployment
│  ┌───────────────────────────────┐  │
│  │ .agents/ (71 skills)          │  │  ← AI workflow hub
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ apps/reader/                  │  │  ← PRODUCTION Vite React SPA
│  │  (was platform-pilots/        │  │    deployed to Vercel
│  │   reader-hybrid-v1.1/)       │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ books/database-book/          │  │
│  │  source/chapters/ (stable)    │  │  ← imported stable source
│  │  source/labs/                 │  │
│  │  source/appendices/           │  │
│  │  source/outline/              │  │
│  │  manifests/                   │  │
│  │  plans/ (ONE consolidated)    │  │  ← all plans + archive
│  │  workflow/ (.edits, .reports, │  │
│  │    chats, Brightspace)        │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ assets/                       │  │  ← covers + repo-side images
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ archive/                      │  │  ← retired pilots, prototypes,
│  │  pilots/ prototype/ misc/     │  │    old plans, temp scripts
│  └───────────────────────────────┘  │
│  scripts/ (build + validate only)   │
└─────────────────────────────────────┘
```

---

## 2. Repo-Side Reorganization (`dima-publishing`)

### Phase R0 — Safety & Branch Reconciliation *(blocks all others)*

**Goal:** Get to a safe starting state before any moves.

- [ ] Full repo zip backup to `G:\My Drive\...\backups\dima-publishing-2026-07-10.zip`
- [ ] Reconcile branches: `backup-2026-07-08` → review → merge into `main`
- [ ] Create `reorg/phase-1` through `reorg/phase-6` branches off `main`
- [ ] Re-verify the 234 MB duplicate before Phase R1: `diff -rq books/database-book/platform-pilots/book-build/prototype books/database-book/platform-pilots/prototype`

### Phase R1 — Zero-Risk Cleanup *(~240 MB reclaimed, no behavior change)*

- [ ] Delete `books/database-book/platform-pilots/book-build/prototype/` (verified exact duplicate)
- [ ] Delete `__pycache__/` from repo root
- [ ] Delete `ch01-cover-base64.txt` (2.3 MB — `ch01-cover.png` exists)
- [ ] Delete `Dima-publishing-site/` contents (`https`, `g.co ge.txt` — confirm they're junk)
- [ ] Delete `BITM330-book-drive.lnk` (Windows shortcut)
- [ ] Delete `gen-log.txt` if confirmed stale
- [ ] Fix `.gitignore`:
  ```gitignore
  # Replace the bare .env* with:
  .env
  .env.local
  !.env.example
  # Add:
  __pycache__/
  *.pyc
  **/dist/
  *.lnk
  ```

### Phase R2 — Promote the Production App

**Goal:** `reader-hybrid-v1.1` → `apps/reader/`. The production app should be at the top level, not buried 4 levels deep under "pilots."

- [ ] `git mv books/database-book/platform-pilots/reader-hybrid-v1.1 apps/reader`
- [ ] Update root `vercel.json` (3 path references: `buildCommand`, `outputDirectory`, `installCommand`)
- [ ] Update `.github/workflows/deploy-platform-pilots-pages.yml` — rename or archive
- [ ] Grep `.agents/skills/` (especially `book-deploy`, `chapter-publish`, `chapter-sync`, `deploy-to-vercel`) for `platform-pilots/reader-hybrid-v1.1` → `apps/reader`
- [ ] Grep `apps/reader/` internals for self-referencing old paths
- [ ] Deploy Vercel preview → verify → merge
- [ ] **Only after confirmed live:** Move remaining 8 retired pilots + `evaluation.md`, `pilots.json`, `notes-06-05.md` → `archive/pilots/`
- [ ] Also move `platform-claude-5-30/` → `archive/pilots/`

### Phase R3 — Consolidate Plans

**Goal:** ONE `plans/` folder. Everything else is archive.

The map revealed ~35+ plan files across 4+ locations. Here's the consolidation:

| Current Location | Action |
|---|---|
| `plans/` (top-level 5 files) | Keep: `design-instructions.md` (canonical), `repo-reorg-plan-2026-07-09.md`, `2026-07-10-repo-restructure-detailed-plan.md`, `current-structure-deepseek-2026-07-10.md`, `2026-10-10-deepseek-restructure-detailed-plan.md` (this file) |
| `plans/active/restructure-plan-2026-07-08.md` | → `plans/archive/` |
| `plans/book-edit/` (29 files) | Historical plan iterations. → `plans/archive/book-edit/`. Keep README.md + SUMMARY.md as index. |
| `plans/book-edit/_imported-docs/` | → `plans/archive/imported-docs/` |
| `plans/image-organizing/` (5 files) | → `plans/archive/image-organizing/` |
| `plans/outline/` (3 files) | These are DUPLICATES of files in `files/source/outline/`. → `plans/archive/outline/` with suffix noting origin. |
| `plans/vscode-profile-consolidation-agent-plan-v2.md` | → `plans/archive/` |
| `PLAN.md` (self-labeled "superseded") | → `plans/archive/` |
| `files/source/outline/` | **Stays.** This feeds the reader build. It already has the newest outline files. |

- [ ] Create `plans/ACTIVE.md` — a one-page pointer to the current outline + chapter order
- [ ] Create `plans/archive/` with subdirs: `book-edit/`, `image-organizing/`, `outline/`, `imported-docs/`
- [ ] Move all historical plan files, preserving dates
- [ ] Update `.agents/skills/` that reference old plan paths

### Phase R4 — Content Folder Rename

**Goal:** `files/source/` → `source/`, `files/manifests/` → `manifests/`. Surface hidden dirs.

- [ ] `git mv books/database-book/files/source books/database-book/source`
- [ ] `git mv books/database-book/files/manifests books/database-book/manifests`
- [ ] `git mv books/database-book/.edits books/database-book/workflow/edits`
- [ ] `git mv books/database-book/.reports books/database-book/workflow/reports`
- [ ] `git mv books/database-book/chats books/database-book/workflow/chats`
- [ ] `git mv books/database-book/Brightspace books/database-book/workflow/brightspace`
- [ ] `git mv books/database-book/data books/database-book/workflow/data`
- [ ] `git mv books/database-book/design books/database-book/workflow/design`
- [ ] Update `book.yml` + all skill path references + scripts
- [ ] Update `.gitignore` if hidden dir patterns change

### Phase R5 — Root Tidy + Assets

- [ ] `git mv .images assets/images` (repo-side)
- [ ] `git mv ch01-cover.png assets/covers/`
- [ ] `git mv _static/call-outs.css assets/`
- [ ] `git mv corporation/ → archive/misc/corporation/` (or keep — open question)
- [ ] `git mv data/ → archive/misc/root-data/` (only `uploaded_videos.json` + `video_batch.example.yml`)
- [ ] `git mv Dima-publishing-site/ → archive/misc/` (after confirming contents are junk)
- [ ] Move `bitm330-lab01-grader-codex.py` → `tools/grading/` (or to BITM330 course repo — open)
- [ ] Move `NEXT-SESSION.md` → `books/database-book/workflow/`
- [ ] Delete `convert.ps1` if one-shot, or move to `archive/scripts/`
- [ ] Move `chapter-review-ch10-17/` → `books/database-book/workflow/reviews/ch10-17/`

### Phase R6 — Scripts Triage *(depends on Phase R5)*

- [ ] KEEP in `scripts/`: 5 build scripts
  - `build-chapter-html.ps1`
  - `build-chapter-pdf.ps1`
  - `build-chat-index.ps1`
  - `build-review-index.ps1`
  - `compile-appendix-a.py`
- [ ] MOVE to `archive/scripts/`: 9 one-shot `temp-*` scripts
- [ ] MOVE `secrets/` → `.secrets/` (already gitignored? Verify — YouTube credentials should NOT be in repo)

### Phase R7 — Repo Weight *(LAST — separate decision)*

Same options as prior plans:

| Option | Effect | Risk | Recommendation |
|---|---|---|---|
| A. Do nothing | Clones stay ~465 MB | Zero | Do this now |
| B. `git filter-repo` | Purge big blobs from history | Force-push needed | Revisit after semester |
| C. Fresh repo | Cleanest, old repo frozen | Loses history | Only if B fails |
| D. Git LFS | Prevents future bloat | Doesn't fix history | Do with B later |

**Recommendation:** A now. B+D after the semester with a full backup.

---

## 3. Drive-Side Tidy (`BITM330-book-drive`)

The Drive workspace is in better shape than the repo — the chapter draft structure is consistent, and the dated-file convention works. But there are specific pain points from the map.

### Phase D1 — Consolidate `.docs/` References

**Problem:** `.docs/` has 13 subfolders with significant overlap against `BITM330-Book-draft/` and `0-book-outline/`.

| Current `.docs/` folder | Contains | Recommendation |
|---|---|---|
| `.docs/.edits/` | Drive-side edit tracking | **User prefers repo-based tracking.** Archive to `do-not-delete-yet/.edits-drive-archive/`. |
| `.docs/outline/` | 10 outline files (old, 2026-05/06) | Move to `0-book-outline/old-outline/` for consolidation. `.docs/outline/` becomes a symlink or empty. |
| `.docs/.styles/` | Design docs — working copies | **KEEP.** This is the working design folder. `design-instructions.md` is mirrored from repo. |
| `.docs/RATS/` | Quiz PDFs + guidelines | **KEEP.** Course artifacts, not book content. |
| `.docs/lets-build/` | Master guide + Examples/ | **KEEP.** Reference for Let's Build authoring. |
| `.docs/Terms/` | terms-list.csv + skill | **KEEP.** Reference for term creation. |
| `.docs/build-labs/` | Extensively duplicated — Python prototypes, lab plans | Archive prototypes. Keep plans if active. |
| `.docs/book-build/` | DOCX exports + prototype/ | Duplicate of `platform-pilots/book-build/` in repo. Archive older versions. |
| `.docs/Notes/` | 2 files | **KEEP.** |
| `.docs/reference/` | Cheat sheets | **KEEP.** |
| `.docs/styles/` | quarto-wizard-inspired.css | Archive — Quarto experiment is retired. |
| `.docs/quarto-preview/` | Quarto experiment | Archive. |
| `.docs/.scripts/` | 7 utility scripts | De-duplicate against `/scripts/`. These are copies. |

- [ ] Consolidate all outline files into `0-book-outline/` as the single outline home
- [ ] Archive deprecated Drive-side edit tracking
- [ ] Archive Quarto experiment + old DOCX exports
- [ ] De-duplicate `.docs/.scripts/` against `/scripts/`

### Phase D2 — Normalize Image Folder Naming

**Problem:** Multiple naming conventions in `.images/`:

| Current Name | Should Be | Reason |
|---|---|---|
| `ch08-advanced-sql-queries/` | `ch10-advanced-sql-queries/` | Ch08 is Midterm Review, Ch10 is Advanced SQL |
| `Ch14 PowerBI/` | `ch14-powerbi/` | Standardize to chNN- prefix, kebab-case |
| `Ch15 Business Strategy and IS/` | `ch15-business-strategy-is/` | Match chapter folder name |
| `Ch16 Final Review/` | `ch16-final-review/` | Match chapter folder name |
| `Ch17 Conclusion/` | `ch17-conclusion/` | Match chapter folder name |
| `ch14-business-strategy-and-is/` | MERGE into `ch15-business-strategy-is/` | Ch14 is Power BI, Ch15 is Strategy |
| `ch15-final-review/` | `ch16-final-review/` | Off by one — ch16 is Final Review |
| `ch16-conclusion-from-data-to-wisdom/` | `ch17-conclusion/` | Off by one — ch17 is Conclusion |

- [ ] Rename/move image folders to match chapter numbering
- [ ] Update `book-media.md` ledger entries
- [ ] Merge duplicate-named folders (e.g., `ch08-advanced-sql-queries/` + `ch10-advanced-sql-queries/`)
- [ ] Add a `README.md` in `.images/` documenting the naming convention

### Phase D3 — Archive Deprecated Content

- [ ] Archive `do-not-delete-yet/.agents-deprecated/` — it's already marked "do not use"
- [ ] Archive `do-not-delete-yet/2026-07-02-root-clutter/` — confirm files are duplicated elsewhere
- [ ] Archive `do-not-delete-yet/BITM330-Book-git-archive/` — copies of Cengage + Lectures + scripts that exist elsewhere
- [ ] Archive `do-not-delete-yet/old-book-exports/` — superseded full-book PDF/DOCX exports
- [ ] Archive `do-not-delete-yet/archive-ch10-sdlc/` — old ch10 files from when it covered SDLC
- [ ] Archive `do-not-delete-yet/chapter-exports/` — 2 old PDF exports
- [ ] Delete `.tmp/` (25+ temp recovery dirs — these are workspace temp files)
- [ ] Clean root: `ch02-concepts.jpg` → `.images/ch02-mis-bitm/`, `-w` → investigate and remove

---

## 4. Cross-Workspace Boundary Rules (Codify)

These rules should be added to both `AGENTS.md` files and `copilot-instructions.md`:

### Source of Truth by Content Type

| Content Type | Canonical Location | Mirror/Working Copy | Notes |
|---|---|---|---|
| Chapter drafts (dated) | `BITM330-book-drive/BITM330-Book-draft/chapter-drafts/` | — | Authoring happens here |
| Chapter source (stable) | `dima-publishing/books/database-book/source/chapters/` | — | Imported via `chapter-source-import` |
| Appendices | Drive `BITM330-Book-draft/appendices/` | Repo `source/appendices/` | Sync via import |
| Book outline | `0-book-outline/` (Drive) | `source/outline/` (Repo) | Drive is canonical; repo is import mirror |
| Images (originals) | `.images/` (Drive) | `assets/images/` (Repo, optimized only) | Drive is source of truth |
| Design instructions | `plans/design-instructions.md` (Repo) | `.docs/.styles/design-instructions.md` (Drive) | Repo is canonical (CSS derives from it) |
| Chapter tracker | `workflow/edits/chapter-tracker.md` (Repo) | — | Single canonical tracker |
| Edit tracking | `workflow/edits/` (Repo) | — | Drive-side `.docs/.edits/` is deprecated |
| Publishing contracts | `publishing/` (Drive) | — | Drive-only — never in repo |
| Course materials | `G:\...BITM330\` (Academic root) | — | Never in textbook workspaces |
| Skills | `.agents/skills/` (Repo) | `.agents/` (Drive, junction) | Repo is canonical |
| Lab source (stable) | `source/labs/` (Repo) | Drive `Labs/` and `Labs-draft/` | Import from Drive to repo |
| Production app | `apps/reader/` (Repo) | — | Single deployed app |

### The Import Boundary

```
Drive drafts ──→ chapter-source-import ──→ Repo source (stable names, no dates)
     │                                            │
     │  NEVER: edit repo source directly          │  ALWAYS: generate bookData.ts
     │  ALWAYS: edit Drive drafts                 │  ALWAYS: build + deploy from here
```

---

## 5. Consolidated Target Structure

### Repo Target (`dima-publishing`)

```
dima-publishing/
├── README.md
├── AGENTS.md
├── vercel.json                       [updated — paths now 2 levels deep]
├── .gitignore                        [fixed]
├── .vercelignore
├── skills-lock.json
│
├── .agents/                          [UNCHANGED — 71 skills]
├── .github/                          [updated workflow paths]
├── .vscode/
├── .vercel/
│
├── apps/
│   └── reader/                       [⭐ PRODUCTION — was platform-pilots/reader-hybrid-v1.1]
│
├── books/
│   └── database-book/
│       ├── book.yml
│       ├── source/
│       │   ├── chapters/             [stable 6-part chapter files — no dates]
│       │   │   ├── ch01-introduction-to-course/
│       │   │   │   ├── index.md, core-concepts.md, lets-build.md
│       │   │   │   ├── terms-treasury.md, rat.md
│       │   │   │   ├── review-questions.md, review-answers.md
│       │   │   │   └── images/
│       │   │   ├── ch02-mis-and-bitm/ ... through ch17-conclusion/
│       │   │   └── 01-acknowledgements/
│       │   ├── labs/                 [lab-NN-petvax-*/ — stable]
│       │   ├── appendices/           [appendix-a/b/c]
│       │   └── outline/              [current + dated outlines]
│       │
│       ├── manifests/
│       │   └── source-import-manifest.csv
│       │
│       ├── plans/                    [ALL plans — ONE home]
│       │   ├── ACTIVE.md
│       │   ├── design-instructions.md
│       │   ├── current-structure-deepseek-2026-07-10.md
│       │   ├── 2026-10-10-deepseek-restructure-detailed-plan.md
│       │   └── archive/
│       │       ├── book-edit/
│       │       ├── image-organizing/
│       │       ├── outline/
│       │       └── imported-docs/
│       │
│       ├── workflow/
│       │   ├── edits/                [was .edits/ — chapter-tracker.md, chNN-edits.md]
│       │   ├── reports/              [was .reports/]
│       │   ├── chats/                [dated chat transcripts + CHAT-INDEX.md]
│       │   ├── brightspace/          [Rats/ CSV+MD exports]
│       │   ├── data/                 [video configs]
│       │   ├── design/               [shadcn-evaluation]
│       │   └── reviews/              [chapter-review-ch10-17/]
│       │
│       ├── review-index.html
│       └── scripts/                  [import-latest-drafts, rebaseline, roadmap-audit]
│
├── assets/
│   ├── covers/                       [ch01-cover.png]
│   ├── images/                       [was .images/ — repo-side optimized images]
│   └── call-outs.css                 [was _static/]
│
├── scripts/                          [build + validate only — 5 files]
│   ├── build-chapter-html.ps1
│   ├── build-chapter-pdf.ps1
│   ├── build-chat-index.ps1
│   ├── build-review-index.ps1
│   └── compile-appendix-a.py
│
├── tools/
│   └── grading/                      [bitm330-lab01-grader-codex.py — or → course repo]
│
└── archive/
    ├── pilots/                       [8 retired pilots + evaluation + pilots.json]
    ├── prototype/                    [ONE deduplicated copy]
    ├── scripts/                      [9 temp-* one-shots]
    ├── plans/                        [PLAN.md + superseded]
    └── misc/                         [corporation/, root-data/, Dima-publishing-site/ remnants]
```

### Drive Target (`BITM330-book-drive`)

```
BITM330-book-drive/
├── AGENTS.md
├── README.md
├── START-HERE.md
│
├── BITM330-Book-draft/               [authoring — largely unchanged]
│   ├── chapter-drafts/
│   │   ├── 0-book-outline/           [SINGLE outline home — all versions consolidated here]
│   │   │   ├── BITM330-book-outline-MASTER-2026-07-10.md
│   │   │   └── archive/              [all older outlines]
│   │   ├── 0-cover-image/
│   │   ├── 0-homepage/
│   │   ├── 01-acknowledgements/
│   │   ├── ch01-introduction-to-course/ through ch18-supabase/
│   │   ├── Labs-draft/               [draft labs]
│   │   └── sources/                  [Access reference files]
│   ├── appendices/
│   ├── Labs/                         [organized by part]
│   └── resources/                    [research references]
│
├── .images/                          [media library — NORMALIZED naming]
│   ├── README.md                     [NEW — naming convention docs]
│   ├── book-media.md                 [ledger]
│   ├── ch00-general/
│   ├── ch01-introduction-to-course/
│   ├── ch02-mis-bitm/
│   ├── ch03-what-is-data/
│   ├── ch04-databases/
│   ├── ch05-sql/
│   ├── ch06-relational-model/
│   ├── ch07-normalization/
│   ├── ch08-midterm-review/
│   ├── ch09-database-design/
│   ├── ch10-advanced-sql-queries/    [merged ch08-advanced → ch10]
│   ├── ch11-database-administration/
│   ├── ch12-business-intelligence/
│   ├── ch13-advanced-database-techniques/
│   ├── ch14-powerbi/
│   ├── ch15-business-strategy-is/
│   ├── ch16-final-review/
│   ├── ch17-conclusion/
│   ├── .videos/
│   ├── .audio/
│   └── _inventory/
│
├── .docs/                            [reference — TIDIED]
│   ├── .styles/                      [design working copies]
│   ├── RATS/                         [quiz PDFs + guidelines]
│   ├── lets-build/                   [master guide + examples]
│   ├── Terms/                        [terms-list.csv]
│   ├── Notes/
│   ├── reference/                    [cheat sheets]
│   ├── outline/ → JUNCTION to 0-book-outline/
│   └── build-labs/                   [active plans only — archive prototypes]
│
├── publishing/                       [contracts — UNCHANGED]
├── lectures/                         [course materials — UNCHANGED]
├── scripts/                          [Drive utilities — UNCHANGED]
├── book-platform/                    [Flask prototype — UNCHANGED]
└── do-not-delete-yet/                [review-then-archive — TIDIED]
```

---

## 6. Execution Order (Recommended)

### Block A: Quick Wins (can do in one session)
1. **Phase R0** — backup + branch reconcile
2. **Phase R1** — zero-risk cleanup (delete duplicates, fix .gitignore)
3. **Phase D3** — archive Drive deprecated content + clean root/tmp

### Block B: Structural Moves (each as separate PR)
4. **Phase R2** — promote production app (`git mv` → verify Vercel → merge)
5. **Phase R4** — content folder rename (`files/source` → `source`, surface hidden dirs)
6. **Phase R5** — root tidy + assets
7. **Phase R6** — scripts triage

### Block C: Consolidation (parallel with Block B)
8. **Phase R3** — consolidate plans (move historical files to archive/)
9. **Phase D1** — consolidate `.docs/` references + outline dedup
10. **Phase D2** — normalize image folder naming

### Block D: Final
11. **Phase R7** — repo weight decision (defer to post-semester)
12. Update all skill path references + verify reader builds
13. Update both `AGENTS.md` and `copilot-instructions.md` with new boundary rules

---

## 7. Safety Protocol (Every Phase)

1. Each phase on its own branch (`reorg/phase-N`)
2. All moves via `git mv` (history-preserving)
3. Full repo zip backup before Phase R1 and again before Phase R7
4. After each phase that touches the reader: `npm run build` + Vercel preview
5. One phase per PR — easy to stop, easy to revert
6. Drive-side changes: move files, don't delete; verify before permanent deletion

---

## 8. Open Questions (for Nim)

1. **Archive:** separate `dima-publishing-archive` repo or in-repo `archive/`? (Lean: in-repo for now, separate if Phase R7 happens)
2. **Grader script:** `bitm330-lab01-grader-codex.py` → `tools/grading/` here or → BITM330 course repo?
3. **Pilot images (227 MB):** Keep optimized only? Originals presumably on Drive.
4. **`.docs/.edits/` (Drive):** Archive or delete? User said repo-based tracking is preferred.
5. **`corporation/` + `data/` (repo root):** One file each — keep or fold into `archive/misc/`?
6. **`Dima-publishing-site/`:** Confirm the `https` and `g.co ge.txt` files are junk before deleting.
7. **Jupyter Book artifacts** (`_config.yml`, `_toc.yml`, `_build/` in Drive): Still needed or legacy?
8. **Chapter renumbering:** Is the current ch01–ch17 numbering final, or is there a pending merge/split? This affects image folder naming.
9. **`.docs/outline/` consolidation:** OK to move all outline files into `0-book-outline/` as the single outline home?

---

## 9. Related Files

- `current-structure-deepseek-2026-07-10.md` — the detailed map this plan is based on
- `repo-reorg-plan-2026-07-09.md` — authoritative measured base (repo-only)
- `2026-07-10-repo-restructure-detailed-plan.md` — prior detailed plan (repo-only)
- `active/restructure-plan-2026-07-08.md` — initial 9-phase plan (proposed `BITM330-book-manuscript` repo)
- `design-instructions.md` — canonical CSS/brand spec (untouched in this plan)
- `vercel.json` (root) — 3 path refs updated in Phase R2
- `.gitignore` — fixed in Phase R1
