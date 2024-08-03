'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteTrash } from '@/app/_store/mutations/storeMutations';

const useCleanTrash = () =>{
    return useMutation({
        mutationKey: ["cleanTrash"],
        mutationFn: () => deleteTrash(),
        onSuccess: () => {
            toast.success("Trash was cleaned");
        },

        onError: () => {
            toast.error("Trash was not cleaned");
        }
    })
}

export default useCleanTrash;