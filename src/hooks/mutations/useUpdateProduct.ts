import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct} from '@/services/product';
import { Product } from '@/types/product';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Product>) =>
        updateProduct(data.id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
} 