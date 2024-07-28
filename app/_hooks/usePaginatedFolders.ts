'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllPaginatedFolders } from '@/app/_store/queries/folderQueries';
import { UsePaginatedFoldersOptions } from '../_types/hookTypes';

const usePaginatedFolders = ({ query, page }: UsePaginatedFoldersOptions) => {
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
