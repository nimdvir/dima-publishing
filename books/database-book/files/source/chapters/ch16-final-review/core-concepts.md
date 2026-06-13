<!-- metadata: date="2026-05-18"; chapter="16"; section="main"; title="Chapter 16 – Final Integration: Project, Test, and Course Synthesis"; description="Guides students through the final database project and final test, integrating relational design, Microsoft Access, SQL, macros, DBA concepts, BI, normalization, and strategic information systems thinking." -->
# Chapter 16: Final Integration

*From Database Student to Information Systems Thinker*

The final chapter brings the course together.

Across the semester, you learned how to move from raw data to structured tables, from tables to relationships, from relationships to SQL queries, from queries to analytics, and from analytics to decisions. You also learned that databases are not merely technical objects. They are information systems that support accountability, performance measurement, automation, governance, and strategic decision-making.

This chapter prepares you for the two final assessments:

1. **The Final Project**, where you complete and document your own grading database in Microsoft Access.
2. **The Final Test**, where you analyze a separate research-publications database and answer conceptual and query-based questions.

The final assessments are intentionally different. The project asks you to **build, document, and explain** a database system. The test asks you to **read, analyze, and reason from** an existing database system. Together, they measure the central skills of the course: design, querying, interpretation, automation, administration, and business intelligence.

---

## Chapter Roadmap

| Section | Focus | Main Skill |
|---|---|---|
| 16.1 | Final integration | Seeing the course as one connected system |
| 16.2 | Final project overview | Understanding deliverables and expectations |
| 16.3 | Final project tasks | Completing the grading database project |
| 16.4 | Project SQL guidance | Writing Access queries clearly and correctly |
| 16.5 | Final test overview | Understanding the research-publications database |
| 16.6 | Publication scoring logic | Calculating author, professor, and department scores |
| 16.7 | Final test question map | Preparing by topic rather than memorization |
| 16.8 | Concept review for the test | Cardinality, normalization, BI, macros, security, and transactions |
| 16.9 | Submission and quality checklist | Avoiding avoidable mistakes |
| 16.10 | Final reflection | Connecting technical skill to professional judgment |

---

## Learning Objectives

After completing this chapter, you will be able to:

1. Prepare a complete Microsoft Access grading database for final submission.
2. Document an ERD, table creation code, queries, macros, and analytical results clearly.
3. Write Access SQL queries that calculate attendance, deliverable performance, final grades, letter grades, minimum possible grades, and maximum possible grades.
4. Explain how macros can automate grade calculation and report generation.
5. Describe core DBA functions, including security, backup and recovery, concurrency control, and integrity management.
6. Explain how a database can support business intelligence and decision-making.
7. Analyze a research-publications database using joins, aggregation, scoring rules, and relationship logic.
8. Interpret cardinality and participation constraints in a normalized schema.
9. Evaluate database limitations, normalization problems, BI potential, and access-control policies.
10. Connect the full course arc to practical information systems work.

---

## 16.1 The Final Integration Point

The final assessments are not separate from the rest of the course. They are the course.

The **Final Project** asks you to show that you can build a working database around a business problem. In this case, the business problem is grade management. You must show that your database can store student records, track attendance, calculate performance, produce final grades, automate reports, and support decision-making.

The **Final Test** asks you to analyze a different database: a university research-publications database. This database includes professors, departments, journals, publications, journal rating scores, and authorship records. You will use it to calculate publication scores, identify collaboration patterns, evaluate departmental performance, interpret relationships, and reason about database limitations.

Together, the two assessments measure both sides of database competence:

| Competence | Final Project | Final Test |
|---|---|---|
| Database design | Build your own grading database | Read an existing publications schema |
| ERD thinking | Create and document an ERD | Interpret relationships and cardinality |
| SQL | Write and document queries | Use SQL logic to answer analytical questions |
| Normalization | Design tables properly | Identify normalization strengths and weaknesses |
| Automation | Create macros | Interpret macro designs |
| DBA thinking | Explain maintenance functions | Apply security, transaction, and concurrency concepts |
| BI thinking | Describe decision-support uses | Identify strategic and analytical decisions supported by data |

A student who succeeds in both assessments is not merely “good at Access.” They can think like a database designer, analyst, administrator, and decision-maker.

---

# Part I: The Final Project

## 16.2 Final Project Overview

For the final project, you will complete a series of tasks using the **grading database** you built throughout the course. The database should track and calculate grades for yourself and at least one additional fictional student.

Every SQL query should generate results for **all students**, and every result should clearly identify which score belongs to which student. The purpose is not just to get correct numbers. The purpose is to demonstrate that you can design, query, analyze, automate, and explain a relational database.

### Required Submission Files

You must submit **two files only**:

| File | Required Contents |
|---|---|
| **Microsoft Access file (`.accdb`)** | Your completed grading database, including tables, relationships, queries, macros, and any reports/forms used. |
| **PDF document** | A complete written report containing each task, SQL code, final results, ERD screenshot, macro screenshots, and explanations where required. |

Do **not** submit separate photos, screenshots, loose images, or multiple documents. Everything must be placed inside the final PDF.

### Query Naming Requirement

In your Access file, name your queries after the task they answer. Use clear names such as:

```text
Task3_Attendance_To_Date
Task4_Append_Attendance_Score
Task5_Deliverable_Summary_To_Date
Task6_Final_Grade_Up_To_Date
Task7_Letter_Grade
Task8_Minimum_Final_Grade
Task9_Maximum_Final_Grade
```

Clear query names make your database easier to grade, easier to debug, and easier to maintain. “Query1” is not a professional naming convention. It is a cry for help in database form.

### PDF Formatting Requirement

Each task in your PDF should follow this format:

```markdown
**Task X: Task Title**

Answer/explanation goes here.

**SQL Code:**

```sql
SELECT ...
```

**Final Result:**

Paste the output table here.

**Screenshot:**

Paste ERD, macro, report, or relevant Access screenshot if required.
```

