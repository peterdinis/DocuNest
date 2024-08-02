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
import { useDeleteDocument } from '@/app/_hooks/documents/useDeleteDoc';
import { useMoveDocumentToTrash } from '@/app/_hooks/documents/useMoveDocToTrash';

interface IDeleteDocModalProps {
    docId: string;
}

const DeleteDocModal: FC<IDeleteDocModalProps> = ({ docId }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleSubmit } = useForm();
    const deleteDocMut = useDeleteDocument(docId);
    const moveToTrashMut = useMoveDocumentToTrash();

    const onDelete = () => {
        deleteDocMut.mutate();
    };

    const onMoveToTrash = () => {
        moveToTrashMut.mutate({
            documentId: docId,
            inTrash: true,
        });
    };

    return (
        <>
            <button onClick={onOpen}>
                <X className='rounded-lg bg-red-700 text-white' />
            </button>
            <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit(onMoveToTrash)}>
                            <ModalHeader className='flex flex-col gap-1'>
                                Do you want to delete document?
                            </ModalHeader>
                            <ModalFooter>
                                <Button color='danger' onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color='secondary'
                                    onClick={onMoveToTrash}
                                >
                                    Move to trash
                                </Button>
                                <Button
                                    color='success'
                                    type='button'
                                    onClick={onDelete}
                                >
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
