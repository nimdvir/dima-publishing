# Edit Log

This file contains the rolling edit log for the database book. Each date heading
groups task-list items for that day.

## 2026-06-13 Edits

- [x] **Outline-to-chapter structural audit:** Compared `outline-2026-06-12.md` against all 17 chapters in both Google Drive drafts and dima-publishing source. 10 chapters verified aligned (Ch3-5,7-10,13,17). Created 9 per-chapter edit files in `books/database-book/.edits/` (Ch1,2,6,11,12,14,15,16,17) and matching GD `.edits` files. Key findings: Ch14 GD main file is Microsoft Learn content (CRITICAL), Ch12 has structural drift between draft and source, Ch16 main may be truncated, Ch15/16 missing companions in dima-pub.
- [x] Updated `books/database-book/.edits/edit-log.md` and chapter tracker with audit results.
- [x] **Ch1 new section — "Why the Book Is Sequenced This Way":** Added section with page breaks, 3-column chapter-progression table (Chapters 1–17, Topic Focus, Cognitive Goal), two code-block progression diagrams, and blockquotes. Inserted between "How the Book Is Organized" and "How Each Chapter Works" in both `core-concepts.md` (repo) and `ch01-main-2026-06-05.md` (Google Drive).
- [x] **Ch1 image:** Optimized Gemini-generated image (6 MB PNG → 243 KB JPG, 96% reduction); uploaded to Cloudinary at `Database-book-BITM330/ch01-introduction-to-course/ch01-book-conceptual-architecture`; placed in new Ch1 section with caption; updated `book-media.md` ledger (row 260).
- [x] **Outline updates:** Added "Why the Book Is Sequenced This Way" bullet to `books/database-book/plans/outline/outline-2026-06-12.md` and `books/database-book/files/source/outline/outline-2026-06-12.md`.
- [x] **New skill:** Created `.agents/skills/chapter-publish/SKILL.md` — thin orchestrator for Drive-to-repo chapter publishing workflow using `import-latest-drafts.ps1`, stable production filenames, `source-import-manifest.csv`, and `book-deploy` handoff. Does not use legacy `chapter-sync`.

## 2026-06-12 Edits

- [x] **Ch9/Ch10 outline, title, and image-folder update:** Created `outline-2026-06-12.md` (plans + source) with Ch9=Database Design and ER Modeling, Ch10=Advanced SQL for Business Analysis. Swapped section numbering (9.x↔10.x). Updated `book.yml` (added Ch17), `chapter-registry.yml`, `chapter-taglines.md`, Ch9/Ch10 `core-concepts.md`, `ch09-title.md`, `ch10-title.md`, `ch09-outline.md`, and roadmap numbering. Fixed cross-references in Ch1, Ch5, Ch8, Ch11, and `chapter-review-codex/SKILL.md`. Renamed `.images/ch09-midterm-review`→`ch09-database-design` and `.images/ch10-database-design`→`ch10-advanced-sql-queries`; moved stray gemini-prompts file to correct folder. Created `.reports/chapter-order-update-report-2026-06-12.md`. Branch: `reorganize-ch09-ch10-outline`.

## 2026-06-11 Edits

- [x] Fixed Ch9/Ch10 numbering swap across both repos (dima-publishing + GDrive): Design now Ch9, Advanced SQL now Ch10. Fixed YAML frontmatter, H1 headings, section numbers (9.x/10.x), and all companion files (lets-build, terms, reflection, rat).
- [x] Created stub `core-concepts.md` for ch10-advanced-sql-queries, ch13-advanced-database-techniques, and ch16-final-review in dima-publishing with full heading skeletons from GDrive source.
- [x] Removed all `## Figures Index` sections from ch03 lets-build, ch04, ch05, and ch14 core-concepts.
- [x] Created comprehensive `outline-2026-06-11.md` with H2->H3->H4 hierarchy covering all 17 chapters including Let's Build, Lab, Terms, Reflection, and RAT status summaries. No Figures Index references.
- [x] Verified: zero Figures Index in chapter files, correct Ch9/Ch10 numbering everywhere, all 17 chapter folders have `core-concepts.md` with correct H1.
- [x] Updated `platform-pilots/reader-hybrid-v1.1` so the homepage now uses the classic Cloudinary cover GIF, the book-entry screen rotates between the classic and gold cover GIFs before Chapter 1, the duplicate first markdown cover is suppressed on that entry screen, and the v1.1 Vercel deployment was rebuilt and redeployed successfully.
- [x] Restored the classic Cloudinary cover asset at `bitm330book/0-cover-image/ch00-cover-art2-cropped.gif` with the portrait GIF upload preset after a failed oversized full-cover replacement briefly removed the public ID used by the deployed reader.
- [x] **Rebaseline Ch01-07:** Copied 35 chapter sections (stable filenames), 7 lab question files, 7 lab answer files (into instructor/), 31 lab asset files from Google Drive. Added HTML metadata comments, removed YAML frontmatter. Cleaned ch02 dated artifacts. Updated source-import-manifest.csv (80 new rows).

