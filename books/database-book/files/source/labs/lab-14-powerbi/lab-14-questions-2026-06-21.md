---
section: "Lab Questions"
lab: "Lab 14"
title: "Power BI Dashboard for PetVax"
date: "2026-06-21"
---

# Lab 14: Power BI Dashboard for PetVax

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Build a multi-page interactive Power BI dashboard for the PetVax clinic — connect data, create DAX measures, and design three report pages for clinic management.*

## Overview

This is the only lab that uses Power BI instead of Access. You will connect Power BI Desktop to the PetVax clinic database, transform the data with Power Query, write DAX measures for key clinic metrics, and build three interactive report pages: Clinic Overview, Vet Performance, and Client Trends. The dashboard should be professional enough that a clinic manager could use it in a staff meeting.

- Chapter: Chapter 14 — Power BI.
- Estimated time: ~75 minutes.
- Tool: Power BI Desktop.

## Scenario

The PetVax practice manager wants a dashboard she can open every morning to see yesterday's appointments, monthly revenue trends, which vets are busiest, and which clients are most loyal. She does not write SQL. She needs visuals she can click, filter, and understand in seconds.

## Required Files and Tools

| Item            | Detail                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| Tool            | Power BI Desktop (free)                                                   |
| Data source     | PetVax database (Access `.accdb` or exported Excel/CSV from earlier labs) |
| Submission file | `Lab14-PetVax-Dashboard-LastName.pbix`                                    |
| Where to submit | Upload your `.pbix` file to the Lab 14 dropbox                            |

## Steps

### Step 1 — Load and transform data

**Do.** Connect Power BI to your PetVax data. Load tables: OWNER, PET, VETERINARIAN, APPOINTMENT, SERVICE, APPOINTMENT_SERVICE, INVOICE. In Power Query, remove blank rows, confirm data types (Charge = Decimal, ApptDate = Date, PaidDate = Date), and merge OWNER with PET for convenient display.

**Check 1.** *(Short answer)* How many tables did you load into Power BI?
**Check 2.** *(Multiple choice)* What does Power Query do?

- A. Creates the database tables
- B. Cleans, shapes, and transforms data before it loads into the report
- C. Writes DAX measures automatically
- D. Publishes reports to the web

### Step 2 — Review the data model

**Do.** Switch to Model view. Verify relationships are detected or create them manually: OWNER→PET, PET→APPOINTMENT, VETERINARIAN→APPOINTMENT, APPOINTMENT→APPOINTMENT_SERVICE, SERVICE→APPOINTMENT_SERVICE, APPOINTMENT→INVOICE.

**Check 3.** *(Short answer)* How many relationships are in your model?

### Step 3 — Create DAX measures

**Do.** Create these measures:

```dax
Total Revenue = SUM(INVOICE[TotalAmount])
Avg Revenue per Visit = AVERAGE(INVOICE[TotalAmount])
Total Appointments = COUNTROWS(APPOINTMENT)
Active Clients = DISTINCTCOUNT(APPOINTMENT[PetID])
Vaccine Compliance Rate = DIVIDE([Vaccinated Pets], [Total Pets])
```

**Check 4.** *(Short answer)* What DAX function counts distinct values in a column?
**Check 5.** *(Multiple choice)* Why use DIVIDE instead of the / operator?

- A. DIVIDE is faster
- B. DIVIDE handles division by zero safely without an error
- C. DIVIDE works only with whole numbers
- D. There is no difference

### Step 4 — Build three report pages

**Do.** Page 1 — Clinic Overview: Card visuals for Total Revenue MTD and Total Appointments, a line chart for revenue over time, and a bar chart for revenue by service type. Add a date slicer.

Page 2 — Vet Performance: Table with Vet Name, Appointment Count, Total Revenue, and Avg Revenue per Visit. Add a bar chart for appointments per vet. Add a vet name slicer.

Page 3 — Client Trends: Line chart for new vs. returning clients by month, table of top 10 clients by visit count.

**Check 6.** *(Short answer)* How many report pages does your finished dashboard have?

### Step 5 — Publish and save

**Do.** Save as `Lab14-PetVax-Dashboard-LastName.pbix`. Take a screenshot of each page. Optionally publish to Power BI Service.

**Check 7.** *(Short answer)* What file extension does a Power BI report use?

---

## Submission

Submit `Lab14-PetVax-Dashboard-LastName.pbix`. Include screenshots of all three pages in your submission or in the `.pbix` file.

Final grade = quiz score (7 questions) + AI-graded `.pbix` file.
