## Simplified into one working document

Use this as the new simplified master plan. It keeps the repo’s canonical order: **close v1.1 → stabilize source/content workflow → launch course reader → build v2A paid-access pilot → later add v2B learning features**. The repo’s active canonical plan is `book-plan-codex.md`, which says it supersedes the older plan files, and `06-locked-decisions.md` confirms the phase order and technical decisions.  

Suggested file name:

```text
books/database-book/plans/book-edit/simple-platform-plan.md
```

# Database Book Platform — Simple Master Plan

## Purpose

Build the database textbook platform in a practical sequence that supports the course now, while preparing for paid access later.

The immediate goal is not to build the perfect platform. The immediate goal is:

```text
Students can read the assigned chapters and labs when the course starts.
```

The longer-term goal is:

```text
Students can log in, verify their student identity, pay through Stripe, and access the protected textbook platform.
```

---

# 1. The Big Picture

We are building the platform in five stages:

```text
Stage 1 — v1.1 Course Reader
Stage 2 — v1.2 Source and Chapter Workflow
Stage 3 — Course Launch
Stage 4 — v2A Paid-Access Pilot
Stage 5 — v2B Learning Features
```

Each stage has a clear purpose.

---

# Stage 1 — v1.1 Course Reader

## Goal

Freeze the current reader so students can use it.

This is the public/course-facing reader for now.

Location:

```text
books/database-book/platform-pilots/reader-hybrid-v1.1/
```

## What v1.1 should do

Students should be able to:

```text
open the site
read available chapters
navigate reader sections
use labs
use the mobile version
```

## What v1.1 should not do

Do not add:

```text
Stripe
Supabase
real login
student accounts
database access
protected paid routes
notes
persistent progress
AI assistant
```

## Required checks

Before calling v1.1 complete, run:

```bash
npm install
npm run generate
npm run lint
npm run build
npm run preview
```

Then check:

```text
Home page loads
Book reader loads
Labs page loads
Demo Access/Login page loads
Sidebar navigation makes sense
Core Concepts label is correct
On This Page works
Mobile layout works
Favicon and manifest work
Vercel deploys the correct v1.1 folder
```

## Completion marker

When v1.1 is stable:

```bash
git tag reader-v1.1-stable
git push origin reader-v1.1-stable
```

---

# Stage 2 — v1.2 Source and Chapter Workflow

## Goal

Make the chapter-writing workflow stable.

This stage is about content structure, not Stripe.

The main problem is that chapters are still being edited. That is fine. The platform just needs a stable content contract.

## Core decision

Use stable filenames in the repo:

```text
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
```

Do not keep using dated filenames as the active working files.

Dated files can remain historical source inputs, but the live repo should use stable names.

## Target chapter folder

Example:

```text
books/database-book/files/source/chapters/ch01-introduction-to-course/
  index.md
  core-concepts.md
  lets-build.md
  review-questions.md
  terms-treasury.md
  rat.md
```

## What Git does

Git keeps the older versions.

Use Git history instead of active dated filenames.

Example commit:

```bash
git add books/database-book/files/source/chapters/ch01-introduction-to-course/core-concepts.md
git commit -m "ch01: revise core concepts"
```

## Optional YAML frontmatter

Each Markdown file may include metadata:

```yaml
---
chapter_id: ch01
section_slug: core-concepts
title: Core Concepts
status: draft
version: 0.3.0
updated: 2026-06-12
include_in_reader: true
---
```

YAML describes the current file.

Git stores the history.

## Source infrastructure files

Create:

```text
books/database-book/book.yml
books/database-book/files/source/outline/book-outline.md
books/database-book/files/source/outline/chapter-taglines.md
books/database-book/files/source/outline/chapter-registry.yml
books/database-book/files/manifests/source-import-manifest.csv
books/database-book/files/manifests/build-manifest.json
```

## Source import rule

Import only student-facing content.

Never import lab answer files into the public/source repository.

## Stage 2 outcome

By the end of v1.2:

```text
Chapters use stable filenames
The repo is the working source of truth
Drive is historical/reference storage
The reader can generate from stable files
There is a source-import manifest
There is a build manifest
You can keep editing chapters safely
```

---

# Stage 3 — Course Launch

## Goal

Make the platform usable for students when the course starts.

This is the minimum launch version.

## Must be ready

```text
v1.1 reader is deployed
students have a stable URL
first assigned chapters are available
first assigned labs are available
mobile layout works
no answer files are exposed
navigation is understandable
unfinished chapters show Coming Soon if visible
```

## Not required for launch

```text
Stripe
Supabase
student accounts
paid access
notes
progress
search
all 17 chapters polished
```

## Course launch strategy

Use the reader as a living textbook.

Students can start with the first chapters and labs while later chapters continue to be edited.

Suggested student-facing note:

```text
The online reader is the primary textbook platform for this course. Chapters and labs will be released progressively throughout the semester. The first assigned readings and labs are available now; later chapters may show “Coming soon” until they are assigned.
```

---

# Stage 4 — v2A Paid-Access Pilot

## Goal

Test the paid-access system before fall.

This should be a separate app, not mixed into v1.1.

Location:

```text
books/database-book/platform-pilots/reader-hybrid-v2/
```

## Purpose

Prove the full access flow:

```text
student creates account
student enters profile information
student pays through Stripe
Stripe webhook confirms payment
database creates access grant
protected reader unlocks
```

## Technology

Use:

```text
Next.js
TypeScript
Supabase Auth
Supabase Postgres
Supabase Row Level Security
Stripe Checkout
Stripe Webhooks
Vercel
```