For every SQL task, include the SQL code as **text**, not only as a screenshot. Screenshots are helpful for evidence, but text SQL is needed for review and feedback.

---

## 16.3 Final Project Tasks

### Task 1: Entity Relationship Diagram (ERD)

#### Objective

Demonstrate your understanding of database structure and design by creating a detailed ERD that accurately represents your grading database.

#### Instructions

Use **Lucidchart** to create your ERD. Include:

- All tables in your grading database.
- Primary keys and data types.
- Relationships between tables.
- Cardinality and participation constraints, including minimum and maximum values.

#### Submission Format

Export your ERD as an image, such as PNG or JPEG, and paste it directly into your PDF under Task 1. Label it:

```text
Figure 1. Entity Relationship Diagram of the Grading Database.
```

#### What a Strong ERD Shows

A strong ERD should make it easy to answer questions such as:

- Which table stores students?
- Which table stores deliverables or assignment types?
- Which table records individual student grades?
- Which table records attendance?
- Which table stores grading weights?
- Which table maps numeric grades to letter grades?
- Where are the primary keys?
- Where are the foreign keys?
- Which side of each relationship is one, and which side is many?

A good ERD is not decoration. It is the blueprint of your database.

---

### Task 2: SQL Table Creation Code

#### Objective

Translate your conceptual database design into SQL schema code.

#### Instructions

Use Lucidchart’s export function if helpful, then revise the SQL syntax for **Microsoft Access**. Include table names, fields, data types, primary keys, foreign keys, and constraints where possible.

#### Example

```sql
CREATE TABLE STUDENT (
    StudentID AUTOINCREMENT PRIMARY KEY,
    FirstName TEXT(50),
    LastName TEXT(50),
    Email TEXT(100)
);

CREATE TABLE DELIVERABLE (
    DeliverableID AUTOINCREMENT PRIMARY KEY,
    DeliverableType TEXT(50),
    DeliverableNumber INTEGER,
    DueDate DATE,
    MaxScore DOUBLE
);

CREATE TABLE STUDENT_GRADE (
    StudentGradeID AUTOINCREMENT PRIMARY KEY,
    StudentID LONG,
    DeliverableID LONG,
    Score DOUBLE,
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (DeliverableID) REFERENCES DELIVERABLE(DeliverableID)
);
```

Access SQL has limitations compared with PostgreSQL or SQLite. If Access does not support a constraint directly in a `CREATE TABLE` statement, explain how you enforced the rule visually through table design, relationships, validation rules, or indexed fields.

---

### Task 3: Attendance Query To Date

#### Objective

Aggregate and calculate each student’s attendance percentage up to the cutoff date. Use **May 1, 2026** as the cutoff date unless your instructor specifies otherwise. Do not include canceled classes. Include only classes where attendance was recorded.

#### Required Output

Your query should output:

- Student name.
- Number of classes attended.
- Number of classes not attended.
- Attendance percentage.
- Weighted points maximum.
- Weighted points earned.

The weighted points earned should follow this logic:

```text
Weighted Points Earned = Attendance Percentage × Attendance Weight
```

#### Access SQL Template

Adapt the table and field names to match your database.

```sql
SELECT
    S.StudentID,
    S.FirstName & " " & S.LastName AS StudentName,
    Sum(IIf(A.Attended=True,1,0)) AS ClassesAttended,
    Sum(IIf(A.Attended=False,1,0)) AS ClassesNotAttended,
    Round(
        100 * Sum(IIf(A.Attended=True,1,0)) / Count(A.AttendanceID),
        2
    ) AS AttendancePercentage,
    W.Weight AS WeightedPointsMax,
    Round(
        (Sum(IIf(A.Attended=True,1,0)) / Count(A.AttendanceID)) * W.Weight,
        2
    ) AS WeightedPointsEarned
FROM
    ((STUDENT AS S
    INNER JOIN ATTENDANCE AS A
        ON S.StudentID = A.StudentID)
    INNER JOIN SCHEDULE AS C
        ON A.ClassNum = C.ClassNum),
    GRADE_WEIGHT AS W
WHERE
    C.ClassDate <= #5/1/2026#
    AND Nz(C.Canceled, False) = False
    AND W.DeliverableType = "Attendance"
GROUP BY
    S.StudentID,
    S.FirstName,
    S.LastName,
    W.Weight;
```

#### Important Notes

- If your attendance field uses `1/0` instead of `True/False`, adjust the `IIf()` expressions.
- If your schedule table uses a different field name than `ClassDate`, use your field name.
- If you do not have a `Canceled` field, explain how you excluded canceled classes or why none were included.
- Always show results for all students.

---

### Task 4: Append Attendance Score to the `STUDENT_GRADE` Table

#### Objective

Once you calculate attendance percentages, append those attendance scores to the `STUDENT_GRADE` table so attendance is counted in the final grade calculation.

Use the cutoff date specified by the task. If the instruction says **April 30, 2026**, use `#4/30/2026#`. If it says **May 1, 2026**, use `#5/1/2026#`. The point is to be consistent and document your choice.

#### Required Append Fields

Append:

- `StudentID`
- `DeliverableID`
- `Score`

The `DeliverableID` should correspond to the attendance or participation deliverable from your deliverable/weight table.

#### Access SQL Template

A safe version uses a saved query from Task 3 and prevents duplicate attendance rows.

```sql
INSERT INTO STUDENT_GRADE (StudentID, DeliverableID, Score)
SELECT
    Q.StudentID,
    D.DeliverableID,
    Q.AttendancePercentage AS Score
FROM
    Task3_Attendance_To_Date AS Q,
    DELIVERABLE AS D
WHERE
    D.DeliverableType = "Attendance"
    AND NOT EXISTS (
        SELECT *
        FROM STUDENT_GRADE AS SG
        WHERE SG.StudentID = Q.StudentID
          AND SG.DeliverableID = D.DeliverableID
    );
```

