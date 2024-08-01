'use client';

import { FC} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Pagination,
} from '@nextui-org/react';
import {Trash } from 'lucide-react';
import useAllTrashFolders from '@/app/_hooks/folders/useAllTrashFolders';
import useAllTrashDocuments from '@/app/_hooks/documents/useAllTrashDocuments';
import Loading from '../shared/Loading';

const TrashModal: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {data: trashData, isLoading: trashLoading, isError: trashError} = useAllTrashFolders();
    const {data: docData, isLoading: docLoading, isError: docError} = useAllTrashDocuments();

    console.log("Trash", trashData);
    console.log("DOC", docData);

    if(trashLoading || docLoading) {
        return <Loading />
    }

    if(trashError || docError) {
        return <p className='text-red-700 text-xl font-bold'>Something went wrong</p>
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
                                <div className='mt-5 flex justify-center align-top'>
                                    <Pagination
                                        loop
                                        showControls
                                        isCompact
                                        color='success'
                                        total={5}
                                        initialPage={1}
                                    />
                                </div>
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
