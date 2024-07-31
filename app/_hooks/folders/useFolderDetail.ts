'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchFolderDetail } from '../_store/queries/folderQueries';
import { UseFolderDetailOptions } from '../_types/hookTypes';

const useFolderDetail = ({ id, isEditMode }: UseFolderDetailOptions) => {
    return useQuery({
        queryKey: ['folderDetail', id],
        queryFn: async () => {
            return await fetchFolderDetail(id);
        },
        refetchOnWindowFocus: true,
        refetchInterval: isEditMode ? 5000 : false,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
    });
};

export default useFolderDetail;
