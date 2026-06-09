import { PUBLIC_CRE8_SUPABASE_URL, PUBLIC_CRE8_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	PUBLIC_CRE8_SUPABASE_URL,
	PUBLIC_CRE8_SUPABASE_ANON_KEY
);