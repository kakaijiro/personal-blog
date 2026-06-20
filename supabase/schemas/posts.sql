-- ============================================================
-- posts テーブル
-- ============================================================
create table if not exists public.posts (
  id           uuid        primary key default gen_random_uuid(),
  slug         text        unique not null,
  title        text        not null,
  description  text,
  content      text        not null,  -- Markdown 形式
  published_at timestamptz not null,
  tags         text[]      not null default '{}',
  featured     boolean     not null default false,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- RLS
-- ============================================================
alter table public.posts enable row level security;

-- 誰でも読める（公開ブログ）
create policy "Public can read posts"
  on public.posts
  for select
  using (true);

-- 書き込みは認証ユーザー（管理者）のみ
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
