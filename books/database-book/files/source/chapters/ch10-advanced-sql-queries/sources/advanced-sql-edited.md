<!-- metadata: date="2026-06-11"; chapter="10"; type="source"; title="Source: Advanced SQL Edited"; description="Source material for chapter 10" -->

# Advanced SQL With the Grading Database

## Introduction: From Writing Queries to Designing Intelligence

!(banner)[![C:\Users\nd115232\Documents\GitHub\BITM330-Book\images\Advanced SQL Queries\banner.png](C:\Users\nd115232\Documents\GitHub\BITM330-Book\images\Advanced SQL Queries\banner.png)]

![test](C:\Users\nd115232\Documents\GitHub\BITM330-Book\images\Advanced SQL Queries\banner.png)




The previous chapter introduced SQL as a language for creating tables, inserting data, writing queries, and performing calculations. You learned the grammar of SQL — `SELECT`, `WHERE`, `JOIN`, `GROUP BY`, `CASE`. Those skills let you *retrieve* information from a well-structured database. But most databases in the real world are not well-structured when you first encounter them.

This chapter marks a shift. Advanced SQL is not about memorizing more keywords. It is about building **maintainable data systems** — restructuring messy data into clean schemas, writing queries that serve as reliable reporting tools, and using database mechanics to protect and optimize your work. The difference between a beginner and an advanced SQL user is not syntax; it is the ability to look at a flat, redundant, error-prone dataset and transform it into a relational system that produces trustworthy answers.

At its core, advanced SQL is about **clarity**. It helps you express complex questions precisely, trace how results are produced, and trust the numbers that inform decisions. Business reporting, KPIs, and performance measurement all depend on this clarity. A poorly written query can be just as damaging as bad data — producing misleading summaries or hiding important patterns. Advanced SQL gives you the tools to structure questions correctly, reuse logic safely, and scale analysis as data grows.

SQL also plays a central role in **decision-making systems**. Dashboards, reports, and analytics platforms do not "think" on their own — they rely on SQL logic underneath. When you understand how to design reusable queries, derive metrics, and connect normalized tables, you gain control over how information is interpreted across the organization. This is where SQL moves from a technical skill to a business competency.

This chapter follows a deliberate arc:

1. **Normalization through SQL** — Diagnosing problems in flat data and restructuring it into clean, related tables using queries.
2. **SELECT fundamentals (fast review)** — Ensuring fluency with the building blocks before advancing.
3. **JOINs** — Mastering relational queries and multi-table thinking.
4. **Analytics** — `GROUP BY`, `CASE`, expressions, time-aware queries, weighted grades, and window functions.
5. **Reusable artifacts** — Views, CTEs, and subqueries as composable reporting tools.
6. **Advanced mechanics** — Indexes, transactions, triggers, and data governance.

Throughout the chapter, every concept maps to a real grading workflow. You will build gradebook reports, detect missing submissions, calculate weighted grades, analyze attendance-performance relationships, and create reusable reporting pipelines. The grading database is not a toy example — it models the same challenges you will face in any business database: multiple entities, repeated events, and multiple stakeholders (students, instructors, administrators) who all need different views of the same data.

[[Figure: Chapter roadmap showing the six-part arc from Normalization → Fundamentals → JOINs → Analytics → Reusable Artifacts → Advanced Mechanics, with the Grading Database icon at the center connecting all parts.]]

### Tools You Will Use

One of the most important ideas in this chapter is that **SQL logic is portable**. While tools and interfaces differ, the underlying language remains the same. The SQL in this chapter works across multiple platforms, with notes where dialects differ:

* **Supabase (PostgreSQL, cloud-based)** — A hosted PostgreSQL environment that represents modern, production-grade systems. Supabase allows you to write SQL in a browser-based editor while interacting with a real relational database.
* **SQLiteOnline (browser-based)** — A lightweight, no-installation environment for quickly testing SQL syntax and logic. Ideal for experimentation and learning.
* **DB Browser for SQLite (desktop)** — A visual, file-based tool for working with SQLite databases locally.

Although these tools look different, the SQL you write is fundamentally the same. Learning SQL once allows you to work across platforms, systems, and organizations.

### What Makes SQL "Advanced"

Advanced SQL is not a separate language. It is the same `SELECT`, `FROM`, `WHERE` you already know — applied to harder problems. What changes is how you use them together. You are moving from *retrieving data* to *transforming, protecting, and optimizing* data. That shift requires:

* **Relational thinking** — seeing data as connected entities, not isolated rows
* **Analytical clarity** — knowing which questions to ask and how to structure them
* **Engineering discipline** — making queries reusable, performant, and safe

This chapter builds directly on the foundation from the previous chapter. You already know how tables relate, why normalization matters, and how basic joins work. Here, we extend those ideas by showing how SQL expresses **business logic** — grading rules, performance thresholds, averages, and trends — in a precise and repeatable way.

By the end of this chapter, you will not just write queries. You will design query systems that support business reporting, performance measurement, and data-driven decision-making. This is the point where SQL stops being a tool for asking isolated questions and becomes a language for **engineering intelligence**.

---

# Part A: SQL-Driven Normalization and Schema Refactoring

Real-world SQL work rarely begins with a clean, normalized database. It begins with a spreadsheet export, a legacy flat file, or an inherited table where everything was crammed into one place. The first advanced skill is not a fancy query — it is using SQL to diagnose problems and restructure data into a sound relational design.

Think of it this way: if the previous chapter taught you how to build furniture, this section teaches you how to renovate a house. You need to understand what is wrong with the current structure before you can improve it.

Up to this point, normalization has been discussed primarily as a **design principle**. In practice, however, normalization is often carried out *after* data already exists. Real organizations inherit messy spreadsheets, legacy tables, or poorly designed databases and must **refactor them without losing data**. SQL is the primary tool used to perform that cleanup.

---

## 1. Diagnosing Redundancy and Anomalies Using Queries

Before restructuring anything, you need to see the problems. SQL is an excellent diagnostic tool — it can reveal duplication, inconsistency, and structural weaknesses that are invisible in a visual table editor. Before drawing entity–relationship diagrams or enforcing foreign keys, experienced analysts begin with **diagnostic queries**. If the data shows duplication, inconsistency, or ambiguity, the design is already broken — regardless of how clean the schema looks on paper.

### The Problem: Flat-Table Thinking

Imagine you inherited a single `GRADES_FLAT` table that stores everything about students, assignments, and scores in one place:

[[Table: Sample rows from the GRADES_FLAT table showing repeated student and deliverable data across rows.]]

```
| StudentID | FirstName | LastName | Email                       | Birthday   | Type    | DeliverableNumber | DueDate    | Topic           | Score |
|-----------|-----------|----------|-----------------------------|------------|---------|-------------------|------------|-----------------|-------|
| 1         | Alice     | Johnson  | alice.johnson@university.edu| 2001-05-14 | Quiz    | 1                 | 2025-09-10 | Database Basics | 95    |
| 1         | Alice     | Johnson  | alice.johnson@university.edu| 2001-05-14 | Quiz    | 2                 | 2025-09-20 | Relational Model| 90    |
| 1         | Alice     | Johnson  | alice.johnson@university.edu| 2001-05-14 | Homework| 1                 | 2025-09-15 | ER Diagrams     | 88    |
| 2         | Bob       | Smith    | bob.smith@university.edu    | 2000-11-22 | Quiz    | 1                 | 2025-09-10 | Database Basics | 88    |
| 2         | Bob       | Smith    | bob.smith@university.edu    | 2000-11-22 | Quiz    | 2                 | 2025-09-20 | Relational Model| 84    |
```

Alice's name, email, and birthday appear three times. Quiz 1's due date and topic appear twice. This is not a table — it is a report masquerading as a database. Every repeated value is a place where errors can creep in.

### Detecting Duplication

**Syntax — Counting how many times each student's details are repeated:**

```sql
SELECT StudentID, FirstName, LastName, Email,
       COUNT(*) AS TimesRepeated
FROM GRADES_FLAT
GROUP BY StudentID, FirstName, LastName, Email
HAVING COUNT(*) > 1;
```

**Grading Database Example:**

```
| StudentID | FirstName | LastName | Email                        | TimesRepeated |
|-----------|-----------|----------|------------------------------|---------------|
| 1         | Alice     | Johnson  | alice.johnson@university.edu | 6             |
| 2         | Bob       | Smith    | bob.smith@university.edu     | 6             |
| 3         | Carol     | Davis    | carol.davis@university.edu   | 6             |
```

If Alice has grades for 6 deliverables, her name and email are stored 6 times. That is 5 unnecessary copies of the same information. In a properly normalized STUDENT table, a similar query should return **zero rows**.

### Detecting Conflicting Values

Duplication is bad. Duplication *with conflicts* is worse. What if Alice's email was entered differently in different rows?

**Syntax — Finding students with multiple distinct emails:**

```sql
SELECT StudentID, FirstName, LastName,
       COUNT(DISTINCT Email) AS EmailVariations
FROM GRADES_FLAT
GROUP BY StudentID, FirstName, LastName
HAVING COUNT(DISTINCT Email) > 1;
```

If this query returns any rows, you have a data quality problem: the same student is recorded with different email addresses. A single student should have exactly one email. Multiple values indicate update anomalies or data entry errors. This problem disappears once email is stored **once** in a normalized STUDENT table.

### Detecting Spelling Inconsistencies

**Syntax — Finding students whose names appear in different forms:**

```sql
SELECT StudentID,
       COUNT(DISTINCT FirstName) AS NameVariations,
       GROUP_CONCAT(DISTINCT FirstName) AS AllFirstNames
FROM GRADES_FLAT
GROUP BY StudentID
HAVING COUNT(DISTINCT FirstName) > 1;
```

> **Note:** `GROUP_CONCAT` works in SQLite and MySQL. In PostgreSQL, use `STRING_AGG(DISTINCT FirstName, ', ')`.

This query might reveal that StudentID 4 appears as both "David" and "Dave" — a common data entry inconsistency that causes incorrect aggregations. Without normalization, these two entries look like different students.

### Detecting Missing or Inconsistent Deliverable Definitions

Assignment-level metadata should be stable, not repeated per student.

**Syntax — Checking whether the same deliverable appears with conflicting information:**

```sql
SELECT Type, DeliverableNumber,
       COUNT(DISTINCT DueDate) AS DateVariations,
       COUNT(DISTINCT Topic) AS TopicVariations
FROM GRADES_FLAT
GROUP BY Type, DeliverableNumber
HAVING COUNT(DISTINCT DueDate) > 1
    OR COUNT(DISTINCT Topic) > 1;
```

