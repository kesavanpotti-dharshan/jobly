import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

// ─── Auth API calls ──────────────────────────────────────────────────────────

async function loginRequest(body: LoginRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/login', body);
  return data;
}

async function registerRequest(body: RegisterRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/register', body);
  return data;
}

async function logoutRequest(refreshToken: string): Promise<void> {
  await api.post('/api/auth/logout', { refreshToken });
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      // Backend returns flat structure, convert to User object
      const user = {
        id: response.id || '',
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        emailVerified: false,
        createdAt: new Date().toISOString(),
      };
      setAuth(user, response.accessToken, response.refreshToken);
      navigate('/dashboard', { replace: true });
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (response) => {
      // Backend returns flat structure, convert to User object
      const user = {
        id: response.id || '',
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        emailVerified: false,
        createdAt: new Date().toISOString(),
      };
      setAuth(user, response.accessToken, response.refreshToken);
      navigate('/dashboard', { replace: true });
    },
  });
}

export function useLogout() {
  const { refreshToken, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        // Best-effort — don't block logout on network error
        await logoutRequest(refreshToken).catch(() => {});
      }
    },
    onSettled: () => {
      clearAuth();
      navigate('/login', { replace: true });
    },
  });
}