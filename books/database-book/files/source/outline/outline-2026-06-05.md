# Using Data to Drive Business Performance: Databases and Management Information Systems
## Detailed Book Outline — June 5, 2026

> Derived from actual chapter headings (H2/H3) in the most recent main `.md` files as of this date.
> **Core Instructional Arc:** Data → Tables → Relationships → Queries → Analytics → Decisions

---

## Chapter 1: Introduction to the Textbook
*Orientation to the Book and the Journey from Data to Decision*

Sets the stage for the entire learning journey. Introduces the textbook's philosophy, the R.E.A.D. framework, the five core competencies, the instructional arc, the two running projects (Grading Database and PetVax), the tools students will use, and practical guidance on how to read, study, and succeed in the course.

- **Welcome to *Using Data to Drive Business Performance: Databases and Management Information Systems*** — Opens the book with the instructional arc, chapter overview video, and the central promise that data becomes valuable when people organize it, connect it, question it, analyze it, and use it to make better decisions.
- **Core Concepts: The Data-to-Decisions Journey** — Defines the six-stage arc (Data → Tables → Relationships → Queries → Analytics → Decisions) that gives the entire book its shape and connects every chapter.
- **Why This Book Exists** — Explains the gap this book fills: most database textbooks teach tools without teaching why they matter for business performance and managerial decision-making.
- **The Big Idea: From Data to Decisions** — Expands on the instructional arc as a systems-thinking approach, not a tool-first approach, and why that distinction matters for business careers.
- **Why Databases Matter for Business Performance** — Connects database technology directly to business outcomes: better reports, faster decisions, fewer errors, and competitive advantage through reliable data.
- **What Makes This Book Different** — Contrasts this book with traditional database textbooks: running case study, hands-on projects, business context throughout, and a unified narrative arc rather than disconnected chapters.
- **How Each Chapter Works** — Walks through the anatomy of a chapter: main text, callout boxes, figures, Let's Build activities, and companion files.
  - *How each chapter is organized* — Details the consistent chapter structure (opening, core concepts, numbered sections, summary, references) used throughout the book.
- **What You Will Learn: Five Core Competencies** — Details the five competencies the course builds: data literacy, database design, SQL querying, analytics and BI, and strategic thinking. Connects each to real business outcomes.
- **The Tools You Will Use** — Introduces the software toolset: Microsoft Access, SQLite, Power BI, and Supabase, explaining why multiple platforms are used and what each teaches.
- **The Two Running Projects** — Introduces the Grading Database (guided practice throughout the course) and PetVax (transfer practice for labs) as the two hands-on projects.
- **Bloom's Taxonomy in Practice** — Explains how the course moves students from remembering and understanding through applying and analyzing to evaluating and creating, with concrete examples at each level.
- **How to Read and Use This Book** — Practical reading strategies: skim first, read actively, work the examples, use the companion files, and treat the book as a workshop rather than a reference manual.
- **How to Succeed in This Course** — Study tips, time management advice, how to use office hours and peer support effectively, and what to do when stuck.
- **The Digital Companion** — Describes the online resources, video overviews, and supplementary materials that accompany the textbook.
- **About the Author** — Brief author background and teaching philosophy.
- **What Comes Next** — Bridges to Chapter 2: Foundations of Information Systems, previewing the shift from orientation to core concepts.
- **Key Concepts** — Bulleted recap of the chapter's essential terms and ideas for quick review.
- **Chapter Summary** — Condensed restatement of the chapter's main takeaways.
- **References** — Cited works and further reading.

---

## Chapter 2: Foundations of Information Systems
*How Data Drives Business Performance*

Establishes the foundational concepts linking business and information technology. Covers the DIKW hierarchy, the R.E.A.D. framework, the five-component framework of IS, business performance measurement, and why strategic alignment between IT and business strategy is a management responsibility, not just a technical one.

- **Framing the Course Title** — Explains what "Using Data to Drive Business Performance" means in practice and why every word in the title matters.
- **Why Foundations Matter** — Argues that before learning tools, students need a mental model of how information systems create business value.
- **From Data to Business Meaning** — Introduces the progression from raw observations to actionable insight.
  - *What Is Data?* — Defines data as recorded facts, observations, and measurements before interpretation.
  - *The DIKW Hierarchy* — Explains Data → Information → Knowledge → Wisdom and how each level adds meaning.
  - *The R.E.A.D. Framework* — Introduces Representation/Retrieval, Expression/Experience, Association/Acquisition, and Decision/Deployment as the organizational work that moves through DIKW.
  - *Why Data Quality Matters* — Shows how poor data quality cascades through the DIKW pyramid and undermines every decision built on it.
- **Business as a Performance System** — Models a business as a system that takes inputs, transforms them, and produces measurable outputs.
  - *What Is a Business?* — Defines business in terms of value creation, customers, and resource transformation.
  - *The Input-Process-Output Model* — Explains the classic IPO framework and how data flows through each stage.
  - *Efficiency, Effectiveness, and KPIs* — Distinguishes doing things right (efficiency) from doing the right things (effectiveness) and introduces KPIs as measurable signals.
  - *The Data-to-Performance Chain* — Traces how raw data becomes a KPI that drives a business decision.
  - *Management as Decision-Making* — Positions management as the act of interpreting information and choosing among alternatives.
  - *Why Data Alone Is Not Enough* — Explains the gap between having data and making good decisions: context, judgment, and frameworks are essential.
- **Information Systems as Organizational Engines** — Defines IS as the coordinated combination of technology, people, data, and processes.
  - *Information Behavior: How People Search for and Use Information* — Introduces Wilson's model of information need, seeking behavior, and use, mapped to the R.E.A.D. framework.
  - *What Is an Information System?* — Formal definition and contrast with casual usage of the term.
  - *Information Systems vs. Information Technology* — Distinguishes the broader system (people + process + data + tech) from the tools alone.
  - *The Five-Component Framework* — Hardware, software, data, people, and processes as the five interdependent components of every IS.
- **Managing Information Systems for Business Value** — Covers the managerial responsibilities that make IS investments pay off.
  - *Strategic Alignment* — Explains why IT strategy must support business strategy, and the risks of misalignment.
  - *Governance and Accountability* — Introduces IS governance as the system of decision rights, policies, and accountability around technology investment.
  - *Foundations That Carry Forward* — Bridges to Chapter 3 by previewing how data fundamentals build on these IS foundations.
- **Apply the Concepts** — End-of-chapter exercises that ask students to apply frameworks to real scenarios.
- **Chapter Summary** — Condensed restatement of the chapter's main takeaways.
- **References** — Cited works and further reading.
- **Figures Index** — List of all figures appearing in the chapter.

---

## Chapter 3: Understanding Data Fundamentals
*The Foundation of Every Database, Every Query, and Every Decision*

Takes a deep dive into data itself before any database tool is introduced. Covers data classification, data types, measurement levels, metadata, data quality, governance, the data lifecycle, ethics, and the transition from spreadsheets to structured database thinking.

- **Introduction** — Opens with why understanding data is prerequisite to understanding databases: you cannot design a good database if you do not understand what you are storing.
- **Core Concepts** — Quick-reference list of the chapter's essential terms and ideas.
- **Why Data Fundamentals Drive Business Performance** — Connects data literacy directly to business outcomes: better requirements, cleaner designs, more trustworthy analytics.
- **Data, Meaning, and Context** — Explains that data without context is meaningless and shows how metadata and domain knowledge supply the missing context.
- **Classifying Data** — Systematic breakdown of how to categorize data for design and analysis purposes.
  - *Qualitative versus quantitative data* — Distinguishes descriptive data from measurable data.
  - *Categorical versus numerical data* — Nominal, ordinal, discrete, and continuous subdivisions.
- **Representing Data in Structured Systems** — Introduces data types, measurement scales (nominal, ordinal, interval, ratio), and why choosing the right type matters for storage, validation, and analysis.
  - *Plain text and binary forms* — Contrasts human-readable and machine-optimized data representations.
- **From Spreadsheets to Databases** — Explains the cognitive and structural shift from spreadsheet thinking to relational thinking.
- **Managing Data as an Organizational Asset** — Frames data as something that requires stewardship, policy, and lifecycle management.
  - *Metadata and Data Dictionaries* — Defines metadata and shows how data dictionaries document structure, meaning, and rules.
  - *Data Quality* — Introduces the dimensions of data quality: accuracy, completeness, consistency, timeliness, uniqueness, and validity.
  - *Data Governance* — Explains governance as the decision-making framework for data: who decides what data means, who can change it, and how quality is enforced.
  - *Data Lifecycle* — Traces data from creation through storage, use, archival, and deletion.
  - *Ethics, Privacy, and Security* — Covers responsible data handling, privacy regulations, and the ethical obligations of data professionals.
- **Big Data and the Digital Age** — Introduces volume, velocity, variety, and veracity as the defining characteristics of modern data environments.
- **Summary** — Condensed chapter takeaways.
- **References** — Cited works and further reading.

---

## Chapter 4: Introduction to Databases
*From Spreadsheets to Structured Systems*

Introduces databases as the core technology for reliable organizational data management. Explains why spreadsheets and file-based environments fail at scale, the database approach as the solution, and the foundational concepts of tables, keys, constraints, and DBMS platforms.

- **Core Concepts** — Quick-reference list of the chapter's essential terms and ideas.
- **Why Databases Matter** — Frames databases as the infrastructure that makes reliable reporting, analytics, and decision-making possible.
- **What a Database and DBMS Are** — Defines a database (organized collection of structured data) and a DBMS (software that manages access, integrity, and security).
- **Why Spreadsheets and File Systems Break Down** — Diagnoses the classic problems with non-database approaches.
  - *From Spreadsheets to File Silos* — Traces how individual productivity tools become organizational data problems when shared and scaled.
  - *Anomalies in Flat Tables* — Introduces redundancy, inconsistency, and the three classic anomalies (insertion, update, deletion) that plague unnormalized data.
- **The Database Approach** — Presents the DBMS as the solution: centralized control, reduced redundancy, enforced integrity, shared access, and scalability.
- **Tables, Keys, and Constraints** — The fundamental building blocks of a relational database.
  - *Rows, Columns, and Table Rules* — Explains the table as a structured grid with rules about what each cell can contain.
  - *Primary and Foreign Keys* — Introduces keys as the mechanism for unique identification and cross-table references.
  - *Constraints That Protect Data* — Covers NOT NULL, UNIQUE, CHECK, and referential integrity as built-in data quality guards.
- **SQL and Platforms as the Next Step** — Previews Chapter 5 by introducing SQL as the standard language for working with databases, and surveys the platforms used in the course: Microsoft Access, SQLite, and Supabase/PostgreSQL.
- **Summary** — Condensed chapter takeaways.
- **Figures Index** — List of all figures appearing in the chapter.

---

## Chapter 5: SQL — The Language of Databases
*How Structured Queries Transform Stored Data into Business Insight*

Introduces SQL as the universal language of databases. Covers DDL, DML, DQL, and TCL; CREATE/INSERT; SELECT/FROM/WHERE/ORDER BY; aliases; NULL handling; date handling; one introductory INNER JOIN; aggregation with GROUP BY/HAVING; calculated columns; and CASE expressions.

