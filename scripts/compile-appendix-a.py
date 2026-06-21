"""Compile all chapter terms-treasury.md files into Appendix A."""
import os, re, glob

REPO_CHAPTERS = r"c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source\chapters"
DRIVE_APPENDICES = r"g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\appendices"
OUTPUT = os.path.join(DRIVE_APPENDICES, "appendix-a-terms-treasury-2026-06-21.md")

CHAPTERS = [
    ("01", "ch01-introduction-to-course", "Introduction to the Textbook"),
    ("02", "ch02-mis-and-bitm", "Foundations of Information Systems"),
    ("03", "ch03-what-is-data", "Understanding Data Fundamentals"),
    ("04", "ch04-databases", "Databases and Database Management Systems"),
    ("05", "ch05-sql", "Introduction to SQL"),
    ("06", "ch06-relational-model", "The Relational Model"),
    ("07", "ch07-normalization", "Normalization and Data Quality"),
    ("08", "ch08-midterm-review", "Midterm Review — Concepts"),
    ("09", "ch09-database-design", "Database Design and ER Modeling"),
    ("10", "ch10-advanced-sql-queries", "Advanced SQL for Business Analysis"),
    ("11", "ch11-database-administration", "Database Administration"),
    ("12", "ch12-business-intelligence", "Business Intelligence and Analytics"),
    ("13", "ch13-advanced-database-techniques", "Advanced Database Techniques"),
    ("14", "ch14-powerbi", "Power BI and Data Visualization"),
]

HEADER = """# Appendix A: Compiled Terms Treasury

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-terms-sizedmin" alt="Terms Treasury section icon" width="220">
</p>

<p align="center">

This appendix compiles all key terms and concepts from every chapter of *Using Data to Drive Business Performance: Databases and Management Information Systems*. Terms are organized by chapter to preserve instructional context. Each entry includes a definition, the business significance, and a concrete example.

**How to use this appendix:** Look up terms by chapter when reviewing specific material, or scan across chapters to trace how a concept evolves.

---

"""

TABLE_HEADER = "| Term / Concept | Definition | Business Significance | Examples |\n|---|---|---|---|\n"

PENDING_CHAPTERS = [
    ("15", "Business Strategy and Information Systems",
     "Key concepts: Porter's Value Chain, Porter's Generic Strategies (Cost Leadership, Differentiation, Focus), "
     "Resource-Based View (RBV), Competitive Advantage, Balanced Scorecard, BI Infrastructure (ETL, Data Warehouse, "
     "Dashboards), Strategic IS Alignment, IT Governance."),
    ("16", "Final Integration",
     "Key concepts: Entity Relationship Diagram (ERD), SQL Table Creation, Final Grade Calculation, "
     "Letter Grade Assignment, Attendance Aggregation, Deliverable Summary, Capstone Integration."),
    ("17", "Designing Systems That Matter",
     "Key concepts: Data Ethics, Data Stewardship, System Design Responsibility, Professional Practice, "
     "Lifelong Learning, Governance Mindset, Design Discipline, Course Integration."),
]


def extract_table_rows(content):
    """Extract term rows from a Markdown terms-treasury file."""
    rows = []
    in_table = False
    for line in content.split("\n"):
        stripped = line.strip()
        # Detect table start: header row with Term and Definition
        if re.match(r'^\|.*\bTerm\b.*\|.*\bDefinition\b.*\|', stripped):
            in_table = True
            continue
        # Skip separator rows (|---|---|)
        if in_table and re.match(r'^\|[\s\-:|]+\|', stripped):
            continue
        # Collect term rows: lines starting with | followed by content (bold or plain)
        if in_table and re.match(r'^\|\s+', stripped) and not re.match(r'^\|\s*$', stripped):
            # Ensure it has at least 2 pipe-delimited columns (not a stray | char)
            if stripped.count('|') >= 3:
                rows.append(stripped)
        # End of table: blank line or non-table content after we were in a table
        elif in_table and stripped == "":
            in_table = False
        elif in_table and not stripped.startswith("|"):
            in_table = False
    return rows


def extract_bullet_terms(content):
    """Extract terms from bullet-list format (Ch8 style)."""
    rows = []
    for line in content.split("\n"):
        m = re.match(r'^-\s*\*\*([^*]+)\*\*:\s*(.+)$', line.strip())
        if m:
            term = m.group(1).strip()
            definition = m.group(2).strip()
            rows.append(f"| **{term}** | {definition} | | |")
    return rows


def extract_two_column_terms(content):
    """Extract terms from 2-column format: | Term | Definition | or | **Term** | Definition |"""
    rows = []
    for line in content.split("\n"):
        stripped = line.strip()
        # Match bolded terms: | **Term** | Definition |
        m = re.match(r'^\|\s*\*\*([^*]+)\*\*\s*\|\s*(.+?)\s*\|$', stripped)
        if not m:
            # Match plain terms: | Term | Definition | (non-empty, not header/separator)
            m = re.match(r'^\|\s*([^|*\-][^|]*?)\s*\|\s*(.+?)\s*\|$', stripped)
        if m:
            term = m.group(1).strip()
            definition = m.group(2).strip()
            if term.lower() not in ("term", "concept", "term / concept", "---", ""):
                rows.append(f"| **{term}** | {definition} | | |")
    return rows


def main():
    os.makedirs(DRIVE_APPENDICES, exist_ok=True)
    
    with open(OUTPUT, "w", encoding="utf-8") as out:
        out.write(HEADER)
        total_terms = 0
        
        for num, folder, title in CHAPTERS:
            terms_file = os.path.join(REPO_CHAPTERS, folder, "terms-treasury.md")
            if not os.path.exists(terms_file):
                print(f"  SKIP Ch{num}: no terms-treasury.md")
                continue
            
            with open(terms_file, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Try table format first
            rows = extract_table_rows(content)
            method = "table"
            
            # If no table rows found, try bullet format (Ch8)
            if not rows:
                rows = extract_bullet_terms(content)
                if rows:
                    method = "bullet"
            
            # If still no rows, try 2-column format (Ch12, Ch14)
            if not rows:
                rows = extract_two_column_terms(content)
                if rows:
                    method = "2-column"
            
            if rows:
                out.write(f"\n## Chapter {num}: {title}\n\n")
                out.write(TABLE_HEADER)
                for row in rows:
                    out.write(row + "\n")
                total_terms += len(rows)
                print(f"  Ch{num}: {len(rows)} terms ({method})")
            else:
                print(f"  Ch{num}: NO TERMS FOUND")
        
        # Pending chapters
        for num, title, concepts in PENDING_CHAPTERS:
            out.write(f"\n## Chapter {num}: {title}\n\n")
            out.write(f"> **Note:** This chapter's complete term treasury is pending creation. {concepts}\n")
        
        out.write(f"\n---\n\n")
        out.write(f"**Total terms compiled:** {total_terms} (from 14 chapters)\n\n")
        out.write(f"*Generated: 2026-06-21*\n")
    
    size_kb = os.path.getsize(OUTPUT) / 1024
    print(f"\nTotal terms: {total_terms}")
    print(f"Output: {OUTPUT}")
    print(f"Size: {size_kb:.1f} KB")


if __name__ == "__main__":
    main()
