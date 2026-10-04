# Figure Markdown Standards

Standards for figure blocks, alt text, captions, figure numbering, and image filenames used by the `image-placement` skill.

---

## Standard Figure Format

```markdown
![Alt text](.images/figure-NN.X-short-slug.png)

*Figure NN.X — Caption text.*
```

Example:

```markdown
![Workflow showing data moving from tables to queries and dashboards](.images/figure-01.1-data-to-decisions.png)

*Figure 1.1 — The book's central arc from raw data to business decisions.*
```

---

## Alt Text Rules

Alt text should be:

- concise;
- descriptive;
- useful for accessibility;
- not identical to the caption;
- focused on what the image shows;
- free of phrases like "image of" or "picture of" unless needed for clarity.

Good examples:

```markdown
![Workflow showing data moving from raw records to analytics and decisions](.images/figure-01.1-data-to-decisions.png)
![Crow's Foot relationship diagram connecting students, deliverables, and grades](.images/figure-06.2-grading-relationships.png)
```

Avoid weak alt text:

```markdown
![Image](...)
![Diagram](...)
![Figure 1](...)
```

---

## Caption Rules

Captions should:

- begin with `Figure NN.X —`;
- explain the instructional purpose of the figure;
- be written in sentence case;
- avoid full prompt language;
- avoid generation instructions;
- avoid style details such as color palette, aspect ratio, or "modern flat design."

Good example:

```markdown
*Figure 6.2 — The Grading Database uses relationships to connect students, deliverables, and scores into one queryable system.*
```

---

## Figure Numbering Rules

Use chapter-based numbering: `Figure 1.1, Figure 1.2, Figure 2.1, Figure 14.3`.

- If existing figure numbers already exist, continue from the highest number.
- Do not duplicate figure numbers.
- If a file already has a figure number in its filename, preserve it unless it conflicts with existing numbering.

---

## Image Naming Convention

Use:

```text
figure-NN.X-short-slug.ext
```

Examples:

```text
figure-01.1-data-to-decisions.png
figure-04.2-database-vs-spreadsheet.png
figure-12.4-star-schema-grading-database.png
figure-14.3-powerbi-dashboard-layout.png
```

Rules:

- use lowercase;
- use hyphens, not spaces;
- include chapter number and figure number;
- keep names short but meaningful;
- preserve the correct extension unless conversion is approved.
