---
name: Database Book Online Reader
status: superseded by platform-pilots/evaluation.md
created: 2026-05-26
overview: Historical plan for a Python static-site builder. The current direction is to keep requirements, source, and pilots separate; evaluate existing reader prototypes against the canonical six-file chapter source contract; and only then choose a production online-reader base.
todos:
  - id: scaffold
    content: Scaffold this `database-book/` folder with README.md, requirements.txt, build.py skeleton, .gitignore
    status: pending
  - id: schema
    content: Define `source/book.yaml` and per-chapter `chapter.yaml` schemas
    status: pending
  - id: mockup
    content: Create mockup MD files (main, lets-build, terms, reflection, rat, lab) for the first 3 chapters with placeholder content
    status: pending
  - id: theme
    content: "Build theme reusing the warm cream/green palette from BITM330-book-drive/book-platform/app/static/styles.css: base.html, chapter.html, index.html, sidebar partial, progress partial, reader.css, markdown.css, reader.js"
    status: pending
  - id: builder
    content: "Implement `build.py`: render MD to HTML, rewrite image paths, inject sidebar + progress bar, output `dist/`"
    status: pending
  - id: preview
    content: Add `serve.py` local preview, run smoke build, verify sidebar + progress bar work end-to-end against the mockup chapters
    status: pending
  - id: archive
    content: Archive existing `BITM330-book-drive/book-platform/` to `BITM330-book-drive/archive/book-platform-2026-05-26/`
    status: pending
  - id: cleanup_stale
    content: Delete the stale plan copy at `BITM330-book-drive/.github/plans/database-book-plan.md` (saved earlier in the wrong location)
    status: pending
---

# Superseded Notice

This plan is historical and should not be treated as the current canonical implementation plan.

The current direction is documented in:

```text
platform-pilots/evaluation.md
```

Current project logic:

```text
chat-gpt/docs/          = product requirements and future platform roadmap
files/source/chapters/  = canonical chapter source
platform-pilots/*       = implementation experiments to evaluate
```

The intended stable chapter contract is:

```text
files/source/chapters/chNN-slug/
  index.md
  core-concepts.md
  lets-build.md
  review-questions.md
  terms-treasury.md
  rat.md
```

Do not start the Python `build.py` implementation below unless this older plan is intentionally revived.

# Database Book -- Online Reader Plan

## Goal

A self-contained, portable book project that:

1. Holds the book's source MD files and images inside it.
2. Has a Python build script that converts each MD file to an HTML page.
3. Outputs a static reader (HTML/CSS/JS) with a left navigation sidebar and a reading-progress bar.
4. Lives here in the `dima-publishing` repo (not BITM330-book-drive), so it is publishable independently.
5. Replaces the older `book-platform/` in the BITM330-book-drive workspace (which has the sidebar but no progress bar and reads from `BITM330-Book-draft/chapter-drafts/` instead of being self-contained).

## Two repos involved

- **Source repo (current Cursor workspace):** `g:\My Drive\0-Projects\!-important\BITM330-book-drive\` -- holds the existing `book-platform/` (to be archived) and the manuscript drafts in `BITM330-Book-draft/chapter-drafts/`.
- **Target repo (this one):** `C:\Users\nd115232\Documents\GitHub\dima-publishing\` -- the standalone publishing repo. The `books/database-book/` folder already exists but is empty; this is where everything below gets created.

## Decisions confirmed

- Project location: `dima-publishing/books/database-book/` (this folder)
- First pass content: mockup MD files for the first 3 chapters (placeholders), not a full migration
- Theme: keep the warm cream/green palette from `BITM330-book-drive/book-platform/app/static/styles.css`

## Proposed folder structure

All paths below are relative to this `database-book/` folder.

```
database-book/                      # = dima-publishing/books/database-book/
├── PLAN.md                         # This plan
├── README.md                       # How to build, preview, and deploy
├── requirements.txt                # markdown, Jinja2, PyYAML, python-frontmatter
├── build.py                        # Main static-site builder: source/ -> dist/
├── serve.py                        # Optional tiny `python -m http.server` wrapper for local preview
├── .gitignore                      # Ignore dist/, .venv/, __pycache__
│
├── source/                         # ALL content lives here (self-contained, portable)
│   ├── book.yaml                   # Book title, author, chapter order, theme settings
│   ├── front-matter/
│   │   ├── cover.md                # Mockup placeholder
│   │   ├── acknowledgments.md      # Mockup placeholder
│   │   └── table-of-contents.md    # Auto-generated; can also be hand-edited
│   ├── chapters/                   # Initially: ch01, ch02, ch03 only (mockup content)
│   │   ├── ch01-introduction-to-course/
│   │   │   ├── chapter.yaml        # number, title, ordered list of parts
│   │   │   ├── main.md             # Mockup placeholder
│   │   │   ├── lets-build.md       # Mockup placeholder
│   │   │   ├── terms.md            # Mockup placeholder
│   │   │   ├── reflection.md       # Mockup placeholder
│   │   │   ├── rat.md              # Mockup placeholder
│   │   │   ├── lab.md              # Mockup placeholder
│   │   │   └── images/             # Per-chapter images, referenced as `images/foo.png`
│   │   ├── ch02-mis-and-bitm/      # Same structure, mockup content
│   │   └── ch03-what-is-data/      # Same structure, mockup content
│   └── shared/
│       └── images/                 # Cover art, logos, cross-chapter figures
│
├── theme/                          # Reader UI (templates + assets)
│   ├── templates/
│   │   ├── base.html               # Header, sidebar slot, content slot, footer
│   │   ├── index.html              # Book home (cover + chapter grid)
│   │   ├── chapter.html            # Chapter/part page with sidebar + progress bar
│   │   └── partials/
│   │       ├── sidebar.html        # Left nav: collapsible chapter list with parts nested
│   │       └── progress.html       # Top progress bar markup
│   └── assets/
│       ├── css/
│       │   ├── reader.css          # Layout, sidebar, progress bar
│       │   └── markdown.css        # Typography for rendered article body
│       └── js/
│           └── reader.js           # Scroll-based progress %, sidebar collapse, prev/next keys
│
└── dist/                           # Build output (gitignored, fully self-contained static site)
    ├── index.html
    ├── chapters/
    │   ├── ch01-introduction-to-course/
    │   │   ├── main.html
    │   │   ├── lets-build.html
    │   │   ├── ...
    │   └── ...
    ├── images/                     # Copied from source/**/images/
    └── assets/                     # Copied from theme/assets/
