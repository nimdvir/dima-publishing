# Phase 4: v2B — Persistent Learning Features

**Gate:** Do not start until v2A exit criteria are met.

---

## 4.1 — Progress Persistence

| Column | Type |
|---|---|
| `user_id` | uuid |
| `page_id` | text |
| `chapter_slug` | text |
| `reader_area_slug` | text |
| `last_viewed_at` | timestamptz |
| `completed_at` | timestamptz (nullable) |
| `scroll_position` | integer (nullable) |

**Use cases:** resume reading, chapter/book completion tracking, viewed-page status.

## 4.2 — Notes

| Column | Type |
|---|---|
| `id` | uuid PK |
| `user_id` | uuid FK |
| `page_id` | text |
| `selected_text` | text |
| `note_text` | text |
| `created_at` | timestamptz |
| `updated_at` | timestamptz |

- Private by default; user can edit and delete
- RLS: `user_id = auth.uid()`
- Notes never modify source Markdown

## 4.3 — Labs Expansion

| Stage | Scope |
|---|---|
| v2B.1 | Read lab instructions |
| v2B.2 | Download supporting files |
| v2B.3 | Mark lab complete |
| Later | Submit work |
| Later | Instructor review/grading |

Do not build a full LMS submission system during the first v2B pass.

## 4.4 — Search

- Server-side search for protected content
- Respects access grants — returns only authorized content
- Indexes: chapter, reader area, page, heading, body text
- Links directly to relevant page + heading
- No protected snippets exposed to unpaid users

## 4.5 — Accessibility Hardening

- Keyboard-only navigation audit
- Landmark and heading audit
- Skip links
- Visible focus states
- Reduced-motion testing
- Screen reader testing
- Table accessibility
- Accessible forms and validation
- Contrast audit
- Mobile zoom/reflow
- Captions/transcripts for instructional videos

---

## NOT in v2A or v2B

- AI Assistant
- Instructor dashboard
- Student submissions
- Gradebook
- LTI
- SSO (unless formally available)
- Advanced analytics
- Recommendation engine
- Semantic search
- Full 17-chapter migration (handled separately in Phase 2)
