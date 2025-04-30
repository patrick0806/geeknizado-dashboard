import { listCustomers } from '@/services/customer';
import { Customer } from '@/types/customer';
import { Page } from '@/types/page';
import { useQuery } from '@tanstack/react-query';

type UseCategoriesProps = {
  page: number,
  size: number,
  isActive?: boolean
}

export function useCustomers({page, size, isActive}: UseCategoriesProps) {
    return useQuery<Page<Customer>>({
      queryKey: ['customers', page, size, isActive],
      queryFn: async () => listCustomers(page,size, isActive),
    });
  }