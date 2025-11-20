import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
            signUp: () => Promise.reject(new Error('Supabase not configured')),
            signOut: () => Promise.resolve({ error: null }),
        },
        from: () => ({
            select: () => ({ order: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }) }),
            insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }) }),
            update: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase not configured') }) }),
            delete: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase not configured') }) }),
        })
    };
