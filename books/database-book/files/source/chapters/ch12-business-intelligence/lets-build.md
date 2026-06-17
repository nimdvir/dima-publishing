## Let's Build: Create a BI Layer for the Grading Database

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

In this build, you will turn the operational Grading Database into a small Business Intelligence layer. The goal is not to build a full dashboard — that comes in Chapter 14. The goal is to create the SQL-based analytical foundation that dashboards, reports, and KPI cards depend on. Before data can look good, it must be trustworthy.

By the end, you will have one reusable analytical view, several KPI queries, a missing-submission query, an attendance-performance view, a dashboard blueprint, and a governed metric definition. This activity feeds directly into Lab 12 — Building a BI Layer for PetVax.

### Purpose

An operational database records what happened. A BI layer helps explain what those events mean. In the Grading Database, scores, attendance, and deliverables are stored in normalized tables. That design is excellent for data entry and integrity. It is not ideal for asking analytical questions such as "Which students are at risk?" or "Are scores improving over time?"

This Let's Build bridges the gap. You will transform operational tables into analytical views, build KPI queries that support decision-making, and learn that BI governance matters as much as BI technology.

### What You Will Practice

- Translating management questions into BI queries
- Building reusable analytical views that reshape normalized data
- Writing KPI queries with thresholds and targets
- Using `CROSS JOIN` and `LEFT JOIN` to find missing data
- Sketching a dashboard from query outputs
- Defining a governed metric

### Before You Begin

You need your current Grading Database with these tables populated:

- `STUDENT` — at least 8 students, with varied names and a `Section` column
- `DELIVERABLE` — at least 10 deliverables across types such as Quiz, Exam, Homework, and Project
- `STUDENT_GRADE` — scores for most student-deliverable pairs; leave some pairs intentionally missing
- `ATTENDANCE` — attendance records for several class sessions

You will work in SQLite, Access SQL View, or the SQL environment you used in previous chapters. Save every query and view you create — you will need them for Lab 12.

### Start with the BI Questions

Before writing any SQL, write down the questions an instructor would want answered from grading data. A BI system is built on decision needs, not on charts.

**What are five BI questions the Grading Database could help answer?**

A useful starting set:

1. What is the average score by deliverable type?
2. Which students are currently at risk (average below 70)?
3. How many submissions are missing?
4. Are scores improving or declining over time?
5. Does attendance appear related to student performance?

For each question, note what kind of output would be most useful: a single number (KPI), a table of students, a bar chart, a trend line, or a comparison table. Write these down — they will guide every query you build next.

### Build a Core Analytical View

The first technical step in BI is turning normalized operational tables into a reporting-ready structure. This is a small ETL-style transformation: you are extracting data from source tables, transforming it with a `CASE` expression, and loading it into a reusable view.

**Create the `GradeBI` view.**

```sql
CREATE VIEW GradeBI AS
SELECT
    s.StudentID,
    s.FirstName || ' ' || s.LastName AS StudentName,
    s.Section,
    d.DeliverableID,
    d.Type AS DeliverableType,
    d.DeliverableNumber,
    d.DueDate,
    sg.Score,
    CASE
        WHEN sg.Score IS NULL THEN 'Missing'
        WHEN sg.Score < 70 THEN 'At Risk'
        WHEN sg.Score < 85 THEN 'Satisfactory'
        ELSE 'Strong'
    END AS ScoreStatus
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
    ON sg.DeliverableID = d.DeliverableID;
```

Run `SELECT * FROM GradeBI LIMIT 10;` to confirm the view works.

**What does this view give you that the original tables do not?**

- Readable student names instead of just IDs.
- A `ScoreStatus` column that classifies each row into meaningful analytical categories.
- A `Section` column for comparing groups.
- A `DeliverableType` and `DueDate` for grouping and time-based analysis.

The original tables remain normalized and unchanged. The view provides a cleaner analytical surface. This is the BI pattern: operational tables stay safe; analytical views do the heavy lifting.

