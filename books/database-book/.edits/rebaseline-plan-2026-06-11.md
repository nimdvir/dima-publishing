# Plan: Rebaseline Chapters 1-7

Status: Approved for implementation on 2026-06-11.

Copy the latest canonical chapter 1-7 section files and lab materials from the Google Drive BITM330 draft archive into the `dima-publishing` repo source tree so future editing happens only in the Git repo. Use the locked repo decision to keep stable chapter filenames, put lab answer keys in instructor-only subfolders, copy lab assets unchanged, and preserve front matter (`0-cover-image` and `01-acknowlgements`) because those are already edited directly in the repo.

## Steps

1. **Preflight** source and target state. Confirm the Drive source root exists at `g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts`, the lab source root exists at `g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\Labs-draft`, and the target root exists at `c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source`.

2. **Select latest canonical chapter files** for ch01-ch07 by filename date only, using exact patterns `chNN-main-YYYY-MM-DD.md`, `chNN-lets-build-YYYY-MM-DD.md`, `chNN-reflection-YYYY-MM-DD.md`, `chNN-terms-YYYY-MM-DD.md`, and `chNN-rat-YYYY-MM-DD.md`. Exclude edit/rewrite/draft/outline/concept/TermTreasury/undated files. Stop for manual review if a section has multiple canonical files with the same latest date.

3. **Copy selected chapter files to stable repo filenames** under `files/source/chapters/chNN-slug/`: `main` -> `core-concepts.md`, `lets-build` -> `lets-build.md`, `reflection` -> `review-questions.md`, `terms` -> `terms-treasury.md`, `rat` -> `rat.md`. This should migrate ch02 back to stable filenames because stable filenames are the locked source contract.

4. **Review and update chapter `index.md` files** for ch01-ch07 only as needed so they link to the stable filenames. Do not touch `0-cover-image/` or `01-acknowlgements/`.

5. **Search for stale references repo-wide.** After all stable copies are in place, scan the repo for any remaining hardcoded references to dated filenames or old paths that would break now — including in build scripts, reader generation configs, platform pilot code, and any non-chapter Markdown files. Fix or flag each hit.

6. **Handle transitional cleanup for every affected chapter** after stable copies are verified — not just ch02. For each chapter folder, if dated files and `.sync-manifest.json` are leftover chapter-sync artifacts with no repo-side edits, remove them. If any differ from the selected Drive source or contain repo-side edits, flag for manual diff instead of deleting.

7. **Copy lab question files** for lab-01 through lab-07 into each lab folder as dated files, using the discovered latest `lab-NN-questions-YYYY-MM-DD.md`. Prefer a thin `index.md` landing page that links to the dated questions file rather than duplicating the full question text — this keeps one canonical copy and reduces drift.

8. **Copy lab answer files** for lab-01 through lab-07 into `files/source/labs/lab-NN-slug/instructor/` as dated files, per user decision. Do not link these answer files from lab `index.md`, chapter `index.md`, or reader-facing source. Treat them as instructor-only source materials.

9. **Copy each lab `assets/` folder** from Drive into the matching repo lab folder as `files/source/labs/lab-NN-slug/assets/`, preserving filenames, folder structure, and binary content unchanged. Exclude transient junk: skip `Thumbs.db`, `.DS_Store`, `desktop.ini`, `~$*` lock files, and other OS-generated temp files. Lab 1 currently has no populated assets folder; labs 2-7 do.

10. **Add a top-of-file HTML metadata comment** to each copied or refreshed Markdown source file, and remove YAML frontmatter when it exists. Before removing any YAML frontmatter, verify that the build/reader pipeline does not depend on YAML frontmatter for source discovery or metadata extraction. Use source filename dates for exact copied dated files and today's date (`2026-06-11`) **only** for files that were actually transformed in this pass (e.g. index.md rewrites, stable-name copies where the date was intentionally refreshed). For untouched dated files copied as-is, keep the source filename date. If a Markdown file contains YAML frontmatter (`---` block with keys such as `title`, `chapter`, `section`, `description`, `keywords`, `date`, `author`, `lang`, `toc`), copy the useful fields into a single HTML comment at the top of the Markdown file, then delete the YAML block. Recommended format: `<!-- metadata: title="..."; chapter="..."; section="..."; date="YYYY-MM-DD"; author="..."; description="..."; keywords="a, b, c" -->`. Preserve existing non-frontmatter HTML comments after this metadata comment unless they are obsolete. Do not add HTML comments to binary files, CSV files, SQL files, ACCDB files, XLSX files, PNGs, or other lab assets where comments could corrupt or break the file.

11. **Update `files/manifests/source-import-manifest.csv`** to reflect the rebaseline. Preserve rows for unaffected chapters/labs, and add or update rows for ch01-ch07 sections, lab questions, lab answers in `instructor/`, and lab assets. Use existing columns where possible: `content_id`, `component`, `source_path`, `source_filename`, `source_date`, `source_sha256`, `destination_path`, `imported_at`, `status`, `notes`. For assets, use component values such as `lab-assets` and note preserved binary/assets folder copy.

12. **Update repo-side progress tracking** after successful execution. Add a concise completed item to `books/database-book/.edits/edit-log.md` or update `books/database-book/.edits/chapter-tracker.md` Active rows if an existing migration/sync task is present. Do not use the Google Drive `.docs/.edits/` tracker for new work.

