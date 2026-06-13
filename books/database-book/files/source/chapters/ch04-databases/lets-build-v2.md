## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

## Highlights

* Below is a **ready-to-paste Chapter 4 section** for the first “Let’s Build” activity.
* It frames the Grading Database as a **controlled single-table database**, not yet a relational database.
* It introduces the four core Access objects students need early: **tables, forms, queries, and reports**.
* It creates a bridge to the later **Animal Hospital lab** and the semester-long database project.
* The structure follows your guidance visual: from spreadsheet chaos → database control → table design → validation → forms → queries → reports. 

---

# Let’s Build: Your First Grading Database in Microsoft Access

## From Spreadsheet Chaos to Database Control

Most students first encounter grades in a spreadsheet. A spreadsheet is familiar: rows, columns, formulas, colors, tabs, maybe a few frozen panes if someone is feeling ambitious. For small tasks, spreadsheets are useful. But as soon as the data becomes important, repeated, shared, or updated over time, spreadsheets begin to show their limits.

A grading spreadsheet might look simple at first:

| StudentID | Name         | Email                                       | Assignment | Score |
| --------- | ------------ | ------------------------------------------- | ---------- | ----: |
| S101      | Alice Nguyen | [alice@email.com](mailto:alice@email.com)   | Lab 1      |    95 |
| S101      | Alice Nguyen | [alice@email.com](mailto:alice@email.com)   | Quiz 1     |    88 |
| S102      | Jordan Lee   | [jordan@email.com](mailto:jordan@email.com) | Lab 1      |    76 |

This looks organized, but several problems are hiding inside it.

Alice’s name and email appear more than once. If her email changes, someone must find every row where that email appears and update it manually. If one row is missed, the file now contains conflicting information. If a score is typed as `105`, the spreadsheet may accept it even though the assignment is graded out of 100. If a student’s name is misspelled in one row, the spreadsheet may treat that row as a different person.

That is where databases begin to matter.

A database is not just a “better spreadsheet.” A database is a structured system for storing, protecting, retrieving, and presenting data. Microsoft Access stores data in tables and lets users build database objects such as tables, queries, forms, and reports. Tables hold the data; queries retrieve and filter it; forms support controlled data entry; reports present data in a formatted layout for reading, printing, or sharing. ([Microsoft Support][1])

In this first build, we will create a small Grading Database. It will not yet be a fully relational database. That comes later. For now, the goal is to understand the basic building blocks:

1. A **table** stores records.
2. A **primary key** gives each record a unique identity.
3. **Data types** define what kind of values each field can store.
4. **Validation rules** help prevent invalid data.
5. A **form** gives users a cleaner way to enter records.
6. A **query** asks questions of the data.
7. A **report** turns query results into professional output.

By the end of this section, you will have built your first working database application.

---

## What You Are Building

You will create a Microsoft Access database named:

```text
GradingDatabase_Ch04.accdb
```

Inside it, you will create the following objects:

| Object Type | Object Name          | Purpose                                                 |
| ----------- | -------------------- | ------------------------------------------------------- |
| Table       | `tblGradebook`       | Stores student grade records                            |
| Form        | `frmGradeEntry`      | Provides a cleaner interface for entering grade records |
| Query       | `qryAllGrades`       | Displays all grade records in an organized view         |
| Query       | `qryLowScores`       | Finds scores below a selected threshold                 |
| Query       | `qryStudentAverages` | Calculates each student’s average score                 |
| Report      | `rptGradeSummary`    | Presents grade information in a formatted report        |

For now, all data will live in one table. This is intentional.

Later in the course, we will improve this design by separating the data into multiple related tables, such as `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE`. But before we split data across tables, we need to understand what a table is, how records are entered, and how Access uses forms, queries, and reports.

This first version is not the final design. It is the foundation.

---

## Step 1: Create a New Blank Database

Open Microsoft Access and choose **Blank database**.

Name the file:

```text
GradingDatabase_Ch04.accdb
```

Save it in your course folder.

