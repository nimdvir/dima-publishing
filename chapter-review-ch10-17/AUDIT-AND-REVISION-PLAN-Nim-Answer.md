# Database Book — Chapters 10–17 Audit & Revision Plan

_Generated 2026-07-06. Full analysis of everything needing fixing in the local deployment (ch10+)._

**Companion review files in this folder** (complete current content of each chapter, all six components assembled in reader order, no edits):

- `Chapter-10-COMPLETE.md`
- `Chapter-11-COMPLETE.md`
- `Chapter-12-COMPLETE.md`
- `Chapter-13-COMPLETE.md`
- `Chapter-14-COMPLETE.md`
- `Chapter-15-COMPLETE.md`
- `Chapter-16-COMPLETE.md`
- `Chapter-17-COMPLETE.md`

---

# Fix Content Issues in Chapters 10–17 (dima-publishing / database-book)

## Context
The book *Using Data to Drive Business Performance* is deployed locally at `http://localhost:3000`
from the `dima-publishing` repo. Chapter content lives as Markdown in
`books/database-book/files/source/chapters/chNN-*/`, with these reader pages per chapter:
`index.md` (Introduction), `core-concepts.md`, `lets-build.md`, `review-questions.md`,
`terms-treasury.md`, `rat.md`. URL `/book/ch11/introduction/1` → `ch11-database-administration/index.md`.

Chapter 10 is the "good" reference (real video, clean 10-row roadmap, numbered `## 10.x` H2 sections).
Chapters 11–17 were generated less completely and share the same defects the user saw on ch11:
missing videos, broken "On this page"/roadmap, missing images, and structural bugs. This plan
lists every issue found and how to fix it.

> Note: the Next.js platform that renders these pages is NOT in this repo (no `package.json`),
> so all fixes here are **content (Markdown) fixes**. Rendering/TOC generation itself can't be
> changed from this repo.

---

## A. Cross-cutting issues (multiple chapters)

### A1. Missing chapter overview videos - I will create them, please insert detailed prompts for creating them in NotebookLm including what to cover, style, visual etc. 

### A2. Broken / incomplete "Chapter Roadmap" tables (= "On this page is incorrect") `index.md` are inconsistent and, in several chapters, start mid-chapter or - I thought deepseek fixed it, that's what we did before deployment (it's only in the local depo, not the live site). Thanks for catching it. 
dump sub-headings. ch10's roadmap (10 clean top-level rows) is the correct model.
- **ch14** roadmap starts at **14.2** — section 14.1 missing; also lists stray rows
  `Key Terms`, `Review Questions`, `Create a semantic model`.
- **ch15** roadmap starts at **15.3** — 15.1 and 15.2 missing; stray `Table of Figures` row.
- **ch16** roadmap starts at **16.3** — 16.1 and 16.2 missing.
- **ch12** roadmap mixes H2/H3 sub-headings as top-level rows and is truncated after 12.2
  (12.3–12.12 missing).
- **ch13** roadmap includes sub-subsections (13.1.1, 13.2.1…) and is truncated after 13.2.x
  (13.3–13.11 missing).
- **ch11** roadmap lists 10 curated items that don't match the actual deep section structure.
- **ch17** roadmap has a redundant first row linking to the duplicated title (see B3).
- **Fix:** regenerate each roadmap to list only the chapter's top-level sections (one row each),
  matching the section headings actually present, like ch10. 
 

### A3. Inconsistent heading levels (breaks auto-generated "On this page" TOC)
Section headings should be `##` (H2). Several chapters use `#` (H1) for every section, producing
many H1s per page and a broken TOC.
- **H1-for-sections (needs demotion to `##`):** ch11, ch12, ch13, ch17 core-concepts.md.
- **Correct (H2 sections):** ch10, ch14, ch15.
- Also: ch10/12/13/15 use numbered sections (`10.1`, `12.1`…); ch11 uses **unnumbered** headings.
  Standardize on numbered `## NN.x` for consistency.

### A4. Missing images / figures - Please on a sepearate file create a list of image prompts for google gemini fo the missing images. First, list the missing images, a brief description and where they should be located. Then, write the detailed prompts for nano banana sepearted by ---
We can do an experiment: 
in ch10 also place the image prompts as comments and I will try to see if nano banan / gemini can place the images it creates itself. 

Only ch14 embeds images in core-concepts (and those are external hotlinks — see B2). All other
chapters 10–17 have zero figures.
- **ch11** core-concepts.md has **7 unrendered `<!-- FIGURE PLACEHOLDER … -->` comments**
  (lines 42, 186, 339, 520, 532, 626, 871).
