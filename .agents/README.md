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
| `chapter-review-codex`    | Repo-canonical final whole-package review orchestrator (no auto-sync or deploy) |
| `chapter-command-center`  | Interactive launcher/router; recommends next step and routes to the right skill |
| `chapter-production-flow` | Full chapter lifecycle orchestrator; delegates review to chapter-review-codex   |
| `chapter-gap-analysis`    | Audit a chapter draft against source materials                                  |
| `chapter-tracker`         | View or update the chapter progress tracker                                     |
| `chapter-docx-build`      | Build a chapter into DOCX with Pandoc                                           |
| `chapter-sync`            | Copy the latest canonical chapter files into the publishing repo                |
| `book-deploy`             | Build and deploy the online reader after `chapter-sync`                         |
| `lets-build-creator`      | Draft or revise a Let's Build companion                                         |
| `reflection`              | Draft Review and Reflection questions                                           |
| `rat-creator`             | Draft RAT/quiz questions with answer key                                        |
| `term-creator`            | Draft or update chapter terms file                                              |
| `autograded-lab`          | Build LMS-ready autograded lab                                                  |
| `lab-creation`            | Build SAM-style PetVax lab                                                      |
| `call-out`                | Insert or audit callout/admonition blocks                                       |
| `chapter-media`           | Unified image pipeline: suggest → place → optimize → upload → rewrite           |
| `chapter-media-inventory` | Used/unused image tracking, CSV inventories, galleries (read-only)              |
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
  - Run the final package review: `/chapter-review-codex chNN`
- Typical chapter flow: `/chapter-editor` → `/chapter-media` → `/chapter-docx-build`
- Final pre-publish flow: `/chapter-review-codex chNN` (orchestrates the above
  plus terms, outline coverage, and DOCX readiness; no auto-sync or deploy)
- Audit and tracking flow: `/chapter-gap-analysis` → `/edits` →
  `/progress-update` → `/chapter-tracker`
- Single-stage image work: `/figure-suggestion`, `/image-placement`, or
  `/image-link-optimizer`

## Source of Truth

Files in this directory are authoritative.

Do not maintain editable duplicate agent or skill files in Google Drive,
platform-pilot folders, or temporary documentation folders.

## External Assets

Large image assets remain under:

`G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images`

Agent skills may reference that path, but should not duplicate the image
library inside the Git repository.
