import { api } from '../api';

export async function deleteTheme(id: string): Promise<void> {
  await api.delete(`/themes/${id}`);
}
