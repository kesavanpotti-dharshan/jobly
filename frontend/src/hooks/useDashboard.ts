import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { DashboardData } from '@/types/dashboard';

const DASHBOARD_KEY = ['dashboard'];

async function fetchDashboardData(): Promise<DashboardData> {
  const { data } = await api.get<DashboardData>('/api/analytics/dashboard');
  console.log('Dashboard API response:', data);
  return data;
}

export function useDashboard() {
  return useQuery({
    queryKey: DASHBOARD_KEY,
    queryFn: fetchDashboardData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}