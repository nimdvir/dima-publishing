---
name: chapter-docx-build
description: >
  Build one BITM330 chapter into a single DOCX by combining the latest dated Markdown from the
  chapter's part folders (main, lets-build, reflection, terms, rat) in a fixed order using Pandoc
  with the repository reference document. Use when: producing a chapter DOCX for review; compiling
  the most recent chapter parts into one file; preparing a chapter for sharing or printing.
argument-hint: Chapter number or chapter folder path (for example, "5" or "BITM330-Book-draft/chapter-drafts/ch05-sql")
---

# BITM330 Chapter DOCX Build Skill

Use this skill when you need one compiled DOCX for a BITM330 chapter.

## Inputs

- Chapter number such as `5` or `05`, or a full chapter folder path such as `BITM330-Book-draft/chapter-drafts/ch05-sql`.
- Optional build date if the output should not use today's date.

## Output

- Save the DOCX in the chapter's `.build` folder.
- File name format: `ch<NN>-<YYYY-MM-DD>.docx`.
- Example: `BITM330-Book-draft/chapter-drafts/ch05-sql/.build/ch05-2026-05-06.docx`.

## Source Selection

- Read chapter folders in this order: `main`, `lets-build`, `reflection`, `terms`, `rat`.
- In each folder, select the most recent Markdown file using the newest `YYYY-MM-DD` date in the filename.
- If a folder has no dated Markdown files, fall back to the most recently modified `.md` file.
- Skip folders with no Markdown files and report the skip.

## Compile Rules

- Build one combined temporary Markdown file, then convert it to DOCX with `pandoc`.
- Insert section headings in this order: `Main`, `Let's Build`, `Reflection Questions`, `Terms`, `RAT`.
- Remove each source file's leading YAML front matter before combining.
- Remove each source file's first top-level heading before combining so the compiled document does not duplicate titles.
- Keep the chapter summary inside the selected `main` file. There is no separate `summary` folder.

## Style Reference

- Use this reference document exactly: `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.docs\.styles\reference-2026-03-18.docx`.
- Pass it to Pandoc with `--reference-doc`.

## Command

Run from the repository root:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File ./scripts/build-chapter-docx.ps1 -ChapterNumber 5
```

Or pass the chapter path directly:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File ./scripts/build-chapter-docx.ps1 -ChapterPath "BITM330-Book-draft/chapter-drafts/ch05-sql"
```

## Validation

- Confirm the target `.docx` file was created in `.build`.
- If Pandoc reports missing resources, rerun after checking image paths in the selected source files.
- Do not overwrite the Markdown sources during the build.
