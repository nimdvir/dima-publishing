# Lumina Lab Platform — Workflow & Architecture

> Master document for the BITM330 AI-graded lab management system.
> Covers: plan, architecture, grading logic, storage, payment, LTI, and build schedule.

---

## Overview

Lumina is a web-based lab platform where students log in, complete ~10 labs, and receive AI-assisted grading with immediate feedback. Instructors manage labs, view analytics, and export grades to Brightspace.

### Core Rules

- 1st wrong attempt → AI-generated hint, no point loss
- 2nd wrong attempt → point deduction, final score recorded
- Late submissions → penalty per day after due date, capped at max late days
- Grading → deterministic checks first, AI only for hints and open-text scoring

---

## Architecture

| Layer        | Tool                                             | Cost                          |
| ------------ | ------------------------------------------------ | ----------------------------- |
| Hosting      | Replit or Vercel                                 | Free to ~$20/mo               |
| Database     | Supabase Postgres or Replit DB                   | Free to ~$10/mo               |
| File storage | Cloudflare R2 or Supabase Storage                | Free to ~$5/mo                |
| Auth         | LTI 1.3 (Brightspace) + email/password fallback  | Free                          |
| Payment      | Stripe                                           | 2.9% + 30¢ per transaction    |
| AI grading   | OpenAI API                                       | ~$5-$20/mo depending on usage |
| **Total**    |                                                  | **~$20-$55/mo**               |

---

## Database Schema

### Existing Tables

- `users` — id, email, first_name, last_name, profile_image_url, created_at, updated_at
- `roles` — user_id, role (student/instructor)
- `labs` — id, title, description, due_date, created_at
- `questions` — id, lab_id, type, content, points, expected_answer, options (jsonb), created_at
- `submissions` — id, lab_id, user_id, status, total_score, submitted_at
- `answers` — id, submission_id, question_id, content, score, feedback, attempts, is_correct
- `sessions` — sid, sess (jsonb), expire

### Tables to Add

- `labs` additions: `late_penalty_per_day` (integer), `max_late_days` (integer)
- `answer_attempts` — one row per try: attempt number, student answer, hint given, score awarded, timestamptz
- `submission_files` — for uploaded CSV/SQL files: storage path, filename, mime type, size, uploaded_at
- `grading_events` — AI audit trail: model used, prompt, raw response, confidence, timestamptz
- `subscriptions` — user_id, plan, status (active/expired/trial), paid_at, expires_at, stripe_session_id
- Change all `timestamp` → `timestamptz`

---

## Answer Capture & Grading

### How Each Type Works

#### Multiple Choice

- **Student submits:** clicks a radio button (A/B/C/D)
- **Stored as:** text in `answers.content` (e.g., `"SELECT"`)
- **Graded by:** exact string match against `questions.expected_answer` — no AI needed
- **Cost:** $0 per grading

#### Numeric

- **Student submits:** types a number into a text input
- **Stored as:** text in `answers.content` (e.g., `"42"` or `"3.14"`)
- **Graded by:** fuzzy numeric match (tolerance range set by instructor, e.g., +/-0.01) — no AI needed
- **Cost:** $0 per grading

#### SQL

- **Student submits:** types SQL code into a code editor
- **Stored as:** raw SQL text in `answers.content`
- **Graded by:**
  1. Execute student SQL + expected SQL against the same test database
  2. Compare result sets (row count, column names, values)
  3. If match → full points
  4. If mismatch → AI generates hint (1st attempt) or deducts points (2nd attempt)
- **Cost:** $0 for comparison; ~$0.01-$0.03 per AI hint call

#### CSV

- **Student submits:** uploads a `.csv` file via file picker
- **Stored as:** file in object storage (R2/Supabase), path in `submission_files` table
- **Graded by:**
  1. Parse student CSV + reference CSV
  2. Compare schema (column names, count, order)
  3. Compare content (row values, row count)
  4. Score based on match percentage
  5. AI generates feedback on mismatches
- **Cost:** ~$0.01-$0.03 per AI feedback call

#### Open Text

- **Student submits:** types free-form text into a textarea
- **Stored as:** text in `answers.content`
- **Graded by:** AI rubric scoring (LLM checks against rubric criteria, returns score + feedback + confidence)
- **Cost:** ~$0.01-$0.03 per call

### Storage Summary

