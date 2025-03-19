import { listCategories } from "@/services/categories/listCategories";
import { useQuery } from "@tanstack/react-query";

export function useCategories({ page = 1, limit = 100 }: { page: number, limit: number }) {
    return useQuery({
        queryKey: ['categories', page, limit],
        queryFn: async () => {
            return listCategories({ page, limit });
        }
    });
}