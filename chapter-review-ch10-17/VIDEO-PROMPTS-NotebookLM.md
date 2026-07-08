# Chapter Overview Video Prompts — NotebookLM (Chapters 11–17)

_For generating chapter overview videos to replace the `> **Video placeholder:**` lines in each
`index.md`. Chapter 10 already has a video (`kFlSsAMlYTU`) and is the style reference._

## How to use
1. In **NotebookLM**, create (or open) a notebook and add that chapter's source as material — easiest
   is to upload the assembled `Chapter-NN-COMPLETE.md` from this folder (or at minimum the chapter's
   `core-concepts.md` + `index.md`).
2. Choose **Video Overview → Customize**, and paste the chapter's **Customize prompt** below.
3. Keep the shared **house style** (below) consistent across all seven videos.
4. When the video is published, grab its YouTube ID and replace the placeholder in `index.md` using
   the ch10 embed pattern:
   ```html
   <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="Chapter N overview video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

   [Watch the Chapter N overview video](https://www.youtube.com/watch?v=VIDEO_ID)
   ```

## House style (applies to every chapter — prepend or keep in mind for each)
- **Audience:** undergraduate business students in an intro MIS / database course (BITM 330). Most are
  not programmers; several will become managers, analysts, or product owners, not DBAs.
- **Length:** 4–6 minutes.
- **Tone:** confident, plain-spoken, motivating; explain *why a manager should care* before the *how*.
- **Framing:** anchor everything to the course arc — **Data → Tables → Relationships → Queries →
  Analytics → Decisions** — and to the running **Grading Database** example used throughout the book.
- **Visuals:** clean slides, one idea per slide; diagrams over dense text; label every diagram;
  show short SQL / tool screenshots only when they illustrate a concept, not as walls of code.
- **Structure:** (1) hook — a real business problem, (2) the chapter's core idea, (3) a quick tour of
  the main sections, (4) one worked mini-example, (5) what to be able to do after the chapter.
- **Avoid:** reading the chapter aloud, jargon without a definition, and covering material from later
  chapters.

---

## Chapter 11 — Database Administration
**Customize prompt:**
> Create a 4–6 minute overview video for undergraduate business students introducing **Database
> Administration**. Open with the guiding question: *once a database is designed and queried, who
> keeps it secure, fast, available, and recoverable?* Contrast **building** a database (design + SQL)
> with **sustaining** one (administration). Cover, in this order: what a DBA does and why it is a role
> of organizational *trust*; data administration vs. database administration; the data-professional
> career ecosystem (DBA, data engineer, architect, analyst); the core responsibilities — **security &
> access management, concurrency control, transactions & ACID, backup & recovery, performance
> monitoring, and maintenance/evolution**; and how these look across Access, SQLite, PostgreSQL, and
> Supabase. Include one concrete scenario (a gradebook crash recovered from backup + transaction log).
> Use labeled diagrams for the lost-update concurrency problem and the ACID properties. End with the
> mindset shift: a DBA protects decisions, not just data. Keep it practical for future managers.

## Chapter 12 — Business Intelligence and Analytics
**Customize prompt:**
> Create a 4–6 minute overview video introducing **Business Intelligence (BI) and Analytics for
> performance improvement**, for business students who now know SQL and database design. Start with
> the payoff: BI is where a database becomes useful to managers. Cover: BI fundamentals and BI as
> decision support (tie to the DIKW hierarchy from Ch.2); **operational (OLTP) vs. analytical (OLAP)
> systems** and why you don't run heavy reports on a live transactional database; **ETL/ELT** pipelines;
> **data warehouses, data marts, and data lakes**; **dimensional modeling** — facts, dimensions,
> measures, and the **star schema**; **OLAP operations** (slice, dice, drill-down, roll-up, pivot);
> SQL as a BI tool; dashboards, reports, and **KPIs / the Balanced Scorecard**; and BI governance and
> data quality. Use the **Grading Database** as the running example (e.g., a star schema for grades).
> Favor one clear star-schema diagram and one OLTP-vs-OLAP comparison. End on how BI closes the
> data-to-decision loop.

