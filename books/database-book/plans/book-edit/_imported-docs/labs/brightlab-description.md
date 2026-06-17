## BrightLab Grading Tool — Platform Description

The **BrightLab Grading Tool** is a specialized lab platform designed to work alongside **Brightspace** by providing students with a dedicated, interactive environment for completing and receiving feedback on structured assignments. Rather than replacing Brightspace, BrightLab extends it with a purpose-built workspace for **Multiple Choice, Numeric, SQL, and CSV-based questions**, while giving instructors a centralized dashboard for **lab management, grading, and grade export**.

At its core, BrightLab functions as a smart assignment and grading layer — one that combines **deterministic, code-based evaluation** with **AI-assisted feedback** to create a more scalable, transparent, and pedagogically useful lab experience.

---

## Platform Overview

BrightLab supports a lab workflow in which students can:

* answer **multiple-choice questions**
* enter **numeric responses**
* write and test **SQL queries**
* upload and validate **CSV files**
* receive **instant grading and feedback**
* get **AI-generated hints** after an incorrect first attempt

For instructors, the platform provides tools to:

* create, edit, and manage labs
* control lab visibility
* monitor student progress and submissions
* export grades in a **Brightspace-compatible CSV format**
* seed the application with example data for testing and demonstration

This makes BrightLab especially well suited for courses in **business analytics, databases, data management, information systems, and quantitative lab-based instruction**, where assignments often require more than simple file uploads or manual grading.

---

## Student Workspace

The student-facing environment is designed as a focused lab workspace in which learners can complete structured assignments and receive immediate, actionable feedback.

### Supported Question Types

BrightLab currently supports four question types:

* **Multiple Choice** — graded by exact match
* **Numeric** — graded through deterministic numeric comparison
* **SQL** — executed against a mock in-browser database for live validation
* **CSV** — parsed and checked automatically using structured comparison logic

### Deterministic Grading

A central design principle of BrightLab is that correctness is determined by **code, not by AI judgment**. This ensures that grades are:

* reproducible
* defensible
* immediate
* consistent across students

Multiple-choice and numeric responses are graded instantly. SQL questions are evaluated using **`sql.js`**, allowing student queries to run directly in the browser against a mock database. CSV submissions are parsed and validated using **`papaparse`**, enabling structured checks of file contents and format.

### Attempt Logic

Each question allows **two attempts**:

* **Correct on the first attempt** → student earns **100% of the points**
* **Correct on the second attempt** → student earns **75% of the points**
* After the second attempt, the question is locked

This logic rewards accuracy while still allowing students a meaningful opportunity to recover from an initial mistake.

### AI-Powered Hints

If a student answers a question incorrectly on the first try, the system uses **Gemini 2.0 Flash** to generate a **directional hint**. The hint is designed to help the student rethink the problem without revealing the correct answer.

This is an important pedagogical distinction:
**AI provides guidance, but not the grade.**

In practice, the hint system can nudge a student toward issues such as:

* checking a `WHERE` clause in SQL
* reviewing a numeric calculation
* re-examining CSV formatting or missing values
* reconsidering a concept underlying a multiple-choice response

This makes the tool more supportive than a conventional auto-grader, while preserving grading integrity.

---

## Real SQL Execution

One of BrightLab’s strongest features is its support for **real SQL evaluation**.

Instead of checking SQL answers as plain text, the platform executes student queries against a **mock in-browser database**. This allows the system to validate whether the query actually produces the expected result, which is far more pedagogically meaningful than merely comparing query syntax.

This approach offers several advantages:

* students work in a more authentic database-like environment
* equivalent SQL solutions can be validated through output
* instructors can assign practical query-writing tasks with immediate feedback
* no server-side database dependency is required for basic lab execution

For database and analytics courses, this feature makes BrightLab much more than a quiz engine — it becomes a lightweight SQL lab.

---

## Instructor Dashboard

BrightLab includes a dedicated instructor dashboard that supports both **course administration** and **grading workflow**.

### Lab Management

Instructors can:

* create new labs
* edit existing labs
* toggle lab visibility on or off
* manage assignment content in a centralized interface

This allows instructors to stage labs ahead of time, revise them as needed, and control when students can access them.

### Grade Export

The dashboard includes a grade export function that generates a **CSV file formatted specifically for Brightspace Gradebook import**. The export includes:

