# Chapter Order Update Report — 2026-06-12

## Summary

- **Outline files updated:** 2 (`plans/outline/outline-2026-06-12.md`, `files/source/outline/outline-2026-06-12.md`)
- **Chapter folders renamed:** 0 (stable short slugs retained per policy)
- **`.images` folders renamed:** 2 (`ch09-midterm-review` → `ch09-database-design`, `ch10-database-design` → `ch10-advanced-sql-queries`)
- **Image links updated:** 0 (latest chapter files use Cloudinary URLs or placeholders, not local folder paths)
- **Cross-references updated:** 11 files
- **Conflicts found:** 0

## Chapter Title Changes

| Old Ch | Old Title | New Ch | New Title |
|--------|-----------|--------|-----------|
| 9 | Advanced SQL with the Grading Database | 10 | Advanced SQL for Business Analysis |
| 10 | From Data to Design — Building Reliable Information Systems | 9 | Database Design and ER Modeling |

## Folder Changes

| Old Path | New Path | Status |
|----------|----------|--------|
| *No folder renames in dima-publishing repo* | *Stable slugs kept* | N/A |

Source/draft folders (`ch09-database-design`, `ch10-advanced-sql-queries`) were already correctly mapped to the right content. No folder renames were needed in the repo.

## Image Folder Changes

| Old Path | New Path | Status |
|----------|----------|--------|
| `.images/ch09-midterm-review` | `.images/ch09-database-design` | ✅ Renamed |
| `.images/ch10-database-design` | `.images/ch10-advanced-sql-queries` | ✅ Renamed |
| `ch09-gemini-prompts-2026-06-12.txt` (stray in old ch10) | `.images/ch09-database-design/ch09-gemini-prompts-2026-06-12.txt` | ✅ Moved |

## Link Updates

| File | Old Reference | New Reference |
|------|---------------|---------------|
| `ch01-introduction-to-course/review-questions.md` | Chapter 9 on advanced SQL | Chapter 10 on advanced SQL |
| `ch05-sql/core-concepts.md` (2 refs) | Chapter 9 picks the thread back up… | Chapter 10 picks the thread back up… |
| `ch08-midterm-review/core-concepts.md` (2 refs) | more advanced SQL work in Chapter 9 | database design in Chapter 9… advanced SQL in Chapter 10 |
| `ch11-database-administration/core-concepts-rewritten-2026-05-18.md` | Chapter 9 used advanced SQL | Chapter 10 used advanced SQL; added Chapter 9 design note |
| `.agents/skills/chapter-review-codex/SKILL.md` (3 refs) | `outline-2026-06-05.md` | `outline-2026-06-12.md` |
| `book.yml` | Old Ch9/Ch10 titles | New titles; Chapter 17 added |
| `chapter-registry.yml` | Old Ch9/Ch10 titles, legacy image folders | New titles; `ch09-database-design`/`ch10-advanced-sql-queries` image folders; legacy notes removed |
| `chapter-taglines.md` | Old Ch9/Ch10 titles and taglines | New titles and taglines |
| `ch09-database-design/core-concepts.md` | Chapter 10: From Data to Design… | Chapter 9: Database Design and ER Modeling |
| `ch09-database-design/ch09-title.md` | Chapter 10: From Data to Design… | Chapter 9: Database Design and ER Modeling |
| `ch09-database-design/ch09-outline.md` | Chapter 10 Outline… | Chapter 9 Outline: Database Design and ER Modeling |
| `ch10-advanced-sql-queries/core-concepts.md` | Chapter 9: Advanced SQL… | Chapter 10: Advanced SQL for Business Analysis (roadmap 9.x→10.x) |
| `ch10-advanced-sql-queries/ch10-title.md` | Chapter 9: Advanced SQL… | Chapter 10: Advanced SQL for Business Analysis |

## Potential Overlap Notes

### Chapter 11 (DBA) vs. Chapter 13 (Advanced Database Techniques)

Both chapters cover:
- **Transactions/ACID** — Ch11 frames it as operational reliability; Ch13 frames it as technical hardening with grade-correction patterns
- **Indexes** — Ch11 covers them under performance monitoring/tuning; Ch13 covers them under performance infrastructure with EXPLAIN QUERY PLAN
- **Security and permissions** — Ch11 covers role-based access control, GRANT/REVOKE, authentication/authorization; Ch13 covers RBAC, row-level security, and auditing

**Recommendation:** Later editorial pass to tighten Ch11 to operational administration (backup, recovery, concurrency, user management) and Ch13 to technical optimization (indexes, constraints, triggers, performance tuning), reducing overlap.

### Chapter 10 (Advanced SQL) vs. Chapter 12 (Business Intelligence)

Both cover analytical querying but from different angles:
- **Ch10** — SQL-based analysis: aggregation, CTEs, window functions, weighted grades, reusable reporting pipelines
- **Ch12** — BI architecture: OLTP vs OLAP, ETL/ELT, data warehouses, dimensional modeling, KPIs, dashboards

**Status:** Distinction is reasonably clear. Ch10 is "write the queries"; Ch12 is "design the analytical system." No immediate action needed.

---

*Report generated 2026-06-12 as part of the Ch9/Ch10 chapter reorganization.*
