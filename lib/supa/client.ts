import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof supabaseUrl !== "string" || typeof supabaseAnonKey !== "string") {
    throw Error();
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
