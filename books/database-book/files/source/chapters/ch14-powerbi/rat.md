# Chapter 14 RAT — Power BI

<!-- Companion: Readiness Assurance Test (RAT) quiz — 2026-05-06 -->
<!-- Format: Multiple choice with answer key at end -->

## Instructions

Answer each question individually before discussing with your team. These questions are based on the Chapter 14 reading assignment.

---

**1.** Which component of Power BI is used to *create* reports?

- A) Power BI Service
- B) Power BI Mobile
- C) Power BI Desktop
- D) Power Query Editor

---

**2.** What language is used to write calculated columns and measures in Power BI?

- A) SQL
- B) Python
- C) DAX
- D) MDX

---

**3.** You want to display the total number of students enrolled in a course as a single number on a report. Which visual type is most appropriate?

- A) Bar Chart
- B) Table
- C) Slicer
- D) Card

---

**4.** A **measure** in Power BI is different from a **calculated column** because:

- A) Measures are stored row-by-row in the table
- B) Measures are evaluated on demand based on filter context
- C) Measures can only use the SUM function
- D) Measures cannot reference other measures

---

**5.** Which Power BI feature allows a report user to interactively filter all visuals on a page by selecting a value?

- A) Drill-through
- B) Calculated column
- C) Slicer
- D) Tooltip

---

**6.** A student earns a score of 45 on an exam. A DAX measure `Pass Rate` counts rows where `Score >= 60` divided by total rows. This student's row:

- A) Is excluded from both numerator and denominator
- B) Is included in the numerator only
- C) Is included in both numerator and denominator
- D) Is included in the denominator only

---

**7.** To make a Power BI Desktop report accessible to colleagues who don't have the Desktop app, you should:

- A) Email the `.pbix` file
- B) Export it as a PDF
- C) Publish it to the Power BI Service
- D) Save it to a shared drive

---

**8.** Power Query transformations are best described as:

- A) Changes that permanently modify the original data source
- B) SQL queries written inside Power BI
- C) Non-destructive steps that shape data before it loads into the model
- D) DAX expressions applied to tables

---

## Answer Key

| # | Answer | Explanation |
|---|---|---|
| 1 | C | Power BI Desktop is the free authoring tool |
| 2 | C | DAX (Data Analysis Expressions) is Power BI's formula language |
| 3 | D | A Card visual displays a single scalar value |
| 4 | B | Measures respond to filter context; calculated columns are row-based |
| 5 | C | A Slicer is a canvas-based interactive filter |
| 6 | D | The row is counted in the denominator (total rows) but not the numerator (score < 60) |
| 7 | C | Publishing to the Power BI Service makes reports shareable via browser |
| 8 | C | Power Query steps are applied at load time and do not alter source data |
