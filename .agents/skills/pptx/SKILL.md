---
name: pptx
description: 'PowerPoint Presentation Handler — create, edit, read, parse, and analyze Microsoft PowerPoint (.pptx) files. Use any time a .pptx file is involved as input, output, or both: creating slide decks, pitch decks, or presentations from scratch or from content; reading or extracting text, notes, and structure from existing .pptx files; adding, editing, or removing slides, shapes, images, tables, and charts; applying themes, layouts, fonts, and formatting; converting Markdown, chapter content, or outlines to a slide deck; converting .pptx to PDF or image export; generating speaker notes. Supports python-pptx (Python) and PowerShell COM automation.'
argument-hint: 'Describe what you want to create, read, or modify — e.g. "create a 10-slide deck for ch05" or "extract all speaker notes from this .pptx"'
---

# PowerPoint Presentation Handler (pptx)

## What This Skill Produces

A working `.pptx` file created, modified, or read — or extracted content (text, notes, tables) from an existing file.

---

## When to Use

| Goal | Trigger Phrase |
|------|---------------|
| Create a new deck | "make a PowerPoint", "create a slide deck", "build a presentation" |
| Read / extract | "read this .pptx", "extract speaker notes", "parse slide content" |
| Edit slides | "add a slide", "change the title", "update slide 3" |
| Apply formatting | "apply a theme", "change fonts", "set slide layout" |
| Add visuals | "insert a chart", "add a table to slide 2", "insert an image" |
| Convert content | "Markdown to slides", "chapter outline to deck", "outline to PowerPoint" |
| Export | "export slides as images", "convert to PDF" |
| Speaker notes | "add speaker notes", "extract all notes" |

---

## Tool Selection

| Situation | Recommended Tool |
|-----------|-----------------|
| Python environment | `python-pptx` — full read/write/format |
| PowerShell + Office installed | COM automation via `New-Object -ComObject PowerPoint.Application` |
| Convert to PDF/images | COM automation (Windows) or LibreOffice CLI (cross-platform) |
| Read-only inspection | `python-pptx` (no Office required) |

---

## Procedure

### Step 1 — Clarify the Goal

Before writing code, confirm:
- **Source**: new deck, existing `.pptx`, Markdown outline, or chapter content?
- **Output**: create, modify, read/extract, or export?
- **Features needed**: theme, layouts, images, tables, charts, speaker notes?
- **Environment**: Python or PowerShell?

### Step 2 — Install Dependencies

**Python:**
```powershell
pip install python-pptx Pillow
```

### Step 3 — Create or Load a Presentation

**New presentation:**
```python
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

prs = Presentation()
# Optional: set slide size to widescreen 16:9
prs.slide_width  = Inches(13.333)
prs.slide_height = Inches(7.5)
```

**Load existing:**
```python
prs = Presentation("existing.pptx")
```

**Use a template:**
```python
prs = Presentation("template.pptx")  # preserves theme and layouts
```

### Step 4 — Add Slides

```python
# Get available slide layouts (index depends on template)
# Common indices: 0=Title Slide, 1=Title+Content, 2=Section Header,
#                 5=Blank, 6=Title Only
slide_layout = prs.slide_layouts[1]  # Title and Content
slide = prs.slides.add_slide(slide_layout)
```

**Access placeholder text boxes:**
```python
title   = slide.shapes.title
content = slide.placeholders[1]

title.text   = "Slide Title"
content.text = "Body text here"
```

**Set text with formatting:**
```python
from pptx.util import Pt
from pptx.dml.color import RGBColor

tf = content.text_frame
tf.clear()
p = tf.add_paragraph()
run = p.add_run()
run.text = "Key point"
run.font.bold = True
run.font.size = Pt(24)
run.font.color.rgb = RGBColor(0x2F, 0x4F, 0x8F)
```

### Step 5 — Add Bullet Lists

