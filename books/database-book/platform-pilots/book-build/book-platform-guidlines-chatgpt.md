## Highlights

* I cleaned this into an **agent-ready product requirements document**.
* I clarified ambiguous parts, fixed typos, and grouped requirements by feature area.
* I added a few missing requirements: **roles, access control, deep links, admin panel, accessibility, audit logs, privacy/security, mobile responsiveness, and content import behavior**.
* I strongly recommend **not using student number as a password** unless it is only used for initial verification; it is not secure enough for authentication.

---

# Book Platform Requirements — Agent-Ready Version

## Project Goal

Build a digital textbook platform for an online book and related labs. The platform should allow students, instructors, and guests to access book content based on their role and access status. Students who have purchased access should be able to read the book, track progress, complete labs, and eventually have lab grades reported to the instructor or LMS.

The first version should focus on the **book reader**, access control, navigation, and progress tracking. Labs and grading can be added as a later phase unless otherwise specified.

---

# 1. Home Page

The home page should display:

* the book title
* author name
* book cover image
* brief description of the book
* the book’s purpose
* the target audience
* login button or login panel
* clear call-to-action for users who need access

The home page should work well on desktop, tablet, and mobile screens.

---

# 2. User Roles

The platform should support at least three types of users:

| Role       | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| Student    | A registered student who may or may not have paid for access        |
| Instructor | A faculty/instructor account with dashboard and progress visibility |
| Guest      | A limited-access user, reviewer, evaluator, or demo user            |

Each role should have different permissions.

---

# 3. Login and Authentication

## Student Login

Students should log in using:

* NetID
* student number or another secondary identifier

The platform should verify student access against either:

* a CSV file uploaded by the instructor/admin, or
* a database table based on the course registration list.

The student list should include at minimum:

* NetID
* student number or verification ID
* student name
* email address
* course/section
* payment/access status

## Instructor and Guest Login

Instructors and guests should log in using:

* NetID or email
* password

Instructor and guest credentials should be stored securely in the database using password hashing. Plain-text passwords should never be stored.

## Security Note

Student number should not function as a long-term password. It can be used for initial verification, but the system should ideally support either:

* magic-link email login,
* NetID-based institutional login later,
* or a proper password setup after first verification.

---

# 4. Access Control and Payment Flow

If a student logs in and has active access, they should be taken to:

* the home screen,
* the book dashboard,
* or the specific page they originally tried to access.

If a student logs in and does **not** have active access, they should be redirected to a payment page.

The payment page should support:

* credit card payment
* PayPal payment, if feasible

After successful payment:

1. payment is recorded,
2. the student’s access status is updated in the database,
3. the student is redirected back to the home page or the originally requested page,
4. the student can immediately access the book.

The platform should store:

* payment status
* payment provider
* transaction ID
* date/time of payment
* access start date
* access expiration date, if applicable.

---

# 5. Book Organization

The book should be organized into:

* chapters
* sections
* subsections, if needed
* labs
* supplementary resources

The navigation should make it easy for users to move between:

* chapters
* chapter sections
* labs
* review questions
* RAT sections
* glossary/term treasury sections.

---

# 6. Sidebar Navigation

The platform should include a collapsible sidebar navigation menu.

The sidebar should:

* list all chapters
* allow each chapter to expand/collapse
* show sections within each chapter
* visually indicate the current page or section
* include clear labels
* optionally use icons to distinguish content types

Suggested icons/content labels:

| Content Type         | Example Label      |
| -------------------- | ------------------ |
| Main chapter         | Chapter            |
| Let’s Build          | Activity           |
| Term Treasury        | Terms              |
| Reflection Questions | Reflection         |
| RAT                  | Reading Assessment |
| Lab                  | Lab                |

The sidebar should be responsive. On smaller screens, it should collapse into a menu button.

---

# 7. Chapter Structure

Each chapter should contain the following major parts:

1. **Main chapter content**
2. **Let’s Build section**
3. **Term Treasury section**
4. **Reflection Questions section**
5. **RAT section**

Each part should be clearly labeled and accessible from the chapter page.

The source content for each chapter may arrive as **one Markdown or HTML file**, but the platform should be able to detect or support internal section headings and convert them into navigable sections.

For example, if a chapter file contains:

```markdown
# Chapter 3: SQL Basics

## Main Content

## Let’s Build

## Term Treasury

## Reflection Questions

## RAT
```

the platform should create corresponding navigation anchors.

---

# 8. Main Chapter Content

The main section of each chapter should be organized into clear subsections with headings and subheadings.

Each chapter should support:

* text
* images
* diagrams
* code examples
* tables
* callout boxes
* examples
* warnings
* tips
* definitions

