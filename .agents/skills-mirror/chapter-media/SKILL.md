---
name: chapter-media
description: >
  End-to-end media placement and delivery for a BITM330 chapter or section. Presents an
  interactive menu at start — dry-run, suggest, place, optimize, full pipeline, or scan
  for new unplaced images. Plan-first workflow: scan → suggest → decide → place → optimize
  selected → upload used → rewrite links → update ledger. Use when adding or updating all
  media for a chapter, picking up where you left off, or running the pipeline on a single
  section. Replaces the old three-stage split (figure-suggestion → image-placement →
  image-link-optimizer). For single-stage-only work the individual skills remain available.
  Use `image-prompt` when the needed starting point is ready-to-paste Gemini prompt blocks,
  in-text figure placements, a Figures Index, or a CSV image tracker. Does not edit prose,
  page breaks, import source files, run final readiness checks, or publish/deploy.
argument-hint: Chapter (chNN), file path, or section heading. Mode is chosen from the interactive menu (e.g., "ch05" or "ch05/main/...md @ ### SQL Joins").
---

# Chapter Media

End-to-end media workflow for the BITM330 textbook. This skill replaces the old
three-stage image pipeline (`figure-suggestion` → `image-placement` → `image-link-optimizer`)
with one controlled, plan-first workflow. The `image-prompt` skill can feed production-ready
Gemini prompt blocks, visible figure placements, a Figures Index, and a CSV tracker into
this pipeline when prompt specifications are needed before placement:

```text
image-prompt (prompt specs) → plan → suggest/place → optimize/upload → rewrite → report
```

**Core principle: plan first, edit only after approval.** The only exception is a
pure read-only inventory or dry run. This prevents Cloudinary from becoming a junk
drawer with a textbook attached.

For deep implementation detail on any single stage, the individual skills
(`image-prompt`, `figure-suggestion`, `image-placement`, `image-link-optimizer`) may be used as
implementation references. This skill is the canonical workflow; when they
conflict, this skill takes precedence.

---

## Related Skill Routing

Use `chapter-media` only for media planning, placement, optimization, upload, link rewriting, and media ledgers. Route adjacent work instead of folding it into this skill:

| Need | Route to |
|---|---|
| Prose, chapter structure, visual pedagogy, or page-break pacing | `chapter-editor` |
| Superseded editor reference | `chapter-editor-cursor` only as historical context |
| Source coverage audit before media decisions | `chapter-gap-analysis` |
| Callout syntax or callout conversion near an image | `call-out` |
| Prompt blocks, figure specs, Figures Index, or CSV tracker | `image-prompt` |
| Hidden figure suggestion comments only | `figure-suggestion` |
| Local figure placement only | `image-placement` |
| Optimization, Cloudinary upload, link rewrite, ledger only | `image-link-optimizer` |
| Read-only image inventory, CSV, or gallery | `chapter-media-inventory` |
| Drive-to-repo import or approved index import | `chapter-source-import` / `chapter-source-import import-index-approved` |
| Final readiness check | `chapter-final-check` |
| Deprecated final review command | `chapter-review-codex` is legacy; use `chapter-final-check` |
| Lifecycle orchestration | `chapter-production-flow` |
| HTML review artifact | `chapter-html-review` |
| Chapter edit notes, progress log, work log, or tracker | `edits`, `progress-update`, `daily-work-log`, `chapter-tracker` |

Do not use this skill to edit unrelated prose, change page breaks, import files, run `chapter-final-check`, run `book-deploy`, or publish.

---

## Interactive Start Menu

When invoked, present this numbered menu **before any work begins**:

```
## Chapter Media — chNN

What would you like to do?

1. Full pipeline — suggest → place → optimize (smart-start picks the stage)
2. Dry run — inventory only, no edits, show what would happen
3. Prompt/spec only — generate Gemini prompt blocks, placements, Figures Index, and CSV tracker (`image-prompt`)
4. Suggest only — add figure suggestion comments
5. Place only — resolve suggestions or prompt blocks into real local images
6. Optimize only — upload to Cloudinary and rewrite links
7. Scan for new images — check .images/<chapter>/ for unplaced images
8. Section scope — run on a specific section instead of the whole chapter
```

