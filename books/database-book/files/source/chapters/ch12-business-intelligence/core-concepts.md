# Chapter 12: Business Intelligence and Analytics for Performance Improvement

Business Intelligence, or BI, is where the database becomes useful to managers. Earlier chapters focused on how data is structured, queried, designed, and administered. This chapter shifts to the question that motivates all of that work: how do organizations use reliable data to understand performance and make better decisions? It introduces operational versus analytical systems, data warehouses, ETL and ELT pipelines, dimensional modeling, star schemas, OLAP operations, dashboards, KPIs, governance, and the Balanced Scorecard, using the Grading Database as the running example.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Core Concepts

# 12.1 Business Intelligence Fundamentals

## What Is Business Intelligence?

> **Definition:** Business Intelligence is the collection of concepts, architectures, tools, and practices that help organizations transform data into information, insight, and decision support.

BI is not the same thing as storing data. It is also not the same thing as writing a single query. BI is the larger process of turning operational records into evidence that supports monitoring, evaluation, planning, and action.

Operational systems answer questions such as:

- Did this student submit Quiz 2?
- What score did Student 102 receive on Exam 1?
- Was Student 205 marked present on February 12?

BI systems answer broader questions:

- Are students improving or declining over time?
- Which deliverable types have the lowest average scores?
- How does attendance relate to performance?
- Which students may need intervention before the final exam?
- Are course outcomes consistent across sections or semesters?

The first set of questions supports daily operations. The second set supports analysis, evaluation, and management.

## BI as Decision Support

BI systems help managers and analysts do four things:

| BI Function  | What It Means                                | Grading Database Example                   |
| ------------ | -------------------------------------------- | ------------------------------------------ |
| **Monitor**  | Track current performance                    | Average score by deliverable type          |
| **Compare**  | Examine differences across groups or periods | Quiz averages by week or section           |
| **Diagnose** | Identify possible causes or risks            | Low scores after missed attendance         |
| **Act**      | Support decisions or interventions           | Contact students whose average is below 70 |

This is why BI belongs in a database course. Databases are valuable not only because they store data but because they support better decisions.

## BI and the DIKW Hierarchy

The DIKW hierarchy helps explain the intellectual movement behind BI:

| DIKW Level      | Meaning                     | Grading Example                            |
| --------------- | --------------------------- | ------------------------------------------ |
| **Data**        | Raw facts                   | `StudentID = 101`, `Score = 72`            |
| **Information** | Organized data with context | Average Quiz 2 score is 76                 |
| **Knowledge**   | Interpreted patterns        | Quiz scores decline after attendance drops |
| **Wisdom**      | Judgment and action         | Add an intervention before the next quiz   |

BI sits mainly between **information** and **knowledge**. It creates summaries, comparisons, and patterns that help decision-makers interpret what is happening.

## BI and the R.E.A.D. Framework

The R.E.A.D. framework from Chapter 2 also applies here. BI does not replace R.E.A.D.; it operationalizes it.

| R.E.A.D. Stage             | BI Interpretation                            | Example                                                         |
| -------------------------- | -------------------------------------------- | --------------------------------------------------------------- |
| **Represent and Retrieve** | Capture and access reliable operational data | Store grades, attendance, and deliverables in relational tables |
| **Express and Explain**    | Present data in understandable forms         | Create reports, dashboards, charts, and KPI cards               |
| **Analyze and Associate**  | Identify patterns and relationships          | Compare attendance and performance; detect trends               |
| **Decide and Deploy**      | Use insight to guide action                  | Contact at-risk students; revise assessments                    |

BI is the practical layer that moves data from representation into explanation, analysis, and action.

<div class="callout key-takeaway">
   <p><strong>🔑 Key Takeaway:</strong> Business Intelligence turns databases into decision-support systems. The goal is not merely to know what happened, but to understand what it means and what action should follow.</p>
</div>

# 12.2 Operational Systems vs. Analytical Systems

## OLTP: Systems That Run the Business

Operational databases are often called **OLTP systems**, which stands for **Online Transaction Processing**. OLTP systems are designed to record and manage individual business events quickly and accurately.

Examples include recording a student grade, marking attendance, submitting an order, processing a payment, updating inventory, and registering a patient visit.

OLTP systems are optimized for:

- many small transactions,
- fast inserts and updates,
- high data integrity,
- concurrency control,
- current operational state.

A normalized Grading Database is an OLTP-style system. It is excellent for recording the correct score for the correct student on the correct deliverable.

## OLAP: Systems That Analyze the Business

Analytical systems are often called **OLAP systems**, which stands for **Online Analytical Processing**. OLAP systems are designed to summarize, compare, aggregate, and explore large amounts of data.

OLAP systems are optimized for:

- large scans,
- aggregations,
- historical analysis,
- multidimensional comparison,
- dashboards and reports.

An OLAP-style grading system might analyze trends across weeks, compare assignment categories, calculate pass rates, or identify patterns across sections.

## OLTP vs. OLAP

| Characteristic       | OLTP: Operational                    | OLAP: Analytical                                    |
| -------------------- | ------------------------------------ | --------------------------------------------------- |
| Primary purpose      | Record transactions                  | Analyze patterns                                    |
| Typical question     | What score did this student receive? | Which assignments have the lowest averages?         |
| Data focus           | Current, detailed records            | Historical and summarized data                      |
| Query style          | Short, row-level reads/writes        | Large aggregations and comparisons                  |
| Schema style         | Normalized relational schema         | Dimensional schema, star schema, or reporting views |
| Users                | Clerks, instructors, applications    | Analysts, managers, decision-makers                 |
| Performance priority | Fast transactions and integrity      | Fast reporting and exploration                      |

