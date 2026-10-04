# Book Media Ledger Format

Companion to [`SKILL.md`](SKILL.md). Defines schema, normalization, and runtime status for `.images/book-media.md` — the cache **and** log for every image in the book.

## Header

```markdown
# BITM330 Book — Media Ledger

Source of truth for every image used in the book. Maintained automatically by the `image-link-optimizer` skill. Do not delete rows. See `.agents/skills/image-link-optimizer/book-media-format.md` for schema.

| # | Chapter | Original Path | Optimized File | Saved | Cloudinary URL | Caption | Placement |
|---|---------|---------------|----------------|-------|----------------|---------|-----------|
```

## Columns

| Column | Rule |
| --- | --- |
| `#` | Append-only sequential; never renumber. |
| `Chapter` | `chNN` for chapter assets, `shared` for `Database-book-BITM330/general/…`. |
| `Original Path` | **Cache key.** Workspace-root-relative, `/`-separated, lowercase. Empty only when unknown. |
| `Optimized File` | Workspace-root-relative path under `chNN-used/` for new rows. Legacy `chNN-optimized/` paths are valid for older rows. Empty when the row is a backfill of an existing Cloudinary URL. |
| `Saved` | `1.4 MB → 240 KB (-83%)`. Empty when no local optimization happened. |
| `Cloudinary URL` | Full delivery URL with comma-style transforms. For backfills, preserve the URL exactly as in the chapter (including any `?_a=…`). |
| `Caption` | Single line. Replace `\|` with `/`. Source order: existing chapter caption → meaningful alt → nearby paragraph/heading → Cloudinary AI caption only when local sources are weak → filename stem. |
| `Placement` | One or more `workspace-relative-path:line` entries joined by `;`. Line is from the chapter version that triggered the entry. |

## Row grain

**One row per image.** Multiple uses (same chapter or across chapters) append to the existing row's `Placement` cell — no new row.

## Ordering

Append-only, un-sorted. Chapter grouping is not maintained at write time. Filter, do not re-sort.

## Path normalization (cache lookup)

1. lowercase;
2. `\` → `/`;
3. strip surrounding quotes;
4. collapse repeated `/`;
5. resolve relative to the workspace root and emit without the root prefix.

Example: `"G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\Ch1 Welcome to the Textbook\journey.png"` → `.images/ch1 welcome to the textbook/journey.png`.

## Runtime statuses (not a column)

Inferred from row shape (empty `Optimized File` → `existing`; row created this run → `new`; placement appended → `reused`). Reported in the final summary, not stored.

```text
new   existing   reused   skipped-svg   skipped-remote
missing-source-file   zero-byte-source   upload-failed   needs-author-review
```

## Worked example

```markdown
| 1 | ch01 | .images/ch1 welcome to the textbook/journey.png | .images/Ch1 Welcome to the Textbook/ch01-used/ch01-six-stage-flow-from-data-to-decisions.png | 1.4 MB → 240 KB (-83%) | https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,w_1200/Database-book-BITM330/ch01-introduction-to-course/ch01-six-stage-flow-from-data-to-decisions | Six-stage flow from data to decisions. | BITM330-Book-draft/chapter-drafts/ch01-introduction-to-course/main/ch01-main-2026-05-26.md:7 |
```
