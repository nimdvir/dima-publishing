---
name: call-out
description: >
  Create standardized HTML callout blocks in BITM330 chapter Markdown using the
  canonical emoji legend (Tip, Note, Important, Warning, Caution, Good Practice, Avoid,
  Info, Example, Question, Definition, Discipline Definition, Term, Concept, Key Takeaway,
  Business Insight). Use when: inserting a callout into a chapter; converting plain
  emphasis, emoji-only notes, blockquotes, GitHub alerts, or ad-hoc admonitions to the
  canonical HTML callout style; auditing a chapter for inconsistent callout formatting;
  or choosing the right callout type for a piece of guidance, definition, example,
  question, warning, or business insight.
argument-hint: Callout type (business-insight, tip, note, important, warning, caution, good-practice, avoid, info, example, question, definition, discipline-definition, term, concept, key-takeaway), headline, and short body text; or the chapter/section to audit.
---

# Callout Skill

Create canonical HTML callout blocks in BITM330 Markdown files.

The Markdown files are intended to be converted to HTML, so callouts should use semantic `<div>` blocks with reusable CSS classes. Every callout must begin with an emoji, a bold callout label, and a bold headline. The short callout text appears below the headline inside the same `<div>`.

Use one emoji marker per cognitive signal. Never stack emojis.

## When To Use

Use this skill when:

- Adding a callout, admonition, sidebar, note, warning, example, definition, or instructional highlight in a chapter, companion file, lab, or slide.
- Converting legacy or ad-hoc emphasis to the canonical callout style.
- Replacing emoji-only callouts with HTML callout blocks.
- Replacing blockquotes used as admonitions.
- Replacing GitHub alert syntax such as `> [!NOTE]` or `> [!WARNING]`.
- Replacing repeated inline HTML styles with reusable CSS class-based callouts.
- Auditing a chapter for inconsistent or duplicated callout markers.
- Choosing the right callout type for a definition, warning, recommendation, example, reflection question, or business insight.

## Core Output Rule

Use this structure:

```html
<div class="callout type">
  <p><strong>EMOJI Label: Headline</strong></p>
  <p>Short callout text.</p>
</div>
```

Do not use inline styles such as:

```html
<div style="background-color: #e8f4f8; padding: 1em;">
```

Use canonical CSS classes instead.

## CSS Location

The callout skill should not insert CSS into chapter Markdown files.

Callout styling belongs in the live book repository:

`_static/call-outs.css`

The live book's `_config.yml` should load the stylesheet with:

```yaml
html:
  extra_css:
    - _static/call-outs.css
```

If the project later uses multiple CSS files, keep callout-specific styles in `call-outs.css` and place other styles in separate files such as `tables.css`, `figures.css`, or `print.css`.

## Canonical Emoji Legend

| Purpose | Class | Emoji | Label | Use For |
|---------|-------|-------|-------|---------|
| Business Insight | `business-insight` | 📊 | Business Insight | Managerial implication, business value, decision-making connection |
| Tip | `tip` | 💡 | Tip | Practical advice, heuristics |
| Note | `note` | 📝 | Note | Side remarks, clarifications |
| Important | `important` | ❗ | Important | High-priority attention |
| Warning | `warning` | ⚠️ | Warning | Potential risk, error, or failure |
| Caution | `caution` | 🚧 | Caution | Conditional or situational risk |
| Good Practice | `good-practice` | ✅ | Good Practice | Recommended behavior |
| Avoid | `avoid` | ❌ | Avoid | Anti-patterns, common mistakes |
| Info | `info` | ℹ️ | Info | Contextual explanation |
| Example | `example` | 🧪 | Example | Applied or experimental illustration |
| Question | `question` | ❓ | Question | Reflection or discussion prompt |
| Definition | `definition` | 📖 | Definition | Clean, generally understood definition |
| Discipline Definition | `discipline-definition` | 📘 | Definition | Discipline-specific definition |
| Term | `term` | 🏷️ | Term | Vocabulary, nomenclature |
| Concept | `concept` | 🧠 | Concept | Abstract or theory-level idea |
| Key Takeaway | `key-takeaway` | 🔑 | Key Takeaway | Long-term retention anchor |

