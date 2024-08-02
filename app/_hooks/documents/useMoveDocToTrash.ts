'use client';

import { useMutation } from '@tanstack/react-query';
import { moveDocumentToTrash } from '@/app/_store/mutations/documentMutations';
import { toast } from 'react-toastify';
import { IMoveToTrash } from '@/app/_store/mutations/folderMutations';

export const useMoveDocumentToTrash = () => {
    return useMutation({
        mutationKey: ['moveDocToTrash'],
        mutationFn: (data: IMoveToTrash) => moveDocumentToTrash(data),
        onSuccess: () => {
            toast.success('Document was added to trash');
        },
        onError: (error) => {
            console.log('E', error);
            toast.error('Document was not added to trash');
        },
    });
};
