'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllPaginatedFolders } from '@/app/_store/queries/folderQueries';
import { IPagination } from '@/app/_types/hookTypes';

const usePaginatedFolders = ({ query, page }: IPagination) => {
    return useQuery({
        queryKey: ['myPaginatedFolders', query, page],
        queryFn: () => fetchAllPaginatedFolders({ query, page }),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default usePaginatedFolders;
