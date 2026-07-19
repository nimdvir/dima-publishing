<!-- metadata: date="2026-07-19" -->

# Readiness Assessment Test (RAT): Business Intelligence, Data Visualization, and Reporting

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/RAT_nqr5a3?_a=BAMAAAX00" alt="RAT or Quiz section icon" width="220">
</p>

<p align="center">

## Assessment Design Notes

This RAT assesses readiness for the Business Intelligence chapter. The questions focus on durable concepts — the BI workflow, analytical thinking, data preparation, visualization judgment, tool selection, and responsible AI use — rather than specific tool versions, query names, or interface details that may change. Students should come to class able to reason about transforming data into evidence, choosing appropriate visuals, validating reports, and understanding where AI fits in the reporting process.

### Bloom Distribution

| Bloom Level | Required Count | Intent |
| ----------- | -------------- | ------ |
| Remember    | 8              | Core terminology: BI, ETL, grain, measures, chart types, reporting tiers |
| Understand  | 8              | Why concepts matter: operational-vs-analytical thinking, validation, tier selection logic |
| Apply       | 8              | Use concepts in realistic reporting and tool-selection scenarios |
| Analyze     | 8              | Diagnose visualization problems, compare reporting approaches, evaluate data preparation choices |
| Evaluate    | 8              | Judge chart quality, select appropriate tools, assess AI-assisted reporting practices |

### Design Criterion Coverage

| Design Criterion  | Bloom Sections Used | Count |
| ----------------- | ------------------- | ----- |
| Application-based | Apply, Analyze, Evaluate | 20 |
| Scenario-based    | Understand, Apply, Analyze | 16 |
| Definition-only   | Remember, Understand | 10 |

### AI-Resistance Strategies Used

1. **Conceptual reasoning over tool-specific trivia** — Questions test understanding of principles (why grain matters, what makes a chart honest) rather than memorized menu paths.
2. **Scenario stems with embedded decision points** — Plausible but incorrect choices require conceptual understanding to reject.
3. **Multi-answer discrimination** — Select ALL questions demand precise distinction between correct principles and plausible misconceptions.
4. **Distractors from adjacent concepts** — Wrong answers draw from genuinely related ideas (ETL vs. ELT, measure vs. attribute) that students must distinguish.
5. **Paraphrased correct answers** — Correct answers rephrase principles rather than matching keyword patterns from the text.
6. **Stage-progression reasoning** — Questions trace the BI pipeline from raw data through transformation, validation, visualization, and interpretation.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Remember Questions

**1. What does the acronym ETL stand for in the context of preparing data for reporting?**

A. Evaluate, Transform, Load

B. Extract, Translate, Link

C. Extract, Transform, Load

D. Export, Test, Launch

**2. Select ALL that apply: Which of the following are core functions that Business Intelligence serves in an organization?**

A. Monitoring current conditions

B. Replacing human judgment with automated decisions

C. Comparing performance across groups or time periods

D. Diagnosing possible explanations for observed patterns

E. Supporting action by identifying where attention may be needed

**3. In a reporting dataset, what does the term "grain" refer to?**

A. The size of the data file in megabytes

B. The level of detail that one row represents

C. The speed at which the report refreshes

D. The color scheme used in the dashboard

**4. Select ALL that apply: Which chart types are generally recommended for the following business questions?**

A. A bar or column chart for comparing values across categories

B. A line chart for showing how a measure changes over time

C. A scatter plot for exploring the relationship between two measures

D. A pie chart with many small segments for precise value comparison

E. A KPI card for drawing attention to a single focused metric

**5. What is the role of a data-preparation layer in a reporting workflow?**

A. It creates database tables and enforces referential integrity

B. It connects to data sources, cleans and reshapes data, and loads it for analysis

C. It generates AI-powered written summaries of dashboard findings

D. It manages user permissions and access control for published reports

**6. Select ALL that apply: Which steps belong in a standard ETL process?**

A. Extract — retrieving data from source systems

B. Transform — cleaning, standardizing, validating, and calculating

C. Load — placing prepared data into a reporting structure

D. Delete — removing source records after extraction completes

E. Annotate — adding interpretive comments to raw data rows

**7. What is the primary purpose of a KPI (Key Performance Indicator)?**

A. To store raw transaction records for auditing

B. To serve as a measurable signal that represents progress toward an important objective

C. To replace the need for database queries

D. To automatically correct data entry errors

**8. Select ALL that apply: Which of the following are distinct types of reporting outputs?**

A. A report — structured output designed for detailed reading, printing, or documentation

B. A dashboard — a consolidated visual interface for monitoring related results

C. A KPI card — a focused display of one metric with supporting context

D. A database table — the raw storage structure for operational records

