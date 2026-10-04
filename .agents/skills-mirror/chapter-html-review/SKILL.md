---
name: chapter-html-review
description: >
  Build a self-contained HTML review page for one BITM330 chapter by combining the 5 source
  sections plus the matching lab into a single styled HTML file using Pandoc, with page breaks
  between sections, a date stamp, and automatic regeneration of the master review index.
  Use when: reviewing a chapter as a complete web page; checking all sections (core-concepts,
  lets-build, review-questions, terms-treasury, rat, lab) in one scroll; preparing a printable
  chapter package.
argument-hint: Chapter number (e.g., "5" or "05")
---

# Chapter HTML Review Builder

Build a single self-contained HTML review page for a BITM330 chapter from the
canonical source files under `books/database-book/files/source/`. The output is
a standalone HTML file you can open in any browser — styled with the
reader-hybrid-v1.1 CSS, with page breaks between sections, and a generation
date comment.

A master `review-index.html` at the book root links to every built review.

```text
chapter-html-review  →  build one chapter's review HTML + refresh index
```

## When to Use

| Request | Use |
|---|---|
| Build a review HTML for ch05 | `chapter-html-review 5` |
| Rebuild the master index only | Run `build-review-index.ps1` standalone |
| Build all chapters | Loop `build-chapter-html.ps1` over chapters 1–17 |

## Inputs

- **Chapter number** such as `5` or `05`, or a full chapter folder name such
  as `ch05-sql`. The skill resolves the chapter folder under
  `books/database-book/files/source/chapters/`.

## Output

- Per-chapter review HTML saved in the chapter folder:
  `books/database-book/files/source/chapters/chNN-name/chNN-review-YYYY-MM-DD.html`
- Master index updated at:
  `books/database-book/review-index.html`

## Workflow

### 1. Resolve the chapter folder

- Accept a chapter number or folder name.
- Match against `books/database-book/files/source/chapters/chNN-*/`.
- If multiple folders match, report and stop.

### 2. Collect source files

Read these files in fixed order from the resolved chapter folder. Every file is
optional — report and skip any that are missing, but continue building.

| Order | File | Section Heading |
|-------|------|-----------------|
| 1 | `core-concepts.md` | Core Concepts |
| 2 | `lets-build.md` | Let's Build |
| 3 | `review-questions.md` | Review & Reflection |
| 4 | `terms-treasury.md` | Terms Treasury |
| 5 | `rat.md` | Readiness Assessment Test |

Skip `index.md` (it is a table-of-contents stub, not chapter content).

### 3. Resolve the lab file

- Find the lab folder matching the chapter number under
  `books/database-book/files/source/labs/lab-NN-*/`.
- Select the **most recent** `lab-NN-questions-YYYY-MM-DD.md` file.
- Do **not** use the answers file — student-facing content only.
- Lab files may contain links to download files. Preserve those links.

### 4. Concatenate with page breaks

Insert a page-break marker between each section:

```html
<div class="page-break"></div>
```

Each section also gets a visible section heading (H2) before its content so
readers see clear section boundaries on screen and in print.

### 5. Convert to HTML with Pandoc

Concatenate all sections into a single temporary Markdown file, then convert:

```powershell
pandoc temp.md `
  -f markdown+fenced_divs+native_divs+header_attributes+link_attributes+raw_html+fenced_code_blocks+fenced_code_attributes+pipe_tables+grid_tables `
  -t html5 `
  -o fragment.html
```

- `raw_html` is essential — it preserves the HTML callout divs, iframes, and
  Cloudinary `<img>` tags already in the source Markdown.
- `fenced_code_blocks` + `fenced_code_attributes` preserve SQL/code blocks.
- `pipe_tables` + `grid_tables` preserve Markdown tables.

Do **not** use `--standalone`. The HTML fragment is wrapped in a custom
template (step 6).

### 6. Wrap in the review template

Wrap the Pandoc HTML fragment in a self-contained document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>chNN — Chapter Review — YYYY-MM-DD</title>
<!-- Generated: YYYY-MM-DD -->
<link rel="stylesheet" href="../../../platform-pilots/reader-hybrid-v1.1/src/styles.css">
<style>
  /* Page break rules for print */
  @media print {
    .page-break { page-break-before: always; }
    .section-heading { page-break-before: always; }
  }
  /* Screen separator */
  .page-break {
    border-top: 2px dashed var(--color-border, #e4e4e7);
    margin: 2rem 0;
  }
  /* Review wrapper */
  .review-body {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }
  .review-header {
    border-bottom: 3px solid var(--color-primary, #4f46e5);
    margin-bottom: 2rem;
    padding-bottom: 0.75rem;
  }
  .review-header h1 {
    font-size: 1.75rem;
    margin: 0 0 0.25rem;
  }
  .review-meta {
    color: var(--color-text-muted, #71717a);
    font-size: 0.85rem;
  }
  .section-heading {
    color: var(--color-primary, #4f46e5);
    border-bottom: 1px solid var(--color-border, #e4e4e7);
    padding-bottom: 0.3rem;
    margin-top: 2.5rem;
  }
  /* Ensure Cloudinary images are responsive */
  .markdown-body img { max-width: 100%; height: auto; }
  /* Video wrapper for YouTube embeds */
  .markdown-body iframe { max-width: 100%; }
</style>
</head>
<body>
<div class="review-body">
  <header class="review-header">
    <h1>Chapter NN: Name — Review</h1>
    <p class="review-meta">Generated: YYYY-MM-DD · Sections: Core Concepts, Let's Build, Review &amp; Reflection, Terms Treasury, RAT, Lab</p>
  </header>
  <div class="markdown-body">
    <!-- Pandoc HTML fragment inserted here -->
  </div>
</div>
</body>
</html>
```

### 7. Save and update index

- Save to `chNN-review-YYYY-MM-DD.html` in the chapter folder.
- Do **not** overwrite an existing file with the same name (dated filenames
  prevent this by default, but verify).
- Call `build-review-index.ps1` to refresh the master index.

### 8. Report

Print the full output path and the number of sections included. List any
sections that were skipped.

Example:

```
Built: ch05-review-2026-06-12.html
Sections: 6/6 (Core Concepts, Let's Build, Review & Reflection, Terms Treasury, RAT, Lab)
Index: books/database-book/review-index.html updated
```

---

## Master Review Index

The index at `books/database-book/review-index.html` is regenerated
automatically after each chapter build. It scans all chapter folders under
`files/source/chapters/` for `chNN-review-*.html` files and lists them in a
sortable table.

To rebuild the index manually:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File ./scripts/build-review-index.ps1
```

The index page links to each chapter's most recent review HTML.

---

## Scope and Limitations

- **Read-only to source files.** Never edits the canonical Markdown.
- **Pandoc must be on PATH.** The script checks and fails with a clear message
  if not found.
- **Lab = questions file only** (student-facing). Answers files are excluded.
- **CSS linked, not inlined.** The review HTML links to the reader-hybrid-v1.1
  `src/styles.css`. If that file moves, update the relative path.
- **New dated file each run.** Old review files are preserved.
- **No live server.** Open the HTML directly in a browser (Ctrl+O or
  double-click).
- **No EPUB/DOCX output.** Use `chapter-docx-build` for DOCX.

---

## Safety Rules

1. Never edit chapter Markdown source files.
2. Never overwrite an existing review HTML (dated filenames prevent this).
3. Never include the lab answers file.
4. Never modify or upload images.
5. Verify Pandoc is available before running; fail with a clear message if not.
6. Report skipped sections so the user knows what is missing.
