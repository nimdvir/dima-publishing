# Reader Hybrid v1.1 — Design System

**Date:** 2026-06-06
**Purpose:** CSS custom properties, color palette, typography, and component styles for the Reader Hybrid v1.1 redesign. Designed for use with Tailwind CSS 4 `@theme` tokens or as standalone CSS variables in `src/index.css`.

---

## Core UI Palette

Mirrors Google AI Studio's clean zinc-gray shell with white workspace.

| Role | Color | Hex |
|------|-------|-----|
| App background | Zinc shell | `#F4F5F7` |
| Secondary shell | Soft slate | `#F8FAFC` |
| Main workspace | White | `#FFFFFF` |
| Raised surface | Soft white | `#FDFDFE` |
| Muted panel | Light zinc | `#F1F5F9` |
| Border | Zinc border | `#E4E4E7` |
| Strong border | Slate border | `#CBD5E1` |
| Main text | Zinc ink | `#18181B` |
| Secondary text | Zinc gray | `#52525B` |
| Muted text | Soft gray | `#71717A` |

---

## Brand Accent Palette

Indigo/blue as primary app accent (like Google AI Studio). Gold reserved for premium, AI, progress, or special emphasis.

| Role | Color | Hex |
|------|-------|-----|
| Primary indigo | Academic indigo | `#4F46E5` |
| Hover indigo | Deep indigo | `#4338CA` |
| Soft indigo bg | Indigo tint | `#EEF2FF` |
| Indigo border | Soft indigo border | `#C7D2FE` |
| Book navy | Data navy | `#1A3B66` |
| Blue-gray | Database blue | `#2D4F6F` |
| Teal blue | Analytics teal | `#4D7992` |
| Gold accent | Academic gold | `#D9B44F` |
| Soft gold | Pale gold | `#FFF7DD` |
| Glow accent | Warm glow | `#FFB84D` |

---

## Section Accent Palette

Used sparingly: icon color, badge background, active border, section pill. Never floods the page.

| Reader Area | Text | Background | Border |
|-------------|------|------------|--------|
| Introduction | `#4F46E5` | `#EEF2FF` | `#C7D2FE` |
| Core Concepts | `#2563EB` | `#EFF6FF` | `#BFDBFE` |
| Let's Build | `#059669` | `#ECFDF5` | `#A7F3D0` |
| Review Questions | `#D97706` | `#FFFBEB` | `#FDE68A` |
| Terms Treasury | `#7C3AED` | `#F5F3FF` | `#DDD6FE` |
| RAT | `#0F766E` | `#F0FDFA` | `#99F6E4` |
| Labs | `#047857` | `#ECFDF5` | `#A7F3D0` |
| AI Assistant | `#B45309` | `#FFF7ED` | `#FED7AA` |
| Access / Login | `#1A3B66` | `#EFF6FF` | `#BFDBFE` |

---

## Typography

Three typefaces from Google Fonts:

| Role | Family | Weights |
|------|--------|---------|
| UI / body | Inter | 300, 400, 500, 600, 700, 800 |
| Editorial headings | Lora | 400, 500, 600, 700 + italic |
| Code blocks | JetBrains Mono | 400, 500, 600 |

**Google Fonts import URL:**
```
https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500;600&display=swap
```

---

## Complete CSS Variables

```css
:root {
  /* App shell */
  --bg-app: #F4F5F7;
  --bg-shell: #F8FAFC;
  --bg-panel: #FFFFFF;
  --bg-surface: #FDFDFE;
  --bg-muted: #F1F5F9;

  /* Text */
  --text-main: #18181B;
  --text-secondary: #52525B;
  --text-muted: #71717A;
  --text-inverse: #FFFFFF;

  /* Borders */
  --border-soft: #E4E4E7;
  --border-medium: #CBD5E1;

  /* Primary interface accent */
  --primary: #4F46E5;
  --primary-hover: #4338CA;
  --primary-soft: #EEF2FF;
  --primary-border: #C7D2FE;

  /* Book-cover brand accents */
  --brand-navy: #1A3B66;
  --brand-blue: #2D4F6F;
  --brand-teal: #4D7992;
  --brand-gold: #D9B44F;
  --brand-gold-soft: #FFF7DD;
  --brand-glow: #FFB84D;

  /* Section accents: Introduction */
  --intro-text: #4F46E5;
  --intro-bg: #EEF2FF;
  --intro-border: #C7D2FE;

  /* Section accents: Core Concepts */
  --concepts-text: #2563EB;
  --concepts-bg: #EFF6FF;
  --concepts-border: #BFDBFE;

  /* Section accents: Let's Build */
  --build-text: #059669;
  --build-bg: #ECFDF5;
  --build-border: #A7F3D0;

  /* Section accents: Review Questions */
  --questions-text: #D97706;
  --questions-bg: #FFFBEB;
  --questions-border: #FDE68A;

  /* Section accents: Terms Treasury */
  --terms-text: #7C3AED;
  --terms-bg: #F5F3FF;
  --terms-border: #DDD6FE;

  /* Section accents: RAT */
  --rat-text: #0F766E;
  --rat-bg: #F0FDFA;
  --rat-border: #99F6E4;

  /* Section accents: AI Assistant */
  --ai-text: #B45309;
  --ai-bg: #FFF7ED;
  --ai-border: #FED7AA;

  /* Section accents: Labs */
  --labs-text: #047857;
  --labs-bg: #ECFDF5;
  --labs-border: #A7F3D0;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-sm: 0 4px 12px rgba(15, 23, 42, 0.07);
  --shadow-md: 0 12px 30px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 20px 60px rgba(15, 23, 42, 0.10);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;
}
```