#### Why This Matters

Appending attendance makes participation part of the same grading structure as quizzes, projects, and exams. This is a good database design principle: similar facts should be stored in a consistent way.

---

### Task 5: Deliverable Summary Query To Date

#### Objective

Aggregate and calculate student performance across deliverable types, such as quizzes, projects, labs, and exams, up to the cutoff date.

#### Required Output

Your query should output:

- Student name.
- Deliverable type.
- Quantity completed.
- Average score.
- Weighted points maximum.
- Weighted points earned.

#### Access SQL Template

```sql
SELECT
    S.StudentID,
    S.FirstName & " " & S.LastName AS StudentName,
    D.DeliverableType,
    Count(SG.StudentGradeID) AS QuantityCompleted,
    Round(Avg(SG.Score), 2) AS AverageScore,
    W.Weight AS WeightedPointsMax,
    Round((Avg(SG.Score) / 100) * W.Weight, 2) AS WeightedPointsEarned
FROM
    ((STUDENT AS S
    INNER JOIN STUDENT_GRADE AS SG
        ON S.StudentID = SG.StudentID)
    INNER JOIN DELIVERABLE AS D
        ON SG.DeliverableID = D.DeliverableID)
    INNER JOIN GRADE_WEIGHT AS W
        ON D.DeliverableType = W.DeliverableType
WHERE
    D.DueDate <= #4/30/2026#
GROUP BY
    S.StudentID,
    S.FirstName,
    S.LastName,
    D.DeliverableType,
    W.Weight
ORDER BY
    S.LastName,
    S.FirstName,
    D.DeliverableType;
```

#### Good Practice

Do not hard-code student names. Your query should work if a third or fourth student is added.

---

### Task 6: Final Grade Calculation Query Up to Date

#### Objective

Compute cumulative performance across deliverable types up to the date specified in the project. The final grade should be calculated as the sum of weighted points earned.

#### Required Output

- Student name.
- Final grade up to date.
- Format to two decimals.

#### Access SQL Template

This query assumes Task 5 already calculates weighted points earned per student and deliverable type.

```sql
SELECT
    Q.StudentID,
    Q.StudentName,
    Round(Sum(Q.WeightedPointsEarned), 2) AS FinalGradeUpToDate
FROM
    Task5_Deliverable_Summary_To_Date AS Q
GROUP BY
    Q.StudentID,
    Q.StudentName
ORDER BY
    Q.StudentName;
```

#### Critical Interpretation

This task should calculate performance **up to date**. It should not include future deliverables such as the final test or final project if those have not yet been graded.

The hint is important: calculate points earned as a percentage of the total points available up to date. Do not accidentally divide by the full semester weight if some major deliverables have not yet occurred.

---

### Task 7: Letter Grade Calculation Queries

#### Objective

Map numeric grades to letter grades using a lookup table.

#### Step 1: Create a Letter Grade Scale Table

Example:

```sql
CREATE TABLE LETTER_GRADE_SCALE (
    LetterGrade TEXT(5),
    MinScore DOUBLE,
    MaxScore DOUBLE
);
```

Example data:

| LetterGrade | MinScore | MaxScore |
|---|---:|---:|
| A | 93 | 100 |
| A- | 90 | 92.99 |
| B+ | 87 | 89.99 |
| B | 83 | 86.99 |
| B- | 80 | 82.99 |
| C+ | 77 | 79.99 |
| C | 73 | 76.99 |
| C- | 70 | 72.99 |
| D | 60 | 69.99 |
| F | 0 | 59.99 |

#### Step 2: Join Numeric Grades to Letter Grades

```sql
SELECT
    F.StudentID,
    F.StudentName,
    F.FinalGradeUpToDate,
    L.LetterGrade
FROM
    Task6_Final_Grade_Up_To_Date AS F
    INNER JOIN LETTER_GRADE_SCALE AS L
        ON F.FinalGradeUpToDate BETWEEN L.MinScore AND L.MaxScore
ORDER BY
    F.FinalGradeUpToDate DESC;
```

#### Why This Matters

The letter grade table is a lookup table. This is better than writing a long `IIf()` formula because the grading scale is stored as data and can be updated without rewriting the query.

---

### Task 8: Minimum Grade Analysis

#### Objective

Estimate the lowest possible final grade if all missing work receives a score of zero.

#### Required Output

- Student name.
- Minimum possible final grade, formatted to two decimals.

#### Logic

For every student and every deliverable, check whether a grade exists. If a grade is missing, treat it as zero.

#### Access SQL Template

```sql
SELECT
    S.StudentID,
    S.FirstName & " " & S.LastName AS StudentName,
    Round(
        Sum((Nz(SG.Score,0) / 100) * W.Weight),
        2
    ) AS MinimumPossibleFinalGrade
FROM
    ((STUDENT AS S
    INNER JOIN DELIVERABLE AS D
        ON 1=1)
    INNER JOIN GRADE_WEIGHT AS W
        ON D.DeliverableType = W.DeliverableType)
    LEFT JOIN STUDENT_GRADE AS SG
        ON S.StudentID = SG.StudentID
       AND D.DeliverableID = SG.DeliverableID
GROUP BY
    S.StudentID,
    S.FirstName,
    S.LastName
ORDER BY
    StudentName;
```

#### Note About Cross Joins in Access

Access does not always make cross joins obvious. The expression `ON 1=1` is a way to pair each student with each deliverable. If Access rejects this syntax, create a saved query that lists all student-deliverable combinations, then left join grades to that query.

---

### Task 9: Maximum Grade Analysis

#### Objective

Estimate the best possible final grade if all pending or missing deliverables receive a perfect score.

#### Required Output

- Student name.
- Maximum possible final grade, formatted to two decimals.

#### Access SQL Template