Wait for the user to respond with a number. Then proceed:

- **1 (Full pipeline):** run smart-start detection, then execute stages in sequence.
- **2 (Dry run):** run Phase 0 inventory only, print the full plan, stop. For a detailed CSV inventory or HTML gallery, use `chapter-media-inventory`.
- **3 (Prompt/spec only):** delegate to `image-prompt`, then return to this menu if the user wants placement or optimization next.
- **4–6:** run only that mode. Still present a Phase 0 plan for approval.
- **7 (Scan for new images):** run a deeper manual New Image Discovery scan (Phase 0 already auto-discovers unused candidates via the CSV — use this for a full filesystem walk with thumbnails and content inspection). Delegates to `chapter-media-inventory` for the folder scan, then returns to the menu.
- **8 (Section scope):** ask which section heading, set scope, return to menu.

If the request is ambiguous, default to dry run.

If the user explicitly provides a mode in the prompt (e.g., "chapter-media ch04 dry-run"),
skip the interactive menu and proceed directly to Phase 0 for that mode.

---

## Smart Start (for Full Pipeline)

Scan the target and auto-detect the starting stage:

| What exists in the target?                                                                                                 | Start at                      |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| No prompt blocks, no `<!-- 🎨 Figure Suggestion: ... -->` comments, no local images, and user asks for visual prompt specs | Prompt/spec (`image-prompt`)  |
| Visible `🎨 **Image Generation Prompt**` blocks exist, but no local images placed yet                                      | Place                         |
| No `<!-- 🎨 Figure Suggestion: ... -->` comments, no local `![…](…)` images, no Cloudinary URLs                            | Suggest                       |
| `<!-- 🎨 Figure Suggestion: ... -->` comments exist, but no local images placed yet                                        | Place                         |
| Local `![…](relative/path)` images exist (not yet on Cloudinary)                                                           | Optimize                      |
| All images already use Cloudinary `res.cloudinary.com/dkndq6lyz` URLs                                                      | Done — report, return to menu |

Report the detected stage and ask: _"Start at this stage? (yes / no, pick a different one)"_

---

## New Image Discovery (Menu Option 7)

Check whether the chapter's `.images/` folder has images not yet referenced in the
chapter. **Never auto-place — always ask first.**

### Workflow

1. Resolve the chapter image folder: `.images/<Chapter Image Folder>/` (fuzzy match).
2. **Fast lookup first:** grep `media-master.csv` for the chapter key to see all files,
   their statuses, and paths. This instantly surfaces unused candidates.
