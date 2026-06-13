<!-- metadata: date="2026-05-18"; chapter="14"; section="main"; title="Chapter 14: Power BI, Microsoft Access, and Business Reporting"; description="Introduces Microsoft Power BI as the reporting and visualization layer for database-driven business intelligence, with a full workflow connecting Microsoft Access data to Power BI dashboards."; author="Nimrod Dvir, PhD" -->
# Chapter 14: Power BI, Microsoft Access, and Business Reporting

*From Access Database to Interactive Dashboard*

Power BI is where the database work in this book becomes visible to decision-makers. Earlier chapters focused on designing reliable tables, writing SQL queries, administering databases, and building analytics-ready structures. This chapter moves from the database layer to the reporting layer: connecting Microsoft Access to Power BI, shaping data with Power Query, creating measures with DAX, and designing a dashboard that communicates insight clearly.

The running case is the **Grading Database**. In Access, the database stores students, deliverables, grades, attendance, schedules, and grading rules. In Power BI, those same records become interactive reports: class averages, missing submissions, attendance trends, at-risk students, grade distributions, and performance by assignment type.

The goal is not to make decorative charts. The goal is to build reports that help people understand performance and make better decisions.

## Learning Objectives

After reading this chapter, you will be able to:

1. Explain how Power BI fits into the data-to-decision pipeline.
2. Prepare Microsoft Access tables and queries for use in Power BI.
3. Connect Power BI Desktop to an Access `.accdb` database.
4. Use Power Query to clean, rename, filter, and reshape imported data.
5. Build a basic Power BI data model with relationships among tables.
6. Distinguish calculated columns from DAX measures.
7. Create common DAX measures for grading and attendance analytics.
8. Design dashboard pages using cards, bar charts, line charts, tables, matrices, and slicers.
9. Apply visual design principles for managerial reporting.
10. Publish a Power BI report and explain refresh considerations for Access-based data.

## Chapter Roadmap

| Section | Main Question | Main Output |
|---|---|---|
| 14.1 Power BI in the BI Pipeline | What role does Power BI play? | Conceptual reporting workflow |
| 14.2 Access as the Data Source | How should Access data be prepared? | Clean source tables and queries |
| 14.3 Connecting Power BI to Access | How do we import Access data? | Loaded tables in Power BI Desktop |
| 14.4 Power Query | How do we clean and shape data? | Analytics-ready tables |
| 14.5 Power BI Data Model | How do tables relate in Power BI? | Star-like analytical model |
| 14.6 DAX Measures | How do we define metrics? | Reusable calculations |
| 14.7 Core Visuals | Which visuals answer which questions? | Report components |
| 14.8 Grading Dashboard | How do we build a full report? | Multi-page dashboard |
| 14.9 Interactivity | How do users explore results? | Slicers, filters, drill-through |
| 14.10 Publishing and Refresh | How do we share and update reports? | Published and refreshable report |
| 14.11 Good Reporting Practice | What makes a report trustworthy? | Design checklist |

---

## 14.1 Power BI in the Business Intelligence Pipeline

Power BI is a **business intelligence and data visualization platform**. It connects to data sources, transforms data, builds models, creates visual reports, and allows reports to be shared through the Power BI Service.

A useful way to understand Power BI is to place it at the end of the pipeline introduced throughout this book:

```text
Operational Data -> Database -> SQL / Queries -> BI Model -> Dashboard -> Decision
```

Power BI is not the place where database design begins. A messy database does not magically become trustworthy because it has colorful charts on top of it. Power BI works best when it receives clean, structured, well-related data from the database layer.

In this course, the flow looks like this:

```text
Microsoft Access Grading Database
        ↓
Access tables and saved queries
        ↓
Power BI Desktop
        ↓
Power Query transformations
        ↓
Power BI relationships and DAX measures
        ↓
Interactive dashboard
        ↓
Managerial insight and action
```

### 14.1.1 Power BI Desktop, Service, and Mobile

Power BI has several major components.

| Component | Main Use | Course Role |
|---|---|---|
| **Power BI Desktop** | Build data models and reports on Windows | Main tool for this chapter |
| **Power BI Service** | Publish, share, collaborate, schedule refresh | Optional sharing layer |
| **Power BI Mobile** | View reports on mobile devices | Consumer layer |
| **Power Query** | Clean and transform data | Preparation layer |
| **DAX** | Create calculations and measures | Metric layer |

For this chapter, the most important tool is **Power BI Desktop**. This is where students connect to Access, clean the data, create relationships, write measures, and design report pages.

### 14.1.2 What Power BI Adds Beyond Access

Microsoft Access can store data, enforce relationships, run queries, create forms, and generate reports. That makes Access a compact database application environment. Power BI serves a different purpose: interactive reporting and business intelligence.

| Task | Better in Access | Better in Power BI |
|---|---:|---:|
| Data entry forms | Yes | No |
| Table design and relationships | Yes | Somewhat |
| Transactional data storage | Yes | No |
| Basic queries | Yes | Somewhat |
| Interactive dashboards | Limited | Yes |
| Slicers and drill-down reports | Limited | Yes |
| Visual storytelling | Limited | Yes |
| Sharing dashboards online | Limited | Yes |
| Combining data from many sources | Somewhat | Yes |

Access is the **source system**. Power BI is the **analysis and communication layer**.

### 14.1.3 The Main Principle

> **Use Access to manage the data. Use Power BI to communicate the insight.**

