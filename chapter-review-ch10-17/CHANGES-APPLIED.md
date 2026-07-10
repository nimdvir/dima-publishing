# Changes Applied — Chapters 10–17 (2026-07-07)

All edits were made to the **live source** under
`books/database-book/files/source/chapters/chNN-*/`. The `Chapter-NN-COMPLETE.md` review files in
this folder were **regenerated after** these edits, so they show the current (fixed) content.
Nothing was committed — review, then commit when ready.

I verified the platform's actual behavior from the in-repo reader
(`platform-pilots/reader-hybrid-v1.1`): the **"On this page"** panel is auto-generated from headings
(`utils/headings.ts` → `slugifyHeading`), and the **Roadmap dropdown** is parsed from the markdown
"Chapter Roadmap" table in each `index.md` (`scripts/generateBookData.ts` → `parseRoadmap`). Fixes
below were made to match those exact rules, and every rebuilt roadmap anchor was validated against the
real heading slugs.

## Structural fixes (done)

**A3 — Heading levels / "On this page" TOC**
- **ch11**: section headings were H1 and unnumbered → converted to numbered `## 11.1 … 11.11`;
  their sub-headings demoted to `###`. Now exactly 2 H1s (title + "Core Concepts"), like ch10.
- **ch12, ch13**: section headings were H1 (`# 12.x` / `# 13.x`) → demoted to `## 12.x` / `## 13.x`;
  sub-headings demoted to `###`.
- **ch17**: removed the **duplicated `# Chapter 17` title** (appeared twice in `core-concepts.md`
  and once as a stray inline `<!-- Draft Status… --> # Chapter 17` line in both `index.md` and
  `core-concepts.md`).

**A2 — Chapter Roadmap tables (rebuilt to match real sections, verified anchors)**
- **ch11**: replaced the 10 mismatched rows with 11.1–11.11.
- **ch12**: was truncated at 12.2 and dumped sub-headings → now 12.1–12.12.
- **ch13**: was truncated at 13.2.x with sub-subsections → now 13.1–13.11.
- **ch14**: started at 14.2 + stray rows (Key Terms, "Create a semantic model") → now 14.1–14.7.
- **ch15**: started at 15.3 + stray "Table of Figures" → now 15.1–15.9. (Also fixed the 15.9 anchor:
  `&` slugifies to `-and-`, so `#15-9-integration-and-looking-ahead`.)
- **ch17**: removed the redundant duplicate-title row; now lists the 5 real sections.
- **ch16**: left as-is — its roadmap already matches its content (16.3–16.11). See "Needs your call".

**B2 — ch14 Power BI cleanup**
- Removed the large block of **raw, un-integrated Microsoft Learn tutorial content** (old lines
  151–383: "100 XP", "Create a semantic model", "Scenario", a duplicate "Summary", etc.). This also
  removed **all ~17 externally-hotlinked `learn.microsoft.com` images** in one cut.
- Added the missing **`## 14.1 From SQL Output to Business Dashboards`** intro section.
- Fixed the mangled learning-objectives line (three objectives crammed onto one hyphen-run line) →
  proper bulleted list, in both `index.md` and `core-concepts.md`.

**B6 — ch10 housekeeping**
- Moved the stray `ch08-figures.csv` out of the ch10 folder into `ch08-midterm-review/`.

## Deliverables created (this folder)
- **VIDEO-PROMPTS-NotebookLM.md** — detailed NotebookLM video-generation prompts for ch11–17
  (coverage, audience, style, visuals). Swap each into `index.md` once you have the YouTube ID.
- **IMAGE-PROMPTS-nano-banana.md** — missing-image list (description + location) and ready-to-paste
  nano banana / Gemini prompts, separated by `---`.
- **ch10 experiment**: 4 image prompts embedded as HTML comments directly in
  `ch10-advanced-sql-queries/core-concepts.md` (Figures 10.3, 10.4, 10.9, 10.10), each with a
  `place here as: ![caption](IMAGE_URL)` instruction to test auto-placement.

## Still pending — needs you / assets
- **A1 Videos**: all of ch11–17 still show the `> **Video placeholder:**` line (intentional — waiting
  on your NotebookLM videos + YouTube IDs).
- **A4 Images**: ch11's 7 `<!-- FIGURE PLACEHOLDER -->` comments and ch14's 3 "Figures Index" entries
  are still unfilled — prompts are ready in IMAGE-PROMPTS-nano-banana.md.

## Needs your call (I did NOT change these)
- **ch11 legacy file** `core-concepts-LEGACY-2026-05-05.md` — confirmed dead (not referenced; not
  loaded by the generator, which only reads `core-concepts.md`). I tried to delete it but the action
  was auto-blocked as an unnamed deletion. Safe to `git rm` whenever you want.
- **ch14 & ch16 numbering gap**: ch16's sections genuinely start at **16.3** (no 16.1/16.2 exist);
  ch14 I fixed by adding 14.1. For ch16, options are (a) renumber 16.3→16.1 … (touches a 1,450-line
  file and internal "16.5/16.7" cross-references — riskier), or (b) author brief 16.1/16.2 intro
  sections. Tell me which and I'll do it.
- **ch14 hotlinked images**: removed with the tutorial block. If you wanted any of that Power BI
  walkthrough kept, it needs to be rewritten as original content with re-hosted images.
