# Readiness Assessment Test (RAT): Chapter 12 — Business Intelligence and Analytics for Performance Improvement

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/RAT_nqr5a3?_a=BAMAAAX00" alt="RAT or Quiz section icon" width="220">
</p>
<p align="center">

## Assessment Design Notes

This RAT assesses readiness for Chapter 12: Business Intelligence and Analytics for Performance Improvement. It checks whether students can define core BI concepts, explain the rationale for separating operational from analytical systems, interpret dimensional models and OLAP operations, apply BI logic to the Grading Database, analyze trade-offs in warehouse and governance design, and evaluate metric definitions and dashboard choices under organizational constraints.

Questions draw from all twelve chapter sections, including the RFM analysis subsection, the ETL dirty-data examples, and the governance-conflict scenario. SQL questions reference the chapter's `GradeAnalytics`, `StudentPerformanceBI`, and `GradeBI` views, and the Let's Build `AttendancePerformance` view. Platform-specific questions cover Access, SQLite, and Supabase/PostgreSQL as described in 12.11.

### Bloom Distribution

| Bloom Level | Required Count | Intent                                                                |
| ----------- | -------------- | --------------------------------------------------------------------- |
| Remember    | 8              | Foundational vocabulary and structural facts with minimal pure recall |
| Understand  | 8              | Explain why concepts matter, interpret, and paraphrase                |
| Apply       | 8              | Use chapter concepts in realistic scenarios and technical tasks       |
| Analyze     | 8              | Compare alternatives, break down systems, and diagnose trade-offs     |
| Evaluate    | 8              | Judge design quality and choose the best approach under constraints   |

### Design Criterion Coverage

| Design Criterion  | Bloom Sections Used | Questions | Count |
| ----------------- | ------------------- | --------- | ----- |
| Application-based | Understand, Apply, Analyze, Evaluate | 2, 4–5, 7–8, 11, 13–14, 16, 19, 21–24, 26–29, 31–32, 35–36, 38–40 | 14 |
| Scenario-based    | Apply, Analyze, Evaluate | 17–18, 25, 30, 33–34, 37–40 | 12 |
| Definition-only   | Remember, Understand | 1–8, 9–10, 12, 15 | 14 |

### AI-Resistance Strategies Used

1. **Chapter-specific reasoning over generic knowledge** — Questions 9–10, 25, 33–34 require applying chapter frameworks (DIKW, R.E.A.D., Balanced Scorecard) rather than generic definitions.
2. **Schema-specific context using exact tables and columns** — Questions 19–24 reference the chapter's `GradeAnalytics`, `GradeBI`, `FACT_GRADES`, `DIM_STUDENT`, and `AttendancePerformance` structures.
3. **Scenario stems with embedded traps** — Questions 17, 30, 37–39 embed subtle domain-specific pitfalls (null handling, metric-definition conflicts, RFM dimension inversion).
4. **Multi-answer options requiring fine-grained discrimination** — Questions 8, 16, 32, 40 use Select ALL with closely related distractors drawn from adjacent BI concepts.
5. **Distractors drawn from adjacent but distinct concepts** — Questions 5, 13, 26–29 use OLAP operations, warehouse types, and governance roles that are easily confused if reading was superficial.
6. **Non-obvious correct answers paraphrased rather than keyword-matched** — Questions 11, 31, 35–36 require understanding the reasoning behind denormalization, ELT, and star schemas, not just recognizing terms.
7. **Output prediction from concrete data** — Questions 21–22 ask students to predict query results and explain null-handling behavior from the chapter's SQL views.
8. **Platform-specific details** — Questions 23–24 test knowledge of SQLite vs. PostgreSQL vs. Access syntax differences described in 12.7 and 12.11.

## Remember Questions

**1. What does the acronym ETL stand for in the context of Business Intelligence?**

A. Evaluate, Test, Launch

B. Extract, Transform, Load

C. Extract, Transfer, Log

D. Enrich, Tag, Link

**2. Which term describes a centralized repository designed specifically for analysis, reporting, and decision support?**

A. Operational database

B. Data lake

C. Data warehouse

D. Data mart

**3. In the Grading Database star schema described in the chapter, which of the following is a fact table?**

A. DIM_STUDENT

B. DIM_TIME

C. FACT_GRADES

D. DIM_COURSE

**4. What are the four classic characteristics of a data warehouse?**

A. Normalized, transactional, volatile, current

B. Subject-oriented, integrated, time-variant, non-volatile

C. Distributed, replicated, partitioned, indexed

D. Structured, semi-structured, unstructured, raw

**5. Which OLAP operation moves from summary to more detailed data, such as from semester average to weekly average?**

A. Roll-up

B. Slice

C. Pivot

D. Drill-down

**6. What does the acronym KPI stand for?**

A. Key Process Indicator

B. Known Performance Index

C. Key Performance Indicator

D. Knowledge Processing Interface

**7. In the chapter, what are the three dimensions of RFM analysis?**

A. Relevance, Frequency, Magnitude

B. Recency, Frequency, Monetary

C. Recency, Format, Measurement

D. Reach, Frequency, Margin

**8. Select ALL that apply: Which of the following are BI output types described in the chapter?**

A. Report

B. Dashboard

C. KPI Card

D. Trigger

E. Stored procedure

## Understand Questions

**9. Why does the chapter argue that BI belongs in a database course?**

A. Because BI tools are only available through database software

B. Because databases are valuable not only for storing data but for supporting better decisions

C. Because SQL is the only language that BI tools can use

D. Because data warehouses must always be built before operational databases

**10. In the DIKW hierarchy as applied in the chapter, where does BI primarily operate?**

A. Between Data and Information

B. Between Information and Knowledge

C. Between Knowledge and Wisdom

D. At the Wisdom level only

**11. The chapter states that denormalization is acceptable in a star schema but risky in an operational database. Why?**

A. Because analytical databases use a different SQL dialect that prevents anomalies

