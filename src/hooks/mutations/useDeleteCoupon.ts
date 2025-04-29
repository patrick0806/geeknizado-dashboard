import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCoupon} from "@/services/coupon";

export function useDeleteCoupon(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id}: {id: string} )=> deleteCoupon(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["coupons"]})
        }
    })
}