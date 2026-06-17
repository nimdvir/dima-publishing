# Database Book — Labs Outline (All Chapters)
## June 16, 2026

> Every Lab transfers the skills learned in Let's Build (Grading Database) to the **PetVax Veterinary Clinic**.
> Labs are graded, less scaffolded, and require independent application of the same relational principles.
> **Lab answer files are NEVER included in the repository.**

---

## Lab 01: PetVax Introduction

**Chapter:** 1 — Introduction to the Course

**Goal:** Introduce the PetVax Veterinary Hospital as the transfer-practice project that mirrors the Grading Database across the course. Students explore the clinic's business context and data needs.

### Tasks

1. **System Purpose Check** — Explain what the Vet Clinic Database should do, stated in business terms (not technical). What operational problems should it solve?
2. **Operational Data Inventory** — List 10+ data items the clinic should track: owners, pets, visits, services, billing, appointments, vaccinations, medications, staff, invoices.
3. **Business Question List** — Write 5+ questions the database should answer: Which pets are scheduled this week? Which invoices are unpaid? Which vet has the most appointments this month? Which pets are overdue for vaccinations?
4. **Entity Preview** — Identify the main entities: Owner, Pet, Visit, Treatment, Invoice, Payment. Sketch how they might relate.
5. **Spreadsheet vs. Database Reflection** — Explain why the clinic should not use one giant spreadsheet (duplication of owner info across every visit, inconsistency in pet records, limited reporting capability).
6. **Project Relationship Reflection** — Explain why PetVax tests different skills than the Grading Database (different domain, same relational principles; vet clinic involves scheduling, medical records, billing, and inventory — more entity types than student grades).
7. **Role Reflection** — Identify which professional roles feel familiar vs. unfamiliar in the clinic context (receptionist entering appointments, vet reviewing medical history, manager running revenue reports).
8. **Tool Readiness Check** — Confirm access to Google Sheets, Microsoft Access, SQLite, PostgreSQL, Lucidchart, and GitHub.

**PetVax Connection:** Introduces the veterinary clinic as the applied transfer domain. Students will apply the same relational thinking to a completely different business context (pets/visits/billing instead of students/grades).

---

## Lab 02: Running PetVax with Information

**Chapter:** 2 — Foundations of Information Systems

**Goal:** Apply the DIKW hierarchy, R.E.A.D. framework, stakeholder analysis, and data-quality thinking from Chapter 2 to the veterinary clinic context.

### Tasks

1. **Sort Clinic Questions** — Classify operational questions as Track (important for decisions) or Skip (nice-to-know).
2. **Match Questions to Decisions** — For each tracked question, identify the specific clinic decision it supports (e.g., "Which pets are overdue for vaccinations?" → "Should we run a reminder campaign?").
3. **Identify Required Data** — What records must the clinic capture for each tracked question? Map each to the process that creates those records (appointment booking creates visit records; service delivery creates treatment records).
4. **Identify Outside Knowledge** — What external facts does the clinic need to interpret data? (Vaccination schedules by species, normal lab ranges, industry benchmarks for clinic revenue per vet).
5. **Define KPIs** — Convert clinic questions into measurable KPIs: vaccine compliance rate, average revenue per visit, appointment no-show rate, client retention rate.
6. **Trace R.E.A.D. Stages** — Map one clinic KPI through Representation (what records exist), Expression (how data is queried), Association (what patterns emerge), and Decision-Making (what action follows).
7. **Identify Stakeholders** — Who needs what information? (Receptionist: today's schedule; Vet: patient history; Manager: revenue trends; Owner: their pet's vaccination status).
8. **Spot Data-Quality Gaps** — Examine a messy clinic visit log; identify problems (missing pet weights, inconsistent owner names, duplicate entries); name each violated dimension (accuracy, completeness, consistency, timeliness).

**PetVax Connection:** Transfer the information systems thinking framework (questions → data → KPIs → decisions) from the course domain to clinic operations — vaccine schedules, appointment adherence, revenue tracking, patient risk.

---

## Lab 03: Transferring Data Fundamentals to PetVax

**Chapter:** 3 — Understanding Data Fundamentals

**Goal:** Apply data classification, measurement levels, metadata, data dictionaries, and data-quality practices from Chapter 3 to veterinary clinic data in Google Sheets.

### Tasks