- **Core Concepts** — Quick-reference list of the chapter's essential terms and ideas.
- **Part 1: SQL Foundations and Tools** — Establishes what SQL is, why it matters, and which tools students will use.
  - *Why SQL Comes Next* — Positions SQL as the natural next step after understanding databases conceptually.
  - *What SQL Is* — Defines SQL as a declarative, English-like language for defining, manipulating, and querying relational data.
  - *SQL Is Declarative* — Explains the declarative paradigm: you state what you want, not how to get it.
  - *SQL in the Information System* — Shows where SQL fits in the five-component IS framework.
  - *Why SQL Is Useful* — Business case for learning SQL: transferable, platform-independent, and directly tied to decision-making.
  - *SQL Categories at a Glance* — DDL (define), DML (manipulate), DQL (query), TCL (control) as the four families of SQL statements.
  - *Tools You Will Use* — Introduces DB Browser for SQLite and the SQLite command-line shell.
- **Part 2: The Chapter 5 Teaching Dataset** — Introduces a simplified two-table dataset used for all examples in the chapter.
  - *Why a Simplified Two-Table Dataset* — Explains the pedagogical choice to use GRADEBOOK and GRADE_WEIGHT before introducing the full Grading Database.
  - *GRADEBOOK* — Describes the student-scores table.
  - *GRADE_WEIGHT* — Describes the assignment-type weights table.
  - *Questions These Tables Can Answer* — Lists the business questions these two tables can address.
- **Part 3: Creating Tables and Inserting Data** — DDL and DML fundamentals.
  - *Creating Tables with `CREATE TABLE`* — Syntax and examples for defining table structures.
  - *Creating the `GRADEBOOK` Table* — Step-by-step CREATE TABLE with column definitions and constraints.
  - *Creating the `GRADE_WEIGHT` Table* — Step-by-step CREATE TABLE for the weights reference table.
  - *Modifying a Table with `ALTER TABLE`* — Adding, modifying, or dropping columns after creation.
  - *Inserting Records with `INSERT INTO`* — Syntax for adding rows to tables.
  - *Inserting Rows into `GRADEBOOK`* — Concrete INSERT examples with sample data.
  - *Inserting Rows into `GRADE_WEIGHT`* — Concrete INSERT examples for weight data.
  - *Checking the Inserted Data* — Using simple SELECT to verify that data loaded correctly.
- **Part 4: Querying Data with SELECT** — The core of SQL: retrieving and shaping data.
  - *The Basic `SELECT` Pattern* — SELECT/FROM/WHERE as the fundamental query skeleton.
  - *Removing Duplicates with `DISTINCT`* — When and why to eliminate duplicate rows.
  - *Filtering Rows with `WHERE`* — Comparison operators and filtering logic.
  - *Handling Missing Values with `NULL`* — What NULL means, how it behaves in comparisons, and IS NULL / IS NOT NULL.
  - *Combining Conditions with `AND`, `OR`, and `NOT`* — Boolean logic for compound filters.
  - *Pattern Matching with `LIKE`, `BETWEEN`, and `IN`* — Flexible filtering beyond exact matches.
  - *Sorting Results with `ORDER BY`* — Ascending and descending sorts on one or more columns.
  - *Renaming Output with Aliases* — Using AS to give columns readable names in query output.
  - *Working with Dates* — Date literals, date functions, and common date-filtering patterns.
  - *Building a Query Step by Step* — Demonstrates incremental query construction from simple selection to filtered, sorted output.
- **Part 5: A First Look at Joins** — Introductory join concepts, setting up Chapter 6's full treatment.
  - *Why You Would Join Two Tables* — Business motivation: separate tables for separate facts, combined when needed.
  - *One Example: `INNER JOIN`* — Walks through a single INNER JOIN between GRADEBOOK and GRADE_WEIGHT.
- **Part 6: Aggregation, Grouping, and Calculated Results** — Turning detail rows into summary insight.
  - *Why Aggregation Matters* — Business questions require counts, sums, averages, not just row-by-row detail.
  - *Aggregate Functions* — COUNT, SUM, AVG, MIN, MAX with examples.
  - *Grouping with `GROUP BY`* — Partitioning rows into groups for per-group aggregation.
  - *Filtering Groups with `HAVING`* — Post-aggregation filtering, contrasted with WHERE.
  - *Practical Summary Queries* — Worked examples of common business summary queries.
  - *Calculated Columns* — Creating new values from existing columns using arithmetic and expressions.
  - *A Weighted Contribution Example* — Computing a weighted score using SQL arithmetic.
  - *Text and Date Expressions* — String concatenation and date arithmetic.
  - *Conditional Logic with `CASE`* — Adding if/then/else logic to queries for classification and labeling.
  - *Complete Student Summary Example* — A capstone query combining joins, aggregation, CASE, and calculated columns.
- **Looking Ahead** — Bridges to Chapter 6: The Relational Model, previewing deeper join treatment and relational theory.
- **Appendix: Applying These Concepts to the Grading Database** — Maps the simplified two-table examples to the full Grading Database schema.
  - *A1. Inserting Rows One at a Time (Access-Friendly)* — Access-compatible INSERT patterns.
  - *A2. A Side-by-Side Age Calculation* — Cross-platform date calculation comparison.
  - *Access vs. SQLite Syntax at a Glance* — Quick reference for syntax differences.
  - *Two SQLite Tools for This Chapter* — DB Browser and CLI comparison.
- **Key Concepts** — Bulleted recap of essential terms.
- **Chapter Summary** — Condensed chapter takeaways.
- **References** — Cited works and further reading.
- **Figures Index** — List of all figures.

---

## Chapter 6: The Relational Model
*How Connected Tables Replace Redundancy with Structure, Integrity, and Analytical Power*

Introduces the relational model as the theoretical and practical foundation for database design. Covers data anomalies, entity-relationship concepts, primary and foreign keys, relationship types, referential integrity, joins as the practical payoff, and hands-on work in Microsoft Access.

- **1. Why One Big Table Fails** — Uses a flat GRADE_FLAT table to demonstrate that convenience at small scale becomes disaster at organizational scale.
  - *The Flat-Table Temptation* — Why beginners naturally gravitate toward single-table designs.
  - *What the Flat Table Is Mixing* — Identifies the distinct subjects (students, deliverables, grades) conflated in one table.
  - *Update Anomaly* — Changing one fact requires changing many rows.
  - *Insertion Anomaly* — Cannot add one fact without adding unrelated facts.
  - *Deletion Anomaly* — Deleting one fact accidentally destroys another.
  - *Summary of Modification Anomalies* — Anomalies are structural consequences, not user errors.
- **2. What the Relational Model Does Differently** — Introduces Codd's relational model as the solution.
  - *Definition* — Formal definition of the relational model.
  - *The Relational Model Is Not a Software Product* — Distinguishes the theoretical model from any particular DBMS.
  - *Properties of a Formal Relation* — No duplicate rows, no row ordering, each cell holds one value.
  - *Relational Vocabulary* — Relation, tuple, attribute, domain — the formal terms mapped to everyday table/row/column language.
  - *Where This Chapter Is Going: The Seven-Table Schema* — Preview of the normalized Grading Database design that the chapter builds toward.
- **3. Entities, Attributes, Relationships, and Relations** — The core modeling concepts.
  - *Entities* — Real-world objects the database must represent.
  - *Attributes* — Properties of entities.
  - *Relationships* — Associations between entities.
  - *Relations* — How entities, attributes, and relationships become tables.
  - *Schema Notation* — Compact notation for describing table structures.
- **4. Keys: How Tables Identify Rows** — The identification system of the relational model.
  - *Why Keys Are Necessary* — Every row must be uniquely identifiable.
  - *Candidate and Primary Keys* — Choosing the best unique identifier.
  - *Composite Keys* — Keys made of multiple columns.
  - *Natural Keys* — Keys derived from real-world identifiers.
  - *Surrogate Keys* — System-generated artificial identifiers.
  - *Business-Rule Uniqueness* — When business rules, not just columns, define uniqueness.
  - *Key Types at a Glance* — Comparison table of key types with trade-offs.
- **5. Foreign Keys and Relationship Types** — How tables connect to each other.
  - *Foreign Keys* — Definition and mechanics of cross-table references.
  - *One-to-One Relationships* — Rare but important: when one row in Table A matches at most one row in Table B.
  - *One-to-Many Relationships* — The most common pattern: one row in Table A matches many rows in Table B.
  - *Many-to-Many Relationships* — Requires a junction table to resolve.
  - *Relationship Types Summary* — Quick-reference comparison.
- **6. Integrity Rules: Protecting Identity and Relationships** — Rules the DBMS enforces automatically.
  - *Entity Integrity* — Primary keys cannot be NULL.
  - *Referential Integrity* — Foreign keys must reference existing primary keys.
  - *SQL Example* — Concrete SQL demonstrating integrity enforcement.
  - *Cascade Update and Cascade Delete* — Automatic propagation of changes through related tables.
- **7. Redesigning the Grading Database** — Applies the relational model to the course's central case.
  - *Stage-by-Stage Progression* — Walks through the five structural stages of the Grading Database evolution.
  - *Final Seven-Table Schema* — The complete normalized design.
  - *Sample Rows* — Example data illustrating how the seven tables work together.
  - *ERD Overview* — Entity-relationship diagram of the final design.
  - *What the Redesign Solves* — Anomalies eliminated by the relational restructuring.
- **8. Querying a Relational Design with Joins** — The practical payoff: how separated tables come back together.
  - *Reading a Join* — How to interpret JOIN syntax and think in terms of table combinations.
  - *Basic Student Scores* — Simple join to reconstruct a student-score view.
  - *Adding Assignment Rules* — Joining through GRADE_WEIGHT to apply category logic.
  - *Calculating Weighted Contribution* — Multi-table join with computed weighted scores.
  - *Attendance Summary* — Joining attendance data to student and schedule tables.
  - *Advanced Preview: Finding Missing Grades* — CROSS JOIN + LEFT JOIN pattern to detect gaps.
  - *Join Types at a Glance* — INNER, LEFT, RIGHT, FULL OUTER, CROSS comparison.
- **9. Microsoft Access as a Visual Learning Tool** — Using Access to make relational concepts tangible.
  - *What Access Makes Visible* — Relationships window, datasheet view, and design view as learning aids.
  - *Building the Core Tables* — Step-by-step table creation in Access.
  - *Defining Relationships and Enforcing Integrity* — Setting up foreign keys and referential integrity in the Access UI.
  - *Watching Referential Integrity Work* — Demonstrating that Access blocks orphaned references.
  - *Inspecting the SQL Behind the Visual Query* — Revealing that Access QBE generates SQL.
- **10. Functional Dependencies and the Bridge to Normalization** — Introduces the concept that connects relational modeling to formal normalization (Chapter 7).
- **Key Concepts** — Bulleted recap of essential terms.
- **Chapter Summary** — Condensed chapter takeaways.
- **References** — Cited works and further reading.

---

## Chapter 7: Data Normalization
*From Flat Files to Reliable Relational Design*

Covers normalization as the discipline for eliminating data redundancy and design anomalies. Progressively introduces 1NF, 2NF, and 3NF through functional dependencies, composite keys, partial dependencies, and transitive dependencies, using the Grading Database as the hands-on case study throughout.