B. Because ETL controls how data enters the analytical system, and users query rather than update dimension tables

C. Because denormalization always improves performance regardless of context

D. Because operational databases do not support foreign keys

**12. Select ALL that apply: According to the chapter, why are operational databases not ideal for heavy analytics?**

A. Analytical queries can slow down operational transactions

B. Operational schemas are normalized for integrity, not reporting convenience

C. Operational systems often store only the current state, not full history

D. Operational databases cannot run SELECT queries

E. Data may come from many systems, and a single operational database rarely contains everything needed

**13. Why might two departments report different "retention" numbers on the same dashboard, according to the chapter's governance example?**

A. The database server crashed during one department's query

B. The departments defined "retention" differently and no one governed the metric definition

C. One department used Access and the other used SQLite

D. The dashboard software displayed numbers in the wrong font

**14. A course has high average grades but poor attendance and delayed feedback. According to the Balanced Scorecard discussion in the chapter, what is the risk of focusing only on average grades?**

A. Metric tunnel vision — other important performance dimensions are ignored

B. The database will become denormalized

C. The ETL pipeline will fail

D. The star schema will collapse into a snowflake schema

**15. Select ALL that apply: The chapter identifies which of the following as common problems in operational data that ETL must address?**

A. Inconsistent codes such as "G" stored as gender

B. Impossible values such as age recorded as "213"

C. Duplicate labels such as "HW" and "Homework" for the same deliverable type

D. Tables with more than five columns

E. Overwritten history where a corrected grade loses the original value

**16. Select ALL that apply: Which of the following are OLAP operations described in the chapter?**

A. Slice

B. Dice

C. Merge

D. Pivot

E. Drill-down

## Apply Questions

**17. An instructor runs this query against the chapter's `GradeAnalytics` view:**

```sql
SELECT DeliverableType,
       ROUND(AVG(Score), 2) AS AvgScore
FROM GradeAnalytics
WHERE DeliverableType = 'Quiz'
GROUP BY DeliverableType;
```

Which OLAP operation does this query perform?

A. Drill-down

B. Roll-up

C. Slice

D. Pivot

**18. A department chair wants to compare student performance across Quiz, Exam, and Project categories side by side in columns. Which SQL pattern from the chapter accomplishes this?**

A. A UNION of three separate SELECT statements

B. A conditional aggregation using CASE WHEN inside AVG()

C. A CROSS JOIN between STUDENT and DELIVERABLE

D. A HAVING clause with three conditions

**19. The chapter's `GradeBI` view includes a `CASE` expression that classifies scores. What is the threshold for the `'At Risk'` classification?**

A. Score IS NULL

B. Score < 70

C. Score < 85

D. Score >= 90

**20. In the chapter's missing-submission query, why is `CROSS JOIN` used between `STUDENT` and `DELIVERABLE`?**

A. To eliminate duplicate rows from the result

B. To generate every possible student-deliverable pair so missing submissions can be detected

C. To speed up the query by avoiding the WHERE clause

D. To create a star schema from normalized tables

**21. The chapter's KPI pass-rate query computes:**

```sql
ROUND(100.0 * COUNT(CASE WHEN Score >= 60 THEN 1 END) / COUNT(*), 1)
```

If 18 out of 25 students have a score of 60 or above, what does this query return?

A. 60.0

B. 72.0

C. 18.0

D. 25.0

**22. In the `AttendancePerformance` view from the worked example (12.12), `NULLIF(COUNT(a.AttendanceID), 0)` is used. Why?**

A. To set the attendance rate to NULL when no attendance records exist, avoiding a division-by-zero error

B. To convert NULL attendance values into zeros

C. To exclude students who have perfect attendance

D. To make the query compatible with Microsoft Access

**23. The chapter notes that `strftime('%W', DueDate)` is used for week-number extraction. Which platform uses this function?**

A. Microsoft Access

B. SQLite

C. PostgreSQL

D. Microsoft SQL Server

**24. Select ALL that apply: According to the chapter, which of the following are valid BI patterns in Microsoft Access?**

A. Creating queries using Query Design or SQL View

B. Building reports from saved analytical queries

C. Creating forms or navigation screens that act like simple dashboards

D. Exporting results to Excel or Power BI

E. Running MapReduce jobs on the Access database engine

## Analyze Questions

**25. The chapter connects RFM analysis to the Grading Database with a student-performance analogy. Which pairing correctly maps an RFM dimension to its educational equivalent?**

A. Recency → Student's cumulative GPA; Frequency → Number of majors declared; Monetary → Tuition paid

B. Recency → How recently the student submitted work; Frequency → How consistently the student submits; Monetary → The student's average score

C. Recency → Attendance rate; Frequency → Number of courses enrolled; Monetary → Credits completed

D. Recency → Graduation year; Frequency → Number of transfers; Monetary → Scholarship amount

**26. A department chair notices that enrollment numbers in the advising data mart do not match numbers in the Enterprise Data Warehouse dashboard. What is the most likely structural cause?**

A. The data mart uses a different DBMS than the EDW

B. The data mart was built from a subset of data with a different refresh schedule or transformation logic than the EDW

C. The EDW is stored in a data lake instead of a relational database

D. The data mart uses a snowflake schema while the EDW uses a star schema

**27. A star schema has `FACT_GRADES` at the center with `DIM_STUDENT`, `DIM_DELIVERABLE`, `DIM_TIME`, and `DIM_COURSE`. An analyst wants to compare average scores by deliverable type across semesters. Which two dimensions must be joined to the fact table?**

A. DIM_STUDENT and DIM_COURSE only

B. DIM_DELIVERABLE and DIM_TIME

C. DIM_COURSE and DIM_DELIVERABLE only

D. DIM_STUDENT and DIM_TIME only

**28. The chapter explains that ELT is common in cloud warehouses. What makes ELT practical in cloud environments but less common in traditional on-premise warehouses?**

