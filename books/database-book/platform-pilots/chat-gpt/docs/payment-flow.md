# Payment Flow

**Project:** Database Book Platform  
**Version:** 0.1  
**Date:** 2026-05-29  
**Payment Provider:** Stripe Checkout  
**Status:** MVP design

## 1. Purpose

This document defines how students purchase access to the digital book.

The platform should use Stripe Checkout for the first version. The platform should not collect or store card numbers. Stripe should handle the payment page, payment methods, receipts, and secure card processing.

Stripe's hosted Checkout flow redirects users from the site to a payment page hosted by Stripe. The platform creates a Checkout Session server-side and redirects the student to the session URL. Access should be granted only after confirmed payment success.

## 2. Payment Goals

| Goal | MVP |
|---|---|
| One-time purchase | Yes |
| Semester access | Yes |
| Stripe-hosted checkout | Yes |
| Access after success | Yes |
| Webhook fulfillment | Yes |
| Manual comp access | Yes |
| Access codes | Later |
| Subscriptions | Later |
| Stripe Tax | Later |

## 3. Recommended Payment Model

The first version should sell a single student product:

```text
Database Book — Student Access
```

Recommended access options:

| Product | Access |
|---|---|
| Semester access | 180 days |
| Instructor access | Manual |
| Preview access | Public |

## 4. User Flow

```text
Visitor opens landing page
        ↓
Views sample chapter
        ↓
Clicks Buy Access
        ↓
Creates account or logs in
        ↓
Server creates Stripe Checkout Session
        ↓
Student pays on Stripe-hosted page
        ↓
Stripe redirects to success page
        ↓
Webhook confirms payment
        ↓
Platform creates access grant
        ↓
Student opens full book
```

## 5. Route Requirements

| Route | Purpose | Access |
|---|---|---|
| `/pricing` | Product page | Public |
| `/checkout` | Start checkout | Logged-in |
| `/success` | Payment success | Logged-in |
| `/cancel` | Payment canceled | Logged-in |
| `/account` | Access status | User |
| `/api/checkout/session` | Create session | Server |
| `/api/stripe/webhook` | Receive event | Server |
| `/admin/purchases` | View payments | Admin |

## 6. Checkout Session Requirements

Stripe recommends keeping sensitive product details, including price and availability, on the server to prevent client manipulation. Use predefined Stripe Price IDs.

| ID | Requirement | Priority |
|---|---|---|
| PAY-SESSION-01 | Create session server-side | Must |
| PAY-SESSION-02 | Use Stripe Price ID | Must |
| PAY-SESSION-03 | Use payment mode | Must |
| PAY-SESSION-04 | Set success URL | Must |
| PAY-SESSION-05 | Set cancel URL | Must |
| PAY-SESSION-06 | Attach user ID metadata | Must |
| PAY-SESSION-07 | Attach product slug | Must |
| PAY-SESSION-08 | Store pending purchase | Must |
| PAY-SESSION-09 | Redirect to session URL | Must |

## 7. Checkout Session Metadata

Recommended metadata:

```json
{
  "user_id": "internal-user-id",
  "product_slug": "database-book-semester",
  "book_slug": "database-book",
  "access_type": "paid"
}
```

Avoid putting StudentID in Stripe metadata unless there is a clear institutional reason.

## 8. Payment Status Flow

| Status | Trigger |
|---|---|
| pending | Session created |
| paid | Checkout complete |
| active | Access granted |
| failed | Payment failed |
| canceled | User cancels |
| refunded | Refund processed |
| expired | Access ends |

## 9. Webhook Fulfillment

The platform should use a Stripe webhook endpoint to confirm payment success and grant access. Do not rely only on the client redirect.

### Required Webhook Events

| Event | Use |
|---|---|
| `checkout.session.completed` | Grant access |
| `payment_intent.payment_failed` | Mark failed |
| `charge.refunded` | Review access |
| `customer.subscription.deleted` | Later |
| `invoice.paid` | Later |

### Webhook Requirements

