<!-- metadata: date="2026-06-11"; chapter="10"; section="rat"; title="Chapter 10 Readiness Assessment Test"; description="RAT for advanced SQL" -->

# <img src="../../_static/images/RAT.gif" alt="RAT" style="width: 50px; height: auto; margin-right: 10px; vertical-align: middle;"> Readiness Assessment Test: Advanced SQL Queries

---

## Assessment Design Notes

### Bloom's Taxonomy Distribution

| Bloom's Level | Questions | Count |
|---|---|---|
| **Remember** | Q1, Q2, Q3, Q4 | 4 |
| **Understand** | Q5, Q6, Q7, Q8 | 4 |
| **Apply** | Q9, Q10, Q11, Q12 | 4 |
| **Analyze** | Q13, Q14 | 2 |
| **Evaluate** | Q15 | 1 |

### AI-Resistance Strategies

1. **Chapter-specific framing**: Questions use the chapter's grading database terms and patterns, not generic SQL trivia.
2. **Plausible distractors**: Wrong answers use real SQL vocabulary in subtly incorrect ways.
3. **Pattern recognition over memorization**: Several questions ask students to choose the right design or query pattern, not just repeat definitions.
4. **Flashcard-to-application bridge**: Core chapter concepts are tested in scenario form so students must connect vocabulary to actual SQL work.

---

## Individual RAT (iRAT)

Complete this assessment individually to test your understanding of the material.

---

### Multiple Choice Questions (Single Answer)

**Question 1** *(Remember)*
What type of anomaly occurs when deleting a row also destroys unrelated facts stored in that row?

- A. Update anomaly
- B. Deletion anomaly
- C. Referential anomaly
- D. Aggregation anomaly

---

**Question 2** *(Remember)*
Which keyword starts a Common Table Expression?

- A. VIEW
- B. BEGIN
- C. WITH
- D. OVER

---

**Question 3** *(Remember)*
Which table in the grading database acts as the junction table connecting students to deliverables?

- A. ASSIGNMENT
- B. GRADE_SCALE
- C. STUDENT_GRADE
- D. ATTENDANCE

---

**Question 4** *(Remember)*
Which command saves all changes made during a transaction?

- A. SAVE
- B. COMMIT
- C. APPLY
- D. MERGE

---

**Question 5** *(Understand)*
In a flat table, what does a query using `GROUP BY StudentID HAVING COUNT(DISTINCT Email) > 1` help diagnose?

- A. Students with too many grades
- B. Conflicting values recorded for the same student
- C. Missing foreign keys in the STUDENT table
- D. Students who earned more than one letter grade

---

**Question 6** *(Understand)*
Why does the chapter use an aggregate like `MIN(DueDate)` when extracting deliverables with `GROUP BY`?

- A. To sort results from earliest to latest
- B. To force the database to create an index automatically
- C. To choose one stable value when messy source rows contain conflicting dates
- D. To convert the due date into a surrogate key

---

**Question 7** *(Understand)*
What is the main disadvantage of `CREATE TABLE AS SELECT` when building a final production schema?

- A. It cannot copy rows from an existing table
- B. It does not automatically create primary keys, foreign keys, or other constraints
- C. It only works in SQL Server
- D. It requires every column to be renamed during creation

---

**Question 8** *(Understand)*
Why does the chapter recommend storing grading policy in tables such as `GRADE_SCALE` or weight tables instead of hard-coding all logic in `CASE` statements?

- A. Because policy tables eliminate the need for joins
- B. Because data-driven policy is easier to update, audit, and reuse across reports
- C. Because `CASE` expressions are invalid inside grouped queries
- D. Because the database cannot evaluate `CASE` expressions efficiently

---

**Question 9** *(Apply)*
An instructor wants to identify missing submissions. Which query pattern from the chapter is designed for that task?

