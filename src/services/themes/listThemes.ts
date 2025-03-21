import { Page } from '@/types/page';
import { Theme } from '@/types/product';

import { api } from '../api';

type ListThemesProps = {
  page: number;
  limit: number;
};

export async function listThemes({ page = 1, limit = 100 }: ListThemesProps) {
  const { data } = await api.get<Page<Theme>>(
    `/themes?page=${page}&size=${limit}`
  );
  return data;
}
