# Dima Publishing Repo — Reorganization Plan

> Proposed 2026-07-09. Status: **DRAFT — nothing executed, pending Nim's approval.**
> Scope: `github.com/nimdvir/dima-publishing` only. Google Drive drafts are untouched and out of scope.
> Prime directive: **no content is lost.** Everything is either kept, merged with review, or archived — never silently deleted.

---

## 1. Current State (measured, not guessed)

| Area | Size | Notes |
|---|---|---|
| Whole working tree | ~1.3 GB | 1,487 files |
| `.git` history | 465 MB | History already carries the big files |
| `books/database-book/platform-pilots/` | 687 MB | See breakdown below |
| ├─ `book-build/prototype/` | 234 MB | **Exact byte-for-byte duplicate** of `prototype/` (verified with `diff -rq` — zero differences) |
| ├─ `prototype/assets/book-content/.images/` | 227 MB | Unoptimized pilot images (PNGs up to 8 MB each) + one 3 MB .m4a |
| ├─ `reader-hybrid-v1.1/` | 6.3 MB | **The production app** — deployed to data-pilot.dimapublishing.com per root `vercel.json` |
| └─ 7 other pilot folders | ~9 MB | ai-studio, chat-gpt, claude, cursor-online-reader, google-ai-studio, reader-hybrid, reader-hybrid-alt |
| `books/database-book/files/source/` | 91 MB | Canonical chapter/lab/appendix source (240 .md files) — **crown jewels** |
| `.images/` (repo root) | 16 MB | Chapter images, separate from pilot images |
| `.agents/` | 1.7 MB | ~50 skills + reference/prompts/archive — well organized, working system |

### What's healthy (leave alone)
- `books/database-book/files/source/` — clean chapter structure matching the six-file contract
- `.agents/` — the AI workflow hub; internally organized with its own archive
- `reader-hybrid-v1.1/` internals — has README, BUILD-PIPELINE.md, validation scripts
- `.github/workflows/`, `book.yml`, `files/manifests/`

### What's messy
1. **~470 MB of pure duplication** (`book-build/prototype` = copy of `prototype`)
2. **Production app buried under "pilots"** — misleading name, fragile 4-level-deep `vercel.json` paths
3. **Plans sprawl across 4+ locations** with same-named but *different-content* files:
   - `books/database-book/PLAN.md` (self-labeled "superseded")
   - `plans/outline/`, `plans/book-edit/`, `plans/book-edit/_imported-docs/outline/`
   - `files/source/outline/` (most complete — has the newest, 2026-06-16)
   - Verified: `outline-2026-06-05.md` and `outline-2026-06-12.md` have **different md5s in different locations** → merge requires review, not blind dedupe
4. **Root-level clutter:**
   - `ch01-cover-base64.txt` (2.3 MB of base64 sitting next to the actual `ch01-cover.png`)
   - `bitm330-lab01-grader-codex.py` + committed `__pycache__/`
   - `BITM330-book-drive.lnk` (Windows shortcut — meaningless in a repo, appears in 2 places)
   - `Dima-publishing-site/` containing files literally named `https` and `g.co ge.txt`
   - Single-file dirs: `corporation/`, `data/`, `_static/`
5. **`scripts/` mixes keepers with one-offs** — 9 of 13 are `temp-fix-*` / `temp-sync-*`
6. **`.gitignore` bug:** the later bare `.env*` line cancels the earlier `!.env.example` exception; also missing `__pycache__/`, `*.pyc`, `dist/`

---

## 2. Proposed Target Structure

```
dima-publishing/
├── README.md                     ← expanded: what this repo is, map of contents
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
│       ├── plans/                ← ONE consolidated home
│       │   ├── ACTIVE.md         ← current plan (post outline-7-7-26 direction)
│       │   └── archive/          ← every dated/superseded plan, nothing deleted
│       ├── workflow/             ← .edits, .reports, chats, Brightspace, review-index.html
│       └── scripts/
│
├── assets/
│   ├── covers/                   ← ch01-cover.png etc.
│   └── images/                   ← was root .images/
│
├── scripts/                      ← build-chapter-html.ps1, build-chapter-pdf.ps1,
│                                    build-review-index.ps1, compile-appendix-a.py, convert.ps1
│
├── tools/
│   └── grading/                  ← bitm330-lab01-grader-codex.py (or → course repo, see §5)
│
└── archive/                      ← OR a separate dima-publishing-archive repo (see §5)
    ├── pilots/                   ← the 7 retired pilot folders + evaluation.md + pilots.json
    ├── prototype/                ← ONE copy of prototype (dedup'd), images optimized or LFS'd
    └── misc/                     ← corporation/, data/, _static/, Dima-publishing-site remnants
```

Naming logic: `apps/` = deployed software, `books/*/source/` = content truth in the repo, `archive/` = history preserved but out of the way. Hidden dirs (`.edits`, `.reports`) become visible under `workflow/` so they stop getting missed in searches.

---

## 3. Phased Plan (ordered by risk)

### Phase 1 — Zero-risk cleanup (~240 MB reclaimed, no behavior change)
*Nothing here touches content that exists nowhere else.*

