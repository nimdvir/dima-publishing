# Digital Book Platform Requirements

I will use agents to build it, so I don't need python programs. Instead, I need a detailed requirements document that I can feed into agents to build the platform iteratively.

## Working Assumption

You are building a **paid, interactive digital textbook platform** for the database/MIS book, not just a static Quarto or Markdown website. The platform should support:

* chapter reading;
* collapsible chapter navigation;
* student login;
* payment through Stripe;
* note-taking;
* audio/video/media;
* accessibility;
* instructor/course use;
* future analytics and LMS integration.

The safest architecture is:

```text
GitHub / Markdown source
        ↓
Book platform web app
        ↓
Student login + payment
        ↓
Interactive reading, notes, media, analytics
```

For payment, Stripe Checkout is appropriate because it supports a hosted checkout page where the user clicks a button on your site and is redirected to a Stripe-hosted payment page; Stripe’s docs also emphasize creating Checkout Sessions on the server, keeping prices server-side, defining success URLs, and waiting for payment success before fulfilling access. ([Stripe Docs][1])

For accessibility, use **WCAG 2.2 Level AA** as the internal target. W3C describes WCAG 2.2 as a W3C Recommendation covering accessibility for web content across devices and recommends using the most current WCAG version when developing accessibility policies. ([W3C][2])

---

# 1. Platform Vision Requirements

| ID    | Requirement                  | Priority |
| ----- | ---------------------------- | -------- |
| PV-01 | Web-first digital book       | Must     |
| PV-02 | Paid student access          | Must     |
| PV-03 | Chapter-based reading        | Must     |
| PV-04 | Interactive learning layer   | Should   |
| PV-05 | Instructor-ready courseware  | Should   |
| PV-06 | Future LMS integration       | Should   |
| PV-07 | Mobile-friendly design       | Must     |
| PV-08 | Accessibility-first design   | Must     |
| PV-09 | Media-rich chapters          | Must     |
| PV-10 | Analytics-ready architecture | Should   |

The platform should feel like a **learning environment**, not a PDF behind a paywall. Students should be able to read, navigate, listen, watch, take notes, track progress, and return to where they left off.

---

# 2. User Roles

| Role       | Description          | Access                   |
| ---------- | -------------------- | ------------------------ |
| Visitor    | Unauthenticated user | Public preview           |
| Student    | Paid learner         | Full book                |
| Instructor | Course manager       | Teaching view            |
| Admin      | Platform owner       | Full control             |
| TA         | Course helper        | Limited instructor tools |
| Reviewer   | Publisher/adopter    | Preview access           |

## Role Requirements

| ID      | Requirement                      | Priority |
| ------- | -------------------------------- | -------- |
| ROLE-01 | Support unauthenticated previews | Must     |
| ROLE-02 | Support student accounts         | Must     |
| ROLE-03 | Support instructor accounts      | Should   |
| ROLE-04 | Support admin account            | Must     |
| ROLE-05 | Support reviewer/demo accounts   | Should   |
| ROLE-06 | Support role-based permissions   | Must     |

---

# 3. Authentication and Login Requirements

You mentioned login with **NetID** and **StudentID**. I would treat these differently.

## Recommended Login Model

| Field              | Use                |
| ------------------ | ------------------ |
| Email / NetID      | Login identity     |
| StudentID          | Verification field |
| Stripe customer ID | Payment identity   |
| Internal user ID   | Platform identity  |

## Authentication Requirements

| ID      | Requirement                          | Priority |
| ------- | ------------------------------------ | -------- |
| AUTH-01 | Allow student account creation       | Must     |
| AUTH-02 | Allow login with institutional email | Must     |
| AUTH-03 | Store NetID or email safely          | Must     |
| AUTH-04 | Collect StudentID only if needed     | Should   |
| AUTH-05 | Avoid using StudentID as password    | Must     |
| AUTH-06 | Support password reset               | Must     |
| AUTH-07 | Support magic link or SSO later      | Should   |
| AUTH-08 | Support institutional SSO later      | Should   |
| AUTH-09 | Support admin role assignment        | Must     |
| AUTH-10 | Support session expiration           | Must     |
| AUTH-11 | Protect paid content routes          | Must     |
| AUTH-12 | Support demo accounts                | Should   |

## Important StudentID Rule

Do **not** use StudentID as a password. StudentID should be treated as sensitive educational data. If you need it, use it only for:

* enrollment verification;
* matching a class roster;
* instructor reporting;
* access-code validation.

A safer pattern:

