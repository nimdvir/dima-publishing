---
name: chapter-final-pass
description: >
  Superseded alias for the merged BITM330 whole-package chapter review workflow.
  Use `chapter-review-codex` instead for final repo-canonical review of a complete
  chapter package, including prose, companions, lab, media, terms, reports, logs,
  trackers, and DOCX readiness.
---

# Chapter Final Pass

This skill has been merged into `chapter-review-codex`.

When this skill is invoked:

1. Load `.agents/skills/chapter-review-codex/SKILL.md`.
2. Follow `chapter-review-codex` as the controlling instruction file.
3. Do not run an independent `chapter-final-pass` workflow.

The merged skill preserves the useful pieces from the old final-pass workflow, including mode keywords, read-only preflight, companion audits, figure renumbering, manifest staleness checks, word counts, DOCX-last sequencing, and explicit gates for sync/deploy.