1. **Identify Fields Needed** — List the fields required for a clinic visit record (OwnerName, PetName, Species, Breed, VisitDate, ServiceType, Charge, VetName, Notes).
2. **Build Data Dictionary** — Document FieldName, Meaning, IntendedKind (Nominal/Ordinal/Interval/Ratio), and WhyItMatters for every field.
3. **Classify Measurement Levels** — Label each field as Nominal (Species, Breed), Ordinal (Condition: poor/fair/good), Interval (none in this context), or Ratio (Charge, Weight, Age).
4. **Enter Clinic Data** — Add sample visit records; deliberately introduce some data-quality problems to detect later.
5. **Add Validation Rules** — Species must be from a dropdown list (Dog, Cat, Bird, Reptile, Other); Charge must be > 0; VisitDate must not be in the future.
6. **Detect Data-Quality Problems** — Find problems in the messy clinic records; name the violated quality dimension for each; propose a fix.

**PetVax Connection:** Take a messy clinic visit log and structure it the way Chapter 3 teaches. Students learn why a spreadsheet becomes unwieldy before the clinic is large enough to need a real database.

---

## Lab 04: Building the PetVax Database Foundation

**Chapter:** 4 — Introduction to Databases

**Goal:** Build a flat-table PetVax database in Microsoft Access mirroring the GRADEBOOK/GRADE_WEIGHT structure; experience the same flat-table limitations before relational refactoring.

### Tasks

1. **Define Clinic Tables** — Design flat OWNER and VISIT tables with fields mirroring the GRADEBOOK pattern (RecordID AutoNumber PK, text fields, date fields, currency fields, lookup fields).
2. **Set Primary Keys and Validation** — RecordID PK; VisitDate required; Charge between $0–$10,000; Species from dropdown list.
3. **Build Lookup Tables** — SPECIES (SpeciesName PK), SERVICE_TYPE (ServiceName PK, DefaultCharge).
4. **Create Data-Entry Forms** — `frmOwners` and `frmVisits` for entering clinic records.
5. **Write Single-Table Queries** — `qryVisitsByDate` (filter by date range), `qryHighCharges` (Charge > $500), `qryVisitsBySpecies` (GROUP BY species with COUNT).
6. **Build a Join Query** — `qryVisitDetails`: INNER JOIN VISIT + OWNER + SPECIES to show owner name, pet name, species, and visit details in one view.
7. **Test Flat-Table Limitations** — Enter the same owner for multiple visits; notice the duplication. Enter "Labrador" for one visit and "Lab" for another for the same pet; notice the inconsistency. Reflect: what would a relational design do differently?

**PetVax Connection:** Build the clinic equivalent of the flat GRADEBOOK; experience firsthand why duplication and inconsistency make flat tables problematic for real clinic operations.

---

## Lab 05: Querying the PetVax Database with SQL

**Chapter:** 5 — SQL

**Goal:** Write single-table and multi-table SQL queries against the PetVax database, transferring the Grading Database query patterns to veterinary clinic data.

### Tasks

1. **Load the PetVax SQL Database** — Run the setup script to create all clinic tables with sample data (owners, pets, visits, services, invoices).
2. **Single-Table SELECT** — List all pets of a specific species; list all visits in a date range; list all services priced above a threshold.
3. **WHERE with Conditions** — Find visits where the charge exceeds $200; find pets not seen in the last 6 months.
4. **ORDER BY and DISTINCT** — List distinct pet species in the database; list visits ordered by date (most recent first).
5. **NULL Handling** — Find pets with no recorded weight; find invoices with no payment date.
6. **Aggregation with GROUP BY** — Count visits per pet; calculate average charge per service type; total revenue by month.
7. **HAVING** — Find pet owners with more than 3 pets; find service types with average charge above $100.
8. **Multi-Table JOIN** — Join Owner + Pet + Visit to show each visit with owner contact info and pet details; join Visit + Service to break down each visit's services.
9. **Create a VIEW** — `V_PetVisitHistory`: convenient reusable view for common reporting.

**PetVax Connection:** Apply the same SQL patterns (SELECT, WHERE, JOIN, GROUP BY, HAVING, VIEW) to clinic questions — total revenue per owner, vet utilization, vaccine compliance.

---

## Lab 06: Building the PetVax Relational Database

**Chapter:** 6 — The Relational Model

**Goal:** Build a normalized veterinary clinic database with 6–7 tables reflecting clinic operations; enforce referential integrity; write multi-table queries.

