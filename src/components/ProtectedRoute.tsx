
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If Supabase is not available but we're in a protected route,
    // we'll still allow access in development environments
    const isDevEnvironment = import.meta.env.DEV;
    const supabaseUnavailable = !supabase;
    
    if (!loading) {
      if (!session && !supabaseUnavailable) {
        // Normal case: user not authenticated, redirect to login
        navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname));
      } else if (supabaseUnavailable && isDevEnvironment) {
        // Development environment & Supabase unavailable: show warning in console
        console.warn('Running in dev mode without Supabase. Protected routes are accessible without authentication.');
      }
    }
  }, [session, loading, navigate]);
  
  // While checking auth status, we can return a loading indicator
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-rose-gold-500"></div>
    </div>;
  }
  
  // Allow access if:
  // 1. User is authenticated, OR
  // 2. Supabase is unavailable but we're in development mode
  const isDevEnvironment = import.meta.env.DEV;
  const allowAccess = session || (!supabase && isDevEnvironment);
  
  return allowAccess ? <>{children}</> : null;
};

export default ProtectedRoute;
