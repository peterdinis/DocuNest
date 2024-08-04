'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllPaginatedFiles } from '@/app/_store/queries/fileQueries';
import { IPagination } from '@/app/_types/hookTypes';

const usePaginatedFiles = ({ query, page }: IPagination) => {
    return useQuery({
        queryKey: ['myPaginatedFiles', query, page],
        queryFn: () => fetchAllPaginatedFiles({ query, page }),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default usePaginatedFiles;
