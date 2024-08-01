'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IMoveToTrash } from '@/app/_store/mutations/folderMutations';
import { removeDocumentFromTrash } from '@/app/_store/mutations/documentMutations';

export const useRemoveDocumentFromTrash = (id: string) => {
    return useMutation({
        mutationKey: ['removeDocFromTrash', id],
        mutationFn: (data: IMoveToTrash) => removeDocumentFromTrash(id, data),
        onSuccess: () => {
            toast.success('Document was removed from trash');
        },
        onError: () => {
            toast.error('Document was not removed from trash');
        },
    });
};
