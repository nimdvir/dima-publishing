<!-- metadata: date="2026-05-18"; chapter="12"; section="main-rewritten"; title="Chapter 12 – Business Intelligence and Analytics for Performance Improvement"; description="Introduces Business Intelligence as the organizational capability that transforms operational data into insight, evaluation, and informed decision support through warehouses, ETL, dimensional modeling, dashboards, KPIs, and governance."; author="Nimrod Dvir, PhD" -->
# Chapter 12: Business Intelligence and Analytics for Performance Improvement

*Turning Operational Data into Strategic Insight*

Business Intelligence, or **BI**, is where the database becomes useful to managers. Earlier chapters focused on how data is structured, queried, designed, and administered. Chapter 12 shifts to the question that motivates all of that work:

> How do organizations use reliable data to understand performance and make better decisions?

An operational database records what happened. A BI system helps explain what those events mean. A grading database records scores, attendance, deliverables, and due dates. A BI system asks whether students are improving, which deliverables are most difficult, whether attendance relates to performance, and where intervention may be needed.

This chapter introduces the major concepts behind BI: operational versus analytical systems, data warehouses, ETL and ELT pipelines, dimensional modeling, star schemas, OLAP operations, dashboards, KPIs, governance, and the Balanced Scorecard. The running example is the **Grading Database**, because the same ideas apply whether an organization is analyzing student performance, retail sales, patient outcomes, financial transactions, or customer behavior.

Business Intelligence is not simply a reporting tool. It is an organizational capability. It combines databases, analytical structures, queries, visualization, governance, and managerial judgment. Good BI does not make decisions for people. It gives people better evidence for making decisions.

## Chapter Roadmap

| Section | Main Question | Core Ideas |
|---|---|---|
| 12.1 | What is Business Intelligence? | BI, decision support, DIKW, R.E.A.D. |
| 12.2 | Why separate operations from analytics? | OLTP, OLAP, operational systems, analytical systems |
| 12.3 | How does data move into BI systems? | ETL, ELT, data integration, data quality |
| 12.4 | What is a data warehouse? | EDW, data marts, metadata, data lakes |
| 12.5 | How is analytical data modeled? | Facts, dimensions, measures, star schema |
| 12.6 | How do analysts explore analytical data? | Slice, dice, drill-down, roll-up, pivot |
| 12.7 | How does SQL support BI? | Views, aggregation, KPIs, analytical queries |
| 12.8 | How do dashboards communicate insight? | Reports, dashboards, visualizations, KPI cards |
| 12.9 | How is performance managed? | KPIs, targets, Balanced Scorecard |
| 12.10 | Why does BI need governance? | Metric definitions, stewardship, access, trust |
| 12.11 | How does BI differ across platforms? | Access, SQLite, Supabase/PostgreSQL |
| 12.12 | How do we build a simple BI layer? | Grading Database analytics example |

## Learning Objectives

After completing this chapter, you will be able to:

1. Explain what Business Intelligence is and how it supports organizational decision-making.
2. Distinguish between operational systems and analytical systems.
3. Explain why normalized operational databases are not always ideal for reporting and analytics.
4. Describe the role of ETL and ELT in moving data from operational sources into analytical structures.
5. Define data warehouse, enterprise data warehouse, data mart, data lake, and metadata.
6. Distinguish facts, dimensions, measures, and descriptors in dimensional modeling.
7. Interpret a star schema and explain how it supports analytical queries.
8. Describe OLAP operations such as slice, dice, drill-down, roll-up, and pivot.
9. Create basic BI queries and views using SQL.
10. Explain how reports, dashboards, and KPIs communicate analytical results.
11. Describe how the Balanced Scorecard connects metrics to organizational strategy.
12. Explain why BI governance is essential for consistent, trustworthy decision-making.

---

## 12.1 Business Intelligence Fundamentals

### What Is Business Intelligence?

> **Definition:** Business Intelligence is the collection of concepts, architectures, tools, and practices that help organizations transform data into information, insight, and decision support.

BI is not the same thing as storing data. It is also not the same thing as writing a single query. BI is the larger process of turning operational records into evidence that supports monitoring, evaluation, planning, and action.

Operational systems answer questions such as:

- Did this student submit Quiz 2?
- What score did Student 102 receive on Exam 1?
- Was Student 205 marked present on February 12?
- What grade record was updated today?

BI systems answer broader questions:

- Are students improving or declining over time?
- Which deliverable types have the lowest average scores?
- How does attendance relate to performance?
- Which students may need intervention before the final exam?
- Are course outcomes consistent across sections or semesters?

The first set of questions supports daily operations. The second set supports analysis, evaluation, and management.

