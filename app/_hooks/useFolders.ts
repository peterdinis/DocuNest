'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllFolders } from '../_store/queries/folderQueries';

const useFolders = () => {
    return useQuery({
        queryKey: ['folders'],
        queryFn: fetchAllFolders,
        staleTime: Infinity,
    });
};

export default useFolders;
