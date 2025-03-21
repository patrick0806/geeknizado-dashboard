import { api } from '../api';

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}
