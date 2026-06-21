<!-- metadata: date="2026-06-21" -->

# Lab 14: Building a PetVax Power BI Dashboard

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Connect Power BI to PetVax data, build a multi-page interactive report, and present your findings — the same workflow you practiced on the Grading Database, now for a real veterinary business.</em></p>

# Overview

Chapter 14 introduced Microsoft Power BI as the bridge from database queries to business presentations. In the Let's Build, you connected Power BI to the Grading Database, built a data model, created DAX measures, and designed an interactive report. In this lab, you do the same for PetVax.

**This lab has two graded parts:**

1. **Quiz part** — auto-gradable check questions.
2. **File submission part** — a Power BI `.pbix` file plus exported screenshots.

**Estimated time:** 60–80 minutes.

**Tools required:** Power BI Desktop (free download from Microsoft).

> ⚠️ **Missing-file rule:** If the `.pbix` file is missing, you receive zero for the file-submission part.

# Scenario

The PetVax practice manager attends a veterinary conference and sees a competitor presenting an interactive dashboard that shows appointments, revenue, and patient trends at a glance. She returns to the clinic and asks you: "Can we have something like that?"

You have the PetVax database. You have Power BI. Your job is to build a two-page interactive report that answers the clinic's most important business questions.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 1: Connect and Prepare Data

1. Open Power BI Desktop. Click **Get Data → SQLite** (or import CSV exports of the PetVax tables if SQLite connection is unavailable).
2. Load the following PetVax tables: OWNER, PET, VET, VISIT, TREATMENT, VISIT_TREATMENT.
3. In **Power Query Editor**, verify:
   - All primary key columns are present
   - Date columns are set to Date type
   - Currency columns (ChargeAmount) are set to Decimal/Fixed Decimal
   - No columns contain errors or nulls where they should not

> **Check Question 1:** How many tables did you load into Power BI from PetVax? (Multiple choice.)

# Part 2: Build the Data Model

In the **Model** view, create relationships between the PetVax tables:

- OWNER[OwnerID] → PET[OwnerID]
- PET[PetID] → VISIT[PetID]
- VET[VetID] → VISIT[VetID]
- VISIT[VisitID] → VISIT_TREATMENT[VisitID]
- TREATMENT[TreatmentID] → VISIT_TREATMENT[TreatmentID]

Verify all relationships show correct cardinality (one-to-many) and cross-filter direction.

> **Check Question 2:** How many relationships did you create in the PetVax data model? (Multiple choice: A. 3 B. 4 C. 5 D. 6)

# Part 3: Create DAX Measures

Write the following DAX measures in your PetVax report:

| Measure Name | DAX Formula | What It Calculates |
|-------------|-------------|-------------------|
| Total Visits | `TotalVisits = COUNT(VISIT[VisitID])` | Total number of clinic visits |
| Total Revenue | `TotalRevenue = SUM(VISIT_TREATMENT[ChargeAmount])` | Sum of all treatment charges |
| Avg Revenue Per Visit | `AvgRevenuePerVisit = DIVIDE([TotalRevenue], [TotalVisits], 0)` | Average billing per appointment |
| Unique Pets | `UniquePets = DISTINCTCOUNT(PET[PetID])` | Number of unique pets seen |
| Visits Per Vet | `VisitsPerVet = DIVIDE([TotalVisits], DISTINCTCOUNT(VET[VetID]), 0)` | Average caseload per veterinarian |

> **Check Question 3:** If TotalRevenue = $45,000 and TotalVisits = 300, what is AvgRevenuePerVisit? (Short answer — enter the exact number.)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 4: Design the Dashboard (Page 1 — Operations)

Page 1 should focus on daily operations. Include:

1. **Card visual:** Today's visit count (Title: "Visits Today")
2. **Card visual:** Today's revenue (Title: "Revenue Today")
3. **Bar chart:** Visits by veterinarian (Axis: VetName, Values: TotalVisits)
4. **Slicer:** Date range filter
5. **Table:** Upcoming appointments (Columns: PetName, OwnerName, VisitDate, VisitTime, VetName)

Add a descriptive title at the top of the page: "PetVax Daily Operations."

> **Check Question 4:** In your bar chart of visits by veterinarian, which vet has the most visits? (Multiple choice — vet names will depend on your data.)

# Part 5: Design the Dashboard (Page 2 — Trends)

Page 2 should focus on trends over time. Include:

1. **Line chart:** Visits over time (Axis: VisitDate, Values: TotalVisits)
2. **Line chart:** Revenue over time (Axis: VisitDate, Values: TotalRevenue)
3. **Pie chart:** Visits by species (Legend: Species, Values: TotalVisits)
4. **Stacked bar chart:** Revenue by treatment type (Axis: TreatmentName, Values: TotalRevenue)

Add a page title: "PetVax Trends & Analysis."

> **Check Question 5:** In your species pie chart, which species accounts for the largest share of visits? (Multiple choice: A. Dog B. Cat C. Bird D. Other)

# Lab Quiz

## Question 1 — Table Count (Multiple Choice)

How many PetVax tables did you load into Power BI?

- A. 4
- B. 5
- C. 6
- D. 7

## Question 2 — Relationship Count (Multiple Choice)

How many relationships did you create in the data model?

- A. 3
- B. 4
- C. 5
- D. 6

## Question 3 — Avg Revenue (Short Answer)

If TotalRevenue = $45,000 and TotalVisits = 300, what is AvgRevenuePerVisit? Enter the exact number (no dollar sign).

## Question 4 — Top Vet (Multiple Choice)

In your bar chart, which veterinarian handled the most visits?

- A. Dr. Chen
- B. Dr. Singh
- C. Dr. Lopez
- D. Cannot determine — depends on the data loaded

## Question 5 — Top Species (Multiple Choice)

Which species had the most visits in your pie chart?

- A. Dog
- B. Cat
- C. Bird
- D. Cannot determine — depends on the data loaded

## Question 6 — DAX Function (Multiple Choice)

Which DAX function did you use to count unique pets?

- A. COUNT
- B. COUNTA
- C. DISTINCTCOUNT
- D. COUNTROWS

# Submission

Submit two items:

1. **Power BI file:** `lab-14-petvax-dashboard-YourName.pbix`
2. **Screenshot export:** `lab-14-petvax-screenshots-YourName.pdf` — showing both dashboard pages with all visuals visible

The AI grader will verify: the .pbix file opens, relationships exist, DAX measures are present, both pages contain the required visuals, and your quiz answers are consistent with your report.

> ⚠️ If the .pbix file is missing, you receive zero for the file-submission part.

# Lab 14 Completion Checklist

- [ ] Part 1: 6 PetVax tables loaded, data types verified in Power Query
- [ ] Part 2: 5 relationships created with correct cardinality
- [ ] Part 3: 5 DAX measures defined and working
- [ ] Part 4: Page 1 has 2 cards, 1 bar chart, 1 slicer, 1 table
- [ ] Part 5: Page 2 has 2 line charts, 1 pie chart, 1 stacked bar chart
- [ ] Both pages have descriptive titles
- [ ] Screenshots exported and .pbix saved