- **7.1 Why Normalization Matters** — Frames normalization as the systematic method for producing reliable database designs.
  - *The Problem: Flat Tables Feel Convenient* — Acknowledges the intuitive appeal of single-table designs.
  - *Redundancy* — Defines redundancy and shows how it creates maintenance burdens.
  - *Modification Anomalies* — Reviews insertion, update, and deletion anomalies as the symptoms normalization cures.
  - *Definition of Normalization* — Formal definition: a process of organizing data to reduce redundancy and improve integrity.
- **7.2 Functional Dependencies: The Logic Behind Normalization** — The analytical tool that drives normalization decisions.
  - *What Is a Functional Dependency?* — If X determines Y, then knowing X tells you exactly one Y.
  - *Everyday Examples* — StudentID → LastName; DeliverableID → DueDate.
  - *Functional Dependencies in the Grading Database* — Maps the actual dependencies in the course dataset.
  - *The Design Rule* — Each table should represent one subject, with all non-key attributes depending on the whole key.
- **7.3 Normal Forms: A Step-by-Step Design Checklist** — Overview of the three normal forms as progressive design tests.
- **7.4 First Normal Form (1NF): One Cell, One Fact** — Eliminates repeating groups and multi-valued cells.
  - *Violation 1: A Multi-Valued Cell* — A cell containing a list or composite value.
  - *Violation 2: Repeating Columns* — Column1, Column2, Column3 patterns that hide a separate entity.
  - *What 1NF Does Not Solve* — 1NF eliminates structural chaos but does not address key-dependency problems.
- **7.5 Second Normal Form (2NF): The Whole Key** — Eliminates partial dependencies in tables with composite keys.
  - *A 2NF Violation* — An attribute that depends on only part of a composite key.
  - *2NF Fix: Separate Student, Deliverable, and Grade Facts* — Splitting the table so every non-key attribute depends on the full key.
  - *Why Junction Tables Appear* — M:N relationships naturally produce 2NF-compliant junction tables.
- **7.6 Third Normal Form (3NF): Nothing But the Key** — Eliminates transitive dependencies.
  - *A 3NF Violation: Letter Grades* — Letter grade depends on numeric average, not directly on the key.
  - *3NF Fix: Separate Rules from Facts* — Moving derived or indirectly dependent attributes to their own tables.
  - *Another 3NF Example: Assignment Type Rules* — Category weights and descriptions belong in their own table.
  - *Business Example: Customer Region* — A non-Grading-Database example showing the universal nature of 3NF.
- **7.7 The Normalized Grading Database** — The complete 3NF-compliant design.
  - *Before and After at a Glance* — Side-by-side comparison of flat vs. normalized structures.
  - *Seven-Table Schema* — Full schema listing with keys and foreign keys.
  - *Schema Notation* — Compact structural representation.
  - *How the Tables Connect* — ERD and relationship walkthrough.
  - *Why This Design Is Better* — Anomalies eliminated, queries simplified, integrity enforced.
- **7.8 Normalization and Analytics** — Shows that normalized design supports, rather than hinders, analytical work.
  - *Example: Student Average Scores* — Simple query against normalized tables.
  - *Example: Weighted Contribution* — Multi-table analytical query.
  - *Example: Missing Grades* — Gap detection query across normalized tables.
- **7.9 Denormalization: When Redundancy Is Intentional** — The deliberate exception to normalization rules.
  - *Definition* — Introducing controlled redundancy for performance or convenience.
  - *Appropriate Examples* — Data warehouses, reporting tables, cached aggregates.
  - *Risk of Denormalization* — The trade-off: faster reads vs. update anomalies and maintenance burden.
- **7.10 Common Normalization Mistakes** — Pitfalls that students and practitioners encounter.
- **Key Concepts** — Bulleted recap of essential terms.
- **Chapter Summary** — Condensed chapter takeaways.
- **Looking Ahead** — Bridges to the midterm review and the second half of the course.
- **References** — Cited works and further reading.

---

## Chapter 8: Midterm Review — Concepts
*Integrated Midterm Review Across Core Database Topics*

A structured checkpoint that revisits and integrates content from Chapters 1–7. Reviews data fundamentals, the relational model, SQL basics, and normalization. Includes the midterm test question set and project instructions.

- **Chapter Overview** — Frames the midterm review as an integration point, not just a test-prep chapter.
- **The First Half as One Connected Framework** — Shows how Chapters 1–7 form a coherent progression.
  - *Data and Information* — Review of DIKW, data types, classification, and quality from Chapters 2–3.
  - *Databases and DBMS Concepts* — Review of the database approach, DBMS functions, and platform differences from Chapter 4.
  - *Tables, Keys, and Relationships* — Review of the relational model, keys, integrity, and joins from Chapters 5–6.
- **What to Review Before the Midterm** — Structured study guide organized by topic with suggested review activities.
- **Midterm Test Instructions** — Format, rules, timing, and expectations for the in-class test.
- **Midterm Test Question Set** — The actual test questions covering the first-half material.
- **Midterm Project Instructions** — Requirements, deliverables, and grading rubric for the midterm project component.
- **How the Test and Project Work Together** — Explains the complementary design: test assesses conceptual knowledge, project assesses applied skills.
- **Chapter Summary** — Condensed review takeaways.
- **Readiness Checklist** — A self-assessment tool for students to confirm they are prepared.
- **References** — Cited works.

---

## Chapter 9: Advanced SQL with the Grading Database
*Advanced SQL Patterns for Deeper Business Analysis*

Takes SQL from basic queries to sophisticated analysis using the full Grading Database. Covers complex JOINs, nested subqueries, window functions, CASE expressions, CTEs, grade analytics, data diagnostics, weighted grades, date queries, safe data modification, and reusable reporting pipelines.

- **Learning Objectives** — What students will be able to do after completing this chapter.
- **Chapter Roadmap** — Table mapping each section to its main question and core idea.
- **9.1 From Basic SQL to Advanced SQL** — Reframes SQL as a tool for answering increasingly sophisticated business questions.
  - *Four Questions Before Writing an Advanced Query* — A systematic approach: what do I need, where does it live, how is it connected, and what should the output look like?
  - *Example: Turning a Business Question into SQL Logic* — Walks through decomposing a real business question into query steps.
- **9.2 Grading Database Refresher** — Re-establishes the full schema before diving into advanced queries.
  - *Core Tables* — Lists the seven core tables and their purposes.
  - *The Main Relational Pathways* — Traces how STUDENT, DELIVERABLE, STUDENT_GRADE, ATTENDANCE, and SCHEDULE connect.
  - *Why the Schema Matters* — Argues that query skill depends on schema understanding.
- **9.3 Diagnosing Data Problems with SQL** — Using SQL to find what is wrong before analysis begins.
  - *9.3.1 Detecting Repeated Student Details in a Flat Table* — Finding duplicate identity data.
  - *9.3.2 Detecting Conflicting Emails* — Finding inconsistent copies of the same fact.
  - *9.3.3 Detecting Inconsistent Deliverable Definitions* — Finding deliverable metadata that varies by row.
  - *9.3.4 Detecting Duplicate Grade Records* — Finding multiple scores for the same student-deliverable pair.
  - *9.3.5 Detecting Scores Outside the Valid Range* — Finding out-of-bounds numeric data.
  - *9.3.6 Detecting Orphaned Grade Records* — Finding grades that reference nonexistent students or deliverables.
- **9.4 Advanced JOIN Patterns** — Multi-table joins for real business reports.
  - *9.4.1 Complete Gradebook Report* — Joining STUDENT, DELIVERABLE, and STUDENT_GRADE for a full roster view.
  - *9.4.2 Adding Assignment-Type Rules* — Joining through ASSIGNMENT_TYPE for weighted-category logic.
  - *9.4.3 Finding Missing Grades with `CROSS JOIN` and `LEFT JOIN`* — Detecting student-deliverable combinations with no score.
  - *9.4.4 Finding Deliverables with No Submissions* — Identifying deliverables no student has attempted.
  - *9.4.5 Joining Attendance to the Schedule* — Combining STUDENT, SCHEDULE, and ATTENDANCE for attendance tracking.
  - *9.4.6 Join Checklist* — Decision tree for choosing the right join type.
- **9.5 Cleaning and Conditional Functions** — Handling missing, inconsistent, or ambiguous data.
  - *9.5.1 Access SQL and Portable SQL Compared* — Platform differences in conditional functions.
  - *9.5.2 Replacing Missing Scores for Display* — COALESCE and NZ for NULL substitution.
  - *9.5.3 Conditional Labels with `IIf()` and `CASE`* — Assigning performance labels based on score thresholds.
  - *9.5.4 Multi-Level Performance Bands* — Nested CASE for letter-grade or band assignment.
  - *9.5.5 Cleaning Text Values* — TRIM, UPPER, LOWER, and string-manipulation patterns.
- **9.6 Analytical Aggregation** — Summarizing data for insight.
  - *9.6.1 Average Score Per Student* — Per-student performance metrics.
  - *9.6.2 Average Score Per Deliverable* — Per-deliverable difficulty analysis.
  - *9.6.3 Assignment-Type Averages* — Category-level performance comparisons.
  - *9.6.4 `HAVING` for Group Filters* — Filtering groups after aggregation.
  - *9.6.5 Conditional Aggregation* — COUNT with CASE for counting specific conditions.
  - *9.6.6 Score Bands* — Bucketing scores into performance tiers.
  - *9.6.7 Attendance Rate Per Student* — Computing presence percentages.
  - *9.6.8 `COUNT(*)` vs. `COUNT(column)`* — The critical distinction and when each matters.
- **9.7 Date and Time Queries** — Temporal analysis patterns.
  - *9.7.1 Date Function Reference* — Quick-reference for date functions across platforms.
  - *9.7.2 Upcoming Deliverables* — Filtering by future due dates.
  - *9.7.3 Overdue Deliverables Without Grades* — Finding missing work past deadline.
  - *9.7.4 Days Since Due Date* — Computing elapsed time.
  - *9.7.5 Attendance Trend by Week* — Aggregating attendance over time periods.
- **9.8 Weighted Grades and Policy Tables** — Computing final grades from policy rules.
  - *9.8.1 Example Weight Table* — The ASSIGNMENT_TYPE table as policy storage.
  - *9.8.2 Average Score by Student and Category* — Per-category performance.
  - *9.8.3 Weighted Final Grade Using a CTE* — Multi-step weighted computation.
  - *9.8.4 Handling Missing Categories* — What happens when a student has no grades in a category.
  - *9.8.5 Joining to the Grade Scale* — Converting numeric weighted grades to letter grades.
- **9.9 Window Functions** — Analytics without collapsing rows.
  - *9.9.1 `GROUP BY` vs. Window Functions* — When to use each.
  - *9.9.2 Student Average Next to Each Score* — OVER() for per-row context.
  - *9.9.3 Ranking Students by Average* — RANK() and ROW_NUMBER() for ordering.
  - *9.9.4 Running Total by Student* — Cumulative sums with window frames.
  - *9.9.5 Moving Average* — Rolling-window calculations.
  - *Platform Note* — Window function availability across Access, SQLite, and PostgreSQL.
- **9.10 Reusable Reporting Pipelines** — Building persistent analytical structures.
  - *9.10.1 Views as Saved Reports* — CREATE VIEW for reusable query definitions.
  - *9.10.2 CTEs for Multi-Step Logic* — WITH clauses for readable, step-by-step query construction.
  - *9.10.3 Subqueries for One-Step Comparisons* — Nested SELECT for inline calculations.
  - *9.10.4 `EXISTS` for Relationship Checks* — Testing for the presence of related rows.
  - *9.10.5 `UNION` and `UNION ALL`* — Combining result sets vertically.
  - *9.10.6 Choosing the Right Tool* — Decision guide: view vs. CTE vs. subquery vs. EXISTS.