**Important limitation:** This view uses inner joins. It includes only student-deliverable pairs that already have a grade row in `STUDENT_GRADE`. A `NULL` score here means a grade record exists with no score entered. To find deliverables with no grade record at all — truly missing submissions — you need `CROSS JOIN` and `LEFT JOIN`, which you will build next.

### Build a Deliverable Performance Report

Now use the `GradeBI` view to answer your first BI question: which deliverable types or individual deliverables have the lowest averages?

**Write the deliverable performance query.**

```sql
SELECT
    DeliverableType,
    DeliverableNumber,
    ROUND(AVG(Score), 2) AS AvgScore,
    MIN(Score) AS LowestScore,
    MAX(Score) AS HighestScore,
    COUNT(*) AS SubmissionCount
FROM GradeBI
GROUP BY DeliverableType, DeliverableNumber
ORDER BY AvgScore ASC;
```

Run the query and examine the results.

**What do the numbers tell you?** A deliverable with a low average and wide gap between `LowestScore` and `HighestScore` might signal that some students understood the material and others did not — a preparation or instruction gap, not necessarily a bad assessment. A deliverable where everyone scored low might signal unclear instructions or a topic that needs reteaching. The query provides evidence. You provide the interpretation.

### Build an At-Risk Student Report

Your second BI question: which students need attention before the semester ends?

**Write the at-risk student query.**

```sql
SELECT
    StudentID,
    StudentName,
    ROUND(AVG(Score), 2) AS AverageScore,
    COUNT(*) AS CompletedItems
FROM GradeBI
GROUP BY StudentID, StudentName
HAVING AVG(Score) < 70
ORDER BY AverageScore ASC;
```

Run the query.

**What would you do with this list?** The `HAVING` clause acts as a threshold — a simple business rule. In a real BI system, this threshold would be a governed parameter, not a hard-coded number buried in SQL. The query does not tell you what to do. It tells you who to look at. The decision — send an email, offer tutoring, investigate attendance — is yours.

### Build a Missing Submission Report

This is the most important query in the build because it teaches a subtle BI lesson: sometimes BI must identify what is absent, not only what exists.

The `GradeBI` view only shows records that exist. To find missing submissions — expected student-deliverable pairs with no grade record — you need a different approach.

**Write the missing-submission query.**

```sql
SELECT
    s.StudentID,
    s.FirstName || ' ' || s.LastName AS StudentName,
    d.DeliverableID,
    d.Type AS DeliverableType,
    d.DeliverableNumber,
    d.DueDate
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
   AND d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL
ORDER BY s.LastName, s.FirstName, d.DueDate;
```

Run the query.

**Why does this require `CROSS JOIN` and `LEFT JOIN`?**

- `CROSS JOIN` generates every possible student-deliverable pair — the complete set of expected submissions.
- `LEFT JOIN` to `STUDENT_GRADE` tries to match each expected pair with an actual grade record.
- `WHERE sg.GradeID IS NULL` keeps only the pairs where no grade record exists.

This is a major BI concept. Absence can be analytically meaningful. A missing submission is not a low score. It is a different kind of problem that requires a different kind of query.

### Build KPI Queries

KPIs turn raw data into signals. Each KPI should answer one clear question and connect to a threshold or target.

**Write at least three KPI queries. Use these as starting points.**

**KPI 1: Average Class Score**

```sql
SELECT
    ROUND(AVG(Score), 2) AS AverageClassScore
FROM GradeBI;
```

**KPI 2: Pass Rate**

```sql
SELECT
    ROUND(
        100.0 * COUNT(CASE WHEN Score >= 60 THEN 1 END) / COUNT(*),
        1
    ) AS PassRatePercent
FROM GradeBI;
```

**KPI 3: At-Risk Rate**

