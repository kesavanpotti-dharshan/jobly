import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { ProtectedRoute, GuestRoute } from '@/components/auth/RouteGuards';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ApplicationsPage } from '@/pages/ApplicationsPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { RemindersPage } from '@/pages/RemindersPage';
import { useThemeStore } from '@/store/themeStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 min
    },
  },
});

function AppContent() {
  return (
    <Routes>
      {/* Landing page - visible to everyone */}
      <Route path="/" element={<LandingPage />} />

      {/* Guest-only routes (redirect to /dashboard if already logged in) */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Protected routes (redirect to /login if not logged in) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <div
      style={{
        background: isDark ? '#0f0f1e' : '#f8f9fa',
        color: isDark ? '#f1f5f9' : '#1e293b',
        minHeight: '100vh',
        transition: 'all 0.3s ease',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}