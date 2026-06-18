# Chapter 5 Term Treasury - SQL: The Language of Databases

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/terms_gqkau8?_a=BAMAAAiu0" alt="Term Treasury" />
</p>

<!-- Companion: Key terms and definitions - 2026-06-16 -->

| Term / Concept | Definition | Business Significance | Examples |
|---|---|---|---|
| **Aggregate Function** | A built-in SQL function (such as `COUNT()`, `AVG()`, or `SUM()`) that summarizes values across multiple rows or groups of rows. | Helps managers calculate summary metrics like total revenue or average grade, turning large volumes of detail records into actionable high-level performance insights. | Using `AVG(Score)` over the `GRADEBOOK` table to find the class average. |
| **Alias** | A temporary name given to a column or table in a query to make the SQL statement or its output easier to read. | Keeps query results professional and understandable for business users by replacing dense database columns with clear headings. | Writing `Score AS CurrentScore` or `GRADEBOOK AS g` in SQL. |
| **CASE Expression** | A SQL expression that evaluates conditions and returns specific values when a condition is met, functioning like if-then-else logic. | Automates row-level logic, such as classifying customers or grading bands, directly within the database query for cleaner categorization. | Categorizing scores inline as 'Pass' or 'Fail' based on a threshold (`CASE WHEN Score >= 80 THEN 'Pass' ELSE 'Fail' END`). |
| **Column** | One field or attribute in a table that holds a specific type of information. | Ensures data consistency by enforcing the type of information stored across all records (e.g., all emails in an Email column). | The `Score` column in the `GRADEBOOK` table. |
| **Data Definition Language (DDL)** | The subset of SQL statements used to define, alter, or drop database structures like tables. | Establishes and enforces the organizational blueprint of a database, ensuring structural integrity before data is ever loaded. | `CREATE TABLE`, `ALTER TABLE`, and `DROP TABLE` statements. |
| **Data Manipulation Language (DML)** | The subset of SQL statements used to add, modify, or delete stored records. | Enables organizations to record transaction files and modify operational records day-by-day to keep systems current. | `INSERT INTO`, `UPDATE`, and `DELETE` statements. |
| **Data Query Language (DQL)** | The subset of SQL statements used specifically to request and retrieve data from a database. | Serves as the primary tool for queries, reporting, and answering business-performance questions by retrieving specific records immediately. | The `SELECT` statement and its accompanying clauses. |
| **Declarative Language** | A type of language where the user specifies *what* data they want rather than *how* the computer must physically retrieve it. | Saves huge amounts of developer time and prevents errors because the database engine optimizes the physical path to retrieve records. | SQL queries, which state the desired columns and criteria while the DBMS manages the physical scan. |
| **DISTINCT** | A SQL keyword that filters out duplicate rows from a query result, returning only unique values. | Prevents overcounting and provides clean lists, such as distinct customers who made purchases or active student majors. | Running `SELECT DISTINCT DeliverableType FROM GRADEBOOK` to get a list of active assessment types. |
| **Expression** | A calculation or transformation performed in a query to produce a new value. | Enables on-the-fly calculations (like calculating age from birthday) without permanently altering stored data. | Calculating `Price * Quantity` to get total revenue in a query. |
| **Filter** | A condition that limits which rows are returned in a query. | Allows analysts to focus strictly on relevant subsets of data, such as narrowing down to a specific region or time frame. | Using the `WHERE` clause to filter out inactive users. |
| **GROUP BY** | The SQL clause that groups rows sharing identical values so aggregate functions can be calculated for each group. | Enables managers to analyze performance across categories, such as aggregate sales per region or class averages per student. | Grouping the `GRADEBOOK` table by `StudentID` to calculate each student's average score. |
| **HAVING** | The SQL clause used to filter grouped results after aggregate functions have been calculated. | Allows managers to focus on high-priority subsets of aggregate data, such as regions with sales over a target or class segments needing support. | Adding `HAVING AVG(Score) < 80` to filter for grouped student averages below a passing rate. |
| **INNER JOIN (Join)** | A query operation that matches and combines rows from two related tables based on a shared column. | Reconstructs complete business context by linking transaction records back to their master metadata, reducing duplicate storage. | Linking `GRADEBOOK` to `GRADE_WEIGHT` on `DeliverableType` to attach weights to student grades at query time. |
| **NULL** | A special database marker indicating that a value is empty, unknown, inapplicable, or missing. | Distinguishes between zero (a known value) and unrecorded data (like an unsubmitted quiz), preventing false averages in analysis. | An empty cell in `Score` for a student who missed an exam or a Null value in a column without `NOT NULL` constraints. |
| **ORDER BY (Sort)** | The SQL clause used to sort query results in ascending or descending order. | Organizes database output to highlight extreme values immediately, such as prioritizing highest-performing products or locating low-scoring students. | Adding `ORDER BY Score DESC` to sort scores from highest to lowest. |
| **Query** | A request for data or a data-related operation sent to a database. | Transforms stored data into actionable answers for decision-making and reporting. | Running a `SELECT` statement to find students who scored below 80. |
| **Row** | One record in a table representing a single entity or event. | Captures an individual instance of business activity, such as a single sale or student enrollment. | A single student's record in the `GRADEBOOK` table. |
| **SQL** | The standard language for working with relational databases. | Provides a portable, universal way to manage and query data across different database platforms. | `SELECT`, `INSERT`, `UPDATE`, `DELETE` statements. |
| **Table** | A structured set of rows and columns. | Provides the foundational structure for organizing business entities and transactions cleanly. | The `GRADEBOOK` table storing student grades. |
| **Transaction Control Language (TCL)** | The subset of SQL statements used to manage database transactions, ensuring group operations succeed or fail as a single unit. | Guarantees database integrity during multi-step modifications, such as transferring bank funds or enrolling in linked classes. | `COMMIT` and `ROLLBACK` commands. |
| **WHERE** | The SQL clause used to filter individual database rows before any grouping or aggregation takes place. | Increases retrieval speed and filters out irrelevant noise, allowing managers to target specific dates, locations, or criteria. | `WHERE DeliverableType = 'Exam'` to narrow query execution down to exams only. |

## Acronyms and Abbreviations

| Abbreviation | Full Form | Brief Meaning | Where It Appears |
|---|---|---|---|
| **SQL** | Structured Query Language | A standard language for querying and managing relational databases. | Introduction and query environments |
| **DDL** | Data Definition Language | Code family that defines or changes database structures. | Four Families table and table creation |
| **DML** | Data Manipulation Language | Code family that adds, modifies, or deletes records. | Four Families table and insertion examples |
| **DQL** | Data Query Language | Code family that retrieves data records from tables. | Four Families table and SELECT queries |
| **TCL** | Transaction Control Language | Code family that manages changes as a transaction unit. | Four Families table discussion |
| **DBMS** | Database Management System | Software engine that runs and secures databases. | Tooling comparison discussion |
| **PK** | Primary Key | Column that uniquely identifies each row in a table. | Table creation syntax |
| **FK** | Foreign Key | Column that links a table to another table's primary key. | Table creation and JOIN logic |
