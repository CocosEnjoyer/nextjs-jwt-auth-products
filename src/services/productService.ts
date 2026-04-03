import api from './api';
import { Product } from '@/types/product';

export const productService = {
  async getProducts(limit = 12) {
    const { data } = await api.get<{ products: Product[] }>(`/products`, {
      params: { limit },
      timeout: 10000,
    });
    return data.products;
  },
};
