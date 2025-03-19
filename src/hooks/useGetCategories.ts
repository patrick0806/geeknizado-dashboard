import { useQuery } from '@tanstack/react-query';

import { listCategories } from '@/services/categories/listCategories';

export function useCategories({
  page = 1,
  limit = 100,
}: {
  page: number;
  limit: number;
}) {
  return useQuery({
    queryKey: ['categories', page, limit],
    queryFn: async () => {
      return listCategories({ page, limit });
    },
  });
}
