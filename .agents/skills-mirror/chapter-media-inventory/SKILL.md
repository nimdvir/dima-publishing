---
name: chapter-media-inventory
description: >
  Used/unused image tracking, CSV inventories, HTML thumbnail galleries, and
  recommendations for a BITM330 chapter. Read-only by default — never edits
  chapter files or uploads images. Use when auditing what images exist for a
  chapter, generating an inventory CSV, producing an HTML preview gallery, or
  getting recommendations on unused candidates. Companion to `chapter-media`
  (which handles placement, optimization, and Cloudinary delivery).
argument-hint: Chapter (chNN), image folder path, or "all"
---

# Chapter Media Inventory

Read-only inventory and reporting for a chapter's image assets. This skill is
the **audit and discovery** companion to `chapter-media`. It never edits chapter
Markdown, never uploads to Cloudinary, and never optimizes images.

```text
chapter-media-inventory  →  what do we have? what's used? what's available?
chapter-media            →  where should images go? optimize + deliver them
```

---

## When to Use

This skill is the **read-only audit companion**. For active pipeline work (placing
images, generating figures, optimizing, uploading to Cloudinary), use `chapter-media`.

| Request                           | Use                       |
| --------------------------------- | ------------------------- |
| What images exist for ch05?       | `chapter-media-inventory` |
| Which images are unused?          | `chapter-media-inventory` |
| Generate an image inventory CSV   | `chapter-media-inventory` |
| Build an HTML thumbnail gallery   | `chapter-media-inventory` |
| Place images into the chapter     | `chapter-media`           |
| Optimize and upload to Cloudinary | `chapter-media`           |

---

## Inventory Workflow

### 1. Resolve scope

- Single chapter: fuzzy-match `.images/` subfolder matching `^(Ch|ch)0?<N>\b`.
- All chapters: walk every matching subfolder under `.images/`.
- Named folder: use the path as given.

### 2. Scan the image folder

List every image file (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`) in
the folder, excluding files inside:

- `chNN-used/`
- `optimized/`
- `from-chapter/`
- Any `*-used/` subfolder

Record for each file:

```csv
filename, path, size_bytes, width, height, format, last_modified
```

### 3. Cross-reference against the chapter

For each image, determine placement status:

| Status       | Meaning                                                       |
| ------------ | ------------------------------------------------------------- |
| `placed`     | Referenced in chapter Markdown (`![…](…)` or `<img src="…">`) |
| `unplaced`   | Exists in folder but not referenced in chapter                |
| `cloudinary` | Already delivered via Cloudinary URL                          |
| `unknown`    | Cannot determine (file outside known folders)                 |

### 4. Output the inventory

Present as a Markdown table:

```
## Image Inventory — ch05

| # | Status | Filename | Size | Notes |
|---|--------|----------|------|-------|
| 1 | placed | fig-5.1-erd.png | 240 KB | In main §3.2 |
| 2 | unplaced | dashboard-draft.png | 1.2 MB | Screenshot — might fit §4.1 |
| 3 | cloudinary | ch05-erd.png | — | On Cloudinary |
```

Optionally write a CSV:

```csv
chapter,status,filename,path,size_bytes,width,height,format,placement_ref,notes
ch05,placed,fig-5.1-erd.png,.images/ch05-what-is-data/fig-5.1-erd.png,245760,1600,1200,png,ch05-main.md:142,""
ch05,unplaced,dashboard-draft.png,.images/ch05-what-is-data/dashboard-draft.png,1258291,1920,1080,png,,"Screenshot — §4.1?"
```

---

## Unplaced Image Recommendations

When unplaced images are found, present recommendations:

```
## Unplaced Images — ch05

| # | Filename | Looks like… | Recommended Section |
|---|----------|------------|---------------------|
| 1 | `dashboard-draft.png` | BI dashboard screenshot | §4.1 Business Intelligence |
| 2 | `schema-v2.png` | Updated ERD diagram | §2.3 Database Design |

What would you like to do?
a. Flag these for chapter-media placement
b. Mark as rejected (add to .images/<ch>/rejected.txt)
c. Take no action
```

Recommendations are based on filename keywords, visual inspection (if tools are
available), and chapter section headings. Never auto-place.

---

## HTML Gallery Generation

Generate a standalone HTML preview gallery for the chapter's image folder.

### Output

```text
.images/<chapter-folder>/gallery.html
```

### Requirements

- Thumbnail grid (200px thumbnails)
- Click to view full-size
- Sort by filename or last modified
- Show: filename, dimensions, file size, placement status
- Filter: all / placed / unplaced / cloudinary
- Self-contained single HTML file (inline CSS, no external dependencies)
- Accessible: alt text, keyboard navigable, proper headings

### Gallery template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Image Gallery — chNN</title>
    <style>
      /* Inline gallery styles — grid, thumbnails, filter bar, modal */
    </style>
  </head>
  <body>
    <header>
      <h1>chNN — Image Gallery</h1>
      <div class="filter-bar"><!-- filter buttons --></div>
      <div class="stats"><!-- count of placed/unplaced/cloudinary --></div>
    </header>
    <main class="gallery-grid">
      <!-- thumbnail cards -->
    </main>
    <div class="modal" hidden><!-- full-size overlay --></div>
  </body>
</html>
```

Generate the gallery only when asked. Do not auto-generate on every inventory.

---

## Scope and Limitations

- **Read-only by default.** Never edit chapter files, never upload images.
- **Image folder must exist.** If `.images/<chapter>/` is missing, report and stop.
- **Cloudinary awareness.** Can detect Cloudinary URLs in chapter Markdown but
  does not query the Cloudinary API directly unless the asset-management MCP is
  available and the user explicitly requests it.
- **Cross-chapter.** Can scan earlier or later chapters for unused images that
  might fit the current chapter, but only as a suggestion.

---

## Safety Rules

1. Never edit chapter Markdown files.
2. Never upload to Cloudinary.
3. Never optimize or modify images.
4. Never delete images or folders.
5. Never auto-place images — always present as recommendations.
6. Gallery generation is opt-in, not automatic.
