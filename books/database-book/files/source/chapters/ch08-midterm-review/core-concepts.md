<!-- metadata: date="2026-05-18"; chapter="08"; section="main"; title="Chapter 8: Midterm Review"; description="Core concepts for midterm review" -->

# Chapter 8: Midterm Review - Concepts

Putting the First Half of the Course Together

Chapter 8 is the point where the first half of the course comes together. Up to this point, you have studied data, databases, tables, keys, relationships, SQL, and normalization in separate pieces. The midterm asks you to connect those pieces and use them as one working system.

This chapter has two purposes. First, it gives you a clear review of the core ideas from the first half of the course. Second, it explains the two major midterm tasks: the midterm test and the midterm project. By the end of this chapter, you should understand what knowledge is being tested, what work you must submit, and how the review topics connect to the database work ahead.

**After reading this chapter, students will be able to:**

- explain how data, tables, relationships, queries, and normalization fit together
- identify the main concepts from the first half of the course that need review before the midterm
- describe the structure and expectations of the Chapter 8 midterm test
- describe the deliverables and grading criteria for the Chapter 8 midterm project
- prepare for the second half of the course, which begins with database design and ER modeling in Chapter 9

## In This Chapter

1. [Chapter Overview](#chapter-overview)
2. [The First Half as One Connected Framework](#the-first-half-as-one-connected-framework)
3. [What to Review Before the Midterm](#what-to-review-before-the-midterm)
4. [Midterm Test Instructions](#midterm-test-instructions)
5. [Midterm Test Question Set](#midterm-test-question-set)
6. [Midterm Project Instructions](#midterm-project-instructions)
7. [How the Test and Project Work Together](#how-the-test-and-project-work-together)
8. [Chapter Summary](#chapter-summary)
9. [Readiness Checklist](#readiness-checklist)
10. [References](#references)

## Chapter Overview

The first half of BITM330 follows a simple path:

Data -> Tables -> Relationships -> Queries -> Decisions

That path matters because the midterm is not just a memory check. It asks you to work with a database, interpret structure, write or explain SQL, and show that you understand why a relational design supports better reporting and better decisions. If one part of that chain is weak, the later parts become harder.

This chapter reviews the concepts that support the midterm. It then gives you the full instructions for two major Chapter 8 tasks:

- the midterm test, which uses a quiz database in Microsoft Access
- the midterm project, which asks you to build the foundation of a grading database in Microsoft Access

Read this chapter as a working guide. It is meant to help you study, complete the required work, and see how the first half of the course connects to the more advanced SQL and design topics that follow.

## The First Half as One Connected Framework

The strongest way to study for the midterm is to stop treating each chapter as a separate island. In practice, databases work as connected systems. Data is collected for a reason, stored in tables, linked through keys, queried with SQL, and used to support decisions. Chapter 8 asks you to review that full path.

### Data and Information

Data is the raw material. It may be a student ID, quiz score, class date, or attendance mark. By itself, a data value does not tell you much. It becomes more useful when it is organized, labeled, and connected to a business question. That is how raw data becomes information.

In earlier chapters, you learned that good information should be accurate, timely, complete enough for the task, and easy to understand. Those ideas still matter here. If a database stores the wrong student, the wrong quiz, or the wrong score, then every query built on that data becomes less trustworthy.

### Databases and DBMS Concepts

A database stores related data in an organized way. A database management system, or DBMS, helps people create, store, update, retrieve, and secure that data. Microsoft Access is the DBMS used in this chapter's midterm work. It gives you tables, relationships, forms, queries, and reports in one place.

This matters because the midterm is not only about definitions. You will work inside a real Access database. You need to understand how the tool supports the logic of a relational system. Tables store the data. Relationships connect the tables. Queries answer questions. Forms support cleaner data entry. Reports present results in a usable format.

### Tables, Keys, and Relationships

A table stores one subject. For example, a STUDENT table stores students, and a QUESTION table stores quiz questions. Each row represents one record. Each column represents one field. A primary key uniquely identifies a row. A foreign key links one table to another.

These keys are what make relational design work. In a grading database, a student can have many grades, and one assignment type can apply to many students. That kind of many-row activity should not be forced into a single student table. Instead, the design uses separate related tables so the data remains clear and flexible.

When you review the midterm database, pay close attention to which table stores the main event or transaction. In the quiz database, that role is played by STUDENT_ANSWER. It records what each student did on each question. That table makes it possible to count correct answers, track missing submissions, and compare performance across quizzes and sessions.

### SQL and Query Logic

SQL turns stored data into answers. A good query starts with a clear question, then chooses the right tables, joins, filters, grouping rules, and calculations. In the first half of the course, you practiced SELECT, FROM, WHERE, ORDER BY, GROUP BY, and aggregate functions such as Count and Avg. Those skills are central to the midterm.

You should also be ready to explain what a query is doing. If a query groups by Session and counts rows, you should be able to say that it is counting how many records appear in each session. If a query filters NULL values, you should be able to explain that it is isolating missing data.

### Normalization and Data Quality

Normalization reduces repeated facts and helps prevent update problems. It separates data into related tables so each fact is stored in the right place. In a quiz database, questions and answer choices belong in different tables because one question can have many answers. In a grading database, attendance, deliverables, students, and grades should not all be crowded into one wide table.

Normalization is not just a design rule to memorize. It affects data quality. If a design repeats the same fact in many places, errors become easier to introduce and harder to fix. A cleaner design makes future queries more reliable, which is one reason normalization is part of midterm review.

### Why This Review Matters

The first half of the course is cumulative. A weak understanding of tables makes joins harder. A weak understanding of keys makes relationships harder. A weak understanding of relationships makes SQL harder. A weak understanding of normalization makes both design and reporting harder. The midterm asks you to show that these topics now work together in one mental model.

## What to Review Before the Midterm

Before you begin the test or the project, make sure you can do the following without guessing:

- explain the difference between data and information
- identify the purpose of a DBMS and the role of Microsoft Access in this course
- tell the difference between a table, a row, a field, a primary key, and a foreign key
- read a simple schema and explain how tables are related
- write or interpret basic Access SQL using SELECT, WHERE, GROUP BY, ORDER BY, Count, Avg, and simple calculations
- explain what NULL means and why missing values matter in queries
- explain why normalization helps reduce redundancy and improve reliability

Use earlier chapter notes and examples as your first review source. Then use the Chapter 8 materials to practice applying those ideas in a working database. The goal is not to memorize isolated terms. The goal is to recognize how the structure of a database affects the answers your queries produce.

If you are unsure where to focus, start with three questions:

1. Can I explain why the tables are separated the way they are?
2. Can I explain what a query is counting or averaging?
3. Can I explain how missing or incorrect data would change the result?

If you can answer those three questions clearly, you are usually studying at the right level.

## Midterm Test Instructions

The midterm test checks whether you can work with a small relational database and explain what your queries and design choices mean. The test uses a Microsoft Access quiz database stored in the Chapter 8 midterm-data folder.

### Files for the Midterm Test

Use these source files for the test portion of Chapter 8:

- [Midterm2026.accdb](../midterm-data/Midterm2026.accdb)
- [Midterm2026-answered.accdb](../midterm-data/Midterm2026-answered.accdb)
- [ch08-quiz-schema-2026-05-07.md](../midterm-data/ch08-quiz-schema-2026-05-07.md)
- [STUDENT.csv](../midterm-data/STUDENT.csv)
- [QUIZ.csv](../midterm-data/QUIZ.csv)
- [QUESTION.csv](../midterm-data/QUESTION.csv)
- [ANSWER.csv](../midterm-data/ANSWER.csv)
- [STUDENT_ANSWER.csv](../midterm-data/STUDENT_ANSWER.csv)

### What the Test Is Assessing

The test focuses on the first-half skills that support real database work:

- reading a schema and identifying how tables connect
- writing Microsoft Access SQL for counts, averages, filters, and grouped results
- interpreting missing values, especially NULL answers
- explaining what a query is doing in plain language
- connecting relational design choices to reporting quality

### Expectations for Student Work

Unless your instructor gives different directions, prepare to do the following on the test:

1. read the schema before writing queries
2. identify the correct table or tables for each question
3. write Access SQL when the question asks for SQL
4. explain the result in a short plain-language sentence
5. use datasheet view when that is the best tool for checking results
6. keep table names and field names exactly as they appear in the database

Some questions ask for SQL. Some ask you to explain what a query does. Some ask you to reason about design, normalization, or the meaning of the data. Read each prompt carefully so you answer at the right level.

### Quiz Database Overview

The quiz database uses five main tables:

```text
STUDENT(
    StudentID,
    FirstName,
    LastName,
    Email,
    Session
)

QUIZ(
    QuizID,
    QuizNumber,
    QuizTopic
)

QUESTION(
    QuestionID,
    QuizID,
    QuestionNumber,
    QuestionText
)

ANSWER(
    AnswerID,
    QuestionID,
    AnswerNumber,
    AnswerText,
    IsCorrect
)

STUDENT_ANSWER(
    StudentAnswerID,
    StudentID,
    QuestionID,
    AnswerID
)
```

Use this schema to reason about joins and query design. For example, if you want student-level performance by quiz, you need QUESTION to identify the quiz, STUDENT_ANSWER to identify what the student submitted, and ANSWER to identify which answer is correct.

The data set is large enough to support meaningful totals and averages:

- 450 students
- 36 questions
- 144 answer choices
- 16,200 student response rows

These totals help you sanity-check your queries. If a result is far outside that scale, stop and inspect your joins and filters.

## Midterm Test Question Set

Use the questions below as the Chapter 8 midterm test set. Questions 1-25 focus on data work and SQL reasoning. Questions 26-30 focus on concepts, relational design, and normalization.

### Data and Query Questions

- **1.** What is the most popular first name?
- **2.** What is the most popular last name?
- **3.** What are the most popular first and last names in each session?
- **4.** How many students are in each session, and what is the average number of students per session?
- **5.** How many question rows were left unanswered, and what SQL would update all NULL AnswerID values to 0?
- **6.** What is this SQL code doing?

```sql
UPDATE STUDENT_ANSWER
SET AnswerID = 0
WHERE AnswerID Is Null;
```

- **7.** If you do not want to update the table, how can you show unanswered rows with a 0 marker in a query result?
- **8.** How many students failed to submit an entire quiz, for each quiz?
- **9.** How many students got perfect scores across all three quizzes?
- **10.** What is the average grade per session?
- **11.** What is the average grade per quiz?
- **12.** How many students in each session, and overall, earned a grade above 90?
- **13.** How many students in each session, and overall, earned a grade below 60?
- **14.** For each quiz, which question had the most no-submits?
- **15.** For each quiz, which question had the lowest number of correct answers, and which had the highest?
- **16.** What is the grade in each quiz for students 50, 100, and 200?
- **17.** What is the average grade across all quizzes for students 20, 200, and 300?
- **18.** How many students in each quiz got all the answers wrong, but still submitted every answer?
- **19.** How many students in each quiz got every answer right?
- **20.** Easy: How many students are in this database?
- **21.** Easy: How many questions are in the database?
- **22.** Medium: How many answer choices are stored in the ANSWER table?
- **23.** Medium: How many student response rows are stored in STUDENT_ANSWER?
- **24.** Hard: Which session has the highest number of unanswered rows?
- **25.** Hard: Which quiz has the highest number of unanswered rows?

### Concept Review Questions

- **26.** Which table acts like the student grade table in this database?
- **27.** Why do we need the STUDENT_ANSWER table instead of storing grades directly in STUDENT?
- **28.** Which change would be the best example of further normalization for this database?
- **29.** Which extra pieces of knowledge would be useful for generating wisdom from this database? Select all that apply.
- **30.** Why are QUESTION and ANSWER stored in separate tables instead of one combined table?

### How to Use the Question Set

Treat these questions as a practice and performance set, not as a list to skim. For each question, do three things:

1. identify the table or tables involved
2. decide whether the question needs a filter, a join, a grouping rule, or a calculation
3. explain the result in plain language after you get the output

If you get stuck, work from the schema first. Most query mistakes happen because the student starts writing SQL before deciding which table stores the needed fact.

### Worked Example Pattern

Suppose the question asks, "How many students are in this database?" The correct logic is simple: start with STUDENT, count all rows, and label the result clearly.

```sql
SELECT Count(*) AS TotalStudents
FROM STUDENT;
```

That example shows the pattern you should use on the full test: match the question to the table, choose the right operation, and label the result so it is easy to read.

## Midterm Project Instructions

The Chapter 8 midterm project asks you to build the foundation of a grading database. This project checks whether you can move from a business need to a working relational design in Microsoft Access.

### Objective

Build the foundation of a grading database. The objective of this database is to store the grades and attendance for students in this course, allow calculations of final grades, grades up to date, averages, and more, and use forms to properly input the data and reports to present queries in a clear way.

### Submission Requirements

You must submit both of the following:

- an Access file (.accdb) with tables, data, form, and queries
- a PDF that includes:
  - the assignment questions
  - SQL code, written as text, for queries
  - screenshot or screenshots of execution and output

### Project Checklist and Point Values

| Section | Points | What You Must Do |
| --- | ---: | --- |
| 1. Database Structure | 15 | Design the schema, build at least 6 related tables, define keys and data types, and show the relationship page |
| 2. Data Entry | 20 | Enter data for yourself and at least one other student, covering all deliverable types |
| 3. Form Creation | 10 | Create a form for grade input that includes student, deliverable, and grade details |
| 4. Show Student Data | 15 | Build a query that shows one student's details and grades up to the due date |
| 5. Calculate Averages | 20 | Build queries that calculate averages by deliverable type |
| 6. Calculate Attendance Percentage | 20 | Build queries that calculate attendance through spring break |
| 7. Final Percentage Grade | Bonus 10 | Calculate the up-to-date final percentage grade out of 100 |

### 1. Database Structure (15 points)

Create the database schema for your grading database.

You must:

- design a relational schema for the grading database
- show primary keys as underlined and foreign keys as italicized in the PDF text version of the schema
- create all tables and relationships needed in Microsoft Access
- include at least 6 tables
- define proper primary keys, foreign keys, and data types
- create proper relationships between the tables
- include a screenshot of the relationship page

Your structure should separate major subjects into their own tables. At a minimum, think carefully about students, deliverables, grades, attendance, and any lookup or category tables that help support the design.

### 2. Data Entry (20 points)

Enter enough data to show that the database works.

You must:

- enter data for yourself and at least one other student
- include all deliverable types, such as quizzes, exercises, SAMs, participation, and any other required course work
- run a query for each table that selects all content
- submit the SQL code and a screenshot of the result for each table

The goal of this section is not just to populate the database. It is to show that every table is usable and that the relationships support real data.

### 3. Form Creation (10 points)

Create a form for inputting grades.

The form must include:

- student details
- deliverable details
- grade information

Submit a screenshot of the completed form.

This requirement matters because forms make data entry cleaner and reduce the chance of input mistakes.

### 4. Show Student Data (15 points)

Create a query that displays all student details for yourself, or for student number 1, and your grades up to the submission due date.

Use the submission date of 3/16 for this requirement.

The result must include:

- type of exercise
- number
- due date
- grade

Submit the SQL code and a screenshot of the result.

### 5. Calculate Averages (20 points)

Build queries to calculate the current average per deliverable type.

Examples include average assignment grade, average exam grade, and other up-to-date category averages.

Display the following in your result:

- student details
- deliverable types
- count of items in each type
- average score for each type of deliverable

Submit the SQL code and screenshots of the results.

### 6. Calculate Attendance Percentage (20 points)

Create queries to calculate your current attendance as a percentage of all classes up to spring break.

Display the following in your result:

- student details
- number of classes attended
- number of classes not attended
- percentage of attendance

Submit the SQL code and screenshots of the results.

### 7. Calculate Your Final Percentage Grade Up to Date Out of 100 (Bonus 10 points)

Build a query that calculates your final percentage grade up to date out of 100.

This is a bonus requirement. If you complete it well, it adds 10 points beyond the 100-point base project.

### Important Reminder for Submission

You must submit:

- the Access file (.accdb) with tables, data, form, and queries
- the PDF with assignment questions, SQL code as text, and screenshots of execution and output

Before you submit, make sure your PDF is readable and that every screenshot clearly shows the result that matches the SQL you wrote.

## How the Test and Project Work Together

The test and the project measure different parts of the same skill set. The midterm test checks whether you can read a schema, interpret database structure, and write or explain queries against an existing database. The midterm project checks whether you can design a database, populate it, create a form, and produce useful query outputs of your own.

Together, these tasks reflect the first half of the course. You are not only learning what a database is. You are learning how relational structure supports calculation, reporting, and decision making. That same logic leads into Chapter 9 on database design and ER modeling, then into Chapter 10 where you will build more advanced SQL queries on top of the same foundation.

## Chapter Summary

Chapter 8 brings the first half of the course together. You reviewed how data becomes information, how databases organize that information, how tables and keys create structure, how SQL answers questions, and how normalization supports reliable design. You also received the full instructions for the Chapter 8 midterm test and the Chapter 8 midterm project.

If you can explain the structure of the database, identify the right tables for a query, write or interpret basic Access SQL, and design a clean grading database, you are preparing at the right level. The next chapter builds on that foundation by moving into more advanced SQL patterns.

## Readiness Checklist

Before you begin the Chapter 8 midterm work, confirm that you can say yes to each item below.

- I can explain how the first half of the course fits together as one framework.
- I can identify primary keys and foreign keys in a simple schema.
- I can tell which table stores the main transaction data in a relational design.
- I can write or explain simple Access SQL using SELECT, WHERE, GROUP BY, ORDER BY, Count, and Avg.
- I can explain what NULL means and how it affects query results.
- I can describe why normalization matters in a grading or quiz database.
- I know what files, screenshots, SQL, and deliverables I must submit for the project.

## References

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.