* `OrgDefinedId`
* the appropriate grade column formatting
* required end-of-line indicators

This means instructors can:

1. download the grade file from BrightLab
2. upload it directly into Brightspace
3. complete the grading transfer without reformatting data manually

This is a pragmatic integration model — simple, fast, and reliable.

### Seed Example Data

To support setup and testing, the dashboard provides a **“Seed Example Data”** button that populates the platform with a sample SQL lab. This is useful for:

* first-time onboarding
* demonstrations
* QA and usability testing
* instructor training

It lowers the barrier to adoption by giving users a working example immediately.

---

## Security and Infrastructure

BrightLab is built on a modern cloud architecture with attention to both usability and data protection.

### Firebase Integration

The platform uses **Firebase** for:

* **authentication** via Google Login
* **data storage** through Firestore

This provides a relatively lightweight but robust infrastructure for managing users, labs, submissions, and grading records.

### Firestore Security Rules

The system includes carefully scoped **Firestore security rules** so that:

* students can only view **their own submissions**
* students can only access **active labs**
* instructors have full management and grading access

This role-based design is essential in academic settings, where privacy, fairness, and access control matter.

### Error Handling and Logging

The platform also includes:

* **custom error boundaries**
* **Firestore error logging**

These features support debugging and maintenance, especially during live classroom use, where silent failures can become instructional disasters faster than a group project choosing its own team name.

---

## Getting Started

BrightLab is designed to be simple to deploy and test.

### Basic Setup Flow

1. **Login** — Sign in using a Google account
2. **Instructor Access** — The first authorized user, based on a matching email, receives instructor privileges
3. **Seed Data** — Use the **“Seed Example Data”** button to generate a sample SQL lab
4. **Student View** — Switch roles or log in as a student to experience the lab dashboard from the learner perspective
5. **Export Grades** — Once students complete the lab, use the CSV export feature to generate a Brightspace-ready grade file

This onboarding flow makes it easy to move from development to testing to classroom use.

---

## Brightspace Integration

BrightLab is intentionally designed as a **companion platform** to Brightspace rather than a replacement.

### What It Does

BrightLab provides the specialized functionality that Brightspace handles less elegantly in its default environment, including:

* real SQL execution
* structured CSV submission and validation
* deterministic grading logic across technical question types
* AI-generated hints after incorrect submissions
* instructor-ready grade exports

### What It Does Not Do

BrightLab does **not** replace Brightspace’s broader course management ecosystem. Brightspace remains the system of record for:

* course organization
* student rosters
* announcements
* content distribution
* gradebook storage

BrightLab instead serves as an external, specialized lab engine that plugs into that workflow.

### Grade Sync Workflow

To transfer grades into Brightspace:

1. instructors download the CSV from the BrightLab Instructor Dashboard
2. instructors upload the file into the **Brightspace Gradebook import** section

Because the export is already formatted with **`OrgDefinedId`** and the necessary import conventions, the process is straightforward and requires minimal cleanup.

---

## Pedagogical Value

BrightLab is especially valuable because it combines three elements that are often difficult to align in educational technology:

### 1. Immediate Feedback

Students do not need to wait for grading to know whether their work is on the right track.

### 2. Grading Integrity

Correctness is determined through deterministic logic, making the platform suitable for defensible assessment.

### 3. Instructional Support

AI-generated hints offer guidance at the point of difficulty, encouraging learning rather than mere answer submission.

This hybrid structure makes BrightLab stronger than a basic quiz tool and more manageable than fully manual grading.

---

## Summary

The **BrightLab Grading Tool** is a specialized instructional platform that extends Brightspace with an interactive, automatically graded lab environment for **Multiple Choice, Numeric, SQL, and CSV questions**. It combines **deterministic grading**, **AI-powered hints**, **real SQL execution**, and **Brightspace-compatible grade export** in a single instructor- and student-facing application.

For students, BrightLab creates a more engaging and supportive lab experience. For instructors, it reduces grading workload, improves consistency, and simplifies grade transfer into Brightspace. For technical courses in analytics, databases, and information systems, it offers a practical and scalable solution for lab-based assessment.

If you want, I can turn this into a **website-ready landing page version**, a **grant/project proposal description**, or a **shorter app-store/product summary**.