### Tasks

1. **Define the Schema** — Design tables: OWNER (OwnerID PK), PET (PetID PK, OwnerID FK), VETERINARIAN (VetID PK), APPOINTMENT (ApptID PK, PetID FK, VetID FK), SERVICE (ServiceID PK), APPOINTMENT_SERVICE (junction: ApptID FK, ServiceID FK), INVOICE (InvoiceID PK, ApptID FK).
2. **Draw Relationships** — In Access Relationships window: OWNER→PET (1:many), PET→APPOINTMENT (1:many), VET→APPOINTMENT (1:many), APPOINTMENT→APPOINTMENT_SERVICE (1:many), SERVICE→APPOINTMENT_SERVICE (1:many), APPOINTMENT→INVOICE (1:1).
3. **Enforce Referential Integrity** — Turn on "Enforce Referential Integrity" for all relationships; test that the database rejects orphan records (appointment for nonexistent pet, service for nonexistent appointment).
4. **Write Multi-Table Queries:**
   - **Pet History by Owner** — 3-table join: OWNER + PET + APPOINTMENT; show all appointments for each owner's pets.
   - **Vet Utilization** — 3-table join: VET + APPOINTMENT + APPOINTMENT_SERVICE; count appointments and services per vet.
   - **Revenue per Service Type** — 4-table join: SERVICE + APPOINTMENT_SERVICE + APPOINTMENT + INVOICE; sum invoice totals grouped by service type.
5. **Test Referential Integrity Barriers** — Try to: delete an owner who still has pets (should fail); insert an appointment for PetID that doesn't exist (should fail); change a PetID that has appointments (should cascade or restrict based on design).

**PetVax Connection:** Apply relational modeling principles to the clinic — pets belong to owners (1:many), appointments involve vets (many:many via junction), services link to appointments, invoices summarize services. Practice 6–7 table schema on realistic clinic data.

---

## Lab 07: Normalizing a Veterinary Clinic Database

**Chapter:** 7 — Data Normalization

**Goal:** Start with a messy flat clinic visit log; normalize to 3NF; migrate data with append queries; rebuild reports via multi-table joins.

### Tasks

1. **Load the Flat VISIT_LOG** — A denormalized table mixing owner, pet, vet, date, services, and charges all in one row.
2. **Diagnose Repeated Facts** — Identify which facts repeat: owner name/phone repeated in every visit row; pet name/species repeated; vet name repeated; service descriptions repeated; charges repeated.
3. **Design Normalized Tables** — Propose: OWNER, PET, VETERINARIAN, SERVICE, APPOINTMENT, APPOINTMENT_SERVICE, INVOICE — with proper PKs and FKs.
4. **Write Append Queries to Migrate:**
   - Extract OWNER: `SELECT DISTINCT OwnerName, Phone, Email FROM VISIT_LOG`.
   - Extract PET: `SELECT DISTINCT PetName, Species, Breed FROM VISIT_LOG` (joining back to OWNER for FK).
   - Extract VETERINARIAN: `SELECT DISTINCT VetName FROM VISIT_LOG`.
   - Extract SERVICE: `SELECT DISTINCT ServiceDescription, DefaultCharge FROM VISIT_LOG`.
   - Extract APPOINTMENT: DISTINCT on (PetID, VetID, VisitDate, VisitTime) from VISIT_LOG with JOINs to look up FKs.
   - Extract APPOINTMENT_SERVICE: JOIN to look up ApptID and ServiceID.
   - Extract INVOICE: Total charges grouped by appointment.
5. **Verify FK Integrity** — After migration, confirm every FK resolves; check for orphans.
6. **Reconstruct the Original Visit Report** — Write a multi-table JOIN that rebuilds the flat VISIT_LOG view from normalized tables.

**PetVax Connection:** Recognize that clinic operations often begin as a flat log (appointment book, charge sheet). Learn to decompose messy operational data into clean, relational structure. Practice why separate tables prevent mistakes and enable better reporting.

---

## Lab 08: Midterm Review — PetVax Integration Check

**Chapter:** 8 — Midterm Review

**Goal:** Apply the same review process from the midterm review to the PetVax clinic database; reflect on what normalized design enables.

### Tasks

