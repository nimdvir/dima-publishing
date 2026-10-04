---
name: pdf
description: 'PDF Processing — comprehensive PDF manipulation toolkit. MANDATORY TRIGGERS: any mention of PDF, .pdf, form, extract, merge, split, compress, rotate, watermark, annotate, convert to PDF, convert from PDF. Use when: extracting text or tables from a PDF; creating a new PDF from scratch or from HTML/Markdown; merging multiple PDFs into one; splitting a PDF into pages or ranges; filling or reading PDF forms; adding watermarks or page numbers; compressing or optimizing a PDF; converting PDF to images or images to PDF. Supports pypdf, pdfplumber, reportlab, and WeasyPrint (Python) and Pandoc (Markdown → PDF).'
argument-hint: 'Describe the goal — e.g. "extract tables from report.pdf" or "merge ch01.pdf and ch02.pdf" or "create a PDF from this Markdown"'
---

# PDF Processing

## What This Skill Produces

A processed or newly created PDF file, or extracted content (text, tables, form fields) from an existing PDF.

---

## When to Use

| Goal | Trigger |
|------|---------|
| Extract text | "get text from PDF", "read PDF", "parse PDF content" |
| Extract tables | "extract tables", "get data from PDF", "table from PDF" |
| Create PDF | "make a PDF", "generate PDF", "convert to PDF" |
| Merge PDFs | "combine PDFs", "merge files", "join PDFs" |
| Split PDF | "split PDF", "extract pages", "separate PDF" |
| Fill / read forms | "fill PDF form", "read form fields", "PDF form data" |
| Add watermark | "watermark PDF", "stamp PDF", "add page numbers" |
| Compress | "reduce PDF size", "compress PDF", "optimize PDF" |
| Convert | "PDF to images", "images to PDF", "Markdown to PDF" |

---

## Tool Selection

| Task | Library |
|------|---------|
| Extract text | `pdfplumber` (best for text + tables) or `pypdf` |
| Extract tables | `pdfplumber` |
| Merge / split / rotate | `pypdf` |
| Create PDF from scratch | `reportlab` |
| HTML / Markdown → PDF | `WeasyPrint` or Pandoc CLI |
| Fill forms | `pypdf` (AcroForm) |
| Images → PDF | `Pillow` or `img2pdf` |

---

## Step 1 — Install Dependencies

```powershell
pip install pdfplumber pypdf reportlab weasyprint Pillow img2pdf
```

---

## Step 2 — Extract Text

```python
import pdfplumber

with pdfplumber.open("input.pdf") as pdf:
    for i, page in enumerate(pdf.pages, start=1):
        text = page.extract_text()
        print(f"--- Page {i} ---")
        if text:
            print(text)
```

**pypdf alternative (no dependencies beyond pip):**
```python
from pypdf import PdfReader

reader = PdfReader("input.pdf")
for i, page in enumerate(reader.pages, start=1):
    print(f"--- Page {i} ---")
    print(page.extract_text())
```

---

## Step 3 — Extract Tables

```python
import pdfplumber
import csv

with pdfplumber.open("input.pdf") as pdf:
    for page_num, page in enumerate(pdf.pages, start=1):
        tables = page.extract_tables()
        for t_idx, table in enumerate(tables):
            out_path = f"table-p{page_num}-t{t_idx+1}.csv"
            with open(out_path, "w", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerows(table)
            print(f"Saved: {out_path} ({len(table)} rows)")
```

**Extract to pandas DataFrame:**
```python
import pdfplumber, pandas as pd

with pdfplumber.open("input.pdf") as pdf:
    page = pdf.pages[0]
    table = page.extract_table()
    if table:
        df = pd.DataFrame(table[1:], columns=table[0])
        print(df)
        df.to_excel("output.xlsx", index=False)
```

---

## Step 4 — Merge PDFs

```python
from pypdf import PdfWriter

writer = PdfWriter()
files = ["ch01.pdf", "ch02.pdf", "ch03.pdf"]

for path in files:
    writer.append(path)

with open("merged.pdf", "wb") as f:
    writer.write(f)
print(f"Merged {len(files)} files → merged.pdf")
```

---

## Step 5 — Split PDF

```python
from pypdf import PdfReader, PdfWriter
import os

reader = PdfReader("input.pdf")
output_dir = "split-pages"
os.makedirs(output_dir, exist_ok=True)

for i, page in enumerate(reader.pages, start=1):
    writer = PdfWriter()
    writer.add_page(page)
    out_path = os.path.join(output_dir, f"page-{i:03d}.pdf")
    with open(out_path, "wb") as f:
        writer.write(f)

print(f"Split into {len(reader.pages)} pages → {output_dir}/")
```

**Extract a page range:**
```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("input.pdf")
writer = PdfWriter()

for page in reader.pages[4:10]:   # pages 5–10 (0-indexed)
    writer.add_page(page)

with open("pages-5-10.pdf", "wb") as f:
    writer.write(f)
```

---

## Step 6 — Create PDF from Scratch (reportlab)

