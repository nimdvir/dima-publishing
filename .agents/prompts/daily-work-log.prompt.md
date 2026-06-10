---
name: "Daily Work Log"
description: "Generate a markdown report that documents everything completed today in the BITM330 project, including file moves, inventory rebuilds, Cloudinary links, and duplicate handling."
argument-hint: "Optional session notes, target chapter, or a short list of completed tasks"
agent: "agent"
---

Create a markdown daily work log for the BITM330 project from the current session or the notes provided by the user.

## Requirements

- Use only verified facts from the session or repository state.
- Keep the report concise, factual, and ready to paste into a markdown file.
- Include exact paths and counts when available.
- If Cloudinary URLs were already present in the source markdown, include them in the report.
- Do not repeat duplicate assets individually; group them or summarize them by count.
- Distinguish between:
  - file and folder moves
  - archived files
  - deduped or skipped files
  - inventory and gallery refreshes
  - remaining follow-ups

## Suggested Output Structure

1. Date and scope
2. Completed actions
3. File and folder moves
4. Inventory and gallery refreshes
5. Cloudinary link coverage
6. Duplicate handling
7. Current totals
8. Remaining follow-ups

## Style

- Brief, factual, and easy to scan.
- Use bullets or a compact table where helpful.
- Keep the wording practical and avoid filler.

## Output

Return the finished report in markdown only unless the user explicitly asks you to write it to a file.