1. **Complete Schema Checklist** — Verify every clinic table has a PK; every FK is defined; no repeating columns; no partial or transitive dependencies; 1NF, 2NF, 3NF are met.
2. **Build Query Bank for Clinic Questions** — Collect or rebuild queries that answer the business questions from Lab 01; annotate each with the question it answers and the SQL concepts used.
3. **Identify Impossible Queries** — Which clinic questions would be impossible to answer with a flat visit log? (e.g., "average revenue per owner" when owner info is duplicated and inconsistent; "vet utilization rate" when vet assignments are buried in text fields).
4. **Explain DBA Impact** — How do schema decisions (relationships, constraints, normalization) affect what clinic staff can know and do? Write a short paragraph connecting design quality to operational capability.

**PetVax Connection:** By mid-course, students have transferred relational thinking from the Grading Database to the clinic. This review checkpoint verifies the transfer worked. Students should see the same normalization problems and solutions in both domains.

---

## Lab 09: Designing the PetVax Database

**Chapter:** 9 — Database Design and ER Modeling

**Goal:** Design the PetVax clinic database from scratch using the full design process: visual ER diagram → Mermaid code → SQL DDL.

### Tasks

1. **Identify Clinic Entities** — Owner, Pet, Veterinarian, Appointment, Service, AppointmentService (junction), Invoice, Payment. List attributes for each.
2. **Draw ERD in Lucidchart** — Using Crow's Foot notation; mark PKs; draw relationships with cardinality (1, many) and optionality (mandatory, optional).
3. **Code ERD in Mermaid** — Write diagram-as-code showing all tables, attributes with PK/FK labels, and relationships with cardinality markers.
4. **Write CREATE TABLE DDL:**
   - OWNER: OwnerID PK, FirstName, LastName, Phone, Email UNIQUE, Address.
   - PET: PetID PK, OwnerID FK, Name, Species, Breed, BirthDate, Weight.
   - VETERINARIAN: VetID PK, FirstName, LastName, LicenseNumber UNIQUE.
   - APPOINTMENT: ApptID PK, PetID FK, VetID FK, ApptDate, ApptTime, Reason.
   - SERVICE: ServiceID PK, ServiceName, Description, DefaultCharge.
   - APPOINTMENT_SERVICE: ApptID FK, ServiceID FK, Charge, Notes (composite PK on ApptID+ServiceID).
   - INVOICE: InvoiceID PK, ApptID FK UNIQUE, TotalAmount, PaidDate, PaymentMethod.
5. **Add Constraints** — CHECK (Charge > 0), CHECK (ApptDate >= TODAY), UNIQUE (OwnerID + PetName) to prevent duplicate pet names per owner.
6. **Add Referential Integrity** — ON DELETE RESTRICT for most relationships; ON DELETE CASCADE for APPOINTMENT_SERVICE when an appointment is deleted.
7. **Verify Design** — Ensure no orphan records possible; each relationship enforces a business rule; the schema naturally prevents invalid states.

**PetVax Connection:** Students learn that good database design happens before implementation. By designing the clinic database first (conceptual → logical → physical), they avoid costly mistakes. Design choices (Should Pet be owned by one Owner or multiple? Should Appointment link Vet and Pet or be separate?) drive what queries are possible.

---

## Lab 10: Advanced SQL for PetVax Analytics

**Chapter:** 10 — Advanced SQL for Business Analysis

**Goal:** Write advanced SQL queries on the clinic database — diagnostic queries, CTE pipelines, window functions, safe updates — to uncover operational insights.

### Tasks

1. **Diagnostic Queries:**
   - Find vets with zero appointments in the last 30 days.
   - Find pets never vaccinated (no vaccination service record).
   - Find incomplete payments (Invoice with TotalAmount > 0 but NULL PaidDate).
   - Find duplicate appointments (same pet, same vet, same date/time).
2. **CTE Pipeline — Vet Utilization Ranking:**
   - ApptCounts CTE: count appointments per vet per month.
   - RevenuePerVet CTE: sum invoice totals per vet.
   - VetRanking CTE: RANK vets by appointment count and revenue.
   - Final SELECT: show vet name, appointment count, total revenue, and rank.
3. **Create VET_PERFORMANCE VIEW** — Reusable view with vet name, appointment count, average revenue per appointment, patient satisfaction proxy (return visit rate).
4. **Window Functions:**
   - Rank vets by monthly revenue without collapsing detail rows.
   - Show each vet's revenue alongside the clinic average using AVG OVER.
   - Show running monthly revenue totals for trend analysis.
