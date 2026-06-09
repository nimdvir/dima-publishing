## Assessment

DeepSeek completed several structural changes, but **the animation and full-width design were not implemented**.

The current package has `lucide-react`, but no `motion` or other animation library.  The home page renders the cover, hero, description, feature cards, CTAs, video, and TOC as ordinary static elements; there are no motion wrappers or entrance animations. 

There is also still a legacy rule restricting the reader to `max-width: 780px`, despite the newer article-plus-right-rail grid.  The new grid itself is correctly defined with a 240–260px “On this page” rail and a 900px article limit, but it cannot breathe properly while the parent remains constrained. 

The next agent should perform a **completion and cleanup pass**, not another conceptual redesign.

# Full Prompt for GPT-5.5 Fixed

```text
You are working in this repository:

C:\Users\nd115232\Documents\GitHub\dima-publishing

Target project:

books/database-book/platform-pilots/reader-hybrid-v1.1/

This is a focused completion pass for Reader Hybrid v1.1.

The previous agent reported the redesign as complete, but the current implementation still does not fully match the agreed design. In particular:

- the home page is static and lacks the Google-AI-Studio-inspired movement;
- the animated cover experience was not implemented;
- no motion dependency is installed;
- the reader still contains legacy width constraints that can make the article and “On this page” rail feel too narrow;
- the home page still reads as a vertical stack rather than a polished, wide-screen product hero;
- some legacy CSS and newer CSS coexist and may conflict.

Do not simply trust the previous final report. Inspect the actual current files and verify each requirement against the code.

────────────────────────────────────────────────────────────
1. HARD SCOPE BOUNDARIES
────────────────────────────────────────────────────────────

Work only inside:

books/database-book/platform-pilots/reader-hybrid-v1.1/

Do not modify:

books/database-book/platform-pilots/reader-hybrid/
books/database-book/platform-pilots/reader-hybrid-alt/
books/database-book/platform-pilots/google-ai-studio/
books/database-book/platform-pilots/reader-hybrid-v2/
books/database-book/files/source/
any repository-level file outside reader-hybrid-v1.1/

Do not modify generated book data manually.

Do not modify source chapter or lab Markdown files.

Do not add:

- Supabase
- Firebase
- Stripe
- real authentication
- real payment
- database logic
- backend routes
- server-side code
- API keys
- real AI calls
- AI Assistant navigation
- LMS integration
- note persistence

Keep:

- React 18
- Vite 5
- the current build-time Markdown generator
- current query-param deep links
- current page-break model
- current ReaderScope without AI Assistant
- Core Concepts naming
- frontend-only demo login
- current Markdown sanitization protections

Never use “Main Concepts.”

────────────────────────────────────────────────────────────
2. READ AND AUDIT FIRST
────────────────────────────────────────────────────────────

Before editing, inspect:

package.json
vite.config.ts
index.html
src/main.tsx
src/App.tsx
src/styles.css
src/index.css, if it still exists
src/components/Layout.tsx
src/components/HomePage.tsx
src/components/Sidebar.tsx
src/components/ChapterReader.tsx
src/components/MarkdownRenderer.tsx
src/components/OnThisPage.tsx
src/components/BottomNavigation.tsx
src/components/MobileNav.tsx
src/utils/headings.ts
scripts/generateBookData.ts

Also inspect these folders as read-only references:

books/database-book/platform-pilots/google-ai-studio/
books/database-book/platform-pilots/reader-hybrid-alt/

Use:

- google-ai-studio for visual language and movement;
- reader-hybrid-alt only for heading anchors and “On this page” logic.

Do not copy their architecture wholesale.

Before editing, identify:

1. every CSS rule controlling:
   - app width;
   - main-content width;
   - chapter-reader width;
   - reader-body grid;
   - markdown-body width;
   - home-page width;
   - home-hero width;
   - cover dimensions;
2. duplicate or conflicting selectors;
3. whether index.css is imported;
4. whether motion is already configured;
5. whether the deployed layout is being constrained by a legacy rule such as:
   .chapter-reader { max-width: 780px; }
6. whether the current “On this page” IDs exactly match rendered H2/H3 IDs.

Proceed after the audit. Do not ask the user questions that can be answered from the files.

────────────────────────────────────────────────────────────
3. PRODUCT DIRECTION
────────────────────────────────────────────────────────────

The desired result combines:

- the working Reader Hybrid generator and content architecture;
- the clean white/zinc visual language of Google AI Studio;
- subtle but visible movement;
- a wider documentation-style reader;
- a sticky right-side “On this page” rail;
- a polished product landing page;
- the book’s navy, teal, and gold identity used sparingly.

The product model remains:

Chapter
  → Reader Area
      → Markdown Subsections
          → Page Segments

The six reader areas are:

- Introduction
- Core Concepts
- Let’s Build
- Review Questions
- Terms Treasury
- RAT: Reading Test

They are not the chapter’s only internal subsections. Preserve all Markdown H2/H3 headings.

────────────────────────────────────────────────────────────
4. ALLOWED NEW DEPENDENCY: MOTION
────────────────────────────────────────────────────────────

Animation was part of the original v1.1 design plan and is still missing.

Add exactly one animation dependency:

motion

Use the current compatible release for React 18.

Import from:

motion/react

Do not add Tailwind, Framer Motion under a separate package name, GSAP, or another animation library.

Update package.json and package-lock.json only inside reader-hybrid-v1.1.

Animation must be restrained, purposeful, and accessible.

Use prefers-reduced-motion support through:

- useReducedMotion from motion/react where appropriate;
- the existing CSS reduced-motion media query.

Do not animate all text or every component.

────────────────────────────────────────────────────────────
5. HOME PAGE: REDESIGN THE HERO
────────────────────────────────────────────────────────────

The current home page order is:

1. Cover image
2. Hero card
3. Description
4. Feature cards
5. CTA buttons
6. Video
7. TOC
8. Overview
9. Notice

This is too vertically stacked and does not produce the desired Google-style landing experience.

Replace the top portion with a wide, responsive two-column hero on desktop.

Desktop hero structure:

Left column:
- “Frontend Prototype” pill
- book title
- subtitle
- author
- book description
- primary and secondary CTA buttons

Right column:
- animated book cover

Conceptual layout:

┌─────────────────────────────────────────────────────────┐
│ Prototype label        │                                │
│ Book title             │      Animated book cover       │
│ Subtitle               │                                │
│ Author                 │                                │
│ Description            │                                │
│ CTA buttons            │                                │
└─────────────────────────────────────────────────────────┘

On mobile:
- text first;
- cover second;
- CTAs remain easy to tap;
- no horizontal overflow.

Use this exact hero text:

Frontend Prototype

Using Data to Drive Business Performance

Databases, information systems, analytics, and managerial decision-making.

Nimrod Dvir, PhD

Use this book description:

Using Data to Drive Business Performance is an applied introduction to databases, information systems, analytics, and managerial decision-making. The book teaches students how data moves from raw records into structured tables, relationships, queries, dashboards, and business decisions. Through examples, labs, and review activities, students learn not only how database systems work, but why they matter for organizational performance.

Hero CTAs:

- Enter Reader
- Open Labs
- Demo Login / Access

The primary CTA should be Enter Reader.

Do not repeat the same description again lower on the page.

Remove the redundant lower “Overview” paragraph if it substantially duplicates the main description.

────────────────────────────────────────────────────────────
6. ANIMATED COVER
────────────────────────────────────────────────────────────

Implement a polished animated cover component.

Create:

src/components/AnimatedBookCover.tsx

Use the actual Cloudinary cover image already used by HomePage.

Required motion:

Initial entrance:
- opacity 0 → 1;
- y approximately 24px → 0;
- rotateY approximately -8deg → -3deg;
- scale approximately 0.96 → 1;
- spring or gentle ease;
- duration around 600–900ms.

Hover on pointer-capable devices:
- slight lift;
- subtle rotateY/rotateX tilt;
- scale no more than approximately 1.02;
- slightly stronger shadow.

Do not make it spin continuously.

Do not create distracting looping animation.

Add a subtle book-spine or depth treatment through CSS:
- left spine edge;
- layered shadow;
- mild perspective;
- optional page-edge effect.

Use CSS perspective on the wrapper.

Respect reduced motion:
- no entrance transform;
- no hover tilt;
- render the cover normally.

Suggested component approach:

<motion.div
  initial={reducedMotion ? false : {...}}
  animate={...}
  whileHover={reducedMotion ? undefined : {...}}
  transition={...}
>

The cover must remain responsive and accessible.

Image requirements:
- useful alt text;
- width and height or aspect-ratio to reduce layout shift;
- no broken local path;
- use the existing Cloudinary URL;
- loading should be eager because it is above the fold;
- fetchPriority may be high.

────────────────────────────────────────────────────────────
7. HOME PAGE MOTION
────────────────────────────────────────────────────────────

Use subtle staged entrance motion for the top home-page elements:

1. prototype pill/title block;
2. description;
3. CTA buttons;
4. animated cover;
5. feature cards.

Feature cards may enter with:
- opacity 0 → 1;
- y 12px → 0;
- slight stagger.

Feature-card hover:
- translateY no more than -3px;
- subtle shadow;
- no dramatic scale.

Do not animate the entire TOC individually if it creates noise or performance cost.

The video and TOC may remain static or receive one simple fade-in.

────────────────────────────────────────────────────────────
8. HOME PAGE CONTENT ORDER AFTER HERO
────────────────────────────────────────────────────────────

After the new two-column hero:

1. Three feature cards
2. Optional Course Overview video
3. Table of Contents
4. Prototype notice

Feature cards:

Learn the structure
Data, tables, relationships, and SQL.

Practice the workflow
Labs, examples, and applied exercises.

Think like a manager
Analytics, systems, and decisions.

The video should remain optional and secondary.

Use the heading:

Course Overview Video

Do not allow the video poster or cover cutout to dominate the page.

The feature cards should span the available width on desktop.

────────────────────────────────────────────────────────────
9. FULL-WIDTH LAYOUT CORRECTION
────────────────────────────────────────────────────────────

The current reader has a main article and an “On this page” rail. The parent container must be wide enough for both.

Remove or override legacy constraints such as:

.chapter-reader {
  max-width: 780px;
}

Target desktop widths:

.app-body:
- width: 100%;
- max-width approximately 1680px;
- centered.

.main-content:
- width: 100%;
- min-width: 0;
- responsive horizontal padding;
- suggested:
  padding: 2rem clamp(1.5rem, 3vw, 3.5rem) 4rem;

.chapter-reader:
- width: 100%;
- max-width approximately 1380px;
- centered.

.reader-body:
- display: grid;
- grid-template-columns: minmax(0, 1fr) 240px;
- gap: approximately 2.5rem;
- align-items: start.

At min-width 1440px:
- right rail may grow to 260px;
- gap may grow to 3rem.

.markdown-body:
- readable max-width approximately 880–920px;
- use 900px unless the actual content looks better within that range.

.reader-content:
- width: 100%;
- min-width: 0;
- subtle border and shadow only;
- do not make it feel like a narrow floating parchment card.

On screens below approximately 1280px:
- hide the desktop right rail;
- show the collapsible mobile “On this page” block above the article;
- use one-column content.

On screens below 768px:
- desktop sidebar becomes the current drawer;
- article padding decreases;
- tables and code blocks scroll horizontally.

The main reading experience should feel full-page on wide screens while preserving readable line length.

────────────────────────────────────────────────────────────
10. “ON THIS PAGE” NAVIGATION
────────────────────────────────────────────────────────────

Preserve the current H2/H3-based “On this page” implementation.

Verify:

- H2/H3 IDs are stable;
- heading extraction IDs exactly match rendered IDs;
- duplicate headings receive deterministic unique IDs;
- links scroll to the correct heading;
- sticky offset accounts for header and progress bar;
- mobile version uses a collapsible details element.

Improve it by adding active-heading highlighting with IntersectionObserver.

Create or implement a small hook such as:

useActiveHeading(ids)

Behavior:
- observe H2/H3 elements;
- update the active ID as the reader scrolls;
- apply an active class to the corresponding On this page link;
- active link uses primary color and border;
- no excessive URL updates during scrolling;
- click navigation may update the hash.

If IntersectionObserver causes instability, keep the current click navigation and document active-heading highlighting as deferred. Do not break the reader for this enhancement.

────────────────────────────────────────────────────────────
11. PAGE AND NAVIGATION MOTION
────────────────────────────────────────────────────────────

Add a restrained page-content transition when the current reader page changes.

In ChapterReader or a small wrapper:
- use page.id as the motion key;
- opacity 0 → 1;
- y 8–12px → 0;
- duration around 180–250ms.

Do not animate the persistent sidebar or header on every page change.

Sidebar/chapter interactions:
- chapter expand/collapse should transition smoothly;
- use CSS grid/height or motion AnimatePresence if clean;
- section hover should remain subtle.

The sidebar does not need a complete icon-rail redesign in this pass unless it can be added without destabilizing the build.

────────────────────────────────────────────────────────────
12. SIDEBAR REQUIREMENTS
────────────────────────────────────────────────────────────

Keep top-level scopes:

- Home
- Book
- Labs
- Access

Do not add AI Assistant.

Reader-area icons:

- Introduction: BookMarked
- Core Concepts: Layers
- Let’s Build: Terminal or Database
- Review Questions: HelpCircle
- Terms Treasury: Sparkles
- RAT: Award

Keep or improve subtitles:

- Introduction: Hook & Core Alignment
- Core Concepts: Theory & Core Frameworks
- Let’s Build: Hands-on Code Laboratory
- Review Questions: Self-explanation Exercises
- Terms Treasury: Key Glossary & Core Definitions
- RAT: Verify Knowledge Retention

Make sure icons and subtitles do not overcrowd the 280px sidebar.

If necessary:
- slightly increase sidebar width to 292–304px;
- or hide subtitles below a medium breakpoint;
- or truncate subtitles gracefully.

Do not create a narrow article merely to preserve sidebar width.

────────────────────────────────────────────────────────────
13. VISUAL SYSTEM
────────────────────────────────────────────────────────────

Use the canonical Reader Hybrid v1.1 design system:

Core surfaces:
- #F4F5F7 app background
- #F8FAFC shell
- #FFFFFF main workspace
- #FDFDFE raised surface
- #F1F5F9 muted surface

Text:
- #18181B main
- #52525B secondary
- #71717A muted

Borders:
- #E4E4E7 soft
- #CBD5E1 stronger

Primary:
- #4F46E5
- hover #4338CA
- soft #EEF2FF
- border #C7D2FE

Brand accents:
- navy #1A3B66
- blue #2D4F6F
- teal #4D7992
- gold #D9B44F
- soft gold #FFF7DD
- glow #FFB84D

Design ratio:
- 90% white/zinc
- 8% indigo/navy/teal
- 2% gold

Do not return to parchment or ivory as the dominant application background.

Do not use large generic SaaS gradients.

Do not make every section a different saturated color.

────────────────────────────────────────────────────────────
14. CSS CLEANUP
────────────────────────────────────────────────────────────

There were previously two CSS files with layered overrides.

Use one canonical imported stylesheet.

If index.css is no longer imported:
- verify all required styles exist in styles.css;
- remove index.css only if it is truly unused and removal is safe;
- otherwise clearly mark it deprecated.

Search for and resolve duplicate selectors, especially:

- .chapter-reader
- .reader-content
- .markdown-body
- .home-hero
- .home-page
- .app-body
- .main-content
- .reader-body
- .on-this-page
- responsive media queries

Do not allow an earlier legacy rule to override or constrain a later grid.

Group related CSS logically:

1. tokens/reset;
2. shell/header;
3. sidebar/mobile nav;
4. home page;
5. reader layout;
6. Markdown;
7. On this page;
8. labs/login;
9. accessibility/reduced motion;
10. responsive breakpoints.

────────────────────────────────────────────────────────────
15. ACCESSIBILITY
────────────────────────────────────────────────────────────

Preserve or add:

- skip link;
- semantic main region;
- visible focus styles;
- adequate color contrast;
- reduced-motion handling;
- proper button labels;
- heading hierarchy;
- useful image alt text;
- accessible details/summary for mobile On this page;
- no hover-only essential actions.

When reduced motion is enabled:
- disable entrance animations;
- disable tilt;
- disable smooth scroll;
- disable page fades.

────────────────────────────────────────────────────────────
16. TECHNICAL FIXES TO PRESERVE
────────────────────────────────────────────────────────────

Keep:

- PAGE_INDEX_MAP;
- scroll-to-top behavior;
- dismissible prototype notice;
- separate v1.1 localStorage keys;
- stable query params;
- safe Markdown rendering;
- YouTube allowlist;
- current sourceType badges.

Confirm fragile chapter ID parsing is gone.

Do not use:

section.id.split('-').slice(0, 2).join('-')

Use section.pages[0]?.chapterId or explicit metadata.

────────────────────────────────────────────────────────────
17. DO NOT IMPLEMENT
────────────────────────────────────────────────────────────

Do not implement:

- AI Assistant
- sidebar search, unless already partially built and trivial to finish
- real viewed-page progress persistence beyond current local prototype behavior
- real user authentication
- Stripe
- Supabase
- database access
- notes
- server-side search
- chapter JSON splitting
- React 19
- Vite 6
- Tailwind migration
- production payment claims

This task is visual/layout/motion completion only.

────────────────────────────────────────────────────────────
18. ACCEPTANCE CRITERIA
────────────────────────────────────────────────────────────

The task is complete only if all of the following are true:

Home page:
1. Uses a wide two-column hero on desktop.
2. Text is on the left and animated cover on the right.
3. Cover has visible but restrained entrance and hover motion.
4. Reduced-motion users receive a static cover.
5. Hero contains the exact agreed title, subtitle, author, description, and CTAs.
6. Feature cards appear below the hero.
7. Video is secondary.
8. No redundant overview copy remains.
9. Home page width is approximately 1180–1280px or appropriately fluid.

Reader:
10. `.chapter-reader` is no longer restricted to 780px.
11. Reader layout accommodates article plus right rail.
12. Article remains approximately 900px maximum readable width.
13. On this page rail is visible on wide screens.
14. Mobile On this page works.
15. Main workspace feels full-width on large displays.
16. No horizontal overflow.

Motion:
17. `motion` is installed and actually imported.
18. Home hero/cover movement is visible.
19. Feature cards have restrained entrance/hover motion.
20. Reader page transitions are visible but subtle.
21. Reduced-motion disables all nonessential movement.

Navigation/content:
22. Section icons remain.
23. AI Assistant is absent.
24. Core Concepts remains correctly named.
25. Generator and source content are unchanged.
26. Deep links still work.
27. H2/H3 anchor navigation still works.

Build:
28. npm run generate passes.
29. npm run lint passes.
30. npm run build passes.

────────────────────────────────────────────────────────────
19. COMMANDS
────────────────────────────────────────────────────────────

Run from:

books/database-book/platform-pilots/reader-hybrid-v1.1/

Commands:

npm install
npm run generate
npm run lint
npm run build

If a command fails:
- fix it;
- rerun it;
- report the original error and resolution.

Do not deploy automatically unless deployment is explicitly requested separately.

────────────────────────────────────────────────────────────
20. FINAL REPORT
────────────────────────────────────────────────────────────

Report:

1. Files inspected.
2. Legacy/conflicting width rules found.
3. Files changed.
4. Dependency added and version.
5. AnimatedBookCover implementation details.
6. Home hero structure.
7. Exact reader widths and breakpoints.
8. On this page behavior.
9. Motion behavior and reduced-motion behavior.
10. CSS files consolidated or retained.
11. Generate/lint/build results.
12. Remaining limitations.
13. Confirmation that no AI, backend, Stripe, Supabase, database, or real authentication was added.
14. Confirmation that these folders were not modified:
   - reader-hybrid/
   - reader-hybrid-alt/
   - google-ai-studio/
   - files/source/
```

