<!-- Sources: BITM330-Book-draft/chapter-drafts/ch12-business-intelligence/main/ch12-main-rewritten-2026-05-18.md; .docs/lets-build/lets-build-outline-2026-05-06.md -->

# Let's Build: Business Intelligence for the Grading Department

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

## Overview

This activity shifts your focus from storing data to using data for decisions. You will build a small BI layer on top of the Grading Database so an instructor or department chair can monitor performance, identify risk, and communicate findings clearly.

The goal is not to build a flashy dashboard first. The goal is to produce reliable analytical outputs that a dashboard, report, or memo can trust.

## What You Will Need

- Your current Grading Database
- A SQL environment that supports views, or a saved-query workflow in Access
- Access Reports, a spreadsheet, or another format for presenting results

## Part A: Define the BI Questions

Start with management questions, not code.

Choose at least four questions such as:

1. What is the average score by deliverable type?
2. Which students are currently at risk?
3. Which submissions are missing?
4. Are scores improving or declining over time?
5. Does attendance appear related to performance?

Translate those questions into KPI-style outputs.

| KPI or report | What it helps decide |
|---|---|
| Average score by deliverable type | Which assessments need review |
| At-risk student count | Who needs intervention |
| Missing submission list | Who needs a reminder or follow-up |
| Attendance-performance comparison | Whether engagement and grades move together |

## Part B: Create a Core Analytical View

Build one reusable layer that combines student, deliverable, and score data.

```sql
CREATE VIEW GradeBI AS
SELECT
    s.StudentID,
    s.FirstName || ' ' || s.LastName AS StudentName,
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

If you are working in Access, create the equivalent saved query instead of a SQL view.

## Part C: Build Three Core BI Reports

### Report 1: Deliverable Performance

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

Use this report to find assignments that may be too difficult, too easy, or inconsistent.

### Report 2: At-Risk Students

```sql
SELECT
    StudentID,
    StudentName,
    ROUND(AVG(Score), 2) AS AvgScore,
    COUNT(*) AS CompletedItems
FROM GradeBI
GROUP BY StudentID, StudentName
HAVING AVG(Score) < 70
ORDER BY AvgScore ASC;
```

This report supports action, not just description.

### Report 3: Missing Submissions

```sql
SELECT
    s.StudentID,
    s.FirstName || ' ' || s.LastName AS StudentName,
    d.Type AS DeliverableType,
    d.DeliverableNumber,
    d.DueDate
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
   AND d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL
ORDER BY s.StudentID, d.DueDate;
```

This report matters because missing work is often more important than average work.

## Part D: Add an Attendance-Performance View

Create one summary that helps you explore whether attendance and performance move together.

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

If your platform uses different boolean or rounding syntax, adapt the query and note the change.

## Part E: Translate Results Into a Managerial Output

Choose one of these presentation formats:

- an Access report grouped by course or deliverable type
- a one-page KPI sheet
- a decision memo to the department chair

Your output should answer three plain-language questions:

1. What does the data show?
2. Why does it matter?
3. What should the department do next?

Avoid technical jargon if the audience is a manager rather than a database student.

## Deliverable

Submit the following:

- SQL queries or saved-query screenshots for your BI layer
- at least three finished BI outputs
- one managerial summary, memo, or report page

## Reflection Questions

- Which BI result felt most useful to a decision-maker?
- Which output was hardest to explain clearly?
- Where did data quality affect the credibility of your analysis?

## Connection Forward

Chapter 13 strengthens the database itself with advanced techniques such as indexes, constraints, audit trails, and transaction control.