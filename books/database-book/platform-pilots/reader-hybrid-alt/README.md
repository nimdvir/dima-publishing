# Reader Hybrid Alt v1

Frontend-only comparison prototype for the Database Book online reader.

This build lives only in:

```text
books/database-book/platform-pilots/reader-hybrid-alt/
```

It is parallel-safe against the sibling prototype in `platform-pilots/reader-hybrid/`. It uses port `3001` and localStorage key `reader-hybrid-alt:demoUser`.

## Source Folders

The generator reads these canonical source folders without modifying them:

```text
books/database-book/files/source/chapters/ch01-introduction-to-course/
books/database-book/files/source/chapters/ch02-mis-and-bitm/
books/database-book/files/source/chapters/ch03-what-is-data/
books/database-book/files/source/chapters/ch04-databases/
books/database-book/files/source/labs/lab-01-petvax-intro/
books/database-book/files/source/labs/lab-02-petvax-system/
books/database-book/files/source/labs/lab-03-data-types-and-tables/
books/database-book/files/source/labs/lab-04-intro-to-access/
```

## Section Mapping

Each chapter has six reader sections:

```text
Introduction       -> index.md or lead content from latest chNN-main-YYYY-MM-DD.md
Core Concepts      -> core-concepts.md or latest chNN-main-YYYY-MM-DD.md
Let's Build        -> lets-build.md or latest chNN-lets-build-YYYY-MM-DD.md
Review Questions   -> review-questions.md or latest chNN-reflection-YYYY-MM-DD.md
Terms Treasury     -> terms-treasury.md or latest chNN-terms-YYYY-MM-DD.md
RAT: Reading Test  -> rat.md or latest chNN-rat-YYYY-MM-DD.md
```

The Introduction rule intentionally avoids TOC-stub `index.md` files. If `index.md` starts with `# Chapter N`, the generator uses everything before the first `##` from the latest matching main file instead.

## Page Breaks

Reader pages are split only on explicit author markers:

```text
<!-- PAGE BREAK -->
<!-- pagebreak -->
<!-- page-break -->
<div class="page-break"></div>
<div style="page-break-after: always;"></div>
```

Markers are normalized, split, trimmed, and empty segments are dropped.

## Deep Links

Supported query params:

```text
?scope=book&chapter=ch03&section=core-concepts&page=2
?scope=labs&lab=lab-01-petvax-intro
?scope=ai-assistant
?scope=login
```

`scope` is validated against the `ReaderScope` union. Unknown scopes fall back to `welcome`. Invalid chapter/section combinations fall back to a safe first available page. Browser back/forward is implemented with `popstate`.

## Demo Login

The login page is visual only. It collects NetID and Student ID, stores a demo user in React state and `localStorage`, and never asks for a password or payment field.

No backend, no payment, no database, no real auth, and no live AI are included.

## AI Assistant

The assistant is simulated. It stores local messages in component state and returns a fixed prototype response. It makes no network call and uses no API key.

## Markdown Safety

Markdown uses `react-markdown`, `remark-gfm`, `rehype-raw`, and `rehype-sanitize`.

The renderer preserves callout classes and allows YouTube or youtube-nocookie iframes only. Other iframe hosts render as blocked embeds. Script tags, event handlers, inline JavaScript, Vimeo, Loom, and other iframe hosts are not allowed.

## Required Comparison Feature

Each reader page renders a right-rail mini-TOC from H2/H3 headings in the current page Markdown. Links smooth-scroll to generated heading anchors.

## Commands

Run only from this folder:

```text
cd books/database-book/platform-pilots/reader-hybrid-alt
npm install
npm run generate
npm run dev
npm run lint
npm run build
npm run preview
```

Dev and preview both bind to:

```text
http://localhost:3001/
```

## Known Limitations

```text
stable section files may not exist yet -> dated fallbacks used
labs may be empty -> placeholders or chapter fallback
AI assistant is simulated
login is demo-only
no notes / progress / payment / auth persistence
```

## Comparison Rubric

Paste this same rubric into the sibling README when that folder can be edited intentionally:

```text
sections actually resolved (not placeholder) / 24
generator warning count
generator LOC
bundle size after vite build
Lighthouse a11y score on the reader page
subjective: visual polish, code clarity, sidebar UX
```

## Generated Data

`src/generated/bookData.ts` is committed source for the prototype and should be regenerated after source Markdown changes. The generator refuses to exit successfully if any chapter has fewer than 5 of 6 sections marked `exists: true`.

## Prototype Status

Reader Hybrid Alt v1 is not production-ready. It is a frontend-only comparison prototype for choosing a reader direction before MVP-0 wiring.
