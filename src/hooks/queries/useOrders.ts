import { listOrders } from '@/services/order';
import { Order } from '@/types/order';
import { OrderStatus } from '@/types/orderStatus';
import { Page } from '@/types/page';
import { useQuery } from '@tanstack/react-query';

type UseOrderProps = {
  page: number,
  size: number,
  customerName?: string,
  orderStatus?: OrderStatus
}

export function useOrders({page, size, customerName, orderStatus}: UseOrderProps) {
    return useQuery<Page<Order>>({
      queryKey: ['orders', page, size, customerName, orderStatus],
      queryFn: async () => listOrders(page,size, customerName, orderStatus),
    });
  }