| What                                   | Where                          | Format                                                |
| -------------------------------------- | ------------------------------ | ----------------------------------------------------- |
| MC / Numeric / SQL / Open Text answers | `answers.content` column       | Plain text                                            |
| CSV file uploads                       | Object storage (R2 / Supabase) | `.csv` file                                           |
| CSV file metadata                      | `submission_files` table       | Path, filename, size, timestamp                       |
| Each attempt detail                    | `answer_attempts` table        | Attempt #, answer given, hint shown, score, timestamp |
| AI grading reasoning                   | `grading_events` table         | Model, prompt, response, confidence                   |
| Final scores                           | `submissions.total_score`      | Integer (percentage)                                  |

### API Flow

```
Student browser
     |
     v
Your server (Replit)
     |
     |-- Saves answer --> Database (Supabase)
     |-- Saves files --> Cloud storage (R2)
     |-- Simple grading --> does it internally (string match, SQL compare)
     |-- Hard grading --> calls OpenAI API --> gets score + feedback back
     '-- Sends result --> back to student browser
```

### Estimated AI Cost

- 30 students x 10 labs x ~5 AI-graded questions = ~1,500 calls
- **~$15-$45 total for the semester**

---

## Brightspace Integration

### Phase 1 — CSV Export (Immediate)

- Generate CSV formatted for Brightspace gradebook import
- Instructor downloads from dashboard and uploads manually

### Phase 2 — LTI 1.3 (Week 2)

1. Register Lumina as an LTI 1.3 tool in Brightspace Admin → Manage Extensibility → LTI Advantage
2. Receive: `client_id`, `deployment_id`, `platform_issuer`, `auth_endpoint`, `token_endpoint`, `keyset_url`
3. Build `/lti/launch` route:
   - Validates signed JWT from Brightspace
   - Extracts student identity (name, email, role)
   - Creates or matches user in `users` table
   - Logs student in automatically
4. Use `ltijs` (Node.js) for LTI 1.3 implementation
5. Add LTI grade return via Assignment and Grade Services (AGS) API
6. Keep email/password login as fallback

---

## Payment Gate (Stripe)

1. After first login, check `subscriptions` table for active subscription
2. If missing/expired → redirect to Stripe Checkout (hosted payment page)
3. Stripe webhook confirms payment → set `subscriptions.status = 'active'`
4. Student redirected to lab dashboard
5. Every student page checks `subscription.status === 'active'`
6. Instructors bypass payment (role-based exception)

### Pricing Recommendation

- One-time semester fee: $15-$25
- Free trial: Lab 1 open without payment

---

## Instructor Dashboard

- Per-lab: student list, scores, attempt counts, late penalties applied
- Per-student: question-by-question breakdown (right/wrong, hints used, AI feedback)
- Class-wide: average score, common wrong answers, late submission rate
- Grade export: CSV download button for Brightspace

---

## Build Schedule

### Week 1 — Lock the Foundation

- Finalize 10 labs: title, description, questions, correct answers, point values, due dates
- Fix database schema (add missing tables/columns listed above)
- Harden grading logic (attempt rules, late penalties, deterministic-first grading)

### Week 2 — Brightspace Login via LTI

- Register LTI 1.3 tool in Brightspace
- Build `/lti/launch` endpoint
- Add LTI grade return (AGS)
- Keep email/password fallback

### Week 3 — Payment Gate

- Add `subscriptions` table
- Integrate Stripe Checkout + webhook
- Add access control middleware
- Set pricing

### Week 4 — Instructor Dashboard + Launch

- Build instructor analytics views
- Add grade export CSV
- Pilot with 1 lab + 5 test students
- Fix issues, roll out all 10 labs

### Daily Checklist

- Day 1-2: Lab folder setup + answer keys
- Day 3-4: Login + lab list + lab page
- Day 5-6: Submission save + file upload storage
- Day 7-8: Grading logic + hint/second-attempt penalties
- Day 9: Due date + late penalties
- Day 10: Instructor dashboard basics
- Day 11: Brightspace CSV export
- Day 12: Pilot + bug fixes
- Day 13-14: Roll out all 10 labs

---

## Success Criteria

