<!-- markdownlint-disable MD013 MD024 MD028 MD033 MD034 MD036 MD041 MD060 -->

## Let's Build: Querying a Normalized Database

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

In the main chapter, you practiced SQL on a simplified two-table database. Here, you will level up by writing queries against the fully normalized, seven-table **Grading Database (GD)**. This `Let's Build` is the **teaching twin** of your graded lab: the concepts you practice here on the GD are the same ones you will use on the PetVax clinic in **Lab 05 — Querying the PetVax Database with SQL**.

There is no submission for this `Let's Build`. Save your `.sql` file for yourself; the graded work happens in Lab 05.

### Purpose

To move from simple, single-table queries to more realistic, multi-table queries that require `JOINs`. By the end, you will be able to read and write queries that combine multiple tables to answer complex business questions.

### What You Will Practice

-   Loading a normalized database from a setup script.
-   Writing `SELECT` queries that `JOIN` multiple tables.
-   Using table aliases to clarify which table a column belongs to.
-   Performing aggregate calculations (`COUNT`, `AVG`) across joined tables.
-   Answering complex questions that require data from several tables.
-   **Challenge:** Getting a preview of **subqueries** and **views**.

### Before You Begin

Use **SQLite**. Either tool works:

| Tool                                                     | Best for                                    |
| -------------------------------------------------------- | ------------------------------------------- |
| [SQLiteOnline](https://sqliteonline.com/)                | Quick start in a browser, no install        |
| [DB Browser for SQLite](https://sqlitebrowser.org/)      | Saving a local `.db` file                   |

Open a new SQL script and start it with a comment header:

```sql
-- LB05 (Advanced): Querying the Normalized Grading Database
-- Your Name
-- Chapter 5 Let's Build
```

### 1. Load the Normalized Grading Database

Open `assets/ch05-lb-setup-advanced-2026-06-16.sql`, copy its full contents below your header, and run it. The script drops any old tables, creates all seven tables for the normalized schema, and inserts the starter data.

Confirm the load by checking the row counts for the main tables:

```sql
SELECT COUNT(*) FROM STUDENT;
SELECT COUNT(*) FROM DELIVERABLE;
SELECT COUNT(*) FROM STUDENT_GRADE;
```

Expected: **5** students, **6** deliverables, and **10** grades. If the counts are off, fix the load before continuing.

### 2. List All Students and Their Grades (Your First JOIN)

Our first question requires combining three tables: `STUDENT` (for names), `STUDENT_GRADE` (for scores), and `DELIVERABLE` (for the deliverable topic).

This is the power of a normalized database. Write a query using `INNER JOIN` to link them together.

```sql
SELECT
    s.FirstName,
    s.LastName,
    d.Topic,
    sg.Score
FROM
    STUDENT AS s
INNER JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
INNER JOIN
    DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
ORDER BY
    s.LastName, d.Topic;
```

**Expected Result:** A list of 10 rows showing each student, the topic of their submitted work, and their score. Notice how table aliases (`s`, `sg`, `d`) make the query much cleaner to read.

### 3. Calculate the Average Score for Each Student

Now, let's use `GROUP BY` with our `JOIN`. This query will show the average score for each student across all their submitted deliverables.

```sql
SELECT
    s.FirstName,
    s.LastName,
    ROUND(AVG(sg.Score), 2) AS AverageScore
FROM
    STUDENT AS s
INNER JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
GROUP BY
    s.StudentID
ORDER BY
    AverageScore DESC;
```

**Expected Result:** A list of students and their calculated average score. `AVG` automatically ignores the `NULL` score for Emma Scott's lab.

### 4. Find Which Students Scored Below 80 on Any Assignment

This query requires a `JOIN` and a `WHERE` clause to filter the results.

```sql
SELECT
    s.FirstName,
    s.LastName,
    d.Topic,
    sg.Score
FROM
    STUDENT AS s
JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
JOIN
    DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
WHERE
    sg.Score < 80;
```

**Expected Result:** One row, showing that Brian Lee scored 77 on the 'SQL Basics' quiz.

### 5. Count the Number of Submissions for Each Deliverable

This query uses `GROUP BY` on the `DELIVERABLE` table and `COUNT` to see how many students have a grade record for each item.

```sql
SELECT
    d.Topic,
    d.Type,
    COUNT(sg.GradeID) AS NumberOfSubmissions
FROM
    DELIVERABLE AS d
LEFT JOIN
    STUDENT_GRADE AS sg ON d.DeliverableID = sg.DeliverableID
GROUP BY
    d.DeliverableID
ORDER BY
    NumberOfSubmissions DESC;
```

**Expected Result:** A list of all deliverables, showing how many students have a submitted grade for each. We use a `LEFT JOIN` here to ensure that even deliverables with zero submissions would appear in our list (though in this dataset, all have at least one submission record, even if the score is `NULL`).

### 6. Challenge: Use a Subquery to Find Scores Above the Overall Average

A **subquery** (or inner query) is a `SELECT` statement nested inside another statement. Let's find all the individual scores that were higher than the overall average score.

First, find the average score of all assignments: `SELECT AVG(Score) FROM STUDENT_GRADE;` (it's 89.22). Now, use that as a subquery.

```sql
SELECT
    s.FirstName,
    s.LastName,
    d.Topic,
    sg.Score
FROM
    STUDENT AS s
JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
JOIN
    DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
WHERE
    sg.Score > (SELECT AVG(Score) FROM STUDENT_GRADE);
```

**Expected Result:** A list of the 6 scores that are higher than the overall average.

### 7. Challenge: Create a VIEW

A **View** is a stored query that you can interact with like a table. It’s useful for simplifying complex queries that you run often. Let's create a view that shows the full student grade report.

```sql
CREATE VIEW V_StudentGradeReport AS
SELECT
    s.FirstName,
    s.LastName,
    d.Topic,
    d.Type AS DeliverableType,
    sg.Score
FROM
    STUDENT AS s
JOIN
    STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
JOIN
    DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID;
```

Now that the view is created, you can query it just like a table!

```sql
SELECT * FROM V_StudentGradeReport WHERE FirstName = 'Alice';
```

**Expected Result:** Two rows, showing Alice's grades for the 'Database Basics' and 'SQL Basics' quizzes.

### What This Shows

You've moved from querying a single, flat table to a properly structured, multi-table database. You saw that while the data is stored in separate tables, `JOINs` allow you to bring it all together to answer much more complex and realistic questions. You also got a preview of how subqueries and views can further extend the power of SQL.

This is the foundation for the more advanced SQL you will learn in Chapter 9.

### Save Your Work

Save your script as `ch05_lb_advanced_<lastname>.sql`. Keep it as a reference for how to query a normalized database. This experience will be invaluable as we move into Chapter 6, where we dive deep into the theory and practice of relational database design and joins.
