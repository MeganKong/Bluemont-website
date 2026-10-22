// Owner: Megan (shared; built by Adhya). A Supabase connection with the
// SECRET key, for the one server job that needs it: "does this email have an
// account?". Only use it in server code. The key is saved as
// SUPABASE_SECRET_KEY (no NEXT_PUBLIC_ in front), so it never reaches browsers.
import { createClient } from "@supabase/supabase-js";

// true or false, or null if we can't tell (the secret key isn't set up yet,
// or Supabase is down). The database answers yes or no; the list of accounts
// never leaves it. See supabase/migrations/*_account_exists.sql.
export async function accountExists(email: string): Promise<boolean | null> {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) return null;

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await admin.rpc("account_exists", { check_email: email });
  return error ? null : data === true;
}
