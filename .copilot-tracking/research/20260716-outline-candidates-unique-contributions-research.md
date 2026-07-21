<!-- markdownlint-disable-file -->

# Task Research Notes: Book Outline Candidates — Unique Chapter Contributions

**Research date:** 2026-07-16
**Scope:** 12 outline candidate files scanned for unique per-chapter additions vs. the DeepSeek blueprint baseline

---

## Research Executed

### File Analysis

All 12 files read in full. The 12 files fall into three natural families:

**Family A — Early source-derived outlines (June 2026):**
- `outline-2026-06-05.md` — Derived from actual chapter H2/H3 headings as of June 5. 17-chapter structure. Very detailed subsection listings.
- `outline-2026-06-12.md` — Updated version of June 5. Fixed CH9/CH10 ordering (Design first, then Advanced SQL).

**Family B — The decision chain (July 2026):**
- `outline-DeepSeek-2026-07-07.md` — DeepSeek review recommending 16-chapter structure with three strategy-preservation revisions. Key decision document.
- `outline-final-chatgpt-7-10-26.md` — ChatGPT final decision pass. Locked titles, six-file chapter-package rule. Confirmed the 16-chapter structure and rejected 10-11 chapter compression.

**Family C — Convergent per-model finals (July 2026):**
- `BITM330-book-final-outline-2026-07-08-claude.md` (v1) — First Claude working outline with migration map, content-gap restorations.
- `BITM330-book-outline-FINAL-2026-07-09-claude.md` (v2) — Added five-AI-review synthesis, Part 0 changelog, adopted ideas from GPT/DeepSeek/GLM.
- `BITM330-book-outline-UNIFIED-FINAL-2026-07-10-claude.md` — Merged ChatGPT decision + Claude v2 detail into chapter-package format.
- `BITM330-book-outline-FINAL-2026-07-10-gpt56.md` — GPT's governance-focused draft: dependencies, scope boundary, acceptance criteria, companion alignment rules.
- `BITM330-book-outline-MASTER-2026-07-10.md` — **CURRENT CANONICAL.** Merges UNIFIED-FINAL + gpt56. Locked title set, chapter-package rule, companion alignment rules, back-half logic.
- `BITM330-book-outline-FINAL-2026-07-11-claude-v3.md` — v3 with expanded Lucidchart walkthrough (§10), CH10 platform strategy, CH12 Three Reporting Tiers.
- `BITM330-book-outline-FINAL-2026-07-11-claude.md` — Same content as v3 (appears to be a duplicate or near-duplicate).

### Convergence Analysis

All 12 files converge on the same 16-chapter structure. The June files use an older 17-chapter numbering but contain the same pedagogical DNA. The July files are highly convergent — differences are in presentation format (table-of-contents vs. chapter-package vs. governance-focused), not in substantive chapter content.

---

## Key Discoveries

### Book-Level Architecture Decisions (Across All Files)

All July files agree on these architectural decisions:
1. **16-chapter structure** is locked.
2. **CH1–CH8 stable** — retrofit edits only, no mid-semester renumbering.
3. **CH9 is the design pivot** — students shift from using databases to creating them.
4. **Back-half logic**: Design → Query → Administer → Visualize → Decide → Modern Infrastructure → Prove → Translate to Career.
5. **Strategy lives in CH13** (explicit home) with capstone in CH16.
6. **DIKW is canonical in CH2** — CH13 and CH16 only callback, never re-teach.
7. **CH11 merges** old CH11 (Administration) + old CH13 (Advanced Techniques) into two parts.
8. **CH12 merges** old CH12 (BI) + old CH14 (Power BI).
9. **CH12 title uses "Reporting"** not "Dashboards" (per July 10 decision).
10. **Six-file chapter package** is the invariant: core-concepts, lets-build, review-questions, terms-treasury, rat, lab-questions.

### Content-Gap Restorations (Identified by July 8 Claude v1, preserved in all later files)

| Content | Final Home | Notes |
|---------|-----------|-------|
| Date/time queries | CH10 | Restored from old CH10.7 |
| Weighted grades + policy tables | CH10 | Restored from old CH10.8 |
| Window functions | CH10 ★ stretch | Optional, PostgreSQL/SQLite only |
| ETL, dimensional modeling | CH12 + CH14 | Compact in CH12, scale in CH14 |
| Research Publications final test | CH15 Part B | Restored — proposal had dropped it |

---

## Per-File Unique Contributions

### FILE 1: `outline-2026-06-05.md` (June 5, 2026)

**Type:** Source-derived detailed outline (17-chapter structure). Derived from actual chapter H2/H3 headings.

**UNIQUE additions not in baseline:**

