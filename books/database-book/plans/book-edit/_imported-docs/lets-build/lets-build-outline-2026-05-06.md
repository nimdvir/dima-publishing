# Let's Build — Chapter-by-Chapter Outline
## *Using Data to Drive Business Performance: Databases and Management Information Systems*
### Updated: May 6, 2026

> **Running Project:** The Grading Database — a college course-management system tracking students, courses, sections, assignments, and grades. Each chapter's Let's Build activity advances the same project, so students see the full arc from raw idea to working, analyzed system.

---

## Chapter 1 — Let's Build: Meet the Project

### Overview
Before writing a single line of SQL or opening any tool, students need to understand *what* they are building and *why*. This introduction frames the Grading Database as a real organizational problem — a department that needs to track students, courses, sections, instructors, assignments, and grades — and uses it to preview every major skill the course will develop.

### What Students Do
- Read a short business scenario: a college department manages grades in spreadsheets, emails, and paper gradebooks. Data is inconsistent, reports take hours, and instructors disagree on who passed.
- Sketch (by hand or in a tool of their choice) a simple diagram showing the entities involved: **Student, Course, Section, Assignment, Grade, Instructor**.
- Write 3–5 business questions the department needs to answer (e.g., *"Which students failed more than two assignments this semester?"*).
- Review the Chapter-by-Chapter roadmap and annotate which chapter will answer each of their questions.

### Deliverable
A one-page "Project Charter" — a short description of the business problem, a list of entities, and a set of business questions the Grading Database will eventually answer.

### Why This Matters
Students who understand the destination learn the tools with purpose. This activity creates a personal stake in the project before any technical work begins.

---

## Chapter 2 — Let's Build: Mapping Information to Decisions

### Overview
Before touching data or tables, students apply the conceptual frameworks from Chapter 2 — DIKW, Input-Process-Output, and the five-component model — directly to the Grading Database scenario. This is a thinking exercise, not a technical one.

### What Students Do
- **DIKW Mapping:** Take five raw data points from the Grading Database scenario (e.g., *"a student submitted Assignment 3 on October 5"*) and trace each one up the DIKW hierarchy to show what information, knowledge, and wisdom it could produce.
- **IPO Diagram:** Draw an Input-Process-Output diagram for the grading system — what goes in (attendance records, assignment submissions), what processes transform it (grade calculations, reports), and what comes out (GPA, performance alerts, advisor reports).
- **Five-Component Audit:** For the Grading Database system as described in Chapter 1, identify at least one example of each IS component: hardware, software, data, people, and processes.
- **Reflection:** Write a short paragraph answering — *"At what point does data about a student's grades become useful information for a manager?"*

### Deliverable
A completed DIKW mapping table, an IPO diagram, a five-component matrix, and the reflection paragraph.

### Why This Matters
Students who can place technical artifacts inside a conceptual model make better design and governance decisions later. This exercise builds the habit of asking "what decision does this data support?" before asking "how do I store it?"

---

## Chapter 3 — Let's Build: Data in Google Sheets — and Why It's Not Enough

### Overview
Students work entirely in Google Sheets to explore data types, data quality, and the fundamental limits of spreadsheets as a data management tool. The goal is not to learn Sheets — it is to diagnose what goes wrong at scale and understand why a database is the right next step.

### What Students Do

**Part A — Build the Flat Grading Sheet**
- Open a provided Google Sheets template (or build from scratch) with one flat table containing columns: `StudentID`, `StudentName`, `Email`, `CourseCode`, `CourseName`, `InstructorName`, `SectionNumber`, `AssignmentName`, `DueDate`, `SubmittedDate`, `Score`, `MaxScore`, `Grade`.
- Enter at least 15 rows of sample data manually, representing 3 students, 2 courses, and 3 assignments per course.

**Part B — Identify Data Types**
- For each column, classify the data type: text, number, date, boolean, or calculated.
- Identify which columns are *categorical* (finite set of values) vs. *continuous* (measured quantity).
- Flag any columns that mix types (e.g., grades stored as both "A" and "93%").

