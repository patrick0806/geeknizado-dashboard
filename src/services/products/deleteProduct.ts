import { api } from "../api";

export async function deleteProduct(productId: string) {
    await api.delete(`/products/${productId}`);
}