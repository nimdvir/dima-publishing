"""
Extract an Access .accdb database into a comprehensive Markdown file.

Extracts all tables with schema (column names, data types, constraints) and
full data. Falls back to CSV-based reconstruction if the ODBC connection fails.

Usage:
    python extract-accdb-to-markdown.py

Connects to the lab-04-intro-to-access.accdb starter database and writes
lab-04-intro-to-access-database.md in the same assets/ folder.

"# Keep it Simple, Smartypants. Learn from the Best." — Deep Blue Something
"""

import os
import sys
import csv
import datetime

DB_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "BITM330-Book-draft", "chapter-drafts", "Labs-draft",
    "lab-04-intro-to-access", "assets", "lab-04-intro-to-access.accdb"
)

ASSETS_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "BITM330-Book-draft", "chapter-drafts", "Labs-draft",
    "lab-04-intro-to-access", "assets"
)

CSV_APPOINTMENTS = os.path.join(ASSETS_DIR, "PETVAX_APPOINTMENTS-2026-06-03.csv")
CSV_RATES = os.path.join(ASSETS_DIR, "SERVICE_RATES-2026-06-03.csv")

OUTPUT_MD = os.path.join(ASSETS_DIR, "lab-04-intro-to-access-database.md")

TODAY = datetime.date.today().strftime("%Y-%m-%d")

# ── Field reference from HOW-TO-BUILD-ACCDB.md ──────────────────────────

FIELD_REF_PETVAX = {
    "AppointmentID":     ("Number (Long Integer)", "Primary key (1001–1024)"),
    "AppointmentDate":   ("Date/Time",             "m/d/yyyy format"),
    "AppointmentTime":   ("Short Text",            "e.g. 9:00 AM"),
    "PetName":           ("Short Text",            "Required"),
    "OwnerName":         ("Short Text",            "Required"),
    "OwnerEmail":        ("Short Text",            ""),
    "AnimalType":        ("Short Text",            "Dog / Cat"),
    "BreedName":         ("Short Text",            ""),
    "WeightKg":          ("Number (Double)",       "Validation rule Between 0 And 100"),
    "ServiceType":       ("Short Text",            "Required; joins to SERVICE_RATES"),
    "VaccineDue":        ("Short Text",            "Yes / No"),
    "AppointmentStatus": ("Short Text",            "Required; Completed / No-show / Scheduled"),
    "ReminderSent":      ("Short Text",            "Yes / No"),
    "PaymentAmount":     ("Number (Double)",       "Validation rule >=0"),
    "Notes":             ("Short Text",            ""),
}

FIELD_REF_RATES = {
    "ServiceType":             ("Short Text",       "Matches PETVAX_APPOINTMENTS.ServiceType"),
    "StandardFee":             ("Number (Double)",  ""),
    "RequiresVaccineTracking": ("Short Text",       "Yes / No"),
}


def sanitize_md(val):
    """Escape pipe and newline for Markdown table cells."""
    if val is None:
        return ""
    return str(val).replace("|", "\\|").replace("\n", " ").replace("\r", "")


