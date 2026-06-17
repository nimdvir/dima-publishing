# Database Book — Let's Build Outline (All Chapters)
## June 16, 2026

> Every Let's Build activity uses the **Grading Database** (GD) as the guided-practice project.
> Each chapter's Lab transfers the same skills to the **PetVax Veterinary Clinic**.

---

## Chapter 1: Introduction to the Course

**Title:** Building Your Foundation — Orientation, Not Building Yet

**Goal:** Preview the Grading Database project; understand the scope, evolution, and purpose before any construction begins.

**Time:** ~45–60 minutes (reading + reflection, no hands-on database work)

**Tools:** Google Docs (thinking workbook); no software installation needed yet

### Steps

1. **Project Purpose Check** — Explain what the Grading Database does and why it's a good teaching case (mirrors real business tracking systems).
2. **System Question List** — Write 5+ questions the database should answer (e.g., average score, attendance percentage, missing scores).
3. **Entity Preview** — Review the ERD preview diagram and identify the main entities (STUDENT, DELIVERABLE, STUDENT_GRADE, etc.).
4. **Project Evolution Summary** — Distinguish Phase 1 (Foundation: tables, queries, forms) from Phase 2 (Integration and Analysis: macros, DBA, BI).
5. **Transfer Reflection** — Explain why PetVax matters alongside the Grading Database (different domain, same relational principles).
6. **Role Reflection** — Identify which professional roles feel familiar vs. unfamiliar: data architect, SQL analyst, DBA, business analyst, communicator.
7. **Digital Companion Check** — Locate the course repository, verify access to all tools and files needed.

**What Students Do:** Reflect and write; think through system logic before building anything.

---

## Chapter 2: MIS and BITM

**Title:** Course as a System — Information and Decision-Making Framework

**Goal:** Build the logic of the Grading Database as a system before writing any code; connect questions → data → KPIs → decisions.

**Time:** 45–60 minutes (structured reflection and writing; no database coding)

**Tools:** Google Doc (thinking workbook)

### Steps

1. **Questions That Lead to Decisions** — Identify 6–8 business questions a course needs to answer; classify each as Track (important) or Skip (nice-to-have).
2. **Match Questions to Decisions** — For each tracked question, link it to the specific decision it supports (e.g., "What is the average quiz score?" → "Should I review quiz material?").
3. **From Questions to Data** — Identify what records the course must capture for each question; map each to the process that creates those records.
4. **Identify Outside Knowledge** — What external facts help interpret the data? (Grading scale, passing threshold = 60, historical patterns of improvement).
5. **Turn Goals into KPIs** — Convert each business question into a measurable KPI: average quiz score, missing deliverables count, attendance rate.
6. **DIKW Ladder** — Climb from Data → Information → Knowledge → Wisdom for one KPI of your choice.
7. **R.E.A.D. Framework** — Map that same KPI through Representation, Expression, Association, and Decision-Making stages.
8. **Stakeholders and Information Behavior** — Identify who needs what information (instructor, students, advisors, dean); trace how each seeks and uses it.
9. **Data Quality Check** — Spot data-quality problems in informal grade notes (approximations, ambiguous IDs, missing values, inconsistent dates); name the violated dimension (accuracy, completeness, consistency, timeliness).

**What Students Do:** Think through information logic; write short answers connecting each concept; practice naming data-quality dimensions from real examples.

---

## Chapter 3: What is Data?

**Title:** Data Fundamentals with Google Sheets — Spreadsheet as Practice Database

**Goal:** Build the Grading Database in Google Sheets; deliberately stress it until spreadsheet limits become visible; understand why databases are necessary.

**Time:** ~60 minutes

**Tools:** Google Sheets

### Steps

1. **Create Workbook** — Set up 3 sheets: `GRADEBOOK`, `GRADE_WEIGHT`, `DATA_DICTIONARY`.
2. **Define Structure** — Add headers before entering any data: RecordID, StudentID, FirstName, LastName, Email, Birthday, DeliverableType, DeliverableNumber, DueDate, Topic, Score.
3. **Build Data Dictionary** — Document FieldName, Sheet, Meaning, IntendedKind (Nominal/Ordinal/Interval/Ratio), and WhyItMatters for every field.
4. **Classify Fields by Measurement Level** — Label each field as Nominal, Ordinal, Interval, or Ratio (NOIR).
5. **Enter Sample Data** — Add 7 grade records and 4 grading-category rows.
6. **Add Metadata, Validation, Formatting** — Freeze headers, create filters, format dates/numbers, add dropdown validation on DeliverableType, add score range rule (0–100).
7. **Represent Missing Values Carefully** — Distinguish NULL (no data), 0 (zero score), "" (empty string), and " " (space); understand why each means something different.

