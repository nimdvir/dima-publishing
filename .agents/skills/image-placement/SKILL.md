---
name: image-placement
description: >
  Stage 2 of the BITM330 image pipeline. Turn figure suggestions into real local figures:
  scan the chapter's own image folder first, then earlier chapters for unused good-fit
  images, then later chapters; place matches with captions and sequential figure numbers;
  generate missing figures with Gemini prompts (with a mandatory Generation Gate for human review
  before API calls); save generated images into the chapter image folder;
  maintain a figures index file at .images/<chapter>/figures-index.md. Use after `figure-suggestion`, before `image-link-optimizer`.
  Always plans first and asks before editing.
argument-hint: Markdown file, `chNN`, or chapter folder, plus optional image folder (e.g., "ch05 reflection with .images/Ch5-SQL").
---

# BITM330 Image Placement

**Book:** *Using Data to Drive Business Performance: Databases and Management Information Systems*

**Pipeline stage 2 of 3:** `figure-suggestion` → `image-placement` → `image-link-optimizer`.

Take the figure suggestions left by stage 1 and turn them into real, numbered figures in one Markdown target file. Place existing images where they fit, generate the ones that are missing, and keep a figures index file in the chapter's image folder. Always plan first; edit only after explicit user approval.

The target may be a chapter main file or a named companion segment (Let's Build, Reflection, Terms, RAT, Lab).

---

## Does / Does NOT

This skill **does**:

- scan image folders and place existing images that fit the suggestions;
- reuse good-quality unused images from **earlier** chapters when they fit;
  generate missing figures with Gemini — produces Gemini prompts, pauses for human review at the Generation Gate, then calls the Gemini API to create images saved into the chapter image folder;
- replace `<!-- FIGURE SUGGESTION -->` comment + code block pairs (and deprecated `#### 🎨 Figure Suggestion` blocks and `*Figure suggestion: …*` lines) with real local figure blocks;
- number figures and maintain a figures-index.md in the chapter's image folder.

This skill **does NOT**:

- invent new figure *ideas* from scratch → that is `figure-suggestion`;
- optimize images, upload to Cloudinary, or rewrite links to remote URLs → `image-link-optimizer`;
- ever edit `.images/book-media.md` → owned by `image-link-optimizer`;
- restructure or rewrite prose → `chapter-editor` or the relevant companion-file skill.

All links this skill writes are **local relative paths**. Stage 3 later swaps them for optimized Cloudinary URLs.

---

## Scope

Any named BITM330 Markdown target file may be used. If the user gives only `chNN` or a chapter folder, default to the latest dated `chNN-main-YYYY-MM-DD.md` under `BITM330-Book-draft/chapter-drafts/chNN-…/main/`. Do not choose a companion file unless the user names it.

---

## Inputs

Accept any of:

- `chNN` → resolve to the latest `chNN-main-*.md` by default.
- A chapter folder → resolve to the latest main file by default.
- An absolute or workspace-relative Markdown file path, including companion files.
- Optional explicit image folder. If not given, fuzzy match the root `.images/(Ch|ch)0?NN…` subfolder.

If the target file or image folder is ambiguous (zero or multiple matches), stop and ask.

---

## Checkpoint rule

Before any edit:

1. Confirm the resolved target is the **latest-dated** file for that segment. If a newer dated file exists, name it and ask which to edit.
2. Proceed past the Phase 2 plan only with explicit user approval. Without approval, produce the plan as a **dry run** and stop.

---

## Phase 1 — Inventory (Read-Only)

Before producing the plan, gather:

1. **Target sub-sections** — every `##` and `###` heading, in order.
2. **Existing figures** — every `![…](…)` image link and its caption line.
3. **Figure suggestions** — every `<!-- FIGURE SUGGESTION -->` comment followed by a fenced code block (canonical), every deprecated `#### 🎨 Figure Suggestion` heading block, every legacy `*Figure suggestion: …*` italic line, and any `<!-- Figure: … -->` or `// Figure: …` comment.
4. **Image candidates** — see the scan order below.
5. **Slide-deck renders** — files matching `*-slide-*.png` or any sequential `*-image-NNN.*` set with more than 20 files. Flag for the slide-deck question in Phase 2.
6. **Existing figure numbers** — the highest figure number already present, if any.

Do not edit anything in Phase 1.

### Scan order for image candidates

AI judges both **fit** (does the image match the suggestion?) and **quality** (is it clear, readable, and good enough to print?). Scan in this order and stop at the first good fit:

1. **The target chapter's own image folder first** — `.images/<this chapter's folder>/`. Prefer images here.
2. **Earlier chapters' folders next** — for a suggestion still unmatched, look for an **unused, good-quality** image in previous chapters' `.images/` folders that genuinely fits. An image is "unused" when it is not already inside a `*-used/` folder. Do not pull shared `Ch0 General` assets into a chapter unless they clearly fit.
3. **A quick sweep of later chapters last** — only a light pass for an obvious unused fit.

For folder-scanning details (what each folder may contain, what to report), see [folder-scanning-rules.md](folder-scanning-rules.md).

---

## Phase 2 — Placement Plan (Mandatory Approval Gate)

Output the plan in this order. Do not edit before approval.

### 1. Recommendation
One or two lines. Default: *"Place a figure for every suggestion. Reuse existing good-fit images first; generate the rest. Number figures sequentially using the chapter number (Figure NN.1, NN.2, …)."*

### 2. Inputs Found
Counts only:

- Target file: `…`
- Image folders scanned: own / earlier / later
- Sub-sections: X
- Figure suggestions: X
- Existing placed figures: X
- Candidate images found (own / earlier / later): X / X / X
- Slide-deck renders detected: X (pattern)
- Suggestions with no matching asset: X

### 3. Review Required
Ask up front, before the table:

1. **Missing-figure policy.** *X suggestions have no matching asset.* Options: (a) generate all now, (b) generate only the ones I mark high priority, (c) leave all as pending entries.
2. **Slide-deck handling.** *X slide renders detected.* Options: (a) place all inline, (b) place only selected slides, (c) treat the deck as a reference appendix and place none inline.
3. **Path convention.** Workspace-relative (preferred) or target-file-relative.
4. **Figure numbering.** Continue from existing highest number, or renumber from 1.

If a question has an obvious safe default (no slide deck detected → skip Q2), state the default and move on.

### 4. Strategy
One paragraph: ordering rule, multiple-images-per-section rule, slide-deck handling chosen, and how missing figures will be handled.

### 5. Full Placement Table
Every suggestion gets a row. Anchor by section heading + suggestion snippet, not by line number.

| # | Section anchor | Suggestion / Trigger | Asset (source) | Action | Caption direction |
|---|---|---|---|---|---|
| 5.1 | `### Why SQL?` | 🎨 SQL as a data bridge | `.images/Ch5-SQL/ch05-sql-bridge.png` (own) | Insert | SQL connects stored tables to business answers |
| 5.2 | `### Keys` | 🎨 foreign-key link | `.images/Ch4 Databases/ch04-fk-link.png` (earlier, unused) | Insert (reuse) | A foreign key links two tables |
| 5.3 | `### Supabase` | 🎨 dashboard map | **TO GENERATE** `figure-5.3-supabase-map.png` | Generate + insert | Areas of the Supabase dashboard |

`Action` values: `Insert`, `Insert (reuse)`, `Generate + insert`, `Pending — needs generation`, `Skip (duplicate)`, `Skip (decorative)`.

### 6. Generated Figures Subtable
List every `Generate + insert` and `Pending` row with proposed filename, target folder, and a Gemini prompt. Images are generated with **Gemini** (Gemini 2.5 Pro or the current Imagen-capable model). Prompts follow the format below.

#### Generation Gate — Pause Before Generating

Before any image is generated, pause and present the prompts for review:

```
## Generation Gate — [N] figures to generate

Estimated cost: [N] Gemini image generation calls (~$0.0X each = ~$X.XX total)

| # | Figure | Filename | Prompt (first 120 chars) |
|---|---|---|---|
| 1 | Figure 5.3 | figure-5.3-supabase-map.png | A clean dashboard map of... |
| 2 | Figure 5.7 | figure-5.7-query-flow.png | A flowchart showing SELECT... |

Review the prompts above. Options:
  (a) generate all [N] now
  (b) generate selected figures (specify which)
  (c) edit prompts first (specify changes)
  (d) skip generation — leave as pending for later
```

Never generate without explicit approval at this gate. Even if the overall placement plan was approved, the generation step requires its own confirmation — prompts may need adjustment, and generation consumes API credits.

### 7. Verification Plan
1. Every `Insert` row's asset file resolves on disk.
2. Every figure number is unique and sequential.
3. After insertion, every figure suggestion has been replaced or removed.

Then ask:

> Approve this plan? (yes / changes / specific rows to drop)

---

## Phase 3 — Insertion (After Approval Only)

For each approved row, in document order:

1. **Find the anchor** by matching the section heading and the suggestion snippet. Never rely on line numbers — they shift after the first edit.
2. **Replace the suggestion** with the figure block. For a `#### 🎨 Figure Suggestion` block, replace the whole block; for a legacy italic line, replace that line.
3. **Insert a standard figure block** using the format in [figure-markdown-standards.md](figure-markdown-standards.md):

   ```markdown
   ![Alt text](relative/path/to/figure-NN.X-slug.ext)

   *Figure NN.X — Caption text.*
   ```

4. **Multiple images at one spot** are allowed when each teaches a distinct point. Stack figure blocks in reading order, each with its own number and caption.
5. **Never** insert inside fenced code blocks, tables, callouts, or HTML comments.
6. **Idempotency:** if the next non-blank line already links the same file, skip and log `already-placed`.
7. **Path rules:** workspace-relative or target-file-relative per Phase 2; forward slashes; URL-encode spaces only in the link target; never absolute Windows paths in final Markdown.
8. **Numbering:** apply the Phase 2 choice strictly — no gaps, no duplicates.

---

## Phase 4 — Figures Index

Create or update `.images/<chapter-folder>/figures-index.md`:

| Figure | Section | Caption | Filename |
|--------|---------|---------|----------|
| 5.1 | Why SQL? | SQL connects stored tables to business answers | `ch05-sql-bridge.png` |

If a figures index file already exists, replace it rather than appending a second one.

---

## Phase 5 — Generated Figures

For every `Generate + insert` row:

1. Save the generated file at the proposed path **inside the chapter image folder**.
2. Use the Gemini-style prompt format below.
3. If no generation tool is available this session, downgrade to `Pending — needs generation`:
   - leave a `<!-- Pending figure: filename — caption — short prompt -->` marker in place;
   - do **not** insert a broken `![…](…)` link to a non-existent file.

### Gemini-style prompt format

Prompts live in the Phase 6 plan / generation subtable and in the optional image-ideas file — **never in the chapter body**. Each prompt covers:

- **Subject and composition:** what is shown and how it is arranged.
- **Labels/callouts:** exact on-image text, kept short.
- **Style:** default to the minimalist vector look in [style-minimalist-vector.md](style-minimalist-vector.md) unless the chapter calls for a screenshot or photo.
- **Aspect ratio:** 3:2 or 4:3 for diagrams.
- **Accessibility:** high contrast, no meaning carried by color alone.

Keep captions and alt text free of prompt language, color palettes, or aspect ratios (see figure-markdown-standards.md).

---

## Phase 6 — Final Report

Print a compact summary. Do not paste the rewritten target file.

- Target file
- Image folders scanned (own / earlier / later)
- Figures inserted: X
- Figures reused from earlier chapters: X
- Figures generated: X
- Pending figures (no generation): X
- Suggestions removed: X
- Slide-deck strategy used: …
- Path convention used: …
- Figures index: created / updated at `.images/<chapter>/figures-index.md`
- Files written: list of new image files only
- Next step: offer to run `image-link-optimizer` to optimize and upload. Do not start that work automatically.

---

## Safety and Boundaries

- Never edit the target file before the Phase 2 plan is explicitly approved.
- Never delete or overwrite source images.
- Never invent a file path for a missing image. Either generate the file or mark it pending.
- Never use absolute Windows paths in final target Markdown.
- Never insert figures inside code fences, tables, callouts, or HTML comments.
- Never optimize, upload, rewrite to Cloudinary URLs, or edit `.images/book-media.md`. Those belong to `image-link-optimizer`.
- Never restructure or rewrite prose. One-line transitions before a figure block are allowed; anything more belongs to `chapter-editor` or the relevant companion-file skill.
- On re-run, skip already-placed figures (idempotent).
- Stop and ask whenever the target file, image folder, missing-figure policy, or slide-deck handling is ambiguous.