```python
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors

doc = SimpleDocTemplate(
    "output.pdf",
    pagesize=letter,
    rightMargin=inch, leftMargin=inch,
    topMargin=inch, bottomMargin=inch
)

styles = getSampleStyleSheet()
story = []

# Title
story.append(Paragraph("My Report Title", styles["Title"]))
story.append(Spacer(1, 0.2 * inch))

# Body text
story.append(Paragraph(
    "This is body text. It will wrap automatically within the margins.",
    styles["BodyText"]
))
story.append(Spacer(1, 0.2 * inch))

# Table
data = [["Name", "Score", "Grade"],
        ["Alice", "92", "A"],
        ["Bob",   "78", "C+"],
        ["Carol", "85", "B"]]

table = Table(data, colWidths=[2*inch, 1.5*inch, 1.5*inch])
table.setStyle(TableStyle([
    ("BACKGROUND",  (0, 0), (-1, 0), colors.HexColor("#2F4F8F")),
    ("TEXTCOLOR",   (0, 0), (-1, 0), colors.white),
    ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
    ("ALIGN",       (0, 0), (-1, -1), "CENTER"),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EFF3FB")]),
    ("GRID",        (0, 0), (-1, -1), 0.5, colors.grey),
]))
story.append(table)

doc.build(story)
print("Saved: output.pdf")
```

---

## Step 7 — Markdown / HTML → PDF

**Via Pandoc (recommended for chapter content):**
```powershell
pandoc input.md -o output.pdf --pdf-engine=xelatex
# or with WeasyPrint as engine:
pandoc input.md -o output.pdf --pdf-engine=weasyprint
```

**Via WeasyPrint (Python, HTML source):**
```python
from weasyprint import HTML

HTML(string="<h1>Title</h1><p>Body text.</p>").write_pdf("output.pdf")

# From a file:
HTML(filename="input.html").write_pdf("output.pdf")

# From a URL:
HTML(url="https://example.com").write_pdf("output.pdf")
```

---

## Step 8 — Fill / Read PDF Forms (AcroForm)

**Read form field names and values:**
```python
from pypdf import PdfReader

reader = PdfReader("form.pdf")
fields = reader.get_form_text_fields()
print(fields)  # dict of field_name → current_value
```

**Fill form fields:**
```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("form.pdf")
writer = PdfWriter()
writer.append(reader)

writer.update_page_form_field_values(
    writer.pages[0],
    {
        "StudentName": "Alice Smith",
        "Score":       "92",
        "Date":        "2026-06-17",
    }
)

with open("filled-form.pdf", "wb") as f:
    writer.write(f)
```

---

## Step 9 — Add Watermark / Page Numbers

**Watermark (stamp each page):**
```python
from pypdf import PdfReader, PdfWriter

watermark = PdfReader("watermark.pdf").pages[0]
reader    = PdfReader("input.pdf")
writer    = PdfWriter()

for page in reader.pages:
    page.merge_page(watermark)
    writer.add_page(page)

with open("watermarked.pdf", "wb") as f:
    writer.write(f)
```

**Add page numbers (reportlab + pypdf overlay):**
```python
import io
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

def make_page_number_overlay(page_num: int, total: int) -> bytes:
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    c.setFont("Helvetica", 9)
    c.drawCentredString(306, 20, f"Page {page_num} of {total}")
    c.save()
    return buf.getvalue()

reader = PdfReader("input.pdf")
writer = PdfWriter()
total  = len(reader.pages)

for i, page in enumerate(reader.pages, start=1):
    overlay_pdf   = PdfReader(io.BytesIO(make_page_number_overlay(i, total)))
    page.merge_page(overlay_pdf.pages[0])
    writer.add_page(page)

with open("numbered.pdf", "wb") as f:
    writer.write(f)
```

---

## Step 10 — Images → PDF

```python
import img2pdf
from pathlib import Path

images = sorted(Path("slides-export").glob("*.png"))
with open("slides.pdf", "wb") as f:
    f.write(img2pdf.convert([str(p) for p in images]))
print(f"Combined {len(images)} images → slides.pdf")
```

**Single image via Pillow:**
```python
from PIL import Image
img = Image.open("figure.png").convert("RGB")
img.save("figure.pdf")
```

---

## Step 11 — Compress / Optimize

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("input.pdf")
writer = PdfWriter()

for page in reader.pages:
    page.compress_content_streams()
    writer.add_page(page)

with open("compressed.pdf", "wb") as f:
    writer.write(f)
```

> For aggressive compression (image downsampling), use Ghostscript:
```powershell
gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook `
  -dNOPAUSE -dQUIET -dBATCH -sOutputFile=compressed.pdf input.pdf
```

---

## Quality Checks

- [ ] Output PDF opens without errors in Adobe Reader or browser
- [ ] Page count matches expected
- [ ] Extracted text is complete (check first and last pages)
- [ ] Tables have correct row/column counts
- [ ] Form fields filled correctly (verify by reopening)
- [ ] File size reasonable (compare to source)

---

## Common Pitfalls

| Problem | Fix |
|---------|-----|
| `extract_text()` returns empty | PDF may be image-based (scanned); use OCR (`pytesseract` + `pdf2image`) |
| Table extraction misaligned | Use `pdfplumber` with `extract_table(table_settings={...})` to tune |
| Form fields not writable | PDF may have security restrictions; check `reader.metadata` |
| WeasyPrint missing fonts | Install system fonts or use `@font-face` in CSS |
| `img2pdf` fails with RGBA images | Convert to RGB first: `img.convert("RGB").save(...)` |
| Pandoc PDF needs LaTeX | Install MiKTeX (Windows) or `texlive-xetex` (Linux/Mac) |

---

## Related Skills

- `pptx` — PowerPoint files (export slides as images → use here for PDF)
- `xlsx` — Excel files
- `brightspace-export` — full instructor package including PDF output
- `chapter-pdf-review` — BITM330 chapter PDF build via Edge headless
