# Chapter 14 — Power BI — Data Visualization and Business Reporting

> **Review copy — regenerated 2026-07-07 AFTER structural fixes. This reflects current source content.**
> Source folder: `books/database-book/files/source/chapters/ch14-powerbi/`
> Components below are in reader order: Introduction, Core Concepts, Let's Build, Review Questions, Terms Treasury, RAT.


<!-- =================================================================== -->
<!-- COMPONENT: index.md -->
<!-- =================================================================== -->

````````````
===== Introduction (index.md) =====
````````````

# Chapter 14: Power BI — Data Visualization and Business Reporting

This chapter introduces Microsoft Power BI as the industry-standard tool for turning database output into visual business reports. The chapter covers connecting data sources, building data models, creating calculated columns and measures (DAX), designing interactive dashboards, and presenting findings to a non-technical audience. The chapter ties directly to SQL output and the Grading Database as the source data.

**After reading this chapter, you will be able to:**

- Connect Power BI to a database source and build a basic data model
- Create interactive visuals and dashboards that answer a defined business question
- Design a report layout appropriate for a managerial audience

## Chapter Video

> **Video placeholder:** Chapter 14 overview video will be added here before publication.

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [14.1 From SQL Output to Business Dashboards](#14-1-from-sql-output-to-business-dashboards) | See how Power BI turns clean SQL output into visuals a manager can act on. |
| [14.2 Connecting to Data Sources](#14-2-connecting-to-data-sources) | Import data from Access, Excel, and SQL — the first step in any Power BI project. |
| [14.3 Power Query: Transforming Data](#14-3-power-query-transforming-data) | Clean and reshape raw data before visualization — where most BI work actually happens. |
| [14.4 Building Visualizations](#14-4-building-visualizations) | Create charts, tables, and KPIs that communicate insights at a glance. |
| [14.5 DAX: Data Analysis Expressions](#14-5-dax-data-analysis-expressions) | Learn the formula language that powers calculated measures in Power BI. |
| [14.6 Interactive Reports: Slicers and Filters](#14-6-interactive-reports-slicers-and-filters) | Add user-controlled filters that make reports exploratory, not static. |
| [14.7 Publishing and Sharing](#14-7-publishing-and-sharing) | Deploy reports to the cloud so decision-makers can access them anywhere. |

---


<!-- =================================================================== -->
<!-- COMPONENT: core-concepts.md -->
<!-- =================================================================== -->

````````````
===== Core Concepts (core-concepts.md) =====
````````````

# Chapter 14: Power BI — Data Visualization and Business Reporting

This chapter introduces Microsoft Power BI as the industry-standard tool for turning database output into visual business reports. The chapter covers connecting data sources, building data models, creating calculated columns and measures (DAX), designing interactive dashboards, and presenting findings to a non-technical audience. The chapter ties directly to SQL output and the Grading Database as the source data.

**After reading this chapter, you will be able to:**

- Connect Power BI to a database source and build a basic data model
- Create interactive visuals and dashboards that answer a defined business question
- Design a report layout appropriate for a managerial audience

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Core Concepts

## 14.1 From SQL Output to Business Dashboards

Every previous chapter ended with data *inside* a database — designed, queried, and validated. Power BI is where that data becomes a picture a decision-maker can act on. It sits at the end of the data-to-decision pipeline: SQL (and the Grading Database) produce clean, correct results, and Power BI turns those results into interactive visuals and dashboards for a non-technical audience.

This chapter follows that flow in order: connect to a data source (14.2), reshape the raw data with Power Query (14.3), build visualizations (14.4), add calculated logic with DAX (14.5), make reports interactive with slicers and filters (14.6), and publish and share the finished report (14.7). Throughout, the Grading Database is the source, and the goal is always the same — help a manager see what the data means, not just what it says.

## 14.2 Connecting to Data Sources

Power BI can connect to a wide variety of data sources including:

- Excel workbooks
- CSV and flat files
- SQL Server and other relational databases
- SharePoint, OneDrive, and Teams
- Web pages and APIs

### Steps to Connect

1. Open **Power BI Desktop**.
2. Click **Home → Get Data**.
3. Select the data source type.
4. Authenticate and select tables or files to load.

🧪 **Example:** In our class grading database scenario, you would connect to the `GRADECENTER` SQL database and import the `Students`, `Courses`, and `Grades` tables.

---

## 14.3 Power Query: Transforming Data

Before building visuals, raw data often needs cleaning. **Power Query** is the built-in data transformation engine in Power BI.

Common transformations include:

- Removing duplicate rows
- Renaming columns
- Changing data types
- Filtering out blank or null values
- Merging or appending tables

📝 **Note:** Power Query transformations are non-destructive — the original data source is never modified.

---

## 14.4 Building Visualizations

Once data is loaded, you can build visuals by dragging fields onto the report canvas.

### Core Visual Types

| Visual | Best Used For |
|---|---|
| Bar / Column Chart | Comparing categories |
| Line Chart | Trends over time |
| Pie / Donut Chart | Part-to-whole relationships |
| Card | Displaying a single KPI value |
| Table / Matrix | Tabular data with row/column groupings |
| Map | Geographic data |

🔑 **Key Takeaway:** Choose the right visual for the story you are telling. A poorly chosen chart can mislead the audience even if the data is accurate.

---

## 14.5 DAX: Data Analysis Expressions

**DAX** is the formula language used in Power BI to create calculated columns and measures.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Calculated Column vs. Measure

| Type | Evaluated | Stored |
|---|---|---|
| Calculated Column | Row by row | In the table |
| Measure | On demand | Not stored |

#### Common DAX Functions

```dax
-- Count rows
Total Students = COUNTROWS(Students)

-- Sum a column
Total Points = SUM(Grades[Points])

-- Average with filter
Avg Grade A = CALCULATE(AVERAGE(Grades[Score]), Grades[LetterGrade] = "A")
```

---

## 14.6 Interactive Reports: Slicers and Filters

Power BI reports are interactive by default. Users can filter data using:

- **Slicers** — visual dropdowns or lists on the canvas
- **Report Filters** — apply to the whole report
- **Page Filters** — apply to a single report page
- **Visual Filters** — apply to a single visual

✅ **Good Practice:** Always include a slicer for the most important dimension (e.g., semester, department, date range) so report consumers can self-serve.

---

## 14.7 Publishing and Sharing

Once a report is complete in Power BI Desktop, you can publish it to the **Power BI Service**:

1. Click **Home → Publish**.
2. Sign in with your Microsoft/school account.
3. Select a workspace.
4. Open the report in your browser at [app.powerbi.com](https://app.powerbi.com).

From the Service, you can share reports with colleagues, embed them in Teams or SharePoint, or schedule automatic data refreshes.

---

## Chapter Summary

In this chapter, you learned how to use Power BI as the final layer in the data-to-decision pipeline introduced in Chapter 1. You connected to data sources, cleaned data with Power Query, built interactive visualizations, and published a report to the Power BI Service. These skills translate directly to analyst and manager roles across every industry.

---

## Key Terms

See the Chapter 14 Term Treasury companion for a complete glossary.

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Review Questions

See the Chapter 14 Reflection companion for discussion and review questions.

---

## Figures Index

| Figure | Caption | File |
|---|---|---|
| 14.1 | Power BI component overview | *(to be added)* |
| 14.2 | Power Query transformation interface | *(to be added)* |
| 14.3 | Sample grading dashboard in Power BI | *(to be added)* |


<!-- =================================================================== -->
<!-- COMPONENT: lets-build.md -->
<!-- =================================================================== -->

````````````
===== Let's Build (lets-build.md) =====
````````````

# Chapter 14: Let's Build — Power BI Dashboard with the Grading Database

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

<!-- Companion: Hands-on build exercise — 2026-05-06 -->

# Overview

In this Let's Build exercise, you will connect Power BI Desktop to the GRADECENTER database and create a multi-page interactive grading dashboard from scratch.

---

# Prerequisites

- Power BI Desktop installed (free download from Microsoft)
- Access to the `GRADECENTER` database or the provided Excel export
- Completion of Chapters 5 and 9 (SQL fundamentals and advanced queries)

---

# Step 1: Get the Data

1. Open **Power BI Desktop**.
2. Click **Home → Get Data → SQL Server** (or **Excel** if using the provided export).
3. Connect to the GRADECENTER data source.
4. Load the following tables: `Students`, `Courses`, `Enrollments`, `Grades`, `Instructors`.

---

# Step 2: Review the Data Model

1. Switch to the **Model view** (table icon on the left rail).
2. Verify that relationships exist between:
   - `Students` → `Enrollments` (StudentID)
   - `Courses` → `Enrollments` (CourseID)
   - `Enrollments` → `Grades` (EnrollmentID)
3. If relationships are missing, drag fields to create them manually.

---

# Step 3: Clean Data with Power Query

1. Click **Transform Data** to open Power Query.
2. In the `Grades` table:
   - Remove any rows where `Score` is blank.
   - Change `Score` to a **Decimal Number** data type.
3. Click **Close & Apply**.

---

# Step 4: Create Measures

Switch to **Report view** and create the following measures in the `Grades` table:

```dax
Average Score = AVERAGE(Grades[Score])

Total Enrollments = COUNTROWS(Enrollments)

Pass Rate = 
DIVIDE(
    COUNTROWS(FILTER(Grades, Grades[Score] >= 60)),
    COUNTROWS(Grades)
)
```

---

# Step 5: Build Page 1 — Course Summary

1. Add a **Card** visual → drag `Average Score` measure to it.
2. Add a **Bar Chart** → X-axis: `CourseName`, Y-axis: `Average Score`.
3. Add a **Slicer** → Field: `Semester`.
4. Format the page with a title: *"Course Performance Overview"*.

---

# Step 6: Build Page 2 — Student Detail

1. Add a **Table** visual with columns: `StudentName`, `CourseName`, `Score`, `LetterGrade`.
2. Add a **Slicer** for `InstructorName`.
3. Add a **Card** for `Pass Rate`.

---

# Step 7: Publish (Optional)

1. Save the `.pbix` file as `grading-dashboard.pbix`.
2. Click **Publish → My Workspace** (requires a Microsoft account).
3. Open the report in a browser at app.powerbi.com.

---

# Deliverable

Submit your `.pbix` file and a screenshot of your completed dashboard showing at least two pages.

---

# Discussion Prompt

How would you use this dashboard if you were the department chair? What additional measures or visuals would help you make staffing or curriculum decisions?


<!-- =================================================================== -->
<!-- COMPONENT: review-questions.md -->
<!-- =================================================================== -->

````````````
===== Review Questions (review-questions.md) =====
````````````

# Chapter 14: Review and Reflection

# Review Questions

1. Explain the role of 14.2 connecting to data sources in this chapter.

2. Explain the role of steps to connect in this chapter.

3. Explain the role of 14.3 power query: transforming data in this chapter.

4. Explain the role of 14.4 building visualizations in this chapter.

5. Explain the role of core visual types in this chapter.

6. Explain the role of 14.5 dax: data analysis expressions in this chapter.

7. Explain the role of calculated column vs. measure in this chapter.

8. Explain the role of 14.6 interactive reports: slicers and filters in this chapter.

# Reflection Questions

9. Which idea from this chapter is most useful for the Grading Database project?

10. What would you ask for help with before applying this chapter in practice?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Answer Key

1. A strong answer defines 14.2 connecting to data sources, explains why it matters, and connects it to trustworthy data work or business performance.

2. A strong answer defines steps to connect, explains why it matters, and connects it to trustworthy data work or business performance.

3. A strong answer defines 14.3 power query: transforming data, explains why it matters, and connects it to trustworthy data work or business performance.

4. A strong answer defines 14.4 building visualizations, explains why it matters, and connects it to trustworthy data work or business performance.

5. A strong answer defines core visual types, explains why it matters, and connects it to trustworthy data work or business performance.

6. A strong answer defines 14.5 dax: data analysis expressions, explains why it matters, and connects it to trustworthy data work or business performance.

7. A strong answer defines calculated column vs. measure, explains why it matters, and connects it to trustworthy data work or business performance.

8. A strong answer defines 14.6 interactive reports: slicers and filters, explains why it matters, and connects it to trustworthy data work or business performance.

9. Strong responses connect one chapter idea to a concrete course project decision.

10. Strong responses identify a specific uncertainty and explain what evidence or practice would resolve it.


<!-- =================================================================== -->
<!-- COMPONENT: terms-treasury.md -->
<!-- =================================================================== -->

````````````
===== Terms Treasury (terms-treasury.md) =====
````````````

# Chapter 14 Term Treasury — Power BI

<!-- Companion: Key terms and definitions — 2026-05-06 -->

| Term | Definition |
|---|---|
| **Power BI** | A Microsoft business analytics service for connecting to data sources, building visualizations, and sharing reports. |
| **Power BI Desktop** | The free Windows application used to create Power BI reports and data models. |
| **Power BI Service** | The cloud platform (app.powerbi.com) used to publish, share, and collaborate on Power BI reports. |
| **Power Query** | The data transformation engine built into Power BI used to clean, reshape, and combine data before loading. |
| **DAX (Data Analysis Expressions)** | The formula language used in Power BI to create calculated columns and measures. |
| **Measure** | A DAX calculation evaluated on demand based on the current filter context; not stored row-by-row. |
| **Calculated Column** | A DAX expression evaluated row-by-row and stored as a new column in a table. |
| **Visualization (Visual)** | A graphical representation of data on a Power BI report canvas (e.g., bar chart, card, table). |
| **Slicer** | A visual filter control placed on the report canvas that lets users interactively filter other visuals. |
| **Filter Context** | The set of filters currently applied to a calculation in DAX, determined by slicers, report filters, and visual interactions. |
| **Data Model** | The set of tables and relationships defined in Power BI that determines how data can be combined in visuals. |
| **Relationship** | A defined link between two tables in the Power BI data model, typically based on a shared key column. |
| **Workspace** | A shared environment in the Power BI Service where reports, dashboards, and datasets are organized and shared. |
| **Dashboard** | A single-page summary in the Power BI Service that pins visuals from one or more reports. |
| **KPI (Key Performance Indicator)** | A measurable value used to evaluate success against a business objective; often displayed as a Card visual. |
| **Report Page** | A single canvas within a Power BI report; one report can contain multiple pages. |
| **Drill-through** | A Power BI feature that lets users right-click a data point and navigate to a detail report page filtered to that context. |
| **Publish** | The action of uploading a `.pbix` file from Power BI Desktop to the Power BI Service. |


<!-- =================================================================== -->
<!-- COMPONENT: rat.md -->
<!-- =================================================================== -->

````````````
===== RAT: Reading Test (rat.md) =====
````````````

# Chapter 14 RAT — Power BI

<!-- Companion: Readiness Assurance Test (RAT) quiz — 2026-05-06 -->
<!-- Format: Multiple choice with answers at end -->

## Instructions

Answer each question individually before discussing with your team. These questions are based on the Chapter 14 reading assignment.

---

**1.** Which component of Power BI is used to *create* reports?

- A) Power BI Service
- B) Power BI Mobile
- C) Power BI Desktop
- D) Power Query Editor

---

**2.** What language is used to write calculated columns and measures in Power BI?

- A) SQL
- B) Python
- C) DAX
- D) MDX