## Most important correction

The agent must not merely add a few CSS transitions and then claim animation is complete. The current repository has no animation package, and its home page is static.  

The two non-negotiable outcomes are:

1. **A real animated two-column hero with the cover on the right.**
2. **Removal of all legacy width constraints that keep the reader narrow.**
---
## Not quite yet—but you are close

The architecture is ready to move toward v2A, but the current repository does not yet show the completed v1.1 motion pass: `motion` is still absent from `package.json`. 

Finish and freeze v1.1 first. Then create v2A as a separate application.

# Gate before starting v2A

Proceed only after these are true:

* v1.1 design and motion pass is complete.
* `npm run generate`, `npm run lint`, and `npm run build` pass.
* Home page, reader, “On this page,” mobile layout, icons, and favicon are verified.
* Chapter 1–4 content renders correctly.
* The current Vite reader is tagged or committed as a stable reference.
* No unresolved visual redesign work remains that would need to be re-created during the Next.js migration.

Do not wait for all 17 chapters. Four representative chapters are enough for v2A.

# Recommended sequence

```text
v1.1 — Freeze the validated reader experience
v2A — Prove identity, payment, access, and protected reading
v2B — Add persistent learning features
```

A separate v1.2 is optional. The per-chapter content-loading improvement can be incorporated directly into the Next.js v2A content architecture rather than rebuilding it twice.

