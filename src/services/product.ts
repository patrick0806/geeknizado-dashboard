import { Product } from "@/types/product";
import { api } from "./api";
import { Page } from "@/types/page";

export async function createProduct(data: {
    name:        string;
    description: string;
    sku:         string;
    amount:      number;
    categoryId:  string;
    themeId:     string;
    isActive:    boolean;
    weight:      number;
    width:       number;
    height:      number;
    depth:       number;
    price:       number;
    discount:    number;
}): Promise<Product>{
    const response = await api.post('/products', data);
    return response.data;
}

export async function updateProduct(id: string, data: {
    name?:        string;
    description?: string;
    amount?:      number;
    categoryId?:  string;
    themeId?:     string;
    isActive?:    boolean;
    weight?:      number;
    width?:       number;
    height?:      number;
    depth?:       number;
    price?:       number;
    discount?:    number;
}): Promise<Product>{
    const response = await api.patch(`/products/${id}`, data);
    return response.data;
}

export async function deleteProduct(id: string): Promise<void>{
    await api.delete(`/products/${id}`);
}

export async function findProductBySlug(slug: string): Promise<Product>{
    const response = await api.get(`/products/${slug}`);
    return response.data;
}

export async function listProducts(page: number, size: number, isActive?: boolean): Promise<Page<Product>>{
    const path = `/products?page=${page}&size=${size}`
    if(isActive !== undefined){
        path + `&isActive=${isActive}`
    }
    const response = await api.get(path);
    return response.data;
}

export async function uploadProductImages(productId: string, files: File[], positions: Record<string, number>): Promise<void> {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('files', file, file.name);
    });
    formData.append('positions', JSON.stringify(positions));
    await api.post(`/products/${productId}/images`, formData);
}