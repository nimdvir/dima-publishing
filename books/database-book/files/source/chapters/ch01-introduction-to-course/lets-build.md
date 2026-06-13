<!-- metadata: date="2026-06-03" -->

# Let's Build: Introduction to the Course

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let’s Build section icon" width="220">
</p>

<p align="center">

*Figure 1.1 — Let's Build section header for Chapter 1.*

## Building Your Foundation

### In This Chapter, You Are Not Building the Full Database Yet

Chapter 1 is different from the Let's Build sections that follow. At this stage, you are not yet creating tables, entering records, or writing full SQL queries. Instead, you are building the foundation for the project that runs throughout the book.

Your job in this chapter is to understand the logic of the Grading Database, see how the project will evolve, preview the kinds of questions it is meant to answer, and begin thinking about the professional roles involved in database work. In other words, this chapter is about orientation, structure, and purpose before construction begins.

Good **database** work starts before any table is built. It starts with understanding the domain, the problem, the users, and the questions the system must eventually answer.

### The Grading Database Project

![Grading Database project overview](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/grading_svq05h?_a=BAMAAAiu0)

*Figure 1.2 — Overview of the Grading Database, the running project for the book.*

The central hands-on project in this book is the **Grading Database** — a relational database that you will design, build, populate, **query**, and refine across the text. This is not a hypothetical exercise. You will model a real system: one that stores grades and attendance, calculates final grades, computes running averages, and presents results through forms and reports.

The **Grading Database** is a relational **information system** that tracks students, class sessions, deliverables such as quizzes, assignments, and exams, individual scores, and attendance records. It serves as the book's primary running case because it provides a consistent and familiar setting for introducing ideas across multiple chapters.

By the end of the project, your database will become a working system capable of:

- **Storing structured academic data** across multiple related tables.
- **Enforcing data integrity** through **primary keys**, **foreign keys**, data types, and relationships.
- **Answering real questions with SQL** such as grade retrieval, attendance percentages, and average performance by deliverable type.
- **Supporting data entry through forms** that make input more consistent and less error-prone.
- **Presenting results through reports** that a non-technical stakeholder can read and use.
- **Automating repetitive tasks** such as refreshing outputs or calculating grades.
- **Performing what-if analysis** such as minimum and maximum possible grade scenarios.
- **Mapping numeric grades to letter grades** through lookup logic and relational joins.

![Simplified ERD for the Grading Database](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/bitm330book/ch01-introduction-to-course/ch01-lets-build-erd?_a=BAMAAAiu0)

*Figure 1.3 — Simplified entity relationship diagram (ERD) for the Grading Database.*

### How the Project Evolves

The Grading Database evolves in two major phases across the book. That progression matters because the project is designed to move from foundation to integration, not from zero to complexity all at once.

#### Phase 1: Foundation

In the first phase, you focus on core relational structure. You will design a basic schema, create tables and relationships, enter **data**, and begin asking useful questions with **SQL**. The emphasis is on structure, accuracy, and understanding how information is represented.

By the end of this phase, you should be able to work with a functioning database that supports tasks such as:

- storing student and deliverable data;
- recording attendance and grades;
- retrieving results with SQL;
- calculating averages and attendance percentages;
- using **forms** for cleaner data entry.

#### Phase 2: Integration and Analysis

In the second phase, the project becomes more sophisticated. You will extend the database into a more complete information system by adding formal design documentation, more advanced analysis, automation, and clearer reporting outputs.

By the end of this phase, you will work on tasks such as:

- producing a formal **Entity Relationship Diagram**;
- writing SQL table-creation scripts;
- calculating weighted final grades;
- performing minimum and maximum grade analysis;
- building simple automation;
- reflecting on administration, reporting, and business intelligence issues.

The project therefore evolves the same way many real systems do: first by getting the structure right, then by expanding what the system can reliably do.

![Two-phase progression of the Grading Database](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/bitm330book/ch01-introduction-to-course/ch01-lets-build-two-phase?_a=BAMAAAiu0)

*Figure 1.4 — Two-phase progression of the Grading Database, from foundation to integration and analysis.*

### Why a Grading Database?

The Grading Database is deliberately chosen because it is a system students already understand as users. You know what grades are, how attendance works, and what a final grade means. That familiarity removes much of the guesswork about business rules and lets you focus on the real learning objectives: how to structure data, how to query it, how to protect it, and how to present it clearly.

At the same time, the domain is complex enough to surface real design challenges. It includes **one-to-many relationships**, aggregate calculations, conditional logic, weighted scoring, and multi-table joins. These are the same patterns that appear in inventory systems, CRM platforms, healthcare records, and financial reporting, just applied to a setting that is already intuitive.

That is what makes the project effective. You do not waste early energy learning an unfamiliar domain. Instead, you can focus on learning how a relational system represents a domain you already understand.

### Professional Roles You Will Begin to Practice

As the project develops, you will begin practicing the kinds of thinking associated with several professional roles.

| Role | What You Begin to Practice |
| --- | --- |
| **Data architect** | Designing structure, entities, and relationships |
| **SQL analyst** | Turning business questions into queries and interpretable outputs |
| **Database manager** | Thinking about integrity, consistency, and reliability |
| **Analyst** | Transforming structured data into useful insight |
| **Communicator** | Presenting technical results clearly for non-technical audiences |

You are not expected to perform all of these roles at an advanced level in Chapter 1. The goal is to begin recognizing them. As the project grows, you will revisit them repeatedly in more direct and demanding ways.

![Professional roles practiced through the Grading Database](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/bitm330book/ch01-introduction-to-course/ch01-roles?_a=BAMAAAiu0)

*Figure 1.5 — Professional roles you begin to practice through the Grading Database project.*

### What You Will Do in Chapter 1

Because this is an orientation chapter, the Chapter 1 version of Let's Build focuses on understanding the project before constructing it.

In this chapter, you will:

- preview the purpose and scope of the Grading Database;
- inspect the kinds of entities and relationships it will eventually include;
- understand how the project evolves from foundation to integration;
- compare the instructional role of the Grading Database with the applied role of PetVax;
- begin identifying the professional roles involved in database work;
- define the kinds of business questions the project should eventually answer.

### Chapter 1 Tasks

Complete the following tasks as your first Let's Build activity:

1. **Project purpose check**  
   In one short paragraph, explain what the Grading Database is supposed to do and why it is a good teaching case.

2. **System question list**  
   Write at least five questions that the finished database should be able to answer. For example:  
   - What is a student's average quiz score?  
   - What is a student's attendance percentage?  
   - Which deliverables are still missing scores?  
   - What is the minimum final grade a student could still earn?  
   - What letter grade corresponds to a student's current average?

3. **Entity preview**  
   Review the ERD preview and identify the main entities you expect the system to include. For each one, write one sentence explaining what kind of data it stores.

4. **Project evolution summary**  
   In a short list, explain the difference between Phase 1 and Phase 2 of the project.

5. **Transfer reflection**  
   Write two or three sentences explaining why the PetVax project matters in addition to the Grading Database. What does it test that the main project does not?

6. **Role reflection**  
   Which of the professional roles feels most familiar to you right now, and which feels least familiar? Briefly explain why.

7. **Digital companion check**  
   Locate the repository and confirm where the course files, scripts, or supporting materials live.

These tasks may seem simple, but they matter. They establish the logic of the project before you begin building, and they prepare you to work more deliberately in the chapters that follow.
