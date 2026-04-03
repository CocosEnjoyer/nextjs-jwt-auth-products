'use client';
import { useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/types/user';

export default function InitUser({ user }: { user: User | null }) {
  const initUser = useAuthStore((state) => state.initUser);
  const initialized = useRef(false);

  if (!initialized.current) {
    initUser(user);
    initialized.current = true;
  }

  return null;
}
