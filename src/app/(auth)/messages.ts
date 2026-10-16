// Owner: Sophia (built by Adhya, assignment 1). Turns Supabase's technical
// errors into plain words a 14-year-old would understand.
import type { AuthError } from "@supabase/supabase-js";

export function friendlyError(error: AuthError): string {
  switch (error.code) {
    case "invalid_credentials":
      return "That email and password don't match. Check them and try again.";
    case "email_not_confirmed":
      return "Please click the link we emailed you before signing in. Check your spam folder too.";
    case "user_already_exists":
    case "email_exists":
      return "There's already an account with this email. Try signing in instead.";
    case "weak_password":
      return "That password is too easy to guess. Try a longer one with letters and numbers.";
    case "email_address_invalid":
      return "That email address doesn't look right. Check it for typos.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "Too many tries. Please wait a few minutes and try again.";
  }
  // No internet, or Supabase is down.
  if (error.status === 0 || error.name === "AuthRetryableFetchError") {
    return "We couldn't reach the server. Check your internet and try again.";
  }
  return "Something went wrong. Please try again in a minute.";
}
