---
name: save-chat
description: Save a summary of a chat as a dated Markdown file for later reference. Works for the current Copilot chat AND for pasted ChatGPT, Claude, Gemini, or other web chat transcripts. Use when the user asks to save the chat, summarize a conversation, archive a ChatGPT/web chat, or preserve context for a future session. Defaults to books/database-book/chats/ but accepts a custom save location.
argument-hint: "[optional topic label] [optional source: copilot|chatgpt|claude|gemini|other] [optional path: save location]"
---

# Save Chat Skill

Save a summary of a chat as a dated Markdown file so it can be referenced or
reopened later. Works for two sources:

1. **The current Copilot chat** — summarize this session.
2. **A pasted web chat** — ChatGPT, Claude, Gemini, Perplexity, or any other
   external conversation the user pastes or links.

## Save Location

- **Default:** `books/database-book/chats/`
- **Custom:** If the user specifies a different folder or path (for example
  "save it to `.docs/chats`" or an absolute Windows path), use that location
  instead. Create the directory if it does not exist.
- Confirm the final save path in the output so the user knows where it went.

## When to Use

- User says "save this chat", "summarize this chat", "archive this conversation"
- User pastes a ChatGPT/Claude/Gemini transcript and asks to save or summarize it
- User shares a web chat link (e.g. `chat.openai.com/share/...`) and wants it captured
- User wants to preserve context for a future session
- User asks to save a chat to a specific folder or path

## Procedure

### 0. Confirm save location

- Use the default `books/database-book/chats/` unless the user names a different
  folder or path.
- If a custom path is given, use it verbatim and create the directory if needed.

### 1. Identify the source

Determine whether you are summarizing:

- **Copilot (current session):** Summarize the conversation you are in.
- **Web chat (pasted/linked):** Use the pasted transcript. If only a link is
  given and its content is not available, ask the user to paste the transcript,
  or capture just the link with a short user-provided description.

Record the source in the file (Copilot, ChatGPT, Claude, Gemini, etc.).

### 1a. Split unrelated topics into separate files

Before writing, assess whether the chat covers **one coherent topic** or
**several unrelated ones**.

- If the chat is a single topic (even with sub-tasks), save **one** file.
- If the chat clearly covers **multiple unrelated topics** (for example, a
  design-system task AND an unrelated Supabase auth bug AND a video-upload
  script), split it into **separate files** — one per topic — each with its own
  descriptive filename and its own TL;DR.
- When splitting, tell the user how many files you created and list each one.
- Keep related sub-tasks together; only split when topics would not naturally
  belong in the same summary.

### 2. Determine filename

Format: `YYYY-MM-DD-<source>-<topic>.md`

- Use today's date (YYYY-MM-DD)
- `<source>`: `copilot`, `chatgpt`, `claude`, `gemini`, or `other`
- `<topic>`: 2-5 words, lowercase, hyphenated, from the chat's main subject
- If the user provides a topic label or source, use those
- Examples:
  - `2026-07-05-copilot-design-instructions.md`
  - `2026-07-05-chatgpt-stripe-webhooks.md`
  - `2026-07-05-claude-erd-modeling.md`

### 3. Compose the summary

Create the file at `books/database-book/chats/<filename>.md` with this structure:

```markdown
# Chat: <Topic> — <Date>

**Source:** <Copilot | ChatGPT | Claude | Gemini | Other>
**Original link:** <real shareable URL if one exists, else "n/a — local Copilot session" or "n/a — pasted transcript">

> Reopen: open this file in VS Code, or start a new chat and paste the TL;DR
> below as context. (VS Code Copilot sessions have no shareable deep link;
> only web chats with a share URL can be linked directly.)

---

## TL;DR

<One-paragraph summary of what the chat accomplished or concluded>

---

## Key Points

- <Main ideas, conclusions, or recommendations from the chat>

---

## What Was Done / Decided

### <Phase or theme>
- <bullet list of actions, decisions, or findings>

---

## Key Files / Artifacts (if any)

| File / Artifact | Change or Relevance |
|-----------------|---------------------|
| `<path or name>` | Created / Modified / Referenced — brief description |

---

## Decisions & Rationale

- <Key decisions and why they were made>

---

## Next Steps (if continuing)

1. <Actionable next step>

---

*Summary generated <Date>. Source: <source>.*
```

### 4. Rules

- **Be specific.** Include actual file paths, values, links, and concrete
  decisions — not vague descriptions.
- **Keep it scannable.** Tables for file/artifact lists, bullets for actions,
  short paragraphs.
- **TL;DR first.** It's the most important paragraph.
- **Preserve the source link.** For web chats, always record the original URL
  (or note that only a transcript was provided).
- **Don't dump the full transcript.** Summarize the highlights. If the user
  explicitly wants the full transcript preserved, append it under a
  `## Full Transcript` section at the end.
- **List decisions explicitly.** Future sessions need to know what was decided
  and why.
- **Attribute web chats accurately.** Note which model/tool produced the chat.
- **Be honest about links.** A live VS Code Copilot session has no shareable
  deep link. Only record an `Original link` when a real shareable URL exists
  (e.g. a ChatGPT/Claude share URL). Otherwise write "n/a" — never invent a
  `vscode://` or fake URL.

### 4a. Update the grouped chat index

After saving one or more chat summary files, regenerate the grouped chat index:

- Script: `scripts/build-chat-index.ps1`
- Output: `books/database-book/chats/CHAT-INDEX.md`

This index groups chats by month and source so older sessions are easy to
browse and reopen.

### 4b. Mirror to Notion Chat Archive

After saving one or more chat summaries, mirror each saved file to the Notion
project archive page:

- Project wiki: `📚 Book Project — BITM330`
- Archive page: `💬 Chat Archive`
- Page URL: `https://app.notion.com/p/396508ab55d781858de7e4d531d7553c`

Append one checklist entry per saved chat under `## Entries` in this format:

`- [ ] YYYY-MM-DD — <source> — <topic> · [open](https://github.com/nimdvir/dima-publishing/blob/main/books/database-book/chats/<filename>.md) · <one-line TL;DR>`

Rules:

- Append only (never delete prior entries).
- Keep the one-line TL;DR concise (max ~140 chars).
- If Notion is unavailable, still complete local save and index generation.
- Never include student data in Notion entries.

### 5. Web-chat specifics

- If the user provides a share link and the transcript, capture both.
- If the user provides only a link with no accessible content, save a stub with
  the link, date, and a one-line description, and flag it as
  `pending_transcript` so it can be completed later.
- Do not fabricate content that was not in the pasted chat.

## Output

After saving, confirm:
- Final save path (default or custom)
- Source (Copilot / ChatGPT / etc.)
- Line count
- Key topics covered
- A clickable workspace-relative link to the saved file
- A clickable link to `books/database-book/chats/CHAT-INDEX.md`
- Whether Notion `💬 Chat Archive` was updated (and how many entries appended)

## Target Directory

Default:

```
C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\chats\
```

If the user directs a different location, save there instead. Create the
directory if it doesn't exist.
