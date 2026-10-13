import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  TrendingUp,
  Clock,
  X,
  BriefcaseBusiness,
} from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../../constants/app';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Accounts', to: '/accounts', icon: Building2 },
  { name: 'Contacts', to: '/contacts', icon: Users },
  { name: 'Pipeline', to: '/pipeline', icon: TrendingUp },
  { name: 'Follow-ups', to: '/follow-ups', icon: Clock },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onClose();
          }}
          className="fixed inset-0 z-40 bg-[var(--primary-dark)] opacity-50 md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-64 h-screen flex-col bg-[var(--primary-dark)] text-[var(--surface)] transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--surface)]/10 px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--surface)] shadow">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-[var(--surface)]">
                <span>{APP_NAME}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </div>
              <p className="text-[10px] tracking-widest text-[var(--surface)] opacity-60 uppercase">
                {APP_TAGLINE}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[var(--surface)] opacity-70 hover:opacity-100 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1.5 px-3 py-6" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--primary)] text-[var(--surface)] shadow-sm'
                      : 'text-[var(--surface)] opacity-75 hover:bg-[var(--surface)]/10 hover:opacity-100'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="border-t border-[var(--surface)]/10 p-4">
          <div className="rounded-lg bg-[var(--surface)]/5 p-3 text-xs">
            <p className="font-semibold text-[var(--surface)]">Consulting Portal</p>
            <p className="mt-0.5 text-[var(--surface)] opacity-60">Spring REST &bull; v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};
