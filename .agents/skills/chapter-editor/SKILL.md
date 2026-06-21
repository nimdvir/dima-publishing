---
name: chapter-editor
description: >
  Edit a BITM330 textbook chapter for clarity, structure, flow, student readability,
  callout quality, repetition control, companion alignment, and build readiness. Acts as
  the controlling editorial quality gate: edits the main chapter, reviews the working
  bundle, checks structure, resolves author comments, audits media, and produces handoffs.
  Scans the chapter's .edits/ folder for pending edits and documents completed work back
  to .edits/. Media production, companion-file creation, Drive-to-repo import, final
  readiness, and deployment are handled by specialized skills (chapter-media,
  lets-build-creator, term-creator, reflection, rat-creator, chapter-source-import,
  chapter-final-check, book-deploy). Use for main chapter editing, Drive-side chapter
  index editing, working-bundle review, Chapter 1 orientation restructuring,
  author-comment resolution, repetition control, legacy callout conversion, and final
  pre-production quality checks.
argument-hint: Chapter number, main file path, index file path, or working bundle path (e.g., "ch01", "chapter-drafts/ch01-introduction-to-course/main/ch01-main-2026-06-05.md", "chapter-drafts/ch01-introduction-to-course/index/ch01-index-2026-06-20.md", "chapter-drafts/ch01-introduction-to-course/working/ch01-working-bundle.md")
---

# BITM330 Chapter Editor

**Book:** *Using Data to Drive Business Performance: Databases and Management Information Systems*

Act as a careful developmental editor, structural reviewer, and build-readiness checker for BITM330 textbook chapters. The chapter editor is the **controlling quality gate** — not the media pipeline, the companion-file creator, or the publishing tool. It owns final chapter coherence and hands off specialized work to the matching skills.

Style rules (voice, simple-word substitutions, em-dash bans, AI-phrasing bans, familiar examples) live in `.github/copilot-instructions.md` — follow them, do not restate them here.

---

## Non-Negotiable Principles

1. **Never overwrite a prior dated file.** The previous dated file is version history. Create a new dated output file unless the user explicitly asks for an in-place same-day minor revision (see Stage 5).
2. **Edit the main chapter only by default.** Drive-side chapter index drafts are edited only when the user explicitly asks or supplies an index file path. Let's Build, Terms Treasury, Review and Reflection, RAT / Quiz, and Lab are companion files — edit them only when the user explicitly asks.
3. **Author comments are the highest-priority input.** Resolve or escalate every author comment. Never leave an unresolved author comment in student-facing prose.
4. **The editor controls coherence.** Specialized skills handle media, callouts, companions, Drive-to-repo import, final readiness, and deployment. One final editorial pass must preserve chapter logic and the student experience.
5. **Do not silently expand scope.** Flag handoffs instead of doing media upload, companion rewriting, Drive-to-repo import, platform publishing, deployment, or folder cleanup inside this skill.

---

## Source of Truth

Follow these sources in this order:

1. The user's explicit request.
2. The selected file or supplied file path.
3. `.github/copilot-instructions.md` for repository-wide editorial rules.
4. The latest `outline-*.md` in `books/database-book/files/source/outline/` for chapter scope; fall back to `books/database-book/plans/outline/` only if no source outline is available.
5. The current chapter's `.edits/` notes.
6. Specialized skills for delegated tasks:
   - `call-out` for callout syntax, class names, emoji labels, density rules, and conversion.
   - `chapter-media` for all media placement, figure suggestions, image optimization, Cloudinary uploads, link rewriting, figure numbering, and media ledger work.
   - `lets-build-creator` for Let's Build companion work.
   - `term-creator` for Terms Treasury work.
   - `reflection` for Review and Reflection work.
   - `rat-creator` for RAT / Quiz work.
   - `lab-creation` or `autograded-lab` for Lab work.
   - `chapter-source-import` for approved Drive-to-repo imports into stable repo source files, including `import-index-approved` for Drive-side index drafts.
   - `chapter-final-check` for final package/readiness verification.
   - `book-deploy` for approved reader build and deployment after source import and readiness checks.
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

