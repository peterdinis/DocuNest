'use client';

import {
    ICreateFolder,
    createNewFolder,
} from '@/app/_store/mutations/folderMutations';
import { queryClient } from '@/app/_store/queryClient';
import { UseCreateFolderOptions } from '@/app/_types/hookTypes';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useCreateFolder = ({ reset, onClose }: UseCreateFolderOptions) => {
    return useMutation({
        mutationKey: ['createFolder'],
        mutationFn: async (data: ICreateFolder) => {
            await createNewFolder(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myFolders'] });
            toast.success('Folder was created');
            reset();
            onClose();
        },
        onError: () => {
            toast.error('Error creating folder');
        },
    });
};

export default useCreateFolder;
