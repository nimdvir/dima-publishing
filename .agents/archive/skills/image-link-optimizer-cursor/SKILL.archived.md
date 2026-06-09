<!-- GENERATED-ARCHIVE: Do not use as active instructions.
status: archived
superseded_by: null
archive_reason: Historical implementation retained for reference
-->---
name: image-link-optimizer-cursor
description: >
  Cursor + MCP image optimizer for BITM330 chapters. Scans Markdown image links, HTML img
  tags, and bare quoted absolute Windows paths; uses `.images/book-media.md` as cache;
  optimizes misses with ImageMagick; saves used optimized files in
  `.images/{chapter-image-folder}/chNN-used/`; uploads via Cloudinary MCP; rewrites links
  to comma-style `f_auto,q_auto,w_<tier>` URLs.
argument-hint: Chapter Markdown path or `chNN`.
---

# Image Link Optimizer (Cursor)

MCP-only, ledger-driven. Touches image references only — never prose, callouts, iframes, non-image media. Sibling of `image-link-optimizer` (legacy skill is untouched). Ledger [`.images/book-media.md`](../../../.images/book-media.md). Schema and chapter→Cloudinary folder map [`.images/book-media-format.md`](../../../.images/book-media-format.md). Cloudinary cloud `dkndq6lyz`, root `bitm330book/`. Work in this order: resolve input, scan references, classify with the ledger table, show the confirmation gate, process approved references, then write the chapter and ledger once.

## Inputs

Accept `chNN`, a chapter folder, or a full path; resolve to the `chNN-main-*.md` under `main/` whose `YYYY-MM-DD` token in the filename is lexicographically greatest. If two files have the same date token, choose the one with the newest filesystem mtime. Resolve workspace root from the input (do not hard-code the drive prefix).

**Inventory-only mode:** if the user asks only to populate, place, verify, or refresh the optimized images used by a chapter in `chNN-used/`, run the scanner and the used-folder inventory pass only. Do not require ImageMagick or Cloudinary MCP, do not upload, do not rewrite the chapter, and do not edit the ledger unless the user also asks for optimization or link rewriting.

**Fuzzy local-folder match:** for `chNN` pick the first `.images/<X>` matching `^(Ch|ch)0?<N>\b` (case-insensitive). Ask only on zero or multiple matches.

**Used optimized folder:** save optimized files that are actually used in the chapter under `.images/<Chapter Image Folder>/chNN-used/` (for example, `.images/Ch01-Welcome-to-the-Textbook/ch01-used/`). Create the folder if missing. This folder is the chapter's used-image inventory, so do not place unused candidates there.

**Cloudinary folder check:** before upload, verify the target Cloudinary folder already exists through the asset-management MCP. If it does not exist, cannot be confirmed, or is ambiguous, stop and ask the user specifically: create `bitm330book/<chapter-folder>`, or use an existing Cloudinary folder? Do not create a Cloudinary folder unless the user explicitly approves creation or provides the correct existing folder path.

## Pre-flight

1. `magick -version`. Stop if missing.
2. Probe MCP servers `plugin-cloudinary-cloudinary-asset-mgmt` and `plugin-cloudinary-cloudinary-analysis` with a cheap no-op. If unauthenticated, stop and tell the user to run `mcp_auth` once per server through the Cursor MCP UI, then re-run. **No SDK fallback.**

## Scanner — three regex passes

1. Markdown: `![alt](src)`.
2. HTML: `<img src="..." ...>` (capture `alt`, `width`).
3. Bare quoted absolute Windows path on its own line: `^"[A-Za-z]:\\.+\.(png|jpe?g|gif|webp)"\s*$`.

Capture line, alt, width, nearest preceding non-blank paragraph, nearest heading. **Skip refs inside** fenced code blocks, HTML comments (`<!-- ... -->`), `<iframe …>` lines, and links ending in `.mp4 .webm .mov .mp3 .wav .pdf`.

If a resolved local path lies outside the workspace root, skip it and log `out-of-workspace-source`; do not copy, optimize, or upload it.

**Adjacent-redundant rule:** if a bare quoted path is followed within 3 non-blank lines by an HTML `<img>` resolving to the same file, drop the bare path and only rewrite the `<img>`.

## Ledger as cache + log

Load `.images/book-media.md` once. Normalize each local path to **workspace-root-relative, `/`-separated, lowercased**; look up the `Original Path` column.

If `.images/book-media.md` is missing, stop and ask the user whether to create a new ledger from the schema in `.images/book-media-format.md`. If the ledger is empty or its columns do not match the schema, stop and report the mismatch before any upload or chapter rewrite.

**Dedupe before processing.** Multiple refs to the same file collapse to one optimize+upload; the row holds all placements.

Use this decision table for each unique reference:

