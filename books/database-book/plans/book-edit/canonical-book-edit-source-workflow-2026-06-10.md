# Canonical Book Edit Source Workflow

Date: 2026-06-10  
Status: Implementation plan  
Project: `database-book`  
Primary repository: `C:\Users\nd115232\Documents\GitHub\dima-publishing`

## Purpose

This plan defines how the database textbook source files should move from the current Google Drive draft structure into the Git repository, how those files should be edited after migration, and how changes should be documented so the book can be regenerated with a clear audit trail.

The final operating model is:

```text
Google Drive dated drafts
        |
        v
One-time documented import
        |
        |-- stable repo filenames
        |-- source-import-manifest.csv
        v
Git-controlled canonical source
        |
        |-- commits: exact line-level changes
        |-- pull requests or commit bodies: rationale
        |-- CHANGELOG.md: milestone summary
        v
Validated formal build
        |
        |-- reader
        |-- DOCX
        |-- EPUB
        |-- PDF
        v
build-manifest.json records the exact Git commit used
```

## Final decisions

- Canonical source: the Git repository becomes canonical after migration.
- Google Drive role: historical draft archive and original image library.
- Chapter filenames: stable repo names, not dated working names.
- Stable chapter files: `index.md`, `core-concepts.md`, `lets-build.md`, `review-questions.md`, `terms-treasury.md`, and `rat.md`.
- Ongoing change history: Git commits and file history.
- Major-change rationale: pull requests or detailed commit bodies.
- Publication-level summary: `CHANGELOG.md`.
- Initial Drive provenance: one central `source-import-manifest.csv`.
- Build provenance: committed `build-manifest.json` under `files/manifests/`.
- Reader regeneration cache: reader-specific `.generation-manifest.json`, local or ignored.
- Generated files: recreated from source and generally not committed unless a deployment path requires them.
- Old sync process: bootstrap/import only, not an ongoing overwrite mechanism.
- Images: original image library stays at `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images`.
- Lab answers: never copied into the repo.

## Source-of-truth model

After migration, the repository copy is the working source of truth. The Google Drive dated files are preserved as the historical source that seeded the Git repository, but normal editing should happen in stable Markdown files under `books/database-book/files/source`.

Do not continue the old one-way Google Drive to repo overwrite workflow for normal editing after the migration. If a newer Drive draft appears later, treat it as an external source to compare and merge manually, not as an automatic replacement for repo-canonical files.

## Target repository layout

Canonical source root:

```text
C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source
```

Recommended structure:

```text
books/database-book/
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
          index.md
          core-concepts.md
          lets-build.md
          review-questions.md
          terms-treasury.md
          rat.md
        ...
      labs/
        lab-01-petvax-intro/
          index.md
        lab-02-petvax-system/
          index.md
        ...
      outlines/
        master-outline.md
        chapter-taglines.md
    manifests/
      source-import-manifest.csv
      build-manifest.json
      image-manifest.csv        # optional future media provenance
```

## Import source locations

Legacy chapter source:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts
```

Legacy lab questions source:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\Labs-draft
```

Legacy outline source:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.docs\outline
```

Original image library:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images
```

## Stable file mapping

Chapter section mapping:

- `main/chNN-main-YYYY-MM-DD.md` becomes `core-concepts.md`.
- `lets-build/chNN-lets-build-YYYY-MM-DD.md` becomes `lets-build.md`.
- `reflection/chNN-reflection-YYYY-MM-DD.md` becomes `review-questions.md`.
- `terms/chNN-terms-YYYY-MM-DD.md` becomes `terms-treasury.md`.
- `rat/chNN-rat-YYYY-MM-DD.md` becomes `rat.md`.

Each chapter folder should also have an `index.md` landing file. That file can be generated from the chapter title and summary, or curated manually if needed.

Lab mapping:

- `Labs-draft/lab-NN-*/lab-NN-questions-YYYY-MM-DD.md` becomes `files/source/labs/lab-NN-slug/index.md`.

Never import:

```text
lab-NN-answers-YYYY-MM-DD.md
```

If an answers file is found in a repo source folder, treat it as an exposure risk and remove it before committing.

