# RAT 10 — Top Questions (Optimized)

**Source:** Chapter 10 — Advanced SQL for Business Analysis (ch10-main-2026-06-16.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 2 Understand, 6 Apply, 2 Analyze
**Selection criteria:** Core chapter concepts — advanced SQL characteristics, CTEs, window functions vs GROUP BY, HAVING vs WHERE, transactions, policy tables, COALESCE, diagnostic queries, CROSS JOIN for missing data, and reusable reporting tools.
**CSV file:** `rat-10-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
<p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181b;">This <strong>Reading Assessment Test (RAT)</strong> is based on <strong style="color: #0f766e;">Chapter 10: Advanced SQL for Business Analysis</strong> in the course textbook, <a rel="noopener" href="https://data-pilot.dimapublishing.com/" style="color: #0e7490; font-weight: 600; text-decoration: none;"> <strong>Using Data to Drive Business Performance</strong> </a>.</p>
<p style="margin: 0; font-size: 0.95em; color: #18181b;">Make sure you complete reading the chapter and then answer the questions here: <a rel="noopener" href="https://data-pilot.dimapublishing.com/book/ch10/introduction/1" style="color: #4f46e5; font-weight: 600; text-decoration: none;"> Chapter 10 — Advanced SQL for Business Analysis → </a></p>
</div>

---

## Multi-Select Questions

**Q1. Advanced SQL vs basic SQL**

*Short description: Advanced SQL characteristics*

Chapter 10 distinguishes advanced SQL from the basic SQL covered in Chapter 5. Which characteristics describe advanced SQL as presented in Chapter 10?

Select ALL that apply.

A. Advanced SQL uses multi-step pipelines — CTEs, subqueries, and views — to build answers from simple, verifiable pieces  ← ✓ CORRECT
*Feedback: Correct — Chapter 10 emphasizes composing complex queries from simple, testable building blocks rather than writing one giant query.*

B. Advanced SQL replaces the need for database design — well-written queries can compensate for poor table structure
*Feedback: Incorrect — Chapter 10 emphasizes that advanced queries work WITH good design, not instead of it. Many query problems are design problems in disguise.*

C. Advanced SQL transforms raw data into managerial insight through aggregation, window functions, and conditional logic  ← ✓ CORRECT
*Feedback: Correct — the chapter focuses on turning normalized data into actionable business reports using analytical SQL features.*

D. Advanced SQL includes safe data modification workflows using transactions and verify-modify-verify patterns  ← ✓ CORRECT
*Feedback: Correct — Chapter 10 covers UPDATE and DELETE safety through explicit transactions with verification steps.*

E. Advanced SQL is only used for SELECT queries — data modification is always handled by application code
*Feedback: Incorrect — Chapter 10 includes a dedicated section (§10.11) on safe data modification with SQL UPDATE and DELETE within transactions.*

**Hint:** Advanced SQL = multi-step pipelines + analytical functions + safe data modification. It builds on basic SQL, not replaces it.

**Explanation:** Chapter 10 defines advanced SQL by its purpose: transforming raw normalized data into managerial insight. Key characteristics include multi-step CTE pipelines, window functions, conditional aggregation, safe transaction-based data modification, and reusable reporting structures (views, CTEs). Advanced SQL works WITH good database design, not around it.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT10-Q1 | **Bloom:** Understand

---

**Q2. Reusable reporting tools**

*Short description: Reusable reporting tools*

Chapter 10 presents several tools for building reusable reporting structures. Which statements correctly describe these tools?

Select ALL that apply.

A. A VIEW is a stored query definition that persists in the database and can be queried like a table by multiple users and applications  ← ✓ CORRECT
*Feedback: Correct — views are persistent database objects. Once created, they are available to all authorized users and applications.*

B. A CTE (Common Table Expression) exists only for the duration of a single query — it is a temporary named result set defined with WITH  ← ✓ CORRECT
*Feedback: Correct — CTEs are query-scoped. They simplify complex queries by breaking them into named steps but disappear after the query completes.*

C. Views and CTEs are interchangeable — any CTE can be replaced by a view with identical performance
*Feedback: Incorrect — while functionally similar, views persist across sessions while CTEs are query-scoped. Performance characteristics may also differ.*

D. Policy tables store configurable values (like grading weights) so business rules can change without rewriting SQL queries  ← ✓ CORRECT
*Feedback: Correct — moving weights, thresholds, and grading scales into policy tables is a key design principle in Chapter 10.*

E. Subqueries are always more efficient than CTEs because they execute in a single pass
*Feedback: Incorrect — Chapter 10 discusses trade-offs among CTEs, subqueries, and views. No single approach is always fastest; the query optimizer determines execution plans.*

**Hint:** Views = persistent. CTEs = query-scoped. Policy tables = configurable business rules.

**Explanation:** Chapter 10 presents a toolkit for reusable reporting: views (persistent stored queries), CTEs (temporary named steps within a query), subqueries (inline expressions), and policy tables (configurable weight/threshold storage). Choosing the right tool depends on how often the logic will be reused and by whom.

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT10-Q2 | **Bloom:** Analyze

---

## Multiple-Choice Questions

**Q3. CTE definition**

*Short description: CTE definition*

What does the acronym CTE stand for in SQL, and what is its primary purpose as described in Chapter 10?

A. Calculated Table Expression — a table whose values are computed from formulas
*Feedback: Incorrect — CTE stands for Common Table Expression, not Calculated Table Expression.*

B. Common Table Expression — a temporary named result set defined with WITH that simplifies complex queries by breaking them into logical steps  ← ✓ CORRECT
*Feedback: Correct — CTEs let you name intermediate results, making multi-step queries more readable and easier to debug.*

C. Conditional Transformation Engine — a function that applies CASE logic to each row
*Feedback: Incorrect — CTE is not an acronym for a transformation engine. CASE expressions handle conditional logic separately.*

D. Composite Table Extractor — a tool for extracting entities from flat tables
*Feedback: Incorrect — CTE stands for Common Table Expression. Entity extraction from flat tables uses CREATE TABLE AS SELECT, not CTEs.*

**Hint:** CTE = Common Table Expression. Defined with WITH. Exists only during query execution.

**Explanation:** Chapter 10 introduces CTEs (Common Table Expressions) as named query steps defined using WITH. CTEs make complex analytical queries readable by breaking them into logical stages — for example, computing averages in one CTE, attendance in another, and joining results in the final SELECT.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT10-Q3 | **Bloom:** Understand

---

**Q4. Window functions vs GROUP BY**

*Short description: Window functions vs GROUP BY*

A window function differs from GROUP BY aggregation in what fundamental way, according to Chapter 10?

A. Window functions are faster than GROUP BY in all cases
*Feedback: Incorrect — performance depends on the query, indexes, and data. The fundamental difference is about row retention, not speed.*

B. Window functions compute aggregate values without collapsing rows — each original row is preserved alongside the calculated aggregate  ← ✓ CORRECT
*Feedback: Correct — GROUP BY collapses multiple rows into one summary row per group. Window functions add aggregate values as new columns while keeping every original row.*

C. Window functions can only operate on numeric columns
*Feedback: Incorrect — window functions like RANK() and ROW_NUMBER() work on any sortable data type, not just numbers.*

D. Window functions replace the need for JOINs in analytical queries
*Feedback: Incorrect — window functions complement JOINs; they do not replace them. They operate within the result set produced by FROM and JOIN.*

**Hint:** GROUP BY collapses rows. Window functions keep all rows and add computed values alongside them.

**Explanation:** Chapter 10 explains the key distinction: GROUP BY reduces multiple rows to one summary row per group (losing detail), while window functions using OVER() and PARTITION BY preserve every source row and display aggregate values alongside the original data. This makes window functions ideal for reports that need both detail and summary in the same view.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT10-Q4 | **Bloom:** Apply

---

**Q5. HAVING vs WHERE**

*Short description: HAVING vs WHERE*

A student writes: `SELECT StudentID, AVG(Score) FROM STUDENT_GRADE WHERE AVG(Score) < 75 GROUP BY StudentID`. The query produces an error. According to Chapter 10, what is the problem?

A. AVG(Score) is not a valid function — the correct function is AVERAGE(Score)
*Feedback: Incorrect — AVG is the correct SQL aggregate function for calculating averages. The problem is about WHERE vs HAVING, not function names.*

B. GROUP BY StudentID is unnecessary — aggregate functions do not require GROUP BY
*Feedback: Incorrect — when combining aggregate and non-aggregate columns, GROUP BY is required to define the grouping.*

C. WHERE cannot be used with aggregate functions — HAVING must be used to filter on aggregated results after grouping  ← ✓ CORRECT
*Feedback: Correct — WHERE filters individual rows before grouping. HAVING filters groups after aggregation. AVG(Score) is an aggregate; it must appear in HAVING, not WHERE.*

D. StudentID must be included in the AVG function — the correct syntax is AVG(StudentID, Score)
*Feedback: Incorrect — AVG takes a single column argument. The error is about WHERE filtering on an aggregate, not about function syntax.*

**Hint:** WHERE filters rows before grouping. HAVING filters groups after aggregation. Which one works with AVG?

**Explanation:** Chapter 10 explains the WHERE vs HAVING distinction: WHERE filters individual rows before any grouping occurs, while HAVING filters groups after aggregation. Since AVG(Score) is computed during aggregation, it cannot appear in WHERE. The correct query uses `HAVING AVG(Score) < 75`.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT10-Q5 | **Bloom:** Apply

---

**Q6. Transaction commands**

*Short description: Transaction commands*

Chapter 10 recommends wrapping UPDATE and DELETE operations in explicit transactions. Which sequence of SQL commands correctly implements a safe data modification?

A. COMMIT; UPDATE ...; ROLLBACK; — commit first, then update, then rollback if needed
*Feedback: Incorrect — COMMIT should come after the UPDATE, not before. The order is BEGIN → verify → modify → verify → COMMIT or ROLLBACK.*

B. BEGIN TRANSACTION; -- verify before; UPDATE ...; -- verify after; COMMIT; — verify before and after, commit only when correct  ← ✓ CORRECT
*Feedback: Correct — the safe modification workflow starts a transaction, verifies the state before changing, applies the change, verifies the result, and commits only when both verifications pass.*

C. UPDATE ...; SELECT ...; — run the update, then check the result with a SELECT
*Feedback: Incorrect — without a transaction, an incorrect UPDATE cannot be rolled back. Chapter 10 emphasizes explicit transactions.*

D. DELETE ...; COMMIT; — delete and immediately commit to minimize locking
*Feedback: Incorrect — Chapter 10 recommends verifying before DELETE and reviewing the result before committing. Immediate commit prevents rollback.*

**Hint:** Safe workflow = BEGIN → verify before → modify → verify after → COMMIT (or ROLLBACK if wrong).

**Explanation:** Chapter 10's safe modification workflow uses transactions: BEGIN TRANSACTION, run a verification query to confirm affected rows, perform the UPDATE or DELETE, run a second verification to confirm the result is correct, then COMMIT. If either verification fails, ROLLBACK undoes the change.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT10-Q6 | **Bloom:** Apply

---

**Q7. Policy tables vs hard-coding**

*Short description: Policy tables vs hard-coding*

A university changes its grading policy: exams now count for 50% instead of 40%. In the Grading Database, where is the BEST place to make this change according to Chapter 10?

A. Update every SQL query that references exam weights — search and replace '0.40' with '0.50'
*Feedback: Incorrect — hard-coding weights in queries creates a maintenance nightmare. One missed query produces inconsistent results.*

B. Update the weight value in the grading policy table — all queries that JOIN to the policy table will automatically use the new weight  ← ✓ CORRECT
*Feedback: Correct — storing weights in a policy table centralizes business rules. Changing one row updates every report that references it.*

C. Create a new database for each grading policy version
*Feedback: Incorrect — maintaining separate databases for policy changes is impractical and violates the principle of single source of truth.*

D. Add a new column to STUDENT_GRADE to store the override weight for each student
*Feedback: Incorrect — this embeds policy at the data level and creates redundancy. Policy should live in a policy table, not in every grade row.*

**Hint:** Where should configurable business rules live so one change updates everything?

**Explanation:** Chapter 10 advocates policy tables: storing configurable business rules (weights, thresholds, grade scales) in dedicated tables that queries JOIN to. This way, changing a policy requires updating one row in one table, and all reports, dashboards, and analyses automatically reflect the new rule — no code changes needed.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT10-Q7 | **Bloom:** Apply

---

**Q8. COALESCE function**

*Short description: COALESCE function*

In the at-risk student report (§10.12), a student has no attendance records. The query uses `COALESCE(ar.AttendanceRate, 0)`. What does COALESCE do in this context?

A. Returns the first non-NULL value in the list — 0 replaces NULL so the student shows 0% attendance instead of NULL  ← ✓ CORRECT
*Feedback: Correct — COALESCE scans its arguments left to right and returns the first one that is not NULL. This ensures calculations work even when data is missing.*

B. Converts the attendance rate from a percentage (0-100) to a decimal (0-1)
*Feedback: Incorrect — COALESCE handles NULLs; it does not perform mathematical conversion. Casting or arithmetic would be needed to change ranges.*

C. Combines multiple attendance records into a single average value
*Feedback: Incorrect — COALESCE handles NULL replacement, not aggregation. AVG or SUM would combine multiple records.*

D. Deletes attendance records where the rate is zero
*Feedback: Incorrect — COALESCE is a read-only function that returns a value. It does not modify or delete data.*

**Hint:** COALESCE(val1, val2, ...) = returns the first argument that is NOT NULL.

**Explanation:** Chapter 10 introduces COALESCE as the standard SQL function for NULL handling. It takes a list of values and returns the first non-NULL one. In reporting pipelines, COALESCE ensures that missing data (NULL from LEFT JOINs) is replaced with a sensible default (like 0) so calculations and comparisons work correctly.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT10-Q8 | **Bloom:** Understand

---

**Q9. Diagnostic queries before reports**

*Short description: Diagnostic queries*

Chapter 10 emphasizes running diagnostic queries before building analytical reports. A GRADE_FLAT table stores StudentID, FirstName, Email, DeliverableType, DeliverableNumber, DueDate, and Score in one table. Alice's email appears in 6 different rows with two different values. According to Chapter 10, why should this be diagnosed before any reporting?

A. Because flat tables always produce incorrect results — they should never be used for any purpose
*Feedback: Incorrect — Chapter 10 acknowledges that real-world data often arrives in flat formats. The issue is diagnosing problems before trusting the data.*

B. Because inconsistent data (like two different emails for the same person) produces unreliable reports — diagnostic queries reveal data quality issues that must be understood or corrected before analysis  ← ✓ CORRECT
*Feedback: Correct — Chapter 10's diagnostic-first approach ensures data inconsistencies are identified and understood before they silently corrupt reports and decisions.*

C. Because the DBMS requires all email addresses to be unique — the table violates a database constraint
*Feedback: Incorrect — in a flat table without normalization, there are no uniqueness constraints on email. The issue is data quality, not constraint violation.*

D. Because reports can only query normalized tables — flat tables must be converted first
*Feedback: Incorrect — SQL can query flat tables directly. The issue is data reliability, not SQL capability.*

**Hint:** Would you trust a report built on data that contains two different email addresses for the same person?

**Explanation:** Chapter 10's diagnostic-first approach (§10.3) advises running data quality checks before building reports. Inconsistent data in flat tables — duplicate emails, conflicting dates, missing values — silently corrupts analytical results. Diagnostic queries (finding duplicates, checking for NULLs, verifying consistency) reveal problems that must be fixed or understood before analysis begins.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT10-Q9 | **Bloom:** Apply

---

**Q10. CROSS JOIN product**

*Short description: CROSS JOIN product*

To find missing grades, Chapter 10 uses CROSS JOIN between STUDENT (5 rows) and DELIVERABLE (6 rows). How many rows does the CROSS JOIN produce, and why is this useful?

A. 11 rows — one for each unique combination of student and deliverable that exists in the data
*Feedback: Incorrect — CROSS JOIN produces the Cartesian product (every possible combination), not just existing ones. 5 × 6 = 30, not 5 + 6 = 11.*

B. 30 rows — the Cartesian product of all students and all deliverables, creating every possible pairing so missing combinations can be found with a LEFT JOIN  ← ✓ CORRECT
*Feedback: Correct — CROSS JOIN generates every possible student-deliverable pair. LEFT JOIN with IS NULL then identifies which pairs have no grade — the missing grades.*

C. 5 rows — one for each student, with all deliverables compressed into a single row
*Feedback: Incorrect — CROSS JOIN does not compress data. Each student appears once per deliverable, producing 5 × 6 = 30 rows.*

D. 6 rows — one for each deliverable, showing which students completed it
*Feedback: Incorrect — CROSS JOIN pairs every student with every deliverable. The result has student × deliverable rows, not deliverable rows.*

**Hint:** CROSS JOIN = Cartesian product. STUDENT rows × DELIVERABLE rows = every possible combination.

**Explanation:** Chapter 10 uses CROSS JOIN to generate the complete set of expected student-deliverable pairings (5 students × 6 deliverables = 30 rows). LEFT JOIN with the actual grades table, followed by `WHERE grade IS NULL`, reveals which combinations have no recorded grade — a pattern used throughout the chapter for finding missing data.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT10-Q10 | **Bloom:** Apply

---

## Quick-Reference Answer Key

| # | Type | Correct Answer(s) | Points | Difficulty | Bloom |
|---|------|-------------------|--------|------------|-------|
| 1 | MS   | A, C, D           | 2      | 3          | Understand |
| 2 | MS   | A, B, D           | 2      | 4          | Analyze |
| 3 | MC   | B                 | 1      | 2          | Understand |
| 4 | MC   | B                 | 1      | 3          | Apply |
| 5 | MC   | C                 | 1      | 3          | Apply |
| 6 | MC   | B                 | 1      | 3          | Apply |
| 7 | MC   | B                 | 1      | 3          | Apply |
| 8 | MC   | A                 | 1      | 2          | Understand |
| 9 | MC   | B                 | 1      | 3          | Apply |
| 10 | MC   | B                 | 1      | 3          | Apply |
