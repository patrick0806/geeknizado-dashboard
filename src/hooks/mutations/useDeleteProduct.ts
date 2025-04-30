import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteProduct} from "@/services/product";

export function useDeleteProduct(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id}: {id: string} )=> deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
        }
    })
}