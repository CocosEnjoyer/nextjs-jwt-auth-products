'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.scss';
import { logoutAction } from '@/actions/auth';
import { Button } from '../Button/Button';

export const Header = () => {
  const { user, isAuth, logout, isHydrated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutAction();
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {' '}
        {/* nav должен быть там, где будет навигация, но т.к. её тут больше нигде нет, то поставил сюда */}
        <Link href="/" className={styles.logo}>
          <span>
            Abelohost Shop<span className={styles.dot}>.</span>
          </span>
        </Link>
        <div className={styles.userBlock}>
          {!isHydrated ? (
            <div className={styles.emptyBlock} />
          ) : isAuth && user ? (
            <>
              <span className={styles.userName}>
                {user.firstName} {user.lastName}
              </span>
              <Button onClick={handleLogout} classNameProps={styles.logoutBtn} text="Logout" />
            </>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