### BI as Decision Support

BI systems help managers and analysts do four things:

| BI Function | What It Means | Grading Database Example |
|---|---|---|
| **Monitor** | Track current performance | Average score by deliverable type |
| **Compare** | Examine differences across groups or periods | Quiz averages by week or section |
| **Diagnose** | Identify possible causes or risks | Low scores concentrated after missed attendance |
| **Act** | Support decisions or interventions | Contact students whose average is below 70 |

This is why BI belongs in a database course. Databases are not valuable only because they store data. They are valuable because they support better decisions.

### BI and the DIKW Hierarchy

The DIKW hierarchy helps explain the intellectual movement behind BI:

| DIKW Level | Meaning | Grading Example |
|---|---|---|
| **Data** | Raw facts | `StudentID = 101`, `Score = 72` |
| **Information** | Organized data with context | Average Quiz 2 score is 76 |
| **Knowledge** | Interpreted patterns | Quiz scores decline after attendance drops |
| **Wisdom** | Judgment and action | Add an intervention before the next quiz |

BI sits mainly between **information** and **knowledge**. It creates summaries, comparisons, and patterns that help decision-makers interpret what is happening.

### BI and the R.E.A.D. Framework

The R.E.A.D. framework from Chapter 2 is also useful here. BI does not replace R.E.A.D.; it operationalizes it.

| R.E.A.D. Stage | BI Interpretation | Example |
|---|---|---|
| **Represent and Retrieve** | Capture and access reliable operational data | Store grades, attendance, and deliverables in relational tables |
| **Express and Explain** | Present data in understandable forms | Create reports, dashboards, charts, and KPI cards |
| **Analyze and Associate** | Identify patterns and relationships | Compare attendance and performance; detect trends |
| **Decide and Deploy** | Use insight to guide action | Contact at-risk students; revise assessments; change policy |

BI is therefore the practical layer that moves data from representation into explanation, analysis, and action.

> **Key Takeaway:** Business Intelligence turns databases into decision-support systems. The goal is not merely to know what happened, but to understand what it means and what action should follow.

---

## 12.2 Operational Systems vs. Analytical Systems

### OLTP: Systems That Run the Business

Operational databases are often called **OLTP systems**, which stands for **Online Transaction Processing**. OLTP systems are designed to record and manage individual business events quickly and accurately.

Examples include:

- recording a student grade,
- marking attendance,
- submitting an order,
- processing a payment,
- updating inventory,
- registering a patient visit.

OLTP systems are optimized for:

- many small transactions,
- fast inserts and updates,
- high data integrity,
- concurrency control,
- current operational state.

A normalized Grading Database is an OLTP-style system. It is excellent for recording the correct score for the correct student on the correct deliverable.

### OLAP: Systems That Analyze the Business

Analytical systems are often called **OLAP systems**, which stands for **Online Analytical Processing**. OLAP systems are designed to summarize, compare, aggregate, and explore large amounts of data.

OLAP systems are optimized for:

- large scans,
- aggregations,
- historical analysis,
- multidimensional comparison,
- dashboards and reports.

An OLAP-style grading system might analyze trends across weeks, compare assignment categories, calculate pass rates, or identify patterns across sections.

### OLTP vs. OLAP

| Characteristic | OLTP: Operational | OLAP: Analytical |
|---|---|---|
| Primary purpose | Record transactions | Analyze patterns |
| Typical question | What score did this student receive? | Which assignments have the lowest averages? |
| Data focus | Current, detailed records | Historical and summarized data |
| Query style | Short, row-level reads/writes | Large aggregations and comparisons |
| Schema style | Normalized relational schema | Dimensional schema, star schema, or reporting views |
| Users | Clerks, instructors, applications | Analysts, managers, decision-makers |
| Performance priority | Fast transactions and integrity | Fast reporting and exploration |

### Why Not Just Analyze the Operational Database?

It is possible to run analytical queries directly against operational tables, especially in small systems. In this course, that is often exactly what we do for learning. But in larger organizations, this creates problems.

Operational databases are not ideal for heavy analytics because:

1. **Analytical queries can slow down operations.** A dashboard query scanning millions of records may interfere with users trying to insert or update transactions.
2. **Operational schemas are normalized for integrity, not reporting convenience.** Normalized designs may require many joins for simple reporting questions.
3. **Operational systems often store the current state, not full history.** BI usually needs historical comparison.
4. **Data may come from many systems.** A single operational database rarely contains everything needed for enterprise analysis.
5. **Metrics need stable definitions.** Analytical systems need governed calculations that remain consistent across reports.

