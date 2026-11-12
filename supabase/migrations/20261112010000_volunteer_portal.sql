-- Owner: Megan (built by Adhya). Everything the signed-in pages save, so
-- every button on them works:
-- - lesson_progress: "Mark complete" on a lesson.
-- - kit_requests:    "Request my kit", and officers approving it.
-- - service_hours:   volunteers logging hours, officers approving them.
-- - news_posts:      officers posting updates (and event dates).
-- - check_ins and meeting_rsvps: the officers' weekly check-in and RSVP.
-- - stock_items:     supplies on hand, kept up to date by officers.
--
-- Privacy rules (row level security), enforced by the database itself:
-- - Volunteers see and change only their own progress, kit and hours.
-- - Officers see everyone's, and are the only ones who approve things.
-- - Names are first names only, filled in by the database from sign-up.
-- - Check-ins, RSVPs and stock are for officers only.
-- Uses public.is_officer() and public.my_first_name() from
-- *_submissions_and_feedback.sql.


-- ── Lesson progress: one row per finished lesson ─────────────────────────

create table public.lesson_progress (
  volunteer_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  -- Matches a lesson id in src/app/(app)/lessons/_placeholder.ts.
  lesson_id text not null check (char_length(lesson_id) between 1 and 100),
  completed_at timestamptz not null default now(),
  primary key (volunteer_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

revoke all on public.lesson_progress from anon, authenticated;
grant select, insert (lesson_id), delete on public.lesson_progress to authenticated;

create policy "Volunteers see their own progress, officers see all"
  on public.lesson_progress for select
  to authenticated
  using (volunteer_id = (select auth.uid()) or (select public.is_officer()));

create policy "Volunteers mark their own lessons complete"
  on public.lesson_progress for insert
  to authenticated
  with check (volunteer_id = (select auth.uid()));

create policy "Volunteers undo their own lessons"
  on public.lesson_progress for delete
  to authenticated
  using (volunteer_id = (select auth.uid()));


-- ── Kit requests ─────────────────────────────────────────────────────────

create table public.kit_requests (
  id uuid primary key default gen_random_uuid(),
  volunteer_id uuid not null references auth.users (id) on delete cascade,
  volunteer_name text not null,
  kit text not null default 'starter' check (kit in ('starter', 'full')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'picked_up')),
  requested_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One open request per volunteer at a time.
create unique index kit_requests_one_open_idx on public.kit_requests (volunteer_id) where status <> 'picked_up';
create index kit_requests_requested_at_idx on public.kit_requests (requested_at desc);

alter table public.kit_requests enable row level security;

revoke all on public.kit_requests from anon, authenticated;
grant select, insert (kit), delete on public.kit_requests to authenticated;
grant update (status) on public.kit_requests to authenticated;

create policy "Volunteers see their own kit, officers see all"
  on public.kit_requests for select
  to authenticated
  using (volunteer_id = (select auth.uid()) or (select public.is_officer()));

-- A kit unlocks once they've finished a lesson.
create policy "Volunteers request a kit after a lesson"
  on public.kit_requests for insert
  to authenticated
  with check (
    volunteer_id = (select auth.uid())
    and exists (select 1 from public.lesson_progress where volunteer_id = (select auth.uid()))
  );

create policy "Volunteers cancel a request that is still waiting"
  on public.kit_requests for delete
  to authenticated
  using (volunteer_id = (select auth.uid()) and status = 'pending');

create policy "Officers approve kits"
  on public.kit_requests for update
  to authenticated
  using ((select public.is_officer()))
  with check ((select public.is_officer()));

create function public.kit_requests_fill_in()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.volunteer_id := auth.uid();
  new.volunteer_name := public.my_first_name();
  new.status := 'pending';
  new.requested_at := now();
  new.updated_at := now();
  return new;
end;
$$;

revoke execute on function public.kit_requests_fill_in() from public, anon, authenticated;

create trigger kit_requests_fill_in
  before insert on public.kit_requests
  for each row execute function public.kit_requests_fill_in();

create function public.kit_requests_touch()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger kit_requests_touch
  before update on public.kit_requests
  for each row execute function public.kit_requests_touch();


-- ── Service hours: logged by volunteers, approved by officers ────────────

create table public.service_hours (
  id uuid primary key default gen_random_uuid(),
  volunteer_id uuid not null references auth.users (id) on delete cascade,
  volunteer_name text not null,
  activity text not null check (char_length(activity) between 1 and 100),
  hours numeric(3, 1) not null check (hours > 0 and hours <= 12),
  worked_on date not null check (worked_on >= date '2025-01-01'),
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamptz not null default now(),
  -- The officer who approved or declined it, first name only.
  reviewed_by text,
  reviewed_at timestamptz
);

create index service_hours_volunteer_id_idx on public.service_hours (volunteer_id, worked_on desc);
create index service_hours_pending_idx on public.service_hours (created_at) where status = 'pending';

alter table public.service_hours enable row level security;

revoke all on public.service_hours from anon, authenticated;
grant select, insert (activity, hours, worked_on), delete on public.service_hours to authenticated;
grant update (status) on public.service_hours to authenticated;

create policy "Volunteers see their own hours, officers see all"
  on public.service_hours for select
  to authenticated
  using (volunteer_id = (select auth.uid()) or (select public.is_officer()));

create policy "Volunteers log their own hours"
  on public.service_hours for insert
  to authenticated
  with check (volunteer_id = (select auth.uid()));

create policy "Volunteers delete hours that are still waiting"
  on public.service_hours for delete
  to authenticated
  using (volunteer_id = (select auth.uid()) and status = 'pending');

create policy "Officers approve hours"
  on public.service_hours for update
  to authenticated
  using ((select public.is_officer()))
  with check ((select public.is_officer()));

create function public.service_hours_fill_in()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.worked_on > current_date + 1 then
    raise exception 'Hours can''t be logged for a future date';
  end if;
  new.volunteer_id := auth.uid();
  new.volunteer_name := public.my_first_name();
  new.status := 'pending';
  new.created_at := now();
  new.reviewed_by := null;
  new.reviewed_at := null;
  return new;
end;
$$;

revoke execute on function public.service_hours_fill_in() from public, anon, authenticated;

create trigger service_hours_fill_in
  before insert on public.service_hours
  for each row execute function public.service_hours_fill_in();

-- Approving or declining records which officer did it, and when.
create function public.service_hours_reviewed()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status is distinct from old.status then
    new.reviewed_by := public.my_first_name();
    new.reviewed_at := now();
  end if;
  return new;
end;
$$;

revoke execute on function public.service_hours_reviewed() from public, anon, authenticated;

create trigger service_hours_reviewed
  before update on public.service_hours
  for each row execute function public.service_hours_reviewed();


-- ── News: updates from officers, with an optional event date ─────────────

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users (id) on delete set null,
  author_name text not null,
  title text not null check (char_length(title) between 1 and 80),
  body text not null check (char_length(body) between 1 and 1000),
  -- Set for events (a pickup, a making day), so they show under "Coming up".
  event_date date,
  created_at timestamptz not null default now()
);

create index news_posts_created_at_idx on public.news_posts (created_at desc);

alter table public.news_posts enable row level security;

revoke all on public.news_posts from anon, authenticated;
grant select, insert (title, body, event_date), delete on public.news_posts to authenticated;

create policy "Everyone signed in reads news"
  on public.news_posts for select
  to authenticated
  using (true);

create policy "Officers post news"
  on public.news_posts for insert
  to authenticated
  with check ((select public.is_officer()));

create policy "Officers delete news"
  on public.news_posts for delete
  to authenticated
  using ((select public.is_officer()));

create function public.news_posts_fill_in()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.author_id := auth.uid();
  new.author_name := public.my_first_name();
  new.created_at := now();
  return new;
end;
$$;

revoke execute on function public.news_posts_fill_in() from public, anon, authenticated;

create trigger news_posts_fill_in
  before insert on public.news_posts
  for each row execute function public.news_posts_fill_in();


-- ── Officers' weekly check-ins and meeting RSVPs ─────────────────────────

-- The Monday that starts this week, so each check-in belongs to one week.
create function public.this_week()
returns date
language sql
stable
set search_path = ''
as $$
  select date_trunc('week', now() at time zone 'America/Los_Angeles')::date;
$$;

create table public.check_ins (
  id uuid primary key default gen_random_uuid(),
  officer_id uuid not null references auth.users (id) on delete cascade,
  officer_name text not null,
  week_of date not null,
  done text not null check (char_length(done) between 1 and 500),
  next text not null check (char_length(next) between 1 and 500),
  created_at timestamptz not null default now(),
  unique (officer_id, week_of)
);

create index check_ins_week_of_idx on public.check_ins (week_of desc);

alter table public.check_ins enable row level security;

revoke all on public.check_ins from anon, authenticated;
grant select, insert (done, next), delete on public.check_ins to authenticated;

create policy "Officers read check-ins"
  on public.check_ins for select
  to authenticated
  using ((select public.is_officer()));

create policy "Officers check in"
  on public.check_ins for insert
  to authenticated
  with check ((select public.is_officer()) and officer_id = (select auth.uid()));

create policy "Officers delete their own check-ins"
  on public.check_ins for delete
  to authenticated
  using ((select public.is_officer()) and officer_id = (select auth.uid()));

create function public.check_ins_fill_in()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.officer_id := auth.uid();
  new.officer_name := public.my_first_name();
  new.week_of := public.this_week();
  new.created_at := now();
  return new;
end;
$$;

revoke execute on function public.check_ins_fill_in() from public, anon, authenticated;

create trigger check_ins_fill_in
  before insert on public.check_ins
  for each row execute function public.check_ins_fill_in();

create table public.meeting_rsvps (
  officer_id uuid not null references auth.users (id) on delete cascade,
  week_of date not null,
  officer_name text not null,
  going boolean not null,
  updated_at timestamptz not null default now(),
  primary key (officer_id, week_of)
);

alter table public.meeting_rsvps enable row level security;

revoke all on public.meeting_rsvps from anon, authenticated;
grant select on public.meeting_rsvps to authenticated;

create policy "Officers read RSVPs"
  on public.meeting_rsvps for select
  to authenticated
  using ((select public.is_officer()));

-- "Going" or "Can't make it" for this week's meeting. Changing your mind
-- replaces your answer. The only way to write an RSVP.
create function public.rsvp_this_week(is_going boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_officer() then
    raise exception 'Officers only';
  end if;
  insert into public.meeting_rsvps (officer_id, week_of, officer_name, going)
  values (auth.uid(), public.this_week(), public.my_first_name(), is_going)
  on conflict (officer_id, week_of)
  do update set going = excluded.going, updated_at = now();
end;
$$;

revoke execute on function public.rsvp_this_week(boolean) from public, anon;
grant execute on function public.rsvp_this_week(boolean) to authenticated;


-- ── Stock: supplies on hand (officers only) ──────────────────────────────

create table public.stock_items (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 1 and 80),
  quantity integer not null default 0 check (quantity between 0 and 100000),
  -- Shows "Low, reorder" at or below this number.
  low_stock_at integer not null default 0 check (low_stock_at between 0 and 100000),
  updated_at timestamptz not null default now()
);

alter table public.stock_items enable row level security;

revoke all on public.stock_items from anon, authenticated;
grant select, insert (name, quantity, low_stock_at), delete on public.stock_items to authenticated;
grant update (quantity, low_stock_at) on public.stock_items to authenticated;

create policy "Officers read stock"
  on public.stock_items for select
  to authenticated
  using ((select public.is_officer()));

create policy "Officers add stock"
  on public.stock_items for insert
  to authenticated
  with check ((select public.is_officer()));

create policy "Officers update stock"
  on public.stock_items for update
  to authenticated
  using ((select public.is_officer()))
  with check ((select public.is_officer()));

create policy "Officers remove stock"
  on public.stock_items for delete
  to authenticated
  using ((select public.is_officer()));

create function public.stock_items_touch()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger stock_items_touch
  before update on public.stock_items
  for each row execute function public.stock_items_touch();

-- What goes into a starter kit, to start with. Officers set the real counts.
insert into public.stock_items (name, quantity, low_stock_at) values
  ('Yarn skeins (worsted)', 0, 20),
  ('Crochet hooks (5 mm)', 0, 10),
  ('Safety eyes (pairs)', 0, 25),
  ('Stuffing (bags)', 0, 5);
