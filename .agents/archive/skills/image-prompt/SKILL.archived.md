<!-- GENERATED-ARCHIVE: Do not use as active instructions.
status: archived
superseded_by: null
archive_reason: Historical implementation retained for reference
-->---
name: image-prompt
description: >
  Generate textbook-ready image prompts for a BITM330 chapter. Produces in-text figure
  placements, captions, visible Gemini prompt blocks, a Figures Index, and a chapter-level
  CSV image tracker. Use when: writing or rewriting a chapter and figures are needed for
  every subsection; producing a batch of Gemini image prompts; building an image tracker
  CSV for production; generating a single ready-to-paste image instruction block from a
  section excerpt or direct art-direction notes. For the default minimalist vector
  silhouette style, see the support file `style-minimalist-vector.md` in this folder.
argument-hint: Chapter number and either a section excerpt (section mode) or direct art-direction notes (instruction mode); say "full chapter" to generate prompts for every subsection.
---

# Image Prompt Skill

Generate professional textbook image prompts. Each figure gets an in-text placement, a caption, a visible Gemini prompt block, and an entry in a chapter-level CSV tracker.

For the default visual style (deep-blue monochrome silhouettes with negative-space detail and warm-gold accents), see the support file [`style-minimalist-vector.md`](style-minimalist-vector.md). Apply that style by default unless the user overrides it.

---

## When To Use

- Writing or rewriting a chapter and every subsection needs a figure.
- Generating a batch of Gemini image prompts for a chapter.
- Building an image tracker CSV for production workflows.
- Producing a single ready-to-paste image block from a section excerpt or direct art-direction notes.

---

## Input Modes

This skill supports two explicit input modes:

- **Section mode** — the user provides a section, subsection, paragraph, excerpt, or concept description. Extract the core idea and turn it into one or more image instructions.
- **Instruction mode** — the user provides direct art direction, composition notes, or generation constraints. Follow them directly while filling in the production-ready fields.

If both are provided, prioritize explicit user instructions over inferred section details.

---

## Figure Naming Convention

```text
figure-<chapter>.<figure_number>-<slug>.png
```

- `<chapter>` — chapter number (e.g., `2`, `3`, `10`)
- `<figure_number>` — sequential figure number within the chapter, starting at `0` for the chapter overview
- `<slug>` — short, hyphenated descriptor (e.g., `what-is-data`, `dikw-pyramid`, `erd-overview`)

Examples:

- `figure-3.0-overview.png`
- `figure-3.1-relational-model.png`
- `figure-3.12-normalization-steps.png`

Use `0b`, `0c` for additional intro-level figures (e.g., objectives roadmap).

For non-chapter requests, use a generic but descriptive filename such as `sql-aggregation-pipeline.png`.

---

## In-Text Figure Placement

Place each figure using this exact Markdown pattern:

```markdown
![Figure X.Y — Caption text here](images/<Chapter-Folder>/figure-X.Y-slug.png)
*Figure X.Y — Caption text here*
```

Rules:

- Alt text matches the caption exactly.
- Path is relative from the chapter Markdown file.
- Folder name under `images/` matches the chapter title with spaces URL-encoded (`%20`).
- Always use `.png` extension.
- Caption line immediately follows the image line, wrapped in `*...*` (italics).

---

## Gemini Prompt Block

Immediately after the caption, add the visible prompt block:

```markdown
🎨 **Image Generation Prompt**

**Filename**: `figure-X.Y-slug.png`
**Title**: "Short figure title here"
**Caption**: "Figure X.Y — Caption text here"
**Gemini Prompt**: "Create a professional, clean educational illustration for a college textbook... [full prompt]"
```

### Title and Caption Rules

- `Title` is short, crisp, and editorial. It works as a figure label or production reference.
- `Caption` is fuller and textbook-ready. It explains what the figure shows in publication language.
- Do not make title and caption identical.
- The filename, title, caption, and prompt must all describe the same concept.

### Prompt Writing Rules

Every Gemini prompt must follow these conventions:

1. **Opening directive** — start with `"Create a professional, clean educational [illustration/diagram/infographic] for a college textbook"`.
2. **Visual elements** — describe specific icons, layout, arrangement, and spatial composition.
3. **Style** — apply the default minimalist vector silhouette style from [`style-minimalist-vector.md`](style-minimalist-vector.md) unless the user overrides it.
4. **Color palette** — use the deep-blue monochrome base with sparse warm-gold accent from the style file unless the chapter defines an override (some chapters use the broader blue/gold/white palette with modern flat design).
5. **Text constraint** — end with `"No text labels on the image."` or `"Minimal text labels."` so the caption and body text carry the meaning.
6. **Context** — include enough conceptual detail that the generated image is educationally accurate without the reader needing surrounding text.

### Prompt Template (Generic)

```text
"Create a professional, clean educational [illustration/diagram/infographic] for a college textbook showing [MAIN CONCEPT]. [DESCRIBE VISUAL LAYOUT: arrangement, icons, layers, connections]. [DESCRIBE KEY ELEMENTS with specifics]. [STYLE BLOCK — use the default minimalist vector style or a chapter override]. No text labels on the image."
```

---

## Section Mode Workflow

When the user provides a section or excerpt:

1. Identify the primary concept, process, comparison, relationship, or system being explained.
2. Ignore incidental details that do not improve the image.
3. Choose the strongest visual metaphor for the section rather than illustrating every sentence literally.
4. Extract only the supporting elements that clarify the concept at textbook scale.
5. Generate one concise title, one publication-ready caption, and one complete Gemini prompt.