Access may automatically create a table named `Table1`. If so, close it without saving or rename it later. We will create our table carefully in **Design View** because database design begins with structure, not with random typing.

This is one of the first mindset shifts from spreadsheets to databases:

> In a spreadsheet, you often enter data first and fix the structure later.
> In a database, you define the structure first so the data has a safe place to go.

---

## Step 2: Create the Main Table

Create a new table in **Design View** and name it:

```text
tblGradebook
```

The prefix `tbl` stands for “table.” Access does not require this naming convention, but it helps keep your database organized. Later, when your database contains tables, forms, queries, and reports, object names such as `tblGradebook`, `frmGradeEntry`, and `rptGradeSummary` will make your work much easier to understand.

Microsoft Access tables are made of fields, and each field has a data type. The data type is important because it determines what kind of data the field can store. ([Microsoft Support][2])

Create the following fields.

| Field Name          | Data Type  | Description                                               |
| ------------------- | ---------- | --------------------------------------------------------- |
| `RecordID`          | AutoNumber | Unique identifier for each grade record                   |
| `StudentID`         | Short Text | Student identifier, such as `S101`                        |
| `StudentFirstName`  | Short Text | Student’s first name                                      |
| `StudentLastName`   | Short Text | Student’s last name                                       |
| `StudentEmail`      | Short Text | Student’s email address                                   |
| `CourseCode`        | Short Text | Course code, such as `BITM330`                            |
| `DeliverableType`   | Short Text | Type of work, such as `Quiz`, `Lab`, `Project`, or `Exam` |
| `DeliverableNumber` | Number     | Number of the deliverable, such as `1`, `2`, or `3`       |
| `Score`             | Number     | Student’s score                                           |
| `MaxPoints`         | Number     | Maximum possible points                                   |
| `SubmissionDate`    | Date/Time  | Date the work was submitted                               |
| `Comments`          | Long Text  | Optional instructor comments                              |

### Why These Data Types Matter

Do not choose data types casually. Data types are one of the first ways a database protects data quality.

| Field               | Why This Data Type Makes Sense                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `StudentID`         | This is Short Text because student IDs may contain letters and leading zeros. We do not calculate with them. |
| `StudentEmail`      | This is Short Text because an email address is a label, not a number.                                        |
| `DeliverableNumber` | This is Number because deliverables may be sorted or filtered numerically.                                   |
| `Score`             | This is Number because we may calculate averages, minimums, and maximums.                                    |
| `SubmissionDate`    | This is Date/Time because dates should be sorted and compared as dates, not as text.                         |
| `Comments`          | This is Long Text because comments may require more space than a short label.                                |

A common beginner mistake is to treat every field as text. That makes the table easier to create but harder to use. If scores are stored as text, Access cannot reliably calculate averages. If dates are stored as text, Access may not sort them correctly. Database design begins by telling the system what kind of fact each field represents.

---

## Step 3: Set the Primary Key

Every table should have a field that uniquely identifies each record. This field is called the **primary key**. In Access, a primary key can be assigned in Design View by selecting the field and choosing **Primary Key** from the ribbon. ([Microsoft Support][3])

For this table, set:

```text
RecordID
```

as the primary key.

Use the **AutoNumber** data type for `RecordID`.

This means Access will automatically generate a unique number for every new record.

### Why Not Use StudentID as the Primary Key?

At first, `StudentID` may look like a good primary key. But in this table, each student can appear many times:

| StudentID | DeliverableType | DeliverableNumber | Score |
| --------- | --------------- | ----------------: | ----: |
| S101      | Quiz            |                 1 |    88 |
| S101      | Lab             |                 1 |    95 |
| S101      | Project         |                 1 |    91 |

If `StudentID` were the primary key, Access would allow only one record for each student. That would be a problem because one student can submit many assignments.

So we use `RecordID` as the unique identifier for each grade record.

The key idea is:

> The primary key identifies the row, not necessarily the person.

Later, when we build a relational version, `StudentID` will become the primary key in a separate student table. But in this first single-table version, `RecordID` is the safest choice.

---

## Step 4: Add Basic Validation Rules