The platform should preserve formatting from the Markdown or HTML source files.

The reader should support syntax highlighting for code blocks, especially:

* SQL
* Python
* HTML
* CSS
* JavaScript.

---

# 9. Labs Section

Labs should appear in a dedicated **Labs** section at the end of the book.

Each lab should include:

* lab title
* lab number
* related chapter(s)
* learning objectives
* clear instructions
* sample data
* required files
* code snippets or templates
* submission instructions
* grading criteria, if applicable

Each lab should clearly reference the chapter or chapters it relates to.

Example:

```text
Lab 3.1 — SELECT Queries
Related Chapter: Chapter 3, SQL Basics
```

---

# 10. Chapter-to-Lab Linking

Chapters should also reference related labs.

At the end of relevant chapter sections, the platform should display links such as:

```text
Related Lab: Lab 3.1 — SELECT Queries
```

Each lab link should include:

* lab title
* short description
* estimated completion time, if available
* button/link to open the lab.

---

# 11. Progress Tracking

The platform should include a progress tracker that allows students to see:

* which chapters they have started
* which sections they have completed
* which labs they have completed
* which items remain unfinished

Progress can be displayed as:

* checklist
* percentage
* visual progress bar
* chapter-by-chapter completion status.

---

# 12. Automatic and Manual Progress Updates

The progress tracker should update automatically when students complete chapters or sections.

Suggested automatic completion rule:

* A section is marked complete when the student scrolls near the bottom or clicks “Mark Complete.”
* A chapter is marked complete when all required sections are completed.
* A lab is marked complete when it is submitted.

Students should also be able to manually mark a section as complete or incomplete.

---

# 13. Instructor Dashboard

The platform should include an instructor dashboard.

The instructor dashboard should show:

* student list
* student access/payment status
* chapter progress
* section progress
* lab completion status
* average progress by chapter
* students who have not started
* students who may be falling behind

The dashboard should help instructors identify areas where students may be struggling.

Examples of useful dashboard views:

| Dashboard View             | Purpose                             |
| -------------------------- | ----------------------------------- |
| Student Progress Table     | See individual completion           |
| Chapter Completion Summary | See class-level progress            |
| Lab Completion Summary     | See lab participation               |
| At-Risk Students           | Identify students with low progress |

---

# 14. Reader Navigation

At the bottom of each chapter or section, the reader should include:

* previous section/chapter link
* next section/chapter link

Example:

```text
← Previous: Database Basics
Next: SQL SELECT →
```

The navigation should follow the order defined in the book structure.

---

# 15. Deep Links to Specific Pages

The platform should allow instructors to share links to specific pages, chapters, sections, or labs.

Example:

```text
/book/sql-basics/select-statements
```

If the user is not logged in:

1. they should be prompted to log in,
2. the platform should remember the requested page,
3. after successful login, the user should be redirected to the original page.

If the user is logged in but lacks access:

1. they should be sent to the payment/access page,
2. after payment or access approval, they should be redirected to the original page.

This behavior is required for sharing direct links in Brightspace, email, announcements, and course modules.

---

# 16. Admin Features

The platform should include an admin area for the instructor or platform owner.

The admin area should allow:

* upload or import chapter files
* upload or import lab files
* upload student registration CSV
* manage student access
* manually grant/revoke access
* view payments
* manage instructor/guest accounts
* preview the book as a student
* update book metadata
* update cover image

---

# 17. Content Import Requirements

The platform should support importing book content from Markdown files.

The content import system should:

* read Markdown files
* preserve headings
* preserve code blocks
* preserve images
* preserve links
* preserve callout blocks
* generate clean HTML
* create navigation anchors from headings
* detect chapter/section structure
* support rebuilding the book after content updates

The platform should be able to handle either:

1. one file per chapter, or
2. one folder per chapter with multiple section files.

For the first version, one file per chapter is acceptable.

---

# 18. Search

The platform should include search across the book.

Search should allow users to find:

* chapter titles
* section headings
* key terms
* lab titles
* glossary/term treasury items

Search results should link directly to the relevant page or section.

---

# 19. Accessibility

The platform should follow basic accessibility practices.

Requirements:

* semantic HTML
* keyboard-accessible navigation
* readable color contrast
* alt text support for images
* accessible buttons and forms
* headings in proper order
* responsive layout
* captions/transcripts for videos if used

This is especially important because the book may be used in a university setting.

---

# 20. Mobile and Responsive Design

The platform should work well on:

* desktop
* laptop
* tablet
* mobile phone

On mobile:

* sidebar should collapse
* text should remain readable
* navigation should remain usable
* progress indicators should not clutter the screen.

---

# 21. Data and Privacy

The platform should store student information securely.

Student data may include:

* name
* NetID
* email
* course registration
* payment/access status
* reading progress
* lab submissions
* grades

The system should avoid storing unnecessary sensitive information.

Passwords should be hashed. Payment details should not be stored directly; they should be handled by a payment provider.

---

# 22. Future Brightspace/LTI Support

The platform should be designed so that Brightspace/LTI integration can be added later.

Future LTI features may include:

* Brightspace login/launch
* role detection
* direct links from Brightspace modules
* lab grade passback
* instructor dashboard access from Brightspace

The first version does not need full LTI integration unless explicitly requested.

---

# 23. Future Expansion to Additional Books

The platform should be designed so it can eventually support additional books.

Future expansion should allow:

* multiple books
* multiple editions
* multiple instructors
* multiple courses
* different access rules per book
* different lab sets per book

The system should not hard-code all behavior only for BITM330.

---

# 24. Suggested Build Phases

## Phase 1 — Book Reader MVP

Build:

* home page
* login placeholder or simple login
* book dashboard
* chapter navigation
* chapter rendering
* sidebar
* previous/next navigation
* direct links to pages
* responsive design

## Phase 2 — Access Control and Payment

Build:

* student registration import
* student access verification
* payment page
* payment success flow
* access database
* redirect back to original page after login/payment

## Phase 3 — Progress Tracking

Build:

* automatic progress tracking
* manual completion checkboxes
* student progress page
* instructor progress dashboard

## Phase 4 — Labs

Build:

* labs section
* lab pages
* chapter-to-lab links
* lab submission forms
* lab completion tracking

## Phase 5 — Grading and LMS Integration

Build:

* autograding where possible
* instructor review tools
* Brightspace/LTI integration
* grade passback.

---

# Condensed Prompt for Your Coding Agent

You can paste this into Copilot or another agent:

```text
Build a digital textbook platform.

Core goal:
Users should be able to log in, access a purchased online book, read chapters and sections, track progress, and eventually complete labs.

Book structure:
- Home page with title, author, cover, description, purpose, and target audience.
- Book organized into chapters and sections.
- Each chapter contains:
  1. main content
  2. Let’s Build section
  3. Term Treasury section
  4. Reflection Questions section
  5. RAT section
- Chapter source may arrive as one Markdown/HTML file, but the platform should detect headings and create internal navigation anchors.
- Labs live in their own dedicated section at the end of the book.
- Labs reference related chapters, and chapters reference related labs.

Navigation:
- Collapsible sidebar with chapters and subsections.
- Clear labels and optional icons.
- Active page/section highlighting.
- Previous/next arrows at the bottom.
- Direct deep links to specific chapters, sections, and labs.

Authentication:
- Students log in with NetID and student number or other verification ID.
- Student identity is checked against an uploaded CSV or database from course registration.
- Instructors and guests log in with NetID/email and password.
- Passwords must be securely hashed.
- If a user opens a direct link while logged out, they should log in and then return to that exact page.

Access/payment:
- If a student has not paid, redirect them to a payment page.
- Payment should support credit card and PayPal if feasible.
- After successful payment, update the access database and return the student to the page they originally requested.
- Store access status, payment source, transaction ID, and access dates.
- Do not store credit card details.

Progress:
- Track student progress by chapter, section, and lab.
- Progress should update automatically where possible.
- Students can manually mark sections complete/incomplete.
- Instructors can view student progress in a dashboard.

Instructor dashboard:
- Show students, access status, chapter progress, lab completion, and possible areas where students are falling behind.

Content import:
- Support Markdown files as the main source format.
- Preserve headings, images, code blocks, tables, links, and callout boxes.
- Generate clean HTML.
- Support one file per chapter first, with future support for multiple files per chapter.

Accessibility:
- Use semantic HTML.
- Support keyboard navigation.
- Require alt text for images.
- Use readable contrast.
- Make the platform responsive on desktop, tablet, and mobile.

Future:
- Design the system so Brightspace/LTI integration and grade passback can be added later.
- Design the platform so it can support multiple books and editions in the future.

Do not overbuild everything at once.
Start with Phase 1: the book reader MVP.
```

---

# One More Thing I Would Add

I would add a strict MVP instruction:

> **Do not build the payment system before the reader works.**

Otherwise the agent may start with authentication, Stripe, databases, and dashboards before you even have a beautiful book. That is how projects become a swamp with a login page.

Start with:

```text
Home → Book dashboard → Chapter reader → Sidebar → Deep links
```

Then add the business layer.
