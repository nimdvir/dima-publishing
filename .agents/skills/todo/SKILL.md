---
name: todo
description: >
  Session handoff — save the chat, then summarize in-progress work and session
  context into clear, actionable to-do items for the next working session. Use
  when: the user says they are done for the day but tasks remain; the user
  asks "what's on my todo list" or "what should I work on"; the user invokes
  `/todo`; the session is ending and the user has in-progress work. Auto-saves
  a dated chat summary to `books/database-book/chats/` (via save-chat skill),
  then reads the full chat history, identifies unfinished threads, and distills
  them into concrete next actions in `books/database-book/.edits/todo.md` and
  `books/database-book/.edits/chapter-tracker.md`. Every todo item includes
  links back to the saved chat (VS Code workspace path + GitHub URL). Also
  outputs a clean summary when the user asks what to work on next.
argument-hint: "[optional: 'show' | 'add' | specific task to capture]"
---

# Todo Skill

Three modes: **show** (read back the list), **add** (save chat + capture
unfinished work), and **save** (save chat only, no todo items).

---

## Mode 1 — Show the action-item list (start-of-day recall)

When the user asks "what's on my list", "what should I work on", "show todo",
"todo list", `/todo list`, or invokes `/todo` with no arguments:

1. Read `books/database-book/.edits/todo.md`.
2. Read the Active table only from `books/database-book/.edits/chapter-tracker.md`
   (stop at `## Archive`).
3. Output a clean, numbered action-item list in the same format as Step 5:

   ```
   ## 📋 To-Do — Monday, July 7, 2026

   ### Action Items
   1. **Brief bold title** — one-line description. [💬 chat](path) · [🔗 GitHub](url)
   2. **Brief bold title** — one-line description (tracker: ChNN)
   3. ...

   ### Chapter Tracker (pending)
   | Ch | Next |
   |----|------|
   | 07 | · Upload normalization videos |
   ```

   - Pull items from the most recent (or nearest future) date heading in `todo.md`.
   - Show chapter tracker rows that have a non-empty Next cell.
   - If `todo.md` has no future items and no chapter rows are pending, say:

   ```
   Nothing pending. Check `chapter-tracker.md` for the big picture,
   or pick up where you left off in `edit-log.md`.
   ```

---

## Mode 2 — Save chat + capture unfinished work (end-of-session)

When the user says "I'm done", "wrap up", "add to todo", "I didn't finish",
"save for tomorrow", or invokes `/todo add`:

### Step 0 — Save the chat (auto)

Before distilling action items, save a dated summary of this conversation
using the `save-chat` skill. This ensures the full chat context is preserved
even though Copilot doesn't auto-save chat history.

1. Follow the `save-chat` skill procedure:
   - Save to `books/database-book/chats/YYYY-MM-DD-copilot-<topic>.md`
   - Include TL;DR, Key Points, What Was Done, and Key Files sections
   - If the chat covers multiple unrelated topics, split into separate files
2. Confirm the saved file path(s) to the user.
3. Record the exact filename(s) — these will be used in Step 3 for todo item
   links.

### Step 1 — Review the session and identify unfinished work

Read the full chat history for this session. Identify:

- Tasks explicitly started but not completed (in-progress chapter edits,
  scripts, media work, builds, imports, etc.).
- Open threads where the user asked for something and the conversation moved on
  before resolution.
- Items the user mentioned as "tomorrow", "next time", or "later".
- Multi-step workflows where only some steps finished.
- New ideas or follow-ups the user surfaced during the conversation that were
  not acted on.

For each, distill the chat context into a **single clear action item** — a
concrete next step the user can act on immediately when they return. Strip
out conversational fluff; keep the filename, path, chapter number, and
specific deliverable.

Group items by type:

- **Chapter work** — tied to a specific chapter (editing, media, companions,
  imports, builds). These go to BOTH `todo.md` AND `chapter-tracker.md`.
- **General work** — scripts, tooling, platform, research, non-chapter tasks.
  These go to `todo.md` only.

### Step 2 — Confirm with the user

Present the proposed list and ask the user to confirm. Never write without
confirmation. Let the user add, remove, or reword items.

### Step 3 — Write to todo.md

Target: `books/database-book/.edits/todo.md`

- Use the **next calendar day** as the date heading (not today). If today is
  Friday, use next Monday.
- Format: `## YYYY-MM-DD`
- If the heading already exists, append under it. If not, create it.
- For chapter items, add a cross-reference: `(tracker: ChNN)`

**Every item MUST include links to the saved chat** (from Step 0), so the user
can reopen the conversation that produced the task:

```
- [ ] **Brief bold title** — one-line description. [💬 chat](books/database-book/chats/YYYY-MM-DD-copilot-<topic>.md) · [🔗 GitHub](https://github.com/nimdvir/dima-publishing/blob/main/books/database-book/chats/YYYY-MM-DD-copilot-<topic>.md)
```

- **💬 chat** link: workspace-relative path, opens the saved chat in VS Code.
- **🔗 GitHub** link: full URL to the same file on the `main` branch, opens in browser.
- Use the exact filename from Step 0. If the chat was split into multiple
  files, link to the most relevant one for each todo item.

Example:

```
- [ ] **Upload Ch07 normalization videos to YouTube** — 3 videos from `.images/ch07-normalization/ch-07-videos/`. [💬 chat](books/database-book/chats/2026-07-06-copilot-todo-skill-setup.md) · [🔗 GitHub](https://github.com/nimdvir/dima-publishing/blob/main/books/database-book/chats/2026-07-06-copilot-todo-skill-setup.md) (tracker: Ch07)
```

### Step 4 — Update chapter-tracker.md (chapter items only)

Target: `books/database-book/.edits/chapter-tracker.md`

For each chapter item confirmed in Step 2:

1. Find the chapter's row in the Active table.
2. Append `· <item description>` to the Next cell.
3. Update the Updated date to today.
4. If the chapter has no row, add one with the correct Category.

### Step 5 — Output the action-item list

After writing, output a clear, numbered summary of the action items just added
so the user can see at a glance what needs to be done:

```
## ✅ Saved and ready for tomorrow

💬 Chat saved: `books/database-book/chats/YYYY-MM-DD-copilot-<topic>.md`

### Action Items
1. **Brief bold title** — one-line description
2. **Brief bold title** — one-line description (tracker: ChNN)
3. ...
```

Confirm the saved chat path, number of todo items added, and any
chapter-tracker updates.

---

## Mode 3 — Quick save chat only (no todo items)

When the user says "just save the chat", "save chat only", or invokes
`/todo save`:

1. Run Step 0 only: save the chat via `save-chat` skill.
2. Do NOT review unfinished work or write to `todo.md` or `chapter-tracker.md`.
3. Confirm the saved file path.

---

## Target Files

- **Chat saves**: `books/database-book/chats/`
- **todo.md**: `books/database-book/.edits/todo.md`
- **chapter-tracker.md**: `books/database-book/.edits/chapter-tracker.md`

Absolute paths:

```
c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\chats\
c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\.edits\todo.md
c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\.edits\chapter-tracker.md
```

---

## Anti-patterns

- Writing to `todo.md` without user confirmation.
- Using today's date instead of the next working day.
- Overwriting or deleting existing items in `todo.md`.
- Adding chapter work to `todo.md` without also updating `chapter-tracker.md`.
- Reading the Archive section of `chapter-tracker.md`.
- Confusing this with `progress-update` (which writes to `edit-log.md` for
  completed work, not pending work).
- Skipping the save-chat step — always save the chat before distilling todos.
- Omitting the chat/GitHub links from todo items — every item must trace back
  to its source conversation.
