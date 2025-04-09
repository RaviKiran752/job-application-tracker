
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { AuthenticatedRoute } from '@/contexts/ClerkContext';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  return (
    <AuthenticatedRoute>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthenticatedRoute>
  );
};

export default DashboardLayout;
