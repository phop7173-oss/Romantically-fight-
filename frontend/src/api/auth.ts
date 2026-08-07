import { apiClient } from '../lib/api-client';

export type AuthResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    coupleId: number | null;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};

export async function registerUser(payload: { name: string; email: string; password: string }) {
  return apiClient<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: { email: string; password: string }) {
  return apiClient<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createInvite(payload: { email: string }, token: string) {
  return apiClient<{ invitation: { token: string } }>('/api/auth/invites', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}

export async function acceptInvite(payload: { token: string }, authToken: string) {
  return apiClient<{ couple: { id: number; name: string } }>('/api/auth/invites/accept', {
    method: 'POST',
    headers: { Authorization: `Bearer ${authToken}` },
    body: JSON.stringify(payload),
  });
}
