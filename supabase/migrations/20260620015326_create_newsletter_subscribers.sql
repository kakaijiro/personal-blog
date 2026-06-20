
  create table "public"."newsletter_subscribers" (
    "id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "subscribed_at" timestamp with time zone not null default now()
      );


alter table "public"."newsletter_subscribers" enable row level security;


  create table "public"."posts" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "title" text not null,
    "description" text,
    "content" text not null,
    "published_at" timestamp with time zone not null,
    "tags" text[] not null default '{}'::text[],
    "featured" boolean not null default false,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."posts" enable row level security;

CREATE UNIQUE INDEX newsletter_subscribers_email_key ON public.newsletter_subscribers USING btree (email);

CREATE UNIQUE INDEX newsletter_subscribers_pkey ON public.newsletter_subscribers USING btree (id);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX posts_slug_key ON public.posts USING btree (slug);

alter table "public"."newsletter_subscribers" add constraint "newsletter_subscribers_pkey" PRIMARY KEY using index "newsletter_subscribers_pkey";

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "public"."newsletter_subscribers" add constraint "newsletter_subscribers_email_key" UNIQUE using index "newsletter_subscribers_email_key";

alter table "public"."posts" add constraint "posts_slug_key" UNIQUE using index "posts_slug_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.subscribe_newsletter(p_email text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.newsletter_subscribers (email)
  values (lower(trim(p_email)))
  on conflict (email) do nothing;

  return json_build_object('success', true);
exception when others then
  return json_build_object('success', false, 'error', sqlerrm);
end;
$function$
;

grant references on table "public"."newsletter_subscribers" to "anon";

grant trigger on table "public"."newsletter_subscribers" to "anon";

grant truncate on table "public"."newsletter_subscribers" to "anon";

grant references on table "public"."newsletter_subscribers" to "authenticated";

grant trigger on table "public"."newsletter_subscribers" to "authenticated";

grant truncate on table "public"."newsletter_subscribers" to "authenticated";

grant references on table "public"."newsletter_subscribers" to "service_role";

grant trigger on table "public"."newsletter_subscribers" to "service_role";

grant truncate on table "public"."newsletter_subscribers" to "service_role";

grant references on table "public"."posts" to "anon";

grant trigger on table "public"."posts" to "anon";

grant truncate on table "public"."posts" to "anon";

grant references on table "public"."posts" to "authenticated";

grant trigger on table "public"."posts" to "authenticated";

grant truncate on table "public"."posts" to "authenticated";

grant references on table "public"."posts" to "service_role";

grant trigger on table "public"."posts" to "service_role";

grant truncate on table "public"."posts" to "service_role";


  create policy "Anyone can subscribe"
  on "public"."newsletter_subscribers"
  as permissive
  for insert
  to anon
with check (true);



  create policy "Authenticated can delete subscribers"
  on "public"."newsletter_subscribers"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Authenticated can read subscribers"
  on "public"."newsletter_subscribers"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Authenticated can delete posts"
  on "public"."posts"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Authenticated can insert posts"
  on "public"."posts"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Authenticated can update posts"
  on "public"."posts"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "Public can read posts"
  on "public"."posts"
  as permissive
  for select
  to public
using (true);



