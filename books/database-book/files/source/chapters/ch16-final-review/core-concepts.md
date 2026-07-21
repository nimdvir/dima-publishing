<!-- metadata: date="2026-07-20" -->
# Chapter 16: Final Integration and Assessment Readiness

A database course should end with more than a collection of commands. By this point, you have learned how to define data, organize it into tables, connect tables through relationships, retrieve records with SQL, calculate business metrics, automate routine work, and communicate results. The final assessments ask you to bring those skills together.

This chapter is not a solution manual. It will not provide completed assessment queries, finished project designs, exact answer values, or a step-by-step recipe for every task. Instead, it provides something more useful: a structured method for approaching unfamiliar database problems independently.

That distinction matters. In professional work, no one hands a database analyst the exact sequence of joins, calculations, and saved queries needed to reach the answer. Analysts must interpret requirements, inspect the data model, choose an appropriate level of detail, test assumptions, and defend their results. Your final project and final test are designed to measure that kind of judgment.

The goal of this chapter is therefore simple:

> Learn how to solve database problems without being told the solution.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Learning Objectives

After completing this chapter, you should be able to:

1. Explain how database design, SQL, forms, macros, administration, and business intelligence fit together.
2. Translate an assessment requirement into a database question without relying on a copied solution.
3. Determine the correct unit of analysis, or **grain**, for a query.
4. Identify the tables and relationships needed to answer a business question.
5. Plan aggregate, weighted, time-bounded, and scenario-based calculations.
6. Distinguish records, entities, and unique entities when counting data.
7. Diagnose common causes of missing, duplicated, or inflated query results.
8. Evaluate whether a database supports a proposed business decision.
9. Apply normalization, security, transaction, and concurrency concepts to unfamiliar scenarios.
10. Prepare a complete and professionally documented final-project submission.
11. Use AI and other assistance tools in ways that support learning without replacing your own reasoning.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
# Core Concepts

# Part I: Completing the Final Project

## 16.1 The Final Integration Mindset

Throughout the semester, each chapter isolated a specific skill. You learned tables before complex relationships, basic queries before analytical queries, and individual tools before integrated workflows. The final assessments remove many of those boundaries.

A single final-project requirement may involve several competencies at once:

- understanding a business rule;
- locating the relevant data;
- following relationships across multiple tables;
- filtering records to the correct period;
- choosing an aggregate function;
- calculating a metric;
- validating the output;
- documenting the process;
- explaining what the result means.

This is what integration looks like. The challenge is not merely remembering syntax. The challenge is coordinating multiple ideas without losing the meaning of the question.

### The Course Arc

The course can be summarized as a progression:

```text
Data
→ Tables
→ Keys
→ Relationships
→ Queries
→ Calculations
→ Automation
→ Analytics
→ Decisions
```

Each step depends on the earlier steps.

- A calculation is only credible if the underlying records are correct.
- A query is only reliable if the joins reflect the actual relationships.
- A relationship is only trustworthy if the keys are appropriate.
- A dashboard is only meaningful if the metric definitions are consistent.
- A decision is only defensible if the evidence has been validated.

A polished report cannot rescue a weak data model. A correct-looking number is not necessarily a correct number.

### Three Forms of Evidence

Strong database work produces three forms of evidence:

| Form of Evidence | What It Demonstrates | Typical Examples |
|---|---|---|
| **Structural evidence** | The database is designed correctly | ERD, keys, relationships, constraints |
| **Computational evidence** | The database answers questions correctly | Query logic, calculated fields, result tables |
| **Interpretive evidence** | The result is understood and useful | Explanation, report, dashboard, recommendation |

The final project requires all three. The final test evaluates whether you can recognize and apply them under new conditions.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.2 What the Final Project Is Really Assessing

The final project asks you to build and document a grading database in Microsoft Access. The official assignment document remains the authoritative source for required tasks, point values, cutoff dates, and submission rules. This chapter explains the thinking behind those requirements.

The project evaluates nine broad competencies.

### 1. Data Modeling

Can you identify the entities needed to represent a course, its students, meetings, attendance, deliverables, scores, grading policies, and outcomes?

A strong model should answer questions such as:

- What does each table represent?
- What is the primary key of each table?
- Which facts belong in separate tables?
- Which relationships are one-to-many?
- Where is a junction table needed?
- Which relationships are optional, and which are mandatory?

### 2. Relational Implementation

Can you translate a conceptual design into a working Access database?

This includes:

- appropriate field names;
- appropriate data types;
- primary and foreign keys;
- referential integrity;
- validation rules where appropriate;
- relationships that match the business rules.

### 3. Data Quality

Can you enter enough realistic data to test the database meaningfully?

A database with only one student, one assignment, and one attendance record may technically run, but it cannot adequately demonstrate grouping, comparison, missing-data handling, or all-student reporting. Good test data includes enough variation to reveal whether the design behaves correctly.

### 4. Query Reasoning

Can you convert a requirement into a query plan?

This means deciding:

- what one row of the output should represent;
- which tables are required;
- how those tables are related;
- whether records should be filtered;
- whether aggregation is needed;
- how missing information should be treated;
- whether all students must remain visible.

### 5. User Interface Design

Can you create a form that makes data entry clearer and safer?

A form should reduce error, not merely reproduce a table in a different window. Useful forms often replace raw identifiers with meaningful selections, group related information, and guide users toward valid entries.

### 6. Automation

Can you use macros or action queries to reduce repetitive work?

Automation should have:

- a clear purpose;
- a logical sequence;
- safe handling of data;
- an observable output;
- documentation explaining what occurred.

### 7. Database Administration

Can you explain how the database should be protected, maintained, and recovered?

A small Access database still requires administrative thinking. Student grades are sensitive, append operations can create duplicates, and a corrupted file can destroy hours of work.

### 8. Business Intelligence

Can you turn operational records into information that supports action?

A grading database can do more than store scores. It can reveal patterns, risks, missing work, progress, and possible interventions. BI thinking asks what the database allows a decision-maker to notice.

### 9. Professional Communication

Can another person inspect your work and understand what you built?

Documentation is part of the solution. Query names, screenshots, SQL text, explanations, and organized submissions make your reasoning visible.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.3 Begin with a Requirements Matrix

Before building or revising the final project, create a requirements matrix. This prevents the common problem of completing many technical steps but overlooking one required output.

A requirements matrix might use the following structure:

| Requirement | Evidence Needed | Database Object | Validation Question | Status |
|---|---|---|---|---|
| Represent students and course records | ERD and tables | Tables and relationships | Can each fact be stored once? | Not started |
| Enter and review grades | Form screenshot | Grade-entry form | Can a user select valid students and deliverables? | Not started |
| Summarize performance | SQL and result table | Select query | Does each student appear at the intended level? | Not started |
| Calculate attendance | SQL and result table | Aggregate query | Are only eligible class meetings included? | Not started |
| Automate output | Macro screenshots | Macro and report | Does the macro produce a visible result? | Not started |

