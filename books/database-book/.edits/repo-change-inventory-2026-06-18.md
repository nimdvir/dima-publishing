# Repo Change Inventory - 2026-06-18

This document summarizes the current uncommitted repository state after the reader repair work,
the local preview, the Vercel production deploy, and the Google Drive archival copy.

Snapshot basis:

- Repository: `C:\Users\nd115232\Documents\GitHub\dima-publishing`
- Branch at snapshot time: `main`
- Snapshot command: `git status --short`
- Counts below were taken before this document was added.
- Working tree state: dirty, not committed, not pushed.

## Executive Summary

The repo contains a broad set of uncommitted changes. Some are the deployed reader repair work,
some are chapter/lab source normalization changes, and some look like workflow or temporary files
that should be reviewed before committing.

High-level status at snapshot time:

| Category | Count |
| --- | ---: |
| Modified tracked files | 203 |
| Untracked files | 35 |
| Total changed paths | 238 |

Changed-path categories:

| Category | Count | Notes |
| --- | ---: | --- |
| `.agents` | 8 | Skill/reference instruction changes; review separately before committing. |
| `.edits` | 2 | Chapter tracker and edit log updates. |
| `chapter-source` | 189 | Chapter/front-matter source files across the book. |
| `lab-source` | 15 | Lab source files for labs 01-15. |
| `manifest` | 1 | `source-import-manifest.csv` updated. |
| `reader-hybrid-v1.1` | 13 | Reader generator, renderer, styles, generated data, validator, and audit/helper files. |
| `other` | 10 | Link files and other repo-level/source-tree files. |

## What Was Deployed

The current local reader was deployed to Vercel production.

Production URLs verified after deploy:

- `https://reader-hybrid-v11.vercel.app`
- `https://data-pilot.dimapublishing.com/`

Deployment details:

- Deployment id: `dpl_9fU2xevjJ8y5kocs69nMXUyz8n1w`
- Vercel deployment URL: `https://data-pilot-ehunntnbt-dima-media.vercel.app`
- Deployed bundle: `assets/index-p9AHg02F.js`
- Public bundle check confirmed Chapter 1 strings:
  - `How Each Chapter Works`
  - `The Two Running Projects`
  - `Lab Quiz`

Verification run before deployment:

- `npm run generate`
- `npm run validate:content`
- `npm run lint`
- `npm run build`

Vercel build completed successfully. Vercel reported two non-blocking npm audit findings
and the existing Vite large-bundle warning.

## Reader Hybrid v1.1 Changes

Primary path:

`books/database-book/platform-pilots/reader-hybrid-v1.1`

Tracked modified reader files:

- `package.json`
- `scripts/generateBookData.ts`
- `src/components/MarkdownRenderer.tsx`
- `src/generated/bookData.ts`
- `src/styles.css`
- `src/utils/headings.ts`

Untracked reader files:

- `scripts/validateContent.ts`
- `audit-navtitles.txt`
- `audit-pages.txt`
- `audit-rats.txt`
- `scripts/add-page-breaks.py`
- `scripts/fix-rat-breaks.py`
- `scripts/fix-zero-breaks.py`

Functional changes:

- Added `npm run validate:content`.
- Added content validation covering introductions, videos/placeholders, roadmap tables,
  anchors, page counts, placeholders, and Q/A splits.
- Updated generator behavior:
  - strips YAML frontmatter, including frontmatter after leading HTML comments;
  - resolves stable files before dated fallback files;
  - strips introduction content out of Core Concepts for all source types;
  - preserves page breaks after the first intro/core split instead of stripping all markers;
  - derives cleaner sidebar navigation titles;
  - skips generic nav titles such as `Introduction`, `Learning Objectives`, `Core Concepts`,
    `Let's Build`, `RAT / Quiz`, and `Lab: Transfer Practice`;
  - labels answer-key pages as `Answer Key`;
  - skips figure captions as nav-title fallback text;
  - strips numbered prefixes including appendix-style prefixes such as `A1.`.
- Updated rendered heading support:
  - `MarkdownRenderer.tsx` now generates stable IDs for `h1`, `h2`, and `h3`;
  - `extractHeadingToc()` now includes H1/H2/H3 headings;
  - styles were added for in-page H1/H2/H3 and On This Page H1 entries.
- Regenerated `src/generated/bookData.ts`.
  - Current generated summary from the successful run:
    - 18 chapters loaded, including front matter;
    - 119 resolved sections;
    - 260 reader pages;
    - 15 labs loaded;
    - 0 placeholders;
    - 0 warnings.

Files to be careful with:

- The audit text files and helper Python scripts appear to be temporary repair/audit artifacts.
  They should probably not be committed unless we decide to keep them as formal tooling.

## Chapter and Lab Source Changes

Primary paths:

- `books/database-book/files/source/chapters`
- `books/database-book/files/source/labs`

Touched chapter folders:

- `01-acknowlgements`
- `ch01-introduction-to-course`
- `ch02-mis-and-bitm`
- `ch03-what-is-data`
- `ch04-databases`
- `ch05-sql`
- `ch06-relational-model`
- `ch07-normalization`
- `ch08-midterm-review`
- `ch09-database-design`
- `ch10-advanced-sql-queries`
- `ch11-database-administration`
- `ch12-business-intelligence`
- `ch13-advanced-database-techniques`
- `ch14-powerbi`
- `ch15-business-strategy-is`
- `ch16-final-review`
- `ch17-conclusion`

Touched lab folders:

