# Missing-Image List & Generation Prompts — nano banana / Google Gemini

_For the figures missing from chapters 10–17. Part 1 lists every missing image (what it is + where it
goes). Part 2 has the ready-to-paste image-generation prompts, each separated by `---`._

## Shared style (applies to every prompt)
Textbook illustration for an undergraduate business/database course. **Clean modern flat-vector
diagram, white background, 16:9, high contrast, minimal and correctly-spelled labels, no lorem-ipsum,
no watermark, consistent accent-color palette (one primary blue + one accent).** Diagrams over
decoration. Avoid photorealism unless noted.

## Experiment note (ch10)
The four ch10 prompts below are **also embedded as HTML comments directly in**
`ch10-advanced-sql-queries/core-concepts.md`, each with a `place here as: ![caption](IMAGE_URL)`
instruction — so you can test whether nano banana / Gemini can generate *and* self-place them.

---

# PART 1 — Missing images (description + location)

### Chapter 10 — Advanced SQL (experiment set; prompts embedded in source)
| Fig | What it shows | Location (section) |
|---|---|---|
| 10.3 | Flat table → 3 normalized tables (Students/Deliverables/Grades) | 10.3 Diagnosing and Restructuring Data |
| 10.4 | The four SQL JOIN types as Venn diagrams | 10.4 Advanced JOIN Patterns |
| 10.9 | How a window function partitions & ranks rows | 10.9 Window Functions |
| 10.10 | A reusable SQL reporting pipeline (Raw → View → Metrics → Report) | 10.10 Reusable Reporting Pipelines |

### Chapter 11 — Database Administration (7 defined placeholders already in source as `<!-- FIGURE PLACEHOLDER -->`)
| Fig | What it shows | Location (section) |
|---|---|---|
| 11.a | Design creates structure; administration keeps it running | 11.1 What Is Database Administration? |
| 11.b | Lost-update concurrency scenario (two users overwrite each other) | 11.3 Multi-User Databases and Concurrency Control |
| 11.c | ACID quadrant (Atomicity, Consistency, Isolation, Durability) | 11.4 Transactions and ACID Reliability |
| 11.d | Full vs. incremental vs. differential backup timeline | 11.6 Backup and Recovery |
| 11.e | RPO / RTO disaster-recovery timeline | 11.6 Backup and Recovery |
| 11.f | Gradebook-crash recovery: backup + log replay + rollforward | 11.6 Backup and Recovery |
| 11.g | Platform comparison matrix (Access/SQLite/PostgreSQL/Supabase) | 11.9 DBA Work Across Platforms |

### Chapter 14 — Power BI (declared in the "Figures Index" as *(to be added)*)
| Fig | What it shows | Location (section) |
|---|---|---|
| 14.1 | Power BI component overview (Desktop → Service → mobile) | 14.1 / Figures Index |
| 14.2 | Power Query transformation interface (before → after) | 14.3 Power Query |
| 14.3 | Sample grading dashboard in Power BI | 14.4 Building Visualizations |

> Chapters 12, 13, 15, 16, 17 currently have **no figures**. They read fine as text, so they're not
> "missing declared images" — treat figures there as a later enhancement batch (say the word and I'll
> propose figure spots + prompts for them too).

---

# PART 2 — Generation prompts

## Figure 10.3 — Restructuring a flat table into normalized tables
Flat-vector textbook diagram, white background, 16:9. Left: one wide "flat" spreadsheet-style table with visibly repeated/redundant rows (same student name and class repeated on several rows). A bold arrow points right to three smaller, tidy tables labeled "Students", "Deliverables", and "Grades", connected by thin primary-key/foreign-key lines. Minimal correctly-spelled labels, high contrast, uncluttered.

---

## Figure 10.4 — SQL JOIN types compared
Flat-vector textbook diagram, white background, 16:9. Four small labeled set diagrams in a row for SQL JOIN types — "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL / CROSS JOIN" — each two overlapping circles (Venn style) labeled "Students" and "Grades", with the region the join returns shaded in one accent color. Correct labels beneath each; clean and high-contrast.

---

## Figure 10.9 — How a SQL window function partitions and ranks rows
Flat-vector textbook diagram, white background, 16:9. A table of student scores split into two colored partitions (by class); within each partition a "RANK" column is computed, with small arrows showing a "window" sliding over ordered rows. Tidy labels "PARTITION BY class" and "ORDER BY score DESC". Keep the detail rows visible. Minimal correct labels, high contrast.

---