Do not use the matrix to predetermine the technical solution. Use it to ensure that every requirement has corresponding evidence.

### Why This Helps

A final project contains many moving parts. Without a matrix, students often discover late in the process that they have:

- built a query but forgotten to document it;
- taken a screenshot but omitted the SQL text;
- calculated a result for one student but not all students;
- created a macro without showing its output;
- included future work in a to-date calculation;
- submitted extra files instead of combining evidence into the required format.

A requirements matrix turns the assignment into a controlled production process.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.4 Use the TRACE Method for Query Planning

When faced with a new database question, use the **TRACE** method.

### T — Translate the Question

Rewrite the requirement in plain language.

Ask:

- What is the question requesting?
- Is it asking for details, a count, an average, a total, a percentage, a category, or a comparison?
- Does it refer to all records or only a subset?
- Is the question about current performance, historical performance, or a possible future outcome?

A surprising number of SQL errors begin before SQL is written. They begin with a misread question.

### R — Recognize the Grain

The **grain** is what one row in the result represents.

Possible grains include:

- one row per student;
- one row per student and deliverable;
- one row per student and grading category;
- one row per class meeting;
- one row per department;
- one row per publication;
- one row per professor-publication combination.

Before writing a query, complete this sentence:

> One row of my output should represent ____________________.

If you cannot complete that sentence clearly, you are not ready to write the query.

### A — Assemble the Relationships

Identify the tables that contain the required facts and the paths that connect them.

Ask:

- Which table contains the entity being reported?
- Which table contains the measured value?
- Which table contains labels or categories?
- Is there a junction table between two entities?
- Which keys connect the tables?
- Will the join multiply rows?

Draw the relationship path on paper before opening Query Design View.

### C — Calculate Carefully

Determine what operations are needed.

Possible operations include:

- filtering;
- counting;
- summing;
- averaging;
- dividing;
- grouping;
- replacing missing values under a stated scenario;
- looking up a category from a range;
- allocating a shared value across multiple related records.

Write the calculation in words first. Then write it as a mathematical expression. Only then translate it into Access.

### E — Evaluate the Result

Never stop when the query runs.

Ask:

- Does the row count make sense?
- Are all required entities present?
- Did any join duplicate records?
- Are percentages within a sensible range?
- Did missing values disappear?
- Are future records included accidentally?
- Do subtotals reconcile with source data?
- Can I verify one case manually?

A query that executes without an error has passed a syntax test. It has not yet passed a logic test.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.5 Plan Queries Before Building Them

A query-planning worksheet makes reasoning visible before Access becomes involved.

| Planning Question | Your Answer |
|---|---|
| What business question am I answering? |  |
| What should one output row represent? |  |
| Which fields must appear? |  |
| Which tables contain those fields? |  |
| How are those tables connected? |  |
| Which records should be included or excluded? |  |
| Is aggregation required? |  |
| How should missing data be handled? |  |
| What should I verify manually? |  |

### Detail Queries and Summary Queries

A **detail query** typically preserves individual records. A **summary query** changes the grain by grouping records and calculating an aggregate.

For example:

- A detail query might show each student's individual scores.
- A summary query might show one average per student and category.

The difference is not cosmetic. It changes what one row means.

### Saved Queries as Layers

Complex work is often easier when divided into layers. One query can prepare clean detail records. Another can summarize them. A later query can combine or classify the summaries.

The important principle is:

> Each saved query should have one clear analytical responsibility.

Avoid building a chain merely because a template told you to. Build a chain when each layer solves a meaningful subproblem and can be tested independently.

### Naming Queries

Good names make the analytical purpose clear. A useful name can indicate:

- the entity being analyzed;
- the type of output;
- the period or cutoff rule;
- whether the query is a detail, summary, append, or report source.

A name should help another user understand the database without opening every object.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.6 Time-Bounded Calculations

Several final-project calculations use an official cutoff date. A cutoff date creates a boundary between work that belongs in a current calculation and work that belongs to the future.

### The Central Question

For every time-bounded query, ask:

> Which date field determines eligibility?

Possible date fields may include:

- class meeting date;
- deliverable due date;
- submission date;
- grading date;
- publication date.

The correct field depends on the business rule. Do not choose a date field merely because it is available.

### Consistency Across Queries

If several queries describe the same course-to-date period, they must use the same cutoff logic. Otherwise:

- one query may include more assignments than another;
- weighted totals may not reconcile;
- reports may disagree;
- letter-grade results may be based on a different record set than the numeric grades.

Create a small validation table for yourself:

| Query | Eligibility Date Field | Cutoff Applied? | Future Records Excluded? |
|---|---|---:|---:|
| Detail records | Due date | Yes | Yes |
| Category summary | Due date | Yes | Yes |
| Attendance | Meeting date | Yes | Yes |
| Scenario analysis | Due date | Yes | Yes |

### Future Records Are Not Errors

A complete course database may include final assessments that occur after the cutoff. Those rows can remain in the database. The query determines whether they belong in a particular calculation.

This distinction is essential:

- **Database scope** describes what the database stores.
- **Query scope** describes what a specific question uses.

Do not delete valid future records merely to make a current query easier.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.7 Aggregation, Percentages, and Weighted Metrics

Aggregate queries compress many records into fewer summary rows. This is powerful, but it can also hide mistakes.

### Identify the Numerator and Denominator

Every percentage has two parts:

```text
Percentage = Relevant Amount ÷ Eligible Total
```

Before building the calculation, define both parts in words.

For attendance, for example, the denominator should reflect eligible meetings under the assignment's rules. A canceled meeting, a future meeting, and a meeting for which attendance was not expected may not belong in the denominator.

### Normalize Units Before Combining Values

A common mistake is mixing percentages and point values without checking the scale.

Suppose one value is stored as a percentage from 0 to 100 and another is a weight expressed as course points. The calculation must account for the difference in units.

Use a unit check:

| Quantity | Example Unit |
|---|---|
| Raw score | points earned |
| Score rate | percent or proportion |
| Category weight | course points or percent of course |
| Weighted contribution | course points earned |

If the units do not make sense, the calculation probably does not make sense.

### Avoid Averaging Averages Carelessly

An average of category averages is valid only when the categories should contribute equally. If categories have different weights, quantities, or maximum scores, a simple average can misrepresent performance.

Ask:

- Are all observations equally important?
- Are all categories equally weighted?
- Do categories contain different numbers of deliverables?
- Is the assignment asking for a category average or a course contribution?

### Separate Calculation from Formatting

First determine whether the value is correct. Then format it.

Rounding a number to two decimal places improves presentation. It does not correct a flawed formula.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.8 Missing Data Is a Business Rule, Not a Formatting Problem