```text
Login: email / NetID
Verification: StudentID
Payment: Stripe
Access: internal entitlement
```

---

# 4. Payment and Access Requirements

## Stripe Requirements

| ID     | Requirement                             | Priority |
| ------ | --------------------------------------- | -------- |
| PAY-01 | Use Stripe Checkout                     | Must     |
| PAY-02 | Create Checkout Sessions server-side    | Must     |
| PAY-03 | Store Stripe customer ID                | Must     |
| PAY-04 | Store payment status                    | Must     |
| PAY-05 | Grant access only after payment success | Must     |
| PAY-06 | Use Stripe webhooks                     | Must     |
| PAY-07 | Support one-time purchase               | Must     |
| PAY-08 | Support semester access                 | Must     |
| PAY-09 | Support free instructor access          | Should   |
| PAY-10 | Support access codes                    | Should   |
| PAY-11 | Support refunds manually                | Should   |
| PAY-12 | Support Stripe test mode                | Must     |
| PAY-13 | Never expose secret keys                | Must     |
| PAY-14 | Store product and price IDs server-side | Must     |
| PAY-15 | Support success and cancel pages        | Must     |
| PAY-16 | Support Stripe Tax later                | Could    |

Stripe’s quickstart specifically describes a hosted checkout flow, a server-created Checkout Session, line items, modes such as `payment` or `subscription`, success URLs, and waiting for payment success before fulfilling the order. ([Stripe Docs][1])

## Access Models

| Model               | Use Case               | Priority |
| ------------------- | ---------------------- | -------- |
| One-time purchase   | Individual student     | Must     |
| Semester license    | Course section         | Must     |
| Access code         | Bookstore / instructor | Should   |
| Free preview        | Marketing              | Must     |
| Instructor comp     | Adoption               | Should   |
| Institution license | Future                 | Should   |
| Subscription        | Later                  | Could    |

## Access States

| State      | Meaning               |
| ---------- | --------------------- |
| Preview    | Public pages only     |
| Pending    | Checkout started      |
| Paid       | Full access           |
| Expired    | Access ended          |
| Refunded   | Access removed        |
| Comped     | Manual access         |
| Instructor | Full teaching access  |
| Admin      | Full platform control |

---

# 5. Book Source Requirements

Your canonical source should remain Markdown.

| ID     | Requirement                       | Priority |
| ------ | --------------------------------- | -------- |
| SRC-01 | Store chapters as Markdown        | Must     |
| SRC-02 | One folder per chapter            | Must     |
| SRC-03 | One `index.md` per chapter        | Must     |
| SRC-04 | Store notes separately            | Should   |
| SRC-05 | Store media metadata separately   | Should   |
| SRC-06 | Support YAML front matter         | Must     |
| SRC-07 | Support build/export pipeline     | Must     |
| SRC-08 | Preserve Git history              | Must     |
| SRC-09 | Support draft vs published states | Should   |
| SRC-10 | Support chapter versioning        | Should   |

Recommended source structure:

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
      02-information-systems-and-business-performance/
        index.md
        notes.md
        media.yml
```

---

# 6. Chapter Reader Requirements

## Reader Layout

| ID      | Requirement            | Priority |
| ------- | ---------------------- | -------- |
| READ-01 | Main reading column    | Must     |
| READ-02 | Responsive layout      | Must     |
| READ-03 | Desktop sidebar        | Must     |
| READ-04 | Mobile drawer nav      | Must     |
| READ-05 | Sticky chapter title   | Should   |
| READ-06 | Reading progress bar   | Should   |
| READ-07 | Estimated reading time | Could    |
| READ-08 | Section anchors        | Must     |
| READ-09 | Copy link to section   | Should   |
| READ-10 | Print-friendly mode    | Should   |

## Reader Features

| Feature               | Priority |
| --------------------- | -------- |
| Markdown rendering    | Must     |
| Tables                | Must     |
| Code blocks           | Must     |
| SQL formatting        | Must     |
| Images                | Must     |
| Audio embeds          | Must     |
| YouTube embeds        | Must     |
| Callout blockquotes   | Must     |
| Glossary links        | Should   |
| Search within chapter | Should   |
| Dark mode             | Could    |
| Font size control     | Could    |

---

# 7. Sidebar Navigation Requirements

You explicitly asked for a side navigation with chapters that fold open.

## Sidebar Navigation

| ID     | Requirement               | Priority |
| ------ | ------------------------- | -------- |
| NAV-01 | Left-side chapter nav     | Must     |
| NAV-02 | Collapsible chapters      | Must     |
| NAV-03 | Expand current chapter    | Must     |
| NAV-04 | Show chapter sections     | Must     |
| NAV-05 | Highlight current section | Must     |
| NAV-06 | Show completion status    | Should   |
| NAV-07 | Show locked content       | Must     |
| NAV-08 | Search chapters           | Should   |
| NAV-09 | Mobile drawer version     | Must     |
| NAV-10 | Keyboard accessible nav   | Must     |
| NAV-11 | Preserve expanded state   | Should   |
| NAV-12 | Support chapter icons     | Could    |

## Example Sidebar Logic

```text
Chapter 1: Introduction
  - Chapter Overview
  - Why Databases Matter
  - Key Concepts

