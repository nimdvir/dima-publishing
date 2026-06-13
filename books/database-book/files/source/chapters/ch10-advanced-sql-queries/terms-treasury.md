<!-- metadata: date="2026-06-11"; chapter="10"; section="terms"; title="Chapter 10 Terms Treasury"; description="Key terms for advanced SQL" -->

# <img src="../../_static/images/terms.gif" alt="Terms" style="width: 50px; height: auto; margin-right: 10px; vertical-align: middle;"> Key Terms: Advanced SQL Queries

## Essential Vocabulary

Understand the key terms used throughout this chapter.

### A
- **ACID Properties**: The four guarantees of database transactions -- Atomicity, Consistency, Isolation, Durability -- ensuring that grouped operations either fully complete or fully roll back.
- **Aggregate Function**: A function (`COUNT`, `AVG`, `SUM`, `MIN`, `MAX`) that computes a single value from a set of rows. Used with `GROUP BY` to produce summaries.
- **Anomaly (Update / Insert / Delete)**: A data integrity problem caused by storing redundant data in flat tables. Update anomalies produce conflicting values; insertion anomalies block new records; deletion anomalies destroy unrelated facts.
- **Audit Trail**: A chronological record of data changes, typically implemented with triggers and an audit table, used for transparency and accountability.

### B
- **B-tree Index**: The default index structure in most databases, organizing values in a balanced tree for fast lookups, range scans, and sorted retrieval.

### C
- **CASE Expression**: SQL conditional logic that evaluates conditions in order and returns the first matching result. Used to classify, label, and transform values inside queries.
- **COALESCE**: A function that returns the first non-NULL value from a list of arguments. Used to replace missing values with meaningful defaults.
- **Common Table Expression (CTE)**: A named, temporary result set defined with `WITH` that exists for the duration of a single query. Used to break complex logic into readable, named stages.
- **Composite Key**: A primary key or unique constraint composed of two or more columns, such as `(StudentID, DeliverableID)`.
- **Correlated Subquery**: A subquery that references columns from the outer query and executes once per outer row, unlike a non-correlated subquery which runs independently.
- **CROSS JOIN**: A join that produces the Cartesian product -- every combination of rows from two tables. Used with `LEFT JOIN` to detect missing data.
- **CREATE TABLE AS SELECT (CTAS)**: A statement that creates a new table and populates it from the results of a query in one step. Used for entity extraction during normalization.

### D
- **Data Migration**: The process of moving data from one structure to another, such as from a flat table into normalized tables using `INSERT INTO ... SELECT`.
- **Derived Table**: A subquery used in the `FROM` clause, creating a temporary inline table that the outer query can filter or join against.

### E
- **Entity Extraction**: The process of identifying and separating distinct entities (students, deliverables, scores) from a flat table using `SELECT DISTINCT` or `GROUP BY`.
- **EXPLAIN / EXPLAIN QUERY PLAN**: A diagnostic command that shows how the database engine plans to execute a query, revealing whether indexes are used or full table scans occur.

### F
- **Foreign Key**: A column (or set of columns) that references the primary key of another table, enforcing referential integrity -- every value must match an existing record in the parent table.
- **Full Table Scan**: A query execution strategy where the database reads every row in a table to find matches. Avoided by using indexes.

### G
- **GROUP BY**: A clause that groups rows sharing common values into summary rows, enabling aggregate calculations per group.
- **GROUP_CONCAT / STRING_AGG**: Functions that concatenate values from multiple rows into a single string. `GROUP_CONCAT` in SQLite/MySQL; `STRING_AGG` in PostgreSQL.

### H
- **HAVING**: A clause that filters groups *after* aggregation, unlike `WHERE` which filters individual rows *before* aggregation.

