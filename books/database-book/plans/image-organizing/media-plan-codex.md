# BITM330 Media Organization Plan (Canonical)

Date: 2026-06-10  
Image root: `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images`  
Source chapters: `books/database-book/files/source/chapters/`  
Primary skill: `.agents/skills/chapter-media-inventory/SKILL.md`

## Supersedes

This plan is the canonical media-inventory and organization workflow. It supersedes:

- `media-inventory-plan-2026-06-10.md` (phased draft — retained for history)
- `media-management-plan.md` (single-pass prompt — retained for history)

Do not delete either file. When instructions conflict, follow this document.

This plan is split into three approval-gated phases. Each phase must be reviewed before the next begins.

---

## Pre-Read

Before starting, read:

- `AGENTS.md`
- `.agents/README.md`
- `.agents/skills/chapter-media-inventory/SKILL.md`
- `.images/book-media.md` and `.images/book-media-format.md`
- `.images/master-image-index.csv`
- `.images/_RENAMES.md`

`book-media.md` and `master-image-index.csv` are existing ledgers. Read them as inputs and cross-check against live chapter Markdown. Do not treat them as the sole source of "used" status — they may be stale.

---

## Skill Override (this audit only)

The `chapter-media-inventory` skill normally excludes files inside:

- `chNN-used/`
- `optimized/`
- `from-chapter/`
- any `*-used/` subfolder

**For this audit, override those exclusions.** Walk every subfolder under `.images`, including legacy `used/`, `unused/`, `recommend-delete/`, and dated variants. The skill file itself is not edited; this plan explicitly overrides its scan scope for the full-library audit.

For routine per-chapter inventory after migration, the skill's default exclusions remain in effect.

---

## Repository Realities (must be respected)

1. **Chapter folders are NOT number-aligned.** `.images` follows an older outline. Confirmed mismatches vs. source chapters:

   | `.images/` folder | Source chapter | Aligned? |
   |---|---|---|
   | `ch08-advanced-sql-queries` | `ch08-midterm-review` | No |
   | `ch09-midterm-review` | `ch09-database-design` | No |
   | `ch10-database-design` | `ch10-advanced-sql-queries` | No |
   | `ch14-business-strategy-and-is` | `ch14-powerbi` | No |
   | `ch15-final-review` | `ch15-business-strategy-is` | No |
   | `ch16-conclusion-from-data-to-wisdom` | `ch16-final-review` | No |

   An approved `chapter-map.json` must exist before any cross-referencing (written in Phase 2 only).

2. **Markdown discovery follows `index.md`.** Each source chapter has an `index.md` that links DATED files (e.g. `ch02-main-2026-06-06.md`, `ch02-lets-build-2026-06-03.md`). Do NOT assume fixed filenames such as `core-concepts.md` or `lets-build.md`. Parse `index.md`, then scan each linked student-facing file. Also scan `lab/index.md` and any additional student-facing files listed in `chapter.yml` when present.

3. **`.images` is a media library, not image-only.** It contains `.pptx`, `.vtt`, `.csv`, `.txt`, `.zip`, `.epub`, `.mp4`, `.m4a`, `.mp3`, `.svg`, `.b64`, and extension-less files. Inventory everything. Set `type` accordingly (see schema below). Exclude `non-image` and `slide-export` from default gallery views.

4. **Mixed folder conventions exist.** `ch01-used/`, `used/`, `used-2026-06-05/`, `unused/`, `recommend-delete/`, `from-chapter/`, `optimized/`, `extracted-slides/`, etc. Inventory all subfolders; never flatten before the inventory exists.

5. **ch05 bulk exports.** 100+ `ch05-combined-slide-NNN.png` and other slide exports inflate counts. Set `type: slide-export` so they do not distort figure counts.

6. **Root-level loose files.** As of 2026-06-10 the `.images` root contains 15 image files (9 `.png`, 4 `.jpg`, 1 `.webp`, 1 `.gif`) plus ledger files. Relocate only after the audit identifies each file's correct chapter.

7. **Existing schema must be preserved.** `master-image-index.csv` columns to carry forward or map: `license`, `reusable`, `decorative`, `ai_model`, `source_type`, `priority`, `production_file`, `keywords`, `replaces`.

8. **Top-level non-chapter folders.** Also inventory `.videos/`, `.audio/`, `archive/`, and `vsc/` as part of the library walk. Tag contents with appropriate `type` and `chapter_id` when no chapter applies.

