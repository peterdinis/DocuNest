"use client"

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { queryClient } from '@/app/_store/queryClient';

const deleteFolder = async (folderId: string) => {
    if (!folderId) return;
    return await axios.delete(`/api/folders/${folderId}`);
};

export const useDeleteFolder = (folderId: string) => {
    return useMutation({
        mutationKey: ['deleteFolder', folderId],
        mutationFn: () => deleteFolder(folderId),
        onSuccess: () => {
            toast.success('Folder was deleted');
            queryClient.invalidateQueries({
                queryKey: ['myPaginatedFolders'],
            });
        },
        onError: () => {
            toast.error('Failed to delete folder');
        },
    });
};