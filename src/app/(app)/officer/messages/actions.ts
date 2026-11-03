"use server";
// Owner: Megan (built by Nika). Deleting a contact message or plushie request
// on the Messages page. Checks the person is an officer, and the database's
// privacy rules check again.
import { refresh } from "next/cache";
import { getMyRole } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";

const tables = { message: "contact_messages", request: "plushie_requests" } as const;

export async function deleteForm(formData: FormData) {
  const kind = String(formData.get("kind")) as keyof typeof tables;
  const id = String(formData.get("id"));
  if (!(kind in tables) || (await getMyRole()) !== "officer") return;

  const supabase = await createClient();
  await supabase.from(tables[kind]).delete().eq("id", id);
  refresh();
}
