---
name: image-link-optimizer
description: >
  Stage 3 of the BITM330 image pipeline. Light, fast, MCP-driven optimizer for one chapter at a
  time. Scans the chapter main file for Markdown images, HTML `<img>` tags, and bare quoted
  absolute Windows paths; uses `.images/book-media.md` as cache and ledger; optimizes only misses
  with ImageMagick; saves used optimized files in `.images/{chapter-image-folder}/chNN-used/`;
  uploads via the Cloudinary asset-management MCP; uses Cloudinary analysis for weak-source
  captions, alt text, and slug seeds; rewrites chapter links in place with idempotent captions.
argument-hint: Chapter number, chapter folder, or main file path (e.g., "ch01" or "…/ch01-main-2026-05-26.md").
---

# Image Link Optimizer

**Pipeline stage 3 of 3:** `figure-suggestion` → `image-placement` → `image-link-optimizer`.

Take the local figures placed by stage 2 and finish them for delivery: optimize, upload to Cloudinary, and rewrite the chapter links to optimized URLs. Chapter **main** file only — companion files are not touched unless the user names them.

## Does / Does NOT

This skill **does**:

- optimize image files with ImageMagick into `chNN-used/`;
- upload via the Cloudinary asset-management MCP;
- rewrite chapter image links to comma-style Cloudinary URLs in place;
- own and maintain `.images/book-media.md` (the media ledger) — **this is the only skill that writes it**.- own and maintain `.images/master-image-index.csv` — regenerated after every ledger write.
This skill **does NOT**:

- invent figure ideas → `figure-suggestion`;
- place local figures, generate figures, or maintain the figures index → `image-placement`;
- edit prose, callouts, iframes, or non-image media.

## Inputs and pre-flight

Accept `chNN`, a chapter folder, or a main file path → resolve to the newest `chNN-main-*.md` under `BITM330-Book-draft/chapter-drafts/chNN-…/main/`. Resolve workspace root from the input; do not hard-code the drive prefix. If two files share the same `YYYY-MM-DD` token, choose the newest filesystem mtime. Ask if ambiguous.

**Checkpoint:** confirm the resolved file is the latest-dated main file before any write. Show the dry-run gate (below) before the first optimize/upload/rewrite.

**Inventory-only mode:** if the user asks only to populate, place, verify, or refresh the optimized images used by a chapter in `chNN-used/`, run the scanner and the used-folder inventory pass only. Do not require ImageMagick or Cloudinary MCP, do not upload, do not rewrite the chapter, and do not edit the ledger unless the user also asks for optimization or link rewriting.

1. `magick -version`. If missing, stop. No Pillow / SDK fallback.
2. Probe both Cloudinary MCP servers with a no-op:
   - `plugin-cloudinary-cloudinary-asset-mgmt`
   - `plugin-cloudinary-cloudinary-analysis`

   If either fails auth, stop and instruct one-time `mcp_auth` on both.
3. Ensure `.images/book-media.md` exists. If missing, stop and ask whether to create it from the schema in [book-media-format.md](book-media-format.md). If it is empty or its columns do not match the schema, stop and report the mismatch before any upload or chapter rewrite.

## Scanner — three passes

Capture each reference with line number, alt, width, nearest following italic caption, nearest preceding non-blank paragraph, and nearest heading.

1. **Markdown:** `![alt](path-or-url)`
2. **HTML:** `<img src="path-or-url" ...>` (also capture `width` and `alt`)
3. **Bare quoted absolute Windows path on its own line:** `^"[A-Za-z]:\\.+\.(png|jpe?g|gif|webp)"\s*$`

Skip references inside fenced code blocks and HTML comments. Skip `<iframe>` and non-image media (`.mp4 .webm .mov .mp3 .wav .pdf`).

If a resolved local path lies **outside the workspace root**, skip it and log `out-of-workspace-source`; do not copy, optimize, or upload it.

**Adjacent-redundant rule:** if a bare quoted path is followed within 3 non-blank lines by an HTML `<img>` that resolves to the same file, drop the bare path from rewriting and process only the `<img>`. Still record both placements in the ledger row.

## Cache + classify

Load `.images/book-media.md` into a map keyed by `Original Path`. Normalize each local path to **workspace-root-relative, `/`-separated, lowercase**. **Dedupe by normalized path** before any optimize/upload — one row per image, placements joined by `; `.

