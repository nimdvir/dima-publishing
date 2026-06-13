---
name: chapter-production-flow
description: >
  End-to-end production orchestrator for BITM330 database-book chapters.
  Use when planning, editing, producing companions, handling media, logging work,
  tracking status, running final review, and building DOCX across the full chapter
  lifecycle. Delegates final whole-package review to chapter-review-codex and
  delegates domain work to specialized skills.
---

# Chapter Production Flow

`chapter-production-flow` is the end-to-end conductor for producing a BITM330 chapter.

It is **not** a replacement for `chapter-review-codex`.

- Use `chapter-command-center` when you want guidance on what to do next or which skill to launch.
- Use `chapter-production-flow` when managing the whole lifecycle.
- Use `chapter-review-codex` when running the final whole-package review.
- Use specialized skills for actual domain work.

## When NOT To Use This Skill

Use a more specific skill when your task is narrow:

- Single editing or authoring task: use the specialized skill directly (for example `chapter-editor`, `lets-build-creator`, `lab-creation`, `term-creator`, `reflection`, `rat-creator`, or `call-out`).
- Final whole-package review only: use `chapter-review-codex`.
- DOCX build only: use `chapter-docx-build`.
- You just want guidance on what to do next or which skill to launch: use `chapter-command-center`.

Use `chapter-production-flow` only when you need to run the full multi-step chapter lifecycle and coordinate several skills in sequence.

## Argument Hint

Accept a chapter number, chapter folder, source path, or mode:

```text
ch01
ch02 plan-only
ch03 edit-main
ch04 companions
ch05 media
ch06 final-review
ch07 docx
ch08 status
books/database-book/files/source/chapters/ch01-introduction-to-course
```

## Core Model

Use the smallest appropriate skill.

| Need | Use |
|---|---|
| Edit main prose | `chapter-editor` or `chapter-editor-light` |
| Audit draft against source materials | `chapter-gap-analysis` |
| Fix callouts | `call-out` |
| Create/revise Let's Build | `lets-build-creator` |
| Create/revise lab | `lab-creation` |
| Build LMS autograded lab | `autograded-lab` |
| Create/revise RAT | `rat-creator` |
| Create/revise review/reflection | `reflection` |
| Create/revise terms | `term-creator` |
| Inventory media | `chapter-media-inventory` |
| Place/manage media | `chapter-media` |
| Optimize/upload/rewrite image links | `image-link-optimizer` |
| Log session history | `progress-update` |
| Track chapter-specific unresolved items | `edits` |
| Track status across chapters | `chapter-tracker` |
| Final whole-package review | `chapter-review-codex` |
| Build DOCX | `chapter-docx-build` |
| Choose Pandoc extensions/profile for DOCX | `pandoc-extensions` |
| Get guidance / route to the right skill | `chapter-command-center` |
| Manage the whole lifecycle | `chapter-production-flow` |

The repository source is canonical:

```text
books/database-book/files/source
```

Do not overwrite stable repo source from Google Drive drafts unless the user explicitly asks for compare/merge/import work.

Reports go under:

```text
books/database-book/.reports/
```

Operational records go under:

```text
books/database-book/.edits/
```

---

# When To Use The Operational Skills

## `progress-update`

Use `progress-update` for the chronological record of what happened.

It answers:

```text
What did we do today?
What did we finish?
What decision did we make?
What should future-me know?
```

Typical file:

```text
books/database-book/.edits/edit-log.md
```

Use it after meaningful work sessions:

- after editing a chapter;
- after fixing media;
- after revising companions;
- after final review;
- after DOCX build;
- after a major decision.

Example:

```markdown
## 2026-06-11

- [x] Edited Chapter 1 core concepts for flow and clarity.
- [x] Confirmed Lab 1 uses `index.md` as canonical student-facing source.
- [ ] Follow up: verify Chapter 1 DOCX styling once reference DOCX path is confirmed.
```

