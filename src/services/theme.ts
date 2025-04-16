import { Category } from "@/types/category";
import { api } from "./api";
import { Page } from "@/types/page";

export async function createCategory(name: string, isActive: boolean): Promise<Category>{
    const response = await api.post('/categories', { name, isActive });
    return response.data;
}

export async function updateCategory(id: string, name: string, isActive: boolean): Promise<Category>{
    const response = await api.put('/categories', { id, name, isActive });
    return response.data;
}

export async function deleteCategory(id: string): Promise<void>{
    await api.delete(`/categories/${id}`);
}

export async function findCategoryBySlug(slug: string): Promise<Category>{
    const response = await api.get(`/categories/${slug}`);
    return response.data;
}

export async function listCategoires(page: number, size: number): Promise<Page<Category>>{
    const response = await api.get(`/categories?page=${page}&size=${size}`);
    return response.data;
}