```sql
SELECT
    S.StudentID,
    S.FirstName & " " & S.LastName AS StudentName,
    Round(
        Sum((Nz(SG.Score,100) / 100) * W.Weight),
        2
    ) AS MaximumPossibleFinalGrade
FROM
    ((STUDENT AS S
    INNER JOIN DELIVERABLE AS D
        ON 1=1)
    INNER JOIN GRADE_WEIGHT AS W
        ON D.DeliverableType = W.DeliverableType)
    LEFT JOIN STUDENT_GRADE AS SG
        ON S.StudentID = SG.StudentID
       AND D.DeliverableID = SG.DeliverableID
GROUP BY
    S.StudentID,
    S.FirstName,
    S.LastName
ORDER BY
    StudentName;
```

#### Interpretation

Task 8 answers: “How bad could the final grade become if nothing else is submitted?”

Task 9 answers: “How high could the final grade become if every missing item receives 100?”

Together, these queries create a realistic grade range.

---

### Task 10: Macro Development and Automation

#### Objective

Develop macros to automate grade calculation and report generation.

### Macro 1: Calculate Final Grades and Letter Grades

#### Required Name

```text
Calculate_Final_And_Letter_Grades
```

#### Purpose

Automates final grade and letter grade calculations.

#### Suggested Functionality

- Runs the final grade query.
- Runs the letter grade query.
- Refreshes relevant tables, forms, or reports.
- Ensures grade outputs stay current with one click.

#### What to Submit

- A 2–3 line macro description.
- A screenshot of the Macro Designer.
- A screenshot showing the macro outcome.

### Macro 2: Generate Grade Reports

#### Purpose

Automates the creation or display of updated grade summaries.

#### Suggested Functionality

- Calculates maximum final grade.
- Calculates corresponding letter grade.
- Generates or opens a report with all students’ names, final grades, and letter grades.

#### What to Submit

- A 2–3 line macro description.
- A Macro Designer screenshot.
- An outcome screenshot, such as an opened report or exported summary.

#### Good Macro Design

A good macro should have a clear purpose, a logical sequence, and a visible outcome. A macro that runs five unrelated actions is not automation. It is chaos with a button.

---

### Task 11: Database Administration Functions

#### Objective

Identify and describe three key DBA functions needed to maintain your grading database.

Choose three of the following, or propose equivalent functions:

| DBA Function | Purpose |
|---|---|
| **Concurrency control** | Prevents conflicting simultaneous updates. |
| **Security management** | Protects confidential student data. |
| **Backup and recovery** | Allows restoration after data loss or corruption. |
| **Data integrity management** | Ensures relationships, constraints, and valid values remain correct. |
| **Performance monitoring** | Ensures queries and reports remain usable as data grows. |

#### Submission Requirement

Provide **1–2 paragraphs per function**, describing:

- Purpose.
- Implementation details.
- Expected outcomes.

#### Example

**Backup and Recovery:** The grading database should be backed up before major changes, before final grade calculation, and before submission. In Access, this can be done by closing the database and saving a timestamped copy of the `.accdb` file. The expected outcome is that if a query, macro, or append operation damages the data, the database can be restored to a known working version.

---

### Task 12: Business Intelligence Functions

#### Objective

Demonstrate how your grading database can support decision-making using BI concepts. Provide at least **three original examples**.

#### Example BI Functions

Do not simply copy these. Use them as models.

| BI Function | Purpose | Actionable Insight |
|---|---|---|
| Early-risk dashboard | Identify students at risk before the final | Instructor can intervene earlier |
| Deliverable difficulty report | Compare average scores by assignment type | Instructor can redesign weak assessments |
| Attendance-performance comparison | Connect attendance patterns to outcomes | Instructor can evaluate participation policy |

#### Submission Requirement

For each BI function, describe:

- Purpose.
- Implementation details.
- Actionable insight.

Optional bonus: include sample charts or dashboard screenshots.

#### Strong Original Examples

Strong examples might include:

- A dashboard that compares current grade to maximum possible grade.
- A report that identifies which assignment types produce the widest performance gaps.
- A chart showing whether attendance decline predicts score decline.
- A student progress report showing running averages over time.
- A data-quality dashboard listing missing scores, missing attendance rows, or duplicate grade records.

---

### Task 13: Final Reflection and Learning Outcomes

#### Objective

Reflect on what you learned about database design, automation, analysis, and information systems.

#### Required Length

Write **250–300 words**.

#### Reflection Questions

Address the following:

- What was the most challenging part of designing and managing your database?
- How did SQL, ERDs, and macros change your understanding of data systems?
- How can these skills apply to real-world business or education settings?
- What new questions or ideas about data and BI emerged for you?
- What were the strengths and weaknesses of this class?
- What would you suggest as improvements for future semesters?

#### What a Strong Reflection Does

A strong reflection connects technical work to learning. It does not merely say “I learned SQL.” It explains how database thinking changed the way you understand structure, evidence, automation, and decision-making.

---

## 16.4 Project SQL Guidance and Common Pitfalls

### Use Saved Queries as Building Blocks

Complex Access projects are easier when you use saved queries as layers.

A recommended sequence:

```text
Task3_Attendance_To_Date
        ↓
Task4_Append_Attendance_Score
        ↓
Task5_Deliverable_Summary_To_Date
        ↓
Task6_Final_Grade_Up_To_Date
        ↓
Task7_Letter_Grade
        ↓
Task8_Minimum_Final_Grade
        ↓
Task9_Maximum_Final_Grade
```

This is the same principle behind views and CTEs from earlier chapters: break complex logic into smaller, testable parts.

### Use Access Date Literals Correctly

Access uses `#` around date values:

```sql
WHERE DueDate <= #5/1/2026#
```

Do not write:

```sql
WHERE DueDate <= '5/1/2026'
```

That may work in other SQL dialects, but it is not the correct Access style.

### Do Not Confuse Zero and NULL

A missing grade is not the same thing as a zero unless the assignment policy says it should be treated as zero.

Use `Nz()` when you deliberately want to replace NULL:

```sql
Nz(Score, 0)
Nz(Score, 100)
```

Task 8 uses `Nz(Score,0)` because it estimates the minimum possible grade. Task 9 uses `Nz(Score,100)` because it estimates the maximum possible grade.

### Do Not Average Averages Carelessly

If assignment types have different weights, do not calculate the final grade by simply averaging category averages. Use the weight table.

Correct logic:

```text
Weighted Points Earned = Average Score × Category Weight
Final Grade = Sum of Weighted Points Earned
```

### Show All Students

Most project queries should include all students. When students with missing data disappear from your results, the likely cause is an `INNER JOIN` where a `LEFT JOIN` would be more appropriate.

---

# Part II: The Final Test

## 16.5 Final Test Overview: The Research Publications Database

The final test uses a separate Microsoft Access database about university research publications. The database includes information about:

- Professors.
- Departments.
- Scholarly publications.
- Journals.
- Journal rating scores.
- Authorship and collaboration.

The database is accessed through the link provided in the test instructions:

```text
https://drive.google.com/file/d/1Ppp3NL7z5-tJygTwd8ww_G11mtcigm9-/view?usp=sharing
```

### Database Schema

The database includes six tables:

```text
DEPARTMENT (DepartmentID, DepartmentName)

PROFESSOR (ProfID, LastName, FirstName, DepartmentID)

JOURNAL_SCORE (Rating, Score)

JOURNAL (JournalID, JournalTitle, Publisher, RatingGroup)

PUBLICATION (PubID, PubTitle, JournalID)

PUBLICATION_AUTHOR (AuthorID, PubID, ProfID)
```

### Basic Meaning of Each Table

| Table | What It Stores | Key Idea |
|---|---|---|
| `DEPARTMENT` | Academic departments | One department can have many professors |
| `PROFESSOR` | Faculty members | Each professor belongs to one department |
| `JOURNAL_SCORE` | Rating categories and point values | A*, A, B, C ratings map to scores |
| `JOURNAL` | Journals and publishers | Each journal has one rating group |
| `PUBLICATION` | Publication titles and journals | Each publication appears in one journal |
| `PUBLICATION_AUTHOR` | Authorship records | Links professors to publications |

### Core Relationship Structure

```text
DEPARTMENT 1 ---- many PROFESSOR

JOURNAL_SCORE 1 ---- many JOURNAL

JOURNAL 1 ---- many PUBLICATION

PROFESSOR 1 ---- many PUBLICATION_AUTHOR

PUBLICATION 1 ---- many PUBLICATION_AUTHOR
```

The table `PUBLICATION_AUTHOR` resolves the many-to-many relationship between professors and publications:

```text
PROFESSOR many ---- many PUBLICATION
```

becomes:

```text
PROFESSOR 1 ---- many PUBLICATION_AUTHOR
PUBLICATION 1 ---- many PUBLICATION_AUTHOR
```

This structure should look familiar. It is the same logic as the grading database relationship between students and deliverables through `STUDENT_GRADE`.

---

## 16.6 Publication Scoring Logic

The most important calculation in the final test is the publication score.

### Scoring Rule

Each journal rating has a point value. A publication’s total value is divided equally among its authors.

```text
Professor credit for one publication =
Journal Score / Number of Authors on that Publication
```

### Example

If a publication appears in a journal rated **A**, and the A rating is worth **10 points**, and the publication has **4 authors**, each professor receives:

```text
10 / 4 = 2.5 points
```

A professor’s total publication score is the sum of their credits across all publications.

A department’s score can be calculated by aggregating the scores of professors in that department.

### Validation Checks

The test instructions provide three useful validation checks:

| Check | Expected Value |
|---|---:|
| Prof. #1 Jane Taylor total publication score | 77.08 |
| Prof. #10 Sarah Miller total publication score | 37.08 |
| Finance department average score per professor | 51.78 |

If your queries do not produce these values, review the scoring logic before answering test questions.

---

## 16.7 Building the Core Test Queries

The final test becomes much easier if you build a small set of saved queries first.

### Query A: Count Authors per Publication

```sql
SELECT
    PubID,
    Count(ProfID) AS AuthorCount
FROM
    PUBLICATION_AUTHOR
GROUP BY
    PubID;
```

Suggested query name:

```text
Q_Publication_Author_Count
```

### Query B: Calculate Author Credit per Publication

This query joins authorship records to publications, journals, and rating scores.

```sql
SELECT
    PA.AuthorID,
    PA.PubID,
    PA.ProfID,
    PU.PubTitle,
    J.JournalID,
    J.JournalTitle,
    J.Publisher,
    J.RatingGroup,
    JS.Score,
    AC.AuthorCount,
    JS.Score / AC.AuthorCount AS AuthorCredit
FROM
    (((PUBLICATION_AUTHOR AS PA
    INNER JOIN PUBLICATION AS PU
        ON PA.PubID = PU.PubID)
    INNER JOIN JOURNAL AS J
        ON PU.JournalID = J.JournalID)
    INNER JOIN JOURNAL_SCORE AS JS
        ON J.RatingGroup = JS.Rating)
    INNER JOIN Q_Publication_Author_Count AS AC
        ON PA.PubID = AC.PubID;
```

Suggested query name:

```text
Q_Author_Publication_Credit
```

### Query C: Calculate Total Score per Professor

```sql
SELECT
    P.ProfID,
    P.FirstName,
    P.LastName,
    D.DepartmentName,
    Round(Nz(Sum(Q.AuthorCredit),0),2) AS TotalPublicationScore
FROM
    (PROFESSOR AS P
    LEFT JOIN Q_Author_Publication_Credit AS Q
        ON P.ProfID = Q.ProfID)
    LEFT JOIN DEPARTMENT AS D
        ON P.DepartmentID = D.DepartmentID
GROUP BY
    P.ProfID,
    P.FirstName,
    P.LastName,
    D.DepartmentName
ORDER BY
    TotalPublicationScore DESC;
```

