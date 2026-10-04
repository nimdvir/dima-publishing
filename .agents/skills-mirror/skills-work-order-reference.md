# BITM330 Skills & Work Order Reference

**Last updated:** 2026-07-12 **Canonical skills location:** `dima-publishing\.agents\skills\`

---

## 1. The Big Picture

### Production Pipeline

```
chapter-editor → chapter-source-import → chapter-final-check → book-deploy
```

**Never skip directly from editing to deployment.** Import is compare-first, not blind overwrite.

### Data Flow

```
Google Drive drafts (BITM330-book-drive)
    ↓  chapter-source-import
dima-publishing repo (stable source)
    ↓  book-deploy
Vercel (live reader: https://reader-hybrid-v11.vercel.app)
```

### Chapter Folder Structure

```
chapter-drafts/
  chNN-chapter-name/
    main/             → chNN-main-YYYY-MM-DD.md        (core chapter prose)
    lets-build/       → chNN-lets-build-YYYY-MM-DD.md  (hands-on activity)
    terms/            → chNN-terms-YYYY-MM-DD.md       (vocabulary & treasury)
    reflection/       → chNN-reflection-YYYY-MM-DD.md  (review questions + key)
    rat/              → chNN-rat-YYYY-MM-DD.md         (readiness assessment test)
    lab/              → chNN-lab-YYYY-MM-DD.md         (graded lab assignment)
    index/            → chNN-index-YYYY-MM-DD.md       (chapter index draft)
```

### Source of Truth

| Content | Canonical Location |
| --- | --- |
| Chapter drafts (editable) | Google Drive `BITM330-book-drive\BITM330-Book-draft\chapter-drafts\` |
| Stable production source | `dima-publishing\books\database-book\files\source\` |
| Chapter tracker | `dima-publishing\books\database-book\.edits\chapter-tracker.md` |
| Design instructions | `dima-publishing\books\database-book\plans\design-instructions.md` |
| Book outline | `dima-publishing\books\database-book\files\source\outline\outline-*.md` |
| Media library | `BITM330-book-drive\.images\` |
| Task tracker (Notion) | `📚 Book Project — BITM330` → `✅ Project TODO` |

---

## 2. Skills by Category

### A. Front-Door / Routing Skills

*Start here when you are unsure what to do next.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `chapter-command-center` | Router, not a worker. Interprets your goal, checks chapter state, and recommends the smallest appropriate skill. | "What should I do next?", "Which skill do I use for...", status checks | `chapter-command-center\SKILL.md` |
| `chapter-production-flow` | Full lifecycle orchestrator. Coordinates multiple skills in sequence across editing, companions, media, review, and DOCX build. | Managing a chapter through several production steps | `chapter-production-flow\SKILL.md` |
| `book-workflow-routing` | Clarifies active vs. legacy workflows. Establishes `chapter-source-import` as the current import gate (not `chapter-sync`). | When workflow routing is ambiguous | `book-workflow-routing\SKILL.md` |

### B. Chapter Content Skills

*Write and edit chapter prose.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `chapter-editor` | **The controlling quality gate.** Full developmental edit: clarity, structure, flow, readability, callout quality, repetition control, companion alignment, build readiness. Resolves author comments. Scans `.edits/` for pending work. | Editing main chapter prose; Drive-side index editing; working-bundle review; author-comment resolution | `chapter-editor\SKILL.md` |
| `chapter-editor-light` | Light grammar/clarity pass. Polish without restructuring, removing topics, or changing voice. Adds callouts sparingly. | Quick polish when structure is stable | `chapter-editor-light\SKILL.md` |
| `chapter-editor-cursor` | **Superseded.** Historical Cursor-based editor reference. Callout and workflow rules may be stale. | Legacy reference only — prefer `chapter-editor` | `chapter-editor-cursor\SKILL.md` |
| `chapter-gap-analysis` | Audit a chapter draft against source materials. Produces a detailed CSV of gaps, inconsistencies, redundancies, missing SQL examples, terminology mismatches. | Before starting a new chapter; auditing existing drafts | `chapter-gap-analysis\SKILL.md` |
| `writing-guidelines` | Review prose for Writing Guidelines compliance (voice, tone, readability). | "Review my docs", "check writing style" | `writing-guidelines\SKILL.md` |
| `web-design-guidelines` | Review UI for accessibility and design best practices (WCAG, contrast, keyboard nav). | "Review my UI", "audit design", "check accessibility" | `web-design-guidelines\SKILL.md` |

### C. Companion File Skills

*Create and revise chapter parts (NOT main chapter prose).*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Brightspace? | Location |
| --- | --- | --- | --- | --- |
| `lets-build-creator` | Create/revise the "Let's Build" hands-on activity. Turns chapter concepts into Access, SQL, SQLite, Power BI, macro, DBA, BI, ERD, or strategy activities using the Grading Database (GDB). | Drafting or revising a Let's Build companion | — | `lets-build-creator\SKILL.md` |
| `lab-creation` | Create/revise a SAM-style PetVax lab with instructions, check questions, answer key, and artifact submission spec. Produces Markdown only — use `online-quiz-creation` for Brightspace CSV. | Building a dated lab pair (questions + answers) as a student-facing assignment document | ❌ Markdown only | `lab-creation\SKILL.md` |
| `autograded-lab` | Build LMS-friendly autograded questions from Let's Build: MC, select-all, code-input, file-upload. Designs the question set for Brightspace deployment. | Preparing lab questions for LMS import with answer key | ❌ Designs questions, doesn't produce CSV | `autograded-lab\SKILL.md` |
| `online-quiz-creation` | **The Brightspace CSV producer.** Creates paired CSV + MD import files from any content. Supports all 7 question types (MC, MS, TF, SA, WR, M, O) with hints, per-option feedback, and answer keys. | Generating actual Brightspace import files from chapter content, RATs, or lab questions | ✅ CSV + MD | `online-quiz-creation\SKILL.md` |
| `term-creator` | Create/revise Terms Treasury. Extracts vocabulary, builds definition tables with Business Significance and Examples, maintains acronyms, syncs with `terms-list.csv`. | Drafting or updating chapter terms | — | `term-creator\SKILL.md` |
| `reflection` | Create/revise Review & Reflection questions. Produces Review, Reflection, and Personal Reflection questions with full answer key. | Drafting reflection companion file | — | `reflection\SKILL.md` |
| `rat-creator` | Create/revise Readiness Assessment Tests (RATs). Generates Bloom-structured multiple-choice and Select-All questions with option-by-option reasoning. | Drafting chapter quiz/RAT | — | `rat-creator\SKILL.md` |
| `call-out` | Insert or audit standardized HTML callout blocks. Supports 16 types: Tip, Note, Important, Warning, Caution, Good Practice, Avoid, Info, Example, Question, Definition, Discipline Definition, Term, Concept, Key Takeaway, Business Insight. | Adding callouts; converting legacy emphasis to canonical style; auditing callout formatting | — | `call-out\SKILL.md` |

### D. Media & Image Skills

*Figures, images, Cloudinary delivery, and video.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `chapter-media` | **Unified image pipeline** (replaces the old 3-stage split). Plan-first workflow: scan → suggest → decide → place → optimize selected → upload used → rewrite links → update ledger. Presents interactive menu. | Adding/updating all media for a chapter; picking up where you left off | `chapter-media\SKILL.md` |
| `chapter-media-inventory` | Read-only audit. Generates CSV inventories, HTML thumbnail galleries, and used/unused recommendations. Never edits files or uploads. | "What images exist for this chapter?"; auditing before placement | `chapter-media-inventory\SKILL.md` |
| `image-prompt` | Generate textbook-ready Gemini image prompts. Produces in-text figure placements, captions, prompt blocks, a Figures Index, and a CSV tracker. Applies deep-blue minimalist vector silhouette style by default. Does NOT generate images or upload. | Writing/rewriting a chapter and figures needed for every subsection; producing batch prompts | `image-prompt\SKILL.md` |
| `figure-suggestion` | Stage 1 only. Insert figure suggestion HTML comments into chapter segments. Aims for at least one figure per sub-section. | Proposing visuals for a section; batch-planning figures | `figure-suggestion\SKILL.md` |
| `image-placement` | Stage 2 only. Turn suggestions/prompts into real local figures. Scans chapter folders, earlier/later chapters for unused fits, places matches with captions. Has a mandatory Generation Gate for API calls. | Placing figures after suggestions are approved | `image-placement\SKILL.md` |
| `image-link-optimizer` | Stage 3 only. Optimize with ImageMagick, upload to Cloudinary via MCP, rewrite chapter links with idempotent captions. | Finalizing images before import/deploy | `image-link-optimizer\SKILL.md` |
| `cloudinary-docs` | Look up Cloudinary SDK/API docs via llms.txt. | Building upload, management, or integration code | `cloudinary-docs\SKILL.md` |
| `cloudinary-transformations` | Build and debug Cloudinary transformation URLs (resize, crop, overlay, AI effects). | Constructing delivery URLs; debugging transformation syntax | `cloudinary-transformations\SKILL.md` |
| `cloudinary-react` | React SDK patterns, Upload Widget, AdvancedImage, TypeScript troubleshooting. | Writing Cloudinary React components | `cloudinary-react\SKILL.md` |
| `pandoc-video` | Generate video embed snippets for Pandoc (MP4, YouTube iframe, clickable thumbnail). | Embedding video in chapters for Pandoc conversion | `pandoc-video\SKILL.md` |
| `upload-book-videos` | End-to-end YouTube upload pipeline with Gemini subtitles and summaries. Batch upload via YAML/JSON mapping. | Uploading chapter videos to YouTube | `upload-book-videos\SKILL.md` |

### E. Import, Check & Deploy Skills

*Move content from Drive to repo to live reader.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `chapter-source-import` | **Current safe Drive→Repo gate.** Compare-first reconciliation: detects drift, classifies changes, imports safe updates, updates manifests and status dashboards. Fixes lab answer exposure. | Reconciling approved Drive drafts into repo stable source; checking what changed in Drive | `chapter-source-import\SKILL.md` |
| `chapter-sync` | **Legacy.** Incrementally syncs dated chapter files from editing repo to platform folder. Use only when explicitly needed. | Legacy workflows only — prefer `chapter-source-import` | `chapter-sync\SKILL.md` |
| `chapter-final-check` | Final readiness verification. Checks: chapter index, main chapter, all companions, lab, media, figure captions, answer exposure risks, unresolved edits, outline coverage, word count, DOCX readiness, import readiness, deploy readiness. Does NOT edit, import, or deploy. | After companions are drafted; before import to repo; before deployment | `chapter-final-check\SKILL.md` |
| `book-deploy` | Build and deploy the online reader to Vercel. Runs generate (incremental), lint, build. Asks before committing, pushing, and deploying. | After `chapter-final-check` passes | `book-deploy\SKILL.md` |
| `chapter-publish` | Orchestrate full publishing workflow: import Drive drafts → update logs → validate build → hand off to deployment. | End-to-end publishing with coordination | `chapter-publish\SKILL.md` |

### F. Build & Output Skills

*Produce DOCX, PDF, HTML, Excel, and PowerPoint files.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `chapter-docx-build` | Build one chapter into a single DOCX. Combines latest dated Markdown from all part folders using Pandoc with the repository reference document. | Producing a chapter DOCX for review or sharing | `chapter-docx-build\SKILL.md` |
| `chapter-html-review` | Build a self-contained HTML review page combining all 5 sections + lab. Includes page breaks, date stamp, and auto-regenerates master review index. | Reviewing a complete chapter as a web page | `chapter-html-review\SKILL.md` |
| `chapter-pdf-review` | Build a print-optimized PDF from review HTML via Microsoft Edge headless mode. | Producing a printable PDF for offline reading | `chapter-pdf-review\SKILL.md` |
| `docx` | General Word document manipulation. Create, read, edit .docx files; add paragraphs, tables, images, headers/footers; mail merge; Markdown→DOCX via Pandoc. | Any non-chapter DOCX work | `docx\SKILL.md` |
| `pdf` | Comprehensive PDF toolkit. Extract text/tables, merge/split, fill forms, watermark, compress, convert to/from images. | Any non-chapter PDF work | `pdf\SKILL.md` |
| `pandoc-extensions` | Choose Pandoc Markdown extensions and command profiles for DOCX output. Resolve rendering gaps (alerts as blockquotes, columns as tables). | Deciding Pandoc flags for a build | `pandoc-extensions\SKILL.md` |
| `xlsx` | Excel file creation and manipulation. | Building Excel workbooks | `xlsx\SKILL.md` |
| `pptx` | PowerPoint file creation and manipulation. | Building slide decks | `pptx\SKILL.md` |

### G. Quiz & Assessment Skills

*LMS-integrated assessments. Note: quiz **creation** (CSV + MD) is in Category C — use* `online-quiz-creation`*.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `brightspace-export` | Brightspace export utilities. | Exporting content for Brightspace LMS | `brightspace-export\SKILL.md` |

### H. Tracking & Logging Skills

*Stay organized across sessions.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `chapter-tracker` | View/update the cross-chapter progress tracker at `books/database-book/.edits/chapter-tracker.md`. Never reads the Archive section unless explicitly asked. | Checking what work is pending; adding todos; marking tasks complete | `chapter-tracker\SKILL.md` |
| `progress-update` | Append progress notes and todos to the rolling edit log at `books/database-book/.edits/edit-log.md`. Each entry is a Markdown task list under today's date. | Logging daily work; capturing follow-ups | `progress-update\SKILL.md` |
| `edits` | Manage per-chapter `.edits` file at `books/database-book/.edits/chNN-edits.md`. Add, review, incorporate, or archive flagged content. | Tracking chapter-specific unresolved items | `edits\SKILL.md` |
| `daily-work-log` | Generate the full dated Markdown work log with file moves, archive actions, inventory rebuilds, Cloudinary links, duplicate handling. | End-of-session documentation | `daily-work-log\SKILL.md` |
| `save-chat` | Save a chat summary as a dated Markdown file. Works for Copilot chats and pasted web chat transcripts. | Archiving a conversation for later reference | `save-chat\SKILL.md` |
| `todo` | Session handoff. Saves chat → identifies unfinished threads → creates next actions in `todo.md` and `chapter-tracker.md`. Mirrors to Notion `✅ Project TODO`. | End of session; "what should I work on next?" | `todo\SKILL.md` |

### I. AI & NotebookLM Skills

*Teaching supplements: slides, videos, AI integrations.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `notebooklm` | Generate NotebookLM prompts for chapter slide decks and master infographics. | Drafting teaching slides or infographics | `notebooklm\SKILL.md` |
| `notebooklm-video` | Generate NotebookLM prompts for a 2–3 minute chapter preview video with narration script and storyboard. | Creating chapter intro videos | `notebooklm-video\SKILL.md` |
| `gemini-api-dev` | Gemini API SDK usage (Python, JS, Go, Java). Model selection, multimodal content, function calling, structured outputs. | Building apps with Gemini models | `gemini-api-dev\SKILL.md` |
| `gemini-interactions-api` | Gemini Interactions API for stateful chat, streaming, structured output, and agents. | Multi-turn chat, background research, migrating from generateContent | `gemini-interactions-api\SKILL.md` |
| `xai-text-to-speech` | xAI TTS API integration. Asks discovery questions before code; generates tailored implementation for Node.js, Python, or browser. | Adding speech synthesis to a project | `xai-text-to-speech\SKILL.md` |

### J. Notion Integration Skills

*Work with Notion pages, databases, and the MCP server.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `notion-bridge` | **Routing and safety.** Enforces source-of-truth map and the hard student-data boundary (never send student data to Notion). OAuth only. | Any Notion task — read this first | `notion-bridge\SKILL.md` |
| `notion-flavored-markdown` | Format page content for Notion MCP tools (callouts, toggles, tables, mentions). | Writing Notion page content | `notion-flavored-markdown\SKILL.md` |
| `notion-knowledge-capture` | Save research, notes, decisions, and learnings into structured Notion databases. | "Save this to Notion", "capture this finding" | `notion-knowledge-capture\SKILL.md` |
| `notion-database-templates` | Create Notion databases with ready-to-use SQL DDL schemas for docs wikis, decision logs, FAQs, team wikis, how-to guides, learning logs. | Setting up a new Notion database | `notion-database-templates\SKILL.md` |
| `notion-api-reference` | Notion REST API conventions, auth, pagination, SDKs. | Writing direct API calls (not via MCP) | `notion-api-reference\SKILL.md` |
| `notion-audit-log` | Enterprise audit log event types, SIEM integration, CSV export. | Security/compliance investigations | `notion-audit-log\SKILL.md` |
| `notion-custom-agents` | Build automated workflows with triggers, schedules, and Slack integration. | Creating Notion automation agents | `notion-custom-agents\SKILL.md` |

### K. Platform & Infrastructure Skills

*Vercel, Supabase, Stripe, and React development.*

Base path: `dima-publishing\.agents\skills\`

| Skill | What It Does | When To Use | Location |
| --- | --- | --- | --- |
| `deploy-to-vercel` | General Vercel deployment (preview or production). | "Deploy my app" | `deploy-to-vercel\SKILL.md` |
| `vercel-cli-with-tokens` | Vercel CLI with access tokens (no interactive login). Deploy, env vars, link projects. | Scripted/CI Vercel workflows | `vercel-cli-with-tokens\SKILL.md` |
| `vercel-optimize` | Cost and performance optimization for Vercel projects. Caching, functions, Core Web Vitals. | Reducing Vercel bills; slow routes | `vercel-optimize\SKILL.md` |
| `vercel-composition-patterns` | React composition patterns: compound components, render props, context providers. | Refactoring component APIs | `vercel-composition-patterns\SKILL.md` |
| `vercel-react-best-practices` | React/Next.js performance: data fetching, bundle optimization, rendering strategies. | Writing/reviewing React code | `vercel-react-best-practices\SKILL.md` |
| `vercel-react-view-transitions` | View Transition API in React: page transitions, shared element animations, navigation. | Adding animations between routes | `vercel-react-view-transitions\SKILL.md` |
| `supabase` | General Supabase tasks: Database, Auth, Edge Functions, Realtime, Storage, Vectors. | Any Supabase work | `supabase\SKILL.md` |
| `supabase-dima` | Same as `supabase` — DIMA-publishing specific copy. | Supabase work in this repo | `supabase-dima\SKILL.md` |
| `supabase-server` | `@supabase/server` for Edge Functions, Hono apps, auth modes (`none`, `publishable`, `secret`, `user`). | Server-side Supabase code | `supabase-server\SKILL.md` |
| `supabase-postgres-best-practices` | Postgres optimization: queries, schema design, indexing. | Writing/reviewing Postgres | `supabase-postgres-best-practices\SKILL.md` |
| `stripe-best-practices` | Stripe integration: Checkout, PaymentIntents, Connect, subscriptions, security. | Building payment features | `stripe-best-practices\SKILL.md` |
| `upgrade-stripe` | Stripe API version and SDK upgrade guidance. | Upgrading Stripe versions | `upgrade-stripe\SKILL.md` |

---

## 3. Agents & Prompts

These are supporting files in `dima-publishing\.agents\` that feed the skills.

### Agent Personas (`.agents\agents\`)

| File | Purpose |
| --- | --- |
| `book-editor.md` | Universal book editor persona. Defines the identity, rules, and boundaries for BITM330 textbook editing. Bridges Drive drafts and GitHub production repo. |
| `textbook-editor.agent.md` | VS Code custom agent mode definition. Triggers on textbook editing phrases. Delegates to `book-editor.md` for full instructions. |

### Prompt Templates (`.agents\prompts\`)

| File | Purpose |
| --- | --- |
| `add-core-concepts-section.prompt.md` | Add or repair a Core Concepts section with heading, optimized image reference, alt text, and caption. |
| `daily-work-log.prompt.md` | Generate the full Markdown daily work log from verified session work. |
| `log-today.prompt.md` | Alias for `daily-work-log.prompt.md`. |

---

## 4. Scripts

All scripts live in `dima-publishing\scripts\`.

### Build Scripts

| Script | Purpose |
| --- | --- |
| `build-chapter-html.ps1` | Build a self-contained HTML review page for one chapter from source sections. |
| `build-chapter-pdf.ps1` | Build a print-optimized PDF from chapter review HTML via Edge headless. |
| `build-chat-index.ps1` | Rebuild the grouped chat index (`chats/index.md`). |
| `build-review-index.ps1` | Rebuild the master review index across all chapters. |
| `compile-appendix-a.py` | Compile Appendix A from source materials. |

### Temp Fix Scripts

*One-off repair scripts for specific issues — run only when the matching problem occurs.*

| Script | Purpose |
| --- | --- |
| `temp-fix-chapters-2.ps1` | Chapter repair pass #2 |
| `temp-fix-headings.ps1` | Fix heading structure issues |
| `temp-fix-headings-3.ps1` | Heading fix pass #3 |
| `temp-fix-labs.ps1` | Lab file repairs |
| `temp-fix-rat-reflection.ps1` | RAT and reflection file repairs |
| `temp-regen-index.ps1` | Regenerate chapter index files |
| `temp-sync-execute.ps1` | Execute sync operations |
| `temp-sync-scan.ps1` | Scan for sync-needed changes |
| `temp-verify.ps1` | Verification pass |

---

## 5. Reference Documents

Key reference documents in `dima-publishing\.agents\reference\active\` used by skills:

| Document | Used By |
| --- | --- |
| `call-out.md` | `call-out` skill — canonical emoji legend and HTML structure |
| `chapter-edit-instructions.md` | `chapter-editor` — editorial rules and conventions |
| `data-book-minimalist-vector-image-prompt-skill.md` | `image-prompt` — default visual style spec |
| `image-delivering.md` | `image-link-optimizer` — Cloudinary delivery patterns |
| `image-optimization-skill.md` | `image-link-optimizer` — ImageMagick optimization rules |
| `image-production.md` | `chapter-media` — full image production pipeline reference |
| `image-prompt.md` | `image-prompt` — prompt generation reference |
| `image-suggestion.reference.md` | `figure-suggestion` — figure suggestion patterns |
| `images.md` | `chapter-media-inventory` — image tracking rules |
| `lab-description.md` | `lab-creation` — PetVax lab specification |
| `lets-build-creator.reference.md` | `lets-build-creator` — Let's Build activity patterns |
| `pandoc-extensions-cheat-sheet.md` | `pandoc-extensions` — Pandoc flag quick reference |
| `pandoc-extensions-skill.md` | `pandoc-extensions` — detailed Pandoc profile guide |
| `pandoc-video.md` | `pandoc-video` — video embed patterns |
| `skill-template.md` | Template for creating new skills |
| `skills-notes-2026-06-05.md` | Skill development notes |
| `gap-analysis-all.md` | `chapter-gap-analysis` — full audit methodology |
| `doc-coauthering-claude.md` | Claude-specific co-authoring notes |
| `notebooklm.md` | `notebooklm` — slide/infographic prompt patterns |
| `audit-skills-2026-05-21.md` | Skill audit results |

---

## 6. Duplicate Skill Locations

The following locations contain **duplicates** of canonical `.agents\skills\` entries. The `.agents\skills\` versions are authoritative.

**Verification date:** 2026-07-12 — all mirrors verified identical, no drift detected.

| Location | Duplicated Skills | Status |
| --- | --- | --- |
| `dima-publishing\.claude\skills\` | `supabase`, `stripe-best-practices`, `upgrade-stripe`, `supabase-postgres-best-practices` | ✅ Mirror — verified identical |
| `dima-publishing\.continue\skills\` | `stripe-best-practices`, `supabase-postgres-best-practices`, `upgrade-stripe`, `supabase` | ✅ Mirror — verified identical |
| `BITM330-book-drive\.agents\skills\` | `daily-work-log`, `supabase`, `supabase-postgres-best-practices` | ⚠️ Separate copy (not a junction) — may drift |

---

## 7. Canonical Work Orders

### Work Order A: Full Chapter Production *(most common)*

Use when creating or substantially revising a chapter and all its companions.

```
1. chapter-editor
   Edit the Drive-side main chapter draft.
   └─ Resolve all author comments (// lines).
   └─ Create new dated output file (never overwrite prior dated file).

2. Companion Creation (can run in parallel after main chapter is stable)
   ├─ lets-build-creator     → hands-on Grading Database activity
   ├─ term-creator           → Terms Treasury & vocabulary
   ├─ reflection             → Review & Reflection questions + answer key
   ├─ rat-creator            → Readiness Assessment Test
   ├─ lab-creation           → SAM-style PetVax lab (Markdown)
   │   or autograded-lab     → LMS-friendly autograded question design
   └─ online-quiz-creation   → Brightspace CSV + MD import files from lab/RAT questions

3. chapter-media
   Place, optimize, upload images.
   └─ Plan-first: scan → suggest → get approval → place → optimize → upload → rewrite links.

4. chapter-source-import
   Reconcile Drive drafts → repo stable source files.
   └─ Compare-first, never blind overwrite.

5. chapter-final-check
   Verify package readiness.
   └─ Check: index, main, all companions, lab, media, captions, answer safety,
      outline coverage, unresolved edits, DOCX readiness, deploy readiness.

6. book-deploy
   Build and deploy the online reader.
   └─ Only after explicit approval.
```

### Work Order B: Light Polish Only

Use when structure is stable and only prose cleanup is needed.

```
1. chapter-editor-light
   Grammar, clarity, flow, terminology.
   No restructuring. No topic removal. Callouts only sparingly.

2. chapter-docx-build
   Build DOCX for review.
```

### Work Order C: Image-Only Pass

Use when the chapter prose is done and only images need work.

```
Option 1 (unified pipeline):
  chapter-media
    → Interactive menu: dry-run, suggest, place, optimize, full pipeline, or scan.

Option 2 (stage-by-stage):
  image-prompt         → generate prompt blocks, placements, Figures Index, CSV tracker
    → image-placement  → place/generate local figures with captions
      → image-link-optimizer → optimize, Cloudinary upload, rewrite links

Option 3 (individual stage):
  figure-suggestion    → insert figure suggestion comments
    → image-placement  → turn suggestions into real figures
      → image-link-optimizer → finalize for production
```

### Work Order D: Index Import

Use when the Drive-side chapter index draft is approved and needs to reach the reader.

```
1. Edit Drive-side index draft
   chapter-drafts/chNN-name/index/chNN-index-YYYY-MM-DD.md

2. chapter-source-import import-index-approved
   Reconcile and import the approved index into repo index.md.

3. book-deploy
   Build and deploy.
```

### Work Order E: New Chapter from Scratch

Use when starting a brand new chapter.

```
1. chapter-gap-analysis
   Audit the book outline against existing materials.
   Identify what this chapter must cover, what prior chapters provide,
   and what later chapters will extend.

2. chapter-editor
   Write the main chapter prose.
   └─ Follow the outline. Keep to the chapter's scope.

3. image-prompt
   Plan figures for every sub-section.
   └─ Generate prompt blocks, placements, and CSV tracker.

4. All Companion Skills
   ├─ lets-build-creator
   ├─ term-creator
   ├─ reflection
   ├─ rat-creator
   └─ lab-creation or autograded-lab

5. chapter-media
   Execute the image pipeline from planned prompts.

6. chapter-source-import → chapter-final-check → book-deploy
   Standard import → verify → deploy sequence.
```

---

## 8. Quick Reference

### "I want to..." Matrix

| I want to... | Use this skill |
| --- | --- |
| Figure out what to do next | `chapter-command-center` |
| Edit the main chapter | `chapter-editor` |
| Lightly polish prose | `chapter-editor-light` |
| Audit a draft for gaps | `chapter-gap-analysis` |
| Add a callout box | `call-out` |
| Create a Let's Build activity | `lets-build-creator` |
| Create a lab assignment | `lab-creation` |
| Create an LMS autograded quiz | `autograded-lab` |
| Create terms/vocabulary | `term-creator` |
| Create review questions | `reflection` |
| Create a RAT/quiz | `rat-creator` |
| Place images in a chapter | `chapter-media` |
| Check what images exist | `chapter-media-inventory` |
| Generate image prompts | `image-prompt` |
| Optimize and upload images | `image-link-optimizer` |
| Move Drive drafts to repo | `chapter-source-import` |
| Check if chapter is ready | `chapter-final-check` |
| Build and deploy the reader | `book-deploy` |
| Build a DOCX for review | `chapter-docx-build` |
| Build an HTML review page | `chapter-html-review` |
| Build a printable PDF | `chapter-pdf-review` |
| Create a Brightspace quiz | `online-quiz-creation` |
| Save work to Notion | `notion-knowledge-capture` |
| Create a Notion database | `notion-database-templates` |
| Generate teaching slides | `notebooklm` |
| Log today's work | `progress-update` or `daily-work-log` |
| Check chapter progress | `chapter-tracker` |
| Save this chat | `save-chat` |
| End the session | `todo` |
| Deploy to Vercel | `deploy-to-vercel` or `book-deploy` |
| Work with Supabase | `supabase` |
| Work with Stripe | `stripe-best-practices` |

### Legacy → Current Skill Mapping

| Legacy / Deprecated | Current Replacement |
| --- | --- |
| `chapter-editor-cursor` | `chapter-editor` |
| `chapter-review-codex` | `chapter-final-check` |
| `chapter-sync` (for Drive→Repo) | `chapter-source-import` |
| Old 3-stage image pipeline (manual chain) | `chapter-media` (unified pipeline) |

### Skill Dependency Map

```
chapter-command-center ──→ routes to all other skills
chapter-production-flow ──→ orchestrates: chapter-editor, companion skills, chapter-media, chapter-final-check, chapter-docx-build

chapter-editor ──→ delegates to: call-out, chapter-media (for images only)
chapter-media ──→ delegates to: cloudinary-docs, cloudinary-transformations, image-prompt
book-deploy ──→ requires: chapter-final-check (pass first)
chapter-final-check ──→ reads: chapter-tracker, edits, source manifests
todo ──→ calls: save-chat, chapter-tracker, progress-update (and mirrors to Notion)
notion-bridge ──→ used by: all Notion skills (safety gate)
```

---

## 9. Key Conventions

### Filename Pattern

```
ch<NN>-<part>-<YYYY-MM-DD>.md
```

Examples: `ch02-main-2026-03-18.md`, `ch05-lets-build-2026-06-20.md`

### Never Overwrite Prior Dated Files

The previous dated file is version history. Always create a new dated output file unless the user explicitly asks for an in-place same-day revision.

### Author Comments

Lines starting with `//` in Markdown are author instructions to the agent:

```
// EDIT: clarify this explanation
// ADD EXAMPLE: include a business example
// VERIFY: check this technical point
```

1. Follow the instruction.
2. Remove the `//` line once addressed.
3. If unresolvable, convert to HTML comment: `<!-- VERIFY: ... -->`

### SQL Platform Awareness

Before changing SQL syntax, confirm the target platform:

- **SQLite** — used in most examples
- **Microsoft SQL Server** — used in some examples
- **Access** — used in .accdb artifacts
- **PostgreSQL** — used for Supabase

Never rewrite binary files (.accdb, .db).

### Style Rules

| Prefer | Avoid |
| --- | --- |
| use | utilize |
| help | facilitate |
| show | demonstrate |
| explain | articulate |
| because | due to the fact that |

- No em dashes
- No dense academic phrasing
- No AI-style filler
- No corporate jargon
- Grade 8–10 reading level
- Professional, warm, practical instructor voice

### Accessibility (WCAG 2.2 Level AA)

- Logical heading order
- Meaningful alt text for images
- Captions for complex diagrams
- No images of text/code when real text works
- Meaningful link text
- No color-alone communication
- Transcripts for audio; captions for video

---

## 10. Third-Party Plugin Skills *(reference only — not BITM330-specific)*

These installed plugin skills are available system-wide but are not part of the textbook production workflow. Documented here for awareness.

### Vercel Plugin (26 skills)

`ai-gateway`, `ai-sdk`, `auth`, `bootstrap`, `chat-sdk`, `deployments-cicd`, `env-vars`, `knowledge-update`, `marketplace`, `next-cache-components`, `next-forge`, `next-upgrade`, `nextjs`, `react-best-practices`, `routing-middleware`, `runtime-cache`, `shadcn`, `turbopack`, `vercel-agent`, `vercel-cli`, `vercel-firewall`, `vercel-functions`, `vercel-sandbox`, `vercel-storage`, `verification`, `workflow`

### Power BI / Fabric Plugin (\~20 skills)

`powerbi-report-authoring`, `powerbi-report-design`, `powerbi-report-management`, `powerbi-report-planning`, `semantic-model-authoring`, `power-bi-dax-optimization`, `power-bi-model-design-review`, `power-bi-performance-troubleshooting`, `power-bi-report-design-consultation`, and more.

### Database & Data Management Plugin (4 skills)

`postgresql-code-review`, `postgresql-optimization`, `sql-code-review`, `sql-optimization`

### Project Planning Plugin (8 skills)

`breakdown-epic-arch`, `breakdown-epic-pm`, `breakdown-feature-implementation`, `breakdown-feature-prd`, `create-github-issues-feature-from-implementation-plan`, `create-implementation-plan`, `create-technical-spike`, `update-implementation-plan`

### Other Plugins

- **awesome-copilot** (\~230 marketplace skills)
- **Copilot Studio** (30 skills — agent building for Microsoft Copilot Studio)
- **Doublecheck** (verification pipeline)
- **Goal** (Builder/Inspector autonomous task loop)
- **What I Did** (branded HTML impact reports)
- **Generate Image** (AI image generation via OpenAI/Gemini)
- **Microsoft Docs** (3 skills — code reference, docs lookup, skill creator)

---

*End of reference. For detailed instructions on any skill, read its* `SKILL.md` *file at* `dima-publishing\.agents\skills\<skill-name>\SKILL.md`*.*

---
Optimized tool selectionLet me check what's actually in the skills directories.

Read [](file:///c%3A/Users/nd115232/Documents/GitHub/dima-publishing/.agents/skills)

Read [](file:///g%3A/My%20Drive/0-Projects/%21-important/BITM330-book-drive/.agents/skills)

Searched for files matching `**/*skills*list*`, no matches

Searching for text `skills list` (`**/*.md`)

Read skill `skills-work-order-reference.md`: [](file:///c%3A/Users/nd115232/Documents/GitHub/dima-publishing/.agents/skills/skills-work-order-reference.md#1-1), lines 1 to 100

The site loaded at `/login` — that's probably what's "not good." And you're asking about the full skills catalog you built in `dima-publishing`. Let me check the complete reference.

Read skill `skills-work-order-reference.md`: [](file:///c%3A/Users/nd115232/Documents/GitHub/dima-publishing/.agents/skills/skills-work-order-reference.md#100-100), lines 100 to 300

Two things going on here:

**1. The site loaded at `/login`** — that's the auth page, not the textbook reader. The dev server redirected to login instead of showing chapter content. That's the "not good" part.

**2. Your skills** — they're all there in `dima-publishing\.agents\skills\` — 70+ skills total. The full catalog is documented in skills-work-order-reference.md. Here's the summary by category:

| Category | Count | Skills |
|---|---|---|
| **A. Routing** | 3 | `chapter-command-center`, `chapter-production-flow`, `book-workflow-routing` |
| **B. Chapter Content** | 6 | `chapter-editor`, `chapter-editor-light`, `chapter-gap-analysis`, `writing-guidelines`, `web-design-guidelines` |
| **C. Companions** | 8 | `lets-build-creator`, `lab-creation`, `autograded-lab`, `online-quiz-creation`, `term-creator`, `reflection`, `rat-creator`, `call-out` |
| **D. Media & Images** | 11 | `chapter-media`, `chapter-media-inventory`, `image-prompt`, `figure-suggestion`, `image-placement`, `image-link-optimizer`, `cloudinary-docs/transforms/react`, `pandoc-video`, `upload-book-videos` |
| **E. Import/Check/Deploy** | 5 | `chapter-source-import`, `chapter-sync` (legacy), `chapter-final-check`, `book-deploy`, `chapter-publish` |
| **F. Build & Output** | 8 | `chapter-docx-build`, `chapter-html-review`, `chapter-pdf-review`, `docx`, `pdf`, `pandoc-extensions`, `xlsx`, `pptx` |
| **G–K** | ~30 | Quiz exports, tracking/logging, AI/NotebookLM, Notion integration, platform (Vercel, Supabase, Stripe) |

They're physically at skills. The conversation's skill listing was cluttered with all the marketplace/extension skills mixed in — your custom ones were buried in the noise.

Want me to navigate the browser away from the `/login` page to see what the actual reader shows?