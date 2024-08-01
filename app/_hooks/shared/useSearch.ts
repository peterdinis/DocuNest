'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchSearchResults } from '@/app/_store/queries/searchQueries';

export const useSearch = (searchQuery: string, page: number, limit: number) => {
    return useQuery({
        queryKey: ['searchResults', searchQuery, page],
        queryFn: () => fetchSearchResults(searchQuery, page, limit),
        enabled: !!searchQuery,
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};
