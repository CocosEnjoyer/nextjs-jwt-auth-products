import axios from 'axios';
import { cookies } from 'next/headers';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAuthorizedApi = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  return axios.create({
    ...api.defaults,
    headers: {
      ...api.defaults.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

export default api;
