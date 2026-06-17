# Let's Build Master Guide

## Overview

### Purpose

- This file is a compact guide to the Chapter 01 through Chapter 17 lets-build materials.
- It is designed for navigation, quick review, and chapter planning.
- Full lets-build instructions stay in the separate chapter lets-build files inside each chapter folder.

### How To Use This Master

- Start with the chapter index table below if you want to jump to a chapter summary.
- Open the linked chapter lets-build file when you need the full instructions, prompts, steps, or submission details.
- Use each chapter summary to see the source file, data and tools, material covered, main tasks, and expected deliverables.

### Source Of Truth Rule

- When multiple lets-build files exist in a chapter folder, the most recent dated file is the working source.
- Older or undated files are kept as draft history unless a chapter has no newer dated version.
- The summaries below were built from the latest source file currently mapped for each chapter.

## Chapter Index

| Chapter | Topic | Master Section |
| --- | --- | --- |
| 01 | Meet the Grading Database Project | [Jump to Chapter 01](#chapter-01-meet-the-grading-database-project) |
| 02 | Mapping Information to Decisions | [Jump to Chapter 02](#chapter-02-mapping-information-to-decisions) |
| 03 | Data in Google Sheets | [Jump to Chapter 03](#chapter-03-data-in-google-sheets) |
| 04 | First Database Build in Access | [Jump to Chapter 04](#chapter-04-first-database-build-in-access) |
| 05 | SQL Queries and Data Manipulation | [Jump to Chapter 05](#chapter-05-sql-queries-and-data-manipulation) |
| 06 | The Relational Model in Practice | [Jump to Chapter 06](#chapter-06-the-relational-model-in-practice) |
| 07 | Normalizing the Grading Database | [Jump to Chapter 07](#chapter-07-normalizing-the-grading-database) |
| 08 | Midterm Review Lab | [Jump to Chapter 08](#chapter-08-midterm-review-lab) |
| 09 | Advanced SQL Queries | [Jump to Chapter 09](#chapter-09-advanced-sql-queries) |
| 10 | Designing the ERD | [Jump to Chapter 10](#chapter-10-designing-the-erd) |
| 11 | Applying DBA Practices | [Jump to Chapter 11](#chapter-11-applying-dba-practices) |
| 12 | Business Intelligence for the Grading Department | [Jump to Chapter 12](#chapter-12-business-intelligence-for-the-grading-department) |
| 13 | Hardening the Grading Database | [Jump to Chapter 13](#chapter-13-hardening-the-grading-database) |
| 14 | Power BI Dashboard | [Jump to Chapter 14](#chapter-14-power-bi-dashboard) |
| 15 | Strategic SQL and Analysis | [Jump to Chapter 15](#chapter-15-strategic-sql-and-analysis) |
| 16 | Final Project and Portfolio Review | [Jump to Chapter 16](#chapter-16-final-project-and-portfolio-review) |
| 17 | Course Synthesis with the Grading Database | [Jump to Chapter 17](#chapter-17-course-synthesis-with-the-grading-database) |

## Chapter 01: Meet the Grading Database Project

<!-- Source: BITM330-Book-draft/chapter-drafts/ch01-introduction-to-course/lets-build/ch01-lets-build-26-03-18.md -->

### Source File

- Latest file: [ch01-lets-build-26-03-18.md](../../BITM330-Book-draft/chapter-drafts/ch01-introduction-to-course/lets-build/ch01-lets-build-26-03-18.md)
- Use the chapter file for the full prompt set and project-charter instructions.

### Data And Tools

- Project charter template
- ERD or sketch tool
- Sample business scenario

### Material Covered

- Overview of the Grading Database as the running course project
- Two-phase project progression from foundation to integration
- Professional roles practiced across the project
- Connection between domain understanding and system design

### Main Questions Or Tasks

- Explain what the Grading Database is supposed to do
- Generate at least five business questions the system should answer
- Identify the main entities in the project
- Summarize the difference between Phase 1 and Phase 2
- Reflect on why the Grading Database is a strong teaching case

### Deliverables

- One-page project charter with the business problem, entity list, and business questions

## Chapter 02: Mapping Information to Decisions


everything covered in the chapter, why do we need an information system, and how to design one that produces actionable insights.

information behavior and decision-making frameworks, and how to design an information system that produces actionable insights.

<!-- Source: BITM330-Book-draft/chapter-drafts/ch02-mis-and-bitm/lets-build/ch02-lets-build-2026-05-19.md -->

### Source File

- Latest file: [ch02-lets-build-2026-05-19.md](../../BITM330-Book-draft/chapter-drafts/ch02-mis-and-bitm/lets-build/ch02-lets-build-2026-05-19.md)
- Use the chapter file for the full baseline, model answers, and reflection prompts.

### Data And Tools

- Chapter 1 project charter as reference
- DIKW framework notes
- R.E.A.D. framework reference

### Material Covered

- DIKW hierarchy from data to wisdom
- R.E.A.D. framework for moving from records to decisions
- KPI design tied to business questions
- Five-component model of information systems
- Stakeholder identification and needs mapping

### Main Questions Or Tasks

- Build a DIKW table using Grading Database examples
- Create a R.E.A.D. map showing flow from stored records to action
- Design three to five KPIs and justify each one
- Create an IPO description and five-component matrix
- Write a short reflection on why storage alone is not enough

### Deliverables

- Completed DIKW mapping table
- R.E.A.D. framework map
- KPI set with justification
- IPO description and five-component matrix
- One-paragraph reflection
- See chapter file for full submission details and model answers

## Chapter 03: Data in Google Sheets


What data types are in the grading records? What data quality problems do we see? How does the spreadsheet structure limit us compared to a database?

Vlookup is a powerful function for simulating relationships, but it also highlights the fragility of the spreadsheet approach.

why is not good enough for the grading records, and what problems do we encounter when we try to use it for that purpose?

<!-- Source: BITM330-Book-draft/chapter-drafts/ch03-what-is-data/lets-build/ch03-lets-build.md -->

### Source File

- Latest file: [ch03-lets-build.md](../../BITM330-Book-draft/chapter-drafts/ch03-what-is-data/lets-build/ch03-lets-build.md)
- Use the chapter file for the full spreadsheet walkthrough and anomaly prompts.

### Data And Tools

- Google Sheets
- Sample grading records
- Data type classification template

### Material Covered

- Field identification and data types
- Data quality problems and anomalies
- Metadata and meaning-making
- Spreadsheet limitations compared with database structure
- Repeating groups and multi-valued cells

### Main Questions Or Tasks

- Build the GRADEBOOK and GRADE_WEIGHT sheets
- Classify data types and enter sample records
- Identify update, insertion, and deletion anomalies
- Use VLOOKUP to simulate relationships
- Summarize why the spreadsheet approach becomes fragile

### Deliverables

- Annotated Google Sheet with typed column classifications
- Written reflection identifying anomaly types
- Comparison of spreadsheet limits versus database structure
- See chapter file for full submission details

## Chapter 04: First Database Build in Access

Create table 
form 


<!-- Source: BITM330-Book-draft/chapter-drafts/ch04-databases/lets-build/ch04-lets-build-2026-03-22.md -->

### Source File

- Latest file: [ch04-lets-build-2026-03-22.md](../../BITM330-Book-draft/chapter-drafts/ch04-databases/lets-build/ch04-lets-build-2026-03-22.md)
- Use the chapter file for the full Access build steps and query/report instructions.

### Data And Tools

- Microsoft Access
- Two table designs: GRADEBOOK and GRADE_WEIGHT
- Sample records for data entry

### Material Covered

- Table creation in Design View
- Primary key selection and enforcement
- Field types and properties
- Form-based data entry
- Query Design interface
- Report generation and formatting

### Main Questions Or Tasks

- Define the GRADEBOOK table with appropriate fields and data types
- Define the GRADE_WEIGHT lookup table
- Set primary keys and enter sample records
- Build a data-entry form and add records through it
- Create multiple queries for filtering, sorting, joining, and aggregation
- Generate reports from query results

### Deliverables

- Completed `GradingDB_Ch4.accdb` file
- Working tables, form, queries, and reports
- Exported PDF report

## Chapter 05: SQL Queries and Data Manipulation

Do the grading database in SQL, and see how the query language compares to the Access query design interface.

<!-- Source: BITM330-Book-draft/chapter-drafts/ch05-sql/lets-build/ch05-lets-build-2026-03-22.md -->

### Source File

- Latest file: [ch05-lets-build-2026-03-22.md](../../BITM330-Book-draft/chapter-drafts/ch05-sql/lets-build/ch05-lets-build-2026-03-22.md)
- Use the chapter file for the full SQL sequence, example queries, and outputs.

### Data And Tools

- SQLite Online or DB Browser for SQLite
- SQL scripting environment
- Grading database schema from Chapter 4

### Material Covered

- CREATE TABLE and INSERT INTO basics
- Retrieval with SELECT, WHERE, ORDER BY, and DISTINCT
- Filtering with LIKE, IN, and logical operators
- JOIN patterns for combining tables
- Aggregation with AVG, COUNT, SUM, and GROUP BY
- CASE, views, subqueries, and CTEs
- Safe UPDATE and DELETE practices

### Main Questions Or Tasks

- Write CREATE TABLE statements for the practice schema
- Insert sample records
- Build a progressive sequence of SQL queries from basic to advanced
- Use aliases, CASE expressions, and calculated fields
- Demonstrate views and subqueries
- Perform safe modification queries with careful WHERE clauses

### Deliverables

- `.sql` file with CREATE and INSERT statements
- Screenshots or output tables for the queries
- Completed SQL View query from Access
- Reflection on SQL portability and power

## Chapter 06: The Relational Model in Practice


This time use multiple tables and joins to build the grading database, and see how the relational model works in practice.

<!-- Source: BITM330-Book-draft/chapter-drafts/ch06-relational-model/lets-build/ch06-lets-build-2026-03-22.md -->

### Source File

- Latest file: [ch06-lets-build-2026-03-22.md](../../BITM330-Book-draft/chapter-drafts/ch06-relational-model/lets-build/ch06-lets-build-2026-03-22.md)
- Use the chapter file for the full seven-table schema build and relationship tests.

### Data And Tools

- Microsoft Access or SQLite
- Seven-table schema design
- Understanding of foreign keys and relationships

### Material Covered

- Progression from flat table to relational schema
- Seven core tables in the Grading Database
- Primary and candidate keys
- Foreign key relationships and referential integrity
- Composite keys and junction tables
- One-to-many and many-to-many patterns

### Main Questions Or Tasks

- Create all seven core tables
- Set the primary keys and relationship fields
- Establish and visualize relationships in Access
- Test referential integrity enforcement
- Populate tables with sample data in dependency order
- Query across multiple tables to reconstruct relational views

### Deliverables

- `GradingDB_Ch6.accdb` or `.sql` file with the full relational schema
- Relationship diagram screenshot
- Proof of referential integrity enforcement
- Populated tables with sample data

## Chapter 07: Normalizing the Grading Database


Using normalizing techniques to audit and redesign the grading database for improved reliability and maintainability.

Also using multiple queries 

<!-- Source: BITM330-Book-draft/chapter-drafts/ch07-normalization/lets-build/ch07-lets-build-2026-05-19.md -->

### Source File

- Latest file: [ch07-lets-build-2026-05-19.md](../../BITM330-Book-draft/chapter-drafts/ch07-normalization/lets-build/ch07-lets-build-2026-05-19.md)
- Use the chapter file for the full normalization audit and redesign instructions.

### Data And Tools

- Chapter 6 relational database as the starting point
- Normalization audit log template
- Access or SQLite

### Material Covered

- First Normal Form and atomic values
- Second Normal Form and partial dependencies
- Third Normal Form and transitive dependencies
- Functional dependency reasoning
- Reliability improvements through redesign

### Main Questions Or Tasks

- Audit the schema for 1NF violations
- Identify and fix 2NF violations
- Detect and resolve 3NF violations
- Justify why each change improves reliability
- Retest the redesigned schema against the business questions

### Deliverables

- Updated `GradingDB_Ch7.accdb` or `.sql` file
- Normalized schema diagram with keys and relationships
- Normalization audit log showing each issue and fix
- See chapter file for full submission details

## Chapter 08: Midterm Review Lab

<!-- Source: BITM330-Book-draft/chapter-drafts/ch08-midterm-review/lets-build/ch08-lets-build-2026-05-19.md -->

### Source File

- Latest file: [ch08-lets-build-2026-05-19.md](../../BITM330-Book-draft/chapter-drafts/ch08-midterm-review/lets-build/ch08-lets-build-2026-05-19.md)
- Use the chapter file for the full review prompts and optional peer-review directions.

### Data And Tools

- Chapter 7 normalized database
- Earlier notes and files from Chapters 1 through 7
- Concept map template

### Material Covered

- Schema quality review checklist
- Query bank compilation and annotation
- Concept mapping across core database ideas
- Review of keys, normalization, SQL, and anomalies
- Self-assessment and integration before the midterm

### Main Questions Or Tasks

- Complete the schema review checklist against the current database
- Collect or rewrite queries answering the Chapter 1 business questions
- Annotate each query with its SQL concepts and chapter origin
- Create a concept map connecting the key terms
- Answer two review prompts in short paragraphs
- Optionally review a classmate's design

### Deliverables

- Completed schema checklist
- Annotated query bank
- Concept map
- Short written responses to two reflection prompts
- Optional peer review note
- See chapter file for full reflection prompts

## Chapter 09: Advanced SQL Queries

<!-- Source: BITM330-Book-draft/chapter-drafts/ch09-advanced-sql-queries/lets-build/ch09-lets-build.md -->

### Source File

- Latest file: [ch09-lets-build.md](../../BITM330-Book-draft/chapter-drafts/ch09-advanced-sql-queries/lets-build/ch09-lets-build.md)
- Use the chapter file for the full exercise set, example outputs, and business framing.

### Data And Tools

- Grading Database from Chapter 5 or Chapter 7
- SQLite platform
- Seven tables with sample data

### Material Covered

- Window functions and running aggregates
- CTEs for multi-stage logic
- Subqueries for embedded logic
- Diagnostic queries for data quality
- Complex JOIN patterns and missing-value detection
- Transaction safety for bulk updates

### Main Questions Or Tasks

- Write a diagnostic query identifying data inconsistencies
- Build a CTE pipeline computing weighted grades and risk flags
- Create a view combining attendance and grade data
- Use a window function to compute running quiz averages
- Write a transaction for bulk grade updates with rollback safety

### Deliverables

- `.sql` file with advanced queries
- Annotations linking each query to the business question and SQL concepts
- Screenshot or output tables showing results
- See chapter file for the full exercise requirements

## Chapter 10: Designing the ERD

Creating an ERD for the grading database

<!-- Source: BITM330-Book-draft/chapter-drafts/ch10-database-design/lets-build/ch10-lets-build-2026-03-08.md -->

### Source File

- Latest file: [ch10-lets-build-2026-03-08.md](../../BITM330-Book-draft/chapter-drafts/ch10-database-design/lets-build/ch10-lets-build-2026-03-08.md)
- Use the chapter file for the full Lucidchart, Mermaid, and annotation steps.

### Data And Tools

- Lucidchart
- Mermaid editor or Markdown workflow
- Seven-table Grading Database schema
- Business requirements from Chapter 1

### Material Covered

- Entity-relationship modeling with Crow's Foot notation
- Translating tables, attributes, keys, and relationships visually
- Cardinality and participation notation
- Mermaid as a text-based ERD option
- Validating the ERD against business questions
- Mapping ERD structure to SQL generation

### Main Questions Or Tasks

- Create the full Lucidchart ERD with the main entities and attributes
- Mark primary keys, foreign keys, and relationship cardinality
- Annotate design decisions
- Map business questions to the ERD paths that answer them
- Optionally create a Mermaid ERD for documentation

### Deliverables

- Exported Lucidchart ERD in PNG or PDF
- Design-decision annotations and business-question traceability
- Optional Mermaid ERD source text

## Chapter 11: Applying DBA Practices

<!-- Source: BITM330-Book-draft/chapter-drafts/ch11-database-administration/lets-build/ch11-lets-build-2026-05-19.md -->

### Source File

- Latest file: [ch11-lets-build-2026-05-19.md](../../BITM330-Book-draft/chapter-drafts/ch11-database-administration/lets-build/ch11-lets-build-2026-05-19.md)
- Use the chapter file for the full role, backup, recovery, and performance workflow.

### Data And Tools

- Current Grading Database
- Backup capability such as file copy or SQL export
- DBA policy template
- Integrity check and performance-monitoring tools

### Material Covered

- Role-based access control
- Backup and recovery planning
- Referential integrity and constraint enforcement
- Indexing strategy and performance measurement
- Transaction control and ACID reliability
- Audit thinking and change logging

### Main Questions Or Tasks

- Define three user roles and an access matrix
- Build a one-page backup and recovery plan
- Simulate recovery from a damage scenario
- Check database integrity using platform tools
- Add indexes to high-traffic columns and measure the effect
- Document DBA rationale and tradeoffs

### Deliverables

- Role and permission policy document
- Backup and recovery plan
- Documented recovery walkthrough
- Integrity and maintenance notes
- Short performance comparison note

## Chapter 12: Business Intelligence for the Grading Department

<!-- Source: BITM330-Book-draft/chapter-drafts/ch12-business-intelligence/lets-build/ch12-lets-build-2026-05-19.md -->

### Source File

- Latest file: [ch12-lets-build-2026-05-19.md](../../BITM330-Book-draft/chapter-drafts/ch12-business-intelligence/lets-build/ch12-lets-build-2026-05-19.md)
- Use the chapter file for the full BI view definitions, reports, and managerial-summary tasks.

### Data And Tools

- Grading Database with enough data for analysis
- SQL environment for views or Access saved queries
- Reporting tool such as Access, spreadsheet, or plain-text memo

### Material Covered

- KPI definition and selection
- Analytical view creation and reuse
- Aggregation and summary reporting
- Attendance-performance relationship analysis
- Translating outputs into plain managerial language

### Main Questions Or Tasks

- Define at least four KPIs tied to management questions
- Create a core analytical view combining student, deliverable, and score data
- Build BI reports for performance, at-risk students, and missing submissions
- Create an attendance-performance view
- Translate one report into a managerial summary or decision memo

### Deliverables

- SQL queries or saved-query screenshots for the BI layer
- Three finished BI reports
- One managerial summary or memo in plain language

## Chapter 13: Hardening the Grading Database

<!-- Source: BITM330-Book-draft/chapter-drafts/ch13-advanced-database-techniques/lets-build/ch13-lets-build-2026-05-19.md -->

### Source File

- Latest file: [ch13-lets-build-2026-05-19.md](../../BITM330-Book-draft/chapter-drafts/ch13-advanced-database-techniques/lets-build/ch13-lets-build-2026-05-19.md)
- Use the chapter file for the full hardening sequence, audit trail logic, and transaction examples.

### Data And Tools

- Current Grading Database
- SQL environment supporting indexes, constraints, and triggers
- Audit table design template

### Material Covered

- Performance indexing on join and filter columns
- Check and unique constraints for data quality
- Audit-trail design and trigger implementation
- Transaction control and rollback safety
- Advanced analytical views and monitoring objects

### Main Questions Or Tasks

- Identify database risks such as slow queries, duplicates, and invalid values
- Add indexes to key fields
- Add constraints for score range, unique email, and unique student-deliverable rows
- Create an audit table and trigger or equivalent control
- Demonstrate transaction safety with update and rollback examples
- Build one advanced analytical view

### Deliverables

- SQL file or screenshots showing indexes, constraints, and transaction examples
- Brief note explaining each design choice
- Evidence that the audit or monitoring object works

## Chapter 14: Power BI Dashboard

<!-- Source: BITM330-Book-draft/chapter-drafts/ch14-powerbi/lets-build/ch14-lets-build-2026-05-06.md -->

### Source File

- Latest file: [ch14-lets-build-2026-05-06.md](../../BITM330-Book-draft/chapter-drafts/ch14-powerbi/lets-build/ch14-lets-build-2026-05-06.md)
- Use the chapter file for the full Power BI build steps, DAX measures, and page layout.

### Data And Tools

- Power BI Desktop
- Grading Database in Access or SQL
- DAX formulas for calculated analytics

### Material Covered

- Connecting Power BI to database sources
- Reviewing the data model and relationships
- DAX measures for dashboard calculations
- Multi-page dashboard design
- Visuals, slicers, and interactive filtering

### Main Questions Or Tasks

- Connect Power BI to the database
- Verify relationships in the data model
- Create the key DAX measures
- Build three dashboard pages
- Add slicers for filtering and drilldown
- Publish or export the dashboard

### Deliverables

- `.pbix` Power BI file with the database connection
- Three report pages with titles and formatting
- DAX measure definitions
- Optional PDF export or published report link
- See chapter file for full submission details

## Chapter 15: Strategic SQL and Analysis

<!-- Source: BITM330-Book-draft/chapter-drafts/ch15-business-strategy-is/lets-build/ch15-lets-build-2026-05-08.md -->

### Source File

- Latest file: [ch15-lets-build-2026-05-08.md](../../BITM330-Book-draft/chapter-drafts/ch15-business-strategy-is/lets-build/ch15-lets-build-2026-05-08.md)
- Use the chapter file for the full strategic exercise set and interpretation guidance.

### Data And Tools

- Grading Database with multiple students and term data
- SQL environment supporting window functions and CTEs
- Strategic analysis framing

### Material Covered

- Trend analysis using running averages
- Assessment quality and discrimination analysis
- Early warning indicators for at-risk students
- Policy scenario testing and what-if analysis
- Comparative analysis across groups or categories

### Main Questions Or Tasks

- Compute running averages and identify trend changes
- Calculate range and discrimination measures by deliverable
- Flag at-risk students for early intervention
- Compare averages with and without dropping the lowest quiz
- Compare performance across categories or cohorts

### Deliverables

- Five advanced SQL queries with business interpretation
- Output tables or screenshots for each exercise
- Written strategic interpretation of what the results mean for decisions
- See chapter file for full exercise requirements

## Chapter 16: Final Project and Portfolio Review

<!-- Source: BITM330-Book-draft/chapter-drafts/ch16-final-review/lets-build/ch16-lets-build-2026-05-19.md -->

### Source File

- Latest file: [ch16-lets-build-2026-05-19.md](../../BITM330-Book-draft/chapter-drafts/ch16-final-review/lets-build/ch16-lets-build-2026-05-19.md)
- Use the chapter file for the full final-project workflow, task sequence, and submission checklist.

### Data And Tools

- All prior deliverables from Chapters 1 through 15
- Word processor or PDF editor for portfolio assembly
- Final project checklist

### Material Covered

- Portfolio assembly and organization
- Project narrative connecting design to implementation
- Self-assessment of course competencies
- Reflection on database design, SQL, BI, and strategy
- Optional presentation preparation

### Main Questions Or Tasks

- Collect all deliverables into an organized package
- Write a project narrative showing the evolution from concept to system
- Self-rate confidence on core competencies
- Identify the weakest skill and plan how to strengthen it
- Optionally prepare a short presentation walkthrough

### Deliverables

- Organized portfolio package with table of contents
- Project narrative connecting design decisions to outcomes
- Self-assessment with competency ratings and improvement plan
- Optional presentation slides

## Chapter 17: Course Synthesis with the Grading Database

<!-- Source: BITM330-Book-draft/chapter-drafts/ch17-conclusion/lets-build/ch17-lets-build-2026-05-08.md -->

### Source File

- Latest file: [ch17-lets-build-2026-05-08.md](../../BITM330-Book-draft/chapter-drafts/ch17-conclusion/lets-build/ch17-lets-build-2026-05-08.md)
- Use the chapter file for the full activity descriptions and reflection prompts.

### Data And Tools

- Complete Grading Database from prior chapters
- Systems thinking framework
- Reflection template

### Material Covered

- System lifecycle from data modeling through analytics
- Design tradeoffs and organizational consequences
- Connection between technical architecture and managerial outcomes
- Synthesis of relational design, SQL, governance, and analytics

### Main Questions Or Tasks

- Map the system lifecycle from structure through analysis
- Choose one design decision and explain its business consequences
- Reflect on the biggest insight about data systems
- Explain the connection between technical design and managerial judgment

### Deliverables

- System lifecycle map or diagram
- One-page explanation of a design decision and its consequences
- Reflection responses to the guided questions
- See chapter file for full activity descriptions and prompts