- **CH01:** "Why This Book Exists" section; "What Makes This Book Different" (contrast with traditional textbooks); "The Digital Companion" section; "About the Author" section; "What Comes Next" bridge section; explicit "Key Concepts" bulleted recap; explicit "Figures Index" at chapter end.
- **CH02:** "Framing the Course Title" section; "Why Foundations Matter"; "Why Data Alone Is Not Enough" subsection; "Efficiency, Effectiveness, and KPIs" with explicit distinction; "The Data-to-Performance Chain"; "Management as Decision-Making"; "Information Systems vs. Information Technology" explicit distinction; "The Five-Component Framework" (hardware, software, data, people, processes); "Strategic Alignment" and "Governance and Accountability" as separate subsections; "Apply the Concepts" end-of-chapter exercises; "Figures Index".
- **CH03:** "Data, Meaning, and Context" section; "Classifying Data" with Qualitative/Quantitative + Categorical/Numerical subdivisions; "Representing Data in Structured Systems" with measurement scales (nominal, ordinal, interval, ratio); "Plain text and binary forms"; "Data Governance" as separate subsection; "Data Lifecycle" (creation → storage → use → archival → deletion); "Ethics, Privacy, and Security"; "Big Data and the Digital Age" with 4 Vs.
- **CH04:** "Why Databases Matter" framing; "From Spreadsheets to File Silos" narrative; "Anomalies in Flat Tables" (introduced here in CH04, not CH07); "The Database Approach" as solution framing; "Rows, Columns, and Table Rules" explanation; "SQL and Platforms as the Next Step" with platform survey; explicit "Figures Index".
- **CH05:** MUCH more detailed than baseline — **six parts** (not just subsections): Part 1 (SQL Foundations and Tools), Part 2 (Teaching Dataset — GRADEBOOK + GRADE_WEIGHT), Part 3 (Creating Tables/Inserting Data — CREATE TABLE, ALTER TABLE, INSERT INTO), Part 4 (Querying with SELECT — DISTINCT, NULL, LIKE/BETWEEN/IN, aliases, dates, step-by-step query building), Part 5 (First Look at Joins — single INNER JOIN), Part 6 (Aggregation — COUNT/SUM/AVG/MIN/MAX, GROUP BY, HAVING, calculated columns, weighted contribution, text/date expressions, CASE, complete student summary). Also: "SQL Is Declarative" explanation; DDL/DML/DQL/TCL four-category breakdown; "Appendix: Applying to Grading Database" with Access-compatible INSERT, side-by-side age calculation, Access vs SQLite syntax comparison, DB Browser vs CLI comparison.
- **CH06:** Much more detailed: "Why One Big Table Fails" with flat GRADE_FLAT demonstration; "The Flat-Table Temptation"; detailed five-stage Grading Database redesign progression; "Properties of a Formal Relation" (no duplicate rows, no row ordering, one value per cell); key-type deep-dive with candidate/composite/natural/surrogate keys and comparison table; "Integrity Rules" with entity integrity, referential integrity, cascade update/delete; "Querying a Relational Design with Joins" as practical payoff (basic scores, assignment rules, weighted contribution, attendance summary, finding missing grades); join types comparison table; "Microsoft Access as a Visual Learning Tool" section with Relationships window, datasheet view, design view, QBE-to-SQL inspection.
- **CH07:** More detailed decomposition: "The Problem: Flat Tables Feel Convenient"; explicit "Functional Dependencies in the Grading Database" mapping; "The Design Rule" (one subject per table); 2NF violation → junction table appearance; "Normalization and Analytics" with worked examples (student averages, weighted contribution, missing grades); "Denormalization" with explicit examples (data warehouses, reporting tables, cached aggregates) and risk tradeoff.
- **CH08:** "Midterm Review — Concepts" (not "Integration Studio"); includes actual "Midterm Test Question Set" and "Midterm Project Instructions"; "How the Test and Project Work Together"; "Readiness Checklist" self-assessment tool.
- **CH09:** (June 5 numbering = Advanced SQL) Essentially what became CH10 in the final structure. Contains detailed SQL subsections not in any July outline: "Four Questions Before Writing an Advanced Query" systematic approach; "Grading Database Refresher" with core tables and relational pathways; detailed diagnostic queries (repeated details, conflicting emails, inconsistent definitions, duplicate grades, out-of-range values, orphaned records); advanced join patterns with complete gradebook, assignment-type rules, missing grades via CROSS JOIN+LEFT JOIN, deliverables with no submissions; cleaning functions with Access vs portable SQL comparison, COALESCE/NZ, IIF/CASE, TRIM/UPPER/LOWER; analytical aggregation with 8+ worked examples; date function reference comparison table; weighted grades with CTE, missing categories, grade scale join; window functions with GROUP BY comparison, OVER(), RANK/ROW_NUMBER, running total, moving average, platform notes; reusable pipelines with views vs CTEs vs subqueries vs EXISTS vs UNION decision guide; safe UPDATE/DELETE with dangerous patterns; integrated "At-Risk Student Report" capstone.
- **CH10:** (June 5 numbering = Design and ER Modeling) What became CH09. Detailed treatment: "From Querying Data to Designing Systems" with user-to-designer shift; SDLC phases from database perspective; "Specialization and Generalization" (subtype/supertype hierarchies) with mapping options; "Strengths and Limits of ER Modeling" with alternatives (UML, data flow diagrams, dimensional modeling); "Design vs. Implementation" distinction section.

**Book-level notes:** Uses "Key Concepts" bulleted recaps and "Figures Index" per chapter. Has explicit "Apply the Concepts" exercises in CH02. More textbook-traditional formatting.

---

### FILE 2: `outline-2026-06-12.md` (June 12, 2026)

**Type:** Updated source-derived outline. Key difference from June 5: CH09 and CH10 renumbered (Design first → CH09, Advanced SQL → CH10).

**UNIQUE additions (beyond what June 5 already contributed):**

- **CH01:** Added "Why the Book Is Sequenced This Way" — a chapter-by-chapter mapping table with topic focus → cognitive goals.
- **CH04:** Expanded "Microsoft Access as Your First Database Environment" with four core objects (tables, queries, forms, reports), Datasheet View vs Design View, QBE editor, Access-vs-Excel distinction. Added full "Getting Hands-On with Microsoft Access" walkthrough: GymMembership scenario with step-by-step (blank database, Members table with AutoNumber PK, Payments table with FK, relationships with referential integrity), sorting/filtering mechanics, Backup/Compact and Repair utilities, data entry/edit/delete mechanics.
- **CH09:** (Now Design) Renumbered to 9.x from 10.x; identical content otherwise.
- **CH10:** (Now Advanced SQL) Renumbered to 10.x from 9.x; identical content otherwise.

