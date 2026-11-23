# Set up the email sender (before the pilot)

**Owner:** Megan. **Time:** about 30 minutes. **No code.**

## Why this matters
Supabase's built-in email only reaches people on the Supabase team. Without this setup, real volunteers never get the "Confirm your email" or "Reset your password" message, so they can't finish signing up.

## The plan
We'll send these emails from the foundation's own Google Workspace account (`@bluemont-inc.com`). It's free and needs no new accounts. The domain is already set up to send mail through Google.

Never paste the app password into chat, a document, or the code. It goes only into the Supabase field in step 3.

---

## 1. Pick the sending account and make an app password (Google)
1. Choose a real Workspace account to send from, for example the one behind `support@bluemont-inc.com`. Replies will go there, so pick one an officer reads.
2. Sign in as that account and turn on **2-Step Verification**: myaccount.google.com → Security.
3. Go to **myaccount.google.com/apppasswords**. Make an app password named "Supabase" and copy the 16 letters.
   - If the page says app passwords aren't available, the Workspace admin needs to allow them. In the Admin console, go to Security → Authentication → 2-Step Verification, and make sure it's allowed for this account.

## 2. Turn on DKIM (Google + Wix, one time)
DKIM is a signature that tells inboxes "this mail really came from bluemont-inc.com". It keeps the emails out of spam. Right now the domain has no DKIM key.
1. In the Google **Admin console**, go to Apps → Google Workspace → Gmail → **Authenticate email**. Then click **Generate new record** (2048-bit, prefix `google`).
2. Copy the record. In **Wix**, go to Domains → bluemont-inc.com → Manage DNS records, and add a **TXT** record:
   - host: `google._domainkey`
   - value: the long text Google gave you
3. Wait about an hour, then click **Start authentication** back in the Google Admin console.

## 3. Connect Supabase to Gmail
Supabase dashboard → the Bluemont project → **Authentication → Emails → SMTP Settings** → turn on **Enable custom SMTP**.

| Field | Value |
|---|---|
| Sender email | the account from step 1, e.g. `support@bluemont-inc.com` |
| Sender name | `Bluemont Children Foundation` |
| Host | `smtp.gmail.com` |
| Port | `587` |
| Username | the same full email address |
| Password | the 16-letter app password |

Save.

## 4. Raise the email limit
Supabase allows only 30 emails an hour once you use your own sender. Go to **Authentication → Rate Limits** and set "emails sent per hour" to **100**. That's plenty for the pilot. Google allows about 2,000 a day.

## 5. Check the website address
Go to **Authentication → URL Configuration**:
- **Site URL:** `https://bluemontfoundation.vercel.app`
- **Redirect URLs:** add `https://bluemontfoundation.vercel.app/**` and `http://localhost:3000/**`

## 6. Use the Bluemont email templates
Go to **Authentication → Emails → Templates**:
- **Confirm sign up:**
  - subject: `Confirm your Bluemont volunteer account`
  - body: paste all of `supabase/templates/confirm-signup.html`
- **Reset password:**
  - subject: `Reset your Bluemont password`
  - body: paste all of `supabase/templates/reset-password.html`

These links work even if someone signs up on a laptop and opens the email on their phone. Supabase's default links don't, and show "That link didn't work".

They always open the **live** site. When you test on your computer (localhost), the link takes you to the live site. That's expected.

## 7. Test it
1. On the live site, sign up with an email that is **not** on the Supabase team (a personal Gmail works).
2. The email should arrive within a minute, in the inbox, not spam. It should say "Welcome, [first name]!". Open it on your **phone** and tap **Confirm my email**. You should land on the volunteer dashboard.
3. Sign out. Use **Forgot password** on the sign-in page, and check that the reset email arrives and opens "/reset-password".
4. Tick "email sender" on issue #12 and on #4.

## If something goes wrong
- **No email arrives:** look in Supabase → Logs → Auth for an SMTP error.
  - "Username and Password not accepted" means the app password is wrong, or 2-Step Verification is off.
- **The email lands in spam:** finish step 2 (DKIM) and wait a day.
- **The link says "That link didn't work":** the link was already used or is over an hour old. Ask for a new one. If it happens every time, check that the template was pasted in full (step 6) and the Site URL is right (step 5).
