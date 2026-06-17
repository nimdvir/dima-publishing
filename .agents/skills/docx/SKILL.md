---
name: docx
description: 'Word Document Handler — create, read, edit, and manipulate Microsoft Word (.docx) files. Use whenever the user mentions: Word doc, Word document, .docx, DOCX, write a report, create a document, edit a Word file, extract text from Word, add a table to Word, format a document, generate a report. Covers: creating new documents from scratch; reading or extracting text, tables, and styles; adding paragraphs, headings, lists, tables, images, and headers/footers; applying styles and direct formatting; mail merge; converting Markdown or HTML to DOCX via Pandoc; protecting documents. Supports python-docx (Python) and Pandoc (Markdown → DOCX).'
argument-hint: 'Describe what you want to create or do — e.g. "create a report from this data" or "extract all tables from document.docx" or "add a header with the chapter title"'
---

# Word Document Handler (docx)

## What This Skill Produces

A working `.docx` file created, modified, or extracted from — or structured content (text, tables, styles) read from an existing Word document.

---

## When to Use

| Goal | Trigger |
|------|---------|
| Create a new document | "make a Word doc", "write a report", "create a DOCX" |
| Read / extract | "read this Word file", "extract text from docx", "parse Word document" |
| Edit content | "add a heading", "insert a table", "update paragraph" |
| Apply formatting | "bold the title", "change font size", "set heading style" |
| Add images | "insert a figure", "add an image to Word" |
| Headers / footers | "add a header", "page numbers in footer" |
| Convert | "Markdown to Word", "HTML to DOCX", "convert to Word" |
| Protect | "password-protect Word doc", "restrict editing" |

---

## Tool Selection

| Task | Tool |
|------|------|
| Create / edit `.docx` | `python-docx` |
| Markdown → DOCX | `pandoc` CLI (preferred for textbook content) |
| HTML → DOCX | `pandoc` CLI |
| Read-only inspection | `python-docx` (no Office required) |
| Advanced formatting via template | `python-docx` + reference `.docx` template |

---

## Step 1 — Install

```powershell
pip install python-docx
# Pandoc: https://pandoc.org/installing.html (or via winget/brew)
winget install JohnMacFarlane.Pandoc
```

---

## Step 2 — Create or Load a Document

**New document:**
```python
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

doc = Document()
```

**Load existing:**
```python
doc = Document("existing.docx")
```

**Load a reference template (preserves styles/theme):**
```python
doc = Document("reference.docx")
# Clear content but keep styles:
for element in list(doc.element.body):
    doc.element.body.remove(element)
```

---

## Step 3 — Add Headings and Paragraphs

```python
# Built-in heading levels
doc.add_heading("Chapter Title", level=1)
doc.add_heading("Section Heading", level=2)
doc.add_heading("Sub-section",     level=3)

# Normal paragraph
doc.add_paragraph("This is body text.")

# Paragraph with style
doc.add_paragraph("Styled text.", style="Quote")

# Paragraph with inline formatting
p = doc.add_paragraph()
run = p.add_run("Bold and colored text.")
run.bold = True
run.font.size = Pt(14)
run.font.color.rgb = RGBColor(0x2F, 0x4F, 0x8F)
```

---

## Step 4 — Add Bullet and Numbered Lists

```python
# Bulleted list
for item in ["First point", "Second point", "Third point"]:
    doc.add_paragraph(item, style="List Bullet")

# Numbered list
for item in ["Step one", "Step two", "Step three"]:
    doc.add_paragraph(item, style="List Number")

# Nested bullet (List Bullet 2 = second level)
doc.add_paragraph("Sub-item", style="List Bullet 2")
```

---

## Step 5 — Add Tables

```python
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

headers = ["Name", "Score", "Grade"]
data    = [["Alice", "92", "A"],
           ["Bob",   "78", "C+"],
           ["Carol", "85", "B"]]

table = doc.add_table(rows=1 + len(data), cols=len(headers))
table.style = "Table Grid"

# Header row
hdr_cells = table.rows[0].cells
for i, h in enumerate(headers):
    hdr_cells[i].text = h
    run = hdr_cells[i].paragraphs[0].runs[0]
    run.font.bold = True

# Data rows
for row_idx, row_data in enumerate(data, start=1):
    row_cells = table.rows[row_idx].cells
    for col_idx, value in enumerate(row_data):
        row_cells[col_idx].text = value

# Set column widths
for col_idx, width in enumerate([Inches(2.5), Inches(1.5), Inches(1.5)]):
    for cell in table.columns[col_idx].cells:
        cell.width = width
```

---

## Step 6 — Add Images

```python
doc.add_picture("figure.png", width=Inches(5))

# Centered image
from docx.enum.text import WD_ALIGN_PARAGRAPH
last_para = doc.paragraphs[-1]
last_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
```

---

## Step 7 — Add Page Breaks and Horizontal Rules

```python
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# Page break
doc.add_page_break()

# Horizontal rule (paragraph border)
p = doc.add_paragraph()
pPr = p._p.get_or_add_pPr()
pBdr = OxmlElement("w:pBdr")
bottom = OxmlElement("w:bottom")
bottom.set(qn("w:val"), "single")
bottom.set(qn("w:sz"), "6")
bottom.set(qn("w:space"), "1")
bottom.set(qn("w:color"), "auto")
pBdr.append(bottom)
pPr.append(pBdr)
```