```

## How a page is built

```mermaid
flowchart LR
    A[source/book.yaml] --> B[build.py]
    C[source/chapters/chXX/chapter.yaml] --> B
    D[source/chapters/chXX/*.md] --> B
    E[theme/templates/chapter.html] --> B
    B --> F[Parse front matter + render MD to HTML]
    F --> G[Rewrite image paths to /images/...]
    G --> H[Inject sidebar nav + progress bar]
    H --> I[dist/chapters/chXX/PART.html]
    J[theme/assets/] --> K[Copy to dist/assets/]
    L[source/**/images/] --> M[Copy to dist/images/]
```

## Reader features (rendered into every chapter page)

- Left sidebar: collapsible chapter list, with parts (`main`, `lets-build`, `terms`, `reflection`, `rat`, `lab`) nested under each chapter; active chapter and part highlighted.
- Progress bar: thin bar fixed at top of viewport that fills as the reader scrolls through the current part, plus a small "Ch 5 of 17" indicator in the sidebar.
- Prev/Next buttons at bottom of each part (keyboard left/right also works via `reader.js`).
- Mobile-responsive: sidebar collapses to a hamburger drawer on narrow screens.

## Key file responsibilities

All paths below are inside this `database-book/` folder.

- `build.py`: orchestrates the whole build. Adapts the front-matter stripping and image-link rewriting logic from `BITM330-book-drive/book-platform/app/content.py` but writes static HTML files instead of serving them.
- `source/book.yaml`: single source of truth for chapter order and book-level metadata.
- `source/chapters/chXX-*/chapter.yaml`: per-chapter metadata (number, title, parts) so we don't rely on parsing folder names.
- `theme/templates/chapter.html`: the reader page template (sidebar + content + progress bar slots).
- `theme/assets/css/reader.css`: ports the cream/green palette from `BITM330-book-drive/book-platform/app/static/styles.css` and adds the progress-bar styles.
- `theme/assets/js/reader.js`: scroll-based progress bar, sidebar collapse, prev/next keyboard nav.

## Mockup content (first pass)

Three chapters scaffolded with mockup MD content so the build pipeline and reader UI can be verified end-to-end before any real content is migrated:

- `ch01-introduction-to-course/`
- `ch02-mis-and-bitm/`
- `ch03-what-is-data/`

Each gets all six parts (`main.md`, `lets-build.md`, `terms.md`, `reflection.md`, `rat.md`, `lab.md`) populated with short Lorem-ipsum-style placeholder text plus a few realistic structural elements (a heading, a paragraph, a bullet list, a code fence, a table, an image reference) so we exercise every rendering path. Real content can be dropped into these files later -- the structure stays the same.

Real-content migration from `BITM330-book-drive/BITM330-Book-draft/chapter-drafts/` into `dima-publishing/books/database-book/source/chapters/` is deferred to a follow-up pass once the reader is working.

## Existing `book-platform/` handling

After the new `database-book/` is working, archive `BITM330-book-drive/book-platform/` by moving it to `BITM330-book-drive/archive/book-platform-2026-05-26/` (matches the existing `archive/` convention in that workspace) and deleting the original.

## Stale plan copy to clean up

Earlier a copy of this plan was saved at `BITM330-book-drive/.github/plans/database-book-plan.md` based on a misread of "save it in the github folder". That location is wrong now -- the canonical plan lives here at `dima-publishing/books/database-book/PLAN.md`. The misplaced file should be deleted in the execution phase.

## Implementation order (todos)

1. Scaffold this `database-book/` folder with `README.md`, `requirements.txt`, `build.py` skeleton, `.gitignore`.
2. Define `source/book.yaml` and per-chapter `chapter.yaml` schemas.
3. Create mockup MD files (six parts) for `ch01-introduction-to-course/`, `ch02-mis-and-bitm/`, `ch03-what-is-data/`.
4. Build the theme reusing the warm cream/green palette: `base.html`, `chapter.html`, `index.html`, sidebar + progress partials, `reader.css`, `markdown.css`, `reader.js`.
5. Implement `build.py`: walk `source/`, render each MD to a templated HTML page, rewrite image paths, copy assets, write `dist/`.
6. Add `serve.py` for local preview, run a smoke build, verify sidebar + progress bar work end-to-end against the mockup chapters.
7. Archive the old `BITM330-book-drive/book-platform/` to `BITM330-book-drive/archive/book-platform-2026-05-26/`.
8. Delete the stale plan copy at `BITM330-book-drive/.github/plans/database-book-plan.md`.

---

A working copy of this plan also lives in the Cursor session at `c:\Users\nd115232\.cursor\plans\online_book_reader_636e172e.plan.md`. **This file (`PLAN.md`) is the canonical, repo-tracked version.** Keep both in sync if edits are made.