### I
- **Index**: A database structure that speeds up row lookups at the cost of additional storage and slower write operations. Analogous to a textbook index.
- **INNER JOIN**: A join that returns only rows with matching values in both tables.
- **INSERT INTO ... SELECT**: A statement that populates an existing table with rows produced by a query. The primary tool for data migration during normalization.
- **Intersection Table (Junction Table)**: A table that resolves a many-to-many relationship by storing paired foreign keys. `STUDENT_GRADE` is the intersection table between `STUDENT` and `DELIVERABLE`.

### L
- **LEFT JOIN**: A join that returns all rows from the left table, with `NULL` for unmatched rows on the right. Used to detect missing data.

### N
- **Natural Key**: A primary key derived from real-world identifiers (e.g., a university-assigned `StudentID`), as opposed to a surrogate key.
- **Normalization (SQL-Driven)**: The practical process of decomposing a flat table into properly structured relational tables using SQL queries, as opposed to paper-based design exercises.
- **Non-Correlated Subquery**: A subquery that runs once, independently of the outer query, and returns a fixed result used for comparison.

### P
- **Primary Key**: A column (or combination of columns) that uniquely identifies each row in a table. Cannot contain `NULL` values.

### R
- **Referential Integrity**: The guarantee that every foreign key value points to an existing primary key in the referenced table.
- **ROLLBACK**: A transaction command that undoes all changes made since the last `BEGIN TRANSACTION`, restoring the database to its prior state.

### S
- **Scalar Subquery**: A subquery that returns exactly one value, used in `SELECT` lists or `WHERE` conditions for row-by-row comparison.
- **Self-Join**: A join where a table is joined to itself, used for comparing rows within the same table.
- **Surrogate Key**: An auto-generated primary key (typically an integer) with no business meaning, used when no suitable natural key exists.

### T
- **Transaction**: A group of SQL operations wrapped in `BEGIN` / `COMMIT` (or `ROLLBACK`) that executes as a single atomic unit -- all succeed or none do.
- **Trigger**: A stored procedure that runs automatically in response to `INSERT`, `UPDATE`, or `DELETE` events on a specified table. Used for validation and audit logging.

### U
- **UNION / UNION ALL**: Operators that combine results from two or more `SELECT` statements. `UNION` removes duplicates; `UNION ALL` keeps all rows.
- **UNIQUE Constraint**: A constraint ensuring no duplicate values exist in the specified column(s). Composite `UNIQUE` constraints enforce uniqueness across combinations.

### V
- **View**: A named, saved query that behaves like a virtual table. Views do not store data -- they store logic and re-execute against current data each time they are queried.

### W
- **Window Function**: An aggregate or ranking function (`RANK`, `ROW_NUMBER`, `SUM OVER`, `AVG OVER`) applied over a defined set of rows without collapsing them into groups. Preserves row-level detail alongside analytical calculations.
- **Window Frame**: The `ROWS BETWEEN` clause that defines which rows a window function considers relative to the current row (e.g., `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`).

## Acronyms

| Acronym | Meaning |
|---------|---------|
| ACID | Atomicity, Consistency, Isolation, Durability |
| CTE | Common Table Expression |
| CTAS | CREATE TABLE AS SELECT |
| DDL | Data Definition Language |
| DML | Data Manipulation Language |
| FK | Foreign Key |
| PK | Primary Key |

## Key Concepts

### Normalization as Practice
- SQL is the primary tool for real-world normalization -- not just a design theory exercise.
- Sequencing principle: clean first, constrain second.
- Entity extraction uses `DISTINCT` and `GROUP BY` to identify building blocks of a new schema.

### Analytics Pipeline
- `GROUP BY` + `HAVING` + `CASE` form a complete analytics pipeline: summarize, threshold, classify.
- Window functions add analytical power without collapsing rows.
- Views, CTEs, and subqueries create reusable, layered reporting systems.

### Production Readiness
- Indexes improve read performance at the cost of write speed.
- Transactions ensure atomic, safe bulk operations.
- Triggers automate validation and audit trails at the database layer.
- Constraints are governance policies encoded directly in the schema.