---

## Step 8 — Headers and Footers

```python
from docx.oxml.ns import qn

section = doc.sections[0]

# Header
header = section.header
header.paragraphs[0].text = "BITM330 — Using Data to Drive Business Performance"
header.paragraphs[0].style = doc.styles["Header"]

# Footer with page number
footer = section.footer
fp = footer.paragraphs[0]
fp.clear()
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER

# Add "Page X" field
run = fp.add_run("Page ")
fldChar1 = OxmlElement("w:fldChar")
fldChar1.set(qn("w:fldCharType"), "begin")
instrText = OxmlElement("w:instrText")
instrText.text = "PAGE"
fldChar2 = OxmlElement("w:fldChar")
fldChar2.set(qn("w:fldCharType"), "end")
run._r.append(fldChar1)
run._r.append(instrText)
run._r.append(fldChar2)
```

---

## Step 9 — Read / Extract Content

**All text:**
```python
from docx import Document

doc = Document("input.docx")
for para in doc.paragraphs:
    if para.text.strip():
        print(f"[{para.style.name}] {para.text}")
```

**All tables:**
```python
for t_idx, table in enumerate(doc.tables):
    print(f"\n=== Table {t_idx + 1} ===")
    for row in table.rows:
        print(" | ".join(cell.text.strip() for cell in row.cells))
```

**Extract to Markdown-ish text:**
```python
lines = []
for para in doc.paragraphs:
    if not para.text.strip():
        continue
    name = para.style.name
    if name == "Heading 1":
        lines.append(f"# {para.text}")
    elif name == "Heading 2":
        lines.append(f"## {para.text}")
    elif name == "Heading 3":
        lines.append(f"### {para.text}")
    elif "List Bullet" in name:
        lines.append(f"- {para.text}")
    elif "List Number" in name:
        lines.append(f"1. {para.text}")
    else:
        lines.append(para.text)
print("\n".join(lines))
```

---

## Step 10 — Pandoc: Markdown → DOCX

```powershell
# Basic conversion
pandoc input.md -o output.docx

# With reference document (apply styles from a template)
pandoc input.md --reference-doc=reference.docx -o output.docx

# GFM (GitHub Flavored Markdown) with smart typography
pandoc input.md -f gfm -o output.docx --reference-doc=reference.docx

# Multiple input files → single DOCX
pandoc main.md lets-build.md terms.md -o chapter05.docx --reference-doc=reference.docx
```

See the `pandoc-extensions` skill for profile recommendations.

---

## Step 11 — Pandoc: DOCX → Markdown

```powershell
pandoc input.docx -t gfm -o output.md
# With media extraction:
pandoc input.docx -t gfm --extract-media=./media -o output.md
```

---

## Step 12 — Document Protection

```python
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import hashlib, binascii, os

def protect_document(doc, password: str):
    """Add editing restriction with password (weak — not cryptographically secure)."""
    settings = doc.settings.element
    docProt = OxmlElement("w:documentProtection")
    docProt.set(qn("w:edit"), "readOnly")
    docProt.set(qn("w:enforcement"), "1")
    # Simple hash (Office uses a specific algorithm; this is illustrative)
    settings.insert(0, docProt)

# NOTE: For real protection, use COM automation or LibreOffice macro.
```

**Via COM (Windows, Office installed):**
```python
import comtypes.client, os

word = comtypes.client.CreateObject("Word.Application")
word.Visible = False
doc = word.Documents.Open(os.path.abspath("input.docx"))
doc.Protect(Password="secret123", NoReset=False, Type=1)  # wdAllowOnlyReading=1
doc.Save()
doc.Close()
word.Quit()
```

---

## Step 13 — Save

```python
from datetime import date
today = date.today().strftime("%Y-%m-%d")
doc.save(f"chapter05-{today}.docx")
print(f"Saved.")
```

---

## Quality Checks

- [ ] File opens in Word or LibreOffice without compatibility warnings
- [ ] Heading hierarchy correct (H1 → H2 → H3, no skipped levels)
- [ ] Tables have headers; no merged cells breaking layout
- [ ] Images display at correct size
- [ ] Page numbers appear in footer
- [ ] Styles match reference template (if used)
- [ ] No leftover template placeholder text

---

## Common Pitfalls

| Problem | Fix |
|---------|-----|
| Style not found | List available styles: `[s.name for s in doc.styles]` |
| Table cell text won't format | Access `cell.paragraphs[0].runs[0]` to set font on existing text |
| Image too large / small | Use `width=Inches(n)` — aspect ratio is preserved automatically |
| Pandoc loses callout HTML | Use `--reference-doc` with callout styles pre-defined; HTML blocks need `raw_html` extension |
| Header/footer not showing | Ensure `section.different_first_page_header_footer = False` |
| COM automation fails | Office must be installed; run as the licensed user account |

---

## Related Skills

- `pdf` — PDF creation, extraction, merging
- `xlsx` — Excel spreadsheet creation
- `pptx` — PowerPoint presentation creation
- `pandoc-extensions` — Pandoc extension profiles for DOCX workflows
- `chapter-docx-build` — BITM330 chapter DOCX build via Pandoc
