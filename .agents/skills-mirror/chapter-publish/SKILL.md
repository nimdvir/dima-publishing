---
name: chapter-publish
description: Orchestrate the BITM330 database-book publishing workflow by importing latest dated Google Drive drafts into stable repo production files, updating edit logs and manifests, validating the reader build, and handing off to deployment.
argument-hint: "ch01", "ch05 --dry-run", "all changed", "ch09 ch10 --skip-deploy"
---

# Chapter Publish Skill

## Purpose

Use this skill when the user asks to publish, dry-run publish, import, sync, update, or release one or more BITM330 database-book chapters from Google Drive drafts into the `dima-publishing` repository and reader site.

This skill is an **orchestrator**.

It does not rewrite chapter content. It does not replace the import script. It does not replace `book-deploy`. It coordinates the existing workflow in the correct order.

The core pipeline is:

```text
Google Drive dated chapter drafts
→ existing chapter import process
→ stable repository production files
→ source-import-manifest.csv
→ edit-log / chapter edits / chapter tracker
→ book-deploy
→ GitHub push
→ Vercel deployment
```

Publishing is not editing. Do not edit chapter prose, reorganize sections, rename headings, rewrite Markdown, or change instructional content unless the user explicitly asks.

---

## Core Mental Model

Google Drive is the writing desk.

The GitHub repository is the production desk.

The reader site publishes from the repository.

The agent is the clerk that moves, validates, logs, builds, and deploys.

---

## Existing Workflow Components

This skill coordinates the current workflow components:

| Component | Responsibility |
|-----------|----------------|
| Existing chapter import process | Copies latest dated Google Drive drafts into stable repo production files |
| `import-latest-drafts.ps1` | Backend helper for importing latest drafts; use according to existing script behavior |
| `source-import-manifest.csv` | Tracks imported sources, dates, and SHA-256 hashes |
| `progress-update` / `edit-log.md` | Records completed daily publishing actions |
| `chNN-edits.md` | Tracks chapter-specific unresolved notes, handoffs, and issues |
| `chapter-tracker.md` | Tracks meaningful book-level chapter status |
| `book-deploy` | Runs generate/lint/build and handles commit, push, and deployment gate |

The old `chapter-sync` skill may be inspected for context, but it is **not** the active import mechanism for this workflow because it expects dated destination files and `.sync-manifest.json`, while the current repo uses stable production filenames.

---

## Expected User Commands

The user may say:

```
Publish ch01.
Dry-run publish ch05.
Publish all changed chapters.
Publish ch09 and ch10.
Publish ch02 but skip deploy.
Check what would publish from Drive without changing repo files.
Import ch03 and prepare deploy.
```

Interpret these as requests to run the chapter publishing workflow.

The three main commands to support first are:

```
Dry-run publish chNN.
Publish chNN.
Publish all changed chapters.
```

---

## Current Source and Destination Convention

### Google Drive Drafts

Google Drive remains date-based.

Draft files may look like:

```
ch01-main-2026-06-13.md
ch01-lets-build-2026-06-13.md
ch01-terms-2026-06-13.md
ch01-rat-2026-06-13.md
```

### Repository Production Files

The repository uses stable production filenames.

Examples:

```
books/database-book/files/source/chapters/ch01-introduction-to-course/core-concepts.md
books/database-book/files/source/chapters/ch01-introduction-to-course/lets-build.md
books/database-book/files/source/chapters/ch01-introduction-to-course/terms-treasury.md
books/database-book/files/source/chapters/ch01-introduction-to-course/review-questions.md
books/database-book/files/source/chapters/ch01-introduction-to-course/rat.md
```

Do **not** create dated production files in the repo.

Do **not** create `.sync-manifest.json`.

Do **not** create a parallel dated-file structure.

The correct model is:

```
dated Drive draft file
→ stable repo production file
```

---

## Component Mapping

Use the existing importer and `book.yml` conventions. In general, the mapping is:

| Google Drive draft component | Repository production file |
|------------------------------|---------------------------|
| `main` | `core-concepts.md` |
| `core` | `core-concepts.md` |
| `lets-build` | `lets-build.md` |
| `terms` | `terms-treasury.md` |
| `key-terms` | `terms-treasury.md` |
| `review` | `review-questions.md` |
| `reflection` | `review-questions.md` |
| `rat` | `rat.md` |
| `quiz` | `rat.md` |
| `labs` / lab questions | appropriate lab/question file according to existing importer behavior |

If `book.yml` or the importer script defines a different mapping, follow the existing project configuration.

