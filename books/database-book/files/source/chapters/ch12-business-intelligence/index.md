# Chapter 12: Business Intelligence, Data Visualization, and Reporting

*From reliable database records to understandable business evidence*

A database can store every score, appointment, payment, order, and attendance record correctly and still fail to improve a single decision. The missing step is communication.

By this point in the course, you can organize data into relational tables, enforce relationships, write SQL queries, and create reusable database objects. Those skills protect the accuracy and integrity of the data. Managers, however, rarely want to inspect ten normalized tables or read a 400-row query result. They want to know what is happening, where performance differs, whether conditions are changing, and what deserves attention.

That is the role of **Business Intelligence**, or **BI**. BI connects trustworthy database records to reports, visualizations, metrics, and explanations. It does not replace database design or SQL. It depends on them.

This chapter focuses on the practical reporting layer. You will learn how to prepare reporting-ready data, select an appropriate reporting format, and use three levels of reporting technology. Microsoft Access provides structured printable reports close to the database. Notion offers lightweight collaborative views for small teams. Power BI Desktop provides a free Windows environment for importing data, preparing it with Power Query, creating calculations with DAX, and building interactive reports.

AI also enters the reporting workflow. A source-grounded tool such as NotebookLM can help summarize a dashboard, compare supplied documents, or draft a management briefing. Yet an AI-generated explanation is not evidence by itself. The database, reporting query, and verified metric remain the sources of truth.

The three chapters at the end of this book follow one progression:

```
Chapter 12: Communicate what the data shows.
Chapter 13: Decide what the organization should do.
Chapter 14: Understand the modern infrastructure behind analytics and AI.
```

## Chapter Video

<!-- VIDEO (NotebookLM) — hidden note: generate the Chapter 12 overview video, then replace the line below with the YouTube iframe (see ch10 for the embed pattern). Full prompt: books/database-book/media-prompts/VIDEO-PROMPTS-NotebookLM.md -->

> 🎬 _Chapter 12 overview video — coming soon._

## Learning Objectives

After completing this chapter, you will be able to:

1. Define Business Intelligence and explain how it turns database output into decision support.
2. Connect BI to the DIKW hierarchy and the R.E.A.D. framework.
3. Distinguish operational questions from analytical questions.
4. Explain how ETL, data quality rules, and grain create trustworthy reporting data.
5. Design and validate a reusable reporting query in Microsoft Access.
6. Distinguish measures, attributes, identifiers, metrics, KPIs, reports, dashboards, and KPI cards.
7. Select and evaluate visualizations for comparison, trend, distribution, relationship, and exact-value questions.
8. Match a reporting need to Access, Notion, or Power BI Desktop.
9. Install Power BI Desktop and import a saved query from a Microsoft Access database.
10. Use Power Query, basic DAX measures, filters, slicers, and report interactions.
11. Use NotebookLM as a source-grounded reporting assistant while verifying every factual and numerical claim.

## Chapter Roadmap

- **12.1 What Is Business Intelligence?** — BI workflow, DIKW, R.E.A.D., decision support
- **12.2 From Operational Records to Analytical Questions** — Individual records, groups, comparisons, trends
- **12.3 Preparing Trustworthy Reporting Data** — ETL, ELT, data quality, grain, refresh
- **12.4 The Reporting Query as a Reporting Layer** — Reporting layer, measures, attributes, validation
- **12.5 Metrics and Reporting Outputs** — Metrics, KPIs, reports, dashboards, KPI cards
- **12.6 Choosing and Evaluating Visualizations** — Chart selection, clarity, context, honest design
- **12.7 The Three Reporting Tiers** — Three Reporting Tiers
- **12.8 Tier 1: Microsoft Access Reports** — Grouping, totals, printing, PDF export
- **12.9 Tier 3: Power BI Desktop and Microsoft Access** — Installation, `.pbix`, Import, refresh, troubleshooting
- **12.10 Power Query, DAX, and Interactive Reporting** — Power Query, DAX, filters, slicers, cross-filtering
- **12.11 Tier 2: Notion as a Lightweight Reporting Workspace** — Views, relations, rollups, small-team reporting
- **12.12 NotebookLM as a Knowledge-Reporting Sidecar** — NotebookLM, source grounding, verification