> **Important:** Normalization is excellent for operational correctness. Dimensional design is excellent for analytical usability. These are not contradictions. They are different design goals.

---

## 12.3 ETL and ELT: Moving Data into Analytical Systems

### What Is ETL?

> **Definition:** ETL stands for **Extract, Transform, Load**. It is the process of pulling data from source systems, cleaning and reshaping it, and loading it into an analytical environment.

ETL is the trust layer of BI. It ensures that the data used for reporting is not simply available, but meaningful, consistent, and ready for analysis.

| ETL Stage | What Happens | Grading Database Example |
|---|---|---|
| **Extract** | Pull data from source systems | Read `STUDENT`, `DELIVERABLE`, `STUDENT_GRADE`, and `ATTENDANCE` |
| **Transform** | Clean, standardize, validate, derive | Convert scores to percentages; classify letter grades; calculate attendance rate |
| **Load** | Store analytics-ready results | Create reporting views, summary tables, or warehouse tables |

### The Transform Stage

The Transform step is usually the most important part of ETL. This is where business meaning is applied.

Common transformations include:

- removing duplicates,
- standardizing labels,
- handling missing values,
- validating score ranges,
- converting dates into weeks or semesters,
- calculating percentages,
- joining operational tables,
- applying grading rules,
- creating risk categories.

Example transformations in the Grading Database:

| Raw Data Problem | Transformation |
|---|---|
| `NULL` score | Mark as `Missing` or exclude from average, depending on policy |
| Score out of range | Flag values below 0 or above maximum points |
| Multiple labels for same category | Standardize `HW`, `Homework`, and `Home Work` as `Homework` |
| Due dates stored as dates | Add week number, month, semester, and academic term |
| Raw score | Convert to percentage using points possible |

### ETL Example in SQL

A simple ETL-style view can reshape normalized grading data into an analytics-ready dataset:

