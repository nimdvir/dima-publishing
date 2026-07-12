# BITM330 Book Production — Skills Inventory

> Generated: 2026-07-11 by GitHub Copilot (DeepSeek V4 Pro)
> Source: `dima-publishing\.agents\skills\` (71 skills) + Drive-only skills (3)
> Also: 7 archived skills in `.agents/archive/skills/`

---

## Skill vs Agent for Book Editing

For the BITM330 workflow, **skills are the better fit** — and that's what's already in place.

| | Skill | Agent |
|---|---|---|
| **Invocation** | On-demand via `/skill-name` | Persistent mode with its own system prompt |
| **Context** | Loads only when triggered — keeps chat clean | Always loaded — adds overhead |
| **Composition** | Skills can call other skills (`chapter-editor` → delegates to `call-out`, `edits`, etc.) | Agents are more isolated |
| **Version control** | Plain Markdown files in `.agents/skills/` — easy to diff, iterate, PR | More complex configuration files |
| **Best for** | Domain-specific tasks with clear entry/exit (editing a chapter, placing images, building DOCX) | Persistent behaviors (a "reviewer mode" that's always watching, or a mode with restricted tools) |
| **This project** | ✅ Each task is a distinct workflow with its own rules | Would be overkill — switching between editing/media/import/deploy is the workflow |

**Bottom line:** Skills give surgical precision for each chapter task. An agent would be useful for a permanently active "proofreader" mode — but that's not this workflow. The current 71-skill ecosystem is the right architecture.

---

## Canonical Location

```
C:\Users\nd115232\Documents\GitHub\dima-publishing\.agents\skills\
```

Drive's `G:\...BITM330-book-drive\.agents\` is a filesystem junction to this same location, plus 3 additional Drive-only skills.

---

## Full Skills Inventory

### Book Production Pipeline (core workflow)

| Skill | What it does |
|---|---|
| `chapter-editor` | ⭐ Full developmental edit — the quality gate |
| `chapter-editor-light` | Light grammar/clarity pass |
| `chapter-source-import` | Safe Drive→Repo import (the current import gate) |
| `chapter-final-check` | Final readiness checker before deploy |
| `book-deploy` | Build + deploy online reader to Vercel |
| `book-workflow-routing` | Router: editor → import → final-check → deploy |
| `chapter-production-flow` | Full lifecycle orchestrator |
| `chapter-command-center` | Interactive launcher — recommends next step |
| `chapter-publish` | Import + validate + handoff to deploy |

### Chapter Companions

| Skill | What it does |
|---|---|
| `lets-build-creator` | Draft/revise the Let's Build hands-on section |
| `reflection` | Draft Review & Reflection questions + answer key |
| `rat-creator` | Draft RAT/quiz questions with Bloom-structured answers |
| `term-creator` | Draft/update chapter terms + Term Treasury |
| `lab-creation` | Build SAM-style PetVax lab (questions + answers) |
| `autograded-lab` | Build LMS-ready autograded Brightspace lab |

### Media & Images

| Skill | What it does |
|---|---|
| `chapter-media` | ⭐ Unified image pipeline (plan-first: suggest → place → optimize → upload → rewrite) |
| `chapter-media-inventory` | Read-only image audit — inventory CSV, gallery, recommendations |
| `figure-suggestion` | Stage 1 only — insert figure suggestion blocks |
| `image-placement` | Stage 2 only — place/generate local figures |
| `image-link-optimizer` | Stage 3 only — optimize, Cloudinary upload, rewrite links |
| `image-prompt` | Generate Gemini prompt blocks, Figures Index, CSV tracker |
| `cloudinary-docs` | Look up Cloudinary docs |
| `cloudinary-react` | React SDK patterns for Cloudinary |
| `cloudinary-transformations` | Build/debug Cloudinary transformation URLs |
| `pandoc-video` | Video embed snippets for Pandoc |
| `upload-book-videos` | YouTube upload pipeline with Gemini subtitles |

### Review & Build

| Skill | What it does |
|---|---|
| `chapter-html-review` | Build self-contained HTML review page |
| `chapter-pdf-review` | Build print-optimized PDF via Edge headless |
| `chapter-docx-build` | Build chapter DOCX via Pandoc |
| `chapter-gap-analysis` | Audit chapter vs source materials → gap CSV |
| `call-out` | Insert/audit standardized HTML callout blocks |
| `edits` | Manage per-chapter `.edits` files |
| `progress-update` | Log progress to daily edit log |
| `chapter-tracker` | View/update the chapter progress tracker |
| `todo` | Session handoff — save chat + generate next-session todo |

### Course/LMS

| Skill | What it does |
|---|---|
| `online-quiz-creation` | Brightspace-importable quizzes (CSV + MD, all 7 question types) |
| `brightspace-export` | Brightspace export utilities |

### AI & Generation

| Skill | What it does |
|---|---|
| `notebooklm` | Generate NotebookLM slide/infographic prompts |
| `notebooklm-video` | Generate chapter preview video prompts |
| `gemini-api-dev` | Gemini API SDK usage (Python, JS, Go, Java) |
| `gemini-interactions-api` | Gemini Interactions API — chat, streaming, agents |
| `xai-text-to-speech` | xAI TTS API integration |

### Notion Integration

| Skill | What it does |
|---|---|
| `notion-bridge` | Routing + safety rules for Notion MCP |
| `notion-flavored-markdown` | Format content for Notion MCP tools |
| `notion-knowledge-capture` | Capture research/notes/decisions into Notion |
| `notion-database-templates` | Create Notion databases with schemas |
| `notion-api-reference` | Notion REST API reference |
| `notion-audit-log` | Enterprise audit log reference |
| `notion-custom-agents` | Build automated Notion workflows |

### Platform & DevOps

| Skill | What it does |
|---|---|
| `deploy-to-vercel` | Deploy apps to Vercel |
| `vercel-cli-with-tokens` | Vercel CLI with access tokens |
| `vercel-optimize` | Vercel cost/performance optimization |
| `vercel-composition-patterns` | React composition patterns |
| `vercel-react-best-practices` | React/Next.js performance |
| `vercel-react-view-transitions` | View Transition API in React |
| `supabase` / `supabase-dima` | Supabase integration |
| `supabase-server` | @supabase/server — Edge Functions, auth modes |
| `supabase-postgres-best-practices` | Postgres optimization from Supabase |
| `stripe-best-practices` / `upgrade-stripe` | Stripe integration |

### Document & Format

| Skill | What it does |
|---|---|
| `docx` | Word document creation/manipulation |
| `pdf` | PDF processing toolkit |
| `pandoc-extensions` | Pandoc Markdown extension guidance |
| `xlsx` / `pptx` | Excel/PowerPoint handling |

### Quality & Guidelines

| Skill | What it does |
|---|---|
| `writing-guidelines` | Review prose for writing handbook compliance |
| `web-design-guidelines` | Review UI for accessibility/best practices |

### Workflow

| Skill | What it does |
|---|---|
| `save-chat` | Save chat transcript as dated Markdown |
| `daily-work-log` | Generate dated work log (Drive-only) |
| `chapter-sync` | Legacy dated-file sync (use `chapter-source-import` instead) |
| `chapter-editor-cursor` | Legacy Cursor editor reference (use `chapter-editor`) |
| `chapter-review-codex` | Deprecated — use `chapter-final-check` |

---

## Summary

| Category | Count |
|---|---|
| Total active skills (repo) | 71 |
| Drive-only skills | 3 |
| Archived skills | 7 |
| Book production pipeline | 9 |
| Chapter companions | 6 |
| Media & images | 11 |
| Review & build | 9 |
| Course/LMS | 2 |
| AI & generation | 5 |
| Notion integration | 7 |
| Platform & DevOps | 12 |
| Document & format | 5 |
| Quality & guidelines | 2 |
| Workflow | 5 |

---

## Most Important Daily Skills

```
chapter-editor → chapter-media → chapter-source-import → chapter-final-check → book-deploy
```

- **Start with guidance:** `/chapter-command-center chNN`
- **Run a guided lifecycle:** `/chapter-production-flow chNN`
- **Run final package review:** `/chapter-final-check chNN`
- **Light cleanup only:** `/chapter-editor-light`
- **Import Drive drafts:** `/chapter-source-import chNN`
- **Deploy:** `/book-deploy`
