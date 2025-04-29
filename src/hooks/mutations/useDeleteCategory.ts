import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCategory} from "@/services/category";

export function useDeleteCategory(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id}: {id: string} )=> deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]})
        }
    })
}