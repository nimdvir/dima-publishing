# Current Workspace Structure — Complete Map

> Generated: 2026-07-10 by GitHub Copilot (DeepSeek V4 Pro)
> Scope: `dima-publishing` repo + `BITM330-book-drive` Google Drive workspace
> Status: **Read-only map. No changes made.**

---

## PART 1: `dima-publishing` Repository

Location: `C:\Users\nd115232\Documents\GitHub\dima-publishing`
GitHub: `nimdvir/dima-publishing` (public)
Default branch: `main` | Current branch: `backup-2026-07-08`
Active PR: #12 — "Save book work: reader fixes, ch10-17 review artifacts, outline-decision session files"
Total size: ~1.3 GB working tree, 465 MB `.git`, ~1,487 files

```
dima-publishing/
│
├── .agents/                                          [4 top-level files + 9 subdirs]
│   ├── README.md
│   ├── agents/                                       [2 agent definition files]
│   │   ├── book-editor.md
│   │   └── textbook-editor.agent.md
│   │
│   ├── archive/
│   │   └── skills/                                   [7 archived skills]
│   │       ├── chapter-final-pass/
│   │       ├── chapter-review-gpt/
│   │       ├── image-link-optimizer-cursor/
│   │       ├── image-placement-gemini/
│   │       ├── image-production/
│   │       ├── image-prompt/
│   │       └── image-suggestion/
│   │
│   ├── config/                                       [empty]
│   ├── schemas/                                      [empty]
│   ├── scripts/                                      [empty]
│   ├── templates/                                    [empty]
│   │
│   ├── prompts/                                      [3 files]
│   │   ├── add-core-concepts-section.prompt.md
│   │   ├── daily-work-log.prompt.md
│   │   └── log-today.prompt.md
│   │
│   ├── reference/
│   │   ├── active/                                   [21 reference files]
│   │   │   ├── audit-skills-2026-05-21.md
│   │   │   ├── call-out.md
│   │   │   ├── chapter-edit-instructions.md
│   │   │   ├── data-book-minimalist-vector-image-prompt-skill.md
│   │   │   ├── doc-coauthering-claude.md
│   │   │   ├── gap-analysis-all.md
│   │   │   ├── image-delivering.md
│   │   │   ├── image-optimization-skill.md
│   │   │   ├── image-production.md
│   │   │   ├── image-prompt.md
│   │   │   ├── image-suggestion.reference.md
│   │   │   ├── images.md
│   │   │   ├── lab-description.md
│   │   │   ├── lets-build-creator.reference.md
│   │   │   ├── notebooklm.md
│   │   │   ├── pandoc-extensions-cheat-sheet.md
│   │   │   ├── pandoc-extensions-skill.md
│   │   │   ├── pandoc-video.md
│   │   │   ├── skill-template.md
│   │   │   └── skills-notes-2026-06-05.md
│   │   └── legacy/                                   [15 files — historical skill drafts]
│   │
│   └── skills/                                       [71 skill folders]
│       ├── autograded-lab/           ├── book-deploy/
│       ├── book-workflow-routing/    ├── brightspace-export/
│       ├── call-out/                 ├── chapter-command-center/
│       ├── chapter-docx-build/       ├── chapter-editor/
│       ├── chapter-editor-cursor/    ├── chapter-editor-light/
│       ├── chapter-final-check/      ├── chapter-gap-analysis/
│       ├── chapter-html-review/      ├── chapter-media/
│       ├── chapter-media-inventory/  ├── chapter-pdf-review/
│       ├── chapter-production-flow/  ├── chapter-publish/
│       ├── chapter-review-codex/     ├── chapter-source-import/
│       ├── chapter-sync/             ├── chapter-tracker/
│       ├── cloudinary-docs/          ├── cloudinary-react/
│       ├── cloudinary-transformations/ ├── daily-work-log/
│       ├── deploy-to-vercel/         ├── docx/
│       ├── edits/                    ├── figure-suggestion/
│       ├── gemini-api-dev/           ├── gemini-interactions-api/
│       ├── image-link-optimizer/     ├── image-placement/
│       ├── image-prompt/             ├── lab-creation/
│       ├── lets-build-creator/       ├── notebooklm/
│       ├── notebooklm-video/         ├── notion-api-reference/
│       ├── notion-audit-log/         ├── notion-bridge/
│       ├── notion-custom-agents/     ├── notion-database-templates/
│       ├── notion-flavored-markdown/ ├── notion-knowledge-capture/
│       ├── online-quiz-creation/     ├── pandoc-extensions/
│       ├── pandoc-video/             ├── pdf/
│       ├── pptx/                     ├── progress-update/
│       ├── rat-creator/              ├── reflection/
│       ├── save-chat/                ├── stripe-best-practices/
│       ├── supabase/                 ├── supabase-dima/
│       ├── supabase-postgres-best-practices/ ├── supabase-server/
│       ├── term-creator/             ├── todo/
│       ├── upgrade-stripe/           ├── upload-book-videos/
│       ├── vercel-cli-with-tokens/   ├── vercel-composition-patterns/
│       ├── vercel-optimize/          ├── vercel-react-best-practices/
│       ├── vercel-react-view-transitions/ ├── web-design-guidelines/
│       ├── writing-guidelines/       ├── xai-text-to-speech/
│       └── xlsx/
│
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/
│       └── deploy-platform-pilots-pages.yml
│
├── .images/                                           [repo-side images — only ch02]
│   └── ch02-mis-bitm/
│       └── ch02-used/                                 [51 optimized Cloudinary images]
│
├── .upfly/                                            [temp upload tracking]
├── .vercel/                                           [Vercel project config]
├── .vscode/                                           [4 config files]
│
├── .claude/   .clinerules/   .codex/   .continue/   .cursor/   .edit/
│   [AI tool config dirs — mostly empty or minimal]
│
├── _static/
│   └── call-outs.css
│
├── books/
│   └── database-book/                                 [THE CORE OF THE REPO]
│       ├── AGENTS.md
│       ├── book.yml
│       ├── PLAN.md                                    [self-labeled "superseded"]
│       ├── review-index.html
│       │
│       ├── .edits/                                    [19 files — per-chapter edit tracking]
│       │   ├── README.md
│       │   ├── chapter-section-status.md
│       │   ├── chapter-tracker.md                     [PRIMARY task tracker]
│       │   ├── edit-log.md
│       │   ├── todo.md
│       │   ├── rebaseline-plan-2026-06-11.md
│       │   ├── repo-change-inventory-2026-06-18.md
│       │   └── ch01-edits.md through ch17-edits.md   [14 chapter-specific edit files]
│       │
│       ├── .reports/                                  [5 review reports]
│       │   ├── ch04-final-check-2026-06-21.md
│       │   ├── ch05-final-check-2026-06-21.md
│       │   ├── ch06-final-check-2026-06-21.md
│       │   ├── ch07-final-check-2026-06-21.md
│       │   └── chapter-order-update-report-2026-06-12.md
│       │
│       ├── Brightspace/
│       │   ├── Labs/                                  [empty]
│       │   └── Rats/                                  [45 files — CSV+MD quiz exports]
│       │       └── rat-N-optimized.csv/.md for chapters 1–15
│       │       └── ratN-deepseek.csv/.md and ratN-gemini.csv/.md (variants)
│       │
│       ├── chats/                                     [19 dated chat transcripts]
│       │   ├── CHAT-INDEX.md
│       │   └── 2026-07-05 through 2026-07-10 sessions
│       │
│       ├── data/                                      [2 video config files]
│       │   ├── ch07_videos_batch.yml
│       │   └── video-registry.md
│       │
│       ├── design/
│       │   └── shadcn-evaluation.md
│       │
│       ├── files/                                     [STABLE PRODUCTION SOURCE]
│       │   ├── manifests/
│       │   │   └── source-import-manifest.csv
│       │   │
│       │   └── source/                                [91 MB — "crown jewels"]
│       │       ├── appendices/                        [3 appendix files]
│       │       │   ├── appendix-a-terms-treasury-2026-06-21.md
│       │       │   ├── appendix-b-access-tutorials-2026-06-21.md
│       │       │   └── appendix-c-sql-reference-2026-06-21.md
│       │       │
│       │       ├── chapters/                          [19 chapter dirs — stable files]
│       │       │   ├── 01-acknowlgements/             [preface/cover only]
│       │       │   ├── ch01-introduction-to-course/   [6-part contract + lab + review HTML/PDF]
│       │       │   ├── ch02-mis-and-bitm/             [6-part contract]
│       │       │   ├── ch03-what-is-data/             [6-part contract]
│       │       │   ├── ch04-databases/                [6-part contract]
│       │       │   ├── ch05-sql/                      [6-part contract + lab]
│       │       │   ├── ch06-relational-model/         [6-part contract + lab]
│       │       │   ├── ch07-normalization/            [6-part contract + lab]
│       │       │   ├── ch08-midterm-review/           [6-part contract + extras]
│       │       │   ├── ch09-database-design/          [6-part contract + lab]
│       │       │   ├── ch10-advanced-sql-queries/     [6-part contract + lab]
│       │       │   ├── ch11-database-administration/  [6-part contract + lab + LEGACY]
│       │       │   ├── ch12-business-intelligence/    [6-part contract + LEGACY]
│       │       │   ├── ch13-advanced-database-techniques/ [6-part contract]
│       │       │   ├── ch14-powerbi/                  [6-part contract + alt version]
│       │       │   ├── ch15-business-strategy-is/     [6-part contract + merge-plan]
│       │       │   ├── ch16-final-review/             [6-part contract]
│       │       │   └── ch17-conclusion/               [6-part contract + README]
│       │       │
│       │       ├── labs/                              [17 lab folders + extract script]
│       │       │   ├── lab-01-petvax-intro/ through lab-17-conclusion/
│       │       │   └── extract-accdb-to-markdown.py
│       │       │
│       │       └── outline/                           [12 outline files]
│       │           ├── BOOK-OUTLINE-Complete.md
│       │           ├── chapter-registry.yml
│       │           ├── outline-2026-06-05.md through outline-2026-06-16.md
│       │           └── outline-labs/lets-build variants
│       │
│       ├── plans/                                     [REORG TARGET — scattered]
│       │   ├── 2026-07-08-copilot-repo-restructure-plan.md
│       │   ├── 2026-07-10-repo-restructure-detailed-plan.md
│       │   ├── design-instructions.md                 [canonical CSS/brand spec]
│       │   ├── repo-reorg-plan-2026-07-09.md
│       │   ├── vscode-profile-consolidation-agent-plan-v2.md
│       │   │
│       │   ├── active/
│       │   │   └── restructure-plan-2026-07-08.md
│       │   │
│       │   ├── book-edit/                             [29 plan files + 1 subdir]
│       │   │   ├── README.md + SUMMARY.md
│       │   │   ├── database-book-plan-*.md            [~10 dated plan variants]
│       │   │   ├── reader-hybrid-v1.1-*.md            [design + implementation plans]
│       │   │   ├── NEXT-MOVES-2026-06-17.md
│       │   │   └── _imported-docs/                    [Drive-imported outlines, labs, terms]
│       │   │
│       │   ├── image-organizing/                      [5 image/media plans]
│       │   │
│       │   └── outline/                               [3 outline copies]
│       │       ├── outline-2026-06-05.md
│       │       ├── outline-2026-06-12.md
│       │       └── outline-notes-06-12.md
│       │
│       ├── platform-claude-5-30/                      [stray .next/ folder]
│       │
│       ├── platform-pilots/                           [687 MB — ALL reader experiments]
│       │   ├── README.md, pilots.json, evaluation.md, notes-06-05.md
│       │   │
│       │   ├── ai-studio/                             [Vite + Firebase]
│       │   ├── antigravity/                           [empty]
│       │   ├── book-build/                            [DOCX + legacy build + prototype DUPLICATE]
│       │   │   ├── bitm330-book-main-2026-05-06.docx
│       │   │   ├── ch01–ch04 individual DOCX exports
│       │   │   ├── prototype/                         [234 MB — EXACT DUPLICATE of prototype/ below]
│       │   │   └── _tmp/
│       │   ├── chat-gpt/                              [docs + temp-online-reader]
│       │   ├── claude/                                [Next.js app — Supabase, auth, Stripe]
│       │   ├── cursor-online-reader/                  [Vite — basic]
│       │   ├── google-ai-studio/                      [Vite + Firebase — 19 chapters loaded]
│       │   ├── prototype/                             [static HTML — index, reader, dashboard, labs]
│       │   ├── reader-hybrid/                         [Vite — basic]
│       │   ├── reader-hybrid-alt/                     [Vite — basic]
│       │   │
│       │   ├── reader-hybrid-v1.1/                    [⭐ PRODUCTION — 6.3 MB]
│       │   │   ├── Vite React SPA
│       │   │   ├── Supabase Edge Functions (stripe-checkout, stripe-webhook)
│       │   │   ├── 20 React components (AdminDashboard, ChapterReader, HomePage, MarkdownRenderer...)
│       │   │   ├── generateBookData.ts → src/generated/bookData.ts
│       │   │   ├── Deployed: data-pilot.dimapublishing.com via root vercel.json
│       │   │   └── PWA icons, reading progress, image lightbox
│       │   │
│       │   └── scripts/
│       │       └── generate-pages-gallery.mjs
│       │
│       └── scripts/                                   [3 import/rebaseline scripts]
│           ├── import-latest-drafts.ps1
│           ├── rebaseline-ch01-07.ps1
│           └── roadmap-audit.ps1
│
├── chapter-review-ch10-17/                            [14 files — ch10–17 review artifacts]
│   ├── AUDIT-AND-REVISION-PLAN.md + Nim-Answer.md
│   ├── CHANGES-APPLIED.md
│   ├── Chapter-10-COMPLETE.md through Chapter-17-COMPLETE.md
│   ├── IMAGE-PROMPTS-nano-banana.md
│   └── VIDEO-PROMPTS-NotebookLM.md
│
├── corporation/                                       [1 file]
│   └── ChatGPT - corp guidlines_files.md
│
├── data/                                              [2 video config files]
│   ├── uploaded_videos.json
│   └── video_batch.example.yml
│
├── Dima-publishing-site/                              [junk — files named "https" and "g.co ge.txt"]
│
├── scripts/                                           [15 files]
│   ├── build-chapter-html.ps1                         [KEEPER]
│   ├── build-chapter-pdf.ps1                          [KEEPER]
│   ├── build-chat-index.ps1                           [KEEPER]
│   ├── build-review-index.ps1                         [KEEPER]
│   ├── compile-appendix-a.py                          [KEEPER]
│   └── temp-fix-*.ps1, temp-sync-*.ps1, temp-regen-*.ps1, temp-verify.ps1  [9 one-shots]
│
├── secrets/                                           [YouTube API credentials]
│   ├── youtube_client_secret.json
│   └── youtube_token.json
│
├── ROOT FILES (clutter):
│   ├── vercel.json                                    [production deploy config — paths 4 levels deep]
│   ├── README.md
│   ├── AGENTS.md
│   ├── .gitignore                                     [has bug: .env* cancels !.env.example]
│   ├── .vercelignore
│   ├── convert.ps1
│   ├── gen-log.txt
│   ├── NEXT-SESSION.md
│   ├── BITM330-book-drive.lnk                          [Windows shortcut — meaningless in repo]
│   ├── ch01-cover-base64.txt                           [2.3 MB — PNG exists, delete this]
│   ├── ch01-cover.png
│   ├── bitm330-lab01-grader-codex.py                   [course tooling, not publishing]
│   ├── skills-lock.json
│   └── __pycache__/
│
└── [also: .env, .env.local at root]
```

