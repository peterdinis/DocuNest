'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
    createNewFolder,
    ICreateFolder,
} from '../_store/mutations/folderMutations';
import { queryClient } from '../_store/queryClient';
import { UseCreateFolderOptions } from '../_types/hookTypes';


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
