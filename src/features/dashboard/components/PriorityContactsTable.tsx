import React from 'react';
import { Star, Building, ArrowRight, User } from 'lucide-react';
import { WidgetContainer } from '../../../components/common/WidgetContainer';
import { usePriorityContacts } from '../hooks/usePriorityContacts';

export const PriorityContactsTable: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = usePriorityContacts();

  const isEmpty = !isLoading && !isError && (!data || data.length === 0);

  return (
    <WidgetContainer
      title="Top Priority Contacts"
      subtitle="Tier 1 leads requiring senior executive engagement"
      headerAction={
        <div className="flex items-center gap-1.5 text-xs text-[var(--text)] opacity-60">
          <Star className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>{data ? `${data.length} Leads` : ''}</span>
        </div>
      }
      isLoading={isLoading}
      isError={isError}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No top priority contacts match the current criteria."
      onRetry={() => refetch()}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--background)] text-[var(--text)] opacity-60">
              <th className="pb-3 font-semibold">Contact</th>
              <th className="pb-3 font-semibold">Company</th>
              <th className="pb-3 font-semibold">Relationship</th>
              <th className="pb-3 font-semibold">Next Step</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--background)]">
            {data?.slice(0, 8).map((contact) => {
              const isHot = contact.relationship_status === 'HOT';
              return (
                <tr
                  key={contact.id}
                  className="transition-colors hover:bg-[var(--background)]/40"
                >
                  {/* Name & Title */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--background)] text-[var(--primary)] font-semibold text-[11px]">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[var(--text)]">{contact.name}</p>
                        {contact.title && (
                          <p className="truncate text-[11px] text-[var(--text)] opacity-65">
                            {contact.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1.5 text-[var(--text)] opacity-90">
                      <Building className="h-3 w-3 shrink-0 opacity-50" />
                      <span className="truncate">{contact.company_name || 'Independent'}</span>
                    </div>
                  </td>

                  {/* Relationship Status Badge */}
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        isHot
                          ? 'border border-[var(--warning)] bg-[var(--warning-bg)] text-[var(--warning)]'
                          : 'bg-[var(--background)] text-[var(--accent)] font-semibold'
                      }`}
                    >
                      {contact.relationship_status}
                    </span>
                  </td>

                  {/* Next Step */}
                  <td className="py-3 max-w-xs">
                    <div className="flex items-center gap-1.5 text-[var(--text)] opacity-85">
                      <ArrowRight className="h-3 w-3 shrink-0 text-[var(--accent)]" />
                      <span className="truncate">{contact.next_step || 'Awaiting initial outreach'}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WidgetContainer>
  );
};
