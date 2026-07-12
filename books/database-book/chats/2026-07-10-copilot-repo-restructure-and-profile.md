# Copilot Chat — Repo Restructure Plan + VS Code Profile Consolidation

**Date:** 2026-07-10
**Repo:** dima-publishing (branch `backup-2026-07-08`)
**Topics:** (1) VS Code profile consolidation, (2) detailed dima-publishing repo restructure plan

---

## Summary

This session covered two separate but related housekeeping tasks.

### Topic 1 — VS Code profile consolidation (executed)

Goal: make the **Default** VS Code profile the everyday profile while preserving
the essential model/provider/workflow settings from the active custom profile
`-7dbe41f9` ("Agents"). Fully reversible until cleanup is confirmed.

**Audit findings (read-only):**
- `msal-no-broker` and the BYOK utility-model fix (`chat.utilityModel` /
  `chat.utilitySmallModel` = `copilot/gpt-5.4-mini`) were **already in Default** —
  two of the three expected "gotchas" were resolved before this session.
- User-root `chatLanguageModels.json` is a **superset** of the profile's — copying
  the profile's smaller version would have been a downgrade, so it was NOT copied.
- Both user-root and profile `mcp.json` are **empty**; MCP servers come from
  workspace-level config, so the profile switch never threatened them.

**Phase 2 executed:** added 13 keys to Default `settings.json` (JSON validated,
no duplicate keys, add-only rule respected):
- 3 required: `deepseek-copilot.visionModel`, `qwen-code.provider`,
  `github.copilot.chat.codesearch.enabled`
- 5 QoL group (all approved): `files.associations`, `pasteImage.*` (5 keys),
  `projectManager.*` (2 keys), `editor.mouseWheelZoom`, `claudeCode.preferredLocation`

**Phase 3:** no-op (Option B) — `mcp.json` left empty, `chatLanguageModels.json`
not copied.

**Left behind per hard rules:** `chat.tools.urls.autoApprove` (security),
`chat.mcp.serverSampling`, `chat.agent.maxRequests`, `agentDebugLog`,
window-layout taste settings.

**Remaining (user-driven):** Phase 4 switch to Default via
`Profiles: Switch Profile`; Phase 5 test auth/Copilot/Groq/DeepSeek/Ollama/
MCP/Markdown/book workspace; Phase 6 soak 2–3 days; Phase 7 delete old profiles
via UI + check Settings Sync for a stale "Agents" profile.

**Backups:** folder backup at
`%APPDATA%\Code\User\profile-backups\profile-simplify-20260710-153118` +
`.code-profile` export confirmed done.

### Topic 2 — Detailed repo restructure plan (documented, not started)

Produced a detailed, execution-ready restructure plan for **dima-publishing**,
building on the prior `repo-reorg-plan-2026-07-09.md` and
`restructure-plan-2026-07-08.md`.

Saved to: `books/database-book/plans/2026-07-10-repo-restructure-detailed-plan.md`

**Key facts:** working tree ~1.3 GB; `platform-pilots/` = 687 MB with a 234 MB
exact duplicate (`book-build/prototype`); production app `reader-hybrid-v1.1`
buried 4 levels deep; plans sprawled across 4+ locations; root clutter and dead
dirs; `.gitignore` bug.

**Target structure:** `apps/reader`, `books/database-book/{source,manifests,
plans,workflow,scripts}`, `assets/{covers,images}`, `tools/grading/`,
`archive/{pilots,prototype,misc}`.

**7 phases**, one PR each, all `git mv`:
0. Safety + branch reconciliation (`backup-2026-07-08` ↔ `main`)
1. Zero-risk cleanup (~240 MB)
2. Promote production app out of `platform-pilots/`
3. Consolidate plans (needs review — content differs)
4. Content folder rename (`files/source` → `source`)
5. Root tidy
6. scripts triage
7. Repo weight (LAST — lean do-nothing now, revisit `git filter-repo` after semester)

**New drivers added this session:** branch cleanup, codified naming conventions.

**Gated on:** the final book structure decision (chapter order + merges).

---

## Deliverables this session

- `books/database-book/plans/2026-07-10-repo-restructure-detailed-plan.md` (new)
- This chat summary
- Todo items under 2026-07-14 in `.edits/todo.md`
- Notion mirror under ✅ Project TODO (`396508ab55d78108904ef8b6df495764`)

## Open questions

- Final chapter order + merges (unblocks restructure Phases 3 + content renumbering)
- Archive location: in-repo vs. separate repo
- Grader script home: `tools/grading/` vs. course repo
- Drop 227 MB pilot image originals?
- Retire GitHub Pages pilot gallery?
