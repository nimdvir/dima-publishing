# Reader Hybrid Prototype — Implementation Plan (v1, final)

You are working in this repository:

```
C:\Users\nd115232\Documents\GitHub\dima-publishing
```

Project root: database-book

Your task is to create a new frontend-only online textbook reader prototype at:

```
books/database-book/platform-pilots/reader-hybrid/
```

Do not modify, rename, delete, or overwrite any existing source files or any existing platform pilot. Other pilots are reference material only.

---

## 0. Authoritative Refinements (these override anything below that contradicts them)

1. Use **strict per-section dated fallback regex** patterns (one regex per section type per chapter).
2. **Page-break handling order**: normalize all supported page-break variants to one internal marker → split → trim each segment → drop empty/whitespace-only segments.
3. The generator **must never throw for missing section or lab files**; always emit a placeholder object instead.
4. **Failure boundary**: if the required chapter source root is missing, or zero of the four required chapter folders can be resolved, exit non-zero with a clear error and do not write a partial `bookData.ts`.
5. Implement a **custom `rehype-sanitize` schema** that allows callout classes and YouTube / youtube-nocookie iframes only. Do not allow Vimeo, Loom, script tags, inline JavaScript, event-handler attributes, or arbitrary iframe sources.
6. **Do not create `GENERATION_REPORT.md` in v1.** A console summary plus the `GENERATION_WARNINGS` export is sufficient.
7. Do not add `lucide-react`. Use inline SVG or simple Unicode/text icons.
8. Build is **frontend-only**: no backend, no real auth, no payment, no database, no live AI API.
9. **localStorage key for the demo user**: `reader-hybrid:demoUser`. No other persistence.

---

## 1. Discovery Pass (do this first)

Inspect the filesystem before writing code. Do not ask the user to confirm anything you can read directly.

Read:

```
books/database-book/platform-pilots/
books/database-book/platform-pilots/prototype/
books/database-book/platform-pilots/cursor-online-reader/
books/database-book/platform-pilots/ai-studio/
books/database-book/platform-pilots/chat-gpt/docs/
books/database-book/files/source/chapters/
books/database-book/files/source/labs/
```

Inspect chapter folders:

```
files/source/chapters/ch01-introduction-to-course/
files/source/chapters/ch02-mis-and-bitm/
files/source/chapters/ch03-what-is-data/
files/source/chapters/ch04-databases/
```

Inspect lab folders (first four, if present):

```
files/source/labs/lab-01-petvax-intro/
files/source/labs/lab-02-petvax-system/
files/source/labs/lab-03-data-types-and-tables/
files/source/labs/lab-04-intro-to-access/
```

Current expected state to verify:
- `reader-hybrid/` does not exist yet.
- Stable section files (`core-concepts.md`, `lets-build.md`, etc.) likely do not exist; chapters rely on dated fallbacks.
- The first four lab folders are likely empty.
- Page-break markers appear in mixed formats.

After discovery, proceed unless there is a serious blocking ambiguity.

---

## 2. Goal

Build a working local online textbook prototype that loads:
1. Chapters 1–4 from `files/source/chapters/`.
2. The first four labs from `files/source/labs/`.

The prototype includes:

```
polished home page
book cover / entry page (CSS-only)
demo login / access page
online reader
collapsible sidebar
chapter navigation
section navigation
page-break-based reader pages
labs area
AI assistant interface
previous / next navigation
responsive mobile layout
safe Markdown rendering
```

The prototype should feel like a real online textbook platform but contain no production infrastructure.

---

## 3. App Scopes

```
welcome | book | labs | ai-assistant | login
```

- Start on welcome.
- "Enter Reader" → `book`. "Labs" → `labs`. "AI Assistant" → `ai-assistant`. "Login / Access" → `login`.
- Sidebar and header reflect the current scope.
- No real access restriction. Login is visual/demo only.

---

## 4. Source Content: Chapters

Use only the four chapter folders listed in §1. Do **not** edit anything under `files/source/chapters/`.

Each chapter exposes six reader sections, in this exact order and with these exact labels:

```
Introduction
Core Concepts
Let's Build
Review Questions
Terms Treasury
RAT: Reading Test
```

Use the label `Core Concepts`. Never use `Main Concepts`.