## Why Not Just Analyze the Operational Database?

It is possible to run analytical queries directly against operational tables, especially in small systems. In this course, that is often exactly what we do for learning. But in larger organizations, this creates problems.

Operational databases are not ideal for heavy analytics because:

1. **Analytical queries can slow down operations.** A dashboard query scanning millions of records may interfere with users trying to insert or update transactions.
2. **Operational schemas are normalized for integrity, not reporting.** Normalized designs may require many joins for simple reporting questions.
3. **Operational systems often store only the current state, not full history.** BI usually needs historical comparison.
4. **Data may come from many systems.** A single operational database rarely contains everything needed for enterprise analysis.
5. **Metrics need stable definitions.** Analytical systems need governed calculations that remain consistent across reports.

<div class="callout important">
   <p><strong>❗ Important:</strong> Normalization is excellent for operational correctness. Dimensional design is excellent for analytical usability. These are not contradictions. They serve different design goals.</p>
</div>

# 12.3 ETL and ELT: Moving Data into Analytical Systems

## What Is ETL?

> **Definition:** ETL stands for **Extract, Transform, Load**. It is the process of pulling data from source systems, cleaning and reshaping it, and loading it into an analytical environment.

ETL is the trust layer of BI. It ensures that the data used for reporting is not simply available, but meaningful, consistent, and ready for analysis.

| ETL Stage     | What Happens                         | Grading Database Example                                                         |
| ------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| **Extract**   | Pull data from source systems        | Read `STUDENT`, `DELIVERABLE`, `STUDENT_GRADE`, and `ATTENDANCE`                 |
| **Transform** | Clean, standardize, validate, derive | Convert scores to percentages; classify letter grades; calculate attendance rate |
| **Load**      | Store analytics-ready results        | Create reporting views, summary tables, or warehouse tables                      |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## The Transform Stage

The Transform step is usually the most important part of ETL. This is where business meaning is applied.

Common transformations include:

- removing duplicates,
- standardizing labels,
- handling missing values,
- validating score ranges,
- converting dates into weeks or semesters,
- calculating percentages,
- joining operational tables,
- applying business rules,
- creating risk categories.

## Why Operational Data Needs Transformation

Operational data is often "dirty" in ways that make direct analysis unreliable. Consider these real-world problems:

| Problem              | Example                                                                    | Why It Matters for BI                                                           |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Inconsistent codes   | "G" stored as gender instead of "M" or "F"                                 | Averages by gender become meaningless or incomplete                             |
| Impossible values    | Age recorded as "213"                                                      | Pulls averages and distributions far from reality                               |
| Missing values       | Scores left `NULL` for students who submitted work                         | Should the null count as zero or be excluded? The decision changes KPI values   |
| Duplicate labels     | "HW", "Homework", and "Home Work" all mean the same deliverable type       | `GROUP BY Type` splits one category into three, producing misleading breakdowns |
| Format inconsistency | Phone numbers stored as "(555) 123-4567", "5551234567", and "555-123-4567" | Joins and filters break on mismatched formats                                   |
| Overwritten history  | A student's grade is corrected, but the old value is lost                  | Trend analysis cannot distinguish a real improvement from a data correction     |

These problems are not hypothetical. A survey of operational databases in a typical organization will find every one of them. ETL exists because raw operational data, left untransformed, produces reports that people cannot trust.

## ETL Example in SQL

A simple ETL-style view can reshape normalized grading data into an analytics-ready dataset:

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
        WHEN sg.Score >= 90 THEN 'High'
        WHEN sg.Score >= 70 THEN 'On Track'
        ELSE 'At Risk'
    END AS PerformanceBand
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
    ON sg.DeliverableID = d.DeliverableID;
