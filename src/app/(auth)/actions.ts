"use server";
// Owner: Megan (built by Adhya, assignment 1). These run on the server when
// someone submits the sign-up, sign-in, forgot-password, new-password or
// sign-out form. Passwords go straight to Supabase and are never stored by
// our code.
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { accountExists } from "@/lib/supabase/admin";
import { afterSignIn } from "@/lib/destinations";
import { roleOf } from "@/lib/roles";
import { friendlyError } from "./messages";

// What the form shows after a submit: an error (and whether it's "no account"
// so the form can offer "Create an account"), or "check your email".
// "email" refills the email box, so people don't have to type it again.
export type FormState = { error?: string; noAccount?: boolean; sentTo?: string; email?: string };

const noAccount = (email: string): FormState => ({
  error: "No account found with that email.",
  noAccount: true,
  email,
});

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  const firstName = field(formData, "firstName");
  const school = field(formData, "school");
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");

  if (!firstName || !school || !email || !password) {
    return { error: "Please fill in every box." };
  }
  if (firstName.length > 50 || school.length > 100) {
    return { error: "Your name or school is too long. Please shorten it." };
  }
  if (password.length < 6) {
    return { error: "Your password needs at least 6 characters." };
  }

  // The confirmation email links back to this site (localhost or the live site).
  const origin = (await headers()).get("origin");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Saved with the account. Shown as "Welcome, [first name]".
      data: { first_name: firstName, school },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) return { error: friendlyError(error) };
  // When email confirmation is on, Supabase doesn't say "already used" (so
  // strangers can't test which emails have accounts). An empty identities
  // list is its quiet way of saying it.
  if (data.user?.identities?.length === 0) {
    return { error: "There's already an account with this email. Try signing in instead." };
  }
  if (data.session) redirect("/dashboard");
  return { sentTo: email };
}

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password.", email };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Supabase gives the same error for "no account" and "wrong password", so
    // ask our server which one it is.
    if (error.code === "invalid_credentials") {
      const exists = await accountExists(email);
      if (exists === false) return noAccount(email);
      if (exists === true) {
        return { error: "That password isn't right. Try again, or tap “Forgot password?”.", email };
      }
    }
    return { error: friendlyError(error), email };
  }

  // Officers go to the officer dashboard, volunteers to theirs.
  redirect(afterSignIn(await roleOf(supabase, data.user.id), field(formData, "next")));
}

// The "Forgot password?" pop-up: emails a link for making a new password.
export async function requestPasswordReset(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = field(formData, "email");
  if (!email) return { error: "Please enter your email." };

  // If we can't tell (no secret key yet), send anyway: Supabase quietly
  // skips emails that have no account.
  if ((await accountExists(email)) === false) return noAccount(email);

  // The link opens /auth/confirm, which signs them in and opens /reset-password.
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=/reset-password`,
  });

  if (error) return { error: friendlyError(error), email };
  return { sentTo: email };
}

// The /reset-password page: saves the new password, then sends them to sign in.
export async function updatePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 6) {
    return { error: "Your new password needs at least 6 characters." };
  }
  if (password !== confirm) {
    return { error: "The two passwords don't match. Please type them again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: friendlyError(error) };

  // Sign out so they sign in once with the new password.
  await supabase.auth.signOut();
  redirect("/sign-in?reset=done");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
}
