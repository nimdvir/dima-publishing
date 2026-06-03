# Roadmap

**Project:** Database Book Platform  
**Version:** 0.1  
**Date:** 2026-05-29  
**Status:** Working roadmap

## 1. Strategy

Build the platform in phases. Do not start with the full dream system. Start with the smallest paid reading platform that proves the core loop:

```text
student signs up → pays → reads → takes notes → returns
```

Everything else should come after this loop works.

## 2. Product Phases

| Phase | Goal | Status |
|---|---|---|
| 0 | Planning docs | Now |
| 1 | Source structure | Next |
| 2 | Static reader | Next |
| 3 | Paid access | Next |
| 4 | Notes/progress | Next |
| 5 | Media/accessibility | Next |
| 6 | Instructor layer | Later |
| 7 | LMS integration | Later |
| 8 | Interactive learning | Later |
| 9 | Productization | Later |

## 3. Phase 0 — Planning and Architecture

### Goal

Create the documents and decisions needed to build without chaos.

### Deliverables

- `docs/requirements.md`
- `docs/data-model.md`
- `docs/payment-flow.md`
- `docs/accessibility-checklist.md`
- `docs/roadmap.md`
- Repo structure
- Platform pilot folders
- Source folder
- Media registry

### Exit Criteria

- Requirements are written.
- MVP scope is clear.
- Tech stack is selected.
- Folder structure exists.
- Payment model is defined.
- Accessibility standard is defined.

## 4. Phase 1 — Book Source Structure

### Goal

Create the canonical Markdown source of the book.

### Deliverables

```text
source/
  index.md
  preface.md
  chapters/
    01-introduction/
      index.md
      notes.md
      media.yml
```

### Tasks

- Create one folder per chapter.
- Move official chapter Markdown into `index.md`.
- Add chapter metadata.
- Add media metadata.
- Separate drafts from source.
- Confirm naming conventions.
- Add glossary and question bank later.

### Exit Criteria

- All chapters have folders.
- All chapters have `index.md`.
- Book source can be parsed.
- No heavy media is stored in source.
- Chapter slugs are stable.

## 5. Phase 2 — Static Reader MVP

### Goal

Build a reader that displays Markdown chapters.

### Deliverables

- Chapter renderer.
- Sidebar navigation.
- Bottom previous/next navigation.
- Responsive layout.
- Basic media rendering.
- Sample chapter route.

### Tasks

- Build Markdown renderer.
- Generate table of contents.
- Generate section anchors.
- Create collapsible sidebar.
- Create bottom nav.
- Add responsive CSS.
- Add YouTube embed support.
- Add Cloudinary image support.
- Add audio player support.

### Exit Criteria

- Public sample chapter works.
- Paid chapter route can render.
- Sidebar opens chapters.
- Bottom nav works.
- Mobile layout works.
- Media displays correctly.

## 6. Phase 3 — Login and Paid Access

### Goal

Allow students to create accounts and buy access.

### Deliverables

- Signup/login.
- Stripe Checkout.
- Webhook fulfillment.
- Access grants.
- Protected chapter routes.
- Admin manual access.

### Tasks

- Set up Supabase Auth.
- Create user profiles.
- Create product table.
- Create Stripe Price.
- Create checkout endpoint.
- Create webhook endpoint.
- Create access grants.
- Protect `/book`.
- Create success/cancel pages.
- Test payment flow.

### Exit Criteria

- Student can sign up.
- Student can pay.
- Payment creates access.
- Paid user can read.
- Unpaid user is blocked.
- Admin can grant access.
- No card data is stored.

## 7. Phase 4 — Notes and Progress

### Goal

Make the platform useful as a learning workspace.

### Deliverables

- Notes panel.
- Section notes.
- Note editing.
- Note deletion.
- Resume reading.
- Basic progress.

### Tasks

- Create notes table.
- Add notes API.
- Add note editor.
- Attach notes to chapter/section.
- Create progress table.
- Store last location.
- Add progress indicator.
- Add bookmark support if time allows.

### Exit Criteria

- Student can take notes.
- Student can edit notes.
- Student can delete notes.
- Notes are private.
- Student can resume reading.
- Progress persists.

## 8. Phase 5 — Media and Accessibility Polish

### Goal

Make the reader professional, accessible, and media-ready.

### Deliverables

- Cloudinary image URLs.
- YouTube video embeds.
- Audio overview embeds.
- Transcript links.
- Accessible forms.
- Keyboard-tested nav.
- Contrast-tested UI.

### Tasks

- Add media registry support.
- Add transcript links.
- Add audio players.
- Add responsive video CSS.
- Review image alt text.
- Test keyboard navigation.
- Test color contrast.
- Test mobile reflow.
- Add accessibility statement.

### Exit Criteria

- Images have alt text.
- Audio has transcripts.
- Videos have captions or summaries.
- Sidebar works with keyboard.
- Notes work with keyboard.
- Forms have labels.
- Contrast passes.

## 9. Phase 6 — Instructor Layer

### Goal

Support course adoption.

### Deliverables

- Instructor role.
- Instructor preview.
- Course sections.
- Manual access grants.
- Optional aggregate progress.

### Tasks

- Add instructor dashboard.
- Add course table.
- Add enrollments.
- Add student access overview.
- Add CSV export later.
- Add comp access workflow.

