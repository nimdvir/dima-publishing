<!-- metadata: date="2026-06-11"; chapter="12"; section="terms"; title="Chapter 12 Terms Treasury"; description="Key terms for business intelligence" -->

# Chapter 12: Business Intelligence — Term Treasury

---

## Essential Vocabulary

### A

- **Aggregation** — The process of combining multiple data values into a summary measure such as a sum, average, or count.

### B

- **Business Intelligence (BI)** — The concepts, architectures, tools, and practices that enable organizations to analyze data for decision support.

### C

- **Cognitive Load** — The burden placed on attention and working memory when interpreting large result sets; a key reason visualization is needed.

### D

- **Dashboard** — An interactive visual interface combining multiple BI outputs (charts, KPIs, tables) into a single decision surface.
- **Data Governance** — Organizational policies, roles, and processes ensuring data remains trustworthy and consistently interpreted across BI outputs.
- **Data Lake** — A storage repository holding raw data in its native format until needed for analysis; complements data warehouses.
- **Data Lineage** — Documentation of where data originated, how it was transformed, and how it flows through the BI pipeline.
- **Data Mart** — A focused analytical store designed for a specific department or business function.
- **Data Mining** — Discovering patterns, correlations, and anomalies in large datasets using statistical and machine learning techniques.
- **Data Quality Decay** — The accumulation of errors over time in BI systems without systematic detection and correction.
- **Data Silo** — An isolated store of data not coordinated with other organizational data, creating potential inconsistency.
- **Data Steward** — An individual responsible for data quality within a specific domain (e.g., grading data, enrollment data).
- **Data Warehouse** — A centralized repository for analysis and decision support; subject-oriented, integrated, time-variant, and non-volatile.
- **Decision Latency** — The delay between when data is available and when it reaches decision-makers in actionable form.
- **Decision Support** — Using analytical systems and outputs to help managers make informed, evidence-based decisions.
- **Definition Drift** — When the meaning of terms (e.g., "active student," "passing grade") varies across reports or time without governance.
- **Denormalization** — The deliberate introduction of redundancy into analytical schemas to improve query performance and simplify reporting.
- **Descriptors** — Descriptive attributes in dimensional models used for filtering and grouping (e.g., StudentName, DeliverableType).
- **Dice** — An OLAP operation selecting specific values from multiple dimensions simultaneously.
- **DIKW Hierarchy** — Data → Information → Knowledge → Wisdom; a framework for understanding how raw facts become actionable insight.
- **Dimension Table** — A table in a star schema providing context for facts, describing who, what, when, or where.
- **Dimensional Modeling** — A design approach organizing data into facts and dimensions for clarity and performance.
- **Dimensions** — Contextual attributes providing the who, what, when, and where for measured facts.
- **Drill-Down** — An OLAP operation moving from a summary level to more detailed data.

### E

- **ELT (Extract, Load, Transform)** — A variant of ETL where raw data is loaded first and transformed inside the target system.
- **Enterprise Data Warehouse (EDW)** — An organization-wide data warehouse integrating data across all departments.
- **ETL (Extract, Transform, Load)** — The process of pulling data from source systems, cleaning and reshaping it, and loading it into analytical structures.

### F

