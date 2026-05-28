import { createClient } from "@supabase/supabase-js";

export type MarketplaceCategory = {
  id: number;
  name: string;
  count_label: string;
  accent_class: string;
  display_order: number;
};

export type MarketplaceLocation = {
  id: number;
  name: string;
  display_order: number;
};

export type LabourTeam = {
  id: number;
  name: string;
  display_order: number;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabasePublishableKey) &&
  supabaseUrl !== "YOUR_SUPABASE_URL" &&
  supabasePublishableKey !== "YOUR_SUPABASE_PUBLISHABLE_KEY";

export function createSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  return createClient(supabaseUrl!, supabasePublishableKey!);
}