This distinction matters. Students often try to use Power BI as if it were a database. It is not. Power BI imports or connects to data, models it analytically, and creates visuals. It should not replace a properly designed operational database.

---

## 14.2 Preparing the Microsoft Access Database for Power BI

Before connecting Power BI to Access, the Access database should be clean, normalized, and documented. Power BI can import messy data, but messy imports create messy reports. Good BI begins before Power BI opens.

### 14.2.1 Recommended Grading Database Tables

The Grading Database should include tables similar to the following:

| Table | Purpose | Primary Key |
|---|---|---|
| `STUDENT` | Student identity and basic details | `StudentID` |
| `DELIVERABLE` | Assignments, quizzes, exams, and projects | `DeliverableID` |
| `STUDENT_GRADE` | Scores earned by students on deliverables | `GradeID` |
| `ASSIGNMENT_TYPE` or `GRADE_WEIGHT` | Grading categories and weights | `Type` |
| `SCHEDULE` | Class sessions and dates | `ClassNum` |
| `ATTENDANCE` | Student attendance by class session | `AttendanceID` |
| `GRADE_SCALE` | Letter-grade thresholds | `LetterGrade` |

The most important analytical table is `STUDENT_GRADE`. It is the fact-like table because each row records a measurable event: one student's score on one deliverable.

### 14.2.2 Relationship Logic in Access

In Access, go to **Database Tools → Relationships** and confirm these relationships:

| Relationship | Meaning |
|---|---|
| `STUDENT.StudentID → STUDENT_GRADE.StudentID` | Each grade belongs to one student |
| `DELIVERABLE.DeliverableID → STUDENT_GRADE.DeliverableID` | Each grade belongs to one deliverable |
| `STUDENT.StudentID → ATTENDANCE.StudentID` | Each attendance record belongs to one student |
| `SCHEDULE.ClassNum → ATTENDANCE.ClassNum` | Each attendance record belongs to one class meeting |
| `GRADE_WEIGHT.Type → DELIVERABLE.Type` | Each deliverable belongs to one grading category |

Enable **Enforce Referential Integrity** where appropriate. Referential integrity matters because Power BI reports rely on valid relationships. If Access contains orphaned grade records or invalid attendance rows, Power BI will faithfully visualize the problem. The chart will be attractive, but the answer will be wrong. The dashboard will lie politely.

### 14.2.3 Clean Field Names Before Importing

Power BI can handle many field names, but clean names reduce confusion.

Good field names:

```text
StudentID
FirstName
LastName
Email
DeliverableID
DeliverableType
DeliverableNumber
DueDate
Score
Attended
ClassDate
Weight
```

Avoid field names such as:

```text
Student ID
Student's First Name
% Grade
Final/Current Score
Type of Assignment!!!
```

Spaces and punctuation are not fatal, but they make DAX formulas harder to read. A good convention is **PascalCase** or **snake_case**, used consistently.

### 14.2.4 Saved Access Queries as BI Sources

Power BI can import both Access tables and saved Access queries. This gives you two possible workflows.

| Workflow | Description | Best Use |
|---|---|---|
| Import raw tables | Bring tables into Power BI and model relationships there | Best for learning Power BI modeling |
| Import saved queries | Use Access queries as pre-shaped analytical views | Best for simple reports or controlled logic |

For students, I recommend importing the core tables first. This teaches how Power BI relationships and measures work. Later, saved Access queries can be used as curated sources.

### 14.2.5 Example: Access Query for Grade Analytics

A saved Access query can prepare a clean grade-level dataset.

```sql
SELECT
    STUDENT.StudentID,
    STUDENT.FirstName,
    STUDENT.LastName,
    STUDENT.Email,
    DELIVERABLE.DeliverableID,
    DELIVERABLE.Type AS DeliverableType,
    DELIVERABLE.DeliverableNumber,
    DELIVERABLE.DueDate,
    STUDENT_GRADE.Score
FROM
    (STUDENT
    INNER JOIN STUDENT_GRADE
        ON STUDENT.StudentID = STUDENT_GRADE.StudentID)
    INNER JOIN DELIVERABLE
        ON STUDENT_GRADE.DeliverableID = DELIVERABLE.DeliverableID;
```

Save this query in Access as:

```text
q_GradeAnalytics
```

Power BI can import this saved query as if it were a table. This is useful when the goal is a quick dashboard rather than a full Power BI model.

### 14.2.6 Example: Access Query for Attendance Analytics

```sql
SELECT
    STUDENT.StudentID,
    STUDENT.FirstName,
    STUDENT.LastName,
    SCHEDULE.ClassNum,
    SCHEDULE.ClassDate,
    SCHEDULE.WeekNumber,
    ATTENDANCE.Attended
FROM
    (STUDENT
    INNER JOIN ATTENDANCE
        ON STUDENT.StudentID = ATTENDANCE.StudentID)
    INNER JOIN SCHEDULE
        ON ATTENDANCE.ClassNum = SCHEDULE.ClassNum;
```

Save this query as:

```text
q_AttendanceAnalytics
```

This query becomes the basis for attendance trend visuals in Power BI.

---

## 14.3 Connecting Power BI Desktop to Microsoft Access

Power BI Desktop can connect directly to an Access `.accdb` file. The exact interface may vary slightly by version, but the workflow is stable.

### 14.3.1 Step-by-Step Connection Workflow

1. Open **Power BI Desktop**.
2. Select **Home → Get Data → More**.
3. In the data source list, choose **Database → Access database**.
4. Click **Connect**.
5. Browse to the `.accdb` file.
6. Select the tables and/or saved queries to import.
7. Choose either **Load** or **Transform Data**.

