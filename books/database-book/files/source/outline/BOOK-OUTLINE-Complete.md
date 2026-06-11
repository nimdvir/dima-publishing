% Using Data to Drive Business Performance: Databases and Management Information Systems
% Complete Book Outline
% 16-Chapter Structure with Sections

---

# Using Data to Drive Business Performance

## Databases and Management Information Systems

### A Complete 16-Chapter Textbook

---

## Part 1: Foundations and Philosophy

### Chapter 1: Introduction to the Textbook

**Subtitle:** Orientation to BITM330 and the Journey from Data to Decision

**Description:** Sets the stage for the entire book. Introduces the textbook's philosophy, structure, and the Grading Database project that serves as the running case study throughout. Explains the five core competencies, the R.E.A.D. framework, and the student mindset required for success. Establishes why this book takes a systems-thinking approach to databases and information systems.

**Key Sections:**

- Welcome and core promise
- Why this book exists (gap in market, differentiation)
- Author background and philosophy
- Five core competencies
- The R.E.A.D. framework (Recognize, Extract, Analyze, Decide)
- Book structure and evolution
- Assessment methodology (Bloom's Taxonomy integration)
- Grading Database as running project
- Course connection

---

### Chapter 2: Foundations of Information Systems

**Subtitle:** How Data Drives Business Performance

**Description:** Establishes the foundational concepts of business and information systems. Covers the Input-Process-Output model, business performance measurement, the DIKW hierarchy, and the role of information systems in organizational decision-making. Introduces the five-component framework of IS (hardware, software, data, people, processes) and explains why strategic alignment between IT and business strategy matters.

**Key Sections:**

- Understanding data in business context (data, business, management, performance measurement)
- From data to decisions (DIKW hierarchy, decision-making at all levels)
- Information systems as the engine (definition, five-component framework, business processes)
- Managing technology for business value (MIS, BITM, strategic alignment, governance)
- Looking ahead (emerging trends, why databases matter)


Lab


- Understanding data in business context (data, business, management, performance measurement)
- From data to decisions (DIKW hierarchy, decision-making at all levels)
- Information systems as the engine (definition, five-component framework, business processes)
- Managing technology for business value (MIS, BITM, strategic alignment, governance)
- Looking ahead (emerging trends, why databases matter)

Look at the vet clinic

What are main KPIs

What are the main issues in finding this KPI?

What data does this store?

What information?

What knowledge?

What wisdon, meaning decision making can be nade based on this?


---

### Chapter 3: Understanding Data Fundamentals

**Subtitle:** The Foundation of Every Database, Every Query, and Every Decision

**Description:** Deep dive into data itself. Covers data classification (qualitative vs. quantitative, categorical vs. numerical, measurement levels, structured vs. unstructured), data types in databases, the transition from spreadsheets to databases, tables and keys, metadata, data quality, governance, and the data lifecycle. Addresses ethics, privacy, and emerging data technologies.

**Key Sections:**

- What is data? (data hierarchy, data as infinite spring)
- From data to wisdom (DIKW, R.E.A.D. model)
- Classifying data (measurement levels, data types)
- Tables, keys, and relational rules
- Metadata and data governance
- Data quality and risks
- Data lifecycle stages
- Ethics and the future of data


#### Lab #2


- What is data? (data hierarchy, data as infinite spring)
- From data to wisdom (DIKW, R.E.A.D. model)
- Classifying data (measurement levels, data types)
- Tables, keys, and relational rules
- Metadata and data governance
- Data quality and risks
- Data lifecycle stages
- Ethics and the future of data

---

## Part 2: Database Fundamentals and SQL

### Chapter 4: Introduction to Databases

**Subtitle:** From Spreadsheets to Structured Systems

**Description:** Introduces databases as the core technology for data management. Explains why spreadsheets are not databases, the problems with traditional file environments (redundancy, inconsistency, dependence, scalability), and the database approach. Covers table structures, integrity constraints, introduction to SQL, and the role of database management systems (DBMS).

**Key Sections:**

- Why we start with databases (databases at center, SQL as unifying skill)
- Foundations of data management
- Why spreadsheets are not databases (VLOOKUP trap, structural limits)
- Problems with file environments (redundancy, inconsistency, program-data dependence)
- The database approach (centralized data, logical/physical views, consistency)
- Tables as core structure
- Constraints and data integrity
- Introduction to SQL (declarative, statement cycle)
- DBMS platforms (Access, SQLite, Supabase)
- Why one big table breaks down


#### Lab

MS Access with just two tables 

---

### Chapter 5: SQL — The Language of Databases

**Subtitle:** How Structured Queries Transform Stored Data into Business Insight

**Description:** Comprehensive introduction to SQL as the universal language of databases. Covers SQL categories (DDL, DML), table creation, data insertion, querying with SELECT/WHERE/ORDER BY, JOINs across tables, aggregation with GROUP BY, subqueries, views, CTEs, and data modification. Emphasizes SQL as a tool for business insight and decision-making.

**Key Sections:**

- Why SQL comes next (structure to questions, business performance)
- What is SQL? (three roles, declarative nature)
- Tools you will use (PostgreSQL, Supabase, SQLite)
- SQL ecosystem and DBMS platforms
- The Grading Database context
- DDL vs DML (data definition vs manipulation)
- Creating tables (CREATE TABLE, foreign keys, ALTER TABLE)
- Inserting data (INSERT INTO, populating Grading Database)
- Querying data (SELECT, WHERE, ORDER BY, AS)
- Working across tables (INNER JOIN, LEFT JOIN, missing work detection)
- Aggregation (GROUP BY, HAVING, aggregate functions)
- Expressions and calculations (arithmetic, dates, CASE)
- Subqueries (WHERE, FROM, SELECT)
- Views and CTEs
- UNION and combining results
- Updating and deleting
- Advanced SQL topics ahead



#### Lab

Using Sql on the Vet database 

---

## Part 3: Relational Design and Modeling

### Chapter 6: The Relational Model

**Subtitle:** How Connected Tables Replace Redundancy with Structure, Integrity, and Analytical Power

**Description:** Introduces the relational model as the theoretical foundation for database design. Explains why one flat table is not enough, data anomalies, and the power of connected tables. Covers entities, relationships, primary keys (natural vs. surrogate), foreign keys, relationship types (1:1, 1:N, M:N), referential integrity, and how the Grading Database evolves from simple structure to full relational schema. Includes practical work in Microsoft Access.

**Key Sections:**

- From flat tables to relationships
- The flat-file trap (single-table flaw, redundancy, anomalies)
- What is the relational model?
- Entities and relations
- Primary keys (natural vs. surrogate)
- Foreign keys and one-to-many relationships
- Understanding relationship types (1:1, 1:N, M:N)
- Referential integrity (enforcement, violations, reporting)
- The relational model in practice (joins, flexibility)
- Evolution of Grading Database (five stages)
- The full Grading schema
- Building in Microsoft Access (design view, relationships, queries)
- Preview of normalization


#### Lab


Primary key and foreign keys


---

### Chapter 7: Data Normalization

**Subtitle:** From flat files to reliable relational design

**Description:** Covers normalization as the discipline for eliminating data redundancy and anomalies. Progressive introduction to normal forms (1NF, 2NF, 3NF), functional dependencies, composite keys, and practical application. Uses the Grading Database as the case study. Bridges the gap between relational theory and database design practice.

**Key Sections:**

- What is data normalization? (definition, why it exists, relational model foundation)
- The flat table problem (single-table design, what looks right but is wrong)
- Functional dependencies (logic behind normalization, everyday terms, Grading Database examples)
- Normal forms as progressive levels of design quality
- First Normal Form (1NF): One cell, one fact (core rule, violations, fixes)
- Second Normal Form (2NF): Removing partial dependencies (composite keys, resolution)
- Third Normal Form (3NF): Eliminating transitive dependencies
- Beyond 3NF and practical considerations
- Normalization and analytics
- Thinking ahead toward implementation


#### Lab

Let's normalize the database completely


---

## Part 4: SQL Mastery and Database Operations

### Chapter 9: Advanced SQL With the Grading Database

**Subtitle:** Advanced SQL patterns for deeper analysis

**Description:** Takes SQL from basic queries to sophisticated analysis. Covers complex patterns for business intelligence, performance measurement, student success prediction, and grade analytics. Uses the Grading Database to demonstrate real-world scenarios of aggregation, complex joins, and decision-support queries.

**Key Sections:**

- Introduction: From writing queries to designing intelligence
- Tools and platforms
- What makes SQL "advanced"?
- Pattern 1: Integrating concepts into decisions
- Comparative table and application

---

### Chapter 8: Midterm Review - Concepts

**Subtitle:** Integrated midterm review across core database topics

**Description:** Comprehensive review checkpoint for the first half of the course. Reinforces Chapters 1–7 content on data fundamentals, database concepts, SQL, relational design, and normalization. Bridges to the second half's focus on database design, administration, and business intelligence.

**Key Sections:**

- Review topics from first half
- First-half course content
- Learning objectives
- Concept integration

---

## Part 5: Database Design and Administration

### Chapter 10: From Data to Design: Building Reliable Information Systems

**Subtitle:** From requirements to robust logical database design

**Description:** Transitions students from querying existing databases to designing new ones. Covers requirements analysis, conceptual modeling, logical database design, and design best practices. Emphasizes how good design enables advanced SQL and business intelligence.

**Key Sections:**

- Introduction: From querying to designing
- Why advanced SQL depends on design
- From using databases to designing databases
- Business requirements as design driver
- Conceptual modeling and ERD
- Logical design and normalization review
- Design patterns and best practices

---

### Chapter 11: Database Administration (DBA)

**Subtitle:** Administration, security, and operational reliability

**Description:** Covers the role of database administrators in maintaining data security, performance, reliability, and compliance. Includes user management, backup and recovery, performance tuning, security policies, and disaster recovery planning.

**Key Sections:**

- What is database administration? (role, responsibilities)
- User management and security
- Backup and recovery strategies
- Performance monitoring and tuning
- Data security and compliance
- Disaster recovery planning

---

### Chapter 12: Business Intelligence and Analytics for Performance Improvement

**Subtitle:** Business intelligence and analytics for decisions

**Description:** Introduces business intelligence as the application of databases to strategic decision-making. Covers data warehousing, dashboards, reporting, KPI measurement, and analytics. Shows how technical database skills translate to business value.

**Key Sections:**

- Business intelligence fundamentals
- Data warehousing concepts
- Reporting and dashboards
- KPI measurement and tracking
- Analytics and predictive modeling
- Tools and platforms (Tableau, Power BI, etc.)
- Case studies in BI

---

### Chapter 13: Advanced Database Techniques

**Subtitle:** Advanced techniques for performance and flexibility

**Description:** Covers optimization, indexing, optimization, triggers, stored procedures, and advanced security. Bridges technical database knowledge with enterprise systems.

**Key Sections:**

- Why "working SQL" is not enough
- Query optimization techniques
- Indexing strategies
- Stored procedures and triggers
- Performance monitoring
- Advanced security features
- Replication and distributed databases

---

## Part 6: Strategy and Integration

### Chapter 14: Business Strategy and Information Systems

**Subtitle:** Strategy, alignment, and information systems advantage

**Description:** Connects database and systems knowledge to business strategy. Covers competitive advantage through IT, Porter's Five Forces, strategic alignment, and how information systems enable business transformation.

**Key Sections:**

- Key concepts in IS strategy
- Aligning IS with business strategy
- Competitive analysis and advantage
- Digital transformation
- IS investment decisions
- Emerging strategic technologies

---

### Chapter 15: Final Review and Course Integration

**Subtitle:** Final review and cross-course integration

**Description:** Comprehensive final review integrating all 14 prior chapters. Reinforces the journey from data fundamentals through SQL, design, administration, and strategy.

**Key Sections:**

- From data to decisions: Full-cycle review
- Concept integration
- Capstone case study
- Career preparation
- Lifelong learning

---

### Chapter 16: Designing Systems That Matter

**Subtitle:** Conclusion and next-step professional application

**Description:** Concluding chapter that synthesizes the entire course. Emphasizes the shift from technical competency to managerial judgment and ethical responsibility. Prepares students for careers in database administration, business analysis, systems design, and organizational leadership.

**Key Sections:**

- Course integration and design discipline
- From technical skills to managerial judgment
- Ethics and responsibility
- Career pathways
- Lifelong application of database thinking
- Looking forward

---

## Summary of Structure


| Chapter | Title                              | Topic                          | Part                    |
| ------- | ---------------------------------- | ------------------------------ | ----------------------- |
| 1       | Introduction to the Textbook       | Orientation & Philosophy       | Foundations             |
| 2       | Foundations of Information Systems | Business & IS Concepts         | Foundations             |
| 3       | Understanding Data Fundamentals    | Data Classification & Quality  | Foundations             |
| 4       | Introduction to Databases          | Database Concepts & SQL Intro  | SQL & Databases         |
| 5       | SQL — The Language of Databases   | SQL in Depth                   | SQL & Databases         |
| 6       | The Relational Model               | Relational Design Principles   | Design & Modeling       |
| 7       | Data Normalization                 | Normalization & Best Practices | Design & Modeling       |
| 8       | Advanced SQL                       | Sophisticated Query Patterns   | SQL Mastery             |
| 9       | Midterm Review                     | First-Half Integration         | Checkpoint              |
| 10      | From Data to Design                | Database Design Process        | Administration & Design |
| 11      | Database Administration            | DBA Roles & Practices          | Administration          |
| 12      | Business Intelligence              | BI & Analytics                 | Administration          |
| 13      | Advanced Database Techniques       | Optimization & Performance     | Administration          |
| 14      | Business Strategy & IS             | Strategic Alignment            | Strategy                |
| 15      | Final Review                       | Course Integration             | Checkpoint              |
| 16      | Designing Systems That Matter      | Conclusion & Career            | Conclusion              |

---

## Cross-Chapter Learning Arc

**Foundation & Philosophy (Chapters 1–3):** Establish why data and systems matter, what data is, and how organizations think about it.

**Getting Hands-On (Chapters 4–5):** Introduce the core technology (databases) and the universal language (SQL).

**Design Discipline (Chapters 6–7):** Teach the theoretical and practical foundation for sound database design.

**Sophistication (Chapters 8–9):** Move from basic to advanced querying; checkpoint learning.

**Operations & Impact (Chapters 10–13):** Cover design processes, administration, optimization, and business intelligence.

**Strategy & Conclusion (Chapters 14–16):** Connect technical knowledge to organizational strategy and career readiness.

---

# End of Complete Book Outline
