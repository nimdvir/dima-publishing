---
name: chapter-media-inventory
summary: Synchronize chapter image usage, media metadata, recommended visuals, CSV inventories, and HTML galleries from chapter Markdown and the centralized .images library.
---

# Chapter Media Inventory Skill

## Purpose

This skill keeps the centralized textbook media library synchronized with chapter content.

It scans the chapter Markdown files, detects which Cloudinary images are currently used, compares them with local originals and optimized derivatives in the centralized `.images` library, updates per-chapter and master CSV inventories, and regenerates visual HTML galleries.

It also identifies unused images that are semantically relevant to the chapter and places them in a generated **recommended media view** for review.

The skill never moves or deletes source images automatically.

---

# Canonical Media Model

## Original media library

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\
```

Recommended structure:

```text
.images/
├── ch01-welcome-to-the-textbook/
│   ├── figure-01.1-example.png
│   ├── dashboard-draft.png
│   ├── optimized/
│   │   └── figure-01.1-example.png
│   └── archive/
│       └── retired-example.png
├── ch02-mis-and-bitm/
└── _inventory/
    ├── media-master.csv
    ├── media-master.json
    ├── media-master.html
    ├── media-inventory.xlsx
    ├── chapters/
    │   ├── ch01-media.csv
    │   ├── ch01-media.html
    │   ├── ch02-media.csv
    │   └── ch02-media.html
    └── recommended/
        ├── ch01/
        │   ├── recommended.csv
        │   ├── index.html
        │   └── thumbnails/
        └── ch02/
