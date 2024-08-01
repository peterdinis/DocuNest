"use client"

import { fetchSearchResults } from "@/app/_store/queries/searchQueries";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ["searchResults", searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
    enabled: !!searchQuery,
    staleTime: Infinity,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};