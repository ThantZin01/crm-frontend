import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useDashboardFilters } from '../../features/dashboard/hooks/useDashboardFilters';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { filters, setBusinessLine } = useDashboardFilters();

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans antialiased text-[var(--text)]">
      {/* Sidebar - fixed on left */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area - offset by sidebar width on desktop */}
      <div className="flex min-h-screen flex-col md:pl-64">
        <Topbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          businessLine={filters.businessLine || 'All lines'}
          onBusinessLineChange={setBusinessLine}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
