import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { WidgetContainer } from '../../../components/common/WidgetContainer';
import { useDashboardCharts } from '../hooks/useDashboardCharts';

const TIER_COLORS: Record<string, string> = {
  'Tier 1': 'var(--primary)',
  'Tier 2': 'var(--accent)',
  'Tier 3': 'var(--primary-dark)',
};

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: {
    tier: string;
    count: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const item = payload[0];
    return (
      <div className="rounded-lg border border-[var(--background)] bg-[var(--surface)] p-2.5 text-xs shadow-md">
        <p className="font-semibold text-[var(--text)]">{item.payload.tier} Accounts</p>
        <p className="mt-1 text-[var(--text)] opacity-80">
          Count: <span className="font-bold">{item.value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const AccountsByTierChart: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useDashboardCharts();

  const chartData = data?.accountsByTier || [];
  const total = chartData.reduce((acc, curr) => acc + curr.count, 0);
  const isEmpty = !isLoading && !isError && total === 0;

  return (
    <WidgetContainer
      title="Accounts by Tier"
      subtitle="Priority tier distribution across target universe"
      headerAction={
        <div className="flex items-center gap-1.5 text-xs text-[var(--text)] opacity-60">
          <BarChart3 className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span>{total} Accounts</span>
        </div>
      }
      isLoading={isLoading}
      isError={isError}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No accounts tier data available."
      onRetry={() => refetch()}
      className="h-[360px] flex flex-col"
    >
      <div className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="h-[210px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="tier"
                tick={{ fill: 'var(--text)', fontSize: 11 }}
                stroke="var(--background)"
              />
              <YAxis
                tick={{ fill: 'var(--text)', fontSize: 11 }}
                stroke="var(--background)"
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.tier}
                    fill={TIER_COLORS[entry.tier] || 'var(--primary)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Metrics */}
        <div className="flex w-full items-center justify-around border-t border-[var(--background)] pt-3 pb-1 text-xs">
          {chartData.map((entry) => {
            const pct = total > 0 ? Math.round((entry.count / total) * 100) : 0;
            return (
              <div key={entry.tier} className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 font-medium text-[var(--text)]">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: TIER_COLORS[entry.tier] || 'var(--primary)' }}
                  />
                  <span>{entry.tier}</span>
                </div>
                <div className="mt-0.5 text-[11px] text-[var(--text)] opacity-70">
                  <span className="font-semibold text-[var(--text)]">{entry.count}</span> ({pct}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </WidgetContainer>
  );
};