---

# v2A: Paid-access platform proof

Create:

```text
books/database-book/platform-pilots/reader-hybrid-v2/
```

Keep all current pilots untouched.

## v2A objective

Prove this complete transaction:

```text
Student creates an account
→ completes NetID and Student ID profile
→ pays through Stripe Checkout
→ verified webhook creates access
→ protected reader becomes available
```

## Critical clarification about NetID

A NetID text field is not institutional authentication.

There are two possible models:

### MVP model

Use Supabase Auth for actual authentication:

* email magic link, email/password, or both;
* NetID stored as a profile field;
* Student ID stored as a profile field.

### Later institutional model

Use genuine UAlbany SSO through an institution-approved identity provider, typically OIDC or SAML.

Do not label the MVP as “NetID login.” Label it:

```text
Account login + NetID/Student ID profile verification
```

until real institutional SSO is available.

# v2A recommended stack

```text
Next.js
TypeScript
Supabase Auth
Supabase Postgres
Supabase Row Level Security
Stripe Checkout
Stripe webhooks
Vercel
```

Use the v1.1 design and reader behavior as the visual reference, but do not copy the Vite routing architecture wholesale.

# v2A phases

## Phase 1 — Foundation

Create the Next.js application and establish:

* App Router;
* TypeScript;
* environment-variable validation;
* Supabase browser and server clients;
* Stripe server client;
* middleware or server-side access helper;
* shared design tokens based on v1.1.

