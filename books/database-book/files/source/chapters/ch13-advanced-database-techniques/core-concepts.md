# Chapter 13: Advanced Database Techniques

Earlier chapters focused on making databases correct: designing tables, defining keys, normalizing data, writing SQL, administering systems, and using data for business intelligence. But in real organizations, correctness is only the beginning — a database also has to survive real use. This chapter introduces the advanced techniques that turn a working database into a more reliable system: indexes, transactions, constraints, triggers, window functions, security, and platform differences, applied to hardening the Grading Database.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Core Concepts

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220">
</p>

## 13.1 From Correct Queries to Reliable Systems

A query can be logically correct and still be operationally weak.

For example, this query may correctly retrieve all grades for one student:

```sql
SELECT *
FROM STUDENT_GRADE
WHERE StudentID = 101;
```

On a table with twenty rows, it runs instantly. On a table with ten million rows and no index, it may become slow enough to frustrate users or time out entirely. The logic is correct, but the system is not ready for scale.

The same problem appears in other forms:

- A grade update works unless the second step fails.
- A score is accepted even if it is 175.
- An instructor changes a grade, but no audit trail records the old value.
- A student can see records that should be private.
- A dashboard is visually impressive but based on inconsistent rules.

These are not beginner syntax problems. They are **system reliability problems**.

### 13.1.1 What Advanced Techniques Protect

Advanced database techniques protect four core qualities.

| Quality | Meaning | Grading Database Example |
|---|---|---|
| **Performance** | Queries remain usable as data volume grows | Student grade reports load quickly even with years of records |
| **Integrity** | Data remains valid and internally consistent | Scores cannot exceed the allowed range |
| **Auditability** | Important changes can be traced | Grade updates record old score, new score, user, and timestamp |
| **Security** | Users can access only what they are allowed to access | Students view their own grades; instructors update assigned course records |

Together, these qualities turn a database from a collection of tables into a trustworthy information system.

### 13.1.2 The Idea of Database Hardening

**Database hardening** means strengthening a database so that it can operate safely under realistic conditions. Hardening does not usually change the basic business purpose of the database. Instead, it reinforces the system around that purpose.

In the Grading Database, hardening means:

- making common student and deliverable queries faster;
- preventing invalid grades and duplicate submissions;
- protecting grade updates with transactions;
- recording grade changes automatically;
- separating instructor, student, and administrator access;
- preparing analytics queries that are reusable and transparent.

A hardened database does not depend entirely on users remembering rules. It embeds important rules into the database itself.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: From queries to systems</strong></p>
  <p>Basic SQL asks, "Does the query work?" Advanced database work asks, "Will the system remain fast, safe, auditable, and trustworthy when real users depend on it?"</p>
</div>

## 13.2 Indexes: Making Queries Fast at Scale

Indexes are one of the most important tools for database performance. They do not change the data stored in a table. They change how efficiently the database can find that data.

### 13.2.1 Why Performance Problems Appear Late

Performance problems often stay invisible during development because early datasets are small. A query that scans 100 rows feels instant. The same query scanning 5 million rows may become painful.

Without an index, a database often performs a **full table scan**. That means it examines every row to find the rows that match the condition.

```sql
SELECT *
FROM STUDENT_GRADE
WHERE StudentID = 101;
```

If `STUDENT_GRADE` has no index on `StudentID`, the database may inspect every grade record before returning the rows for Student 101.

### 13.2.2 What an Index Does

An **index** is a lookup structure that helps the DBMS locate rows quickly. A useful analogy is the index at the back of a textbook. Without the index, you search page by page. With the index, you jump directly to the relevant pages.

A database index works similarly. It stores column values in an optimized structure and maps them to rows in the table.

Common index targets include:

- primary keys;
- foreign keys used in joins;
- columns used frequently in `WHERE` filters;
- columns used in `ORDER BY`;
- dates used in time-window queries;
- business identifiers such as email addresses.

### 13.2.3 Creating Indexes

The basic syntax is:

```sql
CREATE INDEX index_name
ON table_name (column_name);
```

In the Grading Database, common indexes include:

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE (StudentID);

CREATE INDEX idx_student_grade_deliverable
ON STUDENT_GRADE (DeliverableID);

CREATE INDEX idx_deliverable_due_date
ON DELIVERABLE (DueDate);
```

These indexes support frequent questions:

- Which grades belong to this student?
- What scores were recorded for this deliverable?
- Which deliverables are due before a given date?

### 13.2.4 Composite Indexes

A **composite index** uses more than one column. It is useful when queries commonly filter or join using those columns together.

```sql
CREATE INDEX idx_grade_student_deliverable
ON STUDENT_GRADE (StudentID, DeliverableID);
```

This index supports queries such as:

```sql
SELECT Score
FROM STUDENT_GRADE
WHERE StudentID = 101
  AND DeliverableID = 5;
