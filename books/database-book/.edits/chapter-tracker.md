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
| Book Structure | — | Outline alignment and chapter structure audit | · Replace Ch14 GD main file (currently MS Learn, not Power BI) · Resolve Ch12 draft/source structural drift (BI→OLTP→ETL→DW vs BI→DW→ETL→OLAP) · Verify Ch16 main file completeness beyond 16.3 · Import missing companions from GD (Ch15 terms/reflection/rat, Ch13/14 reflection) · Fill in 5 placeholder Terms Treasury files (Ch6, Ch9, Ch11, Ch12, Ch13) · Complete missing RATs (Ch9, Ch10, Ch13) | · Fixed Ch9/Ch10 numbering swap across both repos · Created stub core-concepts.md for ch10, ch13, ch16 · Removed all Figures Index sections from chapters · Created comprehensive outline-2026-06-11.md · Created outline-2026-06-12.md with corrected Ch9/Ch10 titles · Ran full 17-chapter structural audit against outline · Created 9 per-chapter edit files in dima-pub + matching GD .edits files · Updated cross-references, book.yml, registry, image folders | 2026-06-13 |

## Archive

<!-- markdownlint-disable MD060 -->
| Date       | Ch  | Summary                                                                                                                                                                                                  |
| ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-10 | —   | Verified v1.1 reader build, browser layout, favicon wiring, mobile on-this-page behavior, and removed dead `AiAssistant.tsx`                                                                             |
| 2026-06-10 | —   | Validated the source migration, confirmed no stale `.sync-manifest.json` files, removed answer-link leakage from migrated lab indexes, and taught the importer to sanitize lab answer references on copy |
<!-- markdownlint-enable MD060 -->
