---
name: notion-bridge
description: >
  Routing and safety rules for working with the Notion workspace through the
  Notion MCP server (hosted at https://mcp.notion.com/mcp, OAuth). Use when the
  user asks to read, search, create, update, or sync Notion pages/databases;
  when deciding whether content belongs in repo Markdown or Notion; when syncing
  the chapter tracker to a Notion board; when capturing research/notes to Notion;
  or when moving content between repo files and Notion. Enforces the per-content
  source-of-truth map and the hard student-data boundary. For Notion page content
  syntax, defer to the notion-flavored-markdown skill.
argument-hint: >
  Describe the Notion task — e.g. "capture this to my Notion KB", "sync the
  chapter tracker to Notion", or "pull the planning page into a draft".
---

# Notion Bridge

Route Notion work correctly and safely. This skill decides **where content
belongs**, **which direction sync flows**, and **what must never reach Notion**.
It does not cover page-content syntax — for that, use `notion-flavored-markdown`.

## Connection

- Server: `notion` in `dima-publishing/.vscode/mcp.json`
  (`type: http`, `url: https://mcp.notion.com/mcp`).
- Auth: **OAuth only**. Never use a static `secret_...` integration token.
  Never paste tokens into chat, settings, or committed files.
- Scoped to the `dima-publishing` workspace, not the academic course root.
- The integration can only see Notion pages/databases explicitly **shared** with
  it. Keep integration-safe content under a top-level **"VSC-Shared"** area.

## Student-Data Boundary (hard rule)

- **Never** send student data to Notion or to a model: grades, submissions,
  rosters, LMS/Brightspace exports, names tied to performance, or anything from
  the academic course root at
  `G:\My Drive\1. Academic\Teaching\Albany\BITM330\`.
- Do not share student-data pages/databases with the Notion integration.
- If a request would move student data into Notion, stop and ask for explicit
  confirmation and a de-identified alternative.

## Source-of-Truth Map

Decide direction before writing anything.

| Content                              | Source of truth              | Notion role         |
| ------------------------------------ | ---------------------------- | ------------------- |
| Chapter outline / drafts             | Repo/Drive Markdown          | idea mirror         |
| Chapter tracker / todos              | **Notion board**             | canonical tasks     |
| Personal notes / knowledge base      | **Notion**                   | canonical           |
| Course material (syllabus, schedule) | Drive/repo                   | mirror              |
| Data-source & database catalog       | **Notion database**          | canonical reference |
| Student data (grades, submissions)   | Brightspace / academic root  | **excluded**        |

- When repo and Notion disagree, the **source of truth** wins.
- Write to the non-canonical side only as an explicit mirror/export the user
  asked for.

## Workflow

1. **Classify** the content using the map above.
2. **Check the boundary** — if it touches student data, stop (see above).
3. **Pick direction** — read-only lookup, repo->Notion mirror, or Notion->repo
   pull. Only write to the canonical side unless the user asks for a mirror.
4. **Fetch before edit** — always `fetch`/`search` the target Notion page first
   so updates match exactly.
5. **Format** page content with `notion-flavored-markdown` before any
   create/update call.
6. **Confirm writes** — summarize what will change in Notion before creating or
   overwriting pages.

## Common Jobs

- **Capture to KB:** create a page under VSC-Shared (Notion canonical).
- **Tracker sync:** treat the Notion board as canonical for task status; export
  a snapshot to `chapter-tracker.md` on request (one direction at a time).
- **Repo -> Notion mirror:** publish a chapter section as a Notion page for
  review; the repo Markdown stays source of truth.
- **Notion -> repo pull:** fetch a Notion planning page into a dated draft file
  under the correct chapter folder.
- **Data-source lookup:** read the Notion catalog database when writing SQL/data
  chapters; do not write back unless asked.

## Do Not

- Do not run Notion tools against the academic course root.
- Do not create static tokens or bypass OAuth.
- Do not overwrite a Notion page without fetching and confirming first.
- Do not treat `.agents/archive/` guidance as active.

---

## Known MCP Tool Behaviors (verified 2026-07-10)

### create-pages — do not use to place pages inside a wiki

`mcp_notion_mcp_notion-create-pages` with `parentUrl` as a top-level parameter
**creates pages at the workspace root**, not inside the target wiki or database.
This causes orphan pages and duplicates.

**Rule:** Never use `create-pages` to add content to an existing wiki. Instead:
1. Fetch the target page ID with `notion-fetch`.
2. Use `update-page` with `insert_content` or `replace_content` on that ID.

When a new page truly must be created inside a wiki, `create-pages` requires
the `pages` items to use only Notion-native fields — `{"properties": {"title": "..."}}`.
Even then, verify placement by fetching the result immediately.

### update-page — valid commands

Valid `command` values:
`update_properties` | `update_content` | `replace_content` | `insert_content` | `apply_template` | `update_verification`

- `replace_content` uses `new_str` param (not `content`).
- `update_properties` uses a `properties` object with schema field names (e.g. `Page`, `Summary`, `Tags`). `archived` is **not** a schema property — cannot archive via this command.

### Archiving / deleting pages

The MCP cannot delete or archive pages. Workaround: rename the page title to
`🗑️ DELETE ME — <reason>` as a marker for manual deletion in the Notion UI.

### Tools that require Business plan (unavailable)

- `query-database-view`
- `query-meeting-notes`

To list pages in a wiki without Business plan, fetch known page IDs directly
or ask the user to share the URL.

### Key page IDs (📚 Book Project — BITM330)

| Page | ID |
|---|---|
| 📚 Book Project — BITM330 wiki | `318508ab55d7816b85a3c8e942da4cde` |
| ✅ Project TODO | `396508ab55d78108904ef8b6df495764` |
| 📋 Restructure & Plans 2026-07-08 | `397508ab55d7815e9eaac4430fcb388f` |

To append new todo items to ✅ Project TODO:
```
fetch page 396508ab55d78108904ef8b6df495764
update-page command=insert_content page_id=396508ab55d78108904ef8b6df495764
```