Do not paraphrase the section mechanically. Distill it into a strong visual idea.

## Instruction Mode Workflow

When the user provides direct instructions:

1. Preserve explicit requirements for composition, palette, subject matter, perspective, or prohibitions.
2. Fill in any missing filename, title, or caption fields based on the stated concept.
3. Keep the prompt concrete enough to generate the requested image without additional context.
4. If instructions conflict with the default style, follow the user's override.

---

## Mermaid Diagram Companion Prompt

When a subsection includes a Mermaid diagram, also provide a Gemini prompt to generate a static visual version:

```markdown
🎨 **Mermaid → Static Image Prompt**

**Filename**: `figure-X.Y-slug.png`
**Caption**: "Figure X.Y — Caption text here"
**Gemini Prompt**: "Create a professional, clean educational diagram for a college textbook that replicates the following flowchart/ER diagram/hierarchy: [describe the Mermaid diagram structure]. [STYLE BLOCK]. No text labels on the image."
```

---

## Complete Per-Subsection Example

For a subsection titled **"3.2.1 What Is a Relational Database?"**:

```markdown
### 3.2.1 What Is a Relational Database?

[Body text of the subsection...]

![Figure 3.4 — Tables, rows, and columns in a relational database](images/Database%20Foundations/figure-3.4-relational-structure.png)
*Figure 3.4 — Tables, rows, and columns in a relational database*

🎨 **Image Generation Prompt**

**Filename**: `figure-3.4-relational-structure.png`
**Title**: "Relational Structure"
**Caption**: "Figure 3.4 — Tables, rows, and columns in a relational database"
**Gemini Prompt**: "Create a professional, clean educational illustration for a college textbook showing the structure of a relational database. Depict two rectangular tables side by side, each with clearly defined column headers and several rows of abstract data cells. Highlight one row with a warm-gold accent and one column with a deep-blue accent. Draw a connecting line between the tables to suggest a relationship. Use a minimalist vector style with sharp geometric forms, a deep-blue monochrome palette, and a sparse warm-gold accent. Render all elements as solid silhouettes; create internal distinctions only through negative-space cutouts. No gradients, shadows, textures, outlines, or readable text labels."
```

---

## Figures Index Table

At the end of every chapter, include a Markdown table listing all figures:

```markdown
## Figures Index

| Figure | Section | Caption | Filename |
|--------|---------|---------|----------|
| 3.0 | Overview | Chapter overview illustration | `figure-3.0-overview.png` |
| 3.1 | 3.1.1 | What databases look like in everyday life | `figure-3.1-everyday-databases.png` |
| 3.2 | 3.1.2 | Flat files vs. structured databases | `figure-3.2-flat-vs-structured.png` |
```

---

## CSV Image Tracker

For each chapter, generate a companion CSV file that tracks all images for production workflows. Save as `chapter-<N>-images.csv` alongside the chapter Markdown file.

### CSV Columns

| Column | Description |
|--------|-------------|
| `figure` | Figure number (e.g., `3.0`, `3.1`) |
| `section` | Section/subsection ID where the figure appears (e.g., `Overview`, `3.1.1`) |
| `section_title` | Title of the section (e.g., `What Is a Relational Database?`) |
| `caption` | Full caption text |
| `filename` | Image filename (e.g., `figure-3.0-overview.png`) |
| `prompt` | Full Gemini prompt text |
| `status` | Production status: `pending`, `generated`, `reviewed`, `final` |

### CSV Template

```csv
figure,section,section_title,caption,filename,prompt,status
3.0,Overview,Chapter Overview,"Tables, rows, and columns in a relational database",figure-3.0-overview.png,"Create a professional, clean educational illustration for a college textbook showing...",pending
3.1,3.1.1,What Is Data?,"Raw data elements floating in space",figure-3.1-what-is-data.png,"Create a professional, clean educational illustration...",pending
```

### CSV Generation Instructions

1. Extract every figure from the chapter in order.
2. Populate all columns — do not leave `prompt` empty.
3. Set all `status` values to `pending` on initial generation.
4. Quote any field that contains commas (especially `caption` and `prompt`).
5. Save with UTF-8 encoding.

---

## Quality Checks

- Filename is specific enough for a figure inventory.
- Title is short and distinct from the caption.
- Caption is publication-ready.
- Prompt matches the caption and would produce a legible scaled-down figure.
- Internal details rely on negative space rather than drawn strokes (default style).
- Composition is meaningfully distinct from nearby figures in the same chapter.

---

## Checklist: Image Prompts for a Chapter Rewrite

- [ ] Every subsection (including the chapter overview and objectives) has at least one figure.
- [ ] All figures follow the naming convention: `figure-<chapter>.<n>-<slug>.png`
- [ ] Each figure has: (1) in-text image placement, (2) italic caption, (3) Gemini prompt block.
- [ ] Each Gemini prompt starts with the professional textbook directive.
- [ ] Each Gemini prompt specifies the agreed palette and style (default: minimalist vector).
- [ ] Each Gemini prompt includes `**Filename**`, `**Title**`, and `**Caption**` fields.
- [ ] Mermaid diagrams also have a companion static-image Gemini prompt.
- [ ] A Figures Index table exists at the end of the chapter.
- [ ] A companion CSV (`chapter-<N>-images.csv`) is generated with all figure data.
- [ ] Figure numbers are sequential and chapter-scoped.
- [ ] No duplicate figure numbers within a chapter.
