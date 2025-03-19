import { Theme } from '@/types/product';

import { api } from '../api';

export async function createTheme(
  theme: Omit<Theme, 'id' | 'createdAt' | 'updatedAt' | 'slug'>
): Promise<Theme> {
  const { data } = await api.post('/themes', theme);
  return data;
}
