---
title: "Chapter 13: Terms Treasury — Advanced Database Techniques"
chapter: 13
section: "Terms Treasury"
description: "Key vocabulary for advanced database techniques including indexes, transactions, constraints, triggers, window functions, security, macros, and stored procedures."
keywords:
  - terms
  - database hardening
  - indexes
  - transactions
  - constraints
  - triggers
  - security
  - macros
  - stored procedures
  - ACID
  - RBAC
date: 2026-06-16
author: "Nimrod Dvir, PhD"
---

# Chapter 13: Terms Treasury

| Term | Definition | Business Significance | Examples |
|---|---|---|---|
| **Audit Table** | A table that records important data changes — who changed what, when, and (optionally) why — for accountability and review. | Audit tables turn grade changes, financial adjustments, and permission modifications from invisible events into traceable records. They support compliance, dispute resolution, and trust in the system. | `GRADE_AUDIT(AuditID, GradeID, OldScore, NewScore, ChangedAt, ChangeReason)` — populated automatically by a trigger each time a grade is updated. |
| **Composite Index** | An index built on two or more columns. The column order matters because the index is most useful when queries filter by the leftmost columns first. | Composite indexes speed up queries that filter or join on multiple columns together — such as looking up a specific student's score on a specific deliverable — without needing separate single-column indexes. | `CREATE INDEX idx_grade_student_deliverable ON STUDENT_GRADE (StudentID, DeliverableID);` — supports queries filtering by `StudentID` alone or by both columns. |
| **Conditional Aggregation** | Using `CASE` inside aggregate functions such as `SUM`, `COUNT`, or `AVG` to calculate condition-specific metrics in a single query. | Conditional aggregation turns transaction-level data into KPIs — pass rates, attendance percentages, threshold counts — without exporting data to a spreadsheet. It makes analytical logic transparent and reproducible. | `SUM(CASE WHEN Score >= 60 THEN 1 ELSE 0 END)` counts passing grades; `SUM(CASE WHEN Attended = 1 THEN 1 ELSE 0 END)` counts present students. |
| **Constraint** | A rule enforced by the database to restrict allowed data or relationships. Common types include `NOT NULL`, `CHECK`, `UNIQUE`, `DEFAULT`, `PRIMARY KEY`, and `FOREIGN KEY`. | Constraints move data quality from "please be careful" to "the system will not allow this." They prevent invalid scores, duplicate records, and missing required values regardless of which application or user enters the data. | `CHECK (Score BETWEEN 0 AND 100)` prevents impossible grades. `UNIQUE (StudentID, DeliverableID)` prevents duplicate submissions. |
| **Database Hardening** | Strengthening a database so that it can operate safely under realistic conditions — adding protections for performance, integrity, auditability, and security without changing the basic business purpose. | Hardening is what separates a classroom prototype from a production system. It ensures that reports remain trustworthy, mistakes are caught before they spread, and sensitive data stays protected as users and data volumes grow. | Adding indexes to speed up grade reports, constraints to block invalid scores, triggers to record grade changes, and role-based permissions to control access. |
| **Default Constraint** | A rule that supplies a value when none is provided during an `INSERT`. | Defaults reduce ambiguity and standardize data entry. Instead of leaving a value `NULL` or guessing, the database inserts a known, sensible default — such as `0` for attendance or the current timestamp for creation dates. | `Attended INTEGER DEFAULT 0` — assumes absent unless marked present. `CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP` — records when a row was added. |
| **Index** | A lookup structure that helps the DBMS find rows quickly without scanning the entire table. Like a textbook index, it maps values to locations. | Indexes are the most common performance tool in database systems. Without them, queries that run instantly on small tables become unusably slow as data grows — turning correct SQL into an operational failure. | `CREATE INDEX idx_student_grade_student ON STUDENT_GRADE (StudentID);` — lets the DBMS jump directly to all grades for one student. |
| **Macro (Access)** | An event-driven, declarative automation tool in Microsoft Access that runs a sequence of actions in response to form events, button clicks, or data changes. Data macros run at the table level in response to `INSERT`, `UPDATE`, or `DELETE`. | Macros connect database rules to the user interface. They validate input, control navigation, refresh data, and display messages — making business rules visible and actionable for users who may never write SQL. | A form macro that rejects a score above 100 before the record is saved. A data macro that logs grade changes to an audit table. |
| **Query Plan** | The DBMS's strategy for executing a query — showing whether it will use an index, scan a table, or apply other optimizations. | Query plans replace guesswork with evidence. They tell you whether an index is being used, whether a full table scan is happening, and where performance bottlenecks actually are — not where you assume they are. | `EXPLAIN QUERY PLAN SELECT * FROM STUDENT_GRADE WHERE StudentID = 101;` (SQLite). `EXPLAIN ANALYZE SELECT ...` (PostgreSQL). |
| **Row-Level Security (RLS)** | A security mechanism that restricts which rows a user can see or modify based on their identity, rather than granting access to an entire table. | RLS enables fine-grained access control — for example, letting students see only their own grades while instructors see all grades in their assigned courses. It enforces privacy rules at the database level. | `CREATE POLICY student_can_view_own_grades ON STUDENT_GRADE FOR SELECT USING (StudentID = current_setting('app.current_student_id')::integer);` |
| **Stored Procedure** | A named block of SQL code saved in the database that can be executed on demand. Unlike triggers, stored procedures are called explicitly rather than firing automatically. | Stored procedures package multi-step operations — such as a grade correction with mandatory auditing — into a single, reusable call. They ensure consistent process execution regardless of which application or tool initiates the operation. | `CALL update_grade(10, 92);` — a procedure that records the old score, applies the new score, and commits both changes together. |
| **Transaction** | A set of database operations that must succeed or fail together as a single unit of work. Controlled by `BEGIN`, `COMMIT`, and `ROLLBACK`. | Transactions prevent partial updates — the split-second window where one step succeeded but another failed, leaving the database in an inconsistent state. In grading systems, this protects against corrupted records when grade changes involve multiple steps. | Wrapping a grade update and an audit log insert in `BEGIN ... COMMIT` so both happen or neither does. |
| **Trigger** | Database logic that runs automatically in response to data events such as `INSERT`, `UPDATE`, or `DELETE`. Can fire `BEFORE` or `AFTER` the event. | Triggers provide universal enforcement and auditability — they work regardless of which user, application, or tool makes the change. This matters when data enters the system through multiple paths over time. | `CREATE TRIGGER trg_log_grade_update AFTER UPDATE ON STUDENT_GRADE ...` — records every grade change in an audit table automatically. |
| **Unique Constraint** | A rule that prevents duplicate values in a column or group of columns. Unlike the primary key, a table can have multiple unique constraints. | Unique constraints protect business identifiers — email addresses, student-deliverable pairs, course codes — from accidental duplication. They turn "this should be unique" into "this cannot be duplicated." | `UNIQUE (Email)` on `STUDENT` prevents two students from sharing an email. `UNIQUE (StudentID, DeliverableID)` prevents two grade rows for the same student-deliverable pair. |
| **Window Function** | A SQL function that computes analytical values — rankings, running totals, moving averages — over a set of rows while preserving row-level detail. Unlike `GROUP BY`, window functions do not collapse rows. | Window functions add comparative context to individual records. An instructor can see each student's score alongside the class rank, running average, or percentile — supporting earlier interventions and fairer benchmarking. Detailed coverage is in Chapters 9 and 10. | `AVG(Score) OVER (PARTITION BY StudentID ORDER BY DueDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` computes a running average per student over time. |

# Acronyms and Abbreviations

| Acronym | Meaning |
|---|---|
| **ACID** | Atomicity, Consistency, Isolation, Durability — the four properties that guarantee reliable transaction processing. |
| **BI** | Business Intelligence — tools and processes for turning data into actionable insights and dashboards. |
| **CTE** | Common Table Expression — a named temporary result set defined with `WITH` that simplifies complex queries. |
| **DBA** | Database Administrator — the role responsible for database performance, security, backups, and maintenance. |
| **DBMS** | Database Management System — the software that manages database access, integrity, security, and concurrency. |
| **KPI** | Key Performance Indicator — a measurable value that shows how effectively an organization is achieving key objectives. |
| **RBAC** | Role-Based Access Control — a security model that assigns permissions to roles rather than individual users. |
| **RLS** | Row-Level Security — a mechanism that restricts which rows a user can access based on their identity. |
| **SDLC** | System Development Life Cycle — the structured framework for planning, building, and maintaining information systems. |
| **VBA** | Visual Basic for Applications — the programming language used for advanced automation in Microsoft Access. |
