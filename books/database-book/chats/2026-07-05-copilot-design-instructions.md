# Chat: Unified Design Instructions — 2026-07-05

**Source:** Copilot (VS Code)
**Original link:** n/a — VS Code Copilot sessions have no shareable deep link.

> Reopen: open this file in VS Code, or start a new chat and paste the TL;DR
> below as context. This summary *is* the durable record of the session.

---

## TL;DR

Created a single canonical `design-instructions.md` covering the full DIMA Publishing design system — platform UI, chapter content, callouts, brand identity, typography, accessibility, and visual design rules. Hardened the CSS to eliminate callout duplication, added 32 callout color tokens to `:root`, and added governance/enforcement sections after an external review. Also created a reusable `save-chat` skill.

---

## Key Points

- Design identity: "Academic navy + indigo, softened by mint and light gray"
- Mint (`#BFEAD8`) reserved for the book cover/thumbnail — never in site chrome
- Vanilla CSS custom properties (no Tailwind in production)
- `call-outs.css` owns callout type colors; `styles.css` owns layout + components
- Callout tokens in `:root` bridge the two files

---

## What Was Done / Decided

### Phase 1 — Research & draft
- Fetched live site (dima-publishing.vercel.app), explored production CSS, callout CSS, existing design docs
- Created canonical doc at `dima-publishing/books/database-book/plans/design-instructions.md`
- 14 sections: brand, colors, typography, layout, components, content, a11y, tokens, build, mobile, testing, DoD, governance, file manifest

### Phase 2 — CSS hardening
- Removed ~115 lines of duplicated/incorrect callout rules from `styles.css`
- Added 32 `--callout-*-border` / `--callout-*-bg` variables to `:root`
- Updated `call-outs.css` to use `var(--callout-*-border, #fallback)` instead of bare hexes
- `styles.css` now delegates callout type colors to `call-outs.css`

### Phase 3 — Drive copy + cross-references
- Copied to `BITM330-book-drive/.docs/.styles/design-instructions.md`
- Updated `AGENTS.md` in both workspaces with a Design Authority section

### Phase 4 — Supersede old files
- Deprecation notices on: `reader-hybrid-v1.1-design-system.md`, `bitm330_textbook_visual_design_system.md`, `visual-guidline-5-19.md`

### Phase 5 — Post-review hardening
- §10 Mobile behavioral detail (breakpoints, drawer, overlay, scroll lock, z-index)
- §11 Accessibility testing (Lighthouse, axe, keyboard, contrast, reduced-motion)
- §12 Definition of Done (9-item checklist)
- §13 Governance (CSS ownership, token drift prevention, font upgrade path)

### Phase 6 — save-chat skill
- Created `.agents/skills/save-chat/SKILL.md` — saves Copilot AND pasted ChatGPT/Claude/Gemini web chats as dated summaries in `books/database-book/chats/`

### Build verified
- `npm run lint && npm run build` — zero errors, CSS 37.67 KB (7.79 KB gzipped)

---

## Key Files / Artifacts

| File / Artifact | Change |
|-----------------|--------|
| `dima-publishing/books/database-book/plans/design-instructions.md` | Created — canonical design authority |
| `BITM330-book-drive/.docs/.styles/design-instructions.md` | Created — working copy |
| `reader-hybrid-v1.1/src/styles.css` | Removed callout dupes, added 32 callout tokens |
| `_static/call-outs.css` | Bare hexes → CSS variables with fallbacks |
| `reader-hybrid-v1.1-design-system.md` | Deprecation notice |
| `bitm330_textbook_visual_design_system.md` | Deprecation notice |
| `visual-guidline-5-19.md` | Deprecation notice |
| `AGENTS.md` (both workspaces) | Design Authority section |
| `.agents/skills/save-chat/SKILL.md` | Created — chat-saving skill (Copilot + web chats) |

---

## Decisions & Rationale

- **Single Markdown doc is canonical.** CSS files must match but are hand-maintained; a future CI check can enforce.
- **Mint is book-graphic only.** Keeps site chrome clean (navy/indigo/white/gray).
- **Callout tokens in `:root`.** Removes duplication and prevents drift between `styles.css` and `call-outs.css`.
- **Both workspaces updated.** Repo copy is canonical; Drive copy is a working reference.

---

## Next Steps (if continuing)

1. Run `/book-deploy` to push the CSS fixes live
2. Future: CI check comparing `:root` tokens to design-instructions.md
3. Future: Stylelint rule banning bare hex colors outside `:root`
4. Future: self-host fonts via `@fontsource`

---

*Summary generated 2026-07-05. Source: Copilot (VS Code).*
