# VS Code Profile Consolidation — Agent Plan v2 (Post-Audit)

**For:** LLM agent operating inside VS Code Copilot
**Owner:** Nim Dvir
**Date:** 2026-07-10 (v2 — supersedes v1)
**Status:** Phases 0–1 complete. Phase 2 approved with the exact patch below.

---

## What changed from v1

The Phase 1 read-only audit (completed) found that Default is further along
than v1 assumed:

| v1 assumption | Audited reality |
|---|---|
| `msal-no-broker` must be migrated before deleting `-53ed5ff1` | **Already in Default.** Special case resolved; `-53ed5ff1` is pure cruft. |
| BYOK utility-model keys must be verified | **Already in Default** (`copilot/gpt-5.4-mini`, correct `vendor/id` form). |
| `chatLanguageModels.json` must be copied/reconciled | **Do not copy.** User-root version is a superset (adds OpenRouter + extra providers). Copying the profile's smaller file would be a downgrade. |
| MCP files must be migrated | **No-op.** Both user-root and profile `mcp.json` are empty; the split `mcp.core.json` etc. were staged but never auto-loaded. MCP servers live at workspace level (unaffected by profile switch). |
| Merge list to be determined | **Determined and approved** — exact 13-key block in Phase 2. |

Source file verified: the profile settings at
`%APPDATA%\Code\User\profiles\-7dbe41f9\settings.json` were read directly and
match the audit's profile-only key list. All values in the Phase 2 block are
taken verbatim from that file.

## User decisions (locked in)

- **Consideration 1:** Copy all five QoL items (files.associations,
  pasteImage.*, projectManager.*, editor.mouseWheelZoom,
  claudeCode.preferredLocation) in addition to the 3 required keys.
- **Consideration 2:** Option B — leave user-root `mcp.json` empty;
  per-workspace MCP config stays as is.
- `chat.tools.urls.autoApprove` stays behind. (Audit note: it turned out to be
  a narrow 3-domain allowlist with `approveRequest: false` on Supabase — lower
  risk than assumed, but still excluded. Re-add specific domains later on
  noticed friction, as a deliberate choice.)
- `chat.mcp.serverSampling` stays behind — VS Code will simply re-prompt for
  model approval if MCP sampling is used in Default. Nothing is lost.

---

## Hard Rules (unchanged from v1, still binding)

1. Do not delete any profile folder manually. Never touch `profiles\builtin`.
2. Do not switch the active profile programmatically — user does it via UI.
3. Patch-based, key-by-key edits only. Never overwrite `User\settings.json`
   wholesale.
4. **Add-only rule (new, critical for Phase 2):** the profile file also
   contains generic editor settings (`files.autoSave`, `editor.fontSize`,
   `editor.wordWrap`, the `[markdown]` block, `workbench.colorTheme`, etc.).
   Default may have its own values for these. Only add keys absent from
   Default; never overwrite an existing Default key. If the editor feels
   different after the switch, the user decides per-setting later.
5. Do not copy secrets. BYOK keys are per-profile SecretStorage; re-entry
   after switching is expected.
6. Do not regress the BYOK utility-model settings (`vendor/id` form).
7. **Phase gates:** report at the end of each phase, then STOP and wait for
   explicit user approval before the next phase.
8. Validate JSON/JSONC after every edit.
9. No student data to Notion or external services during testing.

---

## Phase 0 — Backups ✅ COMPLETE (pending export confirmation)

- Folder backup exists:
  `C:\Users\nd115232\AppData\Roaming\Code\User\profile-backups\profile-simplify-20260710-153118`
  (contains User-settings.json + both custom profiles). Do not delete.
- `.code-profile` export via `Profiles: Export Profile` → Google Drive:
  **user confirms done before Phase 2 edits.**

## Phase 1 — Audit ✅ COMPLETE

Findings recorded above. No further audit work needed.

---

## Phase 2 — Patch Default settings.json (APPROVED, ready to execute)

Edit `%APPDATA%\Code\User\settings.json`. Add exactly these 13 keys — verified
values from the profile file — subject to the add-only rule (Hard Rule 4):

