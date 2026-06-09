# Folder Scanning Rules

Rules for scanning chapter-local and global image folders during the inventory phase of the `image-placement` skill. Only execute these rules after the user has approved a folder scan.

---

## Two Sources

1. The chapter-local `.images` folder (inside the chapter folder).
2. The global project `.images` folder at the repository root.

Do not scan either folder automatically. Ask first.

---

## 3A. Chapter-Local `.images` Folder

Example path:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch02-mis-and-bitm\.images
```

This folder may contain:

- actual image files;
- old figure drafts;
- exported diagrams;
- screenshots;
- Markdown files with image ideas;
- CSV files with figure inventories;
- TXT files with image notes;
- production reports;
- prompt archives;
- caption drafts.

Ask first:

```markdown
Would you like me to check the chapter's local `.images` folder for existing images, caption notes, or image-idea files that may already belong in this chapter?
```

If approved, inspect the folder and identify:

- usable image files already present;
- image ideas stored in `.md`, `.txt`, or `.csv` files;
- captions that can be reused or improved;
- duplicate or outdated figure references;
- images that appear relevant but are not yet linked in the chapter.

Do not delete, move, rename, optimize, or insert anything during the scan. Only report what is available and where it might fit.

---

## 3B. Global Image Library

Example path:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images
```

This folder may contain reusable visuals, chapter-independent figures, exported diagrams, prompt archives, caption notes, or planning files.

When scanning, look for: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.md`, `.txt`, `.csv`.

For non-image files (`.md`, `.csv`, `.txt`), inspect whether they contain image ideas, figure captions, image filenames, draft prompt notes, placement suggestions, or chapter-specific visual plans.

Do not insert or modify anything during the scan. Only summarize what was found and suggest possible placements.

---

## Report Format for Suggested Placements

When surfacing candidates after a scan, use this format:

```markdown
### Suggested Additional Visuals

1. `figure-02.1-dikw-framework.png`
   - Source: chapter-local `.images` folder
   - Suggested placement: after the subsection "Data, Information, Knowledge, and Wisdom."
   - Suggested alt text: "Diagram showing the DIKW hierarchy from data to wisdom."
   - Suggested caption: "Figure 2.1 — The DIKW hierarchy explains how raw data becomes actionable judgment."
   - Action needed: insert image link only; file is already in the chapter `.images` folder.

2. `ch02-image-ideas-2026-05-19.md`
   - Source: chapter-local `.images` folder
   - Useful idea found: "A side-by-side visual comparing raw records with interpreted business information."
   - Suggested placement: after the subsection "What Is Data?"
   - Action needed: turn this idea into an image suggestion block or use it later as a design brief.

3. `figure-strategy-dashboard.png`
   - Source: global `.images` folder
   - Suggested placement: after the subsection "Business Intelligence as a Strategic Feedback Loop."
   - Suggested alt text: "Dashboard connecting operational data, KPIs, and managerial decisions."
   - Suggested caption: "Figure 15.4 — BI dashboards translate operational data into strategic feedback."
   - Action needed: copy and optimize during production if approved.
```

Do not copy, optimize, rename, or insert images at this stage unless the user explicitly approves.

---

## Delegation

For brand-new image ideas that are not already represented by an existing file or planning note, delegate idea generation to the `figure-suggestion` skill rather than fabricating ideas here.