```sql
CREATE VIEW GradeAnalytics AS
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

### What Is ELT?

> **Definition:** ELT stands for **Extract, Load, Transform**. Data is loaded into the target system first, then transformed inside that system.

ELT is common in modern cloud warehouses because platforms such as BigQuery, Snowflake, Redshift, and PostgreSQL-based systems can perform transformations at scale.

| Approach | Sequence | Common Context |
|---|---|---|
| **ETL** | Extract → Transform → Load | Traditional warehouses, controlled pipelines |
| **ELT** | Extract → Load → Transform | Cloud warehouses, large-scale raw ingestion |

For this course, the practical lesson is simple: whether you call it ETL or ELT, BI requires explicit transformation logic. Raw operational data rarely becomes trustworthy insight automatically.

> **Key Takeaway:** ETL is not just data movement. It is the process through which organizations define what their data means.

---

## 12.4 Data Warehouses, Data Marts, and Data Lakes

### What Is a Data Warehouse?

> **Definition:** A data warehouse is a centralized repository designed specifically for analysis, reporting, and decision support.

A data warehouse is different from an operational database. It is structured around analytical subjects and historical trends rather than daily transaction entry.

Classically, a data warehouse has four characteristics:

| Characteristic | Meaning | Grading Example |
|---|---|---|
| **Subject-oriented** | Organized around major analytical subjects | Student performance, attendance, deliverables |
| **Integrated** | Combines data from multiple sources | Grades from Access, attendance from LMS, student info from registrar |
| **Time-variant** | Preserves historical data | Scores and attendance across semesters |
| **Non-volatile** | Data is loaded and preserved, not constantly overwritten | Historical snapshots remain available for comparison |

### Metadata in BI

> **Definition:** Metadata is data about data. In BI, metadata documents what fields mean, where they came from, how they were transformed, and how often they are refreshed.

BI metadata may answer questions such as:

- What does `PassRate` mean?
- Is a missing score counted as zero or excluded?
- How often is the dashboard refreshed?
- Which operational tables feed this report?
- Who owns the definition of “at-risk student”?

Without metadata, users may see numbers but not understand them.

### Enterprise Data Warehouse vs. Data Mart

Organizations may build one large warehouse or several focused analytical stores.

| Structure | Scope | Strength | Risk |
|---|---|---|---|
| **Enterprise Data Warehouse (EDW)** | Entire organization | Single version of truth | Expensive and complex |
| **Data Mart** | Specific department or function | Faster and more focused | Can create silos if unmanaged |

A university might have an EDW for institutional reporting, plus data marts for enrollment, advising, finance, and teaching analytics.

### Data Lakes

> **Definition:** A data lake stores raw data in its native format until it is needed for analysis.

Data lakes are useful when organizations want to preserve raw, flexible data for future exploration, data science, or machine learning.

| Feature | Data Warehouse | Data Lake |
|---|---|---|
| Data format | Cleaned, structured | Raw, structured/semi-structured/unstructured |
| Schema approach | Schema-on-write | Schema-on-read |
| Main users | Analysts, managers | Data scientists, engineers |
| Best for | Dashboards, KPIs, governed reports | Exploration, machine learning, raw archives |

A warehouse is like a curated library. A data lake is like a large archive. Both can be useful, but they serve different purposes.

---

## 12.5 Dimensional Modeling: Facts, Dimensions, and Measures

### From Normalized Tables to Analytical Models

Operational databases are often normalized. Analytical databases often use **dimensional modeling**.

> **Definition:** Dimensional modeling is an analytical design approach that organizes data into **facts** and **dimensions** to support fast, understandable reporting.

The core idea is simple:

- Facts record measurable events.
- Dimensions describe the context of those events.

### Facts and Measures

A **fact** is an event or observation that can be measured.

A **measure** is the numeric value stored in a fact table.

In the Grading Database:

| Fact Event | Measures |
|---|---|
| A student earns a score on a deliverable | Score, PointsPossible, Percentage |
| A student attends a class session | AttendedFlag, AttendanceCount |
| A student submits work | SubmissionCount, LateDays |

Facts are usually narrow and numeric. They are the center of analytical calculations.

### Dimensions and Descriptors

A **dimension** provides context for a fact. Dimensions answer who, what, when, where, and how.

| Dimension | Descriptors |
|---|---|
| Student | StudentName, Email, Section, Major |
| Deliverable | Type, DeliverableNumber, Topic |
| Time | Date, Week, Month, Semester |
| Course | CourseCode, CourseName, Instructor |

Dimensions make facts interpretable. A score of 82 becomes meaningful when we know who earned it, on what deliverable, in which week, and under which grading policy.

### Star Schema

> **Definition:** A star schema is a dimensional model with one fact table at the center connected to surrounding dimension tables.

A simple Grading Database star schema might look like this:

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

The fact table contains foreign keys and measures. The dimension tables contain descriptive context.

### Why Star Schemas Are Denormalized

Star schemas intentionally repeat some descriptive values to make analysis easier and faster. This is not careless redundancy. It is controlled denormalization for analytical purposes.

| Operational Design | Analytical Design |
|---|---|
| Normalize to prevent anomalies | Denormalize to simplify reporting |
| Many small related tables | Fewer, wider dimension tables |
| Optimized for inserts and updates | Optimized for reads and aggregations |
| Enforces current operational truth | Supports historical comparison |

> **Important:** Denormalization is acceptable in BI because ETL controls how data enters the analytical system. Users generally query the warehouse; they do not manually update dimension tables during daily operations.

### Snowflake Schema

A **snowflake schema** is a variation of a star schema in which dimensions are normalized into additional sub-tables.

For example, instead of storing deliverable type information inside `DIM_DELIVERABLE`, a snowflake design might separate it:

```text
DIM_DELIVERABLE(DeliverableKey, DeliverableNumber, TypeKey, Topic)
DIM_DELIVERABLE_TYPE(TypeKey, TypeName, Weight)
```

Snowflake schemas reduce redundancy but add joins. Star schemas are often preferred for teaching and reporting because they are simpler to understand.

---

## 12.6 OLAP Operations: Exploring Data from Multiple Angles

OLAP systems support common analytical operations. These operations describe how users move through data.

| OLAP Operation | Meaning | Grading Example | SQL Analogy |
|---|---|---|---|
| **Slice** | Filter one dimension to one value | Show only quizzes | `WHERE Type = 'Quiz'` |
| **Dice** | Filter multiple dimensions | Quizzes in Section A during March | `WHERE Type='Quiz' AND Section='A' AND Month='March'` |
| **Drill-down** | Move from summary to detail | Semester average → weekly average → deliverable score | More detailed `GROUP BY` |
| **Roll-up** | Move from detail to summary | Deliverable score → type average → course average | Less detailed `GROUP BY` |
| **Pivot** | Rotate analytical view | Put deliverable types as columns instead of rows | Conditional aggregation or pivot tool |

### Slice Example

Question: What is the average score for quizzes only?

```sql
SELECT DeliverableType,
       ROUND(AVG(Score), 2) AS AvgQuizScore
FROM GradeAnalytics
WHERE DeliverableType = 'Quiz'
GROUP BY DeliverableType;
```

### Dice Example

Question: What is the average quiz score for students in Section A after October 1?

```sql
SELECT Section,
       DeliverableType,
       ROUND(AVG(Score), 2) AS AvgScore
