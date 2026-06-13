<!-- metadata: date="2026-05-18"; chapter="13"; section="main"; title="Chapter 13 – Advanced Database Techniques"; description="Introduces advanced database techniques that harden relational systems for performance, integrity, auditability, security, and scalability across Access, SQLite, and cloud-hosted PostgreSQL."; author="Nimrod Dvir, PhD" -->
# Chapter 13: Advanced Database Techniques

*Hardening Databases for Performance, Integrity, Security, and Scale*

Earlier chapters focused on making databases **correct**. You learned how to design tables, define keys, normalize data, write SQL queries, administer systems, and use data for business intelligence. Those skills are essential. But in real organizations, correctness is only the beginning.

A database also has to survive real use.

It must remain fast as tables grow. It must reject invalid data before errors spread into reports. It must protect sensitive records from unauthorized access. It must preserve an audit trail when important values change. It must support users and applications that read and write data at the same time. A database that works during a classroom exercise may still fail when it becomes part of an operational system.

This chapter introduces the advanced techniques that turn a working database into a more reliable system.

**After reading this chapter, you will be able to:**

- explain how indexes improve query performance and why they create trade-offs;
- use transactions to protect multi-step operations from partial failure;
- apply constraints to enforce business rules at the database level;
- explain when triggers are useful for auditing, validation, and automation;
- use window functions and conditional aggregation for advanced analytics;
- describe how security and permissions protect sensitive database objects;
- compare how advanced techniques differ across Microsoft Access, SQLite, and Supabase/PostgreSQL;
- harden the Grading Database for performance, integrity, auditability, and controlled access.

---

## Chapter Roadmap

| Section | Main Question | Core Techniques |
|---|---|---|
| 13.1 | Why is correct SQL not enough? | Database hardening, reliability, system qualities |
| 13.2 | How do databases stay fast as data grows? | Indexes, query plans, indexing strategy |
| 13.3 | How do we prevent partial updates? | Transactions, `BEGIN`, `COMMIT`, `ROLLBACK` |
| 13.4 | How do we block bad data? | `CHECK`, `UNIQUE`, `DEFAULT`, `NOT NULL` constraints |
| 13.5 | How can the database react automatically? | Triggers, audit logs, validation triggers |
| 13.6 | How do we analyze without losing detail? | Window functions, rankings, running totals |
| 13.7 | How do we build transparent metrics? | Conditional aggregation, ratios, dashboard-ready queries |
| 13.8 | How do we control access? | Authentication, authorization, roles, permissions |
| 13.9 | How do techniques vary by platform? | Access, SQLite, PostgreSQL/Supabase comparison |
| 13.10 | How do we apply all of this? | Hardening the Grading Database |

---

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

> **Key Takeaway:**  
> Basic SQL asks, “Does the query work?” Advanced database work asks, “Will the system remain fast, safe, auditable, and trustworthy when real users depend on it?”

---

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

> **Tip:**  
> Do not guess about performance. Use query plans to see what the database is actually doing. Databases are many things, but they are not impressed by confidence.

---

## 13.3 Transactions: Protecting Multi-Step Operations

Many database operations involve more than one step. A transaction groups those steps into a single unit of work.

### 13.3.1 What a Transaction Is

A **transaction** is a set of database operations that must succeed or fail together.

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

### 13.3.2 Why Transactions Matter

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

Chapter 11 introduced ACID properties. Chapter 13 applies them.

| ACID Property | Practical Meaning | Grading Example |
|---|---|---|
| **Atomicity** | All steps succeed or all fail | Grade update and audit record happen together |
| **Consistency** | Rules remain valid before and after | No invalid score is stored |
| **Isolation** | Concurrent work does not interfere | Two instructors do not overwrite each other unexpectedly |
| **Durability** | Committed changes persist | Saved grades survive system failure |

Transactions are one of the main reasons databases are more reliable than spreadsheets. A spreadsheet has cells. A database has rules about what happens when things go wrong.

---

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

### 13.4.6 Constraint Design Checklist

Before adding a constraint, ask:

1. Is this rule always true?
2. Should violations be blocked immediately?
3. Is the rule stable over time?
4. Should the rule live in the database rather than in application code?
5. Will historical data violate the rule?

If the answer to the first four questions is yes, the rule probably belongs as a database constraint.

> **Key Takeaway:**  
> Constraints are business rules made enforceable. They move data quality from “please be careful” to “the system will not allow this.”

---

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

### 13.5.6 Trigger Caution

Triggers are powerful because they are automatic. That is also what makes them dangerous.

A user may run:

```sql
UPDATE STUDENT_GRADE
SET Score = 90
WHERE GradeID = 10;
```

