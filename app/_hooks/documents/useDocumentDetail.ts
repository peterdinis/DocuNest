'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDocumentDetail } from '@/app/_store/queries/documentQueries';
import { UseDocumentDetailOptions } from '@/app/_types/hookTypes';

const useDocumentDetail = ({ id, isEditMode }: UseDocumentDetailOptions) => {
    return useQuery({
        queryKey: ['docDetail', id],
        queryFn: () => fetchDocumentDetail(id),
        refetchOnWindowFocus: true,
        refetchInterval: isEditMode ? 5000 : false,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
    });
};

export default useDocumentDetail;
