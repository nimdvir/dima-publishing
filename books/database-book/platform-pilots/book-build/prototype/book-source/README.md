# Prototype Book Source

This folder is a prototype-local staging area for editable Markdown source files.

For now, it is a copy-only workspace:

- The active static HTML build still reads from `BITM330-Book-draft/chapter-drafts`.
- `build_static_book.py` is intentionally unchanged in this slice.
- Files here are normalized into one folder per chapter with `index.md` so later HTML conversion and chapter splitting are simpler.

Initial seeded chapters:

- Chapter 1 source: `BITM330-Book-draft/chapter-drafts/ch01-introduction-to-course/main/ch01-main-unified-2026-05-18.md`
- Chapter 2 source: `BITM330-Book-draft/chapter-drafts/ch02-mis-and-bitm/main/ch02-main-section-core-concepts-5-18.md`

Notes:

- Chapter 2 was chosen intentionally as the current working draft even though its filename does not use the normal `YYYY-MM-DD` pattern.
- Later, this folder can become an optional build override or the primary normalized manuscript source.