- **Fact Table** — The central table in a star schema containing numeric measures and foreign keys to dimension tables.
- **Facts** — Measurable events in a dimensional model (e.g., a student's score on a deliverable).

### K

- **KPI (Key Performance Indicator)** — A quantifiable metric used to evaluate performance against targets or benchmarks.

### M

- **Measures** — Numeric values in a fact table used for calculations and analysis (e.g., Score, AttendanceCount).
- **Metadata** — Data about data; in BI, describes field meanings, data sources, transformation rules, and data lineage.
- **Metric Proliferation** — A governance problem where different departments create conflicting versions of the same KPI.

### O

- **OLAP (Online Analytical Processing)** — Systems and techniques optimized for complex, multi-dimensional analytical queries.
- **OLTP (Online Transaction Processing)** — Systems optimized for recording and managing individual business transactions.

### P

- **Pattern Blindness** — The inability to see trends, outliers, and distributions when data is presented only in tabular form.
- **Pivot** — An OLAP operation rotating the analytical perspective by swapping dimensions on rows and columns.
- **Predictive Analytics** — Using statistical models and machine learning to anticipate future outcomes from historical data.

### R

- **READ Model** — Representation, Evaluation, Action/Decision, Deployment; a framework for understanding BI.
- **Referential Integrity** — A database constraint ensuring FK relationships remain valid; important for clean analytical results.
- **Report** — A structured BI output, often tabular, presenting summarized data for monitoring and comparison.
- **Roll-Up** — An OLAP operation moving from detailed data to a higher-level summary.
- **Row-Level Security (RLS)** — A database security mechanism restricting data access at the row level based on user roles.

### S

- **Schema-on-Read** — An approach where data structure is defined at query time (typical of data lakes).
- **Schema-on-Write** — An approach where data structure is defined before loading (typical of data warehouses).
- **Self-Service BI** — Tools and platforms allowing business users to create reports and dashboards without writing SQL.
- **Sensemaking** — The cognitive process by which humans interpret data patterns; supported by visualization.
- **Slice** — An OLAP operation selecting a single value from one dimension to filter the data.
- **Snowflake Schema** — A dimensional schema where dimension tables are further normalized into sub-tables.
- **Star Schema** — A dimensional schema with a central fact table surrounded by denormalized dimension tables.

### T

- **Transaction Processing System (TPS)** — A system designed for daily operations by processing many small reads and writes.

### V

- **View** — A saved SQL query acting as a virtual table; commonly used in BI for reusable analytical logic.

---

## Acronyms

| Acronym | Full Meaning |
|---------|-------------|
| **3NF** | Third Normal Form |
| **API** | Application Programming Interface |
| **BI** | Business Intelligence |
| **DIKW** | Data, Information, Knowledge, Wisdom |
| **EDW** | Enterprise Data Warehouse |
| **ELT** | Extract, Load, Transform |
| **ETL** | Extract, Transform, Load |
| **FK** | Foreign Key |
| **KPI** | Key Performance Indicator |
| **OLAP** | Online Analytical Processing |
| **OLTP** | Online Transaction Processing |
| **PK** | Primary Key |
| **READ** | Representation, Evaluation, Action/Decision, Deployment |
| **RLS** | Row-Level Security |
| **SDLC** | Systems Development Life Cycle |
| **SQL** | Structured Query Language |
| **TPS** | Transaction Processing System |

---

## Key Concepts

### Foundational Ideas

1. **BI as Decision-Support, Not Transaction Processing** — BI transforms operational data into insight, evaluation, and informed action. Operational databases record individual events; BI systems analyze patterns, trends, and performance.

2. **DIKW Hierarchy** — Data = raw facts (individual grades). Information = summarized data (average grades). Knowledge = interpreted patterns (which assessments predict success). Wisdom = judgment and action (redesigning assessments). BI sits between Information and Knowledge.

3. **READ Model** — Data is collected and structured (Representation), analyzed (Evaluation), interpreted for decisions (Action/Decision), and those actions are carried out (Deployment). BI bridges storage and insight.

4. **Separation of Operational and Analytical Systems** — OLTP: fast inserts/updates, transactional integrity, normalized schemas. OLAP: complex queries, historical comparison, denormalized schemas. Mixing the two degrades both.

5. **Trust as the Foundation of BI** — If ETL processes are poorly designed, reports conflict, metrics lose credibility, and users stop trusting the system.

6. **BI as a Managerial Capability** — BI is an organizational capability, not just a technical one. Managers rely on BI to monitor performance, identify trends, compare outcomes, and support planning.

7. **BI Exists on a Spectrum** — From simple reporting (filtering, grouping, summarizing) to advanced analytics (data mining, predictive models, machine learning).

### Concept Overview

1. **Data Warehouse Architecture** — Centralized repository defined by four properties: subject-oriented, integrated, time-variant, non-volatile. Based on Bill Inmon's foundational work.

2. **EDW vs. Data Marts** — EDW serves the entire organization (single version of truth, higher cost). Data Marts focus on one department (faster to build, risk of silos). Many use a hybrid approach.

3. **Data Lakes** — Store raw data in native format. Use schema-on-read vs. data warehouses' schema-on-write. Complement but do not replace data warehouses.

4. **ETL Process** — Extract (pull from sources), Transform (clean, standardize, validate, reshape — where most intellectual work happens), Load (insert into analytical structures).

5. **ELT Process** — Raw data loaded first, then transformed inside the target system using SQL or processing engines. Favored by modern cloud warehouses (Snowflake, BigQuery, Redshift).

6. **Common ETL Transformations** — Data cleaning/validation, code translation/standardization, aggregation, derived attributes, time-based transformations.

7. **OLAP vs. OLTP** — OLTP: row-level queries, current data, normalized. OLAP: aggregated queries, historical trends, denormalized.

8. **Dimensional Modeling** — Facts (measurable events) + Dimensions (context) + Measures (numeric values) + Descriptors (filtering attributes).

9. **Star Schema** — Fact table at center with FK + measures. Dimension tables radiate outward. Intentionally denormalized for performance.

10. **Snowflake Schema** — Dimension tables further normalized into sub-tables. Saves storage but increases query complexity.

11. **OLAP Operations** — Slice (filter one dimension), Dice (filter multiple dimensions), Drill-Down (summary → detail), Roll-Up (detail → summary), Pivot (rotate dimensions).

12. **Metadata** — Defines field meanings, documents sources, tracks transformation rules, supports governance and auditing.

13. **Data Visualization** — SQL results are necessary but not sufficient. Visualization bridges the gap by compressing complexity, highlighting change, and making exceptions visible.

14. **BI Output Types** — Standard Reports (static/tabular), Interactive Dashboards (linked visualizations), KPIs (single-number signals with trend indicators).

15. **Effective BI Reporting** — Accuracy (correct logic, clean data), Timeliness (arrives when decisions are being made), Consistency (same metric = same meaning), Interpretability (clear without explanation).

16. **BI Governance** — Prevents metric proliferation, definition drift, data quality decay, and security gaps. Key practices: central metric definitions, data stewards, access control, pipeline auditing.

17. **Self-Service BI** — Power BI, Tableau, Looker allow business users to build reports without SQL. Challenge: balancing accessibility and consistency.

18. **Choosing Visualizations** — Bar charts (comparison), line charts (trends), pie/stacked bar (part-to-whole), histograms/box plots (distribution), scatter plots (relationships), KPI cards/gauges (status).

### Application in Practice

1. **ETL as Trust-Building** — ETL encodes business rules explicitly, applies them consistently, and makes data quality visible and auditable.

2. **Analytical Views in SQL** — Views serve as Transform+Load steps via SQL. Example: `GradeAnalytics` view joins STUDENT, STUDENT_GRADE, and DELIVERABLE into a flat analytical dataset.

3. **Building Star Schemas** — Create dimension tables (DIM_TIME, DIM_STUDENT, DIM_DELIVERABLE, DIM_GRADE_SCALE) and a central fact table (FACT_GRADES) with FK and measures. Populate via `INSERT...SELECT`.

4. **KPI Development** — Pass rate: `COUNT(CASE WHEN Score >= 60 THEN 1 END) * 100.0 / COUNT(*)`. Also: average class score trends, missing submission counts.

5. **Dashboard Design Principles** — Combine filters, linked charts, and summary metrics. Use views for identical logic. Rule: if a stakeholder needs a verbal explanation, the chart needs redesign.

6. **BI Governance Practices** — Shared glossary, data stewards, role-based access on analytics, ETL review, version control for report logic.

7. **Multi-Platform BI** — Same analytical questions, ETL principles, and reporting objectives apply regardless of platform. Pipeline: Design → Normalize → Query → Analyze → Report → Decide.

### Real-World Examples

1. **Grading Database as BI Case Study** — Operational tables reinterpreted analytically: grades become measures, students and deliverables become dimensions, time becomes a comparison axis. Outputs: average grade per student, performance by type, attendance correlation, trend analysis, at-risk identification.

2. **Microsoft Access for BI** — Visual query design, Report Wizard, charts, dashboard forms via Navigation Form. Exportable to Excel and Power BI.

3. **SQLite for BI** — Local analytical sandbox. SQL-based ETL using views. OLAP-style queries via `strftime()`. Simulated star schema. Teaches transferable SQL skills.

4. **Supabase (PostgreSQL) for BI** — Cloud-hosted with enterprise SQL. Views as reporting layers. Row-Level Security for secure analytics. Connection-ready for Power BI, Tableau, Looker via PostgreSQL connector. Uses `TO_CHAR()` for dates.

5. **Enterprise BI Tools** — Microsoft Power BI (DirectQuery, slicers, trends), Tableau (interactive exploration), Google Looker Studio (cloud dashboarding), Snowflake/BigQuery/Redshift (cloud data warehouses favoring ELT).

6. **Educational BI Scenarios** — Average grade per deliverable, attendance rates, letter grade distribution, performance trends, at-risk identification (AvgScore < 70), attendance–grade correlation, deliverable type comparison.
