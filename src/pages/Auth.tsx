
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { LucideLoader2 } from 'lucide-react';

type AuthFormData = {
  email: string;
  password: string;
};

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  
  // Determine initial tab based on URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location]);

  const loginForm = useForm<AuthFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<AuthFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // Redirect if user is already logged in
    if (user && !authLoading) {
      navigate('/app/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password);
    } finally {
      setIsLoading(false);
    }
  };

  const switchTab = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    // Update URL without refreshing
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', tab);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-rose-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md py-16">
      <Card className="bg-white/90 backdrop-blur-sm border-rose-gold-100 shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {activeTab === 'login' ? t('login') : t('signup')}
          </CardTitle>
          <CardDescription className="text-center">
            {activeTab === 'login' 
              ? t('enter_credentials_to_access') 
              : t('create_account_to_start')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => switchTab(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">{t('login')}</TabsTrigger>
              <TabsTrigger value="signup">{t('signup')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">{t('email')}</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    {...loginForm.register('email', { required: true })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">{t('password')}</Label>
                    <a href="#" className="text-xs text-rose-gold-600 hover:underline">
                      {t('forgot_password')}
                    </a>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    {...loginForm.register('password', { required: true })}
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-rose-gold-500 hover:bg-rose-gold-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {t('login')}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <span className="text-foreground/70">{t('dont_have_account')} </span>
                <button 
                  onClick={() => switchTab('signup')}
                  className="text-rose-gold-600 hover:underline font-medium"
                >
                  {t('signup')}
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t('email')}</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    {...signupForm.register('email', { required: true })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t('password')}</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    {...signupForm.register('password', { required: true, minLength: 6 })}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-foreground/70">{t('password_requirements')}</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-rose-gold-500 hover:bg-rose-gold-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {t('signup')}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <span className="text-foreground/70">{t('already_have_account')} </span>
                <button 
                  onClick={() => switchTab('login')}
                  className="text-rose-gold-600 hover:underline font-medium"
                >
                  {t('login')}
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