- **9.11 Safe Data Modification** — Writing UPDATE and DELETE that do not destroy data.
  - *9.11.1 Safe `UPDATE`* — Always test with SELECT first; always use WHERE.
  - *9.11.2 Updating Scores* — Correcting grade entries with targeted UPDATE.
  - *9.11.3 Safe `DELETE`* — Verifying what will be removed before executing.
  - *9.11.4 Dangerous Patterns* — UPDATE without WHERE, DELETE without WHERE, ambiguous joins in UPDATE.
  - *9.11.5 Transactions as a Safety Preview* — BEGIN/ROLLBACK/COMMIT as an undo safety net.
- **9.12 Integrated Example: At-Risk Student Report** — End-to-end capstone query combining multiple advanced techniques.
  - *Step 1: Count Missing Grades* — LEFT JOIN + COUNT to find gaps.
  - *Step 2: Compute Score Averages* — Aggregation across deliverables.
  - *Step 3: Compute Attendance Rates* — Attendance percentage per student.
  - *Step 4: Combine the Stages* — CTE chain producing the final report.
  - *Reading the Query* — How to interpret a complex multi-CTE query from the inside out.
- **Key Concepts** — Foundational ideas, query patterns, platform awareness, and practical warnings.
- **Chapter Summary** — Condensed chapter takeaways.
- **Review Questions** — Check-understanding questions for self-assessment.
- **Suggested Figures** — Recommended visuals for the chapter.
- **References** — Cited works and further reading.

---

## Chapter 10: From Data to Design — Building Reliable Information Systems
*From Requirements to Robust Logical Database Design*

Transitions students from querying existing databases to designing new ones from scratch. Covers requirements analysis, the SDLC, entity-relationship modeling, Crow's Foot notation, relationship types, advanced ER concepts, normalization as a design check, ERD-to-table mapping, and common modeling mistakes.

- **Learning Objectives** — What students will be able to do after completing this chapter.
- **Chapter Roadmap** — Table mapping each section to its main question and core idea.
- **10.1 From Querying Data to Designing Systems** — The role shift from database user to database designer.
  - *10.1.1 Good Queries Require Good Design* — Many "query problems" are design problems in disguise.
  - *10.1.2 The Shift from User to Designer* — New questions: what must the system remember, which objects deserve tables, which rules should the DBMS enforce?
  - *10.1.3 Design as Translation* — Mapping business language to data structure with concrete examples.
- **10.2 The Cost of Poor Design: Data Anomalies** — Why design quality matters before implementation.
  - *10.2.1 Starting Example: A Flat Grading Table* — A concrete poorly designed table.
  - *10.2.2 Insertion Anomaly* — Cannot add one fact without unrelated facts.
  - *10.2.3 Update Anomaly* — Changing one fact requires many row changes.
  - *10.2.4 Deletion Anomaly* — Deleting one fact accidentally destroys another.
  - *10.2.5 Why Anomalies Matter* — Anomalies damage trust, increase labor, and weaken decisions.
- **10.3 Database Design in the System Development Life Cycle** — Where database design fits in system development.
  - *10.3.1 What Is the SDLC?* — Planning, building, deploying, and maintaining systems through deliberate phases.
  - *10.3.2 SDLC Phases from a Database Perspective* — Planning, conceptual design, logical design, physical design, development, testing, deployment, maintenance.
  - *10.3.3 Conceptual, Logical, and Physical Design* — Three design levels: what the domain contains, what tables are needed, how a specific DBMS implements them.
- **10.4 From Requirements to Structure** — Translating business needs into design elements.
  - *10.4.1 Requirements as Design Inputs* — How stated requirements imply entities, attributes, and relationships.
  - *10.4.2 Entities* — Real-world objects, concepts, or events the database must represent.
  - *10.4.3 Attributes* — Properties or characteristics of entities.
  - *10.4.4 Relationships* — Associations between entities.
  - *10.4.5 Business Rules* — Constraints the database must enforce.
- **10.5 Entity-Relationship Modeling** — The visual language of database design.
  - *10.5.1 What ER Modeling Is* — A graphical method for representing entities, attributes, and relationships.
  - *10.5.2 ERD Elements* — Rectangles (entities), ovals (attributes), diamonds (relationships), lines (connections).
  - *10.5.3 Key Hierarchy* — Primary keys, foreign keys, and candidate keys in ERDs.
  - *10.5.4 Example: STUDENT and STUDENT_GRADE* — Concrete ERD walkthrough.
- **10.6 Crow's Foot Notation** — The industry-standard notation for cardinality and optionality.
  - *10.6.1 What Crow's Foot Notation Shows* — Minimum and maximum cardinality visually.
  - *10.6.2 Reading Crow's Foot Notation* — Interpreting the symbols: zero, one, many.
  - *10.6.3 Crow's Foot to SQL* — How cardinality translates to foreign keys and constraints.
- **10.7 Understanding Relationship Types** — The three fundamental relationship patterns.
  - *10.7.1 One-to-One Relationships* — Rare but important: one row in A matches at most one row in B.
  - *10.7.2 One-to-Many Relationships* — The most common pattern.
  - *10.7.3 Many-to-Many Relationships* — Requires a junction/associative table to resolve.
  - *10.7.4 Relationships in the Grading Database* — Mapping the actual relationships in the course database.
- **10.8 Advanced ER Modeling Concepts** — Beyond the basics.
  - *10.8.1 Weak Entities* — Entities whose existence depends on another entity.
  - *10.8.2 Associative Entities* — Entities that resolve M:N relationships and carry their own attributes.
  - *10.8.3 Recursive Relationships* — An entity related to itself (e.g., employee-manager).
  - *10.8.4 Specialization and Generalization* — Subtype/supertype hierarchies.
  - *10.8.5 Mapping Specialization to Tables* — Design options for implementing inheritance in relational tables.
- **10.9 Normalization as a Design-Quality Check** — Using normal forms to validate a design.
  - *10.9.1 Normal Forms Review* — 1NF, 2NF, 3NF as progressive design tests.
  - *10.9.2 Applying Normalization to Design* — Checking a proposed schema against normal forms.
  - *10.9.3 When to Denormalize* — Intentional redundancy and its trade-offs.
- **10.10 From ER Diagrams to Relational Tables** — The mapping algorithm.
  - *10.10.1 Step 1: Map Strong Entities* — Each strong entity becomes a table; attributes become columns.
  - *10.10.2 Step 2: Map Weak Entities* — Include the owner's primary key as part of the weak entity's key.
  - *10.10.3 Step 3: Map 1:N Relationships* — Add a foreign key to the "many" side.
  - *10.10.4 Step 4: Map M:N Relationships* — Create a new junction table with composite primary key.
  - *10.10.5 Step 5: Map Special Attributes* — Multi-valued attributes and derived attributes.
  - *10.10.6 Complete Grading Database ERD in Mermaid* — The full design rendered as Mermaid.js ERD code.
- **10.11 Visual Schema Design Tools** — Tools for creating and sharing ERDs.
  - *10.11.1 Lucidchart* — Visual drag-and-drop ERD tool with collaboration features.
  - *10.11.2 Mermaid* — Text-based ERD-as-code for version-controlled documentation.
  - *10.11.3 Lucidchart vs. Mermaid* — Trade-offs: visual fidelity vs. maintainability and version control.
- **10.12 Common Database Modeling Mistakes** — Pitfalls to avoid.
  - *10.12.1 Building Before Modeling* — Jumping to implementation without design.
  - *10.12.2 Treating Reports as Tables* — Confusing output format with storage structure.
  - *10.12.3 Failing to Resolve Many-to-Many Relationships* — Leaving M:N unresolved.
  - *10.12.4 Putting Foreign Keys on the Wrong Side* — Reversing the FK direction.
  - *10.12.5 Omitting Optionality* — Not specifying whether a relationship is required or optional.
  - *10.12.6 Confusing Attributes with Entities* — When a property should be its own table.
  - *10.12.7 Storing Derived Values Too Early* — Calculated fields that become stale.
  - *10.12.8 Ignoring Naming Conventions* — Inconsistent names that confuse future users.
- **10.13 Design vs. Implementation** — The critical distinction.
  - *10.13.1 Logical Design Is Platform-Independent* — Tables, keys, and relationships defined without reference to a specific DBMS.
  - *10.13.2 Physical Design Is Platform-Specific* — Data types, indexes, and storage tuned to a particular DBMS.
  - *10.13.3 Why the Distinction Matters* — The tool should follow the model, not drive it.
- **10.14 Strengths and Limits of ER Modeling** — Honest assessment of the technique.
  - *10.14.1 Strengths* — Visual, standardized, bridges business and technical audiences.
  - *10.14.2 Limits* — Does not capture behavior, workflows, or non-relational data well.
  - *10.14.3 Alternatives and Complements* — UML, data flow diagrams, dimensional modeling.
- **10.15 Key Concepts** — Bulleted recap of essential terms.
- **10.16 Chapter Summary** — Condensed chapter takeaways.
- **10.17 Review Questions** — Check-understanding questions.
- **10.18 References** — Cited works and further reading.

---

## Chapter 11: Database Administration (DBA)
*Administration, Security, and Operational Reliability*

Covers the professional role of the database administrator and the practices that keep organizational data secure, available, and performing well. Includes user management, concurrency control, transactions and ACID, security, backup and recovery, performance tuning, and hands-on DBA practice across Access, SQLite, and Supabase.

- **Learning Objectives** — What students will be able to do after completing this chapter.
- **Chapter Roadmap** — Table mapping each section to its main question and core idea.
- **11.1 What Is Database Administration?** — The DBA role defined.
  - *11.1.1 Design vs. Administration* — Design builds the structure; administration keeps it running.
  - *11.1.2 Data Administration vs. Database Administration* — Data administration governs meaning and policy; database administration governs technology and operations.
  - *11.1.3 The DBA as Guardian of Data Trust* — The DBA protects availability, integrity, and confidentiality.
- **11.2 Core DBA Responsibilities** — The six pillars of database administration.
  - *11.2.1 Security and Access Management* — Who can see and change what.
  - *11.2.2 Concurrency Control* — Managing simultaneous access without conflicts.
  - *11.2.3 Transaction Management* — Ensuring multi-step operations complete correctly or not at all.
  - *11.2.4 Backup and Recovery* — Protecting against data loss.
  - *11.2.5 Performance Monitoring and Tuning* — Keeping queries fast as data grows.
  - *11.2.6 Maintenance and Evolution* — Adapting the database as requirements change.
- **11.3 Multi-User Databases and Concurrency Control** — The challenge of simultaneous access.
  - *11.3.1 Common Concurrency Problems* — Lost updates, dirty reads, non-repeatable reads, phantom reads.
  - *11.3.2 Locks* — How databases prevent conflicting operations.
  - *11.3.3 Lock Granularity* — Database-level, table-level, page-level, row-level locking trade-offs.
  - *11.3.4 Pessimistic and Optimistic Locking* — Lock-early vs. check-later strategies.
  - *11.3.5 Two-Phase Locking* — Growing and shrinking phases for serializable schedules.
  - *11.3.6 Deadlocks* — When two transactions wait for each other forever, and how DBMSs resolve them.
