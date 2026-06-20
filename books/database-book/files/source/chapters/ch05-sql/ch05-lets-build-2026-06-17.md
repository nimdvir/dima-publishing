<!-- markdownlint-disable MD013 MD024 MD028 MD033 MD034 MD036 MD041 MD060 -->
<!-- LB revision (2026-06-17): standardized d.Type→d.AssignmentType, added prebuilt-structure framing note. -->

# Let's Build: Querying a Normalized Database

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

In the main chapter, you practiced SQL on a simplified two-table database. Here, you will level up by writing queries against the fully normalized, seven-table **Grading Database (GD)**. This Let's Build is the **teaching twin** of your graded lab: the concepts you practice here on the GD are the same ones you will use on the PetVax clinic in **Lab 05 — Querying the PetVax Database with SQL**.

The setup script provides a **prebuilt normalized structure** — the seven tables are already created, related, and populated. Your job is SQL practice, not schema design yet. Chapter 6 explains why the tables are shaped this way.

There is no submission for this Let's Build. Save your `.sql` file for yourself; the graded work happens in Lab 05.

## Purpose

To move from simple, single-table queries to more realistic, multi-table queries that require `JOINs`. By the end, you will be able to read and write queries that combine multiple tables to answer complex business questions.

## What You Will Practice

-   Loading a normalized database from a setup script.
-   Writing `SELECT` queries that `JOIN` multiple tables.
-   Using table aliases to clarify which table a column belongs to.
-   Performing aggregate calculations (`COUNT`, `AVG`) across joined tables.
-   Answering complex questions that require data from several tables.
-   **Challenge:** Getting a preview of **subqueries** and **views**.

## Before You Begin

Use **SQLite**. Either tool works:

| Tool                                                     | Best for                                    |
| -------------------------------------------------------- | ------------------------------------------- |
| [SQLiteOnline](https://sqliteonline.com/)                | Quick start in a browser, no install        |
| [DB Browser for SQLite](https://sqlitebrowser.org/)      | Saving a local `.db` file                   |

Open a new SQL script and start it with a comment header:

```sql
-- LB05 (Advanced): Querying the Normalized Grading Database
-- Your Name
-- Chapter 5 Let's Build
```

## 1. Load the Normalized Grading Database

Open `assets/ch05-lb-setup-advanced-2026-06-16.sql`, copy its full contents below your header, and run it. The script drops any old tables, creates all seven tables for the normalized schema, and inserts the starter data.

Confirm the load by checking the row counts for the main tables:

```sql
SELECT COUNT(*) FROM STUDENT;
SELECT COUNT(*) FROM DELIVERABLE;
SELECT COUNT(*) FROM STUDENT_GRADE;
```

Expected: **5** students, **6** deliverables, and **10** grades. If the counts are off, fix the load before continuing.

## 2. List All Students and Their Grades (Your First JOIN)

Our first question requires combining three tables: `STUDENT` (for names), `STUDENT_GRADE` (for scores), and `DELIVERABLE` (for the deliverable topic).

This is the power of a normalized database. Write a query using `INNER JOIN` to link them together.

```sql
SELECT
    s.FirstName,
    s.LastName,
    d.Topic,
    sg.Score
FROM
    STUDENT AS s
INNER JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
INNER JOIN
    DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
ORDER BY
    s.LastName, d.Topic;
```

**Expected Result:** A list of 10 rows showing each student, the topic of their submitted work, and their score. Notice how table aliases (`s`, `sg`, `d`) make the query much cleaner to read.

## 3. Calculate the Average Score for Each Student

Now, let's use `GROUP BY` with our `JOIN`. This query will show the average score for each student across all their submitted deliverables.

```sql
SELECT
    s.FirstName,
    s.LastName,
    ROUND(AVG(sg.Score), 2) AS AverageScore
FROM
    STUDENT AS s
INNER JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
GROUP BY
    s.StudentID
ORDER BY
    AverageScore DESC;
```

**Expected Result:** A list of students and their calculated average score. `AVG` automatically ignores the `NULL` score for Emma Scott's lab.

## 4. Find Which Students Scored Below 80 on Any Assignment

This query requires a `JOIN` and a `WHERE` clause to filter the results.

```sql
SELECT
    s.FirstName,
    s.LastName,
    d.Topic,
    sg.Score
FROM
    STUDENT AS s
JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
JOIN
    DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
WHERE
    sg.Score < 80;
```

**Expected Result:** One row, showing that Brian Lee scored 77 on the 'SQL Basics' quiz.

## 5. Count the Number of Submissions for Each Deliverable

This query uses `GROUP BY` on the `DELIVERABLE` table and `COUNT` to see how many students have a grade record for each item.

```sql
SELECT
    d.Topic,
    d.AssignmentType,
    COUNT(sg.GradeID) AS NumberOfSubmissions
FROM
    DELIVERABLE AS d
LEFT JOIN
    STUDENT_GRADE AS sg ON d.DeliverableID = sg.DeliverableID
GROUP BY
    d.DeliverableID
ORDER BY
    NumberOfSubmissions DESC;
```

**Expected Result:** A list of all deliverables, showing how many students have a submitted grade for each. We use a `LEFT JOIN` here to ensure that even deliverables with zero submissions would appear in our list (though in this dataset, all have at least one submission record, even if the score is `NULL`).

## 6. Challenge: Use a Subquery to Find Scores Above the Overall Average

A **subquery** (or inner query) is a `SELECT` statement nested inside another statement. Let's find all the individual scores that were higher than the overall average score.

First, find the average score of all assignments: `SELECT AVG(Score) FROM STUDENT_GRADE;` (it's 89.22). Now, use that as a subquery.

```sql
SELECT
    s.FirstName,
    s.LastName,
    d.Topic,
    sg.Score
FROM
    STUDENT AS s
JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
JOIN
    DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
WHERE
    sg.Score > (SELECT AVG(Score) FROM STUDENT_GRADE);
```

**Expected Result:** A list of the 6 scores that are higher than the overall average.

## 7. Challenge: Create a VIEW

A **View** is a stored query that you can interact with like a table. It’s useful for simplifying complex queries that you run often. Let's create a view that shows the full student grade report.

```sql
CREATE VIEW V_StudentGradeReport AS
SELECT
    s.FirstName,
    s.LastName,
    d.Topic,
    d.AssignmentType,
    sg.Score
FROM
    STUDENT AS s
JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
JOIN
    DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID;
```

Now that the view is created, you can query it just like a table!

```sql
SELECT * FROM V_StudentGradeReport WHERE FirstName = 'Alice';
```

**Expected Result:** Two rows, showing Alice's grades for the 'Database Basics' and 'SQL Basics' quizzes.

## What This Shows

You've moved from querying a single, flat table to a properly structured, multi-table database. You saw that while the data is stored in separate tables, `JOINs` allow you to bring it all together to answer much more complex and realistic questions. You also got a preview of how subqueries and views can further extend the power of SQL.

This is the foundation for the more advanced SQL you will learn in Chapter 9.

## Appendix: Quick References & Platform Differences

This appendix shows the chapter's ideas at work in the Let's Build grading database. Each section reuses the `GRADEBOOK` and `GRADE_WEIGHT` tables defined in Part 2 and Part 3 of the main chapter.

![Figure 5.47 — Appendix Roadmap](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-sql-review.jpg)
*Figure 5.47 — Appendix Roadmap. Maps the appendix examples back to the core chapter concepts: Access-style inserts and side-by-side age expressions.*

### A1. Inserting Rows One at a Time (Access-Friendly)

Multi-row `INSERT` works in SQLite and PostgreSQL. Microsoft Access expects one row per statement. In the Chapter 4 build, `RecordID` is an Access AutoNumber field, so it is generated automatically and you do not type a value for it. The first two rows from Part 3 would look like this in Access form:

![Figure 5.48 — SQLite vs. Access Insertions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-create-tables.png)
*Figure 5.48 — SQLite vs. Access insertions. Compares multi-row SQL insert statements in SQLite with single-row, AutoNumber-compliant insert statements in Access.*

```sql
INSERT INTO GRADEBOOK (StudentID, FirstName, LastName, Email, Birthday,
    DeliverableType, DeliverableNumber, DueDate, Topic, Score)
VALUES ('S1001', 'Alice', 'Johnson', 'alice@university.edu', #2004-05-14#,
    'Quiz', 1, #2026-09-08#, 'Database Basics', 92);

INSERT INTO GRADEBOOK (StudentID, FirstName, LastName, Email, Birthday,
    DeliverableType, DeliverableNumber, DueDate, Topic, Score)
VALUES ('S1002', 'Brian', 'Lee', 'brian@university.edu', #2003-11-22#,
    'Quiz', 1, #2026-09-08#, 'Database Basics', 84);
```

Notice three Access differences: `RecordID` is omitted so Access can generate it as AutoNumber, dates are wrapped in `#` rather than quotes, and each row needs its own statement.

### A2. A Side-by-Side Age Calculation

*Platform SQL Date Operations (Figure 5.45 above) maps the SQLite, PostgreSQL, and Access age expressions side by side.*

| Platform   | Approximate age expression                        |
| ---------- | ------------------------------------------------- |
| SQLite     | `strftime('%Y','now') - strftime('%Y', Birthday)` |
| PostgreSQL | `EXTRACT(YEAR FROM AGE(Birthday))`                |
| Access     | `DateDiff('yyyy', Birthday, Date())`              |

All three return a rough integer age based on year only. None checks whether the birthday has occurred yet this year, so the value can be one year high for several months.

---

### A3. SQL Quick Reference

The commands, clauses, and operators covered in this chapter, in one place. Keep this handy while working through the Let's Build and Lab 5.

| Category   | Command / Operator              | What it does                                            | Quick example                                                          |
| ---------- | ------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| DDL        | `CREATE TABLE`                  | Define a new table and its columns                      | `CREATE TABLE PET (PetID INTEGER PRIMARY KEY, PetName TEXT NOT NULL);` |
| DDL        | `ALTER TABLE`                   | Add, change, or drop a column after creation            | `ALTER TABLE PET ADD COLUMN WeightLb REAL;`                            |
| DDL        | `DROP TABLE`                    | Permanently delete a table                              | `DROP TABLE PET;`                                                      |
| DML        | `INSERT INTO`                   | Add one or more rows                                    | `INSERT INTO PET VALUES (1, 'Luna', 8.2);`                             |
| DML        | `UPDATE`                        | Change existing rows                                    | `UPDATE PET SET WeightLb = 9.0 WHERE PetID = 1;`                       |
| DML        | `DELETE`                        | Remove rows                                             | `DELETE FROM PET WHERE PetID = 1;`                                     |
| DQL        | `SELECT`                        | Choose which columns to return                          | `SELECT PetName, WeightLb FROM PET;`                                   |
| DQL        | `WHERE`                         | Filter rows by a condition                              | `SELECT * FROM PET WHERE AnimalType = 'Cat';`                          |
| DQL        | `ORDER BY`                      | Sort results (ASC default, DESC optional)               | `SELECT * FROM PET ORDER BY WeightLb DESC;`                            |
| DQL        | `DISTINCT`                      | Remove duplicate values from output                     | `SELECT DISTINCT AnimalType FROM PET;`                                 |
| DQL        | `IS NULL` / `IS NOT NULL`       | Test for missing values                                 | `SELECT * FROM PET WHERE WeightLb IS NULL;`                            |
| DQL        | `LIKE`                          | Match a text pattern (`%` = any string, `_` = one char) | `WHERE PetName LIKE 'L%';`                                             |
| DQL        | `BETWEEN`                       | Filter a range (inclusive)                              | `WHERE WeightLb BETWEEN 5 AND 20;`                                     |
| DQL        | `IN`                            | Match any value in a list                               | `WHERE AnimalType IN ('Cat', 'Dog');`                                  |
| DQL        | `AS`                            | Rename a column in output (alias)                       | `SELECT WeightLb AS Weight_Pounds FROM PET;`                           |
| Aggregate  | `COUNT()`                       | Count rows                                              | `SELECT COUNT(*) FROM PET;`                                            |
| Aggregate  | `SUM()`                         | Total of a numeric column                               | `SELECT SUM(WeightLb) FROM PET;`                                       |
| Aggregate  | `AVG()`                         | Average of a numeric column                             | `SELECT AVG(WeightLb) FROM PET;`                                       |
| Aggregate  | `MIN()` / `MAX()`               | Lowest or highest value                                 | `SELECT MIN(WeightLb), MAX(WeightLb) FROM PET;`                        |
| Clause     | `GROUP BY`                      | Group rows for per-group aggregation                    | `SELECT AnimalType, COUNT(*) FROM PET GROUP BY AnimalType;`            |
| Clause     | `HAVING`                        | Filter groups after aggregation                         | `... GROUP BY AnimalType HAVING COUNT(*) > 10;`                        |
| Expression | `CASE`                          | Conditional label or value                              | `CASE WHEN WeightLb > 30 THEN 'Large' ELSE 'Small' END`                |
| TCL        | `BEGIN` / `COMMIT` / `ROLLBACK` | Wrap changes in a transaction for safety                | `BEGIN; UPDATE ...; COMMIT;`                                           |

## Save Your Work

Save your script as `ch05_lb_advanced_<lastname>.sql`. Keep it as a reference for how to query a normalized database. This experience will be invaluable as we move into Chapter 6, where we dive deep into the theory and practice of relational database design and joins.

## Check Your Work

Run these verification queries against your loaded database:

| Check | Query | Expected |
|-------|-------|----------|
| Student count | `SELECT COUNT(*) FROM STUDENT;` | 5 |
| Deliverable count | `SELECT COUNT(*) FROM DELIVERABLE;` | 6 |
| Grade count | `SELECT COUNT(*) FROM STUDENT_GRADE;` | 10 |
| Students with grades | `SELECT COUNT(DISTINCT StudentID) FROM STUDENT_GRADE;` | 5 |
| Average score across all grades | `SELECT ROUND(AVG(Score), 2) FROM STUDENT_GRADE WHERE Score IS NOT NULL;` | ~85-90 |

If any count is off, re-run the setup script from Section 1. If your query results differ from the expected outputs in Sections 2-4, compare your SQL against the model queries line by line — the most common issue is a missing or misnamed JOIN condition.

## Common Mistakes

- **Forgetting the JOIN condition.** `INNER JOIN STUDENT_GRADE ON ...` — without the `ON` clause, the database does not know how to match rows.
- **Using the wrong column in GROUP BY.** Group by `StudentID`, not by name — two students can share a name, but `StudentID` is unique.
- **Mixing up AVG and SUM.** AVG divides the total by the count of rows; SUM just adds. When you want a per-student average, use `AVG` with `GROUP BY`.
- **Forgetting that NULL means missing.** `AVG` and `COUNT(column)` automatically skip NULLs. `COUNT(*)` counts every row. This matters when a student has a grade row with no score.
- **Alias confusion.** If you write `FROM STUDENT AS s`, you must use `s.` everywhere after — not `STUDENT.`. Pick one style and stay consistent.
- **Running queries in the wrong order.** The setup script must run first. If you try a JOIN before the tables exist, the query fails.

## Peek Ahead — Chapter 6

Chapter 5 focused on querying a normalized database that was already designed for you. Chapter 6 flips the perspective: you will design and build the relational structure yourself in Microsoft Access. You will create the same seven tables, set primary keys and foreign keys, enforce referential integrity in the Relationships window, and write the queries that prove the design works. The SQL you wrote here — `INNER JOIN`, `GROUP BY`, `AVG` — will be the same operations, but now you will understand why the tables are shaped the way they are before you query them.