E. A data entry form — an interface for capturing new records

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Understand Questions

**9. An analyst runs a query joining student records to grade records. The query returns 400 rows, but there are only 50 students. Why might the row count be larger than the student count?**

A. The database is corrupted and duplicating records

B. The query operates at a finer grain — one row per student per graded assignment, so each student appears in multiple rows

C. The reporting tool miscounts rows by default

D. Students are double-counted because of a software bug

**10. Select ALL that apply: Why should a reporting query be validated before it is connected to a visualization tool?**

A. To confirm the row count is reasonable for the expected data

B. To verify that calculated fields produce correct results

C. To check that no denominator accidentally evaluates to zero

D. To establish a single tested interpretation that all downstream visuals can share

E. To identify and remove any data that makes the desired narrative look weaker

**11. A small team needs to track project tasks, share narrative notes, and update statuses collaboratively. The data is modest and changes weekly. Which reporting approach is the most practical fit?**

A. A full enterprise BI platform with scheduled data refreshes and role-based security

B. A lightweight collaborative workspace with filtered views, sorting, and grouping

C. A static printed report generated monthly

D. A custom-coded web application with a relational database backend

**12. Select ALL that apply: Which statements accurately describe how a reporting tool typically connects to a database for analysis?**

A. The tool imports a snapshot of query results rather than maintaining a live connection to the source

B. After source data changes, the user must explicitly refresh to update the imported data

C. The tool can use a pre-built reporting query that handles joins, calculations, and labels

D. The connection may require matching software architecture between the tool and the database driver

E. Once connected, the tool permanently locks the source database so no other users can access it

**13. Why is it important to ask "What question should this report answer?" before building any visual?**

A. It ensures the report uses the most expensive software available

B. It connects the output to a specific decision need, preventing aimless activity

C. It guarantees the report will receive an award for design excellence

D. It eliminates the need to validate the underlying data

**14. Select ALL that apply: Which of the following are examples of sensible data transformations during report preparation?**

A. Removing duplicate records that represent the same real-world event

B. Standardizing inconsistent labels into a single agreed format

C. Converting text values into proper date or number types

D. Validating that values fall within expected ranges

E. Replacing every missing value with zero without investigating what the absence means

**15. How does an operational question differ from an analytical question?**

A. Operational questions use older software; analytical questions use modern tools

B. An operational question concerns one specific transaction or record; an analytical question examines patterns, groups, and changes across many records

C. Operational questions are always more urgent than analytical questions

D. Operational questions require a database administrator; analytical questions require a statistician

**16. Select ALL that apply: Which of the following are common problems that make a visualization misleading or hard to interpret?**

A. A bar chart whose vertical axis does not start at zero, exaggerating small differences

B. A number shown without its denominator, hiding the size of the relevant population

C. A trend line drawn from a deliberately narrow time window that misrepresents the longer pattern

D. Decorative three-dimensional effects that distort the perceived size of data elements

E. Adding clear axis labels and a descriptive title to the chart

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Apply Questions

**17. An instructor builds a report showing the total count of grade records as a measure of "number of students." The number is far larger than the actual enrollment. What is the most likely conceptual mistake?**

A. The reporting software has a counting bug

B. The instructor confused record count with distinct count — many students have multiple grade records

C. The database contains duplicate student accounts

D. The query accidentally joined to an unrelated table

**18. Select ALL that apply: A dataset contains one row per student per assignment. Which calculations would correctly produce the number of students and the number scoring below a defined threshold?**

A. Counting every row in the dataset to determine the number of students

B. Counting only the distinct student identifiers to determine the number of students

C. Averaging all score values to identify which students are below threshold

D. Filtering to students whose average score falls below the threshold, then counting the distinct results

E. Dividing the total row count by the number of assignments to estimate the student count

**19. A manager wants to see how a key metric has trended month by month over the past two years. Which visual approach best serves this need?**

A. A pie chart showing each month's share of the total

B. A line chart with time on the horizontal axis and the metric on the vertical axis

C. A table listing every individual data point in chronological order

D. A set of KPI cards, one for each month

**20. Select ALL that apply: When preparing data imported from a source system for reporting, which actions are appropriate during the transformation stage?**

A. Confirming that identifier columns use the correct data type for accurate counting

B. Renaming technical column headings to clearer labels for report readers

C. Removing test or training records when a documented rule supports the exclusion

D. Blindly converting every blank or null value to zero

E. Standardizing inconsistent category labels before grouping or filtering

**21. A report was built from data imported last month. The source database has been updated with new records since then. What must happen for the report to reflect the latest data?**

A. The entire report file must be deleted and rebuilt from scratch

B. A refresh operation must be run to re-import data from the source

C. The source database automatically pushes updates to all connected reports

D. The original import query must be rewritten with new join conditions