- **11.4 Transactions and ACID Reliability** — The guarantee system of modern databases.
  - *11.4.1 Why Transactions Matter* — Multi-step operations must succeed or fail as a unit.
  - *11.4.2 Transaction Control Commands* — BEGIN, COMMIT, ROLLBACK.
  - *11.4.3 The ACID Properties* — Atomicity, Consistency, Isolation, Durability.
  - *11.4.4 Atomicity* — All or nothing.
  - *11.4.5 Consistency* — Transactions preserve database rules.
  - *11.4.6 Isolation* — Concurrent transactions do not interfere.
  - *11.4.7 Durability* — Committed changes survive system failures.
- **11.5 Database Security** — Protecting data from unauthorized access and modification.
  - *11.5.1 The CIA Triad* — Confidentiality, Integrity, Availability.
  - *11.5.2 Authentication and Authorization* — Proving identity vs. granting permissions.
  - *11.5.3 Roles and Privileges* — Grouping permissions for manageable administration.
  - *11.5.4 Least Privilege* — Granting only the minimum access needed.
  - *11.5.5 Example: Role-Based Permissions* — Concrete SQL GRANT/REVOKE examples.
  - *11.5.6 Views as Security Layers* — Hiding columns or rows behind a view.
  - *11.5.7 SQL Injection* — How attackers exploit unvalidated input and how to prevent it.
  - *11.5.8 Security as a Continuous Process* — Security is not a one-time setup.
- **11.6 Backup and Recovery** — Ensuring data survives disasters.
  - *11.6.1 Backup Types* — Full, differential, incremental, and continuous.
  - *11.6.2 Recovery Objectives: RPO and RTO* — How much data can you lose, and how fast must you recover?
  - *11.6.3 Recovery Logs* — Transaction logs as the foundation of point-in-time recovery.
  - *11.6.4 Rollback and Rollforward* — Undoing uncommitted work; reapplying committed work after restore.
  - *11.6.5 Disaster Recovery Planning* — DR site strategies: cold, warm, hot standby.
  - *11.6.6 File-Based Backup Example* — Simple backup for file-based databases like SQLite and Access.
  - *11.6.7 SQLite Backup and Journal Modes* — .backup command and WAL journal mode.
  - *11.6.8 Cloud Backup Considerations* — Supabase/PostgreSQL managed backup features.
- **11.7 Performance Monitoring and Tuning** — Keeping the database fast under load.
  - *11.7.1 Common Performance Problems* — Missing indexes, poorly written queries, lock contention, hardware limits.
  - *11.7.2 Indexes* — How indexes speed up searches (B-tree structure explained simply).
  - *11.7.3 Index Trade-Offs* — Faster reads, slower writes, more storage.
  - *11.7.4 Reading Query Plans* — EXPLAIN and EXPLAIN QUERY PLAN to see how the DBMS executes a query.
  - *11.7.5 Performance and Query Design* — Writing queries that use indexes effectively.
  - *11.7.6 Performance and Business Impact* — Slow queries cost money, frustrate users, and delay decisions.
- **11.8 Maintenance and Database Evolution** — Keeping a living database healthy.
  - *11.8.1 Routine Maintenance Tasks* — Reindexing, updating statistics, checking integrity, archiving old data.
  - *11.8.2 Schema Changes* — Adding tables, columns, and constraints in production.
  - *11.8.3 Change Management* — Documented, tested, reversible schema changes.
  - *11.8.4 Documentation* — Data dictionaries, schema diagrams, operational runbooks.
- **11.9 DBA Work Across Platforms** — How DBA responsibilities vary by platform.
  - *11.9.1 Microsoft Access* — Limited multi-user; compact-and-repair as maintenance; no native transaction log backup.
  - *11.9.2 SQLite* — Single-writer concurrency; WAL mode; .backup and .dump for recovery.
  - *11.9.3 PostgreSQL* — Full enterprise DBA capabilities: roles, tablespaces, streaming replication, point-in-time recovery.
  - *11.9.4 Supabase and Cloud Databases* — Managed DBA services: automated backups, connection pooling, monitoring dashboards.
  - *11.9.5 Platform Comparison* — Side-by-side table of DBA capabilities across the course platforms.
- **11.10 Hands-On DBA Practice with the Grading Database** — Three layers of applied DBA work.
  - *11.10.1 Practice Layer 1: Microsoft Access* — Setting database password, compact-and-repair, backing up .accdb files.
  - *11.10.2 Practice Layer 2: SQLite* — Using .backup, setting WAL mode, creating indexes, running EXPLAIN.
  - *11.10.3 Practice Layer 3: Supabase / PostgreSQL* — Creating roles, granting privileges, viewing connection stats.
  - *11.10.4 What the Hands-On Work Teaches* — DBA is not abstract; it is practiced on every platform you use.
- **11.11 Common DBA Mistakes** — Eight errors that cause real damage.
  - *Mistake 1: Assuming Backups Work Without Testing* — Untested backups are not backups.
  - *Mistake 2: Giving Users Too Much Access* — Over-privileged accounts are the leading cause of data breaches.
  - *Mistake 3: Treating Security as an Application-Only Problem* — Defense in depth means securing every layer.
  - *Mistake 4: Ignoring Slow Queries Until Users Complain* — Performance problems compound silently.
  - *Mistake 5: Indexing Everything* — Too many indexes hurt write performance.
  - *Mistake 6: Using Cascade Delete Casually* — Cascading deletes can destroy data silently.
  - *Mistake 7: Making Unrecorded Schema Changes* — Undocumented changes become production incidents.
  - *Mistake 8: Assuming the Cloud Handles Everything* — Cloud platforms automate some tasks but not judgment.
- **11.12 Key Concepts** — Bulleted recap of essential terms.
- **11.13 Chapter Summary** — Condensed chapter takeaways.
- **Key Terms** — Vocabulary list.
- **Review Questions** — Check-understanding questions.
- **References** — Cited works and further reading.

---

## Chapter 12: Business Intelligence and Analytics for Performance Improvement
*Turning Operational Data into Strategic Insight*

Introduces business intelligence as the application of database technology to organizational decision-making. Covers OLTP vs. OLAP, ETL/ELT, data warehouses and data marts, dimensional modeling (star and snowflake schemas), OLAP operations, KPIs, the Balanced Scorecard, dashboards, BI governance, and a worked BI example built on the Grading Database.

- **Chapter Roadmap** — Table mapping each section to its main question and core idea.
- **Learning Objectives** — What students will be able to do after completing this chapter.
- **12.1 Business Intelligence Fundamentals** — What BI is and why it matters.
  - *What Is Business Intelligence?* — The technologies, processes, and practices for turning data into insight.
  - *BI as Decision Support* — BI exists to help managers make better, faster, evidence-based decisions.
  - *BI and the DIKW Hierarchy* — BI operates at the Information-to-Knowledge transition.
  - *BI and the R.E.A.D. Framework* — BI supports Association/Acquisition and Decision/Deployment.
- **12.2 Operational Systems vs. Analytical Systems** — Two different worlds with different requirements.
  - *OLTP: Systems That Run the Business* — Optimized for fast, reliable transactions.
  - *OLAP: Systems That Analyze the Business* — Optimized for complex queries across large datasets.
  - *OLTP vs. OLAP* — Side-by-side comparison of purpose, design, workload, and users.
  - *Why Not Just Analyze the Operational Database?* — Analytical queries slow down transaction processing; operational schemas are not designed for analysis.
- **12.3 ETL and ELT: Moving Data into Analytical Systems** — The data pipeline.
  - *What Is ETL?* — Extract from source, Transform for quality and consistency, Load into the analytical store.
  - *The Transform Stage* — Cleaning, deduplication, standardization, enrichment.
  - *ETL Example in SQL* — Concrete SQL that performs extract, transform, and load steps.
  - *What Is ELT?* — Extract and Load first, then Transform in the target system — the modern cloud pattern.
- **12.4 Data Warehouses, Data Marts, and Data Lakes** — Analytical storage architectures.
  - *What Is a Data Warehouse?* — A subject-oriented, integrated, time-variant, non-volatile collection of data for decision support.
  - *Metadata in BI* — The data about the data: lineage, definitions, refresh schedules.
  - *Enterprise Data Warehouse vs. Data Mart* — EDW serves the whole organization; data marts serve specific departments.
  - *Data Lakes* — Store raw data in native format; schema-on-read rather than schema-on-write.
- **12.5 Dimensional Modeling: Facts, Dimensions, and Measures** — The analytical schema.
  - *From Normalized Tables to Analytical Models* — Why analytical databases use different design principles.
  - *Facts and Measures* — Facts are events (sales, grades); measures are numeric values to aggregate.
  - *Dimensions and Descriptors* — Dimensions provide context (time, product, student, deliverable).
  - *Star Schema* — A central fact table surrounded by dimension tables.
  - *Why Star Schemas Are Denormalized* — Denormalization in analytical systems improves query performance and usability.
  - *Snowflake Schema* — Normalized dimensions; more storage-efficient but more complex to query.
- **12.6 OLAP Operations: Exploring Data from Multiple Angles** — How analysts navigate multidimensional data.
  - *Slice Example* — Fix one dimension value to create a subset.
  - *Dice Example* — Fix multiple dimension values to create a sub-cube.
  - *Drill-Down Example* — Move from summary to detail along a hierarchy.
  - *Roll-Up Example* — Move from detail to summary (the inverse of drill-down).
  - *Pivot-Style Example* — Rotating dimensions to view data from different perspectives.
- **12.7 SQL as a BI Tool** — Using the skills already built for analytical work.
  - *BI Begins with Good Queries* — Every dashboard starts as a query.
  - *Creating a Reusable BI View* — CREATE VIEW for persistent analytical structures.
  - *KPI Query: Pass Rate* — Computing a single-number performance indicator.
  - *KPI Query: Missing Submission Count* — Tracking incomplete work.
  - *KPI Query: At-Risk Students* — Identifying students below a threshold.
  - *Trend Query: Average Score by Week* — Time-series analysis in SQL.
  - *Access Version: Average Score by Deliverable Type* — Platform-specific adaptations.
- **12.8 Reports, Dashboards, and Visualization** — Communicating findings.
  - *From Rows to Recognition* — Raw query output must be translated for human consumption.
  - *Choosing the Right Visualization* — Bar, line, pie, scatter, heatmap — which answers which question.
  - *Grading Database Dashboard Example* — A concrete dashboard design with purpose for each visual.
  - *Characteristics of Effective BI Reporting* — Timely, accurate, actionable, audience-appropriate.
  - *Visualization Pitfalls* — Misleading axes, cherry-picked ranges, over-designed charts.
- **12.9 KPIs, Targets, and the Balanced Scorecard** — Measurement frameworks.
  - *What Is a KPI?* — A quantifiable measure used to evaluate success against a target.
  - *KPI Example: At-Risk Rate* — Defining and computing a specific KPI from the Grading Database.
  - *The Balanced Scorecard* — Financial, Customer, Internal Process, and Learning & Growth perspectives.
