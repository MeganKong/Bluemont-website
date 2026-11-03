-- Owner: Megan (built by Nika, OK'd by Megan). The two public forms: the
-- contact form (FAQ page) and the plushie request form (For shelters page).
--
-- Privacy rules (row level security), enforced by the database itself:
-- - Anyone, signed in or not, can send a form. They can't read anything back.
-- - Only officers can read them, on the "Messages" officer page.
-- - Only officers can delete them. They're kept until an officer does.
-- - Nobody can change a message after it's sent.
-- Officers are checked straight from user_roles (each person can read their
-- own role), so this doesn't depend on any other migration.


-- ── Contact form ─────────────────────────────────────────────────────────

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 200 and email like '%_@_%'),
  topic text not null check (topic in (
    'Volunteering', 'Starting a chapter', 'Donating', 'Press or partnerships', 'Something else'
  )),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index contact_messages_created_at_idx on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- Senders can only fill in these four columns (not the id or the date).
revoke all on public.contact_messages from anon, authenticated;
grant insert (name, email, topic, message) on public.contact_messages to anon, authenticated;
grant select, delete on public.contact_messages to authenticated;

create policy "Anyone can send a message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (char_length(message) between 1 and 2000);

create policy "Officers read messages"
  on public.contact_messages for select
  to authenticated
  using (exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'officer'
  ));

create policy "Officers delete messages"
  on public.contact_messages for delete
  to authenticated
  using (exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'officer'
  ));


-- ── Plushie requests from shelters ───────────────────────────────────────

create table public.plushie_requests (
  id uuid primary key default gen_random_uuid(),
  organization text not null check (char_length(organization) between 1 and 200),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 200 and email like '%_@_%'),
  children integer not null check (children between 1 and 10000),
  ages text not null check (ages in ('Under 3', '3–7', '8–12', 'Mixed ages')),
  -- Only officers see the city. It's never shown on the site.
  city text not null check (char_length(city) between 1 and 100),
  notes text check (char_length(notes) <= 2000),
  created_at timestamptz not null default now()
);

create index plushie_requests_created_at_idx on public.plushie_requests (created_at desc);

alter table public.plushie_requests enable row level security;

revoke all on public.plushie_requests from anon, authenticated;
grant insert (organization, name, email, children, ages, city, notes) on public.plushie_requests to anon, authenticated;
grant select, delete on public.plushie_requests to authenticated;

create policy "Anyone can send a request"
  on public.plushie_requests for insert
  to anon, authenticated
  with check (children between 1 and 10000);

create policy "Officers read requests"
  on public.plushie_requests for select
  to authenticated
  using (exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'officer'
  ));

create policy "Officers delete requests"
  on public.plushie_requests for delete
  to authenticated
  using (exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'officer'
  ));
