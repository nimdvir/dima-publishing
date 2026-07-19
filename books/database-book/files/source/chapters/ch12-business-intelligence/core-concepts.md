<!-- metadata: date="2026-07-19" -->

# Chapter 12: Business Intelligence, Data Visualization, and Reporting

*From reliable database records to understandable business evidence*

A database can store every score, appointment, payment, order, and attendance record correctly and still fail to improve a single decision. The missing step is communication.

By this point in the course, you can organize data into relational tables, enforce relationships, write SQL queries, and create reusable database objects. Those skills protect the accuracy and integrity of the data. Managers, however, rarely want to inspect ten normalized tables or read a 400-row query result. They want to know what is happening, where performance differs, whether conditions are changing, and what deserves attention.

That is the role of **Business Intelligence**, or **BI**. BI connects trustworthy database records to reports, visualizations, metrics, and explanations. It does not replace database design or SQL. It depends on them.

This chapter focuses on the practical reporting layer. You will learn how to prepare reporting-ready data, select an appropriate reporting format, and use three levels of reporting technology. Microsoft Access provides structured printable reports close to the database. Notion offers lightweight collaborative views for small teams. Power BI Desktop provides a free Windows environment for importing data, preparing it with Power Query, creating calculations with DAX, and building interactive reports.

AI also enters the reporting workflow. A source-grounded tool such as NotebookLM can help summarize a dashboard, compare supplied documents, or draft a management briefing. Yet an AI-generated explanation is not evidence by itself. The database, reporting query, and verified metric remain the sources of truth.

The three chapters at the end of this book follow one progression:

```text
Chapter 12: Communicate what the data shows.
Chapter 13: Decide what the organization should do.
Chapter 14: Understand the modern infrastructure behind analytics and AI.
```

## Learning Objectives

After completing this chapter, you will be able to:

1. Define Business Intelligence and explain how it turns database output into decision support.
2. Connect BI to the DIKW hierarchy and the R.E.A.D. framework.
3. Distinguish operational questions from analytical questions.
4. Explain how ETL, data quality rules, and grain create trustworthy reporting data.
5. Design and validate a reusable reporting query in Microsoft Access.
6. Distinguish measures, attributes, identifiers, metrics, KPIs, reports, dashboards, and KPI cards.
7. Select and evaluate visualizations for comparison, trend, distribution, relationship, and exact-value questions.
8. Match a reporting need to Access, Notion, or Power BI Desktop.
9. Install Power BI Desktop and import a saved query from a Microsoft Access database.
10. Use Power Query, basic DAX measures, filters, slicers, and report interactions.
11. Use NotebookLM as a source-grounded reporting assistant while verifying every factual and numerical claim.

## Chapter Roadmap

| Section | Main Question | Core Ideas |
|---|---|---|
| 12.1 | What is Business Intelligence? | BI workflow, DIKW, R.E.A.D., decision support |
| 12.2 | How are analytical questions different from operational questions? | Individual records, groups, comparisons, trends |
| 12.3 | How does data become trustworthy enough to report? | ETL, ELT, data quality, grain, refresh |
| 12.4 | Why should reporting begin with a tested query? | Reporting layer, measures, attributes, validation |
| 12.5 | Which reporting output fits the need? | Metrics, KPIs, reports, dashboards, KPI cards |
| 12.6 | Which visual fits the question? | Chart selection, clarity, context, honest design |
| 12.7 | How much reporting technology is needed? | Three Reporting Tiers |
| 12.8 | When is an Access report the right choice? | Grouping, totals, printing, PDF export |
| 12.9 | How does Power BI Desktop connect to Access? | Installation, `.pbix`, Import, refresh, troubleshooting |
| 12.10 | How are interactive Power BI reports created? | Power Query, DAX, filters, slicers, cross-filtering |
| 12.11 | When is Notion sufficient? | Views, relations, rollups, small-team reporting |
| 12.12 | How can AI support reporting responsibly? | NotebookLM, source grounding, verification |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part A: From Database Output to Business Intelligence

## 12.1 What Is Business Intelligence?

> **Definition:** Business Intelligence is the collection of concepts, tools, and practices that help organizations transform data into information, insight, and decision support.

BI is not one product. It is a workflow that connects reliable records to understandable evidence.

```text
Operational data
→ reporting-ready data
→ metric or query
→ report or visualization
→ interpretation
→ decision support
```

Organizations use BI to perform four broad functions:

| BI function | Purpose | Grading Database example |
|---|---|---|
| **Monitor** | Track current conditions | Display the current class average |
| **Compare** | Examine differences | Compare average scores across deliverable categories |
| **Diagnose** | Investigate possible explanations | Compare attendance patterns with performance |
| **Support action** | Identify where attention may be needed | List students whose averages are below a review threshold |

The wording **support action** matters. A report may show that exam performance declined, but it cannot independently determine why the decline occurred or which response is appropriate. It provides evidence for human judgment. Chapter 13 examines that judgment in detail.

### BI and the DIKW Hierarchy

> **Definition:** The DIKW hierarchy describes a movement from raw **Data**, to organized **Information**, to interpreted **Knowledge**, and finally to judgment-based **Wisdom**.

