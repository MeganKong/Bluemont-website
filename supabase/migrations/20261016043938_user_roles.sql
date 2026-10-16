-- Owner: Sophia (built by Adhya, assignment 2). Each person's role.
--
-- Everyone starts as a volunteer. Only Megan can make someone an officer:
-- Supabase dashboard > Table Editor > user_roles, change the person's role to
-- 'officer'. To undo a mistake, change it back to 'volunteer'. Nobody can
-- change roles from the website, not even officers.
--
-- To add a role later (like 'mentor'), add it to the check below in a new
-- migration and to the Role type in src/lib/types.ts.

create table public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'volunteer' check (role in ('volunteer', 'officer')),
  updated_at timestamptz not null default now()
);

-- Row level security: signed-in people can read their own role, and nothing
-- else. No one gets permission to add, change or delete rows from the website.
alter table public.user_roles enable row level security;

revoke all on public.user_roles from anon, authenticated;
grant select on public.user_roles to authenticated;

create policy "People can read their own role"
  on public.user_roles for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Every new account gets a volunteer row automatically, in the database, so
-- website code can't skip it or pick a different role.
create function public.give_new_user_volunteer_role()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_roles (user_id) values (new.id);
  return new;
end;
$$;

revoke execute on function public.give_new_user_volunteer_role() from public, anon, authenticated;

create trigger on_auth_user_created_give_role
  after insert on auth.users
  for each row execute function public.give_new_user_volunteer_role();

-- Keep track of when a role last changed.
create function public.touch_user_roles_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_roles_touch_updated_at
  before update on public.user_roles
  for each row execute function public.touch_user_roles_updated_at();

-- Accounts made before this migration become volunteers too.
insert into public.user_roles (user_id)
select id from auth.users
on conflict (user_id) do nothing;