3. List every image file (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`) in the folder,
   excluding files already inside `chNN-used/`, `optimized/`, `from-chapter/`, or
   any `*-used/` subfolder. Use the CSV to skip folders already classified as `used`.
4. Cross-reference against the chapter file — which are already placed?
5. Present unplaced images:

   ```
   ## Unplaced Images in .images/<folder>/

   The following exist in the folder but are NOT placed in the chapter:

   | # | Filename | Looks like… |
   |---|----------|------------|
   | 1 | `ch1-model.png` | Diagram — database model overview |
   | 2 | `market.png` | Screenshot — marketplace example |
   | … | … | … |

   What would you like to do?
   a. Add figure suggestions for selected images (tell me which numbers)
   b. Add suggestions for ALL unplaced images
   c. Skip — I'll handle these later
   d. Also scan earlier chapters for unused images that might fit
   e. Also scan later chapters for unused images that might fit
   ```

6. If (a): ask which numbers, add `<!-- 🎨 Figure Suggestion: ... -->` comments for each in the
   most relevant section. Use filename and visual assessment for the description.
7. If (d) or (e): run the scan on requested folders, append to list, repeat question.
8. After acting, return to the main menu.

This step only adds `<!-- 🎨 Figure Suggestion: ... -->` comments. It does not place, generate,
optimize, or upload images. For a read-only inventory with CSV export or an HTML
thumbnail gallery, use `chapter-media-inventory` instead.

---

## Scope

**Chapter-wide (default):** resolves `chNN` to the active main/Core Concepts source
according to Source Mode below. Pipeline runs on the main/Core Concepts file only unless
a companion or index file is explicitly named.

**Section-scoped (Menu Option 8):** all stages are constrained to the named section:

- Suggest: add blocks only within that heading scope.
- Place: resolve only suggestions in that section. Number figures sequentially within
  the chapter (do not restart numbering for the section).
- Optimize: only process images referenced in that section. The ledger update remains
  chapter-wide.

Companion files (Let's Build, Reflection, Terms, RAT, Lab) are supported when
explicitly named.

### Source Mode

The skill supports two source paths:

1. **Legacy draft mode** — `BITM330-Book-draft/chapter-drafts/chNN-.../main/chNN-main-YYYY-MM-DD.md`
2. **Repo stable source mode** — `books/database-book/files/source/chapters/chNN-.../core-concepts.md`

If the user gives a specific Markdown file, use that file for media work only. If the
path is a repo `index.md` or Drive-side chapter index draft, process it only when the
user explicitly asks for media work on that landing page.

If the user gives only `chNN`, prefer repo `core-concepts.md` when working inside
`dima-publishing`; otherwise default to the latest legacy draft main file.

This source selection is not an import or publishing decision. Approved Drive-to-repo
imports belong to `chapter-source-import`; final readiness belongs to
`chapter-final-check`; build/deploy belongs to `book-deploy`.

---

## Media Master CSV — Fast Image Lookup

A machine-readable inventory of every file in `.images/` is auto-maintained at:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\_inventory\media-master.csv
```

**Schema:** `chapter,filename,type,status,relative_path,extension,size_bytes,size_display`

**Use this CSV for:**

- **Cross-chapter image search** — grep for a slug or keyword across all chapters instantly
- **Status check** — is an image `used`, `unused`, `archive`, or `source`?
- **Folder inventory** — which files live in a chapter's image folder without walking the filesystem
- **Size awareness** — flag oversized images before optimization

**Regeneration:** The CSV is auto-refreshed by a file watcher (`scripts/watch-media-rebuild.ps1`)
whenever files change in `.images/`. To force a one-shot rebuild:

```powershell
pwsh -File "G:\My Drive\0-Projects\!-important\BITM330-book-drive\scripts\watch-media-rebuild.ps1" -Once
```

**Usage in this skill:** When Phase 0 or New Image Discovery needs to scan for images,
read the CSV (or grep it) before walking the filesystem. The CSV gives instant counts
and status; the filesystem walk is only needed for thumbnails or content inspection.

---

## Shared Conventions

Stated once — the individual skills repeat these; this skill is the single source of
truth for cross-stage consistency.

### Folder Resolution

- **Local image folder:** fuzzy-match `.images/` subfolder matching `^(Ch|ch)0?<N>\b`.
  Ask on zero or multiple matches.
- **Cloudinary folder:** `Database-book-BITM330/<chapter-folder-name>/` using the exact folder
  name from `BITM330-Book-draft/chapter-drafts/`. Example: chapter folder
  `ch01-introduction-to-course` → `Database-book-BITM330/ch01-introduction-to-course/`.
  Shared/general assets → `Database-book-BITM330/00-general/`.
- **Used optimized output:** `.images/<Image Folder>/chNN-used/` — create if missing.
- **Credentials:** Cloudinary credentials are expected to be configured in the local
  environment or `.env` file. Never print, expose, or commit credentials. MCP
  servers read from the environment.
- **Verify the Cloudinary folder exists** via the asset-management MCP before uploading.
  If missing, run `create-cloudinary-folders.js` or ask before creating via MCP.

### Naming

- New files: `chNN-<slug>.<ext>` in `chNN-used/`.
- Slug source: meaningful italic caption → meaningful alt → preceding paragraph +
  nearest heading → Cloudinary AI caption → original filename stem.
- Lowercase, strip non-`[a-z0-9-]`, collapse repeated hyphens, drop vague words
  (`image`, `figure`, `screenshot`, `final`), truncate at word boundary ≤ 40 chars.
- Collisions → `-v2`, `-v3`.

### Figure Block Format

```markdown
![Alt text](relative/path/to/figure-NN.X-slug.ext)

_Figure NN.X — Caption text._
```

- Workspace-relative or target-file-relative paths, forward slashes.
- Never absolute Windows paths.
- Multiple images at one spot: stack blocks, each with own number and caption.

### Caption & Alt Priority

**Best caption:** existing italic caption below → meaningful alt → preceding paragraph
(within 3 non-blank lines) + nearest heading → Cloudinary AI caption → filename stem.

**Best alt:** meaningful alt (≥ 4 tokens after removing stopwords `a`, `the`, `of`,
`in`, `on`, `and` and vague words `image`, `figure`, `screenshot`, `final`) →
existing italic caption → preceding paragraph + nearest heading → Cloudinary AI →
filename stem.

Captions begin with `Figure NN.X —` and explain why the image matters instructionally.
Avoid prompt language, file names, style descriptions, or color palette references.

### Supported Media Types

| Type           | Placement  | Optimize/Upload            | Notes                               |
| -------------- | ---------- | -------------------------- | ----------------------------------- |
| PNG            | Yes        | Yes                        | Best for diagrams and screenshots   |
| JPG/JPEG       | Yes        | Yes                        | Best for photos and gradients       |
| WebP           | Yes        | Yes                        | Web-friendly                        |
| GIF            | Yes        | Carefully                  | Preserve animation when possible    |
| SVG            | Yes        | Usually skip               | Preserve if pipeline supports it    |
| YouTube video  | Embed only | No                         | Use `pandoc-video` skill for embeds |
| Audio overview | Embed only | No upload unless requested | Usually Cloudinary-hosted           |

---

## Phase 0 — Inventory & Plan (Mandatory, Read-Only)

Always start here unless the user explicitly approves a previously-shown plan.
This phase is read-only. **Now includes automatic unused-image candidate discovery** —
the CSV is searched by default so you always see what unused images could be placed,
even in dry-run mode.

### Inventory

1. Resolve target file (latest-dated main or named companion).
2. Walk every `##` and `###` heading in scope.
3. Count: sub-sections, existing `<!-- 🎨 Figure Suggestion: ... -->` comments, existing local
   `![…](…)` images, existing HTML `<img>` tags, existing Cloudinary URLs,
   existing figures index file, existing figure numbers, bare Windows paths,
   broken references.
4. **Fast lookup:** grep `media-master.csv` for the chapter key (e.g., `ch05`) to get
   instant file counts, status breakdown (used/unused/archive/source), and file sizes.
   This replaces a raw filesystem walk for counting.
5. **Unused-candidate discovery (default, always):** grep `media-master.csv` for:
   - **Own chapter unused:** `"<chNN>"` rows with `unused` status — images in this
     chapter's folder not yet placed
   - **Cross-chapter unused:** `unused` rows from earlier chapters (`ch01`..`ch<NN-1>`)
     whose filenames or paths contain keywords from the current chapter's section
     headings (e.g., `sql`, `erd`, `normalization`, `index`)
   - Present the top candidates (up to 10) ranked by filename relevance to the
     chapter's topics. Skip images already in `*-used/` or `optimized/` folders.
     This step is read-only and runs automatically — it does not place or suggest
     anything. It feeds the Unused Image Candidates table in the Plan Output.
6. Scan the image folder for image files, animation files, notes, and reports
   (needed for thumbnails and content inspection — the CSV handles counts).
7. If full pipeline mode, determine smart-start stage.

### Plan Output

```
## Chapter Media Plan — chNN

Target: BITM330-Book-draft/chapter-drafts/chNN-…/main/chNN-main-YYYY-MM-DD.md
Mode: [full from stage N] / [dry-run] / [suggest|place|optimize only]
Scope: [chapter-wide] / [section: "### Heading Name"]
Image folder: .images/<folder>/
Cloudinary folder: Database-book-BITM330/<folder>/

### Existing State
- Sub-sections: X
- Figure suggestion comments: X
- Local images placed: X
- Cloudinary URLs: X
- Figures index: [present / missing] at `.images/<chapter>/figures-index.md`
- Media ledger: [present / missing]

### Unused Image Candidates (auto-discovered from media-master.csv)

| # | Filename | Source Chapter | Path | Why It Fits |
|---|----------|---------------|------|-------------|
| 1 | `erd-example.png` | ch03 | `ch03-what-is-data/ch03-unused/` | Section "Entity Relationships" |
| 2 | `sql-join-types.png` | ch05 | `ch05-sql/ch05-unused/` | Section "SQL JOINs" |
| … | … | … | … | … |

_No unused candidates found_ (if none).

### Proposed Actions

| Action | Count | Notes |
|---|---:|---|
| Add suggestions | X | sub-sections without visuals |
| Place unused candidates | X | X from own chapter, X from earlier chapters |
| Place images | X | X matches found, X to generate |
| Optimize | X | X cache hits, X new uploads |
| Rewrite links | X | local → Cloudinary |
| Update ledger | X | rows |

### Questions
1. Missing-figure policy: generate all / mark priority / leave pending?
2. [if slide-deck detected] Slide-deck strategy?
3. Path convention: workspace-relative / target-file-relative?
4. Figure numbering: continue from existing or restart?

Approve this plan? (yes / changes / specific rows to skip)
```

For dry run (Menu Option 2), stop here. For other modes, wait for approval.

---

## Phase 1 — Suggest

Add `<!-- 🎨 Figure Suggestion: ... -->` HTML comments where sections need visuals.

_Reference: `figure-suggestion/SKILL.md` for canonical comment format, chapter-wide
image-ideas file, and legacy-form recognition._

If the user needs publication-ready filenames, captions, Gemini prompts, a Figures Index,
or a CSV tracker rather than hidden suggestion comments, use `image-prompt` instead of this
phase. `image-prompt` produces visible prompt blocks and production handoff artifacts;
`figure-suggestion` produces hidden planning comments.

### Canonical Comment Format

```html
<!-- 🎨 Figure Suggestion: A short description of what the figure shows and why it helps the reader. -->
```

- Format is `<!-- 🎨 Figure Suggestion: [description] -->` exactly.
- Place directly under the paragraph where the visual belongs.
- Must be an HTML comment — never a visible Markdown heading.
- No file names, URLs, prompts, or Cloudinary links in the description.
- Prefer instructional visuals over decorative ones.

### Coverage Rule

Aim for one meaningful visual anchor per major sub-section. Skip only when a visual
would be redundant, decorative, or distracting — this should be the rare exception.

---

## Phase 2 — Place

Turn figure suggestions into real local figures with captions and sequential numbering.

_Reference: `image-placement/SKILL.md` for scan order, Gemini prompt format, slide-deck
handling, and the figures index format._

This phase may consume either hidden `figure-suggestion` comments or visible prompt blocks
created by `image-prompt`. When consuming `image-prompt` output, preserve the prompt text
for the Generation Gate and use its filename/title/caption as the starting proposal.

### Scan Order for Image Candidates

For each suggestion, scan and stop at the first good fit (judge both fit and quality):

1. **Own chapter's image folder** — `.images/<this chapter>/`
   _(Tip: grep `media-master.csv` for `<chNN>` to see all files in this chapter instantly.)_
2. **Earlier chapters** — unused images (not in `*-used/`) in previous chapters' folders
   _(Tip: grep the CSV for `unused` status in earlier chapters — `ch01`..`ch<NN-1>` — to find candidates without walking every folder.)_
3. **Later chapters** — light pass for obvious unused fits

### Actions Per Suggestion

| Action            | When                                        |
| ----------------- | ------------------------------------------- |
| Insert            | Good-fit image found                        |
| Generate + insert | No match; approved for generation           |
| Pending           | No match; generation not approved           |
| Skip (duplicate)  | Near-duplicate of another suggestion        |
| Skip (decorative) | Suggestion is decorative, not instructional |

### Figure Block

Replace the `<!-- 🎨 Figure Suggestion: ... -->` comment (or legacy `*Figure suggestion: …*` line) with:

```markdown
![Alt text](relative/path/to/figure-NN.X-slug.ext)

_Figure NN.X — Caption text._
```

Number sequentially within the chapter (NN.1, NN.2, …). Never duplicate numbers.

### Figures Index

Create or update `.images/<chapter-folder>/figures-index.md` (in the chapter's image folder, not in the chapter file itself):

```markdown
| Figure | Section        | Caption                                                              | Source file          |
| ------ | -------------- | -------------------------------------------------------------------- | -------------------- |
| 2.1    | What Is an IS? | Information systems connect people, processes, data, and technology. | `mis-components.png` |
```

If a figures index file already exists, update it — do not create a duplicate.

### Generated Figures

For `Generate + insert` rows, save the file in the chapter image folder using the
Gemini-style prompt format from `image-placement/SKILL.md`. Default to the minimalist
vector style from `style-minimalist-vector.md`. If no generation tool is available,
downgrade to `Pending` and leave an HTML comment marker — never insert a broken
image link.

---

## Phase 3 — Optimize & Upload

Optimize selected images, upload to Cloudinary, rewrite chapter links, and update
the media ledger.

_Reference: `image-link-optimizer/SKILL.md` for full scanner algorithm, cache/classify
decision table, ImageMagick table, MCP parameters, ledger schema, and atomic write._

### Pre-Flight

1. `magick -version` — stop if missing.
2. Probe Cloudinary MCP servers:
   - `plugin-cloudinary-cloudinary-asset-mgmt`
   - `plugin-cloudinary-cloudinary-analysis`
     Stop and instruct MCP auth if either fails.
3. Ensure `.images/book-media.md` exists with correct schema (see `book-media-format.md`).
4. Verify Cloudinary folder `Database-book-BITM330/<chapter-folder-name>/` exists.
   If missing, run `create-cloudinary-folders.js` or ask before creating via MCP.
5. Show a dry-run optimization table. Ask for approval.

### Scanner (Three Passes)

1. Markdown: `![alt](path-or-url)`
2. HTML: `<img src="…">` — capture `width` and `alt`
3. Bare quoted absolute Windows paths on their own line

Skip references in fenced code blocks and HTML comments. Skip non-image media.
Dedupe by normalized path before any optimize/upload.

### Optimization (ImageMagick)

Never modify or overwrite source images. Never upscale. Max width 1600 px.
Strip metadata. Save optimized copies into `.images/<folder>/chNN-used/`.

| Source                                | Action                                                              |
| ------------------------------------- | ------------------------------------------------------------------- |
| PNG diagram/screenshot                | `-resize "1600x>" -strip -colors 256`, keep PNG                     |
| Photo / gradient-heavy                | `-resize "1600x>" -strip -interlace Plane -quality 85`, convert JPG |
| WebP                                  | `-resize "1600x>" -strip -quality 85`, keep WebP                    |
| Animated GIF                          | `-coalesce -resize "1600x>" -layers Optimize`, keep GIF             |
| SVG / zero-byte / missing / non-image | Skip; log the skip reason                                           |

If optimized output is larger than source, copy source unmodified and log
`optimization-skipped-larger`.

### Upload (Cloudinary MCP)

Upload from `chNN-used/` via `plugin-cloudinary-cloudinary-asset-mgmt`. Never upload
from the raw source folder.

```text
folder           = Database-book-BITM330/<chapter-folder-name>
public_id        = chNN-<slug>
overwrite        = false
unique_filename  = false
use_filename     = true
resource_type    = image
tags             = ["bitm330", "chNN", "chapter-media"]
```

If Cloudinary reports the public ID exists, use `-v2`, `-v3` and retry. Never overwrite.

Call `plugin-cloudinary-cloudinary-analysis` only when local caption/alt sources are
weak (no meaningful caption, no meaningful alt). Otherwise skip for speed.

**Mid-batch MCP failure:** stop, flush buffered ledger, leave unprocessed refs
untouched, report partial state.

### Delivery URL — Transform Chain

Every Cloudinary delivery URL uses this chain:

```text
https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_<tier>/<public_id>
```

**Transform rationale:**

| Transform  | What it does                                                | Why                                                                     |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| `f_auto`   | Auto-detect best format (WebP, AVIF, or fallback)           | Serves next-gen formats to modern browsers; smaller files, same quality |
| `q_auto`   | Auto-detect best compression level                          | Balances quality and file size; no manual tuning                        |
| `c_limit`  | Fit within dimensions, maintain aspect ratio, never upscale | Prevents oversized delivery                                             |
| `w_<tier>` | Set maximum width                                           | Delivers appropriately sized assets per context                         |

**Width tier (first match wins):**

| Trigger                                                                                           | Width  | Full Transform                 |
| ------------------------------------------------------------------------------------------------- | ------ | ------------------------------ |
| HTML `<img width ≤ 300>` OR alt/caption/filename has `icon`/`logo`/`badge`                        | 600px  | `f_auto,q_auto,c_limit,w_600`  |
| Animated GIF                                                                                      | 900px  | `f_auto,q_auto,c_limit,w_900`  |
| Alt/caption/filename has `dashboard`/`diagram`/`erd`/`screenshot`/`infographic`, OR source ≥ 2 MB | 1600px | `f_auto,q_auto,c_limit,w_1600` |
| Default (photos, general figures)                                                                 | 1200px | `f_auto,q_auto,c_limit,w_1200` |

Do NOT add new `?_a=…` suffixes. Existing URLs that have one keep it; only the
transform block is rewritten.

Responsive `srcset` and LQIP placeholders are not included — these require HTML
attributes unavailable in standard Markdown. Can be added later if the book moves
to an HTML-first pipeline.

### Rewriting (Edit in Place)

- **`![alt](local)`** → `![best alt](cloudinary-url)` + `*best caption*`.
  If the next non-blank line is already an italic caption, replace it.
- **`<img src="…">`** → replace `src` only. Preserve `width`, `style`, alignment.
  Improve weak/empty `alt` only when clearly applicable. Add `loading="lazy"` if
  not already present. Do NOT insert a caption — HTML `<img>` is for decorative
  and inline icons.
- **Bare quoted path line** → replaced by the two-line image + caption block.
- **Existing Cloudinary URL on `dkndq6lyz`** → rewrite transform block per width
  tier; do not re-upload. Preserve public ID and any `?_a=…` suffix.
- **Other remote URL** → leave alone, flag.

### Media Ledger

Buffer all new/updated rows and write `.images/book-media.md` in one atomic pass.
Never leave the ledger half-written.

| Column           | Rule                                                          |
| ---------------- | ------------------------------------------------------------- |
| `#`              | Append-only sequential; never renumber                        |
| `Chapter`        | `chNN` for chapter, `shared` for general                      |
| `Original Path`  | Cache key — workspace-root-relative, `/`-separated, lowercase |
| `Optimized File` | Path under `chNN-used/`                                       |
| `Saved`          | Size reduction (e.g., `1.4 MB → 240 KB (-83%)`)               |
| `Cloudinary URL` | Full delivery URL with comma-style transforms                 |
| `Caption`        | Single line; replace `\|` with `/`                            |
| `Placement`      | `workspace-relative-path:line` entries joined by `;`          |

One row per image. Multiple uses append to the existing row. Do not update the
ledger during dry-run, suggest-only, or place-only modes.

Full schema and normalization rules: `book-media-format.md`.

---

## Final Report

When all stages complete, print a compact summary:

```
## Chapter Media Report — chNN

- Target:
- Mode:
- Scope:
- Image folder:
- Cloudinary folder:
- Suggestions added:
- Figures placed: X (X reused, X generated, X pending)
- Images optimized: X
- Images uploaded: X
- Cache hits (ledger): X
- Links rewritten: X
- HTML img tags updated with loading="lazy": X
- Existing Cloudinary transforms updated: X
- Ledger rows added/updated: X / X
- Figures index: [created / updated] at `.images/<chapter>/figures-index.md`
- Skipped/flagged:
- Author decisions needed:
```

Do not paste the full rewritten chapter.

---

## Safety Rules

1. Always plan before editing.
2. Ask before inserting, optimizing, uploading, or rewriting.
3. Never delete or overwrite source images.
4. Never overwrite Cloudinary assets.
5. Never create Cloudinary folders without approval.
6. Never insert absolute Windows paths in final Markdown.
7. Never insert broken image links.
8. Never edit unrelated prose, page breaks, callouts, or code blocks.
9. Never insert figures inside tables, code fences, blockquote callouts, or HTML comments.
10. Never optimize every candidate image before author selection.
11. Never update the media ledger during dry-run, suggest-only, or place-only modes.
12. Never expose API keys, tokens, or Cloudinary credentials.
13. Stop and ask when paths, folders, scope, or platform choices are ambiguous.

---

## Recommended Workflow

For normal chapter production:

```text
1. dry-run → see what's there
2. scan for new images → discover unplaced candidates
3. suggest → mark where visuals should go
4. place → author selects, insert approved local figures
5. optimize → only selected placed images
6. upload → to Cloudinary
7. rewrite → links to Cloudinary delivery URLs
8. update ledger → one atomic write
9. final report → summary
```

The key rule:

> Suggest broadly. Place selectively. Optimize only what is selected.
> Upload only what is used.

---

## File Writing by Mode

| Mode     |    May edit chapter? | May write report? | May upload? | May update ledger? |
| -------- | -------------------: | ----------------: | ----------: | -----------------: |
| dry-run  |                   No |          Optional |          No |                 No |
| scan-new |                   No |                No |          No |                 No |
| suggest  | Yes (after approval) |          Optional |          No |                 No |
| place    | Yes (after approval) |          Optional |          No |                 No |
| optimize | Yes (after approval) |               Yes |         Yes |                Yes |
| full     | Yes (after approval) |               Yes |         Yes |                Yes |

In `scan-new` mode, do not add figure suggestions directly unless the user
approves after seeing the candidate list.

In `place` mode, do not optimize or upload.

In `optimize` mode, process only images already placed in the chapter or
explicitly selected.

---

## Support Files

These companion files define formats and rules referenced by this skill:

- `book-media-format.md` — ledger schema, normalization, and statuses
- `figure-markdown-standards.md` — figure block format and caption rules
- `folder-scanning-rules.md` — image folder scanning rules
- `style-minimalist-vector.md` — default illustration style for generated figures

The individual stage skills remain available for single-stage work:

- `image-prompt` — Prompt/spec stage: create Gemini prompt blocks, placements, Figures Index, and CSV tracker
- `figure-suggestion` — Stage 1: insert `<!-- 🎨 Figure Suggestion: ... -->` comments
- `image-placement` — Stage 2: place local figures with captions and figures index
- `image-link-optimizer` — Stage 3: optimize, upload, rewrite, maintain ledger
