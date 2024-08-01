'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
    IMoveToTrash,
    moveToTrashFolder,
} from '@/app/_store/mutations/folderMutations';

export const useMoveFolderToTrash = (id: string) => {
    return useMutation({
        mutationKey: ['moveFolderToTrash', id],
        mutationFn: (data: IMoveToTrash) => moveToTrashFolder(id, data),
        onSuccess: () => {
            toast.success('Folder was added to trash');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Folder was not added to trash');
        },
    });
};
