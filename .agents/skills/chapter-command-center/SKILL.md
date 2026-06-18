---
name: chapter-command-center
description: >
  Front-door routing and decision support for BITM330 database-book chapter work.
  Use when the user is unsure what to do next, asks which skill to use, wants a quick
  chapter-status interpretation, or needs a recommended next action. This skill does
  not edit chapter content, produce media, revise companions, run final review, build
  DOCX, or update production files. It routes the user to the smallest appropriate skill.
argument-hint: Chapter number, chapter folder, file path, or plain-language goal such as "what should I do next for ch09?"
---

# Chapter Command Center

`chapter-command-center` is the front door for BITM330 chapter production. It is a **router, not a worker**.

It helps answer:

```text
What am I trying to do?
What state is this chapter in?
Which skill should run next?
What should I ask that skill to do?
```

---

## Core Principle

Use the smallest appropriate skill.

Do not launch a full production workflow when a single specialized skill can handle the task. Do not ask the user to choose among many sub-skills when the correct route is obvious.

---

## Source Model

The canonical source root is `books/database-book/files/source`. Expected chapter package layout and operational record paths are defined in `chapter-production-flow`. Do not duplicate them here.

---

## What This Skill Does

The command center may:

- interpret the user's goal;
- identify the likely chapter, component, and stage;
- recommend the next skill to use;
- explain why that skill is the best fit;
- provide the exact suggested invocation;
- identify when a request is too broad and should go to `chapter-production-flow`;
- identify when a request is narrow and should go directly to a specialized skill;
- produce a short routing plan;
- ask one clarifying question when the target or goal is ambiguous.

## What This Skill Does Not Do

The command center must not:

- edit chapter prose;
- rewrite companion files;
- add or place images;
- optimize, upload, or rewrite media links;
- update media ledgers or manifests;
- run final review;
- build DOCX;
- update tracker files;
- write reports;
- sync, deploy, commit, or push.

If the task requires action, route to the appropriate skill.

---

## Five Front Doors

For most user requests, route to one of these five:

| Front door | Use when |
|---|---|
| `chapter-command-center` | The user needs help deciding what to do |
| `chapter-production-flow` | The user wants chapter lifecycle coordination |
| `chapter-editor` | The user wants the main chapter edited (prose, structure, callouts, and visual pedagogy) |
| `chapter-media` | The user wants images, figures, Cloudinary, or media workflow |
| `chapter-final-check` | The user wants final readiness verification |

All other skills are delegated workers — called by the front-door skills, not by the user directly.

---

## Main Routing Table

| User goal | Route to |
|---|---|
| "What should I do next?" | `chapter-command-center` first, then route |
| "Show me the chapter status" | `chapter-production-flow status` |
| "Plan the next steps for this chapter" | `chapter-production-flow plan-only` |
| "Manage this chapter through several steps" | `chapter-production-flow` |
| "Edit the main chapter" | `chapter-editor` |
| "Lightly polish the chapter" | `chapter-editor-light` |
| "Fix or review images/media" | `chapter-media` |
| "Run media inventory only" | `chapter-media-inventory` or `chapter-media dry-run` |
| "Create or revise Let's Build" | `lets-build-creator` |
| "Create or revise a lab" | `lab-creation` |
| "Create an LMS-only autograded lab" | `autograded-lab` |
| "Create or revise terms" | `term-creator` |
| "Create or revise review/reflection" | `reflection` |
| "Create or revise RAT/quiz" | `rat-creator` |
| "Check whether this chapter is ready" | `chapter-final-check` |
| "Run final readiness check" | `chapter-final-check` |
| "Can I sync/deploy this chapter?" | `chapter-final-check` |
| "Build DOCX" | `chapter-docx-build` |
| "Record what happened" | `progress-update` |
| "Record chapter-specific unresolved items" | `edits` |
| "Update production status" | `chapter-tracker` |

---

## Decision Tree

### 1. Is the user asking what to do next?

Route to `chapter-command-center`. Return a short recommendation with suggested invocation.

### 2. Is the user asking to manage several steps?