| In ledger? | URL on `dkndq6lyz`? | Under `Ch0 General`? | Action |
|---|---|---|---|
| Yes | Any | Any | Reuse the row's URL + caption; append placement. No optimize, no upload. If a local `Optimized File` exists outside `chNN-used/`, copy it into `chNN-used/`. |
| No | Yes | Public ID under `Database-book-BITM330/00-general/` | Backfill `Chapter = shared`, empty `Optimized File`, status `existing`; rewrite the transform block per the width-tier rule. No upload. |
| No | Yes | No | Backfill a new row, empty `Optimized File`, status `existing`; rewrite the transform block per the width-tier rule. No upload. |
| No | No | Yes | Optimize into `.images/Ch0 General/ch00-used/`, upload to `Database-book-BITM330/00-general/`, `public_id = ch00-<slug>`, `Chapter = shared`, caption, append row, rewrite chapter. Never re-upload an existing `00-general/<id>`. |
| No | No | No local source | Leave other remote URLs unchanged, flag `skipped-remote`; skip SVG, missing, zero-byte, non-image with the matching skip status. |
| No | No | No | Optimize into `chNN-used/`, upload via MCP, caption, append row, rewrite chapter. |

## Used-folder inventory pass

Always run for the target chapter after scanning. May also run by itself in inventory-only mode.

1. Create `.images/<Image Folder>/chNN-used/` if missing.
2. Build the set of images actually referenced by the chapter (Markdown images, HTML `<img>`, bare quoted paths) after dedupe and the adjacent-redundant rule.
3. For each referenced ChNN-specific image, look for an existing optimized local file, in order:
   - `.images/<Image Folder>/chNN-used/`
   - `.images/<Image Folder>/optimized/`
   - `.images/<Image Folder>/optimized/from-chapter/`
   - `.images/<Image Folder>/chNN-optimized/`
4. Match by exact filename first, then by filename stem or Cloudinary public-id stem (`ch01-flow`, `ch01-image-008`, `ch01-ch01-summary2`).
5. Copy the matched optimized file into `chNN-used/` if not already there. Preserve the optimized filename; on same-name/different-byte collision, write `-v2`, `-v3`, etc.
6. Do not copy unmatched candidates. Do not copy shared `Ch0 General` assets into a chapter-specific `chNN-used/`.
7. Count copied, already present, missing optimized local file, shared skipped, and unmatched candidates in the final report.

This pass does not upload, rewrite Markdown, or modify the ledger by itself.

### Used vs free model

`chNN-used/` is the chapter's used-image inventory. **Any optimized image not inside a `*-used/` folder is still free** for `image-placement` to reuse in another chapter. Keep a lightweight manifest line per copied file (filename, source, one-line fit/quality note) in the final report so reuse decisions stay visible.

## Folder resolution

- **Cloudinary folder:** `Database-book-BITM330/<chapter-folder-name>` from `chapter-drafts/<folder>/`. For `ch00` use `Database-book-BITM330/00-general`. See the chapter→folder map in [book-media-format.md](book-media-format.md).
- Before uploading, verify the Cloudinary folder already exists via the asset-management MCP. If it does not exist, cannot be confirmed, or is ambiguous, **stop and ask**: create `Database-book-BITM330/<chapter-folder-name>`, or use an existing folder? Do not create a Cloudinary folder without explicit approval.
- **Local image folder:** fuzzy match — first `.images/` subfolder matching `^(Ch|ch)0?<N>\b`. Ask on zero or multiple matches.
- **Used optimized output:** `.images/<Image Folder>/chNN-used/` — create if missing. New optimized files go here; uploads read from here. Legacy `chNN-optimized/` may be read for existing ledger rows; new output does not go there.

## Naming

New optimized copies use `chNN-<slug>.<ext>` in `chNN-used/`. Slug source order: existing meaningful italic caption → meaningful alt → preceding paragraph/nearest heading → AI caption or slug seed when local sources are weak → original filename stem. Lowercase, strip non-`[a-z0-9-]`, collapse repeated hyphens, drop vague words (`image`, `figure`, `screenshot`, `final`) from the slug only, and **truncate at a word boundary to ≤ 40 characters**. Collisions → `-v2`, `-v3`.

Existing ledger hits keep their optimized filename and Cloudinary URL. Do not rename source images, previously logged optimized files, copied inventory files, or existing Cloudinary assets during a normal run.

## AI captions and filename assistance

Cloudinary analysis may provide a concise caption, an accessible alt-text candidate, and a filename/public-id slug seed. Human-authored text remains authoritative: keep existing meaningful captions and alt text unless vague, wrong, or missing.

