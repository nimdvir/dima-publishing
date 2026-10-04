---
name: pandoc-extensions
description: >
  Choose Pandoc Markdown extensions and command profiles based on output goals, especially DOCX
  workflows. Use when: deciding which extensions to enable/disable; picking a portable DOCX
  command profile; comparing markdown, gfm, and commonmark_x; resolving DOCX rendering gaps with
  fallback patterns (alerts as blockquotes, columns as tables); converting GitHub-flavored Markdown
  for DOCX delivery.
argument-hint: Target output format (docx, html, epub) and source flavor (markdown, gfm, commonmark_x) — or a question about a specific extension or rendering gap.
---

# Pandoc Extensions Skill

## Purpose

Use this skill when authoring or converting Markdown with Pandoc and you need to decide:

- which extensions to enable or disable,
- which syntax is portable to DOCX,
- and which command profile to use for `markdown`, `gfm`, or `commonmark_x`.

For a fast lookup version with just the most-used extensions and copy-paste presets, see the support file [`cheat-sheet.md`](cheat-sheet.md) in this folder.

## Fast Rules

- For broad Markdown features in DOCX, start with `markdown+fenced_divs+native_divs+header_attributes+link_attributes+footnotes+citations+mark`.
- For GitHub alert parsing, use `gfm+alerts`.
- For DOCX portability, prefer rendered blockquotes and table fallbacks over layout-specific container syntax.

## Command Profiles

### Profile A — DOCX portable default

```bash
pandoc input.md -f markdown+fenced_divs+native_divs+header_attributes+link_attributes+footnotes+citations+mark -t docx -o output.docx
```

### Profile B — GFM alerts focus

```bash
pandoc input.md -f gfm+alerts+mark -t docx -o output.docx
```

### Profile C — CommonMark with targeted extras

```bash
pandoc input.md -f commonmark_x+attributes+mark -t docx -o output.docx
```

## Extension Catalog (All Listed Extensions + When To Use)