- **12.10 BI Governance and Data Quality** — Keeping BI trustworthy.
  - *Why Governance Matters* — If departments define "revenue" differently, BI reports are incomparable.
  - *Metric Definitions* — Every KPI needs an unambiguous, documented definition.
  - *Data Stewardship* — Assigning responsibility for data quality and definition.
  - *Access Control for BI* — Not everyone should see every report.
- **12.11 BI Across Access, SQLite, and Supabase** — Platform-specific BI patterns.
  - *Access BI Pattern* — Queries → Reports/Forms → Export to Excel.
  - *SQLite BI Pattern* — SQL queries → Export to CSV → Analyze in Python or Excel.
  - *Supabase/PostgreSQL BI Pattern* — Views + scheduled exports + Metabase or Power BI connection.
- **12.12 Worked Example: Building a Simple BI Layer for the Grading Database** — Seven-step walkthrough.
  - *Step 1: Define the BI Questions* — What does the instructor need to know?
  - *Step 2: Create a Core Analytical View* — Student-grade summary view.
  - *Step 3: Create a Deliverable Performance Report* — Per-deliverable statistics.
  - *Step 4: Create an At-Risk Student Report* — Identifying students needing intervention.
  - *Step 5: Create a Missing Submission Report* — Tracking incomplete work.
  - *Step 6: Create an Attendance-Performance View* — Correlating presence with scores.
  - *Step 7: Translate Queries into Dashboard Elements* — Mapping each query to a visual.
- **Key Concepts** — Foundational ideas, analytical design, and application in practice.
- **Chapter Summary** — Condensed chapter takeaways.
- **Key Terms** — Vocabulary list.
- **Review Questions** — Check-understanding questions.
- **Discussion Questions** — Open-ended questions for class discussion.
- **References** — Cited works and further reading.

---

## Chapter 13: Advanced Database Techniques
*Advanced Techniques for Performance and Flexibility*

Covers techniques that separate a working database from an enterprise-grade one. Includes indexing, transactions, constraints beyond keys, triggers, window functions, advanced analytics patterns, security and permissions, and a multi-step "Let's Build" hardening the Grading Database.

- **Chapter Roadmap** — Table mapping each section to its main question and core idea.
- **13.1 From Correct Queries to Reliable Systems** — The mindset shift from single-user correctness to multi-user reliability.
  - *13.1.1 What Advanced Techniques Protect* — Speed, correctness under concurrency, data quality, auditability, security.
  - *13.1.2 The Idea of Database Hardening* — Adding layers of protection that make mistakes harder to make.
- **13.2 Indexes: Making Queries Fast at Scale** — Performance infrastructure.
  - *13.2.1 Why Performance Problems Appear Late* — A query that is fast on 100 rows may crawl on 100,000.
  - *13.2.2 What an Index Does* — Like a book's index: the DBMS finds rows without scanning every page.
  - *13.2.3 Creating Indexes* — CREATE INDEX syntax and when to use it.
  - *13.2.4 Composite Indexes* — Multi-column indexes for multi-column WHERE clauses.
  - *13.2.5 Unique Indexes* — Enforcing uniqueness with an index.
  - *13.2.6 The Cost of Indexes* — Storage space, slower INSERT/UPDATE/DELETE, index maintenance.
  - *13.2.7 Using Query Plans* — EXPLAIN QUERY PLAN to see whether an index is being used.
- **13.3 Transactions: Protecting Multi-Step Operations** — Ensuring all-or-nothing execution.
  - *13.3.1 What a Transaction Is* — A logical unit of work that must complete entirely or not at all.
  - *13.3.2 Why Transactions Matter* — Without transactions, partial updates corrupt the database.
  - *13.3.3 A Safer Grade Update Pattern* — Using transactions for grade corrections.
  - *13.3.4 ACID in Practice* — Concrete examples of each ACID property in the Grading Database.
- **13.4 Constraints Beyond Primary Keys** — Declarative data quality rules.
  - *13.4.1 Why Keys Are Not Enough* — Keys ensure identity and relationships; constraints ensure validity.
  - *13.4.2 NOT NULL Constraints* — Preventing missing required values.
  - *13.4.3 CHECK Constraints* — Enforcing value ranges and business rules.
  - *13.4.4 UNIQUE Constraints* — Enforcing uniqueness beyond the primary key.
  - *13.4.5 DEFAULT Constraints* — Providing sensible defaults when values are omitted.
  - *13.4.6 Constraint Design Checklist* — Which constraints to apply to which columns.
- **13.5 Triggers: Automated Database Responses** — Code that runs automatically on data events.
  - *13.5.1 What Triggers Are* — Procedural code that fires on INSERT, UPDATE, or DELETE.
  - *13.5.2 Trigger Use Cases* — Audit logging, validation beyond CHECK, maintaining derived data, enforcing cross-table rules.
  - *13.5.3 Audit Logging Example* — A trigger that records who changed what and when.
  - *13.5.4 Preventing Invalid Scores with a Trigger* — Rejecting out-of-range scores before they are committed.
  - *13.5.5 PostgreSQL Trigger Pattern* — CREATE FUNCTION + CREATE TRIGGER syntax.
  - *13.5.6 Trigger Caution* — Triggers are invisible to application code; overuse creates debugging nightmares.
- **13.6 Window Functions: Analytics Without Losing Detail** — Deeper treatment following Chapter 9's introduction.
  - *13.6.1 GROUP BY vs. Window Functions* — GROUP BY collapses rows; window functions preserve them.
  - *13.6.2 Basic Syntax* — OVER(), PARTITION BY, ORDER BY in window functions.
  - *13.6.3 Student Average Beside Each Grade* — AVG() OVER(PARTITION BY StudentID).
  - *13.6.4 Ranking Students Within a Deliverable* — RANK() and DENSE_RANK().
  - *13.6.5 Running Average Over Time* — ROWS BETWEEN for sliding windows.
  - *13.6.6 Ranking Functions* — ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE() compared.
- **13.7 Advanced Analytics Patterns** — Reusable analytical query templates.
  - *13.7.1 Conditional Aggregation* — COUNT with CASE inside.
  - *13.7.2 Pass Rate by Deliverable* — Percentage above threshold per assessment.
  - *13.7.3 Attendance Rate by Student* — Presence percentage computation.
  - *13.7.4 Normalized Scores* — Z-scores or min-max scaling in SQL.
  - *13.7.5 Weighted Grade Calculation* — Full weighted final grade in a single query chain.
  - *13.7.6 Dashboard-Ready Views* — Creating views designed to feed BI tools.
- **13.8 Security and Permissions** — Controlling access at the database level.
  - *13.8.1 Authentication vs. Authorization* — Who you are vs. what you are allowed to do.
  - *13.8.2 Role-Based Access Control* — Creating roles, assigning privileges, granting roles to users.
  - *13.8.3 SQL Permission Examples* — GRANT SELECT, INSERT, UPDATE, DELETE, and REVOKE.
  - *13.8.4 Row-Level Security Concept* — Filtering which rows a user can see based on their identity.
  - *13.8.5 Auditing Security-Sensitive Changes* — Tracking who changed permissions and when.
- **13.9 Advanced Techniques Across Platforms** — Platform-specific capabilities.
  - *13.9.1 Microsoft Access* — Limited index control, no triggers, data macros as partial substitute, user-level security deprecated.
  - *13.9.2 SQLite* — Indexes, CHECK constraints, triggers, no user-level security, WAL mode for concurrency.
  - *13.9.3 Supabase/PostgreSQL* — Full suite: indexes, constraints, triggers, window functions, RBAC, row-level security.
  - *13.9.4 Platform Choice as a Business Decision* — Capability needs drive platform selection.
- **13.10 Let's Build: Hardening the Grading Database** — Seven-step hands-on hardening exercise.
  - *13.10.1 Step 1: Identify Critical Risks* — What could go wrong in the current Grading Database?
  - *13.10.2 Step 2: Add Performance Indexes* — CREATE INDEX on frequently filtered columns.
  - *13.10.3 Step 3: Add Data Quality Constraints* — CHECK, NOT NULL, UNIQUE constraints.
  - *13.10.4 Step 4: Create an Audit Trail* — Trigger-based logging of grade changes.
  - *13.10.5 Step 5: Use a Transaction for Grade Correction* — Safe multi-row UPDATE within BEGIN/COMMIT.
  - *13.10.6 Step 6: Create a Performance Monitoring Query* — Detecting slow queries.
  - *13.10.7 Step 7: Build a Student Progress View* — A hardened view for BI consumption.
  - *13.10.8 What You Accomplished* — Summary of protections added.
- **Key Concepts** — Foundational ideas and practical design rules.
- **Chapter Summary** — Condensed chapter takeaways.
- **Key Terms** — Vocabulary list.
- **Review Questions** — Check-understanding questions.
- **Discussion Questions** — Open-ended questions for class discussion.
- **References** — Cited works and further reading.

---

## Chapter 14: Power BI, Microsoft Access, and Business Reporting
*From Data to Dashboard: Communicating Insight to Decision-Makers*

Introduces Microsoft Power BI as the industry-standard tool for turning database output into visual business reports. Covers connecting Power BI to Access, Power Query data shaping, building data models, DAX measures and calculated columns, choosing visuals, building a multi-page Grading Dashboard, slicers and drill-through, publishing and refresh, and report design principles.

- **Learning Objectives** — What students will be able to do after completing this chapter.
- **Chapter Roadmap** — Table mapping each section to its main question and core idea.
- **14.1 Power BI in the Business Intelligence Pipeline** — Where Power BI fits.
  - *14.1.1 Power BI Desktop, Service, and Mobile* — The three components: design, share, consume.
  - *14.1.2 What Power BI Adds Beyond Access* — Interactive visuals, cross-source data models, web sharing, scheduled refresh.
  - *14.1.3 The Main Principle* — Start with the decision, then choose the data and visual.
- **14.2 Preparing the Microsoft Access Database for Power BI** — Clean data in, clean reports out.
  - *14.2.1 Recommended Grading Database Tables* — Which tables to import and why.
  - *14.2.2 Relationship Logic in Access* — Ensuring relationships are defined before connecting Power BI.
  - *14.2.3 Clean Field Names Before Importing* — No spaces, no reserved words, consistent casing.
  - *14.2.4 Saved Access Queries as BI Sources* — Using pre-built Access queries instead of raw tables.
  - *14.2.5 Example: Access Query for Grade Analytics* — A query designed for Power BI consumption.
  - *14.2.6 Example: Access Query for Attendance Analytics* — Attendance data shaped for visual analysis.
- **14.3 Connecting Power BI Desktop to Microsoft Access** — The connection workflow.
  - *14.3.1 Step-by-Step Connection Workflow* — Get Data → Access Database → select objects → Load or Transform.
  - *14.3.2 Which Access Objects Should Be Imported?* — Tables vs. queries vs. both.
  - *14.3.3 Common Access Connection Problems* — Driver issues, 32/64-bit mismatches, file locks.
  - *14.3.4 Import Mode vs. Live Connection* — Import caches data for performance; live connection queries on demand.
- **14.4 Power Query: Cleaning and Shaping Access Data** — The ETL layer inside Power BI.
  - *14.4.1 Why Power Query Matters* — Most real-world data needs cleaning before it can be visualized.
  - *14.4.2 Recommended Transformations for the Grading Database* — Rename, reorder, change type, remove columns, filter rows.
  - *14.4.3 Example Power Query Transformations* — Concrete M-language or UI-driven steps.
  - *14.4.4 Example: Adding a Full Name Column in Power Query* — Concatenating FirstName and LastName.
  - *14.4.5 Example: Handling Missing Scores* — Replacing null with a meaningful value or leaving as-is.
  - *14.4.6 Load Only What You Need* — Filtering rows and columns to keep the model lean.
