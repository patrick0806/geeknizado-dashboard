import { Customer } from '@/types/customer';

import { api } from '../api';

export async function findCustomerById(id: string): Promise<Customer> {
  const { data } = await api.get(`/customers/${id}`);
  return data;
}
