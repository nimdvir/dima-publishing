# BITM330 Image Suggestion Reference

This document mirrors the canonical workspace skill at [../../.github/skills/image-suggestion/SKILL.md](../../.github/skills/image-suggestion/SKILL.md). Update the skill first, then sync this reference copy.

## Purpose

Add image, figure, diagram, or table suggestions to one BITM330 chapter at a time. Update the chapter's main Markdown file and create the companion `.images` image-ideas file. Do not generate final image prompts or create finished visuals.

## Goal

Produce useful visual planning notes that help a textbook reader understand the chapter more clearly.

By the end of the task, you should have:

- image suggestion blocks under every substantive subsection in the active chapter main file
- a chapter `.images` file that lists the visual ideas as a simple numbered list
- a short completion summary for the user

## Scope

Use this workflow for the main chapter file only.

Do not use it for:

- Let's Build files
- Terms files
- Reflection files
- RAT or quiz files
- Lab files
- review files
- scratch files
- archived drafts

If the user gives an explicit main file path, use it. Otherwise, locate the chapter and choose the current main file as described below.

## Step 1 - Locate the Right Main File

- Work in the relevant chapter folder under `BITM330-Book-draft/chapter-drafts/`.
- Open the chapter's `main/` folder.
- Prefer the most recent dated file that matches patterns such as:

```text
chNN-main.md
chNN-main-YYYY-MM-DD.md
chNN-main-edited-YYYY-MM-DD.md
chNN-main-rewritten-YYYY-MM-DD.md
```

- Use the date in the filename to choose the latest version when dates are present.
- Use file modified time only if the filenames are unclear or missing dates.
- Do not use files inside `.images`.
- Do not switch to companion files unless the user explicitly asks.

If multiple candidate main files still look equally current, stop and ask the user which file should be treated as authoritative.

## Step 2 - Decide Which Headings Need Image Suggestions

Treat the following as subsection targets:

- `###`
- `####`
- `#####`

Every substantive subsection needs at least one visual idea.

For very short, administrative, or transitional subsections, still add one light but relevant visual idea. Do not skip them just because they are short.

Skip only:

- References
- Table of Figures
- raw metadata
- empty headings
- image prompt archives
- existing image index sections

If a subsection already has an active image suggestion block that satisfies the requirement, leave it in place and do not add a duplicate block.

## Step 3 - Insert the In-Chapter Block

Under each qualifying subsection, insert this exact heading and fenced block:

````markdown
**🎨 Image Suggestion**

```text
1. A detailed visual idea that captures and complements the subsection above.
2. A second optional idea, only if it genuinely adds value and is not redundant.
```
````

Rules:

- The heading must be exactly `**🎨 Image Suggestion**`.
- The ideas must be inside a fenced `text` code block.
- Include at least one idea per subsection.
- Include a second idea only when it adds distinct value.
- A suggestion may recommend a table when a table teaches the subsection more clearly than an image or diagram.
- Keep the block attached to the subsection it belongs to.
- Do not label the ideas as prompts.
- Do not add style instructions such as color palette, aspect ratio, rendering style, or layout specs.
- Do not delete or replace existing images, captions, comments, figure placeholders, or author notes.
- Only add new image-suggestion blocks where needed.

## Step 4 - Write Strong Visual Ideas

Each idea should be:

- specific
- visually useful
- directly connected to the subsection above it
- helpful for student understanding
- distinct from nearby ideas
- suitable for a textbook figure, diagram, table, screenshot, workflow, or visual explanation

Strong ideas often include:

- process diagrams
- before-and-after comparisons
- workflow maps
- ERD-style diagrams
- comparison tables
- summary tables
- dashboard mockups
- database schema illustrations
- decision trees
- annotated screenshots
- table-to-diagram transformations
- realistic business scenarios

Avoid vague ideas such as:

- "An image of data."
- "A businessperson looking at a chart."
- "A diagram of this concept."
- "A database illustration."

When choosing between two possible ideas, prefer the one that teaches the concept more clearly.

If a table would make categories, comparisons, definitions, or step differences clearer than an image, suggest a table instead of forcing a graphic.

## Step 5 - Create the Companion `.images` File

After the chapter file is updated, create or update the chapter's `.images` folder output for this run.

Rules:

- Place the file inside the chapter's `.images/` folder.
- If the `.images/` folder does not exist, create it.
- Use this filename pattern:

```text
chNN-image-ideas-YYYY-MM-DD.md
```

- If that exact filename already exists, create:

```text
chNN-image-ideas-YYYY-MM-DD-v2.md
```

- The `.images` file should reflect the complete set of active visual ideas in the main chapter file after your edits for this task.
- If a subsection has two ideas, include both as separate numbered items.
- Number the ideas sequentially.

## Step 6 - Format the `.images` File

The `.images` file should contain only:

- one H1 title
- one simple numbered list of visual ideas

Do not include:

- section titles
- subsection locations
- source file notes
- metadata
- workflow commentary

Use this format:

```markdown
# Chapter NN Visual Ideas - YYYY-MM-DD

1. A detailed visual idea copied from the chapter.

2. A detailed visual idea or table idea copied from the chapter.

3. A detailed visual idea copied from the chapter.
```

## Step 7 - Editing Rules

Always preserve:

- original chapter content
- existing images
- existing figure captions
- existing comments
- existing author instructions unless the user asked to resolve them

Do not:

- rewrite the chapter unless the user asked for that separately
- replace existing image ideas unless the user asked for replacement
- turn image ideas into full image-generation prompts
- add decorative ideas that do not help explain the section

## Step 8 - Final Checks

Before responding to the user, confirm all of the following:

- Every substantive `###`, `####`, and `#####` subsection has at least one image suggestion block or an acceptable existing block.
- Any skipped headings match the allowed skip list.
- Existing images, captions, comments, and placeholders were preserved.
- The `.images` file includes all active visual ideas from the completed chapter file.
- The `.images` file numbering is sequential.
- The output filename follows the date pattern or the `-v2` fallback.

## Final Response Template

After completing the task, respond briefly in this format:

```markdown
Done - I reviewed the latest Chapter NN main file and added image suggestion blocks under every subsection that needed one.

- Source file: `filename.md`
- Image suggestion blocks added: X
- Total visual ideas copied to `.images`: Y
- New image ideas file: `.images/chNN-image-ideas-YYYY-MM-DD.md`
- Existing images and captions were preserved; I only added new suggestions.
```

If you had to use a `-v2` filename or resolve an ambiguity about the source file, mention that in one extra line.