A blank grade and a zero grade are not automatically equivalent.

- A blank may mean the work has not been graded.
- A blank may mean the student did not submit.
- A blank may mean the record is missing because of a data-entry problem.
- A zero may mean the instructor intentionally assigned no points.

The correct interpretation depends on the question.

### Three Common Treatments

| Treatment | Meaning | Appropriate Use |
|---|---|---|
| Exclude the missing value | The value is not part of the current calculation | Current average of completed work, if policy allows |
| Replace with zero | Assume the missing item earns nothing | Minimum or penalty scenario |
| Replace with the maximum | Assume the missing item is completed perfectly | Maximum scenario |

Do not apply one rule globally. Apply the rule specified by the analysis.

### Minimum and Maximum Scenarios

Scenario analysis does not predict what will happen. It establishes boundaries under explicit assumptions.

A minimum scenario asks:

> What would the result be under the stated unfavorable assumption?

A maximum scenario asks:

> What would the result be under the stated favorable assumption?

The credibility of the result depends on clearly stating:

- which records are eligible;
- which values are currently missing;
- what replacement assumption is applied;
- whether completed scores remain unchanged;
- whether the result is a current-period grade or a full-course grade.

### Validate One Student Manually

Choose one student and calculate the result outside Access using a small table or calculator. Compare that manual result with the query output. A one-case audit often reveals:

- missing categories;
- duplicated scores;
- incorrect weight scaling;
- future records included accidentally;
- NULL values treated inconsistently.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.9 Joins: Preserving, Matching, and Multiplying Records

A join determines which records survive and how many rows are produced.

### INNER JOIN Thinking

An inner join keeps records that have matches on both sides.

This is appropriate when the question requires only complete relationships. It can be dangerous when entities with missing related data must still appear.

### LEFT JOIN Thinking

A left join preserves every record from the left side, even when a matching record does not exist on the right.

This is often useful when you need to find:

- students with missing grades;
- products without sales;
- professors without publications;
- departments without assigned employees.

The key question is:

> Which table contains the complete list of entities that must remain visible?

That table often belongs on the preserved side of the join.

### Row Multiplication

Suppose one student has five grades. Joining the student record to the grade table produces five rows for that student. This is not a duplicate error. It is the expected result of a one-to-many relationship.

Problems occur when the analyst forgets that the join changed the number of rows.

Before counting, ask:

- Am I counting entities?
- Am I counting relationship records?
- Am I counting transactions?
- Can one entity appear more than once after the join?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.10 Counting Without Double Counting

Counting is one of the most deceptively difficult database tasks.

### Rows Are Not Always Entities

A junction table usually stores one row per relationship. If a publication has four authors, that publication may appear four times in an authorship table.

Therefore:

- counting authorship rows answers a relationship question;
- counting unique publication identifiers answers a publication question;
- counting unique professor identifiers answers a professor question.

These are different measures.

### The Unique-Entity Test

Before using a count, complete the statement:

> I am counting unique ____________________, identified by ____________________.

Examples:

- unique students, identified by StudentID;
- unique deliverables, identified by DeliverableID;
- unique publications, identified by PubID;
- unique professors, identified by ProfID;
- unique professor-publication pairs, identified by the combination of ProfID and PubID.

### Department-Level Double Counting

Suppose two professors from the same department coauthor one publication. If the question asks how many unique publications were authored by the department, that publication should usually be counted once for that department, not once per professor.

This is a classic example of why the grain must be defined before aggregation.

### A Safe Conceptual Strategy

When a direct count may be inflated:

1. create or identify the unique combinations that match the intended grain;
2. inspect those combinations;
3. count the resulting entities;
4. compare the count with a small manual sample.

This is a reasoning pattern, not a specific query recipe.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.11 Action Queries Require a Safety Plan

Select queries display information. Action queries change information.

Examples of action-query behavior include:

- adding rows;
- updating values;
- deleting records;
- creating a new table from query results.

Because these operations change stored data, they require additional safeguards.

### Before Running an Action Query

Use the following checklist:

- [ ] Create a backup copy of the database.
- [ ] Preview the source records with a select query.
- [ ] Confirm the number of rows expected to change.
- [ ] Confirm that key values match existing parent records.
- [ ] Determine whether the action could create duplicates.
- [ ] Decide how the action can be verified afterward.
- [ ] Run the action once, not repeatedly without checking.

### Preventing Duplicate Appends

An append operation may be logically correct the first time and harmful the second time. Before appending, ask:

- Does the destination table already contain an equivalent record?
- Is there a unique index or composite rule that should prevent duplicates?
- Can I compare source keys with destination keys before inserting?
- Will rerunning a macro repeat the append?

### Verify the Result

After the action:

- inspect the destination table;
- compare the before-and-after record counts;
- verify a few sample records;
- confirm that unrelated records were not changed;
- retain the backup until the project is complete.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.12 Forms Should Reduce Cognitive and Data-Entry Errors

A form is not merely a visual requirement. It is an interface between a user and the database.

### A Strong Grade-Entry Form

A useful grade-entry form should help the user identify:

- which student is being graded;
- which deliverable is being graded;
- which value is being entered;
- whether the record is new or existing.

### Use Meaningful Labels

Raw IDs are essential for the database but inconvenient for users. A dropdown can display a person's name while storing the corresponding identifier.

This demonstrates an important HCI principle:

> The interface should speak the user's language while the database preserves structural precision.

### Form Evaluation Questions

Test the form as though you were a new user:

- Can I identify the purpose immediately?
- Can I select only valid students and deliverables?
- Is the score field clearly labeled?
- Does the form prevent obviously invalid values?
- Can I tell whether a record was saved?
- Does the form accidentally allow duplicate grade records?

A form that looks polished but permits bad data is not a strong form.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.13 Macros Should Represent a Coherent Workflow

A macro automates a sequence of actions. The quality of the macro depends on the logic of the workflow, not the number of actions.

### Workflow Questions

Before building a macro, define:

1. What event starts the process?
2. What information must be available?
3. Which query, form, or report should run?
4. In what order should actions occur?
5. What should the user see when the process finishes?
6. What could go wrong?

### Input Before Processing

If a workflow depends on user input, the input must exist before it can be used. A logical sequence usually moves from:

```text
Obtain input
→ store or reference input
→ perform the database action
→ display or open the result
→ communicate completion
```

This is a general workflow principle. The exact actions depend on the specific macro.

### Responsible Automation

A well-designed macro supports a legitimate business rule. It should not:

- alter records randomly;
- delete data without safeguards;
- hide important assumptions;
- repeat an append action unknowingly;
- create an output that cannot be verified.

Automation makes good logic faster. It also makes bad logic faster.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.14 Database Administration in a Small Project

Database administration is not limited to large corporations. Even a student project benefits from administrative discipline.

