# Chat: shadcn/ui Evaluation — 2026-07-07

**Source:** Copilot
**Original link:** n/a — local Copilot session

> Reopen: open this file in VS Code, or start a new chat and paste the TL;DR
> below as context. (VS Code Copilot sessions have no shareable deep link;
> only web chats with a share URL can be linked directly.)

---

## TL;DR

Evaluated shadcn/ui for potential use in the `reader-hybrid-v1.1` platform. Explained that it is a collection of copy-paste React components built with Tailwind CSS and Radix UI. Concluded that while it fits the React/Lucide stack, it requires adding Tailwind CSS. A design note was saved to evaluate this architectural shift later.

---

## Key Points
- shadcn/ui provides raw component source code instead of an npm dependency.
- Uses Tailwind CSS (styling) and Radix UI (accessibility).
- The current reader platform uses React and Lucide React (compatible), but relies on custom CSS instead of Tailwind.
- Adopting shadcn/ui requires migrating or adding Tailwind CSS to the `reader-hybrid-v1.1` project.

## What Was Done
- Evaluated the shadcn/ui framework against the current workspace (`reader-hybrid-v1.1`).
- Created a design note at `books/database-book/design/shadcn-evaluation.md` to capture the assessment and next steps.
- Added tasks to the todo list locally and in Notion to review this evaluation later.

## Key Files
- `books/database-book/design/shadcn-evaluation.md`
- `books/database-book/platform-pilots/reader-hybrid-v1.1/package.json`