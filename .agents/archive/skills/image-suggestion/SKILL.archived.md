<!-- GENERATED-ARCHIVE: Do not use as active instructions.
status: archived
superseded_by: null
archive_reason: Historical implementation retained for reference
-->---
name: image-suggestion
description: >
  Add image suggestion blocks to a BITM330 chapter main file and create the companion .images
  image-ideas file. Use when: adding chapter image suggestions; planning textbook figures or tables;
  inserting image suggestion blocks under subsections; exporting chapter image and table ideas to a .images file.
argument-hint: Chapter number, chapter folder, or main file path (for example, "ch05" or "chapter-drafts/ch05-sql/main/ch05-main-2026-05-19.md")
---

# BITM330 Image Suggestion

**Book:** *Using Data to Drive Business Performance: Databases and Management Information Systems*

This skill adds image, figure, diagram, or table suggestions to one chapter at a time. It updates the chapter's main Markdown file and creates the companion `.images` image-ideas file. It does not generate final image prompts or create finished visuals.

## Goal

Produce useful visual planning notes that help a textbook reader understand the chapter more clearly.

By the end of the task, you should have:
- image suggestion blocks under every substantive subsection in the active chapter main file
- a chapter `.images` file that lists the visual ideas as a simple numbered list
- a short completion summary for the user

---

## Scope

Use this skill for the **main chapter file only**.

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

---

## Step 1 - Locate the Right Main File

1. Work in the relevant chapter folder under `BITM330-Book-draft/chapter-drafts/`.
2. Open the chapter's `main/` folder.
3. Prefer the most recent dated file that matches patterns such as:

```text
chNN-main.md
chNN-main-YYYY-MM-DD.md
chNN-main-edited-YYYY-MM-DD.md
chNN-main-rewritten-YYYY-MM-DD.md
```

4. Use the date in the filename to choose the latest version when dates are present.
5. Use file modified time only if the filenames are unclear or missing dates.
6. Do not use files inside `.images`.
7. Do not switch to companion files unless the user explicitly asks.

If multiple candidate main files still look equally current, stop and ask the user which file should be treated as authoritative.

---

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

---

## Step 3 - Insert the In-Chapter Block

Under each qualifying subsection, insert this exact heading and fenced block:

~~~markdown
**🎨 Image Suggestion**

```text
1. A detailed visual idea that captures and complements the subsection above.
2. A second optional idea, only if it genuinely adds value and is not redundant.
```
~~~

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

---

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

---

## Step 5 - Create the Companion `.images` File

After the chapter file is updated, create or update the chapter's `.images` folder output for this run.

Rules:
1. Place the file inside the chapter's `.images/` folder.
2. If the `.images/` folder does not exist, create it.
3. Use this filename pattern:

```text
chNN-image-ideas-YYYY-MM-DD.md
```

4. If that exact filename already exists, create:

```text
chNN-image-ideas-YYYY-MM-DD-v2.md
```

5. The `.images` file should reflect the complete set of active visual ideas in the main chapter file after your edits for this task.
6. If a subsection has two ideas, include both as separate numbered items.
7. Number the ideas sequentially.

---

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

---

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

---

## Step 8 - Final Checks

Before responding to the user, confirm all of the following:
1. Every substantive `###`, `####`, and `#####` subsection has at least one image suggestion block or an acceptable existing block.
2. Any skipped headings match the allowed skip list.
3. Existing images, captions, comments, and placeholders were preserved.
4. The `.images` file includes all active visual ideas from the completed chapter file.
5. The `.images` file numbering is sequential.
6. The output filename follows the date pattern or the `-v2` fallback.

---

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