```

The operational tables remain normalized. The view provides an analytics-ready interface.

<div class="callout note">
   <p><strong>📝 Note on Missing Submissions:</strong> This view uses inner joins, so it includes only student-deliverable pairs that already have a grade row in <code>STUDENT_GRADE</code>. A <code>NULL</code> score here means a grade record exists with no score entered. To find deliverables with no grade record at all — truly missing submissions — we need a different query using <code>CROSS JOIN</code> and <code>LEFT JOIN</code>, shown later in Section 12.7 and the worked example in 12.12.</p>
</div>

## What Is ELT?

> **Definition:** ELT stands for **Extract, Load, Transform**. Data is loaded into the target system first, then transformed inside that system.

ELT is common in modern cloud warehouses because platforms such as BigQuery, Snowflake, Redshift, and PostgreSQL-based systems can perform transformations at scale.

| Approach | Sequence                   | Common Context                               |
| -------- | -------------------------- | -------------------------------------------- |
| **ETL**  | Extract → Transform → Load | Traditional warehouses, controlled pipelines |
| **ELT**  | Extract → Load → Transform | Cloud warehouses, large-scale raw ingestion  |

For this course, the practical lesson is simple: whether you call it ETL or ELT, BI requires explicit transformation logic. Raw operational data rarely becomes trustworthy insight automatically.

<div class="callout key-takeaway">
   <p><strong>🔑 Key Takeaway:</strong> ETL is not just data movement. It is the process through which organizations define what their data means and earn the right to be trusted.</p>
</div>

# 12.4 Data Warehouses, Data Marts, and Data Lakes

## What Is a Data Warehouse?

> **Definition:** A data warehouse is a centralized repository designed specifically for analysis, reporting, and decision support.

A data warehouse is different from an operational database. It is structured around analytical subjects and historical trends rather than daily transaction entry.

Classically, a data warehouse has four characteristics:

| Characteristic       | Meaning                                                  | Grading Example                                                      |
| -------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| **Subject-oriented** | Organized around major analytical subjects               | Student performance, attendance, deliverables                        |
| **Integrated**       | Combines data from multiple sources                      | Grades from Access, attendance from LMS, student info from registrar |
| **Time-variant**     | Preserves historical data                                | Scores and attendance across semesters                               |
| **Non-volatile**     | Data is loaded and preserved, not constantly overwritten | Historical snapshots remain for comparison                           |

## Metadata in BI

> **Definition:** Metadata is data about data. In BI, metadata documents what fields mean, where they came from, how they were transformed, and how often they are refreshed.

BI metadata may answer questions such as:

- What does `PassRate` mean?
- Is a missing score counted as zero or excluded?
- How often is the dashboard refreshed?
- Which operational tables feed this report?
- Who owns the definition of "at-risk student"?

Without metadata, users may see numbers but not understand them.

## Enterprise Data Warehouse vs. Data Mart

Organizations may build one large warehouse or several focused analytical stores.

| Structure                           | Scope                           | Strength                | Risk                          |
| ----------------------------------- | ------------------------------- | ----------------------- | ----------------------------- |
| **Enterprise Data Warehouse (EDW)** | Entire organization             | Single version of truth | Expensive and complex         |
| **Data Mart**                       | Specific department or function | Faster and more focused | Can create silos if unmanaged |

A university might have an EDW for institutional reporting, plus data marts for enrollment, advising, finance, and teaching analytics.

## Data Lakes

> **Definition:** A data lake stores raw data in its native format until it is needed for analysis.

Data lakes are useful when organizations want to preserve raw, flexible data for future exploration, data science, or machine learning.

| Feature         | Data Warehouse                     | Data Lake                                    |
| --------------- | ---------------------------------- | -------------------------------------------- |
| Data format     | Cleaned, structured                | Raw, structured/semi-structured/unstructured |
| Schema approach | Schema-on-write                    | Schema-on-read                               |
| Main users      | Analysts, managers                 | Data scientists, engineers                   |
| Best for        | Dashboards, KPIs, governed reports | Exploration, machine learning, raw archives  |

A warehouse is like a curated library. A data lake is like a large archive. Both can be useful, but they serve different purposes.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# 12.5 Dimensional Modeling: Facts, Dimensions, and Measures

## From Normalized Tables to Analytical Models

Operational databases are often normalized. Analytical databases often use **dimensional modeling**.

> **Definition:** Dimensional modeling is an analytical design approach that organizes data into **facts** and **dimensions** to support fast, understandable reporting.

The core idea is simple:

- Facts record measurable events.
- Dimensions describe the context of those events.

## Facts and Measures

A **fact** is an event or observation that can be measured. A **measure** is the numeric value stored in a fact table.

In the Grading Database:

| Fact Event                               | Measures                          |
| ---------------------------------------- | --------------------------------- |
| A student earns a score on a deliverable | Score, PointsPossible, Percentage |
| A student attends a class session        | AttendedFlag, AttendanceCount     |
| A student submits work                   | SubmissionCount, LateDays         |

Facts are usually narrow and numeric. They are the center of analytical calculations.

## Dimensions and Descriptors

A **dimension** provides context for a fact. Dimensions answer who, what, when, where, and how. Commonly used dimensions across industries are people, products, place, and time.

| Dimension   | Descriptors                        |
| ----------- | ---------------------------------- |
| Student     | StudentName, Email, Section, Major |
| Deliverable | Type, DeliverableNumber, Topic     |
| Time        | Date, Week, Month, Semester        |
| Course      | CourseCode, CourseName, Instructor |

Dimensions make facts interpretable. A score of 82 becomes meaningful when we know who earned it, on what deliverable, in which week, and under which grading policy.

## Star Schema

> **Definition:** A star schema is a dimensional model with one fact table at the center connected to surrounding dimension tables. It is the simplest and most widely used data mart schema.

A simple Grading Database star schema:

```text
              DIM_STUDENT
                   |
DIM_TIME ---- FACT_GRADES ---- DIM_DELIVERABLE
                   |
              DIM_COURSE
```

A more detailed representation:

```text
FACT_GRADES(
    StudentKey,
    DeliverableKey,
    TimeKey,
    CourseKey,
    Score,
    PointsPossible,
    PercentageScore
)

