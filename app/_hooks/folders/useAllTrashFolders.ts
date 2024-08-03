'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllTrashFolders } from '@/app/_store/queries/folderQueries';

const useAllTrashFolders = (page: number, perPage: number) => {
    return useQuery({
        queryKey: ['trashFolders', page, perPage],
        queryFn: () => fetchAllTrashFolders(page, perPage),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useAllTrashFolders;
