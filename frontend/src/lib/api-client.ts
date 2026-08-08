export type ApiErrorShape = {
  message?: string;
  error?: string;
};

function getStoredToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem('romantically-auth');
  if (!raw) return null;

  try {
    return JSON.parse(raw).token as string;
  } catch {
    return null;
  }
}

export async function apiClient<T>(path: string, init?: RequestInit): Promise<T> {
  const token = init?.headers && 'Authorization' in init.headers ? (init.headers as Record<string, string>).Authorization : getStoredToken();
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
      ...(token ? { Authorization: token } : {}),
    },
    ...init,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as ApiErrorShape;
    throw new Error(payload.message ?? payload.error ?? 'Request failed.');
  }

  return response.json() as Promise<T>;
}