A. Cloud warehouses cannot run SQL, so transformations must happen before loading

B. Cloud platforms such as BigQuery and Snowflake can perform transformations at scale inside the target system after loading

C. ELT requires the data to be in JSON format, which only cloud platforms support

D. Traditional warehouses do not support the SQL GROUP BY clause

**29. A university Provost sees "Retention = 91%" and "Retention = 68%" on the same dashboard. According to the chapter, which governance element would most likely have prevented this?**

A. A faster ETL pipeline

B. A shared metric definition that specifies the formula, grain, exclusions, and data owner for "retention"

C. A larger data warehouse with more storage capacity

D. Role-based access control that hides one of the numbers

**30. Select ALL that apply: Which of the following are true differences between star and snowflake schemas as described in the chapter?**

A. Snowflake schemas normalize dimensions into additional sub-tables

B. Snowflake schemas reduce redundancy compared to star schemas

C. Snowflake schemas add more joins, making queries more complex

D. Snowflake schemas eliminate the need for a fact table

E. Star schemas intentionally repeat some descriptive values to simplify reporting

**31. An instructor builds a dashboard with six charts, all using different color schemes and three different y-axis scales. According to the chapter's visualization pitfalls, what is the most likely problem?**

A. Too many charts and inconsistent scales make comparisons misleading

B. The dashboard uses pie charts instead of bar charts

C. The charts were built in SQLite instead of Power BI

D. The instructor used a star schema instead of a snowflake schema

**32. Select ALL that apply: A well-designed KPI, according to the chapter, should have which of the following?**

A. A target value

B. A time period

C. An owner

D. A clear definition

E. A decorative 3D chart

## Evaluate Questions

**33. A small community college wants to start using BI but has a limited budget and one IT staff member. It already uses Access for grade entry and Excel for ad-hoc reporting. Based on the chapter's platform comparison, which BI approach is most appropriate as a starting point?**

A. Build a full Enterprise Data Warehouse with a Snowflake cloud deployment

B. Use Access queries and reports for foundational BI, exporting to Excel or Power BI as analytical needs grow

C. Immediately migrate all data to a PostgreSQL instance on Supabase with row-level security

D. Purchase a commercial BI suite with dedicated dashboard servers

**34. A course coordinator proposes four KPIs for a mathematics department Balanced Scorecard: (1) average final exam score, (2) average midterm score, (3) average quiz score, (4) average homework score. According to the chapter's Balanced Scorecard principles, what is the main weakness?**

A. All four KPIs measure the same perspective (student academic outcome) and neglect process, engagement, and improvement dimensions

B. The KPIs use averages instead of medians

C. The Balanced Scorecard should only include financial metrics

D. Four KPIs are too many for a single department

**35. A retail company's daily ETL jobs take six hours. Marketing complains that Monday dashboards still show Friday's data. An engineer proposes switching to ELT: load raw sales data immediately and transform it inside the cloud warehouse. Which trade-off is the company making?**

A. Faster data availability at the cost of potentially running transformations on raw, uncleaned data that may expose quality issues downstream

B. Slower data availability because ELT always takes longer than ETL

C. Loss of all historical data because ELT cannot preserve history

D. Elimination of the need for any data governance

**36. A university governance committee debates whether to let each department define its own "student success rate." The Business School wants graduation within four years. Engineering wants graduation within six years plus job placement. Nursing wants licensure exam pass rates. Based on the chapter's governance discussion, what should the committee establish first?**

A. A single enterprise-wide metric called "student success rate" that all departments must use identically, replacing all department-specific measures

B. A governed metric portfolio: one institution-wide definition for cross-department comparison plus department-specific companion metrics with clear, documented definitions and owners

C. A policy that each department may use any definition as long as dashboard labels are consistent

D. A rule that metrics cannot be compared across departments under any circumstances

**37. An analyst applies RFM analysis to a customer database. One segment shows high Monetary value and high Frequency but very low Recency (last purchase over a year ago). Which action is most consistent with RFM logic as described in the chapter?**

A. Invest heavily in this segment because they spend a lot

B. Ignore this segment because Recency is the least important dimension

C. Flag this segment as "at risk of leaving" and design a re-engagement campaign — they were valuable but may have stopped buying

D. Delete these customers from the database to improve data quality

**38. An IT director must choose between building one Enterprise Data Warehouse and several independent data marts for a hospital system with separate departments (cardiology, oncology, pediatrics, administration). Each department has urgent reporting needs and different data sources. Based on the chapter's comparison, which approach best balances governance with responsiveness?**

A. Build only the EDW and require all departments to wait until it is complete

B. Build only independent data marts and accept that cross-department numbers will never match

C. Build a central EDW for institution-wide governance and reporting, with focused data marts layered on top for faster departmental analytics

D. Store all data in a data lake and let each department query raw files directly

**39. A student runs this query on the chapter's `StudentPerformanceBI` view:**

```sql
SELECT StudentName,
       ROUND(AVG(Score), 2) AS AverageScore,
       COUNT(*) AS GradedItems
FROM StudentPerformanceBI
GROUP BY StudentID, StudentName
HAVING AVG(Score) < 70
ORDER BY AverageScore ASC;
```

One student has submitted no work — five rows appear in `StudentPerformanceBI`, all with `Score = NULL`. Why does this student NOT appear in the results?

A. `AVG(Score)` returns NULL when all values are NULL, and `NULL < 70` evaluates to UNKNOWN, so the HAVING clause excludes the row

B. `COUNT(*)` returns 0 for students with only NULL scores, removing them from the GROUP BY

C. The `StudentPerformanceBI` view automatically excludes rows where Score is NULL

D. `AVG(Score)` treats NULL as 0, so the average is 0, which is below 70; the student should appear

**40. Select ALL that apply: The chapter states that "a dashboard is only as trustworthy as the database, ETL logic, and governance behind it." Which of the following would undermine trust in a BI dashboard?**

