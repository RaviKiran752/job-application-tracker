
import React from 'react';
import { 
  Home, 
  BriefcaseBusiness, 
  FileText, 
  BarChart, 
  Settings, 
  UserCircle, 
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Applications', href: '/applications', icon: BriefcaseBusiness },
  { name: 'Resume Assistant', href: '/resume-assistant', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Profile', href: '/profile', icon: UserCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [currentPath, setCurrentPath] = React.useState('/');

  React.useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" 
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out md:relative md:z-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className={cn("flex items-center", !open && "md:justify-center md:w-full")}>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-brand-600 flex items-center justify-center">
                <BriefcaseBusiness className="h-5 w-5 text-white" />
              </div>
              {open && <span className="ml-2 text-xl font-bold text-gray-900">JobTrack</span>}
            </div>
          </div>
          
          {/* Toggle sidebar button (only shows on desktop) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="hidden md:flex"
          >
            {open ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = currentPath === item.href;
            
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  !open && "md:justify-center"
                )}
              >
                <item.icon 
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-brand-600" : "text-gray-400 group-hover:text-gray-500",
                    !open && "md:mr-0"
                  )}
                />
                {open && <span>{item.name}</span>}
              </a>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="flex border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            {open && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">User Name</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