---

## 5. Chapter File Resolution

Preferred stable filenames:

```
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
```

Resolution order per section:

```
Introduction       : index.md → placeholder
Core Concepts      : core-concepts.md     → latest chNN-main-YYYY-MM-DD.md       → placeholder
Let's Build        : lets-build.md        → latest chNN-lets-build-YYYY-MM-DD.md → placeholder
Review Questions   : review-questions.md  → latest chNN-reflection-YYYY-MM-DD.md → placeholder
Terms Treasury     : terms-treasury.md    → latest chNN-terms-YYYY-MM-DD.md      → placeholder
RAT: Reading Test  : rat.md               → latest chNN-rat-YYYY-MM-DD.md        → placeholder
```

For dated fallback files, pick the latest valid `YYYY-MM-DD`.

**Strict per-section regex** (one per chapter, e.g. for ch01):

```
^ch01-main-\d{4}-\d{2}-\d{2}\.md$
^ch01-lets-build-\d{4}-\d{2}-\d{2}\.md$
^ch01-reflection-\d{4}-\d{2}-\d{2}\.md$
^ch01-terms-\d{4}-\d{2}-\d{2}\.md$
^ch01-rat-\d{4}-\d{2}-\d{2}\.md$
```

Exclude any filename containing (case-insensitive): `edit | edits | rewrite | rewritten | draft | outline | concept | notes | scratch | backup | archive | TermTreasury`.

Placeholder content when no file resolves:

```markdown
# Section Missing

This section is not available yet.
```

---

## 6. Source Content: Labs

Read `files/source/labs/`, sort folders by numeric prefix, take the first four. If fewer than four exist, generate placeholders for the rest. Do not edit anything under `files/source/labs/`.

Per-lab resolution order:

```
1. <labFolder>/index.md
2. <labFolder>/README.md
3. first .md file in <labFolder>, sorted alphabetically
4. chapter-folder fallback: latest chapters/chNN-*/lab-NN-questions-YYYY-MM-DD.md (match lab number to chapter number)
5. placeholder
```

The chapter-folder fallback exists because lab folders may currently be empty. Emit `sourceType = 'chapter-fallback'` when used.

Labs appear in their own top-level area; they are not interleaved with chapter pages.

---

## 7. Reader Model

```
Chapter
  Section
    Page
```

Each section has one or more pages. Pages are produced by splitting on **explicit author page-break markers**.

Supported markers (any of):

```
<!-- PAGE BREAK -->
<!-- pagebreak -->
<!-- page-break -->
<div class="page-break"></div>
<div style="page-break-after: always;"></div>
```

Match case-insensitively, allow whitespace flexibility.

**Splitting rules** (in this order):

1. **Normalize** all supported markers to a single internal sentinel (e.g. `\u0000PAGEBREAK\u0000`).
2. **Split** the content on that sentinel.
3. **Trim** each resulting segment.
4. **Drop** any segment that is empty or whitespace-only.
5. If zero markers were present, the whole content is a single page.

Do not invent new page breaks. Do not try to detect table or code-block boundaries — trust the author.

Each `BookPage` includes:

```
id, slug, title, content,
pageNumber, totalPages,
chapterId, chapterSlug,
sectionId, sectionSlug, sectionTitle,
sourceFile, sourceType, exists
```

Page title = first heading in the segment, else `${sectionTitle} — Page ${n}`.

---

## 8. FLAT_READER_PAGES Ordering

Build `FLAT_READER_PAGES` as the source of truth for prev/next, linear reading, page count, and deep-link resolution.

Order:
1. Chapters: `ch01, ch02, ch03, ch04`.
2. Sections per chapter: `introduction, core-concepts, lets-build, review-questions, terms-treasury, rat`.
3. Pages per section: ascending `pageNumber`.

---

## 9. Deep Linking

Query-param format:

```
?scope=book&chapter=ch03&section=core-concepts&page=2
?scope=labs&lab=lab-01-petvax-intro
?scope=ai-assistant
?scope=login
```

Implement: read on load, write on navigate, `popstate` listener for back/forward. If `popstate` becomes costly, ship read+write only and document the gap in README.

---

## 10. Demo Login / Access Page

Visual/demo only. Fields: NetID, Student ID. Continue button. Trial/access status copy. Disclaimer:

```
Demo only — production login will use institutional authentication or Supabase Auth.
```

On submit:
- Store demo user state in React state and `localStorage` under `reader-hybrid:demoUser`.
- Show user chip in header. Allow sign out.
- Do not verify, do not send anywhere.

Do **not** collect: passwords, card number, CVC, expiration, billing ZIP, or any payment info.

---

## 11. AI Assistant Interface

UI prototype only. Includes: chat-style layout, prompt input, suggested prompts, context chips for current chapter/section/page, placeholder responses, disclaimer:

```
Prototype only — AI responses are simulated in this build.
```

Suggested prompts:

```
Explain this page in simpler language.
Give me a business example.
Quiz me on this section.
Summarize the key concepts.
Help me understand the SQL example.
Connect this idea to the lab.
```

On submit, append the prompt to the chat and append a simulated reply such as:

```
This is a prototype response. In the production version, this assistant will use the current page context.
```

Non-streaming is fine for v1. No external API calls. No keys. No backend routes.

---

## 12. Visual Design

Reference `platform-pilots/prototype/` for the warm academic aesthetic, DIMA Publishing brand header, surface cards, sidebar, prev/next cards, polished landing.

Reference `platform-pilots/ai-studio/` for the user chip, sidebar, lab scope, AI assistant scope, reader workspace.

Reimplement in React + plain CSS. Do not paste static HTML as architecture.

**Cover image**: CSS-only decorative cover card. Do not depend on any image path that may not exist.

---

## 13. Tech Stack

Use:

```
Vite, React, TypeScript,
react-markdown, remark-gfm, rehype-raw, rehype-sanitize
```

Do not add: Supabase, Firebase, Stripe, auth libraries, DB libraries, AI SDKs, external UI frameworks, `lucide-react`.

Plain CSS in `src/styles.css`. Use system-font CSS stacks; do not load Google Fonts in v1.

---

## 14. Folder Structure

```
books/database-book/platform-pilots/reader-hybrid/
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .gitignore
├── README.md
├── scripts/
│   └── generateBookData.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types.ts
    ├── styles.css
    ├── generated/
    │   └── bookData.ts
    └── components/
        ├── Layout.tsx
        ├── HomePage.tsx
        ├── DemoLogin.tsx
        ├── Sidebar.tsx
        ├── MobileNav.tsx
        ├── ChapterReader.tsx
        ├── MarkdownRenderer.tsx
        ├── BottomNavigation.tsx
        ├── LabsView.tsx
        └── AiAssistant.tsx
```

(No `GENERATION_REPORT.md`, no `src/assets/` unless actually needed.)

---

## 15. TypeScript Data Model (`src/types.ts`)

```
SourceType   = 'stable' | 'dated-fallback' | 'chapter-fallback' | 'placeholder'
ReaderScope  = 'welcome' | 'book' | 'labs' | 'ai-assistant' | 'login'
DemoUser     = { netId, studentId, accessStatus, createdAt }
BookChapter  = { id, slug, title, folderName, sections }
BookSection  = { id, slug, title, fileName, exists, sourceFile, sourceType, pages }
BookPage     = { id, slug, title, content, pageNumber, totalPages,
                 chapterId, chapterSlug, sectionId, sectionSlug, sectionTitle,
                 sourceFile, sourceType, exists }
BookLab      = { id, slug, title, folderName, content, exists, sourceFile, sourceType }
```

---

## 16. Generator Script (`scripts/generateBookData.ts`)

Responsibilities:

1. Iterate `ch01..ch04` in fixed order.
2. Resolve each of the six sections using stable → dated → placeholder, with strict regex (§5).
3. For each resolved file, run the page-split pipeline (§7).
4. Iterate the first four lab folders from `files/source/labs/`; resolve per §6 with chapter-folder fallback.
5. Build `BOOK_CHAPTERS`, `FLAT_READER_PAGES` (§8), `BOOK_LABS`, `GENERATION_WARNINGS`.
6. Write `src/generated/bookData.ts`. Use `JSON.stringify` to embed all Markdown content safely.
7. Print a console summary: chapters loaded, sections resolved (split by `sourceType`), pages generated, labs loaded (split by `sourceType`), placeholders generated, warnings list.

