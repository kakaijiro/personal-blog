-- ============================================================
-- newsletter_subscribers table
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id            uuid        primary key default gen_random_uuid(),
  email         text        unique not null,
  subscribed_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.newsletter_subscribers enable row level security;

-- Anyone (unauthenticated) can subscribe with their email
create policy "Anyone can subscribe"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);

-- Only authenticated users (admin) can view or delete subscribers
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
-- Function to safely handle duplicate email subscriptions
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