A database should not accept impossible data.

If an assignment is graded out of 100 points, a score of `105` should be rejected. If a date is in the future, Access should warn us. If an email address does not contain an `@` symbol, the database should catch the likely mistake.

Access supports validation rules, which restrict what users can enter into a field or form control. When a value violates the rule, Access rejects the input and displays a message. ([Microsoft Support][4])

Add the following validation rules in table Design View.

| Field             | Validation Rule                      | Validation Text                                        |
| ----------------- | ------------------------------------ | ------------------------------------------------------ |
| `Score`           | `Between 0 And 100`                  | `Enter a score from 0 through 100.`                    |
| `MaxPoints`       | `>0`                                 | `Maximum points must be greater than zero.`            |
| `StudentEmail`    | `Like "*@*.*"`                       | `Enter an email address that includes @ and a domain.` |
| `DeliverableType` | `In ("Quiz","Lab","Project","Exam")` | `Enter Quiz, Lab, Project, or Exam.`                   |
| `SubmissionDate`  | `<=Date()`                           | `Submission date cannot be in the future.`             |

These rules are not perfect. For example, the email rule does not fully validate every possible email address. But it does catch obvious mistakes, such as forgetting the `@` symbol.

Validation is not about making the database magically intelligent. It is about reducing predictable errors.

A good database does not assume users are careless. It assumes users are human.

---

## Step 5: Enter Sample Records

Now enter a few records into `tblGradebook`.

Use the following sample data.

| StudentID | StudentFirstName | StudentLastName | StudentEmail                                | CourseCode | DeliverableType | DeliverableNumber | Score | MaxPoints | SubmissionDate | Comments         |
| --------- | ---------------- | --------------- | ------------------------------------------- | ---------- | --------------- | ----------------: | ----: | --------: | -------------- | ---------------- |
| S101      | Alice            | Nguyen          | [alice@email.com](mailto:alice@email.com)   | BITM330    | Quiz            |                 1 |    88 |       100 | 2/3/2026       | Strong start     |
| S101      | Alice            | Nguyen          | [alice@email.com](mailto:alice@email.com)   | BITM330    | Lab             |                 1 |    95 |       100 | 2/5/2026       | Excellent work   |
| S102      | Jordan           | Lee             | [jordan@email.com](mailto:jordan@email.com) | BITM330    | Quiz            |                 1 |    72 |       100 | 2/3/2026       | Review Chapter 3 |
| S102      | Jordan           | Lee             | [jordan@email.com](mailto:jordan@email.com) | BITM330    | Lab             |                 1 |    68 |       100 | 2/5/2026       | Needs revision   |
| S103      | Maya             | Patel           | [maya@email.com](mailto:maya@email.com)     | BITM330    | Quiz            |                 1 |    91 |       100 | 2/3/2026       | Very good        |
| S103      | Maya             | Patel           | [maya@email.com](mailto:maya@email.com)     | BITM330    | Lab             |                 1 |    87 |       100 | 2/5/2026       | Good analysis    |

After entering the records, try entering a test record with a score of:

```text
105
```

Access should reject the value because it violates the validation rule for `Score`.

This is your first example of the database acting as a guardrail.

A spreadsheet may let the error sit quietly in the file. A database can stop the error at the door.

---

## Step 6: Create a Data Entry Form

Entering data directly into a table works, but it is not ideal. Tables are useful for storing data, but they are not always the best interface for people.

In a table, it is easy to click the wrong row, edit the wrong value, or accidentally change a neighboring record. A form gives users a cleaner screen for entering and viewing one record at a time. In Access, forms are one of the standard database objects used to view or enter data. ([Microsoft Support][1])

Create a form based on `tblGradebook`.

Use the **Form Wizard** or **Create > Form**.

Include these fields:

```text
StudentID
StudentFirstName
StudentLastName
StudentEmail
CourseCode
DeliverableType
DeliverableNumber
Score
MaxPoints
SubmissionDate
Comments
```

Save the form as:

```text
frmGradeEntry
```

Open the form and enter one new record.

For example:

| Field             | Value                                       |
| ----------------- | ------------------------------------------- |
| StudentID         | S104                                        |
| StudentFirstName  | Daniel                                      |
| StudentLastName   | Brooks                                      |
| StudentEmail      | [daniel@email.com](mailto:daniel@email.com) |
| CourseCode        | BITM330                                     |
| DeliverableType   | Quiz                                        |
| DeliverableNumber | 1                                           |
| Score             | 84                                          |
| MaxPoints         | 100                                         |
| SubmissionDate    | 2/3/2026                                    |
| Comments          | Good effort                                 |

The form does not replace the table. The form is a controlled doorway into the table.

Think of the table as the storage room and the form as the front desk.

---

## Step 7: Create Your First Query

A table stores data. A query asks a question.

For example:

* Which students scored below 70?
* What is each student’s average?
* Which assignments were submitted on a certain date?
* Which records belong to `Lab 1`?
* Which students may need follow-up?

Queries allow us to retrieve, filter, sort, and calculate information from the database. Microsoft describes queries as one of the standard Access objects used to retrieve data. ([Microsoft Support][1])

### Query 1: All Grades

Create a query based on `tblGradebook`.

Include the following fields:

```text
StudentID
StudentFirstName
StudentLastName
DeliverableType
DeliverableNumber
Score
MaxPoints
SubmissionDate
```

Sort by:

1. `StudentLastName`
2. `StudentFirstName`
3. `DeliverableType`
4. `DeliverableNumber`

Save the query as:

```text
qryAllGrades
```

This query does not change the data. It simply creates a useful view of the records.

That distinction matters:

> A table stores the data.
> A query gives us a reusable question about the data.

---

## Step 8: Create a Query for Low Scores

Now create a query that finds students who may need attention.

Use `tblGradebook` again.

Include these fields:

```text
StudentID
StudentFirstName
StudentLastName
StudentEmail
DeliverableType
DeliverableNumber
Score
Comments
```

In the Criteria row under `Score`, enter:

```text
<70
```

Save the query as:

```text
qryLowScores
```

Run the query.

You should see records where the score is below 70.

This is one of the most important ideas in business databases: the database is not just a place to keep records. It is a tool for action.

A low-score query can help an instructor decide whom to contact. In a business setting, the same logic could identify late shipments, unpaid invoices, high-risk customers, or products with low inventory.

---

## Step 9: Create a Query for Student Averages

Now create a summary query that calculates each student’s average score.

Create a new query using `tblGradebook`.

Add these fields:

```text
StudentID
StudentFirstName
StudentLastName
Score
```

Turn on the **Totals** row.

Set the Total row as follows:

| Field              | Total Row |
| ------------------ | --------- |
| `StudentID`        | Group By  |
| `StudentFirstName` | Group By  |
| `StudentLastName`  | Group By  |
| `Score`            | Avg       |

Save the query as:

```text
qryStudentAverages
```

This query groups records by student and calculates the average score for each student.

The result may look like this:

| StudentID | StudentFirstName | StudentLastName | AvgOfScore |
| --------- | ---------------- | --------------- | ---------: |
| S101      | Alice            | Nguyen          |       91.5 |
| S102      | Jordan           | Lee             |         70 |
| S103      | Maya             | Patel           |         89 |

This is the moment when the database begins to feel different from a spreadsheet. You are no longer manually scanning rows. You are asking the database to produce an answer.

### Optional SQL View

Behind the scenes, Access can represent this query using SQL:

```sql
SELECT 
    StudentID,
    StudentFirstName,
    StudentLastName,
    Avg(Score) AS AverageScore
FROM tblGradebook
GROUP BY 
    StudentID,
    StudentFirstName,
    StudentLastName
ORDER BY 
    StudentLastName,
    StudentFirstName;
```

You do not need to memorize this yet. Later chapters will focus on SQL directly. For now, notice the basic pattern:

```text
SELECT fields
FROM table
GROUP BY student
CALCULATE average score
```

The Design Grid is a visual way to build a query. SQL is the written language behind the query.

---