DIM_STUDENT(StudentKey, StudentID, StudentName, Section)
DIM_DELIVERABLE(DeliverableKey, Type, DeliverableNumber, Topic)
DIM_TIME(TimeKey, Date, Week, Month, Semester)
DIM_COURSE(CourseKey, CourseCode, Instructor)
```

The fact table contains foreign keys and measures. The dimension tables contain descriptive context. Dimensions provide structured labeling information to otherwise unordered numeric measures — they support filtering, grouping, and labeling.

## Why Star Schemas Are Denormalized

Star schemas intentionally repeat some descriptive values to make analysis easier and faster. This is not careless redundancy. It is controlled denormalization for analytical purposes.

| Operational Design                 | Analytical Design                    |
| ---------------------------------- | ------------------------------------ |
| Normalize to prevent anomalies     | Denormalize to simplify reporting    |
| Many small related tables          | Fewer, wider dimension tables        |
| Optimized for inserts and updates  | Optimized for reads and aggregations |
| Enforces current operational truth | Supports historical comparison       |

<div class="callout important">
   <p><strong>❗ Important:</strong> Denormalization is acceptable in BI because ETL controls how data enters the analytical system. Users query the warehouse; they do not manually update dimension tables during daily operations.</p>
</div>

## Snowflake Schema

A **snowflake schema** is a variation of a star schema in which dimensions are normalized into additional sub-tables. For example, instead of storing deliverable type information inside `DIM_DELIVERABLE`, a snowflake design might separate it:

```text
DIM_DELIVERABLE(DeliverableKey, DeliverableNumber, TypeKey, Topic)
DIM_DELIVERABLE_TYPE(TypeKey, TypeName, Weight)
```

Snowflake schemas reduce redundancy but add joins. Star schemas are often preferred for teaching and reporting because they are simpler to understand.

# 12.6 OLAP Operations: Exploring Data from Multiple Angles

OLAP systems support common analytical operations. These operations describe how users move through data.

| OLAP Operation | Meaning                           | Grading Example                                       | SQL Analogy                                           |
| -------------- | --------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| **Slice**      | Filter one dimension to one value | Show only quizzes                                     | `WHERE Type = 'Quiz'`                                 |
| **Dice**       | Filter multiple dimensions        | Quizzes in Section A during March                     | `WHERE Type='Quiz' AND Section='A' AND Month='March'` |
| **Drill-down** | Move from summary to detail       | Semester average → weekly average → deliverable score | More detailed `GROUP BY`                              |
| **Roll-up**    | Move from detail to summary       | Deliverable score → type average → course average     | Less detailed `GROUP BY`                              |
| **Pivot**      | Rotate analytical view            | Put deliverable types as columns instead of rows      | Conditional aggregation or pivot tool                 |

OLAP reports are sometimes called **OLAP cubes**. An OLAP cube uses dimensions as inputs and calculates measures as outputs. Excel PivotTables are a common way to create OLAP reports — they let users drag dimensions to rows, columns, and filters while displaying aggregated measures in the body.

## Slice Example

Question: What is the average score for quizzes only?

```sql
SELECT DeliverableType,
       ROUND(AVG(Score), 2) AS AvgQuizScore
FROM GradeBI
WHERE DeliverableType = 'Quiz'
GROUP BY DeliverableType;
```

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Dice Example

Question: What is the average quiz score for students in Section A after October 1?

```sql
SELECT Section,
       DeliverableType,
       ROUND(AVG(Score), 2) AS AvgScore
FROM GradeBI
WHERE DeliverableType = 'Quiz'
  AND Section = 'A'
  AND DueDate >= '2026-10-01'
GROUP BY Section, DeliverableType;
```

## Drill-Down Example

Question: How does performance change from assignment type to individual deliverable?

```sql
SELECT DeliverableType,
       DeliverableNumber,
       ROUND(AVG(Score), 2) AS AvgScore
FROM GradeBI
GROUP BY DeliverableType, DeliverableNumber
ORDER BY DeliverableType, DeliverableNumber;
```

## Roll-Up Example

Question: What is the overall class average by deliverable type?

```sql
SELECT DeliverableType,
       ROUND(AVG(Score), 2) AS AvgScore
FROM GradeBI
GROUP BY DeliverableType;
```

## Pivot-Style Example

SQL pivot syntax varies by platform. A portable approach uses conditional aggregation:

```sql
SELECT StudentName,
       ROUND(AVG(CASE WHEN DeliverableType = 'Quiz' THEN Score END), 2) AS QuizAvg,
       ROUND(AVG(CASE WHEN DeliverableType = 'Exam' THEN Score END), 2) AS ExamAvg,
       ROUND(AVG(CASE WHEN DeliverableType = 'Project' THEN Score END), 2) AS ProjectAvg
