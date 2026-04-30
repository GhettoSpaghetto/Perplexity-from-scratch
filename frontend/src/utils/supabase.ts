import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lvwciugcpsexhvjpujlo.supabase.co"!;
const supabaseKey = "sb_publishable_DEblxvH3b2eJjFcIpbVj8Q_DXsqqDmI"!;



export const supabase = createClient(supabaseUrl, supabaseKey);