```json
"deepseek-copilot.visionModel": "copilot/gpt-5.3-codex",
"qwen-code.provider": "api-key",
"github.copilot.chat.codesearch.enabled": true,
"files.associations": { "*.rmd": "markdown" },
"editor.mouseWheelZoom": true,
"claudeCode.preferredLocation": "panel",
"projectManager.projectsLocation": "G:\\My Drive\\0-Projects\\",
"projectManager.groupList": true,
"pasteImage.path": "${currentFileDir}/.images",
"pasteImage.basePath": "${currentFileDir}/.images/",
"pasteImage.forceUnixStyleSeparator": true,
"pasteImage.defaultName": "fig_YYYY-MM-DD_HH-mm-ss",
"pasteImage.insertPattern": "![${imageFileNameWithoutExt}](.images/${imageFileName})"
```

Do NOT copy anything else. Explicitly excluded: `chat.tools.urls.autoApprove`,
`chat.mcp.serverSampling`, `chat.agent.maxRequests`,
`github.copilot.chat.agentDebugLog.fileLogging.enabled`,
`chat.restoreLastPanelSession`, `chat.viewProgressBadge.enabled`,
`chat.tools.terminal.preventShellHistory`, `window.zoomLevel`,
`workbench.activityBar.location`, `workbench.statusBar.visible`, and the
generic editor/theme keys already present in Default.

Optional (user may request later, not now):
`markdown.extension.completion.respectVscodeSearchExclude: false` and
`mdEditorPlus.structureMapVisible: false` — restore on noticed Markdown
friction.

**After patching:** validate JSON, show the user the exact diff, STOP for
review.

## Phase 3 — Non-settings migration ✅ NO-OP

- `chatLanguageModels.json`: do not copy (Default's is a superset).
- MCP: nothing to migrate (Option B; workspace-level config unaffected).
- No `keybindings.json` / `snippets\` / `tasks.json` migration was flagged by
  the audit.
- Reminder to user: BYOK API keys (Groq, DeepSeek, etc.) will need re-entry
  after the switch. Expected, not breakage.

## Phase 4 — Switch to Default (user-driven)

1. Command Palette → `Profiles: Switch Profile` → **Default**. Reload if
   prompted.
2. Confirm the profile indicator in the Activity Bar shows Default.

## Phase 5 — Test (in order)

1. Extensions present (Copilot/Chat, DeepSeek, Groq provider, Ollama,
   Markdown tools, Project Manager, Claude Code / Qwen / ChatGPT). Install
   missing via Extensions view, filtered by old profile.
2. GitHub/Microsoft auth completes cleanly (msal-no-broker already in Default;
   escalate only if auth still misbehaves).
3. Copilot Chat with a Copilot-hosted model.
4. Groq model + simple agent request (re-enter key if prompted).
5. DeepSeek model + simple agent request; confirm BYOK utility-model error is
   gone.
6. Ollama local models at `http://localhost:11434` if expected.
7. MCP servers appear per workspace (Notion etc. where configured).
8. Markdown workflow: formatting, image paste into `.images` with `fig_`
   naming (validates the pasteImage keys landed).
9. Book workspace (`BITM330-MAIN.code-workspace` / dima-publishing): workspace
   settings apply; no `inlineChat.defaultModel` hardcoding resurfaces.
10. Editor feel check: if font size / word wrap / autosave feel different,
    that's Default's own values showing — user picks per-setting, agent does
    not bulk-copy.

## Phase 6 — Soak (2–3 working days)

Use Default normally. Delete nothing. On any missing behavior: pull the single
responsible item from the folder backup, retest. Never restore wholesale.

## Phase 7 — Cleanup (after user confirms stability)

1. `Profiles: Delete Profile` (UI only): the Agents profile (`-7dbe41f9`) and
   the test profile (`-53ed5ff1` — auth special case already resolved, safe
   once Phase 5 item 2 passes).
2. `Settings Sync: Show Synced Data` → confirm no stale "Agents" profile in
   sync state; remove via the sync UI if present.
3. Keep both backups (folder + `.code-profile`) ≥ 1 month, then archive to
   Google Drive or delete.

---

## Short version

Backups done (confirm export) → patch the 13 verified keys into Default,
add-only, show diff, stop → no other migration needed → user switches and
checks the profile badge → test auth, models, MCP, Markdown paste, book
workspace → soak 2–3 days → delete both profiles via UI → check Settings Sync
→ keep backups a month. Stop for explicit approval at every phase boundary.
