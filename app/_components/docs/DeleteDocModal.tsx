'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '@/app/_store/queryClient';

interface IDeleteDocModalProps {
    docId: string;
}

const deleteDocument = async (documentId: string) => {
    if (!documentId) return;
    return await axios.delete(`/api/docs/${documentId}`);
};

const DeleteDocModal: FC<IDeleteDocModalProps> = ({
    docId,
}: IDeleteDocModalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleSubmit } = useForm();

    const deleteDocMut = useMutation({
        mutationKey: ['deleteDocument', docId],
        mutationFn: () => deleteDocument(docId),
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

    const onSubmit = () => {
        console.log('Zbhenem');
        deleteDocMut.mutate();
    };

    return (
        <>
            <button onClick={onOpen}>
                <X className='rounded-lg bg-red-700 text-white' />
            </button>
            <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalHeader className='flex flex-col gap-1'>
                                Do you want to delete document?
                            </ModalHeader>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color='primary' type='submit'>
                                    Delete Document
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteDocModal;
