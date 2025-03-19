import { api } from '../api';

export async function deleteCustomer(customerId: string) {
  await api.delete(`/customers/${customerId}`);
}
