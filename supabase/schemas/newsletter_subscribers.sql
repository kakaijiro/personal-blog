-- ============================================================
-- newsletter_subscribers テーブル
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id            uuid        primary key default gen_random_uuid(),
  email         text        unique not null,
  subscribed_at timestamptz not null default now()
);

-- ============================================================
-- RLS
-- ============================================================
alter table public.newsletter_subscribers enable row level security;

-- 未認証ユーザーがメールアドレスを登録できる
create policy "Anyone can subscribe"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);

-- 管理者（認証済み）のみ購読者一覧を閲覧・削除できる
create policy "Authenticated can read subscribers"
  on public.newsletter_subscribers
  for select
  to authenticated
  using (true);

create policy "Authenticated can delete subscribers"
  on public.newsletter_subscribers
  for delete
  to authenticated
  using (true);

-- ============================================================
-- 重複メール登録を安全に処理する関数
-- ============================================================
create or replace function public.subscribe_newsletter(p_email text)
returns json
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.newsletter_subscribers (email)
  values (lower(trim(p_email)))
  on conflict (email) do nothing;

  return json_build_object('success', true);
exception when others then
  return json_build_object('success', false, 'error', sqlerrm);
end;
$$;

grant execute on function public.subscribe_newsletter(text) to anon;