---

## Layout Styles

```css
body {
  margin: 0;
  background: var(--bg-app);
  color: var(--text-main);
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.app-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(79, 70, 229, 0.08), transparent 32rem),
    linear-gradient(180deg, var(--bg-shell), var(--bg-app));
}

.sidebar {
  background: #FAFAFA;
  border-right: 1px solid var(--border-soft);
  box-shadow: var(--shadow-xs);
}

.main-workspace {
  background: var(--bg-panel);
  border-left: 1px solid var(--border-soft);
}

.top-header {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-soft);
}

.reader-card {
  background: var(--bg-panel);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}
```

---

## Buttons

```css
.button-primary {
  background: var(--primary);
  color: var(--text-inverse);
  border: 1px solid var(--primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
}

.button-primary:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.button-secondary {
  background: var(--bg-panel);
  color: var(--text-main);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
}

.button-secondary:hover {
  background: var(--primary-soft);
  border-color: var(--primary-border);
  color: var(--primary-hover);
}

.button-gold {
  background: var(--brand-gold);
  color: #111827;
  border: 1px solid var(--brand-gold);
  border-radius: var(--radius-md);
}

.button-gold:hover {
  background: var(--brand-glow);
}
```

---

## Sidebar Navigation

```css
.nav-item {
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  transition:
    background 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;
}

.nav-item:hover {
  background: var(--bg-panel);
  color: var(--text-main);
  border-color: var(--border-soft);
}

.nav-item.active {
  background: var(--primary-soft);
  color: var(--primary-hover);
  border-color: var(--primary-border);
  box-shadow: var(--shadow-xs);
}
```

---

## Section Pills

```css
.section-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 999px;
  padding: 0.25rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1px solid;
}

.section-pill.introduction {
  color: var(--intro-text);
  background: var(--intro-bg);
  border-color: var(--intro-border);
}

.section-pill.core-concepts {
  color: var(--concepts-text);
  background: var(--concepts-bg);
  border-color: var(--concepts-border);
}

.section-pill.lets-build {
  color: var(--build-text);
  background: var(--build-bg);
  border-color: var(--build-border);
}

.section-pill.review-questions {
  color: var(--questions-text);
  background: var(--questions-bg);
  border-color: var(--questions-border);
}

.section-pill.terms-treasury {
  color: var(--terms-text);
  background: var(--terms-bg);
  border-color: var(--terms-border);
}

.section-pill.rat {
  color: var(--rat-text);
  background: var(--rat-bg);
  border-color: var(--rat-border);
}
```

---

## Progress Block

```css
.progress-card {
  background: var(--bg-panel);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
  padding: 0.85rem;
  box-shadow: var(--shadow-xs);
}

.progress-track {
  height: 0.4rem;
  background: var(--bg-muted);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--brand-teal));
  border-radius: inherit;
  transition: width 400ms ease;
}
```

---

## Cover Card

```css
.cover-card {
  background:
    radial-gradient(circle at 70% 35%, rgba(217, 180, 79, 0.18), transparent 9rem),
    linear-gradient(180deg, #FFFFFF, #F8FAFC);
  border: 1px solid var(--border-soft);
  border-left: 8px solid #111827;
  border-radius: 0 28px 28px 0;
  box-shadow: 25px 30px 50px -15px rgba(24, 24, 35, 0.22);
  transform-style: preserve-3d;
}

.cover-card:hover {
  transform: rotateY(-4deg) rotateX(2deg) scale(1.02);
}
```

---

## Code Blocks

```css
pre {
  background: #0F172A;
  color: #E5E7EB;
  border-radius: var(--radius-lg);
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid rgba(148, 163, 184, 0.25);
}

code {
  font-family: "JetBrains Mono", Consolas, Monaco, monospace;
}

:not(pre) > code {
  background: var(--bg-muted);
  color: var(--brand-navy);
  border: 1px solid var(--border-soft);
  border-radius: 6px;
  padding: 0.1rem 0.35rem;
}
```

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## Section Icons & Subtitles

| Reader Area | Icon (Lucide) | Subtitle |
|-------------|---------------|----------|
| Introduction | `BookMarked` | Hook & Core Alignment |
| Core Concepts | `Layers` | Theory & Core Frameworks |
| Let's Build | `Terminal` | Hands-on Code Laboratory |
| Review Questions | `HelpCircle` | Self-explanation Exercises |
| Terms Treasury | `Sparkles` | Key Glossary & Core Definitions |
| RAT | `Award` | Verify Knowledge Retention |
| Labs | `FlaskConical` | — |
| AI Assistant | `MessageSquare` | — |

---

## Scope Icons

| Scope | Icon (Lucide) |
|-------|---------------|
| Home / Welcome | `LayoutDashboard` |
| Book / Chapter | `BookOpen` |
| Labs | `Terminal` |
| AI Assistant | `MessageSquare` |
| Access | `ShieldCheck` |

---

## Design Rule

```
90% white / zinc / clean interface
 8% indigo / blue / teal navigation
 2% gold / glow highlights
```

The interface stays clean and white. Color is controlled and minimal.
