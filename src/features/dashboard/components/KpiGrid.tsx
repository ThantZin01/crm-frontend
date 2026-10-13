import React from 'react';
import { Building2, Users, Calendar, AlertTriangle, RotateCcw } from 'lucide-react';
import { useDashboardKpis } from '../hooks/useDashboardKpis';
import { KpiCard } from './KpiCard';

export const KpiGrid: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useDashboardKpis();

  if (isError) {
    return (
      <div className="rounded-xl border border-[var(--warning)] bg-[var(--warning-bg)] p-5 text-center shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <AlertTriangle className="h-7 w-7 text-[var(--warning)]" />
          <p className="mt-2 text-sm font-semibold text-[var(--warning)]">Failed to load KPI metrics</p>
          <p className="mt-1 text-xs text-[var(--warning)] opacity-85">
            {error instanceof Error ? error.message : 'Please check connection or backend service'}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--warning)] shadow-xs transition hover:opacity-90 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retry KPIs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Accounts"
        value={data?.totalAccounts}
        icon={Building2}
        isLoading={isLoading}
        helperText="Total target companies"
      />
      <KpiCard
        label="People named"
        value={data?.peopleNamed}
        icon={Users}
        isLoading={isLoading}
        helperText="Identified key stakeholders"
      />
      <KpiCard
        label="Meetings"
        value={data?.meetings}
        icon={Calendar}
        isLoading={isLoading}
        helperText="Executive discussions scheduled"
      />
      <KpiCard
        label="Overdue"
        value={data?.overdueCount}
        icon={AlertTriangle}
        isWarning={true}
        isLoading={isLoading}
        helperText="Action items requiring attention"
      />
    </div>
  );
};