## 2026-06-10 Edits

- [x] Redirected the edit-tracking skills to repo-side `books/database-book/.edits/` files.
- [x] Created the repo-side `AGENTS.md`, `edit-log.md`, `chapter-tracker.md`, and `README.md` for the database book.
- [x] Seeded the chapter tracker with the current open book tasks.
- [x] Verified the v1.1 reader build, fixed the introduction generator to honor stable `index.md`, and quarantined the dead `AiAssistant.tsx` component.
- [x] Cleaned the migrated lab source indexes, confirmed there were no stale `.sync-manifest.json` files, added importer sanitization for answer-link references, and regenerated `source-import-manifest.csv` with sanitize notes.

## 2026-06-11 Edits

- [x] Rebaseline Chapters 9-12: copied latest section files (main, lets-build, terms, reflection, rat) to stable filenames under iles/source/chapters/ch09-*- through ch12-*
- [x] ch09/ch11/ch12 main: kept both canonical and rewritten versions for author review (core-concepts.md + core-concepts-rewritten-YYYY-MM-DD.md)
- [x] ch10 main: used ch10-main-rewritten-2026-05-18.md as only candidate; undated companions copied with fallback date 2026-06-11
- [x] Labs 09-12: copied latest Q/A files (2026-05-22); questions to public lab folders, answers to instructor/ only
- [x] Support files: copied chapter title, outline, and Git-safe source markdown/CSV files; excluded PDFs, PPTXs, PNGs, desktop.ini, .crdownload
- [x] Metadata normalization: replaced YAML frontmatter with top HTML metadata comments on all copied/refreshed Markdown files; added metadata comments to files without YAML
- [x] 5/5 stable files per chapter verified; no YAML frontmatter remains; lab answers only under instructor/; no unwanted artifacts copied

## 2026-06-11 Edits

- [x] Rebaseline Chapters 9-12: copied latest section files to stable filenames under files/source/chapters/ch09-* through ch12-*
- [x] ch09/ch11/ch12 main: kept both canonical and rewritten versions for author review
- [x] ch10 main: used rewritten file as only candidate; undated companions with fallback date 2026-06-11
- [x] Labs 09-12: copied latest Q/A files (2026-05-22); questions public, answers to instructor/ only
- [x] Support files: title, outline, Git-safe source markdown/CSV; excluded PDFs/PPTXs/PNGs/desktop.ini/.crdownload
- [x] Metadata normalization: replaced YAML frontmatter with top HTML metadata comments on all copied/refreshed Markdown files
- [x] 5/5 stable files per chapter verified; no YAML remains; answers only under instructor/


- [x] Rebaseline Chapters 08,13-17: copied latest section files to stable filenames
- [x] ch14: kept both rewritten and powerbi-mslearn main versions for review
- [x] ch15/16/17: only main+lets-build available; terms/reflection/rat companions not present in source
- [x] Labs 08,13-15: copied latest Q/A (2026-05-22); questions public, answers instructor/ only
- [x] Support: title, outline, Git-safe source MD files copied; excluded PDFs/PPTXs/PNGs
- [x] Metadata normalization: YAML->HTML comments on all copied Markdown
- [x] Verified: stable files present, no answer leaks, no unwanted artifacts

