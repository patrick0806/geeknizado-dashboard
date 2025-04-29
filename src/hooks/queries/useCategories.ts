import { listCategoires } from '@/services/category';
import { Category } from '@/types/category';
import { Page } from '@/types/page';
import { useQuery } from '@tanstack/react-query';

type UseCategoriesProps = {
  page: number,
  size: number,
  isActive?: boolean
}

export function useCategories({page, size, isActive}: UseCategoriesProps) {
    return useQuery<Page<Category>>({
      queryKey: ['categories', page, size, isActive],
      queryFn: async () => listCategoires(page,size, isActive),
    });
  }