If a component is missing, report it. Do not invent content.

---

## Change Detection

Use the existing import manifest as the source of truth:

```
books/database-book/files/manifests/source-import-manifest.csv
```

The manifest includes a `source_sha256` column. SHA-256 comparison is more reliable than date comparison.

For "publish all changed chapters," changed files should be detected using the manifest.

Detection rules:

1. Locate the latest dated Google Drive source file for each chapter/component.
2. Compare the latest source file against the corresponding manifest entry.
3. Use `source_date` as a useful signal.
4. Use `source_sha256` hash comparison when available.
5. Treat SHA-256 comparison as more reliable than date comparison.
6. Import only components that are newer or hash-different.
7. Skip unchanged components and report them as skipped.

If the existing importer already performs this comparison, rely on its behavior and summarize its results.

Do not implement a second, competing change-detection system inside this skill.

---

## Workflow Modes

### Mode A — Dry Run

Use when the user says:

```
Dry-run publish chNN.
Check what would publish.
Preview publish.
```

A dry run must:

1. Inspect the latest relevant Google Drive chapter draft files using the current importer conventions.
2. Compare them against `source-import-manifest.csv`.
3. Report which stable repo files would be updated.
4. Report which files would be skipped as unchanged.
5. Report whether lab answer files were detected and excluded.
6. Report unresolved author notes or risky comments if detected.
7. Report whether a reader build would likely be needed.
8. Make no file changes.
9. Do not update edit logs.
10. Do not update manifests.
11. Do not commit.
12. Do not push.
13. Do not deploy.

End with:

```
Dry run completed. No files were changed.
```

---

### Mode B — Publish One Chapter

Use when the user says:

```
Publish chNN.
Publish chapter NN.
Import and deploy chNN.
```

The workflow is:

```
1. Preflight checks
2. Run the existing chapter import process for the requested chapter
3. Detect whether anything changed
4. Update source-import-manifest.csv through the importer
5. Update edit-log.md
6. Update chNN-edits.md if needed
7. Update chapter-tracker.md only for meaningful status changes
8. Run or hand off to book-deploy
9. Report final status
```

---

### Mode C — Publish All Changed Chapters

Use when the user says:

```
Publish all changed chapters.
Publish all updates.
Import all changed chapters.
```

The workflow is:

```
1. Preflight checks
2. Use the existing import process to identify changed chapters/components
3. Import only changed chapters/components
4. Skip unchanged chapters/components
5. Update source-import-manifest.csv
6. Update edit-log.md with the list of published chapters/components
7. Update chNN-edits.md only where chapter-specific unresolved items exist
8. Update chapter-tracker.md only for meaningful status changes
9. Run or hand off to book-deploy
10. Report final status
```

Do not process every chapter blindly if the manifest indicates that files are unchanged.

---

## Preflight Checks

Before making changes, check:

1. The requested chapter exists in the Google Drive chapter draft structure.
2. The corresponding repo chapter folder exists.
3. The current Git working tree is not in a risky state.
4. There are no unrelated uncommitted changes that could be accidentally included.
5. Existing workflow files are present:
   - `books/database-book/scripts/import-latest-drafts.ps1`
   - `books/database-book/book.yml`
   - `books/database-book/files/manifests/source-import-manifest.csv`
   - `books/database-book/.edits/edit-log.md`
   - `books/database-book/.edits/chapter-tracker.md`
   - `.agents/skills/book-deploy/SKILL.md`
6. For structural changes, require or create a branch rather than publishing directly to `main`.

Stop and ask if any preflight check fails.

---

## Lab Safety Rule

Never publish lab answer files.

This is a hard safety rule.

The existing `import-latest-drafts.ps1` script already implements answer-file exclusion. Rely on the script's behavior. Do not re-implement a competing exclusion filter inside this skill.

**Allowed examples:**

```
lab-08-questions-2026-06-13.md
ch08-lab-questions-2026-06-13.md
```

**Not allowed examples:**

```
lab-08-answers-2026-06-13.md
ch08-lab-answers-2026-06-13.md
answer-key.md
solutions.md
instructor-solutions.md
```

If answer files are detected, report:

```
Lab answer files detected and excluded from publishing.
```

Do not copy, commit, or deploy answer files unless the user explicitly requests a separate private instructor-only workflow.

---

## Image Boundary

Images are out of scope for this skill.

Do not migrate, rename, optimize, re-folder, or rewrite image links as part of chapter publishing.

