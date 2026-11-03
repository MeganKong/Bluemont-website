"use server";
// Owner: Nika (OK'd by Megan). These run on the server when someone sends the
// contact form or the plushie request form. Each one checks the answers,
// saves them for officers (the "Messages" officer page), and emails them to
// support@ once email is set up (see sendEmail below). The database's
// privacy rules check again (supabase/migrations/*_plushie_requests.sql).
import { createClient } from "@/lib/supabase/server";
import { childAges, contactTopics } from "./options";

// What a form shows after sending: an error, or that it worked.
export type FormState = { error?: string; done?: boolean };

const tryAgain = "Something went wrong and it wasn't sent. Please try again, or email support@bluemont-inc.com.";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function looksLikeEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Spam robots fill in every box, including a hidden "website" box that
// people never see. If it's filled in, pretend it worked and save nothing.
function isRobot(formData: FormData) {
  return field(formData, "website") !== "";
}

export async function sendContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isRobot(formData)) return { done: true };
  const name = field(formData, "name");
  const email = field(formData, "email");
  const topic = field(formData, "topic");
  const message = field(formData, "message");

  if (!name || !email || !message) return { error: "Please fill in your name, email and message." };
  if (!looksLikeEmail(email)) return { error: "That email doesn't look right. Please check it." };
  if (!contactTopics.includes(topic)) return { error: "Please choose a topic." };
  if (name.length > 100) return { error: "Please keep your name under 100 characters." };
  if (message.length > 2000) return { error: "Your message is a bit long. Please keep it under 2,000 characters." };

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({ name, email, topic, message });
  if (error) return { error: tryAgain };

  await sendEmail(`Contact form: ${topic}`, `From: ${name} <${email}>\n\n${message}`, email);
  return { done: true };
}

export async function sendRequest(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isRobot(formData)) return { done: true };
  const organization = field(formData, "organization");
  const name = field(formData, "name");
  const email = field(formData, "email");
  const children = Number(field(formData, "children"));
  const ages = field(formData, "ages");
  const city = field(formData, "city");
  const notes = field(formData, "notes");

  if (!organization || !name || !email || !city) {
    return { error: "Please fill in your organization, name, email and city." };
  }
  if (!looksLikeEmail(email)) return { error: "That email doesn't look right. Please check it." };
  if (!Number.isInteger(children) || children < 1 || children > 10000) {
    return { error: "Please enter about how many children, as a number (like 25)." };
  }
  if (!childAges.includes(ages)) return { error: "Please choose the children's ages." };
  if (organization.length > 200 || name.length > 100 || city.length > 100) {
    return { error: "One of your answers is too long. Please shorten it." };
  }
  if (notes.length > 2000) return { error: "Your note is a bit long. Please keep it under 2,000 characters." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("plushie_requests")
    .insert({ organization, name, email, children, ages, city, notes: notes || null });
  if (error) return { error: tryAgain };

  await sendEmail(
    `Plushie request: ${organization}`,
    `From: ${name} <${email}>\nOrganization: ${organization}\nChildren: ${children} (${ages})\nCity: ${city}\n\n${notes}`,
    email,
  );
  return { done: true };
}

// Emails a copy to support@ through Resend (resend.com). It stays off until
// Megan adds RESEND_API_KEY and FORM_EMAIL_FROM (an address on the verified
// bluemont-inc.com domain) in Vercel. The form is already saved by then, so
// if the email fails, nothing is lost.
async function sendEmail(subject: string, text: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.FORM_EMAIL_FROM;
  if (!key || !from) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: "support@bluemont-inc.com", reply_to: replyTo, subject, text }),
    });
  } catch {
    // Saved already; officers will see it on the Messages page.
  }
}