**What Students Do:** Build a small working spreadsheet; add metadata and validation rules; practice naming data types and measurement levels; experience where spreadsheets start to break.

---

## Chapter 4: Databases

**Title:** First Database in Microsoft Access — Flat Table, Forms, Queries, Reports

**Goal:** Build a small grading database in Access with two tables, primary key, validation rules, forms, single-table queries, a join query, and reports.

**Time:** ~90 minutes

**Tools:** Microsoft Access (Desktop DBMS)

### Steps

1. **Create Database File** — `LB04-GradingDatabase-YourName.accdb`.
2. **Build GRADEBOOK Table** — 11 fields: RecordID (AutoNumber PK), StudentID (Short Text), FirstName, LastName, Email, Birthday, DeliverableType, DeliverableNumber, DueDate, Topic, Score.
3. **Set Primary Key** — On RecordID.
4. **Add Validation Rules** — Score between 0–100; Email must contain "@" and "."; DeliverableType must be Quiz, Homework, Exam, or Project.
5. **Make Key Fields Required** — StudentID, FirstName, LastName, DeliverableType, DeliverableNumber, DueDate, Score.
6. **Enter Starter Records** — 6 grade records across different students and deliverable types.
7. **Build GRADE_WEIGHT Table** — 4 fields: DeliverableType (PK), ItemCount, CategoryWeight, WeightPerItem; enter 4 category rows (Quiz, Homework, Exam, Project).
8. **Create Data-Entry Form** — `frmGRADEBOOK`; use it to add one new record (Daniel Kim, Project, 89).
9. **Build 5 Saved Queries**: `qryQuizRecords` (filter by Quiz), `qryLowScores` (< 80), `qryScoresDescending` (ORDER BY Score DESC), `qryAverageScoreByType` (GROUP BY with AVG), `qryGradebookWithWeights` (INNER JOIN GRADEBOOK + GRADE_WEIGHT).
10. **Create 2 Reports** — `rptLowScores` and `rptAverageScoreByType`.
11. **Test Validation** — Try entering Score = 150; confirm the DBMS rejects it (unlike a spreadsheet).

**What Students Do:** Design tables, set constraints, enter data, create forms, build queries in Design grid, generate reports; see how a DBMS enforces rules a spreadsheet would silently accept.

---

## Chapter 5: SQL

**Title:** Querying a Normalized Database with SQL — Multi-Table Joins, Aggregation, Subqueries, Views

**Goal:** Write SQL queries against the fully normalized 7-table Grading Database; move from single-table to multi-table queries with JOINs.

**Time:** ~60 minutes

**Tools:** SQLite (sqliteonline.com or DB Browser for SQLite) or Supabase PostgreSQL

### Steps

1. **Load the Normalized Grading Database** — Run the setup script (`ch05-lb-setup-advanced-2026-06-16.sql`) to create all 7 tables with sample data.
2. **Verify Load** — Check row counts: 5 students, 6 deliverables, 10 grades.
3. **First JOIN** — List all students and their grades: `SELECT ... FROM STUDENT INNER JOIN STUDENT_GRADE ... INNER JOIN DELIVERABLE ... ORDER BY`.
4. **GROUP BY with JOIN** — Calculate average score for each student: `AVG(Score)`, `GROUP BY StudentID`.
5. **WHERE with JOIN** — Find students who scored below 80 (filter applied after the join).
6. **COUNT with GROUP BY** — Count submissions per deliverable using LEFT JOIN to include deliverables with zero submissions.
7. **Subquery Challenge** — Find scores above the overall average using a nested `SELECT` in the `WHERE` clause.
8. **CREATE VIEW** — Build a reusable `V_StudentGradeReport` view combining student names, deliverable details, and scores; query it like a table.

**What Students Do:** Write SELECT, JOIN, GROUP BY, aggregate functions, subqueries; understand why JOINs are the foundation of relational querying; practice table aliases.

---

## Chapter 6: Relational Model

**Title:** Extending to the Full Relational Grading Database — 7 Tables, Relationships, Enforced Integrity

