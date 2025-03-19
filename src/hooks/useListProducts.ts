import { useQuery } from '@tanstack/react-query';

import { listProducts } from '@/services/products/listProduct';

type ProductsParams = {
  page: number;
  limit: number;
  category: string;
  search: string;
  theme: string;
  sort: 'ASC' | 'DESC';
};

export const useListProducts = ({
  page,
  limit,
  category,
  search,
  theme,
  sort,
}: ProductsParams) => {
  return useQuery({
    queryKey: ['products', search, category, theme, sort, page],
    queryFn: () => {
      return listProducts(
        new URLSearchParams({
          search,
          category,
          theme,
          sort,
          page: page.toString(),
          size: limit.toString(),
        })
      );
    },
  });
};
