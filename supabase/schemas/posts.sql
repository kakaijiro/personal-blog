-- ============================================================
-- posts table
-- ============================================================
create table if not exists public.posts (
  id           uuid        primary key default gen_random_uuid(),
  slug         text        unique not null,
  title        text        not null,
  description  text,
  content      text        not null,  -- Markdown format
  published_at timestamptz not null,
  tags         text[]      not null default '{}',
  featured     boolean     not null default false,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.posts enable row level security;

-- Anyone can read published posts
create policy "Public can read posts"
  on public.posts
  for select
  using (true);

-- Only authenticated users (admin) can write
create policy "Authenticated can insert posts"
  on public.posts
  for insert
  to authenticated
  with check (true);

create policy "Authenticated can update posts"
  on public.posts
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete posts"
  on public.posts
  for delete
  to authenticated
  using (true);
