# Skills Audit — 2026-05-21

Working document for Phase D of the image-production migration plan. One row per file in `.docs/.skills/` (excluding `archive-skills/` and `old/`). Recommendations are proposals — each Promote / Merge / Repackage action remains its own approval gate. Do not execute without confirmation.

## Legend

- **Promote** — has clean frontmatter and a bounded job; ready to move to `.github/skills/<slug>/SKILL.md` largely as-is.
- **Merge-then-promote** — substantive content, but overlaps an existing or planned live skill; mine into that skill rather than promote standalone.
- **Repackage** — concept is live-ready but format/location needs fixing (e.g., loose file in `.github/skills/`).
- **Reference-only** — keep in `.docs/.skills/` as draft/reference; not invokable.
- **Archive** — move to `.docs/.skills/archive-skills/` or `.docs/.skills/old/`. Includes chat exports, duplicates, superseded drafts, and zero-byte stubs.
- **Hold** — needs a small decision or rework before classification is firm.

## Active live skills (reference; do not touch in Phase D)

`chapter-editor`, `chapter-editor-light`, `chapter-tracker`, `edits`, `image-suggestion`, `image-production` (new).

---

## Audit Table — `.docs/.skills/`

| # | File | Size / Date | Recommendation | Target / Notes |
|--:|------|------------:|----------------|----------------|
| 1 | `reflection-skill.md` | 12.8 KB / 2026-03-19 | **Done (promoted 2026-05-21)** | Live: `.github/skills/reflection/SKILL.md`. Draft replaced with pointer stub. Original archived as `archive-skills/reflection-skill-original-2026-05-21.md`. |
| 2 | `autograded-lab-creation-skill.md` | 12.0 KB / 2026-03-22 | **Done (promoted 2026-05-21)** | Live: `.github/skills/autograded-lab/SKILL.md`. Draft replaced with pointer stub. Original archived as `archive-skills/autograded-lab-creation-skill-original-2026-05-21.md`. |
| 3 | `chapter-docx-build-skill.md` | 2.4 KB / 2026-05-06 | **Done (promoted 2026-05-21)** | Live: `.github/skills/chapter-docx-build/SKILL.md`. Draft replaced with pointer stub. Original archived as `archive-skills/chapter-docx-build-skill-original-2026-05-21.md`. |
| 4 | `pandoc-extensions-skill.md` | 8.4 KB / 2026-03-15 | **Done (promoted 2026-05-21)** | Live: `.github/skills/pandoc-extensions/SKILL.md`. Cheat sheet folded in as `cheat-sheet.md` support file. Draft replaced with pointer stub. Original archived as `archive-skills/pandoc-extensions-skill-original-2026-05-21.md`. |
| 5 | `pandoc-extensions-cheat-sheet.md` | 2.9 KB / 2026-03-15 | **Done (merged 2026-05-21)** | Folded into `.github/skills/pandoc-extensions/cheat-sheet.md` as support file. Draft replaced with pointer stub. Original archived as `archive-skills/pandoc-extensions-cheat-sheet-original-2026-05-21.md`. |
| 6 | `pandoc-video.md` | 6.7 KB / 2026-03-10 | **Done (promoted 2026-05-21)** | Live: `.github/skills/pandoc-video/SKILL.md`. Draft replaced with pointer stub. Original archived as `archive-skills/pandoc-video-original-2026-05-21.md`. |
| 7 | `image-prompt.md` | 8.0 KB / 2026-03-07 | **Done (promoted 2026-05-21)** | Live: `.github/skills/image-prompt/SKILL.md`. Minimalist-vector folded in as `style-minimalist-vector.md` support file. Draft replaced with pointer stub. Original archived as `archive-skills/image-prompt-original-2026-05-21.md`. |
| 8 | `data-book-minimalist-vector-image-prompt-skill.md` | 7.8 KB / 2026-03-22 | **Done (merged 2026-05-21)** | Folded into `.github/skills/image-prompt/style-minimalist-vector.md` as a style support file. Draft replaced with pointer stub. Original archived as `archive-skills/data-book-minimalist-vector-image-prompt-skill-original-2026-05-21.md`. |
| 9 | `image-optimization-skill.md` | 5.4 KB / 2026-03-21 | **Done (archived 2026-05-21)** | Confirmed fully covered by live `image-production` (ImageMagick check, optimization commands, GIF handling, collision-safe naming, dimensions, verification, report). Live skill has stronger defaults (1800/q90/300 DPI vs legacy 1600/85/200) and approval gates. Original archived as `archive-skills/image-optimization-skill-original-2026-05-21.md`. Stub written. |
| 10 | `chapter-image-insertion-skill.md` | 6.5 KB / 2026-03-21 | **Done (archived 2026-05-21)** | Confirmed covered by live `image-production` (Phase 5 + `folder-scanning-rules.md`): approved-image insertion, candidate surfacing, idempotent re-runs, HTML-comment conversion, coverage verification. Deliberately not ported: the Ch2-era `Figure N.M candidate A/B/C` parallel-caption review pattern + `Additional Image Candidates` holding section (niche). Original archived as `archive-skills/chapter-image-insertion-skill-original-2026-05-21.md`. Stub written. |
| 11 | `add-images-to-chapter.md` | 5.7 KB / 2026-05-19 | **Done (archived 2026-05-21)** | Confirmed direct ancestor of live `image-suggestion` (identical `**🎨 Image Suggestion**` blocks + `chNN-image-ideas-YYYY-MM-DD.md` companion format). Nothing unique. Archived as `archive-skills/add-images-to-chapter-original-2026-05-21.md`. Stub written. |
| 12 | `image-suggestions.md` | 7.5 KB / 2026-05-21 | **Done (renamed 2026-05-21)** | Confirmed self-declared mirror of `.github/skills/image-suggestion/SKILL.md`. Renamed to `image-suggestion.reference.md` to make mirror status visible at a glance. No live references to the old filename outside this audit doc. |
| 13 | `image-delivering.md` | 0.0 KB / 2026-05-21 | **Done (archived 2026-05-21)** | Empty file (0 bytes). Archived as `archive-skills/image-delivering-original-2026-05-21.md`. Stub written pointing to live `image-production`. |
| 14 | `image-production.md` | 0.1 KB / 2026-05-21 | **Reference-only (pointer)** | Phase B pointer stub. Keep in place. |
| 15 | `images.md` | 2.9 KB / 2026-03-21 | **Done (archived 2026-05-21)** | DPI / dimensions / format / ImageMagick content covered by `image-production/image-production-rules.md` with stronger defaults (1800px / q90 / 300 DPI). Not ported: the print-width reference table (full / two-column / single / half — print-specific, not used by current workflow). Contained junk `<!-- TODO: dsfdsfdsfsff -->` marker — dropped. Archived as `archive-skills/images-original-2026-05-21.md`. Stub written. |
| 16 | `chapter-edit.md` | 25.9 KB / 2026-03-19 | **Done (archived 2026-05-21)** | Preflight diff completed against live `chapter-editor` and `chapter-editor-light`. Unique items ported before archiving: Bloom's alignment + verbs table → `chapter-editor` Step 17; APA 7 citations rule → `chapter-editor` Step 18; Grading Database canonical schema → repo memory (`/memories/repo/bitm330-grading-database-schema.md`). Legacy companion-file name map deliberately not ported (obsolete given current chapter folder structure). Original archived as `archive-skills/chapter-edit-original-2026-05-21.md`. Stub written. |
| 17 | `chapter-edit-instructions.md` | 6.6 KB / 2026-03-08 | **Done (archived 2026-05-21)** | Editor-lineage; superseded by live `chapter-editor`. Archived as `archive-skills/chapter-edit-instructions-original-2026-05-21.md`. Stub written. |
| 18 | `chapter-edit-updated-3-19-26.md` | 7.0 KB / 2026-03-22 | **Done (archived 2026-05-21)** | Dated editor variant; superseded. Archived as `archive-skills/chapter-edit-updated-3-19-26-original-2026-05-21.md`. Stub written. |
| 19 | `chapter-style-edit-2-19-26.md` | 5.9 KB / 2026-03-22 | **Done (archived 2026-05-21)** | Dated editor variant; superseded. Archived as `archive-skills/chapter-style-edit-2-19-26-original-2026-05-21.md`. Stub written. |
| 20 | `chapter-edit-Skill 5-5.md` | 6.6 KB / 2026-05-11 | **Done (archived 2026-05-21)** | Dated editor variant. Archived as `archive-skills/chapter-edit-Skill-5-5-original-2026-05-21.md` (filename normalized). Stub written. |
| 21 | `Skill - chapter editing 5_5.md` | 6.1 KB / 2026-05-05 | **Done (archived 2026-05-21)** | Dated editor variant. Archived as `archive-skills/Skill-chapter-editing-5_5-original-2026-05-21.md` (filename normalized). Stub written. |
| 22 | `Skill - chapter editing 5_13.md` | 9.1 KB / 2026-05-13 | **Done (archived 2026-05-21)** | Diffed against live `chapter-editor`: chat-export design discussion that converged on what the live skill already does (outline lookup, length pause-and-ask, 5-7 sections, callouts, author comments). Nothing unique to port. Archived as `archive-skills/Skill-chapter-editing-5_13-original-2026-05-21.md`. Stub written. |
| 23 | `optimize-textbook-5-5-6-2026.md` | 6.5 KB / 2026-05-07 | **Done (archived 2026-05-21)** | Diffed against live `chapter-editor`. Proposed hard numeric metrics (3-6 tables, 4-6 figures, sentence length 12-20 words, Let's Build at 60-75% of chapter). Not ported: live skill is deliberately qualitative; Let's Build is a separate companion now (placement metric moot). Metrics available in archive if ever needed. Archived as `archive-skills/optimize-textbook-5-5-6-2026-original-2026-05-21.md`. Stub written. |
| 24 | `CLAUDE-4-lines.md` | 2.3 KB / 2026-05-11 | **Done (archived 2026-05-21)** | Short working note, not a skill. Archived as `archive-skills/CLAUDE-4-lines-original-2026-05-21.md`. Stub written. |
| 25 | `# AI Editor Skill.md` | 6.1 KB / 2026-05-08 | **Done (archived 2026-05-21)** | Older AI editor doc; superseded by live `chapter-editor`. Archived as `archive-skills/AI-Editor-Skill-original-2026-05-21.md` (leading `#` and spaces stripped). Stub written. |
| 26 | `# AI Editor Skill.gdoc` | 0.2 KB / 2026-03-13 | **Partial (2026-05-21)** | Google Drive `.gdoc` pointer — Drive client intercepts file I/O so it cannot be copied or read by PowerShell/.NET (errors: "Could not find file" / "Incorrect function"). Original left in place at `.docs/.skills/`. Manual archival via Drive UI required if cleanup is desired. |
| 27 | `doc-coauthering-claude.md` | 16.5 KB / 2026-03-10 | **Reference-only** | Anthropic Skills catalog export. Useful as a reference for skill structure; not a live skill candidate. |
| 28 | `gap-analysis-all.md` | 5.8 KB / 2026-03-08 | **Done (promoted 2026-05-21)** | Live: `.github/skills/chapter-gap-analysis/SKILL.md`. Rewrote chat-export framing, repointed editing-rules reference from `chapter-edit.md` to live `chapter-editor` skill, added frontmatter and trigger description. CSV column spec preserved verbatim. Draft replaced with pointer stub. Original archived as `archive-skills/gap-analysis-all-original-2026-05-21.md`. |
| 29 | `lab-description.md` | 0.9 KB / 2026-03-14 | **Done (archived 2026-05-21)** | Chapter content excerpt about the Vet Clinic (PetVax) database, not a skill. Archived as `archive-skills/lab-description-original-2026-05-21.md`. Stub written noting lab authoring guidance lives in live `autograded-lab` and that this content belongs in a chapter or lab file. |
| 30 | `call-out.md` | 3.4 KB / 2026-02-22 | **Done (promoted 2026-05-21)** | Live: `.github/skills/call-out/SKILL.md`. Rewrote chat-export framing as a proper skill with frontmatter, output examples, style rules, and audit checklist. Canonical emoji legend preserved verbatim. Draft replaced with pointer stub. Original archived as `archive-skills/call-out-original-2026-05-21.md`. |
| 31 | `skill-template.md` | 0.3 KB / 2026-03-03 | **Reference-only** | Generic skill template. Keep as scaffolding starter. |
| 32 | `https   chatgpt.txt` | 0.1 KB / 2026-05-05 | **Done (archived + removed 2026-05-21)** | URL noise; not a skill. Archived as `archive-skills/https-chatgpt-original-2026-05-21.txt`. Original removed from `.docs/.skills/`. |
| 33 | `https   github..txt` | 0.0 KB / 2026-03-14 | **Done (archived + removed 2026-05-21)** | URL noise. Archived as `archive-skills/https-github-original-2026-05-21.txt`. Original removed. |
| 34 | `https   github. (1).txt` | 0.1 KB / 2026-05-08 | **Done (archived + removed 2026-05-21)** | URL noise. Archived as `archive-skills/https-github-1-original-2026-05-21.txt`. Original removed. |
| 35 | `A story from The PyCoach on Medium` | 0.2 KB / 2026-05-08 | **Done (archived + removed 2026-05-21)** | Reading-list pointer, not a skill. Archived as `archive-skills/story-PyCoach-Medium-original-2026-05-21.txt` (added `.txt` extension). Original removed. |
| 36 | `Claude Skills - Google Drive` | 0.1 KB / 2026-05-08 | **Done (archived + removed 2026-05-21)** | Drive link pointer, not a skill. Archived as `archive-skills/Claude-Skills-Google-Drive-original-2026-05-21.txt` (added `.txt` extension). Original removed. |
| 37 | `notebooklm.md` | 3.1 KB / 2026-05-21 | **Done (promoted 2026-05-21)** | Content reconciled with loose `.github/skills/notebooklm.md` and folded into live `.github/skills/notebooklm/SKILL.md` (slides + master infographic). Draft replaced with pointer stub. Original archived as `archive-skills/notebooklm-draft-original-2026-05-21.md`. |
| 38 | `notebooklm.docx` | 8.9 KB / 2026-05-21 | **Done (archived 2026-05-21)** | DOCX retained in place as reference, also archived as `archive-skills/notebooklm-docx-original-2026-05-21.docx`. Live content lives in `.github/skills/notebooklm/SKILL.md` and `.github/skills/notebooklm-video/SKILL.md`. |
| 39 | `desktop.ini` | — | **Leave** | Windows folder metadata; ignore. |

## Loose files in `.github/skills/` (live folder, but not folder-based)

| # | File | Recommendation | Target / Notes |
|--:|------|----------------|----------------|
| N1 | `.github/skills/notebooklm.md` | **Done (repackaged 2026-05-21)** | Replaced by `.github/skills/notebooklm/SKILL.md` (folder-based). Loose file removed. Original archived as `archive-skills/notebooklm-loose-original-2026-05-21.md`. Reconciled with `.docs/.skills/notebooklm.md` (Ch2-specific infographic prompt + slide style guidance preserved and generalized). |
| N2 | `.github/skills/notebooklm-video.md` | **Done (repackaged 2026-05-21)** | Replaced by `.github/skills/notebooklm-video/SKILL.md` (folder-based). Loose file removed. Original archived as `archive-skills/notebooklm-video-loose-original-2026-05-21.md`. Merged with the more detailed video section from the loose `notebooklm.md`. |

## Execution Order (updated)

Each batch is its own approval gate.

1. **Batch 1 — Easy promotions:** rows 1 (`reflection`), 2 (`autograded-lab`), 3 (`chapter-docx-build`), 6 (`pandoc-video`).
2. **Batch 2 — Pandoc bundle:** rows 4 + 5 → `.github/skills/pandoc-extensions/` (SKILL.md + cheat-sheet as support).
3. **Batch 3 — Image-prompt:** rows 7 + 8 → `.github/skills/image-prompt/` with `style-minimalist-vector.md` as a support file.
4. **Batch 4 — Callout:** row 30 → `.github/skills/call-out/SKILL.md`.
5. **Batch 5 — Gap analysis:** row 28 → `.github/skills/chapter-gap-analysis/SKILL.md` (rewrite to remove chat-export framing; repoint `chapter-edit.md` reference to live `chapter-editor`).
6. **Batch 6 — NotebookLM repackaging:** rows N1, N2, 37, 38 together — reconcile content, then folder-based packaging.
7. **Batch 7 — chapter-edit.md decision:** row 16 — diff against `chapter-editor` / `chapter-editor-light`; port unique content, then archive.
8. **Batch 8 — Merge audits:** rows 9, 10 — confirm content was captured in `image-production`, then archive.
9. **Batch 9 — Editor-lineage archival:** rows 17–23 (move to `archive-skills/`).
10. **Batch 10 — Misc archival:** rows 11, 13, 15, 24, 25, 26, 29, 32–36.
11. **Batch 11 — Reference cleanup (optional):** row 12 rename to make mirror status visible.