**Goal:** Extend the Access database to the complete 7-table relational schema; draw relationships; enforce referential integrity; write multi-table join queries.

**Time:** ~90 minutes

**Tools:** Microsoft Access

### Steps

1. **Start with 3-Table Foundation** — Use STUDENT, DELIVERABLE, STUDENT_GRADE from Chapter 4 or load the starter file.
2. **Seed DELIVERABLE + STUDENT_GRADE** — Add 5 deliverables and 8 grade records.
3. **Add ASSIGNMENT_TYPE Table** — AssignmentType (PK), Quantity, PointsPerType, Weight, WeightPerItem; enter 4 category rows.
4. **Add SCHEDULE Table** — ClassNum (PK), Week, ClassDate, Topic, Format; enter 4 class meetings.
5. **Add ATTENDANCE Junction Table** — AttendanceID (PK AutoNumber), ClassNum (FK), StudentID (FK), Attended (Yes/No); enter 16 rows (4 classes × 4 students).
6. **Add GRADE_SCALE Lookup** — LetterGrade (PK), MinScore, MaxScore; enter 5 bands (A=90–100, B=80–89, C=70–79, D=60–69, F=0–59).
7. **Draw Relationships** — Open Relationships window; create 5 relationships (STUDENT→STUDENT_GRADE, DELIVERABLE→STUDENT_GRADE, ASSIGNMENT_TYPE→DELIVERABLE, SCHEDULE→ATTENDANCE, STUDENT→ATTENDANCE); check "Enforce Referential Integrity" on all.
8. **Test Referential Integrity** — Try inserting orphan records (nonexistent ClassNum, invalid StudentID, invalid AssignmentType); confirm rejection.
9. **Query 1: Weighted Contribution** — 4-table join (STUDENT + STUDENT_GRADE + DELIVERABLE + ASSIGNMENT_TYPE) calculating Score × WeightPerItem.
10. **Query 2: Attendance Summary** — LEFT JOIN STUDENT + ATTENDANCE; count classes attended per student; keep students with zero attendance.
11. **Query 3: Missing Grades Anti-Join** — CROSS JOIN students × deliverables; LEFT JOIN actual grades; find NULL scores to surface unsubmitted work.

**What Students Do:** Create junction tables; define relationships visually; understand 1-to-many cardinality; test referential integrity barriers; write complex multi-table joins; distinguish INNER/LEFT/CROSS joins by business need.

---

## Chapter 7: Normalization

**Title:** Normalizing a Flat Table to 1NF/2NF/3NF — Diagnosis, Design, Migration, Queries

**Goal:** Take a denormalized flat grading table; diagnose redundancy and anomalies; design normalized tables; migrate data with append queries; rebuild the original report with a multi-table join.

**Time:** ~75–90 minutes

**Tools:** Microsoft Access, SQL View

### Steps

1. **Load GRADE_FLAT** — 25 rows mixing student, deliverable, and score facts in every row (denormalized).
2. **Diagnose Redundancy** — Identify which facts repeat and where they belong: student names repeated in every grade row → STUDENT table; category rules in every deliverable row → ASSIGNMENT_TYPE table; due dates in every student row → DELIVERABLE table; scores alone → STUDENT_GRADE table.
3. **Check Data Quality Before Migration** — Confirm StudentID always maps to same email/name; AssignmentType always has same weight; deliverable always has same due date.
4. **Create 4 Empty Normalized Tables** — STUDENT, ASSIGNMENT_TYPE, DELIVERABLE, STUDENT_GRADE with proper field types, PKs, and required fields.
5. **Extract STUDENT** — Append query: `SELECT DISTINCT StudentID, FirstName, LastName, Email FROM GRADE_FLAT`; verify one row per unique student.
6. **Extract ASSIGNMENT_TYPE** — Append query: `SELECT DISTINCT AssignmentType, PointsPerOne, Weight FROM GRADE_FLAT`; verify one row per category.
7. **Create DELIVERABLE** — Append query with DISTINCT on (AssignmentType, DeliverableNumber, DueDate, Topic); let Access generate DeliverableID as AutoNumber.
8. **Load STUDENT_GRADE** — Append query with JOIN to look up DeliverableID from DELIVERABLE table, inserting (GradeID, StudentID, DeliverableID, Score).
9. **Draw Relationships** — Create 3 relationship pairs in Access Relationships window; enforce referential integrity on all.
10. **Test Referential Integrity** — Attempt to insert bad values; confirm database refuses them.
11. **Rebuild the Original Report** — Write a 4-table INNER JOIN query that reconstructs the flat GRADE_FLAT view from normalized tables.
12. **Midterm Review** — Complete schema checklist (PKs, FKs, no repeating columns, no partial/transitive dependencies); build query bank; create concept map; reflect on why normalization improves reliability.