If Quiz 1 has two different due dates in different rows, you have conflicting data. This is an **update anomaly** — someone corrected the due date in some rows but not others. SQL highlights the problem immediately, without theoretical analysis.

### The Three Anomalies

These diagnostic queries reveal three categories of problems that plague flat tables:

[[Table: The three data anomalies — update, insertion, and deletion — with definitions and grading database examples.]]

| Anomaly Type                | Description                                                                   | Example                                                        |
| --------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Update Anomaly**    | Changing a fact requires updating many rows; miss one and the data conflicts. | Correcting Alice's email in 3 of 6 rows leaves 3 inconsistent. |
| **Insertion Anomaly** | You cannot record a fact without unrelated data.                              | You cannot add a new student until they have a grade.          |
| **Deletion Anomaly**  | Deleting rows destroys unrelated facts.                                       | Deleting Alice's only grade also deletes her name and email.   |

The cure for all three is **normalization**: separating each entity into its own table and connecting them through keys and relationships.

> **If SQL can detect inconsistency, your design is already too permissive.** These diagnostic queries serve as a lens — by asking the right questions of your data, you can uncover structural flaws long before they surface in reports, dashboards, or business decisions.

[[Figure: A flat "GRADES_FLAT" table with highlighted redundant cells (repeated student names, repeated deliverable info) and arrows pointing to the three anomaly types (update, insertion, deletion) with brief descriptions.]]

---

## 2. Extracting Entities From a Flat Table

Once you have diagnosed the problems, the next step is to extract distinct entities from the flat table. This is normalization in practice — not as a theory exercise, but as a series of SQL operations.

The key insight: every group of columns that repeats together represents a separate entity that should live in its own table. In `GRADES_FLAT`:

* `StudentID`, `FirstName`, `LastName`, `Email`, `Birthday` — these describe a **Student**.
* `Type`, `DeliverableNumber`, `DueDate`, `Topic` — these describe a **Deliverable**.
* `Score` — this is the **relationship** between a student and a deliverable.

`DISTINCT` and `GROUP BY` are the workhorses of entity extraction.

### Extracting Students

**Syntax — Using `SELECT DISTINCT` to extract unique student records:**

```sql
SELECT DISTINCT StudentID, FirstName, LastName, Email, Birthday
FROM GRADES_FLAT
ORDER BY StudentID;
```

This query returns each student exactly once, regardless of how many grades they have. `DISTINCT` eliminates duplicate rows, producing the clean data you need for a new STUDENT table.

**Grading Database Example:**

```
| StudentID | FirstName | LastName  | Email                        | Birthday   |
|-----------|-----------|-----------|------------------------------|------------|
| 1         | Alice     | Johnson   | alice.johnson@university.edu | 2001-05-14 |
| 2         | Bob       | Smith     | bob.smith@university.edu     | 2000-11-22 |
| 3         | Carol     | Davis     | carol.davis@university.edu   | 2002-02-08 |
| 4         | David     | Lee       | david.lee@university.edu     | 2001-07-19 |
| 5         | Eve       | Martinez  | eve.martinez@university.edu  | 1999-09-30 |
```

Five students, each appearing exactly once. This is what belongs in a STUDENT table.

### Extracting Deliverables

**Syntax — Using `GROUP BY` to extract unique deliverable definitions:**

```sql
SELECT Type, DeliverableNumber,
       MIN(DueDate) AS DueDate,
       MIN(Topic) AS Topic
FROM GRADES_FLAT
GROUP BY Type, DeliverableNumber
ORDER BY Type, DeliverableNumber;
```

Why `MIN(DueDate)` instead of just `DueDate`? If the data has conflicts — different due dates for the same deliverable in different rows — `GROUP BY` requires an aggregate function for columns not in the `GROUP BY` clause. Using `MIN` picks one consistent value. In a clean dataset, all values would be the same anyway.

**Grading Database Example:**

```
| Type     | DeliverableNumber | DueDate    | Topic            |
|----------|-------------------|------------|------------------|
| Exam     | 1                 | 2025-10-05 | Midterm          |
| Homework | 1                 | 2025-09-15 | ER Diagrams      |
| Project  | 1                 | 2025-11-15 | Database Design  |
| Quiz     | 1                 | 2025-09-10 | Database Basics  |
| Quiz     | 2                 | 2025-09-20 | Relational Model |
| Quiz     | 3                 | 2025-10-10 | SQL Basics       |
```

Six unique deliverables, extracted from the flat table. Each will become a row in the new DELIVERABLE table.

[[Figure: The GRADES_FLAT table being split into three separate tables (STUDENT, DELIVERABLE, STUDENT_GRADE) with arrows showing which columns move where and key columns highlighted to show how the tables connect.]]

---

## 3. Creating New Tables From Queries

Extracting entities with `SELECT DISTINCT` is only the first step. To make the normalization permanent, you need to create new tables that store the extracted data. SQL provides several ways to do this, and the syntax varies by platform.

### Approach 1: CREATE TABLE AS SELECT (PostgreSQL, SQLite)

**Syntax:**

```sql
CREATE TABLE new_table AS
SELECT columns
FROM source_table
WHERE conditions;
```

**Grading Database Example — Creating the STUDENT table:**

```sql
CREATE TABLE STUDENT AS
SELECT DISTINCT StudentID, FirstName, LastName, Email, Birthday
FROM GRADES_FLAT;
```

This creates a new `STUDENT` table and populates it in one step. The table structure is inferred from the query results.

**Grading Database Example — Creating the DELIVERABLE table with a surrogate key:**

```sql
CREATE TABLE DELIVERABLE AS
SELECT ROW_NUMBER() OVER (ORDER BY Type, DeliverableNumber) AS DeliverableID,
       Type, DeliverableNumber, DueDate, Topic
FROM (
    SELECT DISTINCT Type, DeliverableNumber,
           MIN(DueDate) AS DueDate,
           MIN(Topic) AS Topic
    FROM GRADES_FLAT
    GROUP BY Type, DeliverableNumber
) AS unique_deliverables;
```

This version generates a `DeliverableID` using `ROW_NUMBER()`, providing a surrogate key for the new table.

> **SQLite note:** Older SQLite versions may not support `ROW_NUMBER()`. An alternative is to create the table first and let SQLite's `rowid` serve as the primary key.

**Grading Database Example — Creating the STUDENT_GRADE junction table:**

```sql
CREATE TABLE STUDENT_GRADE AS
SELECT StudentID,
       DeliverableType,
       DeliverableNumber,
       Grade
FROM GRADES_FLAT;
```

This table contains only **relationships and outcomes** — not descriptive data. It is the transactional core of the grading system.

### Approach 2: SELECT INTO (SQL Server, Some Dialects)

**Syntax:**

```sql
SELECT columns
INTO new_table
FROM source_table;
```

**Example:**

```sql
SELECT DISTINCT StudentID, FirstName, LastName, Email, Birthday
INTO STUDENT
FROM GRADES_FLAT;
```

This achieves the same result but uses different syntax. Microsoft Access also uses `SELECT ... INTO` for creating new tables from queries.

### Why "Create-From-Query" Is a Bridge, Not the Final Architecture

`CREATE TABLE AS SELECT` is a pragmatic normalization tool. It gets data into separate tables quickly. But it does not automatically create primary keys, foreign keys, or constraints. Those must be added separately (Section 5). Think of this step as framing the house — the walls go up fast, but you still need wiring, plumbing, and inspection.

---

## 4. Migrating Data Into the New Tables

When tables already exist with the correct structure but are empty, you populate them using `INSERT INTO … SELECT` — the workhorse of data migration. Unlike `INSERT INTO … VALUES`, which inserts one row at a time, `INSERT INTO … SELECT` moves **sets of rows** produced by a query.

### Syntax

```sql
INSERT INTO target_table (column1, column2, ...)
SELECT column1, column2, ...
FROM source_table
WHERE conditions;
```

This pattern is ideal for extracting unique entities from a flat table, cleaning data before constraints are enforced, and migrating data in controlled stages.

### Grading Database Example — Populating the STUDENT Table

If you created the STUDENT table with `CREATE TABLE` (defining columns, types, and constraints explicitly) rather than `CREATE TABLE AS SELECT`:

```sql
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email, Birthday)
SELECT DISTINCT StudentID, FirstName, LastName, Email, Birthday
FROM GRADES_FLAT;
```

At this stage, constraints such as `PRIMARY KEY` and `UNIQUE` should already exist on the STUDENT table. If duplicates remain, the insertion will fail — which is exactly what you want.

### Grading Database Example — Populating the DELIVERABLE Table

```sql
INSERT INTO DELIVERABLE (Type, DeliverableNumber, DueDate)
SELECT DISTINCT Type, DeliverableNumber, DueDate
FROM GRADES_FLAT;
```

Each deliverable is defined once. Due dates become consistent by design. Changes to a deliverable affect all students automatically.

### Grading Database Example — Populating STUDENT_GRADE (the Junction Table)

The junction table connects students to deliverables and stores scores. It requires a mapping from the flat table's deliverable columns to the new `DeliverableID`:

```sql
INSERT INTO STUDENT_GRADE (StudentID, DeliverableID, Score)
SELECT gf.StudentID, d.DeliverableID, gf.Score
FROM GRADES_FLAT gf
JOIN DELIVERABLE d
    ON gf.Type = d.Type
    AND gf.DeliverableNumber = d.DeliverableNumber;
```

This query joins the flat table to the new DELIVERABLE table — matching on `Type` and `DeliverableNumber` to find the correct `DeliverableID` — then inserts the student-deliverable-score triples into `STUDENT_GRADE`.

### De-Duplication Strategies

During migration, you may encounter rows that should not exist:

**Removing exact duplicates with DISTINCT:**

```sql
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email, Birthday)
SELECT DISTINCT StudentID, FirstName, LastName, Email, Birthday
FROM GRADES_FLAT;
```

**Handling NULLs — Excluding rows with missing required data:**

```sql
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email, Birthday)
SELECT DISTINCT StudentID, FirstName, LastName, Email, Birthday
FROM GRADES_FLAT
WHERE StudentID IS NOT NULL
  AND FirstName IS NOT NULL
  AND LastName IS NOT NULL;
```

**Choosing natural vs. surrogate keys:**

