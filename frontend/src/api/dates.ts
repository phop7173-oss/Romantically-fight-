import { apiClient } from '../lib/api-client';

export type CoupleDate = {
  id: number;
  title: string;
  scheduledAt: string;
  details: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateDatePayload = {
  title: string;
  scheduledAt: string;
  details?: string | null;
};

export type UpdateDatePayload = Partial<CreateDatePayload>;

export function listDates() {
  return apiClient<CoupleDate[]>('/api/couples/me/dates');
}

export function createDate(payload: CreateDatePayload) {
  return apiClient<CoupleDate>('/api/couples/me/dates', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateDate(id: number, payload: UpdateDatePayload) {
  return apiClient<CoupleDate>(`/api/couples/me/dates/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteDate(id: number) {
  return apiClient<void>(`/api/couples/me/dates/${id}`, {
    method: 'DELETE',
  });
}
