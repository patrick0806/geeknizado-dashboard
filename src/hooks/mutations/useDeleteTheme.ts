import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTheme } from '@/services/theme';

export function useDeleteTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTheme(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
    },
  });
} 