* **Natural keys** (like `StudentID` if it is a real university ID) carry business meaning.
* **Surrogate keys** (auto-generated integers) are simpler and guaranteed unique.

For the grading database, `StudentID` is treated as a natural key (the university-assigned ID). `DeliverableID` and `GradeID` are surrogate keys generated during migration.

### Verifying Migration Before Proceeding

A critical sequencing principle: **clean first, constrain second.** Before adding foreign keys, `NOT NULL` constraints, or `CHECK` constraints, verify that the migration is correct.

**Check row counts match:**

```sql
SELECT COUNT(*) FROM GRADES_FLAT;
SELECT COUNT(*) FROM STUDENT_GRADE;
```

The number of rows should match — the volume of data has not changed, but the **size of duplicated data** has been dramatically reduced.

**Check for missing deliverable matches (orphaned rows):**

```sql
SELECT *
FROM GRADES_FLAT gf
LEFT JOIN DELIVERABLE d
    ON gf.Type = d.Type
    AND gf.DeliverableNumber = d.DeliverableNumber
WHERE d.DeliverableID IS NULL;
```

If this query returns rows, some grades could not be mapped to deliverables — a sign of inconsistent data that must be resolved before constraints are enforced.

**Validate that joins reconstruct the original data:**

```sql
SELECT s.FirstName, s.LastName, sg.Score
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID;
```

If results match the original flat table output, normalization preserved correctness.

---

## 5. Adding Constraints and Referential Integrity After Migration

You may wonder: why not add primary keys and foreign keys when creating the tables? In practice, constraints are often added *after* data migration for a practical reason — if the data is messy, constraint violations will block the migration entirely. It is easier to:

1. Move the data first.
2. Clean it.
3. Then "harden" the tables with constraints.

Think of it as moving furniture into a room, arranging it, and *then* bolting the shelves to the wall.

### Adding Primary Keys

**Syntax:**

```sql
ALTER TABLE table_name
ADD CONSTRAINT constraint_name PRIMARY KEY (column);
```

**Grading Database Example:**

```sql
ALTER TABLE STUDENT
ADD CONSTRAINT pk_student PRIMARY KEY (StudentID);

ALTER TABLE DELIVERABLE
ADD CONSTRAINT pk_deliverable PRIMARY KEY (DeliverableID);

ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT pk_student_grade PRIMARY KEY (GradeID);
```

> **SQLite note:** SQLite does not support adding a `PRIMARY KEY` with `ALTER TABLE` after creation. You must define the primary key in the original `CREATE TABLE` statement or recreate the table.

### Adding Foreign Keys

**Syntax:**

```sql
ALTER TABLE child_table
ADD CONSTRAINT constraint_name
FOREIGN KEY (column) REFERENCES parent_table(column);
```

**Grading Database Example:**

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT fk_sg_student
FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID);

ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT fk_sg_deliverable
FOREIGN KEY (DeliverableID) REFERENCES DELIVERABLE(DeliverableID);
```

These constraints guarantee that every grade record points to a real student and a real deliverable. Attempting to insert a grade for a nonexistent student will fail — the database enforces integrity automatically.

### Adding Validation Constraints

```sql
-- Ensure scores are within a valid range (0-100)
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT chk_score CHECK (Score >= 0 AND Score <= 100);

-- Ensure email addresses are unique
ALTER TABLE STUDENT
ADD CONSTRAINT uq_email UNIQUE (Email);

-- Ensure required fields are never NULL
ALTER TABLE STUDENT
ALTER COLUMN FirstName SET NOT NULL;
```

### Why Constraints Come After Cleanup

If you define `CHECK (Score >= 0 AND Score <= 100)` before migrating data, and the flat table contains a score of 105 (perhaps a bonus), the migration will fail. By adding constraints after loading data, you can:

1. Load the data.
2. Query for violations (`SELECT * FROM STUDENT_GRADE WHERE Score > 100`).
3. Decide how to handle each case (cap at 100? keep as-is? flag for review?).
4. Apply the constraint when the data is clean.

This is not cutting corners — it is sound engineering practice.

---

## 6. Dropping the Old Table and Working With the New Schema

Once the new schema is verified, the original flat table becomes unnecessary and risky.

```sql
DROP TABLE GRADES_FLAT;
```

From this point forward, all queries operate on the **normalized relational design**. This step represents a critical mindset shift: SQL is not just for querying data — it is a **refactoring tool**. Analysts and engineers use SQL to reshape databases, enforce structure, and prepare systems for reliable analytics and long-term growth.

---

## 7. Refactoring the Gradebook Into a Relational Core

After normalization, your grading database has a clean "relational spine" — a set of well-defined, connected tables that support reliable querying and reporting.

### The Final Schema

[[Table: The seven tables of the normalized grading database with their purposes and primary keys.]]

| Table                   | Purpose                                                             | Primary Key   |
| ----------------------- | ------------------------------------------------------------------- | ------------- |
| **STUDENT**       | Student identities and contact information                          | StudentID     |
| **DELIVERABLE**   | Individual assignments — Quiz 1, Exam 2, Final Project             | DeliverableID |
| **STUDENT_GRADE** | Scores earned — connects students to deliverables (junction table) | GradeID       |
| **ASSIGNMENT**    | Assignment category metadata: quantity, total points, points each   | Type          |
| **SCHEDULE**      | Course timeline — dates, topics, session format                    | ClassNum      |
| **ATTENDANCE**    | Whether each student attended each session                          | AttendanceID  |
| **GRADE_SCALE**   | Letter grade thresholds — maps numbers to letters                  | LetterGrade   |

### Key Relationships

```
STUDENT ──(1:M)──> STUDENT_GRADE <──(M:1)── DELIVERABLE
STUDENT ──(1:M)──> ATTENDANCE    <──(M:1)── SCHEDULE
DELIVERABLE ──(M:1)──> ASSIGNMENT (by Type)
STUDENT_GRADE.Score ──(maps to)──> GRADE_SCALE
```

### When to Extend the Schema

The seven-table schema covers a single course. In a real institution, you might add:

* **COURSE** — to track multiple courses
* **SEMESTER** — to separate terms
* **INSTRUCTOR** — to associate courses with faculty
* **SECTION** — for multiple sections of the same course

The principle is the same: each new entity gets its own table, connected through foreign keys. Start minimal, extend when the questions demand it.

[[Figure: Entity-relationship diagram showing the seven tables of the grading database (STUDENT, DELIVERABLE, STUDENT_GRADE, ASSIGNMENT, SCHEDULE, ATTENDANCE, GRADE_SCALE) with their primary keys, foreign keys, and cardinality notations (1:M, M:1). The relational spine — STUDENT → STUDENT_GRADE → DELIVERABLE — is highlighted as the central pathway.]]

---

# Part B: SQL Fundamentals (Fast Review With Grading Examples)

If you completed the previous SQL chapter, this section is a quick refresher. If you are joining the course at this point, it provides the essential vocabulary. Either way, fluency with these fundamentals is required for the advanced content that follows.

---

## 8. SELECT as a Reporting Language

`SELECT` is not just a data retrieval command — it is a reporting language. Every business report, dashboard metric, and KPI starts as a `SELECT` statement.

### Syntax

```sql
SELECT column1, column2, expression AS alias
FROM table_name
WHERE condition
ORDER BY column ASC | DESC
LIMIT n;
```

### Grading Database Examples

**Selecting specific columns with aliases:**

```sql
SELECT FirstName || ' ' || LastName AS StudentName,
       Email
FROM STUDENT
ORDER BY LastName;
```

**Filtering by date — Deliverables due before October:**

```sql
SELECT Type, DeliverableNumber, DueDate, Topic
FROM DELIVERABLE
WHERE DueDate < '2025-10-01'
ORDER BY DueDate;
```

**Finding missing submissions — Students with no score recorded:**

```sql
SELECT s.FirstName, s.LastName
FROM STUDENT s
LEFT JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
WHERE sg.GradeID IS NULL;
```

**Late work detection — Scores on overdue deliverables:**

```sql
SELECT s.FirstName, d.Type, d.DeliverableNumber, d.DueDate, sg.Score
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
WHERE d.DueDate < DATE('now')
ORDER BY d.DueDate DESC;
```

> **PostgreSQL note:** Use `CURRENT_DATE` instead of `DATE('now')` in PostgreSQL/Supabase.

### Why SELECT Matters for Business

Every time a manager asks "How are we doing?" or "Show me the numbers," the answer is a `SELECT` statement. Learning to write clear, well-aliased, well-ordered queries is the single most valuable SQL skill for business professionals. The remainder of this chapter builds on this foundation.

---

## 9. Data Cleaning Patterns in SQL

Real-world data does not arrive clean. Before you analyze it, you often need to trim whitespace, standardize text, handle missing values, and validate formats. SQL provides tools for all of these.

### Trimming Whitespace

```sql
SELECT TRIM(FirstName) AS FirstName,
       TRIM(LastName) AS LastName
FROM STUDENT;
```

Leading and trailing spaces are invisible in most displays but wreak havoc on `JOIN` conditions and `GROUP BY` operations. A `FirstName` of `'Alice'` does not match `'Alice '`.

### Standardizing Case

```sql
UPDATE STUDENT
SET Email = LOWER(TRIM(Email));
```

This ensures all email comparisons work correctly, regardless of how the data was originally entered.

### Replacing Missing Values

**Syntax — `COALESCE` returns the first non-NULL value:**

```sql
SELECT COALESCE(column, 'default_value') AS filled
FROM table_name;
```

**Grading Database Example — Showing "Not Graded" for missing scores:**

```sql
SELECT s.FirstName, s.LastName,
       d.Type, d.DeliverableNumber,
       COALESCE(CAST(sg.Score AS TEXT), 'Not Graded') AS Score
FROM STUDENT s
CROSS JOIN DELIVERABLE d
LEFT JOIN STUDENT_GRADE sg
    ON s.StudentID = sg.StudentID
    AND d.DeliverableID = sg.DeliverableID
ORDER BY s.LastName, d.Type, d.DeliverableNumber;
```

This produces a complete grid of every student and every deliverable, with "Not Graded" displayed wherever a score is missing.

### Validating Patterns

**Grading Database Example — Finding non-standard emails:**

```sql
SELECT FirstName, LastName, Email
FROM STUDENT
WHERE Email NOT LIKE '%@%.%';
```

This finds any email that does not contain an `@` symbol followed by a dot — a simple validation that catches obvious data entry errors.

### Casting Types

**Grading Database Example — Ensuring scores are treated as decimals:**

```sql
SELECT StudentID, DeliverableID,
       CAST(Score AS REAL) AS Score
