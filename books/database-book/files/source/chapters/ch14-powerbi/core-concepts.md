# Chapter 14: Power BI — Data Visualization and Business Reporting

This chapter introduces Microsoft Power BI as the industry-standard tool for turning database output into visual business reports. The chapter covers connecting data sources, building data models, creating calculated columns and measures (DAX), designing interactive dashboards, and presenting findings to a non-technical audience. The chapter ties directly to SQL output and the Grading Database as the source data.

**After reading this chapter, you will be able to:**

- Connect Power BI to a database source and build a basic data model
- Create interactive visuals and dashboards that answer a defined business question
- Design a report layout appropriate for a managerial audience

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Core Concepts

## 14.1 From SQL Output to Business Dashboards

Every previous chapter ended with data *inside* a database — designed, queried, and validated. Power BI is where that data becomes a picture a decision-maker can act on. It sits at the end of the data-to-decision pipeline: SQL (and the Grading Database) produce clean, correct results, and Power BI turns those results into interactive visuals and dashboards for a non-technical audience.

This chapter follows that flow in order: connect to a data source (14.2), reshape the raw data with Power Query (14.3), build visualizations (14.4), add calculated logic with DAX (14.5), make reports interactive with slicers and filters (14.6), and publish and share the finished report (14.7). Throughout, the Grading Database is the source, and the goal is always the same — help a manager see what the data means, not just what it says.

## 14.2 Connecting to Data Sources

Power BI can connect to a wide variety of data sources including:

- Excel workbooks
- CSV and flat files
- SQL Server and other relational databases
- SharePoint, OneDrive, and Teams
- Web pages and APIs

### Steps to Connect

1. Open **Power BI Desktop**.
2. Click **Home → Get Data**.
3. Select the data source type.
4. Authenticate and select tables or files to load.

🧪 **Example:** In our class grading database scenario, you would connect to the `GRADECENTER` SQL database and import the `Students`, `Courses`, and `Grades` tables.

---

## 14.3 Power Query: Transforming Data

Before building visuals, raw data often needs cleaning. **Power Query** is the built-in data transformation engine in Power BI.

Common transformations include:

- Removing duplicate rows
- Renaming columns
- Changing data types
- Filtering out blank or null values
- Merging or appending tables

📝 **Note:** Power Query transformations are non-destructive — the original data source is never modified.

---

## 14.4 Building Visualizations

Once data is loaded, you can build visuals by dragging fields onto the report canvas.

### Core Visual Types

| Visual | Best Used For |
|---|---|
| Bar / Column Chart | Comparing categories |
| Line Chart | Trends over time |
| Pie / Donut Chart | Part-to-whole relationships |
| Card | Displaying a single KPI value |
| Table / Matrix | Tabular data with row/column groupings |
| Map | Geographic data |

🔑 **Key Takeaway:** Choose the right visual for the story you are telling. A poorly chosen chart can mislead the audience even if the data is accurate.

---

## 14.5 DAX: Data Analysis Expressions

**DAX** is the formula language used in Power BI to create calculated columns and measures.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Calculated Column vs. Measure

| Type | Evaluated | Stored |
|---|---|---|
| Calculated Column | Row by row | In the table |
| Measure | On demand | Not stored |

#### Common DAX Functions

```dax
-- Count rows
Total Students = COUNTROWS(Students)

-- Sum a column
Total Points = SUM(Grades[Points])

-- Average with filter
Avg Grade A = CALCULATE(AVERAGE(Grades[Score]), Grades[LetterGrade] = "A")
```

---

## 14.6 Interactive Reports: Slicers and Filters

Power BI reports are interactive by default. Users can filter data using:

- **Slicers** — visual dropdowns or lists on the canvas
- **Report Filters** — apply to the whole report
- **Page Filters** — apply to a single report page
- **Visual Filters** — apply to a single visual

✅ **Good Practice:** Always include a slicer for the most important dimension (e.g., semester, department, date range) so report consumers can self-serve.

---

## 14.7 Publishing and Sharing

Once a report is complete in Power BI Desktop, you can publish it to the **Power BI Service**:

1. Click **Home → Publish**.
2. Sign in with your Microsoft/school account.
3. Select a workspace.
4. Open the report in your browser at [app.powerbi.com](https://app.powerbi.com).

From the Service, you can share reports with colleagues, embed them in Teams or SharePoint, or schedule automatic data refreshes.

---

## Chapter Summary

In this chapter, you learned how to use Power BI as the final layer in the data-to-decision pipeline introduced in Chapter 1. You connected to data sources, cleaned data with Power Query, built interactive visualizations, and published a report to the Power BI Service. These skills translate directly to analyst and manager roles across every industry.

---

## Key Terms

See the Chapter 14 Term Treasury companion for a complete glossary.

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Review Questions

See the Chapter 14 Reflection companion for discussion and review questions.

---

## Figures Index

| Figure | Caption | File |
|---|---|---|
| 14.1 | Power BI component overview | *(to be added)* |
| 14.2 | Power Query transformation interface | *(to be added)* |
| 14.3 | Sample grading dashboard in Power BI | *(to be added)* |
