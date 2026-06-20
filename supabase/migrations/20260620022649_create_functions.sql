set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_post(p_slug text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  delete from public.posts where slug = p_slug;
  return found;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_all_posts()
 RETURNS SETOF public.posts
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select * from public.posts
  order by published_at desc;
$function$
;

CREATE OR REPLACE FUNCTION public.get_all_subscribers()
 RETURNS SETOF public.newsletter_subscribers
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  return query
    select * from public.newsletter_subscribers
    order by subscribed_at desc;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_post_by_slug(p_slug text)
 RETURNS public.posts
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select * from public.posts
  where slug = p_slug
  limit 1;
$function$
;

CREATE OR REPLACE FUNCTION public.get_recent_posts(p_count integer DEFAULT 5)
 RETURNS SETOF public.posts
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select * from public.posts
  order by published_at desc
  limit p_count;
$function$
;

CREATE OR REPLACE FUNCTION public.upsert_post(p_slug text, p_title text, p_description text, p_content text, p_published_at timestamp with time zone, p_tags text[] DEFAULT '{}'::text[], p_featured boolean DEFAULT false)
 RETURNS public.posts
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
$function$
;