```

The order of columns matters. An index on `(StudentID, DeliverableID)` is most useful when the query filters by `StudentID`, or by both `StudentID` and `DeliverableID`. It may be less useful for a query that filters only by `DeliverableID`.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### 13.2.5 Unique Indexes

A **unique index** improves lookup speed and enforces uniqueness.

```sql
CREATE UNIQUE INDEX idx_student_email
ON STUDENT (Email);
```

This prevents two students from having the same email address.

A composite unique index can enforce a business rule:

```sql
CREATE UNIQUE INDEX idx_one_grade_per_student_deliverable
ON STUDENT_GRADE (StudentID, DeliverableID);
```

This rule says that one student can have only one score for one deliverable. If the course policy allows multiple attempts, the design should include an `AttemptNumber` column:

```sql
CREATE UNIQUE INDEX idx_one_grade_per_attempt
ON STUDENT_GRADE (StudentID, DeliverableID, AttemptNumber);
```

### 13.2.6 The Cost of Indexes

Indexes improve read performance, but they are not free.

Each index creates trade-offs:

| Benefit | Cost |
|---|---|
| Faster filtering | More storage |
| Faster joins | Slower inserts |
| Faster sorting | Slower updates and deletes |
| Enforced uniqueness | More maintenance overhead |

Every time a row is inserted, updated, or deleted, the DBMS may also need to update indexes. For this reason, indexing every column is usually a mistake.

### 13.2.7 Using Query Plans

A **query plan** shows how the DBMS intends to execute a query. It helps you see whether indexes are being used.

In SQLite:

```sql
EXPLAIN QUERY PLAN
SELECT *
FROM STUDENT_GRADE
WHERE StudentID = 101;
```

In PostgreSQL:

```sql
EXPLAIN ANALYZE
SELECT *
FROM STUDENT_GRADE
WHERE StudentID = 101;
```

If the plan says the database is scanning the entire table, an index may be needed. If the plan shows an index search, the database is using a more efficient path.

<div class="callout tip">
  <p><strong>💡 Tip: Trust the query plan</strong></p>
  <p>Do not guess about performance. Use query plans to see what the database is actually doing. Databases are many things, but they are not impressed by confidence.</p>
</div>

## 13.3 Transactions: Protecting Multi-Step Operations

Many database operations involve more than one step. A transaction groups those steps into a single unit of work.

<div class="callout discipline-definition">
  <p><strong>📘 Definition: Transaction</strong></p>
  <p>A <strong>transaction</strong> is a set of database operations that must succeed or fail together. It is a logical unit of work controlled by <code>BEGIN</code>, <code>COMMIT</code>, and <code>ROLLBACK</code>.</p>
</div>

### 13.3.1 How Transactions Work

The core commands are:

```sql
BEGIN;
COMMIT;
ROLLBACK;
```

- `BEGIN` starts the transaction.
- `COMMIT` saves the changes permanently.
- `ROLLBACK` cancels the changes and restores the previous state.

The basic principle is simple:

> Either every operation inside the transaction succeeds, or none of them do.

### 13.3.2 Why Transactions Matter in Grading

Consider a grading workflow:

1. Insert a new score.
2. Update the student's summary average.
3. Add a row to a grade-change audit table.

If step 1 succeeds but step 3 fails, the database is left in a partial state. Transactions prevent that.

```sql
BEGIN;

INSERT INTO STUDENT_GRADE (StudentID, DeliverableID, Score)
VALUES (101, 5, 88);

INSERT INTO GRADE_AUDIT (GradeID, OldScore, NewScore, ChangedAt)
VALUES (NULL, NULL, 88, CURRENT_TIMESTAMP);

COMMIT;
```

If a problem occurs before `COMMIT`, the operation can be cancelled:

```sql
ROLLBACK;
```

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### 13.3.3 A Safer Grade Update Pattern

Updating grades is sensitive because grade changes affect student records, reports, and trust. A safer pattern records the old value before updating.

```sql
BEGIN;

INSERT INTO GRADE_AUDIT (GradeID, OldScore, NewScore, ChangedAt)
SELECT GradeID, Score, 92, CURRENT_TIMESTAMP
FROM STUDENT_GRADE
WHERE GradeID = 10;

UPDATE STUDENT_GRADE
SET Score = 92
WHERE GradeID = 10;

