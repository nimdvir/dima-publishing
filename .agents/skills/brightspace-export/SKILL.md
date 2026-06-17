---
name: brightspace-export
description: 'Brightspace LMS Export — produce a complete instructor package from chapter content: Brightspace-importable quiz CSV, matching Excel gradebook/tracker, and optional MS Access (.accdb/.mdb) database export. Use when: generating a full chapter assessment package for Brightspace; exporting quiz questions to CSV for LMS import; building an Excel gradebook linked to quiz items; reading or exporting data from an MS Access database file; converting Access tables to CSV, Excel, or Markdown for use in the LMS or textbook. Coordinates online-quiz-creation and xlsx skills.'
argument-hint: 'Chapter number or source — e.g. "ch05 RAT" or "export PetVax.accdb grades table"'
---

# Brightspace Export

## What This Skill Produces

A complete instructor package containing one or more of:

| Output | File |
|--------|------|
| Brightspace quiz import file | `chNN-quiz-YYYY-MM-DD.csv` |
| Human-readable quiz key | `chNN-quiz-YYYY-MM-DD.md` |
| Excel gradebook | `chNN-gradebook-YYYY-MM-DD.xlsx` |
| Access export (tables → CSV/xlsx) | `<TableName>.csv` or `<TableName>.xlsx` |

---

## When to Use

- "Export chapter 5 quiz to Brightspace"
- "Build a gradebook for the ch08 RAT"
- "Export the PetVax Access database to Excel"
- "Read the Grading Database and create a grade tracker"
- "Generate a full LMS package for ch03"
- "Convert Access tables to CSV for import"

---

## Procedure

### Step 1 — Clarify Scope

Before starting, confirm:
- Chapter number (for quiz/gradebook path resolution)
- Which parts to produce: quiz CSV only, gradebook only, Access export, or all three
- Source file for the quiz: existing RAT `.md` file, or generate from chapter content
- Source file for Access export: path to `.accdb` or `.mdb`

---

### Step 2 — Quiz CSV (Brightspace Import)

Delegate to the `online-quiz-creation` skill for full question authoring.

**Quick path** — if questions already exist in a RAT `.md`:

Expected output location:
```
books/database-book/Brightspace/Rats/
  chNN-quiz-YYYY-MM-DD.csv
  chNN-quiz-YYYY-MM-DD.md
```

Refer to `online-quiz-creation` for the full CSV format (all 7 Brightspace question types).

---

### Step 3 — Excel Gradebook

Refer to the `xlsx` skill for full formatting options.

**Standard gradebook layout:**

| Column | Content |
|--------|---------|
| A | Student ID |
| B | Last Name |
| C | First Name |
| D–N | One column per quiz question (Q1, Q2, …) |
| O | Total Score (`=SUM(D2:N2)`) |
| P | Percent (`=O2/MAX_POINTS`) |
| Q | Grade (`=IF(P2>=0.9,"A",IF(P2>=0.8,"B",…))`) |

**Python scaffold:**

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter
from datetime import date

CHAPTER = "05"
MAX_POINTS = 20   # adjust per quiz
Q_COUNT = 10      # number of questions

wb = Workbook()
ws = wb.active
ws.title = f"Ch{CHAPTER} Grades"

# Build headers
q_headers = [f"Q{i}" for i in range(1, Q_COUNT + 1)]
headers = ["Student ID", "Last Name", "First Name"] + q_headers + ["Total", "Percent", "Grade"]
ws.append(headers)

# Style header row
hfont = Font(bold=True, color="FFFFFF")
hfill = PatternFill(start_color="2F4F8F", end_color="2F4F8F", fill_type="solid")
for cell in ws[1]:
    cell.font = hfont
    cell.fill = hfill
    cell.alignment = Alignment(horizontal="center")

# Freeze header + auto-filter
ws.freeze_panes = "A2"
ws.auto_filter.ref = ws.dimensions

# Example student row with formulas (row 2)
first_q_col = 4   # column D
last_q_col  = first_q_col + Q_COUNT - 1
total_col   = last_q_col + 1
pct_col     = total_col + 1
grade_col   = pct_col + 1

# Formulas for row 2 (copy down for each student row)
total_range = f"{get_column_letter(first_q_col)}2:{get_column_letter(last_q_col)}2"
ws[f"{get_column_letter(total_col)}2"] = f"=SUM({total_range})"
ws[f"{get_column_letter(pct_col)}2"]   = f"={get_column_letter(total_col)}2/{MAX_POINTS}"
ws[f"{get_column_letter(grade_col)}2"] = (
    f'=IF({get_column_letter(pct_col)}2>=0.9,"A",'
    f'IF({get_column_letter(pct_col)}2>=0.8,"B",'
    f'IF({get_column_letter(pct_col)}2>=0.7,"C",'
    f'IF({get_column_letter(pct_col)}2>=0.6,"D","F"))))'
)

