import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTheme } from '@/services/theme';

export function useUpdateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, name, isActive }: { slug: string; name: string; isActive: boolean }) =>
      updateTheme(slug, name, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
    },
  });
} 