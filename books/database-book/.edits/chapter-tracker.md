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
| Chapters | 07 | Ch07 editorial pass + companions + additions integration | · Decide on appendices (SQL/Access/Review) routing to companions vs main | · Extracted 15 slide images from PPTX · Renamed images with descriptive names · Created ch07-main-2026-06-16.md with YouTube video embed, canonical figure suggestions · Created ch07-images-manifest.md · Converted 9 figure suggestions to canonical format · Generated and placed 11 chapter figures · Created updated Let's Build from Ch08 content · Created updated Terms, Reflection, and RAT companions · Created lab companion | 2026-06-16 |

## Archive

<!-- markdownlint-disable MD060 -->
| Date       | Ch  | Summary                                                                                                                                                                                                  |
| ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-17 | 01  | Created ch01-main-2026-06-17.md: removed duplicate Chapter Roadmap, added Key Takeaways section, strengthened business performance framing |
| 2026-06-17 | 02  | Created ch02-main-2026-06-17.md: removed YAML frontmatter, removed duplicate Chapter Roadmap, added Why System Design Matters section, strengthened Ch3 bridge |
| 2026-06-17 | 03  | Created ch03-main-2026-06-17.md: removed duplicate Chapter Roadmap, added Tables: Rows/Columns/Rules and Schemas: Describing the Structure of Data H3 sections under Representing Data in Structured Systems |
| 2026-06-17 | 01  | Synced ch01 to platform: lets-build (06-17), lab-01-questions (06-03), regenerated index.md, wrote .sync-manifest.json |
| 2026-06-17 | 05  | First full sync of ch05 to platform: all 5 sections + lab-05-questions (06-16), regenerated index.md, wrote .sync-manifest.json |
| 2026-06-17 | 06  | Synced ch06 to platform: main (06-17), lets-build (06-17), deleted superseded 05-29 and 05-24, regenerated index.md |
| 2026-06-17 | 11  | First full sync of ch11 to platform: all 5 sections + lab-11-questions (05-22), regenerated index.md, wrote .sync-manifest.json |
| 2026-06-17 | —   | Fixed 9 corrupted lab index.md files (labs 01-07, 10, 14) — double UTF-8 encoding mojibake restored from clean questions files |
| 2026-06-17 | —   | Ran bookData.ts regeneration (reader-hybrid-v1.1): 18 chapters, 119 sections, 349 reader pages, 15 labs loaded |
| 2026-06-10 | —   | Verified v1.1 reader build, browser layout, favicon wiring, mobile on-this-page behavior, and removed dead `AiAssistant.tsx`                                                                             |
| 2026-06-10 | —   | Validated the source migration, confirmed no stale `.sync-manifest.json` files, removed answer-link leakage from migrated lab indexes, and taught the importer to sanitize lab answer references on copy |
<!-- markdownlint-enable MD060 -->
