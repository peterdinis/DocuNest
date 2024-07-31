'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { queryClient } from '@/app/_store/queryClient';
import { useRouter } from 'next/navigation';
import {
    updateFolder,
    UpdateFolderData,
} from '@/app/_store/mutations/folderMutations';
import { UseUserDetailProps } from '../_types/hookTypes';

const useMoveFolderToTrash = ({id}: UseUserDetailProps) => {
    const router = useRouter();

    return useMutation({
        mutationKey: ["moveFolderToTrash"],
        mutationFn: (data: UpdateFolderData) => null;
    })
}

export default useMoveFolderToTrash;