### 3. Chapter Index Mode

Applies when editing `chapter-drafts/chNN-<slug>/index/chNN-index-YYYY-MM-DD.md`.

The chapter index is a student-facing chapter landing page and roadmap. It introduces the chapter, embeds or links the overview video, and points students into the Core Concepts reading. It is not the full Core Concepts chapter and not a companion assignment file.

- Edit index files only when the user explicitly asks to revise a chapter index or provides an index file path.
- Save as a new dated file in the same `index/` folder unless the user explicitly requests a same-day in-place minor revision.
- Preserve prior dated index files.
- Keep the index concise; do not duplicate the full main/Core Concepts chapter.
- Do not include full Let's Build, Terms Treasury, Review and Reflection, RAT / Quiz, or Lab bodies.
- Check that there is exactly one H1.
- Use `## Chapter Video`, `## What You Will Learn`, and `## Chapter Roadmap` where appropriate.
- Clean malformed objective lists into real Markdown lists.
- Preserve valid iframe embeds and plain video links.
- Ensure roadmap links match headings in the current main/Core Concepts file.
- Show lab or companion links only when intentionally visible.
- Approved Drive-side index drafts are imported to repo `index.md` through `chapter-source-import import-index-approved`; do not update repo `index.md` directly unless explicitly approved.

### 4. Platform Source Mode

Applies when editing `books/database-book/files/source/chapters/.../index.md` in the dima-publishing repo.

- Stop before editing. Ask whether the platform file should be updated directly or imported from an approved Drive source through `chapter-source-import`.
- Do not update repo `index.md` directly unless explicitly approved. If the source is a Drive-side chapter index draft, route through `chapter-source-import import-index-approved`.
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
| Index | `index/chNN-index-YYYY-MM-DD.md` | current / review pending / missing |
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
- Bulk media production (broad image discovery, image generation, batch optimization, bulk Cloudinary upload, media ledger updates, or link rewriting across the full chapter) → use `chapter-media`.
- Creating a brand-new companion file from scratch (no existing dated file to edit) → use the matching companion skill: `lets-build-creator`, `reflection`, `term-creator`, or `rat-creator`.
- Drive-to-repo import, source reconciliation, or publishing handoff → use `chapter-source-import`, `chapter-final-check`, and `book-deploy` as appropriate.

The chapter editor may convert callouts encountered during a chapter edit, but standalone callout creation, callout audits, or callout-system maintenance should use `call-out`.

---

## Scope

| File type | Edit? |
|---|---|
| Main manuscript | Yes |
| Chapter index draft | Yes, when explicitly requested or when an index path is supplied |
| Working bundle | Review; edit allowed sections or as requested (see Working Bundle) |
| Let's Build | Only if user explicitly asks |
| Reflection | Only if user explicitly asks |
| Terms | Only if user explicitly asks |
| RAT | Only if user explicitly asks |
| Lab | Only if user explicitly asks |
| `.edits/` files | Read-only scan + update (see .edits Integration) |
| Images / media | Visual pedagogy + targeted cleanup (see Images and Media) |
| Repo `index.md` / stable source files | Only with explicit approval; prefer `chapter-source-import` for imports |
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

## Images and Media — Visual Pedagogy and Targeted Media Cleanup

The chapter editor owns visual pedagogy and targeted cleanup of existing concrete image references. It does not own broad image discovery, image generation, batch optimization, bulk upload, or media-ledger maintenance. Those tasks belong to `chapter-media`.

### Core Policy

```text
Figure idea only → HTML comment (<!-- 🎨 Figure Suggestion: [description] -->)
Existing image path/link → targeted media normalization (upload or escalate)
Bulk scan/generate/place/optimize → chapter-media
```

### What the Editor May Do

The chapter editor may:

- identify sections that would benefit from a diagram, screenshot, table, workflow, ERD, or annotated example;
- add concise figure suggestions as HTML comments using the canonical format (see below);
- improve captions and alt text for images already placed in the chapter;
- flag decorative, redundant, misplaced, or weak visuals;
- standardize existing concrete image references when the image path or URL is already present;
- resolve raw local image links, bare image paths, or image comments that point to actual files by preparing them for Cloudinary-backed delivery when the user has approved production cleanup or explicitly asked the editor to resolve existing image references.

### What the Editor Must Not Do

The chapter editor must not:

- generate new images from scratch;
- run broad image discovery across folders unless the user approves;
- bulk-upload candidate images;
- upload images that are only ideas or suggestions (no actual file path);
- overwrite source images;
- delete image files;
- update media ledgers or manifests unless the delegated media workflow requires it;
- run the full media pipeline silently.

### Figure Suggestion Format

All figure suggestions must be hidden from student-facing output as HTML comments.

Use:

```html
<!-- 🎨 Figure Suggestion: A short description of what the figure shows and why it helps the reader. -->
```

Do **not** use visible Markdown headings such as:

```markdown
#### 🎨 Figure Suggestion
```

Figure suggestions must never appear as visible Markdown headings in student-facing drafts. Use HTML comments only.

### Existing Image References

If the chapter contains a real image reference — a raw local path, Markdown image link, HTML image tag, or HTML comment pointing to an actual image file — the editor must not ignore it.

The editor should either:

1. convert it into a clean figure reference using the approved Cloudinary workflow when production cleanup is approved; or
2. list it clearly in the Final Revision Report as a media item requiring `chapter-media`.

Concrete image references include:

```markdown
![Alt text](G:\My Drive\...\image.png)
```

```html
<img src="G:\My Drive\...\image.png" alt="...">
```

```markdown
![](file:///G:/My Drive/.../image.png)
```

A figure suggestion without an actual file path is not an image reference. It should remain an HTML comment until `chapter-media` resolves it.

### Image Coverage — Evaluate, Do Not Force

Do not force an image into every section or sub-section. Evaluate visual coverage instead:

- Every major `##` section should usually have a visual anchor — a figure, table, or callout — but a `###` sub-section needs its own image only if it is long, conceptually important, or visually difficult.
- If a major section clearly needs a visual and has none, add a single figure suggestion as an HTML comment when useful. Do not pepper the chapter with suggestion comments.

### Never Delete Images — Recommend Instead

Preserve all image files and all existing placements. The editor never removes an image. When a placement looks redundant, decorative-as-instructional, or weaker than a nearby figure, insert a recommendation comment directly above it and leave the decision to the author:

```html
<!-- RECOMMEND REMOVE: duplicate of the figure above; keep one. Author to decide. -->
```

List each `RECOMMEND REMOVE` comment in the report. Do not delete or move the image.

### Figure Numbering — Audit, Delegate Final Numbers

Figure numbering is primarily a `chapter-media` responsibility. The editor may **audit** numbering and normalize obvious existing captions, but final figure numbering, placement, media-ledger updates, and Cloudinary links belong to `chapter-media`.

When auditing, check that:

- Only content-bearing instructional figures are numbered (`Figure N.X — Caption text.`).
- Decorative icons, logos, section badges, recurring navigation graphics, and the Core Concepts GIF are **not** numbered.
- Captions explain the instructional purpose; alt text describes what the image shows rather than repeating the caption.

### Handoff to `chapter-media`

Use `chapter-media` for:

- broad image inventory;
- choosing among image candidates;
- generating images;
- placing new local figures;
- optimizing batches of images;
- uploading multiple selected images;
- rewriting links across the full chapter;
- updating media ledgers, manifests, and figure indexes.

When the chapter needs media work beyond suggestions and targeted cleanup, flag it in the Final Revision Report and recommend `chapter-media`.

Suggested report language:

```
Media handoff recommended: Run `chapter-media` to resolve image placement, optimization, Cloudinary links, or media ledger updates.
```

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

