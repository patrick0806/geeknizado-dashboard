import { Product } from '@/types/product';
import { Order } from '@/types/order';

import { api } from '../api';

type ResumeStoreResponse = {
  totalSales: number;
  ordersLastSevenDays: Order[];
  customersAmount: number;
  productsAmount: number;
  productsWithLowStock: Product[];
};

export async function resumeStore(): Promise<ResumeStoreResponse> {
  const { data } = await api.get<ResumeStoreResponse>('/dashboard');
  return data;
}
