import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCategory} from "@/services/category";

export function useCreateCategory(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({name, isActive}: {name: string, isActive: boolean} )=> createCategory(name,isActive),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]})
        }
    })
}