Use **Transform Data** when you want to inspect and clean the data before loading. In professional work, this is usually the better choice.

### 14.3.2 Which Access Objects Should Be Imported?

For a full Power BI learning experience, import these tables:

```text
STUDENT
DELIVERABLE
STUDENT_GRADE
SCHEDULE
ATTENDANCE
GRADE_WEIGHT
GRADE_SCALE
```

For a simpler report, import these saved queries:

```text
q_GradeAnalytics
q_AttendanceAnalytics
```

| Import Choice | Advantage | Disadvantage |
|---|---|---|
| Tables | Teaches relationships and DAX modeling | Requires more setup |
| Saved queries | Faster dashboard creation | Hides some modeling logic |
| Both | Flexible | Can create duplicate/confusing fields |

A good classroom sequence is:

1. First lab: import saved queries and build visuals quickly.
2. Second lab: import normalized tables and build the model properly.

### 14.3.3 Common Access Connection Problems

| Problem | Likely Cause | Fix |
|---|---|---|
| Power BI cannot open the `.accdb` file | Access Database Engine driver issue | Install the Microsoft Access Database Engine matching your Power BI architecture |
| Tables appear but relationships do not behave as expected | Relationships not imported or not active | Recreate relationships in Power BI Model view |
| Query results differ from Access | Data type conversion or filtering difference | Inspect Power Query steps and data types |
| File cannot refresh after publishing | Local Access file not reachable by Power BI Service | Use OneDrive/SharePoint or an on-premises data gateway |

### 14.3.4 Import Mode vs. Live Connection

When connecting to Access, Power BI usually works by **importing** the data into the Power BI model. That means the report uses a snapshot of the Access data until it is refreshed.

This has two practical consequences:

1. Updating Access does not automatically update the Power BI report until refresh occurs.
2. Published reports need a refresh strategy if the Access data changes.

For student projects, manual refresh is usually enough. For organizational reporting, refresh planning becomes part of the BI design.

---

## 14.4 Power Query: Cleaning and Shaping Access Data

Power Query is the transformation layer in Power BI. It allows you to clean, filter, rename, merge, append, and reshape data before loading it into the model.

### 14.4.1 Why Power Query Matters

Access stores the data. Power Query prepares it for analysis.

Common Power Query tasks include:

- Renaming columns
- Removing unnecessary fields
- Changing data types
- Replacing null values
- Filtering rows
- Merging tables
- Creating derived columns
- Removing duplicates
- Splitting columns

Power Query transformations are **non-destructive**. The original Access database remains unchanged. Power BI records the transformation steps and reapplies them when the data refreshes.

### 14.4.2 Recommended Transformations for the Grading Database

After importing Access tables, check each table in Power Query.

| Table | Transformation Checks |
|---|---|
| `STUDENT` | Remove unused fields; ensure `StudentID` is Whole Number; trim names; set Email as Text |
| `DELIVERABLE` | Ensure `DeliverableID` is Whole Number; `DueDate` is Date; `Type` is Text |
| `STUDENT_GRADE` | Ensure `Score` is Decimal Number or Whole Number; remove invalid scores if needed |
| `ATTENDANCE` | Ensure `Attended` is True/False or Whole Number 0/1 |
| `SCHEDULE` | Ensure `ClassDate` is Date; `WeekNumber` is Whole Number |
| `GRADE_WEIGHT` | Ensure `Weight` is Decimal Number |

### 14.4.3 Example Power Query Transformations

A typical Power Query cleanup sequence for `STUDENT` might include:

1. Remove columns not needed for reporting.
2. Rename fields for readability.
3. Trim leading/trailing spaces from names.
4. Set data types.
5. Remove duplicate student rows.

In the Power Query interface:

```text
Transform → Format → Trim
Transform → Data Type → Text / Whole Number / Date
Home → Remove Rows → Remove Duplicates
```

### 14.4.4 Example: Adding a Full Name Column in Power Query

In Power Query, select **Add Column → Custom Column** and enter:

```m
[FirstName] & " " & [LastName]
```

Name the column:

```text
StudentName
```

This creates a readable name field for report visuals. You can also create this as a DAX calculated column later. The Power Query version is created during data load; the DAX version is created inside the model.

### 14.4.5 Example: Handling Missing Scores

Do not automatically convert missing scores to zero unless the grading policy says a missing submission earns zero. A blank score may mean "not graded yet," while a zero may mean "submitted but earned no points."

A safer Power Query approach is to keep the original `Score` field and add a status column.

Custom column:

```m
if [Score] = null then "Missing" else "Recorded"
```

Name the column:

```text
ScoreStatus
```

This allows the dashboard to distinguish missing data from actual zeros.

### 14.4.6 Load Only What You Need

A common beginner mistake is importing everything. Good reporting models are focused.

Remove fields that are not needed for the dashboard, especially:

- internal notes,
- temporary fields,
- duplicate descriptive columns,
- personal fields not needed for the analysis,
- sensitive data that report users should not see.

This improves performance and supports privacy.

---

## 14.5 Building the Power BI Data Model

Once data is loaded, Power BI stores it in a model. The model defines tables, relationships, data types, and calculations.

### 14.5.1 Model View

In Power BI Desktop, switch to **Model view** to inspect relationships. Power BI may detect relationships automatically, but you should verify them. Automatic relationship detection is convenient, not magical.

