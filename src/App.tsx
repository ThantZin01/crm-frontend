import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { FilterProvider } from './features/dashboard/context/FilterContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FilterProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route
                  path="/accounts"
                  element={
                    <PlaceholderPage
                      title="Accounts"
                      description="Target companies, portfolio registries, and corporate ownership profiles."
                    />
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <PlaceholderPage
                      title="Contacts"
                      description="Key decision-makers, senior leadership, and stakeholder relationship profiles."
                    />
                  }
                />
                <Route
                  path="/pipeline"
                  element={
                    <PlaceholderPage
                      title="Pipeline"
                      description="Deal flow progression, stage probability, and advisory transaction lifecycle."
                    />
                  }
                />
                <Route
                  path="/follow-ups"
                  element={
                    <PlaceholderPage
                      title="Follow-ups"
                      description="Action items, scheduled partner calls, and follow-up deadlines."
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FilterProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
