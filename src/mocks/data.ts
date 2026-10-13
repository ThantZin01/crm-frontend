import type {
  Account,
  Contact,
  DashboardKpis,
  FollowUp,
  FollowUpDTO,
  FunnelStage,
  OwnerOption,
} from '../types/dashboard';

export const MOCK_OWNERS: OwnerOption[] = [
  { id: 'usr-1', name: 'Sarah Jenkins' },
  { id: 'usr-2', name: 'Michael Chang' },
  { id: 'usr-3', name: 'Elena Rostova' },
  { id: 'usr-4', name: 'David Adeleke' },
  { id: 'usr-5', name: 'Sophia Patel' },
];

export const MOCK_BUSINESS_LINES = [
  'All lines',
  'Private Equity',
  'M&A Advisory',
  'Corporate Strategy',
  'Capital Markets',
];

export const MOCK_COUNTRIES = [
  'United States',
  'United Kingdom',
  'Germany',
  'Singapore',
  'France',
  'Japan',
  'Switzerland',
  'Canada',
  'Australia',
  'Netherlands',
];

const companyPrefixes = [
  'Apex', 'Vanguard', 'Beacon', 'Horizon', 'Summit', 'Sterling', 'Northbridge', 'Meridian',
  'Pinnacle', 'Catalyst', 'Omni', 'Bluecrest', 'Silverline', 'Frontier', 'Aegis', 'Nexus',
  'Valence', 'Crestview', 'Elevation', 'Kensington', 'Ironwood', 'Solomon', 'Ascent', 'Trident',
  'Atlas', 'Bridgepoint', 'Redwood', 'Charter', 'Bravura', 'Aventine', 'Cobalt', 'Monarch',
  'Providence', 'Orion', 'Strata', 'Ardent', 'Everest', 'Helios', 'Veritas', 'Paladin'
];

const companySuffixes = [
  'Capital', 'Partners', 'Holdings', 'Advisors', 'Ventures', 'Group', 'Management', 'Equity',
  'Global', 'Investments', 'Consulting', 'Financial', 'Associates', 'Strategies'
];

// Generate exactly 134 accounts
export const MOCK_ACCOUNTS: Account[] = Array.from({ length: 134 }, (_, idx) => {
  const p = companyPrefixes[idx % companyPrefixes.length];
  const s = companySuffixes[(idx + Math.floor(idx / companyPrefixes.length)) % companySuffixes.length];
  const num = idx > 40 ? ` ${Math.floor(idx / 40) + 1}` : '';
  const name = `${p} ${s}${num}`;
  const owner = MOCK_OWNERS[idx % MOCK_OWNERS.length];
  const country = MOCK_COUNTRIES[idx % MOCK_COUNTRIES.length];
  const tier = idx % 5 === 0 ? 'TIER_1' : idx % 3 === 0 ? 'TIER_2' : 'TIER_3';
  const dealSide = idx % 2 === 0 ? 'BUY_SIDE' : 'SELL_SIDE';
  const category = MOCK_BUSINESS_LINES[1 + (idx % (MOCK_BUSINESS_LINES.length - 1))];
  
  // Date within past 30 days
  const updatedDate = new Date(Date.now() - (idx * 5 + 2) * 3600000 * 4);

  return {
    id: `acc-${idx + 1}`,
    name,
    country,
    tier,
    deal_side: dealSide,
    owner_id: owner.id,
    category,
    updated_at: updatedDate.toISOString(),
  };
});

const firstNames = [
  'Alexander', 'Charlotte', 'Benjamin', 'Victoria', 'Julian', 'Amelia', 'Marcus', 'Eleanor',
  'Sebastian', 'Olivia', 'Gabriel', 'Sophia', 'Lucas', 'Emma', 'Daniel', 'Isabella',
  'Nathaniel', 'Clara', 'Arthur', 'Grace', 'Dominic', 'Chloe', 'Harrison', 'Mia'
];

const lastNames = [
  'Vance', 'Sterling', 'Blackwood', 'Montague', 'Sinclair', 'Hastings', 'Rothschild', 'Kensington',
  'Beaumont', 'Chen', 'Morrison', 'Alvarez', 'Mercer', 'O’Connor', 'Goldman', 'Thornton',
  'Dupont', 'Lindqvist', 'Nakamura', 'Barrington', 'Holt', 'Whitaker', 'Sinclair', 'Prescott'
];

const executiveTitles = [
  'Managing Director', 'Partner', 'Head of M&A', 'Chief Strategy Officer',
  'VP Corporate Development', 'Chief Investment Officer', 'Principal', 'Senior Director'
];

const nextSteps = [
  'Review teaser & preliminary valuation',
  'Execute Non-Disclosure Agreement (NDA)',
  'Schedule chemistry meeting with leadership',
  'Deliver comprehensive CIM package',
  'Follow up on indicative non-binding bid',
  'Coordinate on-site management presentation',
  'Finalize scope of financial due diligence',
  'Review board approval timeline'
];

// Generate exactly 178 contacts
export const MOCK_CONTACTS: Contact[] = Array.from({ length: 178 }, (_, idx) => {
  const fn = firstNames[idx % firstNames.length];
  const ln = lastNames[(idx + Math.floor(idx / 5)) % lastNames.length];
  const name = `${fn} ${ln}`;
  const company = MOCK_ACCOUNTS[idx % MOCK_ACCOUNTS.length];
  const tier = idx % 4 === 0 ? 'TIER_1' : idx % 3 === 0 ? 'TIER_2' : 'TIER_3';
  const statusRoll = idx % 10;
  const relationship_status = statusRoll < 4 ? 'HOT' : statusRoll < 7 ? 'WARM' : 'COLD';
  const next_step = nextSteps[idx % nextSteps.length];
  const is_closed = idx % 12 === 0;
  const title = executiveTitles[idx % executiveTitles.length];
  const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  return {
    id: `cnt-${idx + 1}`,
    name,
    company_id: company.id,
    company_name: company.name,
    tier,
    relationship_status,
    next_step,
    is_closed,
    title,
    email,
  };
});