Outline mapping:

- Latest `.docs/outline/outline-YYYY-MM-DD.md` becomes `files/source/outlines/master-outline.md`.
- Latest `.docs/outline/outline-taglines-YYYY-MM-DD.md` becomes `files/source/outlines/chapter-taglines.md`.

As of the planning review, the latest discovered master outline was:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.docs\outline\outline-2026-06-05.md
```

Confirm again during implementation before copying, because the outline may have changed.

## File selection rules

For each section, select the latest canonical dated file by the date in the filename, not the modified timestamp.

Use files that match the expected pattern exactly:

```text
chNN-<section>-YYYY-MM-DD.md
```

Exclude non-canonical files such as:

- `chNN-edit-*`
- `chNN-edited-*`
- `chNN-rewrite-*`
- `chNN-rewrite-claude-*`
- `chNN-main-rewritten-*`
- `chNN-*-concepts.md`
- `chNN-TermTreasury-*`
- `*-draft*.md`
- `*-outline*.md`
- undated `chNN-main.md`, `chNN-rat.md`, and similar bare filenames
- any file without a canonical `YYYY-MM-DD` date in the filename
- any lab answer file

If two canonical files have the same date in the same section, stop and resolve manually. Rename or choose explicitly so the import is deterministic.

## Provenance records

### Why a central CSV

Use one central import manifest instead of per-chapter JSON files. The import is a one-time historical event, so one manifest is easier to audit, review, sort, and open in Excel.

Do not create scattered per-chapter `source-manifest.json` files for this workflow.

### Manifest folder

Create this committed folder:

```text
books/database-book/files/manifests
```

Expected files:

```text
books/database-book/files/manifests/
  source-import-manifest.csv
  build-manifest.json
  image-manifest.csv        # optional future file
