---
name: notion-flavored-markdown
description: >
  Formats Notion page content using Notion-flavored Markdown for Notion MCP tools
  (notion-create-pages, notion-update-page, create-attachment). Use when creating or
  updating Notion pages, converting standard Markdown to Notion syntax, writing callouts,
  toggles, tables, mentions, synced blocks, or when the user mentions Notion markdown,
  enhanced markdown, or Notion MCP content fields.
argument-hint: >
  Describe the Notion page/block you want to create or update — e.g.
  "callout with checklist" or "convert this section to Notion markdown"
disable-model-invocation: true
---

# Notion-Flavored Markdown

Format page content for Notion MCP tools (`notion-create-pages`,
`notion-update-page`, `create-attachment`). This skill complements existing
Notion workflow skills (`create-page`, `knowledge-capture`, etc.) — it covers
the **content syntax**, not the API call structure.

## When to Use

- Before writing the `content` field for any Notion MCP page create/update.
- When converting standard or GitHub-flavored Markdown into Notion format.
- When building callouts, toggles, tables, columns, mentions, or synced blocks.
- When the user says "Notion markdown", "enhanced markdown", or references the
  Notion MCP content spec.

## Workflow

1. **Read the spec** — open [reference.md](reference.md) (or fetch the MCP
   resource `notion://docs/enhanced-markdown-spec`) before drafting content.
2. **Title goes in properties only** — set the page title via
   `properties.title`. Never repeat it as a `#` heading inside `content`.
3. **Choose the right update command:**
   - `update_content` (search-and-replace) for targeted edits.
   - `insert_content` to prepend or append.
   - `replace_content` only when rewriting the entire page.
4. **Fetch before editing** — always `fetch` the existing page so `old_str`
   values match exactly.

## Critical Differences from Standard Markdown

These are the rules agents most often get wrong.

### Indentation and whitespace

- **Use tabs** (not spaces) for all nested/child block indentation.
- **Blank lines are stripped.** Use `<empty-block/>` on its own line when you
  need a visual gap.

### Escaping

- Outside code blocks, escape: `\ * ~ ` $ [ ] < > { } | ^`
- Inside fenced code blocks, content is literal — do **not** escape.

### Inline code and quotes

- No raw newlines inside inline code spans. Use `<br>`:
  `` `Line 1<br>Line 2` `` (correct)
- No raw newlines mid-quote. Use `<br>`:
  `> Line 1<br>Line 2` (correct — single multi-line quote)
- A bare `>` on its own line renders an empty blockquote — avoid it.

### Lists

- Every list item must include inline rich text. A list item with no text
  renders as an awkward empty bullet.

### Pages vs mentions

- `<page url="...">` **moves** or **creates** a child page. Removing the tag
  removes the child page.
- `<mention-page url="...">` is an inline reference only — use this when you
  just want to link to a page.
- Same distinction applies to `<database>` vs `<mention-database>`.

### Tables

- Cells contain **rich text only** — no headings, lists, images, or other
  blocks inside cells.
- Use Notion-flavored Markdown formatting (`**bold**`), not HTML tags
  (`<strong>`).
- Cell merging is UI-only; the API cannot create or modify merges.

### Toggles and toggle headings

- Children of `<details>` and toggle headings **must be indented** (tab) or
  they will not appear inside the toggle.

### Meeting notes

- When creating new `<meeting-notes>`, omit `<summary>` and `<transcript>`.
- Only include `<notes>` if the user specifically requests note content.

### Code blocks and Mermaid

- Code block content is literal — write it exactly as it should appear.
- For Mermaid diagrams, wrap labels containing special characters in double
  quotes and use `<br>` for line breaks (not `\n`).

### Attachments

- For files created by `create-attachment`, use the returned `file-upload://`
  URL as the `src` value. Use `<embed>` for HTML attachments, `<file>` for
  other file types.

### Synced blocks

- Omit the `url` attribute when creating a new `<synced_block>` — it will be
  auto-generated.
- Provide `url` when referencing an existing synced block via
  `<synced_block_reference>`.

## Pre-Submit Checklist

Before sending content to a Notion MCP tool, verify:

- [ ] Indentation uses tabs, not spaces
- [ ] Page title is in `properties.title`, not repeated in content
- [ ] `<mention-page>` used for references; `<page>` only for child pages
- [ ] Toggle/callout children are tab-indented
- [ ] No raw newlines inside inline code or mid-quote
- [ ] No HTML tags inside table cells — Notion-flavored Markdown only
- [ ] Attachment sources use `file-upload://` URLs from `create-attachment`
- [ ] No escaping inside fenced code blocks
- [ ] `<empty-block/>` used instead of blank lines where visual gaps are needed

## Full Specification

See [reference.md](reference.md) for the complete Notion-flavored Markdown
syntax, including all block types, color values, mention formats, and advanced
blocks (columns, synced blocks, meeting notes, etc.).