Treat local sources as **weak** when there is no immediate italic caption, no meaningful alt, no preceding paragraph of at least 12 words within 3 non-blank lines, or the filename/stem is vague. A **meaningful alt** has at least **4 tokens after removing stopwords** (`a`, `the`, `of`, `in`, `on`, `and`) and vague words (`image`, `figure`, `screenshot`, `final`). When sources are weak, call `plugin-cloudinary-cloudinary-analysis` as soon as the optimized or uploaded asset is available.

AI captions are single-line, student-facing, concrete, usually 8–18 words. Do not hallucinate labels, numbers, systems, or business facts not visible in the image or nearby text. Avoid `An image of…`. Replace `|` with `/` before writing captions to Markdown or the ledger. If analysis fails after a successful upload, fall back to meaningful alt → filename stem and flag the row `caption-fallback`; do not roll back the upload.

AI-assisted renaming applies only to the new optimized copy in `chNN-used/` and a new Cloudinary `public_id` for a local miss. Never rename existing assets in the default workflow.

## Optimization (ImageMagick)

Never upscale. Max width 1600 px, strip metadata.

| Source | Action |
|---|---|
| PNG diagram/screenshot | `-resize "1600x>" -strip -colors 256`, keep PNG |
| Photo / gradient-heavy | `-resize "1600x>" -strip -interlace Plane -quality 85`, convert to JPG |
| WebP | `-resize "1600x>" -strip -quality 85`, keep WebP |
| Animated GIF | `-coalesce -resize "1600x>" -layers Optimize`, keep GIF |
| SVG / zero-byte / missing / non-image | skip; log `skipped-svg`, `zero-byte-source`, `missing-source-file`, `skipped-remote` |

```bash
magick "input.png" -resize "1600x>" -strip -colors 256 "chNN-used/chNN-slug.png"
```

If the optimized output is **larger than the source**, keep the source format and copy the original into `chNN-used/` unmodified; log `optimization-skipped-larger`.

## Upload via Cloudinary MCP

Use `plugin-cloudinary-cloudinary-asset-mgmt`:

```text
folder           = Database-book-BITM330/<chapter-folder-name>   (or Database-book-BITM330/00-general)
public_id        = chNN-<slug>                          (or ch00-<slug>)
overwrite        = false
unique_filename  = false
use_filename     = true
resource_type    = image
tags             = ["bitm330", "chNN", "image-link-optimizer"]
```

Upload from the file in `chNN-used/`, never the original source. If Cloudinary reports the public ID already exists, use the next local collision suffix (`-v2`, `-v3`, …) and retry without overwriting. Read the returned `public_id` back and use that exact value in the ledger and rewritten URLs. If the upload target folder is missing or MCP would create it implicitly, stop and ask first.

Call `plugin-cloudinary-cloudinary-analysis` only when local sources are weak (see above); otherwise use local text and skip the AI call for speed.

**Mid-batch MCP failure:** stop, flush buffered ledger (consistent — no half-written row), leave unprocessed refs untouched, report partial state.

## Delivery URL — comma-style with width tiers

```text
https://res.cloudinary.com/dkndq6lyz/image/upload/<transforms>/<public_id>
```

Width tier (first match wins):

| Trigger | Transform |
|---|---|
| HTML `<img width ≤ 300>` OR alt/caption/filename contains `icon` / `logo` / `badge` | `f_auto,q_auto,c_limit,w_600` |
| Animated GIF (URL ends `.gif`) | `f_auto,q_auto,c_limit,w_900` |
| Alt/caption/filename contains `dashboard` / `diagram` / `erd` / `screenshot` / `infographic`, OR source file ≥ 2 MB before optimization | `f_auto,q_auto,c_limit,w_1600` |
| Otherwise (default) | `f_auto,q_auto,c_limit,w_1200` |

New URLs do **not** add `?_a=…`. Existing URLs on `dkndq6lyz` keep their `?_a=…` suffix; rewrite only the transform block (`…/f_auto/q_auto/<id>?_a=…` → `…/f_auto,q_auto,c_limit,w_<tier>/<id>?_a=…`).

## Rewriting (edit in place)

The skill edits the input file directly — no new dated copy.

- **`![alt](…)`** → `![best alt](cloudinary-url)` + blank line + `*best caption*`.
- **Bare quoted path line** → replaced by the same two-line image + caption block.
- **`<img src="…">`** → replace `src` only. Preserve `width`, style, alignment; improve weak/empty `alt` only when the best alt clearly applies. **No caption inserted** — HTML `<img>` is reserved for decorative/inline icons. Do not "fix" this.
- **Existing Cloudinary on `dkndq6lyz`** → rewrite transform block per width tier; do not re-upload.
- **Other remote URL** → leave alone, flag.