Suggested query name:

```text
Q_Professor_Total_Score
```

### Query D: Count Unique Publications per Professor

Because Access does not reliably support `COUNT(DISTINCT ...)`, create a distinct professor-publication query first:

```sql
SELECT
    ProfID,
    PubID
FROM
    PUBLICATION_AUTHOR
GROUP BY
    ProfID,
    PubID;
```

Suggested query name:

```text
Q_Distinct_Professor_Publications
```

Then count:

```sql
SELECT
    P.ProfID,
    P.FirstName,
    P.LastName,
    Count(Q.PubID) AS UniquePublications
FROM
    PROFESSOR AS P
    LEFT JOIN Q_Distinct_Professor_Publications AS Q
        ON P.ProfID = Q.ProfID
GROUP BY
    P.ProfID,
    P.FirstName,
    P.LastName
ORDER BY
    UniquePublications DESC;
```

Suggested query name:

```text
Q_Publications_Per_Professor
```

### Query E: Department Scores

```sql
SELECT
    DepartmentName,
    Count(ProfID) AS NumberOfProfessors,
    Round(Sum(TotalPublicationScore),2) AS DepartmentTotalScore,
    Round(Avg(TotalPublicationScore),2) AS DepartmentAverageScore
FROM
    Q_Professor_Total_Score
GROUP BY
    DepartmentName
ORDER BY
    DepartmentAverageScore DESC;
```

Suggested query name:

```text
Q_Department_Scores
```

### Query F: Unique Publications by Department

A publication may have multiple authors in the same department. To avoid double-counting, first create a distinct department-publication query.

```sql
SELECT
    D.DepartmentName,
    PA.PubID
FROM
    (DEPARTMENT AS D
    INNER JOIN PROFESSOR AS P
        ON D.DepartmentID = P.DepartmentID)
    INNER JOIN PUBLICATION_AUTHOR AS PA
        ON P.ProfID = PA.ProfID
GROUP BY
    D.DepartmentName,
    PA.PubID;
```

Suggested query name:

```text
Q_Distinct_Department_Publications
```

Then count:

```sql
SELECT
    DepartmentName,
    Count(PubID) AS UniquePublications
FROM
    Q_Distinct_Department_Publications
GROUP BY
    DepartmentName
ORDER BY
    DepartmentName;
```

Suggested query name:

```text
Q_Publications_By_Department
```

### Query G: Co-Authorship Between Two Professors

To count publications co-authored by two specific professors, join `PUBLICATION_AUTHOR` to itself.

```sql
SELECT
    Count(*) AS CoauthoredPublications
FROM
    PUBLICATION_AUTHOR AS A1
    INNER JOIN PUBLICATION_AUTHOR AS A2
        ON A1.PubID = A2.PubID
WHERE
    A1.ProfID = [First Professor ID]
    AND A2.ProfID = [Second Professor ID];
```

Before using this query, identify the `ProfID` values for the two professors:

```sql
SELECT
    ProfID,
    FirstName,
    LastName
FROM
    PROFESSOR
WHERE
    (FirstName = "David" AND LastName = "Brown")
    OR (FirstName = "William" AND LastName = "Davis");
```

### Query H: Authors of a Specific Publication

```sql
SELECT
    PU.PubTitle,
    P.FirstName,
    P.LastName
FROM
    (PUBLICATION AS PU
    INNER JOIN PUBLICATION_AUTHOR AS PA
        ON PU.PubID = PA.PubID)
    INNER JOIN PROFESSOR AS P
        ON PA.ProfID = P.ProfID
WHERE
    PU.PubTitle = "Understanding Quantitative Advancements"
ORDER BY
    P.LastName,
    P.FirstName;
```

Change the title for each authorship question.

### Query I: Publications by Journal Rating

```sql
SELECT
    J.RatingGroup,
    Count(PU.PubID) AS UniquePublications
FROM
    JOURNAL AS J
    INNER JOIN PUBLICATION AS PU
        ON J.JournalID = PU.JournalID
GROUP BY
    J.RatingGroup;
```

Use this query carefully for questions distinguishing `"A*"` from `"A"`.

### Query J: Publications by Publisher

```sql
SELECT
    J.Publisher,
    Count(PU.PubID) AS UniquePublications
FROM
    JOURNAL AS J
    INNER JOIN PUBLICATION AS PU
        ON J.JournalID = PU.JournalID
GROUP BY
    J.Publisher
ORDER BY
    J.Publisher;
```

---

## 16.8 Final Test Question Map

The final test contains multiple types of questions. Preparing by topic is more effective than preparing question by question.

### Score and Publication Count Questions

| Questions | Topic | Query Preparation |
|---|---|---|
| Q1–Q2 | Maximum and minimum number of unique publications per professor | `Q_Publications_Per_Professor` |
| Q3–Q4 | Highest and lowest nonzero professor publication score | `Q_Professor_Total_Score` |
| Q5–Q7 | Promotion, termination, and middle-category counts | `Q_Professor_Total_Score` with criteria |
| Q8–Q11 | Unique publications by department | `Q_Publications_By_Department` |
| Q12–Q15 | Promotion counts by department | `Q_Professor_Total_Score` with department filter |
| Q50–Q53 | Publications by journal rating | Publications joined to journals |
| Q54–Q57 | Publications by publisher | Publications joined to journals |

### Collaboration and Authorship Questions

| Questions | Topic | Query Preparation |
|---|---|---|
| Q29–Q31 | Pairwise co-authorship counts | Self-join on `PUBLICATION_AUTHOR` |
| Q32–Q33 | Authors of specific publication titles | Publication-author-professor join |
| Q34 | Maximum authors/coauthors per publication | Author count query |
| Q35 | Single-author publications | Author count query where count = 1 |
| Q36 | Average number of authors or coauthors per publication | Author count query with average |

