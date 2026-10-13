import React from 'react';
import { Menu, Layers, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopbarProps {
  onToggleSidebar: () => void;
  businessLine: string;
  onBusinessLineChange: (line: string) => void;
}

const businessLines = [
  'All lines',
  'Private Equity',
  'M&A Advisory',
  'Corporate Strategy',
  'Capital Markets',
];

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  businessLine,
  onBusinessLineChange,
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[var(--background)] bg-[var(--surface)] px-4 sm:px-6 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-[var(--text)] opacity-70 hover:opacity-100 hover:bg-[var(--background)] md:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Business line selector */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-md bg-[var(--background)] text-[var(--accent)]">
            <Layers className="h-4 w-4" />
          </div>
          <div className="relative inline-flex items-center">
            <label htmlFor="business-line-select" className="sr-only">
              Business Line
            </label>
            <select
              id="business-line-select"
              value={businessLine}
              onChange={(e) => onBusinessLineChange(e.target.value)}
              className="appearance-none rounded-lg border border-[var(--background)] bg-[var(--surface)] py-1.5 pr-8 pl-3 text-xs sm:text-sm font-semibold text-[var(--text)] shadow-xs transition hover:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
            >
              {businessLines.map((line) => (
                <option key={line} value={line} className="text-[var(--text)] bg-[var(--surface)]">
                  {line}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-[var(--text)] opacity-50" />
          </div>
        </div>
      </div>

      {/* Right side: executive identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--surface)] text-xs font-bold">
            {user?.name ? user.name.split(' ').map((n) => n[0]).join('') : 'EX'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold leading-none text-[var(--text)]">{user?.name || 'Executive User'}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck className="h-3 w-3 text-[var(--accent)]" />
              <span className="text-[10px] text-[var(--text)] opacity-70 font-medium">Partner</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
