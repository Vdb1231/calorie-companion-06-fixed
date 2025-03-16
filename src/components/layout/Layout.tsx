
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import AppSidebar from './AppSidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isAppPage = location.pathname.startsWith('/app');
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen flex flex-col bg-gold-gradient">
      <Header />
      
      <div className="flex flex-1 pt-16">
        {isAppPage && <AppSidebar />}
        
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isAppPage && !isMobile ? "ml-64" : "ml-0",
          isAppPage && isMobile ? "ml-0" : "",
          isHomePage ? "px-0" : "px-3 sm:px-4 md:px-8 py-4 md:py-10"
        )}>
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