13. Do not use `chapter-media-inventory` for this copy unless a separate image audit is requested. Lab assets are assignment starter files, screenshots, SQL, CSV, XLSX, and ACCDB resources; chapter media inventory is read-only and not needed for moving lab asset folders.

## Latest Source Decisions Discovered

| Chapter | Main       | Lets-Build | Terms      | Reflection | RAT        | Lab Q      | Lab A      | Assets               |
| ------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | -------------------- |
| Ch01    | 2026-06-05 | 2026-06-03 | 2026-06-03 | 2026-06-03 | 2026-06-03 | 2026-06-03 | 2026-06-03 | None                 |
| Ch02    | 2026-06-06 | 2026-06-03 | 2026-06-02 | 2026-06-03 | 2026-06-03 | 2026-06-03 | 2026-06-03 | PNG notes, sample MD |
| Ch03    | 2026-06-03 | 2026-06-02 | 2026-06-03 | 2026-06-03 | 2026-06-03 | 2026-06-03 | 2026-06-03 | XLSX, CSV starters   |
| Ch04    | 2026-06-04 | 2026-06-02 | 2026-06-04 | 2026-06-04 | 2026-06-04 | 2026-06-03 | 2026-06-03 | CSVs, ACCDB          |
| Ch05    | 2026-06-03 | 2026-06-03 | 2026-06-02 | 2026-05-27 | 2026-05-19 | 2026-06-03 | 2026-06-03 | SQL files            |
| Ch06    | 2026-05-29 | 2026-05-24 | 2026-03-22 | 2026-03-22 | 2026-05-19 | 2026-05-24 | 2026-05-24 | CSVs, README, ACCDB  |
| Ch07    | 2026-05-30 | 2026-05-26 | 2026-05-05 | 2026-05-26 | 2026-05-19 | 2026-05-26 | 2026-05-26 | CSV, README          |

## Verification

1. Confirm ch01-ch07 each contain exactly the stable chapter files `index.md`, `core-concepts.md`, `lets-build.md`, `review-questions.md`, `terms-treasury.md`, and `rat.md`, with content hashes matching the selected latest Drive sources after stable-name copy.
2. Confirm no numbered front-matter folders were changed: `files/source/chapters/0-cover-image/` and `files/source/chapters/01-acknowlgements/` remain untouched.
3. Confirm every affected chapter no longer depends on dated sync artifacts; if dated artifacts remain in any chapter folder, document why they were retained.
4. Confirm labs 1-7 each have latest questions available and labs 1-7 each have latest answers under `instructor/` only.
5. Confirm lab answers are not linked from any public-facing `index.md`, chapter index, or generated reader source.
6. **Confirm instructor exclusion at build time.** Verify that the public build/reader pipeline does not package `instructor/` folders. This is a hard pass/fail check — answer keys must never appear in student-facing output.
7. Confirm labs 2-7 have copied `assets/` folders with expected file counts and hashes, and no transient junk files (`Thumbs.db`, `.DS_Store`, `desktop.ini`, `~$*` lock files) were copied. Lab 1 is reported as having no populated assets.
8. Confirm every copied/refreshed Markdown source file has exactly one top HTML metadata comment containing at least `date="YYYY-MM-DD"` and, when source YAML frontmatter existed, the relevant frontmatter fields. The date in the comment must match the source filename date for copied-as-is files, or today's date only for files intentionally edited.
9. Confirm copied/refreshed Markdown source files no longer contain YAML frontmatter blocks at the top of the file; ordinary horizontal rules (`---`) later in the body are allowed.
10. Confirm no HTML comments were inserted into non-Markdown lab assets such as CSV, SQL, XLSX, ACCDB, or image files.
11. Confirm `source-import-manifest.csv` includes current rows for all copied sections, lab questions, instructor answers, and assets with current import timestamp and source/destination paths.
12. Confirm no stale references remain to dated filenames or old paths in build scripts, reader config, or platform code.
13. Run the reader/source generation validation appropriate to the platform after implementation.

## Decisions

- Use stable chapter filenames, not dated filenames, for ch01-ch07.
- Put lab answers under `files/source/labs/lab-NN-slug/instructor/`.
- Copy lab assets unchanged under each lab's `assets/` folder.
- Replace YAML frontmatter in copied/refreshed Markdown source files with a top HTML metadata comment, preserving useful metadata fields and deleting the YAML block; use source filename dates for exact copied dated files and today's date for files intentionally edited during the rebaseline.
- Do not sync or edit `0-cover-image` or `01-acknowlgements`.
- Treat Google Drive as the source archive for this rebaseline, then continue future editing in `dima-publishing` only.
- Existing `chapter-sync` rules are informative for latest-file selection and conflict safety, but its answers-only exclusion is superseded here by the user's instructor-only answer-key decision.

## Further Considerations

1. The current import script should not be run as-is for this task because it skips answers, skips assets, and maps labs only to `index.md`.
2. Ch05-Ch07 have some older companion dates; copy them because they are the latest canonical files, but consider a later editorial refresh task for stale RAT/terms/reflection content.
3. If YAML frontmatter removal causes reader-generation issues, the fallback is to restore the YAML block in a separate pass — the metadata comment approach is preferred but must be validated against the build pipeline before finalizing.