Chapter 2: MIS and Business Performance
  - What Is an Information System?
  - Data to Decisions
  - Business Value

Chapter 3: Data Modeling
  - Entities
  - Attributes
  - Relationships
```

## Sidebar Behavior

| Behavior          | Requirement        |
| ----------------- | ------------------ |
| Click chapter     | Expand/collapse    |
| Click section     | Scroll or navigate |
| Current section   | Highlight          |
| Locked chapter    | Show lock icon     |
| Completed chapter | Show checkmark     |
| Mobile            | Drawer menu        |

---

# 8. Bottom Navigation Requirements

You also asked for bottom navigation: “what’s next / what was before.”

| ID      | Requirement             | Priority |
| ------- | ----------------------- | -------- |
| BNAV-01 | Previous chapter link   | Must     |
| BNAV-02 | Next chapter link       | Must     |
| BNAV-03 | Previous section link   | Should   |
| BNAV-04 | Next section link       | Should   |
| BNAV-05 | Show chapter titles     | Must     |
| BNAV-06 | Show completion prompt  | Should   |
| BNAV-07 | Link to quiz/checkpoint | Should   |
| BNAV-08 | Link to notes review    | Could    |

Example:

```text
← Previous: Chapter 1 — Introduction
Next: Chapter 3 — Data Modeling →
```

At section level:

```text
← Previous section: Data vs. Information
Next section: Information Systems in Business →
```

---

# 9. Notes Requirements

Students should be able to take notes inside the book.

## Note-Taking Features

| ID      | Requirement                          | Priority |
| ------- | ------------------------------------ | -------- |
| NOTE-01 | Add note to chapter                  | Must     |
| NOTE-02 | Add note to section                  | Must     |
| NOTE-03 | Edit note                            | Must     |
| NOTE-04 | Delete note                          | Must     |
| NOTE-05 | Timestamp notes                      | Must     |
| NOTE-06 | Save notes per user                  | Must     |
| NOTE-07 | Search notes                         | Should   |
| NOTE-08 | Export notes                         | Should   |
| NOTE-09 | Private by default                   | Must     |
| NOTE-10 | Instructor cannot read private notes | Must     |
| NOTE-11 | Optional shared note                 | Could    |
| NOTE-12 | Note sidebar panel                   | Should   |

## Notes Data

| Field      | Purpose        |
| ---------- | -------------- |
| note_id    | Unique note    |
| user_id    | Owner          |
| chapter_id | Chapter        |
| section_id | Section        |
| note_text  | Content        |
| visibility | Private/shared |
| created_at | Created time   |
| updated_at | Modified time  |

---

# 10. Highlighting and Bookmarking Requirements

| ID      | Requirement          | Priority |
| ------- | -------------------- | -------- |
| MARK-01 | Bookmark chapter     | Should   |
| MARK-02 | Bookmark section     | Should   |
| MARK-03 | Highlight text       | Could    |
| MARK-04 | Save highlights      | Could    |
| MARK-05 | Export highlights    | Could    |
| MARK-06 | Resume last location | Must     |

For MVP, prioritize **resume location** and **bookmarks** before text highlighting.

---

# 11. Progress Tracking Requirements

| ID      | Requirement                        | Priority |
| ------- | ---------------------------------- | -------- |
| PROG-01 | Track chapter opened               | Must     |
| PROG-02 | Track section viewed               | Should   |
| PROG-03 | Track chapter completion           | Must     |
| PROG-04 | Track quiz completion              | Should   |
| PROG-05 | Track audio playback               | Could    |
| PROG-06 | Track video start                  | Could    |
| PROG-07 | Track notes created                | Could    |
| PROG-08 | Show student progress              | Must     |
| PROG-09 | Show instructor aggregate progress | Should   |
| PROG-10 | Allow reset progress               | Could    |

Progress should not be creepy. Use it to help learning, not to surveil every scroll.

---

# 12. Search Requirements

| ID      | Requirement            | Priority |
| ------- | ---------------------- | -------- |
| SRCH-01 | Search all chapters    | Must     |
| SRCH-02 | Search current chapter | Should   |
| SRCH-03 | Search glossary        | Should   |
| SRCH-04 | Search notes           | Should   |
| SRCH-05 | Search code examples   | Should   |
| SRCH-06 | Filter by chapter      | Could    |
| SRCH-07 | Search result snippets | Must     |

---

# 13. Media Requirements

Your platform will include Cloudinary images, YouTube videos, and audio overviews.

## Media Hosting

| Media    | Host        |
| -------- | ----------- |
| Images   | Cloudinary  |
| GIFs     | Cloudinary  |
| Audio    | Cloudinary  |
| Videos   | YouTube     |
| Markdown | GitHub      |
| Metadata | GitHub / DB |

## Media Requirements

| ID     | Requirement             | Priority |
| ------ | ----------------------- | -------- |
| MED-01 | Cloudinary image embeds | Must     |
| MED-02 | Optimized image URLs    | Must     |
| MED-03 | YouTube video embeds    | Must     |
| MED-04 | Audio overview embeds   | Must     |
| MED-05 | Captions for videos     | Must     |
| MED-06 | Transcripts for audio   | Must     |
| MED-07 | Alt text for images     | Must     |
| MED-08 | Figure captions         | Must     |
| MED-09 | Media metadata registry | Should   |
| MED-10 | Avoid local heavy media | Must     |

The uploaded visual workflow file also emphasizes media-production safeguards such as not overwriting source images, preserving originals, using collision-safe names, verifying outputs, and producing reports for processed or skipped files. Those should remain part of your image/media pipeline, even if the web platform itself consumes only final Cloudinary or YouTube URLs. 

---

# 14. Audio Overview Requirements

| ID     | Requirement                | Priority |
| ------ | -------------------------- | -------- |
| AUD-01 | Per-chapter audio overview | Must     |
| AUD-02 | HTML audio player          | Must     |
| AUD-03 | Transcript link            | Must     |
| AUD-04 | Playback controls          | Must     |
| AUD-05 | Audio metadata             | Should   |
| AUD-06 | Download option            | Could    |
| AUD-07 | Playback progress          | Could    |

Example embed:

```html
<figure>
  <audio controls preload="metadata">
    <source src="AUDIO_URL_HERE" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <figcaption>
    Audio overview for this chapter.
  </figcaption>
