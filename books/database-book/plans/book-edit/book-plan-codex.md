# Database Book Development Plan (Canonical)

Date: 2026-06-10  
Project: `books/database-book/`  
Repository: `C:\Users\nd115232\Documents\GitHub\dima-publishing`

## Supersedes

This is the canonical development plan for the database textbook. It supersedes all
prior plan files in `books/database-book/plans/book-edit/`, which are retained for
history:

- `README.md` (consolidated overview — current-state table is stale)
- `01-v1.1-reader-completion.md` (Phase 1 reference spec; mostly implemented)
- `02-source-migration.md` (Phase 2 detail; 3 conflicts fixed below)
- `03-v2a-paid-platform.md` (deferred)
- `04-v2b-learning-features.md` (deferred)
- `05-architecture-reference.md` (appendix — still accurate)
- `06-locked-decisions.md` (authoritative for settled choices)
- `canonical-book-edit-source-workflow-2026-06-10.md` (best migration detail; 3 conflicts fixed below)

When instructions conflict, follow this document first, then `06-locked-decisions.md`.

---

## Verdict

**v1.1 is mostly done.** The reader has motion, the two-column hero, OTP scroll
highlighting, reader width cleanup, favicon wiring, and page transitions. What
remains is verification and small cleanup, not a redesign sprint.

**Source migration is the critical path.** Only ch01-ch04 exist in the repo, using
dated filenames and `.sync-manifest.json` artifacts from the old one-way sync.
Chapters 5-17 are not in the repo at all. No `book.yml`, `chapter-registry.yml`,
or `files/manifests/` exist yet.

**Paid-platform work must wait.** v2A (Next.js / Supabase / Stripe) and v2B
(progress, notes, search) depend on stable source files and a validated full-book
reader. Starting before migration would build on shifting ground.

---

## Locked Decisions

Imported from `06-locked-decisions.md` with conflict fixes applied.

### Source of truth

| Topic | Decision |
|---|---|
| Canonical source | Git repository (`dima-publishing`) after migration |
| Drive role after migration | Historical draft archive + original image library |
| Editing location | Git repo only; no parallel editing on Drive |
| Sync direction | One-way Drive to Git (one-time import only) |
| `chapter-sync` skill | Deprecated after migration baseline commit |

### Filenames

| Topic | Decision |
|---|---|
| Stable chapter files | `index.md`, `core-concepts.md`, `lets-build.md`, `review-questions.md`, `terms-treasury.md`, `rat.md` |
| Reader area label | "Core Concepts" (never "Main Concepts") |
| `index.md` role | **Keep** as Introduction source; both generators depend on it |

### Manifests

| Topic | Decision |
|---|---|
| Import provenance | Single `source-import-manifest.csv` in `files/manifests/` |
| Build provenance | Committed `build-manifest.json` in `files/manifests/` |
| `.generation-manifest.json` | Local reader cache, gitignored |
| Image mapping | `image-manifest.csv` in `files/manifests/` (optional, future) |
| Per-chapter manifests | Not used; one central CSV only |

### CSV content_id

Use stable chapter slugs (`sql`, `normalization`, `database-design`), not chapter
numbers (`ch05`). Numbers can change; slugs are durable.

### Commit convention

Simple prefix: `ch03: revise DIKW framework explanation`

Cross-cutting scopes: `build:`, `outline:`, `images-ch06:`, `migration:`,
`rat-ch04:`, `lab-05:`

### Change documentation

| Level | Purpose | Location |
|---|---|---|
| Git commits | Every line change | Git history |
| Pull requests | Rationale for major changes | GitHub PRs |
| `CHANGELOG.md` | Publication milestones only | `books/database-book/CHANGELOG.md` |
| Import manifest | Which Drive file seeded each repo file | `files/manifests/source-import-manifest.csv` |
| Build manifest | Which commit produced each output | `files/manifests/build-manifest.json` |

### Image strategy

| Topic | Decision |
|---|---|
| Original images | Stay on Google Drive (`.images/`) |
| Cloudinary folders | Use stable slugs (`database-design/`), not numbers (`ch09/`) |
| Short-term references | Direct Cloudinary URLs in Markdown |
| Long-term references | Stable asset tokens resolved by build script |
| Media workflow | Separate plan: `plans/image-organizing/media-plan-codex.md` |