## Step 10: Create a Report

A query gives you an answer. A report makes the answer presentable.

Reports are useful when the data needs to be printed, exported, shared, or reviewed in a formatted layout. In Access, reports are one of the core database objects used to display or print data. ([Microsoft Support][1])

Create a report using:

```text
qryStudentAverages
```

Use the **Report Wizard**.

Include these fields:

```text
StudentID
StudentFirstName
StudentLastName
AverageScore
```

If Access names the average field `AvgOfScore`, you may keep that name for now or rename the label in the report layout to:

```text
Average Score
```

Save the report as:

```text
rptGradeSummary
```

Give the report a clear title:

```text
Grading Summary Report
```

A report should not look like raw data dumped onto a page. It should help someone understand the information quickly.

At minimum, your report should include:

* A clear title
* Student identifiers
* Student names
* Average scores
* Clean spacing
* Readable labels

This is the difference between data output and professional communication.

A database does not end when the data is stored. It becomes useful when someone can interpret the data and act on it.

---

## Step 11: Test the Whole Mini-System

You now have a small database application.

Test it in this order:

| Test                          | What to Check                                |
| ----------------------------- | -------------------------------------------- |
| Open `tblGradebook`           | Are the records stored correctly?            |
| Open `frmGradeEntry`          | Can you enter a new record through the form? |
| Try entering `105` as a score | Does the validation rule reject it?          |
| Run `qryAllGrades`            | Are all records displayed clearly?           |
| Run `qryLowScores`            | Does the query show only scores below 70?    |
| Run `qryStudentAverages`      | Does Access calculate averages by student?   |
| Open `rptGradeSummary`        | Is the report readable and professional?     |

If all of these work, you have built your first Access database.

It is small, but it already contains the basic architecture of many business information systems:

```text
Table → Form → Query → Report
```

Data is entered through a form, stored in a table, retrieved through queries, and communicated through reports.

That pattern will appear again and again throughout this course.

---

## What This Database Does Well

This first version already improves on a spreadsheet in several ways.

| Feature          | Spreadsheet/File Approach    | Access Database Approach                    |
| ---------------- | ---------------------------- | ------------------------------------------- |
| Data structure   | Flexible but easy to break   | Fields and data types define structure      |
| Unique records   | Often informal               | Primary key identifies each record          |
| Error prevention | Mostly manual checking       | Validation rules reject some invalid values |
| Data entry       | Directly into rows and cells | Forms provide a cleaner interface           |
| Analysis         | Manual filtering or formulas | Queries provide reusable questions          |
| Output           | Raw sheets or copied tables  | Reports create formatted presentation       |

This does not mean spreadsheets are bad. Spreadsheets are excellent tools for many tasks. But databases are better when the goal is to manage structured records over time.

The key distinction is control.

A spreadsheet gives users freedom.
A database gives data structure.

In business settings, structure is not a limitation. Structure is what makes reliable analysis possible.

---

## What This Database Does Not Solve Yet

This database is useful, but it is not perfect.

Look again at the sample records:

| StudentID | StudentFirstName | StudentLastName | StudentEmail                              | DeliverableType | Score |
| --------- | ---------------- | --------------- | ----------------------------------------- | --------------- | ----: |
| S101      | Alice            | Nguyen          | [alice@email.com](mailto:alice@email.com) | Quiz            |    88 |
| S101      | Alice            | Nguyen          | [alice@email.com](mailto:alice@email.com) | Lab             |    95 |

Alice’s name and email are repeated. That creates a problem.

If Alice changes her email address, the database must update multiple rows. If one row is missed, the database contains inconsistent data.

This is called an **update anomaly**.

There are other possible problems too.

| Problem           | Example                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Update anomaly    | Alice’s email appears in several rows and must be changed several times.                                                           |
| Insertion anomaly | We cannot easily store a new student unless the student already has a grade record.                                                |
| Deletion anomaly  | If we delete a student’s only grade record, we may accidentally remove the only place where that student’s information was stored. |

These problems happen because this first database is not yet relational.

That is okay.

