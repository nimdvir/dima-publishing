# Data Model

**Project:** Database Book Platform  
**Version:** 0.1  
**Date:** 2026-05-29  
**Status:** Draft schema

## 1. Purpose

This document defines the proposed data model for the digital book platform. The model supports user accounts, paid access, Stripe purchases, chapter metadata, notes, bookmarks, progress, media, and admin access management.

## 2. Design Principles

- Use internal UUIDs as primary keys.
- Do not use StudentID as a password.
- Store payment card data only in Stripe.
- Store only Stripe identifiers needed for fulfillment.
- Keep notes private by default.
- Separate book content from user activity.
- Keep content versioning possible.
- Use server-side access checks.

## 3. Entity Overview

| Entity | Purpose |
|---|---|
| users | Account identity |
| user_profiles | NetID/student details |
| products | Sellable items |
| purchases | Stripe records |
| access_grants | Book access |
| books | Book metadata |
| chapters | Chapter metadata |
| sections | Section metadata |
| notes | Private notes |
| bookmarks | Saved locations |
| progress | Reading status |
| media_items | Media registry |
| access_codes | Optional codes |
| courses | Course sections |
| enrollments | Course membership |
| admin_audit_log | Admin actions |
| webhook_events | Stripe events |

## 4. Core Tables

## 4.1 users

If using Supabase Auth, the auth provider may own the base users table. The app can use a profile table for book-specific data.

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| email | text | Unique |
| display_name | text | Optional |
| role | text | Default student |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |
| last_login_at | timestamptz | Optional |

## 4.2 user_profiles

| Field | Type | Notes |
|---|---|---|
| user_id | uuid | FK users |
| netid | text | Optional |
| student_id | text | Optional |
| institution | text | Optional |
| course_section | text | Optional |
| consent_version | text | Optional |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

StudentID should be minimized and protected.

## 4.3 products

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| slug | text | Unique |
| name | text | Product name |
| description | text | Short text |
| stripe_price_id | text | Server-side |
| access_duration_days | integer | Nullable |
| active | boolean | Required |
| created_at | timestamptz | Required |

Example products:

| Product | Access |
|---|---|
| database-book-semester | 180 days |
| database-book-lifetime | Permanent |
| database-book-instructor | Manual |
| database-book-preview | Public |

## 4.4 purchases

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK users |
| product_id | uuid | FK products |
| stripe_customer_id | text | Required |
| stripe_session_id | text | Unique |
| stripe_payment_intent_id | text | Optional |
| amount_total | integer | Cents |
| currency | text | Example usd |
| status | text | Required |
| created_at | timestamptz | Required |
| completed_at | timestamptz | Optional |

Purchase statuses: `pending`, `paid`, `failed`, `refunded`, `canceled`.

## 4.5 access_grants

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK users |
| product_id | uuid | FK products |
| purchase_id | uuid | Nullable |
| access_type | text | paid/comp/code |
| status | text | active/expired |
| starts_at | timestamptz | Required |
| ends_at | timestamptz | Nullable |
| granted_by | uuid | Nullable admin |
| created_at | timestamptz | Required |

## 4.6 books

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| slug | text | Unique |
| title | text | Required |
| subtitle | text | Optional |
| version | text | Required |
| status | text | Draft/live |
| created_at | timestamptz | Required |

## 4.7 chapters

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| book_id | uuid | FK books |
| chapter_number | integer | Required |
| slug | text | Unique |
| title | text | Required |
| source_path | text | Markdown path |
| status | text | Draft/live |
| is_preview | boolean | Public sample |
| sort_order | integer | Required |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

## 4.8 sections

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| chapter_id | uuid | FK chapters |
| heading_level | integer | H2/H3 |
| title | text | Required |
| slug | text | Required |
| anchor_id | text | Required |
| sort_order | integer | Required |

Sections can be generated during the build process.

## 4.9 notes

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK users |
| chapter_id | uuid | FK chapters |
| section_id | uuid | Nullable |
| note_text | text | Required |
| visibility | text | Default private |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |
| deleted_at | timestamptz | Soft delete |