## Supabase tables

Start with:

```text
course_roster
profiles
purchases
access_grants
processed_stripe_events
```

## What each table means

### course_roster

Stores students you upload.

Example fields:

```text
course_key
student_id
net_id
email
full_name
section
status
```

### profiles

Stores the logged-in user profile.

Example fields:

```text
user_id
email
full_name
student_id
net_id
role
```

Important:

```text
NetID and Student ID are profile verification fields.
They are not real institutional SSO.
```

### purchases

Stores Stripe payment records.

Example fields:

```text
user_id
stripe_customer_id
stripe_checkout_session_id
stripe_payment_intent_id
amount_cents
currency
status
```

### access_grants

Controls who can read the protected book.

Example fields:

```text
user_id
product_key
status
source
starts_at
expires_at
```

Use:

```text
product_key = database-book-2026
```

### processed_stripe_events

Prevents duplicate webhook processing.

Example fields:

```text
id
event_type
processed_at
```

## Access logic

A student has access if:

```text
user is logged in
profile exists
student is matched to course roster
active access_grant exists for database-book-2026
```

Instructors/admins can receive manual access grants.

## Stripe rule

Do not unlock access from the browser success page.

Correct flow:

```text
Stripe Checkout completes
Stripe sends signed webhook
server verifies webhook
purchase is recorded
access_grant is created
protected reader unlocks
```

## v2A routes

```text
/
 /preview
 /preview/ch01
 /login
 /register
 /account
 /access
 /success
 /cancel
 /book
 /book/ch01
 /api/stripe/create-checkout-session
 /api/stripe/webhook
```

## v2A validation

The pilot is successful when:

```text
logged-out visitor can view preview
logged-out visitor cannot access protected book
logged-in unpaid student cannot access protected book
student can complete test Stripe payment
webhook records purchase
webhook creates access grant
paid student can open protected reader
duplicate webhook does not duplicate access
service-role key never reaches browser
```

## Important

Build this in Stripe test mode first.

Do not charge real students until the complete test flow is proven.

---

# Stage 5 — v2B Learning Features

## Goal

Add student learning tools after paid access works.

Do not start this until v2A is stable.

## Features

### Progress

Track:

```text
user_id
page_id
chapter_slug
reader_area_slug
last_viewed_at
completed_at
scroll_position
```

### Notes

Track:

```text
user_id
page_id
selected_text
note_text
created_at
updated_at
```

Notes must be private to the student.

Notes must never modify source Markdown.

### Labs

Start small:

```text
read lab instructions
download supporting files
mark lab complete
```

Later:

```text
submit work
instructor review
grading
```

### Search

Add protected server-side search later.

Search must respect access grants.

Do not expose protected snippets to unpaid users.

### Accessibility hardening

Add:

```text
keyboard navigation audit
landmark audit
heading audit
focus states
reduced-motion testing
screen reader testing
table accessibility
form accessibility
contrast audit
mobile zoom/reflow check
video captions/transcripts
```

---

# What We Are Not Building Yet

Do not build these now:

```text
AI Assistant
instructor dashboard
student submissions
gradebook
LTI
real institutional SSO
advanced analytics
recommendation engine
semantic search
```

---

# One-Week Course Launch Plan

Because the course is starting soon, this is the practical week plan.

## Day 1 — Freeze v1.1

```text
Run build checks
Fix only launch-blocking bugs
Verify Vercel deployment
Tag reader-v1.1-stable
```

## Day 2 — Fix navigation and student usability

```text
Fix sidebar page labels
Make Core Concepts appear once as parent
Show page topic titles as child links
Check mobile navigation
```

## Day 3 — Stabilize first course content

```text
Confirm Ch01–Ch04
Confirm Labs 01–04
Use Coming Soon placeholders where needed
Do not expose answers
```

## Day 4 — Source workflow

```text
Create or confirm stable filenames
Create book.yml and chapter-registry.yml if not already present
Create manifests folder
Document editing workflow
```

## Day 5 — Deploy and test

```text
Push to GitHub
Check Vercel build
Open public deployment
Test as student
Test on phone
Test in private browser
```

## Day 6 — Course launch materials

```text
Write LMS announcement
Write “How to use the reader”
Prepare first reading list
Prepare backup PDF/export for first chapter if needed
```

## Day 7 — v2A planning/scaffold

```text
Create v2A checklist
Draft Supabase schema
Draft Stripe flow
Do not connect live payments yet
```

---

# Editing Rules While the Course Is Running

## Use the repo as the working source

Edit chapters in:

```text
books/database-book/files/source/chapters/
```

## Use Git for older versions

Do not make active dated files.

Use commits and tags.

## Use branches for active edits

Example branches:

```text
content/ch02-revision
content/ch05-sql
platform/v2a-paid-access
```

## Keep main deployable

Do not push half-broken content directly to production.

Use a branch and preview deployment when possible.

---

# Current Priority

The priority order is:

```text
1. v1.1 reader works
2. first chapters and labs are available
3. students can start the course
4. chapter editing workflow is stable
5. v2A paid-access pilot begins separately
6. v2B learning features later
```

---

# Simple Summary

## Now

```text
Finish and deploy the course reader.
```

## Next

```text
Stabilize chapter source files and editing workflow.
```

## Summer

```text
Pilot Supabase + Stripe in a separate v2A app.
```

## Fall

```text
Use paid access only after the test-mode payment/access flow is proven.
```

The key simplification is this: **v1.1 is for students to read now; v1.2 is for source/content stability; v2A is for paid access; v2B is for learning features.**