- A. `INNER JOIN` plus `ORDER BY`
- B. `UNION ALL` between STUDENT and DELIVERABLE
- C. `CROSS JOIN` to generate expected pairs, `LEFT JOIN` to grades, then `WHERE ... IS NULL`
- D. `GROUP BY DeliverableID HAVING COUNT(*) > 1`

---

**Question 10** *(Apply)*
If a query calculates `88 / 3` and returns `29`, what fix from the chapter prevents integer truncation?

- A. Wrap the result in `TRIM()`
- B. Cast one operand to a decimal or multiply by `1.0`
- C. Replace the division with `COUNT()`
- D. Use `ROW_NUMBER()` instead

---

**Question 11** *(Apply)*
Which SQL pattern shows a student's score and the class average in the same row?

- A. A scalar subquery in the `SELECT` clause
- B. A `DELETE` followed by `INSERT`
- C. A `CROSS JOIN` with `GRADE_SCALE`
- D. A trigger function

---

**Question 12** *(Apply)*
When filtering by date in PostgreSQL, which keyword replaces SQLite's `DATE('now')` function?

- A. NOWTEXT
- B. CURRENT_DATE
- C. TODAY()
- D. SYSTEM_DATE

---

**Question 13** *(Analyze)*
The chapter distinguishes a composite key from the chapter's `UNIQUE (StudentID, DeliverableID)` rule. Why does it implement that rule as a composite unique constraint instead of making `(StudentID, DeliverableID)` the primary key?

- A. Because composite keys are invalid in relational databases
- B. Because the table already uses `GradeID` as a surrogate primary key while still enforcing one score per student per deliverable
- C. Because `UNIQUE` constraints are faster than primary keys in every database engine
- D. Because foreign keys can only point to surrogate keys

---

**Question 14** *(Analyze)*
If `EXPLAIN QUERY PLAN` shows a scan of a large table instead of using an index, what should you infer?

- A. The query is being executed inside a transaction
- B. The database has detected duplicate rows automatically
- C. The database is performing a full table scan because no suitable index is being used
- D. The query must contain a correlated subquery

---

**Question 15** *(Evaluate)*
An advisor should see student names, average score, and risk status, but not birthdays or internal audit details. Which design choice best matches the chapter's governance approach?

- A. Put all columns directly into `STUDENT_GRADE` so one query can show everything
- B. Create an advisor-facing view that exposes only the needed reporting columns
- C. Use `UNION ALL` to combine STUDENT and GRADE_AUDIT
- D. Remove the BIRTHDAY column from the STUDENT table permanently

---

### Scoring

- Score: _____ / 15
- Passing Score: 11 out of 15

---

## Answer Key

1. **B** -- A deletion anomaly occurs when removing a row also removes unrelated facts that should have been stored independently.
2. **C** -- A CTE begins with `WITH`.
3. **C** -- `STUDENT_GRADE` resolves the many-to-many relationship between students and deliverables.
4. **B** -- `COMMIT` makes transaction changes permanent.
5. **B** -- The query detects conflicting email values recorded for the same student.
6. **C** -- `MIN(DueDate)` chooses one consistent value when grouped source rows may disagree.
7. **B** -- CTAS is fast for migration but does not automatically harden the schema with keys and constraints.
8. **B** -- Policy tables make grading logic data-driven, easier to change, and easier to audit.
9. **C** -- The chapter's missing-submission pattern is `CROSS JOIN` plus `LEFT JOIN` plus `IS NULL`.
10. **B** -- Casting or multiplying by `1.0` forces numeric division.
11. **A** -- A scalar subquery can return the class average once and display it alongside each row.
12. **B** -- PostgreSQL uses `CURRENT_DATE`.
13. **B** -- The chapter keeps `GradeID` as the surrogate primary key and uses a composite `UNIQUE` constraint to enforce the business rule.
14. **C** -- A scan indicates a full table scan rather than a targeted index lookup.
15. **B** -- A reporting view is the chapter's preferred way to expose only the columns a role needs.
