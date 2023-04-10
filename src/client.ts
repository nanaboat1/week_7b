import { SupabaseClient, createClient } from "@supabase/supabase-js";

 const CONFIG = { 
    URL : 'https://wlcdvremchslrjxhrrmw.supabase.co',
    API_KEY : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsY2R2cmVtY2hzbHJqeGhycm13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwODAwNTEsImV4cCI6MTk5NjY1NjA1MX0.RQAy9ldLm1eT4cuUG793Ufkxx7RS5orciNunhsS_soo'
};

export const supabase : SupabaseClient = createClient(CONFIG.URL, CONFIG.API_KEY); 

