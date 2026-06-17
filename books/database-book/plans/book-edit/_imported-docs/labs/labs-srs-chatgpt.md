Excellent. What you’ve written is already structurally strong and professionally organized. Below is a **fully integrated and expanded SRS + Implementation Plan (Version 1.1)** that:

* Merges your formal SRS
* Incorporates the earlier architectural + grading strategy
* Clarifies AI’s role (deterministic correctness + AI feedback layer)
* Adds implementation phases, security controls, and LMS strategy
* Aligns grading policy with defensibility and scalability

This version reads like something you could hand to a developer, a dean, or a funding committee.

---

# Software Requirements Specification (SRS)

## Comprehensive AI-Assisted Lab Management System

**Version 1.1 (Integrated Strategic Plan)**

---

# 1. Introduction

## 1.1 Purpose

This document defines the functional, technical, and architectural requirements for a web-based Lab Management System (LMS-Integrated). The system is designed to support structured laboratory assignments across approximately ten course modules, incorporating automated grading, AI-assisted feedback, configurable attempt logic, late penalty enforcement, instructor analytics, and Brightspace LMS integration via LTI 1.3.

This specification is intended for:

* Developers
* Institutional IT stakeholders
* Academic administrators
* Instructional designers
* Future maintainers

---

## 1.2 Project Scope

The system will:

* Deliver interactive lab assignments with multiple question types
* Provide deterministic autograding for objective correctness
* Provide AI-assisted hints and partial credit evaluation where appropriate
* Implement configurable attempt penalties
* Enforce due dates and automated late penalties
* Provide instructor analytics and audit logging
* Integrate with Brightspace LMS for authentication and grade passback
* Optionally support textbook-based activation codes

The system is not a full LMS replacement. It is a specialized academic lab engine integrated into an LMS ecosystem.

---

# 2. Architectural Overview

## 2.1 System Components

| Component              | Description                                                  |
| ------------------------ | -------------------------------------------------------------- |
| Frontend               | Student and instructor UI (React or similar SPA recommended) |
| Backend API            | Core business logic, grading engine, policy enforcement      |
| Database               | PostgreSQL for persistent storage                            |
| AI Service             | External LLM API for feedback and rubric interpretation      |
| SQL Sandbox Engine     | Containerized execution environment for SQL grading          |
| File Evaluation Engine | CSV validation, schema checking, metric computation          |
| LMS Integration Layer  | LTI 1.3 launch + Assignment & Grade Services                 |

---

## 2.2 Design Philosophy

To ensure fairness and defensibility:

**Correctness = Deterministic**
**Feedback = AI-Assisted**

AI should never be the sole arbiter of correctness for objective tasks.

This reduces grade disputes and protects academic credibility.

---

# 3. Functional Requirements

---

# 3.1 Instructor Interface Requirements

### F-INS-01 — Lab Creation & Management

Instructors must be able to:

* Create, edit, duplicate, delete labs
* Define:
  * Title
  * Description
  * Due date/time (timezone enforced)
  * Total points
  * Late penalty rule
  * Visibility window
  * Attempt configuration

---

### F-INS-02 — Question Types

Supported question types:

| Type            | Grading Method                                     |
| ----------------- | ---------------------------------------------------- |
| Multiple Choice | Exact match                                        |
| Numeric Input   | Exact or tolerance-based                           |
| Short Text      | AI-assisted rubric scoring                         |
| SQL Submission  | Execute in sandbox, compare result sets            |
| CSV Upload      | Schema + rule-based evaluation + AI feedback layer |

---

### F-INS-03 — AI Grading Instructions

Instructors can define structured grading prompts for AI where applicable:

Example:

> “Award full credit if the SQL returns correct output.
> Award 50% if joins are correct but filtering condition is incorrect.
> Deduct 25% if grouping logic is incorrect.”

Implementation Safeguard:

* AI suggestion is recorded.
* Final numeric grade must pass rule validation.
* Instructor can override AI result.

---

### F-INS-04 — Attempt & Penalty System

Each question supports:

* `max_attempts = 2`
* `penalty_after_first_wrong`
* `hint_message`
* `AI_hint_enabled (boolean)`

Behavior:

| Attempt       | System Behavior                               |
| --------------- | ----------------------------------------------- |
| 1 (Incorrect) | Mark incorrect + show hint (AI or predefined) |
| 2 (Incorrect) | Apply deduction + finalize question           |

Attempt metadata stored in audit log.

---

### F-INS-05 — Late Penalty Configuration

Instructors choose:

* Fixed point deduction
* Percentage per day late
* Grace period window
* Cap on total late deduction

Late calculation uses server time only.

---

### F-INS-06 — Instructor Dashboard

Must provide:

* Student list with lab completion %
* Question-level breakdown
* Submission history with timestamps
* Attempt history
* AI grading explanation log
* Manual override option
* Regrade button
* Export CSV of grades
* Item analysis:
  * Average per question
  * Most missed question
  * Time spent distribution

