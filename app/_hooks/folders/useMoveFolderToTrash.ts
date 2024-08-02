'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
    IMoveToTrash,
    moveToTrashFolder,
} from '@/app/_store/mutations/folderMutations';

export const useMoveFolderToTrash = () => {
    return useMutation({
        mutationKey: ['moveFolderToTrash'],
        mutationFn: (data: IMoveToTrash) => moveToTrashFolder(data),
        onSuccess: () => {
            toast.success('Folder was added to trash');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Folder was not added to trash');
        },
    });
};
