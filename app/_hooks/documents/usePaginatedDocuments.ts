'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllPaginatedDocuments } from '@/app/_store/queries/documentQueries';
import { UsePaginatedDocumentsOptions } from '@/app/_types/hookTypes';

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
