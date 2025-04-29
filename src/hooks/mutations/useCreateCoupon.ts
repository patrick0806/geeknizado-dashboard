import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCoupon } from '@/services/coupon';
import { Coupon } from '@/types/coupon';

export function useCreateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Coupon>) =>
      createCoupon({
        code: data.code!,
        isActive: data.isActive!,
        usageLimit: data.usageLimit,
        validUntil: data.validUntil,
        discountAmount: data.discountAmount,
        discountPercent: data.discountPercent
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
  });
} 