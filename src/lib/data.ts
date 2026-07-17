import { createClient } from "@supabase/supabase-js";
import type { Etkinlik, Duyuru } from "./types";

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getEtkinlikler(): Promise<Etkinlik[]> {
  const client = db();
  if (!client) return [];
  try {
    const { data } = await client
      .from("etkinlikler")
      .select("*")
      .eq("yayinda", true)
      .order("tarih", { ascending: false });
    return (data as Etkinlik[]) ?? [];
  } catch {
    return [];
  }
}

export async function getDuyurular(): Promise<Duyuru[]> {
  const client = db();
  if (!client) return [];
  try {
    const { data } = await client
      .from("duyurular")
      .select("*")
      .order("tarih", { ascending: false });
    return (data as Duyuru[]) ?? [];
  } catch {
    return [];
  }
}