FROM STUDENT_GRADE;
```

This is important when computing averages — integer division (`88 / 3 = 29` in some systems) produces incorrect results unless one operand is a decimal.

---

# Part C: Relational Querying (JOINs and Beyond)

---

## 10. JOIN Mastery Using the Gradebook

JOINs are the defining feature of relational databases. They connect separate tables at query time, producing combined results without duplicating stored data. This section deepens your understanding with realistic, multi-table grading scenarios.

### INNER JOIN vs. LEFT JOIN: When Each Matters

**INNER JOIN** returns only rows with matches in both tables. Use it when you want *complete* records — students who have grades, deliverables that have been submitted.

**LEFT JOIN** returns all rows from the left table, with `NULL` for unmatched rows on the right. Use it when you want to find *what is missing* — students without grades, deliverables without submissions.

### Grading Database Example — Complete Gradebook (INNER JOIN)

```sql
SELECT s.FirstName, s.LastName,
       d.Type, d.DeliverableNumber,
       sg.Score
FROM STUDENT s
INNER JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
INNER JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
ORDER BY s.LastName, d.Type, d.DeliverableNumber;
```

This three-table join produces the complete gradebook: every student, every deliverable they submitted, and their score. Students without any grades do not appear. Deliverables with zero submissions do not appear.

### Grading Database Example — Students With Missing Grades (LEFT JOIN)

```sql
SELECT s.FirstName, s.LastName,
       d.Type, d.DeliverableNumber
FROM STUDENT s
CROSS JOIN DELIVERABLE d
LEFT JOIN STUDENT_GRADE sg
    ON s.StudentID = sg.StudentID
    AND d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL
ORDER BY s.LastName, d.Type, d.DeliverableNumber;
```

This query generates every possible student-deliverable pair (using `CROSS JOIN`), then checks which pairs have no grade recorded. The `WHERE sg.GradeID IS NULL` filter isolates missing submissions. This is one of the most practically useful queries in any grading system.

### Grading Database Example — Deliverables Without Any Submissions

```sql
SELECT d.Type, d.DeliverableNumber, d.DueDate
FROM DELIVERABLE d
LEFT JOIN STUDENT_GRADE sg ON d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL;
```

If a deliverable has been created but no student has been graded on it, this query catches it — indicating a data entry lag or a deliverable that has not yet been collected.

### Multi-Join Logic: The Student-Grade-Deliverable Pathway

The most common multi-join pattern in the grading database follows the chain:

```
STUDENT → STUDENT_GRADE → DELIVERABLE
```

`STUDENT_GRADE` is the bridge. It holds the `StudentID` (linking to STUDENT) and `DeliverableID` (linking to DELIVERABLE). This is the **relational spine** of the grading system.

**Extended Example — Full gradebook with assignment category information (four-table join):**

```sql
SELECT s.FirstName || ' ' || s.LastName AS StudentName,
       d.Type AS Category,
       d.DeliverableNumber AS Number,
       d.Topic,
       sg.Score,
       a.Points_per_one AS MaxPoints
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
JOIN ASSIGNMENT a ON d.Type = a.Type
ORDER BY s.LastName, d.Type, d.DeliverableNumber;
```

This four-table join adds the maximum possible points from the ASSIGNMENT table, giving context to each score. A score of 85 means something different if the maximum is 100 vs. 50.

### Self-Joins (Conceptual)

Self-joins compare rows within the same table — for example, comparing each student's performance to the class average, or ranking students relative to peers. While less common in the grading database, the concept underpins peer comparison logic used in more advanced analytics.

---

## 11. Many-to-Many Thinking and Intersection Tables

### Why STUDENT_GRADE Exists

A student can have many grades. A deliverable can be submitted by many students. This is a **many-to-many relationship** — and it cannot be represented directly in a relational database. The solution is an **intersection table** (also called a junction table or associative entity).

`STUDENT_GRADE` is that intersection table. It sits between STUDENT and DELIVERABLE, holding the foreign keys to both plus the score:

[[Table: The STUDENT_GRADE intersection table showing its four columns and their roles.]]

| Column        | Purpose                    |
| ------------- | -------------------------- |
| GradeID       | Surrogate primary key      |
| StudentID     | Foreign key → STUDENT     |
| DeliverableID | Foreign key → DELIVERABLE |
| Score         | The grade earned           |

### Preventing Duplicate Submissions

What happens if someone accidentally enters Alice's Quiz 1 score twice? You need a constraint that enforces: **one score per student per deliverable**.

**Syntax — Composite uniqueness constraint:**

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT uq_student_deliverable
UNIQUE (StudentID, DeliverableID);
```

**Grading Database Example — Testing the constraint:**

```sql
-- This should succeed (first submission)
INSERT INTO STUDENT_GRADE (GradeID, StudentID, DeliverableID, Score)
VALUES (31, 1, 1, 95);

-- This should FAIL (duplicate student + deliverable combination)
INSERT INTO STUDENT_GRADE (GradeID, StudentID, DeliverableID, Score)
VALUES (32, 1, 1, 97);
```

The second insert violates the `UNIQUE` constraint because Alice (StudentID 1) already has a score for Deliverable 1.

### When to Allow Revisions

Some grading policies allow students to resubmit. In that case, you might:

* Remove the `UNIQUE` constraint and add a `SubmissionDate` column to track versions.
* Keep the constraint and use `UPDATE` to replace scores rather than inserting new rows.
* Add a `Version` or `Attempt` column to the composite key: `UNIQUE (StudentID, DeliverableID, Attempt)`.

The design choice depends on the business rule. The important point is that the database schema should *reflect* the policy, not work around it.

---

# Part D: Analytics SQL for Decision Making

Analytics SQL transforms raw data into actionable intelligence. This section covers the patterns that turn a gradebook into a decision-support system — identifying at-risk students, flagging hard assignments, computing weighted grades, and tracking trends over time. Rather than exporting data into spreadsheets, we embed grading rules, performance logic, and analytical reasoning directly into queries.

This shift reflects how SQL is used in real organizations: not just to fetch rows, but to **encode policies**, **produce metrics**, and **support decision-making at scale**.

---

## 12. Aggregations and GROUP BY for Performance Metrics

### Average Score Per Student

```sql
SELECT s.FirstName || ' ' || s.LastName AS StudentName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       COUNT(sg.GradeID) AS SubmissionsCount
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AverageScore DESC;
```

This produces a rank-ordered list of students by performance. Adding `COUNT` shows how many assignments each student has completed — useful for spotting students with missing work.

### Average Score Per Deliverable

```sql
SELECT d.Type, d.DeliverableNumber, d.Topic,
       ROUND(AVG(sg.Score), 2) AS ClassAverage,
       MIN(sg.Score) AS LowestScore,
       MAX(sg.Score) AS HighestScore,
       MAX(sg.Score) - MIN(sg.Score) AS Spread
FROM DELIVERABLE d
JOIN STUDENT_GRADE sg ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.Type, d.DeliverableNumber, d.Topic
ORDER BY ClassAverage ASC;
```

The `Spread` (difference between highest and lowest scores) reveals how much variability exists on each assignment. A large spread might indicate inconsistent preparation among students.

### Average Score Per Assignment Type

```sql
SELECT d.Type,
       ROUND(AVG(sg.Score), 2) AS TypeAverage,
       COUNT(sg.GradeID) AS TotalSubmissions
FROM DELIVERABLE d
JOIN STUDENT_GRADE sg ON d.DeliverableID = sg.DeliverableID
GROUP BY d.Type
ORDER BY TypeAverage ASC;
```

Are students performing worse on exams than quizzes? This query answers that question instantly.

### DISTINCT and COUNT(DISTINCT)

Use `COUNT(DISTINCT)` to avoid double-counting when data may contain repeated references.

**Grading Database Example — Number of unique students who submitted work:**

```sql
SELECT COUNT(DISTINCT StudentID) AS ActiveStudents
FROM STUDENT_GRADE;
```

### Score Distributions Using Count-by-Band

```sql
SELECT
    CASE
        WHEN sg.Score >= 90 THEN '90-100 (A)'
        WHEN sg.Score >= 80 THEN '80-89 (B)'
        WHEN sg.Score >= 70 THEN '70-79 (C)'
        WHEN sg.Score >= 60 THEN '60-69 (D)'
        ELSE 'Below 60 (F)'
    END AS ScoreBand,
    COUNT(*) AS StudentCount
FROM STUDENT_GRADE sg
GROUP BY ScoreBand
ORDER BY ScoreBand DESC;
```

[[Figure: Bar chart or histogram showing score distributions across the five letter-grade bands.]]

This creates a histogram of score distributions across all assignments — a quick visual of overall class performance.

### HAVING for Thresholds

**Grading Database Example — At-risk students (average below 75):**

```sql
SELECT s.FirstName, s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
HAVING AVG(sg.Score) < 75
ORDER BY AverageScore ASC;
```

**Grading Database Example — Assignments that are too easy (average above 95):**

```sql
SELECT d.Type, d.DeliverableNumber, d.Topic,
       ROUND(AVG(sg.Score), 2) AS ClassAverage
FROM DELIVERABLE d
JOIN STUDENT_GRADE sg ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.Type, d.DeliverableNumber, d.Topic
HAVING AVG(sg.Score) > 95;
```

### Nested Aggregation with Subqueries

**Grading Database Example — Students whose average is above the class average (aggregating aggregates):**

```sql
SELECT s.FirstName, s.LastName, AVG(sg.Score) AS AvgScore
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
HAVING AVG(sg.Score) > (
    SELECT AVG(Score) FROM STUDENT_GRADE
);
```

### Percentages and Ratios

**Grading Database Example — Attendance rate per student:**

```sql
SELECT StudentID,
       ROUND(SUM(Attended) * 1.0 / COUNT(*), 2) AS AttendanceRate
FROM ATTENDANCE
GROUP BY StudentID;
```

Multiplying by `1.0` forces decimal division, preventing integer truncation.

---

## 13. CASE Expressions for Grading Logic

The `CASE` expression allows SQL to translate raw values into meaningful classifications. It converts numeric scores into letter grades, flags risk levels, and embeds grading policy directly in the query layer.

### Mapping Scores to Letter Grades

**Syntax:**

```sql
SELECT column,
       CASE
           WHEN condition1 THEN result1
           WHEN condition2 THEN result2
           ...
           ELSE default_result
       END AS alias
FROM table;
```