### Technical stack

| Topic | Decision |
|---|---|
| v1.1 framework | React 18 + Vite 5 (no upgrade) |
| v1.1 animation | `motion` package only (`motion/react`) |
| v1.1 CSS | Plain CSS, no Tailwind |
| v1.1 AI Assistant | Not included |
| v2A framework | Next.js (App Router) |
| v2A auth | Supabase Auth (email, not institutional SSO) |
| v2A payment | Stripe Checkout + verified webhooks |

---

## Conflict Resolutions

Three inconsistencies in the existing plan set, now settled:

| Topic | Wrong in existing docs | Canonical rule |
|---|---|---|
| `index.md` | `02-source-migration.md` Step 2.9 says remove hub files | **Keep** `index.md` as Introduction source; generator depends on it |
| Outline path | Canonical workflow uses `outlines/master-outline.md`; 02 uses `outline/book-outline.md` | **Singular** `files/source/outline/` with `book-outline.md` + `chapter-taglines.md` |
| Manifest `content_id` | Canonical CSV example uses `ch05` | **Stable slug** (`sql`, `normalization`) per `06-locked-decisions.md`; `ch05` is display order only |

---

## Development Sequence

### Phase 0 — Reconcile docs (immediate, small)

- Write this `book-plan-codex.md` (done)
- Patch `README.md` current-state table to match repo reality

### Phase 1 — Close v1.1 (verification, 1 session)

Run in `books/database-book/platform-pilots/reader-hybrid-v1.1/`:

```bash
npm install && npm run generate && npm run lint && npm run build
```

Verify:

- Two-column desktop hero with animated cover
- Cover motion respects reduced-motion
- Reader width (no 780px cap; article ~900px, right rail on wide screens)
- OTP scroll highlighting via IntersectionObserver
- Mobile "On this page" block
- Favicon binary files in `public/` (favicon.ico, apple-touch-icon.png, icon-192x192.png, icon-512x512.png)
- `site.webmanifest` present and referenced in `index.html`
- No AI Assistant route exposed (quarantine `AiAssistant.tsx` if confirmed dead)

When green, tag `reader-v1.1-stable`. Do **not** expand to 17 chapters in v1.1; that
belongs with migration validation.

### Phase 2 — Source infrastructure (before copying files)

Create the scaffolding that migration depends on:

```
books/database-book/
  book.yml
  files/
    source/
      outline/
        book-outline.md
        chapter-taglines.md
        chapter-registry.yml
    manifests/
```

`book.yml`: book metadata, chapter order, component list, output paths. Single source
for all readers and build tools.

`chapter-registry.yml`: resolves the chapter-number mismatches between draft folders
and image folders. Fields per chapter: `id`, `order`, `title`, `source_folder`,
`legacy_image_folder`, `cloudinary_folder`.

#### Chapter registry

| Chapter ID | Order | Draft folder | Image folder |
|---|---|---|---|
| `introduction-to-course` | 1 | `ch01-introduction-to-course` | `ch01-welcome-to-the-textbook` |
| `mis-and-bitm` | 2 | `ch02-mis-and-bitm` | `ch02-mis-bitm` |
| `what-is-data` | 3 | `ch03-what-is-data` | `ch03-what-is-data` |
| `databases` | 4 | `ch04-databases` | `ch04-databases` |
| `sql` | 5 | `ch05-sql` | `ch05-sql` |
| `relational-model` | 6 | `ch06-relational-model` | `ch06-relational-model` |
| `normalization` | 7 | `ch07-normalization` | `ch07-normalization` |
| `midterm-review` | 8 | `ch08-midterm-review` | `ch09-midterm-review` |
| `database-design` | 9 | `ch09-database-design` | `ch10-database-design` |
| `advanced-sql-queries` | 10 | `ch10-advanced-sql-queries` | `ch08-advanced-sql-queries` |
| `database-administration` | 11 | `ch11-database-administration` | `ch11-database-administration` |
| `business-intelligence` | 12 | `ch12-business-intelligence` | `ch12-business-intelligence` |
| `advanced-database-techniques` | 13 | `ch13-advanced-database-techniques` | `ch13-advanced-database-techniques` |
| `power-bi` | 14 | `ch14-powerbi` | *(none)* |
| `business-strategy-and-is` | 15 | `ch15-business-strategy-is` | `ch14-business-strategy-and-is` |
| `final-review` | 16 | `ch16-final-review` | `ch15-final-review` |
| `conclusion` | 17 | `ch17-conclusion` | `ch16-conclusion-from-data-to-wisdom` |

