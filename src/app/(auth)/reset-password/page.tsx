// Owner: Megan (built by Adhya). The new-password page at "/reset-password".
//
// What this page will do:
// - The link in the "reset your password" email opens this page (through
//   /auth/confirm, which signs them in just for this).
// - They type a new password twice, then go to sign in with it.
// Done when: someone who forgot their password can make a new one and sign in.
//
// Opening it without the email link sends people to sign in
// (src/lib/supabase/proxy.ts).
import type { Metadata } from "next";
import { ResetPasswordForm } from "./reset-password-form";
import { card, pageHero, pageTitle } from "../_styles";

export const metadata: Metadata = { title: "New password" };

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-10 sm:py-14">
      <div className={pageHero}>
        <h1 className={pageTitle}>Make a new password</h1>
        <p className="text-lg font-semibold text-ink">Pick something you&apos;ll remember.</p>
      </div>
      <div className={card}>
        <ResetPasswordForm />
      </div>
    </main>
  );
}