Recommended relationships:

| From | To | Cardinality | Filter Direction |
|---|---|---|---|
| `STUDENT.StudentID` | `STUDENT_GRADE.StudentID` | One-to-many | Single |
| `DELIVERABLE.DeliverableID` | `STUDENT_GRADE.DeliverableID` | One-to-many | Single |
| `STUDENT.StudentID` | `ATTENDANCE.StudentID` | One-to-many | Single |
| `SCHEDULE.ClassNum` | `ATTENDANCE.ClassNum` | One-to-many | Single |
| `GRADE_WEIGHT.Type` | `DELIVERABLE.Type` | One-to-many | Single |

Most relationships should use **single-direction filtering** from dimension-like tables to fact-like tables. This keeps the model easier to reason about.

### 14.5.2 Fact Tables and Dimension Tables in Power BI

Power BI reports become easier when students understand fact and dimension logic.

| Role | Grading Database Example | Description |
|---|---|---|
| Fact table | `STUDENT_GRADE` | Contains measurable events: scores |
| Fact table | `ATTENDANCE` | Contains measurable events: attended/not attended |
| Dimension table | `STUDENT` | Describes who |
| Dimension table | `DELIVERABLE` | Describes what assignment |
| Dimension table | `SCHEDULE` | Describes when class happened |
| Dimension table | `GRADE_WEIGHT` | Describes grading category weights |

Power BI does not require a perfect star schema, but BI reports become cleaner when the model behaves like one.

### 14.5.3 Hide Technical Fields

In report view, students should not drag every technical key onto visuals. Hide fields that are needed for relationships but not useful to report consumers.

Common fields to hide:

```text
GradeID
AttendanceID
DeliverableID
ClassNum
```

Keep fields like:

```text
StudentName
DeliverableType
DueDate
Score
Attended
WeekNumber
Weight
```

Hiding a field does not remove it from the model. It simply makes the report-building interface cleaner.

### 14.5.4 Create a Date Table When Needed

For simple reports, `DELIVERABLE.DueDate` and `SCHEDULE.ClassDate` may be enough. For more advanced time analysis, create a dedicated date table.

A simple DAX date table:

```dax
DateTable = CALENDAR(MIN(DELIVERABLE[DueDate]), MAX(DELIVERABLE[DueDate]))
```

Add useful columns:

```dax
Year = YEAR(DateTable[Date])
Month = FORMAT(DateTable[Date], "YYYY-MM")
WeekNum = WEEKNUM(DateTable[Date])
```

Use a date table when you need consistent time filtering across multiple tables.

---

## 14.6 DAX: Measures, Calculated Columns, and Metrics

DAX stands for **Data Analysis Expressions**. It is the formula language used in Power BI for calculations.

The most important distinction is between **calculated columns** and **measures**.

| Type | Computed When | Stored? | Best For |
|---|---|---|---|
| Calculated column | Row by row during model processing | Yes | Labels, categories, row-level classifications |
| Measure | At query/report interaction time | No | Aggregates, KPIs, dynamic calculations |

### 14.6.1 Calculated Column Example: Student Name

In the `STUDENT` table:

```dax
StudentName = STUDENT[FirstName] & " " & STUDENT[LastName]
```

This is a good calculated column because it creates a row-level label.

### 14.6.2 Calculated Column Example: Score Band

In `STUDENT_GRADE`:

```dax
ScoreBand =
SWITCH(
    TRUE(),
    STUDENT_GRADE[Score] >= 90, "90-100",
    STUDENT_GRADE[Score] >= 80, "80-89",
    STUDENT_GRADE[Score] >= 70, "70-79",
    STUDENT_GRADE[Score] >= 60, "60-69",
    STUDENT_GRADE[Score] < 60, "Below 60",
    "Missing"
)
```

This column supports a grade-distribution chart.

### 14.6.3 Measure Example: Average Score

Create a measure in `STUDENT_GRADE`:

```dax
Average Score = AVERAGE(STUDENT_GRADE[Score])
```

This measure changes depending on slicers and filters. If the report is filtered to quizzes only, it becomes the average quiz score. If the report is filtered to one student, it becomes that student's average.

### 14.6.4 Measure Example: Total Submissions

```dax
Total Submissions = COUNTROWS(STUDENT_GRADE)
```

### 14.6.5 Measure Example: Missing Submissions

If missing grades are represented by blank scores:

```dax
Missing Scores =
COUNTROWS(
    FILTER(
        STUDENT_GRADE,
        ISBLANK(STUDENT_GRADE[Score])
    )
)
```

If missing submissions are represented by absent rows, use a model that compares all possible student-deliverable combinations. This is a more advanced pattern and may require a helper table or a query created in Access.

### 14.6.6 Measure Example: Pass Rate

```dax
Passing Grades =
COUNTROWS(
    FILTER(
        STUDENT_GRADE,
        STUDENT_GRADE[Score] >= 60
    )
)
```

```dax
Pass Rate =
DIVIDE([Passing Grades], [Total Submissions])
```

Format `Pass Rate` as a percentage.

### 14.6.7 Measure Example: Attendance Rate

If `ATTENDANCE[Attended]` is stored as True/False:

```dax
Classes Attended =
COUNTROWS(
    FILTER(
        ATTENDANCE,
        ATTENDANCE[Attended] = TRUE()
    )
)
```

```dax
Total Class Records = COUNTROWS(ATTENDANCE)
```

```dax
Attendance Rate = DIVIDE([Classes Attended], [Total Class Records])
```