### dima-publishing Quick Stats

| Metric | Value |
|---|---|
| Total working tree | ~1.3 GB |
| `.git` history | 465 MB |
| Known exact duplicates | ~234 MB (`book-build/prototype/` = `prototype/`) |
| Chapter source files (stable) | ~240 .md files across 19 chapter dirs |
| Platform pilots | 9 pilot projects, 1 production (`reader-hybrid-v1.1`) |
| Plan files (scattered) | ~35+ across 4+ locations |
| Skills | 71 active + 7 archived |
| One-shot scripts | 9 of 15 in root `scripts/` |
| Dead/root clutter items | ~12 |

---

## PART 2: `BITM330-book-drive` Google Drive Workspace

Location: `G:\My Drive\0-Projects\!-important\BITM330-book-drive`
Role: Textbook drafting, media library, publishing contracts

```
BITM330-book-drive/
│
├── AGENTS.md                                         [agent instructions — maps the project]
├── README.md
├── START-HERE.md
├── LICENSE
├── desktop.ini
├── skills-lock.json
├── upfly.config.json
├── BITM330-book-drive.csv                            [workspace index?]
├── DEPRECATED-BITM330-book-in-drive.code-workspace
├── -w                                                [unknown file]
├── ch02-concepts.jpg                                 [stray image at root]
│
├── .github/
│   └── copilot-instructions.md
│
├── .vscode/                                          [workspace config]
│   ├── tasks.json, settings.json, extensions.json
│   ├── markdown.code-snippets, keybindings.json, mcp.json
│   ├── BUILD-PIPELINE.md, Upload-videos-SKILL.md
│   ├── profiles/                                     [4 VS Code profiles]
│   └── upload-book-videos/                           [legacy skill with own SKILL.md]
│
├── .cursor/
│   └── rules/                                        [3 Cursor rules files]
│
├── .agents/                                          [NOTE: junction to dima-publishing\.agents]
│   ├── skills/                                       [3 skills — subset]
│   │   ├── daily-work-log/
│   │   ├── supabase/
│   │   └── supabase-postgres-best-practices/
│   └── prompts/
│
├── .history/                                         [local file history]
├── .upfly/                                           [upload tracking]
├── .venv/                                            [Python virtualenv]
├── .tmp/                                             [25+ temp recovery/work dirs]
│
├── BITM/                                             [1 course catalog page]
│
├── BITM330-Book-draft/                               [⭐ PRIMARY BOOK CONTENT]
│   ├── _config.yml, _toc.yml                         [Jupyter Book config — possibly legacy]
│   ├── intro.md, comments.md, references.bib
│   ├── LATEST.md
│   ├── BITM 330 Textbook Development.txt
│   ├── BITM330-BOOK-Notes2-test.docx
│   │
│   ├── _static/images/
│   ├── _build/                                       [Jupyter Book HTML build output]
│   │
│   ├── Chats/                                        [1 chat file]
│   ├── Feedback/                                     [student feedback surveys + PDF report]
│   ├── Book-feedback/                                [feedback survey drafts]
│   │
│   ├── appendices/                                   [3 appendix files]
│   │   ├── appendix-a-terms-treasury-2026-06-21.md
│   │   ├── appendix-b-access-tutorials-2026-06-21.md
│   │   └── appendix-c-sql-reference-2026-06-21.md
│   │
│   ├── resources/                                    [research + tools references]
│   │   ├── BITM330-book-notes.md, INDEX.md, cover.md
│   │   ├── Database Design and ER Modeling Textbook.md
│   │   ├── SQL-notebook.ipynb
│   │   ├── .gdoc reference files (~18)
│   │   └── tools/                                    [external tool reference pages]
│   │
│   ├── Labs/                                         [ALTERNATE lab structure]
│   │   ├── README.md, labs-outline.md
│   │   ├── sections/                                 [labs organized by book part]
│   │   │   ├── part-01-foundations/ (ch01–ch04)
│   │   │   ├── part-02-databases/ (ch05–ch09)
│   │   │   ├── part-03-building/ (ch10–ch14)
│   │   │   ├── part-04-strategy/ (ch15–ch17)
│   │   │   └── legacy-misfiled-sources/
│   │   ├── platform-experiments/replit/
│   │   └── archive/                                  [original sources + pre-draft assets]
│   │
│   └── chapter-drafts/                               [⭐⭐ 22 CHAPTER FOLDERS — where authoring happens]
│       │
│       ├── .archive/                                 [13 legacy full-book/outline files]
│       │
│       ├── 0-cover-image/                            [cover.gif + main + sources + .images]
│       ├── 0-homepage/                               [HTML export + video reference]
│       │
│       ├── 0-book-outline/                           [OUTLINE WORKING FOLDER — 17 files]
│       │   ├── outline-7-7-26.md                     [latest canonical?]
│       │   ├── current-outline-2026-07-07.md
│       │   ├── BITM330-book-outline-MASTER-2026-07-10.md
│       │   ├── BITM330-book-outline-FINAL-2026-07-09-claude.md
│       │   ├── BITM330-book-outline-FINAL-2026-07-10-gpt56.md
│       │   ├── BITM330-book-outline-UNIFIED-FINAL-2026-07-10-claude.md
│       │   ├── outline-Gemini-2026-07-07.md
│       │   ├── outline-GLM-2026-07-07.md
│       │   ├── outline-GPT-2026-07-07.md
│       │   ├── outline-DeepSeek-2026-07-07.md
│       │   ├── side-by-side-outline-comparison-2026-07-08.md
│       │   ├── outline-final-chatgpt-7-10-26.md
│       │   └── old-outline/
│       │
│       ├── 01-acknowledgements/                      [preface chapter — all 7 parts]
│       │
│       ├── ch01-introduction-to-course/               [⭐⭐ FULL CHAPTER — all 7 parts + sources + edits]
│       │   ├── ch01-title.md, ch01-outline.md
│       │   ├── .edits/ (4 dated edit files)
│       │   ├── .images/ (figures CSV + image ideas)
│       │   ├── .archive/, working/, .build/
│       │   ├── ch01-sources/ (6 source files + study guide)
│       │   ├── main/          → ch01-main-2026-06-21.md
│       │   ├── lets-build/    → ch01-lets-build-2026-06-21.md
│       │   ├── terms/         → ch01-terms-2026-06-21.md
│       │   ├── reflection/    → ch01-reflection-2026-06-21.md
│       │   ├── rat/           → ch01-rat-2026-06-21.md
│       │   ├── lab/           → ch01-lab-questions/answers-2026-06-03.md
│       │   └── index/         → ch01-index-2026-06-19.md
│       │
│       ├── ch02-mis-and-bitm/                         [⭐⭐ FULL CHAPTER]
│       │   ├── title + outline + .edits (3) + .images (8 prompt/CSV files)
│       │   ├── ch02-sources/ (9 source files)
│       │   ├── main/          → ch02-main-2026-06-22.md
│       │   ├── lets-build/    → ch02-lets-build-2026-06-20.md
│       │   ├── terms/         → ch02-terms-2026-06-22.md
│       │   ├── reflection/    → ch02-reflection-2026-06-21.md
│       │   ├── rat/           → ch02-rat-2026-06-21.md
│       │   ├── lab/           → questions/answers-2026-06-03.md
│       │   └── index/
│       │
│       ├── ch03-what-is-data/                         [⭐⭐ FULL CHAPTER — similar structure]
│       ├── ch04-databases/                            [⭐⭐ FULL CHAPTER]
│       ├── ch05-sql/                                  [⭐⭐ FULL CHAPTER]
│       ├── ch06-relational-model/                     [⭐⭐ FULL CHAPTER]
│       ├── ch07-normalization/                        [⭐⭐ FULL CHAPTER]
│       ├── ch08-midterm-review/                       [⭐⭐ FULL CHAPTER + midterm-data/]
│       │
│       ├── ch09-database-design/                      [⭐⭐ FULL CHAPTER — TWO main files]
│       │   ├── main/ → ch09-main-2026-06-20.md AND ch09-main-2026-07-10.md
│       │   └── [rest standard 7-part structure]
│       │
│       ├── ch10-advanced-sql-queries/                 [⭐⭐ FULL CHAPTER + SQL ref files]
│       ├── ch11-database-administration/              [⭐⭐ FULL CHAPTER + ch11-all-sections-2026-07-06.md]
│       ├── ch12-business-intelligence/                [⭐⭐ FULL CHAPTER + ch12-all-sections-2026-07-06.md]
│       ├── ch13-advanced-database-techniques/         [⭐⭐ FULL CHAPTER]
│       ├── ch14-powerbi/                              [⭐⭐ FULL CHAPTER]
│       ├── ch15-business-strategy-is/                 [⭐⭐ FULL CHAPTER + merge-plan]
│       ├── ch16-final-review/                         [⭐⭐ FULL CHAPTER]
│       ├── ch17-conclusion/                           [⭐⭐ FULL CHAPTER]
│       │
│       ├── ch18-supabase/                             [source files only — no dated drafts yet]
│       │
│       ├── Labs-draft/                                [ALTERNATE lab drafts — 20+ lab folders]
│       └── sources/                                   [10 Access-related MD reference files]
│
├── .docs/                                             [REFERENCE DOCS — significant overlap with repo]
│   ├── BITM330-book-notes.gdoc
│   ├── BITM 330 Textbook Development.txt/.md
│   ├── comments.md, intro.md, references.bib
│   ├── _config.yml, _toc.yml
│   ├── image-snippets.md, font-awesome.md, Emoji Cheat Sheet.md
│   ├── csvkit-capabilities.csv
│   ├── migration-log.md, canonical-locations.md
│   ├── WORKSPACE-MAP-*.md (3 dated maps)
│   ├── publishing-workflow.md
│   │
│   ├── .edits/                                        [DRIVE-SIDE edit tracking — deprecated per user preference]
│   │   ├── chapter-tracker.md
│   │   ├── feedback-summary-2026-05-18.md
│   │   ├── chapter_flow_review_comments_2026-05-18.md
│   │   ├── edits-2026-05-27/30/06-03
│   │   └── archive-old/
│   │
│   ├── .styles/                                       [13+ files — design system, reference docs, CSS]
│   │   ├── design-instructions.md                     [WORKING COPY — canonical in repo plans/]
│   │   ├── google-docs-style.md, reference.md/.docx/.html
│   │   ├── visual-guidline-5-19.md
│   │   ├── bitm330_textbook_visual_design_system.md
│   │   ├── bitm330_textbook_image_prompt_generator.md
│   │   └── build_google_docs_reference.py
│   │
│   ├── .scripts/                                      [7 utility scripts — duplicates some from /scripts/]
│   │
│   ├── outline/                                       [10 outline files — dated 2026-05-06 to 2026-06-05]
│   │   └── BOOK-OUTLINE-Complete.md, outline-2026-05-21.md, etc.
│   │
│   ├── styles/                                        [quarto-wizard-inspired.css]
│   ├── reference/                                     [Markdown/SQL cheat sheets]
│   ├── RATS/                                          [quiz PDFs, guidelines, sample CSV]
│   ├── lets-build/                                    [outline + master guide + Examples/ SQL/CSV/XLSX]
│   ├── Terms/                                         [terms-list.csv + terms-skill.md]
│   ├── Notes/                                         [2 files]
│   ├── build-labs/                                    [extensive lab-planning docs + Python web app prototypes]
│   ├── book-build/                                    [DOCX exports + prototype/ + book-build-library/]
│   └── quarto-preview/                                [Quarto experiment]
│
├── .images/                                           [⭐⭐ MEDIA LIBRARY — the image source of truth]
│   ├── book-media.md                                  [PRIMARY ledger/cache]
│   ├── book-media-format.md
│   ├── master-image-index.csv
│   │
│   ├── ch00-general/                                  [branding assets]
│   │   ├── let's-build-erd.png, learning-arc.svg, book-cover.svg
│   │   ├── ch00-used/, optimized/, sections-used/, sections/
│   │   ├── logo/ (20+ DIMA logo variants)
│   │   └── Cover/ (50+ cover art variants)
│   │
│   ├── ch01-welcome-to-the-textbook/                  [used + unused + archive + loose files]
│   ├── ch02-mis-bitm/                                 [used + unused + archive + sub-dirs + PPTs]
│   ├── ch03-what-is-data/                             [used + unused + archive + slides]
│   ├── ch04-databases/                                [used + unused + archive + recommend-delete + slides]
│   ├── ch05-sql/                                      [used + unused + archive + slides]
│   ├── ch06-relational-model/                         [used + unused + archive + 50+ loose images]
│   ├── ch07-normalization/                            [used + unused + archive + gemini/ + videos/ + audio]
│   ├── ch08-advanced-sql-queries/                     [NOTE: folder name mismatch vs chapter numbering]
│   ├── ch08-midterm/                                  [separate midterm images]
│   ├── ch09-database-design/                          [used + unused + archive + 70+ loose files]
│   ├── ch10-advanced-sql-queries/                     [used + unused + archive + 60+ loose files]
│   ├── ch11-database-administration/                  [used + unused + archive]
│   ├── ch12-business-intelligence/                    [used + unused + archive]
│   ├── ch13-advanced-database-techniques/             [used + unused + archive]
│   ├── ch14-business-strategy-and-is/                 [used + unused + archive + loose PNGs]
│   ├── ch15-final-review/                             [used + unused + archive]
│   ├── ch16-conclusion-from-data-to-wisdom/           [used + unused + archive]
│   ├── Ch14 PowerBI/                                  [image prompts — legacy naming]
│   ├── Ch15 Business Strategy and IS/                 [image prompts — legacy naming]
│   ├── Ch16 Final Review/                             [image prompts — legacy naming]
│   ├── Ch17 Conclusion/                               [image prompts — legacy naming]
│   │
│   ├── .videos/                                       [40+ chapter preview MP4s]
│   ├── .audio/                                        [5 audio files]
│   ├── labs/                                          [petvax images]
│   ├── vsc/                                           [screenshots]
│   ├── archive/                                       [10+ archive subfolders by chapter]
│   └── _inventory/                                    [CSV + HTML media inventories per chapter]
│
├── book-platform/                                     [Flask-based reader prototype — NOT the production app]
│   ├── README.md, requirements.txt
│   └── app/ (main.py, content.py, templates/, static/)
│
├── publishing/                                        [PUBLISHING CONTRACTS]
│   ├── ISBN.md
│   ├── Cengage/                                       [business plans, pitch decks, contract PDFs, videos]
│   │   └── presntation/ (slides, scripts, recordings, transcripts)
│   ├── VitalSource/                                   [contract + metadata]
│   ├── contracts/                                     [Adoption & Insights PDFs]
│   └── Ualbany/                                       [Conflict of Interest + Ethics docs]
│
├── lectures/                                          [~20 files — transcripts, VTT, scripts, notes]
│   └── recordings/ (MP3 + EPUB)
│
├── scripts/                                           [50+ UTILITY SCRIPTS — JS, Python, PowerShell]
│   ├── Image pipeline: download_images.py, optimize-chapter-images.ps1, cld-upload.ps1
│   ├── Cloudinary: cloudinary-inventory.js, create-cloudinary-folders.js, upload-to-cloudinary.js
│   ├── Per-chapter automation: ch01..ch10-image-pipeline-automation.js
│   ├── DOCX: build-chapter-docx.ps1, build-book-docx.ps1
│   ├── Media: build-media-inventory.py, rebuild-media-master-gallery.ps1
│   ├── Labs: extract-accdb-to-markdown.py, copy-labs-to-chapters.ps1, compare-labs.ps1
│   ├── Chapter ops: consolidate-ch11-ch12.ps1, organize-chapter-folders.ps1, archive-chapter.ps1
│   └── Notebooks: Google_Docs_to_Markdown_Converter.ipynb, SQL-notebook.ipynb
│
└── do-not-delete-yet/                                 [PENDING REVIEW / DEPRECATED]
    ├── .agents-deprecated/                            [ARCHIVED — do not use]
    ├── 2026-07-02-root-clutter/                       [moved root files]
    ├── 2026-07-02-snapshots/                          [temp snapshot]
    ├── BITM330-Book-git-archive/                      [Cengage + Lectures + scripts copies]
    ├── archive-ch10-sdlc/                             [old ch10 SDLC chapter parts]
    ├── chapter-exports/                               [2 PDF chapter exports]
    ├── old-book-exports/                              [5 legacy full-book exports]
    ├── project-feedback/                              [Student Feedback Analysis Report]
    └── course-materials/                              [2 course files]
```

