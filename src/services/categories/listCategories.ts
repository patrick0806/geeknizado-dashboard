import { Page } from "@/types/page";
import { api } from "../api";
import { Category } from "@/types/product";

type ListCategoriesProps = {
    page: number;
    limit: number;
}

export async function listCategories({ page = 1, limit = 100 }: ListCategoriesProps) {
    const { data } = await api.get<Page<Category>>(`/categories?page=${page}&size=${limit}`)
    return data;
}