**Part C — Discover the Spreadsheet's Limits**
- **Update anomaly:** Change the instructor's name in one row. Notice that other rows still show the old name. How many rows would need to be updated in a real department?
- **Insertion anomaly:** Try to add a new course that has no students yet. Where does it go?
- **Deletion anomaly:** Delete all rows for one student. What other information is lost?
- **Scalability test:** Add a formula column for `PercentageScore`. Copy it down. Now imagine 500 rows — what breaks?

**Part D — Reflection**
- Answer in writing: *"What would you need to change about this spreadsheet design to make it reliable for 1,000 students and 50 courses?"*

### Deliverable
Annotated Google Sheet with typed column classifications + a written reflection identifying at least one of each anomaly type.

### Why This Matters
Students arrive at databases through need, not decree. Discovering the spreadsheet's failure modes firsthand makes the database's value proposition concrete and memorable.

---

## Chapter 4 — Let's Build: Your First Table in Microsoft Access

### Overview
Students move from the broken flat spreadsheet into Microsoft Access and build their first real database object: a single, well-structured table. They then create a query, a form, and a report — the four core Access objects — to see how a database separates data storage from data presentation.

### What Students Do

**Part A — Create the Students Table**
- Open Microsoft Access and create a new blank database named `GradingDB_Ch4.accdb`.
- In Design View, create a `Students` table with fields: `StudentID` (AutoNumber, Primary Key), `FirstName` (Short Text), `LastName` (Short Text), `Email` (Short Text), `EnrollmentDate` (Date/Time), `GPA` (Number, Double).
- Set appropriate field sizes, required flags, and input masks where relevant.
- Switch to Datasheet View and enter 8–10 sample student records.

**Part B — Create a Query**
- Build a Select Query that returns all students with a GPA above 3.0.
- Add a calculated field: `FullName: [FirstName] & " " & [LastName]`.
- Sort results by `LastName` ascending.

**Part C — Create a Form**
- Use the Form Wizard to build a data-entry form for the `Students` table.
- Modify the form in Design View: add a title label, adjust field order, and apply a theme.
- Use the form to add two new student records.

**Part D — Create a Report**
- Use the Report Wizard to generate a summary report grouped by `EnrollmentDate` (by year).
- Add a calculated footer showing the average GPA per group.
- Export the report as a PDF.

### Deliverable
`GradingDB_Ch4.accdb` file with the completed table, query, form, and report; plus the exported PDF report.

### Why This Matters
Access introduces students to all four database object types in a visual, low-barrier environment. Building all four objects from one table shows the separation of concerns — data, queries, interface, and output — that will persist through the entire course.

---

## Chapter 5 — Let's Build: Writing SQL for the Grading Database

### Overview
Students write their first real SQL code — using both SQLite (via DB Browser or a web tool) and Microsoft Access's SQL view — to create and populate the initial Grading Database. This is their first encounter with SQL as a language, not just a visual tool.

### What Students Do

**Part A — SQLite: CREATE and INSERT**
- Open DB Browser for SQLite (or use an online SQLite tool).
- Write and execute `CREATE TABLE` statements for two tables: `Students` and `Assignments`.
- Include appropriate data types (`INTEGER`, `TEXT`, `REAL`, `DATE`), primary keys, and `NOT NULL` constraints.
- Write `INSERT INTO` statements to populate each table with at least 5 rows.

**Part B — SQLite: SELECT Queries**
- Write the following queries and record the output:
  1. All students sorted by last name
  2. All assignments with a due date after a specific date
  3. Students whose email contains a specific domain
  4. The assignment with the highest `MaxScore`

**Part C — Microsoft Access SQL View**
- Open `GradingDB_Ch4.accdb` from Chapter 4.
- Switch any existing query to SQL View and read the SQL Access generated automatically.
- Manually write a new SQL query in Access's SQL View: select all students enrolled after a specific date, sorted by GPA descending.
- Compare the SQL syntax between SQLite and Access — note similarities and differences.

**Part D — Reflection**
- Answer: *"What is the advantage of writing SQL directly rather than using the Access query designer?"*

### Deliverable
A `.sql` file with all CREATE and INSERT statements; screenshots of query results from both tools; the Access query saved in SQL View; and the reflection.

### Why This Matters
Students discover that SQL is portable — the same logic runs in SQLite and Access. This portability is a core professional skill. Writing SQL from scratch, rather than generating it through a GUI, builds real fluency.