```

### `source-import-manifest.csv`

Purpose: document exactly which Google Drive file originally seeded each stable repository file.

Columns:

```csv
content_id,component,source_path,source_filename,source_date,source_sha256,destination_path,imported_at,status,notes
```

Example row:

```csv
ch05,core-concepts,"G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch05-sql\main\ch05-main-2026-06-06.md",ch05-main-2026-06-06.md,2026-06-06,sha256:abc123...,files/source/chapters/ch05-sql/core-concepts.md,2026-06-10T15:00:00-04:00,imported,
```

Recommended `content_id` values:

- `ch01`, `ch02`, through `ch17`
- `lab-01`, `lab-02`, through `lab-15`
- `outline`
- `taglines`

Recommended `component` values:

- `index`
- `core-concepts`
- `lets-build`
- `review-questions`
- `terms-treasury`
- `rat`
- `lab-questions`
- `master-outline`
- `chapter-taglines`

Recommended `status` values:

- `imported`
- `missing-source`
- `skipped-noncanonical`
- `skipped-answer-file`
- `manual-review`

### `build-manifest.json`

Purpose: document which Git revision produced the most recent formal output build.

This is provenance, not a disposable build artifact. It belongs under `files/manifests/`, not under an ignored `files/generated/` folder.

Example:

```json
{
  "book_id": "database-book",
  "version": "0.1.0",
  "git_commit": "bf1372aa92583fa4d92a0b0c57586d01283469a3",
  "generated_at": "2026-06-10T15:30:00-04:00",
  "source_validation": "passed",
  "outputs": [
    "reader",
    "docx",
    "epub",
    "pdf"
  ],
  "warnings": []
}
```

### Reader `.generation-manifest.json`

Reader generation manifests are technical caches. They answer: "Did this app need regeneration?"

They are different from `build-manifest.json`, which answers: "Which source revision produced this formal output?"

- `.generation-manifest.json`: reader-specific cache for incremental generation. Generally ignored/local.
- `files/manifests/build-manifest.json`: permanent formal-build provenance. Committed.

## Git history model

Use Git as the ongoing history after migration.

- Exact words or lines changed: Git diff and file history.
- Who changed them and when: Git commit metadata.
- Why a major restructuring was performed: pull request or detailed commit body.
- Major book changes in a release: `CHANGELOG.md`.
- Which Google Drive draft was originally imported: `source-import-manifest.csv`.
- Which source revision created a PDF, EPUB, DOCX, or reader: `build-manifest.json`.
- Whether a reader needed regeneration: local `.generation-manifest.json` cache.

## Commit convention

Use concise prefixes that are easy to scan in `git log --oneline`.

Examples:

```text
ch03: revise DIKW framework explanation
ch05: add SQL filtering examples
ch07: correct normalization terminology
rat-ch04: align questions with learning objectives
lab-05: revise PetVax SQL exercise
outline: reorder advanced SQL and database design
images-ch06: update ERD references
build: add source validation
migration: import canonical chapter sources
```

Avoid the longer style for ordinary chapter edits:

```text
source(ch03): revise DIKW framework explanation
```

That syntax is valid, but it adds noise for a primarily single-author textbook repository.

## CHANGELOG policy

Keep `CHANGELOG.md` high-level and milestone-focused.

Good entries:

- Imported canonical chapter source files from Google Drive.
- Completed first editorial pass for Chapters 1-4.
- Added stable outline source and chapter taglines.
- Regenerated reader data from canonical source.

Avoid changelog entries for:

- every typo fix
- minor sentence edits
- small formatting cleanup
- regenerated cache files with no content milestone

Open decision: choose one location and use it consistently.

Recommended options:

- `books/database-book/CHANGELOG.md` if the changelog covers the whole book project.
- `books/database-book/files/source/CHANGELOG.md` if the changelog covers only manuscript/source milestones.

Recommendation: use `books/database-book/CHANGELOG.md` if deployment, generated outputs, source migration, and manuscript milestones are all part of the same book workflow.

## Implementation phases

### Phase 1: Preflight inventory

- Confirm target folders exist or create them:
  - `books/database-book/files/source/chapters`
  - `books/database-book/files/source/labs`
  - `books/database-book/files/source/outlines`
  - `books/database-book/files/manifests`
- Scan all chapter folders under the Google Drive chapter draft root.
- Identify available sections for each chapter.
- Identify latest canonical file per section.
- Identify lab question files in `Labs-draft`.
- Identify latest outline and tagline files.
- Produce a dry-run report before copying anything.

### Phase 2: Import stable files

- Copy selected chapter source files into stable repo filenames.
- Copy selected lab question files into stable lab `index.md` files.
- Copy latest outline files into stable outline filenames.
- Generate or preserve chapter `index.md` files as needed.
- Do not import lab answers.
- Do not import original image files.

### Phase 3: Write manifests and reports

- Write `files/manifests/source-import-manifest.csv`.
- Include imported, skipped, missing, and manual-review rows as appropriate.
- Optionally write a human-readable import report under:

```text
books/database-book/files/source/_reports/import-2026-06-10.md
```

- Do not write per-chapter `source-manifest.json` files.

### Phase 4: Verify imported source

- Verify every stable source file exists where expected.
- Verify every imported file has a CSV row.
- Verify hashes in the CSV match source content at import time.
- Verify no lab answers exist under `books/database-book/files/source`.
- Verify no raw Windows paths were introduced without being flagged.
- Verify outlines were copied from the latest dated source files.

### Phase 5: Clean up sync-era artifacts

- Treat existing dated files and `.sync-manifest.json` files in repo chapter folders as sync-era artifacts.
- After stable files are verified, remove or archive dated working copies from active source folders.
- Do not leave stale dated files that could be silently used as generator fallbacks.
- Update or supersede `chapter-sync` guidance so it is not used as an ongoing overwrite process after repo-canonical migration.

### Phase 6: Generate and validate readers

- Use `books/database-book/platform-pilots/cursor-online-reader` for full-book source validation.
- Confirm it resolves stable source files first.
- Use `books/database-book/platform-pilots/reader-hybrid-v1.1` for the current chapter 1-4 reader path unless expanded later.
- Do not manually edit generated `src/generated/bookData.ts` files.
- If generated files must be committed for a deployment target, commit them separately from source edits.

### Phase 7: Formal builds

- For formal reader, DOCX, EPUB, or PDF output, record the Git commit SHA in `files/manifests/build-manifest.json`.
- Include output formats, timestamp, validation status, and warnings.
- Keep the build manifest committed even when generated outputs are not committed.

## Media workflow boundary

Original media stays external:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images
```

