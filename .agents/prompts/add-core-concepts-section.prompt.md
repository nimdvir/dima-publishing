---
name: "Add Core Concepts Section"
description: "Add or repair a BITM330 chapter Core Concepts section with a proper heading, optimized image reference, meaningful alt text, and italic caption. Use when a chapter has a blank section heading, missing Core Concepts section, or local/raw image path that should be converted to a production-ready figure reference."
argument-hint: "Chapter main file path, optional image path or Cloudinary URL, optional insertion location"
agent: "agent"
---

Add a **Core Concepts** section to the target BITM330 chapter main file, or repair the existing placeholder if one is already present.

Use the active editor file, current selection, or the chapter path provided by the user. If the user selected a blank heading such as `##`, replace that heading with the Core Concepts section rather than adding a duplicate elsewhere.

## Requirements

1. Use the heading exactly:

   ```markdown
   ## Core Concepts
   ```

2. Add a chapter-appropriate image immediately below the heading.

   Prefer an existing optimized Cloudinary URL if the user provides one or if one is already documented in `.images/book-media.md`.

   If the image is still a local file path or raw Windows path, do **not** guess or silently upload. Flag that `image-link-optimizer` should process it first, unless the user explicitly asks you to run that skill.

3. Use Markdown image syntax for normal figures:

   ```markdown
   ![Meaningful alt text](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,w_1200/Database-book-BITM330/<chapter-folder>/<public-id>)

   *A short italic caption explaining why the visual matters in the chapter.*
   ```

4. Preserve existing chapter style:

   - meaningful alt text that describes what the image shows;
   - one italic caption line below the image;
   - no decorative filler text;
   - no unrelated prose edits;
   - no new dated chapter file unless the user asked for a full chapter-editor pass.

5. Add only concise opening prose if the section would otherwise be empty. Keep it student-friendly and aligned with the book arc:

   ```text
   Data -> Tables -> Relationships -> Queries -> Analytics -> Decisions
   ```

6. If the prompt cannot identify a suitable optimized image URL, ask the user for one or recommend running `image-link-optimizer` on the chapter.

## Output

Edit the chapter file directly only when the user clearly asked for an edit. Then report:

- where the Core Concepts section was inserted or repaired;
- which image URL was used;
- whether image optimization or ledger backfill is still needed.
