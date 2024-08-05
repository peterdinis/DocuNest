'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteTrash } from '@/app/_store/mutations/trashMutations';
import { queryClient } from '@/app/_store/queryClient';

const useCleanTrash = () => {
    return useMutation({
        mutationKey: ['cleanTrash'],
        mutationFn: () => deleteTrash(),
        onSuccess: () => {
            toast.success('Trash was cleaned');
            queryClient.invalidateQueries({
                queryKey: ['myPaginatedDocuments'],
            });
            queryClient.invalidateQueries({
                queryKey: ['myPaginatedFolders'],
            });
        },

        onError: () => {
            toast.error('Trash was not cleaned');
        },
    });
};

export default useCleanTrash;
