
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/contexts/LanguageContext';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        // Check if supabase client is available
        if (!supabase) {
          console.warn('Supabase client not available, skipping auth initialization');
          setLoading(false);
          return;
        }
        
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    let authListener: { subscription: { unsubscribe: () => void } } = { 
      subscription: { unsubscribe: () => {} } 
    };
    
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event, session);
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          
          // Handle redirect after auth state change
          if (event === 'SIGNED_IN') {
            navigate('/app/dashboard');
          } else if (event === 'SIGNED_OUT') {
            navigate('/');
          }
        }
      );
      
      // Properly type the data returned from onAuthStateChange
      authListener = { subscription: data.subscription };
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      console.warn('Cannot sign in: Supabase client not available');
      return;
    }
    
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: t('login_failed'),
          description: error.message || t('invalid_credentials'),
          variant: 'destructive',
        });
        throw error;
      }
      
      toast({
        title: t('login_successful'),
        description: t('welcome_back'),
      });
      
      setSession(data.session);
      setUser(data.user);
      navigate('/app/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      console.warn('Cannot sign up: Supabase client not available');
      return;
    }
    
    try {
      const { error, data } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        toast({
          title: t('signup_failed'),
          description: error.message || t('signup_error'),
          variant: 'destructive',
        });
        throw error;
      }
      
      toast({
        title: t('signup_successful'),
        description: t('check_email_for_confirmation'),
      });
      
      // If email confirmation is disabled, we might have a session already
      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        navigate('/app/dashboard');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
    }
  };

  const signOut = async () => {
    if (!supabase) {
      console.warn('Cannot sign out: Supabase client not available');
      return;
    }
    
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      
      toast({
        title: t('logout'),
        description: t('logout'),
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
