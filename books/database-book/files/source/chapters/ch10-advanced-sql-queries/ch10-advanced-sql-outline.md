<!-- metadata: date="2026-06-11"; chapter="10"; type="outline"; title="Chapter 10 Outline"; description="Chapter 10 structural outline" -->

## 1. 

### Introduction: From Writing Queries to Designing Intelligence

* Why “advanced SQL” is about relational thinking and analytical clarity (not memorization)
* How SQL supports business reporting, performance measurement, and decision-making
* Tools you will use (same SQL logic, different environments):
  * Supabase (hosted PostgreSQL) and browser SQL editor
  * SQLiteOnline and DB Browser for SQLite

## Introduction: From Querying to Engineering

* What makes SQL "advanced" — moving from retrieving data to transforming, protecting, and optimizing it
* How this chapter builds on the previous chapter's foundation
* Continued use of the Grading Database

## 2. Normalization Through SQL: Restructuring the Grading Database

## SQL as a Tool for Data Cleanup and Normalization


* Why normalization matters (brief recap from relational model chapter)
* Using SELECT INTO / CREATE TABLE AS SELECT to create new tables from queries
  * Extracting a STUDENT table from the flat GRADE table
  * Extracting a DELIVERABLE table from the flat GRADE table
  * Creating a clean STUDENT_GRADE junction table
* Verifying normalization with queries (checking for remaining redundancy)
* Dropping the old table and working with the new schema

### Using Queries to Detect Redundancy and Data Problems

* How to diagnose “flat-table” problems using SQL (duplicates, inconsistent values)
* How queries reveal design issues before you even draw relationships
* **Syntax + grading database examples included**

### Creating New Tables From Queries

* Building normalized tables from existing data
* Extracting entities (Students, Deliverables) from repeated rows
* DBMS notes: `CREATE TABLE AS SELECT` (SQLite/PostgreSQL) vs `SELECT INTO` (some systems)
* **Syntax + grading database examples included**

### Migrating Clean Data Into the New Tables

* `INSERT INTO … SELECT` as the workhorse of normalization workflows
* De-duplication with `DISTINCT`
* Preparing data before constraints and relationships are enforced
* **Syntax + grading database examples included**


## Part II: Reusable Queries and Composable SQL

## Subqueries: Queries Within Queries

* What subqueries are and why they matter (single-statement answers to multi-step questions)
* **Subquery in WHERE** (filter by computed value)
* **Subquery in FROM** (derived tables)
* **Subquery in SELECT** (scalar subqueries for comparison columns)
* **Syntax + grading database examples included** (your full block goes here)

---

## Views: Saved Queries as Virtual Tables

* Views as reusable reporting interfaces
* Why views support consistency, governance, and dashboarding
* Using views to hide complexity from end users
* **Syntax + grading database examples included** (HighPerformers, StudentDeliverables, DeliverableAverages, UpcomingDeliverables)

---

## Common Table Expressions (CTEs)

* CTEs as readable, stepwise SQL (often clearer than nested subqueries)
* Using CTEs for analytics pipelines and multi-stage transformations
* Portability note: supported in SQLite 3.8.3+, PostgreSQL, SQL Server; not in Access
* **Syntax + grading database examples included** (AvgGrades → filter > 85)

---

## Combining Results with UNION

* When to combine result sets rather than join tables
* `UNION` vs `UNION ALL` (dedupe vs preserve duplicates)
* Engagement reporting example using Attendance + Grades
* **Syntax + grading database examples included**

---

## Updating and Deleting Data

* Responsible modification of data in operational databases
* Why `WHERE` is not optional (and how to avoid accidental mass edits)
* How referential integrity blocks unsafe deletes when relationships exist
* **Syntax + grading database examples included** (update email; delete attendance record)


## Views and CTEs as Reusable Artifacts

* When to use a view vs. a CTE vs. a subquery
* Building a layered reporting system with views
* Chaining CTEs for multi-step transformations
* Materialized views (concept and PostgreSQL support)


## Part III: SQL as Analytical and Business Logic Infrastructure

## Conditional Logic with CASE

* Translating numeric scores into business categories (letter grades, risk flags)
* Embedding grading policies into queries
* **Syntax + grading database examples included**

## Expressions for Business Reporting

* Arithmetic expressions (bonus points, scaled scores)
* String expressions (full names, labels)
* Date/time expressions (age, due-date windows)
* Aggregates (AVG, MIN, MAX) where needed inside reports
* **Syntax + grading database examples included**

## 3. Multi-Table Queries Revisited: Complex JOINs

* Self-joins (comparing students to each other)
* Multi-table joins (3+ tables in one query)
* Building a complete gradebook report across STUDENT + DELIVERABLE + STUDENT_GRADE + ASSIGNMENT

## 4. Advanced Aggregation and Analytics

* DISTINCT and COUNT(DISTINCT)
* Nested aggregation (aggregating aggregates with subqueries)
* Percentages and ratios (attendance rate, pass rate)
* CASE inside aggregate functions (conditional counting/summing)
* Ranking and comparison without window functions

## 5. Window Functions: Analytics Without Collapsing Rows

* What window functions solve (analysis alongside detail)
* ROW_NUMBER(), RANK(), DENSE_RANK()
* Running totals and moving averages with SUM() OVER / AVG() OVER
* PARTITION BY for grouped windows
* Grading Database examples: ranking students, cumulative scores


## Conclusion: SQL as a Business Performance Skill

* How normalized structure + reusable queries enable reliable reporting
* Why SQL is the “unifying language” across database platforms
* How this chapter supports later work on dashboards, KPIs, and decision support

*