---

**3.** You want to display the total number of students enrolled in a course as a single number on a report. Which visual type is most appropriate?

- A) Bar Chart
- B) Table
- C) Slicer
- D) Card

---

**4.** A **measure** in Power BI is different from a **calculated column** because:

- A) Measures are stored row-by-row in the table
- B) Measures are evaluated on demand based on filter context
- C) Measures can only use the SUM function
- D) Measures cannot reference other measures

---

**5.** Which Power BI feature allows a report user to interactively filter all visuals on a page by selecting a value?

- A) Drill-through
- B) Calculated column
- C) Slicer
- D) Tooltip

---

**6.** A student earns a score of 45 on an exam. A DAX measure `Pass Rate` counts rows where `Score >= 60` divided by total rows. This student's row:

- A) Is excluded from both numerator and denominator
- B) Is included in the numerator only
- C) Is included in both numerator and denominator
- D) Is included in the denominator only

---

**7.** To make a Power BI Desktop report accessible to colleagues who don't have the Desktop app, you should:

- A) Email the `.pbix` file
- B) Export it as a PDF
- C) Publish it to the Power BI Service
- D) Save it to a shared drive

---

**8.** Power Query transformations are best described as:

- A) Changes that permanently modify the original data source
- B) SQL queries written inside Power BI
- C) Non-destructive steps that shape data before it loads into the model
- D) DAX expressions applied to tables

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Answer Key

| # | Answer | Explanation |
|---|---|---|
| 1 | C | Power BI Desktop is the free authoring tool |
| 2 | C | DAX (Data Analysis Expressions) is Power BI's formula language |
| 3 | D | A Card visual displays a single scalar value |
| 4 | B | Measures respond to filter context; calculated columns are row-based |
| 5 | C | A Slicer is a canvas-based interactive filter |
| 6 | D | The row is counted in the denominator (total rows) but not the numerator (score < 60) |
| 7 | C | Publishing to the Power BI Service makes reports shareable via browser |
| 8 | C | Power Query steps are applied at load time and do not alter source data |