---

## Chapter 6 — Let's Build: Splitting the Flat Table into Related Tables

### Overview
Students return to their single flat `Students` table and confront its limits when courses, sections, and assignments are added. They redesign the database by splitting data across multiple related tables and enforcing the relationships in both Access and SQLite.

### What Students Do

**Part A — Diagnose the Problem**
- Add a `Courses` column to the existing `Students` table in Access. Enter the same course name for multiple students. Count the number of duplicate entries that result.
- Identify: which fields in the current single table actually describe a *Course* rather than a *Student*?

**Part B — Design the Multi-Table Schema**
- Sketch (on paper or in a drawing tool) a schema with four tables: `Students`, `Courses`, `Sections`, `Enrollments`.
- Label each table's primary key and the foreign keys that connect them.
- Identify the relationship type between each pair of tables (1:N or M:N).

**Part C — Build It in Access**
- Create the four tables in `GradingDB_Ch6.accdb` with correct field types and primary keys.
- Open the Relationships window and draw the foreign key links between tables.
- Enforce referential integrity on each relationship. Test it: try to add an enrollment for a student ID that does not exist.

**Part D — Build It in SQLite**
- Write `CREATE TABLE` statements for all four tables with `FOREIGN KEY` constraints.
- Use `PRAGMA foreign_keys = ON` to enable enforcement.
- Write an `INSERT` that would violate referential integrity and observe the error.

### Deliverable
`GradingDB_Ch6.accdb` with the full relational schema and Relationships diagram screenshot; the `.sql` file with all four CREATE TABLE statements; and a brief written explanation of why the flat design failed.

### Why This Matters
This is the central conceptual shift of the course. Students who build the multi-table schema themselves understand *why* normalization and relational design matter — not as abstract rules, but as solutions to problems they just created.

---

## Chapter 7 — Let's Build: Normalizing the Grading Database

### Overview
Students audit the Grading Database schema from Chapter 6 for normalization violations and systematically bring it to 3NF. They learn to recognize functional dependencies, partial dependencies, and transitive dependencies by finding and fixing them in their own work.

### What Students Do

**Part A — 1NF Audit**
- Review the current tables for multi-valued cells and repeating column groups (e.g., `Assignment1Score`, `Assignment2Score`, `Assignment3Score` in a single row).
- Fix any violations: split multi-valued cells into separate rows; move repeating columns into a new `AssignmentSubmissions` table.

**Part B — 2NF Audit**
- Identify any table with a composite primary key.
- Check whether every non-key attribute is fully dependent on the *entire* composite key.
- If a partial dependency exists (an attribute depends on only part of the key), move it to a separate table.

**Part C — 3NF Audit**
- Check all tables for transitive dependencies: non-key attributes that determine other non-key attributes (e.g., `InstructorID → InstructorName → InstructorOffice` all stored in the `Sections` table).
- Resolve each transitive dependency by creating a separate `Instructors` table.

**Part D — Final Schema Diagram**
- Draw the final normalized schema showing all tables, all primary keys, all foreign keys, and all relationship lines.
- Annotate each relationship with its type (1:N) and cardinality.
- Document any deliberate denormalization decisions and justify them.

### Deliverable
Updated `GradingDB_Ch7.accdb` or `.sql` file with the fully normalized schema; the annotated schema diagram; and a written normalization audit log identifying each violation found and how it was resolved.

### Why This Matters
Normalization is not just a theoretical exercise — it is the difference between a database that works at 20 rows and one that works at 20 million. Students who normalize their own design internalize the rules far more deeply than students who read about them.

---

## Chapter 8 — Let's Build: Midterm Review Lab

### Overview
No new tool or technique is introduced. This is a structured self-assessment and consolidation lab that prepares students for the midterm. Students revisit their own Grading Database work from Chapters 1–7 and evaluate it against course standards.

### What Students Do

**Part A — Schema Review Checklist**
- Open `GradingDB_Ch7.accdb` and complete a structured checklist:
  - [ ] All tables have a primary key
  - [ ] All foreign key relationships are enforced
  - [ ] No multi-valued cells exist in any table
  - [ ] No repeating column groups exist
  - [ ] No partial or transitive dependencies exist
  - [ ] All field names follow a consistent naming convention

