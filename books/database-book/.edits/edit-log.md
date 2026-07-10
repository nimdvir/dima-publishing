# Edit Log

This file contains the rolling edit log for the database book. Each date heading
groups task-list items for that day.

## 2026-07-07

- [x] Added `subtitle?: string` to `BookChapter` type (`types.ts`)
- [x] Added `parseSubtitle()` — extracts italic subtitle after H1 from intro pages
- [x] Added `stripRoadmapFromContent()` — removes `## Chapter Roadmap` table from intro content at generation time
- [x] Added `generateTocContent()` — generates TOC markdown listing front matter + all 17 chapters
- [x] Added TOC section to `FRONT_MATTER_SECTIONS` (before preface, at `ch00/toc`)
- [x] Restructured `generateBookData.ts` build order (chapters before front matter so TOC can reference them)
- [x] Fixed missing `for` loop after front matter block removal
- [x] Fixed roadmap parse-before-strip order (parse first, then strip from content)
- [x] Passed `roadmapItems` + `chapterSubtitle` from `App.tsx` to `ChapterReader`
- [x] Rendered inline roadmap grid + prominent subtitle on chapter intro pages (`ChapterReader.tsx`)
- [x] Added `inline` rendering mode to `ChapterRoadmapBar` (always-visible TOC grid, kept dropdown mode)
- [x] Animated homepage title: CSS `@keyframes titleHighlightSweep` (black→gold→heading), triggered once via ref
- [x] Removed sidebar nav captions (`SECTION_SUBTITLES` deleted from `Sidebar.tsx`)
- [x] Normalized terms-treasury heading levels (9 chapters: ch03,04,06,07,09,10,11,12,13 — demoted flat headings)
- [x] Added CSS for `.chapter-subtitle`, `.roadmap-inline`, `.toc-page`, `.animate-title`
- [x] Regenerated `bookData.ts`: 18 chapters, 120 sections, 273 pages, 161 roadmap topics, 0 warnings
- [x] TypeScript: zero errors. Vite build: 2520 modules, clean
- [x] Deployed to Vercel production (`www.dimapublishing.com`) from working tree
- [x] Saved chat: `books/database-book/chats/2026-07-07-copilot-toc-roadmap-animated-title.md`
- [x] Updated `todo.md` with 6 action items for 2026-07-08
- [x] Updated `chapter-tracker.md` and `edit-log.md`
- [x] Diagnosed & fixed Supabase-Vercel connectivity: empty `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel were causing `"Unrecognized client_id"`. Set via CLI (`vercel env add`), deployed.
- [x] Fixed MCP config: `.vscode/mcp.json` was pointing to unused Dbook project (`mreqwgpbssbeoonxldvp`), switched to active reader project (`akjidhxkcuubeajsntrz`).
- [x] Cleaned root `.env`: removed Dbook project notes with hardcoded Postgres password, replaced with pointer comment.
- [x] Added registration features to `SupabaseAccessTest.tsx`: first/last name fields, @albany.edu domain validation, password confirmation + strength meter, `raw_user_meta_data` on sign-up.
- [x] Verified live site: `data-pilot.dimapublishing.com/login` loads with zero console errors, Supabase connected.
- [x] Saved chat: `books/database-book/chats/2026-07-07-copilot-supabase-vercel-connectivity-fix.md`
- [x] Updated `todo.md`: 2 of 4 new items completed, 2 remaining for tomorrow

## 2026-07-06

- [x] Cleaned up legacy `BITM330-Book-git` repo (1,295 → 32 MB)
- [x] Moved unique content to `BITM330-book-drive/do-not-delete-yet/BITM330-Book-git-archive/`
- [x] Verified duplicates (Cengage, Lectures) via SHA256; deleted from repo
- [x] Deleted bloat: `.history/`, `.venv/`, `_build/`
- [x] Ran `git gc --aggressive` + `git prune-packed` (`.git`: 1,263 → 520 MB)
- [x] Committed cleanup and pushed to `nimdvir/BITM330-Book-github`
- [x] Deleted `.git` locally; 32 MB working files remain, history on GitHub

## 2026-06-21

- [x] Ran `chapter-final-check ch04` full audit — discovered 3 blockers (RAT answer key, HOW-TO-BUILD in assets, no stable files)
- [x] RAT answer key confirmed as standard chapter convention (separate page, not a blocker)
- [x] Moved `HOW-TO-BUILD-ACCDB.md` from `assets/` to `instructor/` in lab-04 folder
- [x] Ran `chapter-final-check ch02` full audit — discovered 3 blockers (answer key exposure in reflection + RAT, bare G:\ path, missing lab folder)
- [x] Separated answer keys from student-facing reflection and RAT into `ch02-reflection-answers-2026-06-21.md` and `ch02-rat-answers-2026-06-21.md`
- [x] Removed bare `G:\` path from `ch02-main-2026-06-21.md`; centered Core Concepts icon
- [x] Created `lab/` folder and copied lab-02 from canonical source
- [x] Compared 06-21 (user edit) vs 06-22 (expanded) — 06-22 adds networks, cybersecurity, data ethics, cloud, AI/ML, IoT, blockchain, EIS, business-function transformation
- [x] Built DOCX `ch02-2026-06-21.docx`
- [x] Ran `chapter-media ch02` — optimized 5 images (90%+ reduction), uploaded to Cloudinary, renumbered all 43 figures sequentially (2.1–2.43), removed all MEDIA HANDOFF local markers
- [x] Ran `chapter-source-import ch02` — imported 5 sections from Drive to repo with metadata comments; updated source-import-manifest.csv
- [x] Build DOCX `ch02-2026-06-21.docx` (~37,400 words across 5 sections)
- [ ] Run `chapter-media ch02` to upload and renumber 5 MEDIA HANDOFF figures (2.39–2.43)
- [ ] Merge 06-22 additions into canonical or accept 06-22 as canonical
- [ ] Run `chapter-source-import ch02` to reconcile Drive drafts into repo
- [x] Added lab link to `ch04-databases/index.md` pointing to `/labs/lab-04-intro-to-access/`
- [x] Ran `chapter-final-check` for ch05, ch06, ch07 — full 12-phase audit with reports in `.reports/`
- [x] Ch06: Migrated dated filenames to stable flat names (core-concepts.md, lets-build.md, terms-treasury.md, review-questions.md, rat.md)
- [x] Ch05: Imported newer GD RAT (06-21) and Reflection (06-21) companions
- [x] Ch06: Imported all 5 GD companions (06-19/06-21)
- [x] Ch07: Imported all 5 GD companions (06-19/06-21); author decision: keep appendices in main chapter
- [x] Appended 12 import records to `source-import-manifest.csv`
- [x] Created `ch05-edits.md` and `ch07-edits.md` in repo `.edits/`
- [x] Verified and closed all 3 remaining ch06 edit items
- [x] Updated chapter tracker (ch07 Next, ch05/ch06 archive)
- [x] Reviewed Lab 07 — confirmed strong chapter alignment; fixed YAML date (06-16→06-19), stale build-on link, legacy :::callout→HTML, and added normal-form terminology connectors
- [x] Created `lab-07-answers-2026-06-19.md` (instructor reference, 35-point quiz key + 65-point artifact rubric + consistency checks)
- [x] Synced Lab 07 questions (06-19) and answers (06-19) from GD to repo
- [x] Closed 2 resolved items in `ch04-edits.md`: stale lab note (not found — already resolved), RAT content verification (covers Ch04 concepts, standard format)
- [x] Added Ch04 row to repo-side chapter tracker
- [ ] Remaining: capture 10 Access screenshots, run chapter-media
- [x] Closed all 3 ch04-edits.md items; incorporated tch04-tutorial-ms-access.md into main
- [x] Generated 5 stable source files (core-concepts.md, lets-build.md, terms-treasury.md, review-questions.md, rat.md) from latest Drive drafts
- [x] Updated outline-2026-06-12.md with Access hands-on section
- [x] Wrote final check report to .reports/ch04-final-check-2026-06-21.md — READY_WITH_WARNINGS

## 2026-06-20 Edits

- [x] **Operational master plan created:** Wrote consolidated plan `books/database-book/plans/book-edit/book-plan-2026-06-20.md` with 4-phase execution order: freeze → Ch05-Ch08 → paid access → later chapters. Architecture: `data-pilot.dimapublishing.com` (free reader), `data.dimapublishing.com` (reserved for paid platform).
- [x] **Phase 1 validation:** Validated deployed reader at `reader-hybrid-v11.vercel.app`. Found two blockers: (1) auth gate blocking all /book content, (2) Ch05-Ch17 all visible in sidebar with no Coming Soon/lock indicators.
- [x] **Auth gate fix:** Modified `src/App.tsx`, `src/components/Sidebar.tsx`, and `src/components/Layout.tsx` — Ch01-Ch04 now readable without login, Ch05+ show lock icons and require authentication. Labs still require login.
- [x] **Ch02 structural revision:** Ran gap analysis (full outline coverage, no missing topics). Fixed heading hierarchy: promoted `### Chapter Summary` and `### References` to `##` (H2). Added `## Learning Objectives` H2 section with canonical objectives. Repositioned 9 page breaks at major conceptual transitions only (removed breaks at every H3 boundary). All 6 callouts verified canonical. Created `ch02-main-2026-06-21.md` in Google Drive. Original `ch02-main-2026-06-20.md` untouched.
- [x] **Stripe timing decision added to plan:** Roster-based free access first (Supabase already live). Stripe deferred until after book content work. One-time payment via Stripe Checkout + webhooks (not Payment Links).
- [x] **Deployed reader with auth fix:** Build passed, deployed to Vercel project `data-pilot` (already renamed from `reader-hybrid-v1.1`). Verified: CH01 content renders without login, CH05+ show lock icons.
- [x] **Lab answer exposure verified:** All 15 answer files properly in `instructor/` folders. Two minor notes: `lab-04/assets/HOW-TO-BUILD-ACCDB.md` (instructor content in assets/), `lab-11-questions` broken answer key link.
- [x] **Plan updated with Stripe roster-first strategy** and corrected `FREE_CHAPTER_IDS` runtime error.
- [ ] **Vercel domain/rename:** Being handled manually by Nim.
- [x] **Created `chapter-section-status.md` dashboard** with row-per-section format for all 17 chapters.
- [x] **Ch08 confirmed as midterm review:** Only `core-concepts.md` (main file) is needed. Companion sections (Let's Build, Terms Treasury, Review Questions, RAT, Lab) are N/A. Updated `chapter-section-status.md` and Phase 2 plan accordingly.
- [ ] **Vercel domain/rename:** Being handled manually by Nim.

- [x] **Inserted visual query engineering infographic into Chapter 10:** Added the custom-generated high-contrast textbook diagram `ch10-four-questions-before-query.jpg` to both the Google Drive manuscript ([BITM330-Book-draft/chapter-drafts/ch10-advanced-sql-queries/main/ch10-main-2026-06-16.md](g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch10-advanced-sql-queries\main\ch10-main-2026-06-16.md#L118)) and the stable dima-publishing master source ([books/database-book/files/source/chapters/ch10-advanced-sql-queries/ch10-main-2026-06-16.md](c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source\chapters\ch10-advanced-sql-queries\ch10-main-2026-06-16.md#L94)).
- [x] **Relocated and Cataloged the JPG asset:** Moved `advanced-query-infographic.jpeg` (created via Gemini image-generation) from the workspace root into the correct chapter image subdirectory, storing it under the mapped folder `.images/ch08-advanced-sql-queries/ch10-used/ch10-four-questions-before-query.jpg` due to original chapter mapping folder definitions.
- [x] **Updated and validated the master inventory indices:** Re-ran the database build script `rebuild-media-master-gallery.ps1` to re-scan all image assets recursively, generating a fresh, error-free HTML preview grid and appending the newly aligned JPEG asset to the master CSV workbook registry (`media-master.csv`), indexed properly as a `used` figure asset under Chapter 10's conceptual pathway mapping.
- [x] **Uploaded Chapter 10 Roadmap to Cloudinary:** Ran upload script to successfully host `ch10-four-questions-before-query` within `Database-book-BITM330/ch10-advanced-sql-queries/` folder, ensuring perfect rendering on the online reader backend.
- [x] **Imported GDrive Drafts and Regenerated Hybrid Reader Book Data:** Synchronized Chapter 10's Google Drive draft core-concepts text using [books/database-book/scripts/import-latest-drafts.ps1](books/database-book/scripts/import-latest-drafts.ps1) and successfully executed `npm run generate -- --force` in `reader-hybrid-v1.1` to build the final `bookData.ts` asset and verified perfect side-by-side local browser alignment of Page 2 from [books/database-book/files/source/chapters/ch10-advanced-sql-queries/core-concepts.md](books/database-book/files/source/chapters/ch10-advanced-sql-queries/core-concepts.md#L105).

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


## 2026-06-13 Edits

- [x] Created .agents/skills/chapter-source-import/SKILL.md — new compare-first reconciliation skill for Drive-to-repo chapter imports
- [x] Ch01–Ch04 reconciliation (20 sections): all 19 sections classified Current (dates match Drive source; imported 2026-06-11)
- [x] Ch04 Let's Build classified as Conflict: Drive ch04-lets-build-2026-06-13.md is a copy of 06-02; lets-build-v2.md has uncommitted repo-only manual edits; not imported
- [x] Deleted root-level answer file lab-01-petvax-intro/lab-01-answers-2026-06-03.md (instructor/ copy preserved; exposure risk removed)
- [x] Created books/database-book/.edits/ch04-edits.md — flags lets-build-v2.md conflict and stale index.md lab link
- [x] Created books/database-book/.edits/chapter-section-status.md — full Ch01–Ch17 section readiness dashboard

## 2026-06-29 Edits

- [x] Started Ch12/Ch15 merge-plan implementation: corrected Ch15 `merge-plan.md` scope, added missing Ch15 15.1/15.2 strategic foundation sections, updated Ch15 title/index roadmap, fixed stale Ch15 companion/final-review references, and logged remaining media/companion handoffs.
- [x] Continued Ch15 implementation by replacing placeholder stable companions: revised `terms-treasury.md`, `review-questions.md`, and `rat.md`; updated `ch15-edits.md` and `chapter-tracker.md` to close resolved Ch12/Ch15 companion and ordering tasks.
- [x] Ran a Ch15 media dry-run inspection: confirmed prompt specs exist in the Ch15 image folder, but generated Ch15 image files are not present yet; media generation/placement remains a `chapter-media` handoff.
- [x] Streamlined Ch15 for efficiency/effectiveness: compressed duplicated BI infrastructure/star-schema teaching into strategic summaries, removed awkward research-report phrasing, corrected the Horizon 3 chapter reference to Ch15, and removed broken legacy figure links/prompt details from `core-concepts.md`.