5. **Safe UPDATE — Bulk Fee Adjustment:**
   - Verify before: SELECT services and current charges.
   - Wrap in transaction: BEGIN; UPDATE Service SET DefaultCharge = DefaultCharge * 1.05 (5% increase).
   - Verify after: SELECT again.
   - COMMIT or ROLLBACK.
   - Document: what would happen if you forgot the WHERE clause?

**PetVax Connection:** Advanced SQL enables the clinic to move from "what happened?" (simple queries) to "what does it mean?" (CTEs for risk/performance analysis) to "what should we do?" (decision-support views and KPI dashboards).

---

## Lab 11: DBA for PetVax

**Chapter:** 11 — Database Administration

**Goal:** Apply DBA practices to the clinic database — define security roles, plan backups, ensure data integrity, optimize performance.

### Tasks

1. **Define Clinic Security Roles:**
   - **Receptionist:** Can INSERT/UPDATE appointments and owner/pet info; can VIEW service lists; cannot see financial data or medical notes.
   - **Veterinarian:** Can SELECT/UPDATE medical records and appointments; can view own schedule; cannot modify billing.
   - **Manager:** Full access — including financial reports, revenue data, and all admin functions.
   - Document the RBAC matrix as a written policy.
2. **Write Backup Plan:**
   - Daily full backup at clinic close (6 PM).
   - Stored on encrypted external drive and cloud backup.
   - Retention: 30 days of daily backups, 12 months of monthly archives.
   - Define RTO (Recovery Time Objective): 2 hours. Define RPO (Recovery Point Objective): 1 business day.
3. **Practice Recovery:**
   - Simulate scenario: "Corrupted appointment records for last week."
   - Identify affected tables (APPOINTMENT, APPOINTMENT_SERVICE, INVOICE).
   - Restore from last good backup to a safe location.
   - Compare restored vs. damaged version; document what was recoverable.
4. **Add Performance Indexes:**
   - Index on Owner.LastName (frequent search by receptionist).
   - Index on Pet.Name (frequent lookup).
   - Index on Appointment.ApptDate (daily schedule queries).
   - Test query performance before and after each index.
5. **Document Business Impact** — Write a short memo: What does the clinic lose if the database goes down for 4 hours? For 2 days? What data would be permanently lost without proper backups?

**PetVax Connection:** A clinic's database is production — real animals' health records depend on it. Students learn that design and queries are only part of the story; they must also ensure the system is secure, backed up, recoverable, and fast enough for daily operations.

---

## Lab 12: BI for PetVax

**Chapter:** 12 — Business Intelligence

**Goal:** Build a BI layer on top of the PetVax database; define KPIs, create analytical views, and present findings as a management dashboard.

### Tasks

1. **Define Clinic BI Questions:**
   - Which services generate the most revenue?
   - Which vets see the most patients?
   - What is the vaccine compliance rate?
   - What is the client retention rate?
   - Which pets are overdue for follow-up?
2. **Build Core BI Queries:**
   - Revenue by service type (GROUP BY ServiceName, SUM Charge).
   - Vet utilization (COUNT appointments per vet, compare to available slots).
   - Client visit frequency (COUNT visits per owner, identify gaps > 6 months).
   - Vaccine compliance (pets with no vaccination service record in 12 months).
3. **Create 3 Analytical Reports:**
   - **Report 1: Revenue Dashboard** — Monthly revenue trend, revenue by service type, average revenue per visit.
   - **Report 2: Vet Performance** — Appointments per vet, average revenue per vet, patient load comparison.
   - **Report 3: Client Health** — Active clients, lapsed clients, new clients this month, average visits per client.
4. **Present Findings as a Dashboard or Memo** — Write for a non-technical clinic manager. Use plain language: what does the data show? Why does it matter? What should the clinic do next?

**PetVax Connection:** A clinic owner needs to know: Are we profitable? Which services should we promote? Which vets are overbooked? Which clients are most loyal? BI transforms the clinic's operational database into a decision-support system.

---

## Lab 13: Hardening the PetVax Database

**Chapter:** 13 — Advanced Database Techniques

**Goal:** Harden the clinic database with constraints, indexes, audit trails, triggers, and transactions — the same techniques applied to the Grading Database.

### Tasks

1. **Add CHECK Constraints:**
   - Pet.Weight > 0 (a pet cannot have negative or zero weight).
   - Appointment.ApptDate >= CURRENT_DATE (no backdated appointments without override).
   - Invoice.TotalAmount >= 0 (no negative invoices).
   - AppointmentService.Charge >= 0.
