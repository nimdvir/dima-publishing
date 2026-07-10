---
name: notion-knowledge-capture
description: >
  Capture research, notes, decisions, learnings, and documentation into structured
  Notion databases. Use when the user asks to save something to Notion, capture a
  finding, log a decision, archive research, or build a knowledge base. Covers
  database selection, page creation, property population, and cross-linking.
  Delegates content formatting to notion-flavored-markdown and routing/safety to
  notion-bridge.
argument-hint: >
  Describe what to capture — e.g. "save this SQL pattern to my KB", "log this design
  decision", "capture these research notes to Notion", or "add this chapter insight
  to the learning database".
---

# Notion Knowledge Capture

Capture information into the right Notion database with the right structure.
This skill decides **which database to use**, **what properties to set**, and
**how to link related content**. It does not cover routing/safety (`notion-bridge`)
or content formatting (`notion-flavored-markdown`).

## Workflow

1. **Classify the content** — use the database selection guide below.
2. **Check the boundary** — delegate to `notion-bridge` for source-of-truth and
   student-data safety.
3. **Fetch the target database** — `mcp_notion_mcp_notion-fetch` the database
   to get current schema and property names.
4. **Build the page** — set properties, then format content with
   `notion-flavored-markdown`.
5. **Create the page** — `mcp_notion_mcp_notion-create-pages` under the correct
   data source.
6. **Link related content** — add relations to connected pages/databases when
   the capture references existing Notion content.

## Database Selection Guide

Choose the right database for the content type:

| Content Type | Database | When to Use |
|---|---|---|
| General docs, guides, references | Documentation DB | Default; multi-purpose knowledge |
| Architectural/design choices | Decision Log | Why we chose X over Y, with context |
| Q&A, troubleshooting | FAQ Database | Common questions with answers |
| Team processes, onboarding | Team Wiki | Team-specific workflows and standards |
| Step-by-step instructions | How-To Guide DB | Procedures, walkthroughs, tutorials |
| Project lessons, post-mortems | Learning Database | What went well, what to improve |

When unsure, start with the documentation database — it's the most flexible.

## Core Properties

Every captured page should include:

| Property | Purpose | Example |
|---|---|---|
| Title | Main identifier | "SQLite vs SQL Server date functions" |
| Status | Lifecycle tracking | Draft / Final / Deprecated |
| Tags | Flexible categorization | `sql`, `sqlite`, `date-functions` |
| Owner | Accountability | @nimdvir |
| Created | Auto timestamp | (set by system) |

Add domain-specific properties only when the database schema requires them.

## Common Capture Patterns

### Research Note

```
Properties: { Title, Status: "Draft", Tags: ["research", "<topic>"] }
Content: Source URL, key findings, quotes, relevance to current work.
```

### Design Decision

```
Properties: { Title, Status: "Final", Tags: ["decision", "<domain>"] }
Content: Context, options considered, decision, rationale, trade-offs.
```

### Chapter Insight

```
Properties: { Title, Status: "Draft", Tags: ["book", "ch<NN>", "<topic>"] }
Content: Chapter reference, insight, SQL pattern, or teaching note.
```

### Tool/Workflow Note

```
Properties: { Title, Status: "Draft", Tags: ["tooling", "<tool>"] }
Content: Command, configuration, gotcha, or workflow step.
```

## Cross-Linking

- When capturing content that references an existing Notion page, add a
  relation property if the database schema supports it.
- Use `<mention-page url="...">` in content for inline references.
- For database-to-database links, use `mcp_notion_mcp_notion-update-data-source`
  to add RELATION columns when needed.

## Tips

1. **Fetch before creating** — always get the target database schema first.
2. **Use consistent tags** — check existing tags before adding new ones.
3. **Start with Draft status** — refine later; don't block on perfection.
4. **Link aggressively** — cross-references make the knowledge base useful.
5. **Review quarterly** — archive deprecated pages, update stale ones.
6. **One page per topic** — split broad captures into focused pages.
7. **Include source URLs** — always link back to where the information came from.

## Reference

See [reference/database-best-practices.md](reference/database-best-practices.md)
for detailed guidance on database creation, property design, and scaling
knowledge capture databases.
