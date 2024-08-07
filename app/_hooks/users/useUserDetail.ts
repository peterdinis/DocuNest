'use client';

import { fetchUserDetail } from '@/app/_store/queries/userQueries';
import { UserDetailProps } from '@/app/_types/hookTypes';
import { useQuery } from '@tanstack/react-query';

const useUserDetail = ({ id }: UserDetailProps) => {
    return useQuery({
        queryKey: ['userDetail', id],
        queryFn: () => fetchUserDetail(id),
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
    });
};

export default useUserDetail;