- **14.5 Building the Power BI Data Model** — Relationships and structure in Power BI.
  - *14.5.1 Model View* — The diagram view where table relationships are defined.
  - *14.5.2 Fact Tables and Dimension Tables in Power BI* — Identifying which tables are facts and which are dimensions.
  - *14.5.3 Hide Technical Fields* — Hiding ID columns from the report view to reduce clutter.
  - *14.5.4 Create a Date Table When Needed* — Building a calendar dimension for time intelligence.
- **14.6 DAX: Measures, Calculated Columns, and Metrics** — The formula language of Power BI.
  - *14.6.1 Calculated Column Example: Student Name* — Concatenating names in DAX.
  - *14.6.2 Calculated Column Example: Score Band* — Categorizing scores with SWITCH or IF.
  - *14.6.3 Measure Example: Average Score* — AVERAGE() with filter context.
  - *14.6.4 Measure Example: Total Submissions* — COUNTROWS() for submission counts.
  - *14.6.5 Measure Example: Missing Submissions* — COUNTROWS with filter for NULL scores.
  - *14.6.6 Measure Example: Pass Rate* — DIVIDE passed by total.
  - *14.6.7 Measure Example: Attendance Rate* — Percentage of present records.
  - *14.6.8 Measure Example: Weighted Grade* — SUMX for weighted aggregation.
  - *14.6.9 Measure Example: At-Risk Students* — COUNTROWS with threshold filter.
  - *14.6.10 DAX Good Practice* — Use measures over calculated columns when possible; format everything; comment complex formulas.
- **14.7 Choosing the Right Visual** — Matching visual to message.
  - *14.7.1 Core Visuals for the Grading Dashboard* — Card, bar chart, line chart, table, matrix, gauge, scatter plot.
  - *14.7.2 Avoiding Misleading Visuals* — Truncated axes, 3D charts, pie charts with too many slices.
- **14.8 Building a Grading Dashboard in Power BI** — Multi-page dashboard walkthrough.
  - *14.8.1 Dashboard Goal* — Give the instructor a single-page view of class performance.
  - *14.8.2 Page 1: Executive Summary* — KPIs at a glance: average score, pass rate, attendance rate, at-risk count.
  - *14.8.3 Page 2: Student Detail* — Per-student performance with drill-through from summary.
  - *14.8.4 Page 3: Assignment Analysis* — Per-deliverable statistics and difficulty ranking.
  - *14.8.5 Page 4: Attendance and Engagement* — Attendance trends and correlation with performance.
  - *14.8.6 Page 5: Data Quality Review* — Missing data, outliers, and consistency checks.
- **14.9 Slicers, Filters, Drill-Down, and Drill-Through** — Interactive navigation.
  - *14.9.1 Slicers* — Visual filters that let users select categories, dates, or students.
  - *14.9.2 Filters* — Page-level, report-level, and visual-level filters.
  - *14.9.3 Drill-Down* — Moving from year → quarter → month → day in a hierarchy.
  - *14.9.4 Drill-Through* — Right-click to navigate from summary to detail page.
  - *14.9.5 Tooltips* — Hover-over detail without cluttering the main view.
- **14.10 Publishing, Sharing, and Refresh** — Taking the report live.
  - *14.10.1 Publishing Workflow* — Publish from Desktop to Power BI Service.
  - *14.10.2 Sharing Considerations* — Pro licenses, workspaces, apps, and embedding.
  - *14.10.3 Refreshing Access Data* — Scheduled refresh requires a gateway for local Access files.
  - *14.10.4 Refresh Checklist* — Gateway installed, credentials configured, schedule set.
- **14.11 Report Design Principles** — Making reports that managers will actually use.
  - *14.11.1 Start with the Decision* — Every visual should answer one question.
  - *14.11.2 Use a Clear Visual Hierarchy* — Most important metric top-left; related visuals grouped.
  - *14.11.3 Label Metrics Clearly* — Every number should have an unambiguous label.
  - *14.11.4 Avoid Dashboard Overload* — Six to eight visuals per page maximum.
  - *14.11.5 Use Tables When Detail Matters* — Tables are appropriate when users need exact values.
  - *14.11.6 Use Color Carefully* — Consistent color coding; avoid red/green for the colorblind; use color to highlight, not decorate.
- **14.12 Complete Power BI Lab: Access to Dashboard** — End-to-end student exercise.
  - *Lab Goal* — Build a complete multi-page dashboard from the Grading Database Access file.
  - *Step 1: Prepare Access* — Clean up field names, create helper queries.
  - *Step 2: Connect Power BI to Access* — Import tables and queries.
  - *Step 3: Clean Data in Power Query* — Apply transformations.
  - *Step 4: Build Relationships* — Define the data model.
  - *Step 5: Create DAX Measures* — All required measures.
  - *Step 6: Build the Report Pages* — Executive summary, student detail, assignment analysis, attendance.
  - *Step 7: Format and Test* — Apply formatting, test slicers, verify numbers.
  - *Step 8: Publish or Submit* — Publish to Power BI Service or submit .pbix file.
- **Key Concepts** — Bulleted recap of essential terms.
- **Chapter Summary** — Condensed chapter takeaways.
- **Key Terms** — Vocabulary list.
- **Review Questions** — Check-understanding questions.
- **Practice Assignment: Build a Power BI Grading Dashboard** — Required pages, required DAX measures, submission requirements.
- **References** — Cited works.

---

## Chapter 15: Business Strategy and Information Systems
*Aligning Data, Technology, and Competitive Advantage*

Connects the technical and analytical skills built throughout the course to business strategy. Covers competitive advantage through IT, Porter's Five Forces, Generic Strategies, the Value Chain, the Resource-Based View, strategic IS alignment, KPIs as strategic signals, SQL as a strategic capability, the Balanced Scorecard, and the risks of poor information strategy.

- **Chapter Roadmap** — Table mapping each section to its main question and core idea.
- **Learning Objectives** — What students will be able to do after completing this chapter.
- **15.1 What Is Business Strategy?** — Strategy fundamentals.
  - *15.1.1 Strategy as Choice and Trade-Off* — Strategy is deciding what to do and what not to do.
  - *15.1.2 Operational Effectiveness vs. Strategic Positioning* — Doing the same things better vs. doing different things.
  - *15.1.3 Strategy Depends on Information* — Every strategic choice requires data about customers, competitors, costs, and capabilities.
  - *15.1.4 Evidence-Based Management* — Using data, not intuition, to guide strategic decisions.
- **15.2 Information Systems as Strategic Infrastructure** — IS as a source of advantage.
  - *15.2.1 From Tools to Systems* — Individual technologies become strategic when integrated into systems.
  - *15.2.2 Institutional Memory* — Databases preserve organizational knowledge beyond individual employees.
  - *15.2.3 Four Strategic Capabilities of Information Systems* — Automate, informate, transform, and create.
- **15.3 Competitive Advantage and Information Systems Frameworks** — Classic strategy frameworks applied to IS.
  - *15.3.1 Porter's Five Forces* — How IS can reduce buyer power, supplier power, threat of entry, substitution, and rivalry.
  - *15.3.2 Porter's Generic Strategies* — Cost leadership, differentiation, and focus — and how IS supports each.
  - *15.3.3 Porter's Value Chain* — Primary and support activities; where IS creates margin.
  - *15.3.4 The Resource-Based View* — IS as a resource that is valuable, rare, inimitable, and non-substitutable (VRIN).
- **15.4 Strategy Requires Analytics** — The bridge from BI to strategy.
  - *15.4.1 KPIs as Strategic Signals* — KPIs should measure what matters to the strategy, not just what is easy to count.
  - *15.4.2 The Balanced Scorecard* — Financial, Customer, Internal Process, and Learning & Growth perspectives aligned to strategy.
  - *15.4.3 Business Intelligence as a Feedback Loop* — BI tells you whether the strategy is working.
- **15.5 SQL as a Strategic Capability** — How query skills become strategic assets.
  - *15.5.1 Query Logic Shapes Organizational Reality* — The queries you write define what the organization sees and measures.
  - *15.5.2 Strategic Questions Enabled by Advanced SQL* — Customer segmentation, profitability analysis, churn prediction, trend detection.
  - *15.5.3 Example: Running Average as Strategic Insight* — Smoothing noise to see the real trend.
  - *15.5.4 Example: Scenario Modeling with a CTE* — "What if" analysis in SQL.
  - *15.5.5 Why Poor SQL Leads to Poor Strategy* — Wrong queries produce wrong numbers, which produce wrong decisions.
- **15.6 Strategic Alignment: Business Goals and System Design** — Making IS serve strategy.
  - *15.6.1 The Alignment Triangle* — Business strategy, IS strategy, and organizational infrastructure must align.
  - *15.6.2 Alignment Questions* — Does our technology support our competitive positioning? Does our data model reflect our business model?
  - *15.6.3 Build, Buy, or Cloud* — Strategic sourcing decisions for IS capabilities.
  - *15.6.4 Three Horizons of IS Planning* — Maintain current systems, grow new capabilities, explore transformative options.
- **15.7 Risks of Poor Information Strategy** — What happens when IS and strategy are misaligned.
  - *15.7.1 False Confidence* — Believing a dashboard when the underlying data is wrong.
  - *15.7.2 Misleading Dashboards* — KPIs that look good but measure the wrong thing.
  - *15.7.3 KPI Gaming* — When people optimize the metric instead of the outcome.
  - *15.7.4 Decision Paralysis* — Too much data, no framework for action.
  - *15.7.5 Technical Roots of Strategic Failure* — Poor database design, inconsistent definitions, and broken pipelines cause strategic errors.
- **15.8 The Grading Database as a Strategic System** — Applying strategic thinking to the course's own database.
  - *15.8.1 What the System Measures* — Performance, engagement, attendance, progress.
  - *15.8.2 Strategic Questions the Database Can Answer* — Who is at risk? Which assignments are too hard? Is attendance correlated with performance?
  - *15.8.3 Example: At-Risk Student Dashboard* — From query to decision: identifying and intervening for struggling students.
  - *15.8.4 Ethical Considerations* — What should you measure? What should you act on? Where is the line between insight and intrusion?
- **15.9 Integrating the Course: From Data to Strategy** — The full arc completed: Data → Tables → Relationships → Queries → Analytics → Decisions → Strategy.
- **Key Concepts** — Bulleted recap of essential terms.
- **Chapter Summary** — Condensed chapter takeaways.
- **Review Questions** — Check-understanding questions.
- **Discussion Questions** — Open-ended questions for class discussion.
- **Let's Build: Strategic Alignment Plan for the Grading Database** — Six-step hands-on exercise.
  - *Step 1: Define the Strategic Goal* — What should the grading system help the instructor achieve?
  - *Step 2: Define the Decisions* — What decisions should the data support?
  - *Step 3: Identify Required Data* — What must be captured and stored?
  - *Step 4: Define KPIs* — What metrics signal success?
  - *Step 5: Recommend a Dashboard* — What should the instructor see at a glance?
  - *Step 6: Identify Governance Rules* — Who can change grades? Who can see what?
  - *Deliverable* — A one-page strategic alignment memo.
