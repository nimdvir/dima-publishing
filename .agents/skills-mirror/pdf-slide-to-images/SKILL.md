---
name: pdf-slide-to-images
description: 'Convert a PDF slide deck into individual PNG files named with chapter prefix + short slide description. Use when: a user asks to split slide PDFs into page images, remove slide footer/logo area, and create descriptive filenames for chapter media. No optimization/upload in this skill.'
argument-hint: 'Provide PDF path, chapter name/tag, and output folder, e.g. "extract G:/.../deck.pdf for ch10 into G:/.../.images/ch10-advanced-sql-queries"'
---

# PDF Slide To Images

## What This Skill Produces

- One PNG image per PDF page.
- Filenames in this pattern:

  chapter-name-pNN-short-description.png

- A CSV manifest named slide-image-manifest.csv in the output folder.

This skill does NOT optimize images and does NOT upload to Cloudinary.

## Inputs

- PDF path
- Chapter name or tag (example: ch10-advanced-sql-queries)
- Output folder
- Optional: DPI (default 300)
- Optional: crop bottom percent (default 0)

## Command

```powershell
python .agents/skills/pdf-slide-to-images/pdf_to_slide_images.py \
  --pdf "G:/My Drive/.../The_SQL_Data_Refinery.pdf" \
  --chapter "ch10-advanced-sql-queries" \
  --out "G:/My Drive/.../.images/ch10-advanced-sql-queries" \
  --dpi 300 \
  --crop-bottom-pct 0
```

Use a non-zero crop (example 7) only when the source deck has a bottom logo/footer to remove.

## Dependencies

```powershell
pip install pymupdf Pillow
```

## Behavior Rules

- Keep edits non-destructive: do not modify the original PDF.
- Preserve page order.
- Always include page number in filename for stable sorting.
- Create unique filenames if two pages produce the same description.
- Keep output local only (no optimization, no upload).

## Output Example

- ch10-advanced-sql-queries-p01-mastering-advanced-sql-techniques.png
- ch10-advanced-sql-queries-p02-building-reliable-analytical-workflows.png
- slide-image-manifest.csv

## Typical Follow-Up

After this skill, run chapter media flow for placement/optimization/upload:

- chapter-media
- image-link-optimizer
