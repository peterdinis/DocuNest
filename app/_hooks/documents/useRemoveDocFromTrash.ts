'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IMoveToTrash } from '@/app/_store/mutations/folderMutations';
import { removeDocumentFromTrash } from '@/app/_store/mutations/documentMutations';
import { queryClient } from '@/app/_store/queryClient';

export const useRemoveDocumentFromTrash = () => {
    return useMutation({
        mutationKey: ['removeDocFromTrash'],
        mutationFn: (data: IMoveToTrash) => {
            if (!data.documentId) {
                throw new Error('Document ID is required');
            }
            return removeDocumentFromTrash(data);
        },
        onSuccess: () => {
            toast.success('Document was removed from trash');
            queryClient.invalidateQueries({
                queryKey: ['trashDocuments'],
            });
        },
        onError: (error: any) => {
            toast.error(`Document was not removed from trash: ${error.message}`);
        },
    });
};