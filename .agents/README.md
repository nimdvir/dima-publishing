# Project Agents and Skills

This directory is the canonical location for all AI-agent instructions,
skills, workflows, validation rules, and automation specifications for the
DIMA Publishing repository.

## Structure

- `agents/` — role-level agent instructions
- `skills/` — reusable task-specific skills
- `prompts/` — reusable prompt templates
- `reference/` — supporting reference material
  - `active/` — currently referenced by active skills
  - `legacy/` — superseded or historical references
- `templates/` — shared YAML, Markdown, CSV, and report templates
- `schemas/` — machine-readable schemas
- `scripts/` — agent-support utilities
- `archive/` — superseded skills (not for active use)

## BITM330 Database Book Skills

Invoke any skill by name (for example `/chapter-editor`). Each skill has a
`SKILL.md` under `skills/<name>/`.

The unified image pipeline is `chapter-media`, a plan-first workflow that
replaces the old 3-stage split (`figure-suggestion` → `image-placement` →
`image-link-optimizer`). The individual stage skills remain available for
single-stage work.

| Skill                     | Use when                                                                        |
| ------------------------- | ------------------------------------------------------------------------------- |
| `chapter-editor`          | Full developmental edit of a chapter main file (editorial quality gate)         |
| `chapter-editor-light`    | Light grammar/clarity pass, preserve voice                                      |
| `chapter-editor-cursor`   | Superseded reference editor; prefer `chapter-editor`                            |
| `chapter-review-codex`    | Deprecated final review command; use `chapter-final-check`                      |
| `chapter-command-center`  | Interactive launcher/router; recommends next step and routes to the right skill |
| `chapter-production-flow` | Full chapter lifecycle orchestrator; delegates readiness to chapter-final-check |
| `chapter-final-check`     | Final readiness checker for DOCX, import, build, and deploy readiness           |
| `chapter-gap-analysis`    | Audit a chapter draft against source materials                                  |
| `chapter-tracker`         | View or update the chapter progress tracker                                     |
| `chapter-docx-build`      | Build a chapter into DOCX with Pandoc                                           |
| `chapter-source-import`   | Current safe Drive-to-repo import gate for stable source files                  |
| `chapter-sync`            | Legacy dated-file sync route; use only when explicitly needed                   |
| `book-deploy`             | Build and deploy the online reader after approved import/readiness checks       |
| `book-workflow-routing`   | Workflow router: chapter-editor → source-import → final-check → book-deploy     |
| `lets-build-creator`      | Draft or revise a Let's Build companion                                         |
| `reflection`              | Draft Review and Reflection questions                                           |
| `rat-creator`             | Draft RAT/quiz questions with answer key                                        |
| `term-creator`            | Draft or update chapter terms file                                              |
| `autograded-lab`          | Build LMS-ready autograded lab                                                  |
| `lab-creation`            | Build SAM-style PetVax lab                                                      |
| `call-out`                | Insert or audit callout/admonition blocks                                       |
| `chapter-media`           | Unified image pipeline: suggest → place → optimize → upload → rewrite           |
| `chapter-media-inventory` | Used/unused image tracking, CSV inventories, galleries (read-only)              |
| `image-prompt`            | Generate figure prompt blocks, placements, Figures Index, and CSV image tracker |
| `figure-suggestion`       | Stage 1 only: insert figure suggestion blocks per sub-section                   |
| `image-placement`         | Stage 2 only: place or generate local figures with captions                     |
| `image-link-optimizer`    | Stage 3 only: optimize, upload to Cloudinary, rewrite links                     |
| `pandoc-video`            | Generate video embed snippets for Pandoc                                        |
| `pandoc-extensions`       | Choose Pandoc extensions for DOCX output                                        |
| `notebooklm`              | Generate NotebookLM slide/infographic prompts                                   |
| `notebooklm-video`        | Generate NotebookLM chapter preview video prompts                               |
| `edits`                   | Manage per-chapter `.edits` files                                               |
| `progress-update`         | Log progress to the rolling edit log                                            |
| `daily-work-log`          | Generate a full dated Markdown work log                                         |

## Common Workflows

- Orchestration entry points (pick by how much help you want):
  - Start with guidance: `/chapter-command-center chNN`
  - Run a guided production lifecycle: `/chapter-production-flow chNN`
  - Run the final package review: `/chapter-final-check chNN`
- Typical chapter flow: `/chapter-editor` → `/chapter-media` → `/chapter-docx-build`
- Active production flow: `/chapter-editor` → `/chapter-source-import` →
  `/chapter-final-check` → `/book-deploy`
- Workflow routing reference: `/book-workflow-routing` (defines the canonical workflow,
  marks chapter-sync as legacy, and maps index imports through import-index-approved)
- Drive-side chapter index import: `/chapter-source-import import-index-approved`
- Final pre-publish flow: `/chapter-final-check chNN` (checks package readiness,
  outline coverage, media, companions, DOCX, import, and deploy readiness; no auto-sync
  or deploy)
- Audit and tracking flow: `/chapter-gap-analysis` → `/edits` →
  `/progress-update` → `/chapter-tracker`
- Prompt-first image work: `/image-prompt` → `/image-placement` → `/image-link-optimizer`
- Single-stage image work: `/image-prompt`, `/figure-suggestion`, `/image-placement`, or
  `/image-link-optimizer`

Follow-up: `chapter-final-check` still needs a routing cleanup pass because parts of that
skill may still refer to `chapter-sync` as the active sync tool. Do not update it during
small `chapter-editor` / `chapter-media` instruction passes unless explicitly approved.

## Source of Truth

Files in this directory are authoritative.

Do not maintain editable duplicate agent or skill files in Google Drive,
platform-pilot folders, or temporary documentation folders.

## External Assets

Large image assets remain under:

`G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images`

Agent skills may reference that path, but should not duplicate the image
library inside the Git repository.
