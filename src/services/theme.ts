import { Theme } from "@/types/theme";
import { api } from "./api";
import { Page } from "@/types/page";

export async function createTheme(name: string, isActive: boolean): Promise<Theme>{
    const response = await api.post('/themes', { name, isActive });
    return response.data;
}

export async function updateTheme(slug: string, name: string, isActive: boolean): Promise<Theme>{
    const response = await api.patch(`/themes/${slug}`, { name, isActive });
    return response.data;
}

export async function deleteTheme(id: string): Promise<void>{
    await api.delete(`/themes/${id}`);
}

export async function findThemeBySlug(slug: string): Promise<Theme>{
    const response = await api.get(`/themes/${slug}`);
    return response.data;
}

export async function listThemes(page: number, size: number, isActive?: boolean): Promise<Page<Theme>>{
   const path = `/themes?page=${page}&size=${size}`
       if(isActive !== undefined){
           path + `&isActive=${isActive}`
       }
       const response = await api.get(path);
       return response.data;
}