### Exit Criteria

- Instructor can preview book.
- Instructor can view course setup.
- Admin can grant instructor access.
- Course section can be created.

## 10. Phase 7 — LMS Integration

### Goal

Prepare for institutional use.

### Deliverables

- Stable Brightspace links.
- LTI-ready architecture.
- Deep links later.
- Roster sync later.
- Grade passback later.

### Tasks

- Document LMS link structure.
- Add stable chapter URLs.
- Research LTI 1.3.
- Create LMS integration notes.
- Pilot simple Brightspace linking.
- Defer full LTI until demand exists.

### Exit Criteria

- Brightspace can link to chapters.
- Login/access flow works from LMS.
- LTI decision is documented.
- Full LTI is deferred or scoped.

## 11. Phase 8 — Interactive Learning

### Goal

Add learning features beyond reading.

### Deliverables

- Check questions.
- Reveal answers.
- Copy SQL button.
- Quizzes.
- SQL sandbox later.
- AI hints later.

### Tasks

- Add check blocks.
- Add quiz data model.
- Add attempts table.
- Add immediate feedback.
- Add SQL copy component.
- Research SQL sandbox.
- Design AI hint guardrails.

### Exit Criteria

- Students can practice.
- Feedback is useful.
- Practice is low-stakes.
- No high-stakes automation without review.

## 12. Phase 9 — Productization

### Goal

Prepare for external adoption.

### Deliverables

- Pricing page.
- Terms of use.
- Privacy policy.
- Refund policy.
- Accessibility statement.
- Instructor demo.
- Sample chapter.
- Platform comparison.
- Pilot metrics.

### Tasks

- Write legal pages.
- Create instructor preview.
- Prepare demo login.
- Document support process.
- Test Stripe live mode.
- Run pilot.
- Collect feedback.
- Decide next platform.

### Exit Criteria

- External instructor can preview.
- Student can buy access.
- Support workflow exists.
- Accessibility baseline is met.
- Pilot feedback is collected.

## 13. MVP Build Order

Build in this order:

1. Repo/source structure.
2. Markdown chapter renderer.
3. Sidebar navigation.
4. Bottom navigation.
5. Login.
6. Stripe Checkout.
7. Access grants.
8. Protected routes.
9. Notes.
10. Media embeds.
11. Accessibility pass.
12. Admin tools.

Do not build analytics before the paid reader works.

## 14. Technical Decisions

| Decision | Default |
|---|---|
| Frontend | Next.js |
| Hosting | Vercel |
| Auth | Supabase |
| Database | Supabase/Postgres |
| Payment | Stripe Checkout |
| Images | Cloudinary |
| Audio | Cloudinary |
| Video | YouTube |
| Source | Markdown |
| Styling | Tailwind/CSS |

## 15. Risk Register

| Risk | Mitigation |
|---|---|
| Scope creep | MVP discipline |
| Payment bugs | Stripe test mode |
| Broken access | Server checks |
| Media clutter | Cloudinary registry |
| Accessibility gaps | Checklist |
| Notes privacy | RLS policies |
| Overbuilt analytics | Defer |
| LTI complexity | Later phase |
| Image bloat | Optimize after selection |

## 16. First Sprint

### Goal

Get the book source and platform skeleton ready.

### Tasks

- Create source folder.
- Create chapter folders.
- Add sample chapter.
- Create Next.js platform folder.
- Render one chapter.
- Add sidebar mock.
- Add bottom nav mock.
- Add basic responsive CSS.

### Done When

- One chapter renders.
- Sidebar shows chapters.
- Bottom nav works.
- Folder structure is stable.
- No payment or auth yet.

## 17. Second Sprint

### Goal

Add authentication and protected reading.

### Tasks

- Add Supabase Auth.
- Add signup/login pages.
- Add protected route.
- Add user profile.
- Add preview/full access distinction.
- Add admin test user.

### Done When

- Logged-out user sees preview.
- Logged-in unpaid user sees locked content.
- Admin can view full book.

## 18. Third Sprint

### Goal

Add payment.

### Tasks

- Create Stripe product.
- Create Stripe price.
- Add checkout endpoint.
- Add webhook endpoint.
- Create purchases table.
- Create access grants table.
- Test success/failure.

### Done When

- Test payment activates access.
- Failed payment does not activate access.
- Duplicate webhook does not duplicate access.

## 19. Fourth Sprint

### Goal

Add notes and resume.

### Tasks

- Create notes table.
- Create note editor.
- Save notes by chapter.
- Add resume location.
- Add simple progress status.

### Done When

- Student can take notes.
- Student can return later.
- Notes remain private.

## 20. Launch Criteria

Do not launch until:

- payment works in test mode;
- access control is server-side;
- one sample chapter is public;
- all paid chapters are protected;
- notes are private;
- audio/video/images work;
- keyboard navigation works;
- admin can grant access;
- privacy/refund/accessibility pages exist.

## 21. References

- Stripe Checkout: https://docs.stripe.com/checkout/quickstart
- Stripe Webhooks: https://docs.stripe.com/webhooks
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Supabase Auth: https://supabase.com/docs/guides/auth
- 1EdTech LTI: https://www.1edtech.org/standards/lti