| Extension | When to use |
| --- | --- |
| `abbreviations` | When you want abbreviation definitions and expanded forms in output. |
| `alerts` | When parsing GitHub-style alert markers such as `[!NOTE]` in gfm workflows. |
| `all_symbols_escapable` | When you need wider escape behavior for punctuation-heavy content. |
| `amuse` | When converting AmuseWiki-compatible markdown inputs. |
| `angle_brackets_escapable` | When content includes literal angle brackets that must not parse as tags. |
| `ascii_identifiers` | When heading IDs must be ASCII-safe for strict linking targets. |
| `attributes` | When attaching attributes in CommonMark-family parsing. |
| `auto_identifiers` | When you want automatic heading IDs for links and references. |
| `autolink_bare_uris` | When bare URLs should auto-convert to links. |
| `backtick_code_blocks` | When fenced code blocks use backticks. |
| `blank_before_blockquote` | When enforcing strict spacing before blockquotes. |
| `blank_before_header` | When enforcing strict spacing before headings. |
| `bracketed_spans` | When applying inline classes/attributes via span syntax. |
| `citations` | When using citation keys and citeproc bibliography rendering. |
| `citations (docx)` | When relying on docx reader behavior for citation parsing. |
| `citations (org)` | When relying on org reader behavior for citation parsing. |
| `citations (typst)` | When relying on typst reader behavior for citation parsing. |
| `definition_lists` | When writing glossary-like term/definition blocks. |
| `east_asian_line_breaks` | When line wrapping should respect East Asian line-breaking conventions. |
| `element_citations` | When citations are represented as structured elements. |
| `emoji` | When shortcode emoji should convert to emoji output. |
| `empty_paragraphs` | When blank paragraph preservation matters. |
| `escaped_line_breaks` | When escaped line endings should create explicit line breaks. |
| `example_lists` | When numbered example list syntax is needed. |
| `fancy_lists` | When ordered lists need richer numbering marker handling. |
| `fancy_lists (org)` | When org-source list behavior requires fancy marker support. |
| `fenced_code_attributes` | When fenced code blocks need classes, IDs, or attributes. |
| `fenced_code_blocks` | When using fenced rather than indented code blocks. |
| `fenced_divs` | When using fenced containers for structure or semantic blocks. |
| `footnotes` | When adding footnote references/definitions. |
| `four_space_rule` | When list indentation should follow a strict four-space rule. |
| `gfm_auto_identifiers` | When heading IDs must match GitHub-style generation. |
| `grid_tables` | When tables require stronger structure than simple/pipe tables. |
| `gutenberg` | When converting Project Gutenberg-oriented sources. |
| `hard_line_breaks` | When each source line break should be preserved as hard break. |
| `header_attributes` | When headings need explicit IDs/classes/attributes. |
| `ignore_line_breaks` | When soft line wraps should collapse in paragraph flow. |
| `implicit_figures` | When standalone images should become figures with captions. |
| `implicit_header_references` | When referencing headings without explicit link definitions. |
| `inline_code_attributes` | When inline code spans need attributes. |
| `inline_notes` | When inline footnote-style notes are preferred. |
| `intraword_underscores` | When underscores inside words should not trigger emphasis. |
| `latex_macros` | When LaTeX macro interpretation in math/content is needed. |
| `line_blocks` | When preserving line-wise structure in poetry/script-like text. |
| `link_attributes` | When links need target/rel/class or custom attributes. |
| `lists_without_preceding_blankline` | When lists should parse without a preceding blank line. |
| `literate_haskell` | When parsing/writing literate Haskell documents. |
| `mark` | When highlight syntax `==text==` is required. |
| `markdown_attribute` | When markdown attribute marker forms are needed. |
| `markdown_in_html_blocks` | When markdown should be parsed inside allowed HTML blocks. |
| `mmd_link_attributes` | When MultiMarkdown link attribute syntax is used. |
| `mmd_title_block` | When MultiMarkdown title block metadata is present. |
| `multiline_tables` | When table cells need wrapped multiline content. |
| `native_divs` | When preserving div containers as native AST elements. |
| `native_numbering` | When native numbering behavior should be preserved. |
| `native_spans` | When preserving span containers as native AST elements. |
| `ntb` | When format-specific NTB parsing behavior is needed. |
| `old_dashes` | When legacy dash parsing compatibility is required. |
| `pipe_tables` | When using compact pipe table syntax. |
| `raw_attribute` | When embedding raw-format blocks/spans with explicit targets. |
| `raw_html` | When passing through raw HTML where writer supports it. |
| `raw_markdown` | When embedding raw markdown chunks intentionally. |
| `raw_tex` | When passing through raw TeX/LaTeX where supported. |
| `rebase_relative_paths` | When relative links must be rebased across source locations. |
| `short_subsuperscripts` | When using shorthand sub/superscript forms. |
| `shortcut_reference_links` | When shortcut reference link syntax is preferred. |
| `simple_tables` | When simple fixed-width table style is sufficient. |
| `space_in_atx_header` | When enforcing space after `#` in ATX headings. |
| `spaced_reference_links` | When tolerant spacing in reference link definitions is needed. |
| `special_strings (org)` | When org-source special token handling is needed. |
| `sourcepos` | When source position metadata is needed for diagnostics/tools. |
| `startnum` | When ordered list start numbers must be preserved. |
| `strikeout` | When `~~strikeout~~` syntax is required. |
| `styles` | When style metadata support is needed for compatible formats. |
| `subscript` | When subscript syntax like `H~2~O` is needed. |
| `superscript` | When superscript syntax like `x^2^` is needed. |
| `table_attributes` | When tables need IDs/classes/attributes. |
| `table_captions` | When explicit table captions are required. |
| `tagging` | When tagging metadata behavior is needed. |
| `task_lists` | When using checklist list items (`- [ ]`, `- [x]`). |
| `tex_math_dollars` | When parsing TeX math with dollar delimiters. |
| `tex_math_double_backslash` | When parsing display math with double-backslash delimiter style. |
| `tex_math_gfm` | When math handling should align with gfm behavior. |
| `tex_math_single_backslash` | When parsing math with single-backslash delimiter style. |
| `wikilinks_title_after_pipe` | When wiki link title placement after pipe is needed. |
| `xrefs_name` | When cross-references by name label are required. |
| `xrefs_number` | When cross-references should use numbering metadata. |

## Practical Guidance

- If a feature is not rendering in DOCX, treat the syntax as source-only and provide a DOCX-safe fallback pattern in the manuscript.
- For alerts in DOCX, use blockquote plus bold label style as the reliable fallback.
- For columns in DOCX, use a two-column table as the reliable fallback.
