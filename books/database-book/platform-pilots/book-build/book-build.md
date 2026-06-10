# Book Build Guide

## EPUB: Best Options

### 1. Pandoc (Best for stylish EPUB from Markdown)

Since the project has clean Markdown with emoji callouts, Pandoc gives the most control:

```bash
pandoc chapter-drafts/**/*.md -o bitm330.epub \
  --toc --toc-depth=2 \
  --epub-cover-image=cover.png \
  --css=epub-style.css \
  --metadata title="BITM 330" \
  --metadata author="Dr. Nim Dvir"
```

- **Pros:** Full CSS control, emoji callouts work perfectly, custom fonts, blockquotes styled as colored boxes
- **Cons:** Needs a custom `epub-style.css` and a build script to feed chapters in order
- **Font Awesome:** Won't render — use Section 2 (emoji-only) callouts from [font-awesome.md](font-awesome.md)

### 2. Jupyter Book -> Sphinx-EPUB

The project already has Jupyter Book configured. Sphinx has an EPUB builder:

```bash
jb build BITM330-Book-draft --builder epub
```

- **Pros:** Uses existing [_toc.yml](_toc.yml) and [_config.yml](_config.yml) — no extra config
- **Cons:** Limited EPUB styling control, Sphinx EPUB output tends to look plain, config files are in `.docs/` (not where `jb` expects them)

**Winner: Pandoc** — far more stylish results with CSS control.

---

## Interactive Website: Best Options

| Tool | Fits This Project? | Strengths | Weaknesses |
|------|---|---|---|
| **Jupyter Book** (already set up) | Yes — config exists | Interactive code cells, Sphinx ecosystem, TOC built | Stale build, config location mismatch, heavier |
| **MkDocs + Material theme** | Excellent fit | Beautiful out of the box, search, tabs, admonitions, dark mode, emoji shortcodes | Need to migrate TOC to `mkdocs.yml` |
| **Quarto** | Strong | Built-in callouts, PDF+EPUB+HTML from one source, SQL cell support | Learning curve, different config format |
| **mdBook** | Decent | Fast, Rust-based, simple | No built-in admonitions, limited interactivity |

### Recommendation: Two-Track Approach

#### For the website -> MkDocs Material

The best-looking, lowest-effort option for a polished textbook site:

- Native admonition support that maps perfectly to emoji callouts:
  ```markdown
  !!! tip "Tip"
      Break each SQL clause onto its own line for readability.
  
  !!! warning "Warning"
      A `DELETE` without `WHERE` removes **all rows** permanently.
  ```
- Built-in search, dark mode, code copy buttons, content tabs (SQLite / SQL Server / Access)
- Emoji shortcodes work natively (`:material-database:`)
- Deploy to GitHub Pages with one command

#### For the EPUB -> Pandoc + custom CSS

- Write once in standard Markdown with emoji callouts (Section 2 style)
- Pandoc converts to a polished EPUB with custom stylesheet
- Same source files feed both MkDocs and Pandoc

---

## Proposed Project Structure

```
BITM330-Book-draft/
├── mkdocs.yml          <- website config (TOC, theme, plugins)
├── epub-build.ps1      <- Pandoc script to assemble EPUB in chapter order
├── assets/
│   └── epub-style.css  <- EPUB styling (colored blockquotes, fonts)
├── chapter-drafts/     <- existing content (unchanged)
```

---

## Key Decisions

1. **Jupyter Book vs. MkDocs** for the website — JB is already configured but the build is stale and Material looks significantly better out of the box
2. **Callout format** — MkDocs uses `!!! type` admonitions (easy to convert from `> emoji` blockquotes), while JB uses `{admonition}` directives
3. **Single source** — one Markdown format that works for both EPUB and website, or maintain slight format differences?

---

## Pandoc vs Font Awesome Summary

| Factor | Font Awesome | Emoji |
|---|---|---|
| **PDF (via LaTeX)** | Stripped — `<i>` tags are raw HTML, LaTeX ignores them | Native Unicode |
| **DOCX** | Stripped — Word ignores inline HTML tags | Renders natively |
| **EPUB** | Might work if CSS/font files are bundled | Works natively |
| **HTML** | Works — requires CDN `<link>` | Works everywhere |
| **Markdown preview** | Depends on renderer loading external CSS | Universal |

**Bottom line:** Use emoji callouts (Section 2) for anything going through Pandoc. Reserve Font Awesome (Section 1) for HTML-only destinations (web preview, GitHub Pages, Jupyter Book).
