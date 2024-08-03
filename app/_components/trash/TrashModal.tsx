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
    ButtonGroup,
} from '@nextui-org/react';
import { Trash } from 'lucide-react';
import TrashDocuments from './TrashDocuments';
import TrashFolders from './TrashFolders';
import useCleanTrash from '@/app/_hooks/trash/useCleanTrash';

const TrashModal: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mutate: cleanTrash, isPending } = useCleanTrash();

    const handleDeleteAll = () => {
        cleanTrash();
    };

    return (
        <>
            <button
                onClick={onOpen}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <Trash />
            </button>
            <Modal
                size='xl'
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
                                <br />
                                <TrashDocuments />
                                <hr />
                                <TrashFolders />
                                <hr />
                            </ModalBody>
                            <ModalFooter>
                                <ButtonGroup>
                                    <Button color='danger' onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        className='ml-5'
                                        color='default'
                                        startContent={<Trash />}
                                        onPress={handleDeleteAll}
                                        isLoading={isPending}
                                    >
                                        Delete all trash
                                    </Button>
                                </ButtonGroup>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default TrashModal;
