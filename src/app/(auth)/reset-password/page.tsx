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
import { AuthPage } from "../auth-page";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = { title: "New password" };

export default function ResetPasswordPage() {
  return (
    <AuthPage
      eyebrow="Your account"
      title={
        <>
          Make a new <em>password.</em>
        </>
      }
      lead="Pick something you'll remember."
    >
      <ResetPasswordForm />
    </AuthPage>
  );
}