COMMIT;
```

This transaction makes the grade update and the audit record part of the same operation.

### 13.3.4 ACID in Practice

As introduced in Chapter 11, transactions are governed by ACID properties. Here they are applied to the grading context:

| ACID Property | Practical Meaning | Grading Example |
|---|---|---|
| **Atomicity** | All steps succeed or all fail | Grade update and audit record happen together |
| **Consistency** | Rules remain valid before and after | No invalid score is stored |
| **Isolation** | Concurrent work does not interfere | Two instructors do not overwrite each other unexpectedly |
| **Durability** | Committed changes persist | Saved grades survive system failure |

Transactions are one of the main reasons databases are more reliable than spreadsheets. A spreadsheet has cells. A database has rules about what happens when things go wrong.

## 13.4 Constraints Beyond Primary Keys

Primary keys and foreign keys protect identity and relationships. But many business rules require additional constraints.

### 13.4.1 Why Keys Are Not Enough

A table can have a valid primary key and still contain bad data.

Examples:

- `Score = 145`
- `Email = 'not-an-email'`
- `Attended = 'maybe'`
- two rows for the same student and deliverable
- missing required values in important fields

These values may fit the column type, but they violate business meaning.

### 13.4.2 NOT NULL Constraints

A `NOT NULL` constraint requires a value.

```sql
CREATE TABLE STUDENT (
    StudentID INTEGER PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT NOT NULL
);
```

This ensures that essential student identity fields cannot be omitted.

### 13.4.3 CHECK Constraints

A `CHECK` constraint restricts allowed values.

```sql
CREATE TABLE STUDENT_GRADE (
    GradeID INTEGER PRIMARY KEY,
    StudentID INTEGER NOT NULL,
    DeliverableID INTEGER NOT NULL,
    Score INTEGER CHECK (Score BETWEEN 0 AND 100),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (DeliverableID) REFERENCES DELIVERABLE(DeliverableID)
);
```

This prevents scores below 0 or above 100.

Attendance can also be constrained:

```sql
CREATE TABLE ATTENDANCE (
    AttendanceID INTEGER PRIMARY KEY,
    ClassNum INTEGER NOT NULL,
    StudentID INTEGER NOT NULL,
    Attended INTEGER CHECK (Attended IN (0, 1))
);
```

### 13.4.4 UNIQUE Constraints

A `UNIQUE` constraint prevents duplicate values.

```sql
CREATE TABLE STUDENT (
    StudentID INTEGER PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT UNIQUE
);
```

A composite `UNIQUE` constraint can enforce business rules:

```sql
CREATE TABLE STUDENT_GRADE (
    GradeID INTEGER PRIMARY KEY,
    StudentID INTEGER NOT NULL,
    DeliverableID INTEGER NOT NULL,
    Score INTEGER CHECK (Score BETWEEN 0 AND 100),
    UNIQUE (StudentID, DeliverableID),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (DeliverableID) REFERENCES DELIVERABLE(DeliverableID)
);
```

This prevents duplicate grade rows for the same student and deliverable.

### 13.4.5 DEFAULT Constraints

A `DEFAULT` constraint supplies a value when none is provided.

```sql
CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

or:

```sql
Attended INTEGER DEFAULT 0
```

Defaults reduce ambiguity. Instead of leaving a value missing, the database inserts a known default.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### 13.4.6 Constraint Design Checklist

Before adding a constraint, ask:

1. Is this rule always true?
2. Should violations be blocked immediately?
3. Is the rule stable over time?
4. Should the rule live in the database rather than in application code?
5. Will historical data violate the rule?

If the answer to the first four questions is yes, the rule probably belongs as a database constraint.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Constraints are enforceable rules</strong></p>
  <p>Constraints are business rules made enforceable. They move data quality from "please be careful" to "the system will not allow this."</p>
</div>

## 13.5 Triggers: Automated Database Responses

A trigger is database logic that runs automatically when data changes.

### 13.5.1 What Triggers Are

A **trigger** executes in response to an event such as `INSERT`, `UPDATE`, or `DELETE`.

Triggers answer three questions:

| Question | Possible Answers |
|---|---|
| When should it run? | `BEFORE`, `AFTER` |
| What event activates it? | `INSERT`, `UPDATE`, `DELETE` |
| Which table does it watch? | Example: `STUDENT_GRADE` |

Triggers are useful when the database must react automatically regardless of which user, application, or tool makes the change.

### 13.5.2 Trigger Use Cases

Good uses include:

- audit logging;
- preventing invalid changes;
- maintaining timestamps;
- enforcing rules that are too complex for simple constraints;
- synchronizing small pieces of metadata.

Riskier uses include:

