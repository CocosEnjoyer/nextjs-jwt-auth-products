import { create } from 'zustand';
import { User } from '@/types/user';
import { AuthState } from '@/types/authState';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isHydrated: false,

  initUser: (user: User | null) => {
    set({
      user,
      isAuth: !!user,
      isHydrated: true,
    });
  },

  login: (user: User) => {
    set({ user, isAuth: true, isHydrated: true });
  },

  logout: () => {
    set({ user: null, isAuth: false, isHydrated: true });
  },
}));