FROM GradeAnalytics
WHERE DeliverableType = 'Quiz'
  AND Section = 'A'
  AND DueDate >= '2026-10-01'
GROUP BY Section, DeliverableType;
```

### Drill-Down Example

Question: How does performance change from assignment type to individual deliverable?

```sql
SELECT DeliverableType,
       DeliverableNumber,
       ROUND(AVG(Score), 2) AS AvgScore
FROM GradeAnalytics
GROUP BY DeliverableType, DeliverableNumber
ORDER BY DeliverableType, DeliverableNumber;
```

### Roll-Up Example

Question: What is the overall class average by deliverable type?

```sql
SELECT DeliverableType,
       ROUND(AVG(Score), 2) AS AvgScore
FROM GradeAnalytics
GROUP BY DeliverableType;
```

### Pivot-Style Example

SQL pivot syntax varies by platform. A portable approach uses conditional aggregation:

```sql
SELECT StudentName,
       ROUND(AVG(CASE WHEN DeliverableType = 'Quiz' THEN Score END), 2) AS QuizAvg,
       ROUND(AVG(CASE WHEN DeliverableType = 'Exam' THEN Score END), 2) AS ExamAvg,
       ROUND(AVG(CASE WHEN DeliverableType = 'Project' THEN Score END), 2) AS ProjectAvg
FROM GradeAnalytics
GROUP BY StudentName
ORDER BY StudentName;
```

This rotates deliverable types into columns, making student performance easier to compare across categories.

---

## 12.7 SQL as a BI Tool

### BI Begins with Good Queries

BI tools may look visual, but the logic underneath is often SQL. Dashboards, reports, KPIs, and data models depend on queries that filter, join, aggregate, and classify data correctly.

A useful BI query usually does at least one of the following:

- joins operational tables into an analytical view,
- groups records into meaningful categories,
- computes a metric,
- applies a business rule,
- labels or flags results,
- supports reuse through a view.

### Creating a Reusable BI View

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

### KPI Query: Pass Rate

```sql
SELECT
    ROUND(
        100.0 * COUNT(CASE WHEN Score >= 60 THEN 1 END) / COUNT(*),
        1
    ) AS PassRatePercent
FROM StudentPerformanceBI;
```

### KPI Query: Missing Submission Count

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

### KPI Query: At-Risk Students

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

### Trend Query: Average Score by Week

```sql
SELECT
    strftime('%W', DueDate) AS WeekNumber,
    ROUND(AVG(Score), 2) AS AvgScore
FROM StudentPerformanceBI
GROUP BY strftime('%W', DueDate)
ORDER BY WeekNumber;
```

> **Note:** In PostgreSQL, use `EXTRACT(WEEK FROM DueDate)` or `TO_CHAR(DueDate, 'IW')` instead of SQLite's `strftime()`.

### Access Version: Average Score by Deliverable Type

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

---

## 12.8 Reports, Dashboards, and Visualization

### From Rows to Recognition

SQL produces rows and columns. Decision-makers often need patterns, trends, exceptions, and thresholds. Visualization helps convert query output into something people can interpret quickly.

BI outputs usually fall into three categories:

| Output Type | Purpose | Example |
|---|---|---|
| **Report** | Structured, often scheduled summary | Weekly grade summary |
| **Dashboard** | Interactive monitoring surface | Class performance dashboard |
| **KPI Card** | Single metric status indicator | Pass rate = 82% |

### Choosing the Right Visualization

| Analytical Question | Recommended Visualization |
|---|---|
| Compare categories | Bar chart |
| Show trend over time | Line chart |
| Show distribution | Histogram or box plot |
| Show relationship between two variables | Scatter plot |
| Show single target metric | KPI card |
| Show part-to-whole | Stacked bar; pie chart only for very few categories |

### Grading Database Dashboard Example

A simple instructor dashboard might include:

| Dashboard Element | BI Question | Query Source |
|---|---|---|
| KPI card: average class score | How is the class doing overall? | `AVG(Score)` |
| KPI card: missing submissions | How much work is unsubmitted? | Cross join + left join |
| Bar chart: average by deliverable type | Which categories are hardest? | `GROUP BY DeliverableType` |
| Line chart: average score by week | Are scores improving or declining? | Time-based grouping |
| Table: at-risk students | Who needs attention? | `HAVING AVG(Score) < 70` |
| Filter: deliverable type | Which category should we inspect? | Dashboard slicer |

### Characteristics of Effective BI Reporting

Effective BI reporting should be:

1. **Accurate:** built on correct data and tested logic.
2. **Timely:** available when decisions need to be made.
3. **Consistent:** metrics mean the same thing across reports.
4. **Interpretable:** users can understand the output without decoding it.
5. **Actionable:** the report suggests what might need attention.
6. **Ethical:** sensitive data is protected and presented responsibly.

> **Common Mistake:** A beautiful dashboard built on unclear metric definitions is not BI. It is decoration with numbers.

### Visualization Pitfalls

| Mistake | Why It Hurts |
|---|---|
| Too many charts | Users do not know where to look |
| Inconsistent scales | Comparisons become misleading |
| Unlabeled axes | Interpretation becomes guesswork |
| Decorative 3D charts | Visual style distorts values |
| Too many colors | Attention is scattered |
| Metrics without targets | Users cannot tell whether the number is good or bad |

Clarity beats decoration. Always.

---

## 12.9 KPIs, Targets, and the Balanced Scorecard

### What Is a KPI?

> **Definition:** A Key Performance Indicator, or KPI, is a measurable signal used to evaluate progress toward a goal.

A KPI is not just any number. It must connect to an objective.

| Weak Metric | Better KPI |
|---|---|
| Number of grades entered | Percentage of deliverables graded within seven days |
| Number of students | Percentage of students passing |
| Number of attendance rows | Attendance rate by week |
| Average score | Average score compared with target |

A KPI becomes useful when it has context:

- a target,
- a time period,
- an owner,
- a decision rule,
- a clear definition.

### KPI Example: At-Risk Rate

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

### The Balanced Scorecard

The **Balanced Scorecard** is a performance management framework that organizes metrics into multiple perspectives rather than relying only on financial or outcome metrics.

A common version includes four perspectives:

| Perspective | Main Question | University/Teaching Example |
|---|---|---|
| **Financial / Resource** | Are resources being used effectively? | Cost per student supported |
| **Customer / Stakeholder** | Are stakeholders satisfied? | Student satisfaction, advising responsiveness |
| **Internal Process** | Are processes working well? | Average grading turnaround time |
| **Learning and Growth** | Is the organization improving? | Faculty development, course redesign outcomes |

For the Grading Database, a course-level Balanced Scorecard might include:

| Perspective | KPI | Possible Action |
|---|---|---|
| Student success | Pass rate | Identify at-risk students |
| Internal process | Grading turnaround time | Adjust grading workflow |
| Engagement | Weekly attendance rate | Contact absent students |
| Learning improvement | Score trend over semester | Revise difficult modules |
| Equity/fairness | Outcome gaps across sections | Review assessment consistency |

The Balanced Scorecard matters because it prevents metric tunnel vision. A course could have high average grades but poor attendance, delayed feedback, or unequal outcomes across student groups. BI should support a balanced view of performance.

---

## 12.10 BI Governance and Data Quality

### Why Governance Matters

BI systems can fail even when the technology works. The most common reason is lack of governance.

Without governance:

- different teams define the same metric differently,
- dashboards conflict,
- sensitive data is overexposed,
- data quality problems go unassigned,
- users stop trusting reports.

Governance answers the human and organizational questions behind BI:

- Who owns this metric?
- What exactly does it mean?
- Who is allowed to see it?
- How often is it refreshed?
- What should happen when data is wrong?

### Metric Definitions

A BI environment needs shared definitions.

Example: “Pass rate” could mean:

1. percentage of submitted assignments with score ≥ 60,
2. percentage of students with final average ≥ 60,
3. percentage of students currently passing based only on graded work,
4. percentage of enrolled students expected to pass by semester end.

Those are different metrics. They may all be useful, but they cannot share the same name.

A metric definition should include:

| Metadata Item | Example |
|---|---|
| Metric name | Pass Rate |
| Formula | Students with average ≥ 60 / total active students |
| Grain | Student-semester |
| Refresh schedule | Daily at 2:00 a.m. |
| Data owner | Course coordinator |
| Exclusions | Withdrawn students excluded |
| Action threshold | Alert if below 75% |

### Data Stewardship

A **data steward** is responsible for the meaning, quality, and appropriate use of data in a domain.

In a university, different stewards may own:

- student records,
- course enrollment,
- grades,
- financial aid,
- advising notes,
- attendance records.

DBAs and analysts manage technical infrastructure and queries. Data stewards manage meaning and policy.

### Access Control for BI

BI dashboards often summarize sensitive information. Summaries can still expose risk.

Examples:

- A dashboard showing one student in a small group may reveal that student's performance.
- A class comparison dashboard may encourage unfair ranking.
- A public chart may expose information that should remain private.

BI systems should apply role-based access control, row-level security, and aggregation thresholds when appropriate.

> **Important:** Security does not stop at the operational database. Reports, dashboards, exports, and screenshots also require governance.

---

## 12.11 BI Across Access, SQLite, and Supabase

BI logic is portable. Tools differ, but the analytical thinking remains the same.

| Platform | Best BI Use | Strength | Limitation |
|---|---|---|---|
| **Microsoft Access** | Visual reports and small dashboards | Easy forms, queries, reports | Limited scalability and security |
| **SQLite** | SQL-based BI sandbox | Lightweight, transparent, portable | Limited multi-user/server features |
| **Supabase/PostgreSQL** | Cloud-hosted analytical backend | Robust SQL, views, security, APIs | Requires stronger administration and governance |

### Access BI Pattern

In Access, students can:

1. create queries using Query Design or SQL View,
2. save analytical queries,
3. build reports from those queries,
4. create forms or navigation screens that act like simple dashboards,
5. export results to Excel or Power BI.

Access is useful because it makes the BI pipeline visible.

### SQLite BI Pattern

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

### Supabase/PostgreSQL BI Pattern

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

Cloud BI adds governance concerns:

- Who can query the view?
- Should students see only their own rows?
- Should dashboards use row-level security?
- How often should data refresh?
- What happens if the query becomes expensive?

The tool changes. The BI questions remain.

---

## 12.12 Worked Example: Building a Simple BI Layer for the Grading Database

This section brings the chapter together with a practical mini-project. The goal is to create a small BI layer using the Grading Database.

### Step 1: Define the BI Questions

Suppose an instructor wants to know:

1. What is the average score by deliverable type?
2. Which students are currently at risk?
3. How many submissions are missing?
4. Are scores improving or declining over time?
5. Does attendance appear related to performance?

These are BI questions because they support monitoring and action.

### Step 2: Create a Core Analytical View

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

### Step 3: Create a Deliverable Performance Report

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

### Step 4: Create an At-Risk Student Report

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

### Step 5: Create a Missing Submission Report

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

### Step 6: Create an Attendance-Performance View

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

### Step 7: Translate Queries into Dashboard Elements

| Dashboard Element | Query Result | Decision Use |
|---|---|---|
| Average class score | `AVG(Score)` | Overall performance monitoring |
| At-risk count | Students with `AVG(Score) < 70` | Intervention planning |
| Missing submissions | Missing student-deliverable pairs | Follow-up reminders |
| Avg score by deliverable type | Grouped grade report | Assessment redesign |
| Attendance-performance table | AttendancePerformance view | Engagement analysis |

The BI layer is not the dashboard itself. It is the reliable analytical foundation that the dashboard depends on.

---

## Key Concepts

### Foundational Ideas

- Business Intelligence transforms operational data into decision-support insight.
- Operational systems record events; analytical systems evaluate patterns.
- BI depends on reliable databases, but it also requires transformation, context, and governance.
- ETL and ELT convert raw operational records into analytics-ready structures.
- Data warehouses are subject-oriented, integrated, time-variant, and non-volatile.
- Data marts provide focused analytical stores for departments or functions.
- Data lakes preserve raw data for exploration and data science.

### Analytical Design

- Dimensional modeling organizes data into facts and dimensions.
- Measures are numeric values used for calculation; descriptors provide context.
- Star schemas place fact tables at the center and dimension tables around them.
- Analytical denormalization is deliberate and controlled, not careless design.
- OLAP operations include slice, dice, drill-down, roll-up, and pivot.

### Application in Practice

- SQL views can act as BI layers over normalized operational tables.
- Dashboards should be built on tested queries and consistent metric definitions.
- KPIs are useful only when connected to goals, targets, and action.
- The Balanced Scorecard prevents organizations from relying on one narrow metric.
- BI governance ensures metric consistency, access control, stewardship, and trust.

---

## Chapter Summary

Business Intelligence is the organizational capability that turns reliable data into performance insight. Earlier chapters showed how to design, query, normalize, and administer databases. This chapter showed how those foundations support reporting, dashboards, KPIs, and decision-making.

The chapter began by distinguishing operational systems from analytical systems. Operational databases are designed to record transactions accurately and safely. Analytical systems are designed to summarize, compare, and explain patterns across many records. Both are necessary, but they serve different goals.

ETL and ELT pipelines move data from operational sources into analytical environments. These pipelines do more than transfer records. They clean data, standardize definitions, apply business rules, and create trustworthy analytical structures. In this sense, ETL is a trust-building process.

Data warehouses, data marts, and data lakes provide different ways to organize analytical data. Warehouses and marts emphasize structured, governed reporting. Data lakes preserve raw flexibility for exploration and advanced analytics. Dimensional modeling then organizes analytical data into facts, measures, dimensions, and descriptors. Star schemas use controlled denormalization to make reporting faster and easier.

The chapter also explained OLAP operations, visualization, dashboards, KPIs, and the Balanced Scorecard. These tools help decision-makers monitor performance, identify trends, compare outcomes, and choose actions. However, BI requires governance. Without consistent metric definitions, data stewardship, access control, and documentation, dashboards can create confusion rather than insight.

The main lesson is that BI is not magic layered on top of data. It is the result of disciplined design, careful transformation, clear metrics, and responsible interpretation. A dashboard is only as trustworthy as the database, ETL logic, and governance behind it.

---

## Key Terms

| Term | Definition |
|---|---|
| Aggregation | Combining many values into a summary such as count, sum, or average |
| Balanced Scorecard | A performance management framework that organizes metrics across multiple perspectives |
| Business Intelligence (BI) | Concepts, tools, and practices that transform data into decision-support insight |
| Dashboard | An interactive visual interface that presents BI outputs such as charts, filters, and KPIs |
| Data Lake | Repository that stores raw data in its native format for exploration and analysis |
| Data Mart | Focused analytical store designed for a specific department or function |
| Data Warehouse | Centralized analytical repository designed for reporting and decision support |
| Dimension | Analytical context that describes facts, such as student, time, or deliverable |
| Dimensional Modeling | Analytical design approach based on facts and dimensions |
| Drill-down | OLAP operation that moves from summary to more detailed data |
| ELT | Extract, Load, Transform; loading raw data first and transforming it in the target system |
| ETL | Extract, Transform, Load; moving and preparing data for analytical use |
| Fact Table | Central table in a dimensional model containing measures and foreign keys to dimensions |
| KPI | Key Performance Indicator; measurable signal used to evaluate progress toward a goal |
| Measure | Numeric value used in analysis, such as score, count, or percentage |
| Metadata | Data about data, including definitions, sources, refresh schedules, and lineage |
| OLAP | Online Analytical Processing; systems and methods for multidimensional analysis |
| OLTP | Online Transaction Processing; systems optimized for recording transactions |
| Pivot | OLAP operation that rotates the analytical perspective |
| Roll-up | OLAP operation that moves from detail to summary |
| Slice | OLAP operation that filters one dimension to one value |
| Star Schema | Dimensional schema with a central fact table surrounded by dimension tables |
| Data Steward | Person responsible for data meaning, quality, and appropriate use in a domain |

---

## Review Questions

1. What is Business Intelligence, and how does it differ from operational transaction processing?
2. Explain the difference between OLTP and OLAP using the Grading Database as an example.
3. Why are normalized operational databases not always ideal for analytics?
4. What are the three stages of ETL? Which stage usually carries the most business meaning?
5. How does ELT differ from ETL, and why is ELT common in cloud environments?
6. What are the four classic characteristics of a data warehouse?
7. Compare an Enterprise Data Warehouse, a data mart, and a data lake.
8. What is the difference between a fact and a dimension?
9. In a grading analytics star schema, what might the fact table be? What dimensions would surround it?
10. Why is denormalization acceptable in a star schema but risky in an operational database?
11. Define slice, dice, drill-down, roll-up, and pivot.
12. Write a SQL query that calculates average score by deliverable type.
13. What makes a metric a KPI rather than just a number?
14. How does the Balanced Scorecard help prevent metric tunnel vision?
15. Why does BI require governance?
16. What could go wrong if two departments define "pass rate" differently?
17. How can SQL views support BI reporting?
18. Why should dashboard access be controlled, even when the dashboard shows summaries rather than raw records?

## Discussion Questions

1. Think of an organization you know well. What operational data does it already collect, and what BI questions could that data help answer?
2. Self-service BI tools allow non-technical users to build dashboards. What are the benefits and risks of this democratization?
3. In education analytics, when does helpful performance monitoring become invasive surveillance?
4. Should students see dashboards comparing their performance to class averages? What safeguards would be needed?
5. Is denormalization in BI a contradiction of earlier chapters on normalization, or simply a different design goal?
6. How might AI change BI? Which parts of BI still require human judgment?

## References

Inmon, W. H. (2005). *Building the data warehouse* (4th ed.). Wiley.

Kimball, R., & Ross, M. (2013). *The data warehouse toolkit: The definitive guide to dimensional modeling* (3rd ed.). Wiley.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Turban, E., Sharda, R., Delen, D., & King, D. (2018). *Business intelligence, analytics, and data science: A managerial perspective* (4th ed.). Pearson.
