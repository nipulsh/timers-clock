import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `${process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL}`;
const supabaseKey = `${process.env.EXPO_PUBLIC_SPUABASE_API_KEY}`;

export const supabase = createClient(supabaseUrl, supabaseKey);
