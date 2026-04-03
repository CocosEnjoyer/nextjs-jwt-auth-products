'use client';

import { useAuthStore } from '@/store/authStore';
import styles from './Footer.module.scss';

export const Footer = () => {
  const { user, isAuth, isHydrated } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>{currentYear}</span>
        {isHydrated && isAuth && user && (
          <span className={styles.email}>Logged as {user.email}</span>
        )}
      </div>
    </footer>
  );
};
