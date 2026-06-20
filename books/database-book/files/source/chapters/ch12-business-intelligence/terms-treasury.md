# Chapter 12: Terms Treasury

# Key Concepts

## Foundational Ideas

- Business Intelligence transforms operational data into decision-support insight.
- Operational systems record events; analytical systems evaluate patterns.
- BI depends on reliable databases, but it also requires transformation, context, and governance.
- ETL and ELT convert raw operational records into analytics-ready structures.
- Data warehouses are subject-oriented, integrated, time-variant, and non-volatile.
- Data marts provide focused analytical stores for departments or functions.
- Data lakes preserve raw data for exploration and data science.

## Analytical Design

- Dimensional modeling organizes data into facts and dimensions.
- Measures are numeric values used for calculation; descriptors provide context.
- Star schemas place fact tables at the center and dimension tables around them.
- Analytical denormalization is deliberate and controlled, not careless design.
- OLAP operations include slice, dice, drill-down, roll-up, and pivot.

## Application in Practice

- SQL views can act as BI layers over normalized operational tables.
- Dashboards should be built on tested queries and consistent metric definitions.
- KPIs are useful only when connected to goals, targets, and action.
- The Balanced Scorecard prevents organizations from relying on one narrow metric.
- BI governance ensures metric consistency, access control, stewardship, and trust.

---

# Key Terms

| Term | Definition |
|---|---|
| Aggregation | Combining many values into a summary such as count, sum, or average |
| Balanced Scorecard | A performance management framework that organizes metrics across multiple perspectives |
| Business Intelligence (BI) | Concepts, tools, and practices that transform data into decision-support insight |
| Dashboard | An interactive visual interface that presents BI outputs such as charts, filters, and KPIs |
| Data Lake | Repository that stores raw data in its native format for exploration and analysis |
| Data Mart | Focused analytical store designed for a specific department or function |
| Data Steward | Person responsible for data meaning, quality, and appropriate use in a domain |
| Data Warehouse | Centralized analytical repository designed for reporting and decision support |
| Dimension | Analytical context that describes facts, such as student, time, or deliverable |
| Dimensional Modeling | Analytical design approach based on facts and dimensions |
| Drill-down | OLAP operation that moves from summary to more detailed data |
| ELT | Extract, Load, Transform; loading raw data first and transforming it in the target system |
| ETL | Extract, Transform, Load; moving and preparing data for analytical use |
| Fact Table | Central table in a dimensional model containing measures and foreign keys to dimensions |
| KPI | Key Performance Indicator; measurable signal used to evaluate progress toward a goal |
| Measure | Numeric value used in analysis, such as score, count, or percentage |
| Metadata | Data about data, including definitions, sources, refresh schedules, and lineage |
| OLAP | Online Analytical Processing; systems and methods for multidimensional analysis |
| OLTP | Online Transaction Processing; systems optimized for recording transactions |
| Pivot | OLAP operation that rotates the analytical perspective |
| RFM Analysis | Marketing technique that ranks customers by Recency, Frequency, and Monetary value of transactions |
| Roll-up | OLAP operation that moves from detail to summary |
| Slice | OLAP operation that filters one dimension to one value |
| Star Schema | Dimensional schema with a central fact table surrounded by dimension tables |

# Acronyms and Abbreviations

| Acronym | Full Form |
|---|---|
| BI | Business Intelligence |
| DIKW | Data, Information, Knowledge, Wisdom |
| EDW | Enterprise Data Warehouse |
| ELT | Extract, Load, Transform |
| ETL | Extract, Transform, Load |
| KPI | Key Performance Indicator |
| OLAP | Online Analytical Processing |
| OLTP | Online Transaction Processing |
| R.E.A.D. | Represent, Express, Analyze, Decide |
| RFM | Recency, Frequency, Monetary |
