---
name: book-deploy
description: >
  Build and deploy the online reader after chapter-sync. Runs generate (incremental),
  lint, build, then asks before committing, pushing, and deploying to Vercel.
  Prerequisite: chapter-sync has already been run for the target chapter(s).
argument-hint: Optional flags (e.g., "--force" to force-regenerate, "--skip-deploy" to build only)
---

# Book Deploy: Build and Deploy the Online Reader

Run the full build-and-deploy pipeline for the Reader Hybrid v1.1 online textbook
after chapter content has been synced via `chapter-sync`.

**This skill does NOT run `chapter-sync`.** The user must sync content first.

---

## Paths (fixed)

```
Repo root:    C:\Users\nd115232\Documents\GitHub\dima-publishing
Project root: books/database-book/platform-pilots/reader-hybrid-v1.1
Vercel project: dima-media/reader-hybrid-v1.1
Production URL: https://reader-hybrid-v11.vercel.app
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
> - src/generated/bookData.ts
>
> This will push to GitHub and deploy to https://reader-hybrid-v11.vercel.app.
> Proceed?"

**Wait for explicit user confirmation.** Do not auto-proceed.

If the user says no, stop and report what was built locally.

### 6. Commit and push

```
cd C:\Users\nd115232\Documents\GitHub\dima-publishing
git add books/database-book/platform-pilots/reader-hybrid-v1.1/src/generated/bookData.ts
git add books/database-book/platform-pilots/reader-hybrid-v1.1/.gitignore
git commit -m "Update reader content: <summary of what changed>"
git push
```

The commit message should include what changed, e.g.:
- "Update reader content: ch02 main, ch02 terms"
- "Update reader content: full rebuild (--force)"
- "Update reader content: ch01 lets-build, lab-01"

### 7. Deploy to Vercel

```
cd books/database-book/platform-pilots/reader-hybrid-v1.1
npx vercel deploy --prod --yes
```

### 8. Report

After deployment, report:

```
Deployed to: https://reader-hybrid-v11.vercel.app
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
- Deploy to Vercel production

**Does NOT:**
- Run `chapter-sync` (separate prerequisite)
- Edit source chapter or lab files
- Touch `reader-hybrid/` (v1) or `reader-hybrid-alt/`
- Modify `vercel.json` or project configuration
- Deploy without asking first
