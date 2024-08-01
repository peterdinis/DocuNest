'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllTrashFolders } from '@/app/_store/queries/folderQueries';

const useAllTrashFolders = () => {
    return useQuery({
        queryKey: ['trashFolders'],
        queryFn: fetchAllTrashFolders,
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useAllTrashFolders;
