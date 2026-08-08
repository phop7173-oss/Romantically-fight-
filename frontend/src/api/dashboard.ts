import { apiClient } from '../lib/api-client';

export type DashboardApiResponse = {
  coupleName: string;
  anniversaryDate: string | null;
  nextDate: {
    title: string;
    scheduledAt: string;
    details: string | null;
  } | null;
};

export async function getDashboard() {
  return apiClient<DashboardApiResponse>('/api/couples/me/dashboard');
}