A. Two departments using different formulas for the same named metric

B. A KPI card showing "Pass Rate = 92%" with no documentation of how pass rate is calculated

C. Dashboard data that refreshes weekly while operational decisions are made daily

D. A bar chart with clearly labeled axes and a descriptive title

E. Sensitive student performance data visible to all users without access controls

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Answer Key

### Remember Questions

**1. What does the acronym ETL stand for in the context of Business Intelligence?**

**Correct Answer: B — Extract, Transform, Load**

Explanation: Section 12.3 defines ETL as "Extract, Transform, Load" and describes it as "the process of pulling data from source systems, cleaning and reshaping it, and loading it into an analytical environment."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | "Evaluate, Test, Launch" is not a BI term discussed in the chapter. |
| B      | **Yes**  | The chapter explicitly defines ETL as Extract, Transform, Load. |
| C      | No       | "Extract, Transfer, Log" substitutes incorrect verbs. |
| D      | No       | "Enrich, Tag, Link" is not an acronym used in the chapter. |

**2. Which term describes a centralized repository designed specifically for analysis, reporting, and decision support?**

**Correct Answer: C — Data warehouse**

Explanation: Section 12.4 defines a data warehouse as "a centralized repository designed specifically for analysis, reporting, and decision support."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | An operational database is optimized for transactions, not analysis. |
| B      | No       | A data lake stores raw data in native format for exploration, not governed reporting. |
| C      | **Yes**  | The chapter's definition of a data warehouse matches this description exactly. |
| D      | No       | A data mart is a focused subset, smaller than a full warehouse. |

**3. In the Grading Database star schema described in the chapter, which of the following is a fact table?**

**Correct Answer: C — FACT_GRADES**

Explanation: Section 12.5 shows the star schema with `FACT_GRADES` at the center, containing measures such as Score, PointsPossible, and PercentageScore, plus foreign keys to dimension tables.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | DIM_STUDENT is a dimension table, not a fact table. |
| B      | No       | DIM_TIME is a dimension table, not a fact table. |
| C      | **Yes**  | FACT_GRADES is the central fact table in the chapter's star schema. |
| D      | No       | DIM_COURSE is a dimension table, not a fact table. |

**4. What are the four classic characteristics of a data warehouse?**

**Correct Answer: B — Subject-oriented, integrated, time-variant, non-volatile**

Explanation: Section 12.4 lists these four characteristics in a table with Grading Database examples for each.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | "Normalized, transactional, volatile, current" describes operational databases, not warehouses. |
| B      | **Yes**  | These are the four classic characteristics from the Inmon definition used in the chapter. |
| C      | No       | "Distributed, replicated, partitioned, indexed" are database architecture terms, not warehouse characteristics. |
| D      | No       | "Structured, semi-structured, unstructured, raw" describes data formats in a data lake. |

**5. Which OLAP operation moves from summary to more detailed data, such as from semester average to weekly average?**

**Correct Answer: D — Drill-down**

Explanation: Section 12.6 defines drill-down as moving "from summary to detail," with the example "Semester average → weekly average → deliverable score."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Roll-up is the opposite — moving from detail to summary. |
| B      | No       | Slice filters one dimension to one value. |
| C      | No       | Pivot rotates the analytical view. |
| D      | **Yes**  | Drill-down increases detail, matching the semester-to-weekly example. |

**6. What does the acronym KPI stand for?**

**Correct Answer: C — Key Performance Indicator**

Explanation: Section 12.9 defines KPI as "Key Performance Indicator" — "a measurable signal used to evaluate progress toward a goal."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | "Key Process Indicator" is not the term used in the chapter. |
| B      | No       | "Known Performance Index" is not a BI term. |
| C      | **Yes**  | KPI stands for Key Performance Indicator as defined in 12.9. |
| D      | No       | "Knowledge Processing Interface" is not a chapter term. |

**7. In the chapter, what are the three dimensions of RFM analysis?**

**Correct Answer: B — Recency, Frequency, Monetary**

Explanation: Section 12.6 defines RFM as a marketing technique that ranks customers by "Recency, Frequency, and Monetary" dimensions.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | "Relevance, Frequency, Magnitude" — Relevance and Magnitude are not RFM dimensions. |
| B      | **Yes**  | Recency, Frequency, and Monetary are the three RFM dimensions. |
| C      | No       | "Recency, Format, Measurement" — Format and Measurement are incorrect. |
| D      | No       | "Reach, Frequency, Margin" — Reach and Margin are advertising metrics, not RFM. |

**8. Select ALL that apply: Which of the following are BI output types described in the chapter?**

**Correct Answers: A, B, C**

Explanation: Section 12.8 categorizes BI outputs into three types: Report (scheduled summary), Dashboard (interactive monitoring surface), and KPI Card (single metric status indicator).

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | Reports are a core BI output type. |
| B      | **Yes**  | Dashboards are a core BI output type. |
| C      | **Yes**  | KPI Cards are a core BI output type. |
| D      | No       | Triggers are a database automation concept, not a BI output type in this chapter. |
| E      | No       | Stored procedures are a database programming concept, not a BI output type. |

### Understand Questions

**9. Why does the chapter argue that BI belongs in a database course?**

**Correct Answer: B — Because databases are valuable not only for storing data but for supporting better decisions**

Explanation: Section 12.1 states: "Databases are not valuable only because they store data. They are valuable because they support better decisions."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | The chapter discusses BI across multiple platforms, not only database software. |
| B      | **Yes**  | This directly quotes the chapter's rationale for including BI in a database course. |
| C      | No       | The chapter notes BI tools may use SQL but are not limited to it. |
| D      | No       | The chapter does not claim warehouses must precede operational databases. |

**10. In the DIKW hierarchy as applied in the chapter, where does BI primarily operate?**

**Correct Answer: B — Between Information and Knowledge**

