import React from 'react';
import { KpiGrid } from '../features/dashboard/components/KpiGrid';
import { OutreachFunnel } from '../features/dashboard/components/OutreachFunnel';
import { FollowUpsPanel } from '../features/dashboard/components/FollowUpsPanel';
import { RelationshipChart } from '../features/dashboard/components/RelationshipChart';
import { AccountsByTierChart } from '../features/dashboard/components/AccountsByTierChart';
import { DealSideChart } from '../features/dashboard/components/DealSideChart';
import { useDashboardFilters } from '../features/dashboard/hooks/useDashboardFilters';
import { Activity } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { filters } = useDashboardFilters();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)]">
            Executive Dashboard
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-[var(--text)] opacity-70">
            High-level CRM metrics, outreach velocity, and immediate action items
          </p>
        </div>

        {/* Status / Active Business Line Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--background)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--accent)] shadow-xs">
            <Activity className="h-3.5 w-3.5" />
            <span>Scope: {filters.businessLine || 'All lines'}</span>
          </div>
        </div>
      </div>

      {/* 1. KPI Cards Grid */}
      <KpiGrid />

      {/* 2 & 3. Outreach Funnel & Follow-ups Panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OutreachFunnel />
        <FollowUpsPanel />
      </div>

      {/* 4. Charts: Relationship Temperature, Accounts by Tier, Buy-Side vs Sell-Side */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RelationshipChart />
        <AccountsByTierChart />
        <DealSideChart />
      </div>
    </div>
  );
};