and not realize that three other actions are happening behind the scenes.

> **Warning:**  
> Hidden logic is still logic. Document triggers clearly, name them consistently, and avoid using them for rules that belong more naturally in queries, constraints, or application code.

---

## 13.6 Window Functions: Analytics Without Losing Detail

Traditional aggregation collapses rows.

```sql
SELECT StudentID, AVG(Score) AS AvgScore
FROM STUDENT_GRADE
GROUP BY StudentID;
```

This query gives one row per student. That is useful, but the individual grade rows disappear. Window functions solve this problem by adding analytical values while preserving row-level detail.

### 13.6.1 GROUP BY vs. Window Functions

| Feature | `GROUP BY` | Window Function |
|---|---|---|
| Output | One row per group | Original rows remain |
| Best for | Summaries | Detail plus comparison |
| Example | Average per student | Each score plus student average |
| Row detail retained? | No | Yes |

### 13.6.2 Basic Syntax

```sql
function_name() OVER (
    PARTITION BY grouping_column
    ORDER BY ordering_column
)
```

- `PARTITION BY` divides rows into groups.
- `ORDER BY` defines order within each group.
- The function computes a value over the window.

### 13.6.3 Student Average Beside Each Grade

```sql
SELECT
    StudentID,
    DeliverableID,
    Score,
    AVG(Score) OVER (
        PARTITION BY StudentID
    ) AS StudentAverage
FROM STUDENT_GRADE;
```

Each grade row remains visible, but the student's average appears beside it.

### 13.6.4 Ranking Students Within a Deliverable

```sql
SELECT
    DeliverableID,
    StudentID,
    Score,
    RANK() OVER (
        PARTITION BY DeliverableID
        ORDER BY Score DESC
    ) AS RankWithinDeliverable
FROM STUDENT_GRADE;
```

This ranks students separately for each deliverable. `PARTITION BY DeliverableID` resets the ranking for each assignment.

### 13.6.5 Running Average Over Time

```sql
SELECT
    sg.StudentID,
    d.DueDate,
    sg.Score,
    ROUND(
        AVG(sg.Score) OVER (
            PARTITION BY sg.StudentID
            ORDER BY d.DueDate
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ),
        2
    ) AS RunningAverage
FROM STUDENT_GRADE AS sg
JOIN DELIVERABLE AS d
    ON sg.DeliverableID = d.DeliverableID
ORDER BY sg.StudentID, d.DueDate;
```

This shows each score and the student's cumulative average up to that point.

### 13.6.6 Ranking Functions

| Function | What It Does | Tie Behavior |
|---|---|---|
| `ROW_NUMBER()` | Assigns a unique sequence number | No ties; every row gets a different number |
| `RANK()` | Assigns rank based on order | Ties share rank; gaps appear |
| `DENSE_RANK()` | Assigns rank based on order | Ties share rank; no gaps |
| `NTILE(n)` | Divides rows into `n` groups | Useful for quartiles or percentile bands |

Example:

```sql
SELECT
    StudentID,
    AVG(Score) AS AvgScore,
    DENSE_RANK() OVER (
        ORDER BY AVG(Score) DESC
    ) AS DenseClassRank
FROM STUDENT_GRADE
GROUP BY StudentID;
```

Window functions are especially useful for dashboards and early-warning systems because they combine individual records with comparison context.

---

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

The dashboard consumes a trusted metric instead of recreating the calculation.

---

## 13.8 Security and Permissions

Security determines who can see or change data. In real systems, this is not optional. Grades, attendance, and student information are sensitive.

### 13.8.1 Authentication vs. Authorization

**Authentication** asks: Who are you?

**Authorization** asks: What are you allowed to do?

A student may be authenticated into a system but not authorized to view another student's grades or update any grades.

### 13.8.2 Role-Based Access Control

Role-based access control assigns permissions to roles rather than individuals.

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

> **Important:**  
> If a database stores sensitive information but cannot explain who changed what, when, and why, it is not fully trustworthy.

---

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

Access is strongest when the database is also an application interface. Forms, reports, and macros help guide user behavior.

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

---

## 13.10 Let's Build: Hardening the Grading Database

This section applies the chapter's techniques to the Grading Database. The goal is not to use every advanced feature everywhere. The goal is to improve the database in targeted, meaningful ways.

### 13.10.1 Step 1: Identify Critical Risks

Start by asking what could go wrong.

