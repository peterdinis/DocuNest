'use client';

import { useMutation } from '@tanstack/react-query';
import { moveDocumentToTrash } from '@/app/_store/mutations/documentMutations';
import { toast } from 'react-toastify';
import { IMoveToTrash } from '@/app/_store/mutations/folderMutations';

export const useMoveDocumentToTrash = (id: string) => {
    return useMutation({
        mutationKey: ['moveDocToTrash', id],
        mutationFn: (data: IMoveToTrash) => moveDocumentToTrash(id, data),
        onSuccess: () => {
            toast.success('Document was added to trash');
        },
        onError: (error) => {
            console.log('E', error);
            toast.error('Document was not added to trash');
        },
    });
};
