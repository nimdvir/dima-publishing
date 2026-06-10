# BITM330 Media Inventory & Organization Plan

Date: 2026-06-10
Image root: `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images`
Source chapters: `books/database-book/files/source/chapters/`
Primary skill: `.agents/skills/chapter-media-inventory/SKILL.md`

This plan replaces the earlier single-pass inventory prompt. It is split into three
approval-gated phases. Each phase must be reviewed before the next begins.

---

## Pre-Read

Before starting, read:

- `AGENTS.md`
- `.agents/README.md`
- `.agents/skills/chapter-media-inventory/SKILL.md`
- `.images/book-media.md` and `.images/book-media-format.md`
- `.images/master-image-index.csv`
- `.images/_RENAMES.md`

`book-media.md` and `master-image-index.csv` are existing data and are the most
reliable source of "used" status. Read them as inputs; do not rediscover what they
already record.

---

## Repository Realities (must be respected)

1. **Chapter folders are NOT number-aligned.** `.images` follows an older outline.
   Confirmed mismatches vs. source chapters:

   | `.images/` folder | Source chapter | Aligned? |
   |---|---|---|
   | `ch08-advanced-sql-queries` | `ch08-midterm-review` | No |
   | `ch09-midterm-review` | `ch09-database-design` | No |
   | `ch10-database-design` | `ch10-advanced-sql-queries` | No |
   | `ch14-business-strategy-and-is` | `ch14-powerbi` | No |
   | `ch15-final-review` | `ch15-business-strategy-is` | No |
   | `ch16-conclusion-from-data-to-wisdom` | `ch16-final-review` | No |

   A reviewed `chapter-map.json` must exist before any cross-referencing.

2. **Markdown discovery follows `index.md`.** Each source chapter has an `index.md`
   that links DATED files (e.g. `ch02-main-2026-06-06.md`,
   `ch02-lets-build-2026-06-03.md`). Do NOT assume `core-concepts.md`,
   `lets-build.md`, etc. Parse `index.md`, then scan each linked student-facing file.

3. **`.images` is a media library, not image-only.** It contains `.pptx`, `.vtt`,
   `.csv`, `.txt`, `.zip`, `.epub`, `.mp4`, `.m4a`, `.mp3`, `.svg`, `.b64`, and
   extension-less files. Inventory everything; tag non-images as `type: non-image`;
   exclude them from galleries and recommendations.

4. **Mixed folder conventions exist.** `ch01-used/`, `used/`, `used-2026-06-05/`,
   `unused/`, `recommend-delete/`, `from-chapter/`, `optimized/`, `extracted-slides/`,
   etc. Inventory all subfolders; never flatten before the inventory exists.

5. **ch05 bulk exports.** 100+ `ch05-combined-slide-NNN.png` and other slide exports
   inflate counts. Tag these as `type: slide-export` so they don't distort figures.

6. **Existing schema must be preserved.** `master-image-index.csv` columns to carry
   forward or map: `license`, `reusable`, `decorative`, `ai_model`, `source_type`,
   `priority`, `production_file`, `keywords`, `replaces`.

---

## Preservation Rules (all phases)

Do not, without explicit approval:

- delete, overwrite, rename, or move any original;
- move anything into `archive/`;
- upload to Cloudinary or alter Cloudinary URLs;
- rewrite chapter Markdown, captions, or figure numbers;
- copy full-resolution originals into recommendation folders.

Source of truth = the original files in `.images` and the chapter Markdown in the repo.
Inventory outputs are generated artifacts, not the source of truth.

---

## Phase 1 — Audit Only (report-only, writes nothing)

Goal: understand the library and produce a proposed chapter map. No generated files.

Steps:

1. Walk every folder under `.images` (including all subfolders). Count files by type
   (image / non-image / slide-export) per folder.
2. For each source chapter, open `index.md` and collect the linked student-facing
   Markdown files. Exclude instructor-only files (`*answers*`, `solution-files/`).
3. Build a **proposed** `chapter-map.json` mapping each `.images/chNN-*` folder to a
   source chapter by content, not number. Mark uncertain matches `needs-review`.
