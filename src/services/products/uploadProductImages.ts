import { api } from '../api';

export async function uploadProductImges(id: string, formData: FormData) {
  await api.post(`products/${id}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