Use `progress-update` for **history**.

## `edits`

Use `edits` for chapter-specific unresolved items and editorial memory.

It answers:

```text
What still needs attention in this chapter?
What did we defer?
What decision is specific to this chapter?
```

Typical file:

```text
books/database-book/.edits/chNN-edits.md
```

Use it for:

- unresolved author comments;
- chapter-specific follow-ups;
- deferred content decisions;
- media issues specific to a chapter;
- terms/lab/RAT/reflection issues specific to a chapter;
- DOCX blockers specific to a chapter.

Use `edits` for **chapter memory**.

## `chapter-tracker`

Use `chapter-tracker` for cross-chapter production status.

It answers:

```text
Where is each chapter in the pipeline?
What phase is done?
What is blocked?
What is next?
```

Typical file:

```text
books/database-book/.edits/chapter-tracker.md
```

Use it when a chapter changes status:

- draft started;
- main edit complete;
- companions complete;
- media complete;
- final review complete;
- DOCX built;
- blocked / unblocked.

Use `chapter-tracker` for **pipeline status**.

## `chapter-docx-build`

Use `chapter-docx-build` to export a stable chapter package to Word.

Use it only after:

- content is stable enough;
- companion files are ready or intentionally excluded;
- final review has run, or the user explicitly wants a draft DOCX;
- answer files are excluded;
- navigation-only indexes are excluded unless requested;
- reference DOCX/styling assumptions are clear.

Typical output:

```text
books/database-book/files/source/chapters/chNN-slug/.build/chNN-full-YYYY-MM-DD.docx
```

Use `chapter-docx-build` for **output generation**, not editing or review.

---

# Supported Modes

```text
plan-only
status
edit-main
companions
media
terms
final-review
docx
logs-only
full-flow
handoff
```

If no mode is provided, present this menu:

```text
## Chapter Production Flow — chNN

1. Plan chapter work only (plan-only)
2. Show current chapter status (status)
3. Edit main chapter (edit-main)
4. Build or audit companion files (companions)
5. Handle media (media)
6. Terms and term appendix (terms)
7. Run final whole-package review (final-review)
8. Build DOCX (docx)
9. Update logs/tracker only (logs-only)
10. Full production flow (full-flow)
11. Produce handoff summary (handoff)
```

Do not write files before presenting a plan and receiving approval.

---

# Phase 0 — Production Preflight

Before doing work:

1. Resolve chapter number and folder.
2. Identify requested mode.
3. Confirm canonical source files exist.
4. Identify matching lab folder.
5. Check current `.edits` records.
6. Check existing `.reports` records.
7. Check existing DOCX builds.
8. Search for answer-file exposure risks.
9. Identify specialized skills needed.
10. Print proposed plan and wait for approval.

Preflight table:

```markdown
## Chapter Production Preflight — chNN

| Area | Path / Skill | Status | Notes |
|---|---|---|---|
| Chapter folder | `books/database-book/files/source/chapters/chNN-slug/` | found / missing |  |
| Lab folder | `books/database-book/files/source/labs/lab-NN-slug/` | found / missing / n/a |  |
| Main chapter | `core-concepts.md` | found / missing |  |
| Let's Build | `lets-build.md` | found / missing |  |
| Terms Treasury | `terms-treasury.md` | found / missing |  |
| Review/Reflection | `review-questions.md` | found / missing |  |
| RAT | `rat.md` | found / missing |  |
| Answer-file risks | `books/database-book/files/source/**` | none / found |  |
| Edit notes | `.edits/chNN-edits.md` | found / missing |  |
| Chapter tracker | `.edits/chapter-tracker.md` | found / missing |  |
| Existing reports | `.reports/chNN-*` | found / missing |  |
| Existing DOCX | `.build/chNN-full-*.docx` | found / missing |  |
```

Approval prompt:

```markdown
Approve this production plan? Reply: yes / changes / dry run only.
```

---

# Phase 1 — Plan and Status

Use when the user asks what to do next.

Mode distinctions:

- `status` reports the current state of the chapter only. No recommendations, no edits.
- `plan-only` inspects the current state and recommends next steps. No edits.
- `handoff` summarizes what happened this session and what comes next (see Phase 9).

For a deeper audit of the draft against its source materials, use `chapter-gap-analysis`.

Actions:

1. Read current chapter files.
2. Read edit notes and tracker.
3. Summarize current status.
4. Recommend next step.
5. Do not edit source files unless separately approved.

Output:

```markdown
## Chapter NN Production Plan

| Area | Status | Recommended Next Step |
|---|---|---|
| Main chapter | draft / edited / reviewed / blocked | ... |
| Let's Build | ... | ... |
| Lab | ... | ... |
| Terms | ... | ... |
| Review/Reflection | ... | ... |
| RAT | ... | ... |
| Media | ... | ... |
| Final Review | ... | ... |
| DOCX | ... | ... |
```

---

# Phase 2 — Main Chapter Editing

Use:

```text
chapter-editor
```

or for quick polish:

```text
chapter-editor-light
```

Scope:

```text
core-concepts.md
```

After editing:

1. summarize changes;
2. record unresolved items in `chNN-edits.md`;
3. add session summary with `progress-update`;
4. update `chapter-tracker` if status changed.

---

# Phase 3 — Companion Production

Use:

| Component | Skill |
|---|---|
| Let's Build | `lets-build-creator` |
| Lab | `lab-creation` |
| Autograded Lab | `autograded-lab` |
| Terms Treasury | `term-creator` |
| Review/Reflection | `reflection` |
| RAT | `rat-creator` |

Safety reminders:

- Do not create companion content inside the chapter index.
- Do not place answer files under `books/database-book/files/source`.

Domain rules (Lab uses PetVax, Let's Build uses the Grading Database, canonical Lab 1 `index.md`, and dated lab-question merge/cleanup) are owned by the companion skills above and verified by `chapter-review-codex`. Do not restate them here.

After companion work:

1. run companion alignment check;
2. log with `progress-update`;
3. update `chNN-edits.md` for unresolved chapter-specific issues;
4. update `chapter-tracker`.

---

# Phase 4 — Media Production

Use:

```text
chapter-media-inventory
chapter-media
image-link-optimizer
```

Rules:

- Inventory first, then place, then optimize and rewrite links.
- Media side effects (writes, optimization, Cloudinary upload) require dry-run approval; never overwrite or delete originals.

Detailed media behavior (Cloudinary folders and path conventions, provenance in `books/database-book/files/manifests/image-manifest.csv`, optimization, and link rewriting) is owned by `chapter-media`, `chapter-media-inventory`, and `image-link-optimizer`. Do not restate it here.

After media work:

1. write report under `.reports/`;
2. log with `progress-update`;
3. record unresolved media issues in `chNN-edits.md`;
4. update `chapter-tracker`.

---

# Phase 5 — Terms and Appendix

Use:

```text
term-creator
```

Tasks:

- review `terms-treasury.md`;
- mark first meaningful occurrence only;
- use `.term-highlight` only if CSS is verified for the active build target;
- update `books/database-book/files/source/appendices/term-mega-table.md`;
- log unresolved term decisions in `chNN-edits.md`;
- update tracker if status changed.

---

# Phase 6 — Operational Records

Run this phase after any meaningful production work.

## 6.1 Progress Log

Use `progress-update` for:

```text
books/database-book/.edits/edit-log.md
```

Record:

- what happened;
- files touched;
- decisions;
- blockers;
- next step.

## 6.2 Chapter Edit Notes

Use `edits` for:

```text
books/database-book/.edits/chNN-edits.md
```

Record:

- unresolved author comments;
- chapter-specific follow-ups;
- deferred decisions;
- content questions;
- media issues;
- companion issues;
- DOCX blockers.

## 6.3 Chapter Tracker

Use `chapter-tracker` for:

```text
books/database-book/.edits/chapter-tracker.md
```

Record:

- status across chapters;
- phase completion;
- blockers;
- next action;
- production readiness.

Do not put generated reports in `.edits`.

---

# Phase 7 — Final Whole-Package Review

Delegate to:

```text
chapter-review-codex
```

Use when:

- main chapter has been edited;
- companions exist or intentional gaps are documented;
- lab is ready or intentionally deferred;
- media is ready or intentionally flagged;
- you need one final report across the package;
- you want pre-DOCX validation.

After `chapter-review-codex`:

1. add final-review summary to `edit-log.md`;
2. move unresolved chapter items into `chNN-edits.md`;
3. update `chapter-tracker`;
4. proceed to DOCX only if no blocking issues remain or user approves draft export.

---

# Phase 8 — DOCX Build

Use:

```text
chapter-docx-build
```

Run only after:

- final review is complete; or
- the user explicitly asks for draft DOCX.

File selection, input order, exclusions (lab answer files, navigation-only chapter index, dated/superseded files, generated reports, hidden manifests), the reference DOCX, and the output path are owned by `chapter-docx-build`. For Pandoc extension and command-profile choices, see `pandoc-extensions`. Do not restate them here.

After DOCX build:

1. confirm output exists;
2. record output path;
3. log with `progress-update`;
4. record build/style issues in `chNN-edits.md`;
5. update `chapter-tracker`.

Do not deploy after DOCX.

---

# Phase 9 — Final Handoff

End each production session with:

```markdown
## Chapter NN Production Handoff

### Completed This Session
- ...

### Files Changed
- ...

### Reports / Builds Created
- ...

### Logs / Tracker Updated
- `books/database-book/.edits/edit-log.md`
- `books/database-book/.edits/chNN-edits.md`
- `books/database-book/.edits/chapter-tracker.md`

### Current Status
| Area | Status | Notes |
|---|---|---|
| Main chapter | ... | ... |
| Companions | ... | ... |
| Media | ... | ... |
| Terms | ... | ... |
| Final review | ... | ... |
| DOCX | ... | ... |

### Blockers
- ...

### Next Recommended Step
- ...
```

---

# Safety Rules

1. Do not overwrite source from Google Drive.
2. Do not create dated files in repo canonical source.
3. Do not leave answer files under `books/database-book/files/source`.
4. Do not put generated reports in `.edits`.
5. Do not run media side effects without dry-run approval.
6. Do not run DOCX before content is stable unless the user requests a draft export.
7. Do not deploy, publish, commit, push, merge, or run `book-deploy`.
8. Do not run `chapter-sync` unless explicitly requested as a separate legacy/import task.
9. Do not duplicate final-review logic already owned by `chapter-review-codex`.
10. Do not duplicate domain rules owned by specialized skills.
11. Do not claim production completion if unresolved blockers remain.
12. When uncertain, document the uncertainty in `chNN-edits.md` and in the handoff.

---

# Final Response Contract

```markdown
## Chapter NN Production Flow Complete

**Mode:** plan-only / status / edit-main / companions / media / terms / final-review / docx / logs-only / full-flow / handoff

### Work Completed
- ...

### Specialized Skills Used
- ...

### Operational Records Updated
- Progress log: yes/no
- Chapter edits: yes/no
- Chapter tracker: yes/no

### Reports / Builds Created
- ...

### Current Chapter Status
| Area | Status | Next Step |
|---|---|---|
| Main chapter | ... | ... |
| Companions | ... | ... |
| Media | ... | ... |
| Terms | ... | ... |
| Final review | ... | ... |
| DOCX | ... | ... |

### Blockers / Unresolved Items
- ...

### Next Recommended Step
- ...

### Deployment Run
No.
```
