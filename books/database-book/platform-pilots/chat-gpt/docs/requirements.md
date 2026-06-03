# Digital Book Platform Requirements

**Project:** Database Book Platform  
**Book:** *Using Data to Drive Business Performance: Databases and Management Information Systems*  
**Version:** 0.1  
**Date:** 2026-05-29  
**Status:** MVP requirements draft

## 1. Purpose

This document defines the requirements for a paid, interactive digital textbook platform. The platform should support reading, payment, login, note-taking, media, accessibility, and later instructor/course features.

The MVP should prove this core loop:

```text
student signs up → pays → gets access → reads → navigates → takes notes → returns later
```

## 2. Product Scope

### In Scope for MVP

- Web-based book reader.
- Markdown chapter source.
- One folder per chapter.
- Collapsible sidebar navigation.
- Previous/next navigation.
- Login with email/NetID.
- Optional StudentID capture.
- Stripe Checkout payment.
- Paid access control.
- Private student notes.
- Cloudinary images/audio.
- YouTube video embeds.
- Accessibility baseline.
- Admin access management.

### Out of Scope for MVP

- Full LTI integration.
- Gradebook passback.
- Full instructor analytics.
- AI tutoring.
- SQL sandbox.
- Adaptive learning.
- Native mobile app.
- DRM.

## 3. User Roles

| Role | Purpose | MVP |
|---|---|---|
| Visitor | Preview book | Yes |
| Student | Paid reader | Yes |
| Instructor | Preview/adopt | Partial |
| Admin | Manage access | Yes |
| TA | Support course | Later |
| Reviewer | Evaluate book | Later |

## 4. Authentication Requirements

| ID | Requirement | Priority |
|---|---|---|
| AUTH-01 | Student signup | Must |
| AUTH-02 | Student login | Must |
| AUTH-03 | Email/NetID field | Must |
| AUTH-04 | Optional StudentID field | Should |
| AUTH-05 | Password reset | Must |
| AUTH-06 | Protected routes | Must |
| AUTH-07 | Role-based access | Must |
| AUTH-08 | Admin access grants | Must |
| AUTH-09 | Magic link option | Should |
| AUTH-10 | SSO-ready design | Should |

### Authentication Policy

Do not use StudentID as a password. Treat StudentID as sensitive educational data. Store it only if needed for roster matching, access verification, or administrative support.

## 5. Payment and Access Requirements

Stripe Checkout should be used for the MVP. Checkout Sessions must be created server-side. Price IDs should remain server-side. Access should be granted only after confirmed payment success through webhook fulfillment or verified session lookup.

| ID | Requirement | Priority |
|---|---|---|
| PAY-01 | Stripe Checkout | Must |
| PAY-02 | Server-created sessions | Must |
| PAY-03 | Price IDs server-side | Must |
| PAY-04 | Success page | Must |
| PAY-05 | Cancel page | Must |
| PAY-06 | Webhook handling | Must |
| PAY-07 | Access grant after success | Must |
| PAY-08 | Test mode support | Must |
| PAY-09 | One-time purchase | Must |
| PAY-10 | Semester access | Must |
| PAY-11 | Manual comp access | Must |
| PAY-12 | Access codes | Should |
| PAY-13 | Refund status handling | Should |

## 6. Access Model

| Access State | Meaning |
|---|---|
| preview | Public sample |
| pending | Checkout started |
| active | Paid access |
| expired | Access ended |
| refunded | Access removed |
| comped | Manual access |
| instructor | Instructor access |
| admin | Full access |

Access rules:

- Public users can view landing pages and sample chapters.
- Paid users can view the full book.
- Admins can grant and revoke access.
- Payment card data is never stored in the platform.
- The platform stores Stripe IDs and access state only.

## 7. Book Source Requirements

| ID | Requirement | Priority |
|---|---|---|
| SRC-01 | Markdown source | Must |
| SRC-02 | One folder per chapter | Must |
| SRC-03 | `index.md` per chapter | Must |
| SRC-04 | YAML front matter | Must |
| SRC-05 | Chapter metadata | Must |
| SRC-06 | Media metadata | Should |
| SRC-07 | Git versioning | Must |
| SRC-08 | Draft/published status | Should |

Recommended structure:

```text
books/database-book/
  source/
    index.md
    preface.md
    chapters/
      01-introduction/
        index.md
        notes.md
        media.yml
```

## 8. Reader Requirements

| ID | Requirement | Priority |
|---|---|---|
| READ-01 | Markdown rendering | Must |
| READ-02 | Responsive reader | Must |
| READ-03 | Main content column | Must |
| READ-04 | Sticky sidebar | Should |
| READ-05 | Section anchors | Must |
| READ-06 | SQL/code blocks | Must |
| READ-07 | Tables | Must |
| READ-08 | Blockquote callouts | Must |
| READ-09 | Figure captions | Must |
| READ-10 | Audio embeds | Must |
| READ-11 | YouTube embeds | Must |
| READ-12 | Reading position | Should |

## 9. Sidebar Navigation Requirements

The reader must include a left sidebar with collapsible chapters and visible section links.

| ID | Requirement | Priority |
|---|---|---|
| NAV-01 | Left sidebar | Must |
| NAV-02 | Collapsible chapters | Must |
| NAV-03 | Expand active chapter | Must |
| NAV-04 | Show sections | Must |
| NAV-05 | Highlight active section | Must |
| NAV-06 | Show locked chapters | Must |
| NAV-07 | Completion state | Should |
| NAV-08 | Search chapters | Should |
| NAV-09 | Mobile drawer | Must |
| NAV-10 | Keyboard support | Must |

## 10. Bottom Navigation Requirements

| ID | Requirement | Priority |
|---|---|---|
| BNAV-01 | Previous chapter | Must |
| BNAV-02 | Next chapter | Must |
| BNAV-03 | Previous section | Should |
| BNAV-04 | Next section | Should |
| BNAV-05 | Chapter title labels | Must |
| BNAV-06 | Completion prompt | Should |

Example:

```text
← Previous: Chapter 1 — Introduction
Next: Chapter 3 — Data Modeling →
```

## 11. Notes Requirements

| ID | Requirement | Priority |
|---|---|---|
| NOTE-01 | Add note | Must |
| NOTE-02 | Edit note | Must |
| NOTE-03 | Delete note | Must |
| NOTE-04 | Save note to user | Must |
| NOTE-05 | Attach note to chapter | Must |
| NOTE-06 | Attach note to section | Should |
| NOTE-07 | Private by default | Must |
| NOTE-08 | Search notes | Should |
| NOTE-09 | Export notes | Should |
| NOTE-10 | Note sidebar | Should |

Private notes should not be visible to instructors or admins unless a clearly disclosed sharing feature is added later.

## 12. Bookmarks and Progress

| ID | Requirement | Priority |
|---|---|---|
| PROG-01 | Resume last chapter | Must |
| PROG-02 | Resume last section | Should |
| PROG-03 | Mark chapter complete | Must |
| PROG-04 | Bookmark chapter | Should |
| PROG-05 | Bookmark section | Should |
| PROG-06 | Progress indicator | Should |

## 13. Search Requirements

| ID | Requirement | Priority |
|---|---|---|
| SRCH-01 | Search all chapters | Must |
| SRCH-02 | Search current chapter | Should |
| SRCH-03 | Search notes | Should |
| SRCH-04 | Search glossary | Should |
| SRCH-05 | Result snippets | Must |

## 14. Media Requirements

| Media | Host | Notes |
|---|---|---|
| Images | Cloudinary | Optimized URLs |
| GIFs | Cloudinary | Prefer MP4 for demos |
| Audio | Cloudinary | HTML audio |
| Videos | YouTube | Iframe embeds |
| Transcripts | GitHub/app DB | Required |
| Metadata | YAML/DB | Required |

| ID | Requirement | Priority |
|---|---|---|
| MED-01 | Cloudinary image URLs | Must |
| MED-02 | Cloudinary audio URLs | Must |
| MED-03 | YouTube embeds | Must |
| MED-04 | Alt text | Must |
| MED-05 | Figure captions | Must |
| MED-06 | Audio transcripts | Must |
| MED-07 | Video captions/summary | Must |
| MED-08 | Media registry | Should |
| MED-09 | No heavy media in Git | Must |

## 15. Audio Requirements

