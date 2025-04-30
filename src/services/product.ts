import { Product } from "@/types/product";
import { api } from "./api";
import { Page } from "@/types/page";

export async function createProduct(data: Partial<Product>): Promise<Product>{
    const response = await api.post('/products', {...data, themeId: data.theme?.id, categoryId: data.category?.id});
    return response.data;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product>{
    const response = await api.patch(`/products/${id}`, {...data, themeId: data.theme?.id, categoryId: data.category?.id});
    return response.data;
}

export async function deleteProduct(id: string): Promise<void>{
    await api.delete(`/products/${id}`);
}

export async function findProductBySlug(slug: string): Promise<Product>{
    const response = await api.get(`/products/${slug}`);
    return response.data;
}

export async function listProducts(page: number, size: number, isActive?: boolean, name?: string, categoryId?: string, themeId?: string): Promise<Page<Product>>{
    let path = `/products?page=${page}&size=${size}`
    if(isActive !== undefined){
        path += `&isActive=${isActive}`
    }
    
    if(name){
        path += `&name=${name}`
    }

    if(categoryId){
        path += `&categoryId=${categoryId}`
    }

    if(themeId){
        path += `&themeId=${themeId}`
    }

    const response = await api.get(path);
    return response.data;
}

export async function uploadProductImages(productId: string, data: { files: File[]; positions: Record<string, number> }): Promise<void> {
    const formData = new FormData();
    
    for( const file of data.files) {
        formData.append('files', file, file.name);
    }

    formData.append('positions', JSON.stringify(data.positions));
    await api.post(`/products/${productId}/images`, formData);
}

export async function deleteProductImage(productId: string, imageId: string) {
     await api.delete(`/products/${productId}/images/${imageId}`);
    
  }
  
  export async function updateImagePosition(productId: string, imageId: string, position: number) {
    await api.patch(`/products/${productId}/images/${imageId}/position`,{position});
  }