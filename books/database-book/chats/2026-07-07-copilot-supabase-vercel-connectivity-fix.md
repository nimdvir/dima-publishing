# Chat: Supabase-Vercel Connectivity Fix — 2026-07-07

**Source:** Copilot
**Original link:** n/a — local Copilot session

> Reopen: open this file in VS Code, or start a new chat and paste the TL;DR
> below as context.

---

## TL;DR

Diagnosed and fixed Supabase connectivity on the BITM330 reader app (Vercel + Supabase). The root cause was **empty `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`** environment variables in Vercel for the `dima-publishing` project. Additionally, a project mismatch was found between two Supabase projects (`akjidhxkcuubeajsntrz` for the active reader vs `mreqwgpbssbeoonxldvp` for Dbook, which is unused). MCP was pointing at the wrong project. All env vars were set via CLI and production was redeployed.

---

## Key Points

- Two Supabase projects exist: `akjidhxkcuubeajsntrz` (active reader, has 26-student roster, access grants, migrations) and `mreqwgpbssbeoonxldvp` (Dbook, unused, only referenced in root `.env` notes)
- The MCP server (`mcp.json`) was pointing at the wrong project (`mreqwgpbssbeoonxldvp`)
- Vercel had `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` registered but with **empty values** — explaining the `"Unrecognized client_id"` error
- Root `.env` contains raw notes (not env vars) for the Dbook project including a hardcoded Postgres password — security risk
- The `VITE_` prefix is required for Vite to expose vars to the browser; `SUPABASE_URL` (without prefix) is invisible to the client

---

## What Was Done / Decided

### Diagnosis
- Identified two Supabase projects and confirmed `akjidhxkcuubeajsntrz` is the active one
- Found MCP configured for wrong project in `dima-publishing/.vscode/mcp.json`
- `vercel env ls` confirmed vars exist but `vercel env pull` revealed empty values
- Dev `.env.local` at `reader-hybrid-v1.1/.env.local` had correct values but they don't reach production

### Fix
- Set env vars via CLI:
  ```
  vercel env add VITE_SUPABASE_URL production
  vercel env add VITE_SUPABASE_URL preview
  vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
  vercel env add VITE_SUPABASE_PUBLISHABLE_KEY preview
  ```
- Values: URL = `https://akjidhxkcuubeajsntrz.supabase.co`, Key = `sb_publishable_jv1vy4kys9Ir5iYjiiZsZA_AetB0eYD`
- Deployed to production: `vercel --prod` (29s, ready at `www.dimapublishing.com` / `data-pilot.dimapublishing.com`)

### Not Done (requires user action)
- MCP fix in `mcp.json` (change `mreqwgpbssbeoonxldvp` → `akjidhxkcuubeajsntrz`)
- Clean up Dbook notes from root `.env`
- Test the sign-in flow on the live site to confirm no more `"Unrecognized client_id"`

---

## Key Files / Artifacts

| File / Artifact | Change or Relevance |
|-----------------|---------------------|
| `dima-publishing/books/database-book/platform-pilots/reader-hybrid-v1.1/.env.local` | Local dev Supabase credentials (already correct) |
| `dima-publishing/books/database-book/platform-pilots/reader-hybrid-v1.1/src/lib/supabaseClient.ts` | Supabase client init (reads `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`) |
| `dima-publishing/.vscode/mcp.json` | MCP config pointing to wrong project (`mreqwgpbssbeoonxldvp`) — needs fix |
| `dima-publishing/.env` (root) | Contains raw Supabase Dbook notes + hardcoded Postgres password — needs cleanup |
| `dima-publishing/vercel.json` | Build config (reader-hybrid-v1.1 → dist) |
| Vercel project: `dima-publishing` (prj_BizvjJqBaEfdY3v7EpAQKsyRAo7L) | Production deployment at `data-pilot.dimapublishing.com` |
| Supabase project: `akjidhxkcuubeajsntrz` | Active project with auth, access grants, 26-student roster |

---

## Decisions & Rationale

- **Did NOT create a new Supabase project via Vercel Marketplace** — would lose all existing data (26-student roster, access grants, migrations, edge functions)
- **Did NOT use `vercel install supabase`** — same reason, would provision a new empty project
- **Used CLI to set env vars** — faster and more reliable than dashboard UI for this case
- **MCP fix deferred** — requires user action in VS Code settings, not automatable from CLI

---

## Next Steps (if continuing)

1. Fix MCP: update `mcp.json` line 5 to use `akjidhxkcuubeajsntrz` instead of `mreqwgpbssbeoonxldvp`
2. Clean up `dima-publishing/.env`: remove or redact Dbook project notes (especially the hardcoded Postgres password)
3. Test sign-in on `https://data-pilot.dimapublishing.com` — confirm no `"Unrecognized client_id"` in browser console
4. Resume registration feature work (add name fields, email domain validation, password confirmation to `SupabaseAccessTest.tsx`)

---

*Summary generated 2026-07-07. Source: Copilot.*
