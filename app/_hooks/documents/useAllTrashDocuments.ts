'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllTrashDocuments } from '@/app/_store/queries/documentQueries';

const useAllTrashDocuments = () => {
    return useQuery({
        queryKey: ['trashDocuments'],
        queryFn: fetchAllTrashDocuments,
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useAllTrashDocuments;