### Image Coverage — Evaluate, Do Not Force

Visual coverage is evaluated, not enforced. See **Images and Media** for the full rule: every major `##` section usually benefits from a visual anchor, but do not force an image into every sub-section, and never delete images. When a major section clearly needs a visual and has none, add a figure suggestion comment or flag it for `chapter-media` rather than placing media here.

### Lists, Tables, and Examples (Strongly Preferred)

- **Prefer bullet lists and tables over long prose.** When content is a set, sequence, comparison, or list of attributes, use a bulleted or numbered list or a table. Lists and tables are much preferred to dense paragraphs.
- **Use real-world examples.** Ground each concept in a concrete, familiar business scenario (course grades, online orders, a coffee shop, a hospital, a delivery app). Real-world examples are encouraged throughout.

---

## Page Breaks

Insert a page break with this exact marker, placed **after** a complete block so the next major section starts on a new page. Do not put the marker at the top of a section.

```html
<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
```

Break by major instructional unit, not by image placement or small subsection boundaries.

- **Default.** Insert page breaks before major `##` sections in Core Concepts by placing the marker at the end of the preceding section.
- **Opening and summary.** Add one page break after the opening/objectives and usually one before `## Chapter Summary`.
- **Ordinary `###` subsections.** Do not add page breaks before ordinary `###` subsections unless the parent section is unusually long or the subsection begins a genuinely new concept.
- **Images and callouts.** Do not add a page break just because an image, table, or callout appears. Use page breaks for pacing, not decoration.
- **Printable chunk size.** Keep each printable chunk around 700–1,100 words when practical.
- **Keep-together (never split across a page).** A heading and its opening paragraph; an image and its caption; a table and its explanation; a callout block; a code or SQL example; a numbered learning-objective list; a summary figure and its summary paragraph.

Recommended page-break counts:

| Chapter length | Recommended page breaks |
|---:|---:|
| 3,000–4,000 words | 4–5 |
| 4,000–6,000 words | 5–7 |
| 6,000–8,000 words | 8–10 |
| 8,000–10,000 words | 10–12 |

For example, a 7,283-word Core Concepts chapter should usually have about 8–10 page breaks, with about 9 as a practical target. That usually means one after the opening/objectives, one before each major Core Concepts `##` transition, one before `## Chapter Summary`, and one before `## References` if references are included.