This chapter is about building the first working version. Later, we will redesign this database so each type of fact is stored in the right place:

| Future Table    | What It Will Store                                |
| --------------- | ------------------------------------------------- |
| `STUDENT`       | Student identity and contact information          |
| `DELIVERABLE`   | Assignments, quizzes, labs, exams, and due dates  |
| `STUDENT_GRADE` | The score each student earned on each deliverable |

In the future version, Alice’s email will be stored once in the `STUDENT` table. Her scores will be stored separately in the `STUDENT_GRADE` table. The database will connect those facts using relationships.

For now, remember the main lesson:

> A single-table database is a useful first step, but repeated facts are a sign that relational design will eventually be needed.

---

## Bridge to the Animal Hospital Lab

The Grading Database is our first controlled build. The Animal Hospital database will use the same pattern, but with different content.

| Grading Database     | Animal Hospital Database              |
| -------------------- | ------------------------------------- |
| Student              | Animal or pet owner                   |
| Deliverable          | Visit, treatment, vaccine, or service |
| Score                | Charge, result, dosage, or outcome    |
| Grade entry form     | Visit entry form                      |
| Low-score query      | Follow-up care query                  |
| Grade summary report | Patient or visit summary report       |

The topic changes, but the database logic stays the same.

In both cases, you need to ask:

1. What facts do we need to store?
2. What fields describe those facts?
3. What data types should those fields use?
4. What values should be allowed or rejected?
5. What form would make data entry easier?
6. What questions should the database answer?
7. What reports would help someone make decisions?

That is the larger purpose of this first build. You are not just learning Access buttons. You are learning how business systems turn raw records into usable information.

---

## Bridge to the Semester Project

Your semester project will also follow this pattern.

At minimum, your project database will need:

| Component        | Project Question                                     |
| ---------------- | ---------------------------------------------------- |
| Tables           | What data must be stored?                            |
| Primary keys     | How will each record be uniquely identified?         |
| Data types       | What kind of value belongs in each field?            |
| Validation rules | What mistakes should the database prevent?           |
| Forms            | How will users enter or edit data safely?            |
| Queries          | What questions should the database answer?           |
| Reports          | What information should be presented professionally? |

The Grading Database is the training version. The Animal Hospital database is the guided practice version. Your semester project is the independent application.

Same logic. More complexity.

That is how database learning works: first the pattern, then the variation, then the independent build.

---

## Check Your Understanding

Before moving on, answer the following questions.

1. Why is `RecordID` a better primary key than `StudentID` in this first single-table version?
2. Why should `Score` use the Number data type instead of Short Text?
3. What happens when a user tries to enter a score of `105`?
4. What is the difference between a table and a form?
5. What is the difference between a query and a report?
6. Which fields are repeated in `tblGradebook`?
7. Why will repeated student information become a problem later?
8. How might the Grading Database change when we redesign it as a relational database?

---

## Key Takeaways

* A database begins with structure.
* Tables store records.
* Fields describe the facts stored in each record.
* Data types define what kind of data each field accepts.
* A primary key uniquely identifies each record.
* Validation rules help prevent invalid data.
* Forms make data entry cleaner and safer.
* Queries ask reusable questions.
* Reports present information professionally.
* This first Grading Database is intentionally simple and not yet fully relational.
* Repeated data in this version prepares us to understand why relational design matters later.

[1]: https://support.microsoft.com/en-us/access/learn-the-structure-of-an-access-database?utm_source=chatgpt.com "Learn the structure of an Access database"
[2]: https://support.microsoft.com/en-us/access/introduction-to-data-types-and-field-properties?utm_source=chatgpt.com "Introduction to data types and field properties"
[3]: https://support.microsoft.com/en-gb/office/add-or-change-a-table-s-primary-key-in-access-07b4a84b-0063-4d56-8b00-65f2975e4379?utm_source=chatgpt.com "Add or change a table's primary key in Access"
[4]: https://support.microsoft.com/en-us/access/restrict-data-input-by-using-validation-rules?utm_source=chatgpt.com "Restrict data input by using validation rules"