FROM GradeBI
GROUP BY StudentName
ORDER BY StudentName;
```

This rotates deliverable types into columns, making student performance easier to compare across categories.

After analysts slice, dice, summarize, and compare data, they often use those summaries to create actionable segments. RFM analysis is one classic example.

## Applied BI Technique: RFM Analysis

RFM analysis is a marketing technique used to rank and group customers based on three dimensions of their transaction history. It is one of the most widely taught analytical methods in BI because it connects data directly to business action.

| Dimension     | Meaning                                        | Question Answered                     |
| ------------- | ---------------------------------------------- | ------------------------------------- |
| **Recency**   | How recently did the customer make a purchase? | Is this customer still active?        |
| **Frequency** | How often does the customer purchase?          | Is this customer loyal or occasional? |
| **Monetary**  | How much money has the customer spent?         | What is the customer's total value?   |

The idea is simple: customers who purchased recently, purchase often, and spend more are usually the most valuable. RFM analysis converts transaction records into actionable segments such as "high-value loyal," "at risk of leaving," or "lost — do not invest further."

RFM connects directly to the Grading Database. Imagine applying the same logic to student performance:

| RFM Dimension             | Grading Database Analogy                               | BI Question                              |
| ------------------------- | ------------------------------------------------------ | ---------------------------------------- |
| Recency                   | How recently did the student submit work?              | Is the student currently engaged?        |
| Frequency                 | How consistently does the student submit deliverables? | Is the student developing steady habits? |
| Monetary (or Performance) | What is the student's average score?                   | Is the student meeting expectations?     |

An instructor could use an RFM-style analysis to segment students into groups for targeted intervention: high-performing and engaged (no action needed), performing but disengaging (reach out), struggling but trying (offer support), and disengaged and low-performing (urgent intervention).

RFM is a reminder that BI is not just about dashboards. It is about using data to make smarter operational decisions — whether the "customers" are shoppers, patients, students, or citizens.

# 12.7 SQL as a BI Tool

## BI Begins with Good Queries

BI tools may look visual, but the logic underneath is often SQL. Dashboards, reports, KPIs, and data models depend on queries that filter, join, aggregate, and classify data correctly.

A useful BI query usually does at least one of the following:

- joins operational tables into an analytical view,
- groups records into meaningful categories,
- computes a metric,
- applies a business rule,
- labels or flags results,
- supports reuse through a view.

## Creating a Reusable BI View

```sql
CREATE VIEW StudentPerformanceBI AS
SELECT
    s.StudentID,
    s.FirstName || ' ' || s.LastName AS StudentName,
    d.Type AS DeliverableType,
    d.DeliverableNumber,
    d.DueDate,
    sg.Score,
    CASE
        WHEN sg.Score >= 90 THEN 'High'
        WHEN sg.Score >= 70 THEN 'On Track'
        WHEN sg.Score IS NULL THEN 'Missing'
        ELSE 'At Risk'
    END AS PerformanceStatus
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
    ON sg.DeliverableID = d.DeliverableID;
```

This view turns a normalized operational structure into a reusable reporting layer.

## KPI Query: Pass Rate

```sql
SELECT
    ROUND(
        100.0 * COUNT(CASE WHEN Score >= 60 THEN 1 END) / COUNT(*),
        1
    ) AS PassRatePercent
FROM StudentPerformanceBI;
```

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## KPI Query: Missing Submission Count

A complete missing-submission report requires every expected student-deliverable pair. That means using `CROSS JOIN` and `LEFT JOIN`.

```sql
SELECT
    COUNT(*) AS MissingSubmissionCount
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
   AND d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL;
```

## KPI Query: At-Risk Students

```sql
SELECT
    StudentName,
    ROUND(AVG(Score), 2) AS AverageScore,
    COUNT(*) AS GradedItems
FROM StudentPerformanceBI
GROUP BY StudentID, StudentName
HAVING AVG(Score) < 70
ORDER BY AverageScore ASC;
```

## Trend Query: Average Score by Week

```sql
SELECT
    strftime('%W', DueDate) AS WeekNumber,
    ROUND(AVG(Score), 2) AS AvgScore
FROM StudentPerformanceBI
GROUP BY strftime('%W', DueDate)
ORDER BY WeekNumber;
```

> **Note:** In PostgreSQL, use `EXTRACT(WEEK FROM DueDate)` or `TO_CHAR(DueDate, 'IW')` instead of SQLite's `strftime()`.

## Access Version: Average Score by Deliverable Type

Microsoft Access uses slightly different syntax:

```sql
SELECT
    DELIVERABLE.Type,
    Avg(STUDENT_GRADE.Score) AS AvgScore
FROM DELIVERABLE
INNER JOIN STUDENT_GRADE
    ON DELIVERABLE.DeliverableID = STUDENT_GRADE.DeliverableID