**Book-level notes:** The CH9/CH10 swap fixes the pedagogical arc. The Access hands-on walkthrough in CH04 is the most detailed tool-instruction content in any candidate.

---

### FILE 3: `outline-DeepSeek-2026-07-07.md` (July 7, 2026)

**Type:** AI model review and recommendation. Not a full outline — a decision document with chapter-level headings.

**UNIQUE additions not in baseline:**

- **CH01:** Explicitly includes "What This Course Teaches (and what it deliberately doesn't)" — the "deliberately doesn't" framing is unique.
- **CH03:** Explicitly adds "Tokens, Storage, Processing, and Cost" as §3.8 — this is the only outline that names this subsection. The MASTER outline flags this as an "open decision, not yet adopted."
- **CH05:** Shorter list (10 subsections vs baseline's 11+). Omits the "DDL and DML Terminology" box that later outlines add.
- **CH08:** "Preparing for the Second Half" instead of "Bridge to the Second Half."
- **CH09:** §9.6 "Reading Relationships in Plain English" as a dedicated subsection (structural templates like "Each STUDENT may submit many GRADES.") — this is more explicit than the baseline.
- **CH11:** Names the two parts "Protecting the Database" / "Making the Database Work Harder" — these part names were adopted by ALL subsequent outlines.
- **CH13:** Named strategy frameworks: "cost leadership vs. differentiation, Walmart vs. Nordstrom style contrasts, McNamara fallacy"; memo structure gains "Strategic Alignment" line; Lab 13 must reference one strategic goal.
- **CH14:** Adds "What Modern Data Professionals Actually Do" with day-in-the-life sketches.
- **CH16:** Explicit "Resume and Interview Translation" section; "Portfolio Summary" concept.

**Book-level notes:** This is the origin of several adopted ideas: CH11 part names, CH13 strategy frameworks, master glossary, standardized chapter endings, DDL/DML terminology. Identifies the four content-gap restorations. Rejects the 10-11 chapter compression. First document to articulate "AI earned, not decorative."

---

### FILE 4: `BITM330-book-final-outline-2026-07-08-claude.md` (July 8, 2026)

**Type:** First Claude working outline (v1). Full chapter-package detail for CH9–CH16.

**UNIQUE additions not in baseline:**

- **Front matter:** Includes explicit front matter plan: copyright, preface ("who this book is for, how it was built, how to use it"), two running projects at a glance.
- **CH01:** "What This Course Teaches (and what it deliberately doesn't)" inherited from DeepSeek.
- **CH05:** Explicitly notes CH5 scope is "foundations only" — pushes join/aggregation depth to CH10: "move any join/aggregation depth forward to CH10."
- **CH07:** Functional dependency moved "before the normal forms — students need the 'why' first." This ordering (FD before 1NF) is unique to the Claude outlines.
- **CH08:** "Bridge: What the Second Half of the Course Builds" — slightly different framing.
- **CH09:** "Entities and Attributes" section warns against "modeling a report as an entity" — a unique teaching point.
- **CH10:** Window functions marked "★ Stretch" — optional. Unique framing: "SQL becomes an analytical instrument. Every section is anchored to a business question, not a syntax feature."
- **CH11:** §12 "Stored Procedures and Database Functions (survey level)" — explicitly marked survey level. Length valve documented: "if overruns, §12 → sidebar."
- **CH12:** §4 "A Taste of Dimensional Thinking: Facts and Dimensions" — explicitly "enough vocabulary for internships without a full modeling unit." §15 "From Visualization to Decision" as bridge to CH13.
- **CH13:** §10 "Risks of Poor Information Strategy" subsection; §12 "From Insight to Action" closing with professional identity framing.
- **CH14:** §14 "What Modern Data Professionals Actually Do" with four day-in-the-life sketches.
- **Chapter migration map:** Full 17→16 conversion table mapping every current chapter to its new home with action (keep, retrofit, moderate rewrite, merge, split). This migration map is unique to this file.

---

### FILE 5: `BITM330-book-outline-FINAL-2026-07-09-claude.md` (July 9, 2026)

**Type:** Claude v2. Adds Part 0 changelog documenting what was adopted/rejected from five AI reviews.

**UNIQUE additions beyond v1:**

- **Part 0 changelog** — explicit tracking table of which idea came from which AI model and where it landed. Rejected ideas with reasons.
- **CH09:** "Production priority" list — six teaching assets to build first. "Chapter 9 Production Advice" from GPT.
- **CH10:** "Required preservation check" — explicit instruction to verify that date/time queries, weighted grades, policy tables, and window functions are present in actual source.
- **CH11:** Part names explicitly credited to DeepSeek.
- **CH12:** "Restructured concept-first (per GPT)": BI fundamentals → architecture → tools. "Worked Example: BI layer for the Grading Database" preserved per GLM. "OLAP in One Page: Slice, Dice, Drill" restored per GLM. "BI governance & data quality" callout per GLM.
- **CH13:** "The Grading Database and PetVax as Strategic Systems" subsection added per GLM.
- **CH14:** ELT and modern pipelines note per GLM. Alternative Let's Build 14 Option B per GLM.
- **Production checklist:** Master glossary, standardized chapter endings, DIKW consolidation pass, DDL/DML terminology box.

---

### FILE 6: `BITM330-book-outline-FINAL-2026-07-10-gpt56.md` (July 10, 2026)

**Type:** GPT's governance-focused draft. Focuses on architecture governance (dependencies, scope boundary, acceptance criteria, companion alignment) rather than deep chapter detail.

**UNIQUE additions not in baseline:**

- **Dependencies section:** Explicitly states what this file depends on and what depends on it.
- **Scope boundary:** Explicitly lists what this file does NOT do (rename folders, merge source files, update routes, import content, deploy reader).
- **Acceptance criteria:** Defines what "done" means for the outline.
- **Companion alignment rules:** Formal rules for how each companion file relates to Core Concepts (Core Concepts explains, Let's Build demonstrates, Lab Questions transfer, RAT measures, Review questions connect, Terms Treasury defines).
- **Standard reader sequence:** Explicitly documents the platform's assembly order.
- **CH03:** Flags the "Tokens, Storage, Processing, and Cost" section as an "open decision (flagged, not yet adopted)."
- **CH12 title:** Explicitly uses "Reporting" not "Dashboards" — documents the decision rationale.

**Book-level notes:** This is the most governance-focused document. Provides the structural rules that the MASTER outline inherits. Less chapter detail than the Claude outlines, more process/architecture rules.

---

### FILE 7: `BITM330-book-outline-UNIFIED-FINAL-2026-07-10-claude.md` (July 10, 2026)

**Type:** Merged ChatGPT decision + Claude v2 detail. Superseded same day by MASTER.

**UNIQUE additions beyond predecessors:**

- **CH01:** "What This Course Teaches (and what it deliberately doesn't)" — the "deliberately doesn't" framing from DeepSeek preserved.
- **CH05:** Explicitly adds "DDL (CREATE/ALTER/DROP) vs. DML (SELECT/INSERT/UPDATE/DELETE)" terminology box as retrofit.
- **CH07:** Functional dependency placed before normal forms (unique Claude convention).
- **CH09:** "Production priority (build these six assets first)" — the numbered asset list.
- **CH12:** "Where BI Data Lives: Operational vs. Analytical Systems" as §3; more compressed dimensional modeling treatment. Title uses "Reporting" per decision.
- **Appendices:** Includes Appendix E (rejected alternatives) and Appendix F (scope boundary) — these appendix references suggest the UNIFIED draft had a richer appendix structure.

---

### FILE 8: `BITM330-book-outline-MASTER-2026-07-10.md` (July 10, 2026)

**Type:** CURRENT CANONICAL. Merges UNIFIED-FINAL + gpt56.

**UNIQUE additions (as the merged canonical):**

- **Companion alignment rules** (from gpt56) — not in baseline chapter files.
- **"Content That Must Not Be Lost" table** — formal preservation list with final homes.
- **"Where Strategy Lives (So It Never Disappears Again)"** — explicit strategy placement rationale chart.
- **"The Back-Half Logic (Lock This Sequence)"** — explicit design→query→administer→visualize→decide→infrastructure→prove→translate sequence documented as locked.
- **CH03:** "Open decision (flagged, not yet adopted): Tokens, Storage, Processing, and Cost" — unique flagging of an unresolved decision.
- **CH05:** "DDL and DML Terminology — retrofit: a short vocabulary box" — explicit retrofit instruction.
- **CH09:** Detailed production priority (7 assets: Grading DB ERD, PetVax ERD, messy business paragraph, spot-the-entity exercise, where-does-FK-go exercise, Mermaid example, in-class mini-lab).
- **CH10:** "Required preservation check" — before finalizing, verify date/time, weighted grades, policy tables, window functions present in source.
- **CH11:** Length valve: if overruns, §13 becomes sidebar, §12 merges into §11.
- **CH12:** Title explicitly uses "Reporting" with rationale note.
- **Production checklist:** Updates CH1 book-flow diagram, update CH8 bridge section, regenerate canonical Grading DB ERD, create PetVax ERD, DIKW consolidation pass, standardize chapter endings, master glossary, DDL/DML box, confirm evaluation form.

---

### FILE 9: `BITM330-book-outline-FINAL-2026-07-11-chatGPT-v1.md` (July 11, 2026)

**Type:** ChatGPT v1 final outline. Structurally very similar to Claude v3 but with some unique elements.

**UNIQUE additions not in baseline:**

- **Lab format convention:** Explicitly documents that Let's Build = Grading Database (guided), Labs = PetVax (independent), each lab = auto-gradable quiz + file upload. "Two intentional exceptions stay on the Grading Database: Lab 8 (midterm checkpoint) and Lab 15 (final project)." This lab convention is most clearly stated here.
- **CH10:** "Restructuring Data with SQL: Executing a Normalization" (§9) — unique subsection that restores a "normalization-by-SQL" activity: flat CSV → normalized tables via CTAS/INSERT...SELECT. Closes the CH7 loop.
- **CH10 Platform strategy:** SQLite primary, Access parallel ("In Access" callout boxes), Supabase deferred to CH14. Rationale documented (CASE, CTAS, window functions all require real SQL; deterministic lab quizzes require canonical petvax.db).
- **CH12:** "Three Reporting Tiers" framework (§9) — Tier 1 (built-in reports/Access), Tier 2 (lightweight/no-code/Notion), Tier 3 (full BI/Power BI). "Coherence rationale" section explains why tools belong together. NotebookLM repositioned as "sidecar" not a fourth tier.
- **Production checklist additions:** "Canonical PetVax dataset: build and version petvax-ch10.db"; "Labs production pass: convert every lab to quiz-questions + file-upload format"; "CH9 Lucidchart asset pass: 11-step screenshot series"; "CH10 'In Access' callout component."
- **CH09:** Expanded Lucidchart walkthrough — 11 numbered steps with detailed sub-steps (setup, shape library, first entity, attributes, keys, remaining entities, relationships, labels, styling, validation checklist, export). The most detailed tool instruction in any outline.

**Book-level notes:** This is the most production-ready outline. Has the clearest platform strategy, lab format specification, and production checklist. The "Three Reporting Tiers" framework is a significant conceptual contribution that solves the CH12 coherence problem.

---

### FILE 10: `BITM330-book-outline-FINAL-2026-07-11-claude-v3.md` (July 11, 2026)

**Type:** Claude v3. Near-identical to the chatGPT-v1 file above. Shares the same changelog, same subsection numbering, same production checklist.

**Differences from chatGPT-v1:** None substantive. These two files appear to be the same outline rendered by two different models from the same v3 specification. The chatGPT-v1 version has slightly more verbose commentary (coherence rationale, platform strategy rationale); the Claude v3 version is slightly more compact but structurally identical.

---

### FILE 11: `BITM330-book-outline-FINAL-2026-07-11-claude.md` (July 11, 2026)

**Type:** Appears to be an exact duplicate of Claude v3. Same changelog, same structure, same subsections. May be a different file path reference to the same content.

**UNIQUE additions:** None beyond what v3 already contains.

---

### FILE 12: `outline-final-chatgpt-7-10-26.md` (July 10, 2026)

**Type:** ChatGPT final decision pass. Not a full outline — a decision document that locks titles and the six-file chapter-package rule. Referenced as "decision authority" by the UNIFIED-FINAL and MASTER outlines.

**UNIQUE additions not in baseline:**

- **Explicit rejection rationale:** Most clearly articulates WHY the 10-11 chapter compression is rejected: "it is a decent textbook outline, but it is not YOUR textbook." Lists specific things it would weaken (running project rhythm, platform structure, weekly teaching cadence, separate labs/Let's Build/RAT/reflection model, distinct payoff of CH13–CH16).
- **"Corrected Final Principle":** Explicitly states "We are changing the chapter sequence and chapter titles, not the internal chapter architecture." Most clearly articulates the two-layer planning approach (Layer 1: chapter position; Layer 2: six required chapter files).
- **"Final Locked Rule Going Forward":** Defines the production format: Purpose/Role → core-concepts subsections → lets-build → review-questions (including reflection questions + personal/professional reflection) → terms-treasury → RAT plan → lab deliverables + grading/checklist logic.
- **CH12 title decision:** Explicitly chooses "Reporting" over "Dashboards" — "Dashboards remain a central CH12 topic. The title does not exclude dashboards; it places them inside the larger reporting and business-intelligence role."
- **Lab format specification:** Most clearly specifies the PetVax transfer model: "Let's Build sections walk through the Grading Database with the reader; Labs are independent practice on PetVax/Vet Clinic."

---

## Summary: Unique Contributions by Chapter

### CH01 — Unique Additions Across All Files
- "Why This Book Exists" (June 5)
- "What Makes This Book Different" — contrast with traditional textbooks (June 5)
- "The Digital Companion" section (June 5)
- "About the Author" section (June 5)
- "Why the Book Is Sequenced This Way" — chapter mapping table (June 12)
- "What This Course Teaches (and what it deliberately doesn't)" (DeepSeek, carried forward)
- "Key Concepts" bulleted recap at chapter end (June 5/12)
- "Figures Index" (June 5/12)
- Front matter plan: copyright, preface, projects-at-a-glance (July 8 Claude)

### CH02 — Unique Additions Across All Files
- "Framing the Course Title" (June 5/12)
- "Why Data Alone Is Not Enough" (June 5/12)
- "Efficiency, Effectiveness, and KPIs" explicit distinction (June 5/12)
- "The Data-to-Performance Chain" (June 5/12)
- "Management as Decision-Making" (June 5/12)
- "IS vs. IT" explicit distinction (June 5/12)
- "The Five-Component Framework" (June 5/12) — hardware, software, data, people, processes
- "Strategic Alignment" and "Governance and Accountability" as separate subsections (June 5/12)
- "Apply the Concepts" exercises (June 5/12)
- DIKW canonical treatment rule — "CH13 and CH16 must reference back here, never re-teach" (ALL July files)

### CH03 — Unique Additions Across All Files
- "Data, Meaning, and Context" (June 5/12)
- "Classifying Data" — Qualitative/Quantitative + Categorical/Numerical subdivisions (June 5/12)
- "Representing Data in Structured Systems" with measurement scales (June 5/12)
- "Plain text and binary forms" (June 5/12)
- "Data Governance" as separate subsection (June 5/12)
- "Data Lifecycle" — creation→storage→use→archival→deletion (June 5/12)
- "Ethics, Privacy, and Security" (June 5/12)
- "Big Data and the Digital Age" with 4 Vs (June 5/12)
- "Tokens, Storage, Processing, and Cost" (DeepSeek, flagged as open decision in MASTER)

### CH04 — Unique Additions Across All Files
- "From Spreadsheets to File Silos" narrative (June 5/12)
- "Anomalies in Flat Tables" introduced in CH04 (June 5/12) — not just CH07
- "The Database Approach" as solution framing (June 5/12)
- "Rows, Columns, and Table Rules" (June 5/12)
- "SQL and Platforms as the Next Step" with platform survey (June 5/12)
- Full "Getting Hands-On with Microsoft Access" walkthrough: GymMembership database with step-by-step instructions, sorting/filtering, Backup/Compact and Repair (June 12)
- Access four core objects (tables, queries, forms, reports), Datasheet View vs Design View, QBE, Access-vs-Excel distinction (June 12)
- Complete Access data types reference table (June 12)

### CH05 — Unique Additions Across All Files
- Six-part structure (Foundations → Dataset → Create → Query → Join → Aggregate) (June 5/12)
- "SQL Is Declarative" explanation (June 5/12)
- DDL/DML/DQL/TCL four-category breakdown (June 5/12)
- Two-table teaching dataset (GRADEBOOK + GRADE_WEIGHT) with explicit rationale (June 5/12)
- Detailed CREATE TABLE/ALTER TABLE/INSERT INTO walkthrough (June 5/12)
- DISTINCT, NULL handling, LIKE/BETWEEN/IN (June 5/12)
- Step-by-step query building demonstration (June 5/12)
- Complete student summary capstone query (June 5/12)
- Appendix with Access-compatible INSERT, side-by-side age calculation, Access vs SQLite comparison, DB Browser vs CLI (June 5/12)
- DDL/DML terminology box (ALL July files)
- Scope note: "foundations only — push join/aggregation depth to CH10" (July 8 Claude)

### CH06 — Unique Additions Across All Files
- "Why One Big Table Fails" with flat GRADE_FLAT demonstration (June 5/12)
- "The Flat-Table Temptation" (June 5/12)
- Five-stage Grading Database redesign progression (June 5/12)
- "Properties of a Formal Relation" (June 5/12)
- Key-type deep-dive: candidate/composite/natural/surrogate with comparison table (June 5/12)
- "Integrity Rules": entity integrity, referential integrity, cascade update/delete (June 5/12)
- "Querying a Relational Design with Joins" as practical payoff section (June 5/12)
- Join types comparison table: INNER/LEFT/RIGHT/FULL OUTER/CROSS (June 5/12)
- "Microsoft Access as a Visual Learning Tool" with Relationships window, QBE-to-SQL inspection (June 5/12)
- "Functional Dependencies and the Bridge to Normalization" (June 5/12)

### CH07 — Unique Additions Across All Files
- "The Problem: Flat Tables Feel Convenient" (June 5/12)
- Explicit "Functional Dependencies in the Grading Database" mapping (June 5/12)
- "The Design Rule" — one subject per table (June 5/12)
- "Normalization and Analytics" with worked examples (June 5/12)
- "Denormalization" with explicit examples and risk tradeoff (June 5/12)
- Functional dependency placed BEFORE normal forms (ALL Claude outlines) — unique ordering
- "Normalization and Forms" — Access data-entry forms as "human face of good structure" (ALL July files)
- "Common Normalization Mistakes" (ALL outlines)

### CH08 — Unique Additions Across All Files
- "Midterm Test Question Set" and "Midterm Project Instructions" included (June 5/12)
- "How the Test and Project Work Together" (June 5/12)
- "Readiness Checklist" self-assessment tool (June 5/12)
- "Bridge to the Second Half" / "Preparing for the Second Half" (ALL July files)
- Retrofit: update bridge section to point at new CH9–CH16 arc (MASTER)
- Lab format exception: Lab 8 stays on Grading Database (chatGPT-v1)

### CH09 — Unique Additions Across All Files
- "Cost-of-change curve" framing with clinic vignette (ALL July files)
- "Business students as requirements translators" (ALL July files)
- "Every sentence hides a table" heuristic (ALL July files)
- "Modeling a report as an entity" — common error warning (July 8 Claude)
- "Reading Relationships in Plain English" — structured templates (DeepSeek)
- Two complete worked ERDs: Grading Database + PetVax/Vet Clinic (GPT, adopted by all July files)
- Advanced ER Concepts right-sized: associative entities, weak entities, recursive relationships — one page each (ALL July files)
- Lucidchart step-by-step 11-step walkthrough with validation checklist (July 11 files — chatGPT-v1 and Claude v3)
- Mermaid erDiagram syntax with symbol-to-crow's-foot translation table (July 11 files)
- Lucidchart vs. Mermaid decision section (July 11 files)
- Five-point ERD validation self-check (July 11 files)
- Lab 9 deliverables table: business rules, entity list, attribute list, ERD, cardinality explanation, relational translation, reflection (GPT, adopted)
- Production priority list: 6→8 assets (MASTER + July 11 files)
- "Specialization and Generalization" with mapping options (June 5/12 only)
- "Strengths and Limits of ER Modeling" with alternatives section (June 5/12 only)
- "Design vs. Implementation" explicit distinction section (June 5/12 only)

### CH10 — Unique Additions Across All Files
- MUCH more SQL detail in June files (see CH09 in June numbering — 12 sections with 50+ subsections)
- "Four Questions Before Writing an Advanced Query" systematic approach (June 5/12)
- Detailed data diagnostics: duplicate identity, conflicting emails, inconsistent definitions, duplicate grades, out-of-range values, orphaned records (June 5/12)
- "Cleaning and Conditional Functions" with Access vs portable SQL comparison (June 5/12)
- Date function reference comparison table across platforms (June 5/12)
- Window functions with GROUP BY comparison, OVER(), RANK/ROW_NUMBER, running total, moving average, platform notes (June 5/12)
- Reusable pipelines decision guide: view vs CTE vs subquery vs EXISTS vs UNION (June 5/12)
- Safe UPDATE/DELETE with dangerous patterns (June 5/12)
- "At-Risk Student Report" integrated capstone (June 5/12)
- "Restructuring Data with SQL: Executing a Normalization" — CTAS/INSERT...SELECT normalization exercise (July 11 chatGPT-v1/Claude v3)
- Platform strategy: SQLite primary, Access parallel ("In Access" callout boxes), Supabase deferred (July 11 files)
- "Required preservation check" — verify date/time, weighted grades, policy tables, window functions in source (MASTER)
- Window functions marked "★ Stretch" — optional (ALL July files)

### CH11 — Unique Additions Across All Files
- Two-part structure: "Protecting the Database" / "Making the Database Work Harder" (DeepSeek, adopted by ALL)
- "Data Administration vs. Database Administration" distinction (ALL July files)
- "Core DBA Responsibilities" — six-job overview mapped to business consequences (ALL July files)
- "Multi-User Databases and Concurrency" with two-TAs-edit-one-grade story (ALL July files)
- "Backup, Recovery, and Business Continuity" with RPO/RTO, 3-2-1 rule, testing restores (ALL July files)
- "Constraints Beyond Primary Keys" — NOT NULL, UNIQUE, CHECK, DEFAULT, FK actions (ALL July files)
- "Views as Security and Reporting Layers" (ALL July files)
- "Triggers and Data Macros" (ALL July files)
- "Macros and Automation in Microsoft Access" — UI vs data macros (ALL July files)
- "Stored Procedures and Functions (conceptual)" — survey level (ALL July files)
- "Administration Across Platforms" comparison table (ALL July files)
- "Practicing DBA Thinking" one-page checklist (ALL July files)
- Let's Build 11: 10-step harden-and-automate activity with documentation requirement (ALL July files)
- Lab 11: "How administration protects business decisions" memo (ALL July files)
- Length valve: §13 → sidebar if overruns (ALL July files)

### CH12 — Unique Additions Across All Files
- "Concept-first" ordering: BI fundamentals → architecture → tools (GPT, adopted)
- "Three Reporting Tiers" framework: Tier 1 (built-in/Access), Tier 2 (lightweight/Notion), Tier 3 (full BI/Power BI) (July 11 files — chatGPT-v1/Claude v3)
- "Coherence rationale" explaining why tools belong together (July 11 files)
- NotebookLM as "sidecar" not a tier — governed by CH1 AI policy (July 11 files)
- "Operational Systems vs. Analytical Systems" distinction (ALL July files)
- "ETL: Moving Data Into Analytical Systems" — course's reporting view as miniature ETL (ALL July files)
- "Facts, Dimensions, and Measures" — star-schema intuition, vocabulary for internships (ALL July files)
- "OLAP in One Page: Slice, Dice, Drill" — taught through slicers (GLM, adopted)
- "KPIs, Targets, and Thresholds (mechanics only)" — judgment layer in CH13 (ALL July files)
- "Reports vs. Dashboards vs. KPI Cards" with audience question as selector (ALL July files)
- Access Reports as Tier 1 built-in reporting (July 11 files)
- Power Query shaping data section (ALL July files)
- "Calculated Columns vs. Measures (DAX essentials)" — deliberately minimal (ALL July files)
- Notion as lightweight data workspace — worked contrast with Power BI (ALL July files)
- "Dashboard Storytelling" — KPI→comparison→trend→detail narrative (ALL July files)
- "Spot the lie" visualization pitfalls gallery (ALL July files)
- "BI governance & data quality" callout — who owns the numbers (GLM, adopted)
- "Worked Example: BI layer for the Grading Database" — end-to-end template (GLM, adopted)
- Title uses "Reporting" not "Dashboards" per July 10 decision (MASTER, gpt56, UNIFIED-FINAL)

### CH13 — Unique Additions Across All Files
- "Why Dashboards Do Not Make Decisions" (ALL July files)
- "What Is Business Strategy?" — operational effectiveness vs. strategy (ALL July files)
- "Information Systems as Strategic Infrastructure" — IS as capability, not cost center (ALL July files)
- Named strategy frameworks: cost leadership vs. differentiation, Walmart vs. Nordstrom, Porter's Five Forces, value chain (DeepSeek, adopted)
- "Strategic Alignment" chain: goal→question→metric→data→system (ALL July files)
- "The Grading Database and PetVax as Strategic Systems" (GLM, adopted)
- "KPIs, Targets, Thresholds, and the Balanced Scorecard" — judgment layer (ALL July files)
- Goodhart's Law, survivorship bias, Simpson's paradox, McNamara fallacy (DeepSeek, adopted)
- "Bias, Missing Context, and the Limits of the Database" (ALL July files)
- "AI as Decision Support, Not Decision Replacement" (ALL July files)
- "Ethics, Responsibility, and the Risks of Poor Information Strategy" (ALL July files)
- Decision memo structure: Situation, Evidence, Interpretation, Recommendation, Strategic Alignment, Risk, Action — Strategic Alignment line added per DeepSeek (ALL July files)
- Lab 13: must reference at least one strategic goal (DeepSeek, adopted)
- "From Insight to Action" — professional identity closing (ALL July files)

### CH14 — Unique Additions Across All Files
- "Why Modern Data Infrastructure Matters" — "Access/SQLite world is real but small" (ALL July files)
- "From Local to Cloud Databases" — what changes and what doesn't (ALL July files)
- "Supabase as a Modern Cloud Database" — PostgreSQL under the hood (ALL July files)
- "Authentication, APIs, and Row-Level Security" — RLS as CH11 least privilege per row (ALL July files)
- "How AI Is Powered by Databases" — "garbage schema in, hallucination out" (ALL July files)
- "Embeddings and Retrieval-Augmented Generation" — embeddings as "meaning coordinates" (ALL July files)
- "Keyword, Vector, and Hybrid Search" — three-scenario decision exercise (ALL July files)
- "Big Data: Warehouses, Lakes, and Storage at Scale" with comparison table (ALL July files)
- "Distributed Databases: Partitioning and Replication" (ALL July files)
- "The CAP Tradeoff" via two-branch-bank story (ALL July files)
- "Distributed Processing in Brief" — MapReduce/Hadoop as history, Spark as modern (ALL July files)
- "JSON and Nonrelational Data" — JSON columns in PostgreSQL as hybrid path (ALL July files)
- "The Database Ecosystem: What to Learn Next" — PostgreSQL/MySQL/SQL Server/Oracle/MongoDB/Redis/Snowflake/BigQuery survey (ALL July files)
- "What Modern Data Professionals Actually Do" — day-in-the-life sketches (ALL July files)
- Alternative Let's Build 14 Option B: "Map a Classroom Database to a Modern Data Stack" (GLM, adopted)
- ELT and modern pipelines note — cloud shifts ETL toward ELT (GLM, adopted)
- "Why AI still needs databases" reflection prompt (ALL July files)

### CH15 — Unique Additions Across All Files
- Part A (Final Project) / Part B (Final Test) structure (ALL July files)
- "Research Publications Database" final test — new schema for transfer assessment (ALL July files)
- "SQL Documentation Standards" — comments, naming conventions, "could a stranger run this?" test (ALL July files)
- "Screenshots and Evidence Standards" (ALL July files)
- "Common Final Project Mistakes" greatest-hits list (ALL July files)
- "Submission Checklist" (ALL July files)
- "Final Test Question Map" — question types→chapters→skills, point distribution (ALL July files)
- "Study Strategy and Practice Plan" — one-week plan (ALL July files)
- Let's Build 15: yes/no completeness matrix (ALL July files)
- Lab 15 exception: stays on Grading Database (chatGPT-v1)

### CH16 — Unique Additions Across All Files
- "The Full Journey: From Data to Wisdom" — DIKW pyramid with chapter numbers (ALL July files)
- "How the Chapters Fit Together" — book architecture made explicit (ALL July files)
- "What You Can Now Build" — concrete capability inventory (ALL July files)
- Per-major breakdown: Accounting, Finance/FinTech, Marketing/Customer Analytics, Cybersecurity/Digital Forensics, Management/Operations/Entrepreneurship, Business Analytics/IS (ALL July files)
- "Databases, Digital Transformation, and Business Strategy" — strategy capstone (ALL July files)
- "The Skills Employers Actually See" — decoding job postings (ALL July files)
- "Resume and Interview Translation" — Labs 9–15 as STAR stories, before/after resume makeover (ALL July files)
- "Why Databases Still Matter in the Age of AI" (ALL July files)
- "Closing Thought: Databases as Decision Infrastructure" (ALL July files)
- Let's Build 16: Personal Data Skills Portfolio Map — skill→evidence table (ALL July files)
- Lab 16: Five skills + one artifact each; paragraph connecting databases to major (ALL July files)

---

## Recommended Approach

The 12 candidate files represent an evolutionary convergence. The early June files (Family A) contain the richest source-derived detail — actual subsection headings extracted from chapter files, complete with pedagogical structure. The July files (Families B and C) represent the architectural decisions and target structure.

**For rebuilding chapter outlines**, the recommended source priority is:

1. **For CH01–CH08 (stable chapters):** Use the June 5/12 outlines as the richest source of actual subsection detail, then apply retrofit edits from the MASTER outline.
2. **For CH09–CH16 (new/reorganized chapters):** Use `BITM330-book-outline-MASTER-2026-07-10.md` as the canonical target architecture, supplemented with:
   - `BITM330-book-outline-FINAL-2026-07-11-chatGPT-v1.md` for the Three Reporting Tiers framework (CH12), platform strategy (CH10), Lucidchart walkthrough (CH9), and lab format specification.
   - `outline-2026-06-05.md` for detailed SQL subsection content that can be mapped into CH10.
3. **For production planning:** Use the production checklist from the MASTER outline, extended with the canonical PetVax dataset and lab-conversion items from the July 11 files.

---

## Implementation Guidance

- **Objectives:** Identify what unique content each outline candidate contributes per chapter, to inform chapter rebuilding and avoid losing valuable subsection detail, teaching examples, or pedagogical framing.
- **Key Tasks:**
  1. Compare each outline candidate against the DeepSeek baseline (COMPLETED — this document).
  2. Flag which unique additions should be adopted into chapter files.
  3. Flag which additions are already in the chapter source (from June 5/12 era).
  4. Identify conflicts or unresolved decisions (e.g., "Tokens, Storage, Processing, and Cost" in CH03).
- **Dependencies:** The DeepSeek blueprint already distributed to chapter files is the comparison baseline.
- **Success Criteria:** Every unique, valuable subsection, teaching example, or pedagogical framing from the 12 candidates is identified and either flagged for adoption or explicitly declined.

---

## Scope Correction — 2026-07-16

The original research scope statement was incorrect. The candidates directory currently contains **22 Markdown files**, not 12. The 12-file analysis above did not review these additional files:

- `16-chapters-blueprint-deepseek-2026-07-11.md`
- `outline-Gemini-2026-07-07.md`
- `outline-GLM-2026-07-07.md`
- `outline-GPT-2026-07-07.md`
- `migration-plan-gpt-2026-07-11.md`
- `migration-plan-gpt-2026-07-11-deepseek-instructions.md`
- `BITM330-BOOK-Notes2.md`
- `BITM330-book-outline-FINAL-2026-07-09-claude (1).md` (one-line/duplicate artifact)
- `bitm-330-outline-DeppSeek.md`
- `outline-7-7-26.md`

Therefore, the original **“all 12 files read in full”** and **“every unique contribution”** claims apply only to the 12-file subset and must not be treated as a complete candidate review. The complete review must separately classify all 22 files as: candidate outline, decision/recommendation document, migration/production plan, notes/archive material, or duplicate artifact; then compare substantive content from every non-duplicate file against the canonical master and the as-built chapter outlines.
