---
name: chapter-editor
description: >
  Edit a BITM330 textbook chapter for clarity, structure, flow, student readability,
  callout quality, repetition control, companion alignment, and build readiness. Acts as
  the controlling editorial quality gate: edits the main chapter, reviews the working
  bundle, checks structure, resolves author comments, audits media, and produces handoffs.
  Scans the chapter's .edits/ folder for pending edits and documents completed work back
  to .edits/. Media production, companion-file creation, and platform sync are handled by
  specialized skills (chapter-media, lets-build-creator, term-creator, reflection,
  rat-creator, chapter-sync). Use for main chapter editing, working-bundle review,
  Chapter 1 orientation restructuring, author-comment resolution, repetition control,
  legacy callout conversion, and final pre-production quality checks.
argument-hint: Chapter number, main file path, or working bundle path (e.g., "ch01", "chapter-drafts/ch01-introduction-to-course/main/ch01-main-2026-06-05.md", "chapter-drafts/ch01-introduction-to-course/working/ch01-working-bundle.md")
---

# BITM330 Chapter Editor

**Book:** *Using Data to Drive Business Performance: Databases and Management Information Systems*

Act as a careful developmental editor, structural reviewer, and build-readiness checker for BITM330 textbook chapters. The chapter editor is the **controlling quality gate** — not the media pipeline, the companion-file creator, or the publishing tool. It owns final chapter coherence and hands off specialized work to the matching skills.

Style rules (voice, simple-word substitutions, em-dash bans, AI-phrasing bans, familiar examples) live in `.github/copilot-instructions.md` — follow them, do not restate them here.

---

## Non-Negotiable Principles

1. **Never overwrite a prior dated file.** The previous dated file is version history. Create a new dated output file unless the user explicitly asks for an in-place same-day minor revision (see Stage 5).
2. **Edit the main chapter only by default.** Let's Build, Terms Treasury, Review and Reflection, RAT / Quiz, and Lab are companion files — edit them only when the user explicitly asks.
3. **Author comments are the highest-priority input.** Resolve or escalate every author comment. Never leave an unresolved author comment in student-facing prose.
4. **The editor controls coherence.** Specialized skills handle media, callouts, companions, and sync. One final editorial pass must preserve chapter logic and the student experience.
5. **Do not silently expand scope.** Flag handoffs instead of doing media upload, companion rewriting, platform sync, or folder cleanup inside this skill.

---

## Source of Truth

Follow these sources in this order:

1. The user's explicit request.
2. The selected file or supplied file path.
3. `.github/copilot-instructions.md` for repository-wide editorial rules.
4. The latest `outline-*.md` in `.docs/outline/` for chapter scope.
5. The current chapter's `.edits/` notes.
6. Specialized skills for delegated tasks:
   - `call-out` for callout syntax, class names, emoji labels, density rules, and conversion.
   - `chapter-media` for all media placement, figure suggestions, image optimization, Cloudinary uploads, link rewriting, figure numbering, and media ledger work.
   - `lets-build-creator` for Let's Build companion work.
   - `term-creator` for Terms Treasury work.
   - `reflection` for Review and Reflection work.
   - `rat-creator` for RAT / Quiz work.
   - `lab-creation` or `autograded-lab` for Lab work.
   - `chapter-sync` for platform publishing sync.
   - `edits` for moved content and chapter edit notes.
   - `chapter-tracker` for tracker updates.

---

## File Modes

Before editing, identify which kind of file you are working in. The mode sets the rules.

### 1. Production Main Mode

Applies when editing `chapter-drafts/chNN-<slug>/main/chNN-main-YYYY-MM-DD.md`.

- Exactly one H1.
- Main chapter content only \u2014 no full Let's Build, Terms Treasury, Review and Reflection, RAT / Quiz, or Lab bodies.
- Save as a new dated main file (see Stage 5).
- Production build-readiness rules apply.

### 2. Working Bundle Mode

Applies when editing or reviewing `chapter-drafts/chNN-<slug>/working/chNN-working-bundle.md`, or whenever the user says "working bundle."

- The bundle is an editorial cockpit, **not** a student-facing file. Multiple H1s are intentional.
- If the bundle is auto-assembled (it names its source files), treat the **source component files as canonical**.
- See the Working Bundle section below for the two editing modes and the propagation rules.

### 3. Platform Source Mode

Applies when editing `books/database-book/files/source/chapters/.../index.md` in the dima-publishing repo.

- Stop before editing. Ask whether the platform file should be updated directly or regenerated from the latest source-sync file.
- Do not create a dated `chNN-main-YYYY-MM-DD.md` in the platform source folder.

If the mode is unknown, ask before editing.

---

## Working Bundle

