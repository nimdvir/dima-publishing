---
name: daily-work-log
description: >
  Generate a dated markdown work log for the BITM330 project. Use when the user
  asks to document everything completed today, summarize file moves and inventory
  rebuilds, preserve Cloudinary links, or create a concise session report from
  verified work only.
argument-hint: Optional — "today" or a short description of the work session to document
---

# Daily Work Log

## Purpose

Produce a clean, factual markdown summary of everything completed in the current
work session.

## When to Use

- The user asks for a work log, daily summary, session recap, or "what did we do today?"
- The user wants documentation of file moves, archive actions, folder organization,
  inventory rebuilds, or gallery refreshes.
- The user wants Cloudinary links included where the source markdown already had them.

## Output Rules

- Use only verified facts from the current session and repository state.
- Keep the report markdown-ready and easy to scan.
- Prefer bullets and compact tables over long paragraphs.
- Do not repeat duplicate assets; document duplicates as grouped items or counts.
- Include exact paths when available.
- If Cloudinary URLs are present in the source markdown, include them in the report.
- Distinguish between:
  - moved files
  - archived files
  - deduped or skipped files
  - inventory and gallery refreshes
  - remaining follow-ups

## Recommended Report Structure

1. Date and scope
2. Completed actions
3. File and folder moves
4. Inventory and gallery refreshes
5. Cloudinary link coverage
6. Duplicate handling
7. Current totals
8. Remaining follow-ups

## Example Tone

Brief, factual, and helpful.

Example: "Moved the loose chapter-root images into their chapter folders, rebuilt
 the media inventory, and preserved Cloudinary links for assets already uploaded."

## Guardrails

- Do not guess at file paths or counts.
- Do not invent Cloudinary URLs.
- If the user asks for a file-based report, write the markdown to the requested
  location using the same section structure.
