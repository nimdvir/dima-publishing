---
name: book-deploy
description: >
  Build and deploy the online reader after approved source import/readiness checks.
  Runs generate (incremental), lint, build, then asks before committing, pushing,
  and deploying the root-linked data-pilot Vercel project.
  Prerequisite: chapter-source-import and readiness checks have already been run for the target chapter(s).
argument-hint: Optional flags (e.g., "--force" to force-regenerate, "--skip-deploy" to build only)
---

# Book Deploy: Build and Deploy the Online Reader

Run the full build-and-deploy pipeline for the Reader Hybrid v1.1 online textbook
after chapter content has been imported through `chapter-source-import` and checked for readiness.

**This skill does NOT run `chapter-source-import`, `chapter-sync`, or `chapter-final-check`.**
The user must approve source import/readiness first.

**Deployment target rule:** deploy from the repository root to the root-linked
`data-pilot` Vercel project. Do **not** deploy from
`books/database-book/platform-pilots/reader-hybrid-v1.1/`; doing so can target
the separate `reader-hybrid-v1.1` Vercel project and create/use the wrong
`reader-hybrid-v11-*` URL.

---

## Paths (fixed)

```
Repo root:    C:\Users\nd115232\Documents\GitHub\dima-publishing
Project root: books/database-book/platform-pilots/reader-hybrid-v1.1
Vercel project: dima-media/data-pilot
Production URL: https://data-pilot.dimapublishing.com/
Root Vercel config: vercel.json
```

---

## Procedure

### 1. Generate content

Run from the project root:

```
npm run generate
```

Or with `--force` if the user requested it:

```
npm run generate -- --force
```

The generator will either:
- **Skip** ("No source changes detected") — nothing to do, report to user and stop
- **Rebuild** — lists what changed, writes new `bookData.ts` + manifest

If the generator skipped and the user did not pass `--force`, ask:

> "No content changes detected. Force a rebuild anyway, or stop here?"

If the user says stop, end the skill. If force, rerun with `--force`.

### 2. Lint

```
npm run lint
```

If lint fails, report the errors and stop. Do not proceed to build with type errors.

### 3. Build

```
npm run build
```

If build fails, report the errors and stop. Do not proceed to deploy with a broken build.

### 4. Show what changed

Run:

```
git status --short books/database-book/platform-pilots/reader-hybrid-v1.1/
```

Show the user a summary of changed files. Typical changes:
- `src/generated/bookData.ts` — the regenerated content
- Any other files modified in this session

### 5. Ask before push and deploy

Present the changed files and ask:

> "Ready to commit, push, and deploy to Vercel?
>
> Changed files:
> - books/database-book/files/source/chapters/chNN-.../core-concepts.md
> - books/database-book/platform-pilots/reader-hybrid-v1.1/src/generated/bookData.ts
>
> This will push to GitHub and deploy to https://data-pilot.dimapublishing.com/.
> Proceed?"

**Wait for explicit user confirmation.** Do not auto-proceed.

If the user says no, stop and report what was built locally.

### 6. Commit and push

```
cd C:\Users\nd115232\Documents\GitHub\dima-publishing
git add <approved changed source files>
git add books/database-book/platform-pilots/reader-hybrid-v1.1/src/generated/bookData.ts
git commit -m "Update reader content: <summary of what changed>"
git push
```

Only stage files that belong to the approved deploy. If the worktree contains
unrelated chapter, agent, or platform changes, leave them unstaged. The root
Vercel build can regenerate reader data from committed source files; include
`src/generated/bookData.ts` when it was intentionally regenerated as part of the
approved deploy.

The commit message should include what changed, e.g.:
- "Update reader content: ch02 main, ch02 terms"
- "Update reader content: full rebuild (--force)"
- "Update reader content: ch01 lets-build, lab-01"

### 7. Deploy to Vercel

```
cd C:\Users\nd115232\Documents\GitHub\dima-publishing
npx vercel deploy --prod --yes --scope dima-media
```

The root `vercel.json` runs the reader build in `reader-hybrid-v1.1` and serves
the output through the active `data-pilot` project. Never use the subfolder as
the deployment working directory for production.

### 8. Report

After deployment, report:

```
Deployed to: https://data-pilot.dimapublishing.com/
Changed: ch02/main, ch02/terms
Build: ✓ (X modules, Y.YY KB gzipped)
Commit: <hash>
```

---

## Flags

| Flag | Effect |
|---|---|
| `--force` | Pass `--force` to `npm run generate` to bypass incremental check |
| `--skip-deploy` | Run generate + lint + build only, do not commit/push/deploy |

---

## Scope Boundaries

**Does:**
- Run generate, lint, build from `reader-hybrid-v1.1/`
- Commit and push `bookData.ts` changes to GitHub
- Deploy the root-linked `data-pilot` Vercel project to production

**Does NOT:**
- Run `chapter-source-import`, `chapter-sync`, or readiness checks (separate prerequisites)
- Edit source chapter or lab files
- Touch `reader-hybrid/` (v1) or `reader-hybrid-alt/`
- Modify `vercel.json` or project configuration
- Deploy from `books/database-book/platform-pilots/reader-hybrid-v1.1/`
- Deploy without asking first
