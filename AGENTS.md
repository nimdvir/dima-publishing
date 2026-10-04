<!-- generated from database-textbook-github, do not edit -->

# BITM330 Database Textbook — Agent Instructions

Book: *Using Data to Drive Business Performance: Databases and Management
Information Systems.* Arc: Data → Tables → Relationships → Queries →
Analytics → Decisions.

This file is the single source of truth for agent behavior across all
BITM330 workspaces. Keep it under 120 lines — situational detail belongs
in `.agents/reference/`, loaded only when a trigger below matches.

## Instruction precedence

1. Explicit user instructions in the current session
2. This file
3. `.agents/reference/*.md` — on demand, per the triggers below
4. `.agents/skills/*/SKILL.md` — Claude Code and Copilot agents only

## Workspace map

| Workspace | Root | Role |
|-----------|------|------|
| `data-book` | `G:\My Drive\0-Projects\!-important\data-book\` | Active manuscript root (`book-source/`), skills (`.agents/`), outlines, media |
| `database-book-project` | `C:\Users\nd115232\github\database-book-project\` | Active deployment repository: web reader app & Vercel deployment |
| `database-textbook-github` | `C:\Users\nd115232\github\database-textbook-github\` | Reference repository & central AGENTS.md sync source |
| `dima-publishing` | `C:\Users\nd115232\Documents\GitHub\dima-publishing\` | LEGACY / archive platform code (v1), historical skills & published source |
| `BITM330-book-drive` | `G:\My Drive\0-Projects\!-important\BITM330-book-drive\` | LEGACY. Image library and historical drafts only |
| `BITM330` | `G:\My Drive\1. Academic\Teaching\Albany\BITM330\` | Live course root. Student data. Off limits to book work |
| `knowledge-base` | `C:\Users\nd115232\Documents\GitHub\knowledge-base\` | Personal research notes |

Full tree: `data-book/.00-START-HERE/WORKSPACE-MAP.md`. Read before any
cross-workspace file operation.

## Canonical locations

Locations are folders, not files — filenames change, folders don't.

| What | Where |
|------|-------|
| Agent instructions | `data-book/AGENTS.md` (synced with `database-textbook-github/AGENTS.md`) |
| Active Skills & Personas | `data-book/.agents/skills/` and `data-book/.agents/agents/` |
| Reference docs | `data-book/.agents/reference/` and `database-textbook-github/.agents/reference/` |
| Active Manuscript | `data-book/book-source/` (`chapters/`, `labs/`, `appendices/`) |
| Book outline | `data-book/.project/outlines/canonical/` |
| Chapter manuscript | `data-book/book-source/chapters/NN-slug/content/main/` |
| Chapter outlines | `data-book/book-source/chapters/NN-slug/.planning/outlines/` |
| Chapter edits | `data-book/book-source/chapters/NN-slug/.edits/` |
| Media inventories | `data-book/media/inventory/` |
| Live Deployment Platform | `database-book-project/` (Vite/React reader live on Vercel) |

Write targets are named: progress log → `data-book/.project/edits/progress-tracker.md`.

### Choosing a file inside a canonical folder

1. Prefer the file with no date and no model name — that is the
   canonical one (e.g. `chNN-target-outline.md`).
2. If every file is dated, use the highest date.
3. Model tags (`-claude-`, `-GPT-`, `-DeepSeek-`, `-GLM-`) mark generated
   drafts. Never authoritative, even if newest.
4. If two files could plausibly be canonical, list them and ask. Never
   merge them silently, and never edit both.

## Hard rules

- **Student data never leaves `BITM330/`.** Not into this repo, not into
  Notion, not into a prompt. Never edit `BITM330/` from book workflows.
- **No secrets committed.** No `.env`, tokens, or API keys.
- **Editing vs. Deployment**: All content editing takes place in `data-book` (`G:\My Drive\0-Projects\!-important\data-book`). All web application builds, code changes, and live publishing/deployments take place in `database-book-project` (`C:\Users\nd115232\github\database-book-project`).
- **`dima-publishing` is READ-ONLY** (legacy archive). Copy from it;
  never modify it.
- **Never delete files.** Propose deletions, list them, and stop.
- **Never rewrite content that already exists in usable form.** Move or
  reference it. Rewriting is how canonical copies fork.
- **Ignore `desktop.ini`** — Google Drive sync artifact, never content.
- **Author comments**: Lines starting with `//` in Markdown are
  instructions. Follow them, then remove the line. If unresolvable,
  convert to `<!-- VERIFY: ... -->`.
- **SQL**: Confirm target platform before editing (SQLite, Access,
  SQL Server, PostgreSQL). Never rewrite binary files (`.accdb`).
  Preserve table and field names unless correcting a clear error.
- **Log completion**: At session end or when asked, update
  `data-book/.project/edits/progress-tracker.md` with what was done.

## Efficiency rules (apply to every task)

Token cost scales with what an agent reads and repeats. Compute is free.

- **Before doing the same operation more than ~20 times, write a script
  instead.** Renames, moves, conversions, extractions, counts, link
  checks — all script work. Say in one line which route you chose.
- **Locate before reading.** Use glob and grep to find the relevant files
  and line ranges, then read only those ranges. Never read a whole
  chapter to answer a question about one section.
- **Never paste file contents back to me** to show what you found.
  Summarize, and cite path + line numbers.
- **Bulk results go to a file, not the chat.** Write CSV or JSON to
  `scripts/output/`, then report counts and exceptions only.
- **Hybrid by default**: script first to gather and filter, human or
  model judgment only on the shortlist. Never judge the full set when a
  filter can shrink it.
- **Save reusable scripts** to `scripts/` with a one-line header comment
  so the next session re-runs instead of re-writes.
- **Destructive or bulk operations run as a dry run first.** Print the
  plan, stop, wait for explicit approval.
- **Don't re-read** files already read this session.

## When to load reference files

Conditions, not labels — load the file when the condition matches.

- Before editing chapter prose → `.agents/reference/writing-rules.md`
- Before changing anything in Cloudinary or media paths →
  `.agents/reference/media-rules.md`

*(Add lines only when the file exists — dangling pointers cause invention.)*

## Bridges

- **Claude Code** reads `CLAUDE.md`, which contains only `@AGENTS.md`.
- **Copilot Chat** reads `.github/copilot-instructions.md`, which points
  here. DeepSeek and Grok running inside Copilot inherit it.
- **Codex, Gemini CLI, Cursor** read this file natively.
- Synced copies in other workspace roots are stamped generated; edit
  only the copy in `database-textbook-github`.
