import { useQuery } from '@tanstack/react-query';
import { listProducts } from '@/services/product';

type UseThemeProps = {
  page: number,
  size: number,
  isActive?: boolean,
  name?: string, 
  categoryId?: string, 
  themeId?: string
}


export function useProducts({page,size,isActive, name, categoryId, themeId}: UseThemeProps) {
  return useQuery({
    queryKey: ['products',{ page, size, isActive, name, categoryId, themeId}],
    queryFn: () => listProducts(page, size, isActive, name, categoryId, themeId),
  });
} 