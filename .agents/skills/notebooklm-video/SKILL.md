---
name: notebooklm-video
description: >
  Generate NotebookLM prompts for producing a short chapter preview video for a BITM330
  chapter. Use when: drafting a 2–3 minute introductory video that orients students before
  they read the chapter; producing a narration script, storyboard, and visual captions for
  a chapter preview. For chapter slides and infographics, use the sibling `notebooklm` skill.
argument-hint: Chapter number and chapter title; the user uploads the chapter source into NotebookLM.
---

# NotebookLM Chapter Preview Video Skill

Produce a NotebookLM-ready prompt for a polished 2–3 minute chapter preview video. The video appears at the very start of the chapter, before the written introduction, and orients students for what they are about to read.

For chapter slides and infographics, use the sibling [`notebooklm`](../notebooklm/SKILL.md) skill.

## When To Use

- Drafting a chapter preview video script + storyboard from a chapter source.
- Standardizing tone and visual style across chapter previews.
- Preparing a narration script that is ready to record.

## Inputs

- The chapter Markdown file (uploaded into NotebookLM by the user).
- Chapter number and chapter title.

## Goal

A polished 2–3 minute overview based only on the uploaded chapter that answers:

1. What is this chapter about?
2. Why does it matter?
3. What problem does it help solve?
4. How does it connect to the rest of the textbook?
5. What should students focus on while reading?

Use only the uploaded chapter as the source. Do not invent unsupported examples, companies, tools, or scenarios.

## Audience and Tone

Undergraduate business students studying databases, data, analytics, business information systems, and MIS.

Narration should sound like a professor introducing the chapter at the beginning of class:

- Clear, encouraging, practical.
- Slightly energetic.
- Not overly formal, not childish, not marketing-style.

## Structure

Use this sequence:

1. **Opening hook (15–20 sec)** — a concrete question or problem tied to the chapter. No generic cliches.
2. **Big idea (25–35 sec)** — what students will understand differently after reading.
3. **Conceptual roadmap (60–90 sec)** — preview the main sections, why each matters, and how they connect.
4. **Applied relevance (30–45 sec)** — practical business, organizational, technical, or decision-making value.
5. **Bridge forward (15–20 sec)** — how this chapter leads into what comes next.

## Content Guidelines

The video should:

- Introduce the chapter's central topic and big idea.
- Preview the major sections.
- Explain why the topic matters for business, technology, data, systems, or decision-making.
- Highlight major frameworks, models, processes, distinctions, or conceptual shifts from the chapter.
- Show how the chapter fits into the textbook and prepares students for later work.

The video should not:

- Turn into a full lesson or detailed summary.
- Add unsupported examples, companies, tools, or scenarios.
- Include step-by-step instruction unless the chapter clearly makes it central.

## Visual Style

Clean, modern undergraduate business textbook style:

- Minimal and professional, academic-business tone, student-friendly.
- Navy, blue, teal, slate gray, and light gray palette.
- Green for correct outcomes or best practices.
- Amber for warnings or common mistakes.
- Red only for errors or risks.
- High contrast and readable visuals.

### Visual Prohibitions

- No logos.
- No company names.
- No fake readable interface text.
- No NotebookLM, Gemini, or any branded interface, even if the chapter discusses them.
- No generic stock-photo filler.
- Visuals must clarify ideas, not decorate or promote.

## Suggested Visual Sequence

Build visuals from the chapter's actual structure. Common types:

1. Chapter roadmap showing the major sections.
2. Conceptual diagram showing the chapter's central idea.
3. Process or flow diagram for sequences.
4. Comparison graphic for contrasted concepts.
5. Framework diagram for a model.
6. System or data-flow visual for technology, data, or organizational systems.
7. Warning or common-mistake visual for risks or misconceptions.
8. Final recap map showing how this chapter connects to the next.

## Output Format

Produce the following sections, in order:

### Video Title

A concise title for the introductory video.

### Video Description

A 2–3 sentence description explaining what the video covers and where it belongs in the chapter.

### Narration Script

A complete 2–3 minute narration script, polished and ready to record.

### Scene-by-Scene Storyboard

A table with these columns:

| Scene | Approx. Time | Narration Focus | Visual Description | On-Screen Text |
| ----- | -----------: | --------------- | ------------------ | -------------- |

Include 6–9 scenes.

### Visual Captions

For each major visual, provide a short caption that explains what the visual shows and why it matters.

### Student Takeaway

One concise takeaway sentence students should remember before reading the chapter.

## Quality Checks

- Narration runs 2–3 minutes when spoken at a natural pace.
- Every visual is tied to a specific chapter idea, not decoration.
- No logos, company names, fake interfaces, or branded products anywhere.
- Tone is warm, confident, and instructor-like throughout.
- Bridge-forward line points at the next chapter, not a vague future.