```sql
WITH StudentAverages AS (
    SELECT
        StudentID,
        AVG(Score) AS AvgScore
    FROM GradeBI
    GROUP BY StudentID
)
SELECT
    ROUND(
        100.0 * COUNT(CASE WHEN AvgScore < 70 THEN 1 END) / COUNT(*),
        1
    ) AS AtRiskRatePercent
FROM StudentAverages;
```

**KPI 4: Missing Submission Rate**

```sql
SELECT
    ROUND(
        100.0 * (
            SELECT COUNT(*)
            FROM STUDENT AS s
            CROSS JOIN DELIVERABLE AS d
            LEFT JOIN STUDENT_GRADE AS sg
                ON s.StudentID = sg.StudentID
               AND d.DeliverableID = sg.DeliverableID
            WHERE sg.GradeID IS NULL
        ) / (
            SELECT COUNT(*) FROM STUDENT
        ) / (
            SELECT COUNT(*) FROM DELIVERABLE
        ),
        1
    ) AS MissingRatePercent;
```

For each KPI, ask: if this number changed by 10% next week, what would you do? A KPI without an action is just a number.

### Build an Attendance-Performance View

Your final analytical view connects two data sources that were stored separately.

**Create the `AttendancePerformance` view.**

```sql
CREATE VIEW AttendancePerformance AS
SELECT
    s.StudentID,
    s.FirstName || ' ' || s.LastName AS StudentName,
    COUNT(CASE WHEN a.Attended = 1 THEN 1 END) AS ClassesAttended,
    COUNT(a.AttendanceID) AS ClassesRecorded,
    ROUND(
        100.0 * COUNT(CASE WHEN a.Attended = 1 THEN 1 END) /
        NULLIF(COUNT(a.AttendanceID), 0),
        1
    ) AS AttendanceRate,
    ROUND(AVG(sg.Score), 2) AS AvgScore
FROM STUDENT AS s
LEFT JOIN ATTENDANCE AS a
    ON s.StudentID = a.StudentID
LEFT JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName;
```

Query the view:

```sql
SELECT *
FROM AttendancePerformance
ORDER BY AttendanceRate ASC, AvgScore ASC;
```

**What patterns do you see?** Do students with the lowest attendance also have the lowest average scores? Is the relationship strong or weak? This view does not prove causation. It surfaces a pattern worth investigating. That is what BI does.

### Sketch a Dashboard Blueprint

A dashboard is a visual summary that helps someone monitor performance and decide what to do next. Before building anything in Power BI, sketch what the dashboard should show.

**Draw or describe a simple one-page dashboard layout with at least six elements.**

Use this template for each element:

| Dashboard Element | BI Question Answered | Data Source | Visualization Type |
|---|---|---|---|
| Average class score | How is the class doing overall? | KPI 1 query | KPI card |
| Pass rate | What percentage of students are passing? | KPI 2 query | KPI card |
| At-risk rate | How many students need intervention? | KPI 3 query | KPI card |
| Missing submissions | How many deliverables are unsubmitted? | KPI 4 query | KPI card |
| Avg score by deliverable type | Which assessment categories are hardest? | Deliverable performance query | Bar chart |
| Attendance vs. performance | Are attendance and grades related? | AttendancePerformance view | Scatter plot |

The dashboard should help an instructor answer three practical questions at a glance: How is the class doing? Where are the problems? Who needs action?

### Define a Governed Metric

BI metrics are not just numbers. They are governed definitions. If two people calculate "pass rate" differently, the dashboard becomes untrustworthy.

**Choose one of your KPIs and complete this governance template.**

| Field | Your Definition |
|---|---|
| **KPI name** | |
| **Goal** | What decision does this KPI support? |
| **Formula** | Write the exact calculation. |
| **Grain** | Student? Student-deliverable? Student-course? |
| **Data sources** | Which tables or views feed this KPI? |
| **Exclusions** | What is intentionally left out (e.g., withdrawn students)? |
| **Refresh frequency** | How often should this be recalculated? |
| **Owner** | Who is responsible for this metric? |
| **Action threshold** | At what value should someone act? |
| **Action** | What should happen when the threshold is crossed? |