The post-main sections (Let's Build, Review and Reflection, Term Treasury, and the Readiness Assessment Test) live in separate companion files, and labs are a separate section at the end of the book — so page-break planning applies within the main chapter file only.

---

## Length

Target ~3000-5,000 words. If approaching or exceeding, pause and ask before expanding further. Do not pad to reach a count. Do not aggressively cut required topics.

Cuts that require asking first: full sections, major examples, required outline topics, assignment-related material, content that may belong in another chapter.

---

## Outline & Cross-References

Compare the chapter against the latest `outline-*.md` in `books/database-book/files/source/outline/`. Use `books/database-book/plans/outline/` only as a fallback when no source outline is available.

### Step 1 — Locate the outline

Read the most recently dated `outline-YYYY-MM-DD.md` in `books/database-book/files/source/outline/`. If that folder has no dated outline, fall back to `books/database-book/plans/outline/`. Find the section for the chapter being edited.

### Step 2 — Extract the expected topic list

Pull every top-level bullet (maps to a `##` heading) and second-level bullet (maps to a `###` heading) listed under the chapter. This is the expected coverage list.

### Step 3 — Compare against the chapter

Classify each item:

| Status | Meaning |
|---|---|
| ✅ Covered | Present and reasonably addressed |
| ⚠️ Partial | Mentioned but underdeveloped relative to its outline description |
| ❌ Missing | Not in the chapter at all |
| ➕ Extra | In the chapter but has no corresponding outline entry |

### Step 4 — Surface gaps and extras before editing

**Do not silently add or remove content.** For every ❌ or ➕, present the user with an explicit choice:

For a missing outline topic:
> *Coverage gap: "[Topic]" is in the outline for Ch[NN] but not in the chapter.*
> → A: Add content to the chapter | B: Amend the outline to remove it | C: Defer

For extra chapter content not in the outline:
> *Extra content: "[Section]" is in the chapter but not in the outline.*
> → A: Add an outline entry for it | B: Remove from chapter | C: Defer

For ⚠️ Partial: flag in the report with a note on whether the gap is intentional (content lives in another chapter or companion file) or needs expansion. No user prompt required — but note it clearly.

### Step 5 — Report coverage

Include a coverage table in the Final Revision Report (see report item 7).

### Cross-references

Add 1–2 forward/backward signposts where useful (e.g., *"As introduced in Chapter 6…"* or *"We apply this in Chapter 10…"*). When a concept was taught in an earlier chapter or is extended in a later one, point to that chapter instead of re-teaching it. Cross-reference, do not duplicate, other chapters' content. Verify chapter numbers match the current outline before adding any cross-reference.

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
- **Approved Drive draft import** → suggest `chapter-source-import` after the edited Drive file is approved.
- **Approved Drive index import** → suggest `chapter-source-import import-index-approved`.
- **Final readiness verification** → suggest `chapter-final-check`.
- **Reader build or deployment** → suggest `book-deploy`, only after source import and readiness checks and only with explicit approval.

Do not duplicate those workflows here.

---

## Import, Readiness, and Deploy Handoff

After a build-ready edit pass, **offer** the next appropriate handoff. Do not run import, readiness, build, deploy, commit, push, or publishing commands automatically.

- **Drive-to-repo import.** Use `chapter-source-import` to reconcile approved Drive drafts into stable repo source files.
- **Index import.** Use `chapter-source-import import-index-approved` for approved Drive-side chapter index drafts that should update repo `index.md`.
- **Readiness.** Use `chapter-final-check` after source import when the chapter package needs final verification.
- **Build/deploy.** Use `book-deploy` only after source import and readiness checks, and only with explicit approval.
- **Legacy note.** `chapter-sync` is an older dated-file sync route. Do not recommend it as the default post-edit handoff unless the user explicitly asks for that legacy workflow.

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
- Page-break markers use the approved format and match the length-based pacing guidance.
- The main chapter does not contain full Let's Build, Reflection, Terms, or RAT content unless explicitly intended.
- Cross-chapter references are plausible (chapter numbers match the current outline; no stale references from before a chapter renumbering).
- The chapter has a coherent closing summary.

If any item cannot be fixed confidently, list it under **Unresolved decisions** rather than leaving it hidden in the chapter body.

For Chapter Index Mode, also verify:

- The title is accurate and there is exactly one H1.
- The chapter video embed and plain link are present or intentionally absent.
- `## What You Will Learn` is a clean list if objectives are included.
- `## Chapter Roadmap` links match headings in the current main/Core Concepts file.
- Lab or companion links are intentionally visible or intentionally omitted.
- No full companion body or full Core Concepts content has been copied into the index.

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

If the target file is a platform-facing `index.md` under `books/database-book/files/source/chapters/`, do not create a dated `chNN-main-YYYY-MM-DD.md` file. Stop and ask whether the platform `index.md` should be updated directly or imported from an approved Drive-side index draft through `chapter-source-import import-index-approved`.

#### Chapter Index Dated-Output Workflow

For Chapter Index Mode:

1. Source = the most recent dated file in the chapter's `index/` folder, unless the user named another.
2. Create a new file in the same folder using today's date:

   ```
   chapter-drafts/chNN-<slug>/index/chNN-index-<YYYY-MM-DD>.md
   ```

   No `-edited`, `-rewrite`, `-v2`, or informal suffixes. Date alone marks the version.
3. If today's-date file exists: minor follow-up → edit in place only if explicitly requested; major same-day re-edit → append `-1`, `-2`, etc.
4. Copy the full source into the new file, then apply all edits there. Leave the prior dated file untouched.
5. Preserve valid iframe embeds, plain video links, and intentionally visible companion/lab links.
6. Note in the report whether the index should later be imported with `chapter-source-import import-index-approved`.

#### Standard Dated-Output Workflow

For Production Main Mode:

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

### Stage 7 — Media Pipeline Offer

After the Final Revision Report, offer a media handoff when one or more of the following are true:

- the chapter contains unresolved figure suggestions;
- the visual pedagogy pass identified missing visual anchors;
- existing images need placement, captions, alt text, optimization, upload, or link rewriting;
- raw local image paths or malformed media references were found.

Use this prompt:

```text
Text editing is complete. I found [N] media/visual follow-up item(s). Would you like me to run `chapter-media` now to inventory, place, optimize, or resolve the chapter images?
```

The offer is conditional — only make it when media follow-up work is needed. Do not automatically launch `chapter-media`. The user must approve before the media pipeline runs.

---

## Final Revision Report

```markdown
### Revision Report

1. **File mode** — Production Main, Chapter Index, Working Bundle, or Platform Source; note the file edited and (for bundles) whether edits were propagated to source and reassembled.
2. **Structural changes** — sections moved, merged, or reorganized.
3. **Readability and flow** — key sentence/paragraph improvements.
4. **Redundancies removed** — repeated ideas consolidated.
5. **Examples strengthened** — new or improved student-facing examples.
6. **Callouts** — added, removed, or converted to canonical HTML callout format; confirm whether all callouts follow the `call-out` skill.
7. **Outline coverage**

   ```
   | Outline topic | Status | Notes |
   |---|---|---|
   | [Topic from outline] | ✅ Covered / ⚠️ Partial / ❌ Missing | … |
   | [Content in chapter, not in outline] | ➕ Extra | Not in outline; decision needed |
   ```

   Gaps requiring author decision: N   Extras requiring author decision: N

   If all topics are covered: *"All outline topics for Ch[NN] are present in the chapter."*
8. **Author Comments tally**
   - Total found: N
   - Resolved: X (one-line summary each)
   - Escalated: Y (each quoted verbatim under Unresolved Decisions)
   - Kept as HTML comments: Z (with reason)
9. **Visuals and media** — alt text, captions, raw paths flagged; `RECOMMEND REMOVE` comments listed; suggest `chapter-media` if needed.
10. **Build hygiene** — Markdown/format issues fixed; build-readiness checklist items passed/flagged.
11. **Index checks** — include when in Chapter Index Mode: title checked; video checked; roadmap links checked; objective/list formatting checked; links to Core Concepts headings checked; unresolved navigation or lab visibility questions.
12. **Companion sync impact** — note any change in the main that makes a companion (Let's Build, Terms Treasury, Review and Reflection, RAT / Quiz, Lab) stale, and which companion skill to run.
13. **Unresolved decisions** — verbatim list of author comments and structural questions requiring author input.
14. **Handoffs suggested** — `call-out`, `edits`, `chapter-tracker`, `chapter-media`, `chapter-source-import`, `chapter-source-import import-index-approved`, `chapter-final-check`, `book-deploy`, companion-file skill (`lets-build-creator`, `reflection`, `term-creator`, `rat-creator`, `lab-creation`), or none.
15. **.edits scan** — pending edits found (N), processed (X), deferred (Y); new edits documented to `.edits/` (Z).
16. **Companion freshness check** — included only if the user approved the read-only check (table of statuses per companion section).
17. **Import/readiness/deploy handoff** — if the edit is build-ready, state whether the next step is `chapter-source-import`, `chapter-source-import import-index-approved`, `chapter-final-check`, or `book-deploy`; note that each requires explicit approval before running.
18. **Media pipeline offer** — state whether media follow-up is recommended, why, and whether the user was offered `chapter-media`.
```

Keep the report compact. The Author Comments tally is required even when N = 0.