**22. Select ALL that apply: Before sharing a report built on imported data, which validation steps build confidence in its accuracy?**

A. Spot-checking several known records against the original source

B. Verifying that calculated percentages and totals match independent estimates

C. Confirming that category labels are consistent and complete

D. Checking that sensitive or irrelevant fields have not been accidentally exposed

E. Ensuring the visual design matches the latest graphic design trends

**23. A small nonprofit organization needs to track grant application deadlines, assigned responsibilities, and completion notes across a team of five. The priorities are fast setup, easy collaboration, and narrative context. Which approach fits best?**

A. A formal business intelligence platform with scheduled data pipelines

B. A lightweight collaborative workspace with simple database-like views

C. A static PDF report distributed by email each week

D. A relational database with a custom-built web frontend

**24. Select ALL that apply: Which pieces of information should accompany any report to help readers understand its scope and limitations?**

A. Which source system or database the data came from

B. What level of detail each row in the dataset represents

C. When the data was last refreshed

D. What important exclusions or known limitations affect the numbers

E. The brand and version number of the software used to create every visual

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Analyze Questions

**25. A bar chart compares average scores across five departments. The vertical axis starts at 78 instead of zero, making an 80 and an 82 appear to be dramatically different. What principle does this violate?**

A. The chart uses too many colors

B. The visual encoding is dishonest — bar length should represent magnitude from a zero baseline

C. The chart type is wrong for comparing categories

D. The chart should have been a pie chart instead

**26. Select ALL that apply: Organizations have different reporting needs that call for different approaches. Which pairings of need to approach are well-matched?**

A. A printable invoice with precise line-item detail → a structured report generator close to the operational database

B. An interactive dashboard where managers filter by department, time, and product → a dedicated BI authoring tool

C. A small team coordinating tasks with narrative notes and simple status tracking → a lightweight collaborative workspace

D. A large hospital network requiring governed metrics, automated refresh, and role-based access across many locations → a lightweight collaborative workspace

E. A manager who needs to drill from a summary into category-level detail → an interactive report with slicers and cross-filtering

**27. A saved reporting query that joins, calculates, and labels data before any visualization tool imports it acts most like which stage of data preparation?**

A. It acts like an ELT step — loading raw data first, then transforming it later

B. It acts like a small ETL layer — extracting, transforming, and structuring data before downstream use

C. It is purely a storage object with no role in the reporting pipeline

D. It replaces the need for any further data preparation in the reporting tool

**28. Select ALL that apply: After building an interactive report with multiple visuals and filters, which checks help confirm the report is trustworthy?**

A. Comparing overall summary numbers against the original source system

B. Comparing one filtered category's results against the source

C. Verifying that distinct counts match the expected population size

D. Testing that slicers and cross-filtering behave correctly

E. Clearing all filters and confirming the unfiltered totals return to expected values

**29. A request arrives: "Build a dashboard showing our sales data." What is the most important follow-up question before starting work?**

A. "Which charting library should we use?"

B. "What specific comparison, trend, or decision does this dashboard need to support?"

C. "Should the background be dark or light?"

D. "How many rows of data do we have?"

**30. Select ALL that apply: A pie chart would be a poor choice when:**

A. There are many categories to display

B. The values being compared are very close to each other

C. The audience needs to make precise numerical comparisons

D. The categories do not represent parts of a single meaningful whole

E. The data involves financial figures

**31. A reporting query uses an inner join to connect a table of all students to a table of assignment grades. If some students have no grades recorded at all, what will the query result show for those students?**

A. Rows with zero values for every grade-related field

B. Rows with NULL in every grade-related field

C. Those students will not appear in the results — inner joins only return rows where matches exist in both tables

D. An error message stating that the join cannot be completed

**32. Select ALL that apply: Which statements correctly describe the difference between a calculated column and a dynamic measure in a reporting tool?**

A. A calculated column stores one value per row when data is loaded or refreshed

B. A dynamic measure recalculates its result based on the current filters applied to the report

C. When a user selects a filter, a calculated column's existing values are simply included or excluded

D. A calculated column is best suited for row-level labels and categorizations

E. A dynamic measure is well suited for aggregate calculations like averages and distinct counts

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Evaluate Questions

**33. A department needs a recurring monthly summary showing exact figures by category for five senior leaders who will print and archive the document. The data lives in a single well-maintained operational database. Which reporting approach is most justified?**

A. An interactive dashboard with animated visuals — because it looks more impressive

B. A structured, printable report generated close to the source database — because the audience reads and archives, and the format is stable

C. A collaborative workspace with notes and status tags — because it supports narrative

D. Both an interactive dashboard AND a printable report — redundancy always adds value

