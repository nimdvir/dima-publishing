<!-- metadata: date="2026-06-11"; chapter="10"; section="lets-build"; title="Chapter 10 Let's Build"; description="Hands-on practice for advanced SQL" -->

# Let's Build: Advanced SQL Queries

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

## Overview

These exercises extend the Grading Database you built in Chapter 5's Let's Build activity. Each problem applies a concept from Chapter 8 to the seven-table schema (`STUDENT`, `DELIVERABLE`, `STUDENT_GRADE`, `ASSIGNMENT`, `SCHEDULE`, `ATTENDANCE`, `GRADE_SCALE`). Work in SQLite Online or Supabase -- specify which platform you are using if syntax differs.

**What you will need:**
- The Grading Database from Chapter 5 (populated with sample data)
- A browser with [sqliteonline.com](https://sqliteonline.com/) or your Supabase project

---

## Exercise 1: Diagnostic Query -- Spelling Inconsistencies

**Objective:** Practice using diagnostic queries to detect data quality problems before normalization.

**Scenario:** Imagine that `GRADES_FLAT` (from Section 8.1) contains deliverables whose `Topic` field was entered inconsistently -- for example, "Database Basics" vs. "database basics" vs. "DB Basics."

**Task:** Write a query against the `DELIVERABLE` table that finds any `Type` + `DeliverableNumber` combination where the `Topic` appears in more than one distinct form.

**Hint:** Use `GROUP BY`, `COUNT(DISTINCT)`, and `HAVING`. Consider whether case sensitivity matters in your platform.

<details><summary>Solution</summary>

```sql
SELECT Type, DeliverableNumber,
       COUNT(DISTINCT Topic) AS TopicVariations,
       GROUP_CONCAT(DISTINCT Topic) AS AllTopics
FROM DELIVERABLE
GROUP BY Type, DeliverableNumber
HAVING COUNT(DISTINCT Topic) > 1;
```

In PostgreSQL, use `STRING_AGG(DISTINCT Topic, ', ')` instead of `GROUP_CONCAT`.

If the Grading Database data is clean, this returns zero rows -- which is the expected result for well-maintained data.

</details>

---

## Exercise 2: CTE Pipeline -- Weighted Final Grades with Risk Flags

**Objective:** Build a multi-stage CTE that computes weighted final grades, assigns letter grades, and flags at-risk students.

**Task:** Write a single query with three CTE stages:
1. **CategoryAverages** -- Compute each student's average score per assignment type (`Quiz`, `Exam`, `Project`).
2. **WeightedGrades** -- Multiply each category average by its weight (Quiz = 0.20, Exam = 0.40, Project = 0.40) and sum to produce a `WeightedFinalGrade`.
3. **FlaggedStudents** -- Assign a letter grade and a risk flag (`At Risk` if below 70, `Needs Attention` if below 80, `On Track` otherwise).

The final `SELECT` should return: `StudentName`, `WeightedFinalGrade`, `LetterGrade`, `RiskFlag`, ordered by grade ascending.

**Hint:** You will need to join `STUDENT_GRADE` to `DELIVERABLE` (for `Type`) in stage 1. Stage 2 can use hard-coded weights or a `GRADE_WEIGHT` table if you created one.

<details><summary>Solution</summary>

```sql
WITH CategoryAverages AS (
    SELECT sg.StudentID, d.Type,
           AVG(sg.Score) AS TypeAverage
    FROM STUDENT_GRADE sg
    JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
    GROUP BY sg.StudentID, d.Type
),
WeightedGrades AS (
    SELECT ca.StudentID,
           ROUND(
               SUM(ca.TypeAverage * CASE ca.Type
                   WHEN 'Quiz' THEN 0.20
                   WHEN 'Exam' THEN 0.40
                   WHEN 'Project' THEN 0.40
                   ELSE 0
               END), 2
           ) AS WeightedFinalGrade
    FROM CategoryAverages ca
    GROUP BY ca.StudentID
),
FlaggedStudents AS (
    SELECT wg.StudentID, wg.WeightedFinalGrade,
           CASE
               WHEN wg.WeightedFinalGrade >= 90 THEN 'A'
               WHEN wg.WeightedFinalGrade >= 80 THEN 'B'
               WHEN wg.WeightedFinalGrade >= 70 THEN 'C'
               WHEN wg.WeightedFinalGrade >= 60 THEN 'D'
               ELSE 'F'
           END AS LetterGrade,
           CASE
               WHEN wg.WeightedFinalGrade < 70 THEN 'At Risk'
               WHEN wg.WeightedFinalGrade < 80 THEN 'Needs Attention'
               ELSE 'On Track'
           END AS RiskFlag
    FROM WeightedGrades wg
)
SELECT s.FirstName || ' ' || s.LastName AS StudentName,
       fs.WeightedFinalGrade,
       fs.LetterGrade,
       fs.RiskFlag
FROM FlaggedStudents fs
JOIN STUDENT s ON fs.StudentID = s.StudentID
ORDER BY fs.WeightedFinalGrade ASC;
```

</details>

---

## Exercise 3: View -- Attendance Rate Alongside Grade Average

**Objective:** Create a view that combines attendance and grade data for each student.

**Task:** Create a view called `StudentPerformanceDashboard` that returns:
- `StudentName` (first + last)
- `AttendanceRate` (percentage of classes attended, rounded to 1 decimal)
- `AverageScore` (rounded to 2 decimals)
- `SubmissionCount` (number of graded deliverables)

Then query the view to list all students ordered by attendance rate descending.

**Hint:** You will need to aggregate from both `ATTENDANCE` and `STUDENT_GRADE`, then join the results. A CTE or subquery approach within the view works well.

<details><summary>Solution</summary>

```sql
CREATE VIEW StudentPerformanceDashboard AS
SELECT s.FirstName || ' ' || s.LastName AS StudentName,
       ROUND(100.0 * SUM(a.Attended) / COUNT(DISTINCT a.AttendanceID), 1) AS AttendanceRate,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       COUNT(DISTINCT sg.GradeID) AS SubmissionCount
FROM STUDENT s
LEFT JOIN ATTENDANCE a ON s.StudentID = a.StudentID
LEFT JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName;

-- Query the view
SELECT * FROM StudentPerformanceDashboard
ORDER BY AttendanceRate DESC;
```

The `LEFT JOIN` ensures students with no attendance or no grades still appear in the view.

</details>

---

## Exercise 4: Window Function -- Running Quiz Average

**Objective:** Use a window function to show each student's score on each quiz alongside a running average of their quiz scores.

**Task:** Write a query that returns:
- `StudentID`
- `DeliverableNumber` (quiz number)
- `Score`
- `RunningQuizAvg` -- the average of all quiz scores for that student up to and including the current quiz

Filter to only quizzes (`Type = 'Quiz'`). Order by `StudentID`, then `DeliverableNumber`.

**Hint:** Use `AVG() OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.

<details><summary>Solution</summary>

```sql
SELECT sg.StudentID,
       d.DeliverableNumber,
       sg.Score,
       ROUND(AVG(sg.Score) OVER (
           PARTITION BY sg.StudentID
           ORDER BY d.DeliverableNumber
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ), 2) AS RunningQuizAvg
FROM STUDENT_GRADE sg
JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
WHERE d.Type = 'Quiz'
ORDER BY sg.StudentID, d.DeliverableNumber;
```

</details>

---

## Exercise 5: Transaction -- Curve Exam Scores Safely

**Objective:** Practice using transactions to apply a bulk grade change with verification before committing.

**Task:** Write a transaction that:
1. Adds 3 bonus points to all exam scores (cap at 100).
2. Verifies that no score exceeds 100 after the update.
3. Commits if verification passes; includes a comment showing where you would `ROLLBACK` if it does not.

**Hint:** Use `CASE` inside the `UPDATE` to cap scores. Use a `SELECT COUNT(*)` to verify.

<details><summary>Solution</summary>

```sql
BEGIN TRANSACTION;

-- Apply 3-point curve to all exam scores, capped at 100
UPDATE STUDENT_GRADE
SET Score = CASE
    WHEN Score + 3 > 100 THEN 100
    ELSE Score + 3
END
WHERE DeliverableID IN (
    SELECT DeliverableID FROM DELIVERABLE WHERE Type = 'Exam'
);

-- Verify no scores exceed 100
SELECT COUNT(*) AS OverflowCount
FROM STUDENT_GRADE
WHERE Score > 100;

-- If OverflowCount = 0, commit:
COMMIT;
-- If OverflowCount > 0, roll back instead:
-- ROLLBACK;
```

</details>

---

## Next Steps

These exercises cover the core patterns from Chapter 8. To extend your practice:

- Modify Exercise 2 to read weights from a `GRADE_WEIGHT` table instead of hard-coding them.
- Add a trigger (Section 8.25) that logs every grade change made during Exercise 5 to a `GRADE_AUDIT` table.
- Create a view that combines the outputs of Exercises 3 and 4 into a single student performance report.

These activities connect directly to the database design work in Chapter 10 and the reporting pipelines in Chapter 12.
