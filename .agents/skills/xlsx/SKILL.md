---
name: xlsx
description: 'Excel Spreadsheet Handler — create, edit, read, and analyze Microsoft Excel (.xlsx) files. Use when: creating a new spreadsheet from data or scratch; reading or extracting data from an .xlsx file; applying formulas, formatting, or cell styles; building data analysis (pivot tables, charts, sorting, filtering); generating grading sheets, tracking tables, or structured reports as Excel files; converting CSV/JSON/Markdown tables to .xlsx; protecting worksheets or workbooks. Supports openpyxl, pandas, xlsxwriter (Python) and ImportExcel (PowerShell).'
argument-hint: 'Describe what you want to create, edit, or analyze — e.g. "create a grading sheet from this CSV" or "add a SUM formula to column D"'
---

# Excel Spreadsheet Handler (xlsx)

## What This Skill Produces

A working `.xlsx` file created, modified, or analyzed using the appropriate library
for the task. Always verify output by opening the file or checking cell values.

---

## When to Use

| Goal | Trigger Phrase |
|------|---------------|
| Create a new spreadsheet | "make an Excel file", "create a spreadsheet", "export to .xlsx" |
| Read / extract data | "read this Excel file", "extract data from .xlsx", "parse spreadsheet" |
| Add formulas | "add a SUM/AVERAGE/VLOOKUP", "calculate totals in Excel" |
| Format cells | "bold headers", "color rows", "set column width", "number format" |
| Build a data table | "make a pivot table", "sort and filter", "structured report" |
| Convert data | "CSV to Excel", "Markdown table to .xlsx", "JSON to spreadsheet" |
| Protect / secure | "password-protect worksheet", "lock cells" |

---

## Tool Selection

| Situation | Recommended Tool |
|-----------|-----------------|
| Python environment available | `openpyxl` (read/write/format) or `xlsxwriter` (write-only, rich charts) |
| Data analysis + output | `pandas` + `openpyxl` as engine |
| PowerShell environment (Windows) | `ImportExcel` module (`Install-Module ImportExcel`) |
| Read-only inspection | `openpyxl` (load_workbook with `read_only=True`) |

---

## Procedure

### Step 1 — Clarify the Goal

Before writing code, confirm:
- **Source**: raw data, CSV, JSON, Markdown table, or existing .xlsx?
- **Output**: new file, or modify an existing file?
- **Features needed**: formulas, formatting, charts, multiple sheets, password?
- **Environment**: Python or PowerShell?

### Step 2 — Check / Install Dependencies

**Python:**
```powershell
pip install openpyxl xlsxwriter pandas
```

**PowerShell (Windows):**
```powershell
Install-Module ImportExcel -Scope CurrentUser
```

### Step 3 — Create or Load the Workbook

**Python — new file (openpyxl):**
```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = Workbook()
ws = wb.active
ws.title = "Sheet1"
```

**Python — load existing file:**
```python
from openpyxl import load_workbook
wb = load_workbook("input.xlsx")
ws = wb.active
```

**Python — read-only (large files):**
```python
wb = load_workbook("input.xlsx", read_only=True, data_only=True)
```

**PowerShell:**
```powershell
# Read
$data = Import-Excel "input.xlsx"
# Write
$data | Export-Excel "output.xlsx" -AutoSize -AutoFilter -FreezeTopRow -BoldTopRow
```

### Step 4 — Write Data

**Python — write rows:**
```python
headers = ["Name", "Score", "Grade"]
ws.append(headers)
for row_data in data_rows:
    ws.append(row_data)
```

**Python — set specific cell:**
```python
ws["A1"] = "Title"
ws.cell(row=2, column=3).value = 95
```

**pandas → Excel:**
```python
import pandas as pd
df = pd.DataFrame(data)
df.to_excel("output.xlsx", index=False, sheet_name="Data")
```

### Step 5 — Add Formulas

```python
# SUM a range
ws["D10"] = "=SUM(D2:D9)"

# AVERAGE
ws["E10"] = "=AVERAGE(E2:E9)"

# IF formula
ws["F2"] = '=IF(D2>=70,"Pass","Fail")'

# VLOOKUP
ws["G2"] = '=VLOOKUP(A2,LookupSheet!A:B,2,FALSE)'
```

> **Note:** When reading back formula cells, use `data_only=True` in `load_workbook`
> to get the cached value instead of the formula string.

### Step 6 — Apply Formatting

**Headers:**
```python
header_font = Font(bold=True, color="FFFFFF", size=12)
header_fill = PatternFill(start_color="2F4F8F", end_color="2F4F8F", fill_type="solid")
header_align = Alignment(horizontal="center", vertical="center", wrap_text=True)

for cell in ws[1]:  # row 1
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = header_align
```

