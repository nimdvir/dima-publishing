---
name: chapter-editor-light
description: >
   Perform a light editorial pass on a BITM330 textbook chapter. Use when the goal is to polish
   grammar, clarity, flow, terminology, and obvious Markdown cleanup without restructuring,
   removing topics, or rewriting the author's voice. Add callouts only sparingly.
argument-hint: Chapter main file path to lightly edit (e.g., chapter-drafts/ch04-.../main/ch04-main-YYYY-MM-DD.md)
---

# BITM330 Light Chapter Edit

Use this skill when the goal is a **light edit** rather than a full developmental rewrite.

The purpose of a light edit is to improve readability, clarity, consistency, and polish while preserving the author's structure, voice, content, and instructional intent.

> The final result should feel like a cleaner version of the same chapter, not a new chapter.

If a full developmental pass is needed (restructuring, callout overhaul, image audit, build-readiness), use the `chapter-editor` skill instead.

---

## 1. Editing Philosophy

Perform a light editorial pass only.

Focus on:

- grammar;
- sentence clarity;
- awkward phrasing;
- small redundancies;
- transitions between nearby paragraphs;
- consistency of terminology;
- heading capitalization;
- Markdown cleanliness;
- obvious formatting problems;
- minor improvements to flow.

Do not perform a full rewrite unless explicitly asked.

The chapter should still feel like the author's chapter — only cleaner, clearer, and more polished.

---

## 2. Read the Whole Chapter First

Before editing, read the full main chapter file once to understand its instructional arc, recurring examples, terminology, and chapter-specific rhythm.

Do not begin editing paragraph by paragraph without first understanding:

- the chapter's main learning goal;
- the role of the Grading Database, PetVax, or other recurring examples;
- which terms are intentionally repeated for reinforcement;
- where the chapter introduces, practices, and summarizes core concepts.

After reading the full chapter, perform the light edit with the chapter's overall flow in mind. This prevents "fixing" repetition that is actually intentional scaffolding.

---

## 3. Preserve the Existing Structure

Do not reorganize the chapter unless the issue is very small and obvious.

Avoid:

- moving major sections;
- combining major sections;
- deleting whole topics;
- rewriting the chapter's architecture;
- changing the sequence of the learning arc;
- replacing examples with entirely new examples;
- adding new major concepts.

If a larger structural issue appears, flag it instead of fixing it silently:

```markdown
## Light Edit Note

This section may need a deeper structural revision later because [brief reason].
```

---

## 4. Preserve the Author's Voice

Keep the tone:

- clear;
- friendly;
- instructional;
- business-oriented;
- confident but approachable;
- suitable for undergraduate business students.

Do not make the prose overly academic, stiff, corporate, or generic. Avoid over-polishing. The textbook should sound like a thoughtful instructor explaining ideas clearly, not like a committee wrote it during a strategic planning retreat.

---

## 5. Fix Sentences, Not the Whole Argument

Improve sentences when they are:

- too long;
- repetitive;
- unclear;
- grammatically awkward;
- overly wordy;
- missing a clear subject or verb;
- using inconsistent terminology.

Prefer targeted edits over large rewrites.

**Before:**

```markdown
The database is important because it can be used by businesses and organizations in different ways and it can help them with information and decisions.
```

**After:**

```markdown
Databases matter because they help organizations organize information, answer questions, and make better decisions.
```

---

## 6. Handle Redundancy Lightly

Remove small redundancies when the same idea is repeated in nearby sentences or paragraphs.

Do not remove repeated ideas when they serve a teaching purpose, such as:

- previewing a concept;
- reinforcing a core learning arc;
- summarizing before a transition;
- reminding students of a key framework.

If repetition seems excessive but removing it would require restructuring the chapter, flag it instead of doing a major rewrite.

---

## 7. Maintain Technical Accuracy

Do not simplify technical content in a way that makes it less accurate.

When editing explanations of databases, SQL, relationships, analytics, tools, or information systems:

- preserve the technical meaning;
- keep definitions precise;
- avoid introducing new claims;
- do not change examples unless they are clearly confusing or incorrect;
- flag any technical uncertainty.