If `Attended` is stored as 1/0:

```dax
Attendance Rate = AVERAGE(ATTENDANCE[Attended])
```

Format as a percentage.

### 14.6.8 Measure Example: Weighted Grade

A weighted grade is more complex because each deliverable type has a weight. Suppose `GRADE_WEIGHT` includes:

| Type | Weight |
|---|---:|
| Quiz | 0.20 |
| Exam | 0.40 |
| Project | 0.30 |
| Participation | 0.10 |

A simplified weighted measure can be created if the model connects `GRADE_WEIGHT[Type]` to `DELIVERABLE[Type]`:

```dax
Weighted Score =
SUMX(
    STUDENT_GRADE,
    STUDENT_GRADE[Score] * RELATED(GRADE_WEIGHT[Weight])
)
```

A more careful weighted average divides by the available weights:

```dax
Weighted Average =
DIVIDE(
    SUMX(
        STUDENT_GRADE,
        STUDENT_GRADE[Score] * RELATED(GRADE_WEIGHT[Weight])
    ),
    SUMX(
        STUDENT_GRADE,
        RELATED(GRADE_WEIGHT[Weight])
    )
)
```

This is a teaching example. In a real grading system, weight calculations must match the syllabus policy exactly. If quizzes are averaged first and then weighted as a category, the measure should calculate category averages before applying category weights.

### 14.6.9 Measure Example: At-Risk Students

A simple at-risk flag can be created as a calculated column or measure. As a measure:

```dax
Risk Status =
SWITCH(
    TRUE(),
    [Average Score] < 60, "High Risk",
    [Average Score] < 70, "At Risk",
    [Average Score] < 80, "Monitor",
    "On Track"
)
```

This can be used in tables, cards, or conditional formatting.

### 14.6.10 DAX Good Practice

| Good Practice | Reason |
|---|---|
| Use measures for KPIs | Measures respond to slicers and filters |
| Use calculated columns for row-level labels | Labels are stable per row |
| Use `DIVIDE()` instead of `/` | Handles divide-by-zero safely |
| Give measures readable names | Report builders should understand them |
| Keep business logic documented | Metrics need definitions, not just formulas |

---

## 14.7 Choosing the Right Visual

A Power BI report is a communication artifact. Visuals should be selected based on the question being answered.

| Business Question | Recommended Visual | Grading Example |
|---|---|---|
| What is the current value? | Card | Average score, pass rate, missing submissions |
| Which category is highest or lowest? | Bar/column chart | Average score by deliverable type |
| How is performance changing over time? | Line chart | Average score by due date or week |
| How are values distributed? | Histogram or column chart | Score bands |
| Which students need attention? | Table or matrix | At-risk student list |
| How do two measures relate? | Scatter plot | Attendance rate vs. average score |
| How do groups compare across dimensions? | Matrix | Students by deliverable type |

### 14.7.1 Core Visuals for the Grading Dashboard

A useful Power BI grading dashboard should include:

1. **Cards** for major KPIs.
2. **Bar chart** for average score by deliverable type.
3. **Line chart** for performance over time.
4. **Table** for at-risk students.
5. **Matrix** for student-by-deliverable performance.
6. **Slicers** for student, deliverable type, and date range.

### 14.7.2 Avoiding Misleading Visuals

A dashboard can mislead even when the data is technically correct.

Common mistakes:

- using a pie chart with too many categories,
- sorting bars alphabetically instead of by value,
- omitting axis labels,
- using inconsistent colors,
- showing too many visuals on one page,
- creating KPIs without definitions,
- mixing percentages and raw counts without explanation.

A good report should reduce cognitive load, not create a scavenger hunt.

---

## 14.8 Building a Grading Dashboard in Power BI

This section provides a complete dashboard plan using the Grading Database.

### 14.8.1 Dashboard Goal

The dashboard should help an instructor answer five questions:

1. How is the class performing overall?
2. Which deliverable types are strongest or weakest?
3. Which students may need support?
4. Are attendance and performance related?
5. Are there missing or incomplete records?

### 14.8.2 Page 1: Executive Summary

**Purpose:** Give a quick overview of course performance.

Recommended visuals:

| Visual | Fields / Measures | Purpose |
|---|---|---|
| Card | `[Average Score]` | Overall performance |
| Card | `[Pass Rate]` | Percentage passing |
| Card | `[Attendance Rate]` | Engagement indicator |
| Card | `[Missing Scores]` | Data completeness warning |
| Bar chart | `DELIVERABLE[Type]` + `[Average Score]` | Compare assessment categories |
| Line chart | `DELIVERABLE[DueDate]` + `[Average Score]` | Show performance over time |
| Slicer | `DELIVERABLE[Type]` | Filter by assessment type |
| Slicer | `STUDENT[StudentName]` | Filter by student |

Suggested layout:

```text
+---------------------------------------------------+
| Course Performance Dashboard                       |
+-------------+-------------+-------------+---------+
| Avg Score   | Pass Rate   | Attendance  | Missing |
+-------------+-------------+-------------+---------+
| Avg Score by Deliverable Type | Score Trend       |
+--------------------------------+------------------+
| At-Risk Students Table                            |
+---------------------------------------------------+
```

### 14.8.3 Page 2: Student Detail

**Purpose:** Review one student at a time.

Recommended visuals:

