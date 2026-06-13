<!-- metadata: date="2026-05-19" -->

# Readiness Assessment Test (RAT): SQL -- The Language of Databases

![RAT](https://res.cloudinary.com/dkndq6lyz/image/upload/w_200/f_auto/q_auto/RAT_big?_a=BAMAAAhK0)

> **Part of:** Chapter 5 -- *How Structured Queries Turn Stored Data into Usable Information*  
> **Main chapter file:** [ch05-main-edited-2026-05-18.md](../main/ch05-main-edited-2026-05-18.md)  
> **Let's Build file:** [ch05-lets-build-2026-03-22.md](../lets-build/ch05-lets-build-2026-03-22.md)  
> **Key terms:** [ch05-terms-2026-03-24.md](../terms/ch05-terms-2026-03-24.md)

---

## Remember

**1. What does it mean that SQL is a declarative language?**

A. The user describes the result they want, and the DBMS determines how to produce it

B. The user must write the storage and indexing steps manually

C. SQL only works for creating tables, not querying them

D. SQL runs only after a program compiles it into machine code

**2. Select ALL that apply: Which statements in Chapter 5 are Data Definition Language (DDL)?**

A. `CREATE TABLE GRADEBOOK (...)`

B. `SELECT FirstName, LastName, Score FROM GRADEBOOK`

C. `ALTER TABLE GRADEBOOK ADD COLUMN SectionCode TEXT`

D. `UPDATE GRADEBOOK SET Score = 79 WHERE RecordID = 5`

E. `DELETE FROM GRADEBOOK WHERE RecordID = 6`

**3. Which SQL keyword removes duplicate rows from a result based on the selected columns?**

A. `GROUP BY`

B. `HAVING`

C. `DISTINCT`

D. `ORDER BY`

**4. Select ALL that apply: Which statements accurately describe the Chapter 5 teaching dataset?**

A. `GRADEBOOK` stores one wide record for each student-deliverable result

B. `GRADE_WEIGHT` stores category-level grading metadata

C. `DeliverableType` is the matching field used in the chapter's join examples

D. `Score` and `WeightPerItem` represent the same unit and can be compared directly without conversion

E. `GRADE_WEIGHT` stores one row per student

**5. Which join type keeps every row from the left table even when the right table has no match?**

A. `INNER JOIN`

B. `CROSS JOIN`

C. `LEFT JOIN`

D. `UNION`

**6. Select ALL that apply: Which clause-to-purpose matches are correct?**

A. `ORDER BY` sorts query results

B. `WHERE` filters rows before grouping

C. `AVG()` changes stored values in the table

D. `AS` can assign a temporary alias in query output

E. `HAVING` removes duplicate rows from a result set

**7. In the chapter's platform comparison table, which approach is listed as the typical SQLite auto-number pattern?**

A. `SERIAL`

B. `INTEGER PRIMARY KEY`

C. `AUTO_INCREMENT`

D. `IDENTITY` only

**8. Select ALL that apply: Which tools are introduced as recognition-level preview material in Chapter 5?**

A. Views

B. Subqueries

C. Common Table Expressions

D. `UNION`

E. `HAVING`

---

## Understand

**9. Why does the chapter recommend using explicit column lists in `INSERT INTO` statements?**

A. They make SQLite store dates as true date types automatically

B. They make statements safer to read and revise because values stay tied to named columns instead of relying on table order

C. They force the DBMS to create indexes before inserting data

D. They eliminate the need for `VALUES`

**10. Select ALL that apply: Why does the chapter treat the DDL versus DML distinction as important?**

A. DDL changes structure that other work depends on

B. DML is only used before any tables exist

C. A careless structural statement such as `DROP TABLE` can destroy needed structure or data access

D. Distinguishing structure work from record work helps students classify what each statement is doing

E. DDL stops mattering after the first day a database is created

**11. Why does the chapter compare Access saved queries to SQL views but still say they are not exactly the same thing?**

A. Access saved queries store duplicate copies of the data, while views do not

B. Views are only available in spreadsheets, not databases

C. Both preserve reusable query logic, but Access does not support `CREATE VIEW` in the same way as SQLite or PostgreSQL

D. Access saved queries can only sort data and cannot filter it

**12. Select ALL that apply: Which statements about `NULL` handling match the chapter?**

A. `AVG()` skips `NULL` values

B. `NULL` means exactly the same thing as `0`

C. `COUNT(column)` skips `NULL` values in that column

D. `COUNT(*)` counts rows whether individual columns are `NULL` or not

E. `Email = NULL` is the recommended way to detect missing email addresses

**13. Why does the chapter emphasize that aliases improve readability without changing stored data?**

A. Because aliases automatically update the table design after the query runs

B. Because aliases only relabel output columns or table references inside the query result

C. Because aliases convert text fields into numbers

D. Because aliases remove duplicate rows before sorting

**14. Select ALL that apply: Why do joins matter in the Chapter 5 two-table design?**

A. They combine student performance records with category metadata at query time

B. They let the chapter connect `GRADEBOOK` and `GRADE_WEIGHT` through `DeliverableType`

C. They require `SELECT *` in every query

D. They show how related information can stay in separate tables and still be used together

E. They only work when both tables have exactly the same number of rows

**15. Why must a query that filters grouped averages use `HAVING` instead of `WHERE`?**

A. Because `HAVING` sorts the rows before grouping

B. Because `WHERE` can only be used with text columns

C. Because grouped averages do not exist until after `GROUP BY` runs

D. Because `HAVING` creates the aliases used in the `SELECT` clause

**16. Select ALL that apply: Which statements capture the chapter's idea of SQL portability across tools?**

A. The same core SQL logic transfers across Access, SQLite, and PostgreSQL-oriented environments

B. Small syntax details such as string concatenation or date functions may differ by platform

C. SQLite does not directly support every join type discussed in the chapter

D. Portability means every SQL statement is written with identical syntax in every product

E. Platform notes still matter even when the core logic stays stable

---

## Apply

**17. Which query pattern correctly returns each deliverable category only once from `GRADEBOOK`?**

A. `SELECT DeliverableType FROM GRADEBOOK ORDER BY DeliverableType`

B. `SELECT DeliverableType FROM GRADEBOOK GROUP BY Score`

C. `SELECT ALL DeliverableType FROM GRADEBOOK`

D. `SELECT DISTINCT DeliverableType FROM GRADEBOOK`

**18. Select ALL that apply: A new row in `GRADEBOOK` uses a `DeliverableType` that does not yet appear in `GRADE_WEIGHT`. What happens if the chapter's `LEFT JOIN` pattern is used?**

A. The `GRADEBOOK` row still appears in the result

B. The query fails immediately because the right table has no match

C. Right-side columns such as `CategoryWeight` appear as `NULL`

D. An equivalent `INNER JOIN` would omit that unmatched row

E. SQLite automatically inserts the missing category into `GRADE_WEIGHT`

**19. In the chapter's weighted contribution example, what is the weighted contribution for a score of 92 on a quiz worth 5 percent of the course?**

A. 4.60

B. 18.40

C. 46.00

D. 97.00

**20. Select ALL that apply: Given the sample data, Brian's Quiz 2 score is 77. Which filters would return that row?**

A. `WHERE Score < 80`

B. `WHERE DeliverableType = 'Quiz' AND Score < 80`

C. `WHERE Score BETWEEN 70 AND 80`

D. `WHERE DeliverableType = 'Exam' OR Score < 80`

E. `WHERE DeliverableType = 'Quiz' AND Score > 80`

**21. Which query structure best matches the chapter's student summary pattern that produces one average score per student?**

A. Use `AVG(Score)` with no `GROUP BY`, because one average per student happens automatically

B. Group by `StudentID`, `FirstName`, and `LastName` while calculating `AVG(Score)`

C. Use `ORDER BY StudentID` instead of `GROUP BY`

D. Use `DISTINCT StudentID` and skip the aggregate function

**22. Select ALL that apply: Which conditions are written correctly for the type of filtering described in Chapter 5?**

A. `WHERE Email IS NULL`

B. `WHERE Email = NULL`

C. `WHERE Score IS NOT NULL`

D. `WHERE Score <> NULL`

E. `WHERE DeliverableType IS AVG('Quiz')`

**23. When writing an `INSERT INTO` statement in the chapter's SQL style, which practice is correct for text and date literals?**

A. Leave text and date values unquoted if the column types are already known

B. Put text and date literals in single quotes and use the `YYYY-MM-DD` date pattern

C. Use double quotes for text and slashes for dates because SQLite requires them

D. Put dates in parentheses and text in square brackets

**24. Select ALL that apply: Which actions are part of the chapter's safe workflow before running `UPDATE` or `DELETE`?**

A. Write a `SELECT` statement with the same `WHERE` clause first

B. Verify the exact rows returned before modifying data

C. Convert the confirmed logic into `UPDATE` or `DELETE` only after checking the target rows

D. Treat a missing `WHERE` clause as a major risk because it can affect every row

E. Use `TRUNCATE` as the default beginner-safe replacement for `DELETE`

---

## Analyze

**25. The instructor wants a reusable list of high-performing rows that can be queried again later without rewriting the full logic each time. Which Chapter 5 tool is the best direct fit?**

A. `ORDER BY`

B. `DISTINCT`

C. A view

D. `DELETE`

**26. Select ALL that apply: Consider the pattern `SELECT DeliverableType, AVG(Score) AS AverageScore FROM GRADEBOOK GROUP BY DeliverableType HAVING AVG(Score) < 85 ORDER BY AverageScore DESC`. Which statements are correct?**

A. It forms one group per deliverable type before filtering those groups

B. `HAVING` is applied after the average for each group is computed

C. `ORDER BY AverageScore DESC` sorts the remaining grouped results from highest average to lowest

D. The output contains one row per student

E. Replacing `HAVING AVG(Score) < 85` with `WHERE AVG(Score) < 85` would preserve the same logic cleanly

**27. Why does the chapter's approximate age example use `SELECT DISTINCT StudentID, FirstName, LastName, ...` instead of selecting every row from `GRADEBOOK`?**

A. Because `DISTINCT` converts birthdays into a single shared date format

B. Because the same student appears on multiple deliverable rows, and the query wants one student-level result instead of repeated duplicates

C. Because `DISTINCT` is required any time `strftime()` appears in a query

D. Because SQLite cannot display both names and dates without `DISTINCT`

**28. Select ALL that apply: Which comparisons between `INNER JOIN` and `LEFT JOIN` are correct in the Chapter 5 context?**

A. `INNER JOIN` returns only rows with matches in both tables

B. `LEFT JOIN` preserves all rows from the left table even when the right side is missing

C. SQLite directly supports `RIGHT JOIN` in the same way as `LEFT JOIN`, so it is the chapter's preferred alternative

D. `CROSS JOIN` is different because it returns every possible row combination

E. `INNER JOIN` and `LEFT JOIN` always return identical results regardless of missing matches

**29. Why is the separate `GRADE_WEIGHT` table a useful teaching choice for Chapter 5 even though the chapter says the schema is intentionally simplified?**

A. It proves the schema is already fully normalized and needs no later redesign

B. It introduces a second table for joins and weighting logic without forcing students into a more complex relational model yet

C. It eliminates the need for aggregation

D. It stores one row per student so that averages do not need grouping

**30. Select ALL that apply: Which rules about `UNION` and `UNION ALL` match the chapter?**

A. Both queries being combined must return the same number of columns

B. Corresponding columns should use compatible data types

C. `UNION` removes duplicate rows while `UNION ALL` keeps them

D. The first query usually determines the output column names

E. `UNION` permanently stores the merged result as a new table automatically

**31. A report compares `COUNT(*)` with `COUNT(Email)` on `GRADEBOOK`, and the second value is smaller. Which explanation best matches the chapter?**

A. `COUNT(Email)` counts only distinct email values, while `COUNT(*)` counts duplicates too

B. `COUNT(*)` counts all rows, while `COUNT(Email)` skips rows where `Email` is `NULL`

C. `COUNT(Email)` only works after `GROUP BY`, while `COUNT(*)` works without grouping

D. `COUNT(*)` ignores text columns, but `COUNT(Email)` does not

**32. Select ALL that apply: Which tasks require `HAVING` rather than `WHERE` because the filter depends on grouped results?**

A. Return deliverable types whose average score is below 85

B. Return students whose average score is 90 or higher

C. Return deliverable types with more than one stored row

D. Return rows where an individual score is below 80

E. Return topics whose maximum score is above 90

---

## Evaluate

**33. A class needs a reusable object for "high performers" across systems. Which recommendation best matches the chapter's guidance?**

A. Always use `DELETE` and recreate the result manually each time

B. Use a SQL view in systems that support it, and use an Access saved query as the closest equivalent in Access

C. Store the result in a spreadsheet instead of querying the database again

D. Avoid reusable query logic because portability depends on rewriting everything from scratch

**34. Select ALL that apply: Which objections are strongest if someone proposes running `UPDATE GRADEBOOK SET Email = 'new.email@university.edu';` without a `WHERE` clause?**

A. It would change every row's email value, not one intended record

B. The safer workflow is to preview the target set with a matching `SELECT` first

C. The chapter treats disciplined modification workflow as part of responsible SQL use

D. The absence of `WHERE` is harmless because `UPDATE` only changes the first row by default

E. The chapter's warning about missing `WHERE` clauses applies directly here

**35. An instructor wants the clearest query for how much each deliverable contributes to the course total. Which approach is most defensible in the chapter's schema?**

A. Divide `Score` by `ItemCount` inside `GRADEBOOK` and ignore `GRADE_WEIGHT`

B. Join `GRADEBOOK` to `GRADE_WEIGHT` on `DeliverableType` and calculate `Score * WeightPerItem / 100`

C. Subtract `CategoryWeight` from `Score` because both are percentages

D. Use only `ORDER BY` because weighting is a sorting task, not a calculation task

**36. Select ALL that apply: Which judgments about Chapter 5 platform notes and preview tools are supported by the manuscript?**

A. Access does not support CTEs directly in the same way as SQLite or PostgreSQL

B. SQLite does not directly support `RIGHT JOIN` and `FULL OUTER JOIN`

C. Access saved queries are the closest conceptual equivalent to views in Access

D. Platform notes still matter even when the broader SQL logic transfers across tools

E. Because SQL is portable, date functions and concatenation syntax never vary across platforms

**37. Which evaluation best matches the chapter's position on the wide `GRADEBOOK` design?**

A. It is the ideal final production design and should replace later normalization work

B. It is unsuitable even for teaching because SQL cannot be learned with a simplified schema

C. It is a deliberate teaching structure for learning SQL clearly now, while Chapter 6 moves toward richer relational design later

D. It exists only because joins are impossible in SQLite

**38. Select ALL that apply: A manager wants to diagnose missing grading metadata while still keeping every grade row visible. Which judgments about join choice are strongest?**

A. `LEFT JOIN` is useful because it preserves the grade rows and exposes missing right-side matches as `NULL`

B. `INNER JOIN` is useful only when the manager wants results with confirmed matches on both sides

C. `CROSS JOIN` is the best default choice for diagnosing one missing category match in this chapter's dataset

D. Missing category metadata becomes visible in a `LEFT JOIN` result because right-side columns can remain empty

E. Join choice does not matter because both tables already store the same information

**39. A manager asks for students whose scores are above the overall class average. Which Chapter 5 construct is the most direct fit?**

A. A `DELETE` statement with a `WHERE` clause

B. A `LEFT JOIN` to `GRADE_WEIGHT`

C. A subquery in `WHERE` that compares each score to `(SELECT AVG(Score) FROM GRADEBOOK)`

D. A `UNION ALL` that separates quiz scores from exam scores

**40. Select ALL that apply: Which reasons best support the chapter's claim that SQL turns stored data into usable information for decisions?**

A. SQL is text-based and transparent enough to show the logic behind the answer

B. SQL is reproducible because the same query can be rerun consistently

C. Aggregate functions and grouping let users move from individual rows to patterns

D. Joins and calculations connect stored facts to more interpretable results

E. SQL removes the need for managerial judgment once a result set appears

---

## Assessment Design Notes

### How Bloom's Taxonomy Was Applied

This RAT uses five Bloom sections with eight questions in each section: **Remember**, **Understand**, **Apply**, **Analyze**, and **Evaluate**. The progression mirrors the chapter's instructional arc from vocabulary and clause recognition, to interpretation of SQL logic, to concrete work with the `GRADEBOOK` and `GRADE_WEIGHT` tables, to comparison of query strategies, and finally to judgment about safer and better SQL choices.

*Figure suggestion: A compact assessment blueprint showing Remember, Understand, Apply, Analyze, and Evaluate as a progression, with eight questions in each level and sample SQL skills beside each level.*

The question set is deliberately chapter-grounded. Rather than asking generic SQL trivia, it repeatedly returns to the chapter's simplified two-table teaching dataset, platform notes, weighted-contribution logic, and safe modification workflow.

### Strategies Used to Reduce AI Answerability

1. Chapter-specific table names, columns, and sample values such as `GRADEBOOK`, `GRADE_WEIGHT`, `DeliverableType`, Brian's Quiz 2 score of 77, and the 92-on-a-5-percent weighted contribution example.
2. Platform-specific distinctions among Access, SQLite, and PostgreSQL-oriented syntax and feature support.
3. Multi-answer questions that require finer discrimination than a single definition match.
4. Scenario stems that force students to choose between similar SQL constructs such as `WHERE` versus `HAVING`, `INNER JOIN` versus `LEFT JOIN`, or view versus subquery versus CTE.
5. Query-reading items that depend on the chapter's exact teaching logic instead of generic database folklore.
6. Distractors drawn from adjacent concepts such as spreadsheets, file-based thinking, or visually similar SQL clauses.

### Chapter Artifact Checklist

- Chapter 5 terminology from the latest main and terms files.
- The simplified two-table teaching dataset and its sample values.
- SQLite-friendly syntax plus platform notes for Access and PostgreSQL.
- Core query clauses: `SELECT`, `WHERE`, `ORDER BY`, `DISTINCT`, aliases, joins, aggregation, `HAVING`, and `CASE`.
- Recognition-level previews for views, subqueries, CTEs, and `UNION`.
- Safe `UPDATE` and `DELETE` workflow guidance.

---

## Answer Key

### Question 1

**1. What does it mean that SQL is a declarative language?**

**Correct answer:** A

Sections 5.4.4 and 5.5 explain that SQL states the result the user wants, while the DBMS decides how to execute the request internally.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This matches the chapter's explanation of declarative SQL. |
| B | No | The chapter says the DBMS handles internal execution details such as access strategy. |
| C | No | SQL is used for both definition and querying. |
| D | No | The chapter does not define SQL by compilation requirements. |

### Question 2

**2. Select ALL that apply: Which statements in Chapter 5 are Data Definition Language (DDL)?**

**Correct answers:** A, C

Sections 5.7 and 5.8 frame `CREATE TABLE` and `ALTER TABLE` as structure-defining statements, while `SELECT`, `UPDATE`, and `DELETE` are DML because they work with stored rows.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `CREATE TABLE` defines structure. |
| B | No | `SELECT` retrieves data, so it is DML in the chapter's distinction. |
| C | Yes | `ALTER TABLE` changes schema structure. |
| D | No | `UPDATE` modifies row values, not table design. |
| E | No | `DELETE` removes rows, which is data manipulation. |

### Question 3

**3. Which SQL keyword removes duplicate rows from a result based on the selected columns?**

**Correct answer:** C

Section 5.10.2 defines `DISTINCT` as the keyword that removes duplicate result values from the selected columns.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `GROUP BY` forms groups for aggregation. |
| B | No | `HAVING` filters grouped results. |
| C | Yes | This is the chapter's duplicate-removal keyword. |
| D | No | `ORDER BY` controls sort order only. |

### Question 4

**4. Select ALL that apply: Which statements accurately describe the Chapter 5 teaching dataset?**

**Correct answers:** A, B, C

Section 5.6 says `GRADEBOOK` stores one wide student-deliverable result row, `GRADE_WEIGHT` stores category metadata, and the join examples match on `DeliverableType`. The same section also warns that `Score` and `WeightPerItem` are different units.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the chapter's description of `GRADEBOOK`. |
| B | Yes | This is the chapter's description of `GRADE_WEIGHT`. |
| C | Yes | The chapter's join examples connect the tables through `DeliverableType`. |
| D | No | The chapter explicitly says the two values are not the same unit. |
| E | No | `GRADE_WEIGHT` stores one row per category, not per student. |

### Question 5

**5. Which join type keeps every row from the left table even when the right table has no match?**

**Correct answer:** C

Section 5.11.3 defines `LEFT JOIN` as the join that keeps all left-side rows and fills missing right-side matches with `NULL`.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `INNER JOIN` keeps only matched rows. |
| B | No | `CROSS JOIN` creates all combinations rather than preserving unmatched left rows. |
| C | Yes | This is the chapter's definition of `LEFT JOIN`. |
| D | No | `UNION` combines compatible result sets, not related tables by key. |

### Question 6

**6. Select ALL that apply: Which clause-to-purpose matches are correct?**

**Correct answers:** A, B, D

Sections 5.10.3, 5.10.8, and 5.10.9 explain that `WHERE` filters rows before grouping, `ORDER BY` sorts results, and aliases created with `AS` relabel output without changing stored data.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `ORDER BY` controls result ordering. |
| B | Yes | `WHERE` filters rows before grouping or aggregation. |
| C | No | `AVG()` calculates a result; it does not update stored values. |
| D | Yes | `AS` creates a temporary alias in output or query syntax. |
| E | No | `HAVING` filters grouped results; it does not remove duplicates. |

### Question 7

**7. In the chapter's platform comparison table, which approach is listed as the typical SQLite auto-number pattern?**

**Correct answer:** B

Section 5.8.5 lists `INTEGER PRIMARY KEY` as the typical SQLite auto-number approach.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `SERIAL` is described as a common older PostgreSQL pattern. |
| B | Yes | This is the SQLite pattern named in the chapter. |
| C | No | That spelling is not the chapter's SQLite example. |
| D | No | `IDENTITY` is listed in the PostgreSQL row, not as SQLite's only method. |

### Question 8

**8. Select ALL that apply: Which tools are introduced as recognition-level preview material in Chapter 5?**

**Correct answers:** A, B, C, D

Sections 5.13 through 5.17 explicitly mark views, subqueries, CTEs, and `UNION` as preview material. `HAVING` is taught as a core clause rather than preview-only content.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Views are previewed after the core query content. |
| B | Yes | Subqueries are introduced as preview material. |
| C | Yes | CTEs are introduced as preview material. |
| D | Yes | `UNION` is also framed as recognition-level material. |
| E | No | `HAVING` is a core aggregation clause taught directly. |

### Question 9

**9. Why does the chapter recommend using explicit column lists in `INSERT INTO` statements?**

**Correct answer:** B

Section 5.9.1 says good insertion habits include keeping columns and values aligned and using explicit column lists because they are safer and easier to revise later.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Column lists do not change SQLite's date storage behavior. |
| B | Yes | This is the chapter's exact safety and readability rationale. |
| C | No | Column lists do not force index creation. |
| D | No | `VALUES` is still required in the chapter's insert examples. |

### Question 10

**10. Select ALL that apply: Why does the chapter treat the DDL versus DML distinction as important?**

**Correct answers:** A, C, D

Sections 5.7.1 through 5.7.3 explain that DDL changes structure, DML works with the data inside that structure, and the distinction helps students classify whether a statement builds the table or works with its records.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | DDL changes schema structure that later work depends on. |
| B | No | DML is used after tables exist to retrieve or modify rows. |
| C | Yes | The chapter uses structural risk to explain why the distinction matters. |
| D | Yes | This is one of the teaching purposes named in the chapter. |
| E | No | The chapter includes `ALTER TABLE` because structure changes can still happen later. |

### Question 11

**11. Why does the chapter compare Access saved queries to SQL views but still say they are not exactly the same thing?**

**Correct answer:** C

Section 5.14.2 says the analogy is useful because both preserve reusable query logic, but Access does not support `CREATE VIEW` in the same way as systems such as SQLite or PostgreSQL.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The chapter does not say Access saved queries store duplicate data. |
| B | No | Views are database objects, not spreadsheet features. |
| C | Yes | This is the distinction the chapter explicitly makes. |
| D | No | Access saved queries can filter and sort; the difference is object support, not capability that narrow. |

### Question 12

**12. Select ALL that apply: Which statements about `NULL` handling match the chapter?**

**Correct answers:** A, C, D

Section 5.10.4 states that `NULL` means missing or unknown, not `0` or an empty string, and that `AVG()`, `SUM()`, and `COUNT(column)` skip `NULL` values while `COUNT(*)` counts rows.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The chapter says aggregate functions such as `AVG()` skip `NULL` values. |
| B | No | `NULL` is explicitly distinguished from `0`. |
| C | Yes | `COUNT(column)` skips `NULL` values in that column. |
| D | Yes | `COUNT(*)` counts rows whether individual columns are `NULL` or not. |
| E | No | The chapter uses `IS NULL`, not `= NULL`, for missing values. |

### Question 13

**13. Why does the chapter emphasize that aliases improve readability without changing stored data?**

**Correct answer:** B

Section 5.10.9 says aliases make query results easier to read and that they change labels in the result, not the stored data itself.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Aliases do not alter table design. |
| B | Yes | This matches the chapter's tip about aliases. |
| C | No | Aliases do not perform data-type conversion. |
| D | No | Duplicate removal is `DISTINCT`, not aliasing. |

### Question 14

**14. Select ALL that apply: Why do joins matter in the Chapter 5 two-table design?**

**Correct answers:** A, B, D

Section 5.11 says joins combine related information from more than one table at query time, and the chapter's specific example combines student performance rows with category metadata through `DeliverableType`.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the chapter's central reason for using joins here. |
| B | Yes | The join condition in the chapter uses `DeliverableType`. |
| C | No | The chapter uses explicit column lists in join examples, not `SELECT *` as a requirement. |
| D | Yes | This reflects the chapter's teaching point about separate tables used together. |
| E | No | Matching values matter; equal row counts do not. |

### Question 15

**15. Why must a query that filters grouped averages use `HAVING` instead of `WHERE`?**

**Correct answer:** C

Section 5.12.3 says `WHERE` filters rows before grouping, while `HAVING` filters the grouped results after the aggregate value exists.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Sorting is not the purpose of `HAVING`. |
| B | No | `WHERE` is not restricted to text columns. |
| C | Yes | The grouped average does not exist until after grouping and aggregation. |
| D | No | `HAVING` does not create aliases. |

### Question 16

**16. Select ALL that apply: Which statements capture the chapter's idea of SQL portability across tools?**

**Correct answers:** A, B, C, E

Sections 5.3, 5.5, and 5.13 say the core logic transfers across systems, while specific syntax such as concatenation, date functions, or feature support can vary by platform.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is a core Chapter 5 theme. |
| B | Yes | The chapter gives platform notes precisely because syntax can vary. |
| C | Yes | SQLite's join support is narrower than the full recognition list in the chapter. |
| D | No | Portability does not mean identical syntax in every product. |
| E | Yes | Platform notes still matter even when the underlying logic transfers. |

### Question 17

**17. Which query pattern correctly returns each deliverable category only once from `GRADEBOOK`?**

**Correct answer:** D

Section 5.10.2 uses `SELECT DISTINCT DeliverableType FROM GRADEBOOK;` as the chapter's example for returning each category once.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Sorting alone does not remove duplicates. |
| B | No | Grouping by score would not return one category each. |
| C | No | `SELECT ALL` is not the chapter's duplicate-removal tool. |
| D | Yes | This matches the chapter's example directly. |

### Question 18

**18. Select ALL that apply: A new row in `GRADEBOOK` uses a `DeliverableType` that does not yet appear in `GRADE_WEIGHT`. What happens if the chapter's `LEFT JOIN` pattern is used?**

**Correct answers:** A, C, D

Section 5.11.3 explains that `LEFT JOIN` keeps all rows from the left table and fills unmatched right-side values with `NULL`; an `INNER JOIN` would keep only matched rows.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Left-side rows are preserved. |
| B | No | Missing right-side matches do not cause failure in the chapter's `LEFT JOIN` example. |
| C | Yes | Right-side metadata fields become `NULL` when there is no match. |
| D | Yes | `INNER JOIN` would drop the unmatched row. |
| E | No | The query does not insert new metadata rows automatically. |

### Question 19

**19. In the chapter's weighted contribution example, what is the weighted contribution for a score of 92 on a quiz worth 5 percent of the course?**

**Correct answer:** A

Section 5.13.1 explains the weighted contribution calculation as `Score * WeightPerItem / 100.0`, and the chapter explicitly notes that a score of 92 on a quiz worth 5 percent contributes about 4.6 percentage points.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `92 * 5 / 100 = 4.6`. |
| B | No | This multiplies without converting the score percentage properly. |
| C | No | This is ten times too large. |
| D | No | This adds rather than weights the contribution. |

### Question 20

**20. Select ALL that apply: Given the sample data, Brian's Quiz 2 score is 77. Which filters would return that row?**

**Correct answers:** A, B, C, D

Sections 5.10.3, 5.10.5, and 5.10.7 show these row-level filters. A row with `Score = 77` and `DeliverableType = 'Quiz'` satisfies all four of the correct conditions.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | 77 is below 80. |
| B | Yes | Brian's row is both a quiz and below 80. |
| C | Yes | 77 falls between 70 and 80. |
| D | Yes | The `OR Score < 80` part makes the condition true. |
| E | No | Brian's score is not greater than 80. |

### Question 21

**21. Which query structure best matches the chapter's student summary pattern that produces one average score per student?**

**Correct answer:** B

Sections 5.12.2 and 5.13.5 group by `StudentID`, `FirstName`, and `LastName` to produce one average row per student.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Without grouping, the query would produce one overall average instead of one per student. |
| B | Yes | This is the chapter's pattern. |
| C | No | Sorting does not create grouped averages. |
| D | No | `DISTINCT` alone does not calculate `AVG(Score)`. |

### Question 22

**22. Select ALL that apply: Which conditions are written correctly for the type of filtering described in Chapter 5?**

**Correct answers:** A, C

Section 5.10.4 uses `IS NULL` and `IS NOT NULL` for missing-value logic, not equality operators against `NULL`.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the correct missing-email pattern from the chapter. |
| B | No | `= NULL` is not the chapter's correct syntax. |
| C | Yes | This correctly filters for rows where a score is present. |
| D | No | `<> NULL` is not the chapter's recommended syntax. |
| E | No | This is not valid chapter logic for filtering deliverable types. |

### Question 23

**23. When writing an `INSERT INTO` statement in the chapter's SQL style, which practice is correct for text and date literals?**

**Correct answer:** B

Section 5.9.1 and the Let's Build data-entry steps say text and date values belong in single quotes, and the chapter examples consistently use the `YYYY-MM-DD` literal pattern.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The chapter explicitly says text and dates should be quoted in insert statements. |
| B | Yes | This matches both the insertion rule and the chapter's date examples. |
| C | No | The chapter does not recommend this quoting or date format. |
| D | No | This is not chapter SQL syntax for literals. |

### Question 24

**24. Select ALL that apply: Which actions are part of the chapter's safe workflow before running `UPDATE` or `DELETE`?**

**Correct answers:** A, B, C, D

Section 5.18.3 gives a three-step checklist: write a `SELECT` with the same `WHERE`, verify the exact rows returned, and then convert it to `UPDATE` or `DELETE`. The warning in 5.18.3 also says missing `WHERE` clauses can affect every row.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is step 1 of the chapter's safe workflow. |
| B | Yes | This is step 2 of the chapter's checklist. |
| C | Yes | This is step 3 of the chapter's checklist. |
| D | Yes | The warning applies directly to unfiltered modifications. |
| E | No | The chapter says `DELETE` is the more universally useful beginner command, not `TRUNCATE` by default. |

### Question 25

**25. The instructor wants a reusable list of high-performing rows that can be queried again later without rewriting the full logic each time. Which Chapter 5 tool is the best direct fit?**

**Correct answer:** C

Section 5.14 defines a view as a saved query that behaves like a virtual table and is useful when query logic should be reused later.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `ORDER BY` only sorts results. |
| B | No | `DISTINCT` removes duplicates but does not save reusable logic. |
| C | Yes | A view is the chapter's reusable-query tool. |
| D | No | `DELETE` removes rows and is unrelated to reuse. |

### Question 26

**26. Select ALL that apply: Consider the pattern `SELECT DeliverableType, AVG(Score) AS AverageScore FROM GRADEBOOK GROUP BY DeliverableType HAVING AVG(Score) < 85 ORDER BY AverageScore DESC`. Which statements are correct?**

**Correct answers:** A, B, C

Sections 5.12.2 through 5.12.3 explain that `GROUP BY` forms groups, `HAVING` filters after aggregation, and `ORDER BY` sorts the remaining result set.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `GROUP BY DeliverableType` forms one group per type. |
| B | Yes | `HAVING` evaluates after the average exists for each group. |
| C | Yes | The descending order sorts the grouped averages from high to low. |
| D | No | The result is one row per deliverable type, not one per student. |
| E | No | `WHERE AVG(Score) < 85` is not the chapter's correct grouped-filter pattern. |

### Question 27

**27. Why does the chapter's approximate age example use `SELECT DISTINCT StudentID, FirstName, LastName, ...` instead of selecting every row from `GRADEBOOK`?**

**Correct answer:** B

Section 5.13.3 uses `DISTINCT` because `GRADEBOOK` contains multiple rows per student, but the age calculation is intended as a student-level output rather than repeated deliverable-level duplicates.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `DISTINCT` does not standardize dates. |
| B | Yes | This matches the structure of the chapter's example. |
| C | No | `strftime()` does not require `DISTINCT`. |
| D | No | SQLite can display names and dates without `DISTINCT`; duplication is the actual issue. |

### Question 28

**28. Select ALL that apply: Which comparisons between `INNER JOIN` and `LEFT JOIN` are correct in the Chapter 5 context?**

**Correct answers:** A, B, D

Section 5.11 defines `INNER JOIN` as match-only logic, `LEFT JOIN` as left-table-preserving logic, and `CROSS JOIN` as the every-combination alternative.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the chapter's `INNER JOIN` definition. |
| B | Yes | This is the chapter's `LEFT JOIN` definition. |
| C | No | The chapter explicitly says SQLite does not directly support `RIGHT JOIN`. |
| D | Yes | `CROSS JOIN` has different every-combination behavior. |
| E | No | Missing matches create different `INNER JOIN` and `LEFT JOIN` outputs. |

### Question 29

**29. Why is the separate `GRADE_WEIGHT` table a useful teaching choice for Chapter 5 even though the chapter says the schema is intentionally simplified?**

**Correct answer:** B

Section 5.6 says the simplified schema is deliberate so students can focus on SQL, while still using a second table to support joins and weighting logic before Chapter 6 introduces richer design.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The chapter explicitly says the structure is not the final word on design. |
| B | Yes | This is the stated teaching rationale. |
| C | No | Aggregation remains a major part of the chapter. |
| D | No | `GRADE_WEIGHT` stores category metadata, not one row per student. |

### Question 30

**30. Select ALL that apply: Which rules about `UNION` and `UNION ALL` match the chapter?**

**Correct answers:** A, B, C, D

Section 5.17 says compatible `SELECT` statements must return the same number of columns with compatible types, `UNION` removes duplicates, `UNION ALL` keeps them, and the first query usually determines the output column names.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is one of the chapter's stated rules. |
| B | Yes | Compatible types are required for corresponding columns. |
| C | Yes | This is the chapter's direct comparison of `UNION` and `UNION ALL`. |
| D | Yes | The chapter says the first query usually determines the output column names. |
| E | No | `UNION` combines results in a query; it does not create a permanent table automatically. |

### Question 31

**31. A report compares `COUNT(*)` with `COUNT(Email)` on `GRADEBOOK`, and the second value is smaller. Which explanation best matches the chapter?**

**Correct answer:** B

Section 5.10.4 explains that `COUNT(*)` counts rows whether individual columns are `NULL` or not, while `COUNT(column)` skips `NULL` values in that column.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `COUNT(column)` is not the same as `COUNT(DISTINCT column)`. |
| B | Yes | This is the chapter's explicit distinction between the two count forms. |
| C | No | Both forms can appear without `GROUP BY`; the issue is `NULL` handling. |
| D | No | `COUNT(*)` does not ignore text columns because it counts rows, not values by type. |

### Question 32

**32. Select ALL that apply: Which tasks require `HAVING` rather than `WHERE` because the filter depends on grouped results?**

**Correct answers:** A, B, C, E

Section 5.12.3 distinguishes row filters from grouped-result filters. Whenever the condition depends on `AVG()`, `COUNT()`, or `MAX()` over groups, `HAVING` is the correct clause.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the chapter's own grouped-average example pattern. |
| B | Yes | Student averages are grouped results. |
| C | Yes | Grouped counts also belong in `HAVING`. |
| D | No | An individual score below 80 is a row-level condition for `WHERE`. |
| E | Yes | A grouped maximum is an aggregate result and belongs in `HAVING`. |

### Question 33

**33. A class needs a reusable object for "high performers" across systems. Which recommendation best matches the chapter's guidance?**

**Correct answer:** B

Sections 5.14.1 through 5.14.2 recommend views for saved reusable query logic in SQL systems and explain that Access saved queries are the closest equivalent in Access.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Deleting and rebuilding results is not the chapter's reusable-query guidance. |
| B | Yes | This recommendation matches the platform note closely. |
| C | No | The chapter stresses reusable query logic inside database tools, not manual export as the main method. |
| D | No | The chapter presents portability as shared logic, not total rewrite. |

### Question 34

**34. Select ALL that apply: Which objections are strongest if someone proposes running `UPDATE GRADEBOOK SET Email = 'new.email@university.edu';` without a `WHERE` clause?**

**Correct answers:** A, B, C, E

Section 5.18.3 warns that an `UPDATE` without `WHERE` can affect every row and gives a preview-with-`SELECT` workflow before modification.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Every row would be updated to the same email value. |
| B | Yes | The chapter's safe workflow says to preview the exact target set first. |
| C | Yes | The chapter treats disciplined workflow as essential, not optional. |
| D | No | The chapter explicitly warns that the effect can be table-wide. |
| E | Yes | The warning applies exactly to this case. |

### Question 35

**35. An instructor wants the clearest query for how much each deliverable contributes to the course total. Which approach is most defensible in the chapter's schema?**

**Correct answer:** B

Section 5.13.1 joins `GRADEBOOK` to `GRADE_WEIGHT` and computes weighted contribution as `Score * WeightPerItem / 100.0`, because `Score` and `WeightPerItem` are related but not the same unit.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `ItemCount` is not the chapter's contribution formula. |
| B | Yes | This reproduces the chapter's weighted-contribution logic. |
| C | No | Subtraction ignores the meaning of the two fields. |
| D | No | Weighting is a calculation, not a sorting task. |

### Question 36

**36. Select ALL that apply: Which judgments about Chapter 5 platform notes and preview tools are supported by the manuscript?**

**Correct answers:** A, B, C, D

Sections 5.11, 5.13, 5.14, and 5.16 emphasize that the same broad SQL logic transfers, but feature support and syntax differences still matter across platforms.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The chapter says Access does not support CTEs directly in the same way. |
| B | Yes | The join section says SQLite does not directly support `RIGHT JOIN` or `FULL OUTER JOIN`. |
| C | Yes | This is the Access-view analogy stated in the chapter. |
| D | Yes | The manuscript repeatedly uses platform notes for exactly this reason. |
| E | No | The chapter explicitly notes differences in date functions and concatenation syntax. |

### Question 37

**37. Which evaluation best matches the chapter's position on the wide `GRADEBOOK` design?**

**Correct answer:** C

Sections 5.6 and 5.8 say the wide structure is a deliberate teaching table for learning SQL clearly before richer relational design and normalization return in Chapter 6.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The chapter says it is not the final word on design. |
| B | No | The chapter argues the opposite: the simplified schema helps students focus on SQL. |
| C | Yes | This is the chapter's teaching rationale. |
| D | No | SQLite supports joins; that is not why the table is wide. |

### Question 38

**38. Select ALL that apply: A manager wants to diagnose missing grading metadata while still keeping every grade row visible. Which judgments about join choice are strongest?**

**Correct answers:** A, B, D

Section 5.11.3 says `LEFT JOIN` preserves all left-side grade rows and shows unmatched right-side metadata as `NULL`, while `INNER JOIN` keeps only fully matched rows.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is exactly what `LEFT JOIN` is for in the chapter's logic. |
| B | Yes | This correctly describes when `INNER JOIN` is preferable. |
| C | No | `CROSS JOIN` produces all combinations and is not the chapter's diagnostic default here. |
| D | Yes | Missing metadata appears as empty right-side values in a `LEFT JOIN` result. |
| E | No | The two tables store different kinds of information, so join choice matters. |

### Question 39

**39. A manager asks for students whose scores are above the overall class average. Which Chapter 5 construct is the most direct fit?**

**Correct answer:** C

Section 5.15.2 gives the exact pattern of comparing each row's score to `(SELECT AVG(Score) FROM GRADEBOOK)` in a subquery.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `DELETE` removes rows and is unrelated to analysis. |
| B | No | The request is about comparing scores to an overall average, not joining metadata. |
| C | Yes | This is the chapter's direct subquery example. |
| D | No | `UNION ALL` combines compatible result sets; it does not compute an overall benchmark. |

### Question 40

**40. Select ALL that apply: Which reasons best support the chapter's claim that SQL turns stored data into usable information for decisions?**

**Correct answers:** A, B, C, D

Sections 5.1, 5.3, 5.12, and 5.13 emphasize that SQL is transparent, reproducible, analytical, and capable of joining and transforming stored facts into interpretable outputs that support decisions.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The chapter highlights SQL's transparency and inspectability. |
| B | Yes | Reproducibility is one of the chapter's named advantages. |
| C | Yes | Aggregation is where SQL shifts from rows to patterns. |
| D | Yes | Joins and calculations connect data to more interpretable results. |
| E | No | The broader book arc still requires managerial judgment after data analysis. |

---

## Question Distribution Summary

### Bloom Level

| Bloom Level | Questions | Count |
| --- | --- | --- |
| Remember | 1, 2, 3, 4, 5, 6, 7, 8 | 8 |
| Understand | 9, 10, 11, 12, 13, 14, 15, 16 | 8 |
| Apply | 17, 18, 19, 20, 21, 22, 23, 24 | 8 |
| Analyze | 25, 26, 27, 28, 29, 30, 31, 32 | 8 |
| Evaluate | 33, 34, 35, 36, 37, 38, 39, 40 | 8 |

### Question Type

| Question Type | Questions | Count |
| --- | --- | --- |
| Single-answer MC | 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39 | 20 |
| Select ALL | 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 | 20 |

### Design Criterion

| Design Criterion | Questions | Count |
| --- | --- | --- |
| Application-based | 17, 19, 21, 22, 24, 26, 28, 30, 31, 32, 35, 36, 39, 40 | 14 |
| Scenario-based | 4, 9, 14, 18, 20, 23, 25, 29, 33, 34, 37, 38 | 12 |
| Definition-only | 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 27 | 14 |
