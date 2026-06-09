# Image Production Rules

Rules for Phase 7 of the `image-production` skill: optimization, format choice, GIF handling, preservation, methods, link updates, verification, and the production report template. Only execute this phase after the user has confirmed at Gate 4.

---

## Production Folder

Copy optimized images into the chapter-local `.images` folder.

Example for Chapter 2:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch02-mis-and-bitm\.images
```

If the chapter `.images` folder does not exist, create it.

- Do not delete any existing images in that folder.
- Never overwrite existing files. If a filename already exists, create a safe versioned filename, e.g. `figure-02.3-dikw-read-v2.png`.

---

## Preservation Rules (Non-Negotiable)

- Never overwrite original image files.
- Never modify source images.
- Never delete existing images.
- Never delete existing captions.
- Never move global image files; copy them.
- Always write optimized versions to a chapter-local output location.
- Always use collision-safe naming.
- Always verify outputs.
- Always report what changed.

---

## Standard Dimensions

| Use Case                      | Print Width  | Target Pixel Width           | Notes                                   |
| ----------------------------- | -----------: | ---------------------------: | --------------------------------------- |
| Full-page / full-width figure | 6–7 inches   | 1800–2100 px                 | Best for major diagrams and dashboards  |
| Two-column span               | 6–7 inches   | 1800–2100 px                 | Common for large workflows              |
| Single-column figure          | 3–3.5 inches | 900–1100 px                  | Best for smaller diagrams               |
| Half-column / inline figure   | 1.5–2 inches | 450–600 px                   | Best for small icons or compact visuals |
| GIF                           | 1.5 inches   | about 450 px wide at 300 DPI | Keep GIFs small                         |

## Recommended Defaults

- Default diagram size: **1800 × 1200 px**
- Preferred aspect ratios: **3:2** or **4:3**
- DPI: **300 DPI** when possible; **144 DPI** acceptable
- File size target: **under 500 KB–1 MB per image**
- Maximum width: generally **1800 px**

---

## Format Rules

| Format | Best For                                     | Recommendation                                                        |
| ------ | -------------------------------------------- | --------------------------------------------------------------------- |
| PNG    | Diagrams, flat colors, screenshots with text | Preferred for textbook diagrams                                       |
| JPEG   | Photos, gradients, complex images            | Use 85–90% quality                                                    |
| WebP   | Web-only use                                 | Avoid for print-first files unless explicitly requested               |
| GIF    | Short animations                             | Keep width around 450 px; do not convert unless approved              |
| SVG    | Vector diagrams                              | Preserve if publication pipeline supports it; otherwise export to PNG |

## Important Format Decision

Do **not** automatically convert every image to JPG. Preserve PNG when the image contains text, line art, screenshots, diagrams, ERDs, or flat colors. JPG is best for photos or gradient-heavy images. Convert formats only when it improves the publishing result and does not reduce readability.

---

## GIF Handling

- Preserve animation if possible.
- Resize to approximately **450 px wide** if production optimization is approved.
- Do not convert animated GIFs to PNG or JPG unless the user explicitly requests a static version.
- Skip animated GIF optimization if the tool cannot preserve animation safely.
- Report any GIFs skipped.

---

## Supported and Skipped Files

Process by default: `.png`, `.jpg`, `.jpeg`.

Handle carefully: `.gif`, `.svg`, `.webp`.

Skip by default unless explicitly requested: `.mp4`, `.webm`, `.mov`, `.pdf`, `.md`, `.txt`, `.csv`.

`.md`, `.txt`, and `.csv` files are not image files and should not be optimized; they may be useful only during folder scanning.

---

## Optimization Methods

### Preferred: ImageMagick

Check availability first:

```powershell
magick -version
```

If ImageMagick is not installed, stop production optimization and report:

```text
ImageMagick is not installed. Install it before running optimization, or approve a Python/Pillow fallback.
```

Do not silently switch tools.

Resize to 1800 px wide, preserve aspect ratio, set 300 DPI:

```powershell
magick input.png -resize 1800x -density 300 -strip output.png
```

Compress PNG diagrams with reduced colors:

```powershell
magick input.png -resize 1800x -density 300 -strip -colors 256 output.png
```

Convert photos or gradient-heavy images to JPEG:

```powershell
magick input.png -resize 1800x -density 300 -strip -quality 90 output.jpg
```

Batch process PNGs:

```powershell
Get-ChildItem *.png | ForEach-Object {
    magick $_.Name -resize 1800x -density 300 -strip -colors 256 "optimized_$($_.Name)"
}
```

### Optional: Python / Pillow

Use only if approved or if the environment already uses Python for image processing.

```python
from pathlib import Path
from PIL import Image