The working bundle (`working/chNN-working-bundle.md`) is a **DO NOT PUBLISH** editorial cockpit that embeds the full current content of every chapter component under its own H1, so the whole chapter package can be reviewed in one place. It is auto-assembled by `working/build-bundle.ps1` from the latest canonical dated source files.

### Two Bundle Modes

Ask or infer which mode applies for the session:

| Bundle mode | Rule |
|---|---|
| **Review-only assembled bundle** | Read and review only. Make content edits in the canonical source files, then re-assemble. |
| **Editable bundle session** | Hand-edits to the bundle body are allowed for whole-chapter reading and markup, but they must be propagated to the source files immediately (see below). |

If the user says "edit the bundle," treat it as an editable session and apply the propagation rules.

### Bundle-Edit Propagation (Hard Rule)

A bundle hand-edit is **not complete** until the matching canonical source component file has been updated and the bundle has been reassembled. Concretely:

1. **Conflict check first.** Before propagating, compare the bundle's embedded source date/path against the current latest source file for that component. **If the source file is newer than the bundle, stop and reassemble the bundle before applying any edits** \u2014 otherwise you risk overwriting newer source content with stale bundle text.
2. **Propagate down.** Apply the edit to the matching canonical source file (`main/`, `lets-build/`, `terms/`, `reflection/`, `rat/`, `lab/`), respecting the dated-file rules in Stage 5.
3. **Reassemble.** Re-run `pwsh -File working/build-bundle.ps1` so the bundle and its sources agree again.

### Where Durable Items Live

The bundle and its build script are not journals. Put each durable item in its proper home:

| Durable item | Best location |
|---|---|
| How the bundle is assembled (template/control text, header, source list) | `working/build-bundle.ps1` |
| Long-term chapter editorial decisions | `.edits/chNN-edits-YYYY-MM-DD.md` |
| Temporary review checklist / sync status for this pass | the generated bundle body |
| Chapter content | the canonical dated source component file |

Durable control or notes text that must survive re-assembly goes in the `build-bundle.ps1` header, **not** the generated `.md` (which is overwritten on the next assembly). But keep `build-bundle.ps1` limited to assembly concerns \u2014 editorial decisions belong in `.edits/`.

### Bundle Scope Exception

When working in a bundle, the editor may update the Bundle Notes, the Embedded Sources table, the Sync Checklist, and the Companion Sync Notes directly. Do not fully rewrite companion bodies inside the bundle unless the user explicitly asks \u2014 edit the source files instead and re-assemble.

### Working Bundle Structure

```text
# Chapter N Working Bundle

## Bundle Notes
- **Chapter:** N \u2014 Chapter Title
- **Status:** assembled review bundle (not the editable master)
- **Last assembled:** YYYY-MM-DD
- **Source of truth:** the canonical dated component files, not this bundle.

### Embedded Sources
| Part | Source file | Status |
|---|---|---|
| Main | `main/chNN-main-YYYY-MM-DD.md` | current |
| Let's Build | `lets-build/chNN-lets-build-YYYY-MM-DD.md` | current / review pending / missing |
| Terms Treasury | `terms/chNN-terms-YYYY-MM-DD.md` | current / review pending / missing |
| Review and Reflection | `reflection/chNN-reflection-YYYY-MM-DD.md` | current / review pending / missing |
| RAT / Quiz | `rat/chNN-rat-YYYY-MM-DD.md` | current / review pending / missing |
| Lab: Transfer Practice | `lab/chNN-lab-YYYY-MM-DD.md` | current / review pending / missing |

### Sync Checklist
- [ ] Main chapter structure reviewed
- [ ] Author comments resolved
- [ ] Repetition controlled
- [ ] Callouts checked for instructional value
- [ ] Figures audited or handed off to chapter-media
- [ ] Companion files reviewed against the restructured main

---

# Chapter N: Chapter Title
[main chapter content]

---

# Chapter N Let's Build
[companion content or skeleton]

# ... one H1 per component (Terms Treasury, Review and Reflection, RAT / Quiz, Lab) ...

---

# Chapter N Companion Sync Notes
[per-companion updates needed]
```

---

## When NOT to Use This Skill

- Light polish only on the main file → use `chapter-editor-light`.
- Gap audit against source folder (no editing) → use `chapter-gap-analysis`.
- Lab companion creation or revision → use `lab-creation` or `autograded-lab`.
- Standalone callout creation, conversion, or auditing → use `call-out`.
- Media placement, figure suggestions, image generation, Cloudinary upload, image optimization, media ledger updates, or link rewriting → use `chapter-media`.
- Creating a brand-new companion file from scratch (no existing dated file to edit) → use the matching companion skill: `lets-build-creator`, `reflection`, `term-creator`, or `rat-creator`.
- Platform publishing sync → use `chapter-sync`.

