'use client';

import { useMutation } from '@tanstack/react-query';
import { updateDocumentFolder } from '@/app/_store/mutations/documentMutations';
import { queryClient } from '@/app/_store/queryClient';
import { toast } from 'react-toastify';

export const useAddToFolder = (id: string) => {
    return useMutation({
        mutationKey: ['addToFolder', id],
        mutationFn: (folderId: string) => updateDocumentFolder(id, folderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['docDetail', id] });
            toast.success('Document added to folder');
        },
        onError: () => {
            toast.error('Failed to add document to folder');
        },
    });
};