- **ch10, ch12, ch13, ch15, ch16, ch17** have no figures at all.
- **Fix:** add real figures (host via Cloudinary — `book.yml` `cloudinary_root: Database-book-BITM330`;
  library `G:\My Drive\...\BITM330-book-drive\.images`), or remove the placeholder comments /
  figure-index references if figures won't be produced.

---

## B. Chapter-specific bugs

### B1. ch11 — database-administration
- 7 FIGURE PLACEHOLDER comments render as nothing (A4).
- Video placeholder (A1).
- Section headings are H1 and unnumbered (A2/A3) — roadmap in `index.md` doesn't match the
  deep H1 sections in `core-concepts.md`.
- Legacy file present: `core-concepts-LEGACY-2026-05-05.md` (confirm it's not being served; remove if dead).

<!-- Nim = please fix the bugs -->

### B2. ch14 — power-bi (most damaged content)
- **Numbering starts at 14.2** — there is no `## 14.1` section (`core-concepts.md`).
- **Large block of un-integrated raw Microsoft Learn tutorial content appended after the chapter
  ends.** After `## Chapter Summary` / `## Key Terms` / `## Review Questions` / `## Figures Index`
  (lines ~123–144), a second document begins: `## Create a semantic model`, `## Create visualizations
  in a report`, `### Create a dashboard`, `## Organize items with workspaces`, `## Explore sample
  reports`, `## Distribute content`, `## Explore template apps`, `## Refresh a semantic model`,
  a duplicate `## Summary`, `## Scenario`, `### Connect to data in a relational database`, etc.
  (lines ~156 onward). This must be integrated into the chapter or removed.
- **~17 images hotlinked from `learn.microsoft.com`** (core-concepts.md lines 170–312+) — external
  dependency / licensing / reliability risk. Re-host or replace.
- **"Figures Index" declares figures 14.1–14.3 as `*(to be added)*`** (lines 148–150) — either
  add them or drop the index.
- Intro `index.md` line 5 crams three learning objectives into one hyphen-run line (no list formatting).
- Video placeholder (A1); roadmap starts at 14.2 (A2).

<!-- please fix -->

### B3. ch17 — conclusion
- **Duplicated `# Chapter 17` title with an inline draft-status comment**:
  `index.md` line 3 = `<!-- Draft Status: Edited 2026-05-08 --> # Chapter 17: Designing Systems That Matter`
  (a stray second H1 on the same line as an HTML comment). Same duplication in `core-concepts.md`
  (H1 title at line 1 **and** line 13).
- Roadmap's first row links to that duplicated title (`#chapter-17-designing-systems-that-matter`) — remove.
- Video placeholder (A1); H1-for-sections (A3).

### B4. ch12 / ch13
- H1-for-sections (A3) and truncated roadmaps (A2).
- Video placeholders (A1).
- No figures (A4).

### B5. ch15 / ch16
- Roadmaps start mid-chapter (15.3 / 16.3) — missing early sections (A2).
- Video placeholders (A1). Content otherwise structurally sound (numbered `##` sections).

### B6. ch10 — advanced-sql-queries (reference chapter; minor)
- Structurally the model chapter (real video, clean roadmap, `## 10.x` H2 sections).
- Only gap: no figures (A4) — acceptable for an SQL-heavy chapter, but flag if figures are wanted.
- Stray unrelated file in folder: `ch08-figures.csv` (belongs to ch08; remove/relocate).

<!-- please fix bugs -->
---

## Suggested execution order
1. **A3 heading levels** (ch11/12/13/17 → demote section `#` to `##`, add numbering to ch11).
2. **A2 roadmaps** (regenerate from the corrected headings, ch11–17).
3. **B2 ch14 cleanup** (remove/integrate the appended MS Learn block; fix 14.1; re-host images).
4. **B3 ch17 duplicate-title fix.**
5. **A4 figures** (ch11 placeholders + others) and **A1 videos** — both need external assets
   (Cloudinary images, YouTube IDs) and should be done once those are supplied. - Nim: For now, create prompts as mentioned earlier

## Verification
- Start the local site (the server the user already runs on `localhost:3000`) and open, for each of
  ch11–ch17: `/book/chNN/introduction/1` and `/book/chNN/core-concepts/1`.
- Confirm: (a) video embed renders (or placeholder is intentional), (b) the "On this page" / roadmap
  lists the real top-level sections and every link scrolls to a heading, (c) no duplicate page titles,
  (d) images load (no broken/hotlinked images), (e) ch14 no longer shows the stray MS-Learn tutorial tail.
- Quick static re-check (repo): re-run the greps used here —
  `iframe` count per chapter, `Video placeholder`, `FIGURE PLACEHOLDER`, `^# ` H1 counts — to confirm
  each is resolved. 