| Visual | Purpose |
|---|---|
| Student slicer | Select one student |
| Card: Average Score | Show selected student average |
| Card: Attendance Rate | Show selected student attendance |
| Table: Deliverables and Scores | Show detailed performance |
| Line chart: Score over time | Show trend |
| Bar chart: Score by deliverable type | Show strengths and weaknesses |

Fields for table:

```text
StudentName
DeliverableType
DeliverableNumber
DueDate
Score
ScoreBand
```

### 14.8.4 Page 3: Assignment Analysis

**Purpose:** Evaluate deliverables and assessment types.

Recommended visuals:

| Visual | Purpose |
|---|---|
| Bar chart: Average score by deliverable | Identify difficult assignments |
| Bar chart: Pass rate by deliverable type | Compare categories |
| Table: deliverable details | Show score, count, missing values |
| Slicer: Type | Focus on quizzes, exams, projects, etc. |

Useful DAX measure:

```dax
Deliverable Count = DISTINCTCOUNT(DELIVERABLE[DeliverableID])
```

```dax
Average Score by Deliverable = [Average Score]
```

Power BI automatically recalculates `[Average Score]` by deliverable when the visual uses `DELIVERABLE[DeliverableID]` or `DELIVERABLE[Type]`.

### 14.8.5 Page 4: Attendance and Engagement

**Purpose:** Compare attendance patterns with academic outcomes.

Recommended visuals:

| Visual | Purpose |
|---|---|
| Scatter plot | Attendance rate vs. average score |
| Bar chart | Attendance by week |
| Table | Students sorted by low attendance |
| Card | Overall attendance rate |

Scatter plot fields:

| Bucket | Field |
|---|---|
| X-axis | `[Attendance Rate]` |
| Y-axis | `[Average Score]` |
| Details | `STUDENT[StudentName]` |

This visual can reveal whether students with lower attendance also tend to have lower grades. It does not prove causality, but it helps identify a pattern worth investigating.

### 14.8.6 Page 5: Data Quality Review

**Purpose:** Identify records that may need cleaning before reports are trusted.

Recommended checks:

| Check | Visual / Measure |
|---|---|
| Missing scores | Card and table |
| Scores outside valid range | Table filtered to invalid values |
| Students without grades | Table |
| Deliverables without grades | Table |
| Duplicate student names/emails | Table or Access query |

Example DAX measure for invalid scores:

```dax
Invalid Scores =
COUNTROWS(
    FILTER(
        STUDENT_GRADE,
        STUDENT_GRADE[Score] < 0 || STUDENT_GRADE[Score] > 100
    )
)
```

Ideally this measure should always be zero. If it is not zero, the database integrity layer needs attention.

---

## 14.9 Slicers, Filters, Drill-Down, and Drill-Through

Power BI becomes powerful because users can interact with reports.

### 14.9.1 Slicers

A slicer is a visual filter placed on the report canvas.

Useful slicers for the Grading Dashboard:

```text
StudentName
DeliverableType
DueDate
WeekNumber
ScoreBand
RiskStatus
```

Place slicers consistently. If every report page uses a deliverable-type slicer, put it in the same location on each page.

### 14.9.2 Filters

Power BI has multiple filter levels.

| Filter Level | Applies To | Example |
|---|---|---|
| Visual filter | One visual | Show only scores below 70 in a table |
| Page filter | One page | Show only Exam-related visuals |
| Report filter | Entire report | Limit dashboard to Spring 2026 |
| Slicer | User-controlled page interaction | Select a student |

### 14.9.3 Drill-Down

Drill-down lets users move from summary to detail.

Example hierarchy:

```text
DeliverableType → DeliverableNumber → StudentName
```

A bar chart might first show average score by deliverable type. Drill-down then reveals individual assignments within each type. A deeper drill can show student-level records.

### 14.9.4 Drill-Through

Drill-through sends the user from one report page to a detail page filtered by the selected item.

Example:

1. Right-click a student in the At-Risk Students table.
2. Select **Drill through → Student Detail**.
3. Power BI opens the Student Detail page filtered to that student.

This supports managerial workflows: identify a problem, then inspect the details.

### 14.9.5 Tooltips

Report-page tooltips can show extra context without cluttering the main dashboard.

Example tooltip fields:

```text
StudentName
Average Score
Attendance Rate
Missing Scores
Risk Status
```

Tooltips are useful when the dashboard needs to remain clean but users still need detail on demand.

---

## 14.10 Publishing, Sharing, and Refresh

After building a report in Power BI Desktop, you may publish it to the Power BI Service.

### 14.10.1 Publishing Workflow

1. Save the `.pbix` file.
2. Select **Home → Publish** in Power BI Desktop.
3. Sign in with your Microsoft account.
4. Choose a workspace.
5. Open the report in the Power BI Service.

Publishing moves the report online so authorized users can view it in a browser.

### 14.10.2 Sharing Considerations

Before sharing a report, ask:

- Who is allowed to view the report?
- Does the report include student-level private information?
- Should viewers see all students or only summary statistics?
- Does the report need row-level security?
- Should the report be shared as a report, app, Teams tab, or PDF export?

For course assignments, students may submit screenshots or a `.pbix` file. For real organizations, sharing must follow privacy and governance rules.

### 14.10.3 Refreshing Access Data

If a Power BI report imports data from an Access file, the report must refresh when the Access data changes.

There are three common scenarios:

| Scenario | Refresh Approach |
|---|---|
| Student project on one computer | Manual refresh in Power BI Desktop |
| Access file stored in OneDrive/SharePoint | Cloud refresh may be easier if credentials and path are stable |
| Access file stored on local/network computer and report published online | On-premises data gateway may be required |

