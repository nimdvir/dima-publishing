---
name: chapter-command-center
description: >
  Standalone interactive VS Code/Codex launcher for BITM330 database-book chapter work.
  Use when the user is unsure what to do next, wants a recommendation, wants a menu
  of chapter-production actions, or wants to route work to the correct specialized
  skill. This skill does not edit chapters directly unless the user selects an action;
  it recommends, routes, and coordinates operational record updates.
---

# Chapter Command Center

`chapter-command-center` is the standalone entry point for chapter work.

Use it when the user says things like:

```text
/chapter-command-center ch01
what should I do next for chapter 1?
help me continue chapter 2
where are we with chapter 3?
which skill should I use?
run the chapter command center
```

This skill should:

1. inspect chapter status;
2. recommend the next best step;
3. show a clear menu;
4. ask what the user wants to do;
5. route to the right specialized skill;
6. decide whether operational records should be updated.

This is a **launcher/router skill**, not a replacement for the production, editing, media, review, or DOCX skills.

---

## Relationship To Other Skills

| Skill | Role |
|---|---|
| `chapter-command-center` | Main interactive launcher / router |
| `chapter-production-flow` | Full guided production lifecycle, if installed |
| `chapter-review-codex` | Canonical final whole-package review |
| `chapter-editor` | Main chapter prose editing |
| `chapter-editor-light` | Quick grammar/style polish |
| `lets-build-creator` | Let's Build creation/revision |
| `lab-creation` | Lab creation/revision |
| `reflection` | Review and Reflection creation/revision |
| `rat-creator` | RAT creation/revision |
| `term-creator` | Terms Treasury / term appendix |
| `chapter-media-inventory` | Read-only media inventory |
| `chapter-media` | Media planning and placement |
| `image-link-optimizer` | Image optimization/upload/link rewrite |
| `progress-update` | Chronological session log |
| `edits` | Chapter-specific unresolved notes |
| `chapter-tracker` | Cross-chapter production status |
| `chapter-docx-build` | DOCX export |

If `chapter-production-flow` is installed, use it only when the user wants a full guided lifecycle. Otherwise, route directly to the specialized skill.

---

## Source Model

The canonical source root is:

```text
books/database-book/files/source
```

Expected chapter package:

```text
books/database-book/files/source/chapters/chNN-slug/
  index.md
  core-concepts.md
  lets-build.md
  review-questions.md
  terms-treasury.md
  rat.md

books/database-book/files/source/labs/lab-NN-slug/
  index.md
```

Reports go under:

```text
books/database-book/.reports/
```

Operational notes go under:

```text
books/database-book/.edits/
```

Do not use Google Drive dated drafts as live source unless the user explicitly asks for comparison, merge, or import work.

---

# Default Behavior

When invoked, do not immediately edit files.

Default sequence:

```text
1. Resolve target chapter.
2. Inspect status.
3. Recommend next best step.
4. Present menu.
5. Wait for user selection.
6. Route to the selected skill.
7. Update operational records only when triggers are met and writes are approved.
```

---

# Phase 0 — Status Scan

Before recommending anything, inspect the chapter package.

Check:

- chapter folder exists;
- lab folder exists;
- `core-concepts.md` exists;
- `lets-build.md` exists;
- `review-questions.md` exists;
- `terms-treasury.md` exists;
- `rat.md` exists;
- matching lab `index.md` exists;
- `.edits/chNN-edits.md` exists;
- `.edits/edit-log.md` exists;
- `.edits/chapter-tracker.md` exists;
- `.reports/chNN-final-review-*` exists;
- `.build/chNN-full-*.docx` exists;
- any `*-answers-*` files exist under `books/database-book/files/source`;
- obvious TODO/FIXME/TK markers exist;
- obvious raw local paths such as `G:\`, `C:\`, or `file:///` exist.

Do not write files during the status scan.

---

# Phase 1 — Recommend Next Step

After the status scan, recommend one next action.

Use these rules:

| Condition | Recommend |
|---|---|
| `core-concepts.md` missing or clearly unfinished | Edit/create main chapter with `chapter-editor` |
| Main chapter has many TODOs/comments | Main chapter cleanup with `chapter-editor` |
| Let's Build missing | Create/revise Let's Build with `lets-build-creator` |
| Lab missing | Create/revise lab with `lab-creation` |
| Terms Treasury missing or weak | Terms pass with `term-creator` |
| Review questions missing | Review/reflection pass with `reflection` |
| RAT missing | RAT pass with `rat-creator` |
| Image placeholders/raw image paths exist | Media inventory with `chapter-media-inventory` |
| Companions exist but may not align | Companion audit or `chapter-review-codex` dry run |
| No final-review report exists | Run `chapter-review-codex` |
| Final review exists and no blockers | Build DOCX with `chapter-docx-build` |
| DOCX exists and tracker is outdated | Update logs/tracker |
| User asks “what happened?” | Read/use `progress-update` |
| User asks “what remains?” | Read/use `edits` |
| User asks “where are we?” | Read/use `chapter-tracker` |