**Failure invariants**:
- Missing section file → placeholder, log warning, never throw.
- Missing lab file → placeholder or chapter-fallback, log warning, never throw.
- Missing required source root, or zero of the four required chapter folders resolvable → log a clear error to stderr and exit with non-zero status. Do **not** write a partial `bookData.ts`.

---

## 17. Markdown Rendering

`react-markdown` with:

```
remarkPlugins: [remarkGfm]
rehypePlugins: [rehypeRaw, [rehypeSanitize, customSchema]]
```

Support: headings, paragraphs, links, images, tables, task lists, fenced code blocks, inline code, blockquotes, HTML callout `<div>`s, YouTube iframes, `<figure>` / `<figcaption>`.

**Custom sanitize schema** extends `defaultSchema`:

- Allow elements: `div, span, iframe, img, figure, figcaption, p, a, table, thead, tbody, tr, th, td, pre, code, blockquote, ul, ol, li, h1-h6, strong, em, br, hr`.
- Allow attributes: `class`/`className` on `div`/`span`; `href`/`target`/`rel` on `a`; `src`/`alt`/`width`/`height` on `img`; `src`/`title`/`width`/`height`/`allow`/`allowFullScreen`/`frameBorder` on `iframe`.
- Iframe `src` must match `^https://(www\.)?(youtube\.com|youtube-nocookie\.com)/`. Drop or replace the iframe otherwise.
- Disallow: `<script>`, `on*` event handlers, inline JavaScript, Vimeo, Loom, all other iframe hosts.

---

## 18. Callout CSS

Style these classes (`.callout`, `.callout-tip`, `.callout-warning`, `.callout-example`, `.callout-key-takeaway`, `.tip`, `.warning`, `.example`, `.key-takeaway`, `.business-insight`, `.good-practice`, `.avoid`) and base elements (`blockquote`, `figure`, `figcaption`, `table`, `pre`, `code`, `img`).

Unknown callout classes should still look acceptable through generic `div[class]` styling.

---

## 19. Reader UI

Reader screen shows: active chapter title, active section title, active page title, `Page X of Y` for multi-page sections, optional `sourceType` debug pill, content via `MarkdownRenderer`, prev/next cards.

Sidebar: top-level scope links (Book, Labs, AI Assistant, Login / Access); Chapters 1–4 with the six sections; nested page links when a section has multiple pages.

Mobile: hamburger drawer at ≤768px.

---

## 20. Labs UI

List of four labs (or four placeholders). Active lab content via `MarkdownRenderer`. Prev/next lab nav. `sourceType` indicator (stable / chapter-fallback / placeholder). Notice that labs are prototype-only and not submission-enabled. No login required.

If all four lab folders are empty, the app must not crash; show clean placeholders or chapter-fallback content.

---

## 21. Home Page

Includes: DIMA Publishing brand; book title *Using Data to Drive Business Performance*; subtitle on databases, information systems, analytics, and managerial decision-making; author line *Nimrod Dvir, PhD*; CSS-only cover panel; CTA buttons (Enter Reader, Open Labs, Try AI Assistant, Demo Login / Access); short overview; "frontend prototype" notice.

System-font stack:

```
font-family: "Source Sans 3", "Source Sans Pro", system-ui, -apple-system,
             BlinkMacSystemFont, "Segoe UI", sans-serif;
```

---

## 22. Component Responsibilities (summary)

- **`App.tsx`** — scope/active state, localStorage hydration, query-param parse + write, prev/next resolution, scope routing.
- **`Layout.tsx`** — header, brand, scope title, user chip, sign out, sidebar shell, mobile wrapper.
- **`Sidebar.tsx`** — scope nav, chapter accordion, section links, nested page links, active state.
- **`MobileNav.tsx`** — hamburger toggle, overlay, close-on-select.
- **`HomePage.tsx`** — landing, cover card, CTAs, overview.
- **`DemoLogin.tsx`** — NetID + Student ID form, demo-only note, local submission.
- **`ChapterReader.tsx`** — reader header, metadata, MarkdownRenderer, Page X of Y, BottomNavigation.
- **`MarkdownRenderer.tsx`** — react-markdown wiring, GFM, raw HTML, custom sanitize schema, trusted iframe handling.
- **`BottomNavigation.tsx`** — prev/next cards across `FLAT_READER_PAGES` (or labs list).
- **`LabsView.tsx`** — lab list, active lab content, source status, placeholder handling.
- **`AiAssistant.tsx`** — chat UI, suggested prompts, context chips, simulated responses, no external calls.