**What Students Do:** Diagnose anomalies in flat data; write append queries to migrate data; handle foreign-key lookups in SQL; verify data quality before/after; understand update/insert/delete anomalies and how normalization fixes them.

---

## Chapter 8: Midterm Review

**Title:** Midterm Review Lab — Schema Checklist, Query Bank, Concept Map, Reflection

**Goal:** Consolidate Chapters 1–7 knowledge into one unified framework; verify ability to read and query the normalized Grading Database; connect technical design to managerial insight.

**Time:** ~90 minutes

**Tools:** Access, SQL, text editor, Lucidchart or paper

### Steps

**Part A — Schema Review Checklist:** Verify every table has a PK; every FK is defined; no repeating columns; no partial or transitive dependencies; 1NF, 2NF, and 3NF are met.

**Part B — Query Bank Review:** Rebuild or collect queries that answer the business questions from Chapter 1; annotate each with the business question it answers, SQL concepts used, and which chapter introduced those concepts.

**Part C — Concept Map:** Create a one-page diagram connecting major ideas (data, information, database, table, PK, FK, relational model, normalization, SQL, anomaly); include concrete examples from the Grading Database.

**Part D — Practice Explanation:** Write short paragraphs answering: Why is a PK different from an ordinary field? Why did flat tables become a problem? Why is normalization useful even though it adds tables? How does SQL help turn data into business answers? What is the business cost of sloppy design?

**Part E — Optional Peer Review:** Exchange databases/diagrams with a classmate; give feedback on normalization issues, missing relationships, naming problems, or unclear queries.

**What Students Do:** Review their own work; verify it meets the rules of relational design; practice explaining normalization and SQL in their own words; begin recognizing patterns (1:many, many:many, lookup tables).

---

## Chapter 9: Database Design and ER Modeling

**Title:** Database Design — Visual ERD, Mermaid Code, SQL DDL (Conceptual → Physical)

**Goal:** Translate business rules into a visual ER diagram; code it as a Mermaid diagram; write SQL CREATE TABLE statements with constraints.

**Time:** ~60 minutes

**Tools:** Lucidchart (visual ERD), Mermaid (diagram-as-code), SQLite or PostgreSQL (DDL verification)

### Steps

1. **Identify 7 Business Entities** — STUDENT, DELIVERABLE, STUDENT_GRADE, ASSIGNMENT_TYPE, SCHEDULE, ATTENDANCE, GRADE_SCALE and their attributes.
2. **Draw ERD in Lucidchart** — Add entity boxes with PKs marked; draw relationships using Crow's Foot notation for cardinality (1, many) and optionality (mandatory, optional).
3. **Code ERD in Mermaid** — Write diagram-as-code showing all 7 tables, attributes with PK/FK labels, and relationships with cardinality notation.
4. **Write SQL DDL** — CREATE TABLE statements for STUDENT (StudentID PK, FirstName, LastName, Email UNIQUE, Birthday), DELIVERABLE (DeliverableID PK, Type, Number, DueDate, Topic), STUDENT_GRADE (GradeID PK, StudentID FK, DeliverableID FK, Score CHECK 0–100, UNIQUE on StudentID+DeliverableID).
5. **Add Referential Integrity Actions** — ON DELETE RESTRICT (prevent accidental orphaning) or ON DELETE CASCADE where appropriate.
6. **Verify Design Against Business Rules** — Each relationship enforces a rule; no orphan records possible; the schema naturally prevents invalid states.

**What Students Do:** Translate natural language rules into formal entity models; learn three design levels (conceptual, logical, physical); practice using professional tools; understand how constraints prevent data corruption at the point of entry.

---

## Chapter 10: Advanced SQL for Business Analysis

**Title:** Advanced SQL for Business Analysis — Diagnostic Queries, CTEs, Views, Window Functions, Safe Updates

**Goal:** Write sophisticated SQL that moves beyond basic joins into diagnostic, analytical, and reporting pipelines; practice safe modification practices.

