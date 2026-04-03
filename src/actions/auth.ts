'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { PayloadLogin } from '@/types/payload';
import { revalidatePath } from 'next/cache';

const api = axios.create({ baseURL: 'https://dummyjson.com' });

export async function loginAction(payload: PayloadLogin) {
  try {
    const { data } = await api.post('/auth/login', {
      username: payload.username,
      password: payload.password,
      expiresInMins: 60,
    });

    const cookieStore = await cookies();
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax' as const,
    });

    if (data.refreshToken) {
      cookieStore.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax' as const,
      });
    }

    revalidatePath('/', 'layout');

    return { user: data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || 'Login failed' };
    }
    return { error: 'An unexpected error occurred' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  revalidatePath('/', 'layout');
}
