import { Page } from '@/types/page';
import { Category } from '@/types/product';

import { api } from '../api';

type ListCategoriesProps = {
  page: number;
  limit: number;
};

export async function listCategories({
  page = 1,
  limit = 100,
}: ListCategoriesProps) {
  const { data } = await api.get<Page<Category>>(
    `/categories?page=${page}&size=${limit}`
  );
  return data;
}