Do not begin payment until authentication and environment configuration work locally.

## Phase 2 — Content migration

Port the reader experience:

* chapter sidebar;
* reader areas;
* page segments;
* internal H2/H3 navigation;
* “On this page” rail;
* bottom previous/next navigation;
* section icons;
* Markdown sanitization;
* mobile navigation.

Preserve:

```text
Chapter
→ Reader Area
→ Markdown Subsection
→ Page Segment
```

For v2A, stage chapter content per chapter rather than bundling all Markdown into one client module.

A suitable structure is:

```text
generated/
├── book-index.json
└── chapters/
    ├── ch01.json
    ├── ch02.json
    ├── ch03.json
    └── ch04.json
```

Load protected chapter content on the server.

## Phase 3 — Public preview

Create:

```text
/
/preview
/preview/ch01
```

The preview should expose a deliberately limited sample—not the entire protected chapter accidentally rendered and hidden with CSS.

Suggested preview:

* home page;
* table of contents;
* selected Chapter 1 pages;
* sample lab description;
* purchase CTA.

## Phase 4 — Authentication and profiles

Create:

```text
/login
/register
/account
```

Profile fields:

```text
user_id
email
full_name
net_id
student_id
role
created_at
updated_at
```

Recommended roles:

```text
student
instructor
admin
```

NetID and Student ID should be private profile data, never exposed in public queries.

## Phase 5 — Stripe Checkout

Create:

```text
/access
/api/stripe/create-checkout-session
/api/stripe/webhook
/success
/cancel
```

The browser must never grant access directly.

Correct flow:

```text
Stripe Checkout completes
→ Stripe sends signed webhook
→ server verifies signature
→ purchase is recorded
→ access grant is created
→ protected route recognizes access
```

## Phase 6 — Access grants

Use a separate access table rather than treating payment status as the only authorization source.

Suggested conceptual model:

### `purchases`

```text
id
user_id
stripe_customer_id
stripe_checkout_session_id
stripe_payment_intent_id
amount_cents
currency
status
created_at
```

### `access_grants`

```text
id
user_id
product_key
status
source
starts_at
expires_at
created_at
```

Example product:

```text
database-book-2026
```

This model supports:

* Stripe purchases;
* instructor access;
* complimentary access;
* administrative grants;
* future course-specific access;
* refunds and revocation.

## Phase 7 — Protected reader

Create protected routes such as:

```text
/book
/book/ch01
/book/ch01/core-concepts
```

Authorization must happen server-side before protected chapter content is returned.

Do not:

* download the full paid book to unauthorized browsers;
* render protected content and merely cover it with a modal;
* trust a localStorage paid flag;
* grant access from the Stripe success URL alone.

## Phase 8 — v2A validation

Test at minimum:

1. Logged-out visitor can access public preview.
2. Logged-out visitor cannot access protected reader.
3. Logged-in unpaid student cannot access protected reader.
4. Stripe test purchase completes.
5. Verified webhook records purchase.
6. Webhook creates active access grant.
7. Paid student can open protected reader.
8. Refresh preserves access.
9. Duplicate webhook does not duplicate the grant.
10. Refund/revocation path can disable access.
11. One student cannot read another student’s profile or purchase data.
12. No service-role key reaches the browser.

# v2A exit criteria

Do not start v2B until:

* authentication works reliably;
* profile creation works;
* Stripe test mode works end to end;
* webhook processing is idempotent;
* access control is server-side;
* RLS policies are tested;
* public preview cannot leak protected content;
* protected Chapters 1–4 render correctly;
* mobile reader works;
* Vercel preview deployment passes;
* environment variables and secrets are documented safely.

---

# v2B: Persistent learning platform

After v2A is stable, add these in order.

## 1. Progress persistence

Start with:

```text
user_id
page_id
chapter_slug
reader_area_slug
last_viewed_at
completed_at
scroll_position
```

Use cases:

* resume reading;
* chapter completion;
* book completion;
* viewed-page status.

## 2. Notes

Suggested fields:

```text
id
user_id
page_id
selected_text
note_text
created_at
updated_at
```

Requirements:

* notes private by default;
* user can edit and delete;
* RLS restricts every operation to `auth.uid()`;
* notes should not modify source Markdown.

## 3. Labs expansion

Stage this gradually:

```text
v2B.1: read lab instructions
v2B.2: download supporting files
v2B.3: mark lab complete
later: submit work
later: instructor review/grading
```

Do not build a full LMS submission system during the first v2B pass.

## 4. Search

Use server-side search for protected content.

Search must:

* respect access grants;
* return only authorized content;
* index chapter, reader area, page, heading, and body text;
* link directly to the relevant page and heading;
* avoid exposing protected snippets to unpaid users.

## 5. Accessibility hardening

Include:

* keyboard-only navigation;
* landmark and heading audit;
* skip links;
* visible focus;
* reduced-motion testing;
* screen-reader testing;
* table accessibility;
* accessible forms and validation;
* contrast audit;
* mobile zoom/reflow;
* captions/transcripts for instructional videos.

---

# What not to add yet

Keep these out of v2A:

```text
AI Assistant
instructor dashboard
student submissions
gradebook
LTI
SSO unless formally available
advanced analytics
recommendation engine
semantic search
full 17-chapter migration
```

# Recommended decision

You are ready to **plan and scaffold v2A**, but not to abandon v1.1 before the current completion pass is finished and frozen.

The practical order is:

```text
1. Complete and verify v1.1.
2. Commit/tag the stable v1.1 reference.
3. Write the v2A architecture and security plan.
4. Create reader-hybrid-v2/.
5. Implement public preview + protected reader.
6. Add Supabase Auth and profile fields.
7. Add Stripe Checkout and verified webhook.
8. Add access grants and RLS.
9. Test the complete paid-access loop.
10. Begin v2B only after v2A passes its exit criteria.
```
## What is still not completed for v1.1

Based on the current `reader-hybrid-v1.1` code, the remaining v1.1 work is concentrated in **motion, final layout polish, favicon/public metadata, and verification**.

### Completed or mostly completed

| Area                        |      Status |
| --------------------------- | ----------: |
| White/zinc/indigo palette   | Mostly done |
| Sticky white header         |        Done |
| Home page copy              | Mostly done |
| Feature cards               |        Done |
| “On this page” H2/H3 nav    |        Done |
| Mobile “On this page” block |        Done |
| Sidebar icons/subtitles     | Mostly done |
| Skip link                   |        Done |
| Reduced-motion CSS          |        Done |
| Generator preserved         |        Done |

### Not completed / still needs correction

| Area                            |                 Status | Evidence                                                                                                                                                                         |
| ------------------------------- | ---------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `motion` dependency             |                Missing | `package.json` has `lucide-react`, React, Markdown libs, but no `motion`.                                                                                                        |
| Animated cover                  |                Missing | HomePage uses a static cover image in a normal `<div>`, not an animated component.                                                                                               |
| Two-column hero                 |   Missing / incomplete | HomePage is still a vertical stack: cover, hero card, description, features, CTAs, video, TOC.                                                                                   |
| Reader width cleanup            | Needs verification/fix | Earlier CSS still had `.chapter-reader { max-width: 780px; }`, while later CSS adds a wider grid. That kind of duplicate selector can still cause confusion or override issues.  |
| “On this page” active highlight |                Missing | Current component supports click-scroll and hash update, but no active-heading state/highlighting.                                                                               |
| Reader page transition          |                Missing | `ChapterReader` renders content statically; no motion wrapper keyed by `page.id`.                                                                                                |
| Favicon / manifest              |          Not confirmed | Need `public/` icon files and `index.html` metadata check/addition                                                                                                               |
| CSS cleanup                     |           Still needed | `styles.css` has newer layout rules, but duplicate/conflicting selectors should be audited before calling v1.1 complete.                                                         |
| Deployment verification         |  Not part of this pass | You explicitly said stop after local verification                                                                                                                                |

