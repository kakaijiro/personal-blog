-- ============================================================
-- functions.sql — personal-blog PostgreSQL 関数定義
-- 共通ルール:
--   security definer + set search_path = '' でセキュリティ確保
--   管理者操作は auth.uid() チェックで未認証を拒否
-- ============================================================


-- ============================================================
-- 公開関数（anon・authenticated 両方から呼べる）
-- ============================================================

-- 全記事を公開日降順で返す
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


-- slug で1記事を返す
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


-- 最新 N 件を返す（デフォルト5件）
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
-- 管理者関数（authenticated のみ）
-- ============================================================

-- 記事の作成・更新（slug が重複したら UPDATE）
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


-- 記事を slug で削除する
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


-- 購読者一覧を登録日降順で返す（管理者専用）
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