**34. Select ALL that apply: An AI tool can summarize a dashboard and draft a management briefing using approved source documents. Which statements about this practice are correct?**

A. The AI-generated summary is itself a primary source of evidence

B. The AI can help reduce reading time and organize information from verified sources

C. Every factual and numerical claim the AI produces should be checked against the original data

D. The database and reporting query remain the authoritative sources of truth

E. The AI replaces the need for human review of the underlying data

**35. A quarterly business review presentation uses a three-dimensional pie chart with fifteen segments, a bar chart with a truncated vertical axis, and unlabeled axes throughout. Which of the following is the most fundamental problem?**

A. The presentation uses too many different chart types

B. The visuals fail the clarity test — a viewer cannot quickly and accurately understand what is being measured and whether differences are meaningful

C. The charts were not created with the most expensive software available

D. Color choices are inconsistent across slides

**36. Select ALL that apply: Before building any reporting output, which questions help ensure the result will be useful?**

A. Who will use this output and how?

B. What specific question should it answer?

C. Does the user need precise detail or broad patterns?

D. How often does the source data change?

E. What eventual decision might this report inform?

**37. A large healthcare network must compare standardized quality metrics across thirty facilities, with governed metric definitions, automated weekly data refreshes, and role-based access controls. Which reporting approach is appropriate?**

A. Individual spreadsheet files emailed to a distribution list each week

B. A shared collaborative workspace where each facility manually enters its numbers

C. A governed business intelligence platform with shared data models and scheduled refresh

D. A set of printed reports generated once per quarter

**38. Select ALL that apply: When using AI to assist with reporting, which practices reflect responsible use?**

A. Supplying the AI with approved, validated source documents rather than unverified data

B. Cross-checking every factual and numerical claim the AI produces against original sources

C. Using the AI to draft an initial summary that a human then reviews and edits

D. Accepting AI-generated explanations as authoritative without verification

E. Treating the database and validated reporting query — not the AI output — as the source of truth

**39. A report displays a single large number: "Customer Retention: 84%." No other information is shown. What is the most important improvement?**

A. Make the number larger and use a more decorative font

B. Add context — such as the previous period's rate, a target range, or an industry benchmark — so the number becomes interpretable

C. Convert the number into a pie chart

D. Add a second number showing total customer count

**40. Select ALL that apply: A complete reporting pipeline moves through several stages. Which sequence correctly describes this flow?**

A. Raw operational data is prepared into reporting-ready data

B. Reporting-ready data feeds into metrics and queries

C. Queries and metrics supply the numbers behind reports and visualizations

D. Reports and visualizations support human interpretation

E. Interpretation leads directly to automated decisions with no human judgment involved

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Answer Key

### Remember Questions

**1. What does the acronym ETL stand for in the context of preparing data for reporting?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | "Evaluate" is not part of the acronym; the first stage is Extract. |
| B | No | "Translate" and "Link" are not the correct terms. |
| C | Yes | ETL stands for Extract, Transform, and Load — the standard data preparation pipeline. |
| D | No | "Export, Test, Launch" is not the definition. |

**2. Select ALL that apply: Which of the following are core functions that Business Intelligence serves in an organization?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Monitoring current conditions is a core BI function — tracking what is happening now. |
| B | No | BI provides evidence for human judgment; it supports decisions rather than replacing decision-makers. |
| C | Yes | Comparing performance across groups or time periods is a core BI function. |
| D | Yes | Diagnosing possible explanations for observed patterns is a core BI function. |
| E | Yes | Supporting action by identifying where attention may be needed is a core BI function — note the word "supporting," not "automating." |

**3. In a reporting dataset, what does the term "grain" refer to?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | File size is unrelated to the concept of grain. |
| B | Yes | Grain states exactly what one row in a reporting source represents — the level of detail. |
| C | No | Refresh speed is a separate concern from grain. |
| D | No | Color scheme is a design choice, not a data concept. |

**4. Select ALL that apply: Which chart types are generally recommended for the following business questions?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | A bar or column chart is recommended for comparing values across categories because aligned lengths support accurate comparison. |
| B | Yes | A line chart is recommended for showing change over time because position and slope reveal direction and rate. |
| C | Yes | A scatter plot is recommended for exploring relationships between two measures. |
| D | No | A pie chart with many segments is difficult to read; pie charts are discouraged when there are many categories or precise comparison is needed. |
| E | Yes | A KPI card directs attention to a single focused metric, often with supporting context. |

**5. What is the role of a data-preparation layer in a reporting workflow?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Creating database tables and enforcing integrity belongs to the DBMS, not the data-preparation layer. |
| B | Yes | The data-preparation layer connects to sources, cleans, reshapes, and loads data for analysis. |
| C | No | AI-powered summaries are a separate reporting-assistance function. |
| D | No | User permissions are a platform administration concern, not a data-preparation function. |

