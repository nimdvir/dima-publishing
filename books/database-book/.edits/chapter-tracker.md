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

| General | — | v1.1 reader verification | · Run generate/lint/build in `platform-pilots/reader-hybrid-v1.1/` · Verify hero motion, reader width, OTP highlight, mobile On this page, and favicon wiring · Quarantine dead `AiAssistant.tsx` if it remains unrouted |  | 2026-06-10 |
| General | — | Source migration validation | · Verify stable chapter and lab files against `source-import-manifest.csv` · Check for answer leakage, missing sections, and raw Windows paths · Confirm stale `.sync-manifest.json` cleanup |  | 2026-06-10 |
| Build | — | Formal build provenance | · Run formal reader, DOCX, EPUB, and PDF builds · Write `files/manifests/build-manifest.json` |  | 2026-06-10 |
| Book Structure | — | Repo edit tracking rollout | · Keep `books/database-book/.edits/edit-log.md` updated for each session · Use `chapter-tracker.md` for book-level tasks |  | 2026-06-10 |

## Archive

| Date | Ch  | Summary |
| ---- | --- | ------- |
