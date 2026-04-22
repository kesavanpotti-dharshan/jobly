import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { AnalyticsData } from '@/types/analytics';

const ANALYTICS_KEY = ['analytics'];

interface FetchAnalyticsParams {
  startDate?: string;
  endDate?: string;
  status?: string;
}

async function fetchAnalyticsData(params?: FetchAnalyticsParams): Promise<AnalyticsData> {
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);
  if (params?.status) queryParams.append('status', params.status);

  const url = `/api/analytics/funnel${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const { data } = await api.get<AnalyticsData>(url);
  console.log('Analytics API response:', data);
  return data;
}

export function useAnalytics(params?: FetchAnalyticsParams) {
  return useQuery({
    queryKey: [ANALYTICS_KEY, params],
    queryFn: () => fetchAnalyticsData(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
