export type ApiErrorShape = {
  message?: string;
  error?: string;
};

export async function apiClient<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as ApiErrorShape;
    throw new Error(payload.message ?? payload.error ?? 'Request failed.');
  }

  return response.json() as Promise<T>;
}
