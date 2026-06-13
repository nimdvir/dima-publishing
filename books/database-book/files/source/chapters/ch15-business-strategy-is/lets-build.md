<!-- metadata: date="2026-05-08"; chapter="15"; section="lets-build"; title="Chapter 15 Lets Build"; description="Hands-on practice for business strategy" -->

<!-- Companion Activity File for Chapter 15 -->
# Chapter 15 Lets Build: Strategic SQL for the Grading Database

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

*Practical exercises using advanced SQL techniques to transform operational grades into strategic insight*

---

## Overview

This companion file focuses on **applying** the SQL and BI concepts from Chapters 5, 8, and 12 to answer **strategic questions** about student learning, assessment quality, and intervention opportunities. You will use the Grading Database schema (introduced in Chapter 4's lets-build file) to explore performance trends, identify at-risk students, evaluate assessment quality, and simulate policy decisions.

All queries are written in **SQLite** (the primary platform for this course). Notes on **MS Access limitations** are provided where window functions or other advanced features are required.

---

## The Grading Database Schema Review

**STUDENT table:**
- StudentID (Primary Key)
- FirstName, LastName, Email, Birthday

**DELIVERABLE table:**
- DeliverableID (Primary Key)
- Type (Quiz, Exam, Lab, Project, etc.)
- DeliverableNumber (1, 2, 3, ...)
- DueDate
- Topic

**STUDENT_GRADE table:**
- GradeID (Primary Key)
- StudentID (Foreign Key → STUDENT)
- DeliverableID (Foreign Key → DELIVERABLE)
- Score (0-100)

Sample data: 3 students (Maria Santos, James Chen, Aisha Rahman) with grades across 3 deliverables (2 quizzes, 1 exam).

---

## Exercise 1: Trend Analysis – Running Averages and Performance Trajectory

**Strategic Question:** *Is each student improving, and who needs intervention?*

A single final grade tells you the outcome; a trend reveals the trajectory. This exercise uses **window functions** (Chapter 8) to compute running averages, showing improvement or decline over time.

### Problem Statement

Compute each student's score on each deliverable along with their **running average** (cumulative average of all scores up to and including that deliverable). Identify students whose running average is declining or below 70%.

### Recommended SQL Approach

Use the window function `AVG() OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` to compute a cumulative average as each deliverable is completed.

### SQLite Query

```sql
-- Chapter 15, Exercise 1: Trend Analysis
-- Uses: Window functions (Ch8), PARTITION BY, ORDER BY, ROWS frame

SELECT
    s.StudentID,
    s.FirstName || ' ' || s.LastName AS StudentName,
    d.DeliverableNumber,
    d.Type,
    d.Topic,
    sg.Score AS IndividualScore,
    ROUND(
        AVG(sg.Score) OVER (
            PARTITION BY s.StudentID
            ORDER BY d.DeliverableID
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ), 2
    ) AS RunningAverage,
    ROUND(
        AVG(sg.Score) OVER (
            PARTITION BY s.StudentID
            ORDER BY d.DeliverableID
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ), 2
    ) - LAG(
        ROUND(AVG(sg.Score) OVER (
            PARTITION BY s.StudentID
            ORDER BY d.DeliverableID
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ), 2)
    ) OVER (
        PARTITION BY s.StudentID
        ORDER BY d.DeliverableID
    ) AS TrendChange  -- Negative = declining, positive = improving
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
ORDER BY s.StudentID, d.DeliverableID;
```

### Expected Output (Sample)

| StudentID | StudentName | DeliverableNumber | Type | Topic | IndividualScore | RunningAverage | TrendChange |
|---|---|---|---|---|---|---|---|
| 1 | Maria Santos | 1 | Quiz | SQL Joins | 92 | 92.00 | NULL |
| 1 | Maria Santos | 2 | Quiz | Aggregation | 85 | 88.50 | -3.50 |
| 1 | Maria Santos | 3 | Exam | Comprehensive | 90 | 89.00 | 0.50 |
| 2 | James Chen | 1 | Quiz | SQL Joins | 78 | 78.00 | NULL |
| 2 | James Chen | 2 | Quiz | Aggregation | 72 | 75.00 | -3.00 |
| 2 | James Chen | 3 | Exam | Comprehensive | 70 | 73.33 | -1.67 |

### Strategic Interpretation

* **Maria Santos:** Dipped on Quiz 2 but recovered on the exam. Overall trend is positive despite mid-course wobble. Status: **Monitor, no intervention needed yet.**
* **James Chen:** Consistent decline. Running average dropped below 75% after Quiz 2 and is below 74% at exam. Status: **At risk. Early intervention (tutoring, office hours) could have helped. For future students with this pattern, intervene after Quiz 2.**

### Extension: Identify At-Risk Students

```sql
-- Identify students currently below 70% running average
WITH StudentTrends AS (
    -- [paste the main query above here]
)
SELECT DISTINCT StudentID, StudentName
FROM StudentTrends
WHERE RunningAverage < 70.0
ORDER BY StudentID;
```

### MS Access Alternative

MS Access does not support window functions with ROWS frames. Instead, use a self-join to compute running averages:

```sql
-- MS Access: Running average using self-join (slower but works)
SELECT
    s.StudentID,
    s.FirstName & ' ' & s.LastName AS StudentName,
    d.DeliverableNumber,
    d.Type,
    sg.Score AS IndividualScore,
    (SELECT AVG(sg2.Score)
     FROM STUDENT_GRADE sg2
     JOIN DELIVERABLE d2 ON sg2.DeliverableID = d2.DeliverableID
     WHERE sg2.StudentID = s.StudentID
       AND d2.DeliverableID <= d.DeliverableID
    ) AS RunningAverage
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
ORDER BY s.StudentID, d.DeliverableID;
```

---

## Exercise 2: Assessment Quality – Identifying Discriminating Assignments

**Strategic Question:** *Which assignments effectively differentiate high from low performers?*

Assessment quality requires assignments that spread scores -- separating high performers from low performers. This exercise uses **percentile functions and range analysis** to identify which deliverables are most discriminating.

### Problem Statement

For each deliverable, compute: median score, first quartile (Q1), third quartile (Q3), range (max - min), and inter-quartile range (Q3 - Q1). Identify assignments with large ranges (high discrimination) and small ranges (poor discrimination).

### Recommended SQL Approach

Use percentile aggregates or `PERCENTILE_CONT` (if available) to compute quartiles. Group by deliverable.

### SQLite Query

```sql
-- Chapter 15, Exercise 2: Assessment Discrimination Quality
-- Uses: Aggregation (Ch5), statistical ranges, GROUP BY

SELECT
    d.DeliverableID,
    d.Type,
    d.DeliverableNumber,
    d.Topic,
    COUNT(sg.Score) AS StudentCount,
    ROUND(AVG(sg.Score), 2) AS MeanScore,
    MIN(sg.Score) AS MinScore,
    MAX(sg.Score) AS MaxScore,
    MAX(sg.Score) - MIN(sg.Score) AS Range,
    CASE
        WHEN MAX(sg.Score) - MIN(sg.Score) >= 20 THEN 'High discrimination'
        WHEN MAX(sg.Score) - MIN(sg.Score) >= 10 THEN 'Moderate discrimination'
        ELSE 'Low discrimination'
    END AS DiscriminationLevel
FROM DELIVERABLE d
LEFT JOIN STUDENT_GRADE sg ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.Type, d.DeliverableNumber, d.Topic
ORDER BY Range DESC;
```

### Expected Output (Sample)

| DeliverableID | Type | DeliverableNumber | Topic | StudentCount | MeanScore | MinScore | MaxScore | Range | DiscriminationLevel |
|---|---|---|---|---|---|---|---|---|---|
| 3 | Exam | 3 | Comprehensive | 3 | 80.67 | 70 | 90 | 20 | High discrimination |
| 1 | Quiz | 1 | SQL Joins | 3 | 83.33 | 78 | 92 | 14 | Moderate discrimination |
| 2 | Quiz | 2 | Aggregation | 3 | 75.67 | 72 | 85 | 13 | Moderate discrimination |

### Strategic Interpretation

* **Exam (Deliverable 3):** Range of 20 points shows this exam effectively differentiates high from low performers. This is a **good assessment tool** that should continue.
* **Quiz 1 & 2:** Ranges of 13-14 suggest these quizzes are moderately effective. Scores cluster somewhat, suggesting either the material is well-learned or assignments are too easy. Consider increasing difficulty or requiring deeper analysis.

### Curriculum Design Implication

If all assignments show low discrimination, students are all performing similarly. This might mean:
- The course is well-calibrated (everyone is learning)
- Assignments are too easy (everyone scores high)
- Assignments are too hard (everyone scores low)
- The course lacks rigor (only high-ability students survive; others drop out)

The Exam's high discrimination combined with moderate quiz discrimination suggests the course is working: quizzes help students practice consistently, and the exam distinguishes mastery levels.

---

## Exercise 3: Early Warning Indicator – Identifying Intervention Opportunities

**Strategic Question:** *Which students show early signs of struggle, enabling proactive intervention?*

This exercise applies **conditional aggregation and thresholds** to flag students who might benefit from tutoring, office hours, or academic advising before they fail.

### Problem Statement

Identify students whose **first quiz score is below 75%**. These students are at higher statistical risk of poor outcomes and should be flagged for proactive advising or tutoring in the second half of the semester.

### Recommended SQL Approach

Use a subquery or CTE to isolate first quiz scores, then filter for the at-risk threshold.

### SQLite Query

```sql
-- Chapter 15, Exercise 3: Early Warning Indicator
-- Uses: Subqueries (Ch5, Ch8), WITH/CTE (Ch8), CASE conditional

WITH FirstQuizOnly AS (
    SELECT
        s.StudentID,
        s.FirstName,
        s.LastName,
        sg.Score AS FirstQuizScore,
        MIN(d.DeliverableNumber) AS IsFirstDeliverable
    FROM STUDENT s
    JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
    JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
    WHERE d.Type = 'Quiz'
    GROUP BY s.StudentID, s.FirstName, s.LastName, sg.Score
    HAVING d.DeliverableNumber = MIN(d.DeliverableNumber)
)
SELECT
    StudentID,
    FirstName || ' ' || LastName AS StudentName,
    FirstQuizScore,
    CASE
        WHEN FirstQuizScore < 70 THEN 'Urgent: Require tutoring'
        WHEN FirstQuizScore < 75 THEN 'At risk: Encourage office hours'
        ELSE 'On track'
    END AS InterventionLevel,
    'Contact advisor within 1 week' AS RecommendedAction
FROM FirstQuizOnly
ORDER BY FirstQuizScore ASC;
```

### Expected Output (Sample)

| StudentID | StudentName | FirstQuizScore | InterventionLevel | RecommendedAction |
|---|---|---|---|---|
| 2 | James Chen | 78 | On track | Contact advisor within 1 week |
| 1 | Maria Santos | 92 | On track | Contact advisor within 1 week |
| 3 | Aisha Rahman | 88 | On track | Contact advisor within 1 week |

### Strategic Interpretation

In this sample data, all students are on track. But in a real semester, students scoring below 75 on the first quiz should be contacted early. Research shows that quiz performance in the first 3-4 weeks is one of the strongest predictors of final grade (Marbouti et al., 2016). Early intervention at this stage is cost-effective and high-impact.

### Operational Implications

Create a **standing query** that runs automatically after each quiz and flags at-risk students. Academic advisors or instructors can then reach out proactively with:
- Tutoring or study group recommendations
- Office hour invitations
- Specific skill-building resources

This transforms the database from a **record-keeping tool** (what happened) into a **decision-support tool** (what should we do).

---

## Exercise 4: Scenario Testing – Impact of Policy Decisions

**Strategic Question:** *What if we drop the lowest quiz score? How would grades change?*

Strategic decisions often involve policies that affect outcomes. This exercise uses **CTEs and conditional logic** to test "what-if" scenarios before implementing them institution-wide.

### Problem Statement

Many instructors drop the lowest quiz score to reduce test anxiety and reward improvement. Compute each student's quiz average **with and without dropping the lowest score**. Evaluate whether this policy is fair (does it disproportionately benefit or hurt any group?) and whether it achieves its goal (improving the average significantly).

### Recommended SQL Approach

Use a CTE to rank quiz scores from lowest to highest per student, then compute averages excluding the lowest-ranked quiz.

### SQLite Query

```sql
-- Chapter 15, Exercise 4: Scenario Testing – Drop Lowest Quiz
-- Uses: Window functions for ranking (Ch8), CTE (Ch8), conditional aggregation

WITH QuizzesByStudent AS (
    SELECT
        s.StudentID,
        s.FirstName,
        s.LastName,
        sg.Score,
        ROW_NUMBER() OVER (
            PARTITION BY s.StudentID
            ORDER BY sg.Score ASC  -- Lowest to highest
        ) AS ScoreRank
    FROM STUDENT s
    JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID
    JOIN DELIVERABLE d ON sg.DeliverableID = d.DeliverableID
    WHERE d.Type = 'Quiz'
),
QuizAverages AS (
    SELECT
        StudentID,
        FirstName,
        LastName,
        ROUND(AVG(Score), 2) AS AllQuizzesAverage
    FROM QuizzesByStudent
    GROUP BY StudentID, FirstName, LastName
),
QuizzesWithoutLowest AS (
    SELECT
        StudentID,
        FirstName,
        LastName,
        ROUND(AVG(Score), 2) AS AverageWithoutLowest
    FROM QuizzesByStudent
    WHERE ScoreRank > 1  -- Exclude the lowest (ScoreRank = 1)
    GROUP BY StudentID, FirstName, LastName
)
SELECT
    qa.StudentID,
    qa.FirstName || ' ' || qa.LastName AS StudentName,
    qa.AllQuizzesAverage,
    qwl.AverageWithoutLowest,
    ROUND(qwl.AverageWithoutLowest - qa.AllQuizzesAverage, 2) AS PointsGained
FROM QuizAverages qa
LEFT JOIN QuizzesWithoutLowest qwl
    ON qa.StudentID = qwl.StudentID
ORDER BY PointsGained DESC;
```

### Expected Output (Sample)

| StudentID | StudentName | AllQuizzesAverage | AverageWithoutLowest | PointsGained |
|---|---|---|---|---|
| 2 | James Chen | 75.00 | 75.00 | 0.00 |
| 1 | Maria Santos | 88.50 | 89.50 | 1.00 |
| 3 | Aisha Rahman | 86.00 | 87.50 | 1.50 |

### Strategic Interpretation

* **Maria Santos:** Gains 1 point. Her low quiz was 85; dropping it helps slightly.
* **James Chen:** Gains 0 points. His quizzes are closely bunched (78, 72), so dropping the 72 still leaves a 78 average. His problem is not a single bad quiz; it is consistent struggle.
* **Aisha Rahman:** Gains 1.5 points. Her first quiz (80) was notably lower than subsequent ones (88, 88), suggesting improvement.

**Policy Evaluation:**

The "drop lowest quiz" policy:
- ✅ **Rewards improvement:** Aisha's gain correlates with her demonstrated improvement.
- ❌ **Does not help consistently struggling students:** James, who needs help most, gains nothing.
- ✅ **Is fair:** It treats all students by the same rule, not arbitrarily favoring some.

**Alternative Policy:** Instead of dropping, weight later quizzes more heavily or provide unlimited retakes of earlier quizzes. This would better incentivize improvement than a one-time drop.

### MS Access Alternative

MS Access does not support window function ranking. Use a more complex CTE based on self-joins:

```sql
-- MS Access: Drop Lowest Using Self-Join
-- [Complex; check chapter 8's Access window function alternatives]
```

---

## Exercise 5: Comparative Analysis – Cross-Section Consistency

**Strategic Question:** *Do students in different course sections receive equivalent instruction and assessment?*

Strategic quality assurance requires consistency. This exercise uses **aggregation and comparative grouping** to evaluate whether students have equal opportunity across instructors or sections.

### Problem Statement

Group students by course section (if that data exists in your DELIVERABLE table). For each section, compute average scores on each deliverable. Identify sections where average performance is consistently higher or lower, which might indicate instructor/curriculum differences.

### Variant (Using Available Data):

If your database lacks section data, compute averages **by deliverable type** (Quiz vs. Exam). Compare average performance to identify whether students do significantly better on one type than another, which might guide curriculum design.

### SQLite Query – By Deliverable Type

```sql
-- Chapter 15, Exercise 5: Comparative Analysis by Assessment Type
-- Uses: Aggregation (Ch5), GROUP BY, CASE for categories

SELECT
    d.Type AS AssessmentType,
    COUNT(DISTINCT sg.StudentID) AS StudentCount,
    COUNT(sg.GradeID) AS TotalScores,
    ROUND(AVG(sg.Score), 2) AS AverageScore,
    MIN(sg.Score) AS MinScore,
    MAX(sg.Score) AS MaxScore,
    ROUND(
        AVG(CASE WHEN sg.Score >= 90 THEN 1 ELSE 0 END) * 100, 1
    ) AS PercentA,
    ROUND(
        AVG(CASE WHEN sg.Score >= 80 AND sg.Score < 90 THEN 1 ELSE 0 END) * 100, 1
    ) AS PercentB,
    ROUND(
        AVG(CASE WHEN sg.Score < 80 THEN 1 ELSE 0 END) * 100, 1
    ) AS PercentBelowB
FROM DELIVERABLE d
LEFT JOIN STUDENT_GRADE sg ON d.DeliverableID = sg.DeliverableID
GROUP BY d.Type
ORDER BY AverageScore DESC;
```

### Expected Output (Sample)

| AssessmentType | StudentCount | TotalScores | AverageScore | MinScore | MaxScore | PercentA | PercentB | PercentBelowB |
|---|---|---|---|---|---|---|---|---|
| Quiz | 3 | 6 | 79.33 | 72 | 92 | 16.67 | 50.00 | 33.33 |
| Exam | 3 | 3 | 80.67 | 70 | 90 | 33.33 | 33.33 | 33.33 |

### Strategic Interpretation

* **Quiz average (79.33) vs. Exam average (80.67):** Quiz average is slightly lower, which is common because quizzes have tighter timing constraints. The difference is not dramatic, suggesting course design is consistent.

* **Grade distribution:** Quizzes show more variability (16.67% A's, 50% B's, 33.33% below B) compared to exams (33.33% A's, 33.33% B's, 33.33% below B). This might indicate quizzes are better at early evaluation, while the exam is a leveler (everyone gets a chance on comprehensive material).

* **Quality assurance question:** If multiple sections or instructors exist, this query could be modified to group by section/instructor and compare distributions. Significant differences would warrant investigation (different preparation, different teaching style, different assessment rigor).

---

## Challenge Continuation: Your Own Strategic Question

These five exercises cover key frameworks introduced in Chapter 15:
- **Exercise 1:** Trend analysis (velocity and feedback loops)
- **Exercise 2:** Assessment quality (alignment with learning goals)
- **Exercise 3:** Early warning (proactive intervention, decision support)
- **Exercise 4:** Scenario testing (policy evaluation before implementation)
- **Exercise 5:** Comparative analysis (learning consistency across contexts)

### In Your Own Grading Database:

1. **Extend Exercise 1:** Compute the angle or slope of improvement. Which students are improving fastest? Are they maintaining that improvement?

2. **Extend Exercise 2:** If you have multiple instructors, redo Exercise 2 by instructor. Do different instructors use assessments with different discriminatory power? What does that reveal?

3. **Extend Exercise 3:** Add a second threshold based on trend. Flag students whose running average is crossing below 75%, even if their first quiz was high. Combine with Exercise 1.

4. **Extend Exercise 4:** Test alternative policies: weight later quizzes more, drop lowest exam, use weighted average rather than simple average. Compare outcomes.

5. **Extend Exercise 5:** If you have a rich enough dataset, segment students by major, year, or background. Are outcomes consistent across groups? Does this reveal biases in assessment or instruction?

---

## Connecting to Chapter 15 Concepts

Each exercise demonstrates how **advanced SQL translates strategic questions into actionable insight**:

| Exercise | Chapter 15 Concept | SQL Technique | Strategic Impact |
|---|---|---|---|---|
| 1: Trend | Velocity, Feedback loops | Window functions, LAG() | Enables early advisement before failure |
| 2: Discrimination | Strategic alignment | Aggregation, CASE | Improves assessment calibration |
| 3: Early warning | Proactive decision-making | CTE, WHERE threshold | Shifts from reactive to proactive |
| 4: Scenario | Policy testing, risk mitigation | CTE, conditional logic | Enables evidence-based decisions |
| 5: Comparative | Learning consistency, quality assurance | Grouping, CASE for categories | Identifies systemic issues |

The progression reflects strategic maturity: moving from **understanding** (what happened) to **detecting** (what's at risk) to **testing** (what should we do) to **assuring** (is it working fairly).

---

## Technical Notes

### SQLite Implementation

All queries are written for **SQLite 3.8+**. Key features used:
- Window functions with OVER, PARTITION BY, ORDER BY (available in SQLite 3.25+)
- CTEs with WITH clause
- String concatenation with ||
- ROUND() for numeric precision

### MS Access Limitations

MS Access lacks window functions. For complex analytics, use:
1. **Subqueries** in SELECT (slower but functional)
2. **Self-joins** to compute running aggregates
3. **VBA functions** for row-by-row calculation (advanced)
4. **Export to Excel** for scenario modeling using spreadsheet functions

### Performance Considerations

As your Grading Database grows beyond 10,000 grades:
- **Index StudentID and DeliverableID** in STUDENT_GRADE for faster joins
- **Add a CourseSection column** to STUDENT to enable section-level analysis
- **Use materialized views** for frequently-run reports (Exercise 2, 5)
- **Archive old semester data** to a separate table to keep active queries fast

---

## References & Further Reading

Marbouti, F., Diefes-Dux, H. A., & Madhavan, K. (2016). Models for early prediction of at-risk students in a course using standards-based grading. *Computers & Education*, 103, 1-13.

Siemens, G., & Baker, R. S. (2012). Learning analytics and educational data mining: Towards communication and collaboration. *Journal of Learning Analytics and Knowledge*, 2(1), 1-71.

---

*Companion file for Chapter 15: Business Strategy and Information Systems*
*Grading Database exercises written for BITM330 database course*
*Updated: 2026-03-09*

