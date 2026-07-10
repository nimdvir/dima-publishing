# Copilot Chat — GitHub Backup Safety & Git Basics

**Date:** 2026-07-08
**Topic:** Safely backing up book work to GitHub without affecting the live deployment; plain-language Git training.

---

## TL;DR

Nim was worried that committing many pending changes might break the happy live
deployment of the book reader. We confirmed that **commit and push never deploy**
— only a manual `vercel deploy --prod` (via `/book-deploy`) changes the live
site. To be extra safe (Vercel↔GitHub `main` deploy behavior couldn't be fully
verified), all work was committed to a **safety branch** instead of `main`.
Everything is now backed up and the working tree is clean. `main` and the live
site are untouched.

---

## Key Points

- **Commit = save locally. Push = back up to GitHub. Deploy = publish (separate,
  manual).** Only deploy changes what readers see.
- The repo `dima-publishing` is **public** — chat logs and local config were
  reviewed before committing.
- Could not fully verify whether pushing to `main` auto-deploys via Vercel git
  integration, so we used a **safety branch** (`backup-2026-07-08`) to eliminate
  all deploy risk. A branch push can at most create a private preview, never
  touch production.
- **Source of truth = `main` on GitHub.** Right now newest work lives on the
  backup branch, so there are two timelines. This should be consolidated back to
  `main` later (carefully), to avoid mess.
- Disabled git auto-`gc` (`gc.auto 0`) to stop the repeated
  "Deletion of directory failed (y/n)" prompts during commits.

## What Was Done

- Created safety branch **`backup-2026-07-08`** and committed all pending work
  (chapters, reader UI, skills, review package, data/config).
- Pushed the branch to GitHub (`origin/backup-2026-07-08`).
- Committed remaining files (chat logs, `.vscode/mcp.json`) in follow-up commits;
  working tree is now **clean (0 changes)**.
- Verified `main` unchanged (`0a6200e`) and the live site untouched.
- Gave plain-language tutorials on: repo structure, the Source Control panel,
  what a branch is, and the simple save-vs-publish workflow.

## Simple Workflow Going Forward

- **Save work:** `git add -A; git commit -m "work"; git push` (or say "save my
  work" and Copilot does it). Never deploys.
- **Publish:** say "deploy the book" → runs `/book-deploy`. Only this changes
  the live site.

## Open / Next Time

- **Consolidate branches:** merge `backup-2026-07-08` back into `main` so there
  is one source of truth. Do carefully and confirm deploy behavior first.
- Optionally verify Vercel project git-integration settings (local `.vercel`
  links project `data-pilot`) to know for certain whether `main` push
  auto-deploys.

## Key Files / Refs

- Repo: `c:\Users\nd115232\Documents\GitHub\dima-publishing`
- Safety branch: `backup-2026-07-08` (pushed to GitHub)
- Deploy skill: `.agents/skills/book-deploy/SKILL.md`
- Vercel config: `vercel.json` (build from
  `books/database-book/platform-pilots/reader-hybrid-v1.1`)
- Production URL: https://reader-hybrid-v11.vercel.app
