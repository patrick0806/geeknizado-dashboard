import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '@/services/order';
import { OrderStatus } from '@/types/orderStatus';

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {orderCode: string, status: OrderStatus}) =>
        updateOrderStatus(data.orderCode, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
} 