---
name: progress-update
description: >
  Append progress notes and todos to the BITM330 rolling edit log at
  `books/database-book/.edits/edit-log.md`. Use when: logging what was done
  today; capturing new ideas, follow-ups, or pending edits; adding a checked
  or unchecked task under today's date; recording session outcomes in the
  repo-side edit log. Each entry becomes a Markdown task list item ("- [ ]"
  for pending, "- [x]" for done) under a single H2 for the date.
  Prefer to apply this automatically during normal book-edit work, then ask
  only before adding agent-surfaced follow-up ideas that the user has not
  already requested.
argument-hint: Optional — items to log, or "today" to record this session's work
---

# Progress Update

Append daily progress notes, completed work, and follow-up ideas to the BITM330
repo edit log. One rolling file for the whole book. One H2 per day. One checkbox
list item per entry.

## When to Use

- The user says "log this", "add to today's edits", "progress update", or
  invokes `/progress-update`.
- The user wants to capture what was just done in this session.
- The user wants to record a new idea, follow-up, or pending edit.
- The end of a working session, before closing the chat.
- The assistant just completed a substantive book-edit task and should
  automatically record the result in the repo log.

Do **not** use this skill for:

- Chapter-level tracking — use the `chapter-tracker` skill instead.
- Chapter-specific edit notes — use the `edits` skill (one file per chapter
  under that chapter's `.edits/` folder).

## Target File

Workspace-relative:

books/database-book/.edits/edit-log.md

Absolute on this machine:

c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\.edits\edit-log.md

- The file is a single rolling log for the whole book.
- The file uses `.md` and lives in the repository.
- If the file does not exist, create it with the minimal top matter shown in
  the Template below.

## Entry Format

- Each day has one H2 heading: `## YYYY-MM-DD Edits`.
- Each entry is one Markdown task list item under that H2.
- Use `- [ ]` for a pending item, `- [x]` for something already completed.
- One line per item, plain prose. No nested lists unless the user asks.
- Reference files with Markdown links using workspace-relative paths when
  helpful.

## Procedure

1. Resolve today's date in `YYYY-MM-DD` form.
2. Open the daily file at the target path. If it does not exist, create it
   using the Template below.
3. Find or create the H2 `## YYYY-MM-DD Edits`. If absent, append it (with
   a blank line above) at the bottom of the file. Never create a second H2
   for the same date.
4. Collect entries from three sources:
   - What the user explicitly asked to log (use their wording; tighten only
     for clarity).
   - Work completed in the current session.
   - Related follow-up ideas surfaced by the agent.
5. Append completed session work automatically when the user is already
   working in the book-edit workflow. Ask once before adding related follow-up
   ideas that were not explicitly requested.
6. Append each confirmed entry as a single task list item under today's H2.
   Mark items completed in this session as `- [x]`; mark new ideas and
   pending work as `- [ ]`.
7. Do not reorder, delete, or rewrite existing items in the file.
8. Confirm back to the user: count of items added and show the new lines.

## Template (only when creating a new daily file)

    # Edit Log

    This file contains the rolling edit log for the database book. Each date
    heading groups task-list items for that day.

    ## YYYY-MM-DD Edits

## Anti-patterns

- Creating a new H2 for the same date instead of appending under the
  existing one.
- Using a daily file per date instead of a rolling repo log.
- Logging agent-suggested ideas without explicit user confirmation.
- Editing or removing existing items the user already logged.
- Using this skill for chapter-level tracking (use `chapter-tracker`).