The import process may flag media problems, but should not solve them. Media remediation belongs to the chapter media workflow.

Flag during import:

- raw `G:\...` paths
- raw `C:\...` paths
- missing image references
- stale local image links
- Markdown images without useful alt text
- images that should become Cloudinary links

Do later in the media workflow:

- choose best figure candidates
- optimize images
- upload to Cloudinary
- rewrite links
- update captions and alt text
- record media provenance in an optional `image-manifest.csv`

## Validation checklist

Before declaring the migration complete:

- [ ] Dry-run report lists every selected chapter section file.
- [ ] Latest canonical dated file was selected for each available source section.
- [ ] Non-canonical files were skipped.
- [ ] Lab answer files were not copied.
- [ ] Every imported destination file has a row in `source-import-manifest.csv`.
- [ ] CSV hash values match imported content.
- [ ] `files/source/chapters` uses stable filenames.
- [ ] `files/source/labs` uses student-facing `index.md` files only.
- [ ] `files/source/outlines/master-outline.md` comes from the latest outline file.
- [ ] `files/source/outlines/chapter-taglines.md` comes from the latest tagline file.
- [ ] No `*-answers-*` files exist under `books/database-book/files/source`.
- [ ] Stale dated files are removed or archived from active source folders after verification.
- [ ] `.sync-manifest.json` files are removed or no longer treated as ongoing workflow state.
- [ ] Full-book generator validates stable files in `cursor-online-reader`.
- [ ] Current reader generator/build validates chapter 1-4 path in `reader-hybrid-v1.1`.
- [ ] Warnings for raw Windows paths and media issues are handed to the media workflow.
- [ ] Formal builds update `files/manifests/build-manifest.json`.
- [ ] Baseline import commit is separate from later editorial commits.

## Open implementation decisions

These should be resolved before or during the first migration implementation pass.

### Final changelog location

Recommended: `books/database-book/CHANGELOG.md` for project-wide book milestones.

### Production reader path

Recommended: use `cursor-online-reader` for full-book validation now. Decide later whether it becomes production or remains validation-only.

### Ingestion implementation path

Recommended: create a new `book-source-ingest` workflow or script rather than extending the old `chapter-sync` behavior. That avoids confusing bootstrap import with ongoing repo-canonical editing.

### Generated files policy per deployment target

Recommended: do not commit generated files unless a deployment target requires them. If committed, use a separate `build:` commit.

## Relevant files and folders

- `books/database-book/plans/book-edit/canonical-book-edit-source-workflow-2026-06-10.md`: this plan.
- `books/database-book/files/source/chapters`: canonical chapter source after migration.
- `books/database-book/files/source/labs`: canonical student-facing lab source after migration.
- `books/database-book/files/source/outlines`: canonical outline source after migration.
- `books/database-book/files/manifests/source-import-manifest.csv`: central one-time Drive import provenance manifest.
- `books/database-book/files/manifests/build-manifest.json`: committed formal-build provenance manifest.
- `books/database-book/files/manifests/image-manifest.csv`: optional future media provenance manifest.
- `books/database-book/platform-pilots/cursor-online-reader/scripts/generateBookData.ts`: full-book generator; resolves stable source files first.
- `books/database-book/platform-pilots/reader-hybrid-v1.1/scripts/generateBookData.ts`: current reader generator for chapters 1-4.
- `.agents/skills/chapter-sync/SKILL.md`: existing one-way sync guidance; should be updated or superseded for repo-canonical workflow.

## Implementation summary

The durable model is:

- Import from Drive once.
- Rename to stable repo source files.
- Record original Drive provenance in one central CSV.
- Edit stable repo files going forward.
- Use Git for detailed history.
- Use `CHANGELOG.md` for milestones.
- Use `build-manifest.json` for formal output provenance.
- Keep reader generation manifests as caches.
- Keep images in the external image library until the media workflow uploads and rewrites them.
- Never copy lab answers into the repo.
