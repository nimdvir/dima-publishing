what do you think of this plan to organize the image folder? 
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images
# Prompt: Organize and Inventory the BITM330 Image Library
You are working in the following image library:

```
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images
```
Your task is to organize, inventory, and visually catalog the textbook images without deleting, overwriting, or automatically moving original files.

The chapter Markdown source is located at:

```
C:\Users\nd115232\Documents\GitHub\dima-publishing\
books\database-book\files\source\chapters
```
The canonical project skills are located at:

```
C:\Users\nd115232\Documents\GitHub\dima-publishing\.agents
```
Before beginning, read:

```
C:\Users\nd115232\Documents\GitHub\dima-publishing\AGENTS.md
C:\Users\nd115232\Documents\GitHub\dima-publishing\.agents\README.md
C:\Users\nd115232\Documents\GitHub\dima-publishing\.agents\skills\
chapter-media-inventory\SKILL.md
```
Use `chapter-media-inventory` as the primary skill for this task.

---

## Objective
Create a reliable media-management system that:

1. inventories every image in the `.images` library;
2. identifies which images are currently used in chapter Markdown;
3. identifies unused images;
4. identifies unused images that should be considered for use;
5. tracks originals, optimized files, Cloudinary URLs, descriptions, figure numbers, dimensions, and file sizes;
6. generates per-chapter inventories;
7. generates one master inventory for the entire book;
8. generates visual HTML galleries so images can be reviewed quickly;
9. preserves all original files;
10. does not reorganize source files without explicit approval.

---

# Important Constraints

## Preservation rules
Do not:

- delete any original image;
- overwrite any original image;
- rename any original image without approval;
- move any original image without approval;
- upload anything to Cloudinary;
- rewrite chapter Markdown;
- alter Cloudinary URLs;
- change figure numbers;
- change captions;
- move files into an archive folder automatically;
- copy full-resolution originals into generated recommendation folders.

All file-moving recommendations must be reported first and require approval.

## Source of truth
The original media files remain in:

```
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images
```
The chapter Markdown remains in the GitHub repository.

The inventory files and galleries are generated outputs. They are not the source of truth for image content.

---

# Desired Folder Structure
Do not create `used` and `unused` folders.

Usage is metadata, not a physical folder state.

Each chapter folder should generally remain:

```
.images/
├── ch01-welcome-to-the-textbook/
│   ├── original-image-01.png
│   ├── original-image-02.jpg
│   ├── optimized/
│   │   ├── original-image-01.webp
│   │   └── original-image-02.webp
│   └── archive/
│       └── retired-image.png
├── ch02-...
└── _inventory/
```
The `archive/` folder is optional and reserved for images that are intentionally retired, superseded, duplicated, outdated, or rejected.

Never move an image into `archive/` without approval.

---

# Generated Inventory Structure
Create:

```
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\_inventory\
```
with:

```
_inventory/
├── media-master.csv
├── media-master.json
├── media-master.html
├── media-inventory.xlsx
├── chapters/
│   ├── ch01-media.csv
│   ├── ch01-media.html
│   ├── ch02-media.csv
│   ├── ch02-media.html
│   └── ...
└── recommended/
    ├── ch01/
    │   ├── recommended.csv
    │   ├── index.html
    │   └── thumbnails/
    ├── ch02/
    │   ├── recommended.csv
    │   ├── index.html
    │   └── thumbnails/
    └── ...
```
The recommendation folders must contain only:

- generated thumbnails;
- HTML review pages;
- CSV metadata;
- links to originals;
- Cloudinary links where available.

Do not duplicate full-resolution source images there.

---

# Inventory Status Values
Use only these statuses:

```
used
unused
candidate
recommended
archived
missing-original
missing-optimized
missing-cloudinary
orphaned-cloudinary
duplicate
```
Definitions:

- `used`: referenced in chapter or student-facing lab Markdown;
- `unused`: exists locally but is not referenced;
- `candidate`: retained intentionally for possible future use;
- `recommended`: unused but semantically relevant to current chapter content;
- `archived`: intentionally retired;
- `missing-original`: referenced but no local original was found;
- `missing-optimized`: used or uploaded but no optimized derivative was found;
- `missing-cloudinary`: local used image has no Cloudinary URL;
- `orphaned-cloudinary`: Cloudinary image cannot be matched to chapter usage;
- `duplicate`: checksum or explicit comparison indicates duplication.

---

# Required CSV Columns
The canonical master inventory must be:

```
.images\_inventory\media-master.csv
```
Include these columns:

```
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
Rules:

- use SHA-256 for checksums;
- do not invent metadata;
- leave unknown values blank;
- preserve the exact Cloudinary URL found in Markdown;
- extract the Cloudinary public ID separately;
- record semicolon-separated files in `used_in_files`;
- record semicolon-separated headings in `placement_heading`.

---

# Chapter Matching
Match chapter image folders to chapter source folders carefully.

Examples:

```
.images\ch01-welcome-to-the-textbook
↔
books\database-book\files\source\chapters\ch01-introduction-to-course
```
Do not assume folder names are identical.

Use chapter number first, then validate the chapter title and content.

If the match is ambiguous, report it and stop for that chapter rather than guessing.

---

# Markdown Files to Scan
For every chapter, scan:

```
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
lab/index.md
```
Also scan any additional student-facing Markdown files listed in `chapter.yml`.

Do not expose or include instructor-only content such as:

```
lab/answers.md
solution-files/
instructor-only files
```
unless explicitly requested.

---

# Image References to Detect
Extract images from:

- Markdown image syntax;
- HTML `` tags;
- Cloudinary image URLs;
- relative image links;
- local absolute image paths;
- linked figures in tables or callouts.

For each image reference, extract where possible:

- filename;
- alt text;
- caption;
- figure number;
- nearest H2 or H3 heading;
- source Markdown file;
- Cloudinary URL;
- Cloudinary public ID;
- transform string.

---

# Matching Priority
Use this order:

```
1. Exact Cloudinary public ID
2. Exact Cloudinary URL after normalizing transforms
3. Explicit media-ledger mapping
4. Exact filename
5. Filename without extension
6. Figure number
7. SHA-256 checksum
8. Mark unresolved
```
Do not guess matches based only on vague filename similarity.

---

# Optimized Image Detection
Identify optimized derivatives in folders such as:

```
optimized/
chNN-optimized/
```
Match them to originals using:

- basename;
- checksum where applicable;
- dimensions;
- filename stem;
- documented ledger entries.

Record:

- optimized path;
- optimized format;
- optimized width and height;
- optimized file size;
- percentage reduction.

Calculate reduction as:

```
(original_size_bytes - optimized_size_bytes)
/
original_size_bytes
× 100
```

---

# Recommended Images
Identify unused images that should be considered for placement in the chapter.

An image may be marked `recommended` only if:

1. it is not currently used;
2. it is not archived;
3. it is not a duplicate;
4. its visible content or metadata matches a chapter concept;
5. it fills a meaningful visual gap;
6. it is not redundant with an existing used image;
7. the recommendation can be explained clearly.

Use this recommendation score:

```
filename or slug concept match         0.20
metadata or caption concept match      0.20
visible-content match                  0.25
fits a section lacking a visual        0.20
quality and production readiness       0.10
not redundant with existing figure     0.05
```
Use a default threshold of:

```
0.55
```
For each recommended image, record:

```
filename
recommendation_score
suggested_chapter_section
recommendation_reason
current_status
original_size
optimized_size
Cloudinary_status
original_path
Cloudinary_url
```
Do not insert any recommended image into Markdown.

---

# HTML Gallery Requirements
Generate:

```
media-master.html
chapters/chNN-media.html
recommended/chNN/index.html
```
The galleries must support:

- thumbnail previews;
- text search;
- chapter filtering;
- status filtering;
- figure-number filtering;
- used/unused/recommended filtering;
- original dimensions;
- optimized dimensions;
- original size;
- optimized size;
- size-reduction percentage;
- Cloudinary links;
- original local path;
- source Markdown file;
- placement heading;
- warning badges;
- recommendation score.

Preview source priority:

```
1. Cloudinary URL
2. local optimized file
3. local original file
4. missing-image placeholder
```
The HTML should be standalone and open locally in a browser.

Use relative paths where practical.

---

# Workbook
Generate:

```
media-inventory.xlsx
```
with sheets:

```
All Media
Used
Unused
Candidate
Recommended
Archived
Missing
Duplicates
Chapter 01
Chapter 02
...
```
The workbook is a generated convenience output.

The CSV remains canonical.

---

# Change Detection
The inventory should update when:

- chapter Markdown changes;
- an image is added;
- an image is removed;
- an image is renamed;
- an image is replaced;
- an optimized derivative changes;
- a Cloudinary URL changes;
- alt text changes;
- a caption changes;
- a figure number changes;
- placement changes;
- archive status changes;
- recommendation status changes.

Use:

- Git diff where available;
- SHA-256 checksums;
- previous inventory state.

Do not rely only on modification timestamps.

---

# Implementation
Create a reusable script at:

```
C:\Users\nd115232\Documents\GitHub\dima-publishing\
books\database-book\scripts\sync-media-inventory.py
```
The script should support:

```
python books/database-book/scripts/sync-media-inventory.py --chapter ch01
python books/database-book/scripts/sync-media-inventory.py --chapter ch01 --check
python books/database-book/scripts/sync-media-inventory.py --chapter ch01 --dry-run
python books/database-book/scripts/sync-media-inventory.py --all
python books/database-book/scripts/sync-media-inventory.py --all --xlsx
python books/database-book/scripts/sync-media-inventory.py --all --rebuild-thumbnails
```
Supported arguments:

```
--chapter 
--all
--check
--dry-run
--xlsx
--rebuild-thumbnails
--include-archived
--minimum-recommendation-score 0.55
```
Behavior:

- `--dry-run`: report intended changes without writing;
- `--check`: exit nonzero if inventories are stale;
- `--all`: scan all chapter folders;
- `--chapter`: scan one chapter;
- `--xlsx`: regenerate workbook;
- `--rebuild-thumbnails`: rebuild generated thumbnails;
- `--include-archived`: include archived assets in galleries.

---

# First Run Must Be Dry-Run Only
Do not begin by modifying files.

The first run must:

1. inventory all chapter image folders;
2. identify folder naming inconsistencies;
3. identify duplicate files;
4. identify used and unused images;
5. identify missing optimized files;
6. identify missing Cloudinary matches;
7. identify possible chapter-folder mismatches;
8. identify images currently inside `used/` or `unused/` subfolders;
9. propose a migration plan;
10. generate a dry-run report.

Do not move anything during the first run.

Create:

```
.images\_inventory\initial-audit.md
```
The report should contain:

```
chapters scanned
images scanned
used images
unused images
recommended images
duplicates
missing originals
missing optimized files
missing Cloudinary links
folder naming inconsistencies
proposed moves
proposed archive candidates
unresolved mappings
```

---

# Existing Used/Unused Folders
If folders such as these exist:

```
ch01-used/
ch01-unused/
used/
unused/
```
do not delete or flatten them automatically.

Instead:

1. inventory every file;
2. preserve the current folder path;
3. assign a provisional status;
4. identify filename collisions;
5. recommend a future move into the main chapter folder;
6. wait for approval.

The long-term target is:

```
single chapter folder
+ optimized/
+ optional archive/
+ inventory status field
```

---

# Approval Gates
No approval required for:

- scanning files;
- reading Markdown;
- calculating hashes;
- reading image dimensions;
- generating CSV files;
- generating JSON;
- generating HTML galleries;
- generating thumbnails;
- generating XLSX;
- assigning provisional statuses;
- generating recommendations;
- producing reports.

Approval required before:

- moving files;
- renaming files;
- deleting files;
- moving files into archive;
- changing chapter Markdown;
- changing captions;
- changing figure numbers;
- uploading to Cloudinary;
- rewriting Cloudinary URLs;
- converting image formats;
- replacing originals.

---

# Validation
After generation, verify:

1. every local image appears in the master inventory;
2. every used Markdown image appears in the inventory;
3. every used asset has a source Markdown file;
4. figure numbers are unique within a chapter;
5. every optimized file has a matched original or an unresolved warning;
6. no original file was modified;
7. no original file was deleted;
8. no source file was moved;
9. recommendation folders contain no full-resolution originals;
10. CSV files parse correctly;
11. JSON parses correctly;
12. HTML galleries open;
13. workbook opens;
14. thumbnails display;
15. Cloudinary links are clickable;
16. missing assets show warning states.

---

# Required Final Report
Return:

```
# BITM330 Media Inventory Report