Explanation: Section 12.1 states: "BI sits mainly between information and knowledge. It creates summaries, comparisons, and patterns that help decision-makers interpret what is happening."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Data-to-Information is the raw-data organization layer, before BI. |
| B      | **Yes**  | The chapter explicitly places BI at the Information-to-Knowledge transition. |
| C      | No       | Knowledge-to-Wisdom involves judgment and action, beyond BI's primary scope. |
| D      | No       | BI does not operate at Wisdom alone. |

**11. The chapter states that denormalization is acceptable in a star schema but risky in an operational database. Why?**

**Correct Answer: B — Because ETL controls how data enters the analytical system, and users query rather than update dimension tables**

Explanation: Section 12.5 explains: "Denormalization is acceptable in BI because ETL controls how data enters the analytical system. Users generally query the warehouse; they do not manually update dimension tables during daily operations."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | The chapter does not claim analytical databases use a different SQL dialect for anomaly prevention. |
| B      | **Yes**  | This captures the chapter's core argument: controlled data entry via ETL makes denormalization safe in BI. |
| C      | No       | The chapter explicitly notes denormalization has costs and is not always beneficial. |
| D      | No       | Operational databases do support foreign keys; the issue is not about FK support. |

**12. Select ALL that apply: According to the chapter, why are operational databases not ideal for heavy analytics?**

**Correct Answers: A, B, C, E**

Explanation: Section 12.2 lists five reasons. Options A, B, C, and E correspond to reasons 1, 2, 3, and 4/5. Option D is false — operational databases can run SELECT queries.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | Reason 1: "Analytical queries can slow down operations." |
| B      | **Yes**  | Reason 2: "Operational schemas are normalized for integrity, not reporting convenience." |
| C      | **Yes**  | Reason 3: "Operational systems often store only the current state, not full history." |
| D      | No       | Operational databases absolutely can run SELECT queries. |
| E      | **Yes**  | Reason 4: "Data may come from many systems." |

**13. Why might two departments report different "retention" numbers on the same dashboard, according to the chapter's governance example?**

**Correct Answer: B — The departments defined "retention" differently and no one governed the metric definition**

Explanation: Section 12.10 describes the Registrar defining retention as "percentage of fall-enrolled students who enroll the following fall" while Student Affairs defines it as "percentage of first-year students who graduate within six years." The problem is "no one governed the definition."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | The chapter does not mention a server crash. |
| B      | **Yes**  | This matches the chapter's governance-failure scenario exactly. |
| C      | No       | Platform differences are not the cause in this scenario. |
| D      | No       | Font rendering is not the issue. |

**14. A course has high average grades but poor attendance and delayed feedback. According to the Balanced Scorecard discussion in the chapter, what is the risk of focusing only on average grades?**

**Correct Answer: A — Metric tunnel vision — other important performance dimensions are ignored**

Explanation: Section 12.9 states: "The Balanced Scorecard matters because it prevents metric tunnel vision. A course could have high average grades but poor attendance, delayed feedback, or unequal outcomes across student groups."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | The chapter uses this exact example to illustrate metric tunnel vision. |
| B      | No       | Focusing on one metric does not cause denormalization. |
| C      | No       | The ETL pipeline is unrelated to which metrics are emphasized. |
| D      | No       | Schema choice is unrelated to metric focus. |

**15. Select ALL that apply: The chapter identifies which of the following as common problems in operational data that ETL must address?**

**Correct Answers: A, B, C, E**

Explanation: Section 12.3 includes a table of six dirty-data problems. Options A, B, C, and E correspond to four of these. Option D is not in the chapter's list.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | "Inconsistent codes" is listed with the "G" for gender example. |
| B      | **Yes**  | "Impossible values" is listed with the "213" for age example. |
| C      | **Yes**  | "Duplicate labels" is listed with "HW" / "Homework" / "Home Work." |
| D      | No       | The chapter does not identify table column count as a dirty-data problem. |
| E      | **Yes**  | "Overwritten history" is listed: "A student's grade is corrected, but the old value is lost." |

**16. Select ALL that apply: Which of the following are OLAP operations described in the chapter?**

**Correct Answers: A, B, D, E**

Explanation: Section 12.6 defines five OLAP operations: Slice, Dice, Drill-down, Roll-up, and Pivot. "Merge" is not an OLAP operation in the chapter.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | Slice is defined as filtering one dimension to one value. |
| B      | **Yes**  | Dice is defined as filtering multiple dimensions. |
| C      | No       | Merge is not an OLAP operation in the chapter. |
| D      | **Yes**  | Pivot is defined as rotating the analytical view. |
| E      | **Yes**  | Drill-down is defined as moving from summary to detail. |

### Apply Questions

**17. An instructor runs this query against the chapter's `GradeAnalytics` view. Which OLAP operation does it perform?**

```sql
SELECT DeliverableType, ROUND(AVG(Score), 2) AS AvgScore
FROM GradeAnalytics
WHERE DeliverableType = 'Quiz'
GROUP BY DeliverableType;
```

**Correct Answer: C — Slice**

Explanation: Section 12.6 defines Slice as filtering "one dimension to one value." The `WHERE DeliverableType = 'Quiz'` clause filters the DeliverableType dimension to 'Quiz'. The chapter uses this exact query as the Slice example.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Drill-down would increase GROUP BY detail, not filter to one dimension value. |
| B      | No       | Roll-up would reduce GROUP BY detail, not filter. |
| C      | **Yes**  | Filtering one dimension to one value is the definition of Slice. |
| D      | No       | Pivot would use conditional aggregation to rotate categories into columns. |

**18. A department chair wants to compare student performance across Quiz, Exam, and Project categories side by side in columns. Which SQL pattern from the chapter accomplishes this?**

**Correct Answer: B — A conditional aggregation using CASE WHEN inside AVG()**

