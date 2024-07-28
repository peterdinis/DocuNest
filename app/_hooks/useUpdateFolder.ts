'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { queryClient } from '@/app/_store/queryClient';
import { useRouter } from 'next/navigation';
import {
    updateFolder,
    UpdateFolderData,
} from '@/app/_store/mutations/folderMutations';
import { UseUpdateFolderOptions } from '../_types/hookTypes';

const useUpdateFolder = ({
    id,
    setIsEditMode,
    setName,
}: UseUpdateFolderOptions) => {
    const router = useRouter();

    return useMutation({
        mutationKey: ['updateFolder'],
        mutationFn: (data: UpdateFolderData) => updateFolder(id, data),
        onSuccess: (updatedData: any) => {
            setIsEditMode(false);
            setName(updatedData.name);
            toast.success('Folder was edited');
            queryClient.invalidateQueries({
                queryKey: ['folderDetail', id],
            });
            router.push('/folders/all');
        },
        onError: () => {
            toast.error('Folder was not edited');
        },
    });
};

export default useUpdateFolder;
