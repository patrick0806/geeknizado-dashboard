import { Product } from "@/types/product";
import { api } from "../api";

export async function findProductBySlug(slug: string): Promise<Product> {
    const { data } = await api.get(`/products/${slug}`);
    return data;
}