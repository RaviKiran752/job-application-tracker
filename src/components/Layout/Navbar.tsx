import React from 'react';
import { UserButton } from '@clerk/clerk-react';
import { Menu, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <BellRing className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
