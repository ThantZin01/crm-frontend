import { http, HttpResponse, delay } from 'msw';
import {
  MOCK_ACCOUNTS,
  MOCK_BUSINESS_LINES,
  MOCK_CONTACTS,
  MOCK_COUNTRIES,
  MOCK_OWNERS,
  getEnrichedFollowUps,
  computeDashboardMetrics,
} from './data';
import type {
  Account,
  Contact,
  DashboardChartsData,
  DashboardFilterOptions,
  FollowUpDTO,
} from '../types/dashboard';

// Helper to filter accounts based on request query parameters
function filterAccounts(url: URL): Account[] {
  const businessLine = url.searchParams.get('businessLine');
  const ownerId = url.searchParams.get('ownerId');
  const tier = url.searchParams.get('tier');
  const dealSide = url.searchParams.get('dealSide');
  const country = url.searchParams.get('country');

  return MOCK_ACCOUNTS.filter((acc) => {
    if (businessLine && businessLine !== 'All lines' && businessLine !== 'ALL' && acc.category !== businessLine) {
      return false;
    }
    if (ownerId && ownerId !== 'ALL' && acc.owner_id !== ownerId) {
      return false;
    }
    if (tier && tier !== 'ALL' && acc.tier !== tier) {
      return false;
    }
    if (dealSide && dealSide !== 'ALL' && acc.deal_side !== dealSide) {
      return false;
    }
    if (country && country !== 'ALL' && acc.country !== country) {
      return false;
    }
    return true;
  });
}

function filterContacts(filteredAccounts: Account[], url: URL): Contact[] {
  const allowedAccountIds = new Set(filteredAccounts.map((a) => a.id));
  const tier = url.searchParams.get('tier');

  return MOCK_CONTACTS.filter((c) => {
    if (!allowedAccountIds.has(c.company_id)) {
      return false;
    }
    if (tier && tier !== 'ALL' && c.tier !== tier) {
      return false;
    }
    return true;
  });
}

export const handlers = [
  // 1. KPI Cards
  http.get('*/api/dashboard/kpis', async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    const accounts = filterAccounts(url);
    const contacts = filterContacts(accounts, url);

    const allowedContactIds = new Set(contacts.map((c) => c.id));
    const allFollowUps = getEnrichedFollowUps();
    const followUps = allFollowUps.filter((f) => allowedContactIds.has(f.contact_id));

    const { kpis } = computeDashboardMetrics(accounts, contacts, followUps);
    return HttpResponse.json(kpis);
  }),

  // 2. Outreach Funnel
  http.get('*/api/dashboard/funnel', async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const accounts = filterAccounts(url);
    const contacts = filterContacts(accounts, url);

    const allowedContactIds = new Set(contacts.map((c) => c.id));
    const allFollowUps = getEnrichedFollowUps();
    const followUps = allFollowUps.filter((f) => allowedContactIds.has(f.contact_id));

    const { funnel } = computeDashboardMetrics(accounts, contacts, followUps);
    return HttpResponse.json(funnel);
  }),

  // 3. Follow-Ups Panel
  http.get('*/api/dashboard/follow-ups', async ({ request }) => {
    await delay(180);
    const url = new URL(request.url);
    const accounts = filterAccounts(url);
    const contacts = filterContacts(accounts, url);

    const allowedContactIds = new Set(contacts.map((c) => c.id));
    const followUps = getEnrichedFollowUps().filter((f) => allowedContactIds.has(f.contact_id));

    return HttpResponse.json<FollowUpDTO[]>(followUps);
  }),

  // 4. Charts (Stage 2 ready)
  http.get('*/api/dashboard/charts', async ({ request }) => {
    await delay(220);
    const url = new URL(request.url);
    const accounts = filterAccounts(url);
    const contacts = filterContacts(accounts, url);

    // Relationship Temperature
    const hotCount = contacts.filter((c) => c.relationship_status === 'HOT').length;
    const warmCount = contacts.filter((c) => c.relationship_status === 'WARM').length;
    const coldCount = contacts.filter((c) => c.relationship_status === 'COLD').length;

    // Accounts by Tier
    const t1 = accounts.filter((a) => a.tier === 'TIER_1').length;
    const t2 = accounts.filter((a) => a.tier === 'TIER_2').length;
    const t3 = accounts.filter((a) => a.tier === 'TIER_3').length;

    // Deal Side
    const buySide = accounts.filter((a) => a.deal_side === 'BUY_SIDE').length;
    const sellSide = accounts.filter((a) => a.deal_side === 'SELL_SIDE').length;

    const data: DashboardChartsData = {
      relationshipTemperature: [
        { status: 'HOT', count: hotCount },
        { status: 'WARM', count: warmCount },
        { status: 'COLD', count: coldCount },
      ],
      accountsByTier: [
        { tier: 'Tier 1', count: t1 },
        { tier: 'Tier 2', count: t2 },
        { tier: 'Tier 3', count: t3 },
      ],
      dealSideDistribution: [
        { dealSide: 'Buy-Side', count: buySide },
        { dealSide: 'Sell-Side', count: sellSide },
      ],
    };

    return HttpResponse.json(data);
  }),

  // 5. Priority Contacts
  http.get('*/api/dashboard/priority-contacts', async ({ request }) => {
    await delay(160);
    const url = new URL(request.url);
    const accounts = filterAccounts(url);
    const contacts = filterContacts(accounts, url);

    // Sort: TIER_1 first, HOT first, not closed
    const sorted = [...contacts]
      .filter((c) => !c.is_closed)
      .sort((a, b) => {
        if (a.tier !== b.tier) return a.tier.localeCompare(b.tier);
        if (a.relationship_status === 'HOT' && b.relationship_status !== 'HOT') return -1;
        if (b.relationship_status === 'HOT' && a.relationship_status !== 'HOT') return 1;
        return 0;
      })
      .slice(0, 8);

    return HttpResponse.json(sorted);
  }),

  // 6. Recent Accounts
  http.get('*/api/dashboard/recent-accounts', async ({ request }) => {
    await delay(160);
    const url = new URL(request.url);
    const accounts = filterAccounts(url);

    const sorted = [...accounts]
      .sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''))
      .slice(0, 8);

    return HttpResponse.json(sorted);
  }),

  // 7. Filter Options
  http.get('*/api/dashboard/filter-options', async () => {
    await delay(100);
    const options: DashboardFilterOptions = {
      businessLines: MOCK_BUSINESS_LINES,
      owners: MOCK_OWNERS,
      tiers: ['TIER_1', 'TIER_2', 'TIER_3'],
      dealSides: ['BUY_SIDE', 'SELL_SIDE'],
      countries: MOCK_COUNTRIES,
    };
    return HttpResponse.json(options);
  }),
];
