// file: src/store/useUserStore.ts
import { create } from 'zustand';

interface UserState {
  id: string | null;
  name: string | null;
  isLoggedIn: boolean;
  setUser: (user: { id: string; name: string } | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  name: null,
  isLoggedIn: false,
  setUser: (user) => set({
    id: user?.id ?? null,
    name: user?.name ?? null,
    isLoggedIn: !!user,
  }),
}));