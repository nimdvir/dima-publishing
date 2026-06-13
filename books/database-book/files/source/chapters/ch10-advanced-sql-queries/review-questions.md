<!-- metadata: date="2026-06-11"; chapter="10"; section="reflection"; title="Chapter 10 Review & Reflection"; description="Review questions for advanced SQL" -->

## Review and Reflection

![Reflection GIF](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/review_cncyn6?_a=BAMAAAiu0)
### Main Topics Covered
- Advanced SQL as a shift from syntax recall to **designing reliable data systems** for reporting and decisions.
- Diagnosing flat-table problems in `GRADES_FLAT` using queries for duplication, inconsistent emails/names, and conflicting deliverable metadata.
- SQL-driven normalization workflow: extract entities, create tables from queries, migrate with `INSERT INTO ... SELECT`, then validate.
- Building the relational core around `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE` as the chapter’s “relational spine.”
- Strengthening data quality with primary keys, foreign keys, `UNIQUE`, `CHECK`, and post-migration integrity checks.
- JOIN mastery for real gradebook use cases, especially `CROSS JOIN + LEFT JOIN` patterns to detect missing submissions.
- Analytics patterns with `GROUP BY`, `HAVING`, `CASE`, score bands, and at-risk student detection.
- Time-aware SQL for overdue work, upcoming due dates, and weekly attendance trend analysis across SQL dialects.
- Weighted-grade computation using category weights/policy tables and validation of grading-policy consistency.
- Reusable query architecture with views (`GradebookSummary`, `DeliverableAverages`), CTE pipelines, and targeted subquery patterns.
- Production-readiness mechanics: indexing strategy, transaction safety (`BEGIN/COMMIT/ROLLBACK`), and trigger-based validation/auditing.
- Window-function analytics (`RANK`, cumulative totals, moving averages) to add insight without collapsing row-level detail.

### Review and Reflection Questions
#### ***Question 1: Why does the chapter treat normalization as a SQL process instead of only a design diagram task?***
The chapter treats normalization as a SQL process because real projects often begin with inherited `GRADES_FLAT` data, not ideal diagrams. You must diagnose defects with queries, identify duplicates and conflicts, then execute controlled refactoring steps to migrate toward a relational schema.

That workflow is operational, not theoretical: diagnostic `SELECT`s expose anomalies, `CREATE TABLE` and `INSERT ... SELECT` move clean entities into target structures, and validation queries confirm integrity. SQL is therefore the practical mechanism for turning design principles into reliable production data.

#### ***Question 2: What does “relational spine” mean in this chapter, and why is it central?***
“Relational spine” refers to the core join path `STUDENT → STUDENT_GRADE → DELIVERABLE` that supports most gradebook reporting. It is central because student-level outcomes, assignment-level context, and score events live in different normalized tables and must be combined consistently for analysis.

The chapter’s multi-join examples rely on this path for averages, missing submissions, and category performance. If the spine is modeled correctly with keys and constraints, advanced queries remain accurate even as reporting requirements become more complex.

#### ***Question 3: How does the chapter distinguish `INNER JOIN` from `LEFT JOIN` in practical teaching use?***
The chapter frames `INNER JOIN` as the right choice when you want only matched activity, such as completed submissions with valid scores. `LEFT JOIN` is emphasized when the absence of activity is the teaching signal, especially for intervention workflows.

The strongest example is missing-submission detection: build expected student-deliverable pairs with `CROSS JOIN`, then `LEFT JOIN` to grade records and filter `IS NULL`. This pattern would fail with `INNER JOIN` because unmatched, high-priority cases disappear from the result.

#### ***Question 4: Why does the chapter repeatedly pair `GROUP BY`, `HAVING`, and `CASE` for analytics?***
`GROUP BY`, `HAVING`, and `CASE` form a complete analytics pipeline: summarize behavior, apply threshold logic, and classify results into decision-friendly categories. This moves SQL beyond retrieval into structured interpretation.

In chapter examples, these clauses produce at-risk lists, score bands, and pass/fail/missing distributions by deliverable. The combination is powerful because each step is explicit and auditable: aggregation shows the pattern, `HAVING` enforces criteria, and `CASE` communicates outcomes in actionable labels.

#### ***Question 5: What is the strategic advantage of storing grading policy in tables (like scales/weights) instead of hard-coding every rule in queries?***
Policy tables turn grading rules into managed data rather than scattered query text. With `GRADE_SCALE` and weight tables, threshold or weighting changes become controlled data updates, not code rewrites across many reports.

This improves governance, reproducibility, and auditability. The chapter’s consistency checks—such as validating weight totals—are possible because rules are centralized and queryable. As a result, analytics stay aligned with current policy while preserving historical logic transparency.

#### ***Question 6: How do CTEs improve readability compared with deeply nested subqueries in this chapter’s approach?***
CTEs improve readability by naming intermediate stages of logic that would otherwise be buried in nested subqueries. In the chapter’s pattern, you can separate average calculation, grade labeling, and risk flagging into clear steps that match analytical intent.