**Grading Database Example — Assigning letter grades to each score:**

```sql
SELECT s.FirstName, s.LastName,
       d.Type, d.DeliverableNumber,
       sg.Score,
       CASE
           WHEN sg.Score >= 94 THEN 'A'
           WHEN sg.Score >= 90 THEN 'A-'
           WHEN sg.Score >= 87 THEN 'B+'
           WHEN sg.Score >= 83 THEN 'B'
           WHEN sg.Score >= 80 THEN 'B-'
           WHEN sg.Score >= 77 THEN 'C+'
           WHEN sg.Score >= 73 THEN 'C'
           WHEN sg.Score >= 70 THEN 'C-'
           WHEN sg.Score >= 67 THEN 'D+'
           WHEN sg.Score >= 60 THEN 'D'
           ELSE 'F'
       END AS LetterGrade
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
ORDER BY s.LastName, d.Type, d.DeliverableNumber;
```

This query applies the grading rubric uniformly across all records. If the grading policy changes, updating one query updates every report that relies on it.

### Using the GRADE_SCALE Table Instead

Embedding grading thresholds directly in `CASE` works, but it is fragile — if the grading scale changes, you must update every query. A better approach uses the GRADE_SCALE table:

```sql
SELECT s.FirstName, s.LastName,
       sg.Score,
       gs.LetterGrade
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
JOIN GRADE_SCALE gs
    ON sg.Score >= gs.MinScore
    AND sg.Score <= gs.MaxScore;
```

The grading policy lives in data, not in code. Changing the scale requires updating one table, not rewriting queries.

### Conditional Flags for Reporting

```sql
SELECT s.FirstName, s.LastName,
       d.Type, d.DeliverableNumber,
       sg.Score,
       CASE WHEN sg.Score IS NULL THEN 'Missing' ELSE 'Submitted' END AS Status,
       CASE WHEN sg.Score < 70 THEN 'Below Threshold' ELSE 'Passing' END AS Performance
FROM STUDENT s
CROSS JOIN DELIVERABLE d
LEFT JOIN STUDENT_GRADE sg
    ON s.StudentID = sg.StudentID
    AND d.DeliverableID = sg.DeliverableID
ORDER BY s.LastName, d.Type;
```

Each row now carries two flags — submission status and performance level — making the output immediately actionable for an instructor.

### Flagging At-Risk Students with CASE in Aggregation

```sql
SELECT s.FirstName, s.LastName,
       ROUND(AVG(sg.Score), 2) AS AvgScore,
       CASE
           WHEN AVG(sg.Score) < 70 THEN 'At Risk'
           WHEN AVG(sg.Score) < 80 THEN 'Needs Attention'
           ELSE 'On Track'
       END AS Status
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AvgScore ASC;
```

Here, `CASE` is used inside an aggregate context to classify students based on overall performance — not individual scores.

### CASE Inside Aggregate Functions (Conditional Counting)

**Grading Database Example — Counting passing vs. failing grades per deliverable:**

```sql
SELECT d.Type, d.DeliverableNumber,
       COUNT(CASE WHEN sg.Score >= 70 THEN 1 END) AS Passing,
       COUNT(CASE WHEN sg.Score < 70 THEN 1 END) AS Failing,
       COUNT(CASE WHEN sg.Score IS NULL THEN 1 END) AS Missing
FROM DELIVERABLE d
CROSS JOIN STUDENT s
LEFT JOIN STUDENT_GRADE sg
    ON s.StudentID = sg.StudentID
    AND d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.Type, d.DeliverableNumber
ORDER BY d.Type, d.DeliverableNumber;
```

This produces a per-deliverable summary showing how many students passed, failed, or did not submit. This pattern — `CASE` inside an aggregate — is essential for KPI-style reporting.

**Grading Database Example — Counting each student's failing grades:**

```sql
SELECT StudentID,
       SUM(CASE WHEN Score < 60 THEN 1 ELSE 0 END) AS FailingCount
FROM STUDENT_GRADE
GROUP BY StudentID;
```

---

## 14. Expressions for Business Reporting

SQL expressions allow you to compute new values directly inside queries. These expressions turn raw data into **business-ready outputs** without requiring export to spreadsheets or external tools.

### Arithmetic Expressions

Used for bonuses, scaling, and weighted calculations.

**Grading Database Example — Adding bonus points:**

```sql
SELECT DeliverableID, StudentID, Score,
       Score + 5 AS BonusScore
FROM STUDENT_GRADE;
```

This does not change the stored data — it calculates `BonusScore` only in the query results.

### String Expressions

Used to create readable labels and identifiers.

**Grading Database Example — Full student names:**

```sql
SELECT FirstName || ' ' || LastName AS FullName, Email
FROM STUDENT;
```

> **Note:** In SQL Server, use `+` instead of `||` for concatenation. In MySQL, use the `CONCAT()` function.

### Date and Time Expressions

Used for age calculations, deadlines, and time-based analysis.

**Grading Database Example — Calculating student age:**

```sql
SELECT FirstName, LastName,
       (strftime('%Y', 'now') - strftime('%Y', Birthday)) AS Age
FROM STUDENT;
```

Date function syntax varies significantly between database systems — always check your platform's documentation.

### Aggregate Expressions Inside Reports

Aggregates summarize performance and trends across an entire column.

**Grading Database Example — Overall score statistics:**

```sql
SELECT AVG(Score) AS AvgScore,
       MAX(Score) AS MaxScore,
       MIN(Score) AS MinScore
FROM STUDENT_GRADE;
```

These aggregates are often combined with `GROUP BY` and `CASE` to produce managerial metrics.

---

## 15. Time-Aware Queries

Dates drive much of academic and business logic: due dates, attendance windows, late penalties, and trends over time. SQL provides functions to work with dates, though the syntax varies across platforms.

### Upcoming Due Dates

**Grading Database Example — Deliverables due in the next 14 days:**

```sql
-- SQLite
SELECT Type, DeliverableNumber, DueDate, Topic
FROM DELIVERABLE
WHERE DueDate BETWEEN DATE('now') AND DATE('now', '+14 days')
ORDER BY DueDate;

-- PostgreSQL
SELECT Type, DeliverableNumber, DueDate, Topic
FROM DELIVERABLE
WHERE DueDate BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'
ORDER BY DueDate;
```

### Overdue Deliverables Without Submissions

```sql
SELECT d.Type, d.DeliverableNumber, d.DueDate,
       s.FirstName, s.LastName
FROM DELIVERABLE d
CROSS JOIN STUDENT s
LEFT JOIN STUDENT_GRADE sg
    ON s.StudentID = sg.StudentID
    AND d.DeliverableID = sg.DeliverableID
WHERE d.DueDate < DATE('now')
  AND sg.GradeID IS NULL
ORDER BY d.DueDate, s.LastName;
```

This query identifies students who have not submitted assignments that are past due — a critical early-warning report.

### Attendance Trends by Week

```sql
SELECT sc.Week,
       COUNT(CASE WHEN a.Attended = 1 THEN 1 END) AS PresentCount,
       COUNT(CASE WHEN a.Attended = 0 THEN 1 END) AS AbsentCount,
       ROUND(
           100.0 * COUNT(CASE WHEN a.Attended = 1 THEN 1 END) /
           NULLIF(COUNT(*), 0), 1
       ) AS AttendanceRate
FROM SCHEDULE sc
JOIN ATTENDANCE a ON sc.ClassNum = a.ClassNum
GROUP BY sc.Week
ORDER BY sc.Week;
```

[[Figure: Line chart showing weekly attendance rates over the semester, with a trend line indicating whether engagement is rising, stable, or declining.]]

This weekly attendance report shows whether engagement is rising, falling, or stable over the semester. A declining trend might prompt the instructor to adjust the class format.

### Date Functions Reference

[[Table: Common date operations with syntax for both SQLite and PostgreSQL.]]

| Operation          | SQLite                            | PostgreSQL                           |
| ------------------ | --------------------------------- | ------------------------------------ |
| Current date       | `DATE('now')`                   | `CURRENT_DATE`                     |
| Add days           | `DATE('now', '+7 days')`        | `CURRENT_DATE + INTERVAL '7 days'` |
| Extract year       | `strftime('%Y', column)`        | `EXTRACT(YEAR FROM column)`        |
| Difference in days | `JULIANDAY(d1) - JULIANDAY(d2)` | `d1 - d2` (returns integer)        |

---

## 16. Weighted Grades and Policy Tables

In most courses, not all assignments carry equal weight. Quizzes might be worth 20% of the final grade, exams 40%, and the project 40%. Computing weighted grades requires joining scores to weight definitions and performing careful arithmetic.

### The ASSIGNMENT Table as a Weight Source

[[Table: ASSIGNMENT table showing category metadata used for weight calculations.]]

| Type    | Quantity | Points |
| ------- | -------- | ------ |
| Quiz    | 4        | 80     |
| Exam    | 2        | 100    |
| Project | 1        | 50     |

Total points across all categories: 80 + 100 + 50 = 230.

### Computing Weighted Averages

**Grading Database Example — Weighted average for each student:**

```sql
SELECT s.FirstName || ' ' || s.LastName AS StudentName,
       ROUND(
           SUM(sg.Score * 1.0 / a.Points_per_one * a.Points) /
           SUM(a.Points), 2
       ) AS WeightedAverage
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
JOIN ASSIGNMENT a ON d.Type = a.Type
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY WeightedAverage DESC;
```

This query joins each score to its deliverable and assignment category, scales each score by its category's point weight, and divides by total points to produce a weighted average.

### Simpler Approach Using Percentages

If you define weights as fractions that sum to 1.0, the calculation is cleaner. Create a weight table:

```sql
CREATE TABLE GRADE_WEIGHT (
    Type TEXT PRIMARY KEY,
    Weight REAL NOT NULL
);

INSERT INTO GRADE_WEIGHT VALUES
    ('Quiz', 0.20),
    ('Exam', 0.40),
    ('Project', 0.40);
```

**Verifying that weights sum to 1.0:**

```sql
SELECT SUM(Weight) AS TotalWeight
FROM GRADE_WEIGHT;
```

If this returns anything other than 1.0, the grading policy is inconsistent — a data integrity issue that must be resolved before computing final grades.

**Computing weighted averages with percentages:**