| In ledger? | URL on `dkndq6lyz`? | Path under `Ch0 General`? | Action |
|---|---|---|---|
| Yes | Any | Any | Reuse the row's URL + caption; append placement to `Placement` (`; `-joined). No optimize, no upload. If a local `Optimized File` exists outside `chNN-used/`, copy it into `chNN-used/` for this chapter's used-image inventory. |
| No | Yes | Public ID under `bitm330book/general/` | Backfill with `Chapter = shared`, empty `Optimized File`, status `existing`; rewrite the URL transformation block per the width-tier rule. No upload. |
| No | Yes | No | Backfill a new row, empty `Optimized File`, status `existing`; rewrite the URL transformation block per the width-tier rule. No upload. |
| No | No | Yes | Optimize into `.images/Ch0 General/ch00-used/`, upload to `bitm330book/general/`, use `public_id = ch00-<slug>`, set `Chapter = shared`, then caption, append row, and rewrite chapter. Never re-upload an existing `general/<id>`. |
| No | No | No local source | Leave other remote URLs unchanged and flag `skipped-remote`; skip SVG, missing, zero-byte, and non-image sources with the existing skip status. |
| No | No | No | Optimize into `chNN-used/`, upload via MCP, caption, append row, and rewrite chapter. |

## Used-folder inventory pass

Always run this pass for the target chapter after scanning. It may also be run by itself in inventory-only mode.

1. Create `.images/<Chapter Image Folder>/chNN-used/` if missing.
2. Build the set of images actually referenced by the chapter from Markdown images, HTML `<img>` tags, and bare quoted image paths, after applying dedupe and the adjacent-redundant rule.
3. For each referenced ChNN-specific image, look for an existing optimized local file in these places, in order:
  - `.images/<Chapter Image Folder>/chNN-used/`
  - `.images/<Chapter Image Folder>/optimized/`
  - `.images/<Chapter Image Folder>/optimized/from-chapter/`
  - `.images/<Chapter Image Folder>/chNN-optimized/`
4. Match by exact filename first, then by filename stem or Cloudinary public-id stem such as `ch01-flow`, `ch01-image-008`, or `ch01-ch01-summary2`.
5. Copy the matched optimized file into `chNN-used/` if it is not already there. Preserve the optimized filename; on same-name/different-byte collision, write `-v2`, `-v3`, etc.
6. Do not copy unmatched optimized candidates. Do not copy shared `Ch0 General` assets into a chapter-specific `chNN-used/`; shared assets stay under the shared Ch0 image area unless the user explicitly asks for a different inventory.
7. Count copied, already present, missing optimized local file, shared skipped, and unmatched optimized candidates in the final report.

This pass is for local inventory. It does not upload, rewrite Markdown, or modify the ledger by itself.

## Optimized output + naming

`.images/<Chapter Image Folder>/chNN-used/` (Ch0 General → `.images/Ch0 General/ch00-used/`). Filename `chNN-<slug>.<ext>` (or `ch00-<slug>`). Slug = alt ∪ AI caption: lowercase, kebab, strip non-`[a-z0-9-]`, collapse hyphens, **truncate at a word boundary to ≤ 40 chars**. Drop vague words (`image`, `figure`, `screenshot`, `final`) from the slug only; retain original alt, caption, and filename text for caption choice and width-tier detection. Collisions → `-v2`, `-v3`, ….

Use `chNN-used/` as the output and upload source for new optimized files. Legacy `chNN-optimized/` folders may be read for existing ledger rows, but new output does not go there.

## Optimization (ImageMagick)

Never upscale. Max width 1600 px, strip metadata.

- PNG diagram / screenshot → `-resize 1600x> -strip -colors 256`, keep PNG.
- Photo / gradient-heavy → `-resize 1600x> -strip -interlace Plane -quality 85`, convert to JPG.
- Animated GIF → `-coalesce -resize 1600x> -layers Optimize`, keep GIF.
- WebP → `-resize 1600x> -strip -quality 85`, keep WebP.
- SVG / zero-byte / missing / non-image → skip; log `skipped-svg`, `zero-byte-source`, `missing-source-file`, `skipped-remote`.

```bash
magick input.png -resize "1600x>" -strip -colors 256 output.png
```

If the optimized output is larger than the source, keep the source format and copy the original into `chNN-used/` unmodified; log `optimization-skipped-larger`.

## Cloudinary upload via MCP

For each miss, call `plugin-cloudinary-cloudinary-asset-mgmt` upload with `folder = bitm330book/<chapter-folder>` (or `bitm330book/general`), `public_id = chNN-<slug>` (or `ch00-<slug>`), `overwrite: false`, `unique_filename: false`, `tags: ["bitm330", "chNN", "image-link-optimizer-cursor"]`. Upload from `chNN-used/`, never the original. If Cloudinary reports that the public ID already exists, use the next local collision suffix (`-v2`, `-v3`, …) and retry without overwriting. Read the returned `public_id` back and use that exact value in the ledger and rewritten URLs.