### Security and Privacy

Grades are sensitive records. Consider:

- who should be allowed to view them;
- who should be allowed to edit them;
- whether the file is stored in a secure location;
- whether screenshots reveal unnecessary personal information;
- whether a shared copy permits unintended changes.

### Backup and Recovery

Create milestone backups before:

- changing table structure;
- modifying relationships;
- running append, update, or delete queries;
- executing macros that alter data;
- preparing the final submission.

Use clear filenames with dates or versions. A backup is useful only if you can identify and restore it.

### Data Integrity

Integrity controls help ensure that:

- foreign keys refer to valid parent records;
- required fields are not omitted;
- duplicate facts are reduced;
- numeric values fall within valid ranges;
- dates are stored consistently.

### Maintenance

An Access project may also require:

- compacting and repairing the database;
- removing obsolete test objects;
- checking broken references;
- confirming that forms and macros still point to valid queries;
- opening the submission copy on another computer if possible.

### Auditability

A reviewer should be able to determine:

- what the database contains;
- how results were calculated;
- which query produced each output;
- whether an action query changed stored data;
- how the final numbers were validated.

Auditability is one reason SQL text and result evidence are required in the project documentation.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.15 Business Intelligence: From Records to Action

Business intelligence does not begin with a chart. It begins with a decision.

### The BI Chain

```text
Operational records
→ validated query
→ metric
→ comparison or threshold
→ interpretation
→ action
```

A grading database can support many decisions, but only when the metric is connected to a practical response.

### Designing an Original BI Function

A strong BI function includes three parts:

| Part | Guiding Question |
|---|---|
| Purpose | What decision or problem does this analysis address? |
| Implementation | What data, metric, query, or visual would be used? |
| Actionable insight | What could a decision-maker do differently? |

### Avoiding Generic BI Claims

Weak statement:

> The database helps instructors make better decisions.

Stronger structure:

> The database compares recent performance with earlier performance to identify students whose scores are declining. The instructor could review those students' missing work and attendance records, then decide whether to send targeted support messages or schedule a review session.

The stronger statement specifies:

- the evidence;
- the analytical comparison;
- the stakeholder;
- the possible action.

### A Database Does Not Support Every Decision

A database about grades may support decisions about academic progress, assignment difficulty, and course interventions. It does not automatically support decisions about unrelated areas such as building maintenance or cafeteria inventory.

To evaluate a BI proposal, ask:

- Does the database contain relevant evidence?
- Is the evidence sufficiently complete?
- Is the proposed decision within the domain of the data?
- Are important variables missing?
- Could the metric create a misleading conclusion?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.16 Documenting the Final Project

A professional submission should allow the reviewer to follow your work without guessing.

### Organize by Requirement

For each requirement, include the requested evidence in a consistent order:

1. the requirement or question;
2. a concise explanation of your approach;
3. the SQL text where required;
4. the result table;
5. the requested screenshot;
6. a brief interpretation or validation note.

### SQL as Text

SQL screenshots are difficult to read, search, copy, and evaluate. When the assignment requests SQL as text, include it as editable text in the PDF source document before export.

### Screenshots as Evidence

A screenshot should prove something specific.

Good screenshot purposes include:

- showing all tables and relationships;
- showing a completed form;
- showing macro actions in order;
- showing a query result;
- showing the output produced by a macro.

Avoid screenshots that are:

- cropped so tightly that the object cannot be identified;
- too small to read;
- filled with unrelated windows;
- duplicated without adding evidence;
- used in place of required text.

### Use Captions

A short caption tells the reviewer what the screenshot proves.

Example structure:

```text
Figure X. The Relationships window showing enforced links among the core grading tables.
```

### Submission Integrity

Before submitting:

- open the final Access file;
- run the required select queries;
- inspect the form;
- test the macros;
- confirm that reports open;
- check that the PDF pages are readable;
- verify that only the requested files are submitted.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part II: Preparing for the Final Test

## 16.17 The Research Publications Database

The final test uses a separate database focused on university research publications. It includes information about professors, departments, journals, publications, journal ratings, and authorship.

The schema is:

```text
DEPARTMENT (DepartmentID, DepartmentName)

PROFESSOR (ProfID, LastName, FirstName, DepartmentID)

JOURNAL_SCORE (Rating, Score)

JOURNAL (JournalID, JournalTitle, Publisher, RatingGroup)

PUBLICATION (PubID, PubTitle, JournalID)

PUBLICATION_AUTHOR (AuthorID, PubID, ProfID)
```

The final test may randomize question order, values, names, thresholds, or answer options. Therefore, memorizing a sequence of answers is a poor preparation strategy. The reliable strategy is to understand the model and apply a consistent analytical method.

### First Step: Inspect Before Querying

Before answering questions:

1. Open each table.
2. Identify the primary key.
3. identify likely foreign keys.
4. Inspect the Relationships window.
5. Check field names and data types.
6. Note whether any entities have no related records.
7. Identify the table that resolves collaborative authorship.
8. Review the journal scoring information.

Do not assume that a field name alone proves the relationship. Confirm it in the database.

### The Scoring Rule

The test instructions define a publication-credit rule in which a journal's score is allocated among the authors of the publication.

Conceptually:

```text
Credit for one author on one publication
=
Publication's journal score
÷
Number of authors on that publication
```

A professor's total score is then based on the credits associated with that professor's publications.

The formula is given. The challenge is designing a correct process that:

- identifies the journal score;
- determines the number of authors for each publication;
- allocates the score at the correct grain;
- aggregates the allocated credits without double counting.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.18 Reasoning About the Publications Schema

The schema contains several kinds of tables, but the table names alone do not prove every relationship or participation rule. Use the database itself to determine the role of each table.

### Entity Tables

Entity tables describe major things in a domain, such as people, organizational units, documents, products, or events. To decide whether a table is an entity table, ask whether one row represents one independently identifiable thing.

### Lookup Tables

A lookup table maps a controlled category to a description, score, status, or other reusable value. Lookup tables reduce repeated business rules and make categories easier to maintain.

### Junction Tables

A junction table resolves a many-to-many relationship by storing identifiers from two related entities. Do not assume that a table is a junction table merely because it contains several foreign keys. Confirm its primary key, relationships, and row meaning.

For the final-test database, inspect the Relationships window and complete these statements yourself:

```text
One row in each table represents ____________________.
The primary key is ____________________.
The table connects to ____________________ through ____________________.
```

This inspection will help you determine which table records collaborative relationships, whether repeated identifiers are expected, and where double counting may occur. The chapter deliberately leaves those conclusions for you to establish from the database.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.19 Recognizing Question Families

A randomized test may present questions in different wording, but most questions belong to a recognizable family.

### Family 1: Entity Counts

Examples of the underlying reasoning:

- count entities by person;
- find the highest or lowest count;
- exclude entities with no related records;
- count unique entities within a department or category.

Questions to ask:

- What exactly is being counted?
- Can the same entity appear more than once after the join?
- Does “not including zero” require excluding entities with no related records?
- Does the question ask for a maximum value or the identity of the entity with that value?

### Family 2: Allocated Scores

These questions require a multistage calculation.

Questions to ask:

- What is the journal score for each publication?
- How many authors share that publication?
- At what grain should credit be calculated?
- At what grain should credit later be summarized?
- Are professors with no publications supposed to appear?

### Family 3: Threshold Classification

These questions classify entities according to a score range or cutoff.

Questions to ask:

- Is the boundary inclusive or exclusive?
- Are there overlapping categories?
- What happens to values exactly on the boundary?
- Does the question request a count, a list, or a department breakdown?

### Family 4: Department Analysis

Questions may aggregate professor-level or publication-level data by department.

Questions to ask:

- Is the metric based on professors, publications, or author-publication relationships?
- Should a coauthored publication count once or more than once for a department?
- Is the result a department total or an average per professor?
- Are departments with no matching records included?

### Family 5: Collaboration and Authorship

Questions may ask whether professors worked together or who authored a title.

Questions to ask:

- Which table contains one row per authorship relationship?
- Do both professors share the same publication identifier?
- Is the question asking for publications, coauthors, or authorship rows?
- Does “coauthors” mean all authors or all authors other than a focal author?

### Family 6: Journal and Publisher Analysis

Questions may group publications by journal rating or publisher.

Questions to ask:

- Which table stores the publication?
- Which table stores the journal category or publisher?
- Which relationship connects them?
- Are rating labels exact, including punctuation or symbols?
- Is the question counting publications or journals?

### Family 7: Conceptual Database Questions

These include:

- cardinality;
- database limitations;
- data marts and warehouses;
- big data;
- business intelligence;
- normalization;
- macros;
- permissions;
- ACID properties;
- concurrency phenomena;
- join interpretation.

These questions require concept recognition rather than data calculation.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.20 Cardinality: Always Read the Direction

Cardinality describes how many records of one entity may or must relate to records of another entity.

The same relationship produces two directional statements.

Consider a generic relationship between CUSTOMER and ORDER:

- From CUSTOMER to ORDER: one customer may have many orders.
- From ORDER to CUSTOMER: each order belongs to one customer.

These statements describe the same relationship from opposite directions.

### Maximum Cardinality

Maximum cardinality usually answers:

- one?
- many?

### Minimum Participation

Minimum participation usually answers:

- optional, meaning zero is allowed?
- mandatory, meaning at least one is required?

### How to Answer a Directional Cardinality Question

1. Start with the table named first.
2. Imagine one record from that table.
3. Ask how many matching records it can have in the second table.
4. Check whether the relationship is optional or mandatory.
5. Confirm using the Relationships window and data model, not intuition alone.

Do not memorize cardinality as a pair of labels detached from direction.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.21 Evaluating Database Limitations

A database limitation is not simply a fact that does not exist in the world. It is a relevant fact the database does not represent well enough to support a desired analysis.

### A Four-Step Evaluation

For each proposed limitation:

1. Identify the business question behind the claim.
2. Check whether the required field or relationship exists.
3. Decide whether the information could be inferred reliably.
4. Determine whether missing information materially limits analysis.

### Test Limitations from the Required Decision

Do not prepare for limitation questions by memorizing a list. Start with the decision the database is expected to support.

For example, a retail database designed to calculate current inventory might be limited for predicting customer loyalty if it stores products and stock movements but no customer identities or repeat-purchase history. A scheduling database might be limited for evaluating employee productivity if it stores shifts but no work outputs.

Use the same reasoning with the final-test database:

1. name a plausible analytical question;
2. list the fields and relationships needed to answer it;
3. compare that list with the actual schema;
4. decide whether the missing information is material;
5. avoid selecting claims contradicted by an existing key, field, or relationship.

A limitation must be demonstrated from the schema, not guessed from the topic.

### Do Not Claim a Limitation When a Key Solves the Problem

Two people may share the same first and last name. A properly designed identifier can still distinguish them. Therefore, duplicated names are not necessarily a limitation when a unique key is present and relationships use that key.

This illustrates a broader principle:

> Human-readable labels describe entities; keys identify them.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.22 Data Mart, Data Warehouse, and Big Data Reasoning

### Data Mart

A data mart is focused on a particular subject, department, or analytical domain.

### Data Warehouse

A data warehouse integrates data across multiple organizational functions to support broad analysis.

### Big Data

Big data is not merely a larger file. It usually involves substantial scale or complexity across dimensions such as:

- volume;
- velocity;
- variety;
- veracity;
- value.

### Evaluation Questions

When classifying a database, ask:

- Is it focused on one subject or many organizational functions?
- Does it integrate multiple operational systems?
- Is it designed mainly for transactions or analysis?
- Does the proposed expansion add meaningful scale, speed, diversity, or complexity?
- Does a technology change alter the data itself, or only the storage platform?

Moving a small database to a more advanced DBMS does not automatically make it big data. Increasing font size certainly does not either. Databases, unlike term papers, do not become more sophisticated through creative formatting.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.23 Business Intelligence Decisions Must Be Supported by the Data

A BI decision is appropriate when the database contains evidence relevant to the decision.

### The Support Test

For each proposed decision, ask:

1. What decision is being made?
2. Which fields or metrics in the database inform that decision?
3. Are those fields complete enough?
4. What important factors are absent?
5. Would the conclusion remain within the database's subject area?

### Build an Evidence Map

Do not decide that an option is appropriate merely because it sounds managerial. Build a small evidence map:

| Proposed Decision | Required Evidence | Evidence Present? | Important Missing Factors |
|---|---|---:|---|
| Decision A | Fields, relationships, and time coverage needed | Yes/No |  |
| Decision B | Fields, relationships, and time coverage needed | Yes/No |  |

For example, an inventory database may support reorder decisions because it contains stock levels and product identifiers. The same database would not support employee-performance decisions unless it also contains relevant employee and work-output data.

Apply this evidence test to the final-test options yourself. Even when a database contains relevant evidence, one metric may not capture every dimension needed for a high-stakes decision.

### Unsupported Decisions

If the database contains no relevant evidence about a proposed topic, the decision is not supported. The presence of many records does not make an unrelated decision valid.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.24 Normalization Questions: Look for Dependency and Anomalies

A normalized design separates facts according to what they describe and what determines them.

### Warning Signs of a Poor Flat Table

A proposed table may be poorly normalized when it combines:

- entity details;
- transaction details;
- category descriptions;
- organizational information;
- repeated lookup values.

### Ask What Determines Each Attribute

For each field, ask:

> What key determines this value?