### Phase 3 — Dry-run import

New script (not `chapter-sync`):

```bash
.\scripts\import-latest-drafts.ps1 -DryRun
```

Behavior:

- Select latest canonical dated Drive file per section by filename date
- Match pattern `chNN-<section>-YYYY-MM-DD.md` exactly
- Exclude files with `edit`, `rewrite`, `draft`, `outline`, `concept`, `notes`, `scratch`, `backup`, `archive`, `termtreasury` in the name
- Exclude undated bare filenames (`chNN-main.md`, `chNN-rat.md`)
- Exclude all lab answer files
- Stop on same-date conflicts (do not silently pick one)
- Report: selected files, missing sections, SHA-256 hashes, destinations, skipped rows
- **Write nothing** on dry-run

### Phase 4 — Execute migration (separate commit)

- Import all 17 chapters into stable filenames:
  `index.md`, `core-concepts.md`, `lets-build.md`, `review-questions.md`,
  `terms-treasury.md`, `rat.md`
- Import 15 student-facing lab question files to `files/source/labs/lab-NN-slug/index.md`
- Copy latest outline and tagline files to `files/source/outline/`
- Write `files/manifests/source-import-manifest.csv`
- Do **not** import images (handled by `plans/image-organizing/media-plan-codex.md`)
- Do **not** import lab answers (exposure risk)
- Flag raw `G:\` / `C:\` paths and broken image refs; hand off to media workflow
- After stable files are verified:
  - Remove dated working copies (`ch01-main-2026-06-03.md`, etc.) from active source folders
  - Remove `.sync-manifest.json` files
- Commit baseline separately from later editorial edits:

```bash
git commit -m "migration: import latest canonical database book sources"
git tag -a database-book-source-baseline -m "Initial source migration from BITM330 Google Drive drafts"
```

### Phase 5 — Validate readers and builds

- **Primary validator:** `cursor-online-reader` (auto-discovers all `chNN` folders)
- **Reference prototype:** v1.1 stays at ch01-04 unless useful to wire to `book.yml`
- Fix lab incremental-hash bug (uses `SOURCE_LABS` instead of `SOURCE_CHAPTERS` for
  chapter-fallback hash; see `05-architecture-reference.md`)
- Add source validation checks:
  - Empty files
  - Answer file leakage
  - Raw Windows paths without flags
  - Missing sections
  - Malformed Markdown
  - Broken image references
- Record formal builds in `files/manifests/build-manifest.json`

### Phase 6 — Deferred

| Track | Gate |
|---|---|
| v2A paid platform (Next.js / Supabase / Stripe) | Source migration + full-book render stable |
| v2B learning features (progress, notes, search) | v2A exit criteria met |
| Media inventory and migration | Parallel; does not block text import (`media-plan-codex.md`) |
| `sync-media-inventory.py`, recommendation scoring | After media Phase 2 inventory trusted |
| Asset tokens in Markdown | Long-term; short-term Cloudinary URLs are fine |

---

## Target Repository Layout

```
books/database-book/
  book.yml
  CHANGELOG.md
  files/
    source/
      chapters/
        ch01-introduction-to-course/
          index.md
          core-concepts.md
          lets-build.md
          review-questions.md
          terms-treasury.md
          rat.md
        ch02-mis-and-bitm/
          ...
        ...ch17.../
      labs/
        lab-01-petvax-intro/
          index.md
        ...
      outline/
        book-outline.md
        chapter-taglines.md
        chapter-registry.yml
    manifests/
      source-import-manifest.csv
      build-manifest.json
      image-manifest.csv          (optional, future)
  platform-pilots/
    reader-hybrid-v1.1/           (current prototype, ch01-04)
    cursor-online-reader/         (full-book validator)
    reader-hybrid-v2/             (v2A, later)
  scripts/
    import-latest-drafts.ps1
  plans/
    book-edit/                    (this plan set)
    image-organizing/             (media-plan-codex.md)
