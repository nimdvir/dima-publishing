# RAT 12 — Top Questions (Optimized)

**Source:** Chapter 12 — Business Intelligence and Analytics (ch12-main-2026-06-16.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 3 Understand, 5 Apply, 2 Analyze
**Selection criteria:** Core BI concepts — OLTP vs OLAP, ETL/ELT, star schemas, OLAP operations, facts vs dimensions, Balanced Scorecard, data governance, data warehouse vs data lake, and BI as organizational capability.
**CSV file:** `rat-12-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
<p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181b;">This <strong>Reading Assessment Test (RAT)</strong> is based on <strong style="color: #0f766e;">Chapter 12: Business Intelligence and Analytics</strong> in the course textbook, <a rel="noopener" href="https://data-pilot.dimapublishing.com/" style="color: #0e7490; font-weight: 600; text-decoration: none;"> <strong>Using Data to Drive Business Performance</strong> </a>.</p>
<p style="margin: 0; font-size: 0.95em; color: #18181b;">Make sure you complete reading the chapter and then answer the questions here: <a rel="noopener" href="https://data-pilot.dimapublishing.com/book/ch12/introduction/1" style="color: #4f46e5; font-weight: 600; text-decoration: none;"> Chapter 12 — Business Intelligence and Analytics → </a></p>
</div>

---

## Multi-Select Questions

**Q1. OLTP vs OLAP**

*Short description: OLTP vs OLAP*

Chapter 12 distinguishes between OLTP (operational) and OLAP (analytical) systems. Which characteristics describe OLTP systems?

Select ALL that apply.

A. OLTP systems are optimized for fast, frequent, small transactions — like recording a grade or processing a sale  ← ✓ CORRECT
*Feedback: Correct — OLTP systems handle day-to-day operations with many short, concurrent transactions.*

B. OLTP systems store years of historical data and are optimized for complex aggregation queries
*Feedback: Incorrect — that describes OLAP systems. OLTP systems focus on current operational data, not historical analysis.*

C. OLTP databases are typically normalized to minimize redundancy and ensure data integrity during frequent updates  ← ✓ CORRECT
*Feedback: Correct — normalization reduces update anomalies, which is critical for systems that constantly modify data.*

D. OLTP systems use star schemas with fact and dimension tables for fast analytical queries
*Feedback: Incorrect — star schemas are OLAP design patterns. OLTP systems use normalized relational schemas.*

E. OLTP systems support the day-to-day operations of the organization — they run the business  ← ✓ CORRECT
*Feedback: Correct — OLTP systems handle orders, grades, reservations, and other operational transactions.*

**Hint:** OLTP = running the business. OLAP = analyzing the business.

**Explanation:** Chapter 12 draws a clear distinction: OLTP systems handle operational work with normalized schemas and fast transactions; OLAP systems support analysis with denormalized star schemas and complex aggregation queries.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT12-Q1 | **Bloom:** Understand

---

**Q2. ETL and ELT processes**

*Short description: ETL and ELT processes*

Chapter 12 describes ETL and ELT as processes for moving data from operational systems to analytical systems. Which statements are correct?

Select ALL that apply.

A. ETL (Extract, Transform, Load) transforms data BEFORE loading it into the analytical system  ← ✓ CORRECT
*Feedback: Correct — in ETL, data is extracted, cleaned and restructured, then loaded into the data warehouse.*

B. ELT (Extract, Load, Transform) loads raw data first, then transforms it using the analytical database's processing power  ← ✓ CORRECT
*Feedback: Correct — ELT leverages modern analytical databases to perform transformations AFTER loading.*

C. ETL and ELT are identical processes — the order of letters does not change how data is handled
*Feedback: Incorrect — the order matters. ETL transforms before loading; ELT loads first and transforms afterward.*

D. Both ETL and ELT serve the same purpose: moving data from where it is collected to where it can be analyzed  ← ✓ CORRECT
*Feedback: Correct — both are data integration pipelines. The difference is WHEN and WHERE transformation occurs.*

E. ETL is always better than ELT — Chapter 12 recommends ETL for all scenarios
*Feedback: Incorrect — Chapter 12 discusses trade-offs. ELT can be more efficient when the target database has strong processing capabilities.*

**Hint:** ETL = Transform BEFORE Load. ELT = Load first, Transform AFTER. Both move data for analysis.

**Explanation:** Chapter 12 explains ETL and ELT as the two primary data integration patterns. The choice depends on data volume and the target system's capabilities.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT12-Q2 | **Bloom:** Understand

---

(Content truncated for brevity — full MD contains all 10 questions with explanations, hints, feedback, and answer key)

## Quick-Reference Answer Key

| # | Type | Correct Answer(s) | Points | Difficulty | Bloom |
|---|------|-------------------|--------|------------|-------|
| 1 | MS   | A, C, E           | 2      | 3          | Understand |
| 2 | MS   | A, B, D           | 2      | 3          | Understand |
| 3 | MC   | B                 | 1      | 2          | Understand |
| 4 | MC   | B                 | 1      | 2          | Apply |
| 5 | MC   | B                 | 1      | 2          | Apply |
| 6 | MC   | B                 | 1      | 2          | Apply |
| 7 | MC   | B                 | 1      | 2          | Apply |
| 8 | MC   | B                 | 1      | 3          | Analyze |
| 9 | MC   | B                 | 1      | 3          | Understand |
| 10 | MC   | B                 | 1      | 3          | Analyze |
