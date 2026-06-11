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

The nested `chapter-review-gpt/chapter-review-gpt/` copy is retained only as a packaged source artifact. The canonical active workflow is `chapter-review-codex`.