| DIKW level | Meaning | Grading Database example |
|---|---|---|
| **Data** | Raw recorded facts | `StudentID = 101`, `Score = 72` |
| **Information** | Organized facts with context | The average score on Quiz 2 is 76 |
| **Knowledge** | Interpreted patterns | Quiz averages have declined across three weeks |
| **Wisdom** | Responsible judgment and action | Investigate the pattern and test an intervention before Quiz 4 |

Databases primarily store data. Queries and reports organize data into information. BI helps people identify patterns that can become knowledge. Wisdom requires goals, context, values, uncertainty, and responsibility. That final step belongs mainly to Chapter 13.

### BI and the R.E.A.D. Framework

> **Definition:** The R.E.A.D. framework describes the movement from representing and retrieving data, to expressing and explaining it, analyzing and associating patterns, and deciding and deploying action.

| R.E.A.D. stage | BI interpretation | Example |
|---|---|---|
| **Represent and Retrieve** | Store and access reliable records | Maintain students, deliverables, scores, and attendance in related tables |
| **Express and Explain** | Present data in understandable forms | Create reports, charts, tables, and KPI cards |
| **Analyze and Associate** | Examine comparisons, trends, and relationships | Compare category averages and attendance patterns |
| **Decide and Deploy** | Select and implement a response | Contact students, revise an assessment, or change a process |

BI occupies the middle of this framework. It depends on accurate representation and retrieval, and it creates the evidence used during analysis and decision-making.

<div class="callout key-takeaway">
<p><strong>Key Takeaway:</strong> BI does not create wisdom automatically. It turns trustworthy records into structured evidence that people can understand, question, and use.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.2 From Operational Records to Analytical Questions

> **Definition:** An operational question concerns one specific transaction, event, or current record.

> **Definition:** An analytical question examines patterns, groups, comparisons, exceptions, or changes over time.

Operational questions help an organization run its daily activities:

- Did Student 104 submit Exam 2?
- Was Invoice 821 paid?
- What vaccine did Pet 305 receive today?
- How many units of Product A remain in stock?

Analytical questions help an organization understand performance:

- Which deliverable categories have the lowest averages?
- Is the average payment delay increasing?
- Which pets are overdue by month or location?
- Which products generate high revenue but weak margins?

| Operational question | Analytical question |
|---|---|
| What score did Student 104 receive? | Which assessments have the lowest class averages? |
| Was this appointment completed? | Is the no-show rate changing over time? |
| Did this customer place an order? | Which customer groups purchase most frequently? |
| Is this invoice overdue? | Which regions have the longest payment delays? |

The same relational database may support both types of questions in a small organization. At a larger scale, organizations often separate transaction processing from analytical processing because the workloads have different priorities. Chapter 14 introduces the formal OLTP and OLAP architecture behind that separation.

For this chapter, the practical lesson is simpler: before creating a report, rewrite the business need as an analytical question.

A weak reporting request says:

> Create a dashboard with student data.

A stronger request says:

> Which deliverable categories have the lowest average scores, and which students contribute most to that result?

The stronger version identifies a comparison, a population, and a reason to inspect detail. That makes it easier to choose the source query, metric, visual, and filter.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.3 Preparing Trustworthy Reporting Data

> **Definition:** ETL stands for **Extract, Transform, and Load**. It is the process of retrieving data, applying defined preparation rules, and placing the result into a reporting or analytical structure.

ETL is often described as a technical pipeline. It is also a meaning pipeline.

| ETL stage | What happens | Grading Database example |
|---|---|---|
| **Extract** | Retrieve data from source tables or systems | Read `STUDENT`, `DELIVERABLE`, `STUDENT_GRADE`, and `ATTENDANCE` |
| **Transform** | Join, clean, standardize, validate, or calculate | Add names, categories, percentages, dates, and status labels |
| **Load** | Place prepared data into a reporting structure | Save an Access query or import its result into Power BI Desktop |

### The Transform Step Is Where Meaning Enters

Consider a missing score. It could mean:

- the student did not submit the work;
- the student submitted the work, but it has not been graded;
- the student received an approved extension;
- the assignment does not apply to that student;
- the grade record failed to import.

Replacing every missing value with zero would be convenient. It could also be wrong. A transformation must follow a documented business rule rather than a convenient assumption.

Common reporting transformations include:

- removing duplicate records;
- standardizing labels such as `HW`, `Homework`, and `Home Work`;
- converting text values into valid dates or numbers;
- validating score and price ranges;
- joining codes to readable descriptions;
- calculating rates and percentages;
- identifying invalid or incomplete records;
- assigning categories such as At Risk, Satisfactory, and Strong.

### ETL and ELT

> **Definition:** ELT stands for **Extract, Load, and Transform**. It loads source data into the target platform before performing transformations there.

| Approach | Sequence | Typical use |
|---|---|---|
| **ETL** | Extract → Transform → Load | Prepared reporting queries and traditional data pipelines |
| **ELT** | Extract → Load → Transform | Cloud platforms that store raw data before transforming it |

In this chapter, a saved Access query acts like a small ETL layer. Chapter 14 returns to ETL and ELT as parts of larger warehouses, lakes, and cloud data pipelines.

### Grain: What Does One Row Mean?