When interpreting Q34–Q36, read wording carefully. If the test asks for **authors**, use the number of authors. If it asks for **co-authors**, that may mean `AuthorCount - 1`. The database can produce both values; the question wording determines which one is appropriate.

### Cardinality Questions

| Questions | Relationship |
|---|---|
| Q16–Q17 | `PROFESSOR` and `DEPARTMENT` |
| Q18–Q19 | `JOURNAL` and `JOURNAL_SCORE` |
| Q20–Q21 | `PUBLICATION` and `PUBLICATION_AUTHOR` |
| Q22–Q23 | `PUBLICATION_AUTHOR` and `PROFESSOR` |

Remember: cardinality depends on the direction from which the relationship is read.

For example:

```text
DEPARTMENT 1 ---- many PROFESSOR
```

From `PROFESSOR` to `DEPARTMENT`, each professor belongs to one department.

From `DEPARTMENT` to `PROFESSOR`, one department can have many professors.

### Database Limitations and Data Mart Questions

| Questions | Topic |
|---|---|
| Q24–Q26 | Database limitations |
| Q27 | Data mart vs. data warehouse |
| Q28 | Turning the database into big data |

This publications database is focused on one subject area: academic publications and faculty research performance. That makes it closer to a **data mart** than a full enterprise data warehouse.

Possible limitations include:

- No external co-authors if the schema includes only professors from the university.
- No author order, such as first author or corresponding author.
- No citation count.
- No journal impact factor unless separately stored.
- No funding source.
- No publication timeline from submission to publication.
- Limited view of the university because it focuses on publications, not the whole organization.

### BI Decision Questions

| Questions | Topic |
|---|---|
| Q37–Q40 | Business intelligence decisions supported by the database |

Appropriate BI decisions include:

- Allocating research funding based on publication scores and collaboration networks.
- Identifying departments with research strengths.
- Developing targeted faculty development programs.
- Finding opportunities for cross-department collaboration.
- Enhancing academic partnerships.

Inappropriate decisions include cafeteria menus, sports strategies, campus security, or stock-market predictions, because those decisions are not supported by the database.

### Normalization Questions

| Questions | Topic |
|---|---|
| Q41 | Which tables could be further normalized |
| Q42–Q45 | Why a proposed single-table design is not normalized |

The proposed table:

```text
PUBLICATION(PubID, PubTitle, JournalID, AuthorID, LastName, FirstName, DepartmentID, Rating, Score)
```

is not normalized because it mixes publication facts, author facts, department facts, and journal-rating facts in one table. This creates redundancy and anomalies.

Problems include:

- Author details repeat for every publication.
- Department details repeat for every author/publication row.
- Journal rating details repeat across publications.
- Updating a professor, department, or rating requires changes in multiple rows.
- Deleting a publication could accidentally remove the only copy of author or journal-related information.
- The design invites update, insertion, and deletion anomalies.

The problem is **not** that the table contains multiple data types, has a primary key, or uses foreign keys. Those are normal features of databases.

### Macro and Data Macro Questions

| Questions | Topic |
|---|---|
| Q46–Q47 | Ordering standalone macro steps |
| Q48 | Evaluating data macro designs |

A well-designed macro follows a logical workflow:

```text
Open input form
        ↓
Capture value using TempVar
        ↓
Run query or SQL action
        ↓
Display confirmation message
```

A well-designed data macro should enforce a meaningful rule or automate a responsible action. For example:

- Validate that a new publication-author row has a real professor.
- Notify a department when one of its professors adds a publication.

Poor macro designs include actions that randomly alter data, delete all publications, or swap professor names without a legitimate business rule.

### Security and Permissions Question

| Question | Topic |
|---|---|
| Q49 | Matching user groups to table permissions |

Use the principle of least privilege.

General logic:

| User Group | Likely Permission Pattern |
|---|---|
| Librarians | Read/write for publication and authorship cataloging tables |
| Department heads | Read-only or limited read/write for their own department |
| Professors | Read-only for their own profile/publications |
| Dean | Broad or full access depending on institutional policy |

Permissions should reflect job responsibilities, not convenience.

### ACID and Concurrency Questions

| Questions | Topic |
|---|---|
| Q58 | Atomicity, consistency, isolation, durability |
| Q59 | Dirty read |
| Q60 | Phantom read |
| Q61 | Non-repeatable read |
| Q62 | Lost update |

Quick review:

| Concept | Meaning |
|---|---|
| **Atomicity** | All steps succeed or none do. |
| **Consistency** | Rules and constraints remain valid before and after the transaction. |
| **Isolation** | Concurrent transactions do not interfere with one another. |
| **Durability** | Committed changes survive crashes. |
| **Dirty read** | Reading uncommitted data from another transaction. |
| **Non-repeatable read** | Reading the same row twice and seeing different values because another transaction updated it. |
| **Phantom read** | Re-running a query and seeing new rows inserted by another transaction. |
| **Lost update** | One user’s update overwrites another user’s update. |

### Full Outer Join Logic

Question 63 uses a `LEFT JOIN` combined with a `RIGHT JOIN` and `UNION`. This pattern simulates a **full outer join** in systems where full outer join is not directly available.

The purpose is to include:

- Professors who have matching departments.
- Professors who do not have departments.
- Departments that do not have professors.

In other words, it retrieves all records from both sides of the relationship and shows matches where they exist.

---

## 16.9 Final Test Study Strategy

### Build the Relationships First

Before answering query questions, establish the correct relationships:

| Parent Table | Child Table | Join Field |
|---|---|---|
| `DEPARTMENT` | `PROFESSOR` | `DepartmentID` |
| `JOURNAL_SCORE` | `JOURNAL` | `Rating` → `RatingGroup` |
| `JOURNAL` | `PUBLICATION` | `JournalID` |
| `PROFESSOR` | `PUBLICATION_AUTHOR` | `ProfID` |
| `PUBLICATION` | `PUBLICATION_AUTHOR` | `PubID` |

If relationships are wrong, every later query becomes suspicious.

