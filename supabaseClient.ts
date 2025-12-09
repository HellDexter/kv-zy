
import { createClient } from '@supabase/supabase-js';

// URL vašeho projektu
const supabaseUrl = 'https://eowcpeqfujcugfcjrhze.supabase.co';

// Váš PUBLIC (anon) klíč - tento je bezpečný pro použití v prohlížeči
const supabaseAnonKey = 'sb_publishable_zPGy3yn2OV6Z2Ha6ONoC3A_aKD1flKP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