## Definition Sub-Distinctions

Use the definition-related callouts carefully:

- 📖 `definition` — *What does this word mean?* Use for general definitions.
- 📘 `discipline-definition` — *What does this mean in this discipline?* Use for technical, database, SQL, analytics, or MIS-specific definitions.
- 🏷️ `term` — *This is a label readers will see again.* Use for vocabulary, commands, filenames, tools, and nomenclature.
- 🧠 `concept` — *This is a conceptual model or theory.* Use for abstract ideas or mental models.

## Required HTML Format

Every callout must use:

1. A `<div>` with two classes: the base class `callout` and the callout type class (e.g., `tip`, `warning`, `business-insight`).
2. A first paragraph with the emoji, the callout label, and a short headline, all inside `<strong>`.
3. A short body below the headline inside the same `<div>`.

Preferred structure:

```html
<div class="callout business-insight">
  <p><strong>📊 Business Insight: Data supports better decisions</strong></p>
  <p>Data becomes useful when it helps a manager choose an action, evaluate a result, or improve a process.</p>
</div>
```

## Headline Rules

The bold first line must include a short headline, not only the callout label.

Use:

```html
<p><strong>💡 Tip: Write queries top-down</strong></p>
```

Do not use:

```html
<p><strong>💡 Tip:</strong></p>
```

The headline should be:

- Short
- Concrete
- Student-friendly
- Written in sentence case
- Directly related to the body text

## Canonical Examples

### Business Insight

```html
<div class="callout business-insight">
  <p><strong>📊 Business Insight: Data supports better decisions</strong></p>
  <p>Data becomes useful when it helps a manager choose an action, evaluate a result, or improve a process.</p>
</div>
```

### Tip

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

### Note

```html
<div class="callout note">
  <p><strong>📝 Note: Foreign keys are not business rules</strong></p>
  <p>Foreign keys help preserve relationships between tables, but they do not enforce every rule a business may need.</p>
</div>
```

### Important

```html
<div class="callout important">
  <p><strong>❗ Important: Back up before changing structure</strong></p>
  <p>Always back up a database before running schema changes such as creating, dropping, or altering tables.</p>
</div>
```

### Warning

```html
<div class="callout warning">
  <p><strong>⚠️ Warning: DROP TABLE is destructive</strong></p>
  <p><code>DROP TABLE</code> removes an entire table and usually cannot be undone without a backup.</p>
</div>
```

### Caution

```html
<div class="callout caution">
  <p><strong>🚧 Caution: Missing join conditions multiply rows</strong></p>
  <p>A <code>JOIN</code> without an <code>ON</code> condition can produce a Cartesian product.</p>
</div>
```

### Good Practice

```html
<div class="callout good-practice">
  <p><strong>✅ Good Practice: Name keys consistently</strong></p>
  <p>Use predictable names such as <code>StudentID</code>, <code>CourseID</code>, and <code>AssignmentID</code> so relationships are easier to read.</p>
</div>
```

### Avoid

```html
<div class="callout avoid">
  <p><strong>❌ Avoid: Do not store dates as free text</strong></p>
  <p>Use a proper date field whenever possible so the database can sort, filter, and compare dates correctly.</p>
</div>
```

### Info

```html
<div class="callout info">
  <p><strong>ℹ️ Info: SQLite uses dynamic typing</strong></p>
  <p>SQLite allows flexibility in stored values, but you should still design fields with clear intended data types.</p>
</div>
```

### Example

```html
<div class="callout example">
  <p><strong>🧪 Example: Count customers from California</strong></p>
  <p><code>SELECT COUNT(*) FROM customers WHERE state = 'CA';</code></p>
</div>
```

### Question

```html
<div class="callout question">
  <p><strong>❓ Question: Which products generate the most revenue?</strong></p>
  <p>What query would return the top three products by total sales?</p>
</div>
```