4. Detect existing `used`/`unused`/`recommend-delete`/dated subfolders and list them.
5. Detect duplicates (SHA-256), zero-byte files, and obvious near-duplicates.
6. Cross-check `book-media.md` rows against files on disk: note missing originals,
   missing optimized derivatives, missing Cloudinary links.
7. Identify image references in Markdown that have no local original (broken links),
   especially links using old folder names from `_RENAMES.md`.

Output: a console / chat report (and an optional Markdown preview shown inline). Do
NOT write files to `.images` in this phase. Stop and request review.

Approval gate: user confirms the chapter map and audit before Phase 2.

---

## Phase 2 — Generate Inventory (writes generated outputs only)

Goal: produce the canonical inventory and review galleries. Originals untouched.

Create:

```
.images/_inventory/
├── chapter-map.json            (approved map from Phase 1)
├── media-master.csv            (canonical)
├── media-master.json
├── media-master.html           (master gallery)
├── media-inventory.xlsx        (optional convenience)
└── chapters/
    ├── chNN-media.csv
    └── chNN-media.html
```

CSV schema (extends `master-image-index.csv`):

```
asset_id, file_name, type, chapter_id, chapter_slug, figure_number, status,
description, alt_text, caption,
original_path, original_format, original_width_px, original_height_px,
original_size_bytes, original_size_display,
optimized_path, optimized_format, optimized_width_px, optimized_height_px,
optimized_size_bytes, optimized_size_display, reduction_percent,
cloudinary_public_id, cloudinary_url, cloudinary_transform,
used_in_files, placement_heading,
license, reusable, decorative, ai_model, source_type, priority,
production_file, keywords, replaces,
last_modified_at, last_scanned_at, checksum, notes
```

Status values: `used`, `unused`, `candidate`, `archived`, `duplicate`,
`missing-original`, `missing-optimized`, `missing-cloudinary`, `orphaned-cloudinary`,
`non-image`, `slide-export`.

Matching priority (no vague filename guessing):

```
1. Exact Cloudinary public ID
2. Exact Cloudinary URL (transforms normalized)
3. book-media.md ledger mapping
4. master-image-index.csv mapping
5. Exact filename
6. Filename without extension
7. Figure number
8. SHA-256 checksum
9. Mark unresolved
```

Rules: SHA-256 checksums; never invent metadata; leave unknowns blank; preserve exact
Cloudinary URLs; semicolon-separate multi-value fields; reduction_percent =
`(orig - opt) / orig * 100`.

Galleries: standalone HTML, thumbnail grid, filter by chapter/status/type, preview
source priority Cloudinary -> optimized -> original -> placeholder. Exclude
`non-image` and `slide-export` from default gallery view.

Defer to a later pass (not Phase 2): recommendation scoring, stale-check (`--check`),
and the reusable Python automation script. Generate the first inventory with a
single-purpose script or the skill workflow; learn what's needed before automating.

Approval gate: user confirms the inventory is accurate before Phase 3.

---

## Phase 3 — Migration Proposal (approval required for every move)

Goal: converge on one clean structure once the inventory is trusted.

Target per-chapter structure:

```
.images/chNN-name/
├── <originals>
├── optimized/
└── archive/        (optional)
```

Propose (do not execute without approval):

- merge `ch01-used/`, `used/`, `used-2026-06-05/` back into the chapter root;
- move `recommend-delete/` contents into `archive/`;
- relocate 13 loose root-level images into `ch00-general/` or the right chapter;
- group ch05 slide exports and `.pptx` under a clearly named non-figure subfolder;
- fix Markdown links broken by `_RENAMES.md`.

Output a proposed-operations table (source -> destination -> reason). Execute in
small, reviewable batches only after approval. Re-run Phase 2 inventory after moves.

---

## Validation (after each writing phase)

1. Every local image appears in the master inventory.
2. Every used Markdown reference resolves to an asset or a flagged warning.
3. Figure numbers unique within a chapter.
4. CSV/JSON parse; HTML galleries open; thumbnails render.
5. No original modified, deleted, or moved without approval.
6. Recommendation folders contain no full-resolution originals.

---

## Out of Scope (this plan)

- Cloudinary uploads or URL rewrites
- Markdown content edits
- Recommendation scoring engine (later pass)
- Reusable `sync-media-inventory.py` automation (later pass)
- XLSX is optional, CSV is canonical
