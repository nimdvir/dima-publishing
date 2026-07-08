# Chapter 12: Business Intelligence and Analytics for Performance Improvement

Business Intelligence, or BI, is where the database becomes useful to managers. Earlier chapters focused on how data is structured, queried, designed, and administered. This chapter shifts to the question that motivates all of that work: how do organizations use reliable data to understand performance and make better decisions? It introduces operational versus analytical systems, data warehouses, ETL and ELT pipelines, dimensional modeling, star schemas, OLAP operations, dashboards, KPIs, governance, and the Balanced Scorecard, using the Grading Database as the running example.

## Chapter Video

<!-- VIDEO (NotebookLM) — hidden note: generate the Chapter 12 overview video, then replace the line below with the YouTube iframe (see ch10 for the embed pattern). Full prompt: chapter-review-ch10-17/VIDEO-PROMPTS-NotebookLM.md -->

> 🎬 _Chapter 12 overview video — coming soon._

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [12.1 Business Intelligence Fundamentals](#12-1-business-intelligence-fundamentals) | See how BI transforms stored data into dashboards, reports, and decisions. |
| [12.2 Operational Systems vs. Analytical Systems](#12-2-operational-systems-vs-analytical-systems) | Grasp the fundamental split between systems that run the business and systems that analyze it. |
| [12.3 ETL and ELT: Moving Data into Analytical Systems](#12-3-etl-and-elt-moving-data-into-analytical-systems) | Learn how data is extracted, cleaned, and loaded into systems built for analysis. |
| [12.4 Data Warehouses, Data Marts, and Data Lakes](#12-4-data-warehouses-data-marts-and-data-lakes) | Distinguish the main architectures for storing analytical data at scale. |
| [12.5 Dimensional Modeling: Facts, Dimensions, and Measures](#12-5-dimensional-modeling-facts-dimensions-and-measures) | Model data for analysis using facts, dimensions, and the star schema. |
| [12.6 OLAP Operations: Exploring Data from Multiple Angles](#12-6-olap-operations-exploring-data-from-multiple-angles) | Slice, dice, drill down, and roll up to explore data interactively. |
| [12.7 SQL as a BI Tool](#12-7-sql-as-a-bi-tool) | Use the SQL you already know to build reusable BI views and KPIs. |
| [12.8 Reports, Dashboards, and Visualization](#12-8-reports-dashboards-and-visualization) | Turn query results into visuals that communicate insight at a glance. |
| [12.9 KPIs, Targets, and the Balanced Scorecard](#12-9-kpis-targets-and-the-balanced-scorecard) | Measure performance against goals with well-designed metrics. |
| [12.10 BI Governance and Data Quality](#12-10-bi-governance-and-data-quality) | Keep metrics trustworthy with shared definitions and data stewardship. |
| [12.11 BI Across Access, SQLite, and Supabase](#12-11-bi-across-access-sqlite-and-supabase) | Apply the same BI patterns across the platforms used in this course. |
| [12.12 Worked Example: Building a Simple BI Layer for the Grading Database](#12-12-worked-example-building-a-simple-bi-layer-for-the-grading-database) | Put it all together by building a BI layer end to end. |

---