### Definition

```html
<div class="callout definition">
  <p><strong>📖 Definition: Repository</strong></p>
  <p>A repository is a structured directory that stores files and their version history.</p>
</div>
```

### Discipline Definition

```html
<div class="callout discipline-definition">
  <p><strong>📘 Definition: Repository in Git</strong></p>
  <p>In Git, a repository is a versioned database that tracks changes through commits.</p>
</div>
```

### Term

```html
<div class="callout term">
  <p><strong>🏷️ Term: origin</strong></p>
  <p><code>origin</code> is the default name of the primary remote repository in many Git workflows.</p>
</div>
```

### Concept

```html
<div class="callout concept">
  <p><strong>🧠 Concept: Version control separates states over time</strong></p>
  <p>Version control lets you distinguish the current working state from earlier saved states.</p>
</div>
```

### Key Takeaway

```html
<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Git is not just a backup tool</strong></p>
  <p>Git is a versioned system of record that helps explain how a project changed over time.</p>
</div>
```

## Multi-Line Callouts

Use lists only when the list is short and directly supports the headline.

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

For Markdown conversion, use HTML list tags inside the callout instead of raw Markdown list syntax. This avoids renderer ambiguity inside HTML blocks.

## Callout Discipline: Less Is More

Callouts work because they interrupt the flow. If every paragraph has a callout next to it, nothing stands out — the reader learns to skip them. Use callouts to highlight what matters most, not to decorate every point.

### Density Rules

- **One callout per ~150 words of body text** in the same section. If a section is 300 words, it should have at most two callouts.
- **No more than 3–5 callouts per major section** (H2). A section with 8 callouts is cluttered; rewrite half of them into body prose.
- **No more than ~8–12 callouts per full chapter** (main file). If you exceed this, audit for callouts that could be absorbed into the narrative.
- **No back-to-back callouts.** Two callouts in a row signal that at least one should be prose. The only exception is when each serves a clearly different cognitive purpose (e.g., a Definition followed by a Warning).

### Placement Rules

- Place callouts **after** the paragraph that introduces the idea, not before. The callout reinforces — it does not introduce.
- Do not open a section with a callout. Start with prose, then use a callout to punctuate the key point.
- Do not end a section with a callout unless it is a Key Takeaway or Business Insight that summarizes the section.
- Spread callouts across the section. Three callouts in the first half and zero in the second half means the distribution is off.

### What Belongs in a Callout vs. Body Text

**Use a callout when:**

- The reader must not miss this point (Warning, Important, Caution).
- The point is a standalone nugget that benefits from visual separation (Tip, Good Practice, Avoid).
- You are introducing formal vocabulary (Definition, Discipline Definition, Term).
- You want the reader to pause and reflect (Question, Key Takeaway, Business Insight).

**Keep in body text when:**

- The point is part of the main argument or explanation flow.
- The information only makes sense in sequence with surrounding paragraphs.
- You are simply restating or summarizing what was just said.
- The point is interesting but not critical — do not promote trivia to a callout.

### Signs of Callout Overuse

- The chapter feels like a list of colored boxes with thin prose between them.
- Multiple callouts of the same type appear in the same section (e.g., three Tips in a row).
- Callouts repeat information already stated in the body text.
- Removing a callout would not reduce the reader's understanding.

When in doubt, write it as prose. You can always promote a sentence to a callout later; demoting a callout back to prose is harder to remember.

## Style Rules

1. Use exactly one emoji marker per callout.
2. Do not stack emojis.
3. Use the canonical emoji for the selected callout class.
4. Use the canonical label for the selected callout class.
5. The emoji, label, and headline must all appear in the first bold line.
6. The body text must appear below the bold headline inside the same `<div>`.
7. Choose the callout type by instructional purpose, not by preferred color.
8. Keep most callouts to 1–4 short lines.
9. No callout should exceed ~4 short lines without justification.
10. Do not use inline styles in Markdown unless the user explicitly asks.
11. Use `<code>` tags for short code, SQL keywords, table names, field names, filenames, and commands inside HTML callouts.
12. Use plain, direct, student-friendly language.
13. Do not use callouts as decoration. A callout must signal instructional importance.