---

## Preservation Rules (all phases)

Do not, without explicit approval:

- delete, overwrite, rename, or move any original;
- move anything into `archive/`;
- upload to Cloudinary or alter Cloudinary URLs;
- rewrite chapter Markdown, captions, or figure numbers;
- copy full-resolution originals into recommendation or thumbnail folders.

Source of truth = the original files in `.images` and the chapter Markdown in the repo. Inventory outputs are generated artifacts, not the source of truth.

**Long-term folder policy:** usage is metadata, not a physical folder state. Do not create new `used/` or `unused/` folders. The target per-chapter layout is originals at chapter root, plus `optimized/` and optional `archive/`.

---

## Phase 1 — Audit Only (report-only, writes nothing)

Goal: understand the library and produce a proposed chapter map. **No generated files.**

Steps:

1. Walk every folder under `.images` (including all subfolders per Skill Override). Count files by `type` (image / non-image / slide-export) per folder.
2. For each source chapter, open `index.md` and collect the linked student-facing Markdown files. Exclude instructor-only files (`*answers*`, `solution-files/`).
3. Build a **proposed chapter map** as JSON-shaped preview in the report (inline in chat or optional Markdown preview). Map each `.images/chNN-*` folder to a source chapter by content, not number. Mark uncertain matches `needs-review`. **Do not write `chapter-map.json` to disk in this phase.**
4. Detect existing `used`/`unused`/`recommend-delete`/dated subfolders and list them.
5. Detect duplicates (SHA-256), zero-byte files, and obvious near-duplicates.
6. Cross-check `book-media.md` rows against files on disk: note missing originals, missing optimized derivatives, missing Cloudinary links.
7. Identify image references in Markdown that have no local original (broken links), especially links using old folder names from `_RENAMES.md`.
8. List loose root-level images and propose a target chapter for each (audit-derived count, not a hard-coded number).

Output: a console / chat report. Do NOT write files to `.images` or `_inventory/` in this phase. Stop and request review.

### Phase 1 report must include

- chapters scanned; total files by `type`
- proposed chapter map (JSON preview)
- used / unused counts (from Markdown cross-reference)
- duplicates; missing originals; missing optimized; missing Cloudinary
- folder naming inconsistencies; existing used/unused subfolders
- loose root-level images with proposed destinations
- unresolved mappings

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
└── chapters/
    ├── chNN-media.csv
    └── chNN-media.html
```

Optional convenience (not required for Phase 2 completion): `media-inventory.xlsx`.

### CSV schema

Extends `master-image-index.csv`:

```
asset_id, file_name, type, chapter_id, chapter_slug, figure_number, status,
usage_evidence, description, alt_text, caption,
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

### `type` (asset kind — not usage)

| Value | Meaning |
|---|---|
| `image` | Raster or vector figure asset (png, jpg, gif, webp, svg) |
| `non-image` | Other media (pptx, mp4, csv, txt, zip, etc.) |
| `slide-export` | Bulk slide export (e.g. ch05-combined-slide-NNN.png) |

### `status` (usage / lifecycle — not asset kind)

| Value | Meaning |
|---|---|
| `used` | Referenced in chapter or student-facing lab Markdown |
| `unused` | Exists locally but not referenced |
| `candidate` | Retained intentionally for possible future use |
| `archived` | Intentionally retired |
| `duplicate` | Checksum or explicit comparison indicates duplication |
| `missing-original` | Referenced but no local original found |
| `missing-optimized` | Used or uploaded but no optimized derivative found |
| `missing-cloudinary` | Local used image has no Cloudinary URL |
| `orphaned-cloudinary` | Cloudinary asset cannot be matched to chapter usage |

Do not use `non-image` or `slide-export` as status values.

### `usage_evidence` (how "used" was determined)

| Value | Meaning |
|---|---|
| `markdown` | Found in live chapter Markdown scan |
| `book-media` | Listed in `book-media.md` only (not in current Markdown) |
| `master-index` | Listed in `master-image-index.csv` only |
| `cloudinary` | Matched via Cloudinary URL in Markdown |
| `unresolved` | Could not determine usage |

When sources conflict, prefer `markdown` over ledger files. Flag rows where `usage_evidence` is `book-media` or `master-index` but Markdown shows no reference.

### Matching priority (no vague filename guessing)

