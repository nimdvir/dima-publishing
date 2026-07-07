# Textbook Site Build Pipeline — Full Reference

> Mapped 2026-07-06. Covers the complete path from Drive chapter drafts to the live reader at `https://data-pilot.dimapublishing.com/`.

---

## Architecture Overview

```
Drive Drafts  ──►  chapter-source-import  ──►  Repo Source  ──►  generateBookData  ──►  Vite/React  ──►  Vercel
(Google Drive)     (compare-first gate)        (stable named)     (content assembly)      (bundler+UI)      (deploy)
```

---

## Stage 1 — Drive Drafts (writing workspace)

**Location:** `G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\`

Each chapter has its own folder with dated files:

```
chNN-chapter-name/
  main/
    chNN-main-YYYY-MM-DD.md      ← current draft (latest date wins)
    chNN-main-YYYY-MM-DD.md      ← snapshots / history
  lets-build/
    chNN-lets-build-YYYY-MM-DD.md
  terms/
    chNN-terms-YYYY-MM-DD.md
  reflection/
    chNN-reflection-YYYY-MM-DD.md
  rat/
    chNN-rat-YYYY-MM-DD.md
```

- Conventions: `chNN-part-YYYY-MM-DD.md`, Grade 8–10 reading level, professional/warm/direct instructor voice
- Author comments (`// NOTE:`) = follow and remove; unresolvable → `<!-- VERIFY: ... -->`

---

## Stage 2 — chapter-source-import (safety gate)

**Skill:** `/chapter-source-import chNN`

Compare-first reconciliation workflow:

1. Compares Drive drafts against repo source files
2. Classifies changes (new content, drift, conflicts)
3. Only imports safe updates
4. Updates `source-import-manifest.csv` and `chapter-section-status.md`
5. Handles answer-key exposure fixes

---

## Stage 3 — Repo Source (stable named files)

**Location:** `dima-publishing/books/database-book/files/source/chapters/`

```
chNN-chapter-name/
  index.md              ← chapter title page / intro
  core-concepts.md      ← main chapter body
  lets-build.md         ← hands-on activities
  review-questions.md   ← reflection/review
  terms-treasury.md     ← vocabulary
  rat.md                ← readiness assessment test
```

These are the **canonical build inputs** for the reader.

---

## Stage 4 — generateBookData.ts (content assembly)

**Script:** `scripts/generateBookData.ts`  
**Trigger:** `npm run generate` (also runs before `npm run dev` and `npm run build`)

### What it does

1. Scans chapters 1–17 + labs 1–15 + front matter + appendices
2. Resolves each section via fallback chain: **stable file** → **dated fallback** → **chapter fallback** → **placeholder**
3. Splits content on `<!-- page-break -->` markers into pages
4. Derives page nav titles from H2/H3 headings
5. Excludes files matching edit/draft/outline/concept/scratch/backup/archive patterns
6. Writes everything into `src/generated/bookData.ts`

### Incremental

Uses `.generation-manifest.json` with SHA-256 hashes. Skips if nothing changed. Use `--force` to bypass.

---

## Stage 5 — Vite + React (the reader app)

### Project map

```
reader-hybrid-v1.1/
  index.html              ← SPA shell
  package.json            ← deps + scripts
  vite.config.ts          ← bundler config (React, port 3000)
  vercel.json             ← deploy config (SPA rewrites)
  src/
    main.tsx / App.tsx    ← entry + routing
    styles.css            ← all styling
    generated/
      bookData.ts         ← AUTO-GENERATED content
    components/           ← 18 React components
    content/              ← courseOutline.ts (metadata)
    lib/                  ← Supabase, auth, progress
    utils/                ← headings extraction
  scripts/
    generateBookData.ts   ← content assembly
    validateAccessConfig.ts
  public/                 ← static assets
  dist/                   ← BUILD OUTPUT (deployed)
```

### Tech stack

| Layer | Technology |
|---|---|
| Build | Vite 5 + @vitejs/plugin-react |
| UI | React 18 + TypeScript |
| Markdown | react-markdown + remark-gfm + rehype-raw |
| Animations | motion (Framer Motion) |
| Icons | lucide-react |
| Auth/DB | @supabase/supabase-js |
| Hosting | Vercel (SPA, all routes → index.html) |

### npm scripts

| Script | Purpose |
|---|---|
| `npm run dev` | generate + Vite dev server on `localhost:3000` (HMR) |
| `npm run build` | validate:access + generate + vite build → `dist/` |
| `npm run generate` | Run content assembly only (incremental) |
| `npm run preview` | Serve `dist/` locally on port 3000 |
| `npm run lint` | TypeScript type-check |

---

## Stage 6 — Vercel (deployment)

**Live URL:** `https://data-pilot.dimapublishing.com/`

- Deployed as a static SPA
- All requests rewrite to `index.html` (React Router handles client-side routing)
- Git-push triggers automatic deployment

---

## How to edit what

| You want to... | Go here | Then run |
|---|---|---|
| Edit chapter prose | Drive `chapter-drafts/chNN/main/` → `/chapter-source-import` | `npm run build` |
| Fix a typo in published content | `files/source/chapters/chNN/core-concepts.md` | `npm run build` |
| Add a page break | `files/source/chapters/chNN/*.md` (insert `<!-- page-break -->`) | `npm run build` |
| Change sidebar/nav/layout | `src/components/Layout.tsx` or `Sidebar.tsx` | `npm run dev` |
| Change reading view | `src/components/ChapterReader.tsx` | `npm run dev` |
| Change home page | `src/components/HomePage.tsx` | `npm run dev` |
| Change all styling | `src/styles.css` | `npm run dev` |
| Change auth/login | `src/lib/supabaseClient.ts` or `courseAccess.ts` | `npm run dev` |
| Add a new chapter | `files/source/chapters/` + `src/content/courseOutline.ts` + update CHAPTERS array in `generateBookData.ts` | `npm run build` |
| Change routing | `src/App.tsx` | `npm run dev` |
| Change chapter metadata | `src/content/courseOutline.ts` | `npm run dev` |

---

## Three copies of every chapter

| Copy | Location | Purpose |
|---|---|---|
| **Draft** | Drive `chapter-drafts/chNN/` (dated files) | Writing workspace |
| **Source** | Repo `files/source/chapters/chNN/` (stable names) | Canonical build input |
| **Embedded** | `src/generated/bookData.ts` (auto-generated) | What actually ships |

---

## Production workflow

```
/chapter-editor chNN
    ↓
/chapter-source-import chNN
    ↓
/chapter-final-check chNN
    ↓
/book-deploy
```

Never skip from edit to deploy. Import is compare-first, never blind overwrite.
