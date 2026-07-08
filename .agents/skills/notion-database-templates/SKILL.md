---
name: notion-database-templates
description: >
  Create and configure Notion databases using the Notion MCP for common knowledge
  management patterns. Use when the user asks to create a Notion database, set up
  a documentation wiki, build a decision log, configure a FAQ database, create a
  team wiki, build a how-to guide collection, or set up a learning/retrospective
  database. Provides ready-to-use SQL DDL schemas, view configurations, and
  property design guidance. Delegates content formatting to notion-flavored-markdown
  and routing/safety to notion-bridge.
argument-hint: >
  Describe the database type — e.g. "create a decision log database", "set up a
  team documentation wiki", or "build a learning database for project post-mortems".
---

# Notion Database Templates

Create ready-to-use Notion databases for common knowledge management patterns.
This skill provides **SQL DDL schemas**, **view configurations**, and
**property design guidance** for each database type. It does not cover
routing/safety (`notion-bridge`), content formatting (`notion-flavored-markdown`),
or page creation (`notion-knowledge-capture`).

## Workflow

1. **Pick the database type** from the templates below.
2. **Choose a parent** — existing page, workspace root, or under VSC-Shared.
3. **Create the database** — `mcp_notion_mcp_notion-create-database` with the
   schema and parent.
4. **Create default views** — `mcp_notion_mcp_notion-create-view` for the
   most useful perspectives (table, board, filtered).
5. **Verify** — `mcp_notion_mcp_notion-fetch` the new database to confirm.

## Template: Documentation Database

The workhorse — general documentation, guides, references, notes.

```sql
CREATE TABLE (
  "Name" TITLE,
  "Type" SELECT('How-To':blue, 'Concept':green, 'Reference':gray, 'FAQ':yellow, 'Note':brown),
  "Category" SELECT('Engineering':red, 'Product':purple, 'Design':pink, 'Research':orange, 'Other':default),
  "Tags" MULTI_SELECT(),
  "Owner" PEOPLE,
  "Status" SELECT('Draft':gray, 'Review':yellow, 'Final':green, 'Deprecated':red),
  "Last Reviewed" DATE
)
```

Recommended views:
- Table grouped by Status (default)
- Board grouped by Type
- Filtered: Status != Deprecated

## Template: Decision Log

Track architectural choices, design decisions, and their rationale.

```sql
CREATE TABLE (
  "Name" TITLE,
  "Status" SELECT('Proposed':gray, 'Accepted':green, 'Deprecated':red, 'Superseded':orange),
  "Decision Date" DATE,
  "Decided By" PEOPLE,
  "Category" SELECT('Architecture':blue, 'Design':purple, 'Process':yellow, 'Tooling':red, 'Other':default),
  "Tags" MULTI_SELECT(),
  "Superseded By" RELATION('self', DUAL 'Supersedes' 'supersedes')
)
```

Recommended views:
- Table sorted by Decision Date descending
- Board grouped by Status
- Filtered: Status = Accepted

## Template: FAQ Database

Common questions with authoritative answers.

```sql
CREATE TABLE (
  "Name" TITLE,
  "Category" SELECT('Getting Started':blue, 'Troubleshooting':red, 'Configuration':yellow, 'Concepts':green, 'Other':default),
  "Tags" MULTI_SELECT(),
  "Owner" PEOPLE,
  "Status" SELECT('Draft':gray, 'Published':green, 'Needs Update':yellow, 'Deprecated':red),
  "Last Updated" DATE,
  "Related Docs" RELATION('documentation_db_id')
)
```

Recommended views:
- Table grouped by Category
- Board grouped by Status
- Filtered: Status = Published

## Template: Team Wiki

Team-specific processes, onboarding, standards, and workflows.

```sql
CREATE TABLE (
  "Name" TITLE,
  "Type" SELECT('Process':blue, 'Standard':green, 'Onboarding':yellow, 'Reference':gray, 'Template':brown),
  "Team" SELECT('Engineering':red, 'Product':purple, 'Design':pink, 'All':default),
  "Tags" MULTI_SELECT(),
  "Owner" PEOPLE,
  "Status" SELECT('Draft':gray, 'Active':green, 'Needs Update':yellow, 'Archived':red),
  "Last Reviewed" DATE,
  "Review Cadence" SELECT('Monthly':blue, 'Quarterly':yellow, 'Annually':gray, 'Ad-hoc':default)
)
```

Recommended views:
- Table grouped by Team
- Board grouped by Type
- Filtered: Status = Active, sorted by Last Reviewed ascending (overdue first)

## Template: How-To Guide Database

Step-by-step instructions, walkthroughs, and tutorials.

```sql
CREATE TABLE (
  "Name" TITLE,
  "Difficulty" SELECT('Beginner':green, 'Intermediate':yellow, 'Advanced':red),
  "Category" SELECT('Setup':blue, 'Development':purple, 'Deployment':orange, 'Troubleshooting':red, 'Other':default),
  "Tags" MULTI_SELECT(),
  "Owner" PEOPLE,
  "Status" SELECT('Draft':gray, 'Ready':green, 'Needs Update':yellow, 'Deprecated':red),
  "Last Verified" DATE,
  "Prerequisites" RICH_TEXT
)
```

Recommended views:
- Table grouped by Category
- Board grouped by Difficulty
- Filtered: Status = Ready

## Template: Learning Database

Project post-mortems, incident learnings, retrospectives, what went well/improve.

```sql
CREATE TABLE (
  "Name" TITLE,
  "Type" SELECT('Post-Mortem':red, 'Retrospective':blue, 'Lesson Learned':green, 'Aha Moment':yellow),
  "Outcome" SELECT('Positive':green, 'Negative':red, 'Mixed':yellow),
  "Project/Context" RICH_TEXT,
  "Tags" MULTI_SELECT(),
  "Owner" PEOPLE,
  "Date" DATE,
  "Related Decisions" RELATION('decision_log_db_id'),
  "Related Docs" RELATION('documentation_db_id')
)
```

Recommended views:
- Table sorted by Date descending
- Board grouped by Outcome
- Calendar view by Date

## General Tips

1. **Start with Documentation DB** — it handles 80% of use cases.
2. **Add specialized DBs as needed** — don't create them all upfront.
3. **Use relations** to connect databases (Learning -> Decision, FAQ -> Docs).
4. **Create filtered views** for common workflows.
5. **Document the schema** in the database description for team reference.
6. **Self-relations** (like Decision Log's Superseded By) need a two-step
   process: create the database first, then use `update-data-source` to add
   the self-referencing RELATION columns.
