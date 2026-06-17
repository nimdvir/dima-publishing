# Brightspace + Gradescope Lab Platform (MCQ/Numeric in Brightspace, SQL/CSV Autograded in Gradescope)

## Summary (what you get)
- **Students** do multiple-choice + numeric questions in **Brightspace Quizzes**, and do **SQL + CSV submission labs** in **Gradescope Programming Assignments** launched from Brightspace via **LTI 1.3**, with **automatic grade passback** to the Brightspace gradebook. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  
- **Grading is deterministic** (rule-based, dispute-resistant). **AI is used only to suggest/explain** (e.g., generate safe hint text tied to deterministic failure codes), not to decide points.

## Simple → complex options ladder (as requested)
1. **Brightspace-only**: Quizzes + Assignments; SQL/CSV mostly manual grading (fastest, least automation).
2. **Brightspace + LTI autograder SaaS (Chosen)**: Brightspace for quizzes; Gradescope for SQL/CSV autograding + grade passback. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  
3. **Self-host open-source-ish lab engine** (e.g., PrairieLearn with LTI 1.3): more control, more ops burden. ([docs.prairielearn.com](https://docs.prairielearn.com/lti13/?utm_source=openai))  
4. **Full custom build** (your SRS path): maximum control (attempt logic, AI services, analytics), maximum engineering effort.

## Chosen approach (locked decisions)
- **LTI tool**: **Gradescope** + Brightspace via **LTI 1.3** + grade sync. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  
- **MCQ + numeric** live in **Brightspace Quizzes**.
- **SQL dialect**: **SQLite** (aligns with your labs outline using SQLite; avoids standing up Postgres in the autograder).
- **AI mode**: “**AI suggests; rules finalize**” (AI generates/maintains feedback text and error classifications; scoring stays deterministic).

## In scope vs out of scope
**In scope (v1)**
- SQL file submission autograding (result-set based) + partial credit via deterministic invariants.
- CSV upload autograding (schema + constraints + metrics) + partial credit via deterministic rubric.
- Brightspace gradebook passback for Gradescope items.

**Out of scope (v1)**
- Building a new custom web app UI (your FastAPI/Next.js plan is a later “Option 4”).
- Real-time AI grading that can change points.

---

# Phase 0 — Prereqs & constraints check (1–2 days)

## 0.1 Confirm Gradescope capability/licensing
- Verify you have **Programming Assignments** available (institutional license / Gradescope Complete). ([gradescope.com](https://www.gradescope.com/help?utm_source=openai))  

## 0.2 Identify the two people you need
- **Brightspace admin** (can create/register LTI Advantage tools + deployments + links).
- **Gradescope admin/account manager** (can enable LTI integration permissions for your account). ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  

**Acceptance**: Both confirm they can complete Phase 1 within the semester timeline.

---

# Phase 1 — Institution-level Brightspace ↔ Gradescope LTI 1.3 setup (admin-owned)

This phase is done once per Brightspace instance (prod + optionally a test/staging environment).

## 1.1 Enable Gradescope integration permissions
- Admin emails Gradescope support to enable LTI integration permissions on the right Gradescope account. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  

## 1.2 Register LTI 1.3 tool (Brightspace admin)
Follow the Gradescope Brightspace admin guide end-to-end:
- Create LTI 1.3 registration in Gradescope and copy the required “Gradescope” registration details into Brightspace tool registration. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  
- In Brightspace, create a **Deployment** for the tool:
  - Enable it
  - Select all required **Extensions**
  - Configure security settings (exclude anonymous)
  - Set “Open as External Resource” and “Grades created by LTI will be included in Final Grade” as recommended in the guide. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  

## 1.3 Create two LTI links in Brightspace (admin)
- Create:
  1) **Course-level Basic Launch link**
  2) **Assignment-level Deep Linking Quicklink**
- Use the launch URL given in the guide (e.g., `https://lti.int.turnitin.com/launch/gs`). ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  

## 1.4 (Optional but recommended) Sync Student ID to Gradescope
- Enable the Brightspace config variable in the guide so Gradescope receives student IDs. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  

## 1.5 Validate the LTI install in a test course
- Launch the tool from Brightspace Content as instructor and student; confirm course linking works. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/21791026788109-Configuring-Gradescope-LTI-1-3-in-Brightspace-D2L-for-Admins?utm_source=openai))  

**Acceptance**
- Tool appears under Brightspace External Tools.
- Instructor can launch; student can launch; roster sync and grade sync controls are visible/working in Gradescope.

---

# Phase 2 — Course template setup (instructor-owned)

## 2.1 Brightspace structure (repeatable each term)
- Create a Brightspace module structure:
  - `Quizzes` (Brightspace-native MCQ + numeric)
  - `Labs (Gradescope)` (Gradescope links)
