import { Page } from '@/types/page';
import { Customer } from '@/types/customer';

import { api } from '../api';

export async function listCustomers(
  params: URLSearchParams
): Promise<Page<Customer>> {
  const { data } = await api.get('/customers', { params: params });
  return data;
}
