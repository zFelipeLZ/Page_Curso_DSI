import { createClient } from '@supabase/supabase-js';

// Usamos as variáveis de ambiente do Vite.
// No Vercel, você deve configurar essas mesmas variáveis lá no painel.
// Localmente, você cria um arquivo .env na raiz do projeto.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sua-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sua-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