Images are handled by the existing image workflow, including `image-link-optimizer` and Cloudinary-based links.

During publishing, preserve existing image links.

The agent may report obvious image warnings, such as:

- broken relative links;
- old chapter references in an image path;
- missing image files referenced directly in Markdown.

But do not fix image infrastructure unless the user explicitly asks for an image workflow.

---

## Logging Rules

The publish workflow should update the correct edit files.

### `edit-log.md`

Use this for completed daily actions.

Example:

```
## 2026-06-13

- [x] Published Ch01 from Google Drive to stable repository production files using the existing import process.
- [x] Updated source-import-manifest.csv.
- [x] Updated chapter publish logs.
- [x] Built reader successfully through book-deploy.
- [x] Pushed changes to GitHub; Vercel deployment triggered.
```

### `chNN-edits.md`

Use this only for chapter-specific notes, unresolved comments, handoffs, or issues.

Example:

```
# Ch01 Edit Notes

## Pending

- [ ] VERIFY: Confirm chapter sequence table matches the latest outline.
```

Do not create chapter-specific edit noise for routine publishes unless something chapter-specific needs tracking.

### `chapter-tracker.md`

Use this for meaningful project-level status only.

Do not update it for every tiny publish.

Appropriate uses:

- chapter moved from draft to production draft;
- chapter marked ready for review;
- major structural issue added;
- chapter sequence changed;
- unresolved blocker recorded.

---

## Build and Deploy Handoff

After importing and logging, hand off to the existing `book-deploy` skill.

Do not duplicate `book-deploy` logic inside this skill.

> **Prerequisite note:** `chapter-publish` replaces `chapter-sync` as the content-sync prerequisite for `book-deploy`. When this skill calls `book-deploy`, the import step above satisfies that prerequisite. There is no need to run `chapter-sync` first.

`book-deploy` is responsible for:

```
generate
lint
build
commit
push
deployment gate
```

If `book-deploy` asks for confirmation before commit/push, preserve that gate.

Do not manually commit/push before running `book-deploy`.

Avoid this duplicate sequence:

```
git add
git commit
git push
then book-deploy
```

The correct sequence is:

```
existing import process
→ logs
→ book-deploy
```

---

## Deployment Rule

Do not run manual Vercel deployment unless explicitly requested.

Deployment is triggered by Git push:

```
git push → GitHub → Vercel
```

Report deployment as:

```
GitHub push completed; Vercel deployment triggered automatically.
```

Do not claim the Vercel deployment succeeded unless deployment status was actually checked.

---

## Branching Rule

Normal chapter content publishing can happen on the current working branch if the working tree is safe and the build passes.

Use a branch for structural changes.

Structural changes include:

- chapter order changes;
- folder renaming;
- `.images` restructuring;
- navigation changes;
- reader code changes;
- build pipeline changes;
- global manifest restructuring;
- major outline restructuring.

Suggested branch names:

```
publish-ch01
publish-changed-chapters
reorganize-ch09-ch10-outline
```

---

## Safety Stops

Stop and ask before proceeding if:

- the requested chapter cannot be found;
- the matching repo folder cannot be found;
- both old and new structural folders exist;
- there are unrelated uncommitted changes;
- answer files would be copied;
- images would need migration;
- the import would delete or overwrite unexpected files;
- the build fails;
- `book-deploy` fails;
- the chapter number in the source does not match the target;
- the user requested structural changes without a branch;
- there is ambiguity between dated source files;
- the workflow would create dated production files alongside stable production files.

---

## Final Response Format

After a dry run:

```
Dry run completed. No files were changed.

Would publish:
- [list files/components]

Would skip:
- [list unchanged files/components]

Warnings:
- [warnings, if any]
```

After a successful publish:

```
Done. Published ChXX using the chapter-publish workflow.

Imported:
- [files/components]

Logged:
- edit-log.md
- source-import-manifest.csv
- chNN-edits.md if needed
- chapter-tracker.md if updated

Build:
- passed through book-deploy

Deployment:
- GitHub push completed; Vercel deployment triggered automatically.
```

If the workflow stops:

```
Stopped before publishing.

Reason:
- [specific reason]

No files were pushed.
```

---

## Implementation Note

This skill should remain short and orchestration-focused.

Do not turn it into a replacement for:

- the existing chapter import process;
- `book-deploy`;
- `progress-update`;
- `image-link-optimizer`.

Those tools remain responsible for their own domains.

The old `chapter-sync` skill is legacy/context only unless it is later updated to match the stable-file import architecture.