**6. Select ALL that apply: Which steps belong in a standard ETL process?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Extract — retrieving data from source systems — is the first stage of ETL. |
| B | Yes | Transform — cleaning, standardizing, validating, and calculating — is the second stage. |
| C | Yes | Load — placing prepared data into a reporting structure — is the third stage. |
| D | No | Deleting source records is not part of ETL; ETL preserves source data. |
| E | No | Adding interpretive comments is not one of the three standard ETL stages. |

**7. What is the primary purpose of a KPI (Key Performance Indicator)?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Storing raw transactions is the role of operational databases, not KPIs. |
| B | Yes | A KPI is a measurable signal that represents progress toward an important objective. |
| C | No | KPIs depend on queries and data; they do not replace them. |
| D | No | KPIs measure performance; they do not correct data entry errors. |

**8. Select ALL that apply: Which of the following are distinct types of reporting outputs?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | A report is a structured output designed for detailed reading, printing, or documentation. |
| B | Yes | A dashboard is a consolidated visual interface for monitoring related results. |
| C | Yes | A KPI card displays one focused metric with supporting context. |
| D | No | A database table is raw storage, not a reporting output. Outputs are built from tables. |
| E | No | A data entry form captures input; it is not a reporting output. |

### Understand Questions

**9. An analyst runs a query joining student records to grade records. The query returns 400 rows, but there are only 50 students. Why might the row count be larger than the student count?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | This is normal behavior, not corruption. |
| B | Yes | When the grain is one row per student per assignment, students with multiple assignments appear in multiple rows. Row count and entity count are different concepts. |
| C | No | The tool is counting correctly; the concept of grain explains the result. |
| D | No | This is expected behavior for joined data at a fine grain, not a bug. |

**10. Select ALL that apply: Why should a reporting query be validated before it is connected to a visualization tool?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Confirming the row count is reasonable catches obvious extraction problems. |
| B | Yes | Verifying calculated fields ensures the numbers feeding visuals are correct. |
| C | Yes | Checking for zero denominators prevents division errors that break reports. |
| D | Yes | A validated query creates a single tested interpretation that every downstream visual can share. |
| E | No | Removing inconvenient data to shape the narrative is manipulation, not validation. |

**11. A small team needs to track project tasks, share narrative notes, and update statuses collaboratively. The data is modest and changes weekly. Which reporting approach is the most practical fit?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | A full enterprise BI platform is excessive for a small team with modest data. |
| B | Yes | A lightweight collaborative workspace with filtered views and grouping fits small-team, narrative-heavy, fast-setup needs. |
| C | No | A static printed report lacks the interactivity and collaboration the team needs. |
| D | No | A custom web application is overbuilt for this use case. |

**12. Select ALL that apply: Which statements accurately describe how a reporting tool typically connects to a database for analysis?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Reporting tools typically import a snapshot of query results rather than maintaining a continuous live connection. |
| B | Yes | After source data changes, the user must explicitly refresh to update imported data. |
| C | Yes | Pre-built reporting queries that handle joins and calculations can serve as a reporting layer. |
| D | Yes | Connection drivers may require matching architectures between the tool and the data source. |
| E | No | Reporting tools do not permanently lock source databases; other users can continue working. |

**13. Why is it important to ask "What question should this report answer?" before building any visual?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Tool cost is irrelevant to report purpose. |
| B | Yes | Connecting output to a specific decision need prevents building visuals that look busy but serve no purpose. |
| C | No | Design awards are not the goal of business reporting. |
| D | No | Asking the question does not eliminate the need for validation. |

**14. Select ALL that apply: Which of the following are examples of sensible data transformations during report preparation?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Removing genuine duplicates that represent the same real-world event is a valid cleaning step. |
| B | Yes | Standardizing inconsistent labels is a common and necessary transformation. |
| C | Yes | Converting text to proper data types enables correct sorting, filtering, and calculation. |
| D | Yes | Validating that values fall within expected ranges catches data-quality issues. |
| E | No | Blindly replacing missing values with zero is dangerous — the missing value may mean something specific that zero misrepresents. |

**15. How does an operational question differ from an analytical question?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Both types can use a variety of tools; the distinction is about the nature of the question. |
| B | Yes | An operational question concerns one specific record or transaction; an analytical question examines patterns, groups, and changes across many records. |
| C | No | Urgency is not the defining distinction between these question types. |
| D | No | The chapter does not assign specific job titles to question types. |

