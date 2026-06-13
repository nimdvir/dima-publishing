<!-- metadata: date="2026-06-11"; chapter="08"; type="source"; title="Midterm Project Review"; description="Project review for midterm" -->

Midterm Project
Review

Understanding What We’ve Learned So
Far

What is the Midterm Project?



 Purpose:

 - Apply everything we've covered

 - Simulate a real-world database task

 - Practice Access skills hands-on

What’s the actual purpose

 IHOP – interactive Hands-On Practice

 Data, information, knowledge, wisdom

Connecting the
Project to the DIKW
Pyramid

DIKW Framework in Action:

Data (Raw Facts)

→ Student grades, attendance
records, deliverables

→ Stored in structured tables

Information (Organized Data)

→ Queries that calculate averages, totals, and counts

→ Relationships between tables help us understand
context

Knowledge (Meaningful
Patterns)

→ Identifying trends: Who

is struggling? Which
deliverables are hardest?
→ Using filters, summaries,

and charts to answer
questions

Wisdom (Actionable Insight)

→ How can instructors better support
students?

→ What interventions might improve
performance?

Why It Matters:

 Your project models how business

intelligence systems turn raw data into
insight – a core skill for improving
performance with information
technologies.

Part I

Database design

Database Foundations



 Tables & Metadata:

 - Each table = one entity

 - Columns = attributes with types

 - Metadata = rules: NOT NULL, PRIMARY KEY

Purpose of Normalized
Design

 Group data logically and reduce redundancy
 Improve data integrity and minimize errors
 Enable scalable, flexible queries

Core Tables in the Grading
Database

 STUDENT – student info
 DELIVERABLE – quizzes, exams, projects
 STUDENT_GRADE – links students to deliverables and

scores

 GRADE_WEIGHT – defines relative importance
 ATTENDANCE – tracks presence
 ASSIGNMENT_METADATA – optional metadata for each

type

Relationships Between Tables

 STUDENT → STUDENT_GRADE, ATTENDANCE
 DELIVERABLE → STUDENT_GRADE
 DELIVERABLE.Type → GRADE_WEIGHT.Type
 ASSIGNMENT_METADATA.Type → DELIVERABLE.Type

Why Separate Tables?

 Normalize to prevent duplicate values
 Separate business logic (GRADE_WEIGHT)
 Link attendance by date and student
 Reuse deliverables across semesters

Relationships Matter



Connecting Tables:

 - Use Primary Keys

 - Link to Foreign Keys

 - Enforce Referential Integrity

 Example:

 Students.StudentID → Grades.StudentID

Relationships Between Tables



 Types of Relationships:One-to-Many (1:M) – Most

commonOne-to-One (1:1) – Rare, for sensitive or
detailed infoMany-to-Many (M:N) – Resolved with join
tables

In Our Project:

 STUDENT TO GRADES

 GRADES TO STUDENT

 WEIGHT TO DELIVERABLES

 DELIVERABLES TO WEIGHT

 CLASS TO ATTENDANCE

 ATTENDANCE TO CLASS

Data Types Refresher



Why They Matter:

 Text - Name, Email

 Number - GPA, Credits

 Date - BirthDate

 Calculated?

Real-World Normalization



Normal Form Recap:

 - Split data into related tables

 - Eliminate redundancy

 - Use: Deliverables, Weights, Classes, Students

Sample Tables in the Project



Included Tables (at least):

 - Students

 - Classes

 - Deliverables

 - Grades

 - Weights

 - Attendance

Part II

Data entry

Forms and Data Entry



Why Use Forms:

 - Prevent errors

 - Create a user-friendly input system

 - Control what users see/edit

 - Enforce business rules

Include All
Required Course
Data!

 Your Project Must Include:

 Deliverables

 Each deliverable (D1–D5) with title and due dateMust

match Brightspace assignments

 Classes

 All class records from the syllabus

 Include week number, topic, and any notes

Grades