def extract_via_odbc(db_path):
    """Extract all tables from the .accdb via pyodbc.

    Returns dict: {table_name: {"columns": [(name, type, ...)], "rows": [[...], ...]}}
    Returns None on failure.
    """
    import pyodbc

    conn_str = (
        r"DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};"
        f"DBQ={db_path};"
    )

    try:
        conn = pyodbc.connect(conn_str)
    except pyodbc.Error as e:
        print(f"ODBC connection failed: {e}", file=sys.stderr)
        return None

    cursor = conn.cursor()
    tables_info = {}

    try:
        # Enumerate user tables (not system)
        table_names = []
        for row in cursor.tables(tableType="TABLE"):
            name = row.table_name
            if not name.startswith("MSys") and not name.startswith("~"):
                table_names.append(name)

        if not table_names:
            print("No user tables found in the database.", file=sys.stderr)
            return None

        for tname in table_names:
            # Get column info
            cols = []
            cursor.columns(table=tname)
            col_rows = list(cursor.fetchall())

            for cr in col_rows:
                col_name = cr.column_name
                type_name = cr.type_name
                # Try to get more type info
                cols.append({
                    "name": col_name,
                    "type": type_name,
                    "size": cr.column_size,
                    "nullable": cr.nullable,
                    "remarks": cr.remarks or "",
                })

            # Get all rows
            cursor.execute(f'SELECT * FROM [{tname}]')
            rows = []
            for row in cursor.fetchall():
                rows.append([sanitize_md(v) for v in row])

            tables_info[tname] = {
                "columns": cols,
                "rows": rows,
            }

    except pyodbc.Error as e:
        print(f"Extraction error: {e}", file=sys.stderr)
        return None
    finally:
        conn.close()

    return tables_info


def extract_from_csv():
    """Fallback: reconstruct database info from CSV source files."""
    tables_info = {}

    # PETVAX_APPOINTMENTS
    if os.path.exists(CSV_APPOINTMENTS):
        with open(CSV_APPOINTMENTS, "r", encoding="utf-8-sig") as f:
            reader = csv.reader(f)
            headers = next(reader)
            rows = [row for row in reader]

        cols = []
        for h in headers:
            ref = FIELD_REF_PETVAX.get(h, ("Short Text", ""))
            cols.append({
                "name": h,
                "type": ref[0],
                "size": None,
                "nullable": True,
                "remarks": ref[1],
            })

        tables_info["PETVAX_APPOINTMENTS"] = {"columns": cols, "rows": rows}

    # SERVICE_RATES
    if os.path.exists(CSV_RATES):
        with open(CSV_RATES, "r", encoding="utf-8-sig") as f:
            reader = csv.reader(f)
            headers = next(reader)
            rows = [row for row in reader]

        cols = []
        for h in headers:
            ref = FIELD_REF_RATES.get(h, ("Short Text", ""))
            cols.append({
                "name": h,
                "type": ref[0],
                "size": None,
                "nullable": True,
                "remarks": ref[1],
            })

        tables_info["SERVICE_RATES"] = {"columns": cols, "rows": rows}

    return tables_info


