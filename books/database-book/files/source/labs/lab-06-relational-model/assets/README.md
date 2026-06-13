# Lab 06 Assets

Starter and reference files for **Lab 06 — Building the PetVax Relational Database in Access**.

## What students get

The lab is built around one starter database file:

- `lab-06-petvax-relational-starter.accdb` — 6 PetVax tables with starter data already loaded. No relationships. No saved queries. Students do that work themselves.

Students save a working copy as `Lab06-PetVax-Relational-LastName.accdb` and submit that file plus a relationship-report PDF.

## What is in this folder

| File                                     | Purpose                                                                             |
| ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `lab-06-petvax-relational-starter.accdb` | Student-facing starter (tables + data, no relationships, no queries)                |
| `lab-06-petvax-relational-ANSWER.accdb`  | Instructor / AI-grader reference: 5 relationships and 3 saved queries already built |
| `OWNER.CSV`                              | 6 owners (Hannah Reyes has no pets — `LEFT JOIN` hook)                              |
| `PET.CSV`                                | 7 pets                                                                              |
| `PET_OWNER.CSV`                          | 8 pet–owner links (many-to-many)                                                    |
| `SERVICE_TYPE.CSV`                       | 4 standard services with fees and vaccine-tracking flag                             |
| `APPOINTMENT.CSV`                        | 8 appointments                                                                      |
| `APPOINTMENT_SERVICE.CSV`                | 9 appointment-service line items                                                    |
| `build-starter.md`                       | Step-by-step instructions to rebuild both `.accdb` files from the CSVs              |

The CSVs are the source of truth for the seed data. If you want to regenerate the `.accdb` files, follow `build-starter.md`.

## Submission filename convention

| Submitted file      | Format                                    |
| ------------------- | ----------------------------------------- |
| Completed database  | `Lab06-PetVax-Relational-LastName.accdb`  |
| Relationship report | `Lab06-PetVax-Relationships-LastName.pdf` |

## Source

This lab is the PetVax transfer of [`ch06-lets-build-2026-05-24.md`](../../../ch06-relational-model/lets-build/ch06-lets-build-2026-05-24.md). The Let's Build builds the Grading Database. The lab applies the same relational logic to PetVax.
