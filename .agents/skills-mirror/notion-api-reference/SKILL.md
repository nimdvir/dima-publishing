---
name: notion-api-reference
description: >
  Reference for the Notion REST API conventions, authentication, pagination, SDKs,
  and endpoint patterns. Use when writing code that calls the Notion API directly
  (not via MCP), troubleshooting API requests, or needing SDK syntax. For MCP-based
  Notion operations, use notion-bridge, notion-knowledge-capture, and
  notion-database-templates instead.
argument-hint: >
  Describe the API task — e.g. "paginate through Notion API results", "set up the
  Notion JS SDK", or "check Notion API JSON conventions".
---

# Notion API Reference

Quick-reference for the Notion REST API. For complete endpoint details, fetch
the documentation index at `https://developers.notion.com/llms.txt`.

## Conventions

- Base URL: `https://api.notion.com`
- RESTful: `GET`, `POST`, `PATCH`, `DELETE`
- JSON request/response bodies
- Top-level resources have `"object"` and `"id"` (UUIDv4) properties
- Property names: `snake_case`
- Dates: ISO 8601 (`2020-08-12T02:12:33.231Z` for datetimes, `2020-08-12` for dates)
- No empty strings — use `null` to unset string values
- Dashes in IDs are optional when making requests

## Authentication

Bearer token required. Three options:

| Type | Use case |
|---|---|
| Internal access token | Internal connections |
| OAuth access token | Public connections |
| Personal access token (PAT) | Personal use, where workspace policy allows |

Header: `Authorization: Bearer <token>`
Version header: `Notion-Version: 2026-03-11`

## SDKs

- **JavaScript**: `@notionhq/client` — `npm install @notionhq/client`

```js
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY });
```

## Pagination

Cursor-based. Default: 10 items per call. Max `page_size`: 100.

### Supported endpoints

| Method | Endpoint |
|---|---|
| GET | List all users |
| GET | List block children |
| GET | List comments |
| GET | Retrieve a page property item |
| GET | List file uploads |
| GET | List data source templates |
| GET | List views |
| GET | Get view query results |
| POST | Query a data source |
| POST | Create a view query |
| POST | Search |

### Response fields

| Field | Description |
|---|---|
| `has_more` | `true` if more results exist |
| `next_cursor` | Pass as `start_cursor` for next page |
| `object` | Always `"list"` |
| `results` | Array of endpoint-specific objects |

### Pagination helpers (JS SDK)

```js
import { Client, iteratePaginatedAPI, collectPaginatedAPI } from "@notionhq/client";

// Async iterator — process page by page
for await (const page of iteratePaginatedAPI(notion.dataSources.query, {
  data_source_id: "<id>"
})) { console.log(page); }

// Collect all into array
const all = await collectPaginatedAPI(notion.dataSources.query, {
  data_source_id: "<id>"
});
```

## See Also

- Full index: `https://developers.notion.com/llms.txt`
- Getting started: `https://developers.notion.com/guides/get-started/overview`
- JS SDK: `https://github.com/makenotion/notion-sdk-js`