A refresh problem is not a visualization problem. It is a data pipeline problem. The dashboard is only as current as its last successful refresh.

### 14.10.4 Refresh Checklist

Before relying on a published dashboard, verify:

- The Access file path is stable.
- The dataset refreshes successfully.
- Credentials are configured correctly.
- The report shows the latest expected records.
- The refresh schedule matches the decision cycle.
- Sensitive data is protected.

For example, a dashboard used after each class session may need daily refresh. A dashboard used only for final grading may need manual refresh before review.

---

## 14.11 Report Design Principles

Power BI skill is not only technical. A useful dashboard must be understandable, trustworthy, and aligned with decisions.

### 14.11.1 Start with the Decision

Before adding visuals, define the decision or action the report supports.

Weak report goal:

```text
Show grades.
```

Stronger report goal:

```text
Help the instructor identify students who may need support before the next exam.
```

The second goal tells you what visuals matter: at-risk students, missing submissions, attendance, trend lines, and category performance.

### 14.11.2 Use a Clear Visual Hierarchy

Place the most important information at the top.

A common dashboard layout:

1. Title and filters.
2. KPI cards.
3. Main trend or comparison visual.
4. Detail table.
5. Notes or definitions.

Do not make users hunt for the main message.

### 14.11.3 Label Metrics Clearly

A KPI without a definition is dangerous.

Bad label:

```text
Performance
```

Better label:

```text
Average Score
```

Best label:

```text
Average Score Across Recorded Submissions
```

The best version clarifies whether missing submissions are excluded, counted as zero, or handled separately.

### 14.11.4 Avoid Dashboard Overload

A beginner dashboard often has too many charts. A professional dashboard is selective.

A useful rule:

> If a visual does not support a decision, remove it.

### 14.11.5 Use Tables When Detail Matters

Charts are not always better. If the user needs exact student names, missing assignments, or grade values, a table or matrix may be best.

Use charts for patterns. Use tables for records.

### 14.11.6 Use Color Carefully

Color should communicate meaning, not decoration.

Examples:

- Use one accent color for highlighted risk.
- Use consistent colors across pages.
- Avoid using red/green as the only distinction.
- Do not assign random colors to every category.

Color is a language. Do not let it babble.

---

## 14.12 Complete Power BI Lab: Access to Dashboard

This lab summarizes the full workflow.

### Lab Goal

Build an interactive Power BI dashboard from the Access Grading Database that helps an instructor monitor course performance.

### Required Files

- Access database: `GradingDatabase.accdb`
- Power BI report: `GradingDashboard.pbix`
- Optional PDF export or screenshots

### Step 1: Prepare Access

In Access:

1. Confirm table relationships.
2. Enforce referential integrity.
3. Clean field names.
4. Create optional saved queries:
   - `q_GradeAnalytics`
   - `q_AttendanceAnalytics`
5. Close the Access file before importing into Power BI if the file is locked.

### Step 2: Connect Power BI to Access

In Power BI Desktop:

1. Home → Get Data → More.
2. Choose Access database.
3. Select `GradingDatabase.accdb`.
4. Import tables or saved queries.
5. Click Transform Data.

### Step 3: Clean Data in Power Query

Perform these transformations:

- Set correct data types.
- Rename unclear fields.
- Trim text fields.
- Remove unused fields.
- Add `StudentName` if desired.
- Add `ScoreStatus` if missing scores exist.

Click **Close & Apply**.

### Step 4: Build Relationships

In Model view, confirm relationships:

```text
STUDENT 1 → * STUDENT_GRADE
DELIVERABLE 1 → * STUDENT_GRADE
STUDENT 1 → * ATTENDANCE
SCHEDULE 1 → * ATTENDANCE
GRADE_WEIGHT 1 → * DELIVERABLE
```

### Step 5: Create DAX Measures

Create these measures:

```dax
Average Score = AVERAGE(STUDENT_GRADE[Score])
```

```dax
Total Submissions = COUNTROWS(STUDENT_GRADE)
```

```dax
Passing Grades =
COUNTROWS(
    FILTER(STUDENT_GRADE, STUDENT_GRADE[Score] >= 60)
)
```

```dax
Pass Rate = DIVIDE([Passing Grades], [Total Submissions])
```

```dax
Classes Attended =
COUNTROWS(
    FILTER(ATTENDANCE, ATTENDANCE[Attended] = TRUE())
)
```

```dax
Total Attendance Records = COUNTROWS(ATTENDANCE)
```

```dax
Attendance Rate = DIVIDE([Classes Attended], [Total Attendance Records])
```

### Step 6: Build the Report Pages

Create at least three pages:

| Page | Required Visuals |
|---|---|
| Executive Summary | KPI cards, average by type, trend line, slicers |
| Student Detail | student slicer, grade table, score trend, attendance KPI |
| Data Quality | missing scores, invalid scores, records needing review |

### Step 7: Format and Test

Check that:

- slicers affect the correct visuals,
- measures update when filters are applied,
- visual titles are clear,
- values are formatted correctly,
- percentages display as percentages,
- report pages are not overcrowded,
- no sensitive fields are unnecessarily visible.

### Step 8: Publish or Submit

Depending on instructor requirements, submit:

- the `.pbix` file,
- screenshots of report pages,
- a short explanation of dashboard purpose,
- DAX measures used,
- data source description.

---

## Key Concepts

