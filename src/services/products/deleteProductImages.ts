import { api } from '../api';

export async function deleteProductImages(
  productId: string,
  imagesIds: string[]
) {
  await api.delete(`/products/${productId}/images`, { data: { imagesIds } });
}