const followUpActions = [
  'Send revised draft of non-disclosure agreement',
  'Follow up on commercial terms and valuation feedback',
  'Confirm attendee list for partner pitch next Thursday',
  'Deliver updated synergy breakdown model',
  'Schedule diligence Q&A call with tax team',
  'Send follow-up notes from management dinner',
  'Verify regulatory approval milestones',
  'Request audited financial statements for FY25',
];

// Safe local calendar date formatter (YYYY-MM-DD)
export const formatLocalDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Generate realistic follow-ups: some Overdue, some Today, some This week
export const MOCK_FOLLOW_UPS: FollowUp[] = Array.from({ length: 48 }, (_, idx) => {
  const contact = MOCK_CONTACTS[idx % MOCK_CONTACTS.length];
  const owner = MOCK_ACCOUNTS.find((a) => a.id === contact.company_id)?.owner_id || MOCK_OWNERS[0].id;
  const action = followUpActions[idx % followUpActions.length];

  const now = new Date();
  let dueDate: Date;

  if (idx < 12) {
    // Overdue: 1 to 10 days in the past
    const daysAgo = 1 + (idx % 10);
    dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo);
  } else if (idx < 24) {
    // Today
    dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else {
    // This week: 1 to 6 days in future
    const daysAhead = 1 + (idx % 6);
    dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysAhead);
  }

  const lastContacted = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate() - 4);

  return {
    id: `flw-${idx + 1}`,
    contact_id: contact.id,
    action,
    last_contacted_date: formatLocalDate(lastContacted),
    due_date: formatLocalDate(dueDate),
    owner_id: owner,
  };
});

// Helper to assemble FollowUpDTOs with consistent categorization & sorting
export const getEnrichedFollowUps = (): FollowUpDTO[] => {
  const todayStr = formatLocalDate(new Date());

  const enriched = MOCK_FOLLOW_UPS.map((f) => {
    const contact = MOCK_CONTACTS.find((c) => c.id === f.contact_id);
    const company = contact ? MOCK_ACCOUNTS.find((a) => a.id === contact.company_id) : undefined;

    let status_category: 'OVERDUE' | 'TODAY' | 'THIS_WEEK' = 'THIS_WEEK';
    if (f.due_date < todayStr) {
      status_category = 'OVERDUE';
    } else if (f.due_date === todayStr) {
      status_category = 'TODAY';
    }

    return {
      id: f.id,
      contact_id: f.contact_id,
      contact_name: contact ? contact.name : 'Unknown Contact',
      company_id: contact ? contact.company_id : '',
      company_name: company ? company.name : 'Independent',
      action: f.action,
      due_date: f.due_date,
      last_contacted_date: f.last_contacted_date,
      owner_id: f.owner_id,
      status_category,
    };
  });

  // Sort consistently:
  // Overdue: oldest first (earliest calendar date first, e.g. Oct 2 before Oct 10)
  // Today/This week: soonest first (earliest calendar date first, e.g. Oct 13 before Oct 16)
  return enriched.sort((a, b) => {
    if (a.due_date !== b.due_date) {
      return a.due_date.localeCompare(b.due_date);
    }
    return a.contact_name.localeCompare(b.contact_name);
  });
};

// Compute KPI summary and outreach funnel from the exact same filtered dataset
export function computeDashboardMetrics(
  accounts: Account[],
  contacts: Contact[],
  followUps: FollowUpDTO[]
): { kpis: DashboardKpis; funnel: FunnelStage[] } {
  const totalAccounts = accounts.length;
  const peopleNamed = contacts.length;

  // Funnel calculations derived directly from the filtered contacts:
  // "To contact" equals all identified/named people in scope
  const toContact = peopleNamed;
  const connected = Math.min(toContact, Math.round(toContact * 0.72));
  const messaged = Math.min(connected, Math.round(toContact * 0.44));
  // Meetings: contacts at the active meeting stage (HOT relationship status)
  const meetings = contacts.filter((c) => c.relationship_status === 'HOT').length;

  const funnel: FunnelStage[] = [
    {
      stage: 'TO_CONTACT',
      label: 'To contact',
      count: toContact,
      percentage: 100,
    },
    {
      stage: 'CONNECTED',
      label: 'Connected',
      count: connected,
      percentage: toContact > 0 ? Math.round((connected / toContact) * 100) : 0,
    },
    {
      stage: 'MESSAGED',
      label: 'Messaged',
      count: messaged,
      percentage: toContact > 0 ? Math.round((messaged / toContact) * 100) : 0,
    },
    {
      stage: 'MEETINGS',
      label: 'Meetings',
      count: meetings,
      percentage: toContact > 0 ? Math.round((meetings / toContact) * 100) : 0,
    },
  ];

  // Overdue count: exact count of overdue follow-up action items in scope
  const overdueCount = followUps.filter((f) => f.status_category === 'OVERDUE').length;

  const kpis: DashboardKpis = {
    totalAccounts,
    peopleNamed,
    meetings, // Exactly matches funnel Meetings count!
    overdueCount, // Exactly matches overdue follow-ups count!
  };

  return { kpis, funnel };
}