## Figure 10.10 — A reusable SQL reporting pipeline
Flat-vector textbook diagram, white background, 16:9. Left-to-right pipeline with four connected labeled stages joined by arrows: "Raw Tables" (table icon) → "SQL View" (gear/document icon) → "Aggregated Metrics" (bar-chart icon) → "Reusable Report" (dashboard icon). Convey that logic is saved once and reused. One consistent accent color, clean and uncluttered.

---

## Figure 11.a — Design vs. administration
Flat-vector textbook diagram, white background, 16:9. A split panel: left half "Database Design" shows a blueprint/structure being built (tables and relationships as an architectural blueprint); right half "Database Administration" shows the same structure being maintained and guarded (a shield, a gauge, a backup arrow, an uptime clock). A center label reads "Design creates structure — Administration keeps it running." Balanced, professional, minimal labels.

---

## Figure 11.b — The lost-update problem
Flat-vector textbook diagram, white background, 16:9. Two users (User A, User B) each read the same value ("Balance = 100") from a shared database at the same time, both compute an update, and write back — a timeline shows A writes 120, then B overwrites with 90, and A's change is lost. Use a clear vertical or horizontal timeline with two lanes, arrows to a central "Database" cylinder, and a red highlight on the lost write. Minimal correct labels.

---

## Figure 11.c — The ACID quadrant
Flat-vector textbook diagram, white background, 16:9. A clean 2×2 quadrant (or four pillars) labeled "Atomicity", "Consistency", "Isolation", "Durability", each with a tiny icon (all-or-nothing switch; balanced scale; separated lanes; hard-drive/lock) and a 3–5 word caption. Title "ACID — the four guarantees of a reliable transaction". One accent color, evenly spaced.

---

## Figure 11.d — Backup strategies compared
Flat-vector textbook diagram, white background, 16:9. Three stacked horizontal timelines labeled "Full", "Incremental", and "Differential", showing backup points across a week (Mon–Sun). Full = one large block each day; Incremental = small blocks capturing only changes since the last backup; Differential = growing blocks capturing changes since the last full. A small legend explains block size = data copied. Clean, correct labels.

---

## Figure 11.e — RPO / RTO recovery timeline
Flat-vector textbook diagram, white background, 16:9. A single horizontal timeline with a central "DISASTER" marker. To the left, "RPO (Recovery Point Objective)" spans back to the last good backup (how much data you can afford to lose). To the right, "RTO (Recovery Time Objective)" spans forward to "Service Restored" (how long recovery may take). Label both spans clearly with arrows; one accent color for RPO, another for RTO.

---

## Figure 11.f — Recovery in action (the Gradebook Crash)
Flat-vector textbook diagram, white background, 16:9. A left-to-right recovery sequence for a "Gradebook" database: (1) crash icon, (2) restore last full "Backup" (cylinder + down arrow), (3) "Replay transaction log" (list of log entries feeding in), (4) "Rollforward" to the last committed state, (5) green "Recovered" checkmark. Numbered steps with short labels; clear directional flow.

---

## Figure 11.g — DBA platform comparison matrix
Flat-vector textbook comparison table, white background, 16:9. Columns = "Access", "SQLite", "PostgreSQL", "Supabase"; rows = DBA dimensions "Security & Roles", "Concurrency", "Backup/Recovery", "Performance/Indexes", "Scale". Fill cells with simple rating dots or short 1–2 word labels (e.g., Basic / Good / Strong). Clean header row in the accent color; legible, correctly-spelled, evenly-spaced grid.

---

## Figure 14.1 — Power BI component overview
Flat-vector textbook diagram, white background, 16:9. Three connected components left to right: "Power BI Desktop" (authoring, a report canvas), "Power BI Service" (cloud publishing, a cloud icon), and "Power BI Mobile" (a phone showing a dashboard), with arrows showing publish/share flow. Small "Data sources" stack (Access, Excel, SQL) feeding into Desktop on the left. Minimal correct labels, one accent color.

---

## Figure 14.2 — Power Query transformation (before → after)
Flat-vector textbook diagram, white background, 16:9. Two side-by-side mini tables: left "Before" is messy (blank cells, inconsistent text case, a mistyped date); a center "Power Query" gear/step-list arrow transforms it into the right "After" table that is clean and consistent. Show 3–4 tiny "Applied Steps" labels (Remove blanks, Change type, Trim text). Clean, correct labels.

---

## Figure 14.3 — Sample grading dashboard in Power BI
Flat-vector mock dashboard (UI mockup style, not photorealistic), white/light background, 16:9. A "Grading Database — Class Performance" dashboard with: a KPI card row (Average Score, Pass Rate, At-Risk Count), a bar chart "Average Score by Deliverable", a line chart "Score Trend by Week", and a slicer panel (Class, Student). Balanced grid layout, one accent color, realistic but generic labels, no real names.
