import { Category } from '@/types/product';

import { api } from '../api';

export async function createCategory(
  category: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'slug'>
): Promise<Category> {
  const { data } = await api.post('/categories', category);
  return data;
}