If an employee's name is determined by EmployeeID, the name should not need to be repeated and maintained independently in every project-assignment row.

If a shipping rate is determined by a shipping category, that relationship belongs in a controlled lookup structure rather than being copied repeatedly into unrelated order records.

### The Three Major Anomalies

| Anomaly | What Can Go Wrong |
|---|---|
| **Update anomaly** | The same fact must be changed in multiple rows, creating inconsistency risk |
| **Insertion anomaly** | A fact cannot be recorded unless an unrelated fact also exists |
| **Deletion anomaly** | Removing one record unintentionally removes the only stored copy of another fact |

### What Is Not Automatically a Normalization Problem

The following are normal database features and are not, by themselves, evidence of poor normalization:

- having a primary key;
- using foreign keys;
- storing different data types in one table;
- choosing one valid identifier name rather than another.

Normalization is about dependencies, redundancy, and anomalies.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.25 Macro Reasoning

Macro questions often test whether you understand workflow order and responsible automation.

### Sequencing Logic

A macro that depends on a user-supplied value must obtain that value before using it. A macro that displays a result must perform the underlying action before announcing completion.

Use dependency reasoning:

- Which action produces information?
- Which later action consumes that information?
- Which action changes data?
- Which action displays the result?
- Which action confirms completion?

### Evaluating Data Macros

A sound data macro should enforce a legitimate rule or respond to a meaningful event.

Strong objectives may include:

- validating a foreign key before insertion;
- recording an audit event;
- notifying an authorized stakeholder;
- preventing invalid values;
- maintaining a derived status under a defined rule.

Poor objectives include random, destructive, or unexplained changes.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.26 Permissions and Least Privilege

Different users need different access.

The principle of **least privilege** states that users should receive only the permissions required for their responsibilities.

### Permission Types

- **Read-only:** view records without changing them.
- **Read-write:** view and modify records.
- **Limited write:** modify only a defined subset or area.
- **Full access:** manage records, structures, and permissions.

### Role-Table Matching

To match a role with permissions, ask:

- What is the person's job responsibility?
- Which table supports that responsibility?
- Does the role need to edit the data or merely review it?
- Should access be restricted to the role's own department or records?
- Would broad access create privacy or integrity risk?

A senior title does not automatically require unrestricted technical access. Permissions should reflect operational need and institutional policy.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.27 Transactions and ACID

A transaction is a logical unit of work that should be processed reliably.

### Atomicity

All required steps of the transaction succeed, or none of them are committed.

Think:

> all or nothing.

### Consistency

A transaction moves the database from one valid state to another while preserving rules and constraints.

Think:

> business and integrity rules remain valid.

### Isolation

Concurrent transactions should not interfere in ways that expose incomplete or conflicting intermediate states.

Think:

> simultaneous work behaves safely.

### Durability

Once a transaction is committed, its changes survive crashes or restarts.

Think:

> committed means persistent.

### Recognition Strategy

When reading a scenario, identify the central failure or guarantee:

- partial multi-step work suggests atomicity;
- constraint preservation suggests consistency;
- simultaneous transactions suggest isolation;
- survival after failure suggests durability.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.28 Concurrency Phenomena

Concurrency problems occur when multiple transactions interact with the same data.

### Dirty Read

A transaction reads data that another transaction has changed but not yet committed.

### Non-Repeatable Read

A transaction reads the same row twice and receives different values because another transaction committed an update between the reads.

### Phantom Read

A transaction repeats a query and receives a different set of rows because another transaction inserted or deleted matching records.

### Lost Update

Two users update the same record, and one user's saved change overwrites the other user's work.

### The Row-versus-Set Distinction

A useful way to distinguish two commonly confused phenomena:

- A **non-repeatable read** changes the value of an existing row.
- A **phantom read** changes which rows appear in the result set.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.29 Interpreting Join Queries Conceptually

Some test questions may show a query and ask what it does.

Do not begin by reading every symbol. Begin with the set logic.

### Interpretation Process

1. Identify each source table.
2. Identify the join type.
3. Determine which side is preserved.
4. Determine what unmatched rows look like.
5. Examine any filter applied after the join.
6. Examine whether multiple result sets are combined.
7. Translate the query into a plain-language description.

### Simulating a Full Outer Join

Some database systems do not support a full outer join directly. A common conceptual workaround combines:

- all records preserved from one side;
- unmatched records preserved from the other side;
- a set-combination operation.

The purpose is to include matched records and unmatched records from both tables.

Understanding the set operation matters more than memorizing a particular statement.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.30 A Practical Test Workflow

When the final test begins, resist the urge to answer immediately. Use a controlled workflow.

### Step 1: Inspect the Database

Confirm:

- tables;
- keys;
- relationships;
- score categories;
- sample records;
- whether some entities lack related records.

### Step 2: Classify the Question

Is it primarily about:

- counting;
- score allocation;
- threshold classification;
- department aggregation;
- collaboration;
- a concept definition;
- query interpretation?

### Step 3: State the Grain

Write a short note:

```text
One row should represent ____________________.
```

### Step 4: Sketch the Relationship Path

Write the table path before building the query.

### Step 5: Build the Smallest Useful Query

Do not begin with every field and calculation. First verify that the relationship path returns the expected records.

### Step 6: Add One Operation at a Time

Add:

- fields;
- criteria;
- grouping;
- calculations;
- sorting;

in controlled stages.

### Step 7: Validate

Inspect:

- row counts;
- duplicates;
- NULLs;
- boundaries;
- one manual example;
- exact category labels.

### Step 8: Enter the Answer in the Requested Format

Pay attention to:

- integer versus decimal;
- rounding;
- single-answer versus select-all-that-apply;
- whether zero is excluded;
- whether a name or numeric value is requested.

A correct query can still produce a wrong submitted answer if the requested format is ignored.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.31 Common Final-Test Mistakes

### Mistake 1: Counting Junction-Table Rows as Unique Entities

Why it happens: one entity appears once per relationship.

Correction: define the intended entity and identifier before counting.

### Mistake 2: Ignoring Direction in Cardinality

Why it happens: students remember “one-to-many” but not which side is which.

Correction: begin with one record from the table named first.

### Mistake 3: Confusing Similar Category Labels

Why it happens: labels may look similar while representing different categories.

Correction: use exact values and verify spelling, punctuation, spacing, and symbols.

### Mistake 4: Applying a Threshold Incorrectly

Why it happens: greater than and greater than or equal to are not the same.

Correction: write the boundary in plain language before applying it.

### Mistake 5: Summing Before Allocating

Why it happens: students aggregate journal scores before accounting for shared authorship.

Correction: calculate at the author-publication grain before summarizing by professor.

### Mistake 6: Treating Every Missing Feature as a Limitation

Why it happens: select-all-that-apply questions encourage over-selection.

Correction: determine whether the database already represents the information through another field or key.