- Power BI is a reporting and visualization layer, not a replacement for database design.
- Microsoft Access can serve as the operational source for Power BI reports.
- Power Query prepares data before it enters the Power BI model.
- The Power BI data model should preserve meaningful relationships among tables.
- DAX measures define reusable KPIs that respond to filters and slicers.
- Calculated columns are best for row-level labels and classifications.
- Effective dashboards start with decisions, not visuals.
- Slicers, filters, drill-down, and drill-through help users explore data interactively.
- Published reports require refresh planning, especially when the source is an Access file.
- A dashboard is only trustworthy when the underlying data, model, and metric definitions are trustworthy.

## Chapter Summary

Power BI turns database output into interactive reporting. In this chapter, Microsoft Access served as the operational database and Power BI served as the visualization and business intelligence layer. This division of labor is important: Access stores and manages structured data, while Power BI helps users analyze and communicate what the data means.

The chapter showed how to prepare Access tables and saved queries, connect Power BI Desktop to an `.accdb` file, clean data with Power Query, build relationships in the Power BI model, and create DAX measures for grading and attendance analytics. It also explained how to choose visuals based on the question being answered rather than visual preference alone.

The Grading Database provided a concrete reporting case. Scores became KPIs. Deliverable types became comparison categories. Due dates and class weeks became time dimensions. Attendance became an engagement signal. Together, these pieces formed a dashboard that could help an instructor monitor course performance, identify at-risk students, and evaluate missing or incomplete data.

The most important lesson is that Power BI is not just a charting tool. It is a decision-support environment. Used well, it connects reliable databases to clear managerial insight. Used poorly, it can make weak data look persuasive. The responsibility of the analyst is to ensure that the report is not only attractive, but accurate, interpretable, and useful.

## Key Terms

- **Access Database Connector**: The Power BI data connector used to import data from Microsoft Access `.accdb` or `.mdb` files.
- **Calculated Column**: A DAX calculation evaluated row by row and stored in the model.
- **Card Visual**: A Power BI visual that displays a single KPI or value.
- **DAX (Data Analysis Expressions)**: The formula language used in Power BI for measures, calculated columns, and model calculations.
- **Dashboard**: A visual decision-support interface that combines KPIs, charts, tables, and filters.
- **Data Model**: The set of tables, relationships, data types, and calculations used by Power BI.
- **Drill-Down**: A report interaction that moves from summary to detail within a hierarchy.
- **Drill-Through**: A report interaction that opens a detail page filtered to a selected item.
- **Measure**: A DAX calculation evaluated dynamically based on filters and report context.
- **Power BI Desktop**: The Windows application used to build Power BI reports and models.
- **Power BI Service**: The cloud platform used to publish, share, refresh, and collaborate on Power BI reports.
- **Power Query**: The data preparation and transformation engine in Power BI.
- **Refresh**: The process of updating the Power BI dataset from the source data.
- **Slicer**: An interactive visual filter placed on a report page.
- **Visual-Level Filter**: A filter that affects only one selected visual.

## Review Questions

1. What role does Power BI play in the data-to-decision pipeline?
2. Why should Microsoft Access be treated as a source database rather than as a dashboarding tool?
3. What preparation should be done in Access before connecting to Power BI?
4. What is the difference between importing Access tables and importing saved Access queries?
5. Why is Power Query important when working with Access data?
6. What is the difference between a calculated column and a measure in Power BI?
7. Write a DAX measure for average score in the Grading Database.
8. Write a DAX measure for pass rate.
9. Which visuals would you use to show performance by assignment type, and why?
10. How would you design a dashboard page for identifying at-risk students?
11. What is the difference between a slicer, a page filter, and a visual filter?
12. Why does an Access-based Power BI report need a refresh strategy?
13. What privacy concerns arise when publishing a student-performance dashboard?
14. Why can a dashboard be misleading even when all the charts are technically correct?
15. How does Power BI extend, rather than replace, the database skills learned earlier in the book?

## Practice Assignment: Build a Power BI Grading Dashboard

Create a Power BI report using the Access Grading Database.

### Required Pages

1. **Executive Summary**
   - KPI cards for average score, pass rate, attendance rate, and missing scores
   - Bar chart of average score by deliverable type
   - Line chart of average score over time

2. **Student Detail**
   - Student slicer
   - Table of deliverables and scores
   - Student average score card
   - Student attendance rate card

3. **Data Quality Review**
   - Missing scores
   - Invalid scores
   - Students without recorded grades
   - Deliverables without recorded grades

### Required DAX Measures

- `Average Score`
- `Total Submissions`
- `Pass Rate`
- `Attendance Rate`
- at least one additional measure of your choice

### Submission Requirements

Submit:

- the `.pbix` file,
- screenshots or PDF export of the report pages,
- a brief explanation of the dashboard purpose,
- a list of DAX measures used,
- a short reflection explaining one insight found in the dashboard.

## References

Microsoft. (2026). *What is Power BI?* Microsoft Learn. https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview

Microsoft. (n.d.). *Power Query documentation*. Microsoft Learn. https://learn.microsoft.com/en-us/power-query/

Microsoft. (n.d.). *DAX overview*. Microsoft Learn. https://learn.microsoft.com/en-us/dax/dax-overview

Microsoft. (n.d.). *Connect to data in Power BI Desktop*. Microsoft Learn. https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-quickstart-connect-to-data

Microsoft. (n.d.). *On-premises data gateway*. Microsoft Learn. https://learn.microsoft.com/en-us/data-integration/gateway/service-gateway-onprem