```sql
WITH CategoryAverages AS (
    SELECT sg.StudentID, d.Type,
           AVG(sg.Score) AS TypeAverage
    FROM STUDENT_GRADE sg
    JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
    GROUP BY sg.StudentID, d.Type
)
SELECT s.FirstName || ' ' || s.LastName AS StudentName,
       ROUND(SUM(ca.TypeAverage * gw.Weight), 2) AS WeightedFinalGrade
FROM STUDENT s
JOIN CategoryAverages ca ON s.StudentID = ca.StudentID
JOIN GRADE_WEIGHT gw ON ca.Type = gw.Type
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY WeightedFinalGrade DESC;
```

This CTE-based approach first computes each student's average within each category, then multiplies by the category weight and sums to produce the final grade.

### Auditing Grade Policy Changes

If weights change during the semester, earlier calculations must be reproducible. Consider adding an `EffectiveDate` column to `GRADE_WEIGHT`:

```sql
ALTER TABLE GRADE_WEIGHT
ADD COLUMN EffectiveDate DATE DEFAULT CURRENT_DATE;
```

This creates a historical record of policy changes — essential for transparency and auditability in any grading system (or business pricing, commission structure, etc.).

---

## 17. Window Functions: Analytics Without Collapsing Rows

Window functions are among the most powerful features in modern SQL. They solve a specific problem: performing **analysis alongside detail**, without grouping rows away.

Standard aggregation with `GROUP BY` collapses rows into summary groups — you get the average, but you lose the individual records. Window functions calculate aggregates, rankings, and running totals while **preserving every row**.

### Basic Window Function Syntax

```sql
AGGREGATE_FUNCTION(column) OVER (
    PARTITION BY grouping_column
    ORDER BY ordering_column
)
```

* `OVER ()` defines the "window" — the set of rows the function considers.
* `PARTITION BY` optionally divides rows into groups (like `GROUP BY`, but without collapsing).
* `ORDER BY` defines the sequence within each partition.

### Ranking Students by Average Score

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       AVG(sg.Score) AS AvgScore,
       RANK() OVER (ORDER BY AVG(sg.Score) DESC) AS RankInClass
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName;
```

`RANK()` assigns a position based on the ordering. Tied scores receive the same rank, with a gap after (1, 2, 2, 4). `DENSE_RANK()` eliminates the gap (1, 2, 2, 3). `ROW_NUMBER()` assigns unique positions regardless of ties.

### Cumulative Score by Student

```sql
SELECT StudentID,
       DeliverableID,
       Score,
       SUM(Score) OVER (
           PARTITION BY StudentID
           ORDER BY DeliverableID
       ) AS CumulativeScore
FROM STUDENT_GRADE;
```

Each row shows the individual score *and* a running total of all scores up to that point. `PARTITION BY StudentID` resets the running total for each student.

### Moving Average of Scores

```sql
SELECT StudentID,
       DeliverableID,
       Score,
       ROUND(AVG(Score) OVER (
           PARTITION BY StudentID
           ORDER BY DeliverableID
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ), 2) AS MovingAvgScore
FROM STUDENT_GRADE;
```

This calculates a three-assignment moving average — smoothing out individual score fluctuations to reveal performance trends. The `ROWS BETWEEN` clause defines the window frame.

[[Figure: Side-by-side comparison of a GROUP BY query (collapsed into one row per student) and a window function query (preserving all rows with an added rank or running total column).]]

Window functions elevate SQL from a query language to a **full analytical engine**, enabling sophisticated insights directly inside the database.

---

# Part E: Reusable Artifacts for Reporting Pipelines

Writing a great query once is useful. Writing it so that it can be reused reliably across weeks, reports, and stakeholders is *powerful*. This section covers three tools for making queries reusable: views, CTEs, and subqueries. Together, they allow you to build **layered analytical systems** where complexity is managed, logic is reused, and results remain consistent across users and applications.

---

## 18. Views as Saved Reports

### Why Views Improve Consistency

A view is a named, saved query that behaves like a virtual table. Every time you query a view, the underlying SQL runs fresh against current data. Views are valuable because they:

* **Reduce errors** — the same logic is defined once and reused everywhere
* **Hide complexity** — end users see a simple table, not a multi-join query
* **Support governance** — views can restrict what data users see, acting as security layers

### Syntax

```sql
CREATE VIEW view_name AS
SELECT ...
FROM ...
WHERE ...;
```

Once created, views can be queried like tables:

```sql
SELECT * FROM view_name;
```

### Grading Database Example — HighPerformers View

```sql
CREATE VIEW HighPerformers AS
SELECT s.FirstName, s.LastName, sg.Score
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
WHERE sg.Score >= 90;
```

This view standardizes the definition of "high performance" across reports and dashboards.

### Grading Database Example — StudentDeliverables View

```sql
CREATE VIEW StudentDeliverables AS
SELECT s.StudentID,
       s.FirstName || ' ' || s.LastName AS StudentName,
       d.Type, d.DeliverableNumber,
       d.DueDate, d.Topic,
       sg.Score
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID;
```

Now anyone can query `SELECT * FROM StudentDeliverables WHERE StudentName = 'Alice Johnson';` without knowing anything about joins. This view combines three tables into a single reporting interface without duplicating logic.

### Grading Database Example — GradebookSummary View

```sql
CREATE VIEW GradebookSummary AS
SELECT s.StudentID,
       s.FirstName || ' ' || s.LastName AS StudentName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       COUNT(sg.GradeID) AS Submissions,
       CASE
           WHEN AVG(sg.Score) >= 90 THEN 'A'
           WHEN AVG(sg.Score) >= 80 THEN 'B'
           WHEN AVG(sg.Score) >= 70 THEN 'C'
           WHEN AVG(sg.Score) >= 60 THEN 'D'
           ELSE 'F'
       END AS LetterGrade
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName;
```

This view produces a student summary report — name, average, submission count, and letter grade — as a single queryable table. An instructor, student advisor, or dashboard can all use it.

### Grading Database Example — DeliverableAverages View

```sql
CREATE VIEW DeliverableAverages AS
SELECT d.DeliverableID, d.Type, d.DeliverableNumber, d.Topic,
       ROUND(AVG(sg.Score), 2) AS ClassAverage,
       COUNT(sg.GradeID) AS SubmissionCount,
       MIN(sg.Score) AS LowestScore,
       MAX(sg.Score) AS HighestScore
FROM DELIVERABLE d
JOIN STUDENT_GRADE sg ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.Type, d.DeliverableNumber, d.Topic;
```

### Grading Database Example — UpcomingDeliverables View

```sql
CREATE VIEW UpcomingDeliverables AS
SELECT DeliverableID, Type, DeliverableNumber, DueDate, Topic
FROM DELIVERABLE
WHERE DueDate > DATE('now');
```

This view always reflects the current date, making it suitable for dashboards and student-facing tools. No date filtering required when querying.

---

## 19. CTEs for Readable Multi-Step Logic

### Why CTEs Exist

Complex reports often require multiple calculation stages. You *could* nest subqueries three levels deep — but the result is nearly impossible to read, debug, or modify. CTEs (Common Table Expressions) provide a structured alternative: named stages that execute in order, each building on the previous one.

### Syntax

```sql
WITH stage_name AS (
    SELECT ...
),
next_stage AS (
    SELECT ...
    FROM stage_name
)
SELECT ...
FROM next_stage;
```

### Grading Database Example — Three-Stage Student Report

**Stage 1: Compute student averages.**
**Stage 2: Assign letter grades.**
**Stage 3: Flag at-risk students.**

```sql
WITH StudentAverages AS (
    SELECT sg.StudentID,
           ROUND(AVG(sg.Score), 2) AS AvgScore
    FROM STUDENT_GRADE sg
    GROUP BY sg.StudentID
),
GradedStudents AS (
    SELECT sa.StudentID, sa.AvgScore,
           CASE
               WHEN sa.AvgScore >= 90 THEN 'A'
               WHEN sa.AvgScore >= 80 THEN 'B'
               WHEN sa.AvgScore >= 70 THEN 'C'
               WHEN sa.AvgScore >= 60 THEN 'D'
               ELSE 'F'
           END AS LetterGrade
    FROM StudentAverages sa
),
FlaggedStudents AS (
    SELECT gs.*,
           CASE
               WHEN gs.AvgScore < 70 THEN 'At Risk'
               WHEN gs.AvgScore < 80 THEN 'Needs Attention'
               ELSE 'On Track'
           END AS RiskFlag
    FROM GradedStudents gs
)
SELECT s.FirstName || ' ' || s.LastName AS StudentName,
       fs.AvgScore,
       fs.LetterGrade,
       fs.RiskFlag
