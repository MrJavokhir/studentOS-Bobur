import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These must be set in your environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * Sign in with Google OAuth
 * Redirects user to Google sign-in page
 */
export const signInWithGoogle = async () => {
  // Dynamically build redirect URL based on current origin
  const redirectTo = `${window.location.origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline', // Request refresh token
        prompt: 'consent', // Always prompt for account selection
      },
    },
  });

  if (error) {
    console.error('[Supabase] Google OAuth error:', error);
    throw error;
  }

  return data;
};

/**
 * Get current Supabase session
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('[Supabase] Get session error:', error);
    throw error;
  }
  return data.session;
};

/**
 * Sign out from Supabase
 */
export const signOutSupabase = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('[Supabase] Sign out error:', error);
    throw error;
  }
};

export default supabase;
