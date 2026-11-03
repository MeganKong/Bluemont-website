// Owner: Megan (built by Adhya, assignment 1). The sign-up page at "/sign-up".
//
// What this page will do (month 1 build plan):
// - Create an account; volunteers under 18 give a parent email for consent.
// Done when: sign-up takes under 3 minutes and consent is recorded.
//
// Assignment 1 asks only for first name, school, email and password. Parent
// consent is not built yet.
import type { Metadata } from "next";
import Link from "next/link";
import { AuthPage } from "../auth-page";
import { SignUpForm } from "./sign-up-form";
import { textLink } from "../_styles";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <AuthPage
      eyebrow="Volunteer"
      title={
        <>
          Join <em>Bluemont.</em>
        </>
      }
      lead="Free crochet lessons and kits for teens 13 and up. It takes about two minutes."
      below={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className={textLink}>
            Sign in →
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthPage>
  );
}
