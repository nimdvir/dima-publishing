---
name: daily-work-log
description: >
  Generate the full dated markdown work log for the BITM330 project. Use when the user
  asks to document everything completed today, including file moves, archive actions,
  inventory rebuilds, Cloudinary links, duplicate handling, and any other verified
  session work that should be preserved in a detailed report.
argument-hint: Optional — "today" or a short description of the work session to document
---

# Daily Work Log

## Purpose

Produce the full markdown documentation for everything completed in the current
work session. This is the detailed version of the log, not the short summary.

## When to Use

- The user asks for a work log, daily summary, session recap, or "what did we do today?"
- The user wants the complete record of file moves, archive actions, folder organization,
  inventory rebuilds, gallery refreshes, Cloudinary coverage, and duplicate handling.
- The user wants session-level tooling or customization changes documented too, if they were part of the work.
- The user wants Cloudinary links included where the source markdown already had them.

## Prompt Variants

- `daily-work-log.prompt.md` = full documentation / long-form report
- `log-today.prompt.md` = alias for the full documentation report

## Output Rules

- Use only verified facts from the current session and repository state.
- Preserve the session in enough detail that a reader could reconstruct what happened without the chat.
- Keep the report markdown-ready and easy to scan, but do not compress multiple phases into one vague bullet.
- Prefer bullets and compact tables over long paragraphs.
- Do not repeat duplicate assets; document duplicates as grouped items or counts.
- Include exact paths, script names, and final counts when available.
- If Cloudinary URLs are present in the source markdown, include them in the report.
- Distinguish between:
  - planning or inspection
  - moved files
  - archived files
  - deduped or skipped files
  - inventory and gallery refreshes
  - verification and rebuild passes
  - remaining follow-ups

## Recommended Report Structure

1. Date and scope
2. Executive summary
3. Chronological session log
4. File and folder moves
5. Inventory and gallery refreshes
6. Cloudinary link coverage
7. Duplicate handling
8. Current totals
9. Remaining follow-ups

## Example Tone

Brief, factual, and detailed enough to serve as the day's record.

Example: "Moved the loose chapter-root images into their chapter folders, rebuilt
the media inventory twice while verifying counts, and preserved Cloudinary links for
assets already uploaded."

## Guardrails

- Do not guess at file paths or counts.
- Do not invent Cloudinary URLs.
- If the user asks for a file-based report, write the markdown to the requested
  location using the same section structure.