### Create Saved Queries

Do not try to answer every final-test question from scratch. Create reusable saved queries:

```text
Q_Publication_Author_Count
Q_Author_Publication_Credit
Q_Professor_Total_Score
Q_Publications_Per_Professor
Q_Department_Scores
Q_Publications_By_Department
Q_Publications_By_Rating
Q_Publications_By_Publisher
```

These queries form the analytical foundation for most of the test.

### Validate Before Answering

Check the known validation values:

- Jane Taylor should have total score **77.08**.
- Sarah Miller should have total score **37.08**.
- Finance department average score should be **51.78**.

If those values are off, do not guess. Fix the query logic.

### Watch for Double Counting

The most common mistake in this database is double counting publications.

A publication can have multiple authors. A department can have multiple professors on the same publication. If you count rows from `PUBLICATION_AUTHOR` without thinking, you may count authorship records instead of unique publications.

When the question asks for **unique publications**, use a distinct publication list before counting.

### Keep Ratings Exact

The rating `"A*"` is not the same as `"A"`.

If a question asks for A* publications, do not include A. If a question asks for A publications, do not include A*.

---

## 16.10 Submission and Quality Checklist

### Final Project Checklist

Before submitting the project, confirm:

- [ ] The Access file opens correctly.
- [ ] All required tables are present.
- [ ] Relationships are defined and enforced where appropriate.
- [ ] Query names clearly match task numbers.
- [ ] Every query returns results for all students where required.
- [ ] The PDF includes the ERD image.
- [ ] The PDF includes SQL code as text.
- [ ] The PDF includes final result tables.
- [ ] Macro screenshots are included.
- [ ] DBA explanations are included.
- [ ] BI examples are original and actionable.
- [ ] Reflection is 250–300 words.
- [ ] Only two files are submitted: `.accdb` and PDF.

### Final Test Checklist

Before taking the final test, confirm:

- [ ] You understand the publications database schema.
- [ ] You know how to calculate publication score per author.
- [ ] You can calculate total professor scores.
- [ ] You can calculate department-level scores.
- [ ] You understand the relationship between professors and publications through `PUBLICATION_AUTHOR`.
- [ ] You can identify cardinality from either direction.
- [ ] You can identify database limitations.
- [ ] You understand why the database resembles a data mart.
- [ ] You understand what would make the data closer to big data.
- [ ] You can identify reasonable BI decisions supported by the database.
- [ ] You can explain normalization problems in a flat publication table.
- [ ] You understand macro order and responsible data macro design.
- [ ] You understand roles, permissions, ACID properties, and concurrency phenomena.

---

## 16.11 Final Reflection: What This Course Was Really About

This course was never only about Microsoft Access, SQL syntax, or whether a query runs without an error. Those skills matter, but they are the surface layer.

The deeper goal was to learn how organizations turn messy reality into structured evidence.

A database is a way of deciding what matters enough to record. A table is a commitment to a category. A primary key is a commitment to identity. A foreign key is a commitment to relationship. A query is a commitment to a question. A dashboard is a commitment to what decision-makers should notice. A macro is a commitment to workflow. A backup is a commitment to memory. A permission setting is a commitment to trust.

The final project and final test ask you to show that you understand this larger picture. You should be able to build a database, but also explain why its structure matters. You should be able to write SQL, but also explain what question the SQL answers. You should be able to calculate a grade or publication score, but also recognize the assumptions behind the calculation.

That is the real outcome of the course: not just database literacy, but information systems judgment.

---

## Key Terms

| Term | Meaning |
|---|---|
| **Access macro** | A sequence of actions that automates tasks in Microsoft Access. |
| **ACID** | Atomicity, Consistency, Isolation, and Durability; transaction reliability properties. |
| **Author credit** | The portion of a publication’s score assigned to one author. |
| **BI decision** | A managerial decision supported by analysis of database information. |
| **Cardinality** | The maximum number of related records allowed between two tables. |
| **Co-authorship** | A relationship where two or more professors appear on the same publication. |
| **Data mart** | A focused analytical database for a specific subject or department. |
| **Foreign key** | A field that links one table to the primary key of another table. |
| **Full outer join** | A join that returns all rows from both tables, matching where possible. |
| **Macro** | A tool for automating actions and workflows. |
| **Normalization** | Organizing data to reduce redundancy and prevent anomalies. |
| **Publication score** | A calculated metric based on journal score divided by the number of authors. |
| **Role-based access control** | Assigning permissions to user groups based on responsibilities. |
| **Unique publication** | A distinct publication counted once, even if it has multiple authors. |

---

## Review Questions

1. Why does the final project require both an Access file and a PDF report?
2. Why should SQL code be included as text rather than only as screenshots?
3. How does the attendance query demonstrate aggregation and weighted scoring?
4. Why is the letter grade scale better stored in a lookup table than in a long formula?
5. What is the difference between minimum possible final grade and maximum possible final grade?
6. How do macros support automation in the grading database?
7. Which DBA functions are most important for a small Access database, and why?
8. What BI decisions can be supported by a grading database?
9. How does `PUBLICATION_AUTHOR` resolve the many-to-many relationship between professors and publications?
10. Why does the publication scoring system divide journal score by the number of authors?
11. Why must unique publications be counted carefully in a co-authorship database?
12. Why is the research-publications database closer to a data mart than an enterprise data warehouse?
13. What limitations does the research-publications database have?
14. How can poor normalization distort publication analysis?
15. What does the final chapter reveal about the relationship between technical database skills and managerial decision-making?

---

## Closing Note

The final assessment simulates a realistic information systems challenge. Data must be clean, connected, queryable, interpretable, and actionable. By completing the project and preparing for the test, you are not simply finishing a course assignment. You are practicing the work of a data architect, analyst, database administrator, and decision-support professional.

The practical lesson is simple:

> Good information systems do not happen by accident. They are designed, tested, governed, explained, and used responsibly.
