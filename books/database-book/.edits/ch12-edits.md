<!-- metadata: date="2026-06-13"; type="edits"; chapter="12"; source="outline-audit" -->

# Ch12 Edit Notes

## 2026-06-13 — Outline-to-chapter structural audit: SIGNIFICANT DRIFT

*Compared `outline-2026-06-12.md` against GD draft `ch12-main-rewritten-2026-05-18.md` and dima-pub `core-concepts.md`. Same topics, different organizational sequence. Draft follows outline order (BI → OLTP/OLAP → ETL → DW). Source reorders to (BI → DW → ETL → OLAP).*

### Structural comparison

| Outline/Draft Order | Source Order |
|---------------------|--------------|
| 12.1 BI Fundamentals | 1. BI Fundamentals |
| 12.2 OLTP vs OLAP | 4. OLAP |
| 12.3 ETL and ELT | 3. ETL Processes |
| 12.4 Data Warehouses, Data Marts, Data Lakes | 2. Data Warehousing Concepts |

- [x] All topics present in both files — BI fundamentals, OLTP/OLAP, ETL/ELT, data warehousing, dimensional modeling, OLAP operations
- [x] **DECIDE:** Which section order is canonical? Resolved on 2026-06-29 against `outline-2026-06-16.md`: current source order is canonical: BI → OLTP/OLAP → ETL/ELT → DW/data marts/data lakes → dimensional modeling → OLAP → SQL BI → reports/dashboards → KPIs/Balanced Scorecard → governance → platform patterns → worked example.
- [x] **ACTION:** No Ch12 reorganization needed for this pass; source already follows the latest book-level outline.

---

# Archive

*No archived entries yet.*
