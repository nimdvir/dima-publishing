---
name: chapter-pdf-review
description: >
  Build a print-optimized PDF for one BITM330 chapter by converting the combined review HTML
  to PDF via Microsoft Edge headless mode, with page breaks, images, and styled callouts.
  Use when: producing a printable chapter PDF for offline reading or grading; generating a PDF
  from the most recent review HTML; creating a printer-ready version of a chapter.
argument-hint: Chapter number (e.g., "5" or "05")
---

# Chapter PDF Review Builder

Build a print-optimized PDF for a BITM330 chapter by converting the existing
review HTML (or generating it first) to PDF using Microsoft Edge headless mode.
Edge renders the full HTML — callouts, Cloudinary images, tables, code blocks —
exactly as a browser would, then prints to a clean PDF with page breaks.

```text
chapter-html-review  →  build the styled HTML
chapter-pdf-review   →  convert that HTML to PDF via Edge headless
```

## When to Use

| Request | Use |
|---|---|
| Build a PDF for ch05 | `chapter-pdf-review 5` |
| PDF from existing HTML (skip rebuild) | `chapter-pdf-review 5 -SkipHtmlBuild` |
| Print-ready chapter for offline reading | `chapter-pdf-review 5` |

## Inputs

- **Chapter number** such as `5` or `05`, or a full chapter folder name.
- Optional `-SkipHtmlBuild` to use the existing review HTML without regenerating.
- Optional `-BuildDate` to set the output date (defaults to today).

## Output

- Per-chapter PDF saved in the chapter folder:
  `books/database-book/files/source/chapters/chNN-name/chNN-review-YYYY-MM-DD.pdf`
- Master review index updated with PDF links:
  `books/database-book/review-index.html`

## Workflow

### 1. Ensure HTML exists

Unless `-SkipHtmlBuild` is specified, run `build-chapter-html.ps1` for the
target chapter first. This guarantees the HTML is current before PDF conversion.

### 2. Resolve HTML file

Find the most recent `chNN-review-YYYY-MM-DD.html` in the chapter folder.

### 3. Convert to PDF via Edge headless

Microsoft Edge headless mode renders the HTML in a virtual browser and prints
to PDF:

```powershell
& msedge --headless --disable-gpu `
  --print-to-pdf="output.pdf" `
  --no-pdf-header-footer `
  --window-size=1280,900 `
  "file:///C:/path/to/review.html"
```

Key flags:
- `--headless` — runs without a visible window.
- `--disable-gpu` — avoids GPU dependencies in headless mode.
- `--print-to-pdf` — outputs directly to PDF.
- `--no-pdf-header-footer` — clean output, no URL or page title headers.
- `--window-size=1280,900` — consistent rendering dimensions.

### 4. Save and update index

- Save to `chNN-review-YYYY-MM-DD.pdf` in the chapter folder.
- Do not overwrite an existing PDF with the same name.
- Call `build-review-index.ps1` to refresh the master index with the new
  PDF link.

### 5. Report

Print the output path, file size, and whether HTML was regenerated.

Example:

```
Built: ch05-review-2026-06-12.pdf  (1.8 MB)
Source HTML: ch05-review-2026-06-12.html
Index updated with PDF link.
```

---

## Print CSS

The review HTML already includes print-optimized CSS:

- `@page { size: letter; margin: 0.75in; }` — US Letter, readable margins.
- `.page-break` class triggers `page-break-before: always` between sections.
- `.back-link` (the "Back to Review Index" nav) is hidden in print.
- Dashed border separators are hidden in print (only page breaks remain).
- Body font size is set to 11pt for comfortable reading.
- Images are constrained to `max-width: 100%`.

These styles are added by `build-chapter-html.ps1` and take effect when Edge
renders for print.

---

## Scope and Limitations

- **Requires Microsoft Edge** (Chromium-based). Available on every Windows 10+
  system. The script searches `msedge` on PATH, then falls back to the standard
  installation path.
- **Requires the review HTML to exist.** Either run `build-chapter-html.ps1`
  first, or let the PDF script call it automatically.
- **Cloudinary images must load.** Edge headless fetches images over HTTP.
  If offline, images will show as broken in the PDF.
- **YouTube iframes render as the video player thumbnail** (Edge headless
  captures the iframe placeholder — videos do not play in PDF).
- **New dated file each run.** Old PDFs are preserved.
- **File size varies.** Chapters with many Cloudinary images produce larger
  PDFs (1–5 MB typical).

---

## Safety Rules

1. Never edit chapter Markdown source files.
2. Never overwrite an existing PDF (dated filenames prevent this).
3. Verify Edge is available before running; fail with a clear message if not.
4. Report missing HTML gracefully with a suggestion to build it first.
5. Always use `--no-pdf-header-footer` for clean output.