If the upload target folder is missing or MCP would create it implicitly, stop before upload and ask whether to create that folder or use an existing folder supplied by the user.

Choose a caption source before calling AI: existing caption immediately below → preceding paragraph of at least 12 words within 3 non-blank lines + nearest heading → meaningful alt. A meaningful alt contains at least 4 tokens after removing stopwords (`a`, `the`, `of`, `in`, `on`, `and`) and vague words (`image`, `figure`, `screenshot`, `final`). If one of those local sources is available, use it as the caption and skip the AI call. Call `plugin-cloudinary-cloudinary-analysis` only when those local sources are weak, then use the AI caption as the next fallback. If the analysis MCP fails after a successful upload, fall back to meaningful alt → filename stem and flag the row as `caption-fallback` in the report; do not roll back the upload.

**Mid-batch MCP failure:** stop, flush buffered ledger rows, leave the chapter unedited for unprocessed refs, report partial state. The ledger remains consistent.

## Width tier + URL form

Apply the tiers in this order; first match wins.

- `w_400` — HTML `<img width <= 300>`, or original alt/caption/filename has `icon` `logo` `badge`.
- `w_900` — animated GIF (URL ends `.gif`).
- `w_1600` — original alt/caption/filename has `dashboard` `diagram` `erd` `screenshot` `infographic`, or original source file on disk is at least 2 MB before optimization.
- `w_1200` — default.

URL form is always comma-style: `…/image/upload/f_auto,q_auto,w_<tier>/<public_id>`.

**Existing Cloudinary URLs on `dkndq6lyz`** get the transformation block rewritten: `…/f_auto/q_auto/<id>?_a=BAMAAAiu0` → `…/f_auto,q_auto,w_<tier>/<id>?_a=BAMAAAiu0`. **Preserve existing `?_a=BAMAAAiu0` suffixes** on rewrite; new URLs do not add them.

## Caption + alt sources (in order)

Existing caption immediately below → preceding paragraph (≤ 3 lines) + heading → meaningful alt → Cloudinary AI caption when local sources are weak → filename stem. A meaningful alt contains at least 4 tokens after removing stopwords (`a`, `the`, `of`, `in`, `on`, `and`) and vague words (`image`, `figure`, `screenshot`, `final`). Single-line; replace `|` with `/`.

## Markdown rewrite rules

- `![old alt](path-or-url)` → `![<best alt>](<cloudinary-url>)` plus italic caption line below. **Idempotency:** if the next non-blank line is already `*…*`, replace it instead of adding a second caption.
- Bare quoted absolute path on its own line → replace the line with `![<best alt>](<cloudinary-url>)`, blank line, `*<best caption>*`.
- `<img src="…">` → replace `src` only. **No caption inserted by design** — `<img>` is reserved for decorative / inline icons (e.g., `width="220"` section icons). Do not "fix".
- Already-Cloudinary URL on `dkndq6lyz` → rewrite transformation block per the width-tier rule; do not re-upload.
- Other remote URL → leave alone, flag.

**Edit the chapter file in place.** Do not create a new dated copy.

## Confirmation gate + atomic writes

If zero image references are found after scanning, report counts and exit without prompting the user. Before the first write/upload, print a dry-run table (one row per unique reference: `Action | Reference | Reason | Placement`; actions = `optimize-upload-rewrite`, `rewrite-from-ledger`, `backfill`, `rewrite-cloudinary-url`, `skip`). Ask once. **Skip the gate on a pure cache-hit run** (only placement appends). If the user declines or does not approve, exit without writing the ledger or modifying the chapter file, and print the dry-run table as the final report.

Buffer all ledger rows in memory; write `.images/book-media.md` in **one pass at the end**. Rewrite the chapter in one pass. Either pre-run state or post-run state, never half-written.

## Safety

1. **Filesystem**
  - Never modify, delete, or overwrite original images.
  - Never overwrite files in `chNN-used/`; use `-v2`, `-v3`, etc.
  - Never place unused candidates in `chNN-used/`; it is only for optimized files represented by chapter references.
  - Never copy or upload local sources that resolve outside the workspace root.
2. **Cloudinary**
  - Never overwrite a Cloudinary asset; use `overwrite: false` and read the returned public ID.
  - Never create Cloudinary folders without explicit user direction.
  - Never re-upload an asset already in the ledger.
3. **Chapter content**
  - Never insert absolute Windows paths into the chapter.
  - Never edit prose, callouts, iframes, captions of unrelated images, or companion files (`lets-build`, `terms`, `rat`, `reflection`, `lab`) unless explicitly named.
4. **Credentials**
  - Never log or commit Cloudinary credentials.

## Final report

Counts: refs found (Markdown / HTML / bare / iframe-skipped); optimized + uploaded with cumulative size before → after; reused; backfilled; URLs rewritten with width tier; skipped (SVG, remote, missing, zero-byte, non-image); new ledger rows; chapter edited in place; anything needing author review.