**16. Select ALL that apply: Which of the following are common problems that make a visualization misleading or hard to interpret?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | A truncated bar axis exaggerates small differences and misleads viewers. |
| B | Yes | Showing a number without its denominator hides the size of the relevant population. |
| C | Yes | A cherry-picked time window creates a misleading trend by excluding relevant context. |
| D | Yes | Decorative 3-D effects distort the perceived size of data elements. |
| E | No | Adding clear axis labels and a descriptive title improves, rather than harms, interpretation. |

### Apply Questions

**17. An instructor builds a report showing the total count of grade records as a measure of "number of students." The number is far larger than the actual enrollment. What is the most likely conceptual mistake?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | The software is counting correctly; the formula is wrong for the intended purpose. |
| B | Yes | When each student has multiple records, a row count gives the number of recorded results, not the number of students. A distinct count is needed. |
| C | No | Duplicate accounts are not the most likely explanation for this common grain-awareness mistake. |
| D | No | An accidental join to an unrelated table would likely produce far more dramatic anomalies. |

**18. Select ALL that apply: A dataset contains one row per student per assignment. Which calculations would correctly produce the number of students and the number scoring below a defined threshold?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Counting every row gives the number of recorded results, not the number of students. |
| B | Yes | Counting distinct student identifiers correctly counts unique students regardless of how many rows each appears in. |
| C | No | Averaging all score values does not identify which individual students are below threshold. |
| D | Yes | Filtering at the student level and then counting distinct results is the conceptually correct approach. |
| E | Yes | Dividing total rows by assignments per student provides a reasonable estimate when grain is known, though it assumes every student has every assignment. |

**19. A manager wants to see how a key metric has trended month by month over the past two years. Which visual approach best serves this need?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | A pie chart shows composition, not trend over time. |
| B | Yes | A line chart with time on the horizontal axis reveals direction and rate of change — ideal for trend questions. |
| C | No | A table preserves detail but makes the pattern harder to see at a glance. |
| D | No | A set of KPI cards highlights individual values but does not show movement across time. |

**20. Select ALL that apply: When preparing data imported from a source system for reporting, which actions are appropriate during the transformation stage?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Confirming correct data types for identifiers enables accurate counting and joining. |
| B | Yes | Renaming technical headings to clearer labels helps report readers without changing underlying data. |
| C | Yes | Removing test records when a documented rule justifies exclusion is a legitimate transformation. |
| D | No | Blindly converting nulls to zero is dangerous — a null may mean "not yet graded" or "not applicable," which zero misrepresents. |
| E | Yes | Standardizing inconsistent labels before grouping prevents fragmented categories in reports. |

**21. A report was built from data imported last month. The source database has been updated with new records since then. What must happen for the report to reflect the latest data?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Deleting and rebuilding is unnecessary; refresh updates the imported data. |
| B | Yes | A refresh operation re-imports data from the source, updating the report. |
| C | No | Source databases do not automatically push updates to connected reporting tools. |
| D | No | The import query does not need to be rewritten for routine data updates. |

**22. Select ALL that apply: Before sharing a report built on imported data, which validation steps build confidence in its accuracy?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Spot-checking known records against the original source catches import and transformation errors. |
| B | Yes | Verifying calculations against independent estimates confirms the numbers are correct. |
| C | Yes | Consistent and complete category labels prevent misleading groupings. |
| D | Yes | Checking for accidentally exposed sensitive data is a critical validation step. |
| E | No | Graphic design trends are irrelevant to data accuracy and report trustworthiness. |

**23. A small nonprofit organization needs to track grant application deadlines, assigned responsibilities, and completion notes across a team of five. The priorities are fast setup, easy collaboration, and narrative context. Which approach fits best?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | A formal BI platform is excessive for a five-person team needing narrative context. |
| B | Yes | A lightweight collaborative workspace with simple views provides fast setup, easy collaboration, and narrative support — well-matched to the needs. |
| C | No | A static PDF lacks the interactivity and collaborative updating the team requires. |
| D | No | A custom-built database frontend is overengineered for this use case. |

**24. Select ALL that apply: Which pieces of information should accompany any report to help readers understand its scope and limitations?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Knowing which source system the data came from helps readers assess reliability. |
| B | Yes | Stating the grain tells readers what one row represents, preventing misinterpretation. |
| C | Yes | The refresh date tells readers how current the data is — critical for time-sensitive decisions. |
| D | Yes | Documenting known limitations and exclusions prevents readers from over-interpreting the numbers. |
| E | No | Software brand and version are rarely relevant to understanding the report's scope and meaning. |

### Analyze Questions

**25. A bar chart compares average scores across five departments. The vertical axis starts at 78 instead of zero, making an 80 and an 82 appear to be dramatically different. What principle does this violate?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Color choice is not the relevant principle here. |
| B | Yes | Bar charts encode values through length, so the axis should begin at zero. Starting at 78 exaggerates differences and violates honest encoding. |
| C | No | A bar chart is appropriate for comparing categories; the problem is the axis scale. |
| D | No | Converting to a pie chart would not solve the axis manipulation problem. |

