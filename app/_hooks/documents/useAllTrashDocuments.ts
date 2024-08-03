'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllTrashDocuments } from '@/app/_store/queries/documentQueries';

const useAllTrashDocuments = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['trashDocuments', page],
        queryFn: () => fetchAllTrashDocuments(page, limit),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useAllTrashDocuments;