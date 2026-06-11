---
name: chapter-review-gpt
description: >
  Superseded alias for the merged BITM330 whole-package chapter review workflow.
  Use `chapter-review-codex` instead for final repo-canonical review of a complete
  chapter package, including prose, companions, lab, media, terms, reports, logs,
  trackers, and DOCX readiness.
---

# Chapter Review GPT

This skill has been merged into `chapter-review-codex`.

When this skill is invoked:

1. Load `.agents/skills/chapter-review-codex/SKILL.md`.
2. Follow `chapter-review-codex` as the controlling instruction file.
3. Do not run an independent `chapter-review-gpt` workflow.

The merged skill preserves the useful pieces from this GPT version, including the repo-canonical source model, expected layout, source priority, report contract, media manifest schema, Lab 1 canonical `index.md` rule, term mega table, outline coverage, word-count reporting, and DOCX-last sequencing.