GROUP BY DELIVERABLE.Type;
```

The concept is the same. The dialect changes.

# 12.8 Reports, Dashboards, and Visualization

## From Rows to Recognition

SQL produces rows and columns. Decision-makers often need patterns, trends, exceptions, and thresholds. Visualization helps convert query output into something people can interpret quickly.

<div class="callout tip">
   <p><strong>💡 Looking Ahead:</strong> In Chapter 14, these same SQL views and KPI definitions will become the foundation for Power BI dashboards. Power BI does not replace the BI layer built here — it visualizes and interacts with it. The analytical views and queries you create now are the data source that Power BI connects to.</p>
</div>

BI outputs usually fall into three categories:

| Output Type   | Purpose                             | Example                     |
| ------------- | ----------------------------------- | --------------------------- |
| **Report**    | Structured, often scheduled summary | Weekly grade summary        |
| **Dashboard** | Interactive monitoring surface      | Class performance dashboard |
| **KPI Card**  | Single metric status indicator      | Pass rate = 82%             |

## Choosing the Right Visualization

| Analytical Question                     | Recommended Visualization                           |
| --------------------------------------- | --------------------------------------------------- |
| Compare categories                      | Bar chart                                           |
| Show trend over time                    | Line chart                                          |
| Show distribution                       | Histogram or box plot                               |
| Show relationship between two variables | Scatter plot                                        |
| Show single target metric               | KPI card                                            |
| Show part-to-whole                      | Stacked bar; pie chart only for very few categories |

## Grading Database Dashboard Example

A simple instructor dashboard might include:

| Dashboard Element                      | BI Question                        | Query Source               |
| -------------------------------------- | ---------------------------------- | -------------------------- |
| KPI card: average class score          | How is the class doing overall?    | `AVG(Score)`               |
| KPI card: missing submissions          | How much work is unsubmitted?      | Cross join + left join     |
| Bar chart: average by deliverable type | Which categories are hardest?      | `GROUP BY DeliverableType` |
| Line chart: average score by week      | Are scores improving or declining? | Time-based grouping        |
| Table: at-risk students                | Who needs attention?               | `HAVING AVG(Score) < 70`   |
| Filter: deliverable type               | Which category should we inspect?  | Dashboard slicer           |

## Characteristics of Effective BI Reporting

Effective BI reporting should be:

1. **Accurate:** built on correct data and tested logic.
2. **Timely:** available when decisions need to be made.
3. **Consistent:** metrics mean the same thing across reports.
4. **Interpretable:** users can understand the output without decoding it.
5. **Actionable:** the report suggests what might need attention.
6. **Ethical:** sensitive data is protected and presented responsibly.

<div class="callout warning">
   <p><strong>⚠️ Common Mistake:</strong> A beautiful dashboard built on unclear metric definitions is not BI. It is decoration with numbers.</p>
</div>

## Visualization Pitfalls

| Mistake                 | Why It Hurts                                        |
| ----------------------- | --------------------------------------------------- |
| Too many charts         | Users do not know where to look                     |
| Inconsistent scales     | Comparisons become misleading                       |
| Unlabeled axes          | Interpretation becomes guesswork                    |
| Decorative 3D charts    | Visual style distorts values                        |
| Too many colors         | Attention is scattered                              |
| Metrics without targets | Users cannot tell whether the number is good or bad |

Clarity beats decoration. Always.

# 12.9 KPIs, Targets, and the Balanced Scorecard

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## What Is a KPI?

> **Definition:** A Key Performance Indicator, or KPI, is a measurable signal used to evaluate progress toward a goal.

A KPI is not just any number. It must connect to an objective.

| Weak Metric               | Better KPI                                          |
| ------------------------- | --------------------------------------------------- |
| Number of grades entered  | Percentage of deliverables graded within seven days |
| Number of students        | Percentage of students passing                      |
| Number of attendance rows | Attendance rate by week                             |
| Average score             | Average score compared with target                  |

A KPI becomes useful when it has context: a target, a time period, an owner, a decision rule, and a clear definition. Here is a reusable template for defining any KPI:

| Field                 | Description                                | Grading Database Example                         |
| --------------------- | ------------------------------------------ | ------------------------------------------------ |
| **KPI name**          | What the metric is called                  | At-Risk Rate                                     |
| **Goal**              | What the KPI helps achieve                 | Identify students needing intervention           |
| **Formula**           | Exact calculation                          | Students with average below 70 / active students |
| **Grain**             | Level of detail                            | Student-course                                   |
| **Refresh frequency** | How often it is recalculated               | Weekly                                           |
| **Threshold**         | Value that triggers action                 | Alert if above 20%                               |
| **Owner**             | Who is responsible for the metric          | Instructor or course coordinator                 |
| **Action**            | What happens when the threshold is crossed | Send outreach or offer support                   |

## KPI Example: At-Risk Rate

```sql
WITH StudentAverages AS (
    SELECT
        StudentID,
        AVG(Score) AS AvgScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
)
SELECT
    ROUND(
        100.0 * COUNT(CASE WHEN AvgScore < 70 THEN 1 END) / COUNT(*),
        1
    ) AS AtRiskRatePercent
