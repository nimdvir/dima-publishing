<!-- GENERATED-ARCHIVE: Do not use as active instructions.
status: archived
superseded_by: null
archive_reason: Historical implementation retained for reference
-->---
name: image-placement-gemini
description: >-
  Scan one BITM330 chapter for figure suggestions, map them to existing local images in
  .images/ChNN, prompt for custom image generation for missing figures, and insert them in-place with captions.
---

# Image Placement & Generation Skill

A focused utility skill to scan chapter drafts for figure suggestions, map them to existing local image files in `.images/ChNN/`, prompt for image generation of missing diagrams, and rewrite chapter links in-place with captions.

## Overview
This skill replaces inline `*Figure suggestion: ...*` placeholders with local Markdown image links relative to the chapter directory. It does not perform image compression, ledger updates, or Cloudinary uploads.

---

## Execution Modes

The placer utility script runs in two modes:

| Mode | Purpose | Writes files? | Rewrites chapter? |
|---|---|---:|---:|
| `dry-run` | Audits suggestions, lists matching local files, and outputs prompts for missing figures. **(Default)** | No | No |
| `rewrite` | Replaces suggestion placeholders in-place with local relative links and captions. | Yes | Yes |

---

## Workflow

Follow these steps to integrate images for a chapter:

### Step 1: Scan and Audit (Dry Run)
Execute a dry-run check of the chapter's figure suggestions:
```bash
python .agents/skills/image-placement-gemini/image_optimizer.py --mode dry-run --chapter ch05
```
This prints a table showing matched files and lists the **missing figures** with recommended prompts for image generation.

### Step 2: Generate Missing Figures
For any suggestion identified as `[MISSING]`, invoke the image generation tool to create a clean textbook figure:
* **Prompt**: Use the recommended prompt from Step 1 (e.g. `An educational diagram demonstrating...`)
* **ImageName**: Name the file in lowercase with underscores representing the concept (e.g. `supabase_dashboard_map`).
* **Storage Location**: Copy the resulting PNG or JPEG file into the local chapter image folder: `.images/ChNN/` (e.g., `.images/Ch5-SQL/`).

### Step 3: Rewrite Chapter Links
Once all missing figures are generated and copied, run the script in `rewrite` mode:
```bash
python .agents/skills/image-placement-gemini/image_optimizer.py --mode rewrite --chapter ch05
```
This replaces placeholders with relative Markdown links (e.g. `![image.png](../../../../.images/Ch5-SQL/image.png)`) and adds/replaces the italicized caption on the next line.

---

## Safety & Safeguards

1. **Original Images**: Never modify or delete existing original images.
2. **Prose Isolation**: Do not edit any prose, headings, callouts, or iframes.
3. **Caption Idempotency**: Before inserting a caption, check if the subsequent line is already an italicized caption (`*...*`). If so, replace it; otherwise insert a new line.
4. **No Absolute Paths**: Never use absolute Windows paths in Markdown links; always use relative paths nested to the `.images/` directory (e.g., `../../../../.images/ChNN/...`).
