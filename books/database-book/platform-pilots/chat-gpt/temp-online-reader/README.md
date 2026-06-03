# ChatGPT Temp Online Reader

Temporary four-chapter online reader for the database book.

This app is intentionally scoped to the first four synced chapters. It lives in `chat-gpt/temp-online-reader/` so the existing `chat-gpt/docs/` requirements folder stays separate and untouched.

## Scope

Included:

- Vite + React + TypeScript reader.
- Chapters 1-4 only.
- Six reader sections per chapter.
- Collapsible sidebar navigation.
- Previous/next section navigation.
- Markdown rendering for tables, code blocks, links, images, callouts, and trusted YouTube iframes.

Excluded:

- Supabase.
- Stripe.
- Login or paid access.
- Notes persistence.
- AI chat.
- Firebase.
- LMS integration.
- Full 17-chapter sync.

## Source files

The generator reads from this folder, relative to `scripts/generateBookData.ts`:

```text
../../../../files/source/chapters/
```

It uses these four folders:

```text
ch01-introduction-to-course/
ch02-mis-and-bitm/
ch03-what-is-data/
ch04-databases/
```

## Section resolution

The generator uses stable files first, then dated fallback files, then placeholders.

| Reader section | Stable file | Temporary fallback |
|---|---|---|
| Introduction | `index.md` | none |
| Core Concepts | `core-concepts.md` | latest `chNN-main-YYYY-MM-DD.md` |
| Let's Build | `lets-build.md` | latest `chNN-lets-build-YYYY-MM-DD.md` |
| Review Questions | `review-questions.md` | latest `chNN-reflection-YYYY-MM-DD.md` |
| Terms Treasury | `terms-treasury.md` | latest `chNN-terms-YYYY-MM-DD.md` |
| RAT | `rat.md` | latest `chNN-rat-YYYY-MM-DD.md` |

Dated source files are temporary fallback inputs only. The final reader should consume the stable six-file contract once chapter sync generates it:

```text
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
```

## Run locally

```text
npm install
npm run generate
npm run lint
npm run build
npm run dev
```

Open the local Vite URL in the terminal output.

## Markdown safety

The reader uses `react-markdown`, `remark-gfm`, `rehype-raw`, and `rehype-sanitize`.

Raw HTML is sanitized. Scripts, event handlers, inline JavaScript, and unknown embed sources are not allowed. Iframes are allowed only for trusted YouTube embed hosts.

## Relationship to other files

- `chat-gpt/docs/` remains the requirements and product-roadmap material.
- `platform-pilots/claude/` remains a separate full-stack reference pilot.
- This app is a temporary reader prototype, not the final production app.
