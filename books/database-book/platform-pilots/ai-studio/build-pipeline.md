# Build Pipeline

```text
npm run build
  → prebuild: npm run generate
    → tsx scripts/generateBookData.ts
      → Reads ../../files/source/chapters/
      → Generates src/generated/bookData.ts (4 chapters)
  → vite build
    → ✅ dist/ ready
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run generate` | Runs `tsx scripts/generateBookData.ts` — scans `files/source/chapters/` for Markdown chapter files and generates typed `src/generated/bookData.ts` |
| `npm run build` | Runs `prebuild` (generate) then `vite build` — produces `dist/` |
| `npm run dev` | Starts Vite dev server on `http://0.0.0.0:3000` |
| `npm run preview` | Previews the production build from `dist/` |
| `npm run lint` | Runs `tsc --noEmit` for type checking |

## Source → Build Flow

```
files/source/chapters/chNN-slug/
  ├── index.md                       → Introduction section
  ├── chNN-main-YYYY-MM-DD.md        → Core Concepts section
  ├── chNN-lets-build-YYYY-MM-DD.md  → Let's Build section
  ├── chNN-reflection-YYYY-MM-DD.md  → Review Questions section
  ├── chNN-terms-YYYY-MM-DD.md       → Terms Treasury section
  └── chNN-rat-YYYY-MM-DD.md         → RAT section

         │
         ▼
  scripts/generateBookData.ts
         │
         ▼
  src/generated/bookData.ts
         │
         ▼
  src/App.tsx ──→ import { CHAPTERS } from './generated/bookData'
         │
         ▼
  vite build ──→ dist/
```