> **Definition:** Grain states exactly what one row in a reporting source represents.

Examples include:

- one row per student;
- one row per student per recorded deliverable result;
- one row per invoice;
- one row per invoice line;
- one row per pet appointment;
- one row per product per month.

Grain must be established before a metric is calculated. Suppose `qry_GradeBI` contains one row per student per recorded deliverable result. If every student has ten grade rows, then:

```text
COUNTROWS(qry_GradeBI)
```

counts recorded results, not students. Counting students requires a distinct count of `StudentID`.

Grain also explains why missing records are difficult. An inner join between students and grades returns existing grade records. It cannot reveal a student-deliverable combination that has no grade row at all. A complete missing-submission report needs a query that first constructs the expected combinations and then identifies which ones are absent.

<div class="callout warning">
<p><strong>Warning:</strong> If the grain is unclear, a correct formula can still answer the wrong question.</p>
</div>

### Refresh Information Is Part of the Data

Every report should identify when its data was last refreshed. A report can appear current even when its imported data is several weeks old.

At minimum, document:

- source database;
- source query;
- reporting grain;
- date and time of refresh;
- important inclusions and exclusions;
- known limitations.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.4 The Reporting Query as a Reporting Layer

> **Definition:** A reporting query is a tested, reusable query that presents database data in a structure designed for reports and analysis.

A reporting query sits between normalized operational tables and reporting tools.

```text
Normalized source tables
→ tested reporting query
→ Access report, Power BI, export, or AI-assisted summary
```

This query can centralize:

- joins;
- readable labels;
- stable calculations;
- row-level classifications;
- date fields;
- privacy decisions about which fields are exposed;
- a documented grain.

For the Grading Database, a useful query might be named:

```text
qry_GradeBI
```

It could contain:

| Column | Purpose |
|---|---|
| `StudentID` | Stable identifier for distinct counts and validation |
| `StudentName` | Readable label for tables and filters |
| `DeliverableID` | Identifier for the assessment record |
| `DeliverableName` | Readable assessment label |
| `CategoryName` | Grouping field such as Homework, Quiz, Exam, or Project |
| `DueDate` | Time field for filtering and trend analysis |
| `Score` | Points earned |
| `PointsPossible` | Maximum available points |
| `PercentageEarned` | Comparable performance measure |
| `ScoreStatus` | Row-level classification based on an approved rule |

### Measures, Attributes, and Identifiers

> **Definition:** A reporting measure is a numeric value that can be counted, summed, averaged, or otherwise evaluated.

> **Definition:** An attribute is a descriptive value used to label, group, filter, or compare records.

> **Definition:** An identifier distinguishes one record or business object from another.

| Column | Practical role |
|---|---|
| `StudentID` | Identifier used for distinct counts |
| `StudentName` | Attribute used for labels and filters |
| `CategoryName` | Attribute used for grouping |
| `PercentageEarned` | Measure used for averages |
| `DueDate` | Attribute used for filtering and trends |

These are practical reporting terms. Chapter 14 formalizes them through facts, dimensions, measures, and star schemas.

### Validate Before You Visualize

Before connecting a reporting query to another tool, verify:

1. The query opens without errors.
2. The row count is reasonable.
3. The grain is stated in one sentence.
4. At least five known records match the source tables.
5. Calculated percentages are correct.
6. No denominator can unexpectedly equal zero.
7. Missing values follow the approved business rule.
8. Category labels are consistent.
9. Sensitive or irrelevant fields are excluded.
10. One or two totals can be independently reproduced in Access.

This process creates a **reporting contract**. Every downstream tool begins from the same tested interpretation instead of rebuilding the business rules independently.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part B: Designing Business Reporting

## 12.5 Metrics and Reporting Outputs

> **Definition:** A metric is a quantitative measure of an activity, condition, or result.

> **Definition:** A Key Performance Indicator, or KPI, is a metric selected because it represents progress toward an important objective.

A number does not become a KPI merely because it appears in a large font. The number must connect to a purpose.

Examples:

| Metric | Possible business purpose |
|---|---|
| Average score | Monitor current class performance |
| Missing-submission count | Identify incomplete work requiring review |
| Vaccination completion rate | Monitor preventive-care completion |
| Average payment delay | Monitor cash-collection performance |

This chapter uses KPI vocabulary so students can read and build reports. Chapter 13 examines the strategic questions behind KPI selection, including targets, thresholds, leading and lagging indicators, metric gaming, and the Balanced Scorecard.

### Reports, Dashboards, and KPI Cards

> **Definition:** A report is a structured output designed for detailed reading, printing, documentation, or recurring distribution.

Reports are useful when readers need:

- exact values;
- grouped detail;
- several pages;
- invoices, statements, schedules, or compliance records;
- a stable PDF or printed record.

> **Definition:** A dashboard is a consolidated visual interface used to monitor or explore related results.

Dashboards are useful when readers need:

- a quick overview;
- multiple related indicators;
- interactive filtering;
- comparisons across groups or time;
- a way to move from summary to detail.

> **Definition:** A KPI card displays one focused metric, usually with context such as a comparison, target, period, or status.

Examples:

```text
Class Average: 81.6%
Recorded Results: 284
Unique Students: 30
Missing Submissions: 12
```