# Auto column widths
for col in ws.columns:
    max_len = max(len(str(cell.value or "")) for cell in col)
    ws.column_dimensions[get_column_letter(col[0].column)].width = max(max_len + 3, 8)

today = date.today().strftime("%Y-%m-%d")
wb.save(f"ch{CHAPTER}-gradebook-{today}.xlsx")
print(f"Saved: ch{CHAPTER}-gradebook-{today}.xlsx")
```

---

### Step 4 — MS Access Export (.accdb / .mdb)

#### Prerequisites (Windows)

```powershell
# Requires Microsoft Access Database Engine (32-bit or 64-bit must match Python)
# Download: https://www.microsoft.com/en-us/download/details.aspx?id=54920
pip install pyodbc pandas openpyxl
```

Verify the driver is available:
```python
import pyodbc
drivers = [d for d in pyodbc.drivers() if 'Access' in d]
print(drivers)
# Expected: ['Microsoft Access Driver (*.mdb, *.accdb)']
```

#### Connect and List Tables

```python
import pyodbc

DB_PATH = r"C:\path\to\PetVax.accdb"  # absolute path required

conn_str = (
    r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};"
    f"DBQ={DB_PATH};"
)
conn = pyodbc.connect(conn_str)
cursor = conn.cursor()

# List all user tables
tables = [row.table_name for row in cursor.tables(tableType="TABLE")]
print("Tables:", tables)
```

#### Export All Tables to CSV

```python
import pandas as pd
import os
from datetime import date

OUTPUT_DIR = "access-export"
os.makedirs(OUTPUT_DIR, exist_ok=True)
today = date.today().strftime("%Y-%m-%d")

for table in tables:
    df = pd.read_sql(f"SELECT * FROM [{table}]", conn)
    out_path = os.path.join(OUTPUT_DIR, f"{table}-{today}.csv")
    df.to_csv(out_path, index=False)
    print(f"Exported {table}: {len(df)} rows → {out_path}")

conn.close()
```

#### Export All Tables to a Single Excel Workbook

```python
from openpyxl import Workbook

wb = Workbook()
wb.remove(wb.active)  # remove default blank sheet

conn = pyodbc.connect(conn_str)
for table in tables:
    df = pd.read_sql(f"SELECT * FROM [{table}]", conn)
    ws = wb.create_sheet(title=table[:31])  # Excel sheet names max 31 chars
    # Write headers
    ws.append(list(df.columns))
    # Write rows
    for row in df.itertuples(index=False):
        ws.append(list(row))

conn.close()
db_name = os.path.splitext(os.path.basename(DB_PATH))[0]
out_xlsx = f"{db_name}-export-{today}.xlsx"
wb.save(out_xlsx)
print(f"Saved: {out_xlsx}")
```

#### Export a Specific Query

```python
conn = pyodbc.connect(conn_str)
df = pd.read_sql(
    "SELECT StudentID, LastName, Score FROM [Grades] WHERE Score >= 70",
    conn
)
df.to_excel("passing-students.xlsx", index=False)
conn.close()
```

#### Troubleshooting Access Connections

| Problem | Fix |
|---------|-----|
| `Data source name not found` | Install Access Database Engine; match 32/64-bit with Python |
| `Could not use '...'; file already in use` | Close Access application before connecting |
| `Operation must use an updateable query` | Open connection with `autocommit=True` or use read-only mode |
| Tables not found | Use `cursor.tables()` to confirm exact table names (case-sensitive in some drivers) |
| Special characters in table name | Wrap table name in square brackets: `[My Table]` |

---

### Step 5 — Output Checklist

- [ ] Quiz CSV validates: opens in Brightspace D2L import tool without errors
- [ ] Quiz MD has complete answer key
- [ ] Gradebook formulas calculate correctly for a test row
- [ ] Column widths readable; header row frozen
- [ ] Access export: row counts match source table (verify with `SELECT COUNT(*) FROM [Table]`)
- [ ] All output files saved with today's date in filename

---

## Output Paths

| File | Location |
|------|----------|
| Quiz CSV + MD | `books/database-book/Brightspace/Rats/` |
| Gradebook XLSX | `books/database-book/Brightspace/Labs/` or chapter folder |
| Access exports | `books/database-book/files/source/labs/access-export/` |

---

## Related Skills

- `online-quiz-creation` — full Brightspace question authoring (all 7 question types)
- `xlsx` — advanced Excel formatting, charts, pivot tables
- `autograded-lab` — LMS-ready autograded lab from Let's Build content
- `lab-creation` — SAM-style PetVax lab with artifact file
