# Chat: Summer Lab 4 Build-Out — 2026-07-13

**Source:** Copilot
**Original link:** n/a — local Copilot session

> Reopen: open this file in VS Code, or start a new chat and paste the TL;DR
> below as context.

---

## TL;DR

Built and finalized the complete Summer Lab 4 package for Chapters 10-11 (PetVax SQL Analysis and Database Safety). Created a self-contained HTML walkthrough with Google Drive download links, redesigned the 10-question Brightspace quiz from regurgitation-based to concept-application questions (1 SA + 7 MC + 2 MS), created standalone submission instructions (MD + HTML), and fixed cross-file consistency issues across all 8 files in the package. The lab is now deployment-ready with the walkthrough showing students how to do the work and the quiz testing whether they understood the concepts in new scenarios.

---

## Key Points

- **Walkthrough + quiz separation:** The HTML walkthrough teaches how; the quiz tests understanding in new scenarios (not just "what number did you get?").
- **Quiz redesign:** Changed all 10 questions from regurgitation ("what was the count?") to concept application ("what happens if you change LEFT JOIN to INNER JOIN?"). Mix: 1 number-entry + 7 multiple choice + 2 multi-select.
- **Submission instructions:** Separate MD + HTML file with file naming rules, 5-point verification checklist, submission steps, and FAQ.
- **Template value:** The codey lab template (walkthrough HTML + setup SQL + student template SQL + quiz CSV) is reusable for future labs.

---

## What Was Done

### Lab package finalization
- Created `summer-lab-04-instructions-2026-07-13-codey.html` — self-contained walkthrough with Google Drive links, chapter reading links, 5-step walkthrough, expected results
- Created `summer-lab-04-quiz-2026-07-13-codey.md` — instructor quiz answer key with all 10 redesigned questions
- Rewrote `summer-lab-04-brightspace-quiz-2026-07-13-codey.csv` — 10 questions testing concept application (not recall)
- Created `summer-lab-04-submission-instructions-2026-07-13-codey.md` and `.html` — standalone submission guide
- Updated `summer-lab-04-instructor-guide-2026-07-13-codey.md` — quiz key, question mix, design note
- Updated `summer-lab-04-student-instructions-2026-07-13-codey.md` — new quiz topics list

### Cross-file audit
- Verified setup SQL produces exactly the advertised results (12 appointments, 475.00 unpaid, etc.)
- Verified student template has 5 correct TODO markers
- Verified instructor solution matches filled template exactly
- Fixed quiz topic #7 mismatch (said "ACID property" but question is about ROLLBACK statements)
- Fixed index query-plan expectation (changed "should include" to "may include")
- Removed duplicate sentence in instructor guide

### Quiz design principles
- Q1 (MC): What if LEFT JOIN → INNER JOIN?
- Q2 (MS): GROUP BY behavior (3 correct of 5)
- Q3 (MC): NULL in new context (hospital DischargeDate)
- Q4 (SA): Calculate average appointments per vet (3)
- Q5 (MC): What COALESCE does / what happens without it
- Q6 (MC): COMMIT instead of ROLLBACK outcome
- Q7 (MS): Transaction concepts (3 correct of 5)
- Q8 (MC): What integrity_check actually verifies
- Q9 (MC): Choosing right column to index (OwnerID for WHERE OwnerID = 5)
- Q10 (MC): When NOT to add an index (heavy write, few reads)

---

## Key Files

| File | Action |
|------|--------|
| `student-files/summer-lab-04-instructions-2026-07-13-codey.html` | Created — walkthrough |
| `student-files/summer-lab-04-submission-instructions-2026-07-13-codey.html` | Created — submission guide |
| `student-files/summer-lab-04-submission-instructions-2026-07-13-codey.md` | Created — submission guide (source) |
| `instructor-files/summer-lab-04-brightspace-quiz-2026-07-13-codey.csv` | Replaced — concept-application quiz |
| `instructor-files/summer-lab-04-quiz-2026-07-13-codey.md` | Replaced — quiz answer key |
| `instructor-files/summer-lab-04-instructor-guide-2026-07-13-codey.md` | Updated — quiz key, design note |
| `student-files/summer-lab-04-student-instructions-2026-07-13-codey.md` | Updated — quiz topics, index wording |
| `student-files/SummerLab4-PetVax-StudentTemplate-codey.sql` | Unchanged |
| `student-files/petvax-summer-lab4-setup-2026-07-13-codey.sql` | Unchanged |
| `instructor-files/summer-lab-04-instructor-solution-2026-07-13-codey.sql` | Unchanged |

---

## Lab Template for Reuse

For future summer labs, replicate this structure:

**Student-facing (3-5 files):**
- `summer-lab-0N-instructions-YYYY-MM-DD-codey.html` — self-contained HTML walkthrough
- `summer-lab-0N-submission-instructions-YYYY-MM-DD-codey.html` — standalone submission guide
- `petvax-summer-lab0N-setup-YYYY-MM-DD-codey.sql` — deterministic setup
- `SummerLab0N-PetVax-StudentTemplate-codey.sql` — scaffolded template

**Instructor-only (4 files):**
- `summer-lab-0N-quiz-YYYY-MM-DD-codey.md` — quiz answer key
- `summer-lab-0N-brightspace-quiz-YYYY-MM-DD-codey.csv` — Brightspace import
- `summer-lab-0N-instructor-guide-YYYY-MM-DD-codey.md` — rubric + quiz key
- `summer-lab-0N-instructor-solution-YYYY-MM-DD-codey.sql` — filled template

**Design rule:** Walkthrough shows how; quiz tests why (concept application in new scenarios, not regurgitation).

**Google Drive sharing:** Upload SQL files to Drive, get shareable links, embed in HTML instructions.
