import { listCoupons } from '@/services/coupon';
import { Coupon } from '@/types/coupon';
import { Page } from '@/types/page';
import { useQuery } from '@tanstack/react-query';

type UseCategoriesProps = {
  page: number,
  size: number,
  isActive?: boolean
}

export function useCoupons({page, size, isActive}: UseCategoriesProps) {
    return useQuery<Page<Coupon>>({
      queryKey: ['coupons', page, size, isActive],
      queryFn: async () => listCoupons(page,size, isActive),
    });
  }