- Add the **course-level Gradescope link** and keep it instructor-facing if desired (optional “hidden” module pattern). ([uvm.edu](https://www.uvm.edu/it/kb/article/brightspace-add-gradescope/?utm_source=openai))  

## 2.2 Gradescope course linking + roster sync
- Launch Gradescope from the Brightspace course and link/create the Gradescope course from that launch path (keeps identity mapping clean). ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/23587619649805-Using-Gradescope-LTI-1-3-with-Brightspace-D2L-as-an-Instructor?utm_source=openai))  

**Acceptance**
- Roster in Gradescope matches Brightspace enrollment.
- No duplicate student accounts are created.

---

# Phase 3 — Autograder codebase (developer-owned, deterministic by design)

## 3.1 Repository layout (decision complete)
Create a dedicated repo/folder (recommended name: `bitm330-autograders/`) with:

- `common/`
  - `gradescope_results.py` (writes `/autograder/results/results.json`)
  - `feedback_catalog.yml` (error-code → hint text; AI-authored offline)
  - `scoring.py` (weights + rubric)
- `labs/`
  - `lab01_sql_<topic>/`
    - `autograder_zip/`  ← **this folder is zipped and uploaded**
      - `setup.sh`
      - `run_autograder`
      - `source/` (grader code + datasets + reference assets)
    - `starter_files/` (what students download)
    - `reference/` (instructor-only reference queries & expected metrics; never shipped to students)

