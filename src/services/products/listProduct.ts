import { Page } from '@/types/page';
import { Product } from '@/types/product';

import { api } from '../api';

export async function listProducts(
  params: URLSearchParams
): Promise<Page<Product>> {
  const { data } = await api.get('/products', { params: params });
  return data;
}