Example for At-Risk Rate:

| Field | Example |
|---|---|
| **KPI name** | At-Risk Rate |
| **Goal** | Identify the percentage of students needing intervention |
| **Formula** | Students with average below 70 / total students with graded work |
| **Grain** | Student-course |
| **Data sources** | `GradeBI` view → `STUDENT_GRADE` and `STUDENT` tables |
| **Exclusions** | Students with zero graded items |
| **Refresh frequency** | Weekly |
| **Owner** | Course instructor |
| **Action threshold** | Alert if above 20% |
| **Action** | Review at-risk list; send outreach to students below 70 |

This is what separates BI from ad-hoc querying. Governance makes metrics reusable, comparable, and trustworthy across reports, semesters, and people.

### Check Your Work

Before you submit, verify each deliverable:

- [ ] `GradeBI` view returns rows with `StudentName`, `Section`, `DeliverableType`, `Score`, and `ScoreStatus`.
- [ ] Deliverable performance query shows at least three deliverable types with averages.
- [ ] At-risk student query returns only students with average below 70.
- [ ] Missing-submission query returns rows where no `STUDENT_GRADE` record exists — not rows with `NULL` scores.
- [ ] Each KPI query returns exactly one number.
- [ ] `AttendancePerformance` view shows `AttendanceRate` and `AvgScore` for every student.
- [ ] Dashboard blueprint has at least six elements, each linked to a query and a visualization type.
- [ ] Governance template is fully filled in for one KPI.

**Quick self-check:** Pick one student from your at-risk list. Look up their attendance rate in the `AttendancePerformance` view. Look up their missing submissions. Do the three data points tell a consistent story? If not, which number would you trust most, and why?

### What This Shows

This Let's Build demonstrates the full BI pipeline on a real database:

- **BI questions** → drive every query you wrote.
- **ETL-style view** → transforms normalized tables into an analytical surface.
- **OLAP operations** → slice (filter by type), dice (filter by type and section), drill-down (type → deliverable number), roll-up (deliverable → type average).
- **KPI queries** → turn rows into signals with thresholds.
- **Missing-submission logic** → finds what is absent, not only what is present.
- **Dashboard blueprint** → maps queries to visual elements.
- **Governed metric** → defines a KPI clearly enough that someone else could reproduce it.

### Common Mistakes

- **Confusing NULL scores with missing submissions.** A `NULL` score means a grade record exists but has no value entered. A missing submission means no grade record exists at all. Use `CROSS JOIN` + `LEFT JOIN` for the second case.
- **Using the wrong view for section-based queries.** The `GradeBI` view includes `Section`. If you use a different view that does not include `Section`, your dice and drill-down queries will fail.
- **Treating KPIs as just numbers.** A KPI without a target, owner, threshold, or action is not governed. Define at least one metric fully.
- **Skipping the dashboard blueprint.** The point is not to make something pretty. The point is to connect queries to decisions before touching a visualization tool.
- **Using inner joins for attendance.** Use `LEFT JOIN` for attendance so students with no attendance records still appear with a calculated rate.

### Submit or Save

Save your work as a single SQL script or document containing:

1. The `GradeBI` view definition.
2. The deliverable performance query.
3. The at-risk student query.
4. The missing-submission query.
5. At least three KPI queries.
6. The `AttendancePerformance` view definition.
7. Your dashboard blueprint (as a table or sketch).
8. One completed governance template.

You will use these artifacts in Lab 12 — Building a BI Layer for PetVax, where you will transfer the same BI patterns to the PetVax veterinary clinic database.

### Peek Ahead — Chapter 13

In Chapter 13, we will explore advanced database techniques — indexes, transactions, triggers, and window functions — that make BI queries faster, safer, and more powerful at scale. The views and queries you built here will become the foundation for understanding why those techniques matter.
