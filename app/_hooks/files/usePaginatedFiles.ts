'use client';

import { useQuery } from '@tanstack/react-query';
import { UsePaginatedFoldersOptions } from '@/app/_types/hookTypes';
import { fetchAllPaginatedFiles } from '@/app/_store/queries/fileQueries';

const usePaginatedFiles = ({ query, page }: UsePaginatedFoldersOptions) => {
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
