'use client';

import { FC } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { Trash } from 'lucide-react';
import useAllTrashFolders from '@/app/_hooks/folders/useAllTrashFolders';
import useAllTrashDocuments from '@/app/_hooks/documents/useAllTrashDocuments';
import Loading from '../shared/Loading';
import TrashDocuments from './TrashDocuments';
import TrashFolders from './TrashFolders';

const TrashModal: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        data: trashData,
        isLoading: trashLoading,
        isError: trashError,
    } = useAllTrashFolders();
    const {
        data: docData,
        isLoading: docLoading,
        isError: docError,
    } = useAllTrashDocuments();

    if (trashLoading || docLoading) {
        return <Loading />;
    }

    if (trashError || docError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    return (
        <>
            <button
                onClick={onOpen}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <Trash />
            </button>
            <Modal
                size='3xl'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1 text-4xl'>
                                Trash
                            </ModalHeader>
                            <ModalBody>
                                Your items in Trash
                                <br />
                                <TrashDocuments />
                                <hr />
                                <TrashFolders />
                                <hr />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='flat'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default TrashModal;
