'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
    createNewDocument,
    ICreateDocumentData,
} from '@/app/_store/mutations/documentMutations';
import { queryClient } from '../_store/queryClient';

const useCreateDocument = () => {
    return useMutation({
        mutationKey: ['newDocument'],
        mutationFn: async (data: ICreateDocumentData) => {
            return await createNewDocument(data);
        },
        onSuccess: () => {
            toast.success('New document was created');
            queryClient.invalidateQueries({
                queryKey: ["myPaginatedDocuments"]
            })
        },
        onError: () => {
            toast.error('Failed to create document');
        },
    });
};

export default useCreateDocument;