def build_markdown(tables_info):
    """Generate the comprehensive Markdown document."""
    lines = []
    lines.append("<!-- markdownlint-disable MD013 MD033 MD036 -->")
    lines.append("")
    lines.append(f"# Lab 04 Starter Database: `lab-04-intro-to-access.accdb`")
    lines.append("")
    lines.append(f"> **Generated:** {TODAY}")
    lines.append(f"> **Source:** Microsoft Access Starter Database — Lab 04 (Introduction to Databases)")
    lines.append(f"> **Audience:** Students (reference overview) and instructors (audit/grading reference)")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Database Overview")
    lines.append("")
    lines.append("| Property | Value |")
    lines.append("| --- | --- |")
    lines.append(f"| **File name** | `lab-04-intro-to-access.accdb` |")
    lines.append(f"| **Purpose** | Lab 04 starter database for Chapter 4 — Introduction to Databases |")
    lines.append(f"| **Context** | Students import two flat CSV files into Access, then build a primary key, validation rules, a form, queries, and a report |")
    lines.append(f"| **Tables** | 2 — `PETVAX_APPOINTMENTS`, `SERVICE_RATES` |")
    lines.append(f"| **Relationships** | None enforced (students build a query-level join only) |")
    lines.append(f"| **State** | Pre-built starter — no primary key, no validation rules, no student objects |")
    lines.append(f"| **Build method** | Imported from CSV via External Data wizard (see `HOW-TO-BUILD-ACCDB.md`) |")
    lines.append(f"| **Compacted** | Yes (Database Tools → Compact and Repair) |")
    lines.append("")
    lines.append("> ⚠️ **Important:** This is the **starter** database distributed to students who use Option B (pre-built `.accdb`). It contains only the two imported tables. Students complete Steps 1–12 of the lab instructions to add the primary key, validation rules, form, four queries, one report, and the Maple record.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # ── TABLE 1: PETVAX_APPOINTMENTS ──────────────────────────────
    if "PETVAX_APPOINTMENTS" in tables_info:
        t = tables_info["PETVAX_APPOINTMENTS"]
        lines.append("## Table 1: `PETVAX_APPOINTMENTS`")
        lines.append("")
        lines.append(f"**Row count:** {len(t['rows'])}")
        lines.append("")
        lines.append("A flat table with one row per appointment. Pet, owner, appointment, service, and payment data all live on the same row. This is intentional for Lab 04 — normalization comes in Chapter 6.")
        lines.append("")
        lines.append("### Schema")
        lines.append("")
        lines.append("| # | Field | Data Type | Nullable | Notes |")
        lines.append("| --- | --- | --- | --- | --- |")
        for i, col in enumerate(t["columns"], 1):
            nullable = "Yes" if col.get("nullable", True) else "No"
            remarks = col.get("remarks", "")
            # Prefer field reference notes if available
            if remarks:
                pass
            elif col["name"] in FIELD_REF_PETVAX:
                remarks = FIELD_REF_PETVAX[col["name"]][1]
            lines.append(f"| {i} | `{col['name']}` | {col['type']} | {nullable} | {remarks if remarks else '—'} |")
        lines.append("")
        lines.append("### Data (all rows)")
        lines.append("")
        # Header row
        col_names = [col["name"] for col in t["columns"]]
        lines.append("| " + " | ".join(f"`{cn}`" for cn in col_names) + " |")
        lines.append("| " + " | ".join("---" for _ in col_names) + " |")
        for row in t["rows"]:
            lines.append("| " + " | ".join(sanitize_md(cell) for cell in row) + " |")
        lines.append("")
        lines.append(f"> **Count:** {len(t['rows'])} appointment records (AppointmentID 1001–1024)")
        lines.append("")

    # ── TABLE 2: SERVICE_RATES ────────────────────────────────────
    if "SERVICE_RATES" in tables_info:
        t = tables_info["SERVICE_RATES"]
        lines.append("---")
        lines.append("")
        lines.append("## Table 2: `SERVICE_RATES`")
        lines.append("")
        lines.append(f"**Row count:** {len(t['rows'])}")
        lines.append("")
        lines.append("Lookup table with the clinic's standard fee for each service type. Joined to `PETVAX_APPOINTMENTS` in Step 9 of the lab via a query-level join on `ServiceType`.")
        lines.append("")
        lines.append("### Schema")
        lines.append("")
        lines.append("| # | Field | Data Type | Nullable | Notes |")
        lines.append("| --- | --- | --- | --- | --- |")
        for i, col in enumerate(t["columns"], 1):
            nullable = "Yes" if col.get("nullable", True) else "No"
            remarks = col.get("remarks", "")
            if not remarks and col["name"] in FIELD_REF_RATES:
                remarks = FIELD_REF_RATES[col["name"]][1]
            lines.append(f"| {i} | `{col['name']}` | {col['type']} | {nullable} | {remarks if remarks else '—'} |")
        lines.append("")
        lines.append("### Data (all rows)")
        lines.append("")
        col_names = [col["name"] for col in t["columns"]]
        lines.append("| " + " | ".join(f"`{cn}`" for cn in col_names) + " |")
        lines.append("| " + " | ".join("---" for _ in col_names) + " |")
        for row in t["rows"]:
            lines.append("| " + " | ".join(sanitize_md(cell) for cell in row) + " |")
        lines.append("")
        lines.append(f"> **Count:** {len(t['rows'])} service types")
        lines.append("")

    # ── Reference counts appendix ─────────────────────────────────
    lines.append("---")
    lines.append("")
    lines.append("## Reference Counts (for grading)")
    lines.append("")
    appt_rows = len(tables_info.get("PETVAX_APPOINTMENTS", {}).get("rows", []))
    rates_rows = len(tables_info.get("SERVICE_RATES", {}).get("rows", []))
    lines.append("| What | Count | Notes |")
    lines.append("| --- | --- | --- |")
    lines.append(f"| `PETVAX_APPOINTMENTS` rows | {appt_rows} | Starter; after Step 5 (Maple record added) = 25 |")
    lines.append(f"| `SERVICE_RATES` rows | {rates_rows} | Unchanged throughout |")
    lines.append(f"| No-shows | 2 | Mango (1006), Max (1010) |")
    lines.append(f"| Vaccine due = Yes | 11 (starter) | Becomes 12 after Maple is added |")
    lines.append(f"| Average Dental Cleaning payment | 123.32 | Both Dental Cleaning rows are 123.32 |")
    lines.append(f"| Highest average service | Emergency Visit (439) | Only one Emergency Visit row |")
    lines.append(f"| Pets with >1 owner | Charlie, Coco | Each appears with two different owners |")
    lines.append(f"| Owners with >1 pet | Sarah Perry, Wendy Henry, Alex Rivera | Buddy+Bandit, Luna+Milo, Coco×2 |")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Related Files")
    lines.append("")
    lines.append("| File | Purpose |")
    lines.append("| --- | --- |")
    lines.append("| `PETVAX_APPOINTMENTS-2026-06-03.csv` | Source CSV for the appointments table (24 rows) |")
    lines.append("| `SERVICE_RATES-2026-06-03.csv` | Source CSV for the service rates table (6 rows) |")
    lines.append("| `HOW-TO-BUILD-ACCDB.md` | Instructor notes for building this starter database |")
    lines.append("| `lab-04-questions-2026-06-03.md` | Student lab instructions (Steps 1–12) |")
    lines.append("| `lab-04-answers-2026-06-03.md` | Answer key and AI-grader rubric |")
    lines.append("| `lab-04-intro-to-access.accdb` | This database (Microsoft Access binary) |")
    lines.append("")

    return "\n".join(lines)


def main():
    db_exists = os.path.exists(DB_PATH)
    print(f"Database path: {DB_PATH}")
    print(f"Database exists: {db_exists}")

    tables_info = None

    # Try ODBC extraction first
    if db_exists:
        print("Trying ODBC extraction...")
        tables_info = extract_via_odbc(DB_PATH)
        if tables_info:
            print(f"Extracted {len(tables_info)} tables via ODBC.")
        else:
            print("ODBC extraction failed or returned empty. Falling back to CSV sources.")

    # Fallback to CSV
    if not tables_info:
        print("Reconstructing from CSV source files...")
        tables_info = extract_from_csv()
        if tables_info:
            print(f"Reconstructed {len(tables_info)} tables from CSV.")
        else:
            print("FATAL: Could not reconstruct from CSV either.", file=sys.stderr)
            sys.exit(1)

    # Build markdown
    print("Building Markdown...")
    md_content = build_markdown(tables_info)

    # Write output
    os.makedirs(os.path.dirname(OUTPUT_MD), exist_ok=True)
    with open(OUTPUT_MD, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"Written: {OUTPUT_MD}")
    print(f"Size: {len(md_content):,} characters")

    # Quick verification
    appt_rows = len(tables_info.get("PETVAX_APPOINTMENTS", {}).get("rows", []))
    rates_rows = len(tables_info.get("SERVICE_RATES", {}).get("rows", []))
    print(f"Verification: PETVAX_APPOINTMENTS={appt_rows} rows, SERVICE_RATES={rates_rows} rows")
    if appt_rows != 24:
        print(f"WARNING: Expected 24 appointment rows, got {appt_rows}", file=sys.stderr)
    if rates_rows != 6:
        print(f"WARNING: Expected 6 service rate rows, got {rates_rows}", file=sys.stderr)


if __name__ == "__main__":
    main()
