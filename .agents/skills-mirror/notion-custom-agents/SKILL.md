---
name: notion-custom-agents
description: >
  Reference for Notion Custom Agents — building automated workflows that run on
  triggers and schedules. Use when creating, configuring, or debugging Custom Agents;
  setting up triggers (schedule, Notion events, Slack); managing access, models, and
  permissions; or understanding agent capabilities. Business and Enterprise plans only.
argument-hint: >
  Describe the agent task — e.g. "create a weekly report agent", "set up a Slack
  trigger", "debug a failing agent run", or "configure agent access to databases".
---

# Notion Custom Agents

Build shared automated workflows that run on triggers using your Notion docs
and databases as context. Business/Enterprise plans only.

## Capabilities

- Read from Notion pages, databases, and connected apps (Slack)
- Run on recurring schedules and workspace events
- Take actions: post reports, file bugs, update records, send messages
- Designed for background automation (vs. interactive Notion Agent)

## Triggers

### Schedule (Recurring)
- Frequency: daily, weekly, monthly, yearly
- Specific time with timezone (e.g. "every day at midnight PST")
- Next run time previewed before saving

### Notion Events
| Event | Filter support |
|---|---|
| Comment added to a page | — |
| Page added to a database | Property values, database views |
| Property updated in a database | Property values, database views |
| Page removed from a database | Property values, database views |

### Slack Events
Requires Slack workspace admin to connect the Slack AI connector first.

| Event | Notes |
|---|---|
| Message posted to a channel | Can filter by keyword/phrase, include thread replies |
| Emoji reaction added | — |
| Agent @-mentioned | Requires Slack admin to allow user group creation |

Typing indicator ("Working on it...") toggleable per trigger.

## Models

| Model | Best for | Plan |
|---|---|---|
| Auto (default) | General use, Notion picks best | — |
| Claude Sonnet 5 | Balanced quality/speed | Business+ |
| Claude Fable 5 | In-depth research, complex multi-step | Business+ (admin must enable) |
| GPT | General purpose | — |
| Gemini | Google ecosystem | — |
| Grok | — | — |

Claude Fable 5 note: Anthropic may store prompts/responses for safety. Admin
must enable in Settings → Notion AI.

## Access Control

### Notion Access
- Add specific pages/databases (targeted)
- Grant "Pages shared with everyone" (broad)
- Linking pages in Instructions does NOT add them to Tools & Access
- Default: no access — explicitly grant everything

### Web Access
- Toggle on/off per agent
- On: agent can retrieve internet information
- Off: restricted to Notion + configured apps only

### Slack Access
- Admin connects Slack workspace to Notion first
- Agent gets read/write to selected channels only
- Can post messages, replies, thread in selected channels
- Enterprise Grid supported

## Sharing & Permissions

| Level | Can do |
|---|---|
| **Full Access** | Configure instructions/triggers/models, manage activity logs, run |
| **Can Edit** | Modify instructions and config, review activity |
| **Can View & Interact** | Run and chat, view settings read-only |

Users without access can still trigger agents responding to Slack messages
in accessible channels.

## Building an Agent

### Start from
1. **AI Chat** — describe in natural language, review generated config
2. **Template** — pick a template, iterate
3. **Blank** — start from empty instructions

### Tips for Instructions
- Start with the job and outcome you want
- Add concrete steps, inputs, and outputs
- Use examples when available
- Treat config as conversation — use Chat tab to test and iterate

## Agent Tabs

| Tab | Purpose |
|---|---|
| **Chat** | Private 1:1 conversation for testing, one-off tasks, iterating |
| **Activity** | Log of every run: trigger, actions, errors (Full Access only) |
| **Settings** | Instructions, triggers, access, model selection |

## Maintenance

- **Version History**: See who changed what and when; restore any version
- **Duplicate**: Copies name (appends "(1)"), model, instructions, triggers. Does NOT copy: Slack connections, Workers, run history, credit limits. Private by default.
- **Export Insights**: CSV export of chats/threads (up to 300). Business/Enterprise.

## External Agents (Claude, Cursor, etc.)

External Agents extend Custom Agents to let external AI tools (Claude, Cursor)
operate as teammates inside Notion with the same trigger, access, and permission
model. They inherit all Custom Agent settings.

### Prerequisites
- Business or Enterprise workspace
- External Agents enabled by Workspace Owner
- Notion Credits available
- Claude disabled by default in HIPAA workspaces and workspaces with Anthropic model restrictions

### Claude Agent Capabilities
- **Talk & plan**: Answer questions about connected codebases, scope work into technical plans, take direction mid-run from comments
- **Work in codebase**: Read connected GitHub repos, open PRs with diffs and screenshots, break work into smaller task cards with technical plans
- **Work in Notion**: Create/update pages, post progress comments, generate files (PowerPoint, Excel) from any page
- **Within guardrails**: Only sees granted pages/DBs/connections; credit usage tracked

### GitHub Setup
- Requires Personal Access Token (PAT) with read+write for Contents and Pull Requests
- Agent gets access to selected repositories only
- Without write permissions: read-only code Q&A

### Use Case Templates
| Template | Best for |
|---|---|
| **Coding task board** | Bug fixes, small features, research tasks triggered by board column |
| **General task board** | Non-code work: marketing, content, research |
| **Codebase Q&A** | Answering questions about repos without making changes |
| **Blank Claude agent** | Custom workflows beyond templates |

### Coding Task Board Workflow
1. Task board columns: Backlog → Ready for Agent → In Progress → In Review → Done
2. **Trigger**: Move card to Ready for Agent (Claude picks up automatically)
3. **Alt triggers**: @-mention Claude in a comment, or batch-move multiple cards
4. **Tracking**: Claude posts plain-language updates as comments; open live session for full transcript/tool calls; jump in mid-run via comments
5. **Outputs**: Pages (research/summaries), Tasks (smaller cards with technical plans), Pull Requests (with diffs, descriptions, screenshots)

### File Generation
- @-mention Claude on any Notion page with instructions (e.g. "Turn this into a PowerPoint deck")
- Grant page access when prompted
- Agent embeds link to completed file at bottom of source page
- Tips: well-structured source pages and specific output instructions produce better results

### Adoption Tips
- Start with one workflow (e.g., bug triage) for a few weeks
- Be explicit about what Claude owns vs. stays with humans — write into instructions
- Treat first few weeks as tuning: read every PR/plan, watch for patterns, update instructions
- Keep normal PR review process — Claude opens, teammate reviews and approves
- Create multiple Claude agents when workflows need different instructions/triggers/access

## Audit Log (Enterprise)

Key agent events logged: draft created, instructions updated, model settings
changed, integration added/removed/updated, Notion access changed, web access
toggled, trigger added/removed/updated, credit limits updated, published,
permissions updated, enabled/disabled, deleted, restored.
