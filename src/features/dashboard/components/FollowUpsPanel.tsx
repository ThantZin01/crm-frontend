import React, { useState, useMemo } from 'react';
import { WidgetContainer } from '../../../components/common/WidgetContainer';
import { useFollowUps } from '../hooks/useFollowUps';
import type { FollowUpCategory, FollowUpDTO } from '../../../types/dashboard';
import { Calendar, User, Building, AlertCircle } from 'lucide-react';

const TABS: { id: FollowUpCategory; label: string }[] = [
  { id: 'OVERDUE', label: 'Overdue' },
  { id: 'TODAY', label: 'Today' },
  { id: 'THIS_WEEK', label: 'This week' },
];

export const FollowUpsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FollowUpCategory>('OVERDUE');
  const { data, isLoading, isError, error, refetch } = useFollowUps();

  const tabCounts = useMemo(() => {
    const counts: Record<FollowUpCategory, number> = {
      OVERDUE: 0,
      TODAY: 0,
      THIS_WEEK: 0,
    };
    if (data) {
      data.forEach((item) => {
        if (item.status_category in counts) {
          counts[item.status_category]++;
        }
      });
    }
    return counts;
  }, [data]);

  const filteredItems = useMemo(() => {
    if (!data) return [];
    const items = data.filter((item) => item.status_category === activeTab);
    return items.sort((a, b) => {
      // Overdue: oldest first (earliest calendar date first)
      // Today / This week: soonest first (earliest calendar date first)
      if (a.due_date !== b.due_date) {
        return a.due_date.localeCompare(b.due_date);
      }
      return a.contact_name.localeCompare(b.contact_name);
    });
  }, [data, activeTab]);

  const isEmpty = !isLoading && !isError && (!data || data.length === 0);

  return (
    <WidgetContainer
      title="Follow-ups"
      subtitle="Scheduled interactions and critical next steps"
      className="h-[430px] lg:h-[430px] flex flex-col"
      headerAction={
        <div className="flex items-center gap-1 rounded-lg bg-[var(--background)] p-1 text-xs font-semibold">
          {TABS.map((tab) => {
            const count = tabCounts[tab.id];
            const isActive = activeTab === tab.id;
            const isOverdueTab = tab.id === 'OVERDUE';

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-all cursor-pointer ${
                  isActive
                    ? isOverdueTab
                      ? 'bg-[var(--warning-bg)] text-[var(--warning)] font-bold shadow-xs'
                      : 'bg-[var(--surface)] text-[var(--text)] font-bold shadow-xs'
                    : 'text-[var(--text)] opacity-70 hover:opacity-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isOverdueTab
                      ? 'bg-[var(--warning)] text-[var(--surface)]'
                      : isActive
                      ? 'bg-[var(--primary)] text-[var(--surface)]'
                      : 'bg-[var(--surface)] text-[var(--text)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      }
      isLoading={isLoading}
      isError={isError}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No follow-up items found."
      onRetry={() => refetch()}
    >
      <div className="mt-1 flex-1 min-h-0 overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-xs text-[var(--text)] opacity-60">
            <Calendar className="h-8 w-8 stroke-1" />
            <p className="mt-2">No follow-ups due in "{TABS.find((t) => t.id === activeTab)?.label}".</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--background)]">
            {filteredItems.map((item: FollowUpDTO) => {
              const isOverdue = item.status_category === 'OVERDUE';

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 py-3 transition-colors hover:bg-[var(--background)]/40 sm:flex-row sm:items-center sm:justify-between px-2 rounded-lg"
                >
                  {/* Contact & Company */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--background)] text-[var(--primary)]">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="truncate text-sm font-semibold text-[var(--text)]">
                          {item.contact_name}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-[var(--text)] opacity-70">
                          <Building className="h-3 w-3" />
                          <span className="truncate">{item.company_name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Item */}
                    <p className="mt-1.5 pl-9 text-xs text-[var(--text)] opacity-90">
                      {item.action}
                    </p>
                  </div>

                  {/* Due Date Badge */}
                  <div className="flex items-center gap-2 pl-9 sm:pl-0 sm:self-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                        isOverdue
                          ? 'bg-[var(--warning-bg)] text-[var(--warning)] border border-[var(--warning)]'
                          : 'bg-[var(--background)] text-[var(--text)]'
                      }`}
                    >
                      {isOverdue && <AlertCircle className="h-3 w-3" />}
                      <Calendar className="h-3 w-3 opacity-60" />
                      <span>{item.due_date}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};