- **Key Terms** — Vocabulary list.
- **References** — Cited works and further reading.

---

## Chapter 16: Final Integration — Project, Test, and Course Synthesis
*From Data to Decisions: Full-Cycle Review*

Provides a comprehensive capstone that integrates all fifteen prior chapters. Includes the final project (building a complete Grading Database with ERD, SQL, macros, and BI components), the final test based on a Research Publications Database case study, study strategy, submission checklists, and a closing reflection on what the course was really about.

- **Chapter Roadmap** — Table mapping each section to its main question.
- **Learning Objectives** — What students will be able to do after completing this chapter.
- **16.1 The Final Integration Point** — Frames the final assessment as the moment where all course skills converge.
- **16.2 Final Project Overview** — What the project requires.
  - *Required Submission Files* — List of deliverables.
  - *Query Naming Requirement* — Consistent naming conventions for submitted SQL.
  - *PDF Formatting Requirement* — How queries must be formatted for submission.
- **16.3 Final Project Tasks** — Thirteen tasks spanning the full course skill set.
  - *Task 1: Entity Relationship Diagram (ERD)* — Design the Grading Database ERD.
  - *Task 2: SQL Table Creation Code* — Write DDL for all tables with constraints.
  - *Task 3: Attendance Query To Date* — Compute attendance through a given date.
  - *Task 4: Append Attendance Score to the STUDENT_GRADE Table* — Transfer attendance points into the grade system.
  - *Task 5: Deliverable Summary Query To Date* — Per-deliverable statistics.
  - *Task 6: Final Grade Calculation Query Up to Date* — Weighted final grade computation.
  - *Task 7: Letter Grade Calculation Queries* — Converting numeric grades to letters.
  - *Task 8: Minimum Grade Analysis* — Finding the lowest scores and their context.
  - *Task 9: Maximum Grade Analysis* — Finding the highest scores and their context.
  - *Task 10: Macro Development and Automation* — Access macros for grade calculation and report generation.
  - *Task 11: Database Administration Functions* — Backup, compact/repair, security settings.
  - *Task 12: Business Intelligence Functions* — Export queries for BI tools; build a summary report.
  - *Task 13: Final Reflection and Learning Outcomes* — Written reflection on skills developed.
- **16.4 Project SQL Guidance and Common Pitfalls** — Avoiding common errors.
  - *Use Saved Queries as Building Blocks* — Compose complex queries from simpler saved ones.
  - *Use Access Date Literals Correctly* — #mm/dd/yyyy# format.
  - *Do Not Confuse Zero and NULL* — They mean different things and behave differently.
  - *Do Not Average Averages Carelessly* — Averaging averages produces wrong results.
  - *Show All Students* — Use LEFT JOIN to include students with no grades.
- **16.5 Final Test Overview: The Research Publications Database** — A new case study for the final exam.
  - *Database Schema* — Tables: PROFESSOR, DEPARTMENT, PUBLICATION, AUTHOR, JOURNAL.
  - *Basic Meaning of Each Table* — What each table represents in the research domain.
  - *Core Relationship Structure* — How professors, departments, publications, and journals connect.
- **16.6 Publication Scoring Logic** — The business rules for the test scenario.
  - *Scoring Rule* — How publication points are divided among co-authors.
  - *Example* — Worked example of the scoring calculation.
  - *Validation Checks* — How to verify scoring logic is correct.
- **16.7 Building the Core Test Queries** — Ten test queries students must be prepared to write.
  - *Query A: Count Authors per Publication*
  - *Query B: Calculate Author Credit per Publication*
  - *Query C: Calculate Total Score per Professor*
  - *Query D: Count Unique Publications per Professor*
  - *Query E: Department Scores*
  - *Query F: Unique Publications by Department*
  - *Query G: Co-Authorship Between Two Professors*
  - *Query H: Authors of a Specific Publication*
  - *Query I: Publications by Journal Rating*
  - *Query J: Publications by Publisher*
- **16.8 Final Test Question Map** — How test questions map to course topics.
  - *Score and Publication Count Questions* — SQL aggregation and joins.
  - *Collaboration and Authorship Questions* — Many-to-many relationships.
  - *Cardinality Questions* — Relationship type identification.
  - *Database Limitations and Data Mart Questions* — BI and data warehousing concepts.
  - *BI Decision Questions* — Applying BI frameworks.
  - *Normalization Questions* — Identifying normal form violations.
  - *Macro and Data Macro Questions* — Access automation concepts.
  - *Security and Permissions Question* — DBA concepts.
  - *ACID and Concurrency Questions* — Transaction concepts.
  - *Full Outer Join Logic* — Advanced join reasoning.
- **16.9 Final Test Study Strategy** — How to prepare effectively.
  - *Build the Relationships First* — Understand the schema before writing queries.
  - *Create Saved Queries* — Build incrementally and save intermediate results.
  - *Validate Before Answering* — Test queries against expected results.
  - *Watch for Double Counting* — JOINs can multiply rows; use DISTINCT or aggregation to correct.
  - *Keep Ratings Exact* — Journal ratings must match the provided data exactly.
- **16.10 Submission and Quality Checklist** — What to verify before submitting.
  - *Final Project Checklist* — ERD, DDL, queries, macros, BI, reflection.
  - *Final Test Checklist* — All questions answered, queries validated, formatting correct.
- **16.11 Final Reflection: What This Course Was Really About** — The course is not about memorizing SQL syntax; it is about learning to think in systems, to question data, and to connect technical skills to business judgment.
- **Key Terms** — Vocabulary list.
- **Review Questions** — Check-understanding questions.
- **Closing Note** — Encouraging final message to students.

---

## Chapter 17: Designing Systems That Matter (Conclusion)
*From Technical Skill to Managerial Judgment*

The book's conclusion. Revisits the complete data-to-decisions arc, reframes technical skills as managerial judgment, revisits the R.E.A.D. framework with deeper insight, draws lessons from the Grading Database, covers ethics and responsibility, explores real-world IS lessons across industries, and provides ten habits of a data-literate professional plus guidance for next learning paths.

- **Chapter Roadmap** — Table mapping each section to its main question.
- **Learning Objectives** — What students will take away from this concluding chapter.
- **17.1 The Journey You Completed** — Acknowledges the arc from Chapter 1's orientation to this final synthesis.
  - *From Technical Fragments to System Thinking* — The course's real achievement: seeing the whole, not just the parts.
- **17.2 The Full Data-to-Decision Arc** — The complete arc in one place, with each stage revisited at a higher level.
  - *Data* — Data fundamentals; classification; quality; ethics.
  - *Tables* — Structure; keys; constraints; normalization.
  - *Relationships* — The relational model; foreign keys; referential integrity.
  - *Queries* — SQL from SELECT to window functions and CTEs.
  - *Analytics* — Aggregation; BI; dimensional modeling; OLAP.
  - *Reports and Dashboards* — Power BI; DAX; visual design; communication.
  - *Decisions* — KPIs; the Balanced Scorecard; evidence-based management.
  - *Strategy* — Porter's frameworks; the Resource-Based View; strategic alignment.
- **17.3 Technical Skills as Managerial Judgment** — The core message of the conclusion.
  - *Why Managers Need Database Literacy* — You cannot ask good questions of data you do not understand.
  - *The Manager as Translator* — Bridging business needs and technical implementation.
- **17.4 The R.E.A.D. Framework Revisited** — Deeper insight into the framework introduced in Chapter 2.
  - *Represent and Retrieve* — Storing data so it can be found.
  - *Express and Explain* — Turning retrieved data into meaning.
  - *Analyze and Associate* — Connecting patterns to decisions.
  - *Decide and Deploy* — Acting on insight.
  - *R.E.A.D. as a Professional Habit* — Using the framework beyond the course.
- **17.5 What the Grading Database Really Taught You** — The hidden curriculum.
  - *The Grading Database as a Mirror of Organizational Life* — Grades are like any organizational metric: they must be defined, stored, queried, and interpreted.
  - *What You Practiced* — Design, query, administration, BI, strategy — all on one running case.
- **17.6 Ethics, Trust, and Responsibility** — The ethical dimension of data work.
  - *Ethics Begins Before Analysis* — Ethical questions arise in design, data collection, and storage, not just in reporting.
  - *The Four Trust Questions* — Is the data accurate? Is it complete? Is it being used as intended? Who is affected?
  - *Real-World Example: Healthcare Data* — When poor data design harms patients.
  - *Real-World Example: Hiring Analytics* — When biased data produces biased decisions.
  - *Your Responsibility* — Every database professional holds an ethical obligation to the people whose data they manage.
- **17.7 Real-World Information System Lessons** — How the course concepts apply across industries.
  - *Retail: Inventory, Loyalty, and Forecasting* — Databases drive inventory management, customer segmentation, and demand prediction.
  - *Airlines: Operations Under Pressure* — Reservation systems, crew scheduling, maintenance tracking — all database-dependent.
  - *Universities: Advising and Student Success* — The Grading Database is a microcosm of university analytics: enrollment, advising, retention.
  - *Public Agencies: Accountability and Service Delivery* — Government databases must be secure, auditable, and accessible.
  - *Small Businesses: The Quiet Power of Good Structure* — Even a five-table database can transform a small business's decision-making.
- **17.8 Habits of a Data-Literate Professional** — Ten practices to carry forward.
  - *Habit 1: Ask What the Data Represents* — Data is not self-explanatory; always ask what it means.
  - *Habit 2: Look for the Key* — Every table should have a clear primary key; if it does not, ask why.
  - *Habit 3: Respect Relationships* — Relationships are not decoration; they are the logic of the database.
  - *Habit 4: Treat NULL Carefully* — NULL means unknown, not zero, not blank; handle it explicitly.
  - *Habit 5: Validate Before Trusting* — Test queries against known results; spot-check data before presenting it.
  - *Habit 6: Document Assumptions* — Write down what you assumed when designing a query or report.
  - *Habit 7: Design for Change* — Business rules change; design schemas that can evolve.
  - *Habit 8: Communicate Clearly* — Technical findings must be translated for non-technical audiences.
  - *Habit 9: Keep the Human Being in View* — Every data point refers to a person, a transaction, or an event that matters to someone.
  - *Habit 10: Stay Curious* — Technology and tools change; the habit of asking good questions endures.
- **17.9 Your Next Learning Path** — Where to go from here.
  - *Path 1: Advanced SQL and Database Engineering* — Deeper into performance, administration, and architecture.
  - *Path 2: Business Intelligence and Analytics* — Power BI certification, Tableau, data storytelling.
  - *Path 3: Data Science and Machine Learning* — Python, R, statistical modeling, and predictive analytics.
  - *Path 4: Information Systems Strategy* — IT management, CIO-track, digital transformation.
  - *Path 5: Responsible AI and Data Governance* — Ethics, regulation, privacy, and algorithmic accountability.
  - *A Practical 90-Day Learning Plan* — Concrete next steps organized into a three-month self-study plan.
- **17.10 Final Reflection: What You Should Carry Forward** — The book's closing message: data skills are decision skills; database thinking is system thinking; the arc from data to decisions is not just a course structure — it is a career-long practice.
- **Key Concepts** — Bulleted recap of essential terms.
- **Final Review Questions** — Course-closing reflection questions.
- **Closing Note** — Final words from the author.

