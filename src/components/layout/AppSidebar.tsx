
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  MessageSquare, 
  Utensils, 
  Settings, 
  User,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, isActive, isCollapsed, onClick }: NavItemProps) => (
  <Link to={to} className="w-full" onClick={onClick}>
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start gap-3 px-3 py-6", 
        isActive 
          ? "bg-rose-gold-100 text-rose-gold-900 hover:bg-rose-gold-200" 
          : "hover:bg-rose-gold-50 text-foreground/70 hover:text-foreground",
        isCollapsed ? "flex flex-col items-center text-xs h-20" : "h-12"
      )}
    >
      {icon}
      <span className={cn(isCollapsed ? "text-center" : "")}>
        {isCollapsed ? label.split(' ')[0] : label}
      </span>
    </Button>
  </Link>
);

const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = useIsMobile();

  useEffect(() => {
    // Close mobile sidebar when route changes
    setMobileOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { 
      to: '/app/dashboard', 
      icon: <LayoutDashboard size={isCollapsed ? 24 : 20} />, 
      label: 'Dashboard', 
      isActive: pathname === '/app/dashboard' 
    },
    { 
      to: '/app/meals', 
      icon: <Utensils size={isCollapsed ? 24 : 20} />, 
      label: 'Meals Log', 
      isActive: pathname === '/app/meals' 
    },
    { 
      to: '/app/chat', 
      icon: <MessageSquare size={isCollapsed ? 24 : 20} />, 
      label: 'Nutrition Chat', 
      isActive: pathname === '/app/chat' 
    },
  ];

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <div className="fixed left-4 top-[72px] z-50">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-white shadow-sm border border-rose-gold-100"
              >
                <Menu size={20} />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-12 w-[80%] max-w-[280px] bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col h-full">
                <div className="flex-1 py-8 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <NavItem 
                      key={item.to} 
                      to={item.to} 
                      icon={item.icon} 
                      label={item.label} 
                      isActive={item.isActive} 
                      isCollapsed={false}
                      onClick={() => setMobileOpen(false)}
                    />
                  ))}
                </div>
                <div className="border-t border-rose-gold-100 pt-4 pb-8">
                  <NavItem 
                    to="/app/settings" 
                    icon={<Settings size={20} />} 
                    label="Settings" 
                    isActive={pathname === '/app/settings'} 
                    isCollapsed={false}
                    onClick={() => setMobileOpen(false)}
                  />
                  <NavItem 
                    to="/app/profile" 
                    icon={<User size={20} />} 
                    label="Profile" 
                    isActive={pathname === '/app/profile'} 
                    isCollapsed={false}
                    onClick={() => setMobileOpen(false)}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside 
      className={cn(
        "h-screen fixed left-0 top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm flex flex-col transition-all duration-300 ease-in-out border-r border-rose-gold-100",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("flex items-center justify-between py-6", isCollapsed ? "px-0" : "px-4")}>
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-2 transition-opacity", 
            isCollapsed ? "opacity-0 pointer-events-none w-0" : "opacity-100"
          )}
        >
          <div className="bg-rose-gold-500 text-white p-2 rounded-lg">
            <Utensils size={20} />
          </div>
          <span className="text-lg font-semibold tracking-tight">BeastCal</span>
        </Link>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar} 
          className={cn(
            "rounded-full h-8 w-8 p-0 hover:bg-rose-gold-100", 
            isCollapsed ? "mx-auto" : ""
          )}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <div className="flex-1 px-2 py-8 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem 
            key={item.to} 
            to={item.to} 
            icon={item.icon} 
            label={item.label} 
            isActive={item.isActive} 
            isCollapsed={isCollapsed} 
          />
        ))}
      </div>

      <div className="border-t border-rose-gold-100 mt-auto">
        <div className="px-2 py-4">
          <NavItem 
            to="/app/settings" 
            icon={<Settings size={isCollapsed ? 24 : 20} />} 
            label="Settings" 
            isActive={pathname === '/app/settings'} 
            isCollapsed={isCollapsed} 
          />
          <NavItem 
            to="/app/profile" 
            icon={<User size={isCollapsed ? 24 : 20} />} 
            label="Profile" 
            isActive={pathname === '/app/profile'} 
            isCollapsed={isCollapsed} 
          />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