**Column width:**
```python
for col in ws.columns:
    max_len = max(len(str(cell.value or "")) for cell in col)
    ws.column_dimensions[get_column_letter(col[0].column)].width = min(max_len + 4, 50)
```

**Number format:**
```python
ws["D2"].number_format = "#,##0.00"   # thousands separator, 2 decimals
ws["E2"].number_format = "0%"          # percentage
ws["F2"].number_format = '"$"#,##0.00' # currency
```

**Alternating row colors:**
```python
light = PatternFill(start_color="EFF3FB", end_color="EFF3FB", fill_type="solid")
for i, row in enumerate(ws.iter_rows(min_row=2, max_row=ws.max_row), start=2):
    if i % 2 == 0:
        for cell in row:
            cell.fill = light
```

**Borders:**
```python
thin = Side(style="thin", color="CCCCCC")
border = Border(left=thin, right=thin, top=thin, bottom=thin)
for row in ws.iter_rows():
    for cell in row:
        cell.border = border
```

### Step 7 — Freeze Panes and Filters

```python
ws.freeze_panes = "A2"         # freeze header row
ws.auto_filter.ref = ws.dimensions  # add autofilter to all data
```

### Step 8 — Multiple Sheets

```python
ws2 = wb.create_sheet("Summary")
ws2["A1"] = "=Sheet1!A1"  # reference across sheets
# Reorder
wb.move_sheet("Summary", offset=-1)
```

### Step 9 — Charts (openpyxl)

```python
from openpyxl.chart import BarChart, Reference

chart = BarChart()
chart.title = "Score Distribution"
chart.y_axis.title = "Score"
chart.x_axis.title = "Student"

data_ref = Reference(ws, min_col=2, min_row=1, max_row=ws.max_row)
categories = Reference(ws, min_col=1, min_row=2, max_row=ws.max_row)
chart.add_data(data_ref, titles_from_data=True)
chart.set_categories(categories)
chart.shape = 4
ws.add_chart(chart, "E2")
```

### Step 10 — Protect Worksheet / Workbook

```python
from openpyxl.worksheet.protection import SheetProtection

ws.protection.sheet = True
ws.protection.password = "secret123"  # NB: weak protection — do not use for sensitive data
wb.security.workbookPassword = "secret123"
```

### Step 11 — Save

```python
wb.save("output.xlsx")
print("Saved: output.xlsx")
```

---

## CSV / Markdown → Excel Conversion

**CSV → Excel (pandas):**
```python
import pandas as pd
df = pd.read_csv("data.csv")
df.to_excel("output.xlsx", index=False)
```

**Markdown table → Excel:**
```python
import re, pandas as pd

def md_table_to_df(md_text):
    lines = [l.strip() for l in md_text.strip().splitlines() if l.strip()]
    # Remove separator row (---|---|...)
    lines = [l for l in lines if not re.match(r'^[\|\s\-:]+$', l)]
    rows = [[c.strip() for c in l.strip('|').split('|')] for l in lines]
    return pd.DataFrame(rows[1:], columns=rows[0])

df = md_table_to_df(markdown_text)
df.to_excel("output.xlsx", index=False)
```

---

## Quality Checks

Before reporting done:
- [ ] File saves without error
- [ ] Headers are in row 1 (unless intentional)
- [ ] Formulas use correct cell references (no off-by-one)
- [ ] Column widths readable (not truncated, not excessive)
- [ ] Number formats match the data type
- [ ] File opens in Excel or LibreOffice without warnings
- [ ] No hard-coded absolute paths in the script

---

## Common Pitfalls

| Problem | Fix |
|---------|-----|
| Formula shows as string | Cell `number_format` may be text; set to `"General"` before writing formula |
| `data_only=True` returns `None` | Excel has never opened/recalculated the file; formulas have no cached value |
| Column letters vs numbers | Use `get_column_letter(n)` and `column_index_from_string("C")` for conversion |
| Merged cells break iteration | Use `ws.merged_cells` to detect and unmerge before bulk operations |
| Large file performance | Use `write_only=True` (Workbook) or `read_only=True` (load_workbook) |
| ImportExcel not found | Run `Install-Module ImportExcel -Scope CurrentUser` then restart shell |

---

## Related Skills

- `pandoc-extensions` — for DOCX output from Markdown
- `chapter-docx-build` — for building BITM330 chapter DOCX files
- `online-quiz-creation` — for Brightspace CSV quiz export