- hidden business workflows;
- large cascading updates;
- complex calculations that are hard to debug;
- behavior that surprises developers.

Triggers should be small, documented, and predictable.

### 13.5.3 Audit Logging Example

Grade changes should often be auditable.

First, create an audit table:

```sql
CREATE TABLE GRADE_AUDIT (
    AuditID INTEGER PRIMARY KEY,
    GradeID INTEGER,
    OldScore INTEGER,
    NewScore INTEGER,
    ChangedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

In SQLite:

```sql
CREATE TRIGGER trg_log_grade_update
AFTER UPDATE ON STUDENT_GRADE
FOR EACH ROW
BEGIN
    INSERT INTO GRADE_AUDIT (GradeID, OldScore, NewScore)
    VALUES (OLD.GradeID, OLD.Score, NEW.Score);
END;
```

Every update to `STUDENT_GRADE` now produces an audit record automatically.

### 13.5.4 Preventing Invalid Scores with a Trigger

A `CHECK` constraint is usually better for simple rules. But triggers can produce custom behavior.

SQLite example:

```sql
CREATE TRIGGER trg_prevent_invalid_score
BEFORE INSERT ON STUDENT_GRADE
FOR EACH ROW
WHEN NEW.Score < 0 OR NEW.Score > 100
BEGIN
    SELECT RAISE(ABORT, 'Score must be between 0 and 100');