| ID | Requirement | Priority |
|---|---|---|
| AUD-01 | Chapter audio overview | Must |
| AUD-02 | HTML audio controls | Must |
| AUD-03 | Transcript link | Must |
| AUD-04 | Caption/description | Must |
| AUD-05 | Audio metadata | Should |

## 16. Video Requirements

| ID | Requirement | Priority |
|---|---|---|
| VID-01 | YouTube embed | Must |
| VID-02 | Responsive iframe | Must |
| VID-03 | Meaningful title | Must |
| VID-04 | Caption/summary | Must |
| VID-05 | Transcript link | Should |
| VID-06 | No autoplay | Must |

## 17. Interactive Learning Requirements

| ID | Requirement | Priority |
|---|---|---|
| INT-01 | Check questions | Should |
| INT-02 | Reveal answers | Should |
| INT-03 | SQL examples | Must |
| INT-04 | Copy SQL button | Should |
| INT-05 | Reflection prompts | Should |
| INT-06 | Quizzes | Later |
| INT-07 | SQL sandbox | Later |
| INT-08 | AI hints | Later |

## 18. Instructor Requirements

| ID | Requirement | Priority |
|---|---|---|
| INST-01 | Instructor login | Should |
| INST-02 | Preview student view | Must |
| INST-03 | Comp access | Should |
| INST-04 | Aggregate progress | Later |
| INST-05 | Quiz reports | Later |

## 19. Admin Requirements

| ID | Requirement | Priority |
|---|---|---|
| ADM-01 | View users | Must |
| ADM-02 | Manage roles | Must |
| ADM-03 | Grant access | Must |
| ADM-04 | Revoke access | Must |
| ADM-05 | View purchases | Must |
| ADM-06 | View webhook events | Should |
| ADM-07 | View errors | Should |
| ADM-08 | Manage access codes | Could |

## 20. Accessibility Requirements

The platform should target WCAG 2.2 Level AA where practical.

| ID | Requirement | Priority |
|---|---|---|
| A11Y-01 | Logical headings | Must |
| A11Y-02 | Keyboard navigation | Must |
| A11Y-03 | Visible focus | Must |
| A11Y-04 | Image alt text | Must |
| A11Y-05 | Audio transcripts | Must |
| A11Y-06 | Video captions | Must |
| A11Y-07 | Color contrast | Must |
| A11Y-08 | Responsive reflow | Must |
| A11Y-09 | Accessible forms | Must |
| A11Y-10 | No color-only meaning | Must |
| A11Y-11 | Accessible notes UI | Must |
| A11Y-12 | Accessible payment path | Must |

## 21. Privacy and Security Requirements

| ID | Requirement | Priority |
|---|---|---|
| SEC-01 | HTTPS only | Must |
| SEC-02 | Server-side auth checks | Must |
| SEC-03 | Secure secrets | Must |
| SEC-04 | No card storage | Must |
| SEC-05 | Stripe webhook verification | Must |
| SEC-06 | Minimal data | Must |
| SEC-07 | Role-based access | Must |
| SEC-08 | Private notes | Must |
| SEC-09 | Backups | Must |
| SEC-10 | Error logging | Should |

## 22. Platform Stack

| Layer | Recommendation |
|---|---|
| Frontend | Next.js |
| Hosting | Vercel |
| Database | Supabase/Postgres |
| Auth | Supabase Auth |
| Payment | Stripe Checkout |
| Images | Cloudinary |
| Audio | Cloudinary |
| Video | YouTube |
| Source | Markdown |
| Repo | GitHub |

## 23. MVP Acceptance Criteria

A student can:

- create an account;
- pay for the book;
- receive access;
- open the book;
- use the collapsible sidebar;
- move previous/next;
- take private notes;
- return later;
- play audio;
- watch videos;
- use the platform on mobile.

An admin can:

- see users;
- see purchases;
- grant access;
- revoke access;
- troubleshoot payment/access issues.

The platform must:

- protect paid content;
- avoid storing card data;
- support accessible media;
- support mobile layout;
- use secure sessions.

## 24. References

- Stripe Checkout Quickstart: https://docs.stripe.com/checkout/quickstart
- Stripe Webhooks: https://docs.stripe.com/webhooks
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Supabase Auth: https://supabase.com/docs/guides/auth
- 1EdTech LTI: https://www.1edtech.org/standards/lti