```python
from pptx.util import Pt

tf = content.text_frame
tf.word_wrap = True

bullets = [
    ("Main point", 0, True,  28),
    ("Sub-point A", 1, False, 20),
    ("Sub-point B", 1, False, 20),
]

tf.clear()
for text, level, bold, size in bullets:
    p = tf.add_paragraph()
    p.level = level
    run = p.add_run()
    run.text = text
    run.font.bold = bold
    run.font.size = Pt(size)
```

### Step 6 — Add Shapes and Text Boxes

```python
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN

# Add a text box
txBox = slide.shapes.add_textbox(
    Inches(1), Inches(1), Inches(8), Inches(1.5)
)
tf = txBox.text_frame
tf.text = "Custom text box"
tf.paragraphs[0].alignment = PP_ALIGN.CENTER
```

**Add a rectangle with fill:**
```python
from pptx.util import Inches
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE_TYPE

shape = slide.shapes.add_shape(
    1,  # MSO_SHAPE_TYPE.RECTANGLE
    Inches(1), Inches(2), Inches(4), Inches(1)
)
shape.fill.solid()
shape.fill.fore_color.rgb = RGBColor(0x2F, 0x4F, 0x8F)
shape.line.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
shape.text = "Highlighted box"
shape.text_frame.paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
```

### Step 7 — Add Images

```python
from pptx.util import Inches

pic = slide.shapes.add_picture(
    "figure.png",
    left=Inches(7), top=Inches(1.5),
    width=Inches(5), height=Inches(4)
)
```

### Step 8 — Add Tables

```python
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

rows, cols = 4, 3
table = slide.shapes.add_table(
    rows, cols,
    Inches(1), Inches(2), Inches(10), Inches(3)
).table

headers = ["Column A", "Column B", "Column C"]
data = [
    ["Row 1A", "Row 1B", "Row 1C"],
    ["Row 2A", "Row 2B", "Row 2C"],
    ["Row 3A", "Row 3B", "Row 3C"],
]

# Header row
for col_idx, header in enumerate(headers):
    cell = table.cell(0, col_idx)
    cell.text = header
    run = cell.text_frame.paragraphs[0].runs[0]
    run.font.bold = True
    run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    cell.fill.solid()
    cell.fill.fore_color.rgb = RGBColor(0x2F, 0x4F, 0x8F)

# Data rows
for row_idx, row_data in enumerate(data, start=1):
    for col_idx, value in enumerate(row_data):
        table.cell(row_idx, col_idx).text = value
```

### Step 9 — Add Charts

```python
from pptx.chart.data import ChartData
from pptx.enum.chart import XL_CHART_TYPE
from pptx.util import Inches

chart_data = ChartData()
chart_data.categories = ["Q1", "Q2", "Q3", "Q4"]
chart_data.add_series("Revenue", (1.2, 1.8, 2.4, 3.1))

chart = slide.shapes.add_chart(
    XL_CHART_TYPE.COLUMN_CLUSTERED,
    Inches(1), Inches(2), Inches(8), Inches(4),
    chart_data
).chart

chart.has_title = True
chart.chart_title.text_frame.text = "Quarterly Revenue"
```

### Step 10 — Speaker Notes

**Add notes:**
```python
notes_slide = slide.notes_slide
notes_slide.notes_text_frame.text = "Speaker notes go here."
```

**Extract all notes from a file:**
```python
prs = Presentation("input.pptx")
for i, slide in enumerate(prs.slides, start=1):
    notes = slide.notes_slide.notes_text_frame.text if slide.has_notes_slide else ""
    if notes.strip():
        print(f"Slide {i}:\n{notes}\n")
```

### Step 11 — Read / Extract Slide Content

```python
prs = Presentation("input.pptx")

for i, slide in enumerate(prs.slides, start=1):
    print(f"\n=== Slide {i} ===")
    for shape in slide.shapes:
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                text = para.text.strip()
                if text:
                    print(f"  [L{para.level}] {text}")
        if shape.shape_type == 19:  # TABLE
            for row in shape.table.rows:
                print("  |", " | ".join(c.text for c in row.cells), "|")
```

