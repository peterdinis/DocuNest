'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchUserDetail } from '../_store/queries/userQueries';

interface UseUserDetailProps {
    id: string;
}

const useUserDetail = ({ id }: UseUserDetailProps) => {
    return useQuery({
        queryKey: ['userDetail', id],
        queryFn: () => fetchUserDetail(id),
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
    });
};

export default useUserDetail;
