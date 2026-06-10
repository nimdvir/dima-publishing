# Phase 3: v2A — Paid-Access Platform Proof

**Objective:** Prove the complete student transaction: account → profile → payment → access → protected reader.

---

## Gate: Do Not Start Until

- v1.1 design/motion pass complete
- `npm run generate`, `npm run lint`, `npm run build` pass
- Home page, reader, OTP, mobile, icons, favicon verified
- Ch01–04 render correctly
- v1.1 tagged as stable reference
- No unresolved visual redesign work remains

Four representative chapters are enough. Do not wait for all 17.

---

## Create

```
books/database-book/platform-pilots/reader-hybrid-v2/
```

Keep all current pilots untouched.

## Stack

| Technology | Role |
|---|---|
| Next.js (App Router) | Framework |
| TypeScript | Language |
| Supabase Auth | Authentication |
| Supabase Postgres | Database |
| Supabase RLS | Row-level security |
| Stripe Checkout | Payment |
| Stripe Webhooks | Access provisioning |
| Vercel | Deployment |

Use v1.1 design and reader behavior as the visual reference. Do not copy the Vite routing architecture wholesale.

---

## Phase 3.1 — Foundation

- App Router, TypeScript, env validation
- Supabase browser + server clients
- Stripe server client
- Middleware or server-side access helper
- Shared design tokens from v1.1

Do not begin payment until authentication and environment configuration work locally.

## Phase 3.2 — Content Migration

Port the reader experience from v1.1:
- Chapter sidebar, reader areas, page segments
- Internal H2/H3 navigation, "On this page" rail
- Bottom previous/next navigation
- Section icons, Markdown sanitization, mobile navigation

Per-chapter JSON loading (not monolithic bundle):

```
generated/
├── book-index.json
└── chapters/
    ├── ch01.json
    ├── ch02.json
    ├── ch03.json
    └── ch04.json
```

Load protected chapter content on the server.

## Phase 3.3 — Public Preview

**Routes:** `/`, `/preview`, `/preview/ch01`

The preview should expose a deliberately limited sample — not the entire protected chapter hidden with CSS.

Suggested preview content:
- Home page and table of contents
- Selected Chapter 1 pages
- Sample lab description
- Purchase CTA

## Phase 3.4 — Authentication and Profiles

**Routes:** `/login`, `/register`, `/account`

### Profile fields

| Field | Type | Notes |
|---|---|---|
| `user_id` | uuid | References `auth.users(id)` |
| `email` | text | |
| `full_name` | text | |
| `net_id` | text | Profile field, not SSO |
| `student_id` | text | Profile field, not SSO |
| `role` | text | Default: `student` |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

**Roles:** `student`, `instructor`, `admin`

### Critical clarification about NetID

A NetID text field is **not** institutional authentication. For MVP, use Supabase Auth (email magic link or email/password) with NetID and Student ID as profile fields. Label it:

> Account login + NetID/Student ID profile verification

until real institutional SSO (SAML/OIDC) is available.

## Phase 3.5 — Stripe Checkout

**Routes:** `/access`, `/api/stripe/create-checkout-session`, `/api/stripe/webhook`, `/success`, `/cancel`

The browser must **never** grant access directly. Access is granted only by:

```
Stripe Checkout completes
→ Stripe sends signed webhook
→ server verifies signature
→ purchase is recorded
→ access grant is created
→ protected route recognizes access
```

## Phase 3.6 — Access Grants

### Tables

**`purchases`**

| Column | Type |
|---|---|
| `id` | uuid PK |
| `user_id` | uuid FK → auth.users |
| `stripe_customer_id` | text |
| `stripe_checkout_session_id` | text |
| `stripe_payment_intent_id` | text |
| `amount_cents` | integer |
| `currency` | text |
| `status` | text |
| `created_at` | timestamptz |

**`access_grants`**

| Column | Type |
|---|---|
| `id` | uuid PK |
| `user_id` | uuid FK → auth.users |
| `product_key` | text |
| `status` | text |
| `source` | text |
| `starts_at` | timestamptz |
| `expires_at` | timestamptz (nullable) |
| `created_at` | timestamptz |

**`processed_stripe_events`** (idempotency)

| Column | Type |
|---|---|
| `id` | text PK (Stripe event ID) |
| `event_type` | text |
| `processed_at` | timestamptz |

**Product key:** `database-book-2026`

This model supports: Stripe purchases, instructor access, complimentary access, admin grants, course-specific access, refunds, and revocation.

## Phase 3.7 — Protected Reader

**Routes:** `/book`, `/book/ch01`, `/book/ch01/core-concepts`

Authorization must happen server-side before protected content is returned.

**Do NOT:**
- Download the full book to unauthorized browsers
- Render protected content and hide it with a modal
- Trust a `localStorage` paid flag
- Grant access from the Stripe success URL alone

## Phase 3.8 — Validation

| # | Test case |
|---|---|
| 1 | Logged-out visitor can access public preview |
| 2 | Logged-out visitor cannot access `/book` |
| 3 | Logged-in unpaid student cannot access `/book` |
| 4 | Stripe test purchase completes |
| 5 | Verified webhook records purchase |
| 6 | Webhook creates active `access_grant` |
| 7 | Paid student can open `/book` |
| 8 | Refresh preserves access |
| 9 | Duplicate webhook does not duplicate the grant |
| 10 | Refund/revocation path can disable access |
| 11 | One student cannot read another's profile or purchase data |
| 12 | No service-role key reaches the browser |

---

## v2A Exit Criteria

Do not start v2B until:

- Authentication works reliably
- Profile creation works
- Stripe test mode works end to end
- Webhook processing is idempotent
- Access control is server-side
- RLS policies are tested
- Public preview cannot leak protected content
- Protected Chapters 1–4 render correctly
- Mobile reader works
- Vercel preview deployment passes
- Environment variables and secrets are documented safely