## 4.10 bookmarks

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK users |
| chapter_id | uuid | FK chapters |
| section_id | uuid | Nullable |
| label | text | Optional |
| created_at | timestamptz | Required |

## 4.11 progress

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK users |
| chapter_id | uuid | FK chapters |
| section_id | uuid | Nullable |
| status | text | Required |
| percent | numeric | Optional |
| last_position | text | Anchor |
| updated_at | timestamptz | Required |

Progress statuses: `not_started`, `started`, `in_progress`, `completed`.

## 4.12 media_items

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| book_id | uuid | FK books |
| chapter_id | uuid | Nullable |
| media_type | text | image/audio/video |
| provider | text | Cloudinary/YouTube |
| title | text | Required |
| url | text | Required |
| embed_url | text | Optional |
| transcript_path | text | Optional |
| alt_text | text | Optional |
| caption | text | Optional |
| status | text | Draft/approved |
| created_at | timestamptz | Required |

## 4.13 access_codes

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| code_hash | text | Store hash |
| product_id | uuid | FK products |
| max_uses | integer | Required |
| uses_count | integer | Default 0 |
| starts_at | timestamptz | Optional |
| expires_at | timestamptz | Optional |
| active | boolean | Required |
| created_by | uuid | Admin |
| created_at | timestamptz | Required |

## 4.14 webhook_events

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| provider | text | stripe |
| event_id | text | Unique |
| event_type | text | Required |
| payload | jsonb | Raw event |
| processed | boolean | Required |
| processed_at | timestamptz | Optional |
| created_at | timestamptz | Required |

This table prevents duplicate webhook processing.

## 5. Relationships

```text
users
  ├── user_profiles
  ├── purchases
  ├── access_grants
  ├── notes
  ├── bookmarks
  └── progress

books
  └── chapters
       ├── sections
       ├── media_items
       ├── notes
       ├── bookmarks
       └── progress

products
  ├── purchases
  ├── access_grants
  └── access_codes
```

## 6. MVP SQL Sketch

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    stripe_price_id TEXT,
    access_duration_days INTEGER,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    product_id UUID REFERENCES products(id),
    stripe_customer_id TEXT NOT NULL,
    stripe_session_id TEXT UNIQUE NOT NULL,
    stripe_payment_intent_id TEXT,
    amount_total INTEGER,
    currency TEXT DEFAULT 'usd',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE access_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    product_id UUID REFERENCES products(id),
    purchase_id UUID REFERENCES purchases(id),
    access_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ends_at TIMESTAMPTZ,
    granted_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID,
    chapter_number INTEGER NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    source_path TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    is_preview BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    chapter_id UUID REFERENCES chapters(id),
    section_id UUID,
    note_text TEXT NOT NULL,
    visibility TEXT NOT NULL DEFAULT 'private',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
```

## 7. Row-Level Security Targets

| Table | RLS Target |
|---|---|
| notes | Own notes only |
| bookmarks | Own bookmarks only |
| progress | Own progress only |
| purchases | Own purchases |
| access_grants | Own grants |
| admin_audit_log | Admin only |
| webhook_events | Server only |

## 8. Access Check Logic

A user can read paid content if:

```text
chapter is preview
OR user is admin
OR user is instructor
OR user has active access grant
```

Pseudo-code:

```ts
function canReadChapter(user, chapter, accessGrant) {
  if (chapter.is_preview) return true;
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "instructor") return true;
  return accessGrant?.status === "active";
}
```

## 9. Future Extensions

| Extension | Tables |
|---|---|
| Quizzes | quiz_items, attempts |
| Analytics | events |
| LTI | lti_launches |
| Grade sync | grade_sync |
| AI hints | ai_interactions |
| Teams | groups, memberships |

## 10. References

- Supabase Auth: https://supabase.com/docs/guides/auth
- Stripe Checkout: https://docs.stripe.com/checkout/quickstart
- Stripe Webhooks: https://docs.stripe.com/webhooks