**Caption idempotency:** if the next non-blank line is already `*…*`, replace it; otherwise insert. Captions are single-line; replace `|` with `/`.

**Best caption order:** existing italic caption below → existing meaningful alt → preceding paragraph within 3 non-blank lines + nearest heading → Cloudinary AI caption → filename stem.

**Best alt order:** existing meaningful alt (≥ 4 tokens after stopwords/vague words) → existing italic caption below → preceding paragraph within 3 non-blank lines + nearest heading → Cloudinary AI alt/caption → filename stem.

## Confirmation gate

If zero image references are found, report counts and exit without prompting. Before the first write or upload, show one dry-run table (`Action | Reference | Reason | Placement`) with rows like `optimize-upload-rewrite`, `rewrite-from-ledger`, `backfill`, `rewrite-cloudinary-url`, `skip`. Ask once. **Skipped automatically on pure cache-hit runs** (no optimizes/uploads, only link rewrites and backfills). If the user declines, exit without writing the ledger or chapter, and print the dry-run table as the final report.

## Atomic batched ledger write

Buffer every new or updated row in memory. After all references are processed (or after a mid-batch stop), write `.images/book-media.md` in **one** pass. The ledger is either pre-run or post-run state — never half-written. Rewrite the chapter in one pass too. Schema, normalization, and statuses: [book-media-format.md](book-media-format.md).

## Master Image Index

After every ledger write (including pure cache-hit runs that add new placements), rebuild `.images/master-image-index.csv` from the ledger. This CSV gives a single searchable inventory of every production image with both an online Cloudinary URL and a local file path.

### Rebuild procedure

1. Parse all rows from `.images/book-media.md`.
2. For each row, extract: chapter, Cloudinary URL, caption, figure number (from caption), optimized file path.
3. Assign a unique sequential `image_id` per chapter: `chNN-001`, `chNN-002`, etc. Never reuse IDs — increment the max counter per chapter.
4. Populate both `cloudinary_url` (online) and `production_file` (local path to the optimized file in `chNN-used/`).
5. Export as CSV with proper quoting — Cloudinary URLs contain commas (`f_auto,q_auto,c_limit`) and must be double-quoted. Use PowerShell's `Export-Csv` or manual quoting that wraps any field containing commas in double quotes.
6. Preserve existing entries for chapters not touched in this run.

### CSV schema

**Required fields:** `image_id` (unique per chapter, `chNN-NNN`), `chapter`, `cloudinary_url`, `production_file` (workspace-relative path to local optimized file), `caption`, `file_name`, `format`, `status` (`production`), `used_in_book` (`TRUE`).

**Unique ID rule:** IDs are `chNN-NNN` with zero-padded sequential numbers scoped per chapter. If the current CSV already has `ch04-047` as the max, the next ch04 entry gets `ch04-048`.

**Local path rule:** `production_file` must point to the actual current location of the optimized file. If the chapter image folder was reorganized (e.g., `ch02-used/` → `used-2026-06-05/`), update the path to match. The path is workspace-relative (e.g., `.images/ch04-databases/used/ch04-001.png`).

## Safety

1. Never modify or delete original images.
2. Never overwrite files in `chNN-used/`; use `-v2`, `-v3`, etc.
3. Never overwrite Cloudinary assets; use `overwrite: false` and read back the returned public ID.
4. Never create a Cloudinary folder without explicit user direction.
5. Never re-upload an image already in the ledger unless explicitly asked.
6. Never copy or upload local sources that resolve outside the workspace root.
7. Never insert absolute Windows paths into chapter Markdown.
8. Never edit unrelated prose, callouts, iframes, or companion files unless explicitly named.
9. Never place unused candidates in `chNN-used/`; it is only for optimized files referenced by the chapter.
10. Never rename original source files, existing ledger-hit optimized files, copied inventory files, or existing Cloudinary assets during the default workflow.
11. Never embed Cloudinary credentials or print MCP tokens.
12. Never leave `.images/master-image-index.csv` stale after a ledger write — always rebuild it.

## Final report

Concise: chapter, used optimized folder, Cloudinary folder, then counts for optimized+uploaded (with cumulative size before → after) / reused / backfilled / URLs rewritten with width tier / skipped (SVG, remote, missing, zero-byte, non-image) / flagged, the used-folder manifest lines, plus brief notes on any AI captions or AI-assisted slugs. Do not paste the rewritten chapter.