2. **Add Indexes on Frequently-Searched Fields:**
   - Owner.LastName (receptionist lookup).
   - Pet.Name (patient search).
   - Appointment.ApptDate (daily schedule).
   - Invoice.PaidDate (outstanding balance queries).
3. **Build Audit Table for Service Charges:**
   - SERVICE_CHARGE_AUDIT (AuditID, ServiceID, OldCharge, NewCharge, ChangedAt, ChangedBy).
   - Create a trigger that fires on UPDATE to SERVICE.DefaultCharge and logs every change.
   - Test: update a service charge; verify the audit log captured old and new values.
4. **Implement Transaction-Protected Updates:**
   - Scenario: "Increase all service charges by 5%."
   - BEGIN; UPDATE all services; verify new charges; COMMIT or ROLLBACK.
   - Scenario: "Transfer a pet from one owner to another."
   - BEGIN; UPDATE Pet SET OwnerID = new; verify relationship integrity; COMMIT.
5. **Create VET_UTILIZATION_TREND View** — Window functions showing each vet's monthly appointment count alongside a 3-month moving average.

**PetVax Connection:** A production clinic database must prevent data corruption (constraints), track changes for audits and billing disputes (audit table), run fast as the clinic grows (indexes), and protect multi-step business processes (transactions).

---

## Lab 14: Power BI Dashboard for PetVax

**Chapter:** 14 — Power BI

**Goal:** Build a multi-page interactive Power BI dashboard for PetVax showing clinic business performance.

### Tasks

1. **Load Clinic Data** — Connect Power BI to clinic tables: Appointments, Services, Invoices, Owners, Pets, Veterinarians.
2. **Clean with Power Query** — Remove rows with missing critical fields; confirm data types (Charge = Decimal, ApptDate = Date); merge Owner + Pet for convenient patient-owner display.
3. **Create DAX Measures:**
   - Total Revenue = SUM(Invoice[TotalAmount]).
   - Average Revenue per Visit = AVERAGE(Invoice[TotalAmount]).
   - Vet Utilization % = (Appointments per Vet / Available Slots).
   - Client Retention Rate = (Returning Clients / Total Clients).
   - Vaccine Compliance Rate = (Vaccinated Pets / Total Pets).
4. **Build Page 1 — "Clinic Overview":**
   - Card visuals (Total Revenue MTD, Total Appointments, Active Clients).
   - Line Chart (Revenue over time, by month).
   - Bar Chart (Revenue by Service Type).
   - Slicer (Date range filter).
5. **Build Page 2 — "Vet Performance":**
   - Table (Vet Name, Appointment Count, Total Revenue, Avg Revenue per Visit).
   - Bar Chart (Appointments per Vet).
   - Slicer (Veterinarian, Month).
6. **Build Page 3 — "Client Trends":**
   - Line Chart (New vs. Returning Clients by month).
   - Table (Top 10 Clients by Visit Count).
   - Gauge visual (Vaccine Compliance Rate %).
7. **Publish (Optional)** — Save as .pbix; optionally publish to Power BI Service for clinic manager access.

**PetVax Connection:** A clinic owner can see at a glance: revenue trends, which vets/services are popular, which clients are most loyal, which times are busiest. Power BI transforms operational database queries into executive dashboards.

---

## Lab 15: Strategic Analysis of PetVax

**Chapter:** 15 — Business Strategy and Information Systems

**Goal:** Apply strategic frameworks and advanced SQL to PetVax data; write queries that answer high-level business strategy questions.

### Tasks

1. **Trend Analysis — Vet Visit Volume Over Time:**
   - Compute monthly appointment counts.
   - Use window functions to show 3-month moving average.
   - Identify: are bookings trending up or down? Are there seasonal patterns?
2. **Quality Analysis — Service Profitability:**
   - Calculate revenue and count per service type.
   - Identify highest-margin and lowest-margin services.
   - Recommend: which services should the clinic promote? Which may need price adjustment?
3. **Early Warning — Follow-Up Compliance:**
   - Find pets overdue for recommended follow-up (last visit > 6 months, or specific service intervals).
   - Flag for reminder campaign.
   - Calculate potential lost revenue from missed follow-ups.
