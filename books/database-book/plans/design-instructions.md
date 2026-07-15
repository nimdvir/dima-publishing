# DIMA Publishing Platform — Design Instructions

**Date:** 2026-07-05
**Status:** Canonical — all CSS files derive from this spec
**Applies to:** `reader-hybrid-v1.1` (active book production at https://data-pilot.dimapublishing.com/)

> **Canonical source of truth.** This document defines the complete design system for the DIMA Publishing online reader platform and the *Using Data to Drive Business Performance* textbook. All CSS files in the platform (`styles.css`, `call-outs.css`) must match this spec. When in doubt, this document wins.

---

## 1. Brand Identity

### Book

**Title:** *Using Data to Drive Business Performance: Databases and Management Information Systems*
**Author:** Nimrod Dvir, PhD
**Publisher:** DIMA Publishing

### Instructional Arc

```
Data → Tables → Relationships → Queries → Analytics → Decisions
```

### Design Philosophy

> **"Academic navy + indigo, softened by mint and light gray."**

The platform design draws from Google AI Studio's clean workspace aesthetic: a zinc-gray shell surrounding a white content workspace, with indigo as the primary interactive accent, navy and gold as brand bookmarks, and mint (`#BFEAD8`) reserved exclusively for the book cover/thumbnail hero graphic — never in site chrome.

### Visual Identity Attributes

| Attribute | Meaning |
|-----------|---------|
| Clear | Minimal clutter, strong hierarchy, generous spacing |
| Modern | Clean typography, restrained color, contemporary layout |
| Applied | Screenshots, databases, SQL, workflows, step-by-step examples |
| Business-oriented | Dashboards, KPIs, data flows, managerial decisions |
| Friendly | Student-centered, readable, non-intimidating |
| Consistent | Same visual logic across all chapters and pages |

### Core Principle (Textbook Visuals)

> Make the invisible structure of data visible, understandable, and useful.

Every visual should help students understand:
1. What the concept means.
2. How the system or process works.
3. Why it matters for business performance.
4. How to apply it in a real tool.
5. How the result supports better decisions.

---

## 2. Color System

### 2.1 Core UI Palette

Google AI Studio-inspired: zinc shell, white workspace, indigo actions.

| Role | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| App background | `--color-background` | `#F4F5F7` | Page shell behind content |
| Surface / workspace | `--color-surface` | `#FFFFFF` | Cards, reader content, panels |
| Muted surface | `--color-surface-muted` | `#F1F5F9` | Subtle fills, hover states |
| Main text | `--color-text` | `#18181B` | Body copy |
| Muted text | `--color-text-muted` | `#71717A` | Secondary text, captions |
| Headings | `--color-heading` | `#1A2433` | All heading levels |
| Border | `--color-border` | `#E4E4E7` | Card borders, dividers |

### 2.2 Brand Accent Palette

Indigo/blue as primary app accent. Gold reserved for progress, brand marks, and premium emphasis.

| Role | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| Primary indigo | `--color-primary` | `#4F46E5` | Buttons, links, active states, chapter numbers |
| Primary hover | `--color-primary-soft` | `#4338CA` | Hover/deeper indigo |
| Soft indigo bg | `--color-accent-soft` | `#EEF2FF` | Active nav fill, selected backgrounds |
| Secondary blue | `--color-secondary` | `#2D4F6F` | Subtitles, section emphasis |
| Gold accent | `--color-accent` | `#D9B44F` | Progress bar, brand mark |
| Gold dark | `--color-accent-dark` | `#8E7B55` | Muted gold for badges |
| Teal highlight | `--brand-highlight` | `#0E7490` | Header title highlight (AA contrast on white) |
| Link | `--color-link` | `#4F46E5` | Inline links |
| Link hover | `--color-link-hover` | `#4338CA` | Link hover state |

### 2.3 Book Graphic Colors (not in site chrome)

| Role | Hex | Usage |
|------|-----|-------|
| Book mint | `#BFEAD8` | Cover/thumbnail hero background only |
| Graphic line | `#111827` | Cover illustrations, outlines, icons |

Do **not** use mint (`#BFEAD8`) in the site interface. It belongs exclusively in the book cover image and hero thumbnail.

### 2.4 Semantic Colors

| Role | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| Success | `--color-success` | `#15803D` | Green indicators, completion |
| Warning | `--color-warning` | `#B45309` | Amber warnings |
| Danger | `--color-danger` | `#B91C1C` | Red errors, destructive actions |

### 2.5 Section Accent Palette

Each chapter section (and its sidebar navigation) uses a distinct accent color family. Used sparingly: icon color, badge background, active border, section pill. Never floods the page.

| Section | Text | Background | Border |
|----------|------|-----------|--------|
| Introduction | `#4F46E5` | `#EEF2FF` | `#C7D2FE` |
| Core Concepts | `#2563EB` | `#EFF6FF` | `#BFDBFE` |
| Let's Build | `#059669` | `#ECFDF5` | `#A7F3D0` |
| Review Questions | `#D97706` | `#FFFBEB` | `#FDE68A` |
| Terms Treasury | `#7C3AED` | `#F5F3FF` | `#DDD6FE` |
| RAT | `#0F766E` | `#F0FDFA` | `#99F6E4` |
| Labs | `#047857` | `#ECFDF5` | `#A7F3D0` |

CSS variables: `--intro-text`, `--intro-bg`, `--intro-border`, `--concepts-text`, `--concepts-bg`, `--concepts-border`, `--build-text`, `--build-bg`, `--build-border`, `--questions-text`, `--questions-bg`, `--questions-border`, `--terms-text`, `--terms-bg`, `--terms-border`, `--rat-text`, `--rat-bg`, `--rat-border`, `--labs-text`, `--labs-bg`, `--labs-border`.

### 2.6 Callout Colors (16 Types)

Callouts use a `` HTML pattern rendered in chapter Markdown. Styled by `_static/call-outs.css`. Distinct left-border + tinted background per type.

| Callout | Emoji | Border | Background |
|---------|-------|--------|------------|
| `business-insight` | 💼 | `#2563EB` | `#EFF6FF` |
| `tip` | 💡 | `#16A34A` | `#F0FDF4` |
| `note` | 📝 | `#64748B` | `#F8FAFC` |
| `important` | ⚠️ | `#7C3AED` | `#F5F3FF` |
| `warning` | ⚠️ | `#F59E0B` | `#FFFBEB` |
| `caution` | 🔥 | `#EA580C` | `#FFF7ED` |
| `good-practice` | ✅ | `#15803D` | `#F0FDF4` |
| `avoid` | ❌ | `#DC2626` | `#FEF2F2` |
| `info` | ℹ️ | `#0891B2` | `#ECFEFF` |
| `example` | 📋 | `#0D9488` | `#F0FDFA` |
| `question` | ❓ | `#9333EA` | `#FAF5FF` |
| `definition` | 📖 | `#475569` | `#F8FAFC` |
| `discipline-definition` | 🏛️ | `#1D4ED8` | `#EFF6FF` |
| `term` | 🔤 | `#0369A1` | `#F0F9FF` |
| `concept` | 💭 | `#7E22CE` | `#FAF5FF` |
| `key-takeaway` | 🔑 | `#CA8A04` | `#FEFCE8` |

---

## 3. Typography

### 3.1 Typefaces

| Role | Family | Weights | Source |
|------|--------|---------|--------|
| UI / body | Inter | 300, 400, 500, 600, 700, 800 | Google Fonts |
| Editorial headings | Lora | 400, 500, 600, 700 + italic | Google Fonts |
| Code blocks | JetBrains Mono | 400, 500, 600 | Google Fonts |

### 3.2 Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

### 3.3 CSS Font Stacks

```css
--font-stack: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-serif: "Lora", Georgia, "Times New Roman", serif;
--font-mono: "JetBrains Mono", "Cascadia Code", "Fira Code", Consolas, monospace;
```

### 3.4 Type Scale

| Level | Tag/Class | Font | Size | Weight |
|-------|----------|------|------|--------|
| Book title (hero) | `.home-book-title` | Lora | `3rem` | `700` |
| Page title | `.reader-page-title` | Lora | `1.5rem` | — |
| H1 (chapter) | `.markdown-body h1` | Lora | `1.5rem` | `600` |
| H2 (section) | `.markdown-body h2` | Lora | `1.25rem` | `600` |
| H3 (sub-section) | `.markdown-body h3` | Inter | `1.1rem` | `600` |
| Body | `.markdown-body` | Inter | `1rem` | `400` |
| Small / caption | `.section-subtitle` | Inter | `0.68rem`–`0.85rem` | `400` |

### 3.5 Writing Style (Textbook Content)

- **Audience:** Undergraduate business students
- **Reading level:** Grade 8–10
- **Voice:** Professional, warm, practical, direct instructor
- **Prefer:** *use, help, show, explain, because*
- **Avoid:** *utilize, facilitate, demonstrate, due to the fact that*
- **Never:** em dashes, dense academic phrasing, AI-style filler, corporate jargon

---

## 4. Layout

### 4.1 App Shell Architecture

```
┌─────────────────────────────────────────────────┐
│  Site Header (sticky, 56px, glass-morphism)      │
├─────────────────────────────────────────────────┤
│  Progress Bar (sticky, 3px, indigo→gold gradient) │
├──────────┬──────────────────────┬───────────────┤
│          │                     │               │
│ Sidebar  │   Main Content      │ On This Page  │
│ 280px    │   (flex: 1)         │ 240–260px     │
│ sticky   │                     │ sticky        │
│          │                     │               │
└──────────┴──────────────────────┴───────────────┘
```

### 4.2 Layout Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--sidebar-width` | `280px` | Desktop sidebar |
| `--header-height` | `56px` | Sticky header |
| `--progress-height` | `3px` | Reading progress bar |
| Max app width | `1680px` | `.app-body` max-width |
| Max reader width | `1380px` | `.chapter-reader` max-width |
| Home page width | `1280px` | `.home-page` max-width |
| Reader content width | `900px` | `.markdown-body` max-width (line length) |

### 4.3 Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | `8px` | Buttons, inputs, inline elements |
| `--radius-sm` | `12px` | Cards, panels |
| `--radius` | `16px` | Main surfaces |
| `--radius-lg` | `18px` | Large cards |
| `--radius-xl` | `24px` | Hero sections |

### 4.4 Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(24,24,27,0.08)` | Cards, subtle elevation |
| `--shadow` | `0 18px 50px rgba(24,24,27,0.08)` | Elevated panels, drawers |

### 4.5 Responsive Breakpoints

- **Desktop:** `≥1024px` — full sidebar + OnThisPage rail
- **Tablet:** `768px–1023px` — collapsible sidebar
- **Mobile:** `<768px` — hamburger menu, mobile drawer, bottom navigation

The hamburger button and mobile drawer are hidden via `display: none` on desktop and revealed via media queries at `max-width: 1024px` and `max-width: 768px`.

---

## 5. Components

### 5.1 Site Header

- **Height:** `var(--header-height)` = `56px`
- **Position:** Sticky, `z-index: 50`
- **Background:** Glass-morphism — `rgba(255,255,255,0.85)` + `backdrop-filter: saturate(180%) blur(12px)`
- **Border-bottom:** `1px solid var(--color-border)`

**Elements (left to right):**
1. **Home button** (🏠 icon) — indigo, no border, navigates to `/`
2. **Brand publisher** — "DIMA Publishing" in heading color, bold
3. **Brand highlight** — "DIGITAL TEXTBOOK" in `--brand-highlight` (teal `#0E7490`), extra bold
4. **Brand scope** — "Using Data to Drive Performance" in muted text

**Right side:**
5. **Admin button** (if admin) — outlined indigo pill
6. **User chip** (if signed in) — pill with avatar + name + sign-out
7. **Login button** — solid indigo pill (`--color-primary`)

### 5.2 Sidebar

- **Width:** `280px`
- **Position:** Sticky below header + progress bar
- **Background:** `--color-surface` (white)
- **Border-right:** `1px solid var(--color-border)`

**Sections (top to bottom):**

1. **Scope Navigation** — icons + labels for Home, Reader, Labs. Active item gets `--color-accent-soft` background + `--color-primary` text.

2. **Divider** — `1px solid var(--color-border)`

3. **Chapter Tree** — collapsible chapter toggles with caret icons. Active chapter gets `--color-primary` + `--color-accent-soft`. Chapter progress icon: green `#22C55E` checkmark when complete.

4. **Section Links** (within expanded chapter) — indented, smaller text. Active section: `--color-primary` text, `3px solid --color-primary` left border, `--color-accent-soft` background.

5. **Labs** — separate section below chapters, same active state pattern.

### 5.3 Progress Bar

- **Height:** `3px`
- **Position:** Sticky below header, `z-index: 49`
- **Background:** `--color-border` (track)
- **Fill:** `linear-gradient(90deg, var(--color-primary), var(--color-accent))` — indigo → gold
- **Transition:** `width 300ms ease`

### 5.4 Chapter Reader

- **Layout:** CSS Grid — `minmax(0,1fr) 240px` (content + OnThisPage rail)
- **When no headings** (empty OnThisPage): collapses to single column `1fr`
- **Wide screen** (`≥1440px`): rail expands to `260px`, gap to `3rem`

**Content card:**
- White background, `--radius` border-radius
- `box-shadow: 0 1px 3px rgba(24,24,27,0.04)`
- Padding: `clamp(1.5rem, 3vw, 3rem)`

**Reader header:**
- Breadcrumb: Chapter number (indigo, bold) → separator → section name
- Page title: Lora serif, `1.5rem`
- Meta: page indicator pill (muted bg, rounded)

**Page tabs (multi-page sections):**
- Sticky row of numbered tabs
- Active tab: `--color-primary` background, white text
- Inactive: white bg, muted text, border

### 5.5 On This Page

- **Position:** Sticky, right column of reader grid
- **Border-left:** `1px solid var(--color-border)`
- **Title:** "ON THIS PAGE" — uppercase, muted, `0.8rem`
- **Links:** Indented by heading level (H2, H3), active link bold + indigo

### 5.6 Bottom Navigation

- **Layout:** 2-column grid (`1fr 1fr`)
- **Previous card:** Left-aligned
- **Next card:** Right-aligned, text right
- **Cards:** White bg, border, `--radius-sm`, hover lifts + shadow
- **Direction label:** Uppercase, `--color-primary-soft`, `0.78rem`
- **Title:** Bold, `0.9rem`
- **Context:** Muted, `0.78rem`

### 5.7 Home Page

**Hero section:**
- Two-column grid: copy (1.05fr) + book cover (0.95fr)
- Background: `linear-gradient(180deg, rgba(255,255,255,0.96), rgba(253,253,254,0.9))`
- Decorative radial gradient glow (`rgba(79,70,229,0.09)`) in bottom-right
- Rounded: `--radius-xl` (24px)
- Prototype label: "DIGITAL TEXTBOOK" — indigo text, soft indigo bg, pill shape

**CTA buttons (pill-shaped, 999px radius):**
- **Primary:** Solid indigo, white text, indigo glow shadow
- **Secondary:** White bg, dark text, border
- **Outline:** Transparent, muted text, border

**Feature cards (4-column grid):**
- White bg, border, `--radius`, subtle shadow
- Icon in soft indigo circle
- Hover: border turns indigo, gradient overlay appears, icon lifts + rotates
- Overlay: radial indigo + linear gold gradient, opacity 0→1 on hover

**Chapter outline grid (2-column):**
- Number badge: soft indigo bg, indigo text, bold
- Title + subtitle (secondary blue) + focus (muted)
- Hover: lifts 2px, border turns `#C7D2FE`

**Chapter structure cards (3-column grid):**
- Subtle gradient bg (slate→white)
- Gold radial gradient overlay on hover
- Hover: lifts 3px, border turns `#C7D2FE`

**Video card:**
- Max width: `920px`, centered
- 16:9 aspect ratio frame
- White bg, border, `--radius`, shadow

**Final CTA:**
- Flex row with space-between
- Gradient bg: white → soft indigo
- Lora heading + CTA buttons

### 5.8 Login / Demo Login

- Centered card (max `480px`)
- White bg, border, `--radius`, shadow
- Mode toggle: segmented control (Sign In / Create Account)
- Active segment: white bg + shadow
- Form inputs: `--color-background` bg, border, focus ring = `--color-primary-soft`
- Trial info: soft indigo bg panel

### 5.9 Labs View

- Max width: `820px`, centered
- Lab tabs: pill-shaped, active = solid indigo
- Lab content: white card, `--radius`, shadow, generous padding
- Lab nav: Previous/Next buttons

---

## 6. Chapter Content Styling

### 6.1 Markdown Body

- **Line height:** `1.7`
- **Font size:** `1rem`
- **Max width:** `900px` (controlled line length for readability)

### 6.2 Headings (in chapter content)

| Level | Font | Size | Weight | Notes |
|-------|------|------|--------|-------|
| H1 | Lora | `1.5rem` | `600` | Bottom border, letter-spacing `-0.01em` |
| H2 | Lora | `1.25rem` | `600` | — |
| H3 | Inter | `1.1rem` | `600` | `--color-text` (not heading color) |

H2/H3 elements with `[id]` get `scroll-margin-top: calc(var(--header-height) + var(--progress-height) + 1rem)` for anchor offset.

### 6.3 Code Blocks

- **Inline code:** `--color-surface-muted` bg, `0.88em`, rounded `4px`
- **Code blocks:** `--color-heading` (`#1A2433`) background, `#D4D9DD` text
- **Font:** JetBrains Mono / Cascadia Code / Fira Code / Consolas
- **Block padding:** `1rem 1.25rem`, `--radius-xs`

### 6.4 Tables

- Full width, collapsed borders
- Header: `--color-surface-muted` bg, bold, left-aligned
- Cells: `0.4rem–0.5rem` vertical padding, `0.75rem` horizontal
- Wrapped in `.table-wrapper` for horizontal scroll on overflow

### 6.5 Blockquotes

- Left border: `4px solid --color-primary-soft`
- Background: `--color-surface-muted`
- Muted text color
- Right-side border-radius only

### 6.6 Images

- `max-width: 100%`, `display: block`
- `border-radius: var(--radius-xs)`
- Figures: centered, `1em` vertical margin
- Figcaptions: `0.85rem`, muted, italic

### 6.7 Videos (YouTube embeds)

- Wrapped in `.video-wrapper` with `56.25%` padding-bottom (16:9)
- Iframe: absolute, full width/height, `--radius-xs`
- Blocked iframes: red alert background, centered text

### 6.8 Callout HTML Pattern

Callouts use a `` pattern in chapter Markdown:

```html
<div class="callout tip">
  <p><strong>💡 Tip: Write queries top-down</strong></p>
  <ol>
    <li>Pick the rows with <code>WHERE</code>.</li>
    <li>Group with <code>GROUP BY</code>.</li>
    <li>Filter groups with <code>HAVING</code>.</li>
  </ol>
</div>
```

**Structure rules:**
- Emoji + type label in the first `<strong>` element
- First child: `margin-top: 0`
- Last child: `margin-bottom: 0`
- Lists: compact spacing (`0.35rem` top margin, `1.4rem` left padding)
- Inline code inside callouts: semi-transparent dark bg, `0.95em`

### 6.9 Figure Naming Convention

```
figure-<chapter>.<n>-<slug>.png
```

Example: `figure-05.3-sql-join-venn.png`

### 6.10 Figure Standards (Textbook)

- Rounded rectangles for concepts, systems, process steps
- Table-like boxes for database entities
- Cylinders for databases
- Diamonds for decision points
- Thin connector lines, clear arrows
- Minimal shadows, generous spacing, short labels
- Every figure must have a caption and meaningful alt text

### 6.11 Cross-Chapter Signposts

Use short inline references to connect chapters:

```markdown
As introduced in Chapter 2...
We will apply this more directly in Chapter 5...
```

### 6.12 Terms Cards

- Grid: `repeat(auto-fill, minmax(280px, 1fr))`
- Card: white bg, border, `--radius-sm`, padding
- Hover: lifts `3px`, shadow, border turns gold
- DT: bold, `1rem`, heading color
- DD: `0.88rem`, muted, `line-height: 1.5`

---

## 7. Accessibility

### 7.1 Target

WCAG 2.2 Level AA where practical.

### 7.2 Required Practices

- Logical heading order (H1 → H2 → H3, never skip)
- Meaningful alt text for all instructional images
- Captions or nearby explanations for complex diagrams
- No images of text, code, or tables when real text can be used
- Meaningful link text (no "click here")
- Do not rely on color alone to communicate meaning
- Keyboard-accessible interactive elements
- Color contrast checked for custom styles

### 7.3 Skip Link

Hidden by default (`top: -9999px`), revealed on focus (`top: 0`). Indigo bg, white text, centered.

### 7.4 Reduced Motion

The `AnimatedBookCover` and `HomePage` motion components respect `prefers-reduced-motion` via `useReducedMotion()` from `motion/react`. All transitions use `duration: 0` when reduced motion is preferred.

### 7.5 Media Rules

- Audio overview files must include a transcript
- YouTube videos should have corrected captions when possible + transcript or summary
- GIFs: decorative/supplemental only; instructional animations use video with controls
- Every embedded media item needs a caption or short explanation

### 7.6 Focus Styles

- Form inputs: `outline: 2px solid --color-primary-soft` on focus
- Skip link: revealed on focus
- Buttons/links: default browser focus ring (not suppressed)

### 7.7 Dark Mode

Callouts support `prefers-color-scheme: dark` with adjusted backgrounds and border colors (see `_static/call-outs.css`). Full dark mode for the platform UI is not yet implemented.

### 7.8 Print

Callouts include `@media print` rules with preserved background colors and dark text.

---

## 8. CSS Token Reference

This is the complete, copy-paste-ready CSS custom properties block used by `reader-hybrid-v1.1/src/styles.css`. All platform CSS must use these variables — never hardcode hex values.

```css
:root {
  /* ── Surfaces ── */
  --color-background: #F4F5F7;
  --color-surface: #FFFFFF;
  --color-surface-muted: #F1F5F9;

  /* ── Text ── */
  --color-text: #18181B;
  --color-text-muted: #71717A;
  --color-heading: #1A2433;

  /* ── Primary (indigo) ── */
  --color-primary: #4F46E5;
  --color-primary-soft: #4338CA;
  --color-secondary: #2D4F6F;

  /* ── Brand accents (navy + gold) ── */
  --color-accent: #D9B44F;
  --color-accent-dark: #8E7B55;
  --color-accent-soft: #EEF2FF;
  --brand-highlight: #0E7490;

  /* ── Section accent colors ── */
  --intro-text: #4F46E5;
  --intro-bg: #EEF2FF;
  --intro-border: #C7D2FE;
  --concepts-text: #2563EB;
  --concepts-bg: #EFF6FF;
  --concepts-border: #BFDBFE;
  --build-text: #059669;
  --build-bg: #ECFDF5;
  --build-border: #A7F3D0;
  --questions-text: #D97706;
  --questions-bg: #FFFBEB;
  --questions-border: #FDE68A;
  --terms-text: #7C3AED;
  --terms-bg: #F5F3FF;
  --terms-border: #DDD6FE;
  --rat-text: #0F766E;
  --rat-bg: #F0FDFA;
  --rat-border: #99F6E4;
  --labs-text: #047857;
  --labs-bg: #ECFDF5;
  --labs-border: #A7F3D0;

  /* ── Lines + links ── */
  --color-border: #E4E4E7;
  --color-link: #4F46E5;
  --color-link-hover: #4338CA;

  /* ── Status ── */
  --color-success: #15803D;
  --color-warning: #B45309;
  --color-danger: #B91C1C;

  /* ── Elevation + shape ── */
  --shadow: 0 18px 50px rgba(24, 24, 27, 0.08);
  --shadow-sm: 0 1px 3px rgba(24, 24, 27, 0.08);
  --radius: 16px;
  --radius-sm: 12px;
  --radius-xs: 8px;
  --radius-lg: 18px;
  --radius-xl: 24px;

  /* ── Layout ── */
  --sidebar-width: 280px;
  --header-height: 56px;
  --progress-height: 3px;

  /* ── Type ── */
  --font-stack: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-serif: "Lora", Georgia, "Times New Roman", serif;
  --font-mono: "JetBrains Mono", "Cascadia Code", "Fira Code", Consolas, monospace;
}
```

### Callout CSS Token Reference

From `_static/call-outs.css`. These define the 16 callout types. Used by the Markdown renderer in chapter content.

```css
/* Base */
.callout {
  margin: 1rem 0;
  padding: 0.9rem 1rem;
  border-left: 6px solid #64748B;
  border-radius: 0.35rem;
  background: #F8FAFC;
  color: #1E293B;
}

/* Types */
.callout.business-insight     { border-left-color: #2563EB; background: #EFF6FF; }
.callout.tip                  { border-left-color: #16A34A; background: #F0FDF4; }
.callout.note                 { border-left-color: #64748B; background: #F8FAFC; }
.callout.important            { border-left-color: #7C3AED; background: #F5F3FF; }
.callout.warning              { border-left-color: #F59E0B; background: #FFFBEB; }
.callout.caution              { border-left-color: #EA580C; background: #FFF7ED; }
.callout.good-practice        { border-left-color: #15803D; background: #F0FDF4; }
.callout.avoid                { border-left-color: #DC2626; background: #FEF2F2; }
.callout.info                 { border-left-color: #0891B2; background: #ECFEFF; }
.callout.example              { border-left-color: #0D9488; background: #F0FDFA; }
.callout.question             { border-left-color: #9333EA; background: #FAF5FF; }
.callout.definition           { border-left-color: #475569; background: #F8FAFC; }
.callout.discipline-definition{ border-left-color: #1D4ED8; background: #EFF6FF; }
.callout.term                 { border-left-color: #0369A1; background: #F0F9FF; }
.callout.concept              { border-left-color: #7E22CE; background: #FAF5FF; }
.callout.key-takeaway         { border-left-color: #CA8A04; background: #FEFCE8; }
```

---

## 9. Build & Deployment

### 9.1 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** Vanilla CSS with CSS custom properties (no Tailwind in production)
- **Animation:** `motion/react` (formerly Framer Motion)
- **Icons:** `lucide-react`
- **Markdown rendering:** `react-markdown` + `remark-gfm`
- **Auth:** Supabase
- **Deployment:** Vercel (https://data-pilot.dimapublishing.com/)

### 9.2 CSS File Relationship

| File | Role | Source of truth |
|------|------|----------------|
| `reader-hybrid-v1.1/src/styles.css` | Platform UI — all layout, components, markdown body | This document §2–§8 |
| `_static/call-outs.css` | Callout block styles (16 types + dark/print) | This document §2.6 |
| `_static/call-outs.css` is imported separately; `styles.css` has duplicate callout rules for the `.markdown-body` scope. In a future cleanup, `styles.css` should import or delegate to `call-outs.css` instead of duplicating. |

### 9.3 Vercel Build

The root `vercel.json` at `dima-publishing/vercel.json` points to:

```json
{
  "buildCommand": "cd books/database-book/platform-pilots/reader-hybrid-v1.1 && npm run build",
  "outputDirectory": "books/database-book/platform-pilots/reader-hybrid-v1.1/dist"
}
```

The app's own `vercel.json` handles SPA rewrite rules (all routes → `index.html`).

### 9.4 Content Pipeline

```
Google Drive drafts → chapter-source-import → repo stable files
→ chapter-sync → generated/bookData.ts → Vite build → Vercel
```

Chapter Markdown files are compiled into `src/generated/bookData.ts` which drives the sidebar navigation and chapter content loading. CSS files are bundled by Vite into the production build.

### 9.5 Keeping CSS in Sync

When design tokens change:
1. Update this document (§8 CSS Token Reference) first
2. Update `styles.css` to match
3. Update `call-outs.css` if callout colors changed
4. Run `npm run build` to verify no breakage
5. Deploy to Vercel

---

## 10. Mobile Behavioral Detail

### 10.1 Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `≥1024px` | Desktop: full sidebar (280px) + OnThisPage rail (240–260px) |
| `768px–1023px` | Tablet: collapsible sidebar, no OnThisPage rail |
| `<768px` | Mobile: hamburger menu, slide-in drawer, bottom navigation only |

### 10.2 Mobile Drawer

- **Width:** `280px` (matches `--sidebar-width`)
- **Position:** Fixed, `top: 0; left: 0; bottom: 0`, `z-index: 80`
- **Transform:** `translateX(-100%)` → `translateX(0)` when open
- **Transition:** `200ms ease`
- **Background:** `--color-surface` (white), `--shadow` box-shadow
- **Scrolling:** `overflow-y: auto` (independent scroll)

### 10.3 Mobile Overlay

- **Position:** Fixed `inset: 0`, `z-index: 70`
- **Background:** `rgba(31, 44, 60, 0.4)` (semi-transparent navy)
- **Opacity:** `0` → `1` when open
- **Pointer-events:** `none` → `auto` when open
- **Transition:** `opacity 200ms`

### 10.4 Scroll Locking

When the mobile drawer is open, body scroll must be locked. The `mobile-overlay` handles click-outside-to-close; the drawer handles its own internal scroll.

### 10.5 Sticky Stacking Order (Mobile)

```
z-index: 40  — Page tabs (if present)
z-index: 49  — Progress bar
z-index: 50  — Site header
z-index: 70  — Mobile overlay
z-index: 80  — Mobile drawer
```

The header, progress bar, and page tabs all coexist in the sticky stack. When the drawer opens, it renders above all of them.

### 10.6 Bottom Navigation (Mobile)

- **Layout:** 2-column grid, full width
- **Safe-area padding:** `env(safe-area-inset-bottom)` applied to bottom padding
- Cards collapse to full width on very narrow screens (`<400px`)

### 10.7 Hamburger Button

- **Visible:** `max-width: 1024px`
- **Hidden:** `≥1024px` (`display: none`)
- **Position:** Left side of header, before brand text
- **Style:** No border, no background, `--color-text` color, `padding: 6px`

---

## 11. Accessibility Testing & Verification

### 11.1 Required Checks

Every design change and every deployment must pass:

| Check | Tool | Frequency |
|-------|------|-----------|
| WCAG 2.2 AA audit | Lighthouse (included in Chrome DevTools) | Per deploy |
| Automated a11y scan | axe-core / `@axe-core/playwright` | CI on PR |
| Keyboard navigation | Manual — Tab through all interactive elements | Per feature |
| Color contrast | Lighthouse / axe / WebAIM contrast checker | Per deploy |
| Reduced motion | Test with `prefers-reduced-motion: reduce` enabled | Per feature |
| Screen reader | Manual — NVDA (Windows) or VoiceOver (Mac) | Quarterly |

### 11.2 CI Pipeline (Recommended)

```yaml
# Example checks (not yet implemented — target for future CI)
- lint:          npm run lint
- build:         npm run build
- css-drift:     script to compare :root tokens against design-instructions.md
- hardcoded:     stylelint rule banning bare hex colors outside :root
- a11y:          playwright + @axe-core/playwright on preview deploy
- visual-diff:   playwright screenshots vs baseline
```

### 11.3 Preview Validation Workflow

1. Push to branch → Vercel Preview Deployment
2. Run Lighthouse audit on preview URL
3. Run axe-core scan on preview URL
4. Review visual diffs (Playwright screenshots)
5. Promote preview to production (no separate production rebuild)

---

## 12. Definition of Done (Design Changes)

A design change is **done** only when ALL of these are true:

- [ ] This document (`design-instructions.md`) has been updated
- [ ] `styles.css` `:root` tokens match the doc
- [ ] `call-outs.css` callout types match the doc
- [ ] No hardcoded hex colors exist outside `:root` blocks
- [ ] `npm run build` succeeds with zero errors
- [ ] Lighthouse accessibility score ≥ 95 on preview deploy
- [ ] Keyboard navigation works through all interactive elements
- [ ] Reduced-motion users see no animations
- [ ] Drive working copy (`.docs/.styles/design-instructions.md`) is synced

---

## 13. Governance

### 13.1 CSS File Ownership

| File | Owns | Must NOT duplicate |
|------|------|--------------------|
| `styles.css` | `:root` tokens, layout, components, markdown body | Callout type colors (delegated to `call-outs.css`) |
| `_static/call-outs.css` | Callout type colors (all 16) + dark mode + print | Layout, components, markdown body |

Callout colors are consumed via `--callout-*-border` and `--callout-*-bg` CSS custom properties defined in `styles.css` `:root`. `call-outs.css` references these variables with fallback hex values.

### 13.2 Token Drift Prevention

To prevent CSS from drifting away from this spec:

1. **:`root` is the single source** for all color, spacing, radius, shadow, and font tokens
2. **No bare hex colors** in component or markdown styles — always use `var(--token)`
3. **Future CI check:** A script should compare `:root` tokens in `styles.css` against the CSS Token Reference in §8 of this document
4. **Future Stylelint rule:** Ban hex colors (`#` followed by 3/6/8 hex digits) outside of `:root` blocks

### 13.3 Font Loading Strategy

Currently: Google Fonts CDN (`fonts.googleapis.com`). Recommended upgrade path:

- **Phase 1 (current):** Google Fonts with `display=swap` and `preconnect` — acceptable for now
- **Phase 2 (future):** Self-host via `@fontsource` packages (`@fontsource/inter`, `@fontsource/lora`, `@fontsource/jetbrains-mono`) — removes third-party dependency, improves performance predictability, eliminates FOIT

---

## 14. File Manifest

### Canonical (Repo)

| File | Purpose |
|------|---------|
| `books/database-book/plans/design-instructions.md` | **This document** — canonical design authority |
| `books/database-book/platform-pilots/reader-hybrid-v1.1/src/styles.css` | Production CSS (`:root` tokens + layout + components) |
| `_static/call-outs.css` | Callout CSS (16 types + dark mode + print) |

### Working Copy (Drive)

| File | Purpose |
|------|---------|
| `.docs/.styles/design-instructions.md` | Working reference copy |

### Superseded (deprecated)

| File | Status |
|------|--------|
| `books/database-book/plans/book-edit/reader-hybrid-v1.1-design-system.md` | Superseded — platform-only, Tailwind-oriented |
| `.docs/.styles/bitm330_textbook_visual_design_system.md` | Superseded — content merged here |
| `.docs/.styles/visual-guidline-5-19.md` | Superseded — content merged here |

---

*End of design instructions. When in doubt, this document is the authority. Update it before updating CSS.*