## Chapter 13 — Advanced Database Techniques
**Customize prompt:**
> Create a 4–6 minute overview video on **Advanced Database Techniques** for business students who can
> already design and query databases. Frame it as: correctness is only the beginning — real systems
> must survive real use ("database hardening"). Cover: **indexes** and why performance problems appear
> late (fast at 100 rows, unusable at 100,000) and the read/write trade-off; **transactions** for
> protecting multi-step operations; **constraints beyond primary keys** (foreign keys, unique, check,
> not-null); **triggers** for automated responses; a short note on **window functions**; **advanced
> analytics patterns**; **security and permissions**; and how these differ across platforms, including
> **macros in Microsoft Access** and **stored procedures / functions**. Apply everything to hardening
> the **Grading Database**. Use a "book index" analogy for database indexes with a simple diagram.
> End with the reliability mindset that separates a working database from a production-ready one.

## Chapter 14 — Power BI: Data Visualization and Business Reporting
**Customize prompt:**
> Create a 4–6 minute overview video introducing **Microsoft Power BI** as the tool that turns database
> output into visual business reports, for a non-technical managerial audience. Position Power BI as
> the final layer of the pipeline that started with SQL and the Grading Database. Cover: **connecting
> to data sources** (Access, Excel, SQL); **Power Query** for cleaning and transforming data; **building
> visualizations** (charts, tables, KPI cards); **DAX** for calculated columns and measures (keep it
> conceptual — measure vs. calculated column); **interactive reports** with slicers and filters; and
> **publishing and sharing** via the Power BI Service. Show a sample grading dashboard as the payoff.
> Emphasize designing a report for a manager, not a database expert. Prefer real dashboard visuals and
> one Power Query before/after. End with when to reach for Power BI vs. plain SQL.

## Chapter 15 — Business Strategy and Information Systems
**Customize prompt:**
> Create a 4–6 minute overview video connecting **business strategy** to **information systems** and
> everything students learned this semester. Start with the driving question: *how does an information
> system help a business win?* Cover: what strategy is (choice and trade-off; operational effectiveness
> vs. strategic positioning); **information systems as strategic infrastructure**; competitive-advantage
> frameworks — **Porter's Five Forces, the Value Chain, generic strategies, and the Resource-Based
> View**; why **strategy requires analytics** (BI as a strategic feedback loop, the Balanced Scorecard,
> star schemas, a glance at NoSQL); **advanced SQL as a strategic capability**; **strategic alignment**
> (the IS strategy triangle, build vs. buy vs. cloud, three horizons of planning); and the **risks of
> poor information strategy**. Reframe the Grading Database as a strategic system. Use one Five-Forces
> and one Value-Chain diagram. End: technical choices are strategic choices.

## Chapter 16 — Final Review and Course Integration
**Customize prompt:**
> Create a 4–6 minute review video that integrates the whole course and prepares students for the two
> final assessments. Retrace the arc — **raw data → tables → relationships → SQL queries → analytics →
> decisions** — showing how each chapter contributed. Then orient students to: the **Final Project**
> (completing and documenting their own **Grading Database in Microsoft Access**) with common pitfalls;
> and the **Final Test** on a separate **Research Publications database**, including the weighted
> publication-scoring logic, the core test-query patterns to practice, a question-to-chapter map, a
> study strategy, and a submission/quality checklist. Keep it encouraging and concrete — a study guide
> in video form. Use one course-arc timeline graphic. End with a confidence-building reflection on how
> far students have come since Chapter 1.

## Chapter 17 — Designing Systems That Matter (Conclusion)
**Customize prompt:**
> Create a 4–6 minute closing video for the course, shifting from competency to **responsibility**.
> Its message: databases are about people and decisions, not just technology. Cover: the **ethical
> dimensions** of data systems (privacy, accuracy, access, consequences of bad data); the **manager's
> role** in system-design decisions even without writing code; **course integration** — how every
> chapter connects data to decisions; **professional practice** (how to talk about these skills in an
> interview); and **continuing development** (certifications, tools, and resources for lifelong
> learning). Warm, reflective, forward-looking tone. Minimal diagrams; let the ideas and a few strong
> images carry it. End by sending students forward with clarity about what they know, what it means,
> and how to keep growing.
