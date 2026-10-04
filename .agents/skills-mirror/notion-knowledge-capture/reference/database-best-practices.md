# Database Best Practices

General guidance for creating and maintaining knowledge capture databases.

## Core Principles

### 1. Keep It Simple
- Start with core properties
- Add more only when needed
- Don't over-engineer

### 2. Use Consistent Naming
- Title property for main identifier
- Status for lifecycle tracking
- Tags for flexible categorization
- Owner for accountability

### 3. Include Metadata
- Created/Updated timestamps
- Owner or maintainer
- Last reviewed dates
- Status indicators

### 4. Enable Discovery
- Use tags liberally
- Create helpful views
- Link related content
- Use clear titles

### 5. Plan for Scale
- Consider filters early
- Use relations for connections
- Think about search
- Organize with categories

## Creating a Database

### Using Notion MCP `create-database`

Example for documentation database:

```sql
CREATE TABLE (
  "Name" TITLE,
  "Type" SELECT('How-To':blue, 'Concept':green, 'Reference':gray, 'FAQ':yellow),
  "Category" SELECT('Engineering':red, 'Product':purple, 'Design':pink),
  "Tags" MULTI_SELECT(),
  "Owner" PEOPLE,
  "Status" SELECT('Draft':gray, 'Final':green, 'Deprecated':red)
)
```

### Fetching Database Schema

Before creating pages, always fetch the database to get the schema:

```
mcp_notion_mcp_notion-fetch
id: "database-url-or-id"
```

This returns the exact property names and types to use.

## Database Selection Guide

| Need | Use This Database |
|------|-------------------|
| General documentation | Documentation Database |
| Track decisions | Decision Log |
| Q&A knowledge base | FAQ Database |
| Team-specific content | Team Wiki |
| Step-by-step guides | How-To Guide Database |
| Incident/project learnings | Learning Database |

## Tips

1. **Start with general documentation database** — most flexible
2. **Add specialized databases** as needs emerge (FAQ, Decisions)
3. **Use relations** to connect related docs
4. **Create views** for common use cases
5. **Review properties** quarterly — remove unused ones
6. **Document the schema** in database description
7. **Train team** on property usage and conventions
