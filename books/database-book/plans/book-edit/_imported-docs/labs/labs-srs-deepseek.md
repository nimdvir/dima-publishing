Based on your detailed description, I have synthesized the following comprehensive Software Requirements Specification (SRS) for your Lab Management System. This document organizes your ideas into a formal structure, defines the project's scope, and details the functional requirements for both the student and instructor interfaces, drawing on standard practices in educational technology .

Here is the requirements report for your lab project.

---

# Software Requirements Specification (SRS)

## For a Comprehensive Lab Management System

## simple version

We need to build a lab platform with quizzes, data entry (numbers, SQL), CSV uploads, AI grading, and Brightspace integration. You're a beginner, so we'll break it down into simple steps and choices.

## Two Ways to Build This

| Approach | What It Means | Best For |
|----------|---------------|----------|
| **Low-code / No-code** | Use drag‑and‑drop tools to assemble the system. You won't write much code, but you might hit limits with custom grading and LTI. | Quick prototypes, small scale, non‑technical folks. |
| **Custom development** | Write your own web application. You have full control, but you need to learn some programming. | Long‑term flexibility, full features, integration with Brightspace. |

I'll focus on **custom development** because it's the only way to get exactly what you described, and it's not as hard as it sounds if you follow a clear plan.

---

## Step 0: Understand the Pieces

Your platform has three main jobs:

1. **Student & instructor interfaces** – web pages to take quizzes, upload files, see grades.
2. **Grading engine** – checks multiple choice, numbers, SQL, CSV files. For complex answers, it calls an AI (like OpenAI) to help grade.
3. **Brightspace connection** – lets students log in with their school account and sends grades back to the Brightspace gradebook.

---

## Step 1: Pick a Simple Tech Stack

For a beginner, I recommend **Django** (Python web framework) because it comes with:

- Built‑in user login and roles (student/instructor)
- An admin panel (you can manage labs without coding much)
- Easy database handling
- Great documentation and community

Add these tools:

- **PostgreSQL** – the database (Django works well with it)
- **Bootstrap** – makes your pages look nice without design skills
- **Celery** + **Redis** – runs grading in the background so the page doesn't freeze
- **OpenAI API** – for AI hints and grading help
- **pylti1.3** – a Python library that handles the complicated Brightspace connection

All of these are free (except OpenAI usage costs pennies per grading).

---

## Step 2: Build in Phases (The Roadmap)

Don't try to do everything at once. Build one piece at a time, test it, then add the next.

### **Phase 0: Learn the Basics (2–4 weeks)**

- Go through a Django tutorial (e.g., the official "Polls" app).
- Learn a little HTML/CSS/Bootstrap.
- Understand how databases store data (users, questions, answers).
- Write a simple "Hello World" and deploy it on a free service like PythonAnywhere.

### **Phase 1: Core MVP – One Lab, No AI, No Brightspace (4–6 weeks)**

Build a working system with:

- Login for students and instructors (using Django's built‑in auth).
- Instructor can create a lab with a few multiple choice and numeric questions.
- Student sees the lab, submits answers, gets immediate correct/incorrect feedback.
- Student's score is saved.

**What you'll do:**

- Create Django models: `User`, `Lab`, `Question`, `Submission`.
- Build forms for instructors to add questions.
- Build a simple student view to display questions and collect answers.
- Write grading logic for multiple choice (exact match) and numeric (with tolerance).

### **Phase 2: Add CSV Upload and SQL Grading (4–6 weeks)**

Now add the more complex question types.

**CSV Upload:**

- Allow student to upload a `.csv` file.
- On the server, read the file (using Python's `csv` module) and check:
  - Does it have the right columns?
  - Are the values within expected ranges?
  - Compute something (e.g., average of a column) and compare to the expected answer.
- Store the file safely (rename it, put it outside the web folder).

**SQL Grading:**

- Create a separate, isolated database (a sandbox) with sample data.
- When a student submits SQL, run it in that sandbox with a timeout (so it doesn't crash).
- Compare the result rows/columns to the expected result.
- **Never** run student SQL on your main database – this is critical for security.

You'll need a background task (Celery) for grading SQL and CSV because they can take a few seconds. Celery runs tasks in the background so the student doesn't wait.

### **Phase 3: Add AI for Hints and Partial Credit (3–4 weeks)**

Use OpenAI to:

- Generate a helpful hint when a student gets an answer wrong on the first try.
- Grade open‑ended text or provide feedback on CSV/SQL submissions.

**How:**

- When a student submits an answer and it's wrong, call the OpenAI API with a prompt like:
  "The question was: ... The student answered: ... Give a short hint without revealing the answer."
- Use **Structured Outputs** (JSON mode) to get a consistent format.
- Always log what AI returns, and consider a moderation step to filter inappropriate content.

Important: AI should only *assist* grading, not decide correctness for objective questions. For SQL and CSV, you already have deterministic checks – AI just adds comments.

### **Phase 4: Instructor Dashboard (2–3 weeks)**

Build pages where instructors can:

- See all students' submissions per lab.
- See which questions were hard (average score).
- View the AI feedback given.
- Manually override a grade (in case of disputes).
- Export grades as CSV.

Django's admin can be a starting point, but you'll want custom views.

### **Phase 5: Brightspace LTI Integration (4–8 weeks)**

This is the trickiest part. Brightspace speaks a standard called **LTI 1.3**. You need to:

- Register your tool in Brightspace (get a `client_id`, keys, etc.).
- Implement the LTI login flow so that when a student clicks a link in Brightspace, they're automatically logged into your app.
- Send grades back to Brightspace using the **Assignment and Grade Services (AGS)** API.

Use the Python library `pylti1.3` to handle the cryptography and validation. You'll need to:

- Set up endpoints for login and launch.
- Create JWKS (public keys) for signing.
- When a student finishes a lab, post the score to Brightspace's AGS endpoint.

Test this in Brightspace's "sandbox" (developer environment) before going live.

---

## Step 3: Simplify Where You Can

- **Use Django's admin** for instructor lab creation initially – you can build a custom UI later.
- **Skip Celery at first** – just do grading synchronously, but warn users it might take a few seconds. Add Celery when you have more traffic.
- **Use SQLite** during development, switch to PostgreSQL only when deploying.
- **Deploy on a cheap VPS** like DigitalOcean ($6/month) once you're ready. Or use Render.com which has a free tier.

---

## Step 4: Budget and Tools

- **Django, PostgreSQL, Bootstrap** – free
- **Celery, Redis** – free
- **OpenAI API** – pay‑as‑you‑go, maybe $5–20/month for a class
- **DigitalOcean VPS** – $6/month
- **Domain name** – optional, ~$10/year

Total cost before launch: near zero. After launch: ~$10/month + AI usage.

---

## Step 5: Next Steps for a Total Beginner

1. **Learn Django basics** (2 weeks) – follow the official tutorial.
2. **Build the Phase 1 MVP** (with multiple choice only) and put it online.
3. **Show it to a friend** – get feedback.
4. **Add one new feature at a time** (CSV, then SQL, then AI, then dashboard).
5. **Only then tackle Brightspace** – by that time you'll understand your system well.

Remember: Brightspace integration is like a separate project. It's okay if it takes a few months to get there. Most of the value is in the lab platform itself.

---

## If You Really Want a Simpler Start

Consider using **Google Forms** for quizzes and **Google Sheets** to store answers, then use **Apps Script** or **Zapier** to call OpenAI and email grades. But you won't get a nice student dashboard, and Brightspace integration would be very manual. That path might work for a small pilot (10 students), but it won't scale.

Given your vision, learning Django is a worthwhile investment. It's a skill that will serve you for many projects.

---

## Resources

- **Django Official Tutorial**: https://docs.djangoproject.com/en/5.0/intro/tutorial01/
- **Bootstrap 5**: https://getbootstrap.com/
- **OpenAI API Quickstart**: https://platform.openai.com/docs/quickstart
- **pylti1.3 documentation**: https://github.com/dmitry-viskov/pylti1.3
- **Brightspace LTI Developer Docs**: https://docs.valence.desire2learn.com/basic/lti.html

Start small, celebrate each win, and don't hesitate to ask for help when stuck. You've got this!

## **Version 1.0**

---

### 1. Introduction

#### 1.1 Purpose

This document provides a detailed overview of the software requirements for a comprehensive Lab Management System. It outlines the purpose, features, interfaces, and constraints of the system. This document is intended for the development team, project stakeholders, and future administrators to ensure a clear and shared understanding of the project's goals .

#### 1.2 Project Scope

The system to be developed is a web-based application designed to manage laboratory assignments for educational courses . It will provide distinct interfaces for students and instructors. Instructors will be able to create labs with various question types and define complex grading logic, including AI-assisted evaluation for partial credit. Students will interact with the system to complete and submit assignments, receive immediate feedback with hints, and track their grades. A key feature is the integration with the Brightspace Learning Management System (LMS) for authentication and grade synchronization .

### 2. Overall Description

#### 2.1 User Characteristics

The system will serve two primary user roles:

- **Instructors:** Faculty or teaching assistants responsible for creating lab content, defining grading parameters, reviewing student submissions, managing disputes, and monitoring class performance .
- **Students:** Individuals enrolled in the course who will access the system to view lab instructions, complete assignments, submit work, and review their grades and feedback .

#### 2.2 Product Perspective

This system is a new, custom web portal that will integrate with existing institutional systems. It will rely on a database for persistent storage of user data, lab content, submissions, and grades . Its primary integration will be with the Brightspace LMS using LTI (Learning Tools Interoperability) standards for authentication and grade pass-back .

### 3. Specific Requirements (Functional Requirements)

This section details the core functions the system must perform.

#### 3.1 Instructor Interface Requirements

| ID | Requirement Description | Notes / Sub-features |
| :--- | :--- | :--- |
| **F-INS-01** | **Lab Creation & Management** | Instructors can create, edit, delete, and organize lab assignments. Each lab has a title, description, due date, and point value. |
| **F-INS-02** | **Question Type Configuration** | Within a lab, instructors can create the following question types: |
| | - Multiple Choice | Define question, options, and correct answer(s). |
| | - Data Entry (Number) | Define correct numeric value with tolerance for "fuzzy matching." |
| | - Data Entry (Text/Open-ended) | Provide a prompt for short answer or essay. |
| | - File Upload (CSV) | Primary type; allow students to upload CSV files for analysis. |
| **F-INS-03** | **Grading Logic & Instructions** | For each question, instructors define evaluation methods: |
| | - AI Grading Instructions | Provide guidelines for an LLM (e.g., OpenAI) on how to grade and assign partial credit. *Example: "For this SQL query, give full points if it returns the correct data. Give partial credit (50%) if the logic is sound but the student uses 'INNER JOIN' instead of a subquery, as long as they reference the 'Orders' and 'Customers' tables."* This aligns with industry concepts of partial scoring based on specific criteria . |
| | - Correct Answers | Store definitive answers for multiple choice and numeric questions. |
| **F-INS-04** | **Attempt & Penalty System** | Configure rules for student attempts: |
| | - First Wrong Attempt | System provides a pre-defined hint to the student. |
| | - Second Wrong Attempt | System applies a point deduction. |
| | - Late Submissions | System automatically calculates and applies a late penalty based on the due date. |
| **F-INS-05** | **Submission Review Dashboard** | A comprehensive view for instructors to see all student submissions. They can filter by student, lab, or submission status. They must be able to view the student's answers, the grade given, and detailed AI feedback to resolve any grading disputes . |

#### 3.2 Student Interface Requirements

| ID | Requirement Description | Notes / Sub-features |
| :--- | :--- | :--- |
| **F-STU-01** | **Authentication** | Students can log in using institutional Brightspace credentials (via LTI) or via a secure access code provided with a textbook purchase. |
| **F-STU-02** | **Lab Dashboard** | Upon login, students see a personalized dashboard showing all assigned labs, their completion status (e.g., Not Started, In Progress, Submitted), and their final score for graded labs. |
| **F-STU-03** | **Lab Workspace** | When a student opens a lab, they see all questions along with accompanying instructions, which may include downloadable files or data tables necessary to complete the work. |
| **F-STU-04** | **Answer Submission & Saving** | Students can enter answers for each question individually. They must be able to save their work-in-progress to complete later. |
| **F-STU-05** | **Graded Feedback Loop** | When a student submits an answer: |
| | - **If Correct:** The system accepts the answer and may show a confirmation. |
| | - **If Incorrect (Attempt 1):** The system alerts the student that the answer is wrong and displays a pre-configured hint . |
| | - **If Incorrect (Attempt 2):** The system accepts the answer, applies a point deduction, and may proceed to the next question or finalize the answer. |
| **F-STU-06** | **Final Grade Report** | After completing all questions, the student can view a final report detailing their grade for the lab, including points earned per question and any applicable deductions. |

### 4. External Interface Requirements

#### 4.1 Brightspace LMS Integration

The system must integrate with Brightspace using LTI 1.3 standards .

- **Authentication (Deep Linking):** Students and instructors should be able to access the Lab Management System directly from their Brightspace course with a single sign-on (SSO) experience, without needing separate login credentials .
- **Grade Sync (Assignment and Grade Services):** Final grades for each student and lab must be securely and automatically sent from the Lab Management System back to the Brightspace gradebook .

#### 4.2 Authentication Code Interface

The system must provide an alternate authentication method. A mechanism (e.g., a batch import or a one-time code generator) is needed to create and manage access codes tied to textbook purchases.

#### 4.3 Software Interfaces

- **Database:** The system will interface with a PostgreSQL database to store all persistent data, including user profiles, lab definitions, questions, submissions, grades, and audit logs .
- **AI Service:** The system will interface with an AI service (e.g., OpenAI API) for evaluating open-ended questions and complex file uploads based on instructor-defined instructions .

### 5. Additional Recommendations (Non-Functional & Features)

Based on your request for suggestions, here are some features common in similar systems that would add significant value :

- **Academic Integrity Tools:**
  - **Code Playback / History:** For coding or SQL questions, allow instructors to replay the student's work history character-by-character to see how their answer evolved. This helps identify plagiarism (e.g., large paste events) .
  - **Similarity Detection:** Implement a system to compare student submissions (especially code and text) to detect potential copying .
- **Audit Logging:** Maintain a detailed log of all significant actions (submissions, grading events, instructor reviews) for security and dispute resolution.
- **Notification System:** Implement email or in-app notifications to alert students of graded work and instructors of new submissions.
- **Instructor Analytics Dashboard:** Beyond submission review, provide aggregate data on class performance, such as average scores per question, which questions were most difficult, and time spent on tasks .