</figure>
```

---

# 15. YouTube Video Requirements

| ID     | Requirement            | Priority |
| ------ | ---------------------- | -------- |
| VID-01 | Embed YouTube videos   | Must     |
| VID-02 | Responsive video frame | Must     |
| VID-03 | Video title attribute  | Must     |
| VID-04 | Video caption          | Must     |
| VID-05 | Transcript or summary  | Must     |
| VID-06 | Open on YouTube link   | Should   |
| VID-07 | No autoplay            | Must     |

Example:

```html
<figure class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Chapter video walkthrough"
    allowfullscreen>
  </iframe>
  <figcaption>
    This video explains the chapter concept.
  </figcaption>
</figure>
```

---

# 16. Image Requirements

| ID     | Requirement                           | Priority |
| ------ | ------------------------------------- | -------- |
| IMG-01 | Store production images in Cloudinary | Must     |
| IMG-02 | Use optimized delivery URLs           | Must     |
| IMG-03 | Store image metadata                  | Should   |
| IMG-04 | Add meaningful alt text               | Must     |
| IMG-05 | Add figure captions                   | Must     |
| IMG-06 | Track figure number                   | Should   |
| IMG-07 | Support placement reports             | Should   |
| IMG-08 | Do not commit large images            | Must     |
| IMG-09 | Preserve source images                | Must     |
| IMG-10 | Support image decision workflow       | Should   |

Cloudinary pattern:

```text
f_auto,q_auto,w_1200
```

For large diagrams:

```text
f_auto,q_auto,w_1600
```

---

# 17. Interactive Features Requirements

## MVP Interactions

| ID     | Requirement                        | Priority |
| ------ | ---------------------------------- | -------- |
| INT-01 | Check your understanding questions | Should   |
| INT-02 | Reveal answer blocks               | Should   |
| INT-03 | Practice prompts                   | Should   |
| INT-04 | SQL examples                       | Must     |
| INT-05 | Copy SQL button                    | Should   |
| INT-06 | Reflection prompts                 | Should   |
| INT-07 | Bookmarks                          | Should   |

## Later Interactions

| ID     | Requirement              | Priority |
| ------ | ------------------------ | -------- |
| INT-08 | Embedded quizzes         | Could    |
| INT-09 | SQL sandbox              | Could    |
| INT-10 | AI hint button           | Could    |
| INT-11 | Instructor analytics     | Could    |
| INT-12 | Adaptive recommendations | Later    |

---

# 18. Quiz and Assessment Requirements

| ID    | Requirement               | Priority |
| ----- | ------------------------- | -------- |
| QZ-01 | Chapter checkpoints       | Should   |
| QZ-02 | Multiple choice questions | Should   |
| QZ-03 | Immediate feedback        | Should   |
| QZ-04 | Store attempts            | Could    |
| QZ-05 | Explain correct answer    | Should   |
| QZ-06 | Low-stakes mode           | Must     |
| QZ-07 | Instructor item bank      | Could    |
| QZ-08 | LMS grade passback later  | Could    |

For the first version, keep quizzes **low-stakes** and separate from official grading.

---

# 19. Instructor Dashboard Requirements

| ID      | Requirement             | Priority |
| ------- | ----------------------- | -------- |
| INST-01 | Instructor login        | Should   |
| INST-02 | View class roster       | Could    |
| INST-03 | View aggregate progress | Should   |
| INST-04 | View chapter completion | Should   |
| INST-05 | View quiz summary       | Could    |
| INST-06 | Export CSV report       | Could    |
| INST-07 | Preview student view    | Must     |
| INST-08 | Grant comp access       | Should   |
| INST-09 | Create access codes     | Could    |

Start simple. Instructor analytics can come after student access and notes are stable.

---

# 20. Admin Requirements

| ID     | Requirement            | Priority |
| ------ | ---------------------- | -------- |
| ADM-01 | Manage users           | Must     |
| ADM-02 | Manage roles           | Must     |
| ADM-03 | Manage access          | Must     |
| ADM-04 | View payments          | Must     |
| ADM-05 | Grant manual access    | Must     |
| ADM-06 | Revoke access          | Must     |
| ADM-07 | View error logs        | Should   |
| ADM-08 | Manage content release | Should   |
| ADM-09 | Manage discount codes  | Could    |
| ADM-10 | View platform metrics  | Could    |

---

# 21. LMS and Institutional Integration Requirements

For later institutional use, design toward **LTI 1.3 / LTI Advantage**, but do not make it the MVP. 1EdTech describes LTI as a standard for connecting learning tools with an institution’s learning environment without separate tool login, and notes that LTI supports secure passing of users, enrollment, and roles. It also describes LTI 1.3 as using an improved authentication security model, with LTI Advantage services for grade services, roles, and deep linking. ([1EdTech][3])

| ID     | Requirement                | Priority |
| ------ | -------------------------- | -------- |
| LMS-01 | Stable chapter URLs        | Must     |
| LMS-02 | Brightspace links          | Must     |
| LMS-03 | LTI 1.3-ready architecture | Should   |
| LMS-04 | Deep links later           | Could    |
| LMS-05 | Roster sync later          | Could    |
| LMS-06 | Grade passback later       | Could    |
| LMS-07 | LMS launch roles later     | Could    |

For MVP, link from Brightspace. Do not build full LTI until the platform is proven.

---

# 22. Accessibility Requirements

## Accessibility Standard

| ID      | Requirement               | Priority |
| ------- | ------------------------- | -------- |
| A11Y-01 | Target WCAG 2.2 AA        | Must     |
| A11Y-02 | Logical headings          | Must     |
| A11Y-03 | Keyboard navigation       | Must     |
| A11Y-04 | Visible focus states      | Must     |
| A11Y-05 | Alt text                  | Must     |
| A11Y-06 | Video captions            | Must     |
| A11Y-07 | Audio transcripts         | Must     |
| A11Y-08 | Good color contrast       | Must     |
| A11Y-09 | No color-only meaning     | Must     |
| A11Y-10 | Responsive reflow         | Must     |
| A11Y-11 | Accessible forms          | Must     |
| A11Y-12 | Accessible authentication | Must     |
| A11Y-13 | Accessible notes UI       | Must     |
| A11Y-14 | Accessible payment flow   | Must     |

WCAG 2.2 is organized around testable success criteria under principles such as perceivable, operable, understandable, and robust; W3C also notes that following WCAG often improves usability for users in general, not only users with disabilities. ([W3C][2])

---

# 23. Privacy and Security Requirements

## Data Privacy

| ID      | Requirement                    | Priority |
| ------- | ------------------------------ | -------- |
| PRIV-01 | Collect minimal data           | Must     |
| PRIV-02 | Explain data use               | Must     |
| PRIV-03 | Private notes by default       | Must     |
| PRIV-04 | StudentID protected            | Must     |
| PRIV-05 | Payment data handled by Stripe | Must     |
| PRIV-06 | No card data stored locally    | Must     |
| PRIV-07 | Secure sessions                | Must     |
| PRIV-08 | Role-based access              | Must     |
| PRIV-09 | Data export option             | Should   |
| PRIV-10 | Data deletion process          | Should   |

## Security

| ID     | Requirement                 | Priority |
| ------ | --------------------------- | -------- |
| SEC-01 | HTTPS only                  | Must     |
| SEC-02 | Server-side access checks   | Must     |
| SEC-03 | Secure password handling    | Must     |
| SEC-04 | Environment secrets         | Must     |
| SEC-05 | Stripe webhook verification | Must     |
| SEC-06 | Audit admin changes         | Should   |
| SEC-07 | Rate limit auth routes      | Should   |
| SEC-08 | Protect API endpoints       | Must     |
| SEC-09 | Backups                     | Must     |
| SEC-10 | Error logging               | Should   |

---

# 24. Data Model Requirements

## Core Tables

| Table         | Purpose            |
| ------------- | ------------------ |
| users         | Accounts           |
| user_profiles | NetID / role       |
| access_grants | Book access        |
| purchases     | Stripe payments    |
| chapters      | Chapter metadata   |
| sections      | Section metadata   |
| notes         | Student notes      |
| bookmarks     | Saved locations    |
| progress      | Reading status     |
| quiz_attempts | Checkpoints        |
| media_items   | Images/audio/video |
| access_codes  | Optional codes     |
| courses       | Course sections    |
| enrollments   | Class mapping      |

## Minimum Data Fields

### users

| Field      | Purpose       |
| ---------- | ------------- |
| id         | Internal user |
| email      | Login         |
| role       | Permission    |
| created_at | Audit         |

### access_grants

| Field              | Purpose  |
| ------------------ | -------- |
| user_id            | Student  |
| product_id         | Book     |
| status             | Access   |
| start_date         | Start    |
| end_date           | Expiry   |
| stripe_customer_id | Stripe   |
| stripe_session_id  | Checkout |

### notes

| Field      | Purpose   |
| ---------- | --------- |
| id         | Note      |
| user_id    | Owner     |
| chapter_id | Chapter   |
| section_id | Section   |
| content    | Note text |
| visibility | Private   |
| updated_at | Modified  |

---

# 25. Technical Stack Requirements

## Recommended Stack

| Layer     | Recommendation                           |
| --------- | ---------------------------------------- |
| Source    | Markdown                                 |
| Repo      | GitHub                                   |
| Frontend  | Next.js                                  |
| Hosting   | Vercel                                   |
| Database  | Supabase/Postgres                        |
| Auth      | Supabase Auth or institutional SSO later |
| Payment   | Stripe Checkout                          |
| Images    | Cloudinary                               |
| Audio     | Cloudinary                               |
| Videos    | YouTube                                  |
| Styling   | Tailwind or CSS modules                  |
| Search    | Pagefind / database search               |
| Analytics | Internal events                          |
| Exports   | Quarto/Pandoc later                      |

## Technical Requirements

| ID      | Requirement             | Priority |
| ------- | ----------------------- | -------- |
| TECH-01 | MD chapter parser       | Must     |
| TECH-02 | Dynamic chapter routing | Must     |
| TECH-03 | Protected routes        | Must     |
| TECH-04 | Stripe webhook API      | Must     |
| TECH-05 | Notes API               | Must     |
| TECH-06 | Progress API            | Should   |
| TECH-07 | Search index            | Should   |
| TECH-08 | Admin dashboard         | Should   |
| TECH-09 | Responsive CSS          | Must     |
| TECH-10 | Accessibility testing   | Must     |
| TECH-11 | Environment variables   | Must     |
| TECH-12 | Error logging           | Should   |

---

# 26. Page and Route Requirements

| Route                 | Purpose          | Access     |
| --------------------- | ---------------- | ---------- |
| `/`                   | Landing page     | Public     |
| `/book`               | Book home        | Paid       |
| `/book/[chapter]`     | Chapter reader   | Paid       |
| `/preview/[chapter]`  | Sample chapter   | Public     |
| `/login`              | Login            | Public     |
| `/signup`             | Account creation | Public     |
| `/checkout`           | Start payment    | Public     |
| `/success`            | Payment success  | User       |
| `/cancel`             | Payment canceled | User       |
| `/notes`              | User notes       | Paid       |
| `/account`            | Account settings | User       |
| `/admin`              | Admin dashboard  | Admin      |
| `/instructor`         | Instructor view  | Instructor |
| `/api/stripe/webhook` | Stripe webhook   | Server     |
| `/api/notes`          | Notes API        | Paid       |
| `/api/progress`       | Progress API     | Paid       |

---

# 27. UI Requirements

## Main Layout

| Area        | Requirement          |
| ----------- | -------------------- |
| Header      | Book title / account |
| Sidebar     | Collapsible chapters |
| Content     | Chapter reader       |
| Right panel | Notes / glossary     |
| Bottom nav  | Previous / next      |
| Footer      | Legal / support      |

## Required UI Components

| Component                | Priority |
| ------------------------ | -------- |
| Sidebar chapter tree     | Must     |
| Chapter reader           | Must     |
| Bottom previous/next nav | Must     |
| Login form               | Must     |
| Checkout button          | Must     |
| Notes panel              | Must     |
| Audio player             | Must     |
| YouTube embed            | Must     |
| Search box               | Should   |
| Progress badge           | Should   |
| Admin user table         | Should   |
| Instructor dashboard     | Should   |
| Mobile menu              | Must     |

---

# 28. Content Access Requirements

## Public Content

| Content                 | Access |
| ----------------------- | ------ |
| Landing page            | Public |
| Table of contents       | Public |
| Sample chapter          | Public |
| Pricing page            | Public |
| About author            | Public |
| Accessibility statement | Public |
| Privacy policy          | Public |

## Paid Content

| Content         | Access           |
| --------------- | ---------------- |
| Full chapters   | Paid             |
| Notes           | Paid             |
| Audio overviews | Paid or preview  |
| Videos          | Paid or unlisted |
| Quizzes         | Paid             |
| Downloads       | Paid             |
| Progress        | Paid             |

---

# 29. Legal and Policy Page Requirements

| Page                    | Priority |
| ----------------------- | -------- |
| Terms of use            | Must     |
| Privacy policy          | Must     |
| Accessibility statement | Must     |
| Refund policy           | Must     |
| Contact/support         | Must     |
| Course use disclaimer   | Should   |
| Copyright page          | Must     |

If you assign this book in your own class, add a separate institutional/ethics review step before requiring paid access.

---

# 30. Notifications and Email Requirements

| ID       | Requirement                | Priority |
| -------- | -------------------------- | -------- |
| EMAIL-01 | Payment receipt via Stripe | Must     |
| EMAIL-02 | Welcome email              | Should   |
| EMAIL-03 | Password reset email       | Must     |
| EMAIL-04 | Access expiration notice   | Could    |
| EMAIL-05 | Support contact email      | Must     |

Do not build a complex email system for MVP. Use platform defaults where possible.

---

# 31. Analytics Requirements

## Student Analytics

| ID     | Requirement              | Priority |
| ------ | ------------------------ | -------- |
| ANA-01 | Track chapter completion | Should   |
| ANA-02 | Track reading progress   | Should   |
| ANA-03 | Track notes count        | Could    |
| ANA-04 | Track quiz completion    | Could    |
| ANA-05 | Show personal dashboard  | Should   |

## Instructor Analytics

| ID     | Requirement                | Priority |
| ------ | -------------------------- | -------- |
| ANA-06 | Aggregate progress         | Should   |
| ANA-07 | Chapter difficulty signals | Could    |
| ANA-08 | Quiz performance           | Could    |
| ANA-09 | Export aggregate CSV       | Could    |

## Privacy Rule

Analytics should be instructional, not punitive.

---

# 32. MVP Requirements

For the first usable version, build only this:

| Feature              | MVP   |
| -------------------- | ----- |
| Markdown chapters    | Yes   |
| Paid access          | Yes   |
| Stripe Checkout      | Yes   |
| Login                | Yes   |
| Sidebar nav          | Yes   |
| Bottom nav           | Yes   |
| Notes                | Yes   |
| Cloudinary images    | Yes   |
| YouTube embeds       | Yes   |
| Audio embeds         | Yes   |
| Responsive design    | Yes   |
| Accessibility basics | Yes   |
| Admin access grants  | Yes   |
| Instructor analytics | Later |
| Quizzes              | Later |
| LTI                  | Later |
| AI hints             | Later |

## MVP User Flow

```text
Student visits landing page
        ↓