**Time:** ~90 minutes

**Tools:** SQLite (online or DB Browser) or PostgreSQL/Supabase

### Steps

1. **Map the Grading Database ERD** — In Lucidchart with Crow's Foot notation; identify 3 main relational pathways.
2. **Diagnostic Query 1** — Find invalid scores outside the 0–100 range (early detection of data corruption).
3. **Diagnostic Query 2** — Find duplicate grades (same student, same deliverable); check for referential integrity violations.
4. **CTE Pipeline 1: Weighted Final Grades** — CategoryAverages CTE → WeightedGrades CTE → FlaggedStudents CTE with letter grade (A/B/C/D/F) and status flag (At Risk / Needs Attention / On Track); ORDER BY grade ASC.
5. **Create Reusable VIEW** — `StudentPerformanceDashboard` (student name, average score, submission count, attendance rate, status flag); query it with WHERE filters.
6. **Window Functions** — Rank students by average without collapsing detail rows (every grade shows StudentAverage and ClassRank alongside it); understand PARTITION BY vs. GROUP BY.
7. **Safe UPDATE Workflow** — Verify before modifying, wrap in transaction, verify after, COMMIT or ROLLBACK (e.g., add 2 bonus points to homework, capped at 100).

**What Students Do:** Write WITH clauses, complex multi-stage CTEs, window functions (RANK, AVG OVER PARTITION BY), transactions; understand how CTEs make complex logic readable; practice defensive SQL (diagnostic first, modify second).

---

## Chapter 11: Database Administration

**Title:** Applying DBA Practices to the Grading Database — Security, Backup, Integrity, Performance

**Goal:** Shift from building queries to managing the database as a production system; practice administration, security, backup/recovery, integrity checks, and performance tuning.

**Time:** ~90 minutes

**Tools:** Microsoft Access, SQLite, or PostgreSQL

### Steps

**Part A — Define Roles and Permissions:** Create three roles (Instructor, Advisor, Admin) with different access rights: Instructor can SELECT, INSERT, UPDATE grades; Advisor can SELECT only on student progress; Admin has full control. Document as a written policy.

**Part B — Backup and Recovery Plan:** Write a 1-page plan answering: backup frequency, backup type (full/incremental), storage location, retention period, RTO (Recovery Time Objective), RPO (Recovery Point Objective). Perform a backup drill: close DB, copy to backup folder, verify the copy opens.

**Part C — Recovery Scenario:** Simulate "faculty member accidentally deleted all grades for one section." Identify affected tables, confirm last good backup, restore to safe location, compare with damaged version, document what could and could not be recovered.

**Part D — Integrity Checks:** Open Relationships window, confirm all FKs are present, turn on Enforce Referential Integrity, review Cascade options. Run Compact and Repair. If using SQL: `PRAGMA foreign_keys = ON; PRAGMA integrity_check;`.

**Part E — Performance Tuning:** Choose one frequently-used field (e.g., StudentID in STUDENT_GRADE); create an index; test query performance before and after; document whether the index improved query speed enough to justify keeping it.

**What Students Do:** Document policy; plan backup/recovery; practice administration tasks; understand the business cost of downtime or data loss; learn that database work extends beyond queries into operations and governance.

---

## Chapter 12: Business Intelligence

**Title:** Business Intelligence for the Grading Department — Analytical Layer, KPI Reports, Dashboards

**Goal:** Build a BI layer on top of the Grading Database; shift from operational (storing data) to analytical (using data for decisions).

**Time:** ~90 minutes

**Tools:** Access (queries/reports), SQLite, or Power BI (optional)

### Steps

**Part A — Define BI Questions:** Choose 4–5 management questions: average score by deliverable type? at-risk student count? missing submission list? attendance-performance correlation?

**Part B — Create Analytical VIEW:** Build `GradeBI` combining STUDENT + STUDENT_GRADE + DELIVERABLE with calculated ScoreStatus (Missing / At Risk / Satisfactory / Strong) based on thresholds.

**Part C — Build 3 Core BI Reports:**
- **Report 1: Deliverable Performance** — Average score, range, submission count per deliverable (identifies easy vs. hard assignments).
- **Report 2: At-Risk Students** — Students averaging below 70 (targets intervention).
- **Report 3: Missing Submissions** — CROSS JOIN students × deliverables + anti-join to find nulls (shows follow-up needs).