- [ ] Students can submit all required types (MC, numeric, SQL, CSV, open text)
- [ ] First wrong attempt gives hint; second wrong attempt deducts points
- [ ] Late penalties apply automatically
- [ ] Students can log in from Brightspace (LTI) or email/password
- [ ] Students must pay before accessing labs (Stripe)
- [ ] Instructor can see detailed per-student performance
- [ ] Grades export cleanly for Brightspace
- [ ] AI grading audit trail exists for every AI-scored answer

---

## Decisions Log

| Decision                | Choice                             | Reason                                    |
| ----------------------- | ---------------------------------- | ----------------------------------------- |
| Brightspace integration | LTI 1.3                           | Handles both login and grade return       |
| Payment provider        | Stripe                             | Simplest developer experience and webhooks |
| Auth fallback           | Email/password                     | For direct access outside Brightspace     |
| Pricing model           | One-time semester fee              | Simplest for v1                           |
| Grading approach        | Deterministic first, AI second     | Fairness and explainability               |
| File storage            | Cloudflare R2 or Supabase Storage  | Cheapest for file uploads                 |
| Database                | Supabase Postgres                  | Free tier + easy setup                    |

---
---

# Previous Notes (Raw Planning)

---

you're building a pretty comprehensive lab management system. That's a solid vision. Here's how I'd break down the plan of action.

First, you'd want to start with the core infrastructure. Set up a web application with user authentication so students and instructors can log in separately. You'll need a database to store student accounts, lab assignments, submission history, and grades.

Next, build out the lab interface where students can view questions, download files, and submit their answers. For evaluation, you'd integrate an AI service like OpenAI's API to automatically grade the different question types. For numeric answers, you'd set up fuzzy matching with some tolerance. For multiple choice, straightforward comparison. For SQL and CSV, you'd use AI to validate the logic and correctness rather than exact matching, which is clever because it handles different valid approaches.

Then layer in your grading logic with the attempt system, hints on first wrong attempts, point deductions on second attempts, and late penalties calculated automatically based on due dates.

Finally, for the instructor dashboard, you'd build a view that shows submissions, grades, and detailed feedback on what each student got right or wrong.

As for Brightspace integration, that's definitely possible but comes later. You'd use their API to sync grades back into their system.

## Plan: AI-Graded Lab System for BITM330 (DRAFT)

This plan delivers a phase-1 production MVP for \~10 labs using app login, AI-assisted grading, due dates with late penalties, instructor analytics, and Brightspace CSV grade import/export. It uses your selected defaults: standalone app auth, AI grading for SQL/CSV/open text, one free wrong attempt with hint, and scoring penalties from the second wrong attempt onward. Existing course assets in [Labs](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html), grading artifacts in [grading](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html), and Brightspace notes in [brightspace.md](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html) become the source of truth for content and policy mapping.

**Steps**

1. Define assessment contract and policies in one spec: lab schema, question types, hint flow, attempt logic, late-penalty formula, and final percentage rules; place this in [labs-outline.md](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html) and link policy examples from [RAT-GUIDELINES.md](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html).
2. Normalize the 10 lab packages from [Labs](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html) into a structured manifest (lab metadata, due date, downloadable files, rubric, point weights, SQL dialect flags).
3. Design core data model: users, enrollments, labs, questions, submissions, attempts, hints, penalties, scores, and audit events; map legacy grading compatibility using [GRADECENTER.sql](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html) and grading exports in [grading](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html).
4. Build student workflow endpoints/pages: app login, lab list, lab detail, file downloads, answer submission, immediate feedback, hint on first wrong attempt, deduction on second wrong attempt, and running lab completion percentage.
5. Build grading engine by type:
   * SQL: execute against controlled datasets from [bitm330\_sql\_examples.sql](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html), compare result sets + rubric checks, generate AI hint text.
   * CSV: validate required schema/content against expected templates in [csv\_exports](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html), then apply rubric + AI hinting.
   * Open text: rubric-constrained AI scoring with confidence thresholds and instructor-review fallback for low-confidence cases.
6. Implement scoring service: per-question points, attempt penalties, late penalties by day after due date, per-lab percentage, and course aggregate; persist both raw and adjusted scores for transparency.
7. Build instructor console: per-student/per-lab drilldown, right/wrong by question type, attempt history, late-penalty trace, and exportable grade sheet.
8. Implement Brightspace phase-1 integration: generate/import CSV mappings aligned to gradebook columns, with idempotent re-export and reconciliation logs; use guidance in [brightspace.md](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html).
9. Add reliability controls: prompt templates for hints/scoring, deterministic rubric checks before AI, rate limits, retry handling, and full grading audit logs for disputes.
10. Pilot with 1 lab end-to-end, then scale to all 10 labs after rubric tuning and score-consistency checks.