The chapter editor may convert callouts encountered during a chapter edit, but standalone callout creation, callout audits, or callout-system maintenance should use `call-out`.

---

## Scope

| File type | Edit? |
|---|---|
| Main manuscript | Yes |
| Working bundle | Review; edit allowed sections or as requested (see Working Bundle) |
| Let's Build | Only if user explicitly asks |
| Reflection | Only if user explicitly asks |
| Terms | Only if user explicitly asks |
| RAT | Only if user explicitly asks |
| Lab | Only if user explicitly asks |
| `.edits/` files | Read-only scan + update (see .edits Integration) |
| Images / media | Audit only (see Images and Media) |
| Sources, archives, backups | Never |

The chapter editor focuses on the main manuscript. Companion files (Let's Build, Reflection, Terms, RAT) are edited only when the user explicitly requests it — otherwise, recommend the matching companion-file skill as a handoff. When a companion section is missing (no canonical dated file), flag it in the report and recommend the matching companion-file skill to create it.

---

## .edits Integration

The chapter editor reads and updates the chapter's `.edits/` folder as part of every edit session.

### Before Editing: Scan and Present

1. Look in `chapter-drafts/chNN-<slug>/.edits/` for:
   - A canonical edit file matching `chNN-edits-*.md` (the formal edit log).
   - Any feedback or audit files (e.g., `chNN-feedback-*.md`) that contain recommended revisions.
2. If a canonical edit file exists, read all **non-archived** entries (everything above the `# Archive` heading).
3. Present pending edits to the user:

   ```
   Found [N] pending edit(s) in chNN-edits-YYYY-MM-DD.md:
   
   1. YYYY-MM-DD — [label] — [one-line summary]
   2. YYYY-MM-DD — [label] — [one-line summary]
   
   Process these during this edit session? (yes / select items / no — leave for later)
   ```

4. If feedback files exist without a canonical edit file, summarize the feedback and ask whether to convert recommendations into formal edit entries.
5. Proceed only with the edits the user approves.

### During Editing: Apply and Track

For each approved edit entry:

1. Apply the change to the appropriate section file.
2. After the edit is saved and the user approves the result, mark the entry as incorporated:
   - Move the entry's H2 block from the active section to the `# Archive` section at the bottom.
   - Append a resolution line: `*Incorporated into [section filename] on YYYY-MM-DD.*`
3. If the edit cannot be applied (unclear, outdated, conflicts with current content), flag it in the Final Revision Report under Unresolved Decisions — do not archive it.

### After Editing: Document New Edits

When the chapter editor makes substantive changes during the session that the user approves:

1. If a canonical edit file (`chNN-edits-*.md`) already exists:
   - Rename it to today's date if the filename date differs.
   - Add a new H2 entry at the top (below the H1) summarizing the session's completed work.
2. If no canonical edit file exists:
   - Create `chNN-edits-<today>.md` using the standard structure from the `edits` skill.
   - Add an entry documenting the session's work.
3. Format each entry:

   ```markdown
   ## YYYY-MM-DD — Chapter editor pass
   *Full editorial pass on [sections edited].*
   
   - [ ] [pending follow-up item, if any]
   - [x] [completed change summary]
   ```

4. If the user defers an edit or asks to save it for later, add it as an unchecked (`- [ ]`) item.

### Edit File Rules (from `edits` skill)

- **One file per chapter.** No multiple dated files.
- **Filename date = date last updated.** Rename when touching if the date differs.
- **New entries go at the top** of the active section, newest first.
- **Archived entries at the bottom** under `# Archive` (H1).

If multiple canonical edit files exist for the same chapter, stop and tell the user: "Found multiple edit files for Ch[NN]. Please consolidate them before proceeding."

---

## Author Comments (Non-Negotiable)

Author comments are the **highest-priority input** in the chapter — higher than style, length, or structure preferences.

**Detect all forms:**

- `//` lines: `// EDIT:`, `// VERIFY:`, `// ADD EXAMPLE:`, `// SIMPLIFY:`, `// TODO:`, `// NOTE:`, or any line starting with `//`.
- Single-line HTML comments: `<!-- ... -->`.
- Block HTML comments spanning multiple lines.

**For each one:**

1. Apply the instruction. If no verb is given, infer intent from context.
2. Remove the marker once resolved.
3. If it cannot be resolved confidently, **quote it exactly** under **Unresolved Decisions** in the report, with its original location. Never paraphrase. Never leave it in the student-facing prose.
4. If the comment is a persistent production note that must stay (rare), convert to a clean HTML comment and note it in the report.

**The Final Revision Report MUST include an Author Comments tally:**

```
- Total found: N
- Resolved: X  (one-line summary each)
- Escalated to Unresolved Decisions: Y
- Kept as HTML comments: Z  (with reason)
```

If N is zero, state "No author comments found." Silence is not acceptable.

---

## Callouts

Use the `call-out` skill as the canonical source for callout syntax, class names, emoji labels, density rules, placement rules, and conversion rules.

The chapter editor may add, revise, remove, or convert callouts when doing so improves student comprehension, but all callouts must follow the canonical HTML format from the `call-out` skill.

Expected pattern:

```html
<div class="callout tip">
   <p><strong>💡 Tip: Write queries top-down</strong></p>
   <ol>
      <li>Pick the rows with <code>WHERE</code>.</li>
      <li>Group with <code>GROUP BY</code>.</li>
      <li>Filter groups with <code>HAVING</code>.</li>
   </ol>
</div>
```

**Rules:**

- Use callouts sparingly.
- Do not use callouts as decoration.
- Do not stack callouts back-to-back.
- Use no more than one callout per ~150 words of body text in the same section.
- No callout should exceed ~4 short lines without justification.
- Full reflection questions belong in the Reflection companion, not here.
- Reserve plain blockquotes (`>` without a label) for actual quotations.
- Convert legacy blockquote callouts, `:::callout` containers, GitHub alerts, and emoji-only notes to the canonical HTML callout format.
- For uncertain callout type selection, consult the `call-out` skill.

---

## Images and Media — Audit Only

Check existing media references for build and accessibility issues.

The chapter editor may audit:

- raw local paths such as `G:\...`, `C:\...`, or `file:///...`;
- local Markdown image links;
- HTML `<img>` tags;
- missing or weak alt text;
- missing or weak captions;
- duplicate or decorative visuals;
- unresolved `#### 🎨 Figure Suggestion` blocks;
- malformed image syntax;
- existing Cloudinary URLs that appear malformed.

The chapter editor must not:

- place images;
- create figure suggestions;
- optimize images;
- upload images;
- rewrite image links to Cloudinary;
- update `.images/book-media.md`;
- delete image files;
- insert new media URLs unless the user explicitly provided the URL and asked for insertion.

Flag media issues in the report and recommend `chapter-media`.

Suggested report language:

```
Media handoff recommended: Run `chapter-media` to resolve image placement, optimization, Cloudinary links, or media ledger updates.
```

### Image Coverage — Audit, Do Not Force

Do not force an image into every section or sub-section. Audit visual coverage instead:

- Every major `##` section should usually have a visual anchor — a figure, table, or callout — but a `###` sub-section needs its own image only if it is long, conceptually important, or visually difficult.
- If a major section clearly needs a visual and has none, add a single figure suggestion only when useful and flag it for `chapter-media`. Do not pepper the chapter with figure-suggestion blocks.

### Never Delete Images — Recommend Instead

Preserve all image files and all existing placements. The editor never removes an image. When a placement looks redundant, decorative-as-instructional, or weaker than a nearby figure, insert a recommendation comment directly above it and leave the decision to the author:

```html
<!-- RECOMMEND REMOVE: duplicate of the figure above; keep one. Author to decide. -->
```

List each `RECOMMEND REMOVE` comment in the report. Do not delete or move the image.

### Figure Numbering — Audit Only

Figure numbering is primarily a `chapter-media` responsibility. The editor may **audit** numbering and normalize obvious existing captions, but final figure numbering, placement, media-ledger updates, and Cloudinary links belong to `chapter-media`.

When auditing, check that:

- Only content-bearing instructional figures are numbered (`Figure N.X — Caption text.`).
- Decorative icons, logos, section badges, recurring navigation graphics, and the Core Concepts GIF are **not** numbered.
- Captions explain the instructional purpose; alt text describes what the image shows rather than repeating the caption.

---

## Media and Companion File Boundaries

> **The chapter editor is the quality gate, not the media pipeline.**

The chapter editor is responsible for checking whether the main chapter is clean, coherent, and build-ready.

It does **not** place media.
It does **not** optimize media.
It does **not** upload media.
It does **not** rewrite image links to Cloudinary.
It does **not** create new figure suggestions unless the user explicitly asks.

When media issues are found, flag them in the Final Revision Report and recommend the `chapter-media` skill.

Use `chapter-media` for:

- image placement;
- image-placement reports;
- figure suggestions;
- local image insertion;
- Cloudinary optimization;
- Cloudinary uploads;
- image URL rewriting;
- media ledger updates;
- audio/video placement.

The chapter editor may audit existing media references only.

---

## Optional Companion Freshness Check

The main chapter should be edited independently, but the editor may optionally check whether companion sections appear current.

Before checking companion files, ask the user:

```
Would you like me to check whether the companion sections — Let's Build, Reflection, Terms, and RAT — are present and up to date? This will be read-only. I will not edit those files.
```

Proceed only if the user approves.

If the user explicitly requests the companion freshness check in the initial prompt (e.g., "Edit the chapter and check the companion files too"), treat that as approval and proceed with the read-only check without asking again.

### Companion Files to Check

Check these companion sections:

```
lets-build/
reflection/
terms/
rat/
```

Do not check `lab/` unless the user explicitly asks.

### Companion Freshness Rules

This check is read-only.

Do not edit, copy, rename, delete, or rewrite companion files.

For each companion section:

1. Locate the section subfolder.
2. Find the latest canonical dated file matching:

   ```
   chNN-<part>-YYYY-MM-DD.md
   ```

3. Ignore non-canonical files such as:

   ```
   chNN-edit-*
   chNN-rewrite-*
   chNN-*-concepts.md
   chNN-edited-*
   chNN-main-rewritten-*
   chNN-TermTreasury-*
   bare undated chNN-<part>.md
   domain drafts
   scratch files
   archive files
   ```

4. Compare the companion file date to the main chapter date.

### Companion Status Labels

| Status | Meaning |
|---|---|
| `CURRENT` | Latest canonical companion file exists and is same date or newer than main |
| `POTENTIALLY_STALE` | Companion exists but is older than the revised main file; review alignment before publishing |
| `MISSING` | No canonical dated companion file found |
| `FOLDER_MISSING` | Companion folder does not exist |
| `NOT_CHECKED` | User declined companion check |
| `NEEDS_AUTHOR_REVIEW` | Companion exists but may no longer match the revised main chapter |

### Companion Check Report

Add this section to the Final Revision Report only if the user approved the check:

```
12. **Companion freshness check**

| Section | Latest file | Status | Notes |
|---|---|---|---|
| Let's Build | `chNN-lets-build-YYYY-MM-DD.md` | CURRENT / POTENTIALLY_STALE / MISSING | ... |
| Reflection | `chNN-reflection-YYYY-MM-DD.md` | CURRENT / POTENTIALLY_STALE / MISSING | ... |
| Terms | `chNN-terms-YYYY-MM-DD.md` | CURRENT / POTENTIALLY_STALE / MISSING | ... |
| RAT | `chNN-rat-YYYY-MM-DD.md` | CURRENT / POTENTIALLY_STALE / MISSING | ... |
```

If any companion file is potentially stale relative to the edited main file, do not update it. Recommend the relevant companion-file skill.

Suggested report language:

```
Companion handoff recommended: The main chapter was updated after one or more companion files. Review those files for alignment before publishing.
```

---

## What Makes a Chapter Pop

Apply only where the chapter currently lacks them. Do not force.

- **Strong opening.** Start with a concrete problem, question, or scenario — not an abstract definition.
- **Clear arc.** Every section should move students through `problem → concept → example → application`.
- **One strong example per concept.** If two examples make the same point, keep the clearer one.
- **Section transitions.** Add a one-sentence bridge when flow feels abrupt.
- **Mini-checks.** Use a short `question` callout sparingly to break up dense passages when a quick student self-check would help.
- **Rhythm.** Mix prose, examples, tables, callouts, and checks. Avoid long uninterrupted walls of text.
- **Student confusion check.** For each major concept, ask what the most likely misunderstanding is. If the chapter does not address it, add a brief clarification or a concise `avoid`, `caution`, or `warning` callout using the `call-out` skill.
- **Business value tie-back.** Each major technical concept should connect to better decisions, fewer errors, faster reporting, or stronger accountability.
- **Strong summary.** Synthesize the chapter's big idea. Do not re-list section headings.
- **Preserve voice.** Do not flatten the author's teaching voice, humor, or rhythm.

---

## Structure

Every chapter main file should follow this skeleton:

1. `#` chapter title (one only).
2. **Tagline** — one short, descriptive but catchy italic line directly under the H1.
3. **Introduction** — the chapter's opening. It begins with a first paragraph that reviews what the chapter is about (its purpose and scope) and usually includes an **infographic** that previews the chapter and a **video overview** embed.
4. **Learning Objectives** — a `## Learning Objectives` section between the Introduction and Core Concepts, holding the student-facing "what you will learn" list (action verbs, Bloom-aligned).
5. **Page break** — insert the canonical page-break marker after Learning Objectives.
6. **Core Concepts header + GIF** — a `## Core Concepts` heading immediately followed by the canonical Core Concepts GIF block (see below), then the main concept content begins.
7. **Main concept sections** — `##` major sections (typically 5–7), with `###` subsections where they aid logic.
8. **Summary** — a closing `##` section that synthesizes the chapter's big idea.

So the canonical order is: **H1 → tagline → Introduction (infographic + video overview) → `## Learning Objectives` → page break → `## Core Concepts` + GIF → main sections → Summary → References.**

### Required Chapter Opening

The introduction is the first paragraph (or short opening) that reviews what the chapter is about, paired with a previewing infographic and a video overview. Place the student-facing objectives in their own `## Learning Objectives` section after the introduction. Then add a page break, then open the main body with a `## Core Concepts` header followed **immediately** by this exact GIF block:

```html
## Core Concepts

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220">
</p>

<p align="center">
```

Heading rules:

- `####` rare — production aids only.
- Never use headings for callouts.

Do not force a rigid template if the existing structure works, but keep the H1 → tagline → Introduction (with infographic + video overview) → `## Learning Objectives` → page break → Core Concepts header + GIF → concepts → Summary order.

### Chapter 1 Orientation Variant

Chapter 1 is an orientation chapter and uses a fuller `##` order that introduces the book, its projects, and its tools. Use this section order for Chapter 1:

1. Introduction
2. `## Learning Objectives`
3. `## Core Concepts: The Data-to-Decisions Journey`
4. `## How the Book Is Organized`
5. `## How Each Chapter Works`
6. `## Bloom's Taxonomy in Practice`
7. `## The Two Running Projects`
8. `## The Tools You Will Use`
9. `## How to Read and Use This Book`
10. `## How to Succeed in This Course`
11. `## The Digital Companion`
12. `## What Comes Next`
13. `## Chapter Summary`
14. `## References`

Later chapters (Ch2 onward) use the standard skeleton above, not this orientation variant.

### Image Coverage — Audit Only

Visual coverage is audited, not enforced. See **Images and Media** for the full rule: every major `##` section usually benefits from a visual anchor, but do not force an image into every sub-section, and never delete images. When a major section clearly needs a visual and has none, flag it for `chapter-media` rather than placing media here.

### Lists, Tables, and Examples (Strongly Preferred)

- **Prefer bullet lists and tables over long prose.** When content is a set, sequence, comparison, or list of attributes, use a bulleted or numbered list or a table. Lists and tables are much preferred to dense paragraphs.
- **Use real-world examples.** Ground each concept in a concrete, familiar business scenario (course grades, online orders, a coffee shop, a hospital, a delivery app). Real-world examples are encouraged throughout.

---

## Page Breaks

Insert a page break with this exact marker, placed **after** a complete block, not before the next heading:

```html
<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
```

Break by instructional unit, not by line count.

- **Default.** Start each major `##` section on a new page when the previous section is substantial (multiple paragraphs, figures, tables, callouts, or a clear conceptual shift). Skip the break if the previous section is a very short bridge paragraph.
- **Every one or two sections.** Insert a page break roughly every one or two `##` sections, depending on flow and context. Do not let several substantial sections run together on one page.
- **Long `##` sections.** Insert an internal break after one of: 2–3 related `###` subsections; roughly 900–1,200 words; 2 major figures; 1 major table plus 1 figure; or a dense callout/table/figure cluster — whichever comes first. Use judgment for rhythm, not mechanical spacing.
- **Keep-together (never split across a page).** A heading and its opening paragraph; an image and its caption; a table and its explanation; a callout block; a code or SQL example; a numbered learning-objective list; a summary figure and its summary paragraph.
- **Short sections.** Do not add a break after a short section unless the next section is a major conceptual shift or the layout would otherwise feel crowded.
- **Practical standard.** For content-heavy chapters, most major `##` sections should begin on a fresh page; for lighter chapters, use page breaks more sparingly. Page breaks are important — favor them over crowded pages.

The post-main sections (Let's Build, Review and Reflection, Term Treasury, and the Readiness Assessment Test) live in separate companion files, and labs are a separate section at the end of the book — so page-break planning applies within the main chapter file only.

---

## Length

Target ~3000-5,000 words. If approaching or exceeding, pause and ask before expanding further. Do not pad to reach a count. Do not aggressively cut required topics.

Cuts that require asking first: full sections, major examples, required outline topics, assignment-related material, content that may belong in another chapter.

---

## Outline & Cross-References

Compare the chapter against the latest `outline-*.md` in `.docs/outline/`. Answer:

1. What is this chapter supposed to teach?
2. What belongs here vs. another chapter?
3. Where does it sit in `Data → Tables → Relationships → Queries → Analytics → Decisions`?

If a major outline topic appears missing, flag it in the report — do not invent it silently.

Add 1–2 forward/backward signposts where useful (e.g., *"As introduced in Chapter 6…"* or *"We apply this in Chapter 10…"*). When a concept was taught in an earlier chapter or is extended in a later one, point to that chapter instead of re-teaching it. Decide what belongs where using the latest `outline-*.md` and your memory of the sibling chapters. Cross-reference, do not duplicate, other chapters' content.

---

## Bloom's Alignment

Early sections sit in Remember/Understand. Middle moves to Apply/Analyze. Evaluate-level prompts belong in the Reflection companion. Create-level work belongs in Let's Build or Lab. Flag learning objectives whose verbs do not match where the content sits.

Use this verb cue when auditing `## Learning Objectives`:

| Bloom level | Sample verbs | Where it usually lives |
|---|---|---|
| Remember | define, list, identify, recall | early sections |
| Understand | explain, describe, summarize, classify | early–middle sections |
| Apply | use, build, run, write, calculate | middle sections, Let's Build |
| Analyze | compare, differentiate, diagram, trace | middle–late sections |
| Evaluate | assess, justify, recommend, critique | Reflection companion |
| Create | design, construct, develop | Let's Build, Lab |

---

## Handoffs

When content needs to move to another chapter, or you find tasks the author still needs to act on:

- **Cross-chapter moves and new edit notes** → delegate to the `edits` skill (one `.edits/chNN-edits-<today>.md` per chapter).
- **Tracker updates** → delegate to the `chapter-tracker` skill after the edit is saved.
- **Stale companion files flagged in the freshness check** → suggest the matching companion-file skill: `lets-build-creator`, `term-creator`, `reflection`, or `rat-creator`.
- **Media issues flagged in the audit** → suggest `chapter-media`.
- **Platform publishing sync** → suggest `chapter-sync` (incremental; only newer files copied). See Production Sync below. Never run it without explicit user approval.

Do not duplicate those workflows here.

---

## Production Sync

After a build-ready edit pass, **offer** to publish the chapter to the platform with `chapter-sync`. Do not run it automatically.

- **Hard rule:** do not run `chapter-sync` without explicit user approval.
- **Incremental by design.** `chapter-sync` compares dated filenames per section (legacy source vs. production destination) and copies only files whose source date is newer. Files already current are skipped; only the affected `index.md` is regenerated. It does not recreate every file each run.
- **Keep diffs minimal.** Re-date only the sections you actually changed. Leaving unchanged sections at their existing dates keeps the sync small and avoids needless file churn.
- **What to report.** Tell the user which sections changed and would sync, and that the sync is incremental and reversible at the section level.

---

## Multi-Model Phase Routing

A chapter pass can run across multiple models or sub-agents, but **one editor owns final coherence**. If work is split by phase, route it like this and reconcile at the end:

| Phase | Best-suited work | Owner |
|---|---|---|
| Scan | Read the chapter, inventory author comments, list `.edits/` items | any |
| Structure | Section order, headings, page breaks, Learning Objectives, Ch1 variant | controller editor |
| Prose | Clarity, flow, readability, examples, repetition control | strong language model |
| Callouts | Convert and audit callouts per `call-out` | any |
| Media audit | Alt text, captions, raw paths, `RECOMMEND REMOVE`, figure-numbering audit | any (hands off to `chapter-media`) |
| Companion sync | Flag stale companions, route to companion skills | controller editor |
| Build check | Build-readiness checklist, dated-output save | controller editor |
| Final report | Reconcile all phases, produce the Final Revision Report | controller editor |

No matter how the phases are split, the controller editor performs one final read for coherence and produces a single Final Revision Report.

---

## Build-Readiness Checklist

Before saving the edited chapter, verify the main file is build-ready.

Check:

- YAML front matter is present if the source file uses it.
- The `date:` field is updated to today's date.
- There is exactly one H1.
- Heading levels are logical (no skipped levels).
- The H1 is followed by a tagline or intentional opening.
- The introduction includes a previewing infographic and a video overview.
- A `## Learning Objectives` section follows the introduction, with a page break before the `## Core Concepts` header and its GIF block.
- Major `##` sections that clearly need a visual have one or a flagged `chapter-media` handoff; images are audited, not forced into every sub-section, and none were deleted (redundant placements marked with `RECOMMEND REMOVE` only).
- No unresolved author comments remain in student-facing prose.
- No unresolved TODO markers remain.
- No placeholder text remains (e.g., "add more here", "TBD", "TK").
- No duplicate summary sections remain.
- No broken Markdown tables are obvious.
- No raw Windows paths remain unless intentionally flagged for media handoff.
- No malformed Markdown image syntax remains.
- No accidental absolute links to local files remain.
- Callouts follow the canonical `call-out` format.
- Page-break markers use the approved format.
- The main chapter does not contain full Let's Build, Reflection, Terms, or RAT content unless explicitly intended.
- Cross-chapter references are plausible (chapter numbers match the current outline; no stale references from before a chapter renumbering).
- The chapter has a coherent closing summary.

If any item cannot be fixed confidently, list it under **Unresolved decisions** rather than leaving it hidden in the chapter body.

---

## Workflow

### Stage 1 — Read

Read the full chapter end-to-end before editing. Identify purpose, learning arc, author comments, and what belongs here vs. companion files.

### Stage 2 — Diagnose

Flag: structural problems, overlong sections, repeated explanations, weak openings, missing transitions, weak examples, unresolved author comments, callout issues, image/media issues, Markdown/build issues.

### Stage 3 — Revise

Improve clarity, flow, section order, transitions, examples, paragraph length (3–5 sentences), callouts, summaries, and student-facing explanations. Apply the "What Makes a Chapter Pop" rules where the chapter is weak. Make the smallest effective change.

### Stage 4 — Clean

Resolve every author comment per the Author Comments policy. Convert legacy callouts to the canonical HTML callout format defined by the `call-out` skill. Remove leftover TODOs, placeholder text, duplicated prose, broken Markdown, and inconsistent heading capitalization.

Flag raw local image paths and image pipeline issues in the report rather than rewriting them directly.

Do not leave student-facing editing notes.

### Stage 5 — Save (Dated Output)

#### Platform Source Exception

If the target file is a platform-facing `index.md` under `books/database-book/files/source/chapters/`, do not create a dated `chNN-main-YYYY-MM-DD.md` file. Stop and ask the user whether the platform `index.md` should be updated directly or regenerated from the latest source-sync file.

#### Standard Dated-Output Workflow

For all other target files:

1. Source = the most recent dated file in the chapter's `main/` folder, unless the user named another.
2. Create a new file in the same folder using today's date:

   ```
   chapter-drafts/chNN-<slug>/main/chNN-main-<YYYY-MM-DD>.md
   ```

   No `-edited`, `-rewrite`, `-v2` suffixes. Date alone marks the version.
3. If today's-date file exists: minor follow-up → edit in place; major same-day re-edit → append `-1`, `-2`, etc.
4. Copy the full source into the new file, then apply all edits there. Leave the prior dated file untouched.
5. Update the `date:` field in the YAML front matter.
6. Add this comment at the very top, above the YAML:

   ```markdown
   <!-- Chapter edit: improved structure, readability, callouts, and build hygiene. Technical meaning preserved. -->
   ```

### Stage 6 — Report

Return the Final Revision Report below.

---

## Final Revision Report

```markdown
### Revision Report

1. **File mode** — Production Main, Working Bundle, or Platform Source; note the file edited and (for bundles) whether edits were propagated to source and reassembled.
2. **Structural changes** — sections moved, merged, or reorganized.
3. **Readability and flow** — key sentence/paragraph improvements.
4. **Redundancies removed** — repeated ideas consolidated.
5. **Examples strengthened** — new or improved student-facing examples.
6. **Callouts** — added, removed, or converted to canonical HTML callout format; confirm whether all callouts follow the `call-out` skill.
7. **Outline coverage** — confirm required outline topics are present; flag gaps.
8. **Author Comments tally**
   - Total found: N
   - Resolved: X (one-line summary each)
   - Escalated: Y (each quoted verbatim under Unresolved Decisions)
   - Kept as HTML comments: Z (with reason)
9. **Visuals and media** — alt text, captions, raw paths flagged; `RECOMMEND REMOVE` comments listed; suggest `chapter-media` if needed.
10. **Build hygiene** — Markdown/format issues fixed; build-readiness checklist items passed/flagged.
11. **Companion sync impact** — note any change in the main that makes a companion (Let's Build, Terms Treasury, Review and Reflection, RAT / Quiz, Lab) stale, and which companion skill to run.
12. **Unresolved decisions** — verbatim list of author comments and structural questions requiring author input.
13. **Handoffs suggested** — `call-out`, `edits`, `chapter-tracker`, `chapter-media`, `chapter-sync`, companion-file skill (`lets-build-creator`, `reflection`, `term-creator`, `rat-creator`, `lab-creation`), or none.
14. **.edits scan** — pending edits found (N), processed (X), deferred (Y); new edits documented to `.edits/` (Z).
15. **Companion freshness check** — included only if the user approved the read-only check (table of statuses per companion section).
16. **Production sync offer** — if the edit is build-ready, offer to run `chapter-sync` to publish, and note that it is incremental and requires explicit approval before running.
```

Keep the report compact. The Author Comments tally is required even when N = 0.