**Part D — Add Attendance-Performance VIEW:** Show for each student: classes attended, class count, attendance rate, average score, status.

**Part E — Translate to Managerial Output:** Choose one output format (Access report, KPI sheet, or decision memo); answer: What does the data show? Why does it matter? What should the department do next? Use plain language, not jargon.

**What Students Do:** Shift mindset from CRUD operations to analytical queries; build views that encapsulate business logic once and reuse it; practice presenting technical findings to non-technical stakeholders.

---

## Chapter 13: Advanced Database Techniques

**Title:** Hardening the Grading Database — Indexes, Constraints, Triggers, Audit Trails, Transactions

**Goal:** Strengthen the database for production use; implement advanced controls to ensure reliability, auditability, and performance.

**Time:** ~90 minutes

**Tools:** SQLite, PostgreSQL, or Access (with trigger limitations)

### Steps

**Part A — Identify Risks:** List update/insert/delete anomalies, slow queries, duplicate grade records, invalid scores, partial updates without audit, hidden changes; rate each risk as present or absent.

**Part B — Add Indexes:** Create indexes on StudentID (in STUDENT_GRADE), DeliverableID (in STUDENT_GRADE), and AttendanceID (in ATTENDANCE); document why each improves performance.

**Part C — Add Data-Quality Constraints:**
- `ALTER TABLE STUDENT_GRADE ADD CONSTRAINT chk_score_range CHECK (Score BETWEEN 0 AND 100)`
- `ALTER TABLE STUDENT ADD CONSTRAINT uq_email UNIQUE (Email)`
- `ALTER TABLE STUDENT_GRADE ADD CONSTRAINT uq_student_deliverable UNIQUE (StudentID, DeliverableID)`

**Part D — Create Audit Trail:** Build GRADE_AUDIT table (AuditID, GradeID, OldScore, NewScore, ChangedAt, ChangeReason); add trigger that fires on UPDATE to log every change.

**Part E — Use Transactions:** Wrap a grade correction in `BEGIN; UPDATE; UPDATE (audit log); COMMIT;` — show ROLLBACK if verification fails.

**Part F — Build Analytical Object:** `StudentProgress` view with window functions showing running average over time.

**What Students Do:** Write ALTER TABLE with constraints; create triggers (or document alternatives); use transactions for multi-step changes; understand how advanced features prevent bugs before they happen.

---

## Chapter 14: Power BI

**Title:** Power BI Dashboard with the Grading Database — Data Visualization and Reporting

**Goal:** Build an interactive multi-page Power BI dashboard showing course performance.

**Time:** ~60–90 minutes

**Tools:** Power BI Desktop (free); optional: Power BI Service (web)

### Steps

1. **Get Data** — Connect Power BI to the GRADECENTER database or Excel export (Students, Courses, Enrollments, Grades tables).
2. **Clean with Power Query** — Remove blank score rows, confirm data types (Score = Decimal, StudentID = Whole Number).
3. **Review Data Model** — Verify relationships exist (Students→Enrollments→Grades, Courses→Enrollments); adjust if needed.
4. **Create DAX Measures** — Average Score, Total Students (DISTINCTCOUNT), Pass Rate (students with Score ≥ 60).
5. **Build Page 1 — "Course Overview"** — Card visuals (Average Score, Pass Rate), Bar Chart (CourseName vs. Average Score), Slicer (Semester filter).
6. **Build Page 2 — "Student Detail"** — Table (StudentName, CourseName, Score, LetterGrade), Slicer (CourseName), Card (Total Students).
7. **Publish (Optional)** — Save as .pbix file; optionally publish to Power BI Service and share URL.

**What Students Do:** Connect data, transform with Power Query, create measures with DAX, design interactive reports, publish for stakeholder use; move from raw queries to polished visualization.

---

## Chapter 15: Business Strategy and IS

**Title:** Strategic SQL for the Grading Database — Trend Analysis, Assessment Quality, Early Warning, Scenario Testing

**Goal:** Write SQL that answers high-level strategic questions; move from operational reporting to predictive/prescriptive analytics.

**Time:** ~90 minutes

**Tools:** SQLite with window functions, PostgreSQL, or Access with workarounds

### Steps

