import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCoupon } from '@/services/coupon';
import { Coupon } from '@/types/coupon';

export function useUpdateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Coupon>) =>
      updateCoupon(data.id! , data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
  });
} 