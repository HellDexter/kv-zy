
import { createClient } from '@supabase/supabase-js';

// POZOR: Nahraďte tyto hodnoty svými údaji ze Supabase (Settings -> API)
// Pro lokální vývoj je ideální dát je do .env souboru (VITE_SUPABASE_URL, atd.)
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://vas-projekt.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'vas-anon-klic';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
