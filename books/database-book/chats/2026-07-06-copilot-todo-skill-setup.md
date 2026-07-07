# Chat: Todo Skill Setup + Session Tracking System — 2026-07-06

**Source:** Copilot
**Original link:** n/a — local Copilot session

> Reopen: open this file in VS Code, or start a new chat and paste the TL;DR
> below as context.

---

## TL;DR

Built a complete session handoff system: created `todo.md` tracking file and `todo` skill (`.agents/skills/todo/SKILL.md`) with three modes — show (read back list), add (save chat + capture unfinished work into todo.md + chapter-tracker.md), and save (chat-only). Every todo item includes dual links (VS Code workspace path + GitHub URL) back to the source conversation. The skill auto-saves chats via `save-chat` and outputs a clear action-item list when done.

---

## Key Points

- Created `books/database-book/.edits/todo.md` — daily to-do list next to `edit-log.md`
- Created `todo` skill at `.agents/skills/todo/SKILL.md` with three modes (show, add, save)
- Skill auto-saves chat summaries to `books/database-book/chats/` before distilling action items
- Every todo item links back to the saved chat (VS Code + GitHub)
- Chapter items update both `todo.md` and `chapter-tracker.md`
- Updated skill tables in `.agents/README.md` and Drive `AGENTS.md`

---

## What Was Done / Decided

### Todo file
- Created `todo.md` with 2026-07-07 entries: YouTube upload script, chapter editing, Ch07 video upload

### Todo skill
- Created `SKILL.md` with full 3-mode specification
- **Mode 1 (show):** Reads todo.md + chapter-tracker active rows, outputs combined summary
- **Mode 2 (add):** Step 0 saves chat → Step 1 reviews session → Step 2 confirms → Step 3 writes to todo.md with chat/GitHub links → Step 4 updates chapter-tracker → Step 5 confirms
- **Mode 3 (save):** Chat-only quick save, no todo items
- Registered in `.agents/README.md` and Drive `AGENTS.md` skill tables

### Chapter tracker update
- Ch07 row: appended `· Upload 3 normalization videos to YouTube`, updated date to 2026-07-06

### Format decisions
- Todo items use next working day's date (not today)
- Item format: `- [ ] **Title** — description. [💬 chat](path) · [🔗 GitHub](url)`
- Chapter items get `(tracker: ChNN)` suffix

---

## Key Files / Artifacts

| File / Artifact | Change or Relevance |
|-----------------|---------------------|
| `books/database-book/.edits/todo.md` | Created — daily to-do list |
| `books/database-book/.edits/chapter-tracker.md` | Modified — Ch07 Next cell updated |
| `.agents/skills/todo/SKILL.md` | Created — full skill specification |
| `.agents/README.md` | Modified — added todo row to skill table |
| `BITM330-book-drive/AGENTS.md` | Modified — added todo row to skill table |
