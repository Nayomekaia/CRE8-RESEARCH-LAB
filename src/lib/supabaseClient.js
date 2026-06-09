import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABAS_URL, PUBLIC_SUPABAS_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABAS_URL, PUBLIC_SUPABAS_ANON_KEY);