---

# 3.2 Student Interface Requirements

---

### F-STU-01 — Authentication

Primary:

* Brightspace LTI 1.3 SSO

Secondary:

* Secure activation code
* One-time registration binding code to account

---

### F-STU-02 — Lab Dashboard

Students see:

* Lab list
* Due dates
* Status:
  * Not started
  * In progress
  * Completed
  * Late
* Score %
* Remaining attempts per question

---

### F-STU-03 — Lab Workspace

Must include:

* Question blocks
* File download links
* Embedded data tables
* SQL editor (syntax highlighting)
* CSV upload area
* Save progress button

---

### F-STU-04 — Graded Feedback Loop

Upon submission:

If correct:

* Show confirmation
* Lock question

If incorrect attempt 1:

* Show hint
* Show attempts remaining

If incorrect attempt 2:

* Apply penalty
* Lock question
* Show explanation

---

### F-STU-05 — Final Grade Report

At completion:

* Points per question
* Attempt penalties
* Late penalty
* Final lab %
* Grade passback confirmation (if LMS integrated)

---

# 4. Grading Engines (Technical Specification)

---

## 4.1 SQL Grading Engine

* Containerized DB instance
* Restricted permissions
* Query timeout limit
* Result-set comparison:
  * Column names
  * Row values
  * Order optional (configurable)
  * Rounding tolerance configurable

Store:

* Result hash
* Execution time
* Error messages

---

## 4.2 CSV Grading Engine

Steps:

1. Validate file format
2. Validate schema
3. Validate constraints
4. Compute derived metrics
5. Compare to expected metrics
6. Pass structured output to AI for explanation only

---

## 4.3 AI Evaluation Layer

Used for:

* Generating hints
* Interpreting rubric
* Explaining grading decisions
* Suggesting debugging steps

Not used for:

* Arbitrary truth determination for structured outputs

All prompts and responses stored in audit logs.

---

# 5. Brightspace Integration

## 5.1 LTI 1.3 Launch

* OIDC login
* Role recognition (Instructor vs Student)
* Course context recognition

---

## 5.2 Assignment & Grade Services (AGS)

System must:

* Create LineItem
* Post Score
* Confirm Result
* Handle grade sync errors

---

## 5.3 Optional Roster Sync

Using NRPS service:

* Retrieve course enrollment
* Auto-provision students

---

# 6. Non-Functional Requirements

---

## 6.1 Performance

* Must support peak load before due dates
* Concurrent submission handling
* Asynchronous grading queue recommended

---

## 6.2 Security

* SQL sandbox isolation
* File upload scanning
* Rate limiting
* JWT validation for LTI
* HTTPS enforced

---

## 6.3 Logging & Audit

Every action logged:

* Submission
* Attempt
* AI grading
* Grade override
* Late calculation
* Grade passback

Dispute-ready system.

---

## 6.4 Academic Integrity Tools

* SQL submission diff viewer
* Copy-paste detection heuristics
* Similarity scoring across submissions
* Timestamp analysis

---

# 7. Implementation Roadmap

---

## Phase 0 — Grading Policy Definition

* Finalize penalty logic
* Finalize late policy
* Define SQL equivalence rules
* Define CSV rubric rules

Deliverable: grading contract document.

---

## Phase 1 — MVP (2 Labs Only)

Includes:

* Basic login
* Question creation
* Deterministic grading
* Attempt logic
* Final score computation

No LMS yet.

---

## Phase 2 — AI Layer

Add:

* AI hints
* AI rubric scoring for open-ended
* Instructor override workflow

---

## Phase 3 — Instructor Dashboard + Analytics

Add:

* Filters
* Item analysis
* Export features

---

## Phase 4 — Brightspace LTI Integration

* LTI 1.3 implementation
* AGS grade sync
* NRPS roster sync

---

## Phase 5 — Hardening & Scaling

* Load testing
* Security audit
* Performance tuning
* Monitoring + alerting

---

# 8. Success Criteria

The system is successful when:

* Students receive immediate, fair feedback
* Instructors can defend every grade
* Brightspace gradebook updates automatically
* System scales to 10 labs without redesign
* Disputes can be resolved using logs
* AI enhances learning without undermining fairness

---

# Strategic Observation

What you’re building is not just a grading tool.

It is:

* A controlled AI evaluation environment
* A structured pedagogical engine
* A defensible academic automation framework
* Potentially a scalable textbook companion platform

This could absolutely evolve into a commercial-grade academic product.

---

If you'd like, next I can:

* Convert this into a **technical architecture diagram**
* Convert it into a **developer-ready backlog (Epics → User Stories → Tasks)**
* Or help you evaluate: build yourself vs outsource vs SaaS-style architecture\*\*

Where do you want to go next?