```

## Chapter source

```text
books/database-book/files/source/chapters/<chapter-folder>/
```

The skill scans:

- `index.md`
- `core-concepts.md`
- `lets-build.md`
- `review-questions.md`
- `terms-treasury.md`
- `rat.md`
- `lab/index.md`
- any additional student-facing Markdown file explicitly listed in `chapter.yml`

The skill must not expose instructor-only files such as `lab/answers.md` in student-facing media outputs unless explicitly requested.

---

# What `archive/` Means

The `archive/` folder is optional.

It is only for assets that are intentionally retired, superseded, duplicated, or no longer considered active candidates.

Examples:

- an earlier version replaced by a newer figure;
- an outdated screenshot;
- a duplicate export;
- a rejected visual retained for historical reference;
- a figure removed from the book but preserved for provenance.

The skill must never move an image into `archive/` automatically.

Before archiving, ask:

```text
This image appears to be superseded or intentionally retired. Would you like me to move it to the chapter archive folder and mark its status as archived?
```

If approval is not given, leave the file in place and use status `unused` or `candidate` instead.

---

# Status Vocabulary

Use exactly these status values unless the user approves an extension:

| Status | Meaning |
|---|---|
| `used` | Referenced in chapter or lab Markdown |
| `unused` | Exists locally but is not referenced |
| `candidate` | Intentionally retained for possible use |
| `recommended` | Unused but semantically relevant to current chapter content |
| `archived` | Intentionally retired or superseded |
| `missing-original` | Referenced in Markdown or Cloudinary but no local original is found |
| `missing-optimized` | Used or uploaded but no optimized local derivative is found |
| `missing-cloudinary` | Used or optimized locally but no Cloudinary delivery URL is found |
| `orphaned-cloudinary` | Cloudinary asset exists but no chapter reference can be matched |
| `duplicate` | Appears to duplicate another asset based on checksum or explicit mapping |

Status is metadata. Do not physically move files between `used/` and `unused/` folders.

---

# Required Inventory Fields

The canonical file is:

```text
.images/_inventory/media-master.csv
```

Each row represents one logical media asset.

Required columns:

```text
asset_id
file_name
chapter_id
chapter_slug
figure_number
status
description
alt_text
caption
original_path
original_format
original_width_px
original_height_px
original_size_bytes
original_size_display
optimized_path
optimized_format
optimized_width_px
optimized_height_px
optimized_size_bytes
optimized_size_display
reduction_percent
cloudinary_public_id
cloudinary_url
cloudinary_transform
used_in_files
placement_heading
recommendation_score
recommendation_reason
last_modified_at
last_scanned_at
checksum
notes
```

## Field rules

- `asset_id`: stable slug-based identifier; do not change casually.
- `file_name`: original source filename.
- `chapter_id`: `ch01`, `ch02`, etc.
- `chapter_slug`: exact chapter media folder name.
- `figure_number`: `Figure 1.1`; blank if not assigned.
- `description`: short plain-language description of the visual.
- `original_path`: canonical source file path.
- `optimized_path`: optimized derivative path, if available.
- `cloudinary_url`: final delivery URL used in Markdown.
- `used_in_files`: semicolon-separated relative Markdown paths.
- `placement_heading`: semicolon-separated section headings where used.
- `recommendation_score`: numeric score from 0.00 to 1.00.
- `recommendation_reason`: concise evidence-based explanation.
- `checksum`: SHA-256 checksum of the original.

Do not invent dimensions, file sizes, captions, or Cloudinary URLs.

---

# Per-Chapter Outputs

Generate these files for every chapter:

```text
.images/_inventory/chapters/chNN-media.csv
.images/_inventory/chapters/chNN-media.html
```

The chapter CSV must include both used and unused assets belonging to that chapter.

The chapter HTML gallery must support:

- thumbnail preview;
- filename search;
- status filtering;
- figure-number filtering;
- used/unused/recommended filtering;
- original versus optimized dimensions;
- original versus optimized size;
- reduction percentage;
- chapter placement;
- Cloudinary open link;
- original local path display;
- warning badges for missing data.

The gallery should use the preview source in this order:

```text
1. Cloudinary URL
2. local optimized file
3. local original file
4. missing-image placeholder
```

---

# Master Outputs

Regenerate:

```text
.images/_inventory/media-master.csv
.images/_inventory/media-master.json
.images/_inventory/media-master.html
```

Optionally generate:

```text
.images/_inventory/media-inventory.xlsx
```

The CSV is canonical.

The JSON, HTML, and XLSX files are generated derivatives and must not be edited manually.

---

# Recommended Media View

For every chapter, generate:

```text
.images/_inventory/recommended/chNN/
├── recommended.csv
├── index.html
└── thumbnails/
```

This folder is a generated review package. It must not contain the original source images.

Allowed contents:

- HTML gallery;
- CSV recommendation list;
- small generated thumbnails or contact-sheet images;
- links to original local files;
- links to Cloudinary assets when available.

Do not duplicate full-resolution source images into the recommendation folder.

## Recommendation eligibility

An asset may be marked `recommended` only when all of the following are true:

1. It belongs to the same chapter media folder or has an explicit cross-chapter relevance tag.
2. It is not currently referenced in chapter Markdown.
3. It is not archived or marked duplicate.
4. Its filename, metadata, caption notes, or visible content aligns with a current chapter heading, concept, lab task, review topic, or figure gap.
5. The recommendation can be explained with concrete evidence.

## Recommendation scoring

Calculate a recommendation score from 0.00 to 1.00 using weighted evidence:

| Evidence | Weight |
|---|---:|
| Filename/slug matches chapter concept | 0.20 |
| Metadata or caption matches concept | 0.20 |
| Visual content matches concept | 0.25 |
| Fits a chapter section lacking a visual | 0.20 |
| Quality and production readiness | 0.10 |
| Not redundant with an existing used figure | 0.05 |

Only include assets scoring at least `0.55` by default.

Never claim a recommendation based solely on filename when the image can be inspected.

## Recommended gallery card

Each card should show:

```text
Thumbnail
Filename
Recommendation score
Suggested chapter section
Recommendation reason
Current status
Original size
Optimized size, if available
Cloudinary status
Open original
Open Cloudinary
```

The skill may suggest placement and caption text, but it must not insert the image into chapter Markdown without user approval.

---

# Change Detection

The skill should update inventories whenever any of the following changes:

- chapter Markdown;
- lab student-facing Markdown;
- an image is added, removed, renamed, or replaced;
- an optimized derivative is created or changed;
- a Cloudinary URL is inserted, removed, or changed;
- alt text changes;
- caption changes;
- figure number changes;
- image placement changes;
- archive status changes;
- recommendation decisions change.

Use hashes and Git diffs when available.

Do not rely only on modification timestamps.

---

# Matching Rules

Match chapter references to local assets in this order:

```text
1. Exact Cloudinary public ID
2. Exact Cloudinary delivery URL after removing transform blocks
3. Explicit media ledger mapping
4. Exact filename
5. Filename without extension
6. Figure number
7. SHA-256 checksum
8. Mark unresolved rather than guessing
```

Do not match files based only on vague visual similarity.

---

# Cloudinary URL Normalization

When comparing Cloudinary URLs:

- preserve the final URL exactly as written in Markdown;
- separately extract the public ID;
- ignore transform differences for identity matching;
- record the active transform chain in `cloudinary_transform`;
- do not rewrite URLs unless the media-placement workflow explicitly authorizes it.

Example transform chain:

```text
f_auto,q_auto,c_limit,w_1600
```

---

# Workflow

## Phase 1 — Detect changed chapter files

Identify changed files in the selected chapter using Git when available.

If Git is unavailable, compare current hashes with the previous media inventory.

Report:

- changed Markdown files;
- changed local image files;
- changed optimized derivatives;
- newly referenced URLs;
- removed references.

## Phase 2 — Parse chapter image usage

Parse:

- Markdown image syntax;
- HTML `<img>` tags;
- Cloudinary image URLs;
- figure captions;
- alt text;
- nearby headings;
- lab instructions.

Do not treat remote non-image links as media.

## Phase 3 — Scan chapter media folder

Scan the corresponding chapter folder under:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\
```

Include:

- PNG;
- JPG/JPEG;
- GIF;
- SVG;
- WebP;
- caption notes and ledgers in MD/CSV/TXT when relevant.

Exclude generated inventory files and thumbnail folders from source-asset counting.

## Phase 4 — Update usage status

Set:

- referenced assets to `used`;
- unreferenced active assets to `unused`;
- manually retained assets to `candidate`;
- semantically strong unused assets to `recommended`;
- retired assets to `archived` only after approval.