Explanation: Section 12.6 shows a pivot-style query using `AVG(CASE WHEN DeliverableType = 'Quiz' THEN Score END)` to rotate deliverable types into columns.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | UNION stacks rows vertically; it does not create side-by-side columns. |
| B      | **Yes**  | Conditional aggregation with CASE WHEN is the chapter's portable pivot pattern. |
| C      | No       | CROSS JOIN generates all combinations; it does not pivot categories. |
| D      | No       | HAVING filters groups; it does not restructure output columns. |

**19. The chapter's `GradeBI` view includes a `CASE` expression that classifies scores. What is the threshold for the `'At Risk'` classification?**

**Correct Answer: B — Score < 70**

Explanation: Section 12.12 shows the `GradeBI` view with `WHEN sg.Score < 70 THEN 'At Risk'`.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Score IS NULL maps to 'Missing'. |
| B      | **Yes**  | Score < 70 maps to 'At Risk' in the GradeBI view. |
| C      | No       | Score < 85 maps to 'Satisfactory'. |
| D      | No       | Score >= 90 maps to 'Strong' in the earlier GradeAnalytics view, not GradeBI. |

**20. In the chapter's missing-submission query, why is `CROSS JOIN` used between `STUDENT` and `DELIVERABLE`?**

**Correct Answer: B — To generate every possible student-deliverable pair so missing submissions can be detected**

Explanation: Section 12.7 explains: "A complete missing-submission report requires every expected student-deliverable pair. That means using CROSS JOIN and LEFT JOIN."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | CROSS JOIN increases rows, it does not eliminate duplicates. |
| B      | **Yes**  | The chapter explicitly states this purpose: generating all pairs to find what is absent. |
| C      | No       | CROSS JOIN does not avoid the WHERE clause; the query still uses WHERE. |
| D      | No       | CROSS JOIN is not used to create star schemas. |

**21. The chapter's KPI pass-rate query computes `ROUND(100.0 * COUNT(CASE WHEN Score >= 60 THEN 1 END) / COUNT(*), 1)`. If 18 out of 25 students score 60 or above, what does this return?**

**Correct Answer: B — 72.0**

Explanation: 18 / 25 = 0.72. Multiplied by 100.0 = 72.0. Rounded to 1 decimal place = 72.0. Section 12.7 shows this KPI query pattern.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | 60.0 is the threshold value, not the result. |
| B      | **Yes**  | (18 / 25) × 100 = 72.0. |
| C      | No       | 18.0 is the count of passing students, not the percentage. |
| D      | No       | 25.0 is the total count, not the pass rate. |

**22. In the `AttendancePerformance` view (12.12), `NULLIF(COUNT(a.AttendanceID), 0)` is used. Why?**

**Correct Answer: A — To avoid a division-by-zero error by converting zero to NULL**

Explanation: Section 12.12 shows this in the `AttendancePerformance` view. `NULLIF(x, 0)` returns NULL when x = 0, and division by NULL yields NULL rather than an error.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | NULLIF prevents division by zero by converting zero to NULL. |
| B      | No       | NULLIF does not convert NULL to zero; COALESCE would do that. |
| C      | No       | NULLIF is not about excluding students with perfect attendance. |
| D      | No       | NULLIF is standard SQL, not Access-specific. |

**23. The chapter notes that `strftime('%W', DueDate)` is used for week-number extraction. Which platform uses this function?**

**Correct Answer: B — SQLite**

Explanation: Section 12.7 shows `strftime('%W', DueDate)` in a SQLite trend query, with a note that PostgreSQL uses `EXTRACT(WEEK FROM DueDate)` instead.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Access uses its own date functions, not strftime. |
| B      | **Yes**  | strftime is SQLite's date/time formatting function. |
| C      | No       | PostgreSQL uses EXTRACT or TO_CHAR, not strftime. |
| D      | No       | SQL Server uses DATEPART, not strftime. |

**24. Select ALL that apply: According to the chapter, which of the following are valid BI patterns in Microsoft Access?**

**Correct Answers: A, B, C, D**

Explanation: Section 12.11 lists five Access BI patterns including queries, reports, forms as dashboards, and export to Excel/Power BI. MapReduce is not an Access feature.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | Query Design and SQL View are both Access query tools. |
| B      | **Yes**  | Building reports from saved queries is an Access BI pattern. |
| C      | **Yes**  | Forms as simple dashboards is an Access BI pattern. |
| D      | **Yes**  | Export to Excel or Power BI is an Access BI pattern. |
| E      | No       | MapReduce is a big-data technique, not an Access feature. |

### Analyze Questions

**25. The chapter connects RFM analysis to the Grading Database with a student-performance analogy. Which pairing correctly maps an RFM dimension to its educational equivalent?**

**Correct Answer: B — Recency → How recently the student submitted work; Frequency → How consistently the student submits; Monetary → The student's average score**

Explanation: Section 12.6 includes an explicit RFM-to-Grading-Database analogy table with these exact mappings.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | GPA, majors declared, and tuition paid are not the chapter's RFM-education mappings. |
| B      | **Yes**  | This matches the chapter's explicit RFM analogy table exactly. |
| C      | No       | Attendance rate and credits completed are not the chapter's RFM mappings. |
| D      | No       | Graduation year and scholarship amount are not the chapter's RFM mappings. |

**26. A department chair notices enrollment numbers in the advising data mart do not match the EDW dashboard. What is the most likely structural cause?**

**Correct Answer: B — The data mart was built from a subset of data with a different refresh schedule or transformation logic**

Explanation: Section 12.4 notes data marts "can create silos if unmanaged" and are "faster and more focused" but carry consistency risks. Different refresh schedules or transformation logic between a data mart and the EDW produces mismatched numbers.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Different DBMS alone does not cause mismatched numbers if data and logic match. |
| B      | **Yes**  | Different refresh schedules or transform logic is the classic data-mart-vs-EDW consistency risk. |
| C      | No       | The EDW is not stored in a data lake; they are different architectures. |
| D      | No       | Schema type (star vs. snowflake) does not inherently change the numbers. |