```markdown
## Technical Accuracy Note

This explanation may need review because [brief reason].
```

---

## 8. Use Callouts Sparingly

Add callout blocks only when they clearly improve student comprehension.

For a light edit, add **no more than 1–3 callouts per chapter**, unless the author specifically asks for more.

Use the canonical HTML callout format defined by the `call-out` skill. That skill is the single source of truth for callout classes, emoji labels, and headline rules. Do not restate the legend here, and do not use the older `:::callout` container syntax.

Expected structure:

```html
<div class="callout tip">
  <p><strong>💡 Tip: Write queries top-down</strong></p>
  <p>Pick the rows with <code>WHERE</code>, group with <code>GROUP BY</code>, then filter groups with <code>HAVING</code>.</p>
</div>
```

During a light edit, convert legacy callouts to this format when you encounter them:

- informal blockquote callouts (`> **💡 Key takeaway:** ...`);
- old `:::callout{type="..."}` containers;
- GitHub alerts (`> [!NOTE]`, `> [!WARNING]`);
- emoji-only notes.

For the right callout type, consult the `call-out` skill. Do not add callouts just to decorate the chapter, and do not stack them back-to-back.

---

## 9. Clean Up Obvious Markdown Problems

During a light edit, fix obvious Markdown issues such as:

- inconsistent heading levels;
- missing blank lines around headings;
- malformed lists;
- inconsistent bullet formatting;
- inconsistent emphasis;
- broken blockquote formatting;
- old informal callouts that should become canonical HTML callouts;
- duplicated figure numbers, duplicated captions, and inconsistent image caption style;
- accidental fragments such as leftover "com," "elaborate here," or duplicated captions.

Do not perform a full build audit unless requested.

If raw local image paths or unresolved comments appear, flag them rather than silently removing them:

```markdown
## Production Note

This chapter still contains raw local image paths or unresolved editing comments that should be cleaned before HTML conversion.
```

---

## 10. Check Page Breaks

Confirm page breaks are present and correctly placed. Use the canonical marker, placed **after** a complete block rather than before the next heading:

```html
<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
```

During a light edit:

- Confirm most substantial `##` sections begin on a fresh page (the previous section ends with a break). Skip the break after a very short bridge paragraph.
- Inside a long section, add an internal break after 2–3 related subsections, a major figure or table cluster, or roughly 900–1,200 words.
- Never split a heading from its opening text, an image from its caption, a table from its explanation, a callout, a code or SQL example, or a summary figure from its recap text.

This is a check-and-place pass, not a restructuring pass. If correct page-break placement would require reorganizing the chapter, flag it instead.

---

## 11. Check Figures Are Placed

Confirm every figure is actually placed and no planning artifacts remain.

- There should be **no leftover figure suggestions** (for example, `#### 🎨 Figure Suggestion` blocks).
- Each figure should have a caption and sit near its discussion.

If figure suggestions remain, or a referenced figure is missing, flag it for the image pipeline (`figure-suggestion` → `image-placement` → `image-link-optimizer`) rather than generating or placing images yourself:

```markdown
## Production Note

This chapter still has unresolved figure suggestions or missing figures. Run the image pipeline before HTML/PDF conversion.
```

---

## 12. Author Comments and TODOs

Address simple author comments when they can be resolved with light editing. Detect all forms: `//` lines (`// EDIT:`, `// TODO:`, `// NOTE:`, `// SIMPLIFY:`), HTML comments (`<!-- ... -->`), and bracketed notes like `[fix this]`.

Examples to resolve:

- "clarify this sentence"
- "make this smoother"
- "fix wording"
- "add transition"
- "make this less repetitive"

When a `//` comment is resolved, remove the `//` line.

Do not resolve comments that require major content decisions:

- "add a new section"
- "replace this example"
- "move this topic"
- "cut this section"
- "change the chapter structure"

For unresolved comments, preserve them and convert them to HTML comments if needed:

```markdown
<!-- VERIFY: Confirm this point before publication. -->
```

List unresolved comments in the Final Light Edit Report.