| ID | Requirement | Priority |
|---|---|---|
| WH-01 | Verify signature | Must |
| WH-02 | Store event ID | Must |
| WH-03 | Prevent duplicates | Must |
| WH-04 | Create access grant | Must |
| WH-05 | Update purchase status | Must |
| WH-06 | Log failures | Must |
| WH-07 | Retry-safe logic | Must |
| WH-08 | No client-only fulfillment | Must |

## 10. Access Grant Logic

When Stripe confirms successful payment:

1. Find the user from metadata.
2. Find the product from metadata.
3. Mark purchase as `paid`.
4. Create or update `access_grants`.
5. Set `starts_at = now()`.
6. Set `ends_at` from product duration.
7. Let the student open `/book`.

Pseudo-code:

```ts
async function fulfillCheckoutSession(session) {
  const userId = session.metadata.user_id;
  const productSlug = session.metadata.product_slug;

  const product = await getProduct(productSlug);

  await markPurchasePaid(session.id);

  await createAccessGrant({
    user_id: userId,
    product_id: product.id,
    access_type: "paid",
    status: "active",
    starts_at: new Date(),
    ends_at: calculateEndDate(product.access_duration_days)
  });
}
```

## 11. Success Page Behavior

The success page should not independently grant access. It should verify the user's access from the server.

Recommended behavior:

- show payment received message;
- poll/check access state;
- show a “Go to book” button;
- show support text if delayed.

## 12. Cancel Page Behavior

The cancel page should let the student return to checkout.

Recommended text:

```text
Your payment was not completed. You can return to checkout when ready.
```

## 13. Admin Payment Tools

| Tool | MVP |
|---|---|
| View purchases | Yes |
| View access grants | Yes |
| Grant comp access | Yes |
| Revoke access | Yes |
| Refund in Stripe dashboard | Manual |
| Sync refund status | Later |

## 14. Test Mode Requirements

| Case | Expected Result |
|---|---|
| Successful payment | Access active |
| Declined card | No access |
| Canceled checkout | No access |
| Duplicate webhook | No duplicate grant |
| Refund | Access reviewed |
| Missing metadata | Webhook logged |
| Expired access | Locked book |

## 15. Security Requirements

| ID | Requirement | Priority |
|---|---|---|
| SEC-PAY-01 | No card storage | Must |
| SEC-PAY-02 | Secret keys in env | Must |
| SEC-PAY-03 | Server-only session | Must |
| SEC-PAY-04 | Webhook signature | Must |
| SEC-PAY-05 | HTTPS only | Must |
| SEC-PAY-06 | Idempotent logic | Must |
| SEC-PAY-07 | Admin-only views | Must |
| SEC-PAY-08 | Avoid StudentID in Stripe | Should |

## 16. Environment Variables

```text
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_DATABASE_BOOK_PRICE_ID=
NEXT_PUBLIC_SITE_URL=
```

Only `NEXT_PUBLIC_` values may be exposed to the browser.

## 17. Data Stored Locally

| Data | Store? |
|---|---|
| Stripe customer ID | Yes |
| Checkout session ID | Yes |
| Payment intent ID | Yes |
| Amount/currency | Yes |
| Card number | No |
| CVC | No |
| Billing address | Usually no |
| Receipt URL | Optional |

## 18. Access Code Extension

Later, support access codes for bookstore or instructor use.

```text
Student creates account
        ↓
Enters access code
        ↓
Server validates code
        ↓
Access grant created
```

Store only hashed access codes.

## 19. Refund Handling

MVP can handle refunds manually in Stripe. Later, listen for refund events and mark access for review.

| Option | Use |
|---|---|
| Immediate revoke | Strict |
| Manual review | Safer |
| Keep access | Goodwill |

Recommended MVP: manual review.

## 20. Acceptance Criteria

Payment is ready when:

- checkout session is created server-side;
- Stripe redirects correctly;
- webhook verifies signatures;
- successful payment creates access grant;
- failed/canceled payment grants no access;
- duplicate webhook creates no duplicate access;
- paid user can open the book;
- unpaid user sees locked content;
- admin can grant manual access;
- card data is never stored.

## 21. References

- Stripe Checkout Quickstart: https://docs.stripe.com/checkout/quickstart
- Stripe Webhooks: https://docs.stripe.com/webhooks
