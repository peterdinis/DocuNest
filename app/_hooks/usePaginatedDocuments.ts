'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllPaginatedDocuments } from '@/app/_store/queries/documentQueries';

interface UsePaginatedDocumentsOptions {
    query: string;
    page: number;
}

const usePaginatedDocuments = ({
    query,
    page,
}: UsePaginatedDocumentsOptions) => {
    return useQuery({
        queryKey: ['myPaginatedDocuments', query, page],
        queryFn: () => fetchAllPaginatedDocuments({ query, page }),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default usePaginatedDocuments;
