---
name: book-workflow-routing
description: >
  Clarify the active BITM330 database-book workflow for chapter editing, Drive-to-repo
  import, final readiness checks, and deployment. Use when deciding whether to route work
  to chapter-editor, chapter-source-import, chapter-final-check, book-deploy, chapter-media,
  or legacy chapter-sync. Establishes that chapter-source-import is the current safe
  Drive-to-repo import gate and chapter-sync is legacy/context, not the default post-edit route.
argument-hint: Optional workflow question, chapter number, or file path.
---

# Book Workflow Routing

This skill defines the active workflow for the BITM330 database-book production pipeline.

## Core Rule

`chapter-source-import` is the current safe Drive-to-repo import gate.

`chapter-sync` is legacy/context and should not be the default post-edit route.

Use this active workflow:

```
chapter-editor
→ chapter-source-import
→ chapter-final-check
→ book-deploy
```

For Drive-side chapter index drafts, use:

```
Drive index draft
→ chapter-source-import import-index-approved
→ repo index.md
```

---

## Difference Between `chapter-source-import` and `chapter-sync`

| Skill | Purpose | Direction | Current Status |
|---|---|---|---|
| `chapter-source-import` | Safely reconciles approved Drive drafts into repo stable source files | Drive drafts → repo source | Current canonical import gate |
| `chapter-sync` | Older publishing/sync helper that copies or syncs chapter files toward the platform | Legacy source → platform/reader source | Legacy for this workflow |

---

## Active Routing Model

| Need | Use |
|---|---|
| Edit a main chapter draft | `chapter-editor` |
| Edit a Drive-side chapter index draft | `chapter-editor` in Chapter Index Mode |
| Reconcile approved Drive drafts into repo stable files | `chapter-source-import` |
| Import an approved Drive-side index draft into repo `index.md` | `chapter-source-import import-index-approved` |
| Check final chapter/package readiness | `chapter-final-check` |
| Build or deploy the reader | `book-deploy` |
| Media inventory, placement, optimization, Cloudinary, or image records | `chapter-media` |
| Figure ideas only | `figure-suggestion` |
| Production image prompt blocks | `image-prompt` |
| Callout syntax or callout conversion | `call-out` |
| Log progress | `progress-update` |
| Update cross-chapter status | `chapter-tracker` |

---

## Standard Chapter Flow

Use this sequence for a normal chapter update:

```
1. chapter-editor
   Edit the Drive-side chapter draft.

2. chapter-source-import
   Reconcile and import the approved Drive draft into repo stable source files.

3. chapter-final-check
   Verify package readiness, answer safety, media status, DOCX readiness,
   sync readiness, and deploy readiness.

4. book-deploy
   Build and deploy only after explicit approval.
```

Do not skip directly from `chapter-editor` to deployment.

---

## Index Draft Flow

Drive-side index drafts are editable source files:

```
chapter-drafts/chNN-<slug>/index/chNN-index-YYYY-MM-DD.md
```

They map to repo production files only through explicit approval:

```
books/database-book/files/source/chapters/chNN-<slug>/index.md
```

Use:

```
chapter-source-import import-index-approved
```

Rules:

- Do not edit repo `index.md` directly unless explicitly approved.
- Do not import index drafts as part of the normal five-section content import.
- Do not treat Drive `main/` as the source for repo `index.md`.
- `main/` maps only to `core-concepts.md`.
- `index/` maps to `index.md` only in approved index import mode.

---

## Surgical Skill-Routing Update Plan

When updating routing instructions, modify only the intended files.

For the current routing cleanup, modify only:

```
.agents/skills/chapter-editor/SKILL.md
.agents/skills/chapter-media/SKILL.md
.agents/README.md
```

Do not modify:

```
.agents/skills/chapter-source-import/SKILL.md
```

Reason: `chapter-source-import` already contains the `import-index-approved` model
and may have existing unstaged changes.

Do not modify:

```
chapter content
media files
manifests
publishing state
deployment state
environment variables
```

---

## Follow-Up

`chapter-final-check` still needs a later routing cleanup if it refers to `chapter-sync`
as the active sync tool. Do not include that in the current surgical pass unless the
user explicitly expands scope.

Recommended follow-up:

```
Update chapter-final-check so its routing and recommended commands use:
chapter-source-import → chapter-final-check → book-deploy
rather than active chapter-sync routing.
```
