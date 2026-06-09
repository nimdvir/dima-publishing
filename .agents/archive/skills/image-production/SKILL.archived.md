<!-- GENERATED-ARCHIVE: Do not use as active instructions.
status: archived
superseded_by: null
archive_reason: Historical implementation retained for reference
-->---
name: image-production
description: >
  Standardize, optimize, and document images for a BITM330 chapter. Use when: standardizing
  existing image references in a chapter main file; preparing chapter images for production;
  optimizing and copying images into the chapter-local .images folder; generating an image
  production report. Delegates new image idea generation to the image-suggestion skill.
argument-hint: Chapter number, chapter folder, or main file path (for example, "ch05" or "chapter-drafts/ch05-sql/main/ch05-main-2026-05-19.md")
---

# BITM330 Image Production

**Book:** *Using Data to Drive Business Performance: Databases and Management Information Systems*

This skill orchestrates the image production workflow for one chapter at a time: it standardizes existing image references in the main chapter file, optionally scans image folders for additional visuals, and only after explicit approval prepares selected images for production by optimizing them, copying them into the chapter-local `.images` folder, updating Markdown links, and producing a report.

This skill does **not** generate new image ideas. For adding image suggestions to a chapter, use the `image-suggestion` skill.

---

## Scope

Use this skill for the **main chapter file only**.

Do not use it for Let's Build, Terms, Reflection, RAT/quiz, Lab, review, scratch, or archived files. If the user gives an explicit main file path, use it. Otherwise locate the latest dated `chNN-main-*.md` file under the chapter's `main/` folder.

---

## Support Files

This skill is split across four files. Read each support file before executing the corresponding phase.

- `figure-markdown-standards.md` — figure block format, alt-text rules, caption rules, figure numbering, naming convention. **Read before executing Phase 1.**
- `folder-scanning-rules.md` — chapter-local and global `.images` folder scanning rules and planning-file handling. **Read before executing Phase 3.**
- `image-production-rules.md` — optimization rules, format choice, GIF handling, preservation rules, ImageMagick/Pillow methods, verification checklist, and production report template. **Read before executing Phase 7.**

---

## Critical Workflow Rule

Only **Phase 1: Standardize Existing Image References** may be performed automatically.

All later phases require explicit user approval before proceeding.

The agent must ask before:

- scanning the chapter-local `.images` folder;
- scanning the global `.images` folder;
- reading `.md`, `.csv`, or `.txt` image-planning files;
- suggesting additional image placements (delegate idea generation to the `image-suggestion` skill);
- inserting additional visuals;
- copying images;
- optimizing images;
- renaming images;
- converting image formats;
- updating production paths;
- creating a production report.

---

## Approval Gates

### Gate 1 — Automatic
Complete Phase 1 only: standardize image references already present in the chapter file.

### Gate 2 — Ask Before Folder Scanning
Ask:

```markdown
I standardized the existing image references. Would you like me to scan available image folders for additional images, caption notes, or image-planning files that may fit this chapter?
```

### Gate 3 — Ask Before Inserting Additional Images
After surfacing possible placements (or delegating fresh ideas to `image-suggestion`), ask:

```markdown
Would you like me to insert any of these suggested images into the chapter?
```

### Gate 4 — Ask Before Production
Before optimizing, copying, renaming, or updating production links, ask:

```markdown
Are you ready to move this chapter's images into production?
```

Proceed only if the user clearly confirms.

---

# Phase 1: Standardize Existing Image References (Automatic)

**Before executing Phase 1, read `figure-markdown-standards.md`.**

## Source File Selection

1. Go to the relevant chapter folder under `BITM330-Book-draft/chapter-drafts/`.
2. Identify the most updated main chapter Markdown file. Prefer files named like `chNN-main.md`, `chNN-main-YYYY-MM-DD.md`, `chNN-main-edited-YYYY-MM-DD.md`, or `chNN-main-rewritten-YYYY-MM-DD.md`.
3. Do not use files inside `.images`.
4. Do not use image-ideas files, production reports, review files, companion files, scratch files, or old drafts unless the user explicitly asks.
5. If multiple main files exist, use the most recently dated main file.
6. If the chapter folder is ambiguous, ask for the correct folder or file.

## Scan for Existing Visual References

Scan the chapter for image references and image-related notes in all common formats:

- Markdown image links: `![Alt](path/to/image.png)`
- Bare image URLs: `https://example.com/image.png`
- Local file paths: `../../images/example.png`, `.images/example.png`, absolute Windows paths
- Bracket placeholders: `[Image: figure-01.1-example.png]`
- Caption lines: `Caption: ...`
- HTML image tags: `<img src="..." alt="...">`
- Markdown comments: `<!-- Figure suggestion: ... -->`, `<!-- Image: ... -->`, `<!-- Caption: ... -->`
- Code-style comments: `// Figure suggestion: ...`, `// Image: ...`, `// Caption: ...`, `// file: .images/...`
- Existing prompt blocks, old caption notes, figure inventories, and visual planning comments

## Dry-Run Fallback

If the chapter file is not under version control, OR if the file contains many ambiguous references (mixed informal placeholders, broken paths, or conflicting figure numbers), emit a dry-run summary listing each reference and the proposed standardized form, and ask for confirmation before editing. Otherwise apply the standardization directly.

## What to Standardize

When an existing reference includes an actual image path, filename, or URL, convert it to the standard format defined in `figure-markdown-standards.md`. If a comment contains only an image idea but no actual file path or URL, do not invent an image link — preserve the idea as a visual note or flag it in the report for later placement.

---

# Phase 2: Ask Whether to Scan Image Folders

Use the prompt under Gate 2. Do not proceed without approval.

---

# Phase 3: Optional Folder Scanning

**Before executing Phase 3, read `folder-scanning-rules.md`.**

Only after user approval, scan the chapter-local `.images` folder and/or the global `.images` folder per the rules in that file. Do not delete, move, rename, optimize, or insert anything during the scan — only report what is available and where it might fit.

---

# Phase 4: Suggest Additional Visual Placements

Surface candidates found during scanning using the format documented in `folder-scanning-rules.md`. For brand-new image ideas not already present in any folder, delegate to the `image-suggestion` skill rather than inventing them here.

---

# Phase 5: Insert Approved Additional Images

When the user approves specific images, insert them into the chapter using the standard figure format from `figure-markdown-standards.md`.

- If the image is already in the chapter-local `.images` folder, use `.images/filename.ext`.
- If the image is outside the chapter-local `.images` folder, use the current temporary path; it will be copied and updated during production.
- Do not delete existing images or captions.
- Do not overwrite a human-authored caption unless the new caption is clearly better and preserves the intended meaning.

---

# Phase 6: Ask Before Production

Use the prompt under Gate 4. Do not proceed without confirmation.

---

# Phase 7: Production

**Before executing Phase 7, read `image-production-rules.md`.**

Production means: optimizing dimensions, compressing files, converting formats where appropriate, copying images into the chapter-local `.images` folder, renaming files safely, replacing original links with `.images/...` links, updating chapter Markdown paths, and generating the production report. Follow `image-production-rules.md` for every step, including the verification checklist and report template.

---

# Final Response to User

After Phase 1 only:

```markdown
Done — I standardized the existing image references in the Chapter NN main file.

- Source chapter: `chNN-main-...-YYYY-MM-DD.md`
- Existing references standardized: X
- Existing captions preserved or standardized: X
- Existing images deleted: 0

Would you like me to scan the chapter-local `.images` folder and/or the global `.images` folder for additional visuals or image-planning notes?
```

After folder scan:

```markdown
Done — I scanned the approved image folder(s) and found X potentially useful visuals or image notes.

Would you like me to insert any of the suggested images into the chapter?
```

After production:

```markdown
Done — I completed the Chapter NN image production workflow.

- Source chapter: `chNN-main-...-YYYY-MM-DD.md`
- Existing image references standardized: X
- Additional images inserted: X
- Images optimized and copied to local `.images`: X
- Chapter links updated: X
- Production report: `.images/chNN-image-production-report-YYYY-MM-DD.md`
- Existing image files were preserved; I did not delete anything.
```

---

# Safety and Preservation Rules

- Never delete existing images.
- Never overwrite existing image files.
- Never modify source images.
- Never remove captions unless converting them into the standardized caption format.
- Never replace a human-authored caption with a weaker auto-generated one.
- Never use absolute Windows paths in the final Markdown chapter.
- Never move original global images; copy them.
- Always use collision-safe naming.
- Always verify outputs.
- Always report results.
- Ask before scanning additional folders.
- Ask before inserting additional visuals.
- Ask before production.