### Mistake 7: Choosing a BI Decision Outside the Data Domain

Why it happens: the option sounds managerial but lacks database evidence.

Correction: identify the specific fields that would support the decision.

### Mistake 8: Matching Concepts by Keywords Alone

Why it happens: scenarios may contain several familiar words.

Correction: identify the central guarantee or failure described.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part III: Independent Problem Solving

## 16.32 Use a Hint Ladder

When you are stuck, do not jump immediately from confusion to a complete answer. Use a hint ladder.

### Level 1: Restate the Requirement

Explain the question in your own words.

### Level 2: Identify the Grain

Determine what one output row represents.

### Level 3: Identify the Tables

List the tables that contain the required fields.

### Level 4: Draw the Relationship Path

Map the keys connecting those tables.

### Level 5: Write the Calculation in Words

Describe the numerator, denominator, grouping, or allocation rule.

### Level 6: Build a Partial Query

Retrieve the relevant detail rows without the final calculation.

### Level 7: Inspect and Debug

Look for missing records, repeated entities, incorrect criteria, and NULLs.

Only after working through these levels should you seek more specific assistance.

### Why the Hint Ladder Works

A full solution may help you finish one task, but it can prevent you from learning how to solve the next one. A small hint preserves productive struggle while reducing unproductive confusion.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.33 Debugging by Symptom

Different output problems suggest different causes.

| Symptom | Likely Causes | Questions to Ask |
|---|---|---|
| Too many rows | One-to-many multiplication, missing join condition | What does one row represent after each join? |
| Too few rows | INNER JOIN removed unmatched records, overly restrictive criteria | Which entities disappeared? |
| Inflated totals | Double counting, duplicated source records | Am I aggregating relationship rows instead of entities? |
| Missing students | Query begins from grades instead of students, restrictive join | Which table should provide the complete student list? |
| Wrong percentage | Incorrect denominator, mixed units | What exactly is eligible? |
| Wrong boundary count | Inclusive/exclusive criterion error | What happens to a value exactly at the threshold? |
| Blank calculated result | NULL propagated through arithmetic | Which input is missing, and what does that mean? |
| Action query repeats records | No duplicate-prevention logic | Has this action already been run? |

### Debug One Layer at a Time

When a final query is wrong, inspect its inputs. If it depends on saved queries, open each one and confirm:

- grain;
- fields;
- row count;
- filtering;
- calculations.

Debugging the final query alone may hide an error introduced earlier.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.34 Responsible Use of AI and Assistance Tools

AI can be useful for learning database concepts, but it can also produce plausible-looking SQL that is structurally wrong or inappropriate for Microsoft Access.

### Appropriate Uses

AI can help you:

- explain a concept in different words;
- identify why a query produces duplicates;
- generate a new practice scenario using different tables;
- critique a query you already wrote;
- ask you diagnostic questions;
- compare two possible approaches;
- explain an Access error message;
- review whether your explanation is clear.

### Inappropriate Uses

Do not use AI to:

- generate completed final-assessment answers;
- reproduce the exact query required by the final test;
- submit explanations you cannot defend;
- fabricate screenshots or results;
- replace your own database inspection;
- assume that generated SQL is correct without testing it.

### A Better Prompting Pattern

Instead of asking:

> Give me the SQL answer.

ask:

> Ask me questions that will help me identify the grain, tables, joins, and calculation. Do not provide the completed query.

This keeps the tool in the role of tutor rather than substitute.

### Verify Platform Syntax

Microsoft Access differs from PostgreSQL, SQLite, MySQL, and SQL Server. When receiving assistance, always confirm:

- date literal syntax;
- text concatenation;
- conditional functions;
- NULL-handling functions;
- join syntax;
- action-query behavior;
- support for distinct aggregates or advanced SQL features.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.35 Final Project Quality-Control Checklist

### Database File

- [ ] The database opens without warnings or missing references.
- [ ] Every required table exists.
- [ ] Primary keys are defined.
- [ ] Foreign keys use compatible data types.
- [ ] Relationships match the ERD.
- [ ] Referential integrity is enforced where appropriate.
- [ ] Required data is present for all students.
- [ ] Forms open and save records correctly.
- [ ] Select queries return the intended rows.
- [ ] Action queries have been verified.
- [ ] Macros run in the correct order.
- [ ] Reports or outputs open successfully.
- [ ] A backup copy exists.

### Query Logic

- [ ] The grain is clear for every query.
- [ ] Date-bounded queries use the correct eligibility field.
- [ ] Future records are excluded where required.
- [ ] All students appear where required.
- [ ] Counts represent the intended entity.
- [ ] Missing values follow the stated business rule.
- [ ] Percentages use the correct denominator.
- [ ] Weighted calculations use consistent units.
- [ ] Minimum and maximum scenarios use explicit assumptions.
- [ ] At least one case has been checked manually.

### PDF Documentation

- [ ] Requirements are organized clearly.
- [ ] SQL is included as text where required.
- [ ] Result tables are readable.
- [ ] Screenshots prove the requested objects or outputs.
- [ ] Figures have labels or captions.
- [ ] Explanations are concise and accurate.
- [ ] The reflection meets the required length.
- [ ] Only the requested submission files are included.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.36 Final Test Readiness Checklist

Before taking the test, confirm that you can explain or perform the following without a copied answer:

### Schema and Relationships

- [ ] Identify primary and foreign keys.
- [ ] Explain the role of a junction table.
- [ ] Read cardinality in both directions.
- [ ] Trace a relationship path across several tables.

### Query Reasoning

- [ ] Define query grain.
- [ ] Distinguish rows from unique entities.
- [ ] Identify double-counting risks.
- [ ] Decide when unmatched entities must remain visible.
- [ ] Apply criteria and thresholds carefully.
- [ ] Round and format answers as requested.

### Analytical Calculations

- [ ] Allocate a shared value at the correct grain.
- [ ] Aggregate allocated values by entity.
- [ ] Compare totals and averages.
- [ ] Count unique entities within a category.
- [ ] Interpret collaboration data.

### Conceptual Knowledge

- [ ] Evaluate database limitations.
- [ ] Distinguish a data mart from a warehouse.
- [ ] Explain what would make a dataset more like big data.
- [ ] Identify supported and unsupported BI decisions.
- [ ] Recognize normalization anomalies.
- [ ] Sequence a macro logically.
- [ ] Apply least privilege.
- [ ] Match ACID properties to scenarios.
- [ ] Distinguish concurrency phenomena.
- [ ] Interpret the effect of join types and set operations.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.37 Review and Reflection Questions

These questions are designed to strengthen your reasoning. They are not replicas of final-test questions.

