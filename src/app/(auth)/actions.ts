"use server";
// Owner: Sophia (built by Adhya, assignment 1). These run on the server when
// someone submits the sign-up, sign-in or sign-out form. Passwords go straight
// to Supabase and are never stored by our code.
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { friendlyError } from "./messages";

// What the form shows after a submit: an error, or (sign-up) "check your email".
export type FormState = { error?: string; sentTo?: string };

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
    return { error: "Please enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: friendlyError(error) };
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
}
