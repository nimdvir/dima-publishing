name: "Log Today (Full Documentation)"
description: "Alias for generating the full BITM330 daily work log from today's verified session work."
argument-hint: "Optional session notes, target chapter, or a short list of completed tasks"
agent: "agent"
---

Create the **full markdown daily work log** for the BITM330 project from the current session or the notes provided by the user.

This alias uses the same full documentation standard as `daily-work-log.prompt.md`.

## Requirements

- Use only verified facts from the session or repository state.
- Preserve the major phases in the order they happened, even if some steps were repeated.
- Include exact paths, script names, counts, and destination folders when available.
- If the session included multiple rebuilds, verification passes, or correction passes, document each one separately.
- If Cloudinary URLs were already present in the source markdown, include them in the report.
- Do not repeat duplicate assets individually; group them or summarize them by count.
- Distinguish between:
	- planning or inspection
	- file and folder moves
	- archived files
	- deduped or skipped files
	- inventory and gallery refreshes
	- verification and rebuild passes
	- remaining follow-ups
- If the session included repo tooling or customization changes, document those too when relevant.

## Suggested Output Structure

1. Date and scope
2. Executive summary
3. Chronological session log
4. File and folder moves
5. Inventory and gallery refreshes
6. Cloudinary link coverage
7. Duplicate handling
8. Current totals
9. Remaining follow-ups

## Style

- This should read like a full day-of-work record, not a brief recap.
- Use bullets or a compact table where helpful.
- Keep the wording practical, factual, and easy to scan.
- Avoid guessing or inventing details.

## Output

Return the finished report in markdown only unless the user explicitly asks you to write it to a file.
