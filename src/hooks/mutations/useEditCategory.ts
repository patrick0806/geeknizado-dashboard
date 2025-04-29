import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCategory} from "@/services/category";

export function useEditCategory(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({slug ,name, isActive}: {slug: string,name: string, isActive: boolean} )=> updateCategory(slug, name,isActive),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]})
        }
    })
}