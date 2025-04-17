import { Theme } from "@/types/theme";
import { api } from "./api";
import { Page } from "@/types/page";

export async function createTheme(name: string, isActive: boolean): Promise<Theme>{
    const response = await api.post('/categories', { name, isActive });
    return response.data;
}

export async function updateTheme(id: string, name: string, isActive: boolean): Promise<Theme>{
    const response = await api.put('/categories', { id, name, isActive });
    return response.data;
}

export async function deleteTheme(id: string): Promise<void>{
    await api.delete(`/categories/${id}`);
}

export async function findThemeBySlug(slug: string): Promise<Theme>{
    const response = await api.get(`/categories/${slug}`);
    return response.data;
}

export async function listThemes(page: number, size: number): Promise<Page<Theme>>{
    const response = await api.get(`/categories?page=${page}&size=${size}`);
    return response.data;
}