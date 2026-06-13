# v2A Platform — Setup & Test Checklist

**Date:** 2026-06-12  
**Working dir:** `books/database-book/platform-pilots/claude/`  
**Goal:** ch01 free preview, ch02+ requires payment via Stripe Checkout → webhook → `access_grants`.

---

## Status

| Step | Status | Notes |
|------|--------|-------|
| Migration SQL updated | ✅ Done | Removed `notes`, added `profiles` — 4 tables |
| ch01 preview bypass | ✅ Already correct | `locked = !chapter.preview && !access` — no code change needed |
| `.env` credentials | ✅ Real keys set | `STRIPE_PRICE_ID` still placeholder — needs real `price_XXXX` |
| Supabase migration applied | ⏳ User action | Paste SQL into Supabase SQL editor and run |
| Stripe test product created | ⏳ User action | Create product → price → copy `price_XXXX` into `.env` |
| Local dev test | ⏳ | `npm run dev` in `platform-pilots/claude/` |
| Vercel deploy | ⏳ | `vercel --yes` from `platform-pilots/claude/` |
| Stripe webhook configured | ⏳ | Point at `https://<your-vercel-url>/api/stripe/webhook` |

---

## Step 1 — Apply Migration in Supabase

File: `supabase/migrations/0001_init.sql`

1. Open Supabase dashboard → SQL editor
2. Paste the full contents of `0001_init.sql`
3. Run — creates 4 tables: `access_grants`, `purchases`, `processed_stripe_events`, `profiles`
4. Confirm in Table Editor that all 4 tables exist with RLS enabled

---

## Step 2 — Create Stripe Test Product + Price

1. Go to [dashboard.stripe.com/test/products](https://dashboard.stripe.com/test/products)
2. Create product: "Database Book — Full Access" (one-time payment, e.g. $49.00)
3. Copy the Price ID (`price_XXXX`)
4. Paste into `.env`:
   ```
   STRIPE_PRICE_ID=price_XXXX
   ```

---

## Step 3 — Local Test Sequence

```powershell
cd "C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\platform-pilots\claude"
npm run dev
```

Open `http://localhost:3000` and verify:

| Test | Expected |
|------|----------|
| Visit `/book/ch01-introduction` (not signed in) | Chapter renders freely (no paywall) |
| Visit `/book/ch02-mis-and-bitm` (not signed in) | Redirected to home (access check fails, not logged in — but no crash) |
| Sign up via `/auth/signup` | Account created, magic link sent |
| Visit `/book/ch02-mis-and-bitm` (signed in, no payment) | Locked UI shown — "Get full access" button |
| Click "Get full access" → complete Stripe test checkout (card `4242 4242 4242 4242`) | Redirected to success page |
| Webhook fires → `access_grants` row inserted | Verify in Supabase Table Editor |
| Visit `/book/ch02-mis-and-bitm` again | Chapter renders |

### Stripe test card numbers
- Success: `4242 4242 4242 4242` (any future expiry, any CVC)
- Declined: `4000 0000 0000 0002`

---

## Step 4 — Vercel Deploy

```powershell
cd "C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\platform-pilots\claude"
vercel --yes
```

After deploy, push all 8 env vars to Vercel:

```powershell
# Run once per var, or use Vercel dashboard
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add STRIPE_PRICE_ID production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_BOOK_PRODUCT_ID production
```

Then redeploy to pick up the vars: `vercel --prod --yes`

---

## Step 5 — Configure Stripe Webhook

1. Stripe dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://<your-vercel-url>/api/stripe/webhook`
3. Events: `checkout.session.completed`
4. Copy the webhook signing secret → paste into Vercel env as `STRIPE_WEBHOOK_SECRET`
5. Redeploy: `vercel --prod --yes`

---

## Key Files

| File | Purpose |
|------|---------|
| `supabase/migrations/0001_init.sql` | DB schema — 4 tables, RLS policies |
| `src/lib/access.ts` | `hasBookAccess()` — queries `access_grants` |
| `src/app/book/[chapter]/page.tsx` | Per-chapter reader — `locked = !chapter.preview && !access` |
| `src/app/book/page.tsx` | TOC — shows Preview label for ch01 |
| `src/app/api/stripe/webhook/route.ts` | Webhook → writes `access_grants` + `purchases` |
| `src/app/api/checkout/route.ts` | Creates Stripe Checkout session |
| `content/book.yaml` | Chapter manifest — ch01 has `preview: true` |
| `.env` | All 8 credentials |

---

## Deferred (v2B)

- `course_roster` table (enrollment check)
- Student notes (`notes` table)
- Admin dashboard
