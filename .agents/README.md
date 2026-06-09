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

## Source of Truth

Files in this directory are authoritative.

Do not maintain editable duplicate agent or skill files in Google Drive,
platform-pilot folders, or temporary documentation folders.

## External Assets

Large image assets remain under:

`G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images`

Agent skills may reference that path, but should not duplicate the image
library inside the Git repository.
