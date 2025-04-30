import { getOrder } from '@/services/order';
import { Order } from '@/types/order';
import { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

type UseOrderProps = {
  orderCode: string
}

export function useOrder({orderCode}: UseOrderProps) {
    return useQuery<Order & {items:{id:string, unitPrice: number, quantity:number, product: Product}[]}>({
      queryKey: ['order', orderCode],
      queryFn: async () => getOrder(orderCode),
    });
  }