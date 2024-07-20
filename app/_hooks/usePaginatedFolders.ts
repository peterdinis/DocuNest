"use client"

import { useQuery } from '@tanstack/react-query';
import { fetchAllPaginatedFolders } from '@/app/_store/queries/folderQueries';

interface UsePaginatedFoldersOptions {
    query: string;
    page: number;
}

const usePaginatedFolders = ({ query, page }: UsePaginatedFoldersOptions) => {
    return useQuery({
        queryKey: ['myPaginatedFolders', query, page],
        queryFn: () => fetchAllPaginatedFolders({ query, page }),
        staleTime: Infinity,
    });
};

export default usePaginatedFolders;