1. Why should a query plan identify the grain before identifying aggregate functions?
2. How can a correct relationship still produce an incorrect count?
3. What is the difference between counting transactions and counting unique entities?
4. Why might a left join be necessary when identifying missing work?
5. How does a cutoff date change query scope without changing database scope?
6. Why is a blank value not automatically equivalent to zero?
7. What assumptions distinguish minimum and maximum scenario analysis?
8. Why should an action query be previewed as a select query first?
9. What makes a macro a coherent workflow rather than a collection of actions?
10. How can a form improve both usability and data quality?
11. Why is a lookup table preferable to repeatedly storing a category's descriptive value?
12. How can a junction table cause double counting in department-level analysis?
13. What does it mean to allocate a value before aggregating it?
14. Why must cardinality questions be read directionally?
15. How can a unique identifier solve problems created by identical names?
16. What makes an absent attribute a meaningful database limitation?
17. Why does moving a database to a more advanced platform not automatically create big data?
18. How can you determine whether a proposed BI decision is supported by the database?
19. What functional-dependency questions help identify normalization problems?
20. How do update, insertion, and deletion anomalies differ?
21. How does least privilege protect both privacy and data integrity?
22. What is the difference between a dirty read and a non-repeatable read?
23. What is the difference between a non-repeatable read and a phantom read?
24. Why should committed data remain available after a system failure?
25. How can AI support database learning without replacing independent analysis?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.38 Practice Scenarios

### Scenario A: Customer Support

A company stores CUSTOMER, SUPPORT_TICKET, AGENT, and TICKET_ASSIGNMENT data. Management wants to know how many unique tickets each agent handled, including agents who handled none.

Before writing any SQL, identify:

- the grain of the final output;
- the table that should preserve all agents;
- the difference between ticket-assignment rows and unique tickets;
- the join type most likely to preserve agents with no tickets;
- one manual validation you would perform.

### Scenario B: Product Reviews

A product may receive many reviews, and one customer may review many products. A review table connects customers and products. Management wants the average review score by product category.

Identify:

- the entities and relationship table;
- the grain of the detail records;
- the grain of the final summary;
- the path from category to review score;
- one double-counting risk.

### Scenario C: Employee Training

An employee training database records courses, sessions, employees, and attendance. A department manager wants a completion percentage as of a specified date, excluding canceled sessions.

Identify:

- the eligible-record rule;
- the numerator;
- the denominator;
- the date field that should control inclusion;
- how employees with no attendance records should be treated.

### Scenario D: Shared Project Credit

A consulting project receives a performance value that is divided equally among assigned consultants. Management wants each consultant's total allocated value.

Identify:

- the grain at which the value must first be allocated;
- the information needed to determine the divisor;
- the grain of the final result;
- the danger of summing before allocation;
- one way to validate the calculation.

### Scenario E: Inventory Action Query

A store wants to append reorder requests for products below a threshold.

Before running the action query, determine:

- how to preview the records;
- how to prevent duplicate open requests;
- what backup is needed;
- what count should be recorded before and after;
- how the macro should communicate completion.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.39 Key Terms

| Term | Meaning |
|---|---|
| **Action query** | A query that changes stored data by adding, updating, deleting, or creating records. |
| **Aggregate** | A calculation that summarizes multiple records, such as a count, sum, or average. |
| **Allocation** | Dividing or assigning a shared value among related entities according to a rule. |
| **Atomicity** | The requirement that all parts of a transaction succeed or none are committed. |
| **Auditability** | The ability to inspect and verify how data and results were produced. |
| **Business intelligence** | The use of data, metrics, reports, and analysis to support decisions. |
| **Cardinality** | The minimum and maximum number of related records allowed between entities. |
| **Consistency** | The requirement that transactions preserve database rules and valid states. |
| **Cutoff date** | A date boundary that determines which records are eligible for an analysis. |
| **Data mart** | A focused analytical data store for a specific subject or organizational area. |
| **Dirty read** | Reading another transaction's uncommitted changes. |
| **Double counting** | Counting the same entity more than once because of repeated relationship rows or an incorrect grain. |
| **Durability** | The requirement that committed changes survive failures. |
| **Grain** | The exact meaning of one row in a table or query result. |
| **Hint ladder** | A sequence of increasingly specific supports that preserves independent problem solving. |
| **Isolation** | The requirement that concurrent transactions do not interfere improperly. |
| **Junction table** | A table that resolves a many-to-many relationship by storing related foreign keys. |
| **Least privilege** | Granting users only the access needed for their responsibilities. |
| **Lost update** | A concurrency problem in which one saved change overwrites another user's change. |
| **Non-repeatable read** | Reading the same row twice and receiving different committed values. |
| **Normalization** | Structuring data to reduce redundancy and prevent anomalies. |
| **Phantom read** | Repeating a query and receiving a changed set of rows because another transaction inserted or deleted matching records. |
| **Query scope** | The subset of stored data selected to answer a specific question. |
| **Requirements matrix** | A planning table connecting assignment requirements to evidence, database objects, validation, and status. |
| **Scenario analysis** | Calculating outcomes under clearly stated assumptions. |
| **TRACE method** | Translate, Recognize the grain, Assemble relationships, Calculate carefully, and Evaluate the result. |
| **Unique entity** | A distinct real-world object counted once according to its identifier. |
| **Validation** | Testing whether a query or database result is logically correct, not merely executable. |
| **Weighted metric** | A metric in which components contribute according to assigned weights rather than equally. |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## 16.40 Final Reflection: What Database Competence Looks Like

Completing a database course does not mean memorizing every SQL function or building every query without reference materials. Database competence is the ability to reason reliably when the problem changes.

A competent database practitioner can:

- ask what a record represents;
- identify which facts belong together;
- separate entities that should not be repeated;
- connect tables through meaningful keys;
- recognize when a join changes the number of rows;
- distinguish a missing value from a zero;
- define the numerator and denominator of a metric;
- identify the unit of a weighted calculation;
- validate one result manually;
- protect data before changing it;
- explain the result to another person;
- recognize what the database cannot support.

These habits matter beyond Microsoft Access. They apply to PostgreSQL, SQL Server, SQLite, cloud databases, data warehouses, dashboards, analytics platforms, and AI systems. The interface may change. The reasoning does not.

The final project demonstrates that you can build a small information system. The final test demonstrates that you can enter an unfamiliar system, inspect its structure, and answer questions responsibly. Together, they measure whether you can move from data to decisions without losing the logic in between.

That is the larger purpose of this course.

> Good database work is not the ability to copy a correct query. It is the ability to explain why the query is correct.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
## Closing Note

Approach the final assessments as a professional analyst would:

1. Read the requirement carefully.
2. Define the grain.
3. Inspect the schema.
4. Trace the relationships.
5. State the calculation in words.
6. Build incrementally.
7. Validate the result.
8. Document the evidence.
9. Interpret the meaning.
10. Protect the integrity of the data and your own learning.

You have already learned the individual skills. The final step is learning to coordinate them.