Recommendation format:

```markdown
## Recommended Next Step

Based on the current chapter state, I recommend:

**<recommended action>**

Reason:
- <short reason 1>
- <short reason 2>

Suggested skill:
`<skill-name>`
```

---

# Phase 2 — Interactive Menu

After the recommendation, show this menu and wait.

```markdown
## Chapter Command Center — chNN

What would you like to do?

1. **Tell me what to do next** — inspect status and recommend next step only
2. **Edit main chapter** — launch `chapter-editor`
3. **Quick polish main chapter** — launch `chapter-editor-light`
4. **Build or revise companions** — choose Let's Build / Lab / Terms / Review / RAT
5. **Handle media and figures** — inventory, place, optimize, or upload images
6. **Run final whole-package review** — launch `chapter-review-codex`
7. **Build DOCX** — launch `chapter-docx-build`
8. **Update operational records** — progress log, chapter edits, tracker
9. **Show chapter status** — read tracker, edit notes, reports, and build status
10. **Full guided production flow** — launch `chapter-production-flow`, if installed

Reply with a number, or describe what you want in plain English.
```

---

# Phase 3 — Route Selection

## Option 1 — Tell Me What To Do Next

Run only:

- status scan;
- recommendation;
- no edits;
- no logs unless the user asks.

## Option 2 — Edit Main Chapter

Recommend launching:

```text
chapter-editor
```

Target:

```text
core-concepts.md
```

Before launching, say:

```markdown
I recommend launching `chapter-editor` because the main chapter needs prose, structure, or comment cleanup.

Proceed? yes / no / choose another option
```

After completion, evaluate operational-record triggers.

## Option 3 — Quick Polish Main Chapter

Recommend launching:

```text
chapter-editor-light
```

Use only for grammar, clarity, and small prose polish.

Do not restructure the chapter deeply.

## Option 4 — Build or Revise Companions

Ask:

```markdown
Which companion should we work on?

1. Let's Build — `lets-build-creator`
2. Lab — `lab-creation`
3. Terms Treasury — `term-creator`
4. Review and Reflection — `reflection`
5. RAT — `rat-creator`
6. Audit all companions and recommend fixes
```

Route to the selected skill.

## Option 5 — Handle Media and Figures

Ask:

```markdown
What media task?

1. Inventory existing images — `chapter-media-inventory`
2. Plan/place images — `chapter-media`
3. Optimize/upload/rewrite image links — `image-link-optimizer`
4. Check captions, alt text, and figure numbering
5. Media dry run only
```

Rules:

- inventory before media writes;
- no optimization/upload/rewrite without explicit approval;
- never overwrite originals;
- record media provenance in `books/database-book/files/manifests/image-manifest.csv`.

## Option 6 — Final Whole-Package Review

Recommend launching:

```text
chapter-review-codex
```

Use this when the chapter package is near production-ready or when the user wants a complete package audit.

After final review:

- update `progress-update` if meaningful work happened;
- update `edits` if unresolved chapter-specific items remain;
- update `chapter-tracker` if status changed;
- recommend DOCX only if no blocking issues remain.

## Option 7 — Build DOCX

Recommend launching:

```text
chapter-docx-build
```

Before launching, confirm:

- final review exists, or the user explicitly wants a draft export;
- answer files are not included;
- navigation-only chapter index is excluded unless requested;
- reference DOCX/styling dependency is known or fallback is approved.

After DOCX:

- update `progress-update`;
- update `edits` if build issues remain;
- update `chapter-tracker`.

## Option 8 — Update Operational Records

Ask:

```markdown
What should I update?

1. Session history — `progress-update`
2. Chapter-specific unresolved notes — `edits`
3. Cross-chapter production status — `chapter-tracker`
4. All relevant records
```

Use the operational trigger rules below.

## Option 9 — Show Chapter Status

Read:

```text
books/database-book/.edits/edit-log.md
books/database-book/.edits/chNN-edits.md
books/database-book/.edits/chapter-tracker.md
books/database-book/.reports/chNN-*
chapter .build folder
```

Report:

```markdown
## Chapter NN Status

| Area | Status | Evidence | Recommended Next Step |
|---|---|---|---|
| Main chapter | ... | ... | ... |
| Companions | ... | ... | ... |
| Media | ... | ... | ... |
| Final review | ... | ... | ... |
| DOCX | ... | ... | ... |
| Blockers | ... | ... | ... |
```

No writes.

## Option 10 — Full Guided Production Flow

If installed, recommend launching:

```text
chapter-production-flow
```

If not installed, run the guided flow directly using one milestone at a time:

1. show current status;
2. recommend next step;
3. ask for approval;
4. delegate to the appropriate skill;
5. update operational records if approved;
6. stop before the next milestone.

Never run the whole production pipeline blindly.

---

# Operational Records Trigger Rules

The user should not need to remember when to update operational records.

At the end of every selected task, evaluate these triggers.

## Trigger 1 — `progress-update`

Use `progress-update` if meaningful work happened.

Examples:

- edited source files;
- generated or updated reports;
- ran final review;
- built DOCX;
- made a production decision;
- found a blocker.

Question:

```text
Did we do something future sessions should remember?
```

If yes, update:

```text
books/database-book/.edits/edit-log.md
```

## Trigger 2 — `edits`

Use `edits` if there are chapter-specific unresolved items.

Examples:

- unresolved author comments;
- deferred chapter content decisions;
- chapter-specific media issue;
- lab/RAT/terms issue;
- DOCX build blocker;
- “fix this later” items.

Question:

```text
Is there anything unresolved that belongs to this chapter?
```

If yes, update:

```text
books/database-book/.edits/chNN-edits.md
```

## Trigger 3 — `chapter-tracker`

Use `chapter-tracker` if the chapter’s production status changed.

Examples:

- main edit complete;
- companions complete;
- media reviewed;
- final review complete;
- DOCX built;
- chapter blocked;
- chapter unblocked.

Question:

```text
Did the chapter move forward, become blocked, or change status?
```

If yes, update:

```text
books/database-book/.edits/chapter-tracker.md
```

## Trigger 4 — `chapter-docx-build`

Use `chapter-docx-build` only if:

- the user selected DOCX; or
- final review is complete and the user approves DOCX; or
- the user explicitly asks for a draft DOCX.

Never run DOCX automatically after review.

---

# Approval Rules

Do not write files unless:

1. the user selected a write action; or
2. the user approved a proposed plan; or
3. the selected specialized skill's workflow includes the needed approval gate.

Always ask before:

- deleting/removing files;
- moving archived files;
- rewriting media paths;
- optimizing/uploading media;
- creating Cloudinary folders;
- writing manifests;
- building DOCX fallback without reference styling;
- running sync/deploy/publish/commit/push.

Never run automatically:

```text
chapter-sync
book-deploy
deploy
publish
commit
push
merge
```

---

# What To Say Before Launching Another Skill

Before routing, say:

```markdown
I recommend launching `<skill-name>` because <reason>.

Proceed? yes / no / choose another option
```

Then wait.

If the user already explicitly requested a skill, proceed to that skill's own preflight and approval process.

---

# Final Response Contract

At the end of a command-center run, respond:

```markdown
## Chapter Command Center — Result

**Chapter:** chNN  
**Selected action:** <option / plain-language action>  
**Recommended action:** <recommendation>  
**Skill launched:** <skill-name or none>  

### What happened
- ...

### Operational records
| Record | Updated? | Reason |
|---|---|---|
| `progress-update` | yes/no | ... |
| `edits` | yes/no | ... |
| `chapter-tracker` | yes/no | ... |

### Current status
| Area | Status | Next step |
|---|---|---|
| Main chapter | ... | ... |
| Companions | ... | ... |
| Media | ... | ... |
| Final review | ... | ... |
| DOCX | ... | ... |

### Next recommended step
- ...

Deployment run: no.
```

---

# Safety Rules

1. Use repo source as canonical.
2. Do not overwrite from Google Drive dated drafts.
3. Do not create dated files in repo source.
4. Do not leave answer files under `books/database-book/files/source`.
5. Do not run media side effects without dry-run approval.
6. Do not build DOCX without approval.
7. Do not deploy, publish, commit, push, merge, or run `book-deploy`.
8. Do not run `chapter-sync` unless explicitly requested as a separate import/sync task.
9. Do not duplicate final-review logic already owned by `chapter-review-codex`.
10. Do not duplicate specialized domain logic.
11. Do not claim completion if unresolved blockers remain.
12. When uncertain, recommend a read-only status scan first.
