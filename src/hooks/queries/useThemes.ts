import { useQuery } from '@tanstack/react-query';
import { listThemes } from '@/services/theme';

type UseThemeProps = {
  page: number,
  size: number,
  isActive?: boolean
}


export function useThemes({page,size,isActive}: UseThemeProps) {
  return useQuery({
    queryKey: ['themes', page, size, isActive],
    queryFn: () => listThemes(page, size, isActive),
  });
} 