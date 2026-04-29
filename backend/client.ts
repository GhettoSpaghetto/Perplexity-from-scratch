import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient() {
  return createClient(
    
    Bun.env.SUPABASE_URL!,
    Bun.env.SUPABASE_API_SECRET!
  )
}
