"use client"

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { queryClient } from '@/app/_store/queryClient';

const deleteDocument = async (documentId: string) => {
    if (!documentId) return;
    return await axios.delete(`/api/docs/${documentId}`);
};

export const useDeleteDocument = (documentId: string) => {
    return useMutation({
        mutationKey: ['deleteDocument', documentId],
        mutationFn: () => deleteDocument(documentId),
        onSuccess: () => {
            toast.success('Document was deleted');
            queryClient.invalidateQueries({
                queryKey: ['myPaginatedDocuments'],
            });
        },
        onError: () => {
            toast.error('Failed to delete document');
        },
    });
};