### BITM330-book-drive Quick Stats

| Metric | Value |
|---|---|
| Chapter draft folders | 18 active (ch01–ch18) + 4 meta + Labs-draft + sources = 24 |
| Chapter parts per chapter | Typically 7 (main, lets-build, terms, reflection, rat, lab, index) |
| Latest main dates | ch01–ch04: 06-21/22; ch05–ch17: 06-19/21; ch09: 07-10 (today); ch18: source only |
| Image chapter folders (.images/) | 22 chapter folders + general + videos + audio + archive + inventory |
| Chapter preview videos | 40+ MP4s in `.images/.videos/` |
| Outline files (across locations) | 17 in `0-book-outline/`, 10 in `.docs/outline/`, 12 in repo `files/source/outline/` |
| Utility scripts | 50+ (Python, JS, PowerShell) |
| `.docs/` subfolders | 13 (edits, styles, scripts, outline, RATS, lets-build, Terms, build-labs, etc.) |
| `do-not-delete-yet/` subfolders | 10 (agents-deprecated, root-clutter, archive-ch10-sdlc, old-book-exports, etc.) |

---

## Key Structural Observations

### Cross-Location Duplication

| Content | dima-publishing | BITM330-book-drive | Notes |
|---|---|---|---|
| `.agents/` | Full 71 skills | Junction to repo | Same files — this is correct |
| Chapter source (stable) | `books/database-book/files/source/chapters/` | — | One-way import from Drive |
| Chapter drafts (dated) | — | `BITM330-Book-draft/chapter-drafts/` | Authoring happens here |
| Appendices | `files/source/appendices/` | `BITM330-Book-draft/appendices/` | Same 3 files — sync needed |
| Outline files | `files/source/outline/` (12) + `plans/outline/` (3) | `0-book-outline/` (17) + `.docs/outline/` (10) | ~42 outline-related files across locations |
| Design instructions | `plans/design-instructions.md` (canonical) | `.docs/.styles/design-instructions.md` (working copy) | Intentional mirror |
| Prototype (static) | `platform-pilots/prototype/` + `book-build/prototype/` (DUPLICATE) | `.docs/book-build/prototype/` (3rd copy?) | 234 MB wasted on duplication |
| Edit tracking | `.edits/` (19 files — primary) | `.docs/.edits/` (deprecated per user) | User prefers repo-based tracking |
| Chapter tracker | `.edits/chapter-tracker.md` (primary) | `.docs/.edits/chapter-tracker.md` (stale) | Repo copy is canonical |
| DOCX exports | `platform-pilots/book-build/` | `.docs/book-build/` | Overlap — different versions |
| Labs | `files/source/labs/` (stable) | `Labs/sections/` + `Labs-draft/` (draft) | Different organizational schemes |