**27. A star schema has `FACT_GRADES` at the center with `DIM_STUDENT`, `DIM_DELIVERABLE`, `DIM_TIME`, and `DIM_COURSE`. To compare average scores by deliverable type across semesters, which two dimensions must be joined to the fact table?**

**Correct Answer: B — DIM_DELIVERABLE and DIM_TIME**

Explanation: "By deliverable type" requires DIM_DELIVERABLE (contains Type). "Across semesters" requires DIM_TIME (contains Semester).

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Student and Course dimensions do not provide deliverable type or semester. |
| B      | **Yes**  | Deliverable provides Type; Time provides Semester. |
| C      | No       | Course does not provide deliverable type information. |
| D      | No       | Student does not provide deliverable type; Time alone is insufficient. |

**28. The chapter explains ELT is common in cloud warehouses. What makes ELT practical in cloud environments?**

**Correct Answer: B — Cloud platforms such as BigQuery and Snowflake can perform transformations at scale inside the target system after loading**

Explanation: Section 12.3 explains: "ELT is common in modern cloud warehouses because platforms such as BigQuery, Snowflake, Redshift, and PostgreSQL-based systems can perform transformations at scale."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Cloud warehouses absolutely can run SQL. |
| B      | **Yes**  | The chapter cites cloud platforms' ability to transform at scale inside the target system. |
| C      | No       | ELT does not require JSON; it works with any data format. |
| D      | No       | Traditional warehouses fully support GROUP BY. |

**29. A university Provost sees "Retention = 91%" and "Retention = 68%" on the same dashboard. Which governance element would most likely have prevented this?**

**Correct Answer: B — A shared metric definition specifying the formula, grain, exclusions, and data owner**

Explanation: Section 12.10 identifies metric definitions as the root cause: "The problem is not the database. The problem is that no one governed the definition of 'retention' before it appeared on a dashboard."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | A faster pipeline would not resolve definitional conflicts. |
| B      | **Yes**  | Shared, governed metric definitions directly prevent conflicting-numbers problems. |
| C      | No       | More storage capacity does not address metric definition governance. |
| D      | No       | Hiding one number does not solve the underlying governance problem. |

**30. Select ALL that apply: Which of the following are true differences between star and snowflake schemas as described in the chapter?**

**Correct Answers: A, B, C, E**

Explanation: Section 12.5 states snowflake schemas "normalize dimensions into additional sub-tables" (A), "reduce redundancy" (B), and "add joins" (C). Star schemas "intentionally repeat some descriptive values" (E). Snowflake schemas still have a fact table (D is false).

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | The chapter defines snowflake as normalizing dimensions into sub-tables. |
| B      | **Yes**  | Snowflake schemas reduce redundancy through normalization. |
| C      | **Yes**  | More normalized sub-tables mean more joins. |
| D      | No       | Snowflake schemas still have a central fact table. |
| E      | **Yes**  | Star schemas intentionally repeat values; this is controlled denormalization. |

**31. An instructor builds a dashboard with six charts, all using different color schemes and three different y-axis scales. According to the chapter's visualization pitfalls, what is the most likely problem?**

**Correct Answer: A — Too many charts and inconsistent scales make comparisons misleading**

Explanation: Section 12.8's visualization pitfalls table lists "Too many charts" (users do not know where to look) and "Inconsistent scales" (comparisons become misleading).

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | Both "too many charts" and "inconsistent scales" are listed pitfalls. |
| B      | No       | The chapter does not call pie charts inherently confusing for all cases. |
| C      | No       | The chapter does not say SQLite-built charts are inherently worse. |
| D      | No       | Schema choice is unrelated to visualization clarity. |

**32. Select ALL that apply: A well-designed KPI, according to the chapter, should have which of the following?**

**Correct Answers: A, B, C, D**

Explanation: Section 12.9 states a KPI "becomes useful when it has context: a target, a time period, an owner, a decision rule, and a clear definition." Option E contradicts the chapter's warning against "decorative 3D charts."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | "A target" is listed as KPI context. |
| B      | **Yes**  | "A time period" is listed as KPI context. |
| C      | **Yes**  | "An owner" is listed as KPI context. |
| D      | **Yes**  | "A clear definition" is listed as KPI context. |
| E      | No       | The chapter explicitly warns against decorative 3D charts. |

### Evaluate Questions

**33. A small community college wants to start using BI with a limited budget and one IT staff member, currently using Access and Excel. Which BI approach is most appropriate as a starting point?**

**Correct Answer: B — Use Access queries and reports for foundational BI, exporting to Excel or Power BI as needs grow**

Explanation: Section 12.11 describes Access as suitable for "visual reports and small dashboards" with "easy forms, queries, reports." The Access BI pattern includes exporting to Excel or Power BI.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | A full EDW with Snowflake is expensive and complex for a small college. |
| B      | **Yes**  | Leverages existing tools (Access) with a gradual path to more advanced BI. |
| C      | No       | Immediate migration to PostgreSQL/Supabase is a large undertaking. |
| D      | No       | A commercial BI suite is likely overkill for a small college. |

**34. A course coordinator proposes four KPIs for a Balanced Scorecard: average final exam, midterm, quiz, and homework scores. What is the main weakness?**

**Correct Answer: A — All four KPIs measure the same perspective (academic outcome) and neglect process, engagement, and improvement dimensions**

Explanation: Section 12.9 warns against "metric tunnel vision" and shows a multi-perspective scorecard.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | The Balanced Scorecard requires multiple perspectives; all-test-score metrics violate this. |
| B      | No       | The chapter does not prefer medians over averages for scorecards. |
| C      | No       | The Balanced Scorecard explicitly includes non-financial perspectives. |
| D      | No       | Four KPIs is not too many; the problem is they all measure the same thing. |

