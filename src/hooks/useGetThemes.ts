import { listThemes } from "@/services/themes/listThemes";
import { useQuery } from "@tanstack/react-query";

export function useGetThemes({ page = 1, limit = 100 }: { page: number, limit: number }) {
    return useQuery({
        queryKey: ['themes', page, limit],
        queryFn: async () => {
            return listThemes({ page, limit });
        }
    });
}