def optimize_image(input_path, output_path, max_width=1800, dpi=300):
    input_path = Path(input_path)
    output_path = Path(output_path)

    img = Image.open(input_path)

    if img.mode in ("RGBA", "LA"):
        output_format = "PNG"
    else:
        output_format = output_path.suffix.replace(".", "").upper()

    if img.width > max_width:
        ratio = max_width / img.width
        new_size = (max_width, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    save_kwargs = {"dpi": (dpi, dpi), "optimize": True}

    if output_format in ["JPG", "JPEG"]:
        save_kwargs["quality"] = 90
        save_kwargs["progressive"] = True

    img.save(output_path, **save_kwargs)
```

---

## Optional Lightweight Derivative Set

Only if the user requests a web/export set, create `.images/small/` inside the chapter-local `.images` folder. Defaults:

- format: JPG
- max width: 1600 px
- quality: 85
- DPI: 200
- metadata stripped
- top-level only unless recursion is approved
- collision-safe naming
- originals preserved

Do not create a `small/` derivative set unless asked.

---

## Choosing Optimization Size

| Image Type                       | Target Width          |
| -------------------------------- | --------------------: |
| Major conceptual diagram         | 1800 px               |
| Workflow or architecture diagram | 1800 px               |
| ERD or database schema           | 1800–2100 px if dense |
| Power BI dashboard screenshot    | 1800 px               |
| Small icon-like figure           | 450–600 px            |
| Simple one-column diagram        | 900–1100 px           |
| GIF                              | 450 px                |

When uncertain, default to **1800 px wide** for diagrams and screenshots.

---

## Update Chapter Links

After copying optimized images into the chapter-local `.images` folder, update relevant links:

```markdown
![Alt text](.images/figure-02.1-data-to-performance.png)

*Figure 2.1 — Caption text.*
```

Rules:

- Use `.images/filename.ext` for chapter-local images.
- Do not point to the global image folder in the final chapter file.
- Do not use absolute Windows paths in the final Markdown.
- Do not delete existing images.
- Do not delete existing captions.
- Preserve figure numbering.
- Make sure every image link resolves to a file in the chapter-local `.images` folder.

---

## Verification Checklist

After production, confirm:

- all new links use `.images/...`;
- every linked image file exists in the chapter-local `.images` folder;
- originals were not modified;
- no existing files were overwritten;
- file names are collision-safe;
- image widths follow the selected target;
- DPI metadata is set when possible;
- file sizes are recorded;
- skipped files are listed;
- animated GIFs were not damaged;
- the production report was created.

---

## Production Report

Save the report in the chapter-local `.images` folder, named:

```text
chNN-image-production-report-YYYY-MM-DD.md
```

Template:

```markdown
# Chapter NN Image Production Report — YYYY-MM-DD

## Source Chapter

`chNN-main-rewritten-YYYY-MM-DD.md`

## Local Image Folder

`.images/`

## Summary

- Existing image references standardized: X
- Chapter-local `.images` files scanned: Yes/No
- Global `.images` files scanned: Yes/No
- Additional images inserted: X
- Images optimized: X
- Chapter links updated: X
- Existing images deleted: 0

## Image Processing Details

|    # | Original File        | New File                          | Original Dimensions | New Dimensions | Original Size | New Size | Reduction |
| ---: | -------------------- | --------------------------------- | ------------------: | -------------: | ------------: | -------: | --------: |
|    1 | `old/path/image.png` | `.images/figure-02.1-example.png` |           2400×1600 |      1800×1200 |        2.4 MB |   640 KB |     73.3% |

## Link Updates

|    # | Old Link                   | New Link                          |
| ---: | -------------------------- | --------------------------------- |
|    1 | `../../images/example.png` | `.images/figure-02.1-example.png` |

## Skipped Files

|    # | File            | Reason                                                              |
| ---: | --------------- | ------------------------------------------------------------------- |
|    1 | `animation.gif` | Animated GIF preserved; optimization not performed without approval |

## Notes

- Existing image files were not deleted.
- Existing captions were preserved or standardized.
- Images were optimized according to the textbook image guidelines.
- Any files that could not be optimized are listed above.
```
