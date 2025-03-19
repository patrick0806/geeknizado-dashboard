import { resumeStore } from "@/services/dashboard/resumeStore";
import { useQuery } from "@tanstack/react-query";

export function useGetStoreResume() {
    return useQuery({
        queryKey: ['resume-store'],
        queryFn: resumeStore
    })
}