---

## 13. Do Not Expand Substantially

A light edit should not significantly increase chapter length.

Small additions are acceptable when needed for clarity:

- a transition sentence;
- a clarifying phrase;
- a short example;
- a brief callout;
- a sentence explaining why a concept matters.

Avoid adding long new paragraphs or new subsections.

If expansion seems necessary, flag it:

```markdown
## Expansion Note

This section may need more explanation, but expanding it would go beyond a light edit.
```

---

## 14. Companion File Policy and Sync Check

This skill edits the **main** chapter file only. Do not edit `lets-build`, `terms`, `rat`, `reflection`, or `lab` files. Never edit files under `ch##-sources/` or `sources/`. Preserve any companion references in the chapter text.

As part of the final pass, **review** the most recent dated companion files against the new main and check that they still match:

- `lets-build` — do the hands-on steps still match the main chapter's concepts, examples, and terminology?
- `reflection` — do the questions still map to the current sections?
- `terms` — are the key terms in the main chapter present and consistently named?
- `rat` — do the quiz items still reflect what the chapter now teaches?

Do not edit these files. Instead:

1. Flag any mismatch in the **Companion sync findings** part of the report.
2. Suggest the specific change needed (for example, "update Let's Build step 3 to use the renamed `OrderTotal` field").
3. Ask the author whether to update the affected companion, and which skill should do it (`lets-build-creator`, `reflection`, `term-creator`, `rat-creator`).

---

## 15. Output Safety and Dated Save

Never overwrite the original chapter file.

1. Source = the most recent dated file in the chapter's `main/` folder, unless the user named another.
2. Save the edited version as a new dated file in the same folder, using the constant naming pattern:

   ```
   chapter-drafts/chNN-<slug>/main/chNN-main-<YYYY-MM-DD>.md
   ```

   No `-light-edited`, `-light`, or `-v2` suffix. The date alone marks the version.
3. If a file for today's date already exists: minor follow-up → edit in place; major same-day re-edit → append `-1`, `-2`, etc.
4. Copy the full source into the new file, then apply all edits there. Leave the prior dated file untouched as version history.
5. Update the `date:` field in the YAML front matter if present.

---

## 16. Final Light Edit Report

After completing the light edit, return a short report:

```markdown
## Light Edit Report

### Output File
- `chNN-main-YYYY-MM-DD.md`

### Main Edits Made
- Improved sentence clarity and flow.
- Reduced minor repetition.
- Standardized terminology and formatting.
- Cleaned obvious Markdown issues.
- Added or adjusted page breaks where needed.

### Issues Flagged for Deeper Revision
- [Issue, if any]

### Author Decisions Needed
- [Decision, if any]

### Callouts Added or Converted
- [Type and location, if any]

### Companion Sync Findings
- [Companion file, mismatch, and suggested fix; or "All companions match."]

### Production Notes
- [Raw paths, unresolved comments, leftover figure suggestions, duplicated captions, or other cleanup issues, if any]
```

Keep the report short. The main deliverable is the edited chapter, not a long editorial memo.

---

## Editing Priorities

For a light edit, prioritize in this order:

1. Preserve the author's meaning.
2. Preserve the existing structure.
3. Improve clarity and readability.
4. Fix grammar and awkward phrasing.
5. Reduce small redundancies.
6. Standardize terminology and Markdown formatting.
7. Add only minimal clarifying text.
8. Add callouts only when genuinely helpful (1–3 max).
9. Flag deeper issues instead of solving them through major rewriting.

---

## Quick Reference — When to Use This Skill vs. `chapter-editor`

| Situation | Use |
|---|---|
| Chapter is mostly good; needs polish | `chapter-editor-light` |
| Grammar, flow, small redundancies, callout conversion | `chapter-editor-light` |
| Final polish before HTML/PDF conversion | `chapter-editor-light` |
| Restructuring, removing topics, image audit, build-readiness pass | `chapter-editor` |
| Outline coverage check, missing sections, major rewrites | `chapter-editor` |
| Converting legacy blockquote callouts only | either (light is faster) |