This structure makes debugging easier because each stage can be inspected independently and adjusted without rewriting the full statement. It also improves maintainability when instructors or assistants revisit the query in later terms.

#### ***Question 7: In what situations does the chapter recommend views over one-off queries?***
The chapter recommends views when logic is reused frequently and consistency matters across users, terms, or reporting surfaces. Instead of duplicating long SQL in multiple places, a view exposes one maintained definition for dashboards and recurring summaries.

Examples such as `GradebookSummary` and `DeliverableAverages` illustrate this: they standardize joins, computed fields, and filters so everyone works from the same business logic. One-off exploratory analysis can remain ad hoc, but institutional reporting benefits from view-based reuse.

#### ***Question 8: Why are transactions emphasized for grade updates?***
Transactions are emphasized because grading operations often affect many rows, and partial completion can create unfair or inconsistent outcomes. Wrapping bulk adjustments in `BEGIN ... COMMIT` ensures all intended changes succeed together or none are persisted.

The chapter’s bulk penalty/curving examples show good practice: preview impact, execute updates in a transaction, validate results, then commit. If validation fails, rollback preserves data integrity and protects academic accountability.

#### ***Question 9: What role do triggers play beyond simple validation in this chapter?***
Beyond validation, triggers provide enforcement and traceability at the database layer. A trigger such as `validate_score` prevents invalid values from being saved even if application-side checks are bypassed, ensuring consistent rule application.

The chapter also uses triggers for accountability through `GRADE_AUDIT` logging, capturing who changed what and when. This supports transparency, dispute resolution, and compliance-style oversight in academic grading workflows.

#### ***Question 10: How does this chapter define “advanced” SQL in one integrated idea?***
The chapter defines advanced SQL as integrated practice: model data correctly, analyze it meaningfully, and operate it safely. It is not about writing longer statements; it is about combining relational design decisions with analytical patterns and production controls.

In one workflow, you normalize inherited data, build analytical queries with joins/aggregations/CTEs, and protect operations using indexes, transactions, and triggers. That combination delivers trustworthy insights and resilient systems, which is the chapter’s core standard for “advanced.”
---

### Review Questions

1. What are the three database anomalies, and how does normalization eliminate each one? Provide a grading database example for each.

2. Explain the difference between `CREATE TABLE AS SELECT` and `INSERT INTO ... SELECT`. When would you use each during a normalization project?

3. Why does the chapter recommend adding constraints *after* data migration rather than before? What sequencing principle does this follow?

4. Describe the `CROSS JOIN` + `LEFT JOIN` + `IS NULL` pattern. Why does this combination detect missing submissions when an `INNER JOIN` cannot?

5. Explain the difference between `HAVING` and `WHERE`. Write a query that finds students with an average score below 75 and identify which clause performs the filtering.

6. What is the difference between `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()`? Give a scenario in the grading database where the distinction matters.

7. Compare subqueries, CTEs, and views. Under what conditions is each the best choice? Refer to scope, reuse, and readability.

8. Explain each letter of the ACID acronym using a grading database example (e.g., applying a late penalty to all Homework 1 submissions).

9. What are the trade-offs of adding indexes to the `STUDENT_GRADE` table? When is the performance cost of an index justified?

10. Why does the chapter describe constraints as "governance policies encoded in the database"? Give three examples of constraints that enforce grading business rules.

### Discussion Questions

1. When is it worth accepting more JOIN complexity in exchange for a cleaner, normalized schema? What kinds of reporting problems make that trade-off worthwhile?

2. Should grading rules live primarily in SQL code (`CASE`) or in policy tables (`GRADE_SCALE`, weight tables)? Under what conditions would one approach be safer or easier to govern?

3. Triggers can enforce rules and create audit trails automatically. When do they strengthen a database design, and when do they make a system harder to understand or debug?

4. The chapter argues that views can act as reporting layers and security layers. What information should an advisor-facing view include, and what information should it deliberately hide?

5. If a team inherits a messy flat table, should they normalize immediately or stabilize reporting first? Explain the risks of both choices.

### SQL Practice Prompts

1. Write a diagnostic query that finds students who appear with more than one distinct email address in `GRADES_FLAT`. Explain what kind of anomaly this reveals.

2. Write a query that returns every student-deliverable pair with no recorded score using the chapter's `CROSS JOIN` plus `LEFT JOIN` pattern.

3. Build a query that shows each student's score, the class average, and the difference between the student's score and the class average in the same row.

4. Write a grouped query that identifies at-risk students using `HAVING AVG(Score) < 70`, then explain why `HAVING` is required instead of `WHERE`.

5. Design an advisor-facing view that exposes `StudentID`, student name, average score, and a risk flag, while hiding birthday and audit-related fields.