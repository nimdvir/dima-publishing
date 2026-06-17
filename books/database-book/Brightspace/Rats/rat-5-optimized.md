# RAT 5 — Top Questions (Optimized)

**Source:** Chapter 5 — SQL: The Language of Databases (ch05-main-2026-06-16.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 2 Understand, 4 Apply, 3 Analyze, 1 Evaluate
**Selection criteria:** Higher Bloom levels (Apply, Analyze, Evaluate), scenario-based reasoning, AI-resistance, and broad coverage of all major chapter sections.
**CSV file:** `rat-5-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
  <p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181B;">
    This <strong>Reading Assessment Test (RAT)</strong> is based on
    <strong style="color: #0F766E;">Chapter 5: SQL — The Language of Databases</strong>
    in the course textbook,
    <a href="https://data-pilot.dimapublishing.com/" style="color: #0E7490; font-weight: 600; text-decoration: none;">
      <strong>Using Data to Drive Business Performance</strong>
    </a>.
  </p>
  <p style="margin: 0; font-size: 0.95em; color: #18181B;">
    Make sure you complete reading the chapter and then answer the questions here:
    <a href="https://data-pilot.dimapublishing.com/book/ch05/introduction/1" style="color: #4F46E5; font-weight: 600; text-decoration: none;">
      Chapter 5 — SQL: The Language of Databases →
    </a>
  </p>
</div>

---

## Multi-Select Questions

**Q1. DDL vs DML classification**

*Short description: DDL vs DML classification*

<p>A student writes the following SQL statements while building the Grading Database. Classify each as DDL or DML.</p>
<pre class="line-numbers d2l-code"><code class="language-sql">1. CREATE TABLE STUDENT (StudentID INTEGER PRIMARY KEY, StudentName TEXT); 
2. INSERT INTO STUDENT VALUES (1, 'Alice'); 
3. SELECT StudentName FROM STUDENT WHERE StudentID = 1; 
4. ALTER TABLE STUDENT ADD COLUMN Email TEXT; 
5. UPDATE STUDENT SET Email = 'alice@university.edu' WHERE StudentID = 1; </code></pre>
<p>Select ALL that apply.</p>

A. Statement 1 (CREATE TABLE) is DDL — it defines the structure of the database  ← ✓ CORRECT
*Feedback: Correct — DDL (Data Definition Language) statements create or modify the schema. CREATE TABLE defines table structure.*

B. Statement 4 (ALTER TABLE) is DDL — it modifies the table structure  ← ✓ CORRECT
*Feedback: Correct — ALTER TABLE changes the schema by adding a column, which is a DDL operation.*

C. Statement 2 (INSERT INTO) is DDL — it defines a new row structure
*Feedback: Incorrect — INSERT adds data rows, not structure. INSERT is DML (Data Manipulation Language), not DDL.*

D. Statements 2, 3, and 5 are all DML — they manipulate data within existing structures  ← ✓ CORRECT
*Feedback: Correct — INSERT, SELECT, and UPDATE all work with data inside existing tables. They are DML statements.*

E. All five statements are DML because they all operate on the database
*Feedback: Incorrect — CREATE TABLE and ALTER TABLE are DDL. DDL defines structure; DML manipulates data.*

**Hint:** DDL = defines structure (CREATE, ALTER, DROP). DML = manipulates data (SELECT, INSERT, UPDATE, DELETE).

**Explanation:** Chapter 5 distinguishes DDL (Data Definition Language) from DML (Data Manipulation Language). DDL statements like CREATE TABLE and ALTER TABLE define or change the database schema. DML statements like SELECT, INSERT, and UPDATE work with the data inside tables. This distinction is fundamental to understanding SQL's role in database systems.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT5-Q1 | **Bloom:** Apply

---

**Q2. Aggregate functions and GROUP BY**

*Short description: Aggregate functions and GROUP BY*

An analyst writes a query against the GRADEBOOK table to find the average score per deliverable type. The table has columns: StudentID, DeliverableType, Score.

Select ALL that apply.

A. GROUP BY DeliverableType is required to calculate a separate average for each type  ← ✓ CORRECT
*Feedback: Correct — GROUP BY creates one output row per group. Without it, AVG would return a single overall average.*

B. HAVING can be used interchangeably with WHERE to filter individual rows before grouping
*Feedback: Incorrect — WHERE filters rows before grouping; HAVING filters groups after aggregation. They are not interchangeable.*

C. AVG(Score) inside a GROUP BY query returns the average for each group, not the overall average  ← ✓ CORRECT
*Feedback: Correct — aggregate functions like AVG, COUNT, SUM operate within each group when GROUP BY is present.*

D. You can SELECT DeliverableType and AVG(Score) without GROUP BY if you use HAVING instead
*Feedback: Incorrect — mixing non-aggregated columns (DeliverableType) with aggregate functions requires GROUP BY regardless of HAVING.*

E. ORDER BY can be added after GROUP BY to sort the grouped results  ← ✓ CORRECT
*Feedback: Correct — ORDER BY sorts the final result set. It can be used after GROUP BY to order the grouped output.*

**Hint:** GROUP BY creates groups. Aggregates calculate within groups. WHERE filters before, HAVING after.

**Explanation:** Chapter 5 explains aggregation with GROUP BY and aggregate functions. GROUP BY divides rows into groups; aggregate functions (AVG, COUNT, SUM, MAX, MIN) compute one value per group. WHERE filters individual rows before grouping. HAVING filters groups after aggregation. ORDER BY sorts the final output.

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT5-Q2 | **Bloom:** Analyze

---

## Multiple-Choice Questions

**Q3. SQL declarative nature**

*Short description: SQL declarative nature*

A student writes: <code>SELECT StudentName, Score FROM GRADEBOOK WHERE Score &gt; 80 ORDER BY Score DESC</code>. The DBMS decides to use an index on Score to speed up the query. The student did not specify any index or join strategy. What SQL characteristic does this illustrate?

A. SQL is procedural — the DBMS follows the student's step-by-step instructions
*Feedback: Incorrect — procedural languages require explicit step-by-step instructions. SQL does not.*

B. SQL is declarative — the student describes the desired result and the DBMS determines the execution plan  ← ✓ CORRECT
*Feedback: Correct — declarative languages express WHAT to retrieve. The DBMS query optimizer decides HOW to execute it.*

C. SQL is object-oriented — the DBMS treats tables as objects with methods
*Feedback: Incorrect — SQL is not object-oriented. It is a declarative query language based on relational algebra.*

D. SQL is functional — each query is a pure function with no side effects
*Feedback: Incorrect — while SQL queries can be composed, SQL is classified as declarative, not functional.*

**Hint:** Declarative = you say WHAT. Procedural = you say HOW. Which does SQL do?

**Explanation:** Chapter 5 emphasizes that SQL is a declarative language: you describe the desired result (which columns, from which table, filtered how, sorted how) and the DBMS query optimizer determines the most efficient way to execute it — choosing indexes, join algorithms, and scan strategies automatically.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT5-Q3 | **Bloom:** Understand

---

**Q4. Teaching dataset structure**

*Short description: Teaching dataset structure*

Chapter 5 introduces a two-table teaching dataset with GRADEBOOK and GRADE_WEIGHT tables. What is the primary reason the chapter uses only two tables instead of the full seven-table Grading Database?

A. Two tables are all that a real grading system needs
*Feedback: Incorrect — real grading systems require more tables. The two-table design is intentionally simplified for teaching.*

B. A simplified dataset lets students focus on SQL syntax and query logic before tackling multi-table joins in later chapters  ← ✓ CORRECT
*Feedback: Correct — the chapter deliberately simplifies the data model so students can concentrate on learning SQL statements without the complexity of many interrelated tables.*

C. SQLite cannot handle more than two tables in a single database
*Feedback: Incorrect — SQLite supports multiple tables and complex schemas. The two-table limit is pedagogical, not technical.*

D. The full seven-table database does not support the SQL concepts covered in Chapter 5
*Feedback: Incorrect — the full database supports all the same SQL concepts. The simplification is for learning progression.*

**Hint:** Think about the chapter's sequencing: why introduce SQL with a simple dataset before the full database?

**Explanation:** Chapter 5 intentionally uses a simplified two-table dataset (GRADEBOOK and GRADE_WEIGHT) so students can focus on learning SQL fundamentals — SELECT, WHERE, JOIN, GROUP BY — without being overwhelmed by a complex schema. The full seven-table Grading Database is introduced in later chapters when students are ready for multi-table joins and relational design.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT5-Q4 | **Bloom:** Understand

---

**Q5. CREATE TABLE syntax**

*Short description: CREATE TABLE syntax*

A student needs to create a table called PRODUCT with columns: ProductID (integer, primary key), ProductName (text, required), and Price (decimal, must be greater than zero). Which CREATE TABLE statement is correct?

A. CREATE TABLE PRODUCT (ProductID INT, ProductName TEXT, Price DECIMAL) WHERE Price > 0;
*Feedback: Incorrect — WHERE is not valid in CREATE TABLE. Constraints like CHECK are used instead.*

B. CREATE TABLE PRODUCT (ProductID INTEGER PRIMARY KEY, ProductName TEXT NOT NULL, Price DECIMAL CHECK (Price > 0));  ← ✓ CORRECT
*Feedback: Correct — PRIMARY KEY, NOT NULL, and CHECK constraints are defined inside the column definitions in CREATE TABLE.*

C. CREATE TABLE PRODUCT WITH (ProductID INTEGER KEY, ProductName TEXT REQUIRED, Price DECIMAL > 0);
*Feedback: Incorrect — KEY is not the keyword for primary keys; REQUIRED is not valid; > 0 is not a valid constraint syntax.*

D. INSERT INTO PRODUCT CREATE (ProductID INTEGER PRIMARY, ProductName TEXT, Price DECIMAL);
*Feedback: Incorrect — INSERT INTO is for adding data rows, not creating table structure. CREATE TABLE defines the schema.*

**Hint:** CREATE TABLE defines the schema. Constraints like PRIMARY KEY, NOT NULL, and CHECK go inside the column definitions.

**Explanation:** Chapter 5 covers CREATE TABLE syntax as part of DDL. The correct statement uses CREATE TABLE with column definitions that include data types and constraints: PRIMARY KEY for unique row identification, NOT NULL to require a value, and CHECK to enforce a domain condition (Price > 0).

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT5-Q5 | **Bloom:** Apply

---

**Q6. DISTINCT behavior**

*Short description: DISTINCT behavior*

The GRADEBOOK table has 100 rows. Student Brian appears in 8 rows because he has 8 graded deliverables. A student writes: SELECT DISTINCT StudentName FROM GRADEBOOK. How many rows does this query return?

A. 100 rows — DISTINCT has no effect on a SELECT statement
*Feedback: Incorrect — DISTINCT removes duplicate rows from the result. Student names that appear multiple times are collapsed into one row each.*

B. 8 rows — because Brian has 8 deliverables and DISTINCT counts them separately
*Feedback: Incorrect — DISTINCT operates on the combination of all selected columns, not on the number of source rows per student.*

C. One row per unique student name — DISTINCT eliminates duplicate names, returning each student once  ← ✓ CORRECT
*Feedback: Correct — DISTINCT removes duplicate values in the selected column(s). Each student name appears once regardless of how many grade rows they have.*

D. 92 rows — DISTINCT removes only exact duplicate rows, and most students have unique scores
*Feedback: Incorrect — the query selects only StudentName, not the full row. Rows with the same name (different scores) are collapsed into one name.*

**Hint:** DISTINCT removes duplicate values in the selected columns. What gets duplicated when one student has many grades?

**Explanation:** Chapter 5 explains DISTINCT as a keyword that eliminates duplicate rows from query results. When selecting only StudentName, DISTINCT returns each name once, regardless of how many rows that student has in the underlying table. This is useful for getting a unique list of values.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT5-Q6 | **Bloom:** Apply

---

**Q7. WHERE clause filtering**

*Short description: WHERE clause filtering*

A student wants to find all scores above 85 from the GRADEBOOK table. They write: SELECT * FROM GRADEBOOK WHERE Score > 85. What does WHERE accomplish in this query?

A. It sorts the results from highest to lowest score
*Feedback: Incorrect — sorting is done by ORDER BY, not WHERE. WHERE filters rows, not sorts them.*

B. It filters rows — only rows where Score is greater than 85 are included in the result  ← ✓ CORRECT
*Feedback: Correct — WHERE specifies a condition that each row must satisfy to be included in the result set.*

C. It groups rows with similar scores together
*Feedback: Incorrect — grouping is done by GROUP BY. WHERE filters individual rows before any grouping occurs.*

D. It creates a new column that shows whether each score is above 85
*Feedback: Incorrect — WHERE does not add columns. For conditional output, use CASE.*

**Hint:** WHERE determines which rows to include. ORDER BY sorts. GROUP BY groups. Which one filters?

**Explanation:** Chapter 5 covers WHERE as the row-filtering clause in SQL. WHERE Score > 85 means only rows meeting that condition appear in the result. WHERE is evaluated before GROUP BY and before SELECT, so it filters at the row level early in query execution.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT5-Q7 | **Bloom:** Understand

---

**Q8. INNER JOIN behavior**

*Short description: INNER JOIN behavior*

The GRADEBOOK table has a DeliverableType column. The GRADE_WEIGHT table also has a DeliverableType column and a Weight column. A student writes: SELECT G.StudentName, G.Score, W.Weight FROM GRADEBOOK G INNER JOIN GRADE_WEIGHT W ON G.DeliverableType = W.DeliverableType. What does INNER JOIN guarantee?

A. All rows from GRADEBOOK appear, even if no matching weight exists
*Feedback: Incorrect — that describes a LEFT JOIN, not an INNER JOIN. INNER JOIN excludes unmatched rows.*

B. Only rows where DeliverableType matches in both tables appear — unmatched rows from either table are excluded  ← ✓ CORRECT
*Feedback: Correct — INNER JOIN returns only the intersection: rows with a matching key in both tables.*

C. All rows from both tables appear, with NULLs where no match exists
*Feedback: Incorrect — that describes a FULL OUTER JOIN, which is not covered in Chapter 5. INNER JOIN excludes non-matching rows.*

D. GRADE_WEIGHT rows with no matching GRADEBOOK rows appear with NULL student names
*Feedback: Incorrect — INNER JOIN excludes unmatched rows from both sides. A weight with no grades would not appear.*

**Hint:** INNER JOIN = intersection. Only rows with matching keys in both tables survive.

**Explanation:** Chapter 5 introduces INNER JOIN as the intersection of two tables: only rows where the join condition (G.DeliverableType = W.DeliverableType) is satisfied appear in the result. Rows from either table that have no match in the other table are excluded. This is the most common join type for combining related data.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT5-Q8 | **Bloom:** Apply

---

**Q9. LEFT JOIN with NULLs**

*Short description: LEFT JOIN with NULLs*

A student modifies the query to use LEFT JOIN instead: SELECT G.StudentName, G.Score, W.Weight FROM GRADEBOOK G LEFT JOIN GRADE_WEIGHT W ON G.DeliverableType = W.DeliverableType. A deliverable type "Extra Credit" exists in GRADEBOOK but has no matching row in GRADE_WEIGHT. What appears in the Weight column for those rows?

A. 0 — LEFT JOIN treats missing weights as zero
*Feedback: Incorrect — NULL is not zero. LEFT JOIN returns NULL for unmatched columns from the right table.*

B. An error — the query fails because Weight cannot be NULL
*Feedback: Incorrect — LEFT JOIN handles unmatched rows gracefully by returning NULL, not by raising an error.*

C. NULL — LEFT JOIN preserves all rows from the left table and fills unmatched right-side columns with NULL  ← ✓ CORRECT
*Feedback: Correct — LEFT JOIN keeps every row from GRADEBOOK. Where no match exists in GRADE_WEIGHT, the Weight column is NULL.*

D. The text 'Extra Credit' — the DeliverableType value fills in where Weight would be
*Feedback: Incorrect — columns are independent. A missing Weight value does not cause DeliverableType to appear in the Weight column.*

**Hint:** LEFT JOIN = all left rows survive. Missing right-side values become NULL.

**Explanation:** Chapter 5 explains LEFT JOIN as preserving all rows from the left table (GRADEBOOK) and filling unmatched columns from the right table (GRADE_WEIGHT) with NULL. This is useful when you want to see all records from one table even if some lack corresponding data in the related table.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT5-Q9 | **Bloom:** Apply

---

**Q10. HAVING vs WHERE**

*Short description: HAVING vs WHERE*

A query calculates the average score per deliverable type: SELECT DeliverableType, AVG(Score) FROM GRADEBOOK GROUP BY DeliverableType. The student wants to show only types where the average is above 80. They add HAVING AVG(Score) > 80. Why can't WHERE be used instead?

A. WHERE cannot compare numbers — only HAVING supports numeric comparisons
*Feedback: Incorrect — WHERE supports numeric comparisons (e.g., WHERE Score > 80). The issue is timing, not data type.*

B. WHERE filters individual rows before grouping; HAVING filters groups after aggregation. You cannot use WHERE on an aggregate result because the aggregate does not exist yet at the row level.  ← ✓ CORRECT
*Feedback: Correct — WHERE executes before GROUP BY, when individual rows exist but groups and aggregates do not. HAVING executes after GROUP BY, when aggregates are available.*

C. HAVING is just a synonym for WHERE — they are interchangeable
*Feedback: Incorrect — they operate at different stages of query execution and are not interchangeable.*

D. WHERE would work but is slower — HAVING is preferred for performance
*Feedback: Incorrect — WHERE literally cannot filter on aggregate values because they haven't been computed yet at the WHERE stage.*

**Hint:** Query execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. Where does AVG get computed?

**Explanation:** Chapter 5 distinguishes WHERE from HAVING by their position in query execution. WHERE filters individual rows before grouping occurs, so it cannot reference aggregate functions like AVG. HAVING filters after GROUP BY, when aggregate values are available. This is why AVG(Score) > 80 must go in HAVING, not WHERE.

**Points:** 1 | **Difficulty:** 4/5 | **ID:** BITM330-RAT5-Q10 | **Bloom:** Analyze

---

## Quick-Reference Answer Key

| # | Type | Correct Answer(s) | Points | Difficulty | Bloom |
|---|------|-------------------|--------|------------|-------|
| 1 | MS   | A, B, D           | 2      | 3          | Apply |
| 2 | MS   | A, C, E           | 2      | 4          | Analyze |
| 3 | MC   | B                 | 1      | 2          | Understand |
| 4 | MC   | B                 | 1      | 2          | Understand |
| 5 | MC   | B                 | 1      | 3          | Apply |
| 6 | MC   | C                 | 1      | 3          | Apply |
| 7 | MC   | B                 | 1      | 2          | Understand |
| 8 | MC   | B                 | 1      | 3          | Apply |
| 9 | MC   | C                 | 1      | 3          | Apply |
| 10 | MC   | B                 | 1      | 4          | Analyze |
