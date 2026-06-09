---
name: figure-suggestion
description: >
  Stage 1 of the BITM330 image pipeline. Insert figure suggestions into a chapter segment
  (main, lets-build, reflection, terms, rat, lab) using a canonical `<!-- FIGURE SUGGESTION -->`
  HTML comment followed by a fenced code block containing a short description and optional
  caption hint. Use when proposing visuals for a section, marking every sub-section that
  should have a figure, or batch-planning a chapter's figures into an image-ideas file.
  Aims for at least one figure per sub-section.
argument-hint: File path and optional section heading, or `chNN` for a chapter-wide pass (e.g., "ch04/main/...md @ Step 3" or "ch04 chapter-wide").
---

# BITM330 Figure Suggestion

**Pipeline stage 1 of 3:** `figure-suggestion` → `image-placement` → `image-link-optimizer`.

Mark where a chapter needs visuals, in a consistent, easy-to-find format. This skill writes **suggestions only** — short descriptions and caption hints. It does not pick real image files, write prompts, generate images, or upload anything. Stage 2 (`image-placement`) consumes these suggestions; stage 3 (`image-link-optimizer`) optimizes and uploads the final files.

This skill is **content-agnostic**: it works on the main chapter file or any companion segment (Let's Build, Reflection, Terms, RAT, Lab).

---

## Does / Does NOT

This skill **does**:

- insert `<!-- FIGURE SUGGESTION -->` comment + fenced code block pairs under the paragraphs that need visuals;
- aim for at least one figure suggestion per sub-section;
- optionally write a chapter-wide image-ideas file for batch planning.

This skill **does NOT**:

- pick or insert real image files or links → `image-placement`;
- write Gemini/Midjourney prompts or filenames in the chapter body → `image-placement`;
- generate, optimize, upload, or rewrite image URLs → `image-link-optimizer`;
- edit `.images/book-media.md` → owned by `image-link-optimizer`.

---

## Coverage — aim for one figure per sub-section

The strong default is **every sub-section gets at least one figure suggestion**. A good textbook gives the reader a visual anchor on almost every screen.

Only skip a sub-section when a visual genuinely adds nothing — for example a short transition, a pure list of definitions already covered by a Terms table, or a sub-section that is itself a figure caption. When you skip, it should be the rare exception, not the rule.

When a sub-section could support more than one distinct visual (for example a process diagram **and** a comparison table), suggest each as its own block. Avoid near-duplicates, decorative stock-photo ideas, and filler.

---

## Canonical Form

Use an `<!-- FIGURE SUGGESTION -->` HTML comment followed immediately by a fenced code block.
The comment marks the suggestion for pipeline scanners; the code block holds the suggestion
text without appearing in any rendered output (HTML, DOCX, TOC). Stage 2 scans for this pattern.

```markdown
<!-- FIGURE SUGGESTION -->
```
A side-by-side comparison: on the left, one wide spreadsheet with mixed customer and
order columns; on the right, two related tables (CUSTOMER and ORDER) connected by a
foreign key. Highlight the duplicated customer name in the spreadsheet in red.
Caption hint: One subject per table reduces duplication.
```
```

Rules:

- The comment is `<!-- FIGURE SUGGESTION -->` exactly (case-sensitive).
- The fenced code block follows on the next line — no blank line between comment and code fence.
- Code block uses triple backticks with no language tag.
- One short paragraph inside the code block describing **what** the figure shows and **why** it helps the reader.
- Optionally end with a single line prefixed `Caption hint: …`.
- No image URL, no alt text, no file path, no filename, no Gemini prompt. Those belong to stage 2 and stage 3.

### Deprecated forms (recognize, do not produce)

Two older forms still appear in some chapters. Stage 2 recognizes them, but new work must use the canonical form above.

**H4 heading** (deprecated):
```markdown
#### 🎨 Figure Suggestion
```
**Legacy italic line** (deprecated):
```markdown
*Figure suggestion: A diagram showing how customer, order, and payment tables connect.*
```

If you encounter a deprecated form while editing a section, upgrade it to the canonical `<!-- FIGURE SUGGESTION -->` + code block pattern.

---

## Placement

- Place the block **directly under the paragraph** where the visual would appear, not at the end of the section.
- If the user names a specific section heading, place it after the first natural paragraph break in that section.
- Never replace existing text.
- Never insert into a code block, table, or callout.

---

## What Counts as a Good Suggestion

Good:

- *A flowchart showing how a SELECT query is parsed, optimized, and executed.*
- *A screenshot of the Access Relationships window with one-to-many lines between STUDENT and ENROLLMENT.*
- *A two-column table comparing OLTP and OLAP across purpose, query style, and refresh cadence.*

Avoid:

- decorative stock-photo ideas;
- "an image of a database" (too vague);
- near-duplicate ideas for the same spot;
- repeating what the prose already says without adding visual value.

---

## Modes

### Single-section mode (default)

The user names a file and (optionally) a section. Add one or more suggestion blocks at the right paragraph breaks and report what you added.

### Chapter-wide mode

The user asks to plan figures for a whole chapter (for example, `ch04 chapter-wide`). Walk every sub-section and add a `<!-- FIGURE SUGGESTION -->` + code block wherever one is missing, following the coverage rule above.

When chapter-wide mode is requested **and** the user wants a planning file, also write an image-ideas file so production has one place to scan:

```text
.images/<Chapter Image Folder>/chNN-image-ideas-YYYY-MM-DD.md
```

The image-ideas file lists, per sub-section: the section heading, the figure description, and the caption hint. Keep it text-only — no real filenames, prompts, or URLs. Resolve `<Chapter Image Folder>` by fuzzy match to the root `.images/(Ch|ch)0?NN…` subfolder; ask on zero or multiple matches.

---

## Workflow

1. **Locate the target.** Use the file/section the user named. For `chNN` with no segment, default to the latest `chNN-main-YYYY-MM-DD.md`. Ask if ambiguous.
2. **Walk the sub-sections.** For each one, check for an existing figure or suggestion. Add a block wherever one is missing, per the coverage rule.
3. **Write blocks** at the right paragraph breaks. Optional caption hint per block.
4. **Chapter-wide + planning file:** also write `chNN-image-ideas-YYYY-MM-DD.md` if requested.
5. **Report:** file path, sub-sections covered, blocks added, sub-sections intentionally skipped (with reason), and the image-ideas file path if written.

---

## Output

Minimal edits only. No real image links. No tracker updates. The only file this skill may create is the optional `chNN-image-ideas-YYYY-MM-DD.md` planning file in chapter-wide mode.

Hand off to `image-placement` to turn these suggestions into real figures.