| Risk | Example | Technique |
|---|---|---|
| Slow queries | Grade reports take too long | Indexes |
| Duplicate grade records | Student has two scores for Quiz 1 | Unique constraint |
| Invalid values | Score = 145 | Check constraint |
| Partial updates | Grade changed but audit not recorded | Transaction |
| Hidden changes | Instructor changes a grade with no record | Trigger/audit table |
| Unauthorized access | Student sees all grades | Roles/permissions/RLS |

A hardened database responds to each risk with a control.

### 13.10.2 Step 2: Add Performance Indexes

```sql
CREATE INDEX idx_sg_student
ON STUDENT_GRADE(StudentID);

CREATE INDEX idx_sg_deliverable
ON STUDENT_GRADE(DeliverableID);

CREATE INDEX idx_attendance_student
ON ATTENDANCE(StudentID);

CREATE INDEX idx_deliverable_duedate
ON DELIVERABLE(DueDate);
```

These indexes support common joins, filters, and date-based reports.

### 13.10.3 Step 3: Add Data Quality Constraints

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT chk_score_range
CHECK (Score BETWEEN 0 AND 100);
```

```sql
ALTER TABLE STUDENT
ADD CONSTRAINT uq_student_email
UNIQUE (Email);
```

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT uq_student_deliverable
UNIQUE (StudentID, DeliverableID);
```

If using SQLite, constraints may need to be included when the table is created or added by recreating the table, depending on the constraint type.

### 13.10.4 Step 4: Create an Audit Trail

```sql
CREATE TABLE GRADE_AUDIT (
    AuditID INTEGER PRIMARY KEY,
    GradeID INTEGER NOT NULL,
    OldScore INTEGER,
    NewScore INTEGER,
    ChangedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ChangeReason TEXT
);
```

SQLite trigger:

```sql
CREATE TRIGGER trg_audit_grade_update
AFTER UPDATE ON STUDENT_GRADE
FOR EACH ROW
WHEN OLD.Score <> NEW.Score
BEGIN
    INSERT INTO GRADE_AUDIT (GradeID, OldScore, NewScore)
    VALUES (OLD.GradeID, OLD.Score, NEW.Score);
END;
```

This records grade changes automatically.

### 13.10.5 Step 5: Use a Transaction for Grade Correction

```sql
BEGIN;

UPDATE STUDENT_GRADE
SET Score = 92
WHERE GradeID = 10;

-- Optional: manually add reason if not handled by trigger
UPDATE GRADE_AUDIT
SET ChangeReason = 'Corrected data entry error'
WHERE GradeID = 10
  AND ChangeReason IS NULL;

COMMIT;
```

If something goes wrong:

```sql
ROLLBACK;
```

### 13.10.6 Step 6: Create a Performance Monitoring Query

```sql
SELECT
    d.Type,
    d.DeliverableNumber,
    COUNT(*) AS Submissions,
    ROUND(AVG(sg.Score), 2) AS AverageScore,
    MIN(sg.Score) AS LowestScore,
    MAX(sg.Score) AS HighestScore,
    ROUND(
        100.0 * SUM(CASE WHEN sg.Score >= 60 THEN 1 ELSE 0 END) / COUNT(*),
        2
    ) AS PassRatePercent
FROM DELIVERABLE AS d
JOIN STUDENT_GRADE AS sg
    ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.Type, d.DeliverableNumber
ORDER BY AverageScore ASC;
```

This query is BI-ready. It identifies difficult deliverables, summarizes submissions, and supports instructional decisions.

### 13.10.7 Step 7: Build a Student Progress View

```sql
CREATE VIEW StudentProgress AS
SELECT
    s.StudentID,
    s.FirstName,
    s.LastName,
    d.DueDate,
    d.Type,
    d.DeliverableNumber,
    sg.Score,
    AVG(sg.Score) OVER (
        PARTITION BY s.StudentID
        ORDER BY d.DueDate
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS RunningAverage
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
    ON sg.DeliverableID = d.DeliverableID;
```

This view supports progress tracking without losing grade-level detail.

### 13.10.8 What You Accomplished

By the end of this hardening exercise, the Grading Database has been strengthened in five ways:

| Improvement | Technique |
|---|---|
| Faster queries | Indexes |
| Safer updates | Transactions |
| Better data quality | Constraints |
| Auditability | Triggers and audit table |
| Better analytics | Window functions and views |

This is the difference between a database that merely stores data and a database that can support real organizational work.

---

## Key Concepts

### Foundational Ideas

- Advanced database techniques protect performance, integrity, auditability, and security.
- Indexes improve read performance but introduce storage and write-maintenance costs.
- Transactions protect multi-step operations from partial failure.
- Constraints turn business rules into enforceable database rules.
- Triggers allow the database to respond automatically to changes.
- Window functions support analytics while preserving row-level detail.
- Conditional aggregation creates transparent KPI-style metrics directly in SQL.
- Permissions and roles protect sensitive data and support least privilege.
- Advanced techniques are conceptually portable, but implementation varies across Access, SQLite, and PostgreSQL.

