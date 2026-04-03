import { User } from './user';

export interface AuthState {
  user: User | null;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
  isHydrated: boolean;
  initUser: (user: User | null) => void;
}
