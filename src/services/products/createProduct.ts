import { Product } from "@/types/product";
import { api } from "../api";

export async function createProduct(formData: FormData): Promise<Product> {
    const { data } = await api.post('/products', formData, { headers: { "Content-Type": "multipart/form-data" } });
    return data;
}