---

## 23. Package Scripts

```json
{
  "scripts": {
    "generate": "tsx scripts/generateBookData.ts",
    "dev": "npm run generate && vite --host=0.0.0.0 --port=3000",
    "build": "npm run generate && vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  }
}
```

Dependencies:

```
react, react-dom,
react-markdown, remark-gfm, rehype-raw, rehype-sanitize
```

Dev:

```
typescript, vite, @vitejs/plugin-react, tsx,
@types/react, @types/react-dom, @types/node
```

---

## 24. .gitignore

```
node_modules/
dist/
.env
.env.local
.DS_Store
```

Commit `src/generated/bookData.ts`. Do not commit `dist/`.

---

## 25. README

Document: purpose; what was borrowed from each pilot; source chapter and lab folders; section mapping; fallback rules; page-break handling; deep-link format; demo login behavior; simulated AI behavior; install/run/build commands; known limitations; explicit "no backend / no payment / no database / no real auth / no live AI" notice.

Known limitations to call out:

```
stable section files may not exist yet → dated fallbacks used
labs may be empty → placeholders or chapter fallback
AI assistant is simulated
login is demo-only
no notes / progress / payment / auth persistence
```

Commands:

```
cd books/database-book/platform-pilots/reader-hybrid
npm install
npm run generate
npm run dev
npm run lint
npm run build
```

---

## 26. Verification

Run from `reader-hybrid/`:

```
npm install
npm run generate
npm run lint
npm run build
```

Expected generator console summary: 4 chapters loaded · 24 sections resolved · N reader pages · 4 labs loaded or placeholders · warnings if fallbacks/placeholders used.

Manual checklist:

1. App opens locally.
2. Home page is polished.
3. Sidebar shows only Chapters 1–4.
4. Each chapter has six sections.
5. Label is "Core Concepts," never "Main Concepts."
6. Latest dated fallback files are used where stable files are absent.
7. Page-break markers create separate reader pages.
8. Paired markers do not produce blank pages.
9. Marker HTML/comments are not visible in rendered content.
10. Prev/next navigation moves across pages.
11. `Page X of Y` shows for multi-page sections.
12. Tables, code blocks, images all render.
13. HTML callouts render and are styled.
14. YouTube and youtube-nocookie iframes render.
15. Non-allowed iframes are blocked or replaced.
16. `<script>` tags do not execute.
17. Inline event handlers do not execute.
18. Mobile drawer works at ≤768px.
19. Demo login works without a backend.
20. Header shows user chip after login.
21. Reload preserves demo user via localStorage.
22. Sign out clears demo user.
23. AI Assistant works with simulated responses only.
24. Labs section loads four labs or four placeholders.
25. Deep link `?scope=book&chapter=ch03&section=core-concepts&page=2` opens directly to that page.
26. Browser back/forward works (if `popstate` implemented).
27. No Supabase, Stripe, Firebase, real auth, real AI, payment logic, or note persistence was added.

---

## 27. Scope Boundaries

**Do not**: edit source chapter or lab files; modify other pilots; add backend services, database logic, payments, real login, real AI calls, API keys, note persistence; promote this to a production folder; commit `dist/`.

**Do**: create only the `reader-hybrid/` folder; load Chapters 1–4 and the first four labs; use latest available source files; support page-break-based reader pages; borrow visual direction from `prototype/`; borrow login, AI, and lab UI ideas from `ai-studio/`; keep it simple and maintainable; verify with generate, lint, and build.

---

## 28. Final Report

When finished, report:

```
files created
commands run
build result
chapters loaded
sections resolved (split by sourceType)
reader pages generated
labs loaded (split by sourceType)
warnings or limitations
exact local URL to open
```

Do not claim production readiness. This milestone is **Reader Hybrid v1** — a frontend prototype, not the final paid textbook platform.

---

**Proceed with this plan unless a blocking filesystem problem is found. Keep the implementation surgical, source-safe, and frontend-only.**