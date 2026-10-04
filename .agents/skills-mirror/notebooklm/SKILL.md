---
name: notebooklm
description: >
  Generate NotebookLM prompts for producing chapter slide decks and master infographics from
  a BITM330 chapter source. Use when: drafting a slide deck for a chapter; producing a
  master infographic that summarizes a chapter; preparing teaching visuals with consistent
  textbook style. For chapter preview videos, use the sibling `notebooklm-video` skill.
argument-hint: Chapter number and a brief description of the deliverable (slides, infographics, or both); the user uploads the chapter file directly into NotebookLM.
---

# NotebookLM Slides and Infographics Skill

Produce two kinds of NotebookLM-ready prompts: a chapter slide deck and a chapter master infographic. Both rely only on the uploaded chapter source — never invent unsupported examples, tools, companies, or branded interfaces.

For chapter preview videos, use the sibling [`notebooklm-video`](../notebooklm-video/SKILL.md) skill.

## When To Use

- Drafting a slide deck for a chapter from the chapter Markdown.
- Producing a master summary infographic for a chapter.
- Standardizing visual style across chapter decks and infographics.

## Inputs

- The chapter Markdown file (uploaded into NotebookLM by the user).
- Chapter number and chapter title.

## Shared Style Requirements

Apply to every slide and every infographic:

- Modern undergraduate business information systems textbook style.
- Clean, professional, minimal, student-friendly, academic-business tone.
- Color palette: navy, blue, teal, slate gray, and light gray.
  - Green for correct outcomes or best practices.
  - Amber for warnings or common mistakes.
  - Red only for errors or risks.
- High contrast and readable text.
- Consistent layout across slides.

### Visual Prohibitions

- No logos.
- No company names.
- No fake readable interface text.
- No NotebookLM, Gemini, or any branded interface, even if the chapter discusses them.
- No generic stock-photo filler.
- Visuals must clarify concepts, not decorate or promote.

---

## Output 1 — Slide Deck Prompt

Use this when the goal is a complete teaching-ready visual deck.

### Goal

Turn the chapter into a teaching-ready visual presentation that helps students understand the chapter structure, key concepts, and flow of ideas.

### Slide Coverage

Create:

1. One title/overview slide for the chapter.
2. One slide for each major section of the chapter.
3. One summary/recap slide at the end.

Target at least 10 slides. Each slide must include a visual.

### Per-Section Slide Contents

For each section slide, include:

- Section title.
- One-sentence explanation of the section's main idea.
- 3–5 concise teaching bullets.
- One recommended image, illustration, diagram, or visual metaphor.
- A clear image caption that explains what the visual should show and why it matters.
- Speaker notes explaining how to teach the slide (2–3 conversational sentences).

### Image Requirements

- Every major section gets its own visual.
- Use visuals to explain the concept, not decorate the slide.
- Prefer diagrams, conceptual illustrations, data-flow visuals, comparison graphics, dashboards, annotated examples, and concept maps.
- Avoid generic stock photos unless they directly support the concept.
- Avoid fake readable text, logos, clutter, and tiny labels.

### Preferred Slide Layout

- Top: section title.
- Left side: key concepts or teaching bullets.
- Right side: image, diagram, or visual metaphor.
- Bottom: short takeaway sentence.

### Overview Slide

- Chapter title.
- Chapter's central learning promise.
- Visual roadmap of the chapter sections.
- One image or diagram previewing the chapter's big idea.
- Caption explaining the overview visual.

### Recap Slide

- Concept map showing how the chapter's major ideas connect.
- 5–7 key takeaways.
- Caption explaining the recap visual.
- Bridge to the next chapter.

### Output Format (Slides)

```markdown
## Slide 1: Chapter Overview
- Slide title:
- Subtitle:
- Main content:
- Visual/image idea:
- Image caption:
- Speaker notes:

---

## Slide 2: [Section Title]
- Slide title:
- One-sentence section summary:
- Key bullets:
- Visual/image idea:
- Image caption:
- Speaker notes:

---

[Repeat per major section]

---

## Final Slide: Chapter Recap
- Slide title:
- Key takeaways:
- Recap visual/image idea:
- Image caption:
- Speaker notes:
```

### Image Prompt Prefix (Slides)

When the deck also needs ready-to-paste image-generation prompts, prefix every image prompt with:

```text
A flat vector illustration in a professional blue and gold color palette on a white background. Clean, academic textbook style, highly legible, no text, no decorative clutter.
```

Follow with a specific description of the visual layout needed for that slide (e.g., a four-step staircase for a hierarchy, a five-node hub for a component framework).

---

## Output 2 — Master Chapter Infographic Prompt

Use this when the goal is a single summary infographic that captures the whole chapter at a glance.

### Goal

One visually rich infographic that summarizes the chapter's central framework or data-to-decisions story.

### Composition Rules

- Left-to-right or radial layout that matches the chapter's actual structure.
- Inputs on the left, system or framework in the center, outputs or outcomes on the right (when the chapter follows a transformation story).
- Include a feedback loop when the chapter discusses iteration, feedback, or continuous improvement.
- Use icons for inputs (data, files, clocks, numbers), nodes for system components, and outcome shapes (charts, decision figures) for outputs.

### Image Prompt Template (Infographic)

```text
A clean, academic vector infographic in a professional blue and gold color palette on a white background. The graphic visualizes "[CHAPTER CENTRAL IDEA]".

Layout flows [left to right / radially]:
- Left (Inputs): [icons representing the chapter's input concepts]
- Center (The System / Framework): [the chapter's main framework or model, with named nodes if mentioned in the chapter]
- Right (Outputs / Outcomes): [the chapter's outcomes — decisions, performance, insight, etc.]

Include a feedback loop arrow returning from the outcome back to the inputs when the chapter supports it.

Flat vector style suitable for a university textbook. Clean layout, no decorative clutter, highly legible. No logos, company names, or fake readable text.
```

---

## Workflow

1. Confirm the chapter source is uploaded into NotebookLM.
2. Identify whether the user wants slides, an infographic, or both.
3. Pull section titles and central framework from the chapter (do not invent).
4. Build the prompt using the structure above.
5. Output the prompt as a copy-paste-ready block.

## Quality Checks

- Every slide has a section-matched visual concept (not just decoration).
- Color palette and style language are consistent across all output.
- No logos, company names, fake interfaces, or branded products in any visual.
- Concept maps and frameworks come from the chapter content, not external sources.
- Speaker notes are conversational and tied to chapter content.
- Image prompts use the standard prefix and forbid readable text in the image.