**26. Select ALL that apply: Organizations have different reporting needs that call for different approaches. Which pairings of need to approach are well-matched?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | A printable invoice needs structured, detail-oriented output close to the source — a traditional report generator fits. |
| B | Yes | An interactive dashboard with filtering and exploration needs a dedicated BI authoring tool. |
| C | Yes | A small team with narrative notes and simple tracking is well-served by a lightweight collaborative workspace. |
| D | No | A large hospital network with governed metrics and role-based access needs a governed BI platform, not a lightweight workspace. |
| E | Yes | Drill-down from summary to detail is a core capability of interactive reporting tools. |

**27. A saved reporting query that joins, calculates, and labels data before any visualization tool imports it acts most like which stage of data preparation?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | ELT loads raw data first and transforms later; a prepared query transforms before loading into the tool. |
| B | Yes | A reporting query extracts from tables, applies transformations through joins and calculations, and presents structured results — following the ETL pattern of Extract → Transform → Load. |
| C | No | Calling it purely a storage object misses its central role in the transformation stage. |
| D | No | Additional preparation may still be needed in the reporting tool; the query does not replace all further work. |

**28. Select ALL that apply: After building an interactive report with multiple visuals and filters, which checks help confirm the report is trustworthy?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Comparing overall summary numbers against the source system catches import or calculation errors. |
| B | Yes | Comparing a filtered category against the source confirms that filtering works correctly. |
| C | Yes | Distinct counts should match the known population size. |
| D | Yes | Testing slicers and cross-filtering confirms interactive behavior is correct. |
| E | Yes | Clearing all filters and confirming totals return to expected values ensures no hidden filters distort the view. |

**29. A request arrives: "Build a dashboard showing our sales data." What is the most important follow-up question before starting work?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Charting library choice is a technical detail that should follow from the purpose. |
| B | Yes | Identifying the specific comparison, trend, or decision the dashboard must support transforms a vague request into an actionable scope. |
| C | No | Background color is a cosmetic detail irrelevant to the dashboard's purpose. |
| D | No | Row count is a data detail; the more fundamental question is what the dashboard should accomplish. |

**30. Select ALL that apply: A pie chart would be a poor choice when:**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Too many categories make a pie chart cluttered and unreadable. |
| B | Yes | Similar values are difficult to distinguish in a pie chart because humans compare angles poorly. |
| C | Yes | Pie charts are poor for precise numerical comparison; a bar chart or table is better. |
| D | Yes | A pie chart assumes the categories represent parts of one meaningful whole. |
| E | No | Financial data does not automatically rule out a pie chart; the other factors determine appropriateness. |

**31. A reporting query uses an inner join to connect a table of all students to a table of assignment grades. If some students have no grades recorded at all, what will the query result show for those students?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Inner joins do not create zero-filled rows for non-matching records. |
| B | No | NULL values would appear with an outer join, not an inner join. |
| C | Yes | An inner join only returns rows where matches exist in both tables. Students without grades are excluded from the result entirely. |
| D | No | The query runs without error; it simply returns no rows for unmatched students. |

**32. Select ALL that apply: Which statements correctly describe the difference between a calculated column and a dynamic measure in a reporting tool?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | A calculated column stores one value per row at data-load time. |
| B | Yes | A dynamic measure recalculates based on the current filter context. |
| C | Yes | When a filter is applied, a calculated column's pre-computed values are simply included or excluded. |
| D | Yes | Calculated columns are ideal for row-level labels, categories, and classifications. |
| E | Yes | Dynamic measures are designed for aggregate calculations like averages, sums, and distinct counts that respond to filters. |

### Evaluate Questions

**33. A department needs a recurring monthly summary showing exact figures by category for five senior leaders who will print and archive the document. The data lives in a single well-maintained operational database. Which reporting approach is most justified?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Animated interactivity adds complexity without value for a print-and-archive audience. |
| B | Yes | When the audience reads and prints, the format is stable, and data is close to the source, a structured printable report is the best fit. Use the simplest tool that fully meets the need. |
| C | No | Collaborative workspaces are better for narrative context and task tracking, not archival printing. |
| D | No | Redundancy adds maintenance burden without adding value; the chapter recommends the smallest sufficient tier. |

**34. Select ALL that apply: An AI tool can summarize a dashboard and draft a management briefing using approved source documents. Which statements about this practice are correct?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | AI output is not primary evidence. The database and reporting query are the sources of truth. |
| B | Yes | AI can reduce reading time and help organize information from verified sources. |
| C | Yes | Every factual and numerical claim from AI must be verified against original data. |
| D | Yes | The database and reporting query — not AI output — remain the authoritative sources. |
| E | No | AI does not replace human review; it assists it. Humans remain accountable for accuracy. |