1. **Trend Analysis** — Compute running averages per student using window functions: `AVG OVER PARTITION BY StudentID ORDER BY DeliverableID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`; identify declining students for intervention.
2. **Assessment Quality** — Calculate median, quartiles, and range for each deliverable; identify discriminating assignments (large range) vs. easy assignments (small range); determine which assessments effectively separate high from low performers.
3. **Early Warning** — Find students scoring below 75 on the first quiz (research shows early quiz scores predict final grades); flag for early intervention.
4. **Scenario Testing** — "What if we drop the lowest quiz?" Compute quiz average with and without dropping the lowest score; test whether the policy benefits or harms any group unfairly.
5. **Extension** — Running totals, anomaly detection, predictive flags (e.g., "this student's grade trajectory suggests F unless immediate intervention").

**What Students Do:** Write advanced window functions, CTEs for multi-stage analysis, scenario simulations; think statistically about what data reveals; connect database queries to strategic decisions (curriculum design, early intervention, policy evaluation).

---

## Chapter 16: Final Integration

**Title:** Final Project Submission and Course Integration — Package the Full Grading Database

**Goal:** Submit a complete, professional Grading Database package demonstrating all course skills.

**Time:** 3–4 hours (final project capstone)

**Tools:** Access, SQL, Lucidchart, PDF editor

### Steps

**Part A — Prepare Database for Submission:** Ensure tables are clearly named; relationships are defined and enforced; grading data is populated; test artifacts are removed.

**Part B — Core Tasks (13 total):**
1. **Task 1:** ERD in Lucidchart (exported as image).
2. **Task 2:** SQL table creation code (DDL for the full schema).
3. **Task 3:** Attendance query to date (classes attended, percentage, weighted points).
4. **Task 4:** Append attendance scores into STUDENT_GRADE (add to grading pool).
5. **Task 5:** Deliverable summary query (performance by type).
6. **Task 6:** Final grade to date (current weighted final grade calculation).
7. **Task 7:** Letter grade mapping (lookup table conversion).
8. **Task 8:** Minimum final grade (worst-case scenario: all remaining work receives 0).
9. **Task 9:** Maximum final grade (best-case scenario: all remaining work receives 100).
10. **Task 10:** Macros (2+ automation examples: auto-calculate grades, auto-generate report).
11. **Task 11:** DBA functions (explain 3 admin practices applied to this database).
12. **Task 12:** BI functions (describe 3 business intelligence uses).
13. **Task 13:** Final reflection (what you learned about design, SQL, automation, analytics, and systems thinking).

**Part C — Build Queries in Stable Sequence:** Use saved queries as building blocks instead of one monolithic formula.

**Part D — Assemble Portfolio:** PDF with ERD image, SQL code (as text, not image), result tables, screenshots, and clear explanations for each task.

**What Students Do:** Synthesize all course concepts into one coherent system; communicate technical work professionally; demonstrate mastery across design, implementation, querying, automation, administration, and analytics.

---

## Chapter 17: Conclusion

**Title:** Course Synthesis — Connecting the Whole System (Lifecycle Reflection, Trade-Off Analysis, Systems Thinking)

**Goal:** Reflect on how relational design, SQL, governance, and analytics combine into one information system; connect technical decisions to organizational consequences.

**Time:** ~45–60 minutes

**Tools:** Text editor, presentation tools (optional)

### Steps

**Activity 1 — Trace System Lifecycle:** List the core entities and relationships in the Grading Database; explain how normalization improved reliability; identify 2 SQL queries that turned stored data into actionable information; describe 1 DBA or governance practice that made the system trustworthy.

**Activity 2 — Design Trade-Offs:** Choose 1 design decision (e.g., why StudentID is separate from RecordID; why grades live in STUDENT_GRADE not STUDENT; why GRADE_SCALE is a lookup table); explain what problem it solved, what risks would appear if ignored, and how it connects to an organizational consequence (fairness, accountability, traceability).

**Reflection Questions:**
- Which concept most changed your thinking?
- Where is the strongest link between technical design and managerial judgment?
- Which database skill feels most durable for your future work?

**Extension:** Write a brief paragraph explaining: databases are designed environments for decision-making, not neutral containers of data.

**What Students Do:** Synthesize the course arc from data → tables → relationships → queries → decisions; reflect on systems thinking as a durable professional skill; recognize that every database design choice has organizational consequences.

---

*Generated: 2026-06-16 · Source: `files/source/chapters/` and `BITM330-Book-draft/chapter-drafts/`*
