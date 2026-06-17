# Chapter 12: Business Intelligence and Analytics for Performance Improvement

*Turning Operational Data into Strategic Insight*

Business Intelligence, or BI, is where the database becomes useful to managers. Earlier chapters focused on how data is structured, queried, designed, and administered. This chapter shifts to the question that motivates all of that work: how do organizations use reliable data to understand performance and make better decisions? It introduces operational versus analytical systems, data warehouses, ETL and ELT pipelines, dimensional modeling, star schemas, OLAP operations, dashboards, KPIs, governance, and the Balanced Scorecard, using the Grading Database as the running example.

## Chapter Roadmap

| Section | Main Question | Core Ideas |
| --- | --- | --- |
| [12.1 Business Intelligence Fundamentals](#12-1-business-intelligence-fundamentals) | What is Business Intelligence? | BI, decision support, DIKW, R.E.A.D. |
| [12.2 Operational Systems vs. Analytical Systems](#12-2-operational-systems-vs-analytical-systems) | Why separate operations from analytics? | OLTP, OLAP, operational systems, analytical systems |
| [12.3 ETL and ELT: Moving Data into Analytical Systems](#12-3-etl-and-elt-moving-data-into-analytical-systems) | How does data move into BI systems? | ETL, ELT, data integration, data quality |
| [12.4 Data Warehouses, Data Marts, and Data Lakes](#12-4-data-warehouses-data-marts-and-data-lakes) | What is a data warehouse? | EDW, data marts, metadata, data lakes |
| [12.5 Dimensional Modeling: Facts, Dimensions, and Measures](#12-5-dimensional-modeling-facts-dimensions-and-measures) | How is analytical data modeled? | Facts, dimensions, measures, star schema |
| [12.6 OLAP Operations: Exploring Data from Multiple Angles](#12-6-olap-operations-exploring-data-from-multiple-angles) | How do analysts explore analytical data? | Slice, dice, drill-down, roll-up, pivot |
| [12.7 SQL as a BI Tool](#12-7-sql-as-a-bi-tool) | How does SQL support BI? | Views, aggregation, KPIs, analytical queries |
| [12.8 Reports, Dashboards, and Visualization](#12-8-reports-dashboards-and-visualization) | How do dashboards communicate insight? | Reports, dashboards, visualizations, KPI cards |
| [12.9 KPIs, Targets, and the Balanced Scorecard](#12-9-kpis-targets-and-the-balanced-scorecard) | How is performance managed? | KPIs, targets, Balanced Scorecard |
| [12.10 BI Governance and Data Quality](#12-10-bi-governance-and-data-quality) | Why does BI need governance? | Metric definitions, stewardship, access, trust |
| [12.11 BI Across Access, SQLite, and Supabase](#12-11-bi-across-access-sqlite-and-supabase) | How does BI differ across platforms? | Access, SQLite, Supabase/PostgreSQL |
| [12.12 Worked Example: Building a Simple BI Layer for the Grading Database](#12-12-worked-example-building-a-simple-bi-layer-for-the-grading-database) | How do we build a simple BI layer? | Grading Database analytics example |

## Chapter Files

- [Main Chapter](core-concepts.md)