**35. A quarterly business review presentation uses a three-dimensional pie chart with fifteen segments, a bar chart with a truncated vertical axis, and unlabeled axes throughout. Which of the following is the most fundamental problem?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Variety of chart types is not inherently wrong. |
| B | Yes | All the described problems — 3-D distortion, excessive segments, truncated axis, missing labels — converge on a single fundamental failure: the viewer cannot accurately understand what is measured or whether differences are meaningful. Clarity is the most basic requirement of any visualization. |
| C | No | Tool cost is irrelevant to visualization quality. |
| D | No | Color inconsistency is a secondary concern compared to the fundamental lack of clarity. |

**36. Select ALL that apply: Before building any reporting output, which questions help ensure the result will be useful?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Knowing who will use the output and how shapes format, detail level, and interaction needs. |
| B | Yes | Defining the specific question prevents building visuals that serve no decision purpose. |
| C | Yes | Whether the user needs precise detail or broad patterns determines the appropriate output type. |
| D | Yes | How often source data changes determines refresh requirements and format choices. |
| E | Yes | Understanding the eventual decision the report supports connects the output to organizational value. |

**37. A large healthcare network must compare standardized quality metrics across thirty facilities, with governed metric definitions, automated weekly data refreshes, and role-based access controls. Which reporting approach is appropriate?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Email-distributed spreadsheets lack governance, automation, and access control at enterprise scale. |
| B | No | A shared workspace with manual entry cannot enforce metric definitions or handle complex calculations across thirty facilities. |
| C | Yes | Enterprise-scale reporting with standardized metrics, automated refresh, and role-based access requires a governed BI platform with shared data models. |
| D | No | Quarterly printed reports lack timeliness for weekly-changing data and cannot support role-based access. |

**38. Select ALL that apply: When using AI to assist with reporting, which practices reflect responsible use?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Responsible AI use begins with verified, approved inputs. |
| B | Yes | Cross-checking every AI-generated claim against original sources is essential. |
| C | Yes | AI can accelerate drafting while humans retain editorial control and final accountability. |
| D | No | Accepting AI output without verification abdicates human responsibility for accuracy. |
| E | Yes | The database and validated reporting query — not the AI — are the sources of truth. |

**39. A report displays a single large number: "Customer Retention: 84%." No other information is shown. What is the most important improvement?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Making the number larger or more decorative does not add meaning. |
| B | Yes | A number becomes meaningful through comparison. Adding context — a previous period, a target, or a benchmark — transforms an isolated statistic into interpretable evidence. |
| C | No | Converting to a pie chart would make the data less clear, not more meaningful. |
| D | No | Adding a raw count of customers does not provide the comparison context needed to interpret whether 84% is good, bad, or expected. |

**40. Select ALL that apply: A complete reporting pipeline moves through several stages. Which sequence correctly describes this flow?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Raw operational data must be prepared — cleaned, joined, and structured — before it is reporting-ready. |
| B | Yes | Reporting-ready data feeds into the metrics and queries that drive reports. |
| C | Yes | Queries and metrics supply the numbers that appear in reports and visualizations. |
| D | Yes | Reports and visualizations exist to support human interpretation and decision-making. |
| E | No | Interpretation supports decisions, but the pipeline does not end with automated decisions — human judgment remains essential. The chapter emphasizes BI "provides evidence for human judgment." |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Question Distribution Summary

### Table 1: Bloom Level

| Bloom Level | Questions | Count |
| ----------- | --------- | ----- |
| Remember    | 1, 2, 3, 4, 5, 6, 7, 8 | 8 |
| Understand  | 9, 10, 11, 12, 13, 14, 15, 16 | 8 |
| Apply       | 17, 18, 19, 20, 21, 22, 23, 24 | 8 |
| Analyze     | 25, 26, 27, 28, 29, 30, 31, 32 | 8 |
| Evaluate    | 33, 34, 35, 36, 37, 38, 39, 40 | 8 |

### Table 2: Question Type

| Question Type                | Questions | Count |
| ---------------------------- | --------- | ----- |
| Single-answer MC             | 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39 | 20 |
| Multiple-answer (Select ALL) | 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 | 20 |

### Table 3: Design Criterion

| Design Criterion  | Questions | Count |
| ----------------- | --------- | ----- |
| Application-based | 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 37, 38, 40 | 20 |
| Scenario-based    | 9, 10, 11, 12, 13, 14, 19, 20, 21, 22, 23, 24, 27, 28, 29, 30 | 16 |
| Definition-only   | 1, 2, 3, 4, 5, 6, 7, 8, 15, 16 | 10 |
