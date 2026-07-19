<!-- metadata: date="2026-06-21" -->

# Lab 12: Building a PetVax Business Intelligence Dashboard

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Turn the PetVax operational database into analytical insight — build a star schema, define KPIs, and design a dashboard the practice manager can use every morning.</em></p>

# Overview

Operational databases store transactions. Business intelligence turns transactions into decisions. Chapter 12 introduced data warehouses, dimensional modeling, ETL, star schemas, OLAP, and dashboards. In the Let's Build, you applied these concepts to the Grading Database. In this lab, you apply them to PetVax.

Your job is to stop thinking like a database builder and start thinking like a business analyst: What does the practice manager need to see every morning to run the clinic effectively?

**This lab has two graded parts:**

1. **Quiz part** — auto-gradable check questions.
2. **File submission part** — a BI Design Document with star schema, KPI definitions, and dashboard wireframe.

**Estimated time:** 50–65 minutes.

> ⚠️ **Missing-file rule:** If the BI Design Document is missing, you receive zero for the file-submission part and may receive zero for the entire lab.

# Scenario

PetVax now has three years of operational data: thousands of visits, hundreds of pets, dozens of treatments, and growing revenue. The practice manager has a problem: the data exists, but no one can answer a simple question like "Which service line grew fastest last quarter?" without scrolling through spreadsheets for hours.

You have been asked to design a **Business Intelligence solution** for PetVax. You will not build a real data warehouse — you will design the blueprint: a star schema, a set of KPIs, and a dashboard wireframe the clinic could implement.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 1: Define the Business Questions

A BI system starts with the questions, not the data. Write five business questions the PetVax practice manager should be able to answer every morning.

| # | Business Question | Why It Matters |
|---|------------------|----------------|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

Examples: "How many appointments are scheduled for today?" or "Which veterinarian has the highest average billing per visit this month?"

> **Check Question 1:** Which of your five questions requires data from the most tables to answer? (You will identify this in the quiz.)

# Part 2: Design the Star Schema

Choose one business process that matters most to PetVax (appointments, treatments, or billing). Design a star schema with one fact table and at least four dimension tables.

Draw your star schema. For each table list the columns:

```
FACT_VISIT
    VisitID (PK)
    PetID (FK → DIM_PET)
    VetID (FK → DIM_VET)
    OwnerID (FK → DIM_OWNER)
    DateID (FK → DIM_DATE)
    VisitCount (measure — always 1)
    TotalCharge (measure)
    TreatmentCount (measure)

DIM_PET
    PetID (PK)
    PetName
    Species
    Breed
    BirthDate

DIM_VET
    ...

DIM_OWNER
    ...

DIM_DATE
    DateID (PK)
    FullDate
    DayOfWeek
    Month
    Quarter
    Year
```

> **Check Question 2:** In your star schema, which dimension table would you use to answer "How many appointments happened on Saturdays?"

# Part 3: Define KPIs

Define five Key Performance Indicators for PetVax. For each, name the business question it answers and the formula or query that calculates it.

| KPI | Business Question | Formula |
|-----|------------------|---------|
| Daily Visit Count | How many appointments today? | `COUNT(VisitID)` from FACT_VISIT where date = today |
| Avg Revenue Per Visit | Are we charging enough? | `AVG(TotalCharge)` from FACT_VISIT per time period |
| | | |
| | | |
| | | |

> **Check Question 3:** Which KPI would most directly help the practice manager decide whether to hire another veterinarian? (Multiple choice.)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 4: Dashboard Wireframe

Sketch a one-page dashboard layout for the PetVax practice manager. Your wireframe does not need to be beautiful — it needs to be clear. Use boxes and labels.

Include:

- At least four visual elements (charts, KPIs, tables)
- A title and date range selector
- Labels explaining what each element shows
- At least one element that compares current performance to a target

Draw your wireframe by hand or using any drawing tool. Export as PNG or PDF. Label each numbered element with a short explanation:

```
┌─────────────────────────────────────────┐
│  PETVAX DAILY OPERATIONS DASHBOARD      │
│  Date: [Today]                    ◷     │
├────────────────────┬────────────────────┤
│  ① KPI: Visits     │  ② KPI: Revenue    │
│     24 today       │     $2,840 today   │
├────────────────────┴────────────────────┤
│  ③ VISITS BY VET (bar chart)           │
│  Dr. Chen  ████████████ 12              │
│  Dr. Singh ██████ 6                     │
│  Dr. Lopez ████████ 8                   │
├─────────────────────────────────────────┤
│  ④ REVENUE BY SPECIES (pie chart)      │
│  Dogs 45%  Cats 35%  Other 20%         │
└─────────────────────────────────────────┘
```

> **Check Question 4:** Which element in your dashboard would the practice manager check first thing in the morning? Why?

# Lab Quiz

## Question 1 — Most Complex Question (Multiple Choice)

Which of your five business questions from Part 1 requires data from the most tables?

- A. Question 1
- B. Question 2
- C. Question 3
- D. Question 4
- E. Question 5

## Question 2 — Saturday Appointments (Multiple Choice)

To answer "How many appointments happened on Saturdays?" which dimension table is essential?

- A. DIM_PET
- B. DIM_VET
- C. DIM_DATE
- D. DIM_OWNER

## Question 3 — Hiring Decision KPI (Multiple Choice)

Which KPI would most help the practice manager decide whether to hire another veterinarian?

- A. Total revenue per day
- B. Average visits per vet per day
- C. Average treatment cost
- D. Number of unique pets per month

## Question 4 — Dashboard First Check (Multiple Choice)

The first dashboard element a manager should check in the morning is:

- A. Year-to-date revenue trend
- B. Today's scheduled visits
- C. Species distribution pie chart
- D. Average treatment cost by vet

## Question 5 — Fact vs Dimension (Select All That Apply)

Which PetVax tables would become dimension tables (not fact tables) in a star schema? Select all that apply.

- A. OWNER
- B. PET
- C. VISIT
- D. VET
- E. TREATMENT

# Submission

Submit one file: `lab-12-petvax-bi-design.pdf`

Your BI Design Document must include all four parts:

1. Business questions table (5 rows)
2. Star schema diagram with fact table and 4+ dimensions
3. KPI definitions (5 KPIs with formulas)
4. Dashboard wireframe (4+ visual elements, labeled)

> ⚠️ If the BI Design Document is missing, you receive zero for the file-submission part.

# Lab 12 Completion Checklist

- [ ] Part 1: 5 business questions with "why it matters" explanations
- [ ] Part 2: Star schema with fact table, 4+ dimensions, and all columns listed
- [ ] Part 3: 5 KPIs with formulas
- [ ] Part 4: Dashboard wireframe labeled and exported
- [ ] Quiz answers consistent with your design
- [ ] Single PDF uploaded