### Practical Design Rules

- Index columns that are frequently used in joins, filters, sorting, and date ranges.
- Do not index every column.
- Use transactions when multiple changes must succeed or fail together.
- Prefer constraints over after-the-fact data cleaning.
- Use triggers for auditing and universal enforcement, not for complex hidden workflows.
- Use views to make advanced analytics reusable.
- Grant permissions to roles, not individual users.
- Treat security, auditability, and performance as design responsibilities.

---

## Chapter Summary

This chapter extended the course from correct SQL to reliable database systems. Earlier chapters taught you how to design schemas, normalize tables, query data, administer databases, and build BI outputs. Chapter 13 showed how to harden those databases so they remain trustworthy under real use.

Indexes improve performance by helping the DBMS find rows efficiently. Transactions protect related changes so that operations succeed completely or fail safely. Constraints prevent invalid data from entering the system. Triggers provide automatic auditing and enforcement. Window functions and conditional aggregation support advanced analytics without abandoning SQL transparency. Permissions and roles control who can see and modify sensitive data.

The Grading Database provided a running example throughout the chapter. By adding indexes, constraints, transactions, audit triggers, analytical views, and access controls, the database became more than a classroom schema. It became a model of how database systems support reliability, accountability, and organizational trust.

The larger lesson is simple: advanced database techniques are not decorative extras. They are the mechanisms that make data systems dependable. A database that stores correct data today must also protect that data tomorrow, next semester, and next year.

---

## Key Terms

| Term | Definition |
|---|---|
| Audit Table | A table that records important changes for accountability and review |
| Composite Index | An index built on two or more columns |
| Conditional Aggregation | Using `CASE` inside aggregate functions to calculate condition-specific metrics |
| Constraint | A rule enforced by the database to restrict allowed data or relationships |
| Database Hardening | Strengthening a database for performance, integrity, auditability, and security |
| Default Constraint | A rule that supplies a value when none is provided |
| Index | A lookup structure that improves query performance |
| Query Plan | The DBMS's strategy for executing a query |
| Row-Level Security | A security mechanism that restricts access to individual rows |
| Trigger | Database logic that runs automatically in response to data changes |
| Transaction | A unit of work that succeeds or fails as a whole |
| Unique Constraint | A rule that prevents duplicate values in a column or group of columns |
| Window Function | A SQL function that computes analytical values over a set of rows while preserving row-level detail |

---

## Review Questions

1. What does it mean to harden a database?
2. Why can a logically correct query still be operationally weak?
3. What is an index, and why does it improve performance?
4. Why should foreign keys often be indexed?
5. What are the trade-offs of adding too many indexes?
6. What is a transaction, and why is it important for grade updates?
7. Explain the difference between `COMMIT` and `ROLLBACK`.
8. Give an example of a `CHECK` constraint in the Grading Database.
9. Why might a composite `UNIQUE` constraint be useful on `(StudentID, DeliverableID)`?
10. What is a trigger, and when should it be used?
11. Why can triggers create debugging problems?
12. How do window functions differ from `GROUP BY`?
13. Write a query that ranks students by average score.
14. What is conditional aggregation, and how can it support KPIs?
15. Explain authentication vs. authorization.
16. What is the principle of least privilege?
17. How does SQLite differ from PostgreSQL in security and concurrency?
18. How can Microsoft Access simulate trigger-like behavior?
19. Which advanced technique would you use to prevent invalid scores?
20. Which advanced technique would you use to record grade changes automatically?

## Discussion Questions

1. Should grade changes always require an audit trail? Why or why not?
2. When might performance optimization conflict with data integrity?
3. Is it better to enforce rules in the application or in the database? When might each be appropriate?
4. Should students be able to view class-rank dashboards based on window functions? What ethical issues might arise?
5. What risks are introduced when business logic is hidden inside triggers?
6. How does database hardening support organizational trust?
7. Which platform—Access, SQLite, or Supabase/PostgreSQL—best fits a small departmental grading system? What changes if the system must support thousands of students?

## References

Connolly, T. M., & Begg, C. E. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Date, C. J. (2004). *An introduction to database systems* (8th ed.). Pearson.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

PostgreSQL Global Development Group. (n.d.). *PostgreSQL documentation*. https://www.postgresql.org/docs/

SQLite Consortium. (n.d.). *SQLite documentation*. https://www.sqlite.org/docs.html