4. **Scenario Testing — Price Increase Impact:**
   - "If we raise all service charges by 10%, how does annual revenue change?"
   - "If we add one more vet, how many additional appointments can we handle?"
   - Test assumptions with SQL calculations on historical data.
5. **Retention Analysis:**
   - Identify clients who haven't returned in 6+ months.
   - Calculate client lifetime value (total revenue per owner).
   - Segment clients: high-value (top 20%), regular, lapsed.
6. **Forecast Next Month's Revenue** — Based on 12-month trend, seasonal factors, and current appointment bookings.

**PetVax Connection:** Strategic SQL enables clinic leadership to make evidence-based decisions about staffing, pricing, marketing, and service offerings. Moves the database from a record-keeper to a competitive advantage.

---

## Lab 16: Final Integration — PetVax Capstone

**Chapter:** 16 — Final Integration

**Goal:** Deliver a production-ready clinic database mirroring the full Grading Database capstone, demonstrating mastery of all course skills.

### Tasks

**Part A — Design and Implement the Full Schema:**
- 7+ tables: OWNER, PET, VETERINARIAN, APPOINTMENT, SERVICE, APPOINTMENT_SERVICE, INVOICE, PAYMENT.
- All PKs, FKs, CHECK constraints, UNIQUE constraints properly defined.
- Relationships enforced with referential integrity.

**Part B — Write 10–13 Queries Covering:**
- **Operational:** Today's appointment schedule, pets due for vaccination, outstanding invoices.
- **Analytical:** Vet utilization rate, revenue by service type, average charge per visit, client visit frequency.
- **Strategic:** Client lifetime value, revenue forecast, predictive churn indicators, service profitability ranking.

**Part C — Create 2–3 Macros for Routine Tasks:**
- Auto-generate daily appointment list.
- Auto-calculate monthly revenue report.
- Auto-send vaccination reminders (simulated).

**Part D — Document 3 Admin Practices:**
- Security roles (who can access what).
- Backup strategy (frequency, type, storage, retention).
- Integrity checks (routine procedures to verify data quality).

**Part E — Submit Professional Package:**
- ERD diagram (Lucidchart export).
- SQL DDL code (as text, not screenshot).
- Query results with explanations.
- Macro descriptions.
- Admin documentation.
- Final reflection on the full course arc.

**PetVax Connection:** The final capstone demonstrates that students can move from business requirements → design → implementation → queries → automation → governance across a realistic domain. Clinic owner, staff, veterinarians, and manager can all use the system for daily operations and strategic decisions.

---

## Lab 17: Course Reflection and Portfolio

**Chapter:** 17 — Conclusion

**Goal:** Compile a portfolio of PetVax work across all 17 chapters; write a final reflection connecting technical skills to managerial judgment.

### Tasks

1. **Compile PetVax Portfolio:**
   - Collect work from Labs 01–16: ERDs, SQL queries, reports, dashboards, admin documentation.
   - Organize chronologically to show progression from flat tables → relational design → advanced SQL → BI → strategy.
2. **Trace Clinic Database Lifecycle:**
   - How did the clinic schema evolve from Lab 04 (flat tables) through Lab 07 (normalization) to Lab 16 (full production system)?
   - What was the most important design decision you made? Why?
   - Which normalization step had the biggest impact on data quality?
3. **Document 3 Design Choices and Their Organizational Impact:**
   - Example: Why separate OWNER from PET? (Prevents owner duplication; enables owner-level reporting; supports multi-pet households.)
   - Example: Why a junction table for APPOINTMENT_SERVICE? (One appointment can include multiple services; avoids repeating appointment details.)
   - Example: Why a separate INVOICE table? (Decouples billing from appointments; supports partial payments; enables revenue analysis.)
4. **Identify 1 Limitation and Propose Improvement:**
   - What can the current system NOT do that a future version should?
   - Propose a specific schema change, query, or feature to address it.
5. **Write Final Reflection:**
   - How does database design enable or constrain what the clinic can measure and improve?
   - Where is the strongest link between a technical decision you made and a business outcome for the clinic?
   - Which database skill feels most durable for your future professional work?

**PetVax Connection:** By course end, students see databases as more than technology — they are instruments for organizational learning and improvement. A well-designed, well-administered, well-analyzed clinic database enables staff to provide better care, manage finances, grow strategically, and adapt to change.

---

*Generated: 2026-06-16 · Source: `files/source/chapters/` and `BITM330-Book-draft/chapter-drafts/`*
