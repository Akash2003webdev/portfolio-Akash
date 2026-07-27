import { createClient } from "@supabase/supabase-js";

// IMPORTANT: Create a .env file at project root with these two values
// (get them from your Supabase project: Settings -> API)
//
// VITE_SUPABASE_URL=https://xxxxx.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-public-key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
