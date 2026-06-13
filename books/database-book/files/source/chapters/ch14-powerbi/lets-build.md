<!-- metadata: date="2026-05-06"; chapter="14"; section="lets-build"; title="Chapter 14 Lets Build"; description="Hands-on practice for Power BI" -->

# Chapter 14: Let's Build — Power BI Dashboard with the Grading Database

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

<!-- Companion: Hands-on build exercise — 2026-05-06 -->

## Overview

In this Let's Build exercise, you will connect Power BI Desktop to the GRADECENTER database and create a multi-page interactive grading dashboard from scratch.

---

## Prerequisites

- Power BI Desktop installed (free download from Microsoft)
- Access to the `GRADECENTER` database or the provided Excel export
- Completion of Chapters 5 and 9 (SQL fundamentals and advanced queries)

---

## Step 1: Get the Data

1. Open **Power BI Desktop**.
2. Click **Home → Get Data → SQL Server** (or **Excel** if using the provided export).
3. Connect to the GRADECENTER data source.
4. Load the following tables: `Students`, `Courses`, `Enrollments`, `Grades`, `Instructors`.

---

## Step 2: Review the Data Model

1. Switch to the **Model view** (table icon on the left rail).
2. Verify that relationships exist between:
   - `Students` → `Enrollments` (StudentID)
   - `Courses` → `Enrollments` (CourseID)
   - `Enrollments` → `Grades` (EnrollmentID)
3. If relationships are missing, drag fields to create them manually.

---

## Step 3: Clean Data with Power Query

1. Click **Transform Data** to open Power Query.
2. In the `Grades` table:
   - Remove any rows where `Score` is blank.
   - Change `Score` to a **Decimal Number** data type.
3. Click **Close & Apply**.

---

## Step 4: Create Measures

Switch to **Report view** and create the following measures in the `Grades` table:

```dax
Average Score = AVERAGE(Grades[Score])

Total Enrollments = COUNTROWS(Enrollments)

Pass Rate = 
DIVIDE(
    COUNTROWS(FILTER(Grades, Grades[Score] >= 60)),
    COUNTROWS(Grades)
)
```

---

## Step 5: Build Page 1 — Course Summary

1. Add a **Card** visual → drag `Average Score` measure to it.
2. Add a **Bar Chart** → X-axis: `CourseName`, Y-axis: `Average Score`.
3. Add a **Slicer** → Field: `Semester`.
4. Format the page with a title: *"Course Performance Overview"*.

---

## Step 6: Build Page 2 — Student Detail

1. Add a **Table** visual with columns: `StudentName`, `CourseName`, `Score`, `LetterGrade`.
2. Add a **Slicer** for `InstructorName`.
3. Add a **Card** for `Pass Rate`.

---

## Step 7: Publish (Optional)

1. Save the `.pbix` file as `grading-dashboard.pbix`.
2. Click **Publish → My Workspace** (requires a Microsoft account).
3. Open the report in a browser at app.powerbi.com.

---

## Deliverable

Submit your `.pbix` file and a screenshot of your completed dashboard showing at least two pages.

---

## Discussion Prompt

How would you use this dashboard if you were the department chair? What additional measures or visuals would help you make staffing or curriculum decisions?
