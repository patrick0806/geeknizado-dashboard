import { Category } from "@/types/category";
import { api } from "./api";
import { Page } from "@/types/page";

export async function createCategory(name: string, isActive: boolean): Promise<Category>{
    const response = await api.post('/categories', { name, isActive });
    return response.data;
}

export async function updateCategory(slug: string, name: string, isActive: boolean): Promise<Category>{
    const response = await api.patch(`/categories/${slug}`, { name, isActive });
    return response.data;
}

export async function deleteCategory(id: string): Promise<void>{
    await api.delete(`/categories/${id}`);
}

export async function findCategoryBySlug(slug: string): Promise<Category>{
    const response = await api.get(`/categories/${slug}`);
    return response.data;
}

export async function listCategoires(page: number, size: number, isActive?: boolean): Promise<Page<Category>>{
    const path = `/categories?page=${page}&size=${size}`
    if(isActive !== undefined){
        path + `&isActive=${isActive}`
    }
    const response = await api.get(path);
    return response.data;
}