import React from 'react';
import { Skeleton } from '../../../components/common/Skeleton';

interface KpiCardProps {
  label: string;
  value?: number | string;
  icon: React.ComponentType<{ className?: string }>;
  isWarning?: boolean;
  isLoading?: boolean;
  helperText?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  icon: Icon,
  isWarning = false,
  isLoading = false,
  helperText,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-between rounded-xl bg-[var(--surface)] p-5 shadow-sm border border-[var(--background)]">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="mt-2 h-3 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl p-5 shadow-sm transition-all duration-150 ${
        isWarning
          ? 'border border-[var(--warning)] bg-[var(--warning-bg)] text-[var(--warning)]'
          : 'border border-[var(--background)] bg-[var(--surface)] text-[var(--text)]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold tracking-wider uppercase ${
            isWarning ? 'text-[var(--warning)] opacity-90' : 'text-[var(--text)] opacity-70'
          }`}
        >
          {label}
        </span>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            isWarning
              ? 'bg-[var(--surface)] text-[var(--warning)] shadow-xs'
              : 'bg-[var(--background)] text-[var(--primary)]'
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4">
        <div
          className={`text-3xl font-extrabold tracking-tight ${
            isWarning ? 'text-[var(--warning)]' : 'text-[var(--text)]'
          }`}
        >
          {typeof value === 'number' ? value.toLocaleString() : value ?? '0'}
        </div>
        {helperText && (
          <p
            className={`mt-1 text-xs ${
              isWarning ? 'text-[var(--warning)] opacity-90' : 'text-[var(--text)] opacity-60'
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};