All grades for each
student/deliverable

Students

 Include yourself (and a few classmates if desired)

 Add relevant fields: name, email, major, etc.

Weights Table

 One row per deliverable type (e.g., Homework =

20%)Used for calculating final grades

Attendance Records

 Multiple sessions per student



 Store session date, class attended, present/absent



 Reminder:This project simulates real business data.
The more complete and realistic your data, the better
your insights — and your grade!

Queries

Where it gets interesting

Why Queries Matter



 What Queries Do:Transform raw data into

insightAllow you to filter, summarize, and compare
dataHelp verify relationships and data accuracy

 You’ve Learned:

 SELECT, WHERE, GROUP BY, ORDER BYCOUNT(), AVG(),

SUM() for summariesAND, OR, and NOT for logical filters

Goal

 To make your database interactive, dynamic, and
accurate — not just a static collection of tables.

Why Date Filtering Matters

 Dates = Time Context

 Without date conditions, your query might include:



 Future assignments not yet due



 Past deliverables that shouldn’t count



 Duplicate or outdated records







 Use Date Filters To:





 Analyze current or past activity



 Exclude incomplete or unreleased items



 Focus results on a specific time period

The Date() Function in Access



 Date() returns today’s date.

 You can use it in queries to filter dynamically.

 Examples:

WHERE DeliverableDueDate < Date()→ Returns only
deliverables due before today

WHERE SubmissionDate <= Date()→ Shows all work
submitted up to today

WHERE AttendanceDate BETWEEN #1/1/2025# AND
Date()→ Limits attendance data to the current semester

 Tip:The function updates automatically each day, so

your query stays accurate over time.

Example Query Scenarios

 Example 1 – Late Submissions:

SELECT StudentID, DeliverableID

FROM Grades

WHERE SubmissionDate > DeliverableDueDate;

 Example 2 – Completed Work So Far:

SELECT StudentID, AVG(Score) AS AvgScore

FROM Grades

WHERE DeliverableDueDate < Date()

GROUP BY StudentID;

 Example 3 – Attendance Rate Up to Today:

SELECT StudentID, COUNT(*) AS Attended

FROM Attendance

WHERE Present = TRUE AND AttendanceDate <= Date()GROUP
BY StudentID;

Why Query by Date?

 Filter due dates and attendance windows
 Create time-based trends
 Enable reporting and analytics

Weighted Grade Logic

 Each type has a defined weight (e.g., Quiz = 0.3)
 Final grade is weighted average across all scores
 SQL joins connect score to weight

Practice Queries You’ll Use



Useful Query Patterns:

 - SELECT, WHERE, ORDER BY

 - GROUP BY, COUNT, AVG

 - Calculating percentages, rankings

Query Examples (in English)



Logic to Practice:

 - Average grade per student

 - Count students in each class

 - % who submitted all work

 - Compare attendance rates

Sample Calculations



Midterm Metrics:

 - Average score = SUM(Score * Weight) / 100

 - Grade distribution = count by letter grade

 - On-time submission rate = count vs total

Project Goals



What You're Practicing:

 - Database setup

 - Relationship diagramming

 - Query building

 - Form creation

 - Thinking relationally

Attendance Analysis

 Track number of classes per student
 Identify participation patterns
 Correlate attendance with performance

Opportunities for Expansion

 Add Instructors and Courses
 Track semester-based deliverables
 Integrate rubrics and feedback

Conclusion

 Design mirrors real-world grading systems
 Reinforces relational database thinking
 Prepares students for business data design

Think like an analyst: What data
do I actually need right now?

Review Strategy



What to Focus On:

 - Understand table design

 - Trace foreign key relationships

 - Practice queries in Access

 - Clean your data before querying

Final Advice



Set Yourself Up for Success:

 - Start early

 - Test queries often

 - Validate data types

 - Save versions of your file

 - Ask for help if stuck!

Good Luck!

 You’ve Got This.