A card needs context. “12 missing submissions” means little unless the reader knows the expected number, population, time period, or comparison point.

### Selecting the Output

| Reporting need | Strong starting choice |
|---|---|
| Print an invoice with line-item details | Access report |
| Archive a monthly compliance result | Static report or PDF |
| Monitor several related measures | Interactive report or dashboard |
| Display one number against a reference point | KPI card |
| Let a manager filter by category and time | Power BI report |
| Coordinate a small team with notes and statuses | Notion database view |

Before building, ask:

1. Who will use the output?
2. What question should it answer?
3. Does the user need exact detail or a pattern?
4. Does the user need to filter and explore?
5. How frequently will the source data change?
6. Must the output be printed, archived, or shared?
7. What decision will the output eventually support?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.6 Choosing and Evaluating Visualizations

> **Definition:** Data visualization represents data visually so that comparisons, trends, distributions, relationships, and exceptions are easier to interpret.

A visualization should be chosen because it answers a question, not because it looks impressive.

### Chart Selection Guide

| Business question | Recommended visual | Why it works |
|---|---|---|
| How do categories compare? | Bar or column chart | Aligned lengths support accurate comparison |
| How is a measure changing over time? | Line chart | Position and slope show direction and rate of change |
| How is a total divided among a few categories? | Stacked bar or 100% stacked bar | Shows composition on a common baseline |
| What values are common or unusual? | Histogram or box plot | Shows distribution, spread, and outliers |
| Are two measures related? | Scatter plot | Reveals association, clusters, and exceptions |
| What are the exact values? | Table or matrix | Preserves detail and supports lookup |
| What is the status of one measure? | KPI card | Directs attention to one result |
| Where are outcomes occurring? | Map, only when geography matters | Connects values to meaningful locations |

### Use Pie Charts Carefully

Pie charts require readers to compare angles and areas. A bar chart is usually easier to read when values are close.

Avoid a pie chart when:

- there are many categories;
- the values are similar;
- exact comparison matters;
- the categories do not represent parts of one meaningful whole.

### Four Principles of Effective Visualization

#### 1. Clarity

The viewer should quickly understand:

- what is being measured;
- which population and period are included;
- what the units mean;
- which result deserves attention.

Use a title such as **Average Score by Deliverable Category**, not **Chart 2**.

#### 2. Context

A number becomes meaningful through comparison.

Instead of:

```text
Attendance Rate: 86%
```

show available context:

```text
Attendance Rate: 86%
Previous month: 89%
Expected range: 88% to 92%
```

The target and action meaning are strategic matters developed in Chapter 13.

#### 3. Honest Encoding

Bar charts usually need a zero baseline because bar length represents magnitude. Starting the axis at 78 can make values of 80 and 82 appear dramatically different.

Line charts may use a restricted range when subtle movement matters, but the scale must be clearly visible and not designed to exaggerate the story.

#### 4. Accessibility

Do not rely on color alone. Use labels, icons, text, or patterns when possible. Maintain readable contrast and avoid using many unrelated colors.

### Common Visualization Problems

| Problem | Why it harms interpretation |
|---|---|
| Truncated bar axis | Exaggerates small differences |
| Inconsistent scales | Makes similar charts difficult to compare |
| Missing denominator | Hides the size of the relevant population |
| Cherry-picked time range | Creates a misleading trend |
| Too many colors | Adds cognitive work without adding meaning |
| Decorative 3-D effects | Distorts length, angle, and area |
| Too many visuals | Makes the main question difficult to find |
| Unlabeled filters | Prevents readers from knowing which records are included |

<div class="callout key-takeaway">
<p><strong>Key Takeaway:</strong> A useful visual reduces the work required to understand a question. Decoration that does not clarify meaning is not analysis.</p>
</div>

## 12.7 The Three Reporting Tiers

> **Definition:** A reporting tier is a level of reporting technology selected according to the audience, data complexity, interaction, refresh, collaboration, and governance needs.

The three tiers are not a ranking of quality. They describe different levels of capability.

### Tier 1: Built-In Reporting

Examples:

- Microsoft Access reports;
- saved queries;
- built-in invoices and statements;
- PDF and print output.

Tier 1 is a strong fit when the output is stable, detailed, printable, and close to one operational database.

### Tier 2: Lightweight Collaborative Reporting

Examples:

- Notion databases and views;
- status trackers;
- shared workspaces with notes and assignments;
- manually refreshed small-team summaries.

Tier 2 is a strong fit when collaboration and narrative context matter more than complex calculations or enterprise modeling.

### Tier 3: Full BI Authoring

Examples:

- Power BI Desktop;
- Power Query transformations;
- DAX measures;
- interactive reports and reusable filters.

Tier 3 is a strong fit when users need interactive exploration, repeated refresh, several related visuals, and reusable calculations.

### Selector Table

| Question | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| Does the audience mainly read or print? | Strong fit | Possible | Possible but may be unnecessary |
| Is narrative collaboration central? | Limited | Strong fit | Usually needs a companion document |
| Does the user need interactive filtering? | Limited | Moderate | Strong fit |
| Are calculations and comparisons complex? | Limited | Limited | Strong fit |
| Is the source one small database? | Strong fit | Possible | Strong fit when exploration is needed |
| Is repeatable refresh important? | Manual or periodic | Usually manual | Strong fit |

