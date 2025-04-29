import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTheme } from '@/services/theme';

export function useCreateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, isActive }: { name: string; isActive: boolean }) =>
      createTheme(name, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
    },
  });
} 