## Scope

- Image root:
- Chapter source root:
- Chapters scanned:
- Scan date:

## Counts

- Total images:
- Used:
- Unused:
- Candidate:
- Recommended:
- Archived:
- Duplicates:
- Missing original:
- Missing optimized:
- Missing Cloudinary:
- Orphaned Cloudinary:

## Folder Issues

- Existing used/unused folders:
- Naming inconsistencies:
- Duplicate folder names:
- Unmatched chapter folders:

## Recommendations

| File | Chapter | Score | Suggested Placement | Reason |
| ---- | ------- | ----: | ------------------- | ------ |

## Proposed File Operations

List all proposed moves, renames, or archive actions.

Do not execute them.

## Outputs Created

- media-master.csv
- media-master.json
- media-master.html
- media-inventory.xlsx
- chapter CSV files
- chapter HTML galleries
- recommendation galleries
- initial-audit.md

## Unresolved Items

List all unresolved mappings and missing metadata.

## Preservation Confirmation

- Originals modified: 0
- Originals deleted: 0
- Originals moved: 0
- Markdown files modified: 0
- Cloudinary uploads performed: 0
```

---

# Completion Rule
Do not claim completion unless:

```
the dry-run audit has been reviewed
the master inventory exists
every chapter inventory exists
HTML galleries open correctly
recommendation galleries exist
no originals were modified
no files were moved without approval
```
Begin with the dry-run audit only.