FROM FlaggedStudents fs
JOIN STUDENT s ON fs.StudentID = s.StudentID
ORDER BY fs.AvgScore ASC;
```

Each CTE is a named step that reads like a plan:

1. Calculate averages → `StudentAverages`
2. Assign letter grades → `GradedStudents`
3. Flag risk levels → `FlaggedStudents`

The final `SELECT` joins back to STUDENT for names and produces a clean, actionable report.

### When CTEs Are Preferable to Subqueries

[[Table: Comparison of CTEs and subqueries across readability, reuse, debugging, and performance.]]

| Factor             | CTE                                          | Subquery                 |
| ------------------ | -------------------------------------------- | ------------------------ |
| Readability        | Named stages, self-documenting               | Nested, harder to follow |
| Reuse within query | Can reference same CTE multiple times        | Must repeat the subquery |
| Debugging          | Comment out stages individually              | Difficult to isolate     |
| Performance        | Similar (most optimizers treat them equally) | Similar                  |

**Rule of thumb:** If a query has more than two logical steps, use a CTE. If it has one, a subquery is fine.

> **Compatibility note:** CTEs are supported in SQLite 3.8.3+, PostgreSQL, SQL Server, MySQL 8+, and Oracle. They are **not** supported in Microsoft Access.

---

## 20. Subqueries: Filtering, Derived Tables, and "Above Average" Logic

Subqueries are queries nested inside other queries. They are compact and powerful for single-step comparisons. Conceptually, subqueries support **relational thinking**: instead of asking one question at a time, you ask a question *about the results of another question*.

### Subquery in WHERE — Filtering by Computed Value

**Grading Database Example — Students scoring above the class average:**

```sql
SELECT s.FirstName, s.LastName, sg.Score
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
WHERE sg.Score > (
    SELECT AVG(Score) FROM STUDENT_GRADE
);
```

The inner query computes the overall average. The outer query returns only scores that exceed it.

### IN and EXISTS Patterns

**Grading Database Example — Students who submitted the midterm (using IN):**

```sql
SELECT FirstName, LastName
FROM STUDENT
WHERE StudentID IN (
    SELECT StudentID
    FROM STUDENT_GRADE
    WHERE DeliverableID = 4  -- Midterm
);
```

**Grading Database Example — Students who submitted at least one quiz (using EXISTS):**

```sql
SELECT s.FirstName, s.LastName
FROM STUDENT s
WHERE EXISTS (
    SELECT 1
    FROM STUDENT_GRADE sg
    JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
    WHERE sg.StudentID = s.StudentID
      AND d.Type = 'Quiz'
);
```

`EXISTS` is often faster than `IN` for large datasets because the database can stop searching as soon as it finds one match.

### Correlated vs. Non-Correlated Subqueries

* **Non-correlated subquery** runs once, independently of the outer query. The `AVG(Score)` example above is non-correlated — the average is the same regardless of which outer row is being evaluated.
* **Correlated subquery** references columns from the outer query and runs once per outer row. The `EXISTS` example above is correlated — it checks each student's grades individually.

**Performance intuition:** Non-correlated subqueries are generally fast. Correlated subqueries can be slow on large datasets because they run once per row. If performance is a concern, consider rewriting correlated subqueries as JOINs.

### Subquery in FROM — Derived Tables

**Grading Database Example — Average score per type, then filtered:**

```sql
SELECT Type, AvgScore
FROM (
    SELECT d.Type,
           ROUND(AVG(sg.Score), 2) AS AvgScore
    FROM DELIVERABLE d
    JOIN STUDENT_GRADE sg ON d.DeliverableID = sg.DeliverableID
    GROUP BY d.Type
) AS TypeAverages
WHERE AvgScore < 85;
```

The inner query creates a temporary "table" of type averages. The outer query filters it. This is equivalent to a CTE but written inline.

### Subquery in SELECT — Scalar Comparison

**Grading Database Example — Each student's score alongside the class average:**

```sql
SELECT s.FirstName, s.LastName,
       sg.Score,
       (SELECT ROUND(AVG(Score), 2) FROM STUDENT_GRADE) AS ClassAverage,
       sg.Score - (SELECT ROUND(AVG(Score), 2) FROM STUDENT_GRADE) AS DifferenceFromAvg
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
ORDER BY DifferenceFromAvg DESC;
```

Each row shows an individual score, the class average, and the gap between them. Positive values indicate above-average performance.

---

## 21. Combining Results with UNION

`UNION` combines the results of two or more `SELECT` statements into a single result set.

### UNION vs. UNION ALL

* `UNION` removes duplicate rows automatically.
* `UNION ALL` keeps all rows, including duplicates (faster when duplicates are acceptable).

Rules: each `SELECT` must return the same number of columns with compatible data types.

### Grading Database Example — Students with Any Engagement

```sql
SELECT StudentID FROM STUDENT_GRADE
UNION
SELECT StudentID FROM ATTENDANCE;
```

This returns a unique list of students who either submitted work or attended class.

### Grading Database Example — Labeling Engagement Sources

```sql
SELECT s.FirstName || ' ' || s.LastName AS StudentName, 'Grade' AS Source
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
UNION
SELECT s.FirstName || ' ' || s.LastName AS StudentName, 'Attendance' AS Source
FROM STUDENT s
JOIN ATTENDANCE a ON s.StudentID = a.StudentID;
```

### Grading Database Example — Measuring Engagement Intensity

```sql
SELECT StudentID, COUNT(*) AS EngagementCount
FROM (
    SELECT StudentID FROM STUDENT_GRADE
    UNION ALL
    SELECT StudentID FROM ATTENDANCE
)
GROUP BY StudentID;
```

`UNION ALL` is used here intentionally — a student who both attended class and submitted work should be counted for both. The outer query groups by student and counts total engagement events.

---

## 22. Updating and Deleting Data

Advanced SQL includes **responsible data modification**. In operational databases, careless updates can corrupt entire systems.

### UPDATE

```sql
UPDATE STUDENT
SET Email = 'alice.j@university.edu'
WHERE StudentID = 1;
```

> **Warning:** Always include a `WHERE` clause. An `UPDATE` without `WHERE` changes every row in the table. This is one of the most common and dangerous SQL mistakes.

### DELETE

```sql
DELETE FROM ATTENDANCE
WHERE AttendanceID = 2;
```

> **Warning:** Like `UPDATE`, a `DELETE` without `WHERE` removes all rows from the table. When referential integrity is enforced, deleting a student who still has grades will fail — the database blocks unsafe deletes when relationships exist. This is the safety net the relational model provides.

---

## Choosing the Right Abstraction: Views, CTEs, or Subqueries

These three tools serve overlapping but distinct purposes:

[[Table: Decision guide for choosing between subqueries, CTEs, and views.]]

| Tool               | Best For                                             | Scope        |
| ------------------ | ---------------------------------------------------- | ------------ |
| **Subquery** | Localized, one-step logic within a single query      | Single query |
| **CTE**      | Readable, multi-step transformations                 | Single query |
| **View**     | Shared, long-term reporting across queries and users | Persistent   |

* Use a **subquery** when the logic is short and used only once.
* Use a **CTE** when you need multiple named stages or want to reference the same intermediate result more than once.
* Use a **view** when the query should be reusable across sessions, users, and applications.

Together, these tools allow you to build **layered analytical systems** where complexity is managed, logic is reused, and results remain consistent.

---

# Part F: Advanced Mechanics That Make SQL Production-Ready

The queries you have written so far work correctly — they return the right answers. But "correct" is not enough for production systems. Queries also need to be **fast**, **safe**, and **self-enforcing**. This section covers the mechanisms that transform SQL from an analytical tool into operational infrastructure.

---

## 23. Indexes for Speed

### What Indexes Do

An index is a data structure that helps the database find rows faster. Without an index, the database must scan every row in a table to find matches — this is called a **full table scan**. With an index, the database can jump directly to the relevant rows, like using the index at the back of a textbook instead of reading every page.

### What Indexes Cost

Indexes are not free. They:

* **Use storage space** — every index is an additional data structure stored on disk.
* **Slow down writes** — every `INSERT`, `UPDATE`, or `DELETE` must also update the index.
* **Must be maintained** — too many indexes degrade write performance without proportional read improvements.

The trade-off: indexes speed up reads and slow down writes. For tables that are queried far more often than they are updated (like a gradebook), indexes are almost always worth it.

### Syntax

```sql
CREATE INDEX index_name
ON table_name (column1, column2, ...);
```

### Where Indexes Matter in the Grading Database

**Indexing foreign keys in STUDENT_GRADE:**

```sql
CREATE INDEX idx_sg_student
ON STUDENT_GRADE (StudentID);

CREATE INDEX idx_sg_deliverable
ON STUDENT_GRADE (DeliverableID);
```

These indexes dramatically speed up JOINs between `STUDENT_GRADE` and the `STUDENT` or `DELIVERABLE` tables. Since these joins are used in almost every grading report, the performance improvement is significant.

**Indexing DueDate for time-based queries:**

```sql
CREATE INDEX idx_del_duedate
ON DELIVERABLE (DueDate);
```

**Composite index for common query patterns:**

```sql
CREATE INDEX idx_sg_student_deliverable
ON STUDENT_GRADE (StudentID, DeliverableID);
```

A composite index on both foreign keys is especially effective for queries that filter or join on both columns simultaneously.

### Reading Query Plans (Conceptual)

Most database systems provide a way to see *how* a query is executed:

```sql
EXPLAIN QUERY PLAN
SELECT s.FirstName, sg.Score
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID;
```

The output shows whether the database is using an index or a full table scan. If you see "SCAN TABLE" for a large table, consider adding an index. If you see "USING INDEX," the index is working.

> **Note:** This is diagnostic information for optimization, not something you need to memorize. The concept is: you can look under the hood when performance matters.

---

## 24. Transactions for Safety

### Why Grading Updates Should Be Atomic

Imagine you are applying a late penalty to all students who submitted Homework 1 after the due date. You need to identify late submissions, reduce their scores, and confirm the changes are correct. What if the database crashes between updating half the scores and the other half? You would have an inconsistent state — some students penalized, others not.

A **transaction** solves this by grouping multiple operations into a single, atomic unit: either all changes succeed, or none do.

### Syntax

```sql
BEGIN TRANSACTION;

-- Multiple SQL statements here

COMMIT;   -- Apply all changes
-- OR --
ROLLBACK; -- Undo all changes
```

### Grading Database Example — Safe Bulk Grade Update

```sql
BEGIN TRANSACTION;

-- Apply 10% penalty to late Homework 1 submissions
UPDATE STUDENT_GRADE
SET Score = ROUND(Score * 0.9, 0)
WHERE DeliverableID = 3
  AND StudentID IN (
      SELECT StudentID
      FROM STUDENT_GRADE sg
      JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
      WHERE d.Type = 'Homework'
        AND d.DeliverableNumber = 1
  );

-- Verify the results before committing
SELECT s.FirstName, s.LastName, sg.Score
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
WHERE sg.DeliverableID = 3;

-- If correct:
COMMIT;
-- If something went wrong:
-- ROLLBACK;
```

### Grading Database Example — Grade Recalculation (Curving)

```sql
BEGIN TRANSACTION;

-- Curve all exam scores by adding 5 points (cap at 100)
UPDATE STUDENT_GRADE
SET Score = CASE
    WHEN Score + 5 > 100 THEN 100
    ELSE Score + 5
END
WHERE DeliverableID IN (
    SELECT DeliverableID FROM DELIVERABLE WHERE Type = 'Exam'
);

-- Verify no scores exceed 100
SELECT COUNT(*)
FROM STUDENT_GRADE
WHERE Score > 100;

-- Commit only if verification passes
COMMIT;
```

### Transaction Properties: ACID

[[Table: The four ACID properties of database transactions.]]

| Property              | Meaning                                                   |
| --------------------- | --------------------------------------------------------- |
| **Atomicity**   | All or nothing — partial changes never persist.          |
| **Consistency** | The database moves from one valid state to another.       |
| **Isolation**   | Concurrent transactions do not interfere with each other. |
| **Durability**  | Committed changes survive crashes and power failures.     |

---

## 25. Triggers for Automation

### What Triggers Do

A **trigger** is a stored procedure that runs automatically in response to a data change — an `INSERT`, `UPDATE`, or `DELETE` on a specified table. Triggers enforce business rules without relying on the application or user to remember them.

### Syntax (SQLite)

```sql
CREATE TRIGGER trigger_name
AFTER INSERT | UPDATE | DELETE ON table_name
BEGIN
    -- SQL statements
