<!-- Chapter edit: improved structure, readability, callouts, and build hygiene. Technical meaning preserved. -->
---
title: 'Chapter 5: SQL — The Language of Databases'
author: 'Nimrod Dvir, PhD'
date: 2026-06-03
lang: en-US
toc: true
---

# Chapter 5: SQL — The Language of Databases

*How Structured Queries Transform Stored Data into Business Insight*

[![Watch the Chapter 5 companion video](https://img.youtube.com/vi/-QBMQXInrAg/hqdefault.jpg)](https://www.youtube.com/watch?v=-QBMQXInrAg)

*Click the image to watch the Chapter 5 companion video.*

<iframe width='560' height='315' src='https://www.youtube.com/embed/-QBMQXInrAg?si=WhniRXJh9OkQK64K' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>

Chapter 4 introduced databases as structured systems for storing, protecting, and managing data. Chapter 5 introduces the language used to work with those systems: **SQL**, or **Structured Query Language**.

SQL is the standard language used to define database structures, insert records, retrieve results, and summarize patterns. It is one of the most transferable skills in business technology because the same core logic appears across Microsoft Access, SQLite, PostgreSQL, SQL Server, Oracle, and cloud data platforms. Later chapters extend SQL into reusable patterns and safe data modification.

This chapter treats SQL as a way to ask precise questions of structured data, not as a syntax list to memorize.

A business manager might ask:

- Which product category is underperforming?
- Which customers have not ordered in the last 90 days?
- What is the average delivery delay by region?

An instructor might ask:

- Which students are below 80?
- Who is missing work?
- What is the average score on Quiz 2?
- Which deliverable type has the lowest average performance?

Those are **decision-support questions**. SQL turns them into repeatable, inspectable database statements.

**After reading this chapter, you will be able to:**

1. Explain what SQL is and why it matters for relational databases.
2. Explain how SQL works as a declarative language.
3. Distinguish among DDL, DML, DQL, and TCL at an introductory level.
4. Create simple database tables using `CREATE TABLE`.
5. Insert records using `INSERT INTO`.
6. Retrieve, filter, sort, and label query results using `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `DISTINCT`, and aliases (`AS`) for both columns and tables.
7. Handle missing values using `IS NULL` and `IS NOT NULL`, and work with dates stored as text.
8. Recognize a basic `INNER JOIN` as a preview of combining tables, with full join coverage in Chapter 6.
9. Summarize records using aggregate functions, `GROUP BY`, and `HAVING`.
10. Build calculated and conditional outputs using expressions and `CASE`.

---

## Chapter Roadmap

This chapter is organized in six short parts that build gradually.

| Part | Focus | Main Question |
|---|---|---|
| **Part 1** | SQL foundations and tools | What is SQL, where does it run, and why does it come next? |
| **Part 2** | Teaching dataset | What tables will we use for practice? |
| **Part 3** | Creating and inserting data | How do we define tables and add records? |
| **Part 4** | Basic queries, aliases, and dates | How do we retrieve, filter, sort, label, and work with dates? |
| **Part 5** | A first look at joins | How do we begin to combine related tables? |
| **Part 6** | Aggregation and calculations | How do we summarize and transform data? |

SQL becomes easier when it is learned as a sequence:

```text
Create structure -> add records -> retrieve rows -> filter results -> preview joins -> summarize patterns
```

Chapter 9 picks the thread back up with more advanced SQL patterns, including complex joins, subqueries, CTEs, and window functions. This chapter stops at the point where you can ask, filter, preview a table combination, and summarize structured data.

The chapter uses **SQLite-friendly syntax** unless otherwise noted. SQLite is lightweight and accessible, and the query logic transfers to Microsoft Access and PostgreSQL/Supabase.

![Figure 5.1 — SQL as the Data Bridge](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-textbook-that-shows-sql)
*Figure 5.1 — SQL as the Data Bridge. Database tables store raw records on the left, which pass through the declarative SQL query layer in the center to produce business answers, reports, and dashboards on the right.*

![Figure 5.2 — Chapter Roadmap](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-create-a-lefttoright-instructional)
*Figure 5.2 — Chapter Roadmap. A step-by-step pathway showing how Chapter 5 concepts progress from defining structure to loading records, retrieving rows, filtering results, previewing a join, and summarizing patterns.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Core Concepts

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220">
</p>

## Part 1: SQL Foundations and Tools

### Why SQL Comes Next

Databases store data, but storage alone does not answer questions. A table can contain hundreds, thousands, or millions of rows. The value comes from being able to retrieve exactly the rows and columns needed for a specific purpose.

![Figure 5.3 — Before-and-After Query View](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-conceptual-diagram)
*Figure 5.3 — Before-and-After Query View. A large, complex grade table containing all student records is filtered by a declarative SQL query to return a focused list of students scoring below 80.*

SQL is the language that makes that possible.

Chapter 4 focused on the structure of databases: tables, rows, columns, keys, constraints, and the role of the DBMS. Chapter 5 shifts from **where data lives** to **how people talk to stored data**.

For example, a grading database may store every student score. That database becomes useful when an instructor can ask:

```sql
SELECT FirstName, LastName, Score
FROM GRADEBOOK
WHERE Score < 80;
```

This query says: show me the students whose scores are below 80. The database may contain many other facts, but the query retrieves only the records needed for this question.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: SQL is a bridge</strong></p>
  <p>SQL is the practical bridge between structured storage and usable information. It turns a stored table into an answer to a specific question.</p>
</div>

### What SQL Is

**SQL** stands for **Structured Query Language**. It is the standard language used to work with relational databases.

![Figure 5.4 — SQL in the Application Stack](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-modular-educational-diagram)
*Figure 5.4 — SQL in the Application Stack. Shows the hidden query layer where SQL runs beneath dashboards, registration portals, checkout screens, and reports to fetch structured data.*

The word **structured** matters. SQL assumes that data is organized into tables with rows, columns, data types, and rules. A SQL query works because the database already has structure.

SQL is not a general-purpose programming language like Python, Java, or JavaScript. It is specialized for database work. Its main jobs are to:

- define database structures;
- insert, update, and delete records;
- retrieve specific rows and columns;
- combine related tables;
- summarize and calculate results;
- support reports, dashboards, and decisions.

In a business setting, SQL often sits underneath dashboards and applications even when users never see it directly. A Power BI dashboard, a registration portal, an e-commerce checkout screen, or a university reporting system may all depend on SQL queries behind the scenes.

### SQL Is Declarative

SQL is a **declarative language**. The user states what result they want, and the DBMS determines how to retrieve it.

![Figure 5.5 — Declarative vs. Imperative Query Execution](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-create-a-twopanel-instructional-showing)
*Figure 5.5 — Declarative vs. Imperative Query Execution. The user specifies the needed data in standard SQL, and the database engine handles the physical scanning and retrieval plan behind the scenes.*

Consider this query:

```sql
SELECT FirstName, LastName, Score
FROM GRADEBOOK
WHERE Score < 80;
```

The query does not tell the DBMS how to scan the table, which storage path to follow, or whether to use an index. It declares the desired result: return the first name, last name, and score for rows where the score is below 80. The DBMS handles the execution plan.

A user can focus on the business question while the database engine handles the technical retrieval process.

| Plain-English Question | SQL Logic |
|---|---|
| Which students scored below 80? | Filter rows where `Score < 80` |
| What is the average score? | Use `AVG(Score)` |
| Which deliverable types exist? | Use `SELECT DISTINCT DeliverableType` |
| Which quiz scores should be reviewed first? | Filter by quiz and sort by score |

### SQL in the Information System

SQL sits between the user's question and the database response.

![Figure 5.6 — The SQL Query Pipeline](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-detailed-instructional-showing)
*Figure 5.6 — The SQL Query Pipeline. A step-by-step pipeline tracing a business question as it is translated into a SQL statement, parsed by the DBMS, executed against database tables, and returned as a query result to support a decision.*

```mermaid
graph LR
    A[Business Question] --> B[SQL Statement]
    B --> C[DBMS]
    C --> D[Database Tables]
    D --> E[Query Result]
    E --> F[Report or Decision]
```

The database stores the data. The DBMS manages the database. SQL expresses the request. The result supports analysis, reporting, and decision-making.

In the broader book arc, SQL is where **queries** become the bridge from structured tables to analytics and decisions. Chapter 9 will return to SQL for deeper analytical reporting, and Chapter 14 will show how Power BI consumes SQL results to build dashboards.

### Why SQL Is Useful

SQL remains widely used because it has several practical advantages.

![Figure 5.7 — Transparency and Portability of SQL](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-sql-pros)
*Figure 5.7 — Transparency and Portability of SQL. Contrasts a hidden spreadsheet formula and a black-box dashboard metric with a clear, readable, and portable SQL statement.*

| Advantage | Why It Matters |
|---|---|
| **Text-based** | Queries can be written, saved, inspected, copied, and revised. |
| **Portable** | The core logic transfers across major relational DBMS platforms. |
| **Transparent** | A query shows the logic behind a result. |
| **Flexible** | SQL can retrieve, filter, summarize, join, insert, update, and delete data. |
| **Reproducible** | The same query rerun against the same data produces the same result. |

A spreadsheet calculation may be hidden in one cell. A dashboard may hide its internal logic. A SQL statement makes the logic explicit. That transparency matters for auditing, collaboration, debugging, and teaching.

### SQL Categories at a Glance

SQL includes several kinds of statements. Students often begin with the distinction between **Data Definition Language (DDL)** and **Data Manipulation Language (DML)**, but it helps to see the broader categories.

![Figure 5.8 — The Four Families of SQL](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-splitpanel-textbook-diagram)
*Figure 5.8 — The Four Families of SQL. A toolbox overview illustrating DDL (structure), DML (records), DQL (retrieval), and TCL (transactions) with their respective commands.*

| Category | Full Name | Main Purpose | Example Commands |
|---|---|---|---|
| **DDL** | Data Definition Language | Defines or changes database structure | `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE` |
| **DML** | Data Manipulation Language | Inserts, updates, or deletes stored records | `INSERT`, `UPDATE`, `DELETE` |
| **DQL** | Data Query Language | Retrieves data | `SELECT` |
| **TCL** | Transaction Control Language | Manages grouped operations | `COMMIT`, `ROLLBACK` |

In many textbooks, `SELECT` is grouped under DML. In this book, we separate **Data Query Language (DQL)** because retrieving data is the core activity students practice first. The simple memory hook is: **DDL** defines structure, **DML** changes records, **DQL** retrieves results, and **Transaction Control Language (TCL)** manages transactions.

### Tools You Will Use

The same SQL logic runs in many environments. In this course you will see three:

![Figure 5.9 — Database Platform Comparison](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-create-a-threepanel-comparison-for-the)
*Figure 5.9 — Database Platform Comparison. Displays the same SQL query executing in Microsoft Access SQL View, SQLite Online, and a Supabase SQL editor to show syntax portability.*

| Tool | Where It Runs | Strength | Limitation |
|---|---|---|---|
| **Microsoft Access** | Windows desktop | Visual design, forms, and reports for small databases | Some SQL features (multi-row insert, CTEs) are limited |
| **SQLite** | Local file or browser (SQLite Online, DB Browser) | Fast, free, friendly for learning standard SQL | Lighter type system; missing a few advanced features |
| **PostgreSQL / Supabase** | Hosted cloud database through a browser dashboard | Industry-style SQL environment; useful later for cloud database work | Requires account setup and more platform management than SQLite |

A quick orientation:

- **Access** exposes SQL through **Query Design** (a graphical builder) and **SQL View** (a text editor). Every query you click together in Query Design is translated into SQL behind the scenes.
- **SQLite** is the default environment for examples in this chapter because it accepts standard SQL with very little setup. You can paste statements into SQLite Online and run them immediately.
- **PostgreSQL/Supabase** behaves close to SQLite for the patterns in this chapter, with richer features when you move to Chapter 9 for advanced SQL and Chapter 13 for performance and administration topics.

#### Where SQL Lives in Microsoft Access

Microsoft Access hides SQL behind a friendly visual interface, but the SQL is always there. Knowing where to find it helps you connect the point-and-click experience from Chapter 4 to the statements in this chapter.

Access gives you two ways to build the same query:

- **Query Design** is a graphical builder. You add tables, drag fields into a grid, and type criteria into boxes. You never write SQL by hand.
- **SQL View** is a text editor that shows the actual SQL statement. Anything you build in Query Design is translated into SQL here automatically.

To see the SQL behind any Access query:

1. Open **Create -> Query Design** and add the tables or fields you want.
2. On the **Design** (or **Home**) ribbon, open the **View** menu and choose **SQL View**.
3. The SQL statement for your query appears, ready to read or edit.

The key idea is simple: every Access query is a SQL statement underneath. Query Design is a convenience layer on top of SQL, not a replacement for it. When you switch to SQL View, you are looking at the same query the database engine actually runs.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Access is SQL with a visual front end</strong></p>
  <p>Query Design and SQL View are two views of the same query. Switching to SQL View turns Access into a place to read and practice SQL, not just click queries together.</p>
</div>

#### Access vs. SQLite Syntax at a Glance

The core SQL logic is the same across platforms, but small dialect differences trip up beginners. This chapter writes its examples in **SQLite** syntax. The table below collects the differences you are most likely to meet when you run the same idea in Microsoft Access. Inline platform notes throughout the chapter point back to this table.

| Task | SQLite (this chapter) | Microsoft Access |
|---|---|---|
| Join text values | `FirstName \|\| ' ' \|\| LastName` | `FirstName & ' ' & LastName` |
| Write a date literal | `'2026-09-08'` (text in `YYYY-MM-DD`) | `#2026-09-08#` (wrapped in `#`) |
| Insert several rows | One `INSERT` with multiple `VALUES` rows | One `INSERT` per row (or Datasheet entry) |
| Wildcard: any characters | `LIKE '%edu'` | `LIKE '*edu'` |
| Wildcard: one character | `LIKE 'Q_iz'` | `LIKE 'Q?iz'` |
| Approximate age from a date | `strftime('%Y','now') - strftime('%Y', Birthday)` | `DateDiff('yyyy', Birthday, Date())` |
| Limit the number of rows | `LIMIT 10` | `SELECT TOP 10 ...` |

None of these change what the query means. They change only how you spell it on a given platform. If you learn the SQLite form here, the Access form is a short translation away.

#### Two SQLite Tools for This Chapter

For the required hands-on work in this chapter, we will use **SQLite** as the main SQL environment. SQLite lets us practice SQL without setting up a database server, cloud account, or complicated installation.

![Figure 5.10 — SQLite Tooling Environments](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-create-a-sidebyside-instructional)
*Figure 5.10 — SQLite Tooling Environments. Compares browser-based SQLiteOnline (best for quick practice) with desktop DB Browser for SQLite (best for local file inspection and saved scripts).*

You may use either of these tools:

| Tool | Link | Type | Best Use |
|---|---|---|---|
| **SQLiteOnline** | [https://sqliteonline.com/](https://sqliteonline.com/) | Browser-based SQL editor | Quick practice, in-class demos, and short SQL examples |
| **DB Browser for SQLite** | [https://sqlitebrowser.org/](https://sqlitebrowser.org/) | Desktop application | Saved `.db` files, longer assignments, and visual database inspection |

Both tools let you create tables, insert records, run SQL queries, and inspect results. The SQL logic is the same. The difference is the working environment.

Use **SQLiteOnline** when you want the fastest start or are following an in-class walk-through. Use **DB Browser for SQLite** when you want to save a local `.db` file, inspect tables visually, or complete a longer assignment.

Keep a copy of your SQL script in a `.sql` file or document. Browser sessions can reset and local database files can be overwritten. Your script is the most portable record of your work.

#### Optional Preview: Supabase as a Cloud PostgreSQL Tool

For the required work in this chapter, use SQLite through SQLite Online or DB Browser for SQLite. Supabase is included here as a preview of a cloud-based PostgreSQL environment you may use later in the course. You do not need Supabase to complete this chapter's Let's Build unless your instructor specifically tells you to use it.

![Figure 5.11 — Supabase developer dashboard map](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-supabase-dashboard-map)
*Figure 5.11 — Supabase developer dashboard mapping the Table Editor, SQL Editor with an active query, and Database Schema Visualizer in a unified cloud interface.*

**Supabase** is a cloud service that hosts a real **PostgreSQL** database and wraps it in a friendly web interface. You can create a project in a browser, run SQL, inspect tables, and connect the database to other tools. Its free tier is enough for coursework.

Think of Supabase as two things working together:

1. **A managed PostgreSQL database.** Your tables, rows, and SQL all live in a real Postgres instance running in the cloud. Anything you learn here about PostgreSQL applies directly.
2. **A browser dashboard.** Instead of installing a database server, you use Supabase's website to create tables, run SQL, and view data.

Inside a Supabase project, the panels you will use most are:

- **Table Editor**: a spreadsheet-style view for creating tables, adding columns, and editing rows by clicking. Good for quick setup and inspection.
- **SQL Editor**: a text area where you paste or type SQL statements (`CREATE`, `INSERT`, `SELECT`, and more) and click **Run**. Results appear directly below. This is where most of this chapter's examples would go.
- **Database -> Schema Visualizer**: a diagram of your tables and the relationships between them. Useful when you reach Chapter 6.
- **Authentication, Storage, APIs**: features for full applications. You can ignore them for this chapter.

A typical first session in Supabase is short: create a project, save the database password, open the **SQL Editor**, run a `CREATE TABLE` statement, insert rows, and inspect the result in **Table Editor**. Supabase may pause free-tier projects after inactivity, so export important SQL scripts to a `.sql` file if you use it.

Throughout the chapter, short platform notes flag the places where Access syntax differs from SQLite. If you are not using Access, you can read those notes for awareness and move on.

For interactive practice with every pattern in this chapter, the [W3Schools SQL Tutorial](https://www.w3schools.com/sql/) is a useful supplement. Its in-browser editor lets you run `SELECT`, `WHERE`, `ORDER BY`, joins, and aggregation against a sample database. Expect small dialect differences, and use this chapter's platform notes when a spelling differs.

<div class="callout business-insight">
  <p><strong>📊 Business Insight: One language travels across many engines</strong></p>
  <p>A retail analyst might prototype a query in SQLite, run a similar query against PostgreSQL, and then embed the result in a Power BI dashboard. The surrounding tools change. The SQL logic stays familiar.</p>
</div>

![Figure 5.12 — The Journey of a SQL Query](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-stepbystep-instructional)
*Figure 5.12 — The Journey of a SQL Query. Traces a query from initial practice in a local SQLite file, to production deployment in a PostgreSQL database, to visualization in a Power BI dashboard.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Part 2: The Chapter 5 Teaching Dataset

### Why a Simplified Two-Table Dataset

This chapter uses a compact two-table teaching dataset. A fully normalized database is more realistic, but it can overload beginners too early. The goal here is to learn SQL syntax and query logic before adding more complex relational design. Chapter 6 returns to keys and relationships, Chapter 7 formalizes normalization, and Chapter 10 revisits database design in a larger system context.

![Figure 5.13 — Chapter 5 Teaching Schema](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-schema-overview-for-the)
*Figure 5.13 — Chapter 5 Teaching Schema. Represents `GRADEBOOK` connected to `GRADE_WEIGHT` through the `DeliverableType` column, simplified for query practice.*

The two tables are:

- `GRADEBOOK`: one row per student-deliverable result.
- `GRADE_WEIGHT`: one row per deliverable category, with its weight and item count.

Together they support every operation in this chapter: creation, insertion, filtering, sorting, aggregation, and calculated fields, plus a first look at how two tables can be joined. Chapter 6 develops joins in full.

### `GRADEBOOK`

`GRADEBOOK` is the main teaching table. It stores one row for each student-deliverable result.

![Figure 5.14 — GRADEBOOK Table Structure](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-teachingdataset-diagram)
*Figure 5.14 — GRADEBOOK Table Structure. Highlights column fields such as RecordID, StudentID, and Score, showing their data types and roles.*

![Figure 5.15 — Flat-Table Redundancy Warning](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-flat-table-warning-diagram)
*Figure 5.15 — Flat-Table Redundancy Warning. Illustrates duplicate Student names and Emails repeated across gradebook records, highlighting update risks and pointing forward to related tables in Chapter 6.*

| Column | Data Type | Purpose |
|---|---|---|
| `RecordID` | `INTEGER` | Unique identifier for each row |
| `StudentID` | `TEXT` | Student identifier, such as `S1001` |
| `FirstName` | `TEXT` | Student first name |
| `LastName` | `TEXT` | Student last name |
| `Email` | `TEXT` | Student email address |
| `Birthday` | `TEXT` | Student birth date in `YYYY-MM-DD` form |
| `DeliverableType` | `TEXT` | Category such as Quiz, Homework, Exam, or Project |
| `DeliverableNumber` | `INTEGER` | Sequence number within the category |
| `DueDate` | `TEXT` | Due date for the deliverable in `YYYY-MM-DD` form |
| `Topic` | `TEXT` | Topic or content label |
| `Score` | `REAL` | Percentage-style score on a 0-100 scale |

A small sample:

| RecordID | StudentID | FirstName | LastName | DeliverableType | DeliverableNumber | Topic | Score |
|---:|---|---|---|---|---:|---|---:|
| 1 | S1001 | Alice | Johnson | Quiz | 1 | Database Basics | 92 |
| 2 | S1002 | Brian | Lee | Quiz | 1 | Database Basics | 84 |
| 3 | S1003 | Carla | Mendez | Homework | 1 | Entity Design | 95 |
| 4 | S1001 | Alice | Johnson | Quiz | 2 | SQL Basics | 88 |
| 5 | S1002 | Brian | Lee | Quiz | 2 | SQL Basics | 77 |
| 6 | S1003 | Carla | Mendez | Exam | 1 | Midterm | 91 |

`StudentID` is stored as text, not as a number. The value `S1001` looks numeric in places, but it is an identifier rather than a quantity, so it should never be averaged or summed. This matches the Chapter 4 build, where `StudentID` was created as Short Text in Access for the same reason.

This table is intentionally flat and somewhat redundant. It repeats student names and emails across grade records. That repetition makes SQL practice easier now, but it is not the final design ideal. Chapter 6 will explain the relationship problem and show how a fuller design splits this kind of data into related tables.

### `GRADE_WEIGHT`

`GRADE_WEIGHT` stores category-level metadata about the grading scheme.

![Figure 5.16 — Grading Weight Scheme](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-grading-weight-cards)
*Figure 5.16 — Grading Weight Scheme. Labeled category cards showing item count, category weight, and weight per item for Quiz, Homework, Exam, and Project.*

| Column | Data Type | Purpose |
|---|---|---|
| `DeliverableType` | `TEXT` | Category such as Quiz or Exam |
| `ItemCount` | `INTEGER` | Number of items in that category |
| `CategoryWeight` | `REAL` | Percentage weight assigned to the category |
| `WeightPerItem` | `REAL` | Percentage weight assigned to each item in that category |

A small sample:

| DeliverableType | ItemCount | CategoryWeight | WeightPerItem |
|---|---:|---:|---:|
| Quiz | 4 | 20 | 5 |
| Homework | 3 | 30 | 10 |
| Exam | 2 | 40 | 20 |
| Project | 1 | 10 | 10 |

Together, `GRADEBOOK` and `GRADE_WEIGHT` allow students to practice single-table queries and to see one introductory example of joining two tables.

### Questions These Tables Can Answer

With only two tables, students can already answer useful questions:

![Figure 5.17 — Business Question Board](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-ch05-sql-bridge-questions-to-answers)
*Figure 5.17 — Business Question Board. Maps common classroom questions, such as identifying struggling students or calculating averages, to the specific database fields needed to resolve them.*

- Which students scored below 80?
- What are the scores for Quiz 2?
- What is the average score by deliverable type?
- Which deliverable categories have the lowest average score?
- How much does each deliverable type contribute to the course grade?
- What is each student's approximate weighted contribution from recorded scores?

This is the core SQL learning pattern: start with a question, identify the table or tables, write the query, inspect the result, and revise as needed.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Part 3: Creating Tables and Inserting Data

![Figure 5.18 — Structure-First Database Workflow](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-create-tables)
*Figure 5.18 — Structure-First Database Workflow. Illustrates the sequential workflow: defining structure with `CREATE TABLE` first, inserting records with `INSERT INTO` second, and verifying with `SELECT *` third.*

<div class="callout good-practice">
  <p><strong>✅ Good Practice: Define structure before loading rows</strong></p>
  <p>Create the table before you load data. A clear structure catches mistakes early; rushing to insert data into a half-defined table hides them.</p>
</div>

### Creating Tables with `CREATE TABLE`

`CREATE TABLE` defines a new table. It specifies the table name, column names, data types, and constraints.

![Figure 5.19 — Blueprint of CREATE TABLE](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-instructional-diagram)
*Figure 5.19 — Blueprint of CREATE TABLE. Annotates the components of a database table creation statement: the command, table name, column names, data types, and primary key constraints.*

The general pattern is:

```sql
CREATE TABLE TableName (
    ColumnName DataType Constraint,
    ColumnName DataType Constraint
);
```

Each part matters.

| Part | Meaning |
|---|---|
| `CREATE TABLE` | Tells the DBMS to define a new table |
| `TableName` | Names the table |
| `ColumnName` | Names one field or attribute |
| `DataType` | States what kind of value belongs in the column |
| `Constraint` | Adds a rule, such as `PRIMARY KEY` or `NOT NULL` |

### Creating the `GRADEBOOK` Table

![Figure 5.20 — GRADEBOOK Table Definition](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-gradebook-table-blueprint)
*Figure 5.20 — GRADEBOOK Table Definition. Visualizes the column types and constraint shields (`NOT NULL`, `PRIMARY KEY`, and `Score CHECK` between 0 and 100) defined during table creation.*

```sql
CREATE TABLE GRADEBOOK (
    RecordID INTEGER PRIMARY KEY,
    StudentID TEXT NOT NULL,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT,
    Birthday TEXT,
    DeliverableType TEXT NOT NULL,
    DeliverableNumber INTEGER NOT NULL,
    DueDate TEXT,
    Topic TEXT,
    Score REAL CHECK (Score BETWEEN 0 AND 100)
);
```

This statement defines the structure before any records are inserted.

- `RecordID` is the primary key.
- `StudentID` is `TEXT` because identifiers like `S1001` are labels, not quantities.
- `StudentID`, `FirstName`, `LastName`, `DeliverableType`, and `DeliverableNumber` are required.
- `Score` is stored as a numeric value and uses a `CHECK` constraint so values stay between 0 and 100. This is the SQL counterpart to the Chapter 4 Access validation rule `Between 0 And 100`.
- `Birthday` and `DueDate` are stored as text in `YYYY-MM-DD` form, which SQLite sorts and compares correctly.

<div class="callout warning">
  <p><strong>⚠️ Warning: SQLite dates are stored by convention</strong></p>
  <p>SQLite does not enforce a native <code>DATE</code> type the same way server-based DBMSs do. This chapter stores dates as <code>TEXT</code> in <code>YYYY-MM-DD</code> format so values stay readable and sortable.</p>
</div>

### Creating the `GRADE_WEIGHT` Table

![Figure 5.21 — GRADE_WEIGHT Schema](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-schema-overview-for-the)
*Figure 5.21 — GRADE_WEIGHT Schema. Connects category weight and item count metadata to calculations.*

```sql
CREATE TABLE GRADE_WEIGHT (
    DeliverableType TEXT PRIMARY KEY,
    ItemCount INTEGER NOT NULL,
    CategoryWeight REAL NOT NULL,
    WeightPerItem REAL NOT NULL
);
```

Here, `DeliverableType` is the primary key because each deliverable category appears once. The other columns store category-level information.

### Modifying a Table with `ALTER TABLE`

Database structures sometimes change. `ALTER TABLE` modifies an existing table.

![Figure 5.22 — Modifying Structure with ALTER TABLE](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-alter-table-before-after)
*Figure 5.22 — Modifying Structure with ALTER TABLE. Splits the GRADEBOOK table layout before and after adding the `SectionCode` column to show how structures expand.*

```sql
ALTER TABLE GRADEBOOK
ADD COLUMN SectionCode TEXT;
```

This statement adds a new column named `SectionCode` to `GRADEBOOK`. In Microsoft Access, the same change is usually made through Design View; `ALTER TABLE` is the SQL equivalent.

### Inserting Records with `INSERT INTO`

`INSERT INTO` adds rows to a table.

![Figure 5.23 — Column-to-Value Alignment](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-instructional-diagram)
*Figure 5.23 — Column-to-Value Alignment. Illustrates why order and alignment matter when mapping the column list in `INSERT INTO` to the corresponding `VALUES` list.*

The general pattern is:

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

Good insertion habits matter.

- Always list the columns explicitly.
- Keep column names and values in matching order.
- Put text and date values in single quotes.
- Do not rely on the physical order of columns in the table.

### Inserting Rows into `GRADEBOOK`

![Figure 5.24 — Step-by-Step Multi-Row INSERT](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-multi-row-insert-flow)
*Figure 5.24 — Step-by-Step Multi-Row INSERT. Displays how multiple values are inserted into the database in one query operation to form separate rows.*

```sql
INSERT INTO GRADEBOOK
    (RecordID, StudentID, FirstName, LastName, Email, Birthday,
     DeliverableType, DeliverableNumber, DueDate, Topic, Score)
VALUES
    (1, 'S1001', 'Alice', 'Johnson', 'alice@university.edu', '2004-05-14',
     'Quiz', 1, '2026-09-08', 'Database Basics', 92),
    (2, 'S1002', 'Brian', 'Lee', 'brian@university.edu', '2003-11-22',
     'Quiz', 1, '2026-09-08', 'Database Basics', 84),
    (3, 'S1003', 'Carla', 'Mendez', 'carla@university.edu', '2004-02-09',
     'Homework', 1, '2026-09-10', 'Entity Design', 95),
    (4, 'S1001', 'Alice', 'Johnson', 'alice@university.edu', '2004-05-14',
     'Quiz', 2, '2026-09-15', 'SQL Basics', 88),
    (5, 'S1002', 'Brian', 'Lee', 'brian@university.edu', '2003-11-22',
     'Quiz', 2, '2026-09-15', 'SQL Basics', 77),
    (6, 'S1003', 'Carla', 'Mendez', 'carla@university.edu', '2004-02-09',
     'Exam', 1, '2026-10-01', 'Midterm', 91);
```

This statement inserts six rows at once in SQLite and PostgreSQL-style syntax.

<div class="callout warning">
  <p><strong>⚠️ Warning: Access inserts one row at a time</strong></p>
  <p>Microsoft Access does not support multi-row <code>INSERT</code> statements in the same way. In Access, insert one row at a time or load rows through Datasheet View.</p>
</div>

### Inserting Rows into `GRADE_WEIGHT`

![Figure 5.25 — Loading Category Metadata](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-calc-sql)
*Figure 5.25 — Loading Category Metadata. Visualizes the four grading categories flowing into the `GRADE_WEIGHT` table to store metadata for future joins and calculations.*

```sql
INSERT INTO GRADE_WEIGHT
    (DeliverableType, ItemCount, CategoryWeight, WeightPerItem)
VALUES
    ('Quiz', 4, 20, 5),
    ('Homework', 3, 30, 10),
    ('Exam', 2, 40, 20),
    ('Project', 1, 10, 10);
```

This table now stores the grading structure needed for later joins and weighted calculations.

### Checking the Inserted Data

After inserting data, always verify that records were entered correctly.

![Figure 5.26 — Post-Load Verification](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-sql-review)
*Figure 5.26 — Post-Load Verification. A verification checklist showing how `INSERT INTO` is immediately followed by a `SELECT *` query to inspect records and catch errors early.*

```sql
SELECT * FROM GRADEBOOK;
SELECT * FROM GRADE_WEIGHT;
```

This habit is simple but important. Before writing complicated queries, confirm that the tables contain what you think they contain.

<div class="callout good-practice">
  <p><strong>✅ Good Practice: Inspect before you analyze</strong></p>
  <p>Run a quick <code>SELECT *</code> after every load. Catch a misaligned column or missing row right after insertion, not in the middle of a complex query.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Part 4: Querying Data with `SELECT`

![Figure 5.27 — Query Clause Roadmap](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-what-is-sql)
*Figure 5.27 — Query Clause Roadmap. Illustrates how SELECT, FROM, WHERE, and ORDER BY clauses stack together to build a complete database query.*

### The Basic `SELECT` Pattern

`SELECT` retrieves data from a table. The simplest version retrieves all columns and all rows:

![Figure 5.28 — Projection in SQL](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-sql-select-concept)
*Figure 5.28 — Projection in SQL. Shows how a SELECT query performs column projection, retrieving only specified fields (e.g. FirstName, LastName) from a larger table.*

```sql
SELECT * FROM GRADEBOOK;
```

The asterisk means all columns. It is useful for quick inspection, but most professional queries list only the needed columns.

```sql
SELECT FirstName, LastName, Score
FROM GRADEBOOK;
```

<div class="callout good-practice">
  <p><strong>✅ Good Practice: Name columns in final queries</strong></p>
  <p>Use <code>SELECT *</code> while exploring a new table. Switch to explicit column names for final queries, reports, and examples so the query's intent is clear.</p>
</div>

### Removing Duplicates with `DISTINCT`

The **DISTINCT** keyword removes duplicate values from query results.

![Figure 5.29 — DISTINCT Value Collapse](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-distinct-duplicate-collapse)
*Figure 5.29 — DISTINCT Value Collapse. Shows how redundant categories in a column are collapsed into a list of unique values.*

```sql
SELECT DISTINCT DeliverableType
FROM GRADEBOOK;
```

This query returns each deliverable type once. It is useful when you want to see the categories represented in a table.

### Filtering Rows with `WHERE`

The **WHERE** clause limits query results to rows that meet a specific condition.

![Figure 5.30 — Row Selection via WHERE](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-where-filtering-diagram)
*Figure 5.30 — Row Selection via WHERE. A filter funnel showing rows from the `GRADEBOOK` table passing through the condition `Score < 80`, retaining only matching records in the output.*

```sql
SELECT FirstName, LastName, Score
FROM GRADEBOOK
WHERE Score < 80;
```

Common comparison operators include:

| Operator | Meaning | Example |
|---|---|---|
| `=` | Equal to | `DeliverableType = 'Quiz'` |
| `<>` | Not equal to | `DeliverableType <> 'Exam'` |
| `<` | Less than | `Score < 80` |
| `>` | Greater than | `Score > 90` |
| `<=` | Less than or equal to | `Score <= 80` |
| `>=` | Greater than or equal to | `Score >= 90` |

A small operator change can change the answer. `Score <= 80` includes a score of exactly 80, while `Score < 80` does not.

### Handling Missing Values with `NULL`

`NULL` represents a missing or unknown value. It is not zero. It is not an empty string. It is the absence of a stored value, which is why it cannot be compared with ordinary equality operators.

![Figure 5.31 — NULL handling in SQL](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-nullhandling-diagram)
*Figure 5.31 — NULL handling in SQL. Contrasts zero, blank text, and NULL, illustrating why traditional equality (`=`) fails and `IS NULL` or `IS NOT NULL` must be used.*

This does **not** work as expected:

```sql
SELECT StudentID, FirstName, LastName, Email
FROM GRADEBOOK
WHERE Email = NULL;
```

Use `IS NULL` instead:

```sql
SELECT StudentID, FirstName, LastName, Email
FROM GRADEBOOK
WHERE Email IS NULL;
```

To find rows where a value exists, use `IS NOT NULL`:

```sql
SELECT RecordID, StudentID, DeliverableType, Score
FROM GRADEBOOK
WHERE Score IS NOT NULL;
```

<div class="callout avoid">
  <p><strong>❌ Avoid: Do not ignore NULL in aggregates</strong></p>
  <p>Aggregate functions usually skip <code>NULL</code> values.</p>
  <ul>
    <li><code>COUNT(*)</code> counts rows, even if some columns contain <code>NULL</code>.</li>
    <li><code>COUNT(Score)</code> counts only rows where <code>Score</code> is not <code>NULL</code>.</li>
    <li><code>AVG(Score)</code> averages only non-<code>NULL</code> scores.</li>
  </ul>
  <p>That behavior is useful, but it can hide missing data.</p>
</div>

Always ask whether a missing value means not applicable, not entered yet, or unknown.

### Combining Conditions with `AND`, `OR`, and `NOT`

Logical operators allow more precise filters.

![Figure 5.32 — Logical Operators](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-logicoperator-and)
*Figure 5.32 — Logical Operators. A logic-gate diagram showing how `AND` narrows results, `OR` widens results, and `NOT` excludes categories.*

Use `AND` when both conditions must be true:

```sql
SELECT FirstName, LastName, DeliverableType, Score
FROM GRADEBOOK
WHERE DeliverableType = 'Quiz'
  AND Score < 80;
```

Use `OR` when either condition may be true:

```sql
SELECT FirstName, LastName, DeliverableType, Score
FROM GRADEBOOK
WHERE DeliverableType = 'Quiz'
   OR DeliverableType = 'Exam';
```

Use `NOT` to exclude a condition:

```sql
SELECT FirstName, LastName, DeliverableType, Score
FROM GRADEBOOK
WHERE NOT DeliverableType = 'Homework';
```

<div class="callout tip">
  <p><strong>💡 Tip: Put one condition per line</strong></p>
  <p>When combining conditions, put each condition on its own line. SQL is much easier to read and debug when the logic is visually organized.</p>
</div>

### Pattern Matching with `LIKE`, `BETWEEN`, and `IN`

`LIKE` searches for text patterns. The percent sign `%` matches zero or more characters; the underscore `_` matches exactly one.

![Figure 5.33 — Pattern Matching and Range Operators](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-pattern-matching-operators)
*Figure 5.33 — Pattern Matching and Range Operators. Illustrates LIKE wildcard searches, BETWEEN range limits, and IN list testing.*

```sql
SELECT FirstName, LastName, Email
FROM GRADEBOOK
WHERE Email LIKE '%@university.edu';
```

```sql
SELECT DeliverableType
FROM GRADEBOOK
WHERE DeliverableType LIKE 'Q_iz';
```

`BETWEEN` tests a numeric or date range:

```sql
SELECT FirstName, LastName, Score
FROM GRADEBOOK
WHERE Score BETWEEN 80 AND 90;
```

`IN` tests membership in a list:

```sql
SELECT FirstName, LastName, DeliverableType, Score
FROM GRADEBOOK
WHERE DeliverableType IN ('Quiz', 'Exam');
```

All three operators make conditions shorter and easier to read than long chains of `AND` and `OR`.

### Sorting Results with `ORDER BY`

The **ORDER BY** clause controls the order in which query results appear. `DESC` sorts from high to low; `ASC` sorts from low to high and is the default.

![Figure 5.34 — Sorting and Aliases](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-order-by-and-alias)
*Figure 5.34 — Sorting and Aliases. Shows a query result sorted by `Score DESC` and then by `LastName ASC` as a tiebreaker, with column headers customized via aliases.*

```sql
SELECT FirstName, LastName, Score
FROM GRADEBOOK
ORDER BY Score DESC;
```

You can sort by more than one column. The second column acts as a tiebreaker.

```sql
SELECT FirstName, LastName, Score
FROM GRADEBOOK
ORDER BY Score DESC, LastName ASC;
```

### Renaming Output with Aliases

An **alias** gives an output column or table a temporary name.

*Sorting and Aliases (Figure 5.34 above) illustrates how column headers are customized via aliases.*

```sql
SELECT FirstName || ' ' || LastName AS StudentName,
       DeliverableType AS Category,
       Score AS Result
FROM GRADEBOOK;
```

Aliases improve readability. They change the label in the output, not the stored data. In Microsoft Access, the same text-combination idea uses `&` instead of SQLite's `||`:

```sql
SELECT FirstName & ' ' & LastName AS StudentName
FROM GRADEBOOK;
```

#### Aliasing Tables, Not Just Columns

`AS` does double duty: it renames output columns, and it also gives a **table** a short temporary name. A table alias lets you refer to a table by a one- or two-letter nickname inside the same query.

```sql
SELECT g.FirstName,
       g.LastName,
       g.Score
FROM GRADEBOOK AS g
WHERE g.Score < 80;
```

Here `GRADEBOOK AS g` names the table `g`, so `g.Score` means the `Score` column from `GRADEBOOK`. On a single table this is optional and mostly a convenience. It becomes genuinely useful once a query touches more than one table, because every column can then be traced to the exact table it came from. You will see that payoff in the next part's first look at joins, and Chapter 6 relies on table aliases throughout.

<div class="callout tip">
  <p><strong>💡 Tip: AS names columns and tables</strong></p>
  <p>Use <code>AS</code> to label output columns, such as <code>Score AS Result</code>, and to nickname tables, such as <code>GRADEBOOK AS g</code>. Writing <code>AS</code> keeps the intent clear.</p>
</div>

### Working with Dates

Dates appear all over the teaching dataset: `DueDate` for each deliverable and `Birthday` for each student. SQLite has no dedicated date type, so this chapter stores dates as **text in `YYYY-MM-DD` form** (for example, `'2026-09-08'`). That format is not arbitrary: because the year comes first, then the month, then the day, the values sort and compare correctly as plain text.

**Filtering by a date** uses the same comparison operators as numbers. Quotes are required because the value is stored as text:

```sql
SELECT Topic, DueDate
FROM GRADEBOOK
WHERE DueDate >= '2026-09-15';
```

**Selecting a date range** is cleanest with `BETWEEN`:

```sql
SELECT Topic, DueDate
FROM GRADEBOOK
WHERE DueDate BETWEEN '2026-09-01' AND '2026-09-30';
```

**Sorting by date** works because of the `YYYY-MM-DD` ordering:

```sql
SELECT Topic, DueDate
FROM GRADEBOOK
ORDER BY DueDate ASC;
```

You can also pull pieces out of a date or calculate with it, but the exact functions differ by platform. In SQLite, `strftime('%Y', Birthday)` extracts the year. Part 6 uses this to estimate a student's age, and the Access vs. SQLite syntax table in Part 1 lists the matching Access expression (`DateDiff`).

<div class="callout warning">
  <p><strong>⚠️ Warning: Date literals vary across engines</strong></p>
  <p>SQLite and PostgreSQL accept dates as quoted text, such as <code>'2026-09-08'</code>. Microsoft Access wraps date literals in number signs, such as <code>#2026-09-08#</code>. The comparison logic stays the same.</p>
</div>

If a date is stored as `09/08/2026`, text sorting can break because the month appears first. With `YYYY-MM-DD`, the most significant part (the year) comes first, so chronological order and text order match.

### Building a Query Step by Step

A readable SQL query usually grows in stages. Start with retrieval, then add filtering, sorting, and labels one clause at a time:

![Figure 5.35 — Step-by-Step Query Construction](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-stepbystep-querybuilding)
*Figure 5.35 — Step-by-Step Query Construction. Visualizes building a complex query in layers, starting with columns, then filtering, and finally sorting.*

```sql
SELECT FirstName || ' ' || LastName AS StudentName,
       Score AS CurrentScore
FROM GRADEBOOK
WHERE Score < 80
ORDER BY Score ASC;
```

Run the query after each addition. If the result becomes wrong, you know which clause caused it.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Build queries in layers</strong></p>
  <p>A basic query becomes more powerful by adding clauses one at a time, not by writing everything at once.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Part 5: A First Look at Joins

So far every query has read from one table. But the teaching dataset has two tables, and some questions need both. This part gives you a single introductory example. Chapter 6 then develops joins in full once you understand why data is split across related tables.

![Figure 5.36 — Reconstructing Context with Joins](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-join-logic)
*Figure 5.36 — Reconstructing Context with Joins. Shows grade rows dynamically receiving metadata, such as item weights, from the related weight table at query time.*

### Why You Would Join Two Tables

`GRADEBOOK` stores student performance records. `GRADE_WEIGHT` stores the weight of each deliverable category. A **join** connects two tables on a shared column so a single query can report information from both, without copying the category weight into every grade row.

The two tables share `DeliverableType`, so that is the column the match is built on.

### One Example: `INNER JOIN`

An **INNER JOIN** returns rows where a matching value exists in **both** tables. Here it attaches each deliverable's `WeightPerItem` to the matching grade row, which lets the query calculate how much each score contributes to the final grade (`Score * WeightPerItem / 100`):

```sql
SELECT g.FirstName,
       g.LastName,
       g.DeliverableType,
       g.Score,
       w.WeightPerItem,
       ROUND(g.Score * w.WeightPerItem / 100.0, 2) AS WeightedContribution
FROM GRADEBOOK AS g
INNER JOIN GRADE_WEIGHT AS w
    ON g.DeliverableType = w.DeliverableType;
```

Notice the table aliases from Part 4 at work: `GRADEBOOK AS g` and `GRADE_WEIGHT AS w` let each column say exactly which table it comes from (`g.Score`, `w.WeightPerItem`). The `ON` clause states the matching rule. A score of 92 on a quiz worth 5 percent contributes 4.60 percentage points.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: A join combines tables at query time</strong></p>
  <p>A join connects related tables on a shared column so one query can use data from both. Chapter 6 explains the four questions to ask before every join and why joins are the payoff of relational design.</p>
</div>

Joins fit naturally with the relational design ideas in Chapter 6, so the full treatment lives there: `LEFT JOIN`, finding unmatched rows, comparing join types, and joining three or more tables.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Part 6: Aggregation, Grouping, and Calculated Results

![Figure 5.37 — Rows-to-Summary Aggregation](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-aggregation-diagram)
*Figure 5.37 — Rows-to-Summary Aggregation. Detailed records from the `GRADEBOOK` table are compressed into summary metrics such as counts, averages, and totals.*

### Why Aggregation Matters

Listing rows is useful, but business analysis often requires summaries. An instructor may need the class average, the average by deliverable type, the number of recorded scores, the highest and lowest scores, or the average score for each student.

![Figure 5.38 — The SQL Aggregation Pipeline](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-processflow-diagram-showing)
*Figure 5.38 — The SQL Aggregation Pipeline. Displays raw grade records at the base, grouping and filtering in the middle, and summary outputs such as class averages at the top.*

Aggregation is where SQL starts to become analytical.

### Aggregate Functions

![Figure 5.39 — Core Aggregate Functions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-calc-sql)
*Figure 5.39 — Core Aggregate Functions. Labeled cards for COUNT(), AVG(), SUM(), MIN(), and MAX() explaining what business questions they answer.*

| Function | Purpose | Example Question |
|---|---|---|
| `COUNT()` | Counts rows or non-missing values | How many scores are recorded? |
| `AVG()` | Calculates an average | What is the average score? |
| `SUM()` | Calculates a total | What is the total weighted contribution? |
| `MIN()` | Finds the smallest value | What is the lowest score? |
| `MAX()` | Finds the largest value | What is the highest score? |

Example:

```sql
SELECT AVG(Score) AS AverageScore
FROM GRADEBOOK;
```

This returns one overall average.

### Grouping with `GROUP BY`

`GROUP BY` forms groups before aggregation. Without `GROUP BY`, a query returns one overall summary. With `GROUP BY`, it returns one summary per group.

![Figure 5.40 — Grouping Buckets](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-group-by-and-having)
*Figure 5.40 — Grouping Buckets. Illustrates how records are grouped into buckets, such as Quiz and Homework, before aggregate functions run on each bucket.*

```sql
SELECT DeliverableType,
       AVG(Score) AS AverageScore
FROM GRADEBOOK
GROUP BY DeliverableType;
```

This returns one average per deliverable type.

```sql
SELECT StudentID,
       FirstName,
       LastName,
       AVG(Score) AS AverageScore
FROM GRADEBOOK
GROUP BY StudentID, FirstName, LastName;
```

This returns one average per student.

### Filtering Groups with `HAVING`

`WHERE` filters rows before grouping. `HAVING` filters groups after grouping.

![Figure 5.41 — WHERE vs. HAVING execution](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-group-by-and-having)
*Figure 5.41 — WHERE vs. HAVING execution. Shows that WHERE filters raw records before grouping, while HAVING filters aggregated summaries after grouping.*

```sql
SELECT DeliverableType,
       AVG(Score) AS AverageScore
FROM GRADEBOOK
GROUP BY DeliverableType
HAVING AVG(Score) < 85;
```

This query calculates the average score for each deliverable type, then keeps only the groups whose average is below 85.

| Clause | Filters | Used Before or After Grouping? |
|---|---|---|
| `WHERE` | Individual rows | Before grouping |
| `HAVING` | Groups or aggregate results | After grouping |

### Practical Summary Queries

![Figure 5.42 — Summary Outputs Mockup](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-calculatedresults)
*Figure 5.42 — Summary Outputs Mockup. Visualizes calculated results such as record counts, maximum scores, and category averages as analytical dashboard cards.*

```sql
-- Count records by deliverable type
SELECT DeliverableType, COUNT(*) AS RecordCount
FROM GRADEBOOK
GROUP BY DeliverableType;

-- Highest score by topic
SELECT Topic, MAX(Score) AS HighestScore
FROM GRADEBOOK
GROUP BY Topic;

-- Average quiz score
SELECT AVG(Score) AS AverageQuizScore
FROM GRADEBOOK
WHERE DeliverableType = 'Quiz';
```

### Calculated Columns

SQL can calculate new output values without changing stored data.

![Figure 5.43 — Calculated Columns Output](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-clean-calculatedresults)
*Figure 5.43 — Calculated Columns Output. Shows how stored scores feed into a temporary calculated column in memory without changing the source table.*

```sql
SELECT FirstName,
       LastName,
       Score,
       Score + 5 AS BonusScore
FROM GRADEBOOK;
```

`BonusScore` appears in the result, but it is not stored in the table.

### A Weighted Contribution Example

Calculated columns become more powerful when the calculation draws on a second table. If `Score` is a percentage and `WeightPerItem` is the percentage weight of one deliverable, then a deliverable's weighted contribution is:

![Figure 5.44 — Weighted score calculation](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-calc-sql)
*Figure 5.44 — Weighted score calculations. Shows how scores and individual item weights are multiplied and divided to calculate a deliverable's weighted contribution to the final grade.*

```text
Score * WeightPerItem / 100
```

`WeightPerItem` lives in `GRADE_WEIGHT`, not `GRADEBOOK`, so this calculation needs the `INNER JOIN` introduced in Part 5. That single example produces exactly this `WeightedContribution` column. Chapter 6 builds on it to compute a full course-grade summary across all of a student's deliverables.

### Text and Date Expressions

SQL can also combine and transform text and date values.

![Figure 5.45 — Platform SQL Date Operations](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-sql-date-platform-comparison)
*Figure 5.45 — Platform SQL Date Operations. Contrasts how SQLite, PostgreSQL, and Access calculate ages and perform text concatenation side by side.*

```sql
-- Combine text into a readable label
SELECT FirstName || ' ' || LastName AS StudentName,
       DeliverableType || ' ' || DeliverableNumber AS DeliverableLabel
FROM GRADEBOOK;

-- Approximate age from Birthday (SQLite)
SELECT DISTINCT StudentID, FirstName, LastName,
       strftime('%Y', 'now') - strftime('%Y', Birthday) AS ApproxAge
FROM GRADEBOOK;
```

This builds on the Working with Dates subsection in Part 4: there you filtered and sorted dates; here you extract the year from one to estimate an age. Date syntax varies across platforms. In Access, the same age calculation uses `DateDiff('yyyy', Birthday, Date())`. The Appendix shows the Access version side by side with SQLite for reference.

### Conditional Logic with `CASE`

A **CASE expression** returns different values based on conditions.

*Calculated Outputs (Figure 5.43 above) shows CASE conditional logic mapping numeric scores to performance thresholds.*

```sql
SELECT FirstName,
       LastName,
       Score,
       CASE
           WHEN Score >= 90 THEN 'High Performance'
           WHEN Score >= 80 THEN 'On Track'
           ELSE 'Needs Attention'
       END AS PerformanceBand
FROM GRADEBOOK;
```

`CASE` turns numeric values into interpretable labels.

### Complete Student Summary Example

This query combines grouping, aggregation, rounding, and conditional logic.

*Calculated Outputs (Figure 5.43 above) visualizes student grade records grouped, averaged, rounded, and labeled in a multi-stage summary.*

```sql
SELECT FirstName || ' ' || LastName AS StudentName,
       ROUND(AVG(Score), 2) AS AverageScore,
       CASE
           WHEN AVG(Score) >= 90 THEN 'High Performance'
           WHEN AVG(Score) >= 80 THEN 'On Track'
           ELSE 'Needs Attention'
       END AS PerformanceBand
FROM GRADEBOOK
GROUP BY StudentID, FirstName, LastName;
```

The result is one row per student with an average score and a performance label.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Aggregation turns rows into meaning</strong></p>
  <p>Aggregation and calculated expressions turn rows into useful summaries. The same table can produce a roster, a class average, or an at-risk list depending on how you group and label the data.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Looking Ahead

![Figure 5.46 — The SQL Learning Pathway](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch05-sql/ch05-create-a-lefttoright-instructional)
*Figure 5.46 — The SQL learning pathway. Shows how basic SQL queries branch into database normalization, advanced analytics, data governance, and dashboard integration.*

This chapter introduced the core grammar of SQL. You learned how to create tables, insert records, retrieve rows, filter results, work with dates, sort output, alias columns and tables, preview a join, summarize patterns, and calculate new fields.

Chapter 6 returns to relationships. The flat `GRADEBOOK` table is helpful for learning SQL, but it repeats student and deliverable information. The next design step is to separate different entities into related tables and connect them through keys. That richer structure reduces redundancy and makes databases more reliable over time. It is also where joins earn their keep, which is why Chapter 6 develops them in full.

Later chapters build on this SQL foundation with:

- relationships, referential integrity, and joins in depth (Chapter 6);
- normalization and dependency analysis (Chapter 7);
- advanced SQL patterns such as complex joins, subqueries, CTEs, and window functions (Chapter 9);
- database design in a larger information-system context (Chapter 10);
- indexes, performance tuning, stored procedures, triggers, and views (Chapter 13);
- business intelligence and dashboards (Chapter 14);
- analytical reporting and managerial decision-making (Chapters 12 and 15).

SQL will return throughout the book because almost every later database skill depends on the ability to ask clear questions of structured data.

For extra practice between now and the next SQL-heavy chapter, use the [W3Schools SQL Tutorial](https://www.w3schools.com/sql/). The Try it Yourself editors let you run `SELECT`, joins, `GROUP BY`, and other clauses against a sample database directly in the browser.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Appendix: Applying These Concepts to the Grading Database

This appendix shows the chapter's ideas at work in the Let's Build grading database. Each section reuses the `GRADEBOOK` and `GRADE_WEIGHT` tables defined in Part 2 and Part 3.

![Figure 5.47 — Appendix Roadmap](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-sql-review)
*Figure 5.47 — Appendix Roadmap. Maps the appendix examples back to the core chapter concepts: Access-style inserts and side-by-side age expressions.*

### A1. Inserting Rows One at a Time (Access-Friendly)

Multi-row `INSERT` works in SQLite and PostgreSQL. Microsoft Access expects one row per statement. In the Chapter 4 build, `RecordID` is an Access AutoNumber field, so it is generated automatically and you do not type a value for it. The first two rows from Part 3 would look like this in Access form:

![Figure 5.48 — SQLite vs. Access Insertions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-create-tables)
*Figure 5.48 — SQLite vs. Access insertions. Compares multi-row SQL insert statements in SQLite with single-row, AutoNumber-compliant insert statements in Access.*

```sql
INSERT INTO GRADEBOOK (StudentID, FirstName, LastName, Email, Birthday,
    DeliverableType, DeliverableNumber, DueDate, Topic, Score)
VALUES ('S1001', 'Alice', 'Johnson', 'alice@university.edu', #2004-05-14#,
    'Quiz', 1, #2026-09-08#, 'Database Basics', 92);

INSERT INTO GRADEBOOK (StudentID, FirstName, LastName, Email, Birthday,
    DeliverableType, DeliverableNumber, DueDate, Topic, Score)
VALUES ('S1002', 'Brian', 'Lee', 'brian@university.edu', #2003-11-22#,
    'Quiz', 1, #2026-09-08#, 'Database Basics', 84);
```

Notice three Access differences: `RecordID` is omitted so Access can generate it as AutoNumber, dates are wrapped in `#` rather than quotes, and each row needs its own statement.

### A2. A Side-by-Side Age Calculation

*Platform SQL Date Operations (Figure 5.45 above) maps the SQLite, PostgreSQL, and Access age expressions side by side.*

| Platform | Approximate age expression |
|---|---|
| SQLite | `strftime('%Y','now') - strftime('%Y', Birthday)` |
| PostgreSQL | `EXTRACT(YEAR FROM AGE(Birthday))` |
| Access | `DateDiff('yyyy', Birthday, Date())` |

All three return a rough integer age based on year only. None checks whether the birthday has occurred yet this year, so the value can be one year high for several months.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Key Concepts

![Figure 5.49 — Structured Query Language Concept Map](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-notebooklmmindmap)
*Figure 5.49 — Structured Query Language concept map. Visualizes relationships between SQL families (DDL/DML/DQL), basic querying clauses, joins, and aggregations.*

| Term | Meaning |
|---|---|
| **SQL** | The standard language for working with relational databases |
| **Declarative language** | A language in which users state the desired result rather than the step-by-step procedure |
| **DDL** | SQL statements that define or change database structure |
| **DML** | SQL statements that insert, update, or delete stored records |
| **DQL** | SQL statements that retrieve data, especially `SELECT` |
| **TCL** | SQL statements that manage transactions, such as `COMMIT` and `ROLLBACK` |
| **Table** | A structured set of rows and columns |
| **Row** | One record in a table |
| **Column** | One field or attribute in a table |
| **Query** | A request for data or a data-related operation |
| **Filter** | A condition that limits which rows are returned |
| **Sort** | The order in which result rows appear |
| **Alias** | A temporary name used for a column or table in a query |
| **NULL** | A marker for a missing or unknown value |
| **Join** | A query operation that combines related tables |
| **Aggregate function** | A function such as `COUNT()`, `AVG()`, or `SUM()` that summarizes rows |
| **GROUP BY** | A clause that forms groups before aggregation |
| **HAVING** | A clause that filters grouped results |
| **Expression** | A calculation or transformation performed in a query |
| **CASE** | Conditional logic used to return different values based on conditions |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Chapter Summary

![Figure 5.50 — Chapter 5 Visual Summary](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch05-sql/ch05-ch05-summary)
*Figure 5.50 — Chapter 5 Visual Summary. Recaps the path from raw tables to query logic, joins, grouping, calculations, and analytical insights.*

Chapter 5 introduced SQL as the language used to communicate with relational databases. Building on Chapter 4, the chapter moved from the question of where data lives to the question of how people retrieve, interpret, and summarize stored data.

The chapter began by explaining SQL as a declarative language. Instead of programming every retrieval step, users state the result they want and the DBMS decides how to produce it. That makes SQL a powerful bridge between business questions and database results.

A short tour of Microsoft Access, SQLite, and PostgreSQL/Supabase showed that the same SQL logic runs across many environments, with only minor syntax differences.

The chapter then introduced a simplified two-table teaching dataset: `GRADEBOOK` and `GRADE_WEIGHT`. Using these tables, you learned how to define structure with `CREATE TABLE`, populate records with `INSERT INTO`, inspect data with `SELECT`, filter rows with `WHERE`, handle missing values with `IS NULL`, work with dates stored as text, sort results with `ORDER BY`, and improve output readability with column and table aliases (`AS`).

You also saw where SQL lives inside Microsoft Access and how a few syntax details differ from SQLite. A first look at joins showed the basic shape of an `INNER JOIN`; Chapter 6 develops joins in full alongside the relational design that motivates them. Aggregation then showed how SQL moves from listing rows to summarizing patterns through `COUNT()`, `AVG()`, `SUM()`, `MIN()`, `MAX()`, `GROUP BY`, and `HAVING`. Calculated fields and `CASE` expressions showed how SQL can produce more interpretable outputs without changing the stored data.

The appendix put these ideas to work on the grading database, showing the Access-friendly form of `INSERT` and a side-by-side age calculation across platforms.

Chapter 9 picks the thread back up with more advanced SQL patterns such as complex joins, subqueries, CTEs, and window functions. Those tools build directly on the foundation you established here.

The central lesson is simple: SQL is more than technical syntax. It is a disciplined way to ask structured questions. Better questions lead to better queries, and better queries lead to more useful results.

---

## References

Connolly, T., & Begg, C. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Date, C. J. (2004). *An introduction to database systems* (8th ed.). Pearson/Addison Wesley.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.

## Figures Index

| Figure | Section | Caption | Source file |
|---|---|---|---|
| Figure 5.1 | Chapter Roadmap | SQL as the Data Bridge. Database tables store raw records on the left, which pass through the declarative SQL query layer in the center to produce business answers, reports, and dashboards on the right. | `ch05-create-a-clean-textbook-that-shows-sql.jpg` |
| Figure 5.2 | Chapter Roadmap | Chapter Roadmap. A step-by-step pathway showing how Chapter 5 concepts progress from defining structure to loading records, retrieving rows, filtering results, previewing a join, and summarizing patterns. | `ch05-create-a-lefttoright-instructional.jpg` |
| Figure 5.3 | Why SQL Comes Next | Before-and-After Query View. A large, complex grade table containing all student records is filtered by a declarative SQL query to return a focused list of students scoring below 80. | `ch05-create-a-clean-conceptual-diagram.png` |
| Figure 5.4 | What SQL Is | SQL in the Application Stack. Shows the hidden query layer where SQL runs beneath dashboards, registration portals, checkout screens, and reports to fetch structured data. | `ch05-create-a-modular-educational-diagram.jpg` |
| Figure 5.5 | SQL Is Declarative | Declarative vs. Imperative Query Execution. The user specifies the needed data in standard SQL, and the database engine handles the physical scanning and retrieval plan behind the scenes. | `ch05-create-a-twopanel-instructional-showing.jpg` |
| Figure 5.6 | SQL in the Information System | The SQL Query Pipeline. A step-by-step pipeline tracing a business question as it is translated into a SQL statement, parsed by the DBMS, executed against database tables, and returned as a query result to support a decision. | `ch05-create-a-detailed-instructional-showing.jpg` |
| Figure 5.7 | Why SQL Is Useful | Transparency and Portability of SQL. Contrasts a hidden spreadsheet formula and a black-box dashboard metric with a clear, readable, and portable SQL statement. | `ch05-sql-pros.jpg` |
| Figure 5.8 | SQL Categories at a Glance | The Four Families of SQL. A toolbox overview illustrating DDL (structure), DML (records), DQL (retrieval), and TCL (transactions) with their respective commands. | `ch05-create-a-splitpanel-textbook-diagram.jpg` |
| Figure 5.9 | Tools You Will Use | Database Platform Comparison. Displays the same SQL query executing in Microsoft Access SQL View, SQLite Online, and a Supabase SQL editor to show syntax portability. | `ch05-create-a-threepanel-comparison-for-the.jpg` |
| Figure 5.10 | Tools You Will Use | SQLite Tooling Environments. Compares browser-based SQLiteOnline (best for quick practice) with desktop DB Browser for SQLite (best for local file inspection and saved scripts). | `ch05-create-a-sidebyside-instructional.jpg` |
| Figure 5.11 | Tools You Will Use | Supabase developer dashboard mapping the Table Editor, SQL Editor with an active query, and Database Schema Visualizer in a unified cloud interface. | `ch05-supabase-dashboard-map.png` |
| Figure 5.12 | Tools You Will Use | The Journey of a SQL Query. Traces a query from initial practice in a local SQLite file, to production deployment in a PostgreSQL database, to visualization in a Power BI dashboard. | `ch05-create-a-stepbystep-instructional.jpg` |
| Figure 5.13 | Why a Simplified Two-Table Dataset | Chapter 5 Teaching Schema. Represents `GRADEBOOK` connected to `GRADE_WEIGHT` through the `DeliverableType` column, simplified for query practice. | `ch05-create-a-clean-schema-overview-for-the.jpg` |
| Figure 5.14 | `GRADEBOOK` | GRADEBOOK Table Structure. Highlights column fields such as RecordID, StudentID, and Score, showing their data types and roles. | `ch05-create-a-clean-teachingdataset-diagram.png` |
| Figure 5.15 | `GRADEBOOK` | Flat-Table Redundancy Warning. Illustrates duplicate Student names and Emails repeated across gradebook records, highlighting update risks and pointing forward to related tables in Chapter 6. | `ch05-flat-table-warning-diagram.png` |
| Figure 5.16 | `GRADE_WEIGHT` | Grading Weight Scheme. Labeled category cards showing item count, category weight, and weight per item for Quiz, Homework, Exam, and Project. | `ch05-grading-weight-cards.png` |
| Figure 5.17 | Questions These Tables Can Answer | Business Question Board. Maps common classroom questions, such as identifying struggling students or calculating averages, to the specific database fields needed to resolve them. | `ch05-ch05-sql-bridge-questions-to-answers.png` |
| Figure 5.18 | Part 3: Creating Tables and Inserting Data | Structure-First Database Workflow. Illustrates the sequential workflow: defining structure with `CREATE TABLE` first, inserting records with `INSERT INTO` second, and verifying with `SELECT *` third. | `ch05-create-tables.png` |
| Figure 5.19 | Creating Tables with `CREATE TABLE` | Blueprint of CREATE TABLE. Annotates the components of a database table creation statement: the command, table name, column names, data types, and primary key constraints. | `ch05-create-a-clean-instructional-diagram.png` |
| Figure 5.20 | Creating the `GRADEBOOK` Table | GRADEBOOK Table Definition. Visualizes the column types and constraint shields (`NOT NULL`, `PRIMARY KEY`, and `Score CHECK` between 0 and 100) defined during table creation. | `ch05-gradebook-table-blueprint.png` |
| Figure 5.21 | Creating the `GRADE_WEIGHT` Table | GRADE_WEIGHT Schema. Connects category weight and item count metadata to calculations. | `ch05-create-a-clean-schema-overview-for-the.jpg` |
| Figure 5.22 | Modifying a Table with `ALTER TABLE` | Modifying Structure with ALTER TABLE. Splits the GRADEBOOK table layout before and after adding the `SectionCode` column to show how structures expand. | `ch05-alter-table-before-after.png` |
| Figure 5.23 | Inserting Records with `INSERT INTO` | Column-to-Value Alignment. Illustrates why order and alignment matter when mapping the column list in `INSERT INTO` to the corresponding `VALUES` list. | `ch05-create-a-clean-instructional-diagram.png` |
| Figure 5.24 | Inserting Rows into `GRADEBOOK` | Step-by-Step Multi-Row INSERT. Displays how multiple values are inserted into the database in one query operation to form separate rows. | `ch05-multi-row-insert-flow.png` |
| Figure 5.25 | Inserting Rows into `GRADE_WEIGHT` | Loading Category Metadata. Visualizes the four grading categories flowing into the `GRADE_WEIGHT` table to store metadata for future joins and calculations. | `ch05-calc-sql.png` |
| Figure 5.26 | Checking the Inserted Data | Post-Load Verification. A verification checklist showing how `INSERT INTO` is immediately followed by a `SELECT *` query to inspect records and catch errors early. | `ch05-sql-review.jpg` |
| Figure 5.27 | Part 4: Querying Data with `SELECT` | Query Clause Roadmap. Illustrates how SELECT, FROM, WHERE, and ORDER BY clauses stack together to build a complete database query. | `ch05-what-is-sql.png` |
| Figure 5.28 | The Basic `SELECT` Pattern | Projection in SQL. Shows how a SELECT query performs column projection, retrieving only specified fields (e.g. FirstName, LastName) from a larger table. | `ch05-create-a-clean-sql-select-concept.png` |
| Figure 5.29 | Removing Duplicates with `DISTINCT` | DISTINCT Value Collapse. Shows how redundant categories in a column are collapsed into a list of unique values. | `ch05-distinct-duplicate-collapse.png` |
| Figure 5.30 | Filtering Rows with `WHERE` | Row Selection via WHERE. A filter funnel showing rows from the `GRADEBOOK` table passing through the condition `Score < 80`, retaining only matching records in the output. | `ch05-create-a-clean-where-filtering-diagram.png` |
| Figure 5.31 | Handling Missing Values with `NULL` | NULL handling in SQL. Contrasts zero, blank text, and NULL, illustrating why traditional equality (`=`) fails and `IS NULL` or `IS NOT NULL` must be used. | `ch05-create-a-clean-nullhandling-diagram.png` |
| Figure 5.32 | Combining Conditions with `AND`, `OR`, and `NOT` | Logical Operators. A logic-gate diagram showing how `AND` narrows results, `OR` widens results, and `NOT` excludes categories. | `ch05-create-a-clean-logicoperator-and.png` |
| Figure 5.33 | Pattern Matching with `LIKE`, `BETWEEN`, and `IN` | Pattern Matching and Range Operators. Illustrates LIKE wildcard searches, BETWEEN range limits, and IN list testing. | `ch05-pattern-matching-operators.png` |
| Figure 5.34 | Sorting Results with `ORDER BY` | Sorting and Aliases. Shows a query result sorted by `Score DESC` and then by `LastName ASC` as a tiebreaker, with column headers customized via aliases. | `ch05-create-a-clean-order-by-and-alias.png` |
| Figure 5.35 | Building a Query Step by Step | Step-by-Step Query Construction. Visualizes building a complex query in layers, starting with columns, then filtering, and finally sorting. | `ch05-create-a-clean-stepbystep-querybuilding.png` |
| Figure 5.36 | Part 5: A First Look at Joins | Reconstructing Context with Joins. Shows grade rows dynamically receiving metadata, such as item weights, from the related weight table at query time. | `ch05-join-logic.png` |
| Figure 5.37 | Part 6: Aggregation, Grouping, and Calculated Results | Rows-to-Summary Aggregation. Detailed records from the `GRADEBOOK` table are compressed into summary metrics such as counts, averages, and totals. | `ch05-create-a-clean-aggregation-diagram.png` |
| Figure 5.38 | Why Aggregation Matters | The SQL Aggregation Pipeline. Displays raw grade records at the base, grouping and filtering in the middle, and summary outputs such as class averages at the top. | `ch05-create-a-processflow-diagram-showing.jpg` |
| Figure 5.39 | Aggregate Functions | Core Aggregate Functions. Labeled cards for COUNT(), AVG(), SUM(), MIN(), and MAX() explaining what business questions they answer. | `ch05-calc-sql.png` |
| Figure 5.40 | Grouping with `GROUP BY` | Grouping Buckets. Illustrates how records are grouped into buckets, such as Quiz and Homework, before aggregate functions run on each bucket. | `ch05-create-a-clean-group-by-and-having.png` |
| Figure 5.41 | Filtering Groups with `HAVING` | WHERE vs. HAVING execution. Shows that WHERE filters raw records before grouping, while HAVING filters aggregated summaries after grouping. | `ch05-create-a-clean-group-by-and-having.png` |
| Figure 5.42 | Practical Summary Queries | Summary Outputs Mockup. Visualizes calculated results such as record counts, maximum scores, and category averages as analytical dashboard cards. | `ch05-create-a-clean-calculatedresults.png` |
| Figure 5.43 | Calculated Columns | Calculated Columns Output. Shows how stored scores feed into a temporary calculated column in memory without changing the source table. | `ch05-create-a-clean-calculatedresults.png` |
| Figure 5.44 | A Weighted Contribution Example | Weighted score calculations. Shows how scores and individual item weights are multiplied and divided to calculate a deliverable's weighted contribution to the final grade. | `ch05-calc-sql.png` |
| Figure 5.45 | Text and Date Expressions | Platform SQL Date Operations. Contrasts how SQLite, PostgreSQL, and Access calculate ages and perform text concatenation side by side. | `ch05-sql-date-platform-comparison.png` |
| Figure 5.46 | Looking Ahead | The SQL learning pathway. Shows how basic SQL queries branch into database normalization, advanced analytics, data governance, and dashboard integration. | `ch05-create-a-lefttoright-instructional.jpg` |
| Figure 5.47 | Appendix: Applying These Concepts to the Grading Database | Appendix Roadmap. Maps the appendix examples back to the core chapter concepts: Access-style inserts and side-by-side age expressions. | `ch05-sql-review.jpg` |
| Figure 5.48 | A1. Inserting Rows One at a Time (Access-Friendly) | SQLite vs. Access insertions. Compares multi-row SQL insert statements in SQLite with single-row, AutoNumber-compliant insert statements in Access. | `ch05-create-tables.png` |
| Figure 5.49 | Key Concepts | Structured Query Language concept map. Visualizes relationships between SQL families (DDL/DML/DQL), basic querying clauses, joins, and aggregations. | `ch05-notebooklmmindmap.png` |
| Figure 5.50 | Chapter Summary | Chapter 5 Visual Summary. Recaps the path from raw tables to query logic, joins, grouping, calculations, and analytical insights. | `ch05-ch05-summary.jpg` |
