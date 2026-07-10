---
name: notion-audit-log
description: >
  Reference for the Notion Enterprise audit log — event types, SIEM integration,
  filtering, CSV export, and event categories. Use when investigating security
  events, configuring SIEM streaming, auditing workspace activity, or understanding
  what actions are logged. Enterprise Plan only.
argument-hint: >
  Describe the audit task — e.g. "what page events are logged", "set up SIEM
  streaming", or "export audit log for compliance review".
---

# Notion Audit Log

Enterprise Plan only. Organization owners can access detailed security and
safety-related activity logs. Retention: 365 days from upgrade date.

## Access

1. Workspace switcher → **Settings** → **Admin** → **Audit log**
2. Requires organization owner role on Enterprise Plan

## Filters

| Filter | Description |
|---|---|
| **Date** | Specific date or range within past 365 days |
| **Person or agent** | User, integration, or agent. Removed users still searchable (labeled "Removed") |
| **Event** | One or more event types by category |
| **Related** | Events triggered by same underlying action (magnifying glass icon) |

## SIEM Integration

Stream audit log events in real-time via webhooks:

1. Settings → **Connections** → **Custom SIEM integration**
2. Enter webhook URL from your SIEM account
3. All events sent as JSON payloads in real-time

## Event Categories

### Page Events
Core events: created, edited, viewed, moved to trash, deleted from trash,
permanently deleted, restored, exported, moved, locked/unlocked.

Content events: file uploaded/downloaded, comment added/updated/deleted,
page suggestions (created/accepted/rejected/commented), automation
created/edited.

Permission events: permission updated, shared to web, private content
transferred.

AI events: AI Meeting Notes transcription started/deleted, audio downloaded.

#### Page Event Audience
Hover any page event to see visibility: Private, Shared internally,
Shared externally, Shared to web. Included in CSV exports.

### Data Source Events
Created, moved to trash, deleted from trash, restored, moved, permission
rule updated, permanently deleted, schema edited.

### Teamspace Events
Member/group added/removed, member joined/left, created/archived/restored,
name/description/icon changed, privacy type changed, default toggled,
creation setting toggled, role updated, custom permissions updated,
invite access changed, guests disabled, export/public sharing toggled,
sidebar editing toggled, teamspaces feature enabled.

### Workspace Events
Member invited/joined/removed, guest removed/invite requested, role updated,
invite link toggled/reset, workspace name/icon/domain changed, page access
requests toggled, public sharing/export toggled, sidebar editing toggled,
guests disabled, pages to other workspaces toggled.

Integration events: created/deleted, secret reset, settings/permissions
updated, added/removed from approved connections.

Security events: allowed email domain added/removed, SCIM token
generated/revoked, IdP metadata updated/removed, SAML enabled/enforced,
auto-create accounts toggled, HIPAA compliance enabled/disabled.

Group events: created/deleted, name changed, member added/removed.

MCP events: server connected, allowlist enabled/disabled, client
added/removed from allowlist, external AI tool name changed, user/team
information read.

Other: public home page set/cleared, workspace content exported, workspace
creation setting updated, claimable workspace status changes, membership
requests toggled/resolved, audit log/user analytics/content analytics
exported, analytics tracking toggled, content search queried/exported,
Notion AI toggled, workspace consolidation started/completed/failed,
user suspended/unsuspended, managed users logged out, passwords cleared,
custom emoji created/updated/deleted.

### Account Events
Login, logout, password set/cleared/changed, MFA SMS/TOTP/backup code
toggled, email changed, picture changed, user deleted, support access
granted/revoked, preferred name changed, authorized via workspace SAML.

### Custom Agent Events
Configuration: draft created, agent updated, instructions updated, model
settings updated, integration added/removed/updated, Notion access changed,
web access updated, trigger added/removed/updated, credit limits updated,
published.

Access: permissions updated, enabled/disabled, deleted, restored.

Runs: triggered, completed, failed.

Page & content: agent-created/edited/deleted pages logged as standard page
events attributed to agent with triggering human in metadata.

Workspace settings: creation policy updated, default credit limit
set/removed, group creation policy updated.

## CSV Export

1. Settings → **Manage organization** → **Data & Compliance** → **Audit log**
2. Optionally filter
3. Select **Export**

Exports include active filters. Data range: 365 days back to 2 hours before
export time. Export regularly to preserve historical data.