**Part B — Query Bank**
- Write (or reuse) SQL queries that answer the five business questions defined in the Chapter 1 Project Charter.
- For each query, annotate what SQL concepts it uses and which chapter introduced that concept.

**Part C — Concept Map**
- Draw a concept map connecting the key terms from Chapters 1–7: data, information, database, table, primary key, foreign key, normalization, SQL, relational model, anomaly.
- Add one real example from the Grading Database next to each term.

**Part D — Peer Review (optional)**
- Exchange schemas with a classmate. Identify one normalization issue or one missing constraint in their design and write a brief review.

### Deliverable
Completed checklist, annotated query bank, concept map, and (if applicable) peer review notes.

---

## Chapter 9 — Let's Build: Advanced SQL on the Grading Database

### Overview
Students apply advanced SQL patterns — subqueries, CTEs, CASE expressions, window functions, and complex aggregations — to the fully normalized Grading Database. Every query is tied to a real business question a department chair, instructor, or advisor might actually ask.

### What Students Do

**Part A — Aggregation and Ranking**
- Write a query that calculates each student's average score across all assignments and ranks students within each section using a window function (`RANK()` or `ROW_NUMBER()`).
- Identify the top performer in each course section.

**Part B — CASE Expressions**
- Write a query that categorizes each student's final grade as `A`, `B`, `C`, `D`, or `F` using a `CASE` expression based on their percentage score.
- Add a second `CASE` column flagging students as `At Risk` if their average is below 70%.

**Part C — Subqueries and CTEs**
- Write a subquery that returns students whose average score is below the overall course average.
- Rewrite the same query as a CTE. Compare readability.
- Write a CTE that calculates submission rates (submitted assignments ÷ assigned assignments) per student per section.

**Part D — Missing Work Detection**
- Write a LEFT JOIN query that identifies students who have *no* submission record for a specific assignment (i.e., they were enrolled but did not submit).

### Deliverable
A `.sql` file with all queries, annotated with the business question each answers, plus screenshots or output tables showing results.

### Why This Matters
Advanced SQL is the professional skill gap. Most students learn SELECT/WHERE — fewer can write a CTE or detect missing records via LEFT JOIN. This lab closes that gap using data students already know.

---

## Chapter 10 — Let's Build: Designing the Grading Database ERD in Lucidchart

### Overview
Students step back from the working database and produce a formal, professional Entity-Relationship Diagram (ERD) using Lucidchart. This is the artifact a professional would deliver to a client or development team before any coding begins.

### What Students Do

