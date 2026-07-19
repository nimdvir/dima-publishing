<!-- metadata: date="2026-07-19" -->
<!-- Ch12 Lab — PetVax case study (independent). Aligned to ch12-main-2026-07-19.md. Auto-graded answer key is in a separate instructor file. -->

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

# Lab 12: PetVax Visualization and Knowledge Report

## Objective

Work independently with the **PetVax** database to build one reporting artifact and explain why your chosen reporting tier fits the business need. This lab applies the whole chapter: an analytical question, a validated source, a dashboard story, honest visuals, tier selection, and verified AI-assisted reporting.

PetVax is a small veterinary clinic group. It records owners, pets, appointments, services, vaccinations, staff, and clinics.

---

## Part 1: Auto-Graded Concept Questions

Answer in your course platform. Each has one correct response.

1. Which chart best shows monthly appointment volume across a year?
2. A five-person clinic needs a printable vaccination invoice generated from Access. Which reporting tier fits best?
3. A hospital network needs an interactive dashboard that refreshes as data changes. Which reporting tier fits best?
4. In Power BI Desktop, which on-page control lets a viewer filter the whole report to one clinic?
5. Moving a visual from yearly totals down to monthly detail uses which Power BI interaction?
6. `Total Appointments`, calculated live as the viewer filters, is best created as a calculated column or a measure?
7. `VaccinationStatus` ("Current," "Due," "Overdue"), stored once per row, is best created as a calculated column or a measure?
8. A bar chart's vertical axis begins at 98 when the values range from 98 to 100. What is misleading about it?
9. Access data inside a `.pbix` file is imported, not live. What must you do after the clinic updates its records?
10. Why should a dashboard display its refresh date?

---

## Part 2: File Upload

### The source

Use a PetVax reporting query or view as your single source. A representative view is below; field names may differ in your copy. Its grain is **one row per completed appointment**.

```sql
-- qry_PetVaxVisitBI  (grain: one row per completed appointment)
SELECT
    a.AppointmentID,
    a.AppointmentDate,
    p.PetName,
    p.Species,
    o.OwnerName,
    cl.ClinicName,
    st.StaffName,
    sv.ServiceName,
    sv.ServiceCategory,
    a.Amount,
    p.VaccinationStatus            -- 'Current', 'Due', 'Overdue'
FROM
    ((((APPOINTMENT AS a
    INNER JOIN PET AS p    ON a.PetID = p.PetID)
    INNER JOIN OWNER AS o  ON p.OwnerID = o.OwnerID)
    INNER JOIN CLINIC AS cl ON a.ClinicID = cl.ClinicID)
    INNER JOIN STAFF AS st ON a.StaffID = st.StaffID)
    INNER JOIN SERVICE AS sv ON a.ServiceID = sv.ServiceID;
```

Validate the source before you visualize: confirm the grain in one sentence, check five known records, confirm no `Amount` is negative, and confirm `VaccinationStatus` values are spelled consistently.

### Required dashboard components

| Component | Requirement |
|---|---|
| KPI card | One important clinic measure (e.g., total appointments, total revenue, overdue-vaccination count) |
| Comparison chart | Compare across service, vaccination status, clinic, or staff |
| Trend chart | Show a measure over time using `AppointmentDate` |
| Detail table | Show the records behind the summary |
| Slicer | Support one meaningful exploration question (e.g., by clinic) |
| Data-source note | Name the database, the query/view, the grain, and the refresh date |
| Visual explanations | One sentence per visual stating what it shows |
| Tier justification | One paragraph on why your chosen tier fits the audience and task |
| Interpretation | State the main finding, one limitation, and the next investigation |

Pick one business question to anchor the dashboard, for example:

- Which vaccination types are administered most often?
- How many pets are overdue for a required vaccination?
- Which months have the highest appointment volume?
- Which services generate the most revenue?
- Which staff members handle the greatest appointment volume?

### NotebookLM knowledge-report step

Give NotebookLM only **approved sources**: a dashboard screenshot, your metric definitions, your data-source note, an exported summary table, and the PetVax scenario. Ask it for a short management summary.

Then submit a critique that identifies:

1. one statement it got right;
2. one qualification it left out (a filter, denominator, date range, or limitation);
3. one unsupported or overstated claim, if any;
4. one revision you made after checking the source data.

Remember the chapter's rule: the AI summary is a **draft for inspection**, not evidence. The database, query, and verified numbers remain the source of truth.

### Submission package

Submit:

- the `.pbix` file (or an approved alternative);
- a dashboard screenshot or PDF;
- the PetVax query or view;
- the data-source note and tier justification;
- the written interpretation;
- the NotebookLM output and your critique.

---

## What this lab checks

- You can turn a business need into an analytical question and a validated source.
- You can build a four-layer dashboard story with honest visuals in the right tier.
- You can use AI to help communicate results while verifying every claim.

Deciding what the clinic should *do* about overdue vaccinations — targets, ownership, and trade-offs — is the work of Chapter 13.
