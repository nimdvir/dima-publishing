<!-- metadata: date="2026-05-19"; chapter="16"; section="lets-build"; title="Chapter 16 Lets Build"; description="Hands-on practice for final review" -->

<!-- Sources: BITM330-Book-draft/chapter-drafts/ch16-final-review/main/ch16-main-draft-2026-05-18.md; .docs/lets-build/lets-build-outline-2026-05-06.md -->

# Let's Build: Final Project Submission and Course Integration

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

## Overview

This chapter turns the final project into a guided submission workflow. You are not learning a brand-new database tool here. You are packaging the full Grading Database project into a professional final submission that shows what you can design, build, query, explain, and evaluate.

The goal is to make the final project clear, complete, and easy to grade.

## What You Need To Submit

You must submit two files:

- a completed Microsoft Access database file (`.accdb`) containing your grading database, tables, relationships, queries, macros, and any supporting forms or reports
- a single PDF that documents the project clearly, including SQL code, results, screenshots, explanations, and the ERD

Every required query should return results for all students where appropriate, not only one student used for testing.

## Query Naming Standard

Use clear query names such as:

```text
Task3_Attendance_To_Date
Task4_Append_Attendance_Score
Task5_Deliverable_Summary_To_Date
Task6_Final_Grade_Up_To_Date
Task7_Letter_Grade
Task8_Minimum_Final_Grade
Task9_Maximum_Final_Grade
```

Clear names make the database easier to grade, easier to debug, and easier to maintain.

## PDF Formatting Requirement

For each task in the PDF, use one clear structure:

```markdown
**Task X: Task Title**

Answer or explanation.

**SQL Code:**

```sql
SELECT ...
```

**Final Result:**

Paste the output table here.

**Screenshot:**

Paste the ERD, macro, report, or other required visual here.
```

Include SQL as text, not only as an image.

## Part A: Prepare the Database for Final Submission

Before you build final outputs, confirm that the database itself is ready.

- Include your own grading data plus at least one additional fictional student.
- Make sure tables are named clearly.
- Confirm that relationships are defined and enforced where appropriate.
- Make sure deliverables, attendance, grading weights, and student-grade data are populated consistently.
- Remove obvious test artifacts and unclear object names.

## Part B: Complete the Core Final Project Tasks

### Task 1: Entity Relationship Diagram

- Create the full ERD in Lucidchart.
- Show all tables, primary keys, foreign keys, and relationships.
- Show cardinality and participation clearly.
- Export the ERD as an image and place it in the PDF.

### Task 2: SQL Table Creation Code

- Document the SQL or Access table-definition logic for the schema.
- If Access does not support a constraint directly in SQL, explain how you enforced the rule through relationships, validation rules, or indexed fields.

### Task 3: Attendance Query To Date

- Use the assigned cutoff date consistently.
- Calculate classes attended, classes not attended, attendance percentage, weighted points maximum, and weighted points earned.
- Document any assumptions about canceled classes or missing attendance records.

### Task 4: Append Attendance Into `STUDENT_GRADE`

- Append attendance scores into the same grading structure as other deliverables.
- Prevent duplicate attendance rows.

### Task 5: Deliverable Summary Query

- Summarize student performance by deliverable type.
- Include quantity completed, average score, weighted points maximum, and weighted points earned.

### Task 6: Final Grade Up To Date

- Calculate the student's current final grade using weighted points earned so far.
- Exclude future work that has not been completed or graded.

### Task 7: Letter Grade Mapping

- Use a lookup table or another clean method to convert numeric scores to letter grades.
- Avoid long hard-coded conditional chains unless there is a strong reason.

### Task 8: Minimum Final Grade

- Estimate the lowest possible final grade if all missing work receives a zero.

### Task 9: Maximum Final Grade

- Estimate the highest possible final grade if all missing or pending work receives a perfect score.

### Task 10: Macros

- Build at least one macro that helps automate grade calculation.
- Build at least one macro that helps automate report generation or display.
- Include screenshots and a short description of what each macro does.

### Task 11: DBA Functions

- Explain three database administration functions relevant to the grading database.
- Good examples include security, backup and recovery, integrity management, concurrency control, and performance monitoring.

### Task 12: BI Functions

- Describe at least three business intelligence uses of the grading database.
- Focus on actionable insight, not only technical output.

### Task 13: Final Reflection

- Write a short reflection on what you learned about database design, SQL, automation, analytics, and information systems thinking.

## Part C: Build Queries in a Stable Sequence

Use saved queries as building blocks instead of trying to calculate everything in one step.

```text
Task3_Attendance_To_Date
  -> Task4_Append_Attendance_Score
  -> Task5_Deliverable_Summary_To_Date
  -> Task6_Final_Grade_Up_To_Date
  -> Task7_Letter_Grade
  -> Task8_Minimum_Final_Grade
  -> Task9_Maximum_Final_Grade
```

### Build Notes

- Use Access date literals with `#`, not quoted date strings.
- Use `Nz()` deliberately when you want missing values treated as zero or one hundred in what-if analysis.
- Do not average averages without respecting the grading weights.
- Use `LEFT JOIN` when students with missing work still need to remain visible in the result.

## Part D: Assemble the Final Portfolio Package

Organize the PDF in task order and make it easy to follow.

- include the ERD
- include SQL code as text
- include result tables
- include screenshots where required
- include short explanations that tell the reader what each task shows

If your instructor requires a presentation, prepare a short walkthrough that tells the story of the project from concept to final information system.

## Submission and Quality Checklist

Before submitting, confirm:

- [ ] The Access file opens correctly.
- [ ] All required tables are present.
- [ ] Relationships are defined and enforced where appropriate.
- [ ] Query names clearly match task numbers.
- [ ] Required queries return results for all students where appropriate.
- [ ] The PDF includes the ERD image.
- [ ] The PDF includes SQL code as text.
- [ ] The PDF includes final result tables.
- [ ] Macro screenshots are included.
- [ ] DBA explanations are included.
- [ ] BI examples are included.
- [ ] The final reflection is complete.

## Deliverable

Submit a complete final-project package: working Access database, organized PDF report, and any required presentation materials.

## Why This Matters

This chapter shows whether you can connect the whole course into one coherent system. You are not turning in isolated assignments. You are showing that you can move from requirements to design, from design to queries, and from queries to managerial understanding.