import { Product } from '@/types/product';

import { api } from '../api';

export async function updateProduct(
  id: string,
  product: any
): Promise<Product> {
  const { data } = await api.patch(`/products/${id}`, product);
  return data;
}