---

# Detailed prompt for GPT-5.5 Fixed / Codex

Paste the following as the implementation prompt.

```text
You are working in this repository:

C:\Users\nd115232\Documents\GitHub\dima-publishing

Target app:

books/database-book/platform-pilots/reader-hybrid-v1.1/

This is the final Reader Hybrid v1.1 completion pass.

The goal is to finish what remains from the v1.1 redesign:
1. real but restrained motion;
2. animated book cover;
3. wide two-column home hero;
4. cleanup of conflicting width/layout CSS;
5. active “On this page” highlighting;
6. local favicon/public manifest support;
7. local build verification only.

Do not deploy.

Do not start v2A.

Do not add backend, Supabase, Stripe, Firebase, real auth, payment, database logic, real AI, or server-side code.

────────────────────────────────────────────────────────────
1. WORKING SCOPE
────────────────────────────────────────────────────────────

Work only inside:

books/database-book/platform-pilots/reader-hybrid-v1.1/

Do not modify:

books/database-book/platform-pilots/reader-hybrid/
books/database-book/platform-pilots/reader-hybrid-alt/
books/database-book/platform-pilots/google-ai-studio/
books/database-book/platform-pilots/reader-hybrid-v2/
books/database-book/files/source/
any repository-level config outside reader-hybrid-v1.1/

Do not manually edit generated book data.

Do not modify source Markdown files.

Do not use plugins or external integrations.

Do not deploy to Vercel.

────────────────────────────────────────────────────────────
2. PRESERVE
────────────────────────────────────────────────────────────

Preserve:

- React 18;
- Vite 5;
- the build-time Markdown generator;
- current generated data model;
- page-break reader model;
- query-param deep links;
- Core Concepts naming;
- current ReaderScope without AI Assistant;
- frontend-only demo login;
- current Markdown sanitization;
- H2/H3 heading extraction;
- “On this page” click navigation;
- mobile “On this page” details block;
- PAGE_INDEX_MAP if present;
- scroll-to-top behavior;
- v1.1 localStorage keys.

Never use “Main Concepts.”

Do not add an AI Assistant to navigation.

────────────────────────────────────────────────────────────
3. READ AND AUDIT FIRST
────────────────────────────────────────────────────────────

Before editing, inspect:

package.json
package-lock.json, if present
vite.config.ts
index.html
src/main.tsx
src/App.tsx
src/styles.css
src/index.css, if present
src/components/HomePage.tsx
src/components/ChapterReader.tsx
src/components/OnThisPage.tsx
src/components/MarkdownRenderer.tsx
src/components/Sidebar.tsx
src/components/Layout.tsx
src/components/BottomNavigation.tsx
src/utils/headings.ts
public/, if present

Specifically search for duplicate or conflicting CSS selectors:

.chapter-reader
.reader-body
.reader-content
.markdown-body
.home-page
.home-hero
.home-hero-card
.cover-image-card
.app-body
.main-content
.on-this-page
.otp-mobile

Identify any legacy rule that still constrains the page, especially:

.chapter-reader {
  max-width: 780px;
}

or similar.

Do not proceed blindly. Fix actual conflicts found in the files.

────────────────────────────────────────────────────────────
4. ADD MOTION DEPENDENCY
────────────────────────────────────────────────────────────

Add exactly one new dependency:

motion

Use the current compatible version for React 18.

Import motion features from:

motion/react

Update:

package.json
package-lock.json, if present

Do not add:

framer-motion
GSAP
Tailwind
shadcn
Radix
React 19
Vite 6
any AI SDK
any auth/payment/backend package

Use:

useReducedMotion

from motion/react where appropriate.

────────────────────────────────────────────────────────────
5. CREATE ANIMATED BOOK COVER
────────────────────────────────────────────────────────────

Create:

src/components/AnimatedBookCover.tsx

Use the existing Cloudinary cover image currently used in HomePage:

https://res.cloudinary.com/dkndq6lyz/image/upload/q_auto,f_auto/cover-5-20_ajw15x.jpg

Requirements:

- render the actual cover image;
- useful alt text:
  "Using Data to Drive Business Performance book cover";
- eager loading because it is above the fold;
- high fetch priority if supported;
- responsive sizing;
- CSS perspective wrapper;
- book depth/spine treatment;
- subtle shadow;
- no continuous spinning;
- no distracting animation.

Motion behavior:

Initial entrance, only when reduced motion is off:

- opacity: 0 → 1;
- y: 24px → 0;
- rotateY: approximately -8deg → -3deg;
- scale: 0.96 → 1;
- duration around 0.7s;
- gentle easing or spring.

Hover behavior on pointer-capable devices:

- slight lift;
- subtle rotateY/rotateX tilt;
- scale no more than 1.02;
- stronger but tasteful shadow.

Reduced motion behavior:

- no entrance transform;
- no hover tilt;
- static cover rendering.

CSS should support:

.animated-cover-shell
.animated-cover-card
.animated-cover-img
.animated-cover-spine
or equivalent class names.

Do not rely on local missing image files.

────────────────────────────────────────────────────────────
6. REDESIGN HOME PAGE TOP SECTION
────────────────────────────────────────────────────────────

Refactor HomePage.tsx.

Current issue:
The home page is still a vertical stack:
cover image, hero card, description, feature cards, CTA buttons, video, TOC.

Target:
A wide desktop two-column hero.

Desktop structure:

Left column:
- prototype label;
- book title;
- subtitle;
- author;
- book description;
- CTA buttons.

Right column:
- AnimatedBookCover.

Use this exact hero text:

Frontend Prototype

Using Data to Drive Business Performance

Databases, information systems, analytics, and managerial decision-making.

Nimrod Dvir, PhD

Use this exact description:

Using Data to Drive Business Performance is an applied introduction to databases, information systems, analytics, and managerial decision-making. The book teaches students how data moves from raw records into structured tables, relationships, queries, dashboards, and business decisions. Through examples, labs, and review activities, students learn not only how database systems work, but why they matter for organizational performance.

Hero CTAs:

- Enter Reader
- Open Labs
- Demo Login / Access

Use the existing HomePage props. Do not change the public component interface.

After the hero:

1. Feature cards
2. Course Overview Video, secondary
3. Table of Contents
4. Prototype notice

Remove the duplicate lower Overview paragraph if it repeats the main description.

Do not put the cover image above the hero anymore on desktop.

On mobile:
- text first;
- cover second;
- CTAs stack or wrap nicely;
- no horizontal overflow.

────────────────────────────────────────────────────────────
7. ADD HOME PAGE MOTION
────────────────────────────────────────────────────────────

Use `motion/react`.

Apply restrained staged entrance motion to:

- hero text block;
- description area within hero;
- CTA buttons;
- animated cover;
- feature cards.

Feature cards:

- opacity 0 → 1;
- y 12px → 0;
- small stagger;
- hover translateY no more than -3px;
- subtle shadow.

Do not animate every TOC row individually.

Do not make the page feel like a presentation deck.

Respect reduced motion globally.

────────────────────────────────────────────────────────────
8. READER LAYOUT WIDTH CLEANUP
────────────────────────────────────────────────────────────

Fix the narrow reader issue completely.

Required targets:

.app-body:
- width: 100%;
- max-width: approximately 1680px;
- margin: 0 auto;

.main-content:
- width: 100%;
- min-width: 0;
- responsive padding:
  padding: 2rem clamp(1.5rem, 3vw, 3.5rem) 4rem;

.chapter-reader:
- width: 100%;
- max-width: approximately 1380px;
- margin: 0 auto;

.reader-body:
- display: grid;
- grid-template-columns: minmax(0, 1fr) 240px;
- gap: approximately 2.5rem;
- align-items: start;

At min-width 1440px:
- right rail can be 260px;
- gap can be 3rem.

.markdown-body:
- readable max-width around 900px.

.reader-content:
- width: 100%;
- min-width: 0;
- subtle border/shadow only;
- do not make the article feel like a narrow floating card.

.on-this-page:
- sticky;
- subtle left border;
- not a heavy card.

At max-width approximately 1279px:
- hide desktop right rail;
- show mobile On this page details block;
- one-column reader.

At max-width 768px:
- existing mobile drawer behavior remains;
- article padding decreases;
- no horizontal overflow.

Remove or override any old `.chapter-reader { max-width: 780px; }` rule.

Do not allow duplicate selector order to reintroduce the narrow layout.

────────────────────────────────────────────────────────────
9. READER PAGE TRANSITION
────────────────────────────────────────────────────────────

Add subtle page transition when current reader page changes.

In ChapterReader, wrap the changing reader article area in motion.

Use `page.id` as the key.

Suggested behavior:

- opacity 0 → 1;
- y 8px or 12px → 0;
- duration 180–250ms;
- no movement if reduced motion is on.

Do not animate the persistent sidebar, header, or bottom navigation every time if that causes noise.

Preserve current bottom navigation behavior.

────────────────────────────────────────────────────────────
10. ACTIVE “ON THIS PAGE” HIGHLIGHTING
────────────────────────────────────────────────────────────

Preserve existing OnThisPage and OnThisPageMobile behavior.

Add active-heading highlighting using IntersectionObserver.

Requirements:

- observe rendered H2/H3 elements by ID;
- active ID updates as user scrolls;
- active On This Page link receives a class, for example:
  .otp-link.active
- active link uses primary color and visible left border;
- do not continuously update URL hash while scrolling;
- click behavior may still update hash;
- clean up observers on page change;
- no memory leaks.

Optional implementation:

src/hooks/useActiveHeading.ts

or local hook inside OnThisPage.

If IntersectionObserver introduces instability, keep the current click-based navigation and report active highlighting as deferred. Do not break On This Page to force active state.

────────────────────────────────────────────────────────────
11. SIDEBAR
────────────────────────────────────────────────────────────

Do not add AI Assistant.

Keep top-level scopes:

- Home
- Book
- Labs
- Access

Keep reader-area icons:

- Introduction: BookMarked
- Core Concepts: Layers
- Let’s Build: Terminal or Database
- Review Questions: HelpCircle
- Terms Treasury: Sparkles
- RAT: Award

Keep or improve subtitles:

- Introduction: Hook & Core Alignment
- Core Concepts: Theory & Core Frameworks
- Let’s Build: Hands-on Code Laboratory
- Review Questions: Self-explanation Exercises
- Terms Treasury: Key Glossary & Core Definitions
- RAT: Verify Knowledge Retention

Only polish sizing/spacing.

Do not build sidebar search.

Do not build full collapsed icon rail in this pass.

────────────────────────────────────────────────────────────
12. FAVICON AND SITE ICONS
────────────────────────────────────────────────────────────

Add website icons so they work locally and later on Vercel.

Create or use:

public/

Copy only these files into:

books/database-book/platform-pilots/reader-hybrid-v1.1/public/

Required files:

favicon.ico
apple-touch-icon.png
icon-192x192.png
icon-512x512.png

Source path:

G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch00-general\logo\optimized-icons\

Do not copy:

upload-icon.js
.env
Cloudinary credentials
API secrets
unoptimized source image unless explicitly needed

If the G: drive path is unavailable:

- stop the icon copy step;
- report the missing files;
- do not create placeholder icons;
- do not invent Cloudinary URLs;
- do not add broken references.

Add:

public/site.webmanifest

Contents:

{
  "name": "Using Data to Drive Business Performance",
  "short_name": "DIMA Reader",
  "description": "An interactive textbook on databases, information systems, analytics, and managerial decision-making.",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#4F46E5",
  "background_color": "#F4F5F7",
  "display": "standalone",
  "start_url": "/?scope=welcome"
}

Update index.html inside <head>:

<title>Using Data to Drive Business Performance | DIMA Publishing</title>
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#4F46E5">

Use root public paths only:

/favicon.ico
/apple-touch-icon.png
/icon-192x192.png
/icon-512x512.png
/site.webmanifest

Do not reference repository paths in HTML.

Do not store icons only in dist/.

Vite will copy public files into the build output.

────────────────────────────────────────────────────────────
13. CSS CONSOLIDATION
────────────────────────────────────────────────────────────

Use src/styles.css as the canonical imported stylesheet.

Check whether src/index.css still exists.

If src/index.css is not imported and contains no unique required styles:

- remove it.

If it contains unique required styles:

- move those styles into styles.css first;
- then remove index.css.

Ensure main.tsx imports only the canonical stylesheet.

Resolve duplicate or conflicting layout selectors.

Group CSS logically:

1. tokens/reset;
2. shell/header;
3. sidebar/mobile navigation;
4. home page;
5. animated cover;
6. reader layout;
7. Markdown;
8. On this page;
9. labs/login;
10. accessibility/reduced motion;
11. responsive breakpoints.

Do not leave old parchment/ivory styles as active dominant styling.

────────────────────────────────────────────────────────────
14. VISUAL SYSTEM
────────────────────────────────────────────────────────────

Use the canonical v1.1 palette:

- app background: #F4F5F7
- shell: #F8FAFC
- main workspace: #FFFFFF
- surface: #FDFDFE
- muted surface: #F1F5F9
- text main: #18181B
- text secondary: #52525B
- muted text: #71717A
- border: #E4E4E7
- primary: #4F46E5
- primary hover: #4338CA
- primary soft: #EEF2FF
- primary border: #C7D2FE
- book navy: #1A3B66
- database blue: #2D4F6F
- analytics teal: #4D7992
- gold: #D9B44F
- soft gold: #FFF7DD
- glow: #FFB84D

Design ratio:

90% white/zinc
8% indigo/navy/teal
2% gold

Do not return to the older parchment-heavy palette.

────────────────────────────────────────────────────────────
15. ACCESSIBILITY
────────────────────────────────────────────────────────────

Preserve or add:

- skip link;
- semantic main region;
- visible focus states;
- reduced motion handling;
- useful cover image alt text;
- accessible details/summary for mobile On this page;
- accessible button labels where needed;
- no essential hover-only interactions;
- no horizontal overflow at 320px width.

When reduced motion is on:

- disable cover entrance transforms;
- disable hover tilt;
- disable page fade movement;
- disable smooth scroll.

────────────────────────────────────────────────────────────
16. ACCEPTANCE CRITERIA
────────────────────────────────────────────────────────────

Home page:

1. Desktop uses a wide two-column hero.
2. Text/CTAs are on the left.
3. Animated cover is on the right.
4. Cover is no longer stacked above the hero on desktop.
5. Cover animation is visible but restrained.
6. Feature cards appear below the hero.
7. Video is secondary.
8. Duplicate lower overview copy is removed.
9. Home width is approximately 1180–1280px or appropriately fluid.
10. Mobile stacks cleanly with no overflow.

Motion:

11. `motion` is installed and imported from `motion/react`.
12. AnimatedBookCover exists.
13. Feature cards use subtle entrance/hover motion.
14. Reader page transitions are subtle.
15. Reduced-motion users get static/minimal motion.

Reader:

16. `.chapter-reader` is not capped at 780px.
17. Reader has enough width for article plus right rail.
18. Article text is approximately 900px max width.
19. Right rail is visible on wide screens.
20. Mobile On This Page works.
21. Active On This Page highlighting works or is explicitly reported as deferred.
22. No horizontal overflow.

Favicon:

23. public/favicon.ico exists if source files are available.
24. public/apple-touch-icon.png exists if source files are available.
25. public/icon-192x192.png exists if source files are available.
26. public/icon-512x512.png exists if source files are available.
27. public/site.webmanifest exists.
28. index.html references favicon, Apple touch icon, manifest, theme-color, and title.

Build:

29. npm install completes.
30. npm run generate passes.
31. npm run lint passes.
32. npm run build passes.

Scope:

33. AI Assistant is not added.
34. Core Concepts remains correctly named.
35. No source Markdown changed.
36. No generated data manually edited.
37. No backend, Stripe, Supabase, Firebase, real auth, database, or real AI added.

────────────────────────────────────────────────────────────
17. TEST COMMANDS
────────────────────────────────────────────────────────────

Run from:

books/database-book/platform-pilots/reader-hybrid-v1.1/

Run:

npm install
npm run generate
npm run lint
npm run build

Then start local dev or preview server and verify these paths if icons were added:

/favicon.ico
/apple-touch-icon.png
/icon-192x192.png
/icon-512x512.png
/site.webmanifest

Do not deploy.

────────────────────────────────────────────────────────────
18. FINAL REPORT
────────────────────────────────────────────────────────────

Report:

1. Files inspected.
2. Conflicting legacy CSS rules found and fixed.
3. Files changed.
4. Dependency added and version.
5. AnimatedBookCover implementation details.
6. Home hero structure.
7. Final layout widths and breakpoints.
8. On This Page behavior and active-state status.
9. Motion behavior and reduced-motion behavior.
10. Favicon files added or missing.
11. index.html metadata changes.
12. Manifest details.
13. CSS consolidation result.
14. Generate/lint/build results.
15. Remaining limitations.
16. Confirmation that no deployment was performed.
17. Confirmation that these were not modified:
    - reader-hybrid/
    - reader-hybrid-alt/
    - google-ai-studio/
    - reader-hybrid-v2/
    - files/source/
18. Confirmation that no AI, backend, Stripe, Supabase, Firebase, real auth, payment, database, or real AI was added.
```

## Short version of what remains

The unfinished v1.1 work is:

```text
1. Install and use motion.
2. Build AnimatedBookCover.
3. Convert HomePage to a wide animated two-column hero.
4. Remove legacy narrow reader constraints.
5. Add reader page transition.
6. Add active On This Page highlighting.
7. Add favicon/public manifest.
8. Clean duplicate CSS.
9. Verify generate/lint/build.
```

After that, you can freeze v1.1 and move to v2A planning.