**Gradescope constraints to follow**
- Autograder upload is a **zip** with **`setup.sh`** and **`run_autograder`** at the **root**. ([gradescope-autograders.readthedocs.io](https://gradescope-autograders.readthedocs.io/en/latest/specs/?utm_source=openai))  
- Write output to `/autograder/results/results.json`. ([gradescope-autograders.readthedocs.io](https://gradescope-autograders.readthedocs.io/en/latest/specs/?utm_source=openai))  
- stdout from `run_autograder` is for instructor debugging; student-visible text must go in the JSON `"output"` field. ([gradescope-autograders.readthedocs.io](https://gradescope-autograders.readthedocs.io/en/latest/specs/?utm_source=openai))  
- Ensure a `results.json` is written even on partial failures. ([gradescope-autograders.readthedocs.io](https://gradescope-autograders.readthedocs.io/en/latest/best_practices/?utm_source=openai))  

## 3.2 “Interfaces” (what students submit)
Lock these submission contracts:

### SQL lab contract
- Student uploads: `answer.sql`
- `answer.sql` must contain **exactly one** `SELECT` statement.

### CSV lab contract
- Student uploads: `submission.csv`
- UTF-8 CSV, header row required.

(Autograder may also accept “any `.sql` file” / “any `.csv` file” as a fallback, but the *official* contract stays simple.)

## 3.3 Deterministic partial credit rubric (standardized)
Every autograded lab returns:
- **Total score** (0–100)
- **Breakdown** (rubric checks as weighted tests)
- **Student feedback**: safe hints tied to failure codes (no reference answers)

### SQL scoring rubric (default template)
- 20 pts: parses as single `SELECT` (reject `INSERT/UPDATE/DELETE/DDL`, reject multiple statements)
- 20 pts: correct column set (names + count)
- 20 pts: correct row count (after normalization)
- 40 pts: correct result invariants match reference (see below)

### SQL invariants (how partial credit stays defensible)
For each SQL lab, you precompute invariants from the **reference query output** (kept instructor-only), e.g.:
- row count
- distinct count of key columns
- min/max/sum/avg for numeric columns
- set equality for specific key columns (optionally)

Student output is normalized and compared against these invariants; each invariant is a separate weighted check.

### CSV scoring rubric (default template)
- 10 pts: file readable + delimiter detection
- 20 pts: header schema (required columns present; optional extra columns ignored)
- 20 pts: type checks (numeric/date parsing success rates)
- 20 pts: constraints (no nulls in required cols, uniqueness, ranges)
- 30 pts: computed metrics (group-bys, totals) match expected values (within tolerance)

## 3.4 Safety + integrity defaults (no runtime AI needed)
- **No student submission content is sent to external AI at runtime** (keeps FERPA/legal simpler and avoids autograder network dependency).
- AI is used **offline** to author the `feedback_catalog.yml` and per-lab hint text (one-time generation + human review).
- Student-visible feedback is **canned** and keyed by deterministic failure codes:
  - e.g., `SQL_NON_SELECT`, `SQL_MULTI_STMT`, `SQL_WRONG_COLUMNS`, `CSV_MISSING_COLS`, `CSV_BAD_TYPES`, etc.

## 3.5 Gradescope “visibility” policy for tests
- Student-visible tests: high-level rubric checks + friendly hints.
- Instructor-only diagnostics: placed in autograder stdout and/or hidden tests (if you use a helper like `gradescope_utils` visibility decorators). ([gradescope-autograders.readthedocs.io](https://gradescope-autograders.readthedocs.io/en/latest/specs/?utm_source=openai))  

---

# Phase 4 — Build 1 pilot lab end-to-end (the “golden path”)

## 4.1 Pick one SQL lab + one CSV lab
- Choose the two most representative assignments (one JOIN-heavy SQL, one CSV schema+metric heavy).

## 4.2 Local testing loop (before uploading)
- Build the autograder zip.
- Run it locally in Docker (simulate Gradescope directory structure: `/autograder/submission`, `/autograder/results`).
- Validate `results.json` formatting and scoring.

## 4.3 Upload + “Test Autograder” in Gradescope
- Use Gradescope’s autograder test workflow before releasing to students. ([gradescope-autograders.readthedocs.io](https://gradescope-autograders.readthedocs.io/en/latest/best_practices/?utm_source=openai))  

**Acceptance**
- Correct submission gets 100.
- Common wrong submissions get partial credit + correct failure-code feedback.
- No reference solution text leaks.

---

# Phase 5 — Brightspace linking + grade passback validation (AGS)

## 5.1 Create/link Gradescope assignments from the Brightspace-launched course
- When an assignment is linked, it creates a Brightspace gradebook item automatically. ([guides.gradescope.com](https://guides.gradescope.com/hc/en-us/articles/23587619649805-Using-Gradescope-LTI-1-3-with-Brightspace-D2L-as-an-Instructor?utm_source=openai))  

## 5.2 Validate Brightspace gradebook behavior
- Brightspace auto-creates the gradebook entry after receiving a score from the tool (important for “why don’t I see the grade item yet?” troubleshooting). ([community.d2l.com](https://community.d2l.com/brightspace/kb/articles/23752-assignments-and-grades-services-extension-with-lti-1-3?utm_source=openai))  
- Be deliberate about link placement:
  - Multiple placements of the *same link* map to the same grade object via Resource Link ID.
  - If you need multiple distinct grade items, create distinct links (or use deep linking). ([community.d2l.com](https://community.d2l.com/brightspace/kb/articles/23752-assignments-and-grades-services-extension-with-lti-1-3?utm_source=openai))  

**Acceptance**
- Submitting to the Gradescope assignment results in a grade appearing in Brightspace without manual export/import.
- Regrades in Gradescope update Brightspace grades predictably.

---

# Phase 6 — Scale to ~10 labs + operationalize

## 6.1 Standardize the lab template
For each module:
- Brightspace Quiz: MCQ + numeric (immediate feedback; Brightspace-native).
- Gradescope Lab: SQL and/or CSV autograded.

## 6.2 Authoring workflow (repeatable)
- For each new Gradescope lab:
  1) Create dataset + reference answer (private)
  2) Generate invariants/expected metrics
  3) Implement rubric checks
  4) Generate feedback text (AI-assisted offline) + human review
  5) Upload autograder zip + test + release

## 6.3 Documentation deliverables
- Student “How to submit” (screenshots, required filenames).
- Instructor “How to update autograders + rerun submissions”.
- A “known errors” page mapped to failure codes.

---

# Test cases & acceptance criteria (must-pass)

## Deterministic grading tests (local)
- SQL:
  - non-SELECT statement rejected
  - multiple statements rejected
  - correct but different ordering still passes when `order_matters=false`
  - incorrect filter fails invariants but still earns column/rowcount points
  - timeout query returns clean error + partial/zero score and always writes results.json ([gradescope-autograders.readthedocs.io](https://gradescope-autograders.readthedocs.io/en/latest/best_practices/?utm_source=openai))  
- CSV:
  - wrong delimiter / malformed quoting detected
  - missing required column
  - extra columns ignored (if configured)
  - wrong types (e.g., “N/A” in numeric) handled with clear feedback
  - metric mismatch yields partial credit

## LTI/AGS validation (in Brightspace sandbox course)
- Instructor launch works
- Student launch works
- First graded submission creates/updates Brightspace gradebook item. ([community.d2l.com](https://community.d2l.com/brightspace/kb/articles/23752-assignments-and-grades-services-extension-with-lti-1-3?utm_source=openai))  
- Distinct lab links create distinct grade items (deep linking / multiple links). ([community.d2l.com](https://community.d2l.com/brightspace/kb/articles/23752-assignments-and-grades-services-extension-with-lti-1-3?utm_source=openai))  

---

# Assumptions & defaults
- You can get Brightspace admin support to register LTI Advantage tools and deployments (Phase 1).
- You have (or can obtain) Gradescope Programming Assignments access. ([gradescope.com](https://www.gradescope.com/help?utm_source=openai))  
- SQL labs can be expressed in SQLite (if you later need Postgres/SQL Server dialect features, we’ll revise the SQL sandbox strategy).
- “AI partial credit” means: **AI-authored feedback + error classification**, with **deterministic points** (no runtime AI score changes).

---

# Future upgrade path (if you later want the fully custom platform)
- Once this workflow is stable, you can lift the deterministic graders (SQL/CSV rubric engine) into your custom FastAPI/Next.js tool and keep Brightspace integration via LTI 1.3 + AGS (your existing SRS/plan docs already align with that direction).
