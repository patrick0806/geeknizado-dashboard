
import { resumeStore, ResumeStore } from '@/services/report';
import { useQuery } from '@tanstack/react-query';


export function useDashboardData() {
    return useQuery<ResumeStore>({
      queryKey: ['resume-store'],
      queryFn: async () => resumeStore(),
    });
  }