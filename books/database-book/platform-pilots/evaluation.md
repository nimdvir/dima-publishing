# Database Book Reader Prototype Evaluation

**Date:** 2026-06-02  
**Status:** Initial implementation pass  
**Purpose:** Establish the canonical content contract, keep pilots separate, and evaluate which prototype should become the production online-book reader.

## Current Decision

The project should not start from zero and should not automatically promote any single pilot. The current working model is:

```text
chat-gpt/docs/          = product requirements and future platform roadmap
files/source/chapters/  = canonical chapter source
cursor-online-reader/   = simple Markdown reader prototype
ai-studio/              = richer visual/interactive reader prototype
google-ai-studio/       = AI Studio export / UX reference
claude/                 = separate full-stack reference pilot
```

The Claude pilot remains separate. It is useful as a full-stack reference for auth, payments, access grants, notes, and Supabase/Stripe patterns, but it is not the default production foundation for the online book reader.

## Canonical Source Contract

The intended stable source contract for every reader is:

```text
books/database-book/files/source/chapters/chNN-slug/
  index.md             # Introduction
  core-concepts.md     # Core Concepts
  lets-build.md        # Let's Build
  review-questions.md  # Review Questions
  terms-treasury.md    # Terms Treasury
  rat.md               # RAT
```

All reader prototypes should be evaluated against this contract. Transitional dated files may be used as fallbacks while the source folder is still being synced.

## Current Source Status

The source folder is not fully normalized to the six-file contract yet.

| Chapters | Current status |
|---|---|
| `ch01`-`ch04` | Have `index.md` plus five dated fallback files such as `chNN-main-YYYY-MM-DD.md`, `chNN-lets-build-YYYY-MM-DD.md`, `chNN-reflection-YYYY-MM-DD.md`, `chNN-terms-YYYY-MM-DD.md`, and `chNN-rat-YYYY-MM-DD.md`. |
| `ch05`-`ch17` | Chapter folders exist but are currently empty. |

This means a reader can show the first four chapters today if it supports dated fallbacks, but the canonical six-file contract still needs a sync/normalization pass before final production selection.

## Evaluation Rubric

| Area | Evaluation question |
|---|---|
| Source fit | Does the prototype read the six stable files directly, or does it require dated fallback logic? |
| Coverage | How many chapter folders produce useful reader content today? |
| Markdown fidelity | Does it render headings, tables, SQL/code blocks, links, images, YouTube iframes, and HTML callouts safely? |
| Navigation | Does it support chapter navigation, section navigation, previous/next movement, and usable deep links? |
| UX quality | Does it feel like a polished online book rather than a raw Markdown dump? |
| Accessibility | Are keyboard navigation, visible focus, semantic structure, contrast, and mobile reflow plausible? |
| Maintainability | Is the codebase small enough to maintain, with clear data flow and minimal unnecessary services? |
| Deployment | Can it build reliably as a static/deployable reader? |
| Future platform fit | Can notes, search, auth, payments, or instructor tools be added later if needed? |

## Prototype Results

### `cursor-online-reader/`

**Role:** Simple Markdown reader and source-contract test bed.

**Verification run:**

```text
npm run generate
npm run lint
npm run build
```

**Result:** Passed.

- Generated `src/generated/bookData.ts` with 17 chapter entries.
- `npm run lint` passed.
- `npm run build` passed.
- Build warning: generated bundle is large (`index-*.js` about 1.2 MB minified, 341 KB gzip), likely because chapter Markdown is embedded in the client bundle.

**Source fit:** Good transitional fit. The generator targets `files/source/chapters`, prefers stable filenames, and falls back to the latest dated files for `main`, `lets-build`, `reflection`, `terms`, and `rat`.

**Important caveat:** It reports 17 chapters because it creates placeholder sections for empty chapter folders. Today, useful content exists only for chapters 1-4 unless more source files are synced.

**Best next use:** Use as the baseline for testing the content contract and simple reader behavior.

### `ai-studio/`

**Role:** Richer visual/interactive prototype with a generated book-data pipeline.

**Verification run:**

```text
npm run generate
npm run lint
npm run build
```

**Result:** Passed.

- Generated 4 chapters: `ch01` through `ch04`.
- Skipped `ch05` through `ch17` because those folders currently have no content files.
- `npm run lint` passed.
- `npm run build` passed.
- Build warning: generated bundle is large (`index-*.js` about 1.3 MB minified, 373 KB gzip).

**Source fit:** Partial transitional fit. It reads `files/source/chapters`, but currently uses dated fallback files and adapts content into an app-specific model (`introduction`, `concepts`, `build`, `questions`, `terms`, `rat`) instead of preserving the six sections as first-class reader sections.

**Best next use:** Use for UX and interaction ideas after source normalization. It may need generator work if selected as the production reader.

### `google-ai-studio/`

**Role:** AI Studio export / UX reference.

**Verification run:**

```text
npm run lint
npm run build
```

**Result:** Did not pass lint.

- `npm run lint` reported 102 TypeScript errors across 28 files.
- Most errors come from unresolved dependencies/types in both root-level `src/` files and a nested `database-book/src/` app tree being included by TypeScript.
- Because lint failed, this prototype is not currently build-reliable without cleanup.

**Source fit:** Not yet verified. No generation script is wired in `package.json`; it appears to be less current than `ai-studio/` for source-contract testing.

**Best next use:** Treat as a UX/reference export only unless it is cleaned up.

### `claude/`

**Role:** Separate full-stack reference pilot.

**Verification run:** Not run in this pass.

**Reason:** This pilot intentionally remains separate from the online-reader selection. It includes Next.js, Supabase, Stripe, auth, access grants, notes, and middleware concerns that are outside the immediate online-book reader decision.

**Best next use:** Keep as a reference for a later paid platform phase, not as the default reader base.

### `chat-gpt/docs/`

**Role:** Requirements and roadmap.

**Verification run:** Not applicable.

**Best next use:** Keep as the product north star, especially for accessibility, payment/access logic, notes, instructor tools, and future LMS integration. Do not treat it as the current implementation plan.

## Initial Recommendation

Do not merge plans or promote a production app yet. First, normalize or complete the content source so every chapter has the six stable files. Then re-run the same evaluation.

Short-term implementation order:

1. Update source sync so `files/source/chapters/chNN-slug/` contains the six stable files for every available chapter.
2. Re-run `cursor-online-reader` and `ai-studio` generation after source normalization.
3. Compare the two reader experiences on the same chapters and sections.
4. Choose a production base deliberately.
5. Promote the selected reader into a non-pilot folder such as `books/database-book/online-reader/`.

## Open Questions

- Should the source sync write only the six stable files, or keep dated files alongside them for traceability?
- Should production reader URLs be query-string based, route based, or static HTML paths?
- Is the first production target a public static reader, or should note-taking/search be included before launch?
- Which AI Studio folder is the current UX reference: `ai-studio/` or `google-ai-studio/`?

## Commands Run

From `C:\Users\nd115232\Documents\GitHub\dima-publishing`:

```text
books/database-book/platform-pilots/cursor-online-reader: npm run generate, npm run lint, npm run build
books/database-book/platform-pilots/ai-studio: npm run generate, npm run lint, npm run build
books/database-book/platform-pilots/google-ai-studio: npm run lint, npm run build attempted after lint command sequence, but lint failed
```