1. Delete `books/database-book/platform-pilots/book-build/prototype/` (exact duplicate — re-verify with `diff -rq` immediately before deleting)
2. Delete `__pycache__/` and `ch01-cover-base64.txt` (the PNG stays)
3. Delete `Dima-publishing-site/` junk files (`https`, `g.co ge.txt`) — confirm first they're not placeholders you care about
4. Remove `.lnk` files (both locations)
5. Fix `.gitignore`:
   ```gitignore
   # replace the stray `.env*` line; add:
   __pycache__/
   *.pyc
   **/dist/
   *.lnk
   ```
6. Delete `gen-log.txt` if it's a stale generation log (confirm)

### Phase 2 — Promote the production app (low risk, but verify deployment)
*Order matters: app first, pilots second. Do this in a branch.*

1. `git mv books/database-book/platform-pilots/reader-hybrid-v1.1 apps/reader`
2. Update root `vercel.json` (3 path references) and any GitHub Actions workflows referencing the old path
3. Grep the app + `.agents/skills/` (especially `book-deploy`, `chapter-publish`, `chapter-sync`) for hardcoded `platform-pilots/reader-hybrid-v1.1` paths
4. Deploy preview on Vercel → verify data-pilot.dimapublishing.com equivalent works → merge
5. **Only after the app is confirmed live from its new home:** move the 7 retired pilots + `evaluation.md`, `pilots.json`, `notes-06-05.md` to `archive/pilots/`
6. Decide the fate of the GitHub Pages pilot-gallery workflow (still wanted? → update paths; retired? → archive the workflow file too)

### Phase 3 — Consolidate plans (requires your review — content differs)
1. Inventory all plan/outline files across the 4 locations with dates + md5s (I can generate this table)
2. **Canonical rule proposal:** the outline that feeds the build lives in `books/database-book/source/outline/` (it already has the newest files and the pipeline reads from source). Everything in `plans/outline/` and `_imported-docs/outline/` becomes archive.
3. For same-named-different-content pairs (e.g., the two `outline-2026-06-05.md`): side-by-side diff review together → keep the canonical one, archive the other with a suffix (`outline-2026-06-05-plans-copy.md`) so nothing vanishes
4. Create `plans/ACTIVE.md` reflecting the current 16-chapter direction (outline-7-7-26 from Drive, once imported), superseding `PLAN.md`; move `PLAN.md` → `plans/archive/`
5. Move `plans/book-edit/_imported-docs/` wholesale into `plans/archive/imported-docs/` — it's historical by definition
6. `scripts/` triage: keep the 4 real build scripts; move `temp-*` to `archive/scripts/` (or delete after you confirm they're one-shots that already ran)

### Phase 4 — Repo weight (separate decision, do LAST)
Even after Phases 1–3, clones stay ~465 MB because git history retains every blob. Options:

| Option | Effect | Risk / cost |
|---|---|---|
| **A. Do nothing** | Clones stay heavy but everything works | Zero risk. Fine if you rarely re-clone |
| **B. `git filter-repo`** to purge `book-build/`, `prototype/assets/`, base64 file from history | Clone likely drops to well under 100 MB | Rewrites history → force-push, any local clones must be re-cloned. Take a full zip backup first |
| **C. Fresh-start repo** (new repo from cleaned tree, old repo archived as-is on GitHub) | Cleanest result; old repo remains a perfect frozen backup | Loses commit history in the new repo (old one keeps it); links to old commits break |
| **D. Git LFS** for remaining large images going forward | Prevents future bloat | Doesn't fix existing history; GitHub LFS quotas apply |

My lean: **A now, revisit B after the semester** — with a full backup zip and the old state preserved. B+D together is the "proper" long-term answer, but it's the only step in this whole plan with real risk, so it shouldn't be bundled with the reorganization.

---

## 4. Do-Not-Touch List (protected throughout)
- `books/database-book/files/source/` — moved/renamed only via `git mv`, contents never edited
- `.agents/` — no changes
- `apps/reader` (reader-hybrid-v1.1) internals — only its location changes
- `book.yml`, `files/manifests/`, `.github/` history
- Anything on Google Drive

## 5. Open Questions for Nim
1. **Archive location:** in-repo `archive/` folder, or a separate `dima-publishing-archive` repo? (Separate repo keeps this one lean; in-repo keeps everything in one clone. I lean separate repo *if* Phase 4B/C happens, in-repo otherwise.)
2. **Grader script:** does `bitm330-lab01-grader-codex.py` belong here, or in a BITM330 course repo? It's course tooling, not publishing.
3. **Pilot images (227 MB):** the originals presumably live on Drive. OK to keep only the optimized versions in the archived prototype and drop the 5–8 MB originals from the working tree?
4. **GitHub Pages pilot gallery:** still a thing you want live, or retire it?
5. **`corporation/` and `data/`:** one file each — keep, or fold into `archive/misc/`?

## 6. Execution Safety Protocol (when approved)
- Everything happens on a branch (`reorg/phase-1`, etc.), merged via PR so GitHub shows every rename
- All moves via `git mv` (history-preserving), never delete-and-recreate
- Full repo zip backup before Phase 1 and again before Phase 4
- After each phase: `npm run build` in the reader app + Vercel preview check before merging
- One phase per PR — easy to stop, easy to revert
