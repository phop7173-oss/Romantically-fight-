import { create } from 'zustand';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  coupleId: number | null;
  createdAt: string;
  updatedAt: string;
};

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  initialize: () => void;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
}

const STORAGE_KEY = 'romantically-auth';

function readStoredAuth() {
  if (typeof window === 'undefined') {
    return { user: null, token: null };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { user: null, token: null };

  try {
    const parsed = JSON.parse(raw) as { user: AuthUser; token: string };
    return parsed;
  } catch {
    return { user: null, token: null };
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  initialize: () => {
    const stored = readStoredAuth();
    if (stored.user && stored.token) {
      set({ user: stored.user, token: stored.token, isAuthenticated: true });
    }
  },
  setAuth: (user, token) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    set({ user, token, isAuthenticated: true });
  },
  clearAuth: () => {
    window.localStorage.removeItem(STORAGE_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