### Naming Inconsistencies

- Image folder `ch08-advanced-sql-queries/` in `.images/` — but ch08 is Midterm Review and ch10 is Advanced SQL
- Legacy-named image folders: `Ch14 PowerBI/`, `Ch15 Business Strategy and IS/`, `Ch16 Final Review/`, `Ch17 Conclusion/` (capital-C, spaces, no chNN- prefix)
- `ch14-business-strategy-and-is/` vs. chapter folder `ch14-powerbi/` — image folder name doesn't match chapter name
- `ch15-final-review/` image folder vs. chapter `ch16-final-review/` — off by one

### Root-Level Clutter (dima-publishing)

- `ch01-cover-base64.txt` (2.3 MB — PNG exists)
- `BITM330-book-drive.lnk` (Windows shortcut — meaningless in git)
- `gen-log.txt` (stale build log)
- `convert.ps1` (one-shot?)
- `NEXT-SESSION.md` (handoff note — should be in workflow/)
- `bitm330-lab01-grader-codex.py` (course tooling)
- `__pycache__/` (committed by accident)
- `.env` + `.env.local` at root (should be gitignored)

### .gitignore Issues (dima-publishing)

- Bare `.env*` line cancels the `!.env.example` exception
- Missing: `__pycache__/`, `*.pyc`, `**/dist/`, `*.lnk`