## Accessibility Rules

- Do not rely on color alone to communicate meaning.
- The emoji is helpful, but the label and headline must communicate the callout purpose without depending on color or emoji.
- Keep the label meaningful, such as `Warning`, `Tip`, `Business Insight`, or `Key Takeaway`.
- Keep body text concise.
- Avoid decorative-only emoji.
- Ensure CSS has sufficient color contrast.
- Do not place large tables inside callouts.
- Do not use images of text inside callouts.

## When To Convert Existing Content

Convert to a canonical HTML callout when chapter Markdown contains:

- Emoji-only callouts.
- Bold-only lines used as warnings, tips, notes, or takeaways.
- Blockquotes used as admonitions.
- GitHub alert syntax such as `> [!NOTE]` or `> [!WARNING]`.
- Repeated inline HTML styles.
- Inconsistent callout labels.
- Mixed callout systems in the same chapter.

Choose the new callout class by purpose, not by the original formatting.

## Conversion Examples

### Emoji Callout to HTML Callout

Before:

```markdown
💡 **Tip:** Save query results to a CSV before you start cleaning them.
```

After:

```html
<div class="callout tip">
  <p><strong>💡 Tip: Save query results before cleaning</strong></p>
  <p>Export query results to a CSV before making changes so you can return to the original result set if needed.</p>
</div>
```

### Blockquote to HTML Callout

Before:

```markdown
> **Warning:** `DROP TABLE` permanently removes a table.
```

After:

```html
<div class="callout warning">
  <p><strong>⚠️ Warning: DROP TABLE permanently removes a table</strong></p>
  <p><code>DROP TABLE</code> deletes the table structure and its data, so use it only when you are certain.</p>
</div>
```

### GitHub Alert to HTML Callout

Before:

```markdown
> [!NOTE]
> Foreign keys help connect tables, but they do not explain why the relationship matters.
```

After:

```html
<div class="callout note">
  <p><strong>📝 Note: Foreign keys connect tables</strong></p>
  <p>Foreign keys help connect tables, but they do not explain why the relationship matters.</p>
</div>
```

### Inline Style to Class-Based Callout

Before:

```html
<div style="background-color: #e8f4f8; padding: 1em;">
  <strong>Business Insight:</strong> Data becomes useful when it supports a decision.
</div>
```

After:

```html
<div class="callout business-insight">
  <p><strong>📊 Business Insight: Data becomes useful when it supports a decision</strong></p>
  <p>Data is most valuable when it helps a manager choose an action, evaluate a result, or improve a process.</p>
</div>
```

## Audit Checklist

When auditing a chapter:

- [ ] Every callout uses `<div class="callout type">`.
- [ ] Every callout uses exactly one canonical class from the legend.
- [ ] Every callout uses exactly one canonical emoji from the legend.
- [ ] No emoji stacking is used.
- [ ] The bold first line includes the emoji, label, and headline.
- [ ] The callout body appears below the bold headline inside the same `<div>`.
- [ ] The label matches the class and emoji.
- [ ] Definitions use the right sub-distinction: `definition`, `discipline-definition`, `term`, or `concept`.
- [ ] Code terms inside HTML callouts use `<code>`.
- [ ] No callout relies only on color, emoji, or visual styling.
- [ ] No repeated inline styles are used.
- [ ] No more than one callout appears per ~150 words of body text in the same section.
- [ ] No more than 3–5 callouts per major section (H2).
- [ ] No more than ~8–12 callouts per full chapter main file.
- [ ] No callout exceeds ~4 short lines without justification.
- [ ] No back-to-back callouts unless each serves a clearly different purpose.
- [ ] No section opens with a callout — prose comes first.
- [ ] Callouts appear after the paragraph that introduces the idea, not before.
- [ ] No callout duplicates information already in the body text.
- [ ] Callouts are distributed across sections, not clustered in one area.
