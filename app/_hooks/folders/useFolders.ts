'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllFolders } from '../_store/queries/folderQueries';

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