### Step 12 — Markdown Outline → Slides

```python
import re
from pptx import Presentation
from pptx.util import Inches, Pt

def md_to_pptx(md_text: str, out_path: str):
    prs = Presentation()
    prs.slide_width  = Inches(13.333)
    prs.slide_height = Inches(7.5)

    current_title = None
    current_bullets = []

    def flush_slide():
        if current_title is None:
            return
        layout = prs.slide_layouts[1]
        slide = prs.slides.add_slide(layout)
        slide.shapes.title.text = current_title
        tf = slide.placeholders[1].text_frame
        tf.clear()
        for level, text in current_bullets:
            p = tf.add_paragraph()
            p.level = level
            p.add_run().text = text

    for line in md_text.splitlines():
        if line.startswith("# "):
            flush_slide()
            current_title = line[2:].strip()
            current_bullets = []
        elif line.startswith("## "):
            current_bullets.append((0, line[3:].strip()))
        elif line.startswith("- "):
            current_bullets.append((1, line[2:].strip()))
        elif line.startswith("  - "):
            current_bullets.append((2, line[4:].strip()))

    flush_slide()
    prs.save(out_path)
    print(f"Saved: {out_path}")
```

### Step 13 — Export Slides as Images (Windows)

```python
import comtypes.client
import os

pptx_path = os.path.abspath("deck.pptx")
output_dir = os.path.abspath("slides-export")
os.makedirs(output_dir, exist_ok=True)

ppt = comtypes.client.CreateObject("PowerPoint.Application")
ppt.Visible = 1
deck = ppt.Presentations.Open(pptx_path)
deck.Export(output_dir, "PNG")
deck.Close()
ppt.Quit()
print(f"Exported slides to: {output_dir}")
```

**Cross-platform (LibreOffice):**
```powershell
soffice --headless --convert-to png --outdir slides-export deck.pptx
# Or to PDF:
soffice --headless --convert-to pdf deck.pptx
```

### Step 14 — Save

```python
from datetime import date
today = date.today().strftime("%Y-%m-%d")
prs.save(f"ch05-slides-{today}.pptx")
print(f"Saved.")
```

---

## PowerShell COM Automation (Office Installed)

```powershell
$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue

# Open existing
$deck = $ppt.Presentations.Open("C:\path\to\deck.pptx")

# Add a slide
$slide = $deck.Slides.Add($deck.Slides.Count + 1, 1)  # ppLayoutText = 1
$slide.Shapes.Title.TextFrame.TextRange.Text = "New Slide Title"

# Save and close
$deck.Save()
$deck.Close()
$ppt.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
```

---

## Quality Checks

Before reporting done:
- [ ] File saves and opens in PowerPoint or LibreOffice without errors
- [ ] Slide count matches expected
- [ ] All placeholder text replaced (no "Click to add title" remnants)
- [ ] Images load correctly (no broken links)
- [ ] Font sizes readable at presentation scale (≥ 20pt for body)
- [ ] Speaker notes present if requested
- [ ] Slide numbers correct if visible

---

## Common Pitfalls

| Problem | Fix |
|---------|-----|
| `placeholder[1]` not found | Layout may use a different placeholder index; iterate `slide.placeholders` to inspect |
| Text appears in wrong placeholder | Check layout with `prs.slide_layouts[n].placeholders` before writing |
| Images blurry | Use high-resolution source (≥ 1920×1080 for full-slide images) |
| COM automation fails | Office must be installed and activated; run as the same user account that has Office licensed |
| `python-pptx` can't read a shape's text | Check `shape.has_text_frame` before accessing `.text_frame` |
| Font not rendering | Font must be installed on the system; embed fonts via File > Options in PowerPoint if distributing |

---

## Related Skills

- `xlsx` — Excel spreadsheet creation and formatting
- `pandoc-video` — embed video links in Markdown for Pandoc conversion
- `notebooklm` — generate NotebookLM prompts for chapter slide decks
- `brightspace-export` — full instructor package including quiz CSV and gradebook
