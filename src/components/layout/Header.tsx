
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LucideUtensils, LogOut, User, Menu } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslation } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="w-full py-3 md:py-4 px-4 md:px-6 glass fixed top-0 z-50 transition-all duration-300 border-b border-rose-gold-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-rose-gold-500 text-white p-1.5 md:p-2 rounded-lg">
              <LucideUtensils size={isMobile ? 20 : 24} />
            </div>
            <span className="text-lg md:text-xl font-semibold tracking-tight">BeastCal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isLandingPage && (
              <>
                <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
                  {t('features')}
                </a>
                <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
                  {t('how_it_works')}
                </a>
                <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">
                  {t('testimonials')}
                </a>
              </>
            )}
          </nav>

          {/* Mobile Navigation for Landing Page */}
          {isLandingPage && isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="pt-16">
                <nav className="flex flex-col gap-4">
                  <a 
                    href="#features" 
                    className="text-lg p-2 hover:bg-rose-gold-50 rounded-md" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('features')}
                  </a>
                  <a 
                    href="#how-it-works" 
                    className="text-lg p-2 hover:bg-rose-gold-50 rounded-md" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('how_it_works')}
                  </a>
                  <a 
                    href="#testimonials" 
                    className="text-lg p-2 hover:bg-rose-gold-50 rounded-md" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('testimonials')}
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSelector />
            
            {isLandingPage ? (
              user ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <Link to="/app/dashboard">
                    <Button variant="outline" size="sm">
                      {t('dashboard')}
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>{t('logout')}</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t('confirm_logout')}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t('confirm_logout_message')}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout}>{t('confirm')}</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Link to="/auth?tab=login" className="hidden sm:block">
                    <Button variant="outline" className="hidden sm:inline-flex">
                      {t('login')}
                    </Button>
                  </Link>
                  <Link to="/auth?tab=signup">
                    <Button className="bg-rose-gold-500 hover:bg-rose-gold-600 text-white">
                      {isMobile ? t('signup').substring(0, 6) : t('signup')}
                    </Button>
                  </Link>
                </>
              )
            ) : (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>{t('logout')}</span>
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t('confirm_logout')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {t('confirm_logout_message')}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                          <AlertDialogAction onClick={handleLogout}>{t('confirm')}</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/">
                  <Button variant="outline" size="sm">
                    {t('back_to_home')}
                  </Button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
