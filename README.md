# SAGASIA Strategic — Executive Dashboard

A modern, high-performance Executive Dashboard for SAGASIA Strategic advisory and investment consulting teams. Built with React, TypeScript, and Tailwind CSS, featuring full offline mock simulation (MSW) and isolated widget resilience.

---

## 1. Technology Stack

* **Framework & Tooling**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with strict CSS custom properties via `src/styles/theme.css`
* **Routing**: [React Router v7](https://reactrouter.com/)
* **Server State Management**: [TanStack Query v5](https://tanstack.com/query/latest)
* **HTTP Client**: [Axios](https://axios-http.com/)
* **Data Visualization**: [Recharts](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **API Mocking**: [Mock Service Worker (MSW v3)](https://mswjs.io/)

---

## 2. Quick Start

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* `npm` (v9+)

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Run local development server (with MSW mocks enabled by default)
npm run dev

# 3. Type-check and build production bundle
npm run build

# 4. Run ESLint checks
npm run lint
```
The application will be available at `http://localhost:5173/`.

---

## 3. Environment Variables & Backend Integration

Environment configuration is managed via `.env` files. Template values are provided in `.env.example`.

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_USE_MOCK` | `true` | When `true`, MSW intercepts requests in the browser and serves realistic fake data (134 accounts, 178 contacts). Set to `false` to connect to the real API. |
| `VITE_API_BASE_URL` | `http://localhost:8080/api` | Base URL used by the Axios client for all API calls. |

### Switching from Mock to Real Spring Boot API
1. Open or create your `.env.development` or `.env.production` file.
2. Set `VITE_USE_MOCK=false`.
3. Set `VITE_API_BASE_URL` to your Spring Boot server URL (e.g., `http://localhost:8080/api` or your deployed backend gateway).
4. Restart the development server (`npm run dev`). Requests will now hit the Spring Boot REST backend directly with CORS headers enabled.

---

## 4. Project Structure

```
crm-frontend/
├── docs/                        # Backend integration specifications and documentation
├── public/                      # Static assets and mockServiceWorker.js
├── src/
│   ├── api/                     # Axios instance and typed endpoint service functions
│   ├── components/
│   │   ├── common/              # Reusable UI primitives (WidgetContainer, Skeleton)
│   │   └── layout/              # App shell layout (Sidebar, Topbar, DashboardLayout)
│   ├── constants/               # Global configuration constants (APP_NAME, branding)
│   ├── context/                 # Application contexts (placeholder AuthContext)
│   ├── features/
│   │   └── dashboard/           # Dashboard feature module
│   │       ├── components/      # Dashboard widgets (KPIs, Funnel, Charts, Tables, Filters)
│   │       ├── context/         # FilterContext for synchronized filtering state
│   │       └── hooks/           # TanStack Query hooks per widget with filter reactivity
│   ├── mocks/                   # MSW browser worker, seed data (134 accounts, 178 contacts), and handlers
│   ├── pages/                   # Route views (DashboardPage, PlaceholderPage)
│   ├── styles/                  # Theme tokens (theme.css with CSS variables)
│   ├── types/                   # TypeScript domain models and DTO interfaces
│   ├── App.tsx                  # App root with QueryClientProvider, Router, and providers
│   ├── index.css                # Tailwind v4 import & theme token mappings
│   └── main.tsx                 # Entry point with conditional MSW initialization
```

---

## 5. Dashboard API Endpoints

All dashboard widgets query dedicated REST endpoints that support optional query parameters (`businessLine`, `ownerId`, `tier`, `dealSide`, `country`). For complete request/response schemas, refer to [docs/API_CONTRACT.md](docs/API_CONTRACT.md).

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard/kpis` | Summary metrics: Accounts, People named, Meetings, Overdue count |
| `GET` | `/api/dashboard/funnel` | Outreach funnel progression stages and conversion rates |
| `GET` | `/api/dashboard/follow-ups` | Follow-up action items segmented by Overdue, Today, and This week |
| `GET` | `/api/dashboard/charts` | Relationship temperature donut, accounts by tier bar, buy vs sell side donut |
| `GET` | `/api/dashboard/priority-contacts` | Top Tier 1 contacts with active HOT or WARM relationship status (max 8) |
| `GET` | `/api/dashboard/recent-accounts` | Most recently updated accounts with ownership and practice line (max 8) |
| `GET` | `/api/dashboard/filter-options` | Dynamic filter dropdown options (owners, tiers, deal sides, countries) |
| `GET` | `/api/dashboard/stale-contacts` | Inactive leads with no follow-up scheduled or >30 days without contact |
| `GET` | `/api/dashboard/accounts-by-category` | Account volume breakdown across consulting practice lines |
| `GET` | `/api/dashboard/accounts-per-owner` | Account portfolio volume and overdue task count per team member |

---

## 6. Next Steps

1. **Brand Theme Refinement**: Replace default color palette values in `src/styles/theme.css` (`--primary`, `--accent`, etc.) with official corporate brand guidelines.
2. **Business Practice Lines**: Reflect production practice groups (Healthcare, Financial Advisory, Networking & Partnerships) in `src/mocks/data.ts` and backend metadata.
3. **Connect Live Backend**: Deploy the Spring Boot REST API and switch `VITE_USE_MOCK=false`.
4. **Authentication & SSO**: Replace the placeholder `AuthProvider` in `src/context/AuthContext.tsx` with Microsoft Entra ID (MSAL) authentication.
5. **Automated Testing**: Add unit/integration tests using Vitest and React Testing Library, and end-to-end tests using Playwright.
6. **Remaining CRM Pages**: Implement full data tables, filters, and detail drawers for the placeholder routes (`/accounts`, `/contacts`, `/pipeline`, `/follow-ups`).