**Verification**

* Policy tests: simulate first/second wrong attempts, due-date crossings, and mixed penalties; confirm final percentages are reproducible.
* Grading tests: gold-standard submissions for SQL/CSV/open text with expected outputs and boundary cases.
* Instructor checks: verify drilldown shows exact wrong/right rationale and penalty calculations.
* LMS checks: round-trip sample grade CSV into Brightspace sandbox and verify column mappings and overwrite behavior.
* UAT: run a small student pilot on one lab before full rollout.

**Decisions**

* Chose CSV Brightspace integration first for fastest deploy and lowest risk.
* Chose standalone app authentication for phase 1 to avoid LMS identity dependency.
* Chose hybrid grading (deterministic rubric first, AI feedback/scoring second) to improve fairness and explainability.

---

# **Simple Steps**

1. Decide your 10 labs and what each lab asks students to submit (number, multiple choice, SQL, or CSV).
2. For each lab, create the “correct answers” files (especially the CSVs and expected SQL results).
3. Build one student website with login, lab list, submit button, and score display.
4. Add grading rules:

* First wrong try: show a hint.
* Second wrong try: subtract points.
* After due date: subtract late points each day.

5. Save student uploads in private storage (not inside your course files).
6. Save grades and attempts in a database so you can track history.
7. Build an instructor page to see who got what right/wrong and each student’s final percent.
8. Export grades to a Brightspace-friendly CSV and upload it to Brightspace.
9. Test with one lab first, fix issues, then copy the same setup to all 10 labs.
10. Go live for students.

**Where things go (easy rule)**

* Correct answer CSVs: in your course content area (organized by lab).
* Student files: in secure app storage.
* Scores/attempts: in database.
* Platform code: in a separate app/project folder.

If you want, I can give you a Week 1–Week 4 build schedule with exactly what to do each week.

## Plan: 4-Week Beginner Build

You’ll build this in small pieces so nothing is overwhelming. Goal by Week 4: students can submit labs, AI grades them with your rules, and you can export to Brightspace.

**Week 1 — Organize Content + Rules**

* Create a folder for each lab in [Labs](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html): `lab01` … `lab10`.
* In each lab folder, add:
  * Instructions students read
  * Download files students need
  * Correct-answer files (CSV keys, expected SQL outputs)
  * Point values per question
* Write one grading policy page:
  * 1st wrong attempt = hint only
  * 2nd wrong attempt = point deduction
  * Late penalty = points off per day after due date
* Deliverable: all 10 labs exist with answer keys and point rules.

**Week 2 — Build Student Side (MVP)**

* Create the platform project folder (separate from course content), e.g. platform.
* Build simple pages:
  * Login page
  * “My Labs” page
  * Lab detail page (questions + file upload)
  * Submission result page (score + hint/penalty message)
* Connect page forms to save submissions.
* Deliverable: one lab can be opened and submitted end-to-end.

**Week 3 — Add Grading Engine + Storage**