## Phase 5 — Refresh metadata

Collect:

- dimensions;
- format;
- file size;
- checksum;
- optimized derivative information;
- Cloudinary mapping;
- figure number;
- caption;
- alt text;
- chapter placement.

## Phase 6 — Build recommendations

Compare unused assets with:

- chapter headings;
- chapter concepts;
- lab activities;
- review questions;
- missing visual opportunities;
- existing used figures.

Generate recommendation scores and reasons.

Do not insert recommended assets automatically.

## Phase 7 — Generate outputs

Regenerate:

- chapter CSV;
- chapter HTML gallery;
- recommended CSV;
- recommended HTML gallery;
- master CSV;
- master JSON;
- master HTML;
- optional XLSX workbook.

## Phase 8 — Validate

Confirm:

- every used Cloudinary image appears in the inventory;
- every local source file appears in the inventory;
- every used asset has `used_in_files`;
- figure numbers are unique within a chapter;
- no original image was modified;
- no source image was deleted;
- no full-resolution source was copied into recommendation output;
- generated HTML opens without missing local references where local preview is intended;
- CSV files parse successfully.

---

# Approval Gates

## No approval required

The skill may automatically:

- scan chapter Markdown;
- scan the corresponding chapter media folder;
- calculate metadata and checksums;
- update used/unused/recommended statuses;
- regenerate CSV/JSON/HTML/XLSX inventory outputs;
- create generated thumbnails;
- identify unresolved assets.

## Approval required

Ask before:

- moving any source file;
- renaming any source file;
- deleting any file;
- moving an asset into `archive/`;
- uploading to Cloudinary;
- changing Cloudinary URLs;
- inserting a recommended image into chapter Markdown;
- changing figure numbers;
- overwriting a human-authored caption;
- converting image formats.

---

# Preservation Rules

- Never overwrite originals.
- Never delete source images.
- Never move source images without approval.
- Never upload to Cloudinary without approval from the media-placement workflow.
- Never fabricate missing metadata.
- Never expose instructor-only lab assets in student galleries.
- Never edit generated inventory derivatives manually.
- Never treat `recommended` as equivalent to `approved`.
- Always use collision-safe thumbnail names.
- Always report unresolved matches.

---

# Recommended Script Interface

Suggested implementation path:

```text
books/database-book/scripts/sync-media-inventory.py
```

Suggested commands:

```powershell
python books/database-book/scripts/sync-media-inventory.py --chapter ch01
python books/database-book/scripts/sync-media-inventory.py --chapter ch01 --check
python books/database-book/scripts/sync-media-inventory.py --all
python books/database-book/scripts/sync-media-inventory.py --all --xlsx
```

Suggested arguments:

```text
--chapter <chNN>
--all
--check
--xlsx
--rebuild-thumbnails
--minimum-recommendation-score 0.55
--include-archived
--dry-run
```

`--check` must fail with a non-zero exit status when generated inventories are stale.

---

# Integration With Chapter Editing

Whenever a tracked chapter Markdown file changes, the chapter-editing workflow must run media inventory synchronization before completion.

Required final sequence:

```text
1. Edit chapter file.
2. Update chapter metadata and outline.
3. Run media inventory synchronization for the chapter.
4. Review changed used/unused/recommended statuses.
5. Regenerate chapter gallery.
6. Regenerate master gallery.
7. Run validation.
8. Report files changed and unresolved media.
```

The chapter editor must not deploy directly. Deployment occurs through Git push and the configured build platform.

---

# Final Report Format

```markdown
# Chapter Media Inventory Update

## Chapter

`ch01-welcome-to-the-textbook`

## Changes Detected

- Markdown files changed: X
- New image references: X
- Removed image references: X
- Local images added: X
- Local images changed: X

## Inventory Results

- Used: X
- Unused: X
- Candidate: X
- Recommended: X
- Archived: X
- Missing original: X
- Missing optimized: X
- Missing Cloudinary: X

## Recommendations

| File | Score | Suggested Placement | Reason |
|---|---:|---|---|
| `example.png` | 0.78 | Core Concepts → Data and Decisions | Visual content closely matches the subsection and no comparable figure is currently used. |

## Outputs Updated

- `.images/_inventory/chapters/ch01-media.csv`
- `.images/_inventory/chapters/ch01-media.html`
- `.images/_inventory/recommended/ch01/recommended.csv`
- `.images/_inventory/recommended/ch01/index.html`
- `.images/_inventory/media-master.csv`
- `.images/_inventory/media-master.json`
- `.images/_inventory/media-master.html`

## Unresolved Items

- ...

## Preservation Confirmation

- Original files modified: 0
- Original files deleted: 0
- Source files moved: 0
```

---

# Final Principle

Use physical folders for stable asset lifecycle states:

```text
chapter folder = active originals and candidates
optimized/ = production derivatives
archive/ = intentionally retired assets, approval required
```

Use inventory status fields for changing editorial states:

```text
used
unused
candidate
recommended
archived
```

Use generated HTML galleries for fast visual review.
