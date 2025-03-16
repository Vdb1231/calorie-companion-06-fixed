
import { createClient } from '@supabase/supabase-js';

// Set default fallback values in case the environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create the client if we have the required values
export const supabase = (() => {
  try {
    if (supabaseUrl && supabaseKey) {
      const client = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true,
          storageKey: 'beastcal-auth-token',
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
      console.log('Supabase client initialized successfully');
      return client;
    } else {
      console.warn(
        'Supabase URL and/or API key are missing. Supabase functionality will not work correctly. Please set the following environment variables:\n' +
        '- VITE_SUPABASE_URL\n' +
        '- VITE_SUPABASE_ANON_KEY'
      );
      return null;
    }
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
})();