**Part A — Set Up Lucidchart**
- Create a free Lucidchart account and open a new ERD template.
- Familiarize with the ERD shape library: entities, attributes, relationships, cardinality notations (crow's foot).

**Part B — Draw the Full ERD**
- Create entities for all tables in the normalized Grading Database: `Students`, `Instructors`, `Courses`, `Sections`, `Enrollments`, `Assignments`, `Submissions`.
- For each entity, add all attributes with data types noted.
- Mark primary keys (underlined) and foreign keys.
- Draw all relationships with correct crow's foot cardinality notation.

**Part C — Annotate Design Decisions**
- Add text notes to the diagram explaining at least three design decisions: *"Why does `Enrollments` exist as a junction table?"*, *"Why does `Sections` reference both `Courses` and `Instructors`?"*, etc.

**Part D — Business Requirements Traceability**
- Map each business question from the Chapter 1 Project Charter back to the ERD: *"To answer Question 3, we need a join between `Submissions` and `Assignments`."* Annotate the ERD with these traces.

### Deliverable
Exported Lucidchart ERD (PNG or PDF) with all entities, attributes, relationships, cardinality notations, and design decision annotations. A brief written summary of how the ERD reflects the business requirements.

### Why This Matters
Producing a professional ERD before implementation is standard practice. Students who can draw an ERD communicate design intent to developers, clients, and managers — regardless of which tool they eventually use to build it.

---

## Chapter 11 — Let's Build: Applying DBA Practices to the Grading Database

### Overview
Students play the role of the database administrator for the college department running the Grading Database. They implement user roles, set up a backup policy, simulate a recovery scenario, and run basic performance checks.

### What Students Do

**Part A — User Roles and Access Control (SQLite / Access)**
- Define three user roles for the Grading Database: `Instructor` (read own section data, update grades), `Advisor` (read all student data, no write access), `Admin` (full access).
- In Access, use query permissions or a documented policy to specify what each role can and cannot do.
- In SQLite or PostgreSQL (Supabase): write `CREATE USER`, `GRANT`, and `REVOKE` statements implementing each role.

**Part B — Backup and Recovery Plan**
- Write a one-page Backup and Recovery Plan for the Grading Database specifying:
  - Backup frequency (daily, weekly, semester)
  - Backup type (full vs. incremental)
  - Storage location and retention period
  - Recovery time objective (RTO) and recovery point objective (RPO)
- Export the Access database as a simulated backup. Re-import it and verify data integrity.

**Part C — Simulated Recovery Scenario**
- Given a scenario — *"A faculty member accidentally deleted all grade records for Section 03"* — walk through the recovery steps using the backup created in Part B.
- Document each step and estimate the data loss (what could not be recovered).

**Part D — Basic Performance Check**
- Run a query on the Grading Database that scans a large table (or simulate one with a CROSS JOIN generating many rows).
- Add an index on a frequently queried column (e.g., `StudentID` in the `Submissions` table).
- Re-run the query and note any difference. Discuss whether the index was worth adding.

### Deliverable
Written user roles policy, completed Backup and Recovery Plan, documented recovery walkthrough, and a brief performance comparison note.

---

## Chapter 12 — Let's Build: Business Intelligence for the Grading Department

### Overview
Students apply BI concepts to the Grading Database — building summary reports, identifying performance trends, and framing findings for a managerial audience. The focus shifts from *writing queries* to *communicating insight*.

### What Students Do

**Part A — KPI Dashboard Design**
- Define 4–5 KPIs a department chair would care about: *Average GPA by Section*, *Assignment Completion Rate*, *At-Risk Student Count*, *Grade Distribution by Course*, *Instructor Average Grade*.
- For each KPI, write the SQL query that produces it.

**Part B — Summary Report in Access**
- Build a formatted Access Report that shows: grade distribution by course, average score per assignment, and a list of at-risk students (average < 70%).
- Group the report by `CourseCode`, add calculated subtotals, and format for readability.

**Part C — Trend Analysis**
- Add a `Semester` field to the data model (or use sample data across two semesters).
- Write a query that compares average GPA per course across two semesters.
- Identify any courses where performance declined and frame a one-paragraph business recommendation for the department chair.

**Part D — Decision Memo**
- Write a one-page Decision Memo addressed to the department chair summarizing: what the data shows, what it means, and what action they should consider. No technical jargon — write for a non-technical manager.

### Deliverable
SQL query set for all KPIs, formatted Access report, trend comparison output, and the Decision Memo.

### Why This Matters
The transition from "query writer" to "insight communicator" is the most professionally valuable shift in the course. This lab forces students to frame data as a management tool, not a technical artifact.

---

## Chapter 13 — Let's Build: Advanced Database Techniques on the Grading Database

### Overview
Students apply four advanced techniques — indexing, views, stored procedures/queries, and triggers — to the Grading Database. Each technique is applied in context of a real operational need.

### What Students Do

**Part A — Indexing**
- Identify two columns in the Grading Database that are frequently used in WHERE clauses or JOIN conditions (e.g., `StudentID`, `SectionID`).
- Add indexes to those columns in SQLite using `CREATE INDEX`.
- Run a query with and without the index on a large synthetic dataset. Note the difference.

**Part B — Views**
- Create a view called `vw_StudentGradeSummary` that returns each student's name, course, section, and calculated average score.
- Create a second view `vw_AtRiskStudents` that uses the first view to filter students with average < 70%.
- Explain why a view is preferable to copying the same subquery into multiple reports.

**Part C — Saved Queries as Procedures (Access) / Stored Queries (SQLite)**
- In Access, create a parameterized query that accepts an `InstructorID` as a parameter and returns all grade records for that instructor's sections.
- Demonstrate the query being called with different parameter values.

**Part D — Triggers (SQLite)**
- Write an `AFTER INSERT` trigger on the `Submissions` table that automatically logs the insert event (timestamp and `StudentID`) to an `AuditLog` table.
- Test the trigger by inserting a new submission record and verifying the log entry was created.

### Deliverable
`.sql` files with all indexes, views, parameterized query definitions, and trigger code; screenshots or output demonstrating each working; brief written justification for each design choice.

---

## Chapter 14 — Let's Build: Power BI Dashboard from Microsoft Access

### Overview
Students connect Microsoft Power BI Desktop directly to their Access Grading Database and build an interactive management dashboard — no manual data export, no copy-paste. This lab closes the loop from database design all the way to visual reporting.

### What Students Do

**Part A — Connect Power BI to Access**
- Open Power BI Desktop and use *Get Data → Access Database* to connect to `GradingDB_Ch7.accdb` (or the most current version).
- Load the following tables into the Power BI data model: `Students`, `Courses`, `Sections`, `Enrollments`, `Assignments`, `Submissions`.
- Verify that Power BI has correctly detected the relationships between tables. Adjust in Model View if needed.

**Part B — Create Calculated Measures (DAX)**
- Write DAX measures for:
  - `Average Score = AVERAGE(Submissions[Score])`
  - `Completion Rate = DIVIDE(COUNTROWS(Submissions), COUNTROWS(Assignments))`
  - `At Risk Count = CALCULATE(COUNTROWS(Students), [Average Score] < 70)`

**Part C — Build the Dashboard**
- Page 1 — *Course Overview:* Card visuals for total students, average GPA, completion rate; bar chart of average score by course; slicer for semester/section.
- Page 2 — *At-Risk Students:* Table of at-risk students with name, course, and average score; conditional formatting to highlight scores below 70%; drill-through to individual student detail.
- Page 3 — *Assignment Performance:* Line chart showing average score per assignment over time; bar chart of assignment completion rate by section.

**Part D — Publish and Share (Optional)**
- If Power BI Service access is available, publish the report and share the link.
- Alternatively, export the report as a PDF and include it in the deliverable package.

### Deliverable
`.pbix` Power BI file with all three report pages, all DAX measures, and the live connection to the Access database. A brief written reflection on how Power BI changes the relationship between the database and the decision-maker.

### Why This Matters
Power BI is the dominant business reporting tool in most organizations that use Microsoft infrastructure. Students who can take a database they designed and built all the way to an interactive executive dashboard have a complete, demonstrable skill set.

---

## Chapter 15 — Let's Build: Strategic Reflection — Your Database as a Competitive Asset

### Overview
This is a conceptual and reflective capstone lab — no new tool is introduced. Students analyze the Grading Database system they have built through the lens of business strategy frameworks from Chapter 15.

### What Students Do

**Part A — Porter's Five Forces Analysis**
- Apply Porter's Five Forces to a hypothetical company that sells a database-driven service similar to the Grading Database (e.g., a commercial student information system vendor).
- Identify where data quality, system design, and BI capabilities create barriers to entry or switching costs.

**Part B — Value Chain Mapping**
- Map the Grading Database project onto the Value Chain framework.
- Identify which primary activities (operations, marketing, service) the database directly supports and which support activities (HR, IT infrastructure, procurement) it enables.

**Part C — IS Strategic Alignment Audit**
- Review the Grading Database design decisions made over the course.
- Write a one-page audit identifying: *"Which design decisions were strategically aligned with business needs?"* and *"Which technical choices might create strategic risk or lock-in?"*

**Part D — Capability Statement**
- Write a two-paragraph professional capability statement suitable for a resume or portfolio: *"In this course I designed and built a relational database system from requirements analysis through BI reporting. Here is what that demonstrates about my ability to contribute to organizational decision-making..."*

### Deliverable
Completed Porter's Five Forces analysis, Value Chain map, IS alignment audit, and the professional capability statement.

---

## Chapter 16 — Let's Build: Full-Cycle Portfolio Review

### Overview
Students assemble and present all Let's Build deliverables from Chapters 1–15 as a coherent portfolio that tells the story of the Grading Database project from concept to strategic asset.

### What Students Do

**Part A — Portfolio Assembly**
- Collect all deliverables: Project Charter (Ch1), DIKW mapping (Ch2), annotated Google Sheet (Ch3), Access objects (Ch4), SQL files (Ch5), relational schema (Ch6), normalized schema (Ch7), advanced SQL queries (Ch9), Lucidchart ERD (Ch10), DBA plan (Ch11), BI report (Ch12), advanced techniques files (Ch13), Power BI dashboard (Ch14), strategy reflection (Ch15).
- Organize into a single folder or document with a table of contents.

**Part B — Project Narrative**
- Write a 1–2 page narrative describing the evolution of the Grading Database: what decisions were made at each stage, what trade-offs were considered, and what the system can now do that it could not do in Chapter 3.

**Part C — Self-Assessment**
- Rate your confidence (1–5) on each of the five core competencies introduced in Chapter 1.
- Identify the one skill or concept you feel least confident in and write a specific plan to strengthen it.

**Part D — Presentation (optional)**
- Prepare a 5-minute presentation walking through the database project — suitable for a job interview or capstone showcase.

### Deliverable
Organized portfolio package, project narrative, self-assessment, and (if required) presentation slides.

---

## Chapter 17 — Let's Build: Design a System That Matters

### Overview
The final Let's Build is open-ended. Students apply everything they have learned to define, design, and scope a *new* database-driven system for an organization or problem they care about. This is the synthesis task — no templates, no given tables, no provided data.

### What Students Do

**Part A — Choose a Problem**
- Identify a real organizational problem that could be solved (or significantly improved) with a well-designed database and BI system. This can be from their employer, a nonprofit, a student organization, or a personal interest.
- Write a one-paragraph problem statement following the format from Chapter 1's Project Charter.

**Part B — Design the System**
- Define the entities, relationships, and key attributes.
- Sketch an ERD (informal or in Lucidchart).
- Write the three most important SQL queries the system would need to answer.

**Part C — Governance and Ethics Review**
- Identify any privacy, security, or ethical concerns with the data being collected.
- Describe what access controls you would implement and why.
- Identify one potential data quality risk and how you would mitigate it.

**Part D — Managerial Pitch**
- Write a one-page business case for the system: the problem it solves, the data it will collect, the decisions it will support, and the expected value to the organization.

### Deliverable
Problem statement, ERD sketch, SQL query set, governance review, and business case. Optionally, a short presentation or demo if the student builds a prototype.

### Why This Matters
Systems that matter are built by people who understand both the technology and the human context it serves. This final activity asks students to be that person.

---

## Summary Table

| Chapter | Let's Build Activity | Primary Tool(s) | Key Skill |
|---------|---------------------|-----------------|-----------|
| 1 | Meet the Project — Business Scenario & Project Charter | Pen/Paper or any tool | Requirements thinking |
| 2 | Mapping Information to Decisions | Diagrams, no software | DIKW, IPO, IS framework |
| 3 | Data in Google Sheets — and Why It's Not Enough | Google Sheets | Data types, anomaly discovery |
| 4 | Your First Table in Microsoft Access | Microsoft Access | Tables, queries, forms, reports |
| 5 | Writing SQL for the Grading Database | SQLite + Access SQL View | DDL, DML, SELECT |
| 6 | Splitting the Flat Table into Related Tables | Access + SQLite | Relational design, FK enforcement |
| 7 | Normalizing the Grading Database | Access + SQLite | 1NF, 2NF, 3NF |
| 8 | Midterm Review Lab | All tools used so far | Consolidation, self-assessment |
| 9 | Advanced SQL on the Grading Database | SQLite | Subqueries, CTEs, window functions |
| 10 | Designing the ERD in Lucidchart | Lucidchart | ERD, requirements traceability |
| 11 | Applying DBA Practices | Access + SQLite/PostgreSQL | Roles, backup, recovery, indexing |
| 12 | Business Intelligence for the Grading Department | Access + SQL | KPIs, reporting, decision memos |
| 13 | Advanced Database Techniques | SQLite | Indexes, views, triggers |
| 14 | Power BI Dashboard from Microsoft Access | Power BI Desktop + Access | DAX, dashboards, data modeling |
| 15 | Strategic Reflection — Your Database as a Competitive Asset | Conceptual | Porter, value chain, alignment |
| 16 | Full-Cycle Portfolio Review | All | Portfolio, narrative, self-assessment |
| 17 | Design a System That Matters | Student's choice | Open design, ethics, business case |
