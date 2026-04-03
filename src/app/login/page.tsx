'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { loginAction } from '@/actions/auth';
import { Button } from '@/components/Button/Button';
import styles from './login.module.scss';

export default function LoginPage() {
  const [username, setUsername] = useState('emilys'); // Сразу вставил данные для логина для удобства
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || password.length < 3) {
      setError('At least 3 characters required');
      return;
    }

    setLoading(true);

    try {
      const result = await loginAction({ username, password });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result?.user) {
        setAuth(result.user);
        router.push('/');
        router.refresh();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" disabled={loading} text={loading ? 'Logging in...' : 'Login'} />
      </form>
    </div>
  );
}
