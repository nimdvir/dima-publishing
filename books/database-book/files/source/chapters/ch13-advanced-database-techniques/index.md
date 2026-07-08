# Chapter 13: Advanced Database Techniques

Earlier chapters focused on making databases correct: designing tables, defining keys, normalizing data, writing SQL, administering systems, and using data for business intelligence. But in real organizations, correctness is only the beginning — a database also has to survive real use. This chapter introduces the advanced techniques that turn a working database into a more reliable system: indexes, transactions, constraints, triggers, window functions, security, and platform differences, applied to hardening the Grading Database.

## Chapter Video

<!-- VIDEO (NotebookLM) — hidden note: generate the Chapter 13 overview video, then replace the line below with the YouTube iframe (see ch10 for the embed pattern). Full prompt: chapter-review-ch10-17/VIDEO-PROMPTS-NotebookLM.md -->

> 🎬 _Chapter 13 overview video — coming soon._

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [13.1 From Correct Queries to Reliable Systems](#13-1-from-correct-queries-to-reliable-systems) | Shift from writing correct SQL to building systems that stay correct under pressure. |
| [13.2 Indexes: Making Queries Fast at Scale](#13-2-indexes-making-queries-fast-at-scale) | Learn the top performance technique — how indexes turn slow scans into instant lookups. |
| [13.3 Transactions: Protecting Multi-Step Operations](#13-3-transactions-protecting-multi-step-operations) | Guarantee that multi-step changes either fully complete or fully undo. |
| [13.4 Constraints Beyond Primary Keys](#13-4-constraints-beyond-primary-keys) | Enforce data quality at the database level with checks, defaults, and unique rules. |
| [13.5 Triggers: Automated Database Responses](#13-5-triggers-automated-database-responses) | Automate validation and audit logging directly inside the database. |
| [13.6 Window Functions: A Note on Scope](#13-6-window-functions-a-note-on-scope) | Understand where advanced analytical functions fit — and their platform limits. |
| [13.7 Advanced Analytics Patterns](#13-7-advanced-analytics-patterns) | Build weighted grades, rates, and dashboard-ready views with SQL. |
| [13.8 Security and Permissions](#13-8-security-and-permissions) | Control access with authentication, roles, and row-level security. |
| [13.9 Advanced Techniques Across Platforms](#13-9-advanced-techniques-across-platforms) | Compare how these features differ across Access, SQLite, and PostgreSQL. |
| [13.10 Macros in Microsoft Access](#13-10-macros-in-microsoft-access) | Automate Access with macros — the no-code path to database logic. |
| [13.11 Stored Procedures and Database Functions](#13-11-stored-procedures-and-database-functions) | Package reusable logic inside the database for consistency and speed. |

---
