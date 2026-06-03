# Cursor Online Reader (Prototype)

A local, deployable web reader for the database textbook. It reads Markdown chapter files from the canonical book source folder and renders them as an interactive online textbook.

The generator prefers stable section filenames when they exist. Dated `chNN-*` files are temporary fallback inputs only and should be removed from the generator once chapter-sync emits the six stable platform files.

## What this does

- Discovers chapter folders under `books/database-book/files/source/chapters/`
- Loads six sections per chapter (Introduction, Core Concepts, Let's Build, Review Questions, Terms Treasury, RAT: Reading Test)
- Renders Markdown with GFM, tables, code blocks, images, HTML callouts, and YouTube iframes
- Provides a collapsible sidebar, previous/next navigation, and mobile-friendly layout

## Markdown source

Content is read from:

```text
books/database-book/files/source/chapters/
```

Each chapter folder should follow this contract:

```text
chNN-slug/
├── index.md
├── core-concepts.md
├── lets-build.md
├── review-questions.md
├── terms-treasury.md
└── rat.md
```

**Introduction (`index.md`):** For now, `index.md` is treated as the Introduction section. If `index.md` is only a hub page, the reader still renders it as Introduction rather than reconstructing introduction from the dated main file.

**Temporary fallback bridge:** Until chapter-sync emits all six stable filenames for every chapter, `npm run generate` falls back to the latest dated files below. This bridge is not the destination contract. Remove dated fallbacks from the generator once stable files exist.

| Section | Stable filename | Temporary dated fallback |
|---|---|---|
| Introduction | `index.md` | *(none — placeholder only)* |
| Core Concepts | `core-concepts.md` | latest `chNN-main-YYYY-MM-DD.md` |
| Let's Build | `lets-build.md` | latest `chNN-lets-build-*` |
| Review Questions | `review-questions.md` | latest `chNN-reflection-*` |
| Terms Treasury | `terms-treasury.md` | latest `chNN-terms-*` |
| RAT | `rat.md` | latest `chNN-rat-*` |

## Install

```bash
cd books/database-book/platform-pilots/cursor-online-reader
npm install
```

## Generate book data

Embeds chapter Markdown into `src/generated/bookData.ts`:

```bash
npm run generate
```

`npm run dev` and `npm run build` run generate automatically first.

Future: `USE_DATED_FALLBACK=false` could disable dated fallbacks once every chapter has stable filenames (not implemented yet).

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional deep links: `?chapter=ch01&section=core-concepts`

## Build

```bash
npm run lint
npm run build
npm run preview
```

## Known limitations

- Full Markdown is inlined at build time (large `bookData.ts` for many chapters)
- Introduction is always `index.md` (even when it is only a hub page); it never falls back to the dated main file
- No authentication, Stripe, Supabase, search, notes, or progress persistence
- Local prototype only; deployment (Vercel or GitHub Pages) is a follow-up step

## Stack

React, Vite, TypeScript, react-markdown, remark-gfm, rehype-raw, rehype-sanitize
