"use client"

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IMoveToTrash, removeFromTrashFolder } from '@/app/_store/mutations/folderMutations';

export const useRemoveFolderFromTrash = (id: string) => {
    return useMutation({
        mutationKey: ['rem', id],
        mutationFn: (data: IMoveToTrash) => removeFromTrashFolder(id, data),
        onSuccess: () => {
            toast.success('Folder was removed from trash');
        },
        onError: () => {
            toast.error('Folder was not removed from trash');
        },
    });
};
