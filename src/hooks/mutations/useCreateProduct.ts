import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct} from '@/services/product';
import { Product } from '@/types/product';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Product>) =>
        createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
} 