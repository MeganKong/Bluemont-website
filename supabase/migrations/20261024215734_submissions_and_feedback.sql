-- Owner: Megan (built by Adhya). Volunteers share photos of their crochet,
-- and officers leave feedback on them.
--
-- Privacy rules (row level security), enforced by the database itself, so
-- they hold even if someone guesses a link or calls the database directly:
-- - Volunteers see only their own submissions and the feedback on them.
-- - Officers see every submission and all feedback.
-- - Only officers write feedback; only the officer who wrote it can edit or
--   delete it. Only officers set "Approved" / "Needs changes".
-- - Volunteers can't change feedback. They can only mark it seen or say
--   thanks, through two small functions at the bottom.
-- - Photos live in a private storage bucket: each volunteer can only add to
--   and see their own folder; officers can see all of them.

-- Is the signed-in person an officer? Used by the rules below.
create function public.is_officer()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'officer'
  );
$$;

revoke execute on function public.is_officer() from public, anon;
grant execute on function public.is_officer() to authenticated;

-- The first name saved at sign-up (shown as "Volunteer" if there isn't one).
create function public.my_first_name()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select left(nullif(trim(raw_user_meta_data ->> 'first_name'), ''), 50)
     from auth.users where id = (select auth.uid())),
    'Volunteer'
  );
$$;

revoke execute on function public.my_first_name() from public, anon, authenticated;


-- ── Submissions: one photo of a volunteer's work ─────────────────────────

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  volunteer_id uuid not null references auth.users (id) on delete cascade,
  -- First name only, copied at the time they shared it.
  volunteer_name text not null,
  -- Matches a lesson id in src/app/(app)/lessons/_placeholder.ts, or empty.
  lesson_id text check (char_length(lesson_id) <= 100),
  -- Where the photo is in the submission-photos bucket: "<volunteer id>/<file>".
  photo_path text not null check (char_length(photo_path) <= 200),
  note text check (char_length(note) <= 500),
  -- Set by officers: 'approved', 'needs_changes', or empty.
  status text check (status in ('approved', 'needs_changes')),
  created_at timestamptz not null default now()
);

create index submissions_created_at_idx on public.submissions (created_at desc);
create index submissions_volunteer_id_idx on public.submissions (volunteer_id);

alter table public.submissions enable row level security;

revoke all on public.submissions from anon, authenticated;
grant select, insert on public.submissions to authenticated;
grant update (status) on public.submissions to authenticated;

create policy "Volunteers see their own work, officers see all"
  on public.submissions for select
  to authenticated
  using (volunteer_id = (select auth.uid()) or (select public.is_officer()));

create policy "Volunteers share their own work"
  on public.submissions for insert
  to authenticated
  with check (
    volunteer_id = (select auth.uid())
    and photo_path like (select auth.uid())::text || '/%'
  );

create policy "Officers set the status"
  on public.submissions for update
  to authenticated
  using ((select public.is_officer()))
  with check ((select public.is_officer()));

-- The database fills in who shared it, their name, and the date, so the
-- website can't pretend to be someone else.
create function public.submissions_fill_in()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.volunteer_id := auth.uid();
  new.volunteer_name := public.my_first_name();
  new.status := null;
  new.created_at := now();
  return new;
end;
$$;

revoke execute on function public.submissions_fill_in() from public, anon, authenticated;

create trigger submissions_fill_in
  before insert on public.submissions
  for each row execute function public.submissions_fill_in();


-- ── Feedback: tips and comments from officers ────────────────────────────

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  -- Kept if the officer's account is deleted later, just without the link.
  officer_id uuid references auth.users (id) on delete set null,
  officer_name text not null,
  kind text not null check (kind in ('tip', 'comment')),
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  -- When the volunteer first saw it (empty means "New feedback").
  seen_at timestamptz,
  -- When the volunteer tapped "Thanks!".
  thanked_at timestamptz
);

create index feedback_submission_id_idx on public.feedback (submission_id);

alter table public.feedback enable row level security;

revoke all on public.feedback from anon, authenticated;
grant select, insert, delete on public.feedback to authenticated;
grant update (kind, body) on public.feedback to authenticated;

create policy "Volunteers see feedback on their own work, officers see all"
  on public.feedback for select
  to authenticated
  using (
    (select public.is_officer())
    or exists (
      select 1 from public.submissions
      where submissions.id = feedback.submission_id
        and submissions.volunteer_id = (select auth.uid())
    )
  );

create policy "Officers write feedback"
  on public.feedback for insert
  to authenticated
  with check ((select public.is_officer()));

create policy "Officers edit their own feedback"
  on public.feedback for update
  to authenticated
  using ((select public.is_officer()) and officer_id = (select auth.uid()))
  with check ((select public.is_officer()) and officer_id = (select auth.uid()));

create policy "Officers delete their own feedback"
  on public.feedback for delete
  to authenticated
  using ((select public.is_officer()) and officer_id = (select auth.uid()));

-- The database fills in who wrote it and when.
create function public.feedback_fill_in()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.officer_id := auth.uid();
  new.officer_name := public.my_first_name();
  new.created_at := now();
  new.edited_at := null;
  new.seen_at := null;
  new.thanked_at := null;
  return new;
end;
$$;

revoke execute on function public.feedback_fill_in() from public, anon, authenticated;

create trigger feedback_fill_in
  before insert on public.feedback
  for each row execute function public.feedback_fill_in();

-- Editing feedback marks it as edited and shows it as new again.
create function public.feedback_mark_edited()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.body is distinct from old.body or new.kind is distinct from old.kind then
    new.edited_at := now();
    new.seen_at := null;
  end if;
  return new;
end;
$$;

create trigger feedback_mark_edited
  before update on public.feedback
  for each row execute function public.feedback_mark_edited();


-- ── The only two things volunteers can change ────────────────────────────

-- Opening "My work" marks all feedback on their own work as seen.
create function public.mark_my_feedback_seen()
returns void
language sql
security definer
set search_path = ''
as $$
  update public.feedback
  set seen_at = now()
  from public.submissions
  where feedback.submission_id = submissions.id
    and submissions.volunteer_id = (select auth.uid())
    and feedback.seen_at is null;
$$;

-- "Thanks!" on one piece of feedback about their own work. Can't be undone.
create function public.thank_for_feedback(feedback_id uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.feedback
  set thanked_at = coalesce(feedback.thanked_at, now())
  from public.submissions
  where feedback.id = feedback_id
    and feedback.submission_id = submissions.id
    and submissions.volunteer_id = (select auth.uid());
$$;

revoke execute on function public.mark_my_feedback_seen() from public, anon;
revoke execute on function public.thank_for_feedback(uuid) from public, anon;
grant execute on function public.mark_my_feedback_seen() to authenticated;
grant execute on function public.thank_for_feedback(uuid) to authenticated;


-- ── Private photo storage ────────────────────────────────────────────────

-- Not public: photos are only shown through short-lived private links.
-- The website shrinks photos before uploading, so 5 MB is plenty.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('submission-photos', 'submission-photos', false, 5242880, array['image/jpeg']);

create policy "Volunteers add photos to their own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'submission-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Volunteers see their own photos, officers see all"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'submission-photos'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or (select public.is_officer())
    )
  );

-- Lets the website tidy up a photo if saving the submission fails.
create policy "Volunteers remove their own photos"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'submission-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
