import { create } from 'zustand';

interface CoupleState {
  profileName: string;
  setProfileName: (name: string) => void;
  reset: () => void;
}

export const useCoupleStore = create<CoupleState>((set) => ({
  profileName: 'Your relationship',
  setProfileName: (name) => set({ profileName: name }),
  reset: () => set({ profileName: 'Your relationship' }),
}));