- `lab-01-petvax-intro`
- `lab-02-petvax-system`
- `lab-03-data-types-and-tables`
- `lab-04-intro-to-access`
- `lab-05-sql`
- `lab-06-relational-model`
- `lab-07-normalization`
- `lab-08-midterm-review`
- `lab-09-advanced-sql`
- `lab-10-database-design`
- `lab-11-database-admin`
- `lab-12-business-intelligence`
- `lab-13-advanced-techniques`
- `lab-14-powerbi`
- `lab-15-strategy-and-is`

Observed content-source work:

- Standardized stable reader-facing section files across chapters:
  - `index.md`
  - `core-concepts.md`
  - `lets-build.md`
  - `review-questions.md`
  - `terms-treasury.md`
  - `rat.md`
- Added or repaired missing stable files for several chapters, including:
  - ch01-ch03 stable section files;
  - ch08 RAT and review files;
  - ch14 `index.md`;
  - ch15 RAT and terms files;
  - ch16 RAT, review, and terms files;
  - ch17 index, RAT, review, and terms files.
- Updated chapter introductions so they include intro/video/roadmap structure.
- Added or repaired Chapter Roadmap tables and hash links.
- Reduced duplicate intro/core-concepts leakage.
- Tuned page breaks in Core Concepts.
- Normalized RAT and Review/Reflection files toward two pages: questions, then answer key.
- Added blank lines between review/reflection questions where needed.
- Adjusted lab pages so lab quiz pages can show useful nav titles, including Chapter 1
  `Lab Quiz`.

Chapter 1-specific repair confirmed:

- Core Concepts page 4 nav title is `How Each Chapter Works`.
- Core Concepts page 4 contains the chapter section list.
- Core Concepts page 6 nav title is `The Two Running Projects`.
- Core Concepts page 6 contains both:
  - `The Grading Database`
  - `PetVax Veterinary Hospital Database`
- Review Questions is exactly two generated pages:
  - questions;
  - `Answer Key`.
- RAT is exactly two generated pages:
  - questions;
  - `Answer Key`.
- Lab page 2 nav title is `Lab Quiz`.

## Manifest and Source Migration Ledger

Modified file:

- `books/database-book/files/manifests/source-import-manifest.csv`

Observed role:

- Tracks source imports from Google Drive into repo stable source files.
- Contains imported/skipped/missing statuses for chapter/lab source files.
- This file has a large diff and should be reviewed before a curated commit.

## Agent and Workflow Instruction Changes

Modified `.agents` files:

- `.agents/README.md`
- `.agents/reference/active/data-book-minimalist-vector-image-prompt-skill.md`
- `.agents/reference/active/image-prompt.md`
- `.agents/skills/chapter-media/SKILL.md`
- `.agents/skills/figure-suggestion/SKILL.md`
- `.agents/skills/image-link-optimizer/SKILL.md`
- `.agents/skills/image-placement/SKILL.md`

Untracked `.agents` files:

- `.agents/skills/image-prompt/SKILL.md`
- `.agents/skills/image-prompt/style-minimalist-vector.md`

Recommendation:

- Do not include these in a reader-content commit until they are reviewed as a separate
  workflow/skills update.

## Other Changed Files

Other notable changed paths:

- `BITM330-book-drive.lnk`
- `books/database-book/files/source/BITM330-book-drive.lnk`
- `books/database-book/.edits/chapter-tracker.md`
- `books/database-book/.edits/edit-log.md`

Recommendation:

- Do not include `.lnk` changes in a content/reader commit unless there is a specific reason.
- `.edits` files can be committed separately if they are intended to preserve progress logs.

## Google Drive Archival Copy

In addition to repo changes, the modified repo source files were copied into:

`G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts`

Copy result:

- 116 files copied.
- 0 existing dated files overwritten.
- 116 copied files verified non-empty.
- Created 3 missing folders for `ch08-midterm-review`:
  - `lets-build`
  - `rat`
  - `reflection`

The copied files used the date suffix `2026-06-18`, for example:

- `ch05-sql\main\ch05-main-2026-06-18.md`
- `ch05-sql\main\ch05-index-2026-06-18.md`
- `ch05-sql\lets-build\ch05-lets-build-2026-06-18.md`
- `Labs-draft\lab-05-sql\lab-05-questions-2026-06-18.md`

The Drive copy is outside Git. It is a comparison/archive checkpoint, not a repo commit.

## Commit Recommendation

Do not commit everything in one broad commit.

Recommended path:

1. Create a branch, for example:

   ```powershell
   git switch -c reader-repair-2026-06-18
   ```

2. Make a curated deployed-reader checkpoint commit with only the relevant reader/book files:

   - reader generator/runtime changes;
   - `scripts/validateContent.ts`;
   - generated `bookData.ts`;
   - source chapter/lab files that are required to reproduce the deployed reader state.

3. Keep these out of that commit unless separately reviewed:

   - `.agents/*` workflow changes;
   - `.lnk` files;
   - temporary audit text files;
   - temporary page-break Python scripts;
   - unrelated source/reference drafts.

4. Push the branch to GitHub as a recoverable checkpoint.

5. Continue chapter-by-chapter edits from that checkpoint.

## Useful Commands

Inspect the current dirty state:

```powershell
git status --short
git diff --stat
```

Inspect only the deployed reader app changes:

```powershell
git status --short -- books/database-book/platform-pilots/reader-hybrid-v1.1
git diff -- books/database-book/platform-pilots/reader-hybrid-v1.1
```

Inspect only source content changes:

```powershell
git status --short -- books/database-book/files/source/chapters books/database-book/files/source/labs
```

Re-run reader verification:

```powershell
cd books/database-book/platform-pilots/reader-hybrid-v1.1
npm run generate -- --force
npm run validate:content
npm run lint
npm run build
```

