import { User } from '../types/user';
import { AxiosError } from 'axios';
import { getAuthorizedApi } from './api';

export async function getServerUser(): Promise<User | null> {
  try {
    const authApi = await getAuthorizedApi();
    const { data } = await authApi.get<User>('/auth/me');

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status !== 401) {
        console.error('API Error:', error.response?.data || error.message);
      }
    }

    return null;
  }
}