```
1. Exact Cloudinary public ID (from live Markdown)
2. Exact Cloudinary URL (transforms normalized)
3. Live Markdown image reference (filename or relative path)
4. book-media.md ledger mapping
5. master-image-index.csv mapping
6. Exact filename on disk
7. Filename without extension
8. Figure number
9. SHA-256 checksum
10. Mark unresolved
```

Rules: SHA-256 checksums; never invent metadata; leave unknowns blank; preserve exact Cloudinary URLs; semicolon-separate multi-value fields; `reduction_percent = (orig - opt) / orig * 100`.

### Galleries

Standalone HTML, thumbnail grid, filter by chapter / status / type, text search where practical. Preview source priority: Cloudinary → optimized → original → placeholder. Default view excludes `type: non-image` and `type: slide-export`.

### Image references to detect

Extract from Markdown image syntax, HTML `<img>` tags, Cloudinary URLs, relative image links, local absolute paths, and figures in tables or callouts. Skip references inside fenced code blocks and HTML comments.

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
- relocate loose root-level images identified by the audit into `ch00-general/` or the correct chapter;
- group ch05 slide exports and `.pptx` under a clearly named non-figure subfolder;
- fix Markdown links broken by `_RENAMES.md` (listed as proposed edits, not executed here).

Output a proposed-operations table (source → destination → reason). Execute in small, reviewable batches only after approval. Re-run Phase 2 inventory after moves.

---

## Validation (after each writing phase)

1. Every local image appears in the master inventory.
2. Every used Markdown reference resolves to an asset or a flagged warning.
3. `type` and `status` are never conflated on the same row.
4. `usage_evidence` is set for every row with `status: used`.
5. Figure numbers unique within a chapter.
6. CSV/JSON parse; HTML galleries open; thumbnails render.
7. No original modified, deleted, or moved without approval.
8. Generated recommendation or thumbnail folders contain no full-resolution originals.

---

## Deferred (later pass — not Phase 2 or 3)

Borrowed from the superseded `media-management-plan.md`. Do not implement until the Phase 2 inventory is trusted and reviewed.

| Item | Notes |
|---|---|
| Recommendation scoring | Weighted score (filename, metadata, visual fit, gap, quality, redundancy); threshold 0.55 |
| `recommended/` galleries | Per-chapter `recommended/chNN/` with thumbnails, CSV, index.html |
| `status: recommended` | Only after scoring engine exists |
| `media-inventory.xlsx` | Workbook with All Media, Used, Unused, per-chapter sheets |
| `sync-media-inventory.py` | Reusable script at `books/database-book/scripts/sync-media-inventory.py` |
| `--check` stale detection | Git diff + checksums + previous inventory state |
| `--dry-run`, `--rebuild-thumbnails`, `--minimum-recommendation-score` | Script flags for incremental runs |
| Change detection triggers | Markdown edits, renames, new optimized derivatives, caption/figure changes |

Generate the first inventory with a single-purpose script or the skill workflow. Learn what is needed before automating.

---

## Out of Scope (this plan)

- Cloudinary uploads or URL rewrites
- Markdown content edits (except listing proposed link fixes in Phase 3)
- Editing `chapter-media-inventory/SKILL.md`
- Deleting or archiving superseded plan files

---

## Required Final Report (after Phase 2 or 3)

```
# BITM330 Media Inventory Report

## Scope
- Image root:
- Chapter source root:
- Chapters scanned:
- Scan date:

## Counts
- Total assets (by type: image / non-image / slide-export):
- Used / Unused / Candidate / Archived / Duplicate:
- Missing original / optimized / Cloudinary / Orphaned Cloudinary:

## Folder Issues
- Existing used/unused folders:
- Naming inconsistencies:
- Unmatched chapter folders:
- Loose root-level images:

## Proposed File Operations (Phase 3 only)
List all proposed moves, renames, or archive actions. Do not execute.

## Outputs Created
- chapter-map.json
- media-master.csv / .json / .html
- chapter CSV and HTML galleries

## Unresolved Items
List unresolved mappings and missing metadata.

## Preservation Confirmation
- Originals modified: 0
- Originals deleted: 0
- Originals moved: 0
- Markdown files modified: 0
- Cloudinary uploads performed: 0
```

Do not claim completion unless the dry-run audit has been reviewed, the master inventory exists, every chapter inventory exists, HTML galleries open correctly, and no originals were modified or moved without approval.
