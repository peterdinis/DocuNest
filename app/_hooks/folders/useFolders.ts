'use client';

import { fetchAllFolders } from '@/app/_store/queries/folderQueries';
import { useQuery } from '@tanstack/react-query';

const useFolders = () => {
    return useQuery({
        queryKey: ['myFolders'],
        queryFn: fetchAllFolders,
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useFolders;