Use the smallest tier that fully supports the task. A reliable Access report is better than an elaborate Power BI report that users do not understand or trust.

NotebookLM does not form a fourth tier. It is a **reporting sidecar** that helps explain or discuss approved sources after those sources have been prepared.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part C: Applying the Reporting Toolbox

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.8 Tier 1: Microsoft Access Reports

> **Definition:** An Access report is a formatted database object used to organize, group, calculate, print, and export data from a table or query.

Access reports are especially useful because they work close to the operational database. A report can use a saved query as its record source, which keeps the join and calculation logic separate from the page layout.

### Start with a Saved Query

Suppose PetVax needs a printable invoice. A query named `qry_PetVaxInvoiceDetail` might return:

- invoice number;
- owner name;
- pet name;
- appointment date;
- service description;
- quantity;
- price;
- line total.

The report can group by invoice and calculate the invoice total without rebuilding the joins.

### Basic Access Report Workflow

1. Open and validate the saved query.
2. Select the query in the Navigation Pane.
3. Choose **Create → Report Wizard**.
4. Select only the fields needed in the output.
5. Choose a grouping level, such as invoice number, student, or clinic.
6. Choose sorting, such as due date or service description.
7. Add totals when appropriate.
8. Finish the wizard and open the report in Layout View.
9. Improve the title, spacing, labels, number formats, page header, and footer.
10. Use Print Preview to check page breaks and repeated headings.
11. Print or export the report to PDF.

### When Access Is the Better Choice

Use an Access report when:

- the data already lives in Access;
- the output needs exact row-level detail;
- the format is stable;
- printing or PDF distribution matters;
- interaction is not required;
- the audience is small and known.

Examples include:

- an invoice;
- a student grade statement;
- an overdue-vaccination list;
- an attendance summary;
- an exception report for missing records.

An Access report is not an inferior dashboard. It is a different reporting product designed for detail, stability, and distribution.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.9 Tier 3: Power BI Desktop and Microsoft Access

> **Definition:** Power BI Desktop is Microsoft’s free Windows application for connecting to data, preparing calculations, and creating interactive visual reports.

Power BI Desktop is the required Power BI environment for this course. Students can complete the reporting workflow locally without purchasing Power BI Pro or publishing content online.

Power BI Desktop creates **reports**. In Microsoft’s product terminology, a Power BI dashboard is a separate one-page artifact created in the online Power BI Service by pinning report visuals. This chapter uses Power BI Desktop to create an interactive report stored in a `.pbix` file.

### What Power BI Desktop Provides

Power BI Desktop brings several reporting tasks into one application:

```text
Connect
→ Transform
→ Calculate
→ Visualize
→ Validate
→ Refresh
```

It can:

- connect to files and databases;
- prepare data through Power Query;
- create calculated columns and DAX measures;
- build charts, tables, cards, and slicers;
- save the complete project locally;
- refresh imported data from the source.

### Installing Power BI Desktop

Microsoft provides two common installation methods:

1. Install Power BI Desktop through the Microsoft Store.
2. Download the installer from Microsoft’s official Power BI Desktop page.

Official page:

[Download Power BI Desktop](https://www.microsoft.com/en-us/power-platform/products/power-bi/desktop)

The Microsoft Store version can update automatically. The standalone installer may be preferable in some managed environments. Power BI Desktop is updated frequently, so classroom instructions should focus on stable tasks rather than the exact location of every icon.

#### Installation Steps

1. Open Microsoft’s official Power BI Desktop page.
2. Select **Download free** or the current download option.
3. Install the application through the Microsoft Store or downloaded installer.
4. Launch **Power BI Desktop** from the Windows Start menu.
5. Close optional sign-in prompts if the assignment does not require online publishing.
6. Choose a blank report.
7. Save the file immediately with a clear name, such as:

```text
LastName_FirstName_GradingReport.pbix
```

Power BI Desktop is a Windows application. Students using macOS should use an institution-provided Windows computer, a supported virtual Windows environment, or another approved Windows option. Because this course also uses Microsoft Access, students should arrange reliable Windows access before beginning the activity.

### Understanding the Main Interface

Power BI Desktop includes several important areas:

| Interface area | Purpose |
|---|---|
| **Ribbon** | Provides commands for connecting, transforming, modeling, and creating visuals |
| **Report canvas** | Main area where visuals are placed and arranged |
| **Data pane** | Lists imported tables, columns, and measures |
| **Visualizations pane** | Selects and formats charts, tables, cards, and slicers |
| **Filters pane** | Applies visual-, page-, and report-level filters |
| **Report view** | Builds and arranges interactive report pages |
| **Table view** | Inspects loaded data and calculations |
| **Model view** | Inspects tables and relationships when the model contains multiple tables |

For the first course report, one tested Access query is enough. Chapter 14 explains larger multi-table analytical models.

### Prepare the Access Source

Before opening Power BI Desktop:

1. Open the Access database.
2. Run `qry_GradeBI`.
3. Confirm its grain.
4. Record the row count.
5. Check several student and deliverable records.
6. Confirm percentages and status labels.
7. Save all Access objects.
8. Close the query and, when practical, close the Access file.
9. Record the source file path.

A reporting file should not depend on an untested query. Power BI makes data attractive quickly, which can hide errors if the source is not validated first.

### Connect Power BI Desktop to Access

Use this workflow:

```text
Home
→ Get data
→ Access database
→ select the .accdb file
→ choose qry_GradeBI in Navigator
→ Transform Data
```

Detailed steps:

1. Open Power BI Desktop.
2. Choose **Home → Get data**.
3. Select **Access database**.
4. Browse to the `.accdb` file.
5. Select **Open**.
6. In Navigator, select `qry_GradeBI`.
7. Preview the fields and sample records.
8. Choose **Transform Data** to open Power Query Editor.

Microsoft’s Access connector supports **Import**. It does not provide a continuous live connection between the Access file and the Power BI report.

### Import and Refresh

When Power BI Desktop imports `qry_GradeBI`, it stores a copy of the query result inside the `.pbix` model.

After the Access data changes:

1. Save the Access database.
2. Open the `.pbix` file.
3. Select **Home → Refresh**.
4. Wait for the import to complete.
5. Compare at least two updated values with Access.
6. Save the refreshed `.pbix` file.

A useful course workflow is:

```text
Update Access
→ save the .accdb file
→ open the .pbix file
→ Refresh
→ validate
→ save or export
```

The refresh date should appear in the report or in its accompanying documentation.

### Troubleshooting the Access Connection

A common error is:

```text
The 'Microsoft.ACE.OLEDB.12.0' provider is not registered.
```

This often indicates that Power BI Desktop and the Microsoft Access Database Engine provider use different architectures. For example, one may be 64-bit while the other is 32-bit.

Troubleshooting steps:

1. Check whether Power BI Desktop is 32-bit or 64-bit.
2. Check the installed Microsoft Office or Access Database Engine architecture.
3. Use matching architectures.
4. Restart Power BI Desktop after a driver change.
5. Confirm that another application is not locking the Access file.
6. Test a simpler saved query if a complex Access-specific expression fails to import.
7. Use the institution’s supported configuration rather than installing unapproved drivers on a managed computer.

### Power BI Service Is Optional

The online Power BI Service supports publishing, sharing, collaboration, and service-specific dashboards. Those functions depend on accounts, institutional settings, permissions, and licensing.

They are not required in this chapter.

The required submission can consist of:

- the Access `.accdb` file;
- the Power BI Desktop `.pbix` file;
- a PDF export or screenshots;
- a short interpretation and validation note.

Never use public publishing for confidential student, customer, employee, health, or organizational data.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.10 Power Query, DAX, and Interactive Reporting

> **Definition:** Power Query is the data-preparation layer used to connect, clean, reshape, and load data into Power BI.

Power Query records each transformation as an **Applied Step**. When the source is refreshed, Power BI repeats those steps.

### Common Power Query Tasks

#### Confirm Data Types

Verify that:

- IDs use whole-number or text types as appropriate;
- dates use a date type;
- scores and percentages use numeric types;
- categories use text;
- yes/no values use Boolean types.

Incorrect data types can break sorting, date behavior, calculations, and visuals.

#### Rename Columns

Replace technical names when a clearer report label is needed.

```text
AvgScore → Average Score
CategoryName → Deliverable Category
```

Do not rename fields so aggressively that their relationship to the source becomes impossible to trace.

#### Filter Rows

Remove records only when a documented rule justifies the exclusion, such as:

- test records;
- cancelled appointments;
- inactive course sections;
- clearly invalid dates.

Do not hide inconvenient data merely because it weakens the desired story.

#### Standardize Values

Power Query can standardize labels before grouping:

```text
HW, Home Work, homework → Homework
```

When the rule should be shared across several systems, it usually belongs in the database query or governed source layer rather than in one report.

#### Remove Unnecessary Columns

Remove fields that add clutter, increase privacy risk, or are not needed for the report. Keep identifiers required for validation and distinct counts.

#### Preserve Missing-Value Meaning

Do not automatically replace every null with zero. First determine what the null means. A score that has not yet been graded is not necessarily a zero.

After reviewing the steps, select **Close & Apply**.

### Calculated Columns and Measures

> **Definition:** DAX, or Data Analysis Expressions, is the formula language used to create calculated columns and measures in Power BI.

> **Definition:** A calculated column creates one stored value for every row when the data is loaded or refreshed.

> **Definition:** A DAX measure is a dynamic calculation evaluated under the report’s current filters.

| Feature | Calculated column | Measure |
|---|---|---|
| Calculation level | One value per row | Aggregated result in the current context |
| Calculated when | Data loads or refreshes | A visual requests the result |
| Typical use | Labels, categories, row-level logic | Counts, averages, totals, and rates |
| Response to slicers | Existing row values are filtered | Result recalculates dynamically |

> **Definition:** Filter context is the set of filters affecting a measure when Power BI evaluates it.

A card containing `Average Score` shows the overall result when no category is selected. If the user selects `Exam`, the same measure recalculates for Exam records.

### Four Core Measures

Assume the imported query is named `qry_GradeBI` and `PercentageEarned` is stored on a 0 to 100 scale.

```dax
Average Score =
AVERAGE(qry_GradeBI[PercentageEarned])
```

```dax
Recorded Results =
COUNTROWS(qry_GradeBI)
```

```dax
Unique Students =
DISTINCTCOUNT(qry_GradeBI[StudentID])
```

```dax
At-Risk Students =
COUNTROWS(
    FILTER(
        VALUES(qry_GradeBI[StudentID]),
        [Average Score] < 70
    )
)
```

The difference between `Recorded Results` and `Unique Students` returns to grain. One student may appear in many result rows.

For a rate, use `DIVIDE` to handle a zero denominator safely:

```dax
At-Risk Rate =
DIVIDE(
    [At-Risk Students],
    [Unique Students],
    0
)
```

### Build the Core Report Visuals

A focused one-page Grading Database report might contain:

| Visual | Field or measure | Question answered |
|---|---|---|
| Card | `Average Score` | What is the current overall performance? |
| Card | `At-Risk Students` | How many students require review? |
| Bar chart | `CategoryName` and `Average Score` | Which categories perform differently? |
| Line chart | `DueDate` and `Average Score` | How is performance changing over time? |
| Table | Student name, average, status | Which records explain the summary? |
| Slicer | `CategoryName` | How do results change by category? |

Every visual should serve the same business question. More visuals do not automatically create more insight.

### Filters and Slicers

> **Definition:** A slicer is an on-page control that lets the user filter report data interactively.

Useful slicer fields include:

- deliverable category;
- student;
- course section;
- semester;
- clinic;
- service type;
- date range.

Power BI also supports three filter levels:

| Filter level | Scope |
|---|---|
| **Visual-level filter** | Affects one visual |
| **Page-level filter** | Affects all applicable visuals on one report page |
| **Report-level filter** | Affects all applicable pages in the report |

Make important filters visible. A reader should not have to guess why a total differs from the expected value.

### Cross-Filtering and Cross-Highlighting

Selecting one bar, point, or table row can filter or highlight related visuals. This creates interactive exploration.

Test interactions deliberately:

- Does selecting `Exam` update every measure that should change?
- Does a selected student make another visual meaningless?
- Can the user clear the selection easily?
- Does the report make the current filter context visible?

### Drill-Down

A hierarchy lets a user move from a summary to more detail.

Examples:

```text
Year → Quarter → Month → Day
```

```text
Category → Deliverable → Student Result
```

Use drill-down only when the levels form a meaningful path.

In Chapter 14, these report interactions are placed within the formal OLAP vocabulary of slice, dice, drill-down, roll-up, and pivot. Here, the emphasis is on using the controls correctly in Power BI Desktop.

### Validate the Finished Report

Before saving the final report:

- compare the overall average with Access;
- compare one category average with Access;
- verify the unique-student count;
- test the slicer;
- test visual interactions;
- clear all filters and confirm the overall totals;
- show or document the refresh date;
- confirm that no sensitive fields appear unnecessarily.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.11 Tier 2: Notion as a Lightweight Reporting Workspace

> **Definition:** A Notion database is a structured collection of pages that can be displayed through filtered, sorted, grouped, and formatted views.

Notion is not a replacement for a relational DBMS. It is a collaborative workspace that combines structured properties with notes, tasks, documents, and status information.

A small PetVax team might use a Notion database to track:

- pet name;
- owner;
- next vaccination date;
- vaccination status;
- assigned staff member;
- follow-up notes;
- completion status.

The team could create views for:

- vaccinations due this week;
- overdue follow-ups;
- appointments by staff member;
- completed appointments;
- high-priority owner contacts.

### Views, Relations, and Rollups

Different views can display the same records as a table, board, calendar, list, or other layout. Filters, sorts, and groups let each team member focus on relevant records without changing the underlying collection.

> **Definition:** A relation connects records in one Notion database to records in another.

> **Definition:** A rollup summarizes a property from related records.

For example:

```text
OWNER database
↕ relation
PET database
↕ relation
APPOINTMENT database
```

A rollup could count upcoming appointments for each pet or show the most recent service date.

### When Notion Is a Good Fit

Notion is useful when:

- the team is small;
- the process changes frequently;
- narrative notes and task ownership matter;
- the dataset is modest;
- complex measures and data integrity rules are not central;
- fast setup matters more than analytical depth.

### Limits of Notion

Compared with Access or Power BI, a lightweight workspace may provide weaker support for:

- referential integrity;
- complex joins;
- large datasets;
- governed metric definitions;
- advanced calculations;
- repeatable automated refresh;
- enterprise-grade analytical models.

The correct choice depends on the work. A small clinic coordinating follow-ups may benefit from Notion. A hospital network comparing standardized metrics across many locations will likely need a governed BI platform.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 12.12 NotebookLM as a Knowledge-Reporting Sidecar

> **Definition:** NotebookLM is a source-grounded AI workspace used to summarize, compare, question, and organize materials supplied to a notebook.

NotebookLM belongs beside the reporting tools, not inside the three tiers. It does not replace the database, reporting query, metric, or visualization. It helps people discuss and explain approved sources.

### AI at This Layer: Communication

In Chapter 12, AI supports communication. It may help:

- summarize a dashboard;
- draft a management briefing;
- compare metric definitions;
- identify questions for further investigation;
- organize evidence from several supplied documents;
- translate technical reporting notes into clearer language.

Possible sources include:

- an exported query result;
- a dashboard screenshot;
- a PDF report;
- a data dictionary;
- KPI definitions;
- assignment instructions;
- a business scenario;
- a refresh and source note.

NotebookLM can cite material from the sources supplied to the notebook, which helps the user inspect the supporting passage. A citation is useful, but it does not remove the need to verify the interpretation.

### Required Verification Process

1. Identify every factual and numerical claim in the AI response.
2. Locate the supporting value in the query, report, or approved document.
3. Check whether the AI omitted a filter, denominator, date range, or limitation.
4. Remove causal claims that the evidence does not support.
5. Correct vague or exaggerated language.
6. Add alternative explanations when appropriate.
7. Rewrite the final interpretation in your own words.

### A Useful Critique Structure

| Critique question | Example |
|---|---|
| What did the AI interpret correctly? | It correctly identified Exams as the lowest-scoring category. |
| What did it miss? | It did not mention that only two exams were included. |
| What did it overstate? | It said low attendance caused low scores, but the report shows association only. |
| What requires human judgment? | The appropriate intervention depends on course policy and student circumstances. |

<div class="callout warning">
<p><strong>AI Use Rule:</strong> AI output is a draft for inspection, not evidence by itself. The database, reporting query, documented metric, and verified report remain the sources of truth.</p>
</div>

Chapter 13 extends this idea. There, AI may help generate alternatives or draft a decision memo, but a human remains responsible for the recommendation and its consequences. Chapter 14 explains how databases, tokens, models, embeddings, permissions, and retrieval support modern AI systems.

# Chapter Synthesis

The reporting workflow developed in this chapter can be summarized as follows:

```text
Reliable source tables
→ tested reporting query
→ documented grain and refresh
→ appropriate reporting tier
→ clear visualization
→ verified interpretation
→ Chapter 13 decision
```

The tools differ, but the discipline remains consistent:

1. Start with a clear analytical question.
2. Use a tested source.
3. define what one row represents.
4. Calculate metrics at the correct level.
5. Choose the smallest tool that supports the need.
6. Make filters, units, and refresh information visible.
7. Validate the report against the source.
8. Treat AI-generated explanations as drafts requiring verification.

# Chapter Summary

- Business Intelligence transforms trustworthy database output into information, insight, and decision support.
- BI connects the DIKW and R.E.A.D. frameworks by moving data toward explanation, analysis, and action.
- Operational questions concern specific records and transactions. Analytical questions examine patterns, comparisons, exceptions, and trends.
- ETL extracts data, applies transformation rules, and loads reporting-ready output. ELT changes the order but still requires explicit transformation logic.
- Grain defines what one reporting row represents. It must be established before counting, averaging, or calculating rates.
- A tested reporting query creates a reusable contract between normalized source tables and reporting tools.
- Measures are evaluated numerically, attributes label and group records, and identifiers distinguish business objects.
- Metrics, KPIs, reports, dashboards, and KPI cards serve different communication purposes.
- Effective visualizations match the question, use honest scales, show context, and avoid unnecessary decoration.
- The Three Reporting Tiers help organizations choose among built-in reports, lightweight collaborative workspaces, and full BI authoring.
- Access reports are strong for stable, detailed, printable output.
- Power BI Desktop is a free Windows application used to import Access data, prepare it with Power Query, create DAX measures, and build interactive reports.
- Access data is imported into Power BI Desktop and must be refreshed after the source changes.
- Notion is useful for lightweight collaborative reporting that combines structured views with narrative context.
- NotebookLM can assist with source-grounded explanation, but every factual and numerical claim must be verified.
- A report communicates evidence. Chapter 13 examines how people turn that evidence into responsible decisions.

# References and Official Resources

- Microsoft. “Get started with Power BI Desktop.” *Microsoft Learn*. https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started
- Microsoft. “Get Power BI Desktop.” *Microsoft Learn*. https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-get-the-desktop
- Microsoft. “Access database connector.” *Microsoft Learn*. https://learn.microsoft.com/en-us/power-query/connectors/access-database
- Microsoft. “Power BI reports overview.” *Microsoft Learn*. https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-overview
- Microsoft. “Create a Power BI dashboard from a report.” *Microsoft Learn*. https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-create
- Notion. “Databases.” *Notion Help Center*. https://www.notion.com/help/category/databases
- Notion. “Views, filters, sorts, and groups.” *Notion Help Center*. https://www.notion.com/help/views-filters-and-sorts
- Google. “Use chat in NotebookLM.” *NotebookLM Help*. https://support.google.com/notebooklm/answer/16179559
- Kimball, R., & Ross, M. (2013). *The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling* (3rd ed.). Wiley.
- Laudon, K. C., & Laudon, J. P. (2024). *Management Information Systems: Managing the Digital Firm* (18th ed.). Pearson.
- Turban, E., Sharda, R., Delen, D., & King, D. (2018). *Business Intelligence, Analytics, and Data Science: A Managerial Perspective* (4th ed.). Pearson.
