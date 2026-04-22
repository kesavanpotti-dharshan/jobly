import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Application, CreateApplicationRequest, UpdateApplicationRequest } from '@/types/applications';

const APPLICATIONS_KEY = ['applications'];

// ─── API calls ────────────────────────────────────────────────────────────────

async function fetchApplications(): Promise<Application[]> {
  const { data } = await api.get<Application[]>('/api/applications');
  return data;
}

// Map workMode string to enum number
function mapWorkModeToNumber(workMode: string): number {
  const modeMap: { [key: string]: number } = {
    'Onsite': 0,
    'Remote': 1,
    'Hybrid': 2,
  };
  return modeMap[workMode] ?? 1;
}

async function createApplication(request: CreateApplicationRequest): Promise<Application> {
  const payload = {
    companyName: request.companyName,
    roleTitle: request.roleTitle,
    jobUrl: request.jobUrl || null,
    location: request.location || null,
    workMode: mapWorkModeToNumber(request.workMode),
    salaryMin: request.salaryMin || '',
    salaryMax: request.salaryMax || '',
    appliedDate: request.appliedDate || null,
    deadlineDate: request.deadlineDate || null,
    priority: request.priority || '',
  };
  const { data } = await api.post<Application>('/api/applications', payload);
  return data;
}

async function updateApplication(request: UpdateApplicationRequest): Promise<Application> {
  const { id, ...rest } = request;
  const payload = {
    companyName: rest.companyName,
    roleTitle: rest.roleTitle,
    jobUrl: rest.jobUrl || null,
    location: rest.location || null,
    workMode: mapWorkModeToNumber(rest.workMode),
    salaryMin: rest.salaryMin || '',
    salaryMax: rest.salaryMax || '',
    appliedDate: rest.appliedDate || null,
    deadlineDate: rest.deadlineDate || null,
    priority: rest.priority || '',
  };
  const { data } = await api.put<Application>(`/api/applications/${id}`, payload);
  return data;
}

async function deleteApplication(id: string): Promise<void> {
  await api.delete(`/api/applications/${id}`);
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useApplications() {
  return useQuery({
    queryKey: APPLICATIONS_KEY,
    queryFn: fetchApplications,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
    },
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
    },
  });
}