FROM StudentAverages;
```

This KPI is useful only if the organization defines what happens when the at-risk rate exceeds a threshold.

## The Balanced Scorecard

The **Balanced Scorecard** is a performance management framework that organizes metrics into multiple perspectives rather than relying only on financial or outcome metrics.

A common version includes four perspectives:

| Perspective                | Main Question                         | University/Teaching Example                   |
| -------------------------- | ------------------------------------- | --------------------------------------------- |
| **Financial / Resource**   | Are resources being used effectively? | Cost per student supported                    |
| **Customer / Stakeholder** | Are stakeholders satisfied?           | Student satisfaction, advising responsiveness |
| **Internal Process**       | Are processes working well?           | Average grading turnaround time               |
| **Learning and Growth**    | Is the organization improving?        | Faculty development, course redesign outcomes |

For the Grading Database, a course-level Balanced Scorecard might include:

| Perspective          | KPI                          | Possible Action               |
| -------------------- | ---------------------------- | ----------------------------- |
| Student success      | Pass rate                    | Identify at-risk students     |
| Internal process     | Grading turnaround time      | Adjust grading workflow       |
| Engagement           | Weekly attendance rate       | Contact absent students       |
| Learning improvement | Score trend over semester    | Revise difficult modules      |
| Equity/fairness      | Outcome gaps across sections | Review assessment consistency |

The Balanced Scorecard matters because it prevents metric tunnel vision. A course could have high average grades but poor attendance, delayed feedback, or unequal outcomes across student groups. BI should support a balanced view of performance.

# 12.10 BI Governance and Data Quality

## Why Governance Matters

BI systems can fail even when the technology works. The most common reason is lack of governance.

Without governance, different teams define the same metric differently, dashboards conflict, sensitive data is overexposed, data quality problems go unassigned, and users stop trusting reports.

## A Governance Failure in Practice

Consider a university where two departments independently report "student retention rate." The Registrar defines it as *percentage of fall-enrolled students who enroll the following fall*. Student Affairs defines it as *percentage of first-year students who graduate within six years*. The Provost's dashboard pulls from both sources and displays "Retention = 91%" on one panel and "Retention = 68%" on another. Trustees see the discrepancy during a board meeting and question the data's reliability. The problem is not the database. The problem is that no one governed the definition of "retention" before it appeared on a dashboard.

This kind of failure happens regularly in organizations that invest in BI technology before investing in BI governance. The cost is not technical — it is loss of trust.

Governance answers the human and organizational questions behind BI:

- Who owns this metric?
- What exactly does it mean?
- Who is allowed to see it?
- How often is it refreshed?
- What should happen when data is wrong?

## Metric Definitions

A BI environment needs shared definitions.

Example: "Pass rate" could mean:

1. percentage of submitted assignments with score ≥ 60,
2. percentage of students with final average ≥ 60,
3. percentage of students currently passing based only on graded work,
4. percentage of enrolled students expected to pass by semester end.

Those are different metrics. They may all be useful, but they cannot share the same name.

A metric definition should include:

| Metadata Item    | Example                                            |
| ---------------- | -------------------------------------------------- |
| Metric name      | Pass Rate                                          |
| Formula          | Students with average ≥ 60 / total active students |
| Grain            | Student-semester                                   |
| Refresh schedule | Daily at 2:00 a.m.                                 |
| Data owner       | Course coordinator                                 |
| Exclusions       | Withdrawn students excluded                        |
| Action threshold | Alert if below 75%                                 |

## Data Stewardship

A **data steward** is responsible for the meaning, quality, and appropriate use of data in a domain.

In a university, different stewards may own student records, course enrollment, grades, financial aid, advising notes, and attendance records. DBAs and analysts manage technical infrastructure and queries. Data stewards manage meaning and policy.

## Access Control for BI

BI dashboards often summarize sensitive information. Summaries can still expose risk.

Examples:

- A dashboard showing one student in a small group may reveal that student's performance.
- A class comparison dashboard may encourage unfair ranking.
- A public chart may expose information that should remain private.

BI systems should apply role-based access control, row-level security, and aggregation thresholds when appropriate.

<div class="callout important">
   <p><strong>❗ Important:</strong> Security does not stop at the operational database. Reports, dashboards, exports, and screenshots also require governance.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# 12.11 BI Across Access, SQLite, and Supabase

BI logic is portable. Tools differ, but the analytical thinking remains the same.

| Platform                | Best BI Use                         | Strength                           | Limitation                                      |
| ----------------------- | ----------------------------------- | ---------------------------------- | ----------------------------------------------- |
| **Microsoft Access**    | Visual reports and small dashboards | Easy forms, queries, reports       | Limited scalability and security                |
| **SQLite**              | SQL-based BI sandbox                | Lightweight, transparent, portable | Limited multi-user/server features              |
| **Supabase/PostgreSQL** | Cloud-hosted analytical backend     | Robust SQL, views, security, APIs  | Requires stronger administration and governance |

## Access BI Pattern

In Access, students can create queries using Query Design or SQL View, save analytical queries, build reports from those queries, create forms or navigation screens that act like simple dashboards, and export results to Excel or Power BI. Access is useful because it makes the BI pipeline visible.

## SQLite BI Pattern

In SQLite, students can create views and run analytical SQL:

```sql
CREATE VIEW DeliverablePerformance AS
SELECT
    d.Type,
    d.DeliverableNumber,
    ROUND(AVG(sg.Score), 2) AS AvgScore,
    COUNT(sg.GradeID) AS SubmissionCount
FROM DELIVERABLE AS d
JOIN STUDENT_GRADE AS sg
    ON d.DeliverableID = sg.DeliverableID
GROUP BY d.Type, d.DeliverableNumber;
```

Then query the view:

```sql
SELECT *
FROM DeliverablePerformance
ORDER BY AvgScore ASC;
```

## Supabase/PostgreSQL BI Pattern

In Supabase/PostgreSQL, views can support dashboards and APIs:

```sql
CREATE VIEW student_summary AS
SELECT
    s.student_id,
    s.first_name || ' ' || s.last_name AS student_name,
    ROUND(AVG(sg.score), 2) AS avg_score,
    COUNT(sg.grade_id) AS graded_items
FROM student AS s
JOIN student_grade AS sg
    ON s.student_id = sg.student_id
GROUP BY s.student_id, s.first_name, s.last_name;
```

Cloud BI adds governance concerns: Who can query the view? Should students see only their own rows? Should dashboards use row-level security? How often should data refresh? What happens if the query becomes expensive?

The tool changes. The BI questions remain.

# 12.12 Worked Example: Building a Simple BI Layer for the Grading Database

This section brings the chapter together with a practical mini-project. The goal is to create a small BI layer using the Grading Database.

## Step 1: Define the BI Questions

Suppose an instructor wants to know:

1. What is the average score by deliverable type?
2. Which students are currently at risk?
3. How many submissions are missing?
4. Are scores improving or declining over time?
5. Does attendance appear related to performance?

These are BI questions because they support monitoring and action.

## Step 2: Create a Core Analytical View

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

## Step 3: Create a Deliverable Performance Report

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

This report identifies deliverables that may need review.

## Step 4: Create an At-Risk Student Report

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

This report supports intervention.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Step 5: Create a Missing Submission Report

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
ORDER BY s.LastName, d.DueDate;
```

