-- MVP-0 schema for the Database Book paid platform.
-- Run in the Supabase SQL editor or via `supabase db push`.
--
-- Security model:
--   * Every table in the exposed `public` schema has RLS enabled.
--   * Users can only ever touch their own rows (auth.uid()).
--   * access_grants is read-only to users; ONLY the service role (Stripe
--     webhook) writes it. No INSERT/UPDATE/DELETE policy is granted to users,
--     so those operations are denied for anon/authenticated by default.
--   * processed_stripe_events gives the webhook idempotency.

-- ---------------------------------------------------------------------------
-- access_grants: who can read the paid book, and until when.
-- ---------------------------------------------------------------------------
create table if not exists public.access_grants (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  product_id         text not null,
  status             text not null default 'active'
                       check (status in ('active', 'expired', 'refunded', 'comped')),
  start_date         timestamptz not null default now(),
  end_date           timestamptz,
  stripe_customer_id text,
  stripe_session_id  text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (user_id, product_id)
);

create index if not exists access_grants_user_idx on public.access_grants (user_id);

alter table public.access_grants enable row level security;

-- Users may read only their own grant. No write policies => writes denied
-- for anon/authenticated; the service role bypasses RLS for webhook writes.
drop policy if exists "read own access grant" on public.access_grants;
create policy "read own access grant"
  on public.access_grants
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- purchases: audit log of Stripe checkout outcomes (service-role writes only).
-- ---------------------------------------------------------------------------
create table if not exists public.purchases (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references auth.users (id) on delete set null,
  product_id         text not null,
  amount_total       integer,
  currency           text,
  status             text not null,
  stripe_session_id  text unique,
  stripe_customer_id text,
  created_at         timestamptz not null default now()
);

alter table public.purchases enable row level security;

drop policy if exists "read own purchases" on public.purchases;
create policy "read own purchases"
  on public.purchases
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- processed_stripe_events: webhook idempotency (service-role only, no policies).
-- ---------------------------------------------------------------------------
create table if not exists public.processed_stripe_events (
  event_id     text primary key,
  type         text not null,
  processed_at timestamptz not null default now()
);

alter table public.processed_stripe_events enable row level security;
-- No policies: only the service role (which bypasses RLS) can touch this.

-- ---------------------------------------------------------------------------
-- notes: private student notes. Private by default; no shared-read path.
-- ---------------------------------------------------------------------------
create table if not exists public.notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  chapter_id text not null,
  section_id text,
  content    text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notes_user_chapter_idx on public.notes (user_id, chapter_id);

alter table public.notes enable row level security;

drop policy if exists "read own notes" on public.notes;
create policy "read own notes"
  on public.notes for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "insert own notes" on public.notes;
create policy "insert own notes"
  on public.notes for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "update own notes" on public.notes;
create policy "update own notes"
  on public.notes for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "delete own notes" on public.notes;
create policy "delete own notes"
  on public.notes for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- progress: per-user reading position / completion.
-- ---------------------------------------------------------------------------
create table if not exists public.progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  chapter_id   text not null,
  status       text not null default 'opened'
                 check (status in ('opened', 'in_progress', 'completed')),
  last_section text,
  updated_at   timestamptz not null default now(),
  unique (user_id, chapter_id)
);

alter table public.progress enable row level security;

drop policy if exists "read own progress" on public.progress;
create policy "read own progress"
  on public.progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "insert own progress" on public.progress;
create policy "insert own progress"
  on public.progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "update own progress" on public.progress;
create policy "update own progress"
  on public.progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- updated_at trigger helper.
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists access_grants_set_updated_at on public.access_grants;
create trigger access_grants_set_updated_at
  before update on public.access_grants
  for each row execute function public.set_updated_at();

drop trigger if exists notes_set_updated_at on public.notes;
create trigger notes_set_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();

drop trigger if exists progress_set_updated_at on public.progress;
create trigger progress_set_updated_at
  before update on public.progress
  for each row execute function public.set_updated_at();
