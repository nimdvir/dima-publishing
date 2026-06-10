# BITM330 Chapter Tracker

**Tracker file:** `books/database-book/.edits/chapter-tracker.md`

---

## Active

The Active table is a single flat table with a **Category** column. Categories
are:

- **Chapters** — chapter main manuscripts (Ch column contains chapter number)
- **Skills** — `.agents/skills/` SKILL.md files
- **Images** — figure generation and placement tasks
- **Build** — DOCX build scripts and outputs
- **Book Structure** — Let's Build outlines, Labs section, TOC
- **General** — quality audits, configuration files, cross-cutting tasks

For non-chapter rows, the Ch column is `—`.

| Category | Ch  | Task | Next | Done | Updated |
| -------- | --- | ---- | ---- | ---- | ------- |

| Build | — | Formal build provenance | · Run formal reader, DOCX, EPUB, and PDF builds · Write `files/manifests/build-manifest.json` |  | 2026-06-10 |
| Book Structure | — | Repo edit tracking rollout | · Keep `books/database-book/.edits/edit-log.md` updated for each session · Use `chapter-tracker.md` for book-level tasks |  | 2026-06-10 |

## Archive

<!-- markdownlint-disable MD060 -->
| Date       | Ch  | Summary                                                                                                                      |
| ---------- | --- | ---------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-10 | —   | Verified v1.1 reader build, browser layout, favicon wiring, mobile on-this-page behavior, and removed dead `AiAssistant.tsx` |
| 2026-06-10 | —   | Validated the source migration, confirmed no stale `.sync-manifest.json` files, removed answer-link leakage from migrated lab indexes, and taught the importer to sanitize lab answer references on copy |
<!-- markdownlint-enable MD060 -->
