-- Owner: Megan (built by Adhya). Answers one yes-or-no question: "does an
-- account use this email?". The sign-in page uses it to say "No account found
-- with that email" instead of a vague error.
--
-- Only the website's server can ask, using the secret key (service_role).
-- Browsers can't call it, and it never hands out the list of accounts.

create function public.account_exists(check_email text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from auth.users where lower(email) = lower(trim(check_email))
  );
$$;

revoke execute on function public.account_exists(text) from public, anon, authenticated;
grant execute on function public.account_exists(text) to service_role;
