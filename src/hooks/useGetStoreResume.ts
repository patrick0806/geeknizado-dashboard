import { useQuery } from '@tanstack/react-query';

import { resumeStore } from '@/services/dashboard/resumeStore';

export function useGetStoreResume() {
  return useQuery({
    queryKey: ['resume-store'],
    queryFn: resumeStore,
  });
}
