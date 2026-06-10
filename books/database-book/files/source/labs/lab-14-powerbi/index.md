---
title: "Lab 14: Power BI"
chapter: 14
section: "Lab Questions"
description: "Migrated draft for the Power BI lab based on the centralized chapter 14 section lab."
keywords:
  - lab 14
  - PetVax
  - Power BI
  - dashboards
  - visualization
date: 2026-05-22
author: "Nimrod Dvir"
---

# Lab 14: Power BI

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Converted draft migrated from the centralized section-based lab sequence.*

## Overview

This file preserves the current section-based lab handout inside the new numbered lab structure. It is a migration draft so the material is now organized by lab folder while the older section hub remains available as reference.

## Source Links

- [Centralized section lab](../../../Labs/sections/part-03-building-and-managing-systems/ch14-powerbi/lab.md)
- [Centralized answer outline](../../../Labs/sections/part-03-building-and-managing-systems/ch14-powerbi/answer-sheet-outline.md)
- [Answer key draft](./lab-14-answers-2026-05-22.md)

## Migration Notes

- Source chapter lab: ch14-powerbi
- Migration date: 2026-05-22
- Status: content moved into the numbered lab sequence; a later pass can rebuild this into the full SAM-style format if needed.

## Migrated Section Draft

<!-- Companion: Lab assignment — 2026-05-06 -->

### Lab Overview

**Lab Title:** Grading Dashboard in Power BI  
**Chapter:** 14 — Power BI: Data Visualization and Business Reporting  
**Estimated Time:** 60–90 minutes  
**Tools Required:** Power BI Desktop (free), GRADECENTER data export (Excel or SQL)

---

### Learning Objectives

By completing this lab, you will:

- Connect Power BI to a data source
- Clean and transform data with Power Query
- Build a multi-page interactive report
- Create at least one DAX measure
- Use slicers to enable interactive filtering

---

### Lab Data

Use the provided **GRADECENTER Excel export** (`gradecenter-export.xlsx`) available on the course LMS, or connect directly to the SQLite/SQL Server GRADECENTER database if available.

Tables to use: `Students`, `Courses`, `Enrollments`, `Grades`

---

### Part 1: Connect and Prepare (15 min)

1. Open Power BI Desktop. Click **Get Data → Excel** and load `gradecenter-export.xlsx`.
2. Open **Power Query Editor**:
   - Remove any rows in `Grades` where `Score` is blank or null.
   - Confirm all data types are correct (`Score` = Decimal, `StudentID` = Whole Number).
3. Click **Close & Apply**.
4. Go to **Model View** and verify that all relationships are correct.

**Checkpoint:** Take a screenshot of your data model relationships.

---

### Part 2: Create Measures (15 min)

In the `Grades` table, create the following DAX measures:

```dax
Average Score = AVERAGE(Grades[Score])

Total Students = DISTINCTCOUNT(Enrollments[StudentID])

Pass Rate = 
DIVIDE(
    COUNTROWS(FILTER(Grades, Grades[Score] >= 60)),
    COUNTROWS(Grades),
    0
)
```

---

### Part 3: Report Page 1 — Course Overview (20 min)

Build a report page titled **"Course Overview"**:

| Visual | Configuration |
|---|---|
| Card | Value: `Average Score` |
| Card | Value: `Pass Rate` (format as %) |
| Bar Chart | X-axis: `CourseName`, Y-axis: `Average Score` |
| Slicer | Field: `Semester` |

Format the page with a dark or professional theme. Add a text box title at the top.

**Checkpoint:** Screenshot of completed Page 1.

---

### Part 4: Report Page 2 — Student Detail (15 min)

Build a second report page titled **"Student Detail"**:

| Visual | Configuration |
|---|---|
| Table | Columns: StudentName, CourseName, Score, LetterGrade |
| Slicer | Field: `CourseName` |
| Card | Value: `Total Students` |

---

### Part 5: Publish (Optional — 5 min)

1. Save your file as `ch14-lab-yourname.pbix`.
2. If you have a Microsoft account: **Publish → My Workspace**.
3. Share the report URL with your instructor.

---

### Deliverables

Submit the following via the course LMS:

- [ ] `ch14-lab-yourname.pbix` file
- [ ] Screenshot: data model relationships
- [ ] Screenshot: Course Overview page
- [ ] Screenshot: Student Detail page
- [ ] (Optional) Power BI Service URL

---

### Grading Rubric

| Criteria | Points |
|---|---|
| Data loaded and cleaned correctly | 20 |
| All three DAX measures created correctly | 20 |
| Page 1 contains required visuals + slicer | 25 |
| Page 2 contains required visuals + slicer | 25 |
| Professional formatting and titles | 10 |
| **Total** | **100** |

---

### Reflection Prompt (written response, 2–3 sentences)

After building this dashboard, describe one business decision a school administrator could make using it. What data would drive that decision?

