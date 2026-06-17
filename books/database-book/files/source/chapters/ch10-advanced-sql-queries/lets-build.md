## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

This Let's Build gives you hands-on practice with the advanced SQL techniques from Chapter 10. You will map the entire Grading Database (GDB) schema visually in Lucidchart, then write diagnostic, analytical, and reporting queries that turn normalized data into actionable information. Every task uses the same seven-table GDB you have been working with throughout the course. For submission, complete the exercises below and save your Lucidchart ERD and your SQL scripts. The companion **Lab 10 — Advanced SQL for Business Analysis** is where your graded PetVax transfer work lives.

### Purpose

Writing advanced SQL starts with understanding the schema. Before you can join tables, compute weighted grades, or build reporting pipelines, you need to see how the tables connect — which columns are keys, which pathways carry the most important queries, and where referential integrity guards the data. This LB has you map that schema visually, then apply the chapter's techniques: diagnostic queries, CTE pipelines, views, window functions, and safe data modification.

### What You Will Practice

- Drawing a seven-table entity-relationship diagram in Lucidchart with Crow's Foot notation
- Writing diagnostic queries that detect data quality problems before analysis
- Building multi-stage CTEs to compute weighted final grades with risk flags
- Creating reusable views that combine attendance and grade data
- Using window functions to rank and compare without collapsing detail rows
- Practicing safe `UPDATE` workflows with transactions

### Before You Begin

You will need:

- **Lucidchart** (free education account at [lucid.co](https://lucid.co)) — for the ERD
- **SQLite** ([sqliteonline.com](https://sqliteonline.com/) or DB Browser for SQLite) or **Supabase** (PostgreSQL) — for all SQL exercises
- The populated Grading Database from your earlier work. If you need to recreate it, the schema is:

```text
STUDENT(StudentID, FirstName, LastName, Email, Birthday)
ASSIGNMENT_TYPE(Type, Quantity, Points, Points_per_one)
DELIVERABLE(DeliverableID, Type, DeliverableNumber, DueDate, Topic)
STUDENT_GRADE(GradeID, StudentID, DeliverableID, Score)
SCHEDULE(ClassNum, Week, Date, Day, Topic, Format)
ATTENDANCE(AttendanceID, ClassNum, StudentID, Attended)
GRADE_SCALE(LetterGrade, MinScore, MaxScore)
```

### Map the Grading Database Schema with Lucidchart

Before writing a single query, draw the complete seven-table ERD. A clear diagram makes every join, every relationship pathway, and every constraint visible at a glance.

**What to do:**

1. Open Lucidchart and create a new **Entity Relationship Diagram** from the template gallery.
2. Add an entity box for each of the seven tables. Inside each box, list the table name at the top, then all columns. Bold or underline the primary key column.
3. Draw relationship lines between tables. Use **Crow's Foot notation** to show cardinality:
   - One student has many grades → `STUDENT (1)` ─── `< (M) STUDENT_GRADE`
   - One deliverable has many grades → `DELIVERABLE (1)` ─── `< (M) STUDENT_GRADE`
   - One schedule entry has many attendance records → `SCHEDULE (1)` ─── `< (M) ATTENDANCE`
   - One student has many attendance records → `STUDENT (1)` ─── `< (M) ATTENDANCE`
   - One assignment type defines many deliverables → `ASSIGNMENT_TYPE (1)` ─── `< (M) DELIVERABLE`
4. Label each relationship line with the foreign key column that carries the reference. For example, the line from `STUDENT` to `STUDENT_GRADE` should show `StudentID` as the FK in `STUDENT_GRADE`.
5. Add a note on the diagram identifying the three main relational pathways:
   - **Student Performance:** `STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE`
   - **Attendance:** `STUDENT → ATTENDANCE → SCHEDULE`
   - **Grade Interpretation:** `STUDENT_GRADE → GRADE_SCALE`

**Expected output:** A single Lucidchart ERD showing all seven tables, their columns with PKs marked, relationship lines in Crow's Foot notation, FK labels, and the three relational pathways annotated. Export as a PNG or PDF and save for submission.

<div class="callout tip">
  <p><strong>💡 Tip: Lucidchart Crow's Foot quick start</strong></p>
  <p>In Lucidchart, drag an entity shape onto the canvas for each table. To set Crow's Foot notation, select a relationship line, open the line settings panel, and choose the Crow's Foot endpoint style. The "one" side gets a single vertical line; the "many" side gets the three-pronged crow's foot.</p>
</div>

### Diagnose Data Quality with SQL

The chapter opened with a critical principle: diagnose before you analyze. Use SQL to check whether the GDB data can be trusted.

**What to do:**

Write a query that finds any `STUDENT_GRADE` rows where the `Score` is outside the valid range of 0 to 100.

```sql
-- Write your query here
```

Then write a second query that checks for duplicate grade records — the same student with more than one score for the same deliverable.

```sql
-- Write your query here
```

**Expected output:** The first query returns zero rows if all scores are valid; otherwise it lists the offending rows. The second query returns zero rows if every student has at most one score per deliverable. If either query returns rows, the data needs cleaning before the analyses that follow.

### Build a CTE Pipeline for Weighted Final Grades

Section 10.8 showed how to compute weighted final grades from policy stored in a table. Build a three-stage CTE pipeline that produces a ranked class list with risk flags.

**What to do:**

Write a single query with three CTE stages:

1. **CategoryAverages** — Compute each student's average score per deliverable type (Quiz, Exam, Project, Homework).
2. **WeightedGrades** — Multiply each category average by its weight and sum. Use these weights: Quiz = 0.20, Exam = 0.30, Project = 0.30, Homework = 0.20.
3. **FlaggedStudents** — Assign a letter grade (A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, F < 60) and a risk flag (`At Risk` if below 70, `Needs Attention` if below 80, `On Track` otherwise).

The final `SELECT` should return: student full name, weighted final grade (2 decimals), letter grade, and risk flag — ordered by grade ascending so at-risk students appear first.

**Expected output:** One row per student with four columns. Students with the lowest weighted grades appear at the top. Every student has a letter grade and a human-readable risk flag.

### Create a Reusable View for the Performance Dashboard

Section 10.10 introduced views as saved query logic. Create a view that instructors can query repeatedly to monitor student performance at a glance.

**What to do:**

Create a view called `StudentPerformanceDashboard` that returns for each student:

| Column | Source |
|---|---|
| `StudentName` | `FirstName || ' ' || LastName` |
| `AverageScore` | `AVG(Score)` from `STUDENT_GRADE`, rounded to 2 decimals |
| `SubmissionCount` | `COUNT(GradeID)` from `STUDENT_GRADE` |
| `AttendanceRate` | Percentage of classes attended, rounded to 1 decimal |
| `Status` | `At Risk` if average < 70 OR attendance < 70; `Needs Attention` if either < 80; `On Track` otherwise |

Use `LEFT JOIN` so students with no grades or no attendance still appear. After creating the view, query it with `SELECT * FROM StudentPerformanceDashboard ORDER BY Status, AverageScore ASC;`

**Expected output:** The `SELECT` from the view returns one row per student with five columns, sorted so at-risk students appear first. Students with zero grades show `NULL` or 0 for `AverageScore` depending on your handling.

### Rank Students with Window Functions

Section 10.9 showed that window functions calculate rankings and running values without collapsing detail rows. Use them to rank students and to show each score in context.

**What to do:**

Write a query that, for every grade record, shows:

| Column | How |
|---|---|
| `StudentName` | Joined from `STUDENT` |
| `DeliverableLabel` | e.g., "Quiz 1", "Exam 2" |
| `Score` | From `STUDENT_GRADE` |
| `StudentAverage` | `AVG(Score) OVER (PARTITION BY StudentID)` |
| `ClassRank` | `RANK() OVER (ORDER BY StudentAverage DESC)` — computed in a CTE first |

Order by `ClassRank`, then `StudentName`, then `DeliverableLabel`.

**Expected output:** Every grade row appears with the student's overall average and class rank alongside it. Students are grouped by rank. You can see each individual score next to the summary — the defining advantage of window functions over `GROUP BY`.

### Practice Safe Updates with Transactions

Section 10.11 emphasized that `UPDATE` and `DELETE` require discipline. Practice the safe workflow: verify, then modify, then verify again — wrapped in a transaction.

**What to do:**

The instructor decides to add 2 bonus points to all Homework scores, capped at 100.

1. Write a `SELECT` that shows every Homework score before the change.
2. Wrap the `UPDATE` in a transaction. Use `CASE` to cap scores at 100.
3. Write a verification `SELECT` that confirms no score exceeds 100.
4. Include comments showing where you would `ROLLBACK` if the verification fails.

**Expected output:** Before running `COMMIT`, your verification query shows all scores ≤ 100. The transaction block is clearly structured with the verify → modify → verify → commit/rollback pattern.

### Check Your Work

| Task | What to Verify |
|---|---|
| Lucidchart ERD | Seven tables, PKs marked, Crow's Foot notation, FK labels, three pathways annotated |
| Diagnostic queries | Score range query returns valid results; duplicate check returns zero rows on clean data |
| CTE pipeline | One row per student; weighted grades sum weights × category averages; risk flags match thresholds |
| Performance view | `SELECT * FROM StudentPerformanceDashboard` returns all students with five columns |
| Window functions | Every grade row has a `StudentAverage` and `ClassRank`; students grouped by rank |
| Safe update | Transaction block follows verify → modify → verify pattern; comments show rollback point |

### What This Shows

- The Lucidchart ERD proves you can read a normalized schema and communicate its structure visually — a skill every database professional uses.
- The diagnostic queries show that SQL is not just for answers — it is for verifying that your data can be trusted before you build reports on it.
- The CTE pipeline demonstrates how advanced SQL breaks a complex calculation (weighted grades + letter mapping + risk flags) into readable, auditable stages.
- The view shows how reusable query logic becomes analytical infrastructure — define once, query repeatedly.
- The window function exercise proves you understand the difference between collapsing rows (`GROUP BY`) and enriching rows (window functions).
- The safe update task ingrains the discipline of verify → modify → verify, which protects real databases from irreversible mistakes.

### Common Mistakes

- **Forgetting to mark PKs and FKs on the ERD.** An ERD without keys is just a picture of boxes. The keys are what make it a database diagram.
- **Using `WHERE` instead of `HAVING` for aggregate conditions.** `WHERE` filters rows before aggregation; `HAVING` filters groups after.
- **Averaging averages.** If you average category averages without weighting, a quiz average of 95 counts the same as an exam average of 95 — even if exams are worth twice as much. Always multiply by weight before summing.
- **Committing before verifying.** Never run `COMMIT` until your verification `SELECT` confirms the `UPDATE` or `DELETE` affected exactly the rows you intended.
- **Confusing `RANK()` and `ROW_NUMBER()`.** `RANK()` gives ties the same number and leaves gaps. `ROW_NUMBER()` assigns a unique number even for ties. Know which one your report needs.
- **Forgetting `LEFT JOIN` in the view.** `INNER JOIN` drops students with no grades or no attendance. Use `LEFT JOIN` so every student appears in the dashboard.

### Submit or Save

Save the following for submission:

1. **Lucidchart ERD** — exported as PNG or PDF, named `ch10-gdb-erd-YourName.png`
2. **SQL script** — a single `.sql` file containing all five queries (diagnostic, CTE pipeline, view creation, window function, transaction), named `ch10-advanced-sql-YourName.sql`
3. **Screenshot** — of your `StudentPerformanceDashboard` view output showing all students

The companion **Lab 10 — Advanced SQL for Business Analysis** transfers these skills to the PetVax veterinary clinic database. That is where your graded submission lives.

### Peek Ahead — Chapter 11

Chapter 11 shifts from querying and analyzing data to managing the database itself. You will learn about administration, security, backup, indexing, and governance — the practices that keep a production database reliable, fast, and safe. The queries you wrote here become part of a larger system that someone has to protect and maintain.