Examples: "Work on Chapter 9 from where we left off.", "Take Chapter 4 through edit, media, review, and DOCX."

Route to `chapter-production-flow`.

### 3. Is the user asking to edit the main chapter only?

Examples: "Edit Chapter 9.", "Clean up the Chapter 4 prose.", "Improve flow and images in Chapter 6."

Route to `chapter-editor`. If the request includes images as part of editing, still route to `chapter-editor` first — the editor handles visual pedagogy and targeted image-reference cleanup, then offers `chapter-media` when needed.

### 4. Is the user asking only about media?

Examples: "Fix the images in Chapter 4.", "Run Cloudinary cleanup.", "Place the figure suggestions."

Route to `chapter-media`.

### 5. Is the user asking for final readiness check?

Examples: "Check if Chapter 9 is ready for DOCX/deploy.", "Run final readiness check."

Route to `chapter-final-check`.

### 6. Is the user asking for one companion?

Route directly: `lets-build-creator`, `lab-creation`, `autograded-lab`, `term-creator`, `reflection`, or `rat-creator`.

### 7. Is the user asking for output?

Route to `chapter-docx-build` (DOCX), `chapter-sync` (sync, only when explicitly requested), or `book-deploy` (deploy, only when explicitly requested).

---

## Ambiguity Rule

Ask at most one clarifying question.

- Chapter clear, task broad → route to `chapter-production-flow plan-only`.
- Task clear, chapter missing → ask "Which chapter should I use?"
- Both unclear → ask "Which chapter, and are you trying to edit, handle media, review, or build output?"

---

## Output Format

When routing, respond with:

```markdown
## Recommended Route

**Use:** `<skill-name>`

**Why:** <one sentence>

**Suggested invocation:** `<skill-name> <arg>`

**What it will do:** ...
**What it will not do:** ...
```

---

## Example Routes

### Example 1 — What should I do next?

User: "What should I do next for Chapter 9?"

```markdown
## Recommended Route

**Use:** `chapter-production-flow`

**Why:** You are asking for chapter status and next production steps, not a single edit.

**Suggested invocation:** `chapter-production-flow ch09 plan-only`
```

### Example 2 — Edit with image awareness

User: "Edit Chapter 4 and make sure images are considered too."

```markdown
## Recommended Route

**Use:** `chapter-editor`

**Why:** The main task is chapter editing. The editor performs a visual pedagogy pass and can flag or resolve concrete image references, then offers `chapter-media`.

**Suggested invocation:** `chapter-editor ch04`
```

### Example 3 — Media only

User: "The figures are still local paths. Fix them."

```markdown
## Recommended Route

**Use:** `chapter-media`

**Why:** The task is media cleanup, optimization, upload, and link rewriting.

**Suggested invocation:** `chapter-media chNN optimize`
```

---

## What To Say Before Launching

Before routing, say:

```markdown
I recommend launching `<skill-name>` because <reason>. Proceed? yes / no / choose another option
```

If the user already explicitly requested a skill, proceed to that skill's own preflight.

---

## Approval Rules

Do not write files unless the user selected a write action or approved a proposed plan. Always ask before deleting files, rewriting media paths, optimizing/uploading media, building DOCX, or running sync/deploy/publish/commit/push.

Never run automatically: `chapter-sync`, `book-deploy`, deploy, publish, commit, push, merge.

---

## Final Response Contract

```markdown
## Chapter Command Center — Result

**Chapter:** chNN
**Selected action:** ...
**Skill launched:** <skill-name or none>

### Next recommended step
- ...

Deployment run: no.
```

---

## Safety Rules

1. Route before acting.
2. Use the smallest appropriate skill.
3. Do not run write-producing skills without approval.
4. Do not route broad lifecycle work to a narrow skill.
5. Do not route narrow work to `chapter-production-flow` unless sequencing or status tracking is needed.
6. Do not route final package review to `chapter-editor`.
7. Do not route media execution to `chapter-editor`.
8. Do not route prose editing to `chapter-media`.
9. Never suggest sync, deploy, commit, push, or publish unless explicitly asked.
10. When uncertain, recommend `chapter-production-flow plan-only`.