Views sample chapter
        ↓
Creates account
        ↓
Pays with Stripe
        ↓
Gets access grant
        ↓
Reads chapters
        ↓
Uses sidebar and bottom nav
        ↓
Takes private notes
        ↓
Returns later and resumes
```

---

# 33. Phase Roadmap

## Phase 1 — Static Paid Reader

| Deliverable                | Status      |
| -------------------------- | ----------- |
| Markdown chapter rendering | Build first |
| Login                      | Build first |
| Stripe payment             | Build first |
| Access control             | Build first |
| Sidebar nav                | Build first |
| Bottom nav                 | Build first |
| Notes                      | Build first |
| Media embeds               | Build first |

## Phase 2 — Learning Features

| Deliverable | Status |
| ----------- | ------ |
| Bookmarks   | Next   |
| Progress    | Next   |
| Search      | Next   |
| Checkpoints | Next   |
| Glossary    | Next   |

## Phase 3 — Instructor Layer

| Deliverable          | Status |
| -------------------- | ------ |
| Instructor dashboard | Later  |
| Course sections      | Later  |
| Access codes         | Later  |
| Aggregate reports    | Later  |

## Phase 4 — Institutional Layer

| Deliverable             | Status |
| ----------------------- | ------ |
| Brightspace integration | Later  |
| LTI 1.3                 | Later  |
| Grade passback          | Later  |
| Roster sync             | Later  |

## Phase 5 — Advanced Platform

| Deliverable       | Status |
| ----------------- | ------ |
| SQL sandbox       | Later  |
| AI hints          | Later  |
| Adaptive learning | Later  |
| Full analytics    | Later  |

---

# 34. Acceptance Criteria

## Student Can

* create an account;
* pay through Stripe;
* access the full book;
* open chapters;
* use collapsible sidebar;
* move previous/next;
* take and edit notes;
* play audio;
* watch videos;
* use the platform on mobile.

## Admin Can

* view users;
* verify payment status;
* grant manual access;
* revoke access;
* see support info;
* test checkout flow.

## Instructor Can

* preview student view;
* access full book;
* optionally view aggregate progress later.

## Platform Must

* protect paid chapters;
* avoid storing card data;
* provide accessible media;
* work on mobile;
* load quickly;
* use secure sessions;
* preserve student privacy.

---

# 35. Recommended Repository Placement

In your GitHub repo:

```text
books/database-book/
  source/
    chapters/
  platform/
    app/
    components/
    lib/
    api/
    styles/
  media/
    cloudinary-assets.yml
    youtube-videos.yml
    audio-overviews.yml
  docs/
    requirements.md
    accessibility-checklist.md
    payment-flow.md
    data-model.md
    roadmap.md
  platform-pilots/
    figma/
    claude/
    cursor/
    google-ai/
    codex/
    antigravity/
```

I would keep `source/` and `platform/` separate.

```text
source/   = book content
platform/ = web application
```

That distinction will save you later.

---

# 36. Immediate Next Build Checklist

Start with these files:

```text
docs/requirements.md
docs/data-model.md
docs/payment-flow.md
docs/accessibility-checklist.md
docs/roadmap.md
source/chapters/
platform/
```

Then build the MVP in this order:

1. chapter source structure;
2. chapter renderer;
3. sidebar navigation;
4. bottom navigation;
5. login;
6. Stripe checkout;
7. access grants;
8. notes;
9. media embeds;
10. accessibility pass.

---

# Final Recommendation

Build the first version as:

```text
Next.js + Supabase + Stripe + Cloudinary + YouTube
```

with:

```text
Markdown source in GitHub
student accounts in Supabase
payments in Stripe
images/audio in Cloudinary
videos in YouTube
```

Your MVP should focus on:

```text
login → pay → read → navigate → take notes
```

Everything else—analytics, quizzes, LTI, AI hints, SQL sandbox—should come after that core loop works.

[1]: https://docs.stripe.com/checkout/quickstart "docs.stripe.com"
[2]: https://www.w3.org/TR/WCAG22/ "Web Content Accessibility Guidelines (WCAG) 2.2"
[3]: https://www.1edtech.org/standards/lti "Learning Tools Interoperability | 1EdTech"