**35. A retail company's daily ETL takes six hours. An engineer proposes switching to ELT: load raw data immediately and transform in the cloud warehouse. Which trade-off is the company making?**

**Correct Answer: A — Faster data availability at the cost of running transformations on raw, uncleaned data**

Explanation: Section 12.3 contrasts ETL (transform before load, cleaner but slower) with ELT (load first, transform later, faster but transformations run on raw data).

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | ELT loads raw data faster but transformations happen on potentially dirty data. |
| B      | No       | ELT typically makes data available faster, not slower. |
| C      | No       | ELT does not cause loss of historical data. |
| D      | No       | ELT does not eliminate the need for governance. |

**36. A university committee debates department-specific "student success rate" definitions. What should they establish first?**

**Correct Answer: B — A governed metric portfolio: one institution-wide definition plus department-specific companion metrics with documented definitions and owners**

Explanation: Section 12.10 advocates shared, governed metric definitions while acknowledging legitimate contextual differences across departments.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Forcing identical metrics ignores legitimate contextual differences. |
| B      | **Yes**  | Balances enterprise consistency with department-specific needs, matching the chapter's philosophy. |
| C      | No       | Consistent labels without consistent definitions is the governance failure the chapter warns against. |
| D      | No       | Prohibiting cross-department comparison is an overreaction. |

**37. An analyst's RFM segmentation shows a group with high Monetary, high Frequency, but very low Recency (last purchase over a year ago). Which action is most consistent with RFM logic?**

**Correct Answer: C — Flag as "at risk of leaving" and design a re-engagement campaign**

Explanation: Section 12.6 describes RFM segments including "at risk of leaving." High Monetary + Frequency but low Recency signals former valuable customers who have disengaged.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Investing heavily in lapsed customers without re-engagement is wasteful. |
| B      | No       | The chapter treats all three RFM dimensions as important; low Recency is a warning signal. |
| C      | **Yes**  | Matches the chapter's "at risk of leaving" segment and targeted intervention logic. |
| D      | No       | Deleting customer data is not an RFM-based action. |

**38. An IT director must choose between one EDW and several independent data marts for a hospital with urgent departmental needs. Which approach best balances governance with responsiveness?**

**Correct Answer: C — Build a central EDW with focused data marts layered on top**

Explanation: Section 12.4 presents EDW as "single version of truth" and data marts as "faster and more focused." The hybrid balances governance (EDW) with responsiveness (data marts).

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Making all departments wait ignores urgent needs. |
| B      | No       | Independent marts without a central warehouse create silos and inconsistencies. |
| C      | **Yes**  | The EDW + data mart hybrid is the classic balanced approach. |
| D      | No       | A pure data-lake approach lacks governance and structured reporting. |

**39. A student runs a HAVING AVG(Score) < 70 query on `StudentPerformanceBI`. One student has five rows, all with `Score = NULL`. Why does this student NOT appear in the results?**

**Correct Answer: A — AVG(Score) returns NULL when all values are NULL, and NULL < 70 evaluates to UNKNOWN**

Explanation: Section 12.7 discusses NULL handling in aggregates. `AVG(Score)` ignores NULL values; when ALL values are NULL, the result is NULL. In SQL, `NULL < 70` evaluates to UNKNOWN (not TRUE), so the HAVING clause excludes the row. This is a subtle but important SQL behavior.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | When all scores are NULL, AVG returns NULL, and NULL comparisons in HAVING exclude the row. |
| B      | No       | COUNT(*) counts rows regardless of NULL; it would return 5, not 0. |
| C      | No       | The StudentPerformanceBI view includes rows with NULL Score (it maps them to 'Missing'). |
| D      | No       | AVG ignores NULLs; it does not treat them as 0. With all NULLs, AVG returns NULL. |

**40. Select ALL that apply: Which of the following would undermine trust in a BI dashboard, according to the chapter?**

**Correct Answers: A, B, C, E**

Explanation: The chapter's governance and reporting sections identify metric inconsistency (A), undocumented definitions (B), stale data (C), and inadequate access controls (E) as trust-undermining factors. A clearly labeled chart (D) builds trust, not undermines it.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | **Yes**  | Inconsistent metric definitions directly undermine trust (12.10 governance example). |
| B      | **Yes**  | Undocumented metrics prevent users from understanding what numbers mean (12.10). |
| C      | **Yes**  | Stale data violates the "timely" characteristic of effective BI reporting (12.8). |
| D      | No       | Clearly labeled axes and descriptive titles build trust, not undermine it. |
| E      | **Yes**  | Overexposed sensitive data violates access-control governance (12.10). |

## Question Distribution Summary

### Bloom Level

| Bloom Level | Questions | Count |
| ----------- | --------- | ----- |
| Remember    | 1, 2, 3, 4, 5, 6, 7, 8 | 8 |
| Understand  | 9, 10, 11, 12, 13, 14, 15, 16 | 8 |
| Apply       | 17, 18, 19, 20, 21, 22, 23, 24 | 8 |
| Analyze     | 25, 26, 27, 28, 29, 30, 31, 32 | 8 |
| Evaluate    | 33, 34, 35, 36, 37, 38, 39, 40 | 8 |

### Question Type

| Question Type                | Questions | Count |
| ---------------------------- | --------- | ----- |
| Single-answer MC             | 1–7, 9–11, 13–14, 17–23, 25–29, 31, 33–39 | 26 |
| Multiple-answer (Select ALL) | 8, 12, 15, 16, 24, 30, 32, 40 | 14 |

### Design Criterion

| Design Criterion  | Questions | Count |
| ----------------- | --------- | ----- |
| Application-based | 2, 4, 5, 7, 8, 11, 13, 14, 16, 19, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 35, 36, 38, 39, 40 | 14 |
| Scenario-based    | 17, 18, 25, 30, 33, 34, 37, 38, 39, 40 | 12 |
| Definition-only   | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15 | 14 |
