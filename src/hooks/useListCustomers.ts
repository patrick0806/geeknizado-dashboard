import { useQuery } from '@tanstack/react-query';

import { listCustomers } from '@/services/customers/listCustomer';

interface UseListCustomersParams {
  page: number;
  limit: number;
  search: string;
  sort: 'ASC' | 'DESC';
}

export function useListCustomers(params: UseListCustomersParams) {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.limit.toString(),
    search: params.search,
    sort: params.sort,
  });

  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => listCustomers(searchParams),
  });
}
