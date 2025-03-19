import { useQuery } from '@tanstack/react-query';

import { listThemes } from '@/services/themes/listThemes';

export function useGetThemes({
  page = 1,
  limit = 100,
}: {
  page: number;
  limit: number;
}) {
  return useQuery({
    queryKey: ['themes', page, limit],
    queryFn: async () => {
      return listThemes({ page, limit });
    },
  });
}
