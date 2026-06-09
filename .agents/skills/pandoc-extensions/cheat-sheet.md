# Pandoc Extensions Cheat Sheet

> Support file for the `pandoc-extensions` skill (`SKILL.md` in this folder).

## Use This For

- Fast extension decisions without reading the full catalog.
- Choosing DOCX-safe patterns for alerts and columns.
- Copy-paste command presets.

## Quick Start Decision Flow

1. Need maximum DOCX reliability:
   - Use `markdown+fenced_divs+native_divs+header_attributes+link_attributes+footnotes+citations+mark`.
   - Use blockquotes (bold labels) for alerts.
   - Use tables for side-by-side columns.

2. Need GitHub alert parsing:
   - Use `gfm+alerts+mark`.
   - Expect style degradation in DOCX unless template styles are applied.

3. Need strict CommonMark behavior:
   - Use `commonmark_x+attributes+mark`.

## High-Value Extensions (Most Common)

| Extension | Use when |
| --- | --- |
| `mark` | You need highlight syntax `==text==`. |
| `footnotes` | You need footnotes in manuscript or assignments. |
| `citations` | You cite sources and want citeproc output. |
| `fenced_divs` | You need semantic block containers. |
| `native_divs` | You need div containers preserved in AST flow. |
| `header_attributes` | You need heading IDs/classes. |
| `link_attributes` | You need link-level attributes. |
| `task_lists` | You need checklists. |
| `definition_lists` | You need glossary-style definitions. |
| `table_captions` | You need explicit table captions. |
| `table_attributes` | You need IDs/classes on tables. |
| `gfm_auto_identifiers` | You need GitHub-like heading IDs. |
| `implicit_header_references` | You want heading links without manual definitions. |
| `tex_math_dollars` | You need dollar-delimited math parsing. |
| `raw_html` | You intentionally pass HTML through to supported writers. |

## DOCX-Safe Patterns

### Alerts

Use rendered blockquotes with bold labels:

> **Note:** General context.
> **Warning:** Risk or caveat.

### Two Columns

Use a two-column markdown table for reliable DOCX output:

| Left | Right |
| --- | --- |
| Text content | Image or secondary text |

## Command Presets

### Portable DOCX default

```bash
pandoc input.md -f markdown+fenced_divs+native_divs+header_attributes+link_attributes+footnotes+citations+mark -t docx -o output.docx
```

### GFM alerts parse path

```bash
pandoc input.md -f gfm+alerts+mark -t docx -o output.docx
```

### CommonMark-focused path

```bash
pandoc input.md -f commonmark_x+attributes+mark -t docx -o output.docx
```

## Limits To Remember

- GitHub alert markers may remain literal in DOCX depending on reader profile.
- Native Markdown columns are not guaranteed as true side-by-side layout in DOCX.
- CSS styles apply to HTML output, not native DOCX styling.

## Full Skill

For complete extension-by-extension guidance, see `SKILL.md` in this folder.
