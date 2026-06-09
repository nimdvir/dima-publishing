# Platform Pilots

Prototype interfaces for the digital edition of *Using Data to Drive Business Performance*.

Each pilot lives in its own folder under `books/database-book/platform-pilots/`. The same source tree supports two deployment targets:

- **Vercel:** one project per pilot, root directory set to the pilot folder, `VITE_BASE_PATH` unset
- **GitHub Pages:** one combined site with a gallery landing page and nested pilot folders

**Status:** configuration is complete locally. The GitHub Pages workflow (`.github/workflows/deploy-platform-pilots-pages.yml`) must be committed, pushed, and executed on GitHub before live URLs are verified.

## GitHub Pages

**Root gallery:**

https://nimdvir.github.io/dima-publishing/

**Pilot URL pattern:**

`https://nimdvir.github.io/dima-publishing/platform-pilots/<pilot-folder>/`

**Examples:**

- https://nimdvir.github.io/dima-publishing/platform-pilots/reader-hybrid-v1.1/
- https://nimdvir.github.io/dima-publishing/platform-pilots/chat-gpt/temp-online-reader/

**Repository setting required:**

Settings → Pages → Build and deployment → Source: **GitHub Actions**

**Workflow:** `.github/workflows/deploy-platform-pilots-pages.yml`

Builds every static-compatible pilot, stages outputs under `pages/platform-pilots/`, generates the root gallery from `pilots.json`, and deploys one combined artifact. The workflow fails if any included build is missing its output.

## Vercel

Each pilot is deployed as an **independent Vercel project**:

| Setting | Value |
|---|---|
| Root Directory | `books/database-book/platform-pilots/<pilot-folder>` |
| Build Command | `npm run build` (Vite pilots) or leave blank (static HTML) |
| Output Directory | `dist` (Vite pilots) or leave blank / `.` (static HTML) |
| Environment | Leave `VITE_BASE_PATH` **unset** |

For **static HTML pilots** such as `prototype`, set Root Directory to the pilot folder and leave Build Command and Output Directory blank (or `.`). Vercel serves `index.html` from the project root. Do not enter the full monorepo path again as Output Directory after Root Directory is already set.

Do not create one Vercel project that serves all pilots unless you intentionally want a monorepo router.

## Pilot audit

| Pilot | Framework | Pages | Vercel | Build command | Output | Notes |
|---|---|---:|---:|---|---|---|
| `reader-hybrid-v1.1` | Vite + React 18 | Yes | Yes | `npm run build` | `dist` | Current reader; query-param routing |
| `google-ai-studio` | Vite + React 19 | Yes | Yes | `npm run build` | `dist` | Reference AI Studio export |
| `reader-hybrid` | Vite + React 18 | Yes | Yes | `npm run build` | `dist` | Archived v1 reader |
| `reader-hybrid-alt` | Vite + React 19 | Yes | Yes | `npm run build` | `dist` | Alternative comparison build |
| `cursor-online-reader` | Vite + React 19 | Yes | Yes | `npm run build` | `dist` | Reads `files/source/chapters/` |
| `ai-studio` | Vite + React 19 | Yes | Yes | `npm run build` | `dist` | Uses local `chapters/` copy |
| `chat-gpt/temp-online-reader` | Vite + React 19 | Yes | Yes | `npm run build` | `dist` | Nested path preserved on Pages |
| `prototype` | Static HTML snapshot | Yes | Yes | *(none — committed snapshot)* | `.` (pilot root) | **INCLUDE_STATIC_SNAPSHOT** — Pages deploys committed HTML; CI cannot regenerate because `book-platform` is external |
| `claude` | Next.js 16 | No | Yes | `npm run build` | `.next` | API routes, Supabase, Stripe — Vercel only |
| `antigravity` | — | No | No | — | — | Inactive artifact |
| `chat-gpt/` | — | No | No | — | — | Documentation container; app is nested |

## Base path

Vite pilots honor an environment-controlled base:

```ts
base: process.env.VITE_BASE_PATH || '/',
```

- **Local / Vercel:** leave `VITE_BASE_PATH` unset → base `/`
- **GitHub Pages:** workflow sets `VITE_BASE_PATH=/dima-publishing/platform-pilots/<folder>/`

Public assets in `index.html` should use `%BASE_URL%`. Web manifests should use relative icon paths.

## Generator paths

Pilots with `npm run generate` resolve source content from repository-relative paths:

| Pilot | Source |
|---|---|
| `reader-hybrid`, `reader-hybrid-alt`, `reader-hybrid-v1.1`, `cursor-online-reader`, `chat-gpt/temp-online-reader` | `books/database-book/files/source/` |
| `ai-studio` | Local `chapters/` inside the pilot |

GitHub Actions runs on Linux with case-sensitive paths. Generator scripts must match folder casing exactly.

## Prototype static snapshot

The `prototype` pilot is classified as **INCLUDE_STATIC_SNAPSHOT**:

- GitHub Pages copies the committed static HTML, CSS, JS, and pre-generated `book/` pages.
- GitHub Actions does **not** run `build_static_book.py` because the `book-platform` Python module is not in this repository.
- To refresh chapter HTML locally, run `python build_static_book.py` from a machine that has `book-platform` available, then commit the updated snapshot.

**Vercel settings for `prototype`:**

| Setting | Value |
|---|---|
| Root Directory | `books/database-book/platform-pilots/prototype` |
| Framework Preset | Other |
| Build Command | *(blank)* |
| Output Directory | *(blank or `.`)* |

## Local verification

**Clean build (simulates GitHub Actions):**

```powershell
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm ci
npm run build
Test-Path dist/index.html
```

**GitHub Pages build** (PowerShell):

```powershell
$env:VITE_BASE_PATH="/dima-publishing/platform-pilots/reader-hybrid-v1.1/"
npm run build
Remove-Item Env:VITE_BASE_PATH
```

Confirm `dist/index.html` references the nested base, then rebuild with `VITE_BASE_PATH` unset before committing.

## Metadata

Pilot gallery metadata lives in `pilots.json`. The workflow uses `scripts/generate-pages-gallery.mjs` to emit `pages/index.html` and `pages/platform-pilots.json`.

## Excluded from GitHub Pages

- **`claude`:** Next.js server routes, Supabase auth, Stripe checkout/webhooks
- **`antigravity`:** not an application
- **`chat-gpt/`:** docs container only

No backend, Stripe, Supabase, Firebase, authentication, or payment logic was added for Pages deployment.
