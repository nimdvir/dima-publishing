# Architecture Reference

---

## Content Model

```
Chapter
  → Reader Area (6 per chapter)
      → Markdown Subsections (H2/H3)
          → Page Segments (split by <!-- PAGE BREAK -->)
```

### Reader Areas

1. Introduction
2. Core Concepts
3. Let's Build
4. Review Questions
5. Terms Treasury
6. RAT: Reading Test

---

## Generator Pipeline

```
files/source/chapters/*.md
  → scripts/generateBookData.ts (build-time)
  → src/generated/bookData.ts
  → React application (ReactMarkdown)
  → Rendered textbook
```

The application does not read Markdown at runtime. It reads repository Markdown during `npm run generate`, converts content into TypeScript data, and bundles it into the Vite application.

### File Resolution Order

1. Try stable filename (e.g. `core-concepts.md`)
2. Try dated fallback (e.g. `ch01-main-2026-06-03.md`)
3. Special introduction behavior (extract from main before first page break)
4. Placeholder: "This section is not available yet."

### Generator State

| Generator | Chapters | Page splitting | Labs | Incremental |
|---|---|---|---|---|
| reader-hybrid-v1.1 | Hard-coded to 4 | Yes | Yes (4 labs) | Yes (hash manifest) |
| cursor-online-reader | Auto-discovers all `ch\d+` | No | No | No |

Both prefer stable filenames first, then fall back to dated patterns.

### Dated Fallback Patterns

```
^chNN-main-\d{4}-\d{2}-\d{2}\.md$
^chNN-lets-build-\d{4}-\d{2}-\d{2}\.md$
^chNN-reflection-\d{4}-\d{2}-\d{2}\.md$
^chNN-terms-\d{4}-\d{2}-\d{2}\.md$
^chNN-rat-\d{4}-\d{2}-\d{2}\.md$
```

### Exclusion Filter

```
/edit|edits|rewrite|rewritten|draft|outline|concept|notes|scratch|backup|archive|termtreasury/i
```

### Page-Break Markers

```
<!-- PAGE BREAK -->
<!-- pagebreak -->
<!-- page-break -->
<div class="page-break"></div>
<div style="page-break-after: always;"></div>
```

### Known Bug

Lab chapter-fallback hash check uses wrong base path (`SOURCE_LABS` instead of `SOURCE_CHAPTERS`). A forced generation still loads the content correctly, but incremental detection is unreliable for chapter-fallback labs. Fix when expanding beyond 4 labs.

---

## Cloudinary / Image Strategy

### Keep originals on Drive

```
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\
```

Do not copy the image library into `dima-publishing`.

### Use stable Cloudinary folder slugs

```
database-book/chapters/database-design/       ← good
database-book/ch09/                            ← avoid
```

Stable slugs survive chapter renumbering.

### Image Manifest

```
files/manifests/image-manifest.csv
```

Columns: `asset_id`, `chapter_id`, `figure_number`, `source_path`, `source_sha256`, `cloudinary_public_id`, `cloudinary_url`, `alt_text`, `caption`, `status`, `last_uploaded`

### Markdown Image References

- **Short-term:** Direct Cloudinary URLs in Markdown
- **Long-term:** Stable asset tokens (e.g. `{{ image:data-to-decisions }}`) resolved by build script through `image-manifest.csv`

---

## What to Adopt from Each Prototype

### From google-ai-studio (visual only)

- White workspace, zinc shell, sticky white header
- Icon-based section navigation
- Collapsible sidebar concept
- Motion-based cover entrance
- Progress/status visual pattern

### From reader-hybrid-alt (parts only)

- Heading extraction (`slugifyHeading`, `uniqueId`, `extractHeadingToc`)
- H2/H3 anchor IDs
- Skip link
- YouTube iframe allowlist with blocked-embed fallback
- Empty-state handling

### Do NOT adopt

- google-ai-studio hardcoded `CHAPTERS` data or `chaptersData.ts`
- "Main Concepts" label — always use **Core Concepts**
- reader-hybrid-alt warm paper/teal/gold palette
- React 19 or Vite 6 from alt
- Alt sidebar design wholesale

---

## Repository Target Structure (after Phase 2)

```
books/database-book/
├── book.yml                              # build config
├── CHANGELOG.md                          # publication milestones
├── files/
│   ├── source/
│   │   ├── outline/
│   │   │   ├── book-outline.md
│   │   │   └── chapter-registry.yml
│   │   ├── chapters/
│   │   │   ├── ch01-introduction-to-course/
│   │   │   │   ├── core-concepts.md
│   │   │   │   ├── lets-build.md
│   │   │   │   ├── review-questions.md
│   │   │   │   ├── terms-treasury.md
│   │   │   │   └── rat.md
│   │   │   ├── ch02-mis-and-bitm/
│   │   │   │   └── ...
│   │   │   └── ...  (17 chapters)
│   │   └── labs/
│   │       ├── lab-01-petvax-intro/
│   │       │   └── index.md
│   │       └── ...
│   ├── manifests/
│   │   ├── source-import-manifest.csv
│   │   ├── image-manifest.csv
│   │   └── build-manifest.json
│   └── generated/                        # .gitignored
├── scripts/
│   ├── import-latest-drafts.ps1
│   └── validate-source.ps1
├── docs/
│   └── workflow.md
└── platform-pilots/
    ├── reader-hybrid/                    # v1 (deployed)
    ├── reader-hybrid-v1.1/              # v1.1 (this sprint)
    ├── reader-hybrid-v2/                # v2A (future)
    ├── cursor-online-reader/
    ├── google-ai-studio/                # visual reference only
    └── reader-hybrid-alt/               # parts donor only
```