```

## Filename Mapping from Drive

| Drive source | Repo destination |
|---|---|
| `main/chNN-main-YYYY-MM-DD.md` | `core-concepts.md` |
| `lets-build/chNN-lets-build-YYYY-MM-DD.md` | `lets-build.md` |
| `reflection/chNN-reflection-YYYY-MM-DD.md` | `review-questions.md` |
| `terms/chNN-terms-YYYY-MM-DD.md` | `terms-treasury.md` |
| `rat/chNN-rat-YYYY-MM-DD.md` | `rat.md` |
| `Labs-draft/lab-NN-.../lab-NN-questions-YYYY-MM-DD.md` | `labs/lab-NN-slug/index.md` |
| `.docs/outline/outline-YYYY-MM-DD.md` | `outline/book-outline.md` |
| `.docs/outline/outline-taglines-YYYY-MM-DD.md` | `outline/chapter-taglines.md` |

Lab answers (`lab-NN-answers-YYYY-MM-DD.md`): **never** copied into the repository.

---

## Manifest Schemas

### `source-import-manifest.csv`

One-time record of which Drive file seeded each stable repo file.

```csv
content_id,component,source_path,source_filename,source_date,source_sha256,destination_path,imported_at,status,notes
```

`content_id` uses stable slugs: `sql`, `normalization`, `databases`, `lab-05`,
`outline`, `taglines`.

`status` values: `imported`, `missing-source`, `skipped-noncanonical`,
`skipped-answer-file`, `manual-review`.

### `build-manifest.json`

Records which Git revision produced the most recent formal output.

```json
{
  "book_id": "database-book",
  "version": "0.1.0",
  "git_commit": "<sha>",
  "generated_at": "<ISO 8601>",
  "source_validation": "passed",
  "outputs": ["reader", "docx", "epub", "pdf"],
  "warnings": []
}
```

---

## Validation Checklist

Before declaring migration complete:

- [ ] Dry-run report lists every selected chapter section file
- [ ] Latest canonical dated file selected for each available source section
- [ ] Non-canonical files skipped
- [ ] Lab answer files not copied
- [ ] Every imported file has a row in `source-import-manifest.csv`
- [ ] CSV hash values match imported content
- [ ] `files/source/chapters` uses stable filenames
- [ ] `files/source/labs` contains student-facing `index.md` files only
- [ ] `files/source/outline/book-outline.md` from latest outline file
- [ ] `files/source/outline/chapter-taglines.md` from latest tagline file
- [ ] No `*-answers-*` files under `books/database-book/files/source`
- [ ] Stale dated files removed from active source folders after verification
- [ ] `.sync-manifest.json` files removed
- [ ] `cursor-online-reader` validates stable files for all chapters
- [ ] `reader-hybrid-v1.1` validates ch01-04 path
- [ ] No raw `G:\` or `C:\` paths in imported Markdown (or flagged)
- [ ] Formal builds update `files/manifests/build-manifest.json`
- [ ] Baseline import commit is separate from later editorial commits

---

## Post-Migration Policy

1. All chapter editing occurs in the Git repository only.
2. Drive copies are historical inputs, not parallel working copies.
3. `chapter-sync` skill is deprecated.
4. Agent instructions reference stable filenames.
5. If a newer Drive draft appears, treat it as an external source to compare and
   merge manually, not as an automatic replacement.

---

## Appendix Files

These superseded plans are retained for reference detail:

| File | Use for |
|---|---|
| `01-v1.1-reader-completion.md` | Detailed v1.1 spec, design tokens, acceptance criteria |
| `03-v2a-paid-platform.md` | v2A architecture, auth flow, Stripe integration detail |
| `04-v2b-learning-features.md` | v2B schema design, progress/notes/labs/search detail |
| `05-architecture-reference.md` | Content model, generator pipeline, fallback patterns, known bugs |
| `06-locked-decisions.md` | Complete settled-decisions reference |
| `canonical-book-edit-source-workflow-2026-06-10.md` | Detailed migration implementation steps |
