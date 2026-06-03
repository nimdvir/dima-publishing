# Not Added to the Temp Online Reader

This file records what was intentionally **not** added to the temporary ChatGPT online-reader prototype.

The prototype lives at:

```text
books/database-book/platform-pilots/chat-gpt/temp-online-reader/
```

Its goal is narrow: render the first four synced chapters as a lightweight online book reader.

## Intentionally out of scope

The following features were not added:

- Supabase integration
- Stripe payments
- Login or account creation
- Paid access control
- Student notes persistence
- Bookmarks or saved progress
- Instructor dashboard
- Admin dashboard
- LMS integration
- Firebase
- AI chat or tutoring features
- Analytics tracking
- Search across chapters
- Full 17-chapter sync
- Production deployment configuration
- Remote hosting setup

## Source limitations

The temp reader currently uses only these four chapter folders:

```text
ch01-introduction-to-course/
ch02-mis-and-bitm/
ch03-what-is-data/
ch04-databases/
```

The source folders are still transitional. The final desired chapter contract is:

```text
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
```

For now, the generator prefers those stable files, then falls back to the latest dated files such as:

```text
chNN-main-YYYY-MM-DD.md
chNN-lets-build-YYYY-MM-DD.md
chNN-reflection-YYYY-MM-DD.md
chNN-terms-YYYY-MM-DD.md
chNN-rat-YYYY-MM-DD.md
```

The dated fallback behavior is temporary.

## Technical limitations

- All generated Markdown content is bundled into the client JavaScript.
- The Vite build warns that the JS chunk is larger than 500 KB.
- There is no route-based URL structure; navigation uses query parameters.
- The mobile sidebar is basic and should receive a full accessibility pass before production use.
- Markdown rendering is sanitized, but embedded iframe support is intentionally limited to trusted YouTube embed URLs.

## Before promoting this prototype

Before this reader is promoted to a production or non-pilot location, add or decide on:

1. Stable six-file source generation for all chapters.
2. A production URL and deployment target.
3. Lazy-loaded content or split chapter data to reduce bundle size.
4. Search, bookmarks, and reading progress if needed.
5. A keyboard and screen-reader accessibility pass.
6. A decision about whether payments/auth belong in this reader or remain a separate full-stack platform phase.
