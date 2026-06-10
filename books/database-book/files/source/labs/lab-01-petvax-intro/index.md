---
title: "Lab 01: PetVax Project Introduction"
chapter: 1
section: "Lab Questions"
description: "Orientation quiz for the PetVax veterinary clinic lab project. Quiz-only, no file submission."
keywords:
  - lab 01
  - PetVax
  - orientation
  - project overview
  - PetVax introduction
date: 2026-06-03
author: "Nimrod Dvir"
---

# Lab 01: PetVax Project Introduction

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center">

<p align="center"><em>Get oriented to the PetVax project before you start building.</em></p>

## Overview

This first lab introduces the **PetVax Veterinary Clinic Database**, the applied project you will return to throughout the course. Chapter 1 is an orientation chapter, so you are not building tables, writing SQL, or designing a schema yet. Instead, you will get to know what the project models, why it matters, and how the lab sequence will grow.

This lab connects to Chapter 1 and to the Let's Build work you did with the Grading Database. Where Let's Build teaches each concept with the Grading Database, the Lab asks you to transfer that thinking to PetVax.

**Estimated time:** about 30 minutes.

## How This Lab Works

Most labs in this course have **two graded parts**:

1. **A quiz.** You answer exact questions (mostly multiple choice). Your answers come from doing the work, so the value you compute or observe becomes the answer you select.
2. **A file submission.** You upload a structured file that proves you completed every step. An AI grader reads the file to confirm the work is yours and not a generic guess.

Your final lab grade combines the quiz score and the AI-graded file.

**Lab 01 is the exception.** Because this chapter is orientation only, there is **no file to submit**. You complete the quiz below, and that is your full deliverable. Starting with the next lab, you will also upload a project file, so this lab is your chance to learn how the model works before the stakes go up.

## Background: The PetVax Project

Read this background, then answer the quiz that follows.

### What the Vet Clinic Database Models

The **PetVax Veterinary Clinic Database** represents a small but realistic operational information system. Across the lab sequence, it will model data such as:

- pet owners;
- pets;
- appointments and visits;
- treatments and services;
- invoices and payments.

Unlike the Grading Database, which is the book's central guided instructional case, the Vet Clinic Database is the **applied lab environment**. Its purpose is to help you transfer what you learn in the chapter to a different business domain.

### Why This Project Matters

The Vet Clinic Database captures many of the same structural problems that appear in real organizations:

- one owner may have multiple pets;
- one pet may have many visits over time;
- one visit may involve multiple treatments or services;
- one invoice may include several billable items;
- accurate records matter for operations, communication, and billing.

Students often begin with a messy spreadsheet-style view of clinic activity and then redesign it into a cleaner relational structure. That makes this project useful for comparing **spreadsheet thinking** with **database thinking**.

### How the Project Evolves

The lab sequence grows in sophistication over time. Early labs focus on understanding the clinic as an information system and recognizing what counts as data. Later labs move into tables, keys, SQL, normalization, integrity, performance, business intelligence, and strategic interpretation.

### The Difference Between the Two Projects

- The **Grading Database** is the guided, recurring instructional case used throughout the main chapter sequence. You are usually shown the logic first, then asked to practice it.
- The **PetVax Veterinary Clinic Database** is the applied lab case used to test transfer. You are more often asked to recognize where that same logic applies in a different operational setting.

### Professional Roles You Begin to Practice

| Role | What You Begin to Practice |
| --- | --- |
| **Systems thinker** | Seeing the clinic as a connected operational system rather than a pile of records |
| **Data modeler** | Identifying entities, attributes, and relationships |
| **Analyst** | Asking what questions the data should eventually answer |
| **Database designer** | Thinking about how messy data becomes structured data |
| **Communicator** | Explaining technical ideas in clear business language |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Quiz

Answer all questions. This quiz is your complete deliverable for Lab 01. There is no file to upload.

### Question 1 — System Purpose (Multiple Choice)

In business terms, what is the PetVax Veterinary Clinic Database mainly meant to do?

- A. Replace the veterinarians with automated software.
- B. Organize the clinic's operational records so staff can run the business and answer questions about owners, pets, visits, treatments, and billing.
- C. Store marketing images for the clinic's website.
- D. Track the personal social media accounts of pet owners.

### Question 2 — Operational Data Inventory (Select All That Apply)

Which of the following are pieces of data a veterinary clinic would realistically need to track? Select all that apply.

- A. Owner name and contact information
- B. Pet name, species, and breed
- C. Appointment dates and times
- D. Treatments and services performed
- E. Invoice amounts and payment status
- F. The clinic's favorite color

### Question 3 — Business Question Fit (Multiple Choice)

Which question is the kind of **operational or managerial** question the finished PetVax database should be able to answer?

- A. What is the weather forecast for next week?
- B. Which owners still have unpaid invoices?
- C. What is the best restaurant near the clinic?
- D. Which celebrity owns a pet like mine?

### Question 4 — Entity Preview (Matching)

Match each PetVax entity to the kind of data it stores. Record your answers as pairs (for example, 1-C).

| # | Entity | Letter | Stores |
| - | ------ | ------ | ------ |
| 1 | Owner | A | A scheduled or completed clinic encounter for a pet |
| 2 | Pet | B | A billable charge or record of money owed and paid |
| 3 | Visit | C | The person responsible for one or more animals |
| 4 | Treatment | D | An animal that receives care at the clinic |
| 5 | Invoice | E | A specific service or procedure performed during a visit |

### Question 5 — Spreadsheet vs. Database (Multiple Choice)

Why should a veterinary clinic avoid keeping all of its records in one large spreadsheet?

- A. Spreadsheets are illegal for business use.
- B. A single spreadsheet encourages duplicate and inconsistent data, is hard to update reliably, and makes accurate reporting difficult.
- C. Spreadsheets cannot store any numbers.
- D. A database is always cheaper than any spreadsheet.

### Question 6 — One Owner, Many Pets (Multiple Choice)

The PetVax project notes that one owner may have multiple pets and one pet may have many visits. What does this pattern tell you about the data?

- A. The data has no structure and cannot be organized.
- B. The data has natural one-to-many relationships that connected tables can represent.
- C. Every owner must have exactly one pet.
- D. Pets and owners should never be linked.

### Question 7 — Two Projects, One Goal (Multiple Choice)

What is the main difference between the Grading Database and the PetVax project in this course?

- A. The Grading Database is the guided teaching case; PetVax is the applied lab case that tests whether you can transfer the same logic to a new setting.
- B. They are identical and interchangeable.
- C. PetVax is used for grading exams; the Grading Database is about pets.
- D. Only the Grading Database uses real tables.

### Question 8 — Professional Roles (Multiple Choice)

When you ask "what questions should this data eventually answer?", which professional role are you practicing?

- A. Systems thinker
- B. Analyst
- C. Communicator
- D. Database designer

### Question 9 — Tool Readiness (Multiple Choice)

Which list best matches the kinds of tools you will use as the PetVax labs become more technical?

- A. Spreadsheets, Microsoft Access, SQLite, PostgreSQL or Supabase, diagramming tools, and GitHub
- B. A calculator and a notebook only
- C. Video editing and photo retouching software
- D. None; the labs require no tools at all

### Question 10 — Lab 01 Deliverable (Multiple Choice)

What do you submit for Lab 01?

- A. A completed PetVax Access database file.
- B. A SQL script and result screenshots.
- C. Only this quiz; Lab 01 has no file submission.
- D. A Power BI dashboard of clinic revenue.

