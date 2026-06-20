-- ============================================================
-- functions.sql — personal-blog PostgreSQL function definitions
-- Common rules:
--   security definer + set search_path = '' for security
--   Admin operations require auth.uid() check to reject unauthenticated calls
-- ============================================================


-- ============================================================
-- Public functions (callable by anon and authenticated)
-- ============================================================

-- Returns all posts ordered by published_at descending
create or replace function public.get_all_posts()
returns setof public.posts
language sql
security definer
set search_path = ''
as $$
  select * from public.posts
  order by published_at desc;
$$;
grant execute on function public.get_all_posts() to anon, authenticated;


-- Returns a single post by slug
create or replace function public.get_post_by_slug(p_slug text)
returns public.posts
language sql
security definer
set search_path = ''
as $$
  select * from public.posts
  where slug = p_slug
  limit 1;
$$;
grant execute on function public.get_post_by_slug(text) to anon, authenticated;


-- Returns the N most recent posts (default: 5)
create or replace function public.get_recent_posts(p_count int default 5)
returns setof public.posts
language sql
security definer
set search_path = ''
as $$
  select * from public.posts
  order by published_at desc
  limit p_count;
$$;
grant execute on function public.get_recent_posts(int) to anon, authenticated;


-- ============================================================
-- Admin functions (authenticated only)
-- ============================================================

-- Creates or updates a post (upsert by slug)
create or replace function public.upsert_post(
  p_slug         text,
  p_title        text,
  p_description  text,
  p_content      text,
  p_published_at timestamptz,
  p_tags         text[]   default '{}',
  p_featured     boolean  default false
)
returns public.posts
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_post public.posts;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.posts (slug, title, description, content, published_at, tags, featured)
  values (p_slug, p_title, p_description, p_content, p_published_at, p_tags, p_featured)
  on conflict (slug) do update set
    title        = excluded.title,
    description  = excluded.description,
    content      = excluded.content,
    published_at = excluded.published_at,
    tags         = excluded.tags,
    featured     = excluded.featured
  returning * into v_post;

  return v_post;
end;
$$;
grant execute on function public.upsert_post(text, text, text, text, timestamptz, text[], boolean) to authenticated;


-- Deletes a post by slug
create or replace function public.delete_post(p_slug text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  delete from public.posts where slug = p_slug;
  return found;
end;
$$;
grant execute on function public.delete_post(text) to authenticated;


-- Returns all newsletter subscribers ordered by subscription date (admin only)
create or replace function public.get_all_subscribers()
returns setof public.newsletter_subscribers
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  return query
    select * from public.newsletter_subscribers
    order by subscribed_at desc;
end;
$$;
grant execute on function public.get_all_subscribers() to authenticated;