This report uses the idea that BI often requires identifying what is absent, not just what exists.

## Step 6: Create an Attendance-Performance View

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

This view lets the instructor explore whether attendance and performance move together.

## Step 7: Translate Queries into Dashboard Elements

| Dashboard Element             | Query Result                      | Decision Use                   |
| ----------------------------- | --------------------------------- | ------------------------------ |
| Average class score           | `AVG(Score)`                      | Overall performance monitoring |
| At-risk count                 | Students with `AVG(Score) < 70`   | Intervention planning          |
| Missing submissions           | Missing student-deliverable pairs | Follow-up reminders            |
| Avg score by deliverable type | Grouped grade report              | Assessment redesign            |
| Attendance-performance table  | AttendancePerformance view        | Engagement analysis            |

The BI layer is not the dashboard itself. It is the reliable analytical foundation that the dashboard depends on.

# Practice Lab: Build Your Own BI Layer

Apply what you learned in this chapter by building a small BI layer on your own Grading Database. This lab reinforces the BI pipeline from operational data to governed insight.

## What to Submit

Create and submit the following five deliverables:

**1. One Analytical View**

Create a SQL view (or saved Access query) that combines student, deliverable, and grade data into a reporting-ready structure. Include at least one `CASE` expression that classifies rows into meaningful categories. Name your view and document what each column means.

**2. Three KPI Queries**

Write three queries that each produce a single KPI value. At least one should use a threshold or target comparison. For each KPI, complete this template:

| Field     | Your KPI |
| --------- | -------- |
| KPI name  |          |
| Formula   |          |
| Grain     |          |
| Threshold |          |
| Owner     |          |

**3. One Missing-Submission Query**

Write a query that identifies student-deliverable pairs with no grade record. Use `CROSS JOIN` and `LEFT JOIN` as shown in Section 12.7 and the worked example. Explain in one sentence why an inner-join view alone cannot produce this report.

**4. One Dashboard Sketch**

Draw or describe a simple dashboard layout with at least four elements. For each element, identify the BI question it answers, the query or view that feeds it, and the visualization type you would use (KPI card, bar chart, line chart, table, or filter).

**5. One Governance Note**

Choose one of your KPIs and write a governance note that defines it clearly enough that another instructor could reproduce it without asking you questions. Include the formula, data sources, exclusions, refresh schedule, and owner.

## Grading Rubric

| Deliverable              | What We Look For                                                             |
| ------------------------ | ---------------------------------------------------------------------------- |
| Analytical view          | Correct joins, clear naming, at least one CASE expression                    |
| KPI queries (3)          | Correct SQL, threshold logic, completed KPI template for each                |
| Missing-submission query | Correct CROSS JOIN + LEFT JOIN pattern, explanation of inner-join limitation |
| Dashboard sketch         | Four distinct elements, each tied to a BI question and query source          |
| Governance note          | Formula, sources, exclusions, schedule, and owner all specified              |

# Chapter Summary

Business Intelligence is the organizational capability that turns reliable data into performance insight. Earlier chapters showed how to design, query, normalize, and administer databases. This chapter showed how those foundations support reporting, dashboards, KPIs, and decision-making.

The chapter distinguished operational systems from analytical systems. Operational databases are designed to record transactions accurately and safely. Analytical systems are designed to summarize, compare, and explain patterns across many records. Both are necessary, but they serve different goals.

ETL and ELT pipelines move data from operational sources into analytical environments. These pipelines do more than transfer records. They clean data, standardize definitions, apply business rules, and create trustworthy analytical structures. As the data-quality examples showed, raw operational data — with inconsistent labels, missing values, and impossible entries — produces misleading reports until it is deliberately transformed.

Data warehouses, data marts, and data lakes provide different ways to organize analytical data. Warehouses and marts emphasize structured, governed reporting. Data lakes preserve raw flexibility for exploration and advanced analytics. Dimensional modeling then organizes analytical data into facts, measures, dimensions, and descriptors. Star schemas use controlled denormalization to make reporting faster and easier. OLAP operations — slice, dice, drill-down, roll-up, and pivot — let analysts explore data from multiple angles. RFM analysis is a classic example of using those operations to translate transactions into customer segments.

The chapter also covered dashboards, KPIs, and the Balanced Scorecard. These tools help decision-makers monitor performance, identify trends, and choose actions. However, BI requires governance. As the retention-rate example showed, without consistent metric definitions, data stewardship, and access control, dashboards can create confusion instead of insight. Two departments reporting different "retention" numbers on the same dashboard is not a technology failure — it is a governance failure.

In Chapter 14, we will apply these BI concepts directly using Power BI, turning the analytical foundations built here into interactive dashboards, reports, and visualizations. The Practice Lab at the end of this chapter gives you a chance to build your own BI layer before moving to Power BI.

The main lesson is that BI is not magic layered on top of data. It is the result of disciplined design, careful transformation, clear metrics, and responsible interpretation. A dashboard is only as trustworthy as the database, ETL logic, and governance behind it.

# References

Inmon, W. H. (2005). *Building the data warehouse* (4th ed.). Wiley.

Kimball, R., & Ross, M. (2013). *The data warehouse toolkit: The definitive guide to dimensional modeling* (3rd ed.). Wiley.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Turban, E., Sharda, R., Delen, D., & King, D. (2018). *Business intelligence, analytics, and data science: A managerial perspective* (4th ed.). Pearson.
