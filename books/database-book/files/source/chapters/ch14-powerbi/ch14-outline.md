<!-- metadata: date="2026-06-11"; chapter="14"; type="outline"; title="Chapter 14 Outline" -->

# Chapter 14 Outline: Power BI - Data Visualization and Business Reporting

From Query Results to Executive Dashboards

This outline follows the chapter structure and keeps only chapter sections reflected in the manuscript.

## Chapter Overview

* Introduce Microsoft Power BI as the visualization and reporting layer in the course's data-to-decision pipeline.
* Build on earlier modeling, SQL, BI, and analytics concepts by moving from query output to interactive reports and dashboards.
* Frame Power BI as a tool for communicating insights to managers and decision-makers, not just for producing charts.
* Position the chapter as the practical bridge between analytical logic and stakeholder-facing business reporting.

## Learning Objectives

* Explain what Power BI is and how it fits into a business intelligence workflow.
* Connect Power BI Desktop to common data sources such as Excel, CSV, and SQL databases.
* Use Power Query to clean and transform data before loading.
* Build basic visualizations and interactive reports.
* Create calculated columns and measures using DAX.
* Publish and share reports through the Power BI Service.

## 14.1 What Is Power BI?

* Define Power BI as Microsoft's business analytics platform for connecting to data, preparing it, visualizing it, and sharing insights.
* Present Power BI as the environment where earlier database and BI work becomes executive-facing reporting.
* Distinguish the three main components: Desktop, Service, and Mobile.
* Reinforce that the course focuses primarily on Power BI Desktop as the hands-on authoring environment.

## 14.2 Connecting to Data Sources

* Introduce Power BI's ability to connect to relational databases, spreadsheets, flat files, cloud storage, web sources, and APIs.
* Use the GRADECENTER example to make connection choices concrete and course-relevant.

### Steps to Connect

* Walk through using Home -> Get Data, choosing a source type, authenticating, and selecting tables or files to load.
* Reinforce that data access is the first step in turning stored records into report-ready information.

## 14.3 Power Query: Transforming Data

* Present Power Query as the chapter's built-in transformation layer for cleaning and preparing raw data.
* Cover common transformations such as removing duplicates, renaming columns, changing data types, filtering blanks, and merging or appending tables.
* Reinforce the non-destructive nature of Power Query so students understand that source data is not overwritten.
* Connect this step back to Chapter 12 by showing Power Query as a tool-specific form of ETL logic.

## 14.4 Building Visualizations

* Shift from prepared data to report construction on the Power BI canvas.
* Emphasize that visualization choice should support the business question rather than decorate the report.

### Core Visual Types

* Match bar and column charts to category comparison, line charts to trend analysis, pies and donuts to limited part-to-whole views, cards to single KPIs, tables and matrices to grouped detail, and maps to geographic data.
* Reinforce the chapter's reporting message that the wrong visual can mislead even when the underlying data is correct.

## 14.5 DAX: Data Analysis Expressions

* Introduce DAX as the formula language used in Power BI for calculated columns and measures.
* Position DAX as the logic layer that turns raw fields into reusable analytical metrics.

### Calculated Column vs. Measure

* Distinguish row-by-row stored calculations from on-demand aggregate measures.
* Use the manuscript's examples such as row counting, point totals, and filtered averages to show how DAX supports reporting logic.
* Reinforce that measures are often the better tool for dashboards because they respond to report context and filters.

## 14.6 Interactive Reports: Slicers and Filters

* Present Power BI reports as interactive by default rather than static outputs.
* Explain slicers, report filters, page filters, and visual filters as ways users self-serve within a report.
* Reinforce the design practice of exposing the most important business dimension as a slicer so consumers can explore without rewriting queries.

## 14.7 Publishing and Sharing

* Show the transition from Desktop authoring to cloud distribution through the Power BI Service.
* Walk through publishing, signing in, selecting a workspace, opening the report online, and sharing it with others.
* Connect publishing to the real business goal of making insights accessible to stakeholders where they work.

## Chapter Summary

* Reaffirm Power BI as the final presentation layer in the course's progression from data storage to managerial decision support.
* Summarize the chapter's workflow: connect to data, clean it with Power Query, build visuals, add DAX metrics, make reports interactive, and publish them for use.
* Emphasize that effective reporting depends on both correct underlying data logic and clear report design.
* Bridge the chapter back to the course theme that well-structured databases only create value when people can understand and act on the outputs.

## Let's Build

The Chapter 14 Let's Build section should guide students through building a multi-page Power BI dashboard from the GRADECENTER database or its export. The sequence should cover connecting to the grading data, checking the model relationships, cleaning the data in Power Query, creating measures such as average score and pass rate, building separate report pages for course and student views, and optionally publishing the `.pbix` file to the Power BI Service. The practical emphasis should stay on turning relational data into interactive managerial dashboards that answer real academic performance questions.

## Lab

The Chapter 14 lab should ask students to build a student performance dashboard in Power BI by connecting to the provided grading data, validating relationships, cleaning fields, creating at least one DAX measure, designing multiple visuals, and using slicers to support interactive filtering. The deliverables should remain concrete and tool-focused: screenshots of the data model and report pages, plus the completed `.pbix` file. The work should emphasize report usability, correct measures, and presentation quality rather than SQL authoring alone.