END;
```

This stops the insert before bad data enters the table.

### 13.5.5 PostgreSQL Trigger Pattern

PostgreSQL separates trigger logic into a function and a trigger.

```sql
CREATE TABLE GradeAudit (
    AuditID SERIAL PRIMARY KEY,
    GradeID INTEGER,
    OldScore INTEGER,
    NewScore INTEGER,
    ChangedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE OR REPLACE FUNCTION log_grade_update()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO GradeAudit (GradeID, OldScore, NewScore)
    VALUES (OLD.GradeID, OLD.Score, NEW.Score);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```sql
CREATE TRIGGER trg_log_grade_update
AFTER UPDATE ON STUDENT_GRADE
FOR EACH ROW
EXECUTE FUNCTION log_grade_update();
```

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### 13.5.6 Trigger Caution

Triggers are powerful because they are automatic. That is also what makes them dangerous.

A user may run:

```sql
UPDATE STUDENT_GRADE
SET Score = 90
WHERE GradeID = 10;
```

and not realize that three other actions are happening behind the scenes.

<div class="callout warning">
  <p><strong>⚠️ Warning: Hidden logic is still logic</strong></p>
  <p>Document triggers clearly, name them consistently, and avoid using them for rules that belong more naturally in queries, constraints, or application code.</p>
</div>

## 13.6 Window Functions: A Note on Scope

Window functions are powerful analytical tools that let you compute rankings, running totals, moving averages, and comparative metrics while preserving row-level detail. They are especially useful in dashboards and early-warning systems because they combine individual records with comparison context — a student's score can appear beside the class average, or a deliverable's pass rate can be tracked over time.

Chapters 9 and 10 cover window functions in detail, including the full syntax and practical examples using `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `NTILE()`, `PARTITION BY`, `ORDER BY`, and frame clauses (`ROWS BETWEEN`). If you need to write a ranking query, compute a running average, or understand the difference between `RANK()` and `DENSE_RANK()`, those chapters provide the complete treatment.

This chapter uses window functions only as part of the hardening story — for example, a progress-tracking view that adds a running average beside each student's individual grades (see Section 13.7.6 for a dashboard-ready view example). The key point here is not how window functions work, but that they are one more tool for turning raw data into actionable information without losing detail.

<div class="callout info">
  <p><strong>ℹ️ Info: Window functions — where to learn more</strong></p>
  <p>For a full treatment of window function syntax, rankings, frame clauses, and step-by-step examples, see Chapters 9 and 10. This chapter applies them as part of the hardening toolkit, not as a re-teaching.</p>
</div>

## 13.7 Advanced Analytics Patterns

SQL can produce many BI-ready metrics without exporting data to spreadsheets or visualization tools. The key is to write transparent, reusable analytical logic.

### 13.7.1 Conditional Aggregation

**Conditional aggregation** uses `CASE` inside aggregate functions.

```sql
SELECT
    COUNT(*) AS TotalGrades,
    SUM(CASE WHEN Score >= 60 THEN 1 ELSE 0 END) AS PassingGrades,
    SUM(CASE WHEN Score < 60 THEN 1 ELSE 0 END) AS FailingGrades
FROM STUDENT_GRADE;
```

This produces multiple metrics in one query.

### 13.7.2 Pass Rate by Deliverable

```sql
SELECT
    d.Type,
    d.DeliverableNumber,
    COUNT(*) AS TotalSubmissions,
    SUM(CASE WHEN sg.Score >= 60 THEN 1 ELSE 0 END) AS PassingSubmissions,
    ROUND(
        100.0 * SUM(CASE WHEN sg.Score >= 60 THEN 1 ELSE 0 END) / COUNT(*),
        2
    ) AS PassRatePercent
FROM DELIVERABLE AS d
JOIN STUDENT_GRADE AS sg
    ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.Type, d.DeliverableNumber
ORDER BY PassRatePercent ASC;
```

This identifies deliverables where students struggled most.

### 13.7.3 Attendance Rate by Student

```sql
SELECT
    StudentID,
    COUNT(*) AS ClassSessions,
    SUM(CASE WHEN Attended = 1 THEN 1 ELSE 0 END) AS ClassesAttended,
    ROUND(
        100.0 * SUM(CASE WHEN Attended = 1 THEN 1 ELSE 0 END) / COUNT(*),
        2
    ) AS AttendanceRatePercent
FROM ATTENDANCE
GROUP BY StudentID;
```

Percentages are easier to interpret than raw counts.

### 13.7.4 Normalized Scores

Scores from different deliverables may have different point values. Normalization converts them to a common scale.

```sql
SELECT
    sg.StudentID,
    d.Type,
    d.DeliverableNumber,
    sg.Score,
    a.PointsPerType,
    ROUND(100.0 * sg.Score / a.PointsPerType, 2) AS ScorePercent
FROM STUDENT_GRADE AS sg
JOIN DELIVERABLE AS d
    ON sg.DeliverableID = d.DeliverableID
JOIN ASSIGNMENT_TYPE AS a
    ON d.AssignmentType = a.AssignmentType;
```

This makes quiz, exam, and project scores more comparable.

### 13.7.5 Weighted Grade Calculation

A weighted grade calculation usually works best in stages. First, calculate each student's average within each assignment type. Then multiply each category average by its weight.

```sql
WITH CategoryAverages AS (
    SELECT
        sg.StudentID,
        d.AssignmentType,
        AVG(sg.Score) AS CategoryAverage
    FROM STUDENT_GRADE AS sg
    JOIN DELIVERABLE AS d
        ON sg.DeliverableID = d.DeliverableID
    GROUP BY sg.StudentID, d.AssignmentType
),
WeightedScores AS (
    SELECT
        ca.StudentID,
        ca.AssignmentType,
        ca.CategoryAverage,
        at.Weight,
        ca.CategoryAverage * at.Weight AS WeightedContribution
    FROM CategoryAverages AS ca
    JOIN ASSIGNMENT_TYPE AS at
        ON ca.AssignmentType = at.AssignmentType
)
SELECT
    StudentID,
    ROUND(SUM(WeightedContribution), 2) AS FinalWeightedGrade
FROM WeightedScores
GROUP BY StudentID;
```

This pattern is easier to read and debug than a single dense query.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### 13.7.6 Dashboard-Ready Views

A view can store the logic for a metric and make it reusable.

```sql
CREATE VIEW StudentRiskSummary AS
WITH StudentAverages AS (
    SELECT
        StudentID,
        AVG(Score) AS AvgScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
)
SELECT
    s.StudentID,
    s.FirstName,
    s.LastName,
    ROUND(sa.AvgScore, 2) AS AvgScore,
    CASE
        WHEN sa.AvgScore < 60 THEN 'High Risk'
        WHEN sa.AvgScore < 75 THEN 'Needs Attention'
        ELSE 'On Track'
    END AS RiskStatus
FROM STUDENT AS s
JOIN StudentAverages AS sa
    ON s.StudentID = sa.StudentID;
```

Now dashboards can query:

```sql
SELECT *
FROM StudentRiskSummary
WHERE RiskStatus <> 'On Track';
```

The dashboard consumes a trusted metric instead of recreating the calculation each time.

<div class="callout business-insight">
  <p><strong>💼 Business Insight: SQL as a single source of truth</strong></p>
  <p>When metrics are defined once in SQL views instead of being recalculated separately by different tools, reports become consistent. Every dashboard, spreadsheet, and decision memo works from the same logic.</p>
</div>

## 13.8 Security and Permissions

Security determines who can see or change data. In real systems, this is not optional. Grades, attendance, and student information are sensitive.

### 13.8.1 Authentication vs. Authorization

**Authentication** asks: Who are you?

**Authorization** asks: What are you allowed to do?

A student may be authenticated into a system but not authorized to view another student's grades or update any grades.

### 13.8.2 Role-Based Access Control

As introduced in Chapter 11, role-based access control assigns permissions to roles rather than individuals.

| Role | Typical Permissions |
|---|---|
| Student | Read own grades and attendance |
| Instructor | Read students in assigned courses; insert/update grades |
| Teaching Assistant | Read student work; insert limited grades if authorized |
| Department Administrator | Read aggregate reports; limited access to individual records |
| DBA/System Administrator | Manage structure, backups, roles, and permissions |

This supports the **principle of least privilege**: users receive only the access necessary for their responsibilities.

### 13.8.3 SQL Permission Examples

PostgreSQL-style examples:

```sql
CREATE ROLE instructor_role;
CREATE ROLE student_role;

GRANT SELECT, INSERT, UPDATE
ON STUDENT_GRADE
TO instructor_role;

GRANT SELECT
ON STUDENT_GRADE
TO student_role;
```

Access should be granted carefully. A student role should not simply receive `SELECT` on the entire `STUDENT_GRADE` table if that exposes all students. More advanced systems use row-level policies to restrict which rows a user can see.

### 13.8.4 Row-Level Security Concept

In Supabase/PostgreSQL, row-level security can restrict records by user.

Conceptual example:

```sql
ALTER TABLE STUDENT_GRADE ENABLE ROW LEVEL SECURITY;

CREATE POLICY student_can_view_own_grades
ON STUDENT_GRADE
FOR SELECT
USING (StudentID = current_setting('app.current_student_id')::integer);
```

The exact implementation depends on the application's authentication model, but the principle is clear: access control can operate at the row level, not only at the table level.

### 13.8.5 Auditing Security-Sensitive Changes

Security is not only about preventing bad actions. It is also about recording important actions.

A secure grading system should record:

- who changed a grade;
- when the change occurred;
- what the old value was;
- what the new value is;
- why the change was made, if required by policy.

This can be supported by triggers, audit tables, and controlled update procedures.

<div class="callout important">
  <p><strong>❗ Important: Traceability is security</strong></p>
  <p>If a database stores sensitive information but cannot explain who changed what, when, and why, it is not fully trustworthy.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 13.9 Advanced Techniques Across Platforms

The concepts in this chapter are portable, but the implementation differs by DBMS.

### 13.9.1 Microsoft Access

Access is visual, local, and workflow-oriented. It is useful for learning and for small departmental systems.

| Technique | Access Implementation |
|---|---|
| Indexes | Field properties: `Indexed = Yes`, or indexes window |
| Constraints | Validation rules, required fields, unique indexes |
| Transactions | VBA or application-level behavior |
| Triggers | Data macros |
| Permissions | File permissions, split database, limited role controls |
| Query plans | Limited compared with server DBMSs |
| Analytics | Queries, reports, forms, charts |

Access is strongest when the database is also an application interface. Forms, reports, and macros help guide user behavior. Its automation mechanism — macros — is covered in detail in Section 13.10.

### 13.9.2 SQLite

SQLite is lightweight, file-based, and explicit. It supports many advanced SQL features but has limited multi-user administration.

| Technique | SQLite Implementation |
|---|---|
| Indexes | `CREATE INDEX` |
| Constraints | `CHECK`, `UNIQUE`, `NOT NULL`, `FOREIGN KEY` |
| Transactions | `BEGIN`, `COMMIT`, `ROLLBACK` |
| Triggers | `CREATE TRIGGER` |
| Permissions | File-level or application-level |
| Query plans | `EXPLAIN QUERY PLAN` |
| Window functions | Supported in modern SQLite versions |

Important SQLite reminder:

```sql
PRAGMA foreign_keys = ON;
```

SQLite may not enforce foreign keys unless this setting is enabled.

### 13.9.3 Supabase/PostgreSQL

PostgreSQL is a full server-based DBMS. Supabase adds a cloud-hosted interface, authentication tools, APIs, and dashboards.

| Technique | PostgreSQL/Supabase Implementation |
|---|---|
| Indexes | B-tree, composite, partial, expression indexes |
| Constraints | Rich constraint support |
| Transactions | Full ACID transaction control |
| Triggers | Trigger functions in PL/pgSQL |
| Permissions | Roles, grants, schemas |
| Row-level security | Built-in and commonly used in Supabase |
| Query plans | `EXPLAIN`, `EXPLAIN ANALYZE` |
| Window functions | Full support |

PostgreSQL is the best match for production systems that need concurrency, security, governance, and scalability.

### 13.9.4 Platform Choice as a Business Decision

The right DBMS depends on the use case.

| Scenario | Recommended Direction |
|---|---|
| Learning database concepts | Access, SQLite |
| Single-user local analysis | SQLite |
| Small departmental app | Access or PostgreSQL |
| Cloud application | Supabase/PostgreSQL |
| Multi-user secure production system | PostgreSQL, SQL Server, Oracle, or similar server DBMS |
| Dashboard backend | PostgreSQL/Supabase or data warehouse platform |

Tool choice should follow requirements, not habit.

## 13.10 Macros in Microsoft Access

Microsoft Access provides a distinctive mechanism for automation called **macros**. While most of this chapter focuses on database-level controls such as indexes, transactions, constraints, and triggers, Access macros operate at the **application interface level** — they connect database rules to the forms, reports, and workflows that users interact with every day.

### 13.10.1 What Access Macros Are

A macro in Access is an event-driven, declarative automation tool. Unlike SQL or VBA code, macros are built by selecting actions from a catalog and arranging them in sequence. They do not require programming in a traditional sense, but they can still produce meaningful automation.

Macros answer a practical question: *What should happen when a user opens a form, clicks a button, or changes a value?*

Common trigger events include:

- opening or closing a form;
- clicking a command button;
- changing a field value;
- loading a report;
- navigating between records.

When the event fires, the macro runs its defined sequence of actions — such as validating input, refreshing data, opening another form, or displaying a message.

### 13.10.2 What Macros Are Good For

Macros are best suited for lightweight, interface-level automation.

| Use Case | Example |
|---|---|
| Input validation | Reject a score above 100 before the record is saved |
| Workflow control | Require a student to be selected before grades can be entered |
| Auto-refresh | Update a subform after a new grade is added |
| Navigation | Open a related report from a student detail form |
| Confirmation messages | Warn before deleting a grade record |
| Controlled sequences | Guide users through a multi-step data-entry process |

These are interaction-level guardrails. They do not replace database constraints, but they complement them by catching problems at the point of user interaction — before the bad data reaches the table.

### 13.10.3 Data Macros: Trigger-Like Behavior in Access

Access also supports **data macros**, which are closer in spirit to SQL triggers. A data macro runs at the table level in response to `INSERT`, `UPDATE`, or `DELETE` events.

Data macros can:

- log changes to an audit table;
- validate data before it is committed;
- update related records automatically;
- enforce rules that are too complex for a simple validation rule.

For example, a data macro on `STUDENT_GRADE` can check that a score falls between 0 and 100 and reject the update with a custom message if it does not — similar to the `CHECK` constraint or `BEFORE INSERT` trigger pattern described earlier in this chapter.

### 13.10.4 Macros vs. VBA vs. SQL

Choosing the right tool for automation in Access depends on the job.

| Tool | Best For | Limitation |
|---|---|---|
| Macros | Interface automation, simple workflows, validation messages | Limited programming logic; harder to debug at scale |
| Data macros | Table-level enforcement similar to triggers | Access-specific; does not port to other DBMSs |
| VBA | Complex business logic, custom functions, external integrations | Requires programming knowledge; harder to maintain |
| SQL constraints | Universal data rules | Cannot produce custom messages or interface behavior |

A good Access application often uses all four: constraints protect the data, data macros log changes, form macros guide users, and VBA handles advanced logic when macros are not enough.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### 13.10.5 Why Macros Matter in Practice

Not every data-quality problem should be solved with SQL alone. In an Access-based grading system, an instructor who enters grades through a form should not need to understand `CHECK` constraints to avoid mistakes. A well-designed macro can display a clear message — "Score must be between 0 and 100" — at the moment of entry, making the rule visible and actionable.

Macros are the glue between database rules and day-to-day user workflows. They help keep user behavior aligned with database design.

<div class="callout tip">
  <p><strong>💡 Tip: Start with constraints, then add macros</strong></p>
  <p>Use database constraints for rules that must always hold. Use Access macros to make those rules visible, friendly, and immediate at the point of user interaction.</p>
</div>

## 13.11 Stored Procedures and Database Functions

While triggers respond automatically to data events and macros automate interface workflows, **stored procedures** and **database functions** provide another form of server-side logic: reusable, explicitly called code that lives inside the database.

### 13.11.1 What Stored Procedures Are

A **stored procedure** is a named block of SQL code that is saved in the database and can be executed on demand. Unlike a trigger — which fires automatically when data changes — a stored procedure is called explicitly by a user, application, or scheduled job.

Database **functions** are similar but are designed to return a value and can be used inside SQL statements, much like built-in functions such as `AVG()` or `UPPER()`.

The key distinction:

| Feature | Trigger | Stored Procedure | Function |
|---|---|---|---|
| How it runs | Automatically on data events | Called explicitly | Called explicitly, often inside queries |
| Returns a value? | No | Optional | Yes |
| Can modify data? | Yes | Yes | Usually not (read-only) |
| Used inside SQL? | No | No (called separately) | Yes |

### 13.11.2 A PostgreSQL Stored Procedure Example

The following procedure updates a student's score and logs the change in one call:

```sql
CREATE OR REPLACE PROCEDURE update_grade(
    p_grade_id INTEGER,
    p_new_score INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Record the old score before updating
    INSERT INTO GradeAudit (GradeID, OldScore, NewScore, ChangedAt)
    SELECT GradeID, Score, p_new_score, CURRENT_TIMESTAMP
    FROM STUDENT_GRADE
    WHERE GradeID = p_grade_id;

    -- Apply the new score
    UPDATE STUDENT_GRADE
    SET Score = p_new_score
    WHERE GradeID = p_grade_id;

    COMMIT;
END;
$$;
```

The procedure is called explicitly:

```sql
CALL update_grade(10, 92);
```

This pattern is especially useful when the same multi-step operation is needed from different places — a web application, a reporting tool, or an administrative script. Instead of repeating the logic, every caller uses the same stored procedure.

### 13.11.3 When to Use Stored Procedures

Stored procedures are a good fit when:

- the same multi-step operation is needed from multiple applications or tools;
- the logic involves conditional branching that is awkward in pure SQL;
- you want to enforce a consistent process (such as grade correction with mandatory auditing);
- performance matters and sending many individual SQL statements over the network is inefficient.

They are less useful when:

- the database platform does not support them well (SQLite has no stored procedures; Access uses VBA instead);
- the logic is simple enough for a single SQL statement;
- the application already has strong service-layer logic that is easier to maintain outside the database.

### 13.11.4 Platform Availability

| Platform | Stored Procedure Support |
|---|---|
| PostgreSQL / Supabase | Full support (`CREATE PROCEDURE`, `CREATE FUNCTION`, PL/pgSQL) |
| Microsoft SQL Server | Full support (T-SQL stored procedures) |
| MySQL | Supported (`CREATE PROCEDURE`) |
| SQLite | Not supported; use application-level functions |
| Microsoft Access | Not supported; use VBA modules or macros |

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Different tools for different jobs</strong></p>
  <p>Constraints enforce rules passively. Triggers react to changes automatically. Stored procedures package multi-step logic for explicit execution. Macros guide user behavior at the interface. A hardened database uses each where it fits best.</p>
</div>

## Chapter Summary

This chapter extended the course from correct SQL to reliable database systems. Earlier chapters taught you how to design schemas, normalize tables, query data, administer databases, and build BI outputs. Chapter 13 showed how to harden those databases so they remain trustworthy under real use.

Indexes improve performance by helping the DBMS find rows efficiently — but they are not free, and over-indexing slows writes. Transactions protect related changes so that operations succeed completely or fail safely, preventing the partial updates that corrupt reports and erode trust. Constraints prevent invalid data from entering the system by turning business rules into enforceable database rules. Triggers provide automatic auditing and enforcement that work regardless of which application or user makes the change.

Advanced analytics patterns — conditional aggregation, normalized scores, weighted calculations, and dashboard-ready views — turn raw data into transparent, reusable metrics. Window functions, taught in detail in Chapters 9 and 10, add comparative context without losing row-level detail. Permissions and roles control who can see and modify sensitive data, supporting least-privilege design and auditability.

Different platforms implement these concepts differently. Access offers macros and data macros for interface-level and table-level automation. SQLite provides a lightweight but capable SQL environment. PostgreSQL and Supabase deliver full enterprise features including stored procedures, row-level security, and rich indexing.

The Grading Database provided a running example throughout the chapter. By adding indexes, constraints, transactions, audit triggers, analytical views, access controls, and — where the platform supports it — macros and stored procedures, the database becomes more than a classroom schema. It becomes a model of how database systems support reliability, accountability, and organizational trust.

The larger lesson is simple: advanced database techniques are not decorative extras. They are the mechanisms that make data systems dependable. A database that stores correct data today must also protect that data tomorrow, next semester, and next year. Chapter 14 will apply these principles in a visual reporting environment, connecting hardened database logic to dashboards that decision-makers can use.

---

## References

Connolly, T. M., & Begg, C. E. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Date, C. J. (2004). *An introduction to database systems* (8th ed.). Pearson.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

PostgreSQL Global Development Group. (n.d.). *PostgreSQL documentation*. https://www.postgresql.org/docs/

SQLite Consortium. (n.d.). *SQLite documentation*. https://www.sqlite.org/docs.html