* Store student uploaded files in private storage (not in Git/course folders).
* Store attempts/scores in a database (student, lab, attempt #, raw score, penalties, final %).
* Implement grader logic:
  * Numeric and MC checks
  * SQL check (compare result set)
  * CSV check (compare schema/content)
  * AI hint generation and AI rubric scoring for open text
* Add due-date and late-penalty calculation.
* Deliverable: one lab fully auto-graded with attempt and late rules working.

**Week 4 — Instructor Dashboard + Brightspace Workflow**

* Build instructor view:
  * Per student: right/wrong by question
  * Attempts history
  * Late penalties applied
  * Final percentage
* Add grade export CSV and place output in [grading](vscode-file://vscode-app/c:/Users/nd115232/AppData/Local/Programs/Microsoft%20VS%20Code/072586267e/resources/app/out/vs/code/electron-browser/workbench/workbench.html) for Brightspace upload.
* Pilot with 5–10 students on 1 lab, fix issues, then copy configuration to labs 2–10.
* Deliverable: full course-ready workflow for all labs.

## Daily “What do I do first?” checklist

* Day 1–2: Lab folder setup + answer keys.
* Day 3–4: Login + lab list + lab page.
* Day 5–6: Submission save + file upload storage.
* Day 7–8: Grading logic + hint/second-attempt penalties.
* Day 9: Due date + late penalties.
* Day 10: Instructor dashboard basics.
* Day 11: Brightspace CSV export.
* Day 12: Pilot + bug fixes.
* Day 13–14: Roll out all 10 labs.

## Success criteria

* Students can submit all required types (number, MC, SQL, CSV, open text).
* First wrong attempt gives hint; second wrong attempt deducts points.
* Late penalties apply automatically.
* Instructor can see detailed performance.
* Grades export cleanly for Brightspace.
  
  # Steps
  
  ## Plan: Ship Lumina Lab Platform (Updated)

Two new requirements added: **Brightspace login (LTI)** and ​**paid access**​. Here is every step, in order, written simply.

---

### Phase 1 — Lock the Foundation (Week 1)

1. **Finalize your 10 labs.** For each lab, write: title, description, questions (MC / numeric / SQL / CSV / open text), correct answers, point values, and due date. Store answer keys in a private folder on the server (never visible to students).
2. **Fix the database.** Add missing columns/tables:
   * `labs`: add `late_penalty_per_day` (integer), `max_late_days` (integer).
   * `answer_attempts`: new table — one row per try (attempt number, student answer, hint given, score awarded, timestamp).
   * `submission_files`: new table — for uploaded CSV/SQL files (storage path, filename, size, uploaded\_at).
   * `grading_events`: new table — AI audit trail (model used, prompt, raw response, confidence, timestamp).
   * Change all `timestamp` → `timestamptz`.
3. **Harden grading logic.**
   * 1st wrong attempt → show AI-generated hint, no point loss.
   * 2nd wrong attempt → deduct points, record final score.
   * Late submissions → auto-apply `late_penalty_per_day × days_late`, cap at `max_late_days`.
   * SQL/CSV → run deterministic checks first (result-set match, schema match), then AI for feedback text only.

---

### Phase 2 — Brightspace Login via LTI (Week 2)

4. **Register Lumina as an LTI 1.3 tool in Brightspace.**
   * In Brightspace Admin → Manage Extensibility → LTI Advantage → register a new tool.
   * You'll get: `client_id`, `deployment_id`, `platform_issuer`, `auth_endpoint`, `token_endpoint`, `keyset_url`.
5. **Add LTI launch endpoint to Lumina.**
   * Build a `/lti/launch` route that:
     * Validates the signed JWT from Brightspace.
     * Extracts student identity (name, email, role).
     * Creates or matches a user in your `users` table.
     * Logs the student in automatically (no separate password needed).
   * Use an open-source LTI 1.3 library (e.g., `ltijs` for Node.js).
6. **Add LTI grade return (Assignment and Grade Services).**
   * After grading, push the final lab percentage back to Brightspace gradebook automatically via the AGS API.
   * This replaces the manual CSV export for Brightspace-launched sessions.
7. **Keep email/password login as fallback** for users who access Lumina directly (not through Brightspace).

---

### Phase 3 — Payment Gate (Week 3)

8. **Choose a payment provider.** Stripe is simplest for one-time or semester access fees.
9. **Add a `subscriptions` table:**
   * `user_id`, `plan` (e.g., "semester"), `status` (active/expired/trial), `paid_at`, `expires_at`, `stripe_session_id`.
10. **Build the payment flow:**
   * After first login (LTI or email), check if user has an active subscription.
   * If not → redirect to a payment page showing your price.
   * User pays via Stripe Checkout (hosted page, no credit card form to build yourself).
   * Stripe webhook confirms payment → set subscription to `active`.
   * Student is redirected to their lab dashboard.
11. **Add access control middleware:**
   * Every student page checks: `subscription.status === 'active'`?
   * If expired or missing → redirect to payment page.
   * Instructors bypass payment (role-based exception).
12. **Set your pricing.** Common models:
   * One-time semester fee (e.g., \$15–\$25).
   * Per-lab unlock (e.g., \$3 each) — more complex, probably not worth it for v1.
   * Free trial for Lab 1 so students can test before paying.

---

### Phase 4 — Instructor Dashboard + Analytics (Week 4)

13. **Build instructor views:**
    * Per-lab: list of students, scores, attempt counts, late penalties applied.
    * Per-student: question-by-question breakdown (right/wrong, hints used, AI feedback given).
    * Class-wide: average score, common wrong answers, late submission rate.
14. **Add grade export:** CSV download button formatted for Brightspace manual import (backup to LTI grade return).

---

### Phase 5 — Test and Launch (Week 4–5)

15. **Pilot with 1 lab + 5 test students:**
    * Test LTI launch from Brightspace sandbox.
    * Test payment flow end-to-end.
    * Test grading: correct, 1st wrong (hint), 2nd wrong (penalty), late, on-time.
    * Test instructor dashboard shows all data.
16. **Fix issues from pilot.**
17. **Roll out all 10 labs** and announce to the class.

---

### Architecture summary

| Layer           | Tool                                            | Cost                                                      |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------------- |
| Hosting         | Replit (current) or Vercel                      | Free to \~\$20/mo                                         |
| Database        | Supabase Postgres or Replit DB                  | Free to \~\$10/mo                                         |
| File storage    | Cloudflare R2 or Supabase Storage               | Free to \~\$5/mo                                          |
| Auth            | LTI 1.3 (Brightspace) + email/password fallback | Free                                                      |
| Payment         | Stripe                                          | 2.9% + 30¢ per transaction                               |
| AI grading      | OpenAI API                                      | \~\$5–\$20/mo depending on usage                         |
| **Total** |                                                 | ​**\~\$20–\$55/mo**​, offset by student payments |

---

### Decisions made

* LTI 1.3 chosen over simple OAuth because it also handles grade return to Brightspace.
* Stripe chosen over PayPal for simpler developer experience and webhooks.
* Email/password login kept as fallback alongside LTI.
* One-time semester fee recommended over per-lab pricing for simplicity.

Here's how each answer type gets captured, stored, and graded:

---

### Multiple Choice

* **Student submits:** clicks a radio button (A/B/C/D)
* **Stored as:** single text value in `answers.content` (e.g., `"SELECT"`)
* **Graded by:** exact string match against `questions.expected_answer` — no AI needed

### Numeric

* **Student submits:** types a number into a text input
* **Stored as:** text in `answers.content` (e.g., `"42"` or `"3.14"`)
* **Graded by:** fuzzy numeric match (tolerance range you set, e.g., ±0.01) — no AI needed

### SQL

* **Student submits:** types SQL code into a code editor (textarea with monospace font)
* **Stored as:** raw SQL text in `answers.content` (e.g., `"SELECT * FROM users;"`)
* **Graded by:**
  1. Execute student SQL + expected SQL against the same test database
  2. Compare result sets (row count, column names, values)
  3. If result sets match → full points
  4. If mismatch → AI generates a hint explaining what's wrong (first attempt) or deducts points (second attempt)

### CSV

* **Student submits:** uploads a `.csv` file via file picker
* **Stored as:** file saved to object storage (Cloudflare R2 / Supabase Storage), path recorded in `submission_files` table
* **Graded by:**
  1. Parse student CSV + reference CSV
  2. Compare schema (column names, count, order)
  3. Compare content (row values, row count)
  4. Score based on match percentage
  5. AI generates feedback on mismatches

### Open Text

* **Student submits:** types free-form text into a textarea
* **Stored as:** text in `answers.content`
* **Graded by:** AI rubric scoring (LLM checks against your rubric criteria, returns score + feedback + confidence level)

---

### Where everything lives

| What                                   | Where                          | Format                                                |
| ---------------------------------------- | -------------------------------- | ------------------------------------------------------- |
| MC / Numeric / SQL / Open Text answers | `answers.content` column   | Plain text                                            |
| CSV file uploads                       | Object storage (R2 / Supabase) | `.csv` file                                       |
| CSV file metadata                      | `submission_files` table   | Path, filename, size, timestamp                       |
| Each attempt detail                    | `answer_attempts` table    | Attempt #, answer given, hint shown, score, timestamp |
| AI grading reasoning                   | `grading_events` table     | Model, prompt, response, confidence                   |
| Final scores                           | `submissions.total_score`  | Integer (percentage)                                  |

---

### Summary rule

* **Text-based answers** (MC, numeric, SQL, open text) → stored directly in the database
* **File-based answers** (CSV) → stored in cloud file storage, metadata in database
* **Grading** → deterministic checks first (match, compare), AI only for hints and open-text scoring