END;
```

### Syntax (PostgreSQL)

PostgreSQL triggers require a separate function:

```sql
CREATE OR REPLACE FUNCTION function_name()
RETURNS TRIGGER AS $$
BEGIN
    -- Logic here
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_name
AFTER INSERT ON table_name
FOR EACH ROW
EXECUTE FUNCTION function_name();
```

### Grading Database Example — Preventing Invalid Scores

```sql
CREATE TRIGGER validate_score
BEFORE INSERT ON STUDENT_GRADE
BEGIN
    SELECT CASE
        WHEN NEW.Score < 0 OR NEW.Score > 100 THEN
            RAISE(ABORT, 'Score must be between 0 and 100')
    END;
END;
```

**Test:**

```sql
-- This should succeed
INSERT INTO STUDENT_GRADE (GradeID, StudentID, DeliverableID, Score)
VALUES (31, 1, 1, 85);

-- This should fail with an error message
INSERT INTO STUDENT_GRADE (GradeID, StudentID, DeliverableID, Score)
VALUES (32, 1, 2, 150);
```

### Grading Database Example — Audit Log on Grade Changes

Create an audit table to track every grade modification:

```sql
CREATE TABLE GRADE_AUDIT (
    AuditID INTEGER PRIMARY KEY AUTOINCREMENT,
    GradeID INTEGER,
    StudentID INTEGER,
    DeliverableID INTEGER,
    OldScore INTEGER,
    NewScore INTEGER,
    ChangedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    ChangeType TEXT
);
```

**Trigger to log updates:**

```sql
CREATE TRIGGER log_grade_update
AFTER UPDATE ON STUDENT_GRADE
BEGIN
    INSERT INTO GRADE_AUDIT (GradeID, StudentID, DeliverableID, OldScore, NewScore, ChangeType)
    VALUES (OLD.GradeID, OLD.StudentID, OLD.DeliverableID, OLD.Score, NEW.Score, 'UPDATE');
END;
```

Now every grade change is recorded automatically. This is invaluable for resolving student disputes, auditing grading practices, and maintaining transparency in academic record-keeping.

### Caution: Triggers Are Powerful and Easy to Misuse

Triggers run invisibly. When someone inserts or updates a row, they may not know that a trigger is also executing. This creates risks:

* **Debugging difficulty** — unexpected behavior caused by triggers that are hard to find.
* **Performance impact** — complex triggers on frequently updated tables can slow the system.
* **Cascading triggers** — one trigger's action can fire another trigger, creating chains that are difficult to predict.

**Best practice:** Use triggers for critical business rules (score validation, audit logging) and avoid them for complex application logic. Keep triggers simple, documented, and few.

---

## 26. Data Quality and Governance in SQL

### Constraints as Governance

Constraints are not just technical guardrails — they are **governance policies encoded in the database**. Every constraint expresses a business rule:

[[Table: SQL constraints mapped to their business rules and grading database examples.]]

| Constraint  | Business Rule                                  | Grading Example                      |
| ----------- | ---------------------------------------------- | ------------------------------------ |
| PRIMARY KEY | Every record must be uniquely identifiable.    | Every student has a unique ID.       |
| FOREIGN KEY | Relationships must reference existing records. | Every grade links to a real student. |
| NOT NULL    | This information is required.                  | A grade must have a score.           |
| UNIQUE      | No duplicates allowed.                         | Each student has a unique email.     |
| CHECK       | Values must fall within a valid range.         | Scores must be between 0 and 100.    |

### Simple Audit Queries for Integrity

Even with constraints, it is good practice to run periodic integrity checks:

**Orphaned grades (grades without matching students):**

```sql
SELECT sg.*
FROM STUDENT_GRADE sg
LEFT JOIN STUDENT s ON sg.StudentID = s.StudentID
WHERE s.StudentID IS NULL;
```

**Students with no grades at all:**

```sql
SELECT s.FirstName, s.LastName
FROM STUDENT s
LEFT JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
WHERE sg.GradeID IS NULL;
```

**Duplicate grades (same student, same deliverable):**

```sql
SELECT StudentID, DeliverableID, COUNT(*) AS Duplicates
FROM STUDENT_GRADE
GROUP BY StudentID, DeliverableID
HAVING COUNT(*) > 1;
```

If the `UNIQUE` constraint on `(StudentID, DeliverableID)` is in place, this should always return zero rows. Running it periodically confirms that the constraint is doing its job.

### Designing for Reproducibility and Transparency

In grading contexts — and in any business where decisions affect people — data systems must be:

* **Reproducible**: Any report can be regenerated from the same data and produce the same results.
* **Transparent**: The logic behind calculations is visible (in queries, views, or documented procedures).
* **Auditable**: Changes are tracked and can be reviewed after the fact.

SQL supports all three: views make logic reusable and inspectable, transactions ensure consistency, triggers create audit trails, and constraints prevent invalid states. Together, these tools create a data system you can trust — and that others can verify.

---

# Conclusion: SQL as the Bridge From Data to Decisions

Throughout this chapter, you moved from diagnosing problems in flat data to building a production-ready, normalized database with reusable reporting pipelines and automated safeguards. That progression — from messy to structured, from ad hoc to engineered — is the arc of every real-world data project.

### What You Built

* A **normalized schema** where each entity lives in its own table, connected through keys and constraints.
* **Reporting queries** that answer real questions: Who is struggling? Which assignments are hardest? Are grades distributed fairly?
* **Reusable artifacts** — views and CTEs — that produce consistent results without rewriting logic.
* **Safety mechanisms** — transactions, triggers, and constraints — that protect data from corruption and error.
* **Analytical tools** — window functions, conditional aggregation, and weighted calculations — that produce managerial insights directly from the database.

### SQL Outputs as Managerial Artifacts

The queries in this chapter are not academic exercises. They produce the same kinds of outputs that drive business decisions:

* **Dashboards**: Views like `GradebookSummary` and `DeliverableAverages` are the data sources behind any dashboard.
* **KPIs**: Weighted averages, attendance rates, and pass/fail ratios are Key Performance Indicators.
* **Interventions**: At-risk student reports trigger real actions — tutoring referrals, advising meetings, deadline extensions.

### SQL as the Unifying Language of Data Systems

One of SQL's most powerful properties is its **portability**. The same logical query runs in SQLite, PostgreSQL, SQL Server, and cloud platforms like Supabase. While syntax details may vary, the **relational thinking** remains constant. This makes SQL a durable skill that transfers across tools, jobs, and industries. Whether data lives in a local file, an enterprise warehouse, or a cloud-hosted service, SQL provides a shared language for asking questions, enforcing rules, and generating insight.

### Why Strong SQL Makes Later Work Easier

Every analytics and business intelligence tool — Tableau, Power BI, Looker, Python/Pandas — ultimately relies on SQL to extract data. A well-normalized schema with clear views makes downstream analytics faster, more reliable, and more trustworthy. Bad data structure does not get better when you layer a visualization tool on top.

### What Comes Next

This chapter focused on the most essential advanced SQL skills. Several additional topics extend this foundation:

* **Permissions and security**: `GRANT`, `REVOKE`, role-based access control — critical in multi-user and enterprise systems.
* **Performance tuning**: Deep query optimization, execution plans, partitioning, and query hints — for databases with millions of rows.
* **Advanced window functions**: `LAG()`, `LEAD()`, `NTILE()`, and more sophisticated analytical patterns.

These topics build on the same relational thinking and SQL fluency you have developed in this chapter. The grading database will continue to serve as your testing ground — because the best way to learn advanced SQL is to solve increasingly interesting problems with an increasingly solid data foundation.

---

## Summary

[[Table: Chapter summary showing each part, its topic, and the key skills covered.]]

| Part        | Topic                     | Key Skills                                                                                                   |
| ----------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **A** | Normalization through SQL | Diagnosing redundancy, extracting entities, creating tables from queries, migrating data, adding constraints |
| **B** | SQL Fundamentals Review   | SELECT, WHERE, ORDER BY, aliases, data cleaning patterns                                                     |
| **C** | Relational Querying       | INNER JOIN, LEFT JOIN, multi-table joins, intersection tables, composite uniqueness                          |
| **D** | Analytics SQL             | GROUP BY, HAVING, CASE, expressions, time-aware queries, weighted grades, window functions                   |
| **E** | Reusable Artifacts        | Views, CTEs, subqueries (WHERE, FROM, SELECT, IN, EXISTS), UNION, UPDATE/DELETE                              |
| **F** | Advanced Mechanics        | Indexes, transactions (ACID), triggers, audit logging, data quality governance                               |

---

## Key Terms

[[Table: Glossary of key terms introduced in this chapter.]]

| Term                                    | Definition                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Anomaly**                       | A data problem caused by poor schema design: update, insertion, or deletion anomaly.                   |
| **Audit trail**                   | A record of all changes made to data, typically maintained by triggers.                                |
| **CTE (Common Table Expression)** | A named, temporary result set defined with `WITH`, used for multi-stage queries.                     |
| **Composite key**                 | A primary or unique key made of two or more columns.                                                   |
| **Correlated subquery**           | A subquery that references the outer query and re-executes for each outer row.                         |
| **Foreign key**                   | A column that references the primary key of another table, enforcing referential integrity.            |
| **Full table scan**               | A query execution method where the database reads every row — avoided by indexing.                    |
| **Index**                         | A data structure that speeds up row lookups at the cost of additional storage and write overhead.      |
| **Intersection table**            | A table that resolves a many-to-many relationship (e.g., STUDENT_GRADE). Also called a junction table. |
| **Normalization**                 | The process of organizing data to eliminate redundancy and dependency-related anomalies.               |
| **Query plan**                    | The database engine's execution strategy for a query, viewable with `EXPLAIN`.                       |
| **Referential integrity**         | The guarantee that foreign key values always point to existing records.                                |
| **Surrogate key**                 | An auto-generated identifier (integer or UUID) with no business meaning.                               |
| **Transaction**                   | A group of SQL operations that execute atomically — all or none.                                      |
| **Trigger**                       | A stored procedure that executes automatically in response to data changes.                            |
| **View**                          | A saved query that behaves like a virtual table.                                                       |
| **Weighted average**              | An average where different items contribute proportionally to their importance (weight).               |
| **Window function**               | An analytical function that computes values across a set of rows without collapsing them into groups.  |
