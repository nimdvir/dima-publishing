

# SKILL: Term Treasury Engine

---

## Name

terms-treasury-skill

## Description

Generate or update the **Term Treasury** for a chapter by extracting, refining, and organizing key vocabulary from the most recent instructional files. Ensures consistency across chapters, avoids duplication, and maintains a centralized term registry.

---

## Purpose

The Term Treasury defines the **essential vocabulary** students must understand for the chapter.

It is not a glossary dump.

It is a **curated, high-signal vocabulary layer** that supports:

* conceptual clarity
* reading comprehension
* exam readiness
* cross-chapter consistency

---

## Source Priority (MANDATORY)

Always extract terms from the most recent versions of:

1. Chapter main file (core concepts)
2. Lets-Build file

Do NOT use:

* Reflection files
* RAT files
* Lab files

---

## File Naming Rule

When making a significant update, create a new file:

ch<number>-terms-<YYYY-MM-DD>.md

Example:
ch01-terms-2026-03-19.md

Never overwrite previous files.

---

## Output Structure (STRICT)

The file must begin exactly as follows:

# Chapter <number> - Term Treasury

*Essential Vocabulary - understand the key terms used throughout this chapter.*

---

## Image (MANDATORY)

Immediately after the subtitle, insert a centered image using HTML:

<p align="center">
  <img src="g:/My Drive/0-Projects/!-important/BITM330-book-drive/.images/Ch0 General/sections/resize/terms-sized.min.gif" />
</p>

---

## Term Selection Rules

Only include **important terms**.

A term is important if it is:

* conceptually central
* repeatedly used
* required for understanding later chapters
* tied to system design, SQL, or business logic
* explicitly defined or strongly implied

---

## DO NOT INCLUDE

* trivial words
* obvious English terms
* one-off mentions
* UI labels or tool-specific buttons
* redundant synonyms

---

## Cross-Chapter Deduplication (CRITICAL)

Before generating the file:

Read:

G:\My Drive\0-Projects!-important\BITM330-book-drive.docs\Terms\terms-list.csv

Then:

* do NOT repeat terms already introduced in previous chapters
* only include **new terms introduced in this chapter**

---

## Term Formatting Rules

* organize terms in **alphabetical order**
* do NOT group by letters (no A, B, C headers)
* each term must be **bolded**
* each term must include a **clear, concise definition**

---

### Example Format

**Primary Key**
A field that uniquely identifies each record in a table.

**Relational Database**
A structured system that stores data in tables and allows relationships between them.

---

## Acronyms Section (REQUIRED)

At the end of the file, include a table for acronyms.

### Rules

* include only meaningful acronyms
* acronyms must also be bolded in chapter files
* avoid trivial or obvious abbreviations

---

### Format

## Acronyms

| Acronym | Meaning                    |
| ------- | -------------------------- |
| DBMS    | Database Management System |
| SQL     | Structured Query Language  |

---

## Main File Synchronization (CRITICAL)

After generating the Term Treasury:

You must ensure that:

* all included terms are **bolded in the main chapter file**
* all included terms are **bolded in the Lets-Build file**

Do NOT:

* over-bold
* bold entire sentences

Only bold the **first meaningful occurrence** where appropriate.

---

## CSV Update (MANDATORY)

After generating the terms:

Update the file:

G:\My Drive\0-Projects!-important\BITM330-book-drive.docs\Terms\terms-list.csv

---

### CSV Format

Each row must include:

Term, Chapter

Example:

Primary Key, 1
Relational Database, 1

---

### Rules

* append only
* do NOT delete existing rows
* do NOT duplicate terms already listed
* maintain consistent capitalization

---

## Writing Style for Definitions

Definitions must be:

* clear
* short
* precise
* student-friendly

---

### Preferred Style

* one sentence preferred
* max two sentences if needed
* avoid circular definitions
* avoid jargon unless defined

---

### Example

Bad:
A database is a system used to store data in a database.

Good:
A database is a structured system used to store and organize data for easy access and analysis.

---

## Tone

* instructional
* clear
* confident
* not academic-heavy
* not overly simplified

---

## Quality Checklist

Before output:

* correct file naming
* correct header format
* image included and centered
* terms extracted from correct sources
* no duplicates from CSV
* alphabetical order
* terms bolded
* definitions clear and concise
* acronyms table included
* terms bolded in main + Lets-Build files
* CSV updated

---

## Output Rules

* return clean Markdown only
* no explanations
* no commentary
* no placeholders

---

## Final Standard

The Term Treasury should feel like:

* a **clean vocabulary layer**
* a **quick-reference tool for students**
* a **controlled, cumulative dictionary across chapters**

It should be:

* focused
* non-redundant
* easy to scan
* academically reliable


