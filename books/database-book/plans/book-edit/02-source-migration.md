# Phase 2: Source Migration — Drive → Git

**Objective:** Make the Git repository the single source of truth for all chapter text.
**Post-migration:** Google Drive becomes the historical archive and image library.

---

## Locked Decisions

| Decision | Value |
|---|---|
| Canonical filenames | `index.md`, `core-concepts.md`, `lets-build.md`, `review-questions.md`, `terms-treasury.md`, `rat.md` |
| Import provenance | One central `source-import-manifest.csv` (not per-chapter JSON) |
| Build provenance | `build-manifest.json` in `files/manifests/` |
| Commit style | `ch03: description` (simple prefix) |
| chapter-sync skill | Deprecated after migration |
| `.generation-manifest.json` | Local cache, gitignored — separate from `build-manifest.json` |
| CSV content_id | Uses stable chapter ID (e.g. `sql`) not number (e.g. `ch05`) |

---

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

**Lab answers:** NEVER copied into the repository.

---

## Steps

### Step 2.1 — Create migration branch

```bash
git switch main
git pull
git switch -c migrate/database-book-source
```

### Step 2.2 — Create chapter-registry.yml

Resolve the chapter-number mismatches between draft folders and image folders.

**Fields per chapter:** `id`, `order`, `title`, `source_folder`, `legacy_image_folder`, `cloudinary_folder`

#### Critical mappings

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

### Step 2.3 — Create book.yml

Book metadata, chapter order, component list, output paths. Single source for all readers and build tools.

### Step 2.4 — Copy latest outline

- **From:** `.docs/outline/outline-2026-06-05.md` (latest)
- **To:** `files/source/outline/book-outline.md`

### Step 2.5 — Write migration script with dry-run

```bash
.\scripts\import-latest-drafts.ps1 -DryRun
```

The script should produce a preview report showing:
- Selected file for every chapter/component
- Missing components
- Filename-date conflicts
- Duplicate hashes
- Source and destination paths
- Files that were ignored

**File selection logic:**
1. Scan the section subfolder (`main/`, `lets-build/`, etc.)
2. Match pattern `chNN-section-YYYY-MM-DD.md`
3. Exclude files with `edit`, `rewrite`, `draft`, `outline`, `concept`, `notes`, `scratch`, `backup`, `archive`, `termtreasury` in the name
4. Pick highest date
5. Hash-compare on same-date conflicts
6. Record selected source and SHA-256 hash

### Step 2.6 — Review exceptional cases

- Same-date conflicts
- Files with `edited`, `rewritten`, `final`, or `production` in name
- Missing components
- Chapter/image number mismatches
- Chapter 14 Power BI (no image folder)
- Older chapter names that no longer match the outline

### Step 2.7 — Execute import

```bash
.\scripts\import-latest-drafts.ps1
```

- Never silently overwrite existing files
- Generate `source-import-manifest.csv`:

```
chapter_id,component,source_path,source_filename,source_date,source_sha256,destination_path,imported_at,status,notes
```

- `chapter_id` uses stable ID (e.g. `sql`) not number

### Step 2.8 — Validate

- All 17 chapters have expected files
- No empty files
- No absolute `G:\` or `C:\` paths in Markdown
- No references to legacy `.images` paths
- No duplicate headings
- No malformed Markdown
- No missing outline entries

### Step 2.9 — Clean up ch01–ch04

- Remove dated files (`ch01-main-2026-06-03.md`, etc.)
- Remove/archive `.sync-manifest.json` files
- Remove `index.md` hub files (readers use `book.yml`)
- Update generators for stable filenames

### Step 2.10 — Update readers

- **cursor-online-reader:** auto-discovers all `ch\d+` folders — should work with stable files
- **reader-hybrid-v1.1:** expand `CHAPTERS` array to all 17 (or replace with `book.yml` lookup)

### Step 2.11 — Clean up orphans

- Delete `book-src/` (empty, superseded)
- Delete or archive `PLAN.md` (marked superseded)
- Move `plans/` historical files to archive or delete (in Git history)

### Step 2.12 — Commit baseline

```bash
git add books/database-book
git commit -m "migration: import latest canonical database book sources"
git tag -a database-book-source-baseline -m "Initial source migration from BITM330 Google Drive drafts"
git push -u origin migrate/database-book-source
git push origin database-book-source-baseline
```

Merge to `main` after review.

---

## Manifests Structure

```
files/manifests/
├── source-import-manifest.csv    # one-time migration provenance
├── image-manifest.csv            # Cloudinary mapping
└── build-manifest.json           # which commit produced which output
```

---

## Post-Migration Policy

1. All chapter editing occurs in the Git repository only.
2. Drive copies are historical inputs, not parallel working copies.
3. One-way flow: Drive → Git (one-time) → reader → deploy.
4. `chapter-sync` skill is deprecated.
5. Agent instructions updated to reference stable filenames.

---

## Change Documentation (4 levels)

| Record | What it documents | Location |
|---|---|---|
| Git commits | Every line added, deleted, or modified | Git history |
| Pull requests | Why a substantial change was made | GitHub PRs |
| `CHANGELOG.md` | Major publication-level changes | `books/database-book/CHANGELOG.md` |
| Import manifest | Which Drive draft originally created each stable file | `files/manifests/source-import-manifest.csv` |

### Commit convention

```
ch03: revise DIKW framework explanation
ch05: add SQL filtering examples
rat-ch04: align questions with learning objectives
lab-05: revise PetVax SQL exercise
outline: reorder advanced SQL and database design
images-ch06: update ERD references
build